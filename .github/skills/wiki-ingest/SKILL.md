---
name: wiki-ingest
description: >
  Ingest a raw source into the digital garden. Use when Floris drops a file into
  raw/, pastes a link or note, or says "ingest this", "file this", "add this to the
  wiki", or "process this source". Reads the source, files it into content/ pages,
  wires up [[wikilinks]], updates the index and LOG, and opens a PR. Implements the
  "Ingest" operation of the Karpathy LLM-wiki pattern.
---

# Wiki ingest

This is the **Ingest** operation from the [Karpathy LLM-wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).
Turn one raw source into durable, interlinked wiki pages. Read [`AGENTS.md`](../../../AGENTS.md)
first — it is the schema this skill follows. Floris is editor-in-chief; you do the filing,
he approves.

## Hard rules

- **Never edit `raw/`.** It is the immutable source of truth — read from it only.
- **Never push to `main`.** Work on a branch and open a pull request.
- **Don't invent facts.** Every claim on a page must trace to the source you're ingesting,
  another `raw/` file, or an existing wiki page. If something is missing, leave a
  `TODO(floris): …` marker rather than guessing.
- **Clear the quality bar.** All prose must pass [`.github/CONTENT-QUALITY.md`](../../CONTENT-QUALITY.md)
  and the voice rules in [`.github/instructions/content.instructions.md`](../../instructions/content.instructions.md).
  Write like Floris, not like an AI.

## Steps

1. **Read the source fully.** If it's a file, it's under `raw/`. If it's a link or pasted
   note, read it and ask Floris where to save the raw copy under `raw/` so it stays the
   source of truth.
2. **Discuss takeaways briefly.** Confirm with Floris what's worth keeping. He owns "what
   matters"; you own the filing.
3. **File it into `content/`.** Create or update the relevant page(s):
   - Pick the right folder: `concepts/` for an atomic, single-subject note, `thoughts/`
     for a synthesis, an argument, or a field note. The rule and its edge cases live in
     [`.github/instructions/content.instructions.md`](../../instructions/content.instructions.md).
   - One summary/topic page per distinct subject. Update existing pages instead of
     duplicating.
   - Frontmatter: `title` (required), `description`, `tags`, `date`, and `draft: true`
     while unfinished.
   - A single source often touches several pages (the topic page plus any entity/concept
     pages it relates to). Update them all.
4. **Wire up `[[wikilinks]]`.** Link the new/updated page to every clearly related existing
   page, in both directions. Be generous but only link genuinely related things.
5. **Update the catalog.** Add or refresh the page's entry in `content/index.md` — a link
   plus a one-line summary, under the right section — so nothing becomes an orphan.
6. **Consider a visual.** Ask whether a diagram or infographic would make any part of the
   page *faster to understand* — or whether a long stretch of prose would land better
   broken up by a timeline, stepper, comparison, or stat strip. Reach for the right one
   when it does real work (the [`wiki-visualize`](../wiki-visualize/SKILL.md) skill and its
   [`PATTERNS.md`](../wiki-visualize/PATTERNS.md) library have verified recipes); skip it
   when prose already carries the idea. Propose it to Floris in one line (technique + what
   it clarifies), and once he agrees, hand off to **`wiki-visualize`** /
   [`.github/DIAGRAMS.md`](../../DIAGRAMS.md) to draft and verify. Never embed without asking.
7. **Log it.** Append one line to `LOG.md` with the greppable prefix:
   `## [YYYY-MM-DD] ingest | <short description>`.
8. **Self-check, then open a PR.** Before opening, run the draft past the bar yourself (or
   suggest the `slop-verifier` agent). Open a PR summarising what you filed, which pages
   changed, and any `TODO(floris)` markers. The `content-quality-review` workflow scores
   it; iterate until it passes, then Floris merges.

## When to hand off

- To add a diagram or infographic that earns its place: the **`wiki-visualize`** skill.
- To polish rough prose into Floris's voice: the **`style-editor`** agent.
- To gate a draft before merge: the **`slop-verifier`** agent (publishable bar is score ≥ 80).
- To health-check the whole wiki afterwards: the **`wiki-lint`** skill.
