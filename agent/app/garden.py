"""Load the published garden and do lightweight lexical retrieval.

Deliberately dependency-free and cheap: the garden is small, so a keyword
overlap search over heading-delimited chunks is enough to ground answers and
cite pages. Swap in embeddings or Foundry IQ later without touching the agent.
"""

from __future__ import annotations

import os
import re
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

# Public site origin, used to turn a page slug into a citation URL.
SITE_BASE_URL = os.environ.get("GARDEN_SITE_BASE_URL", "https://fvossebeld.github.io")

_WORD = re.compile(r"[a-z0-9]+")
_STOP = {
    "the", "a", "an", "and", "or", "of", "to", "in", "is", "it", "for", "on",
    "with", "as", "by", "at", "this", "that", "be", "are", "from", "what",
    "how", "why", "do", "does", "i", "you", "about", "can", "tell", "me",
}


def _content_dir() -> Path:
    """Knowledge baked next to the agent in prod; the repo's content/ in dev."""
    override = os.environ.get("GARDEN_CONTENT_DIR")
    if override:
        return Path(override)
    baked = Path(__file__).resolve().parent.parent / "knowledge"
    if baked.is_dir():
        return baked
    return Path(__file__).resolve().parents[2] / "content"


def _tokens(text: str) -> list[str]:
    return [w for w in _WORD.findall(text.lower()) if w not in _STOP and len(w) > 1]


@dataclass
class Chunk:
    title: str
    slug: str
    heading: str
    text: str

    @property
    def url(self) -> str:
        return f"{SITE_BASE_URL}/{self.slug}"


@dataclass
class Page:
    title: str
    slug: str
    description: str


def _parse_frontmatter(raw: str) -> tuple[dict, str]:
    if not raw.startswith("---"):
        return {}, raw
    end = raw.find("\n---", 3)
    if end == -1:
        return {}, raw
    meta: dict[str, str] = {}
    for line in raw[3:end].splitlines():
        if ":" in line and not line.startswith(" "):
            key, _, val = line.partition(":")
            meta[key.strip()] = val.strip().strip("\"'")
    return meta, raw[end + 4 :]


def _slug(path: Path, root: Path) -> str:
    rel = path.relative_to(root).with_suffix("")
    parts = list(rel.parts)
    if parts and parts[-1].lower() == "index":
        parts = parts[:-1]
    return "/".join(parts)


@lru_cache(maxsize=1)
def _load() -> tuple[list[Page], list[Chunk]]:
    root = _content_dir()
    pages: list[Page] = []
    chunks: list[Chunk] = []
    if not root.is_dir():
        return pages, chunks
    for path in sorted(root.rglob("*.md")):
        raw = path.read_text(encoding="utf-8", errors="ignore")
        meta, body = _parse_frontmatter(raw)
        if str(meta.get("draft", "")).lower() == "true":
            continue
        slug = _slug(path, root)
        title = meta.get("title") or (slug.rsplit("/", 1)[-1] or "home").replace("-", " ").title()
        pages.append(Page(title=title, slug=slug, description=meta.get("description", "")))
        # Split the body into sections on markdown headings so citations are precise.
        sections = re.split(r"^#{1,6}\s+(.*)$", body, flags=re.MULTILINE)
        intro = sections[0]
        if intro.strip():
            chunks.append(Chunk(title, slug, title, intro.strip()))
        for i in range(1, len(sections), 2):
            heading = sections[i].strip()
            text = sections[i + 1].strip() if i + 1 < len(sections) else ""
            if text:
                chunks.append(Chunk(title, slug, heading, text))
    return pages, chunks


def catalog() -> str:
    """A compact list of pages for the system prompt so the agent knows the map."""
    pages, _ = _load()
    if not pages:
        return "(the garden is currently empty)"
    lines = []
    for p in pages:
        desc = f" - {p.description}" if p.description else ""
        lines.append(f"- {p.title} (/{p.slug}){desc}")
    return "\n".join(lines)


def find_page(slug: str) -> Page | None:
    """Resolve a published page by slug, tolerating leading/trailing slashes."""
    target = slug.strip().strip("/")
    pages, _ = _load()
    for p in pages:
        if p.slug == target:
            return p
    return None


def search(query: str, k: int = 4) -> list[Chunk]:
    _, chunks = _load()
    q = set(_tokens(query))
    if not q or not chunks:
        return []
    scored: list[tuple[float, Chunk]] = []
    for c in chunks:
        toks = _tokens(c.heading + " " + c.text)
        if not toks:
            continue
        overlap = sum(1 for t in toks if t in q)
        if overlap:
            scored.append((overlap / (len(toks) ** 0.5), c))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [c for _, c in scored[:k]]
