# AGENTS.md — schema for maintaining this wiki

This file tells an AI agent (Claude Code, Codex, Copilot CLI, etc.) **how** to help maintain this digital garden. It is the "schema" layer of the [Karpathy LLM-wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). The human (Floris) is the editor-in-chief and approves every change; the agent does the bookkeeping.

> **Quality bar:** all published prose must clear [`.github/CONTENT-QUALITY.md`](.github/CONTENT-QUALITY.md) — no AI slop. The full AI pipeline (style-editor + slop-verifier agents, automated PR review) is documented in [`.github/AGENTIC-PIPELINE.md`](.github/AGENTIC-PIPELINE.md).

## The three layers

- `raw/` — **immutable** source material I drop in (articles, notes, transcripts). Read these; never edit them.
- `content/` — the **published wiki** (Quartz renders this into the website). You may create and update pages here.
- `wiki/` — optional scratch/internal knowledge that should *not* be published (kept out of `content/`). Use for private synthesis.

## Golden rules

1. **The human is in the loop.** Never push directly to `main`. Make changes on a branch and open a pull request for review.
2. **Markdown only.** Every page is a `.md` file with YAML frontmatter containing at least a `title`.
3. **Link generously.** Connect related pages with `[[wiki-links]]`. Cross-references are the point of a wiki.
4. **Don't invent facts.** Ground new pages in `raw/` sources or the existing wiki. Flag contradictions rather than silently overwriting.
5. **Keep drafts hidden.** Use `draft: true` in frontmatter for unfinished pages.

## Workflows

### Ingest
When a new source lands in `raw/`:
1. Read it.
2. Summarize the key takeaways with the human.
3. Create or update the relevant page(s) under `content/`.
4. Add/refresh `[[wiki-links]]` to connect it to existing pages.
5. Append an entry to `LOG.md` (see below).

### Query
When asked a question: search the wiki, read the relevant pages, and answer with links to sources. If the answer is valuable, offer to file it back as a new page so the exploration compounds.

### Lint (health check)
Periodically scan for: contradictions between pages, stale claims, orphan pages with no inbound links, important concepts lacking their own page, and missing cross-references. Report findings; let the human decide. This runs **automatically every week** via the [`wiki-lint`](.github/workflows/wiki-lint.md) workflow, which opens an issue with a checklist. The [`wiki-librarian`](.github/agents/wiki-librarian.agent.md) agent can run a deeper, conversational version on request and act on the findings via a PR.

## index.md
`content/index.md` is the navigable **catalog / homepage** — every significant page should be reachable from it (the "Start here" list plus topic sections). Update it whenever you add or rename a page so nothing becomes an orphan.

## LOG.md
Append-only, chronological record. Each entry starts with a consistent prefix so it's greppable:

```
## [YYYY-MM-DD] ingest | <short description>
## [YYYY-MM-DD] lint   | <short description>
```

## Conventions
- Filenames: lowercase, kebab-case (e.g. `agent-memory.md`).
- Frontmatter: `title` (required), `description`, `tags`, optional `draft`.
- Public pages go in `content/`. Anything not meant for the public stays in `wiki/` or `raw/`.
