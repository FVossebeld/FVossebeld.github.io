# raw/ — immutable source material

This folder is the **source of truth** for the wiki. Drop source material here: articles,
notes, transcripts, papers, exported threads, images, data files.

## Rules

- **Immutable.** The AI reads from `raw/` but **never edits or deletes** anything here.
  If a source changes, add a new file rather than rewriting the old one.
- **Not published.** Quartz only builds `content/`, so nothing in `raw/` appears on the
  site. This is private source material.
- **Cite it.** Pages under `content/` should trace their factual claims back to a file in
  `raw/` (or to another wiki page). The `wiki-ingest` skill files sources from here into
  `content/`.

Filenames: lowercase, kebab-case, with a date prefix when it helps ordering, e.g.
`2026-06-11-some-article-title.md`. Keep the original text intact; add your own notes in
`wiki/` instead.

See [`AGENTS.md`](../AGENTS.md) for the full ingest/query/lint schema.
