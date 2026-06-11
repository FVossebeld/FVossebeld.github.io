---
name: wiki-query
description: >
  Answer a question from the digital garden and optionally file the answer back as a
  new page. Use when Floris asks a question about the wiki's subject matter, says
  "what does the wiki say about…", "search the garden", "answer from my notes", or
  "look this up in the wiki". Reads the index and relevant pages, answers with
  citations, then offers to save valuable answers as new pages so explorations
  compound. Implements the "Query" operation of the Karpathy LLM-wiki pattern.
---

# Wiki query

This is the **Query** operation from the [Karpathy LLM-wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).
Answer questions *from the wiki*, with sources — and turn good answers into durable pages
so the knowledge base keeps compounding. Read [`AGENTS.md`](../../../AGENTS.md) for the
schema.

## How to answer

1. **Read `content/index.md` first.** It's the catalog — use it to find which pages are
   relevant, then drill into them. Fall back to `grep`/search across `content/` for terms
   the index doesn't surface.
2. **Read the relevant pages**, follow their `[[wikilinks]]`, and synthesise an answer.
3. **Cite sources.** Link the wiki pages you used (and the `raw/` files behind them where it
   matters). Don't assert anything the wiki doesn't support — if the wiki is silent or
   contradictory, say so plainly rather than filling the gap from general knowledge. If you
   do add outside knowledge, mark it clearly as not-from-the-wiki.
4. **Pick the right shape.** Most answers are prose. Use a comparison table, list, or
   diagram only when the question genuinely calls for it.

## Compounding — file the answer back

The key move of this operation: **a good answer shouldn't vanish into chat history.** When
an answer is worth keeping (a comparison, an analysis, a connection you discovered), offer
to file it back into `content/` as a new page — then it ingests like any other source:

- Confirm with Floris that it's worth keeping.
- Create the page under `content/` with proper frontmatter, wire up `[[wikilinks]]`, add it
  to `content/index.md`, and append a `## [YYYY-MM-DD] query | <description>` line to
  `LOG.md`.
- Open a PR (never push to `main`). The `content-quality-review` workflow scores it.

## Rules

- **Don't fabricate.** Cite or say "the wiki doesn't cover this".
- Filing an answer back follows the same bar and flow as the **`wiki-ingest`** skill — reuse
  it rather than duplicating logic.
- Quality bar: [`.github/CONTENT-QUALITY.md`](../../CONTENT-QUALITY.md); voice:
  [`.github/instructions/content.instructions.md`](../../instructions/content.instructions.md).
