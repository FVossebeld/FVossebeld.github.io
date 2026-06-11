---
name: wiki-lint
description: >
  On-demand health check of the digital garden, with the option to fix what it finds.
  Use when Floris says "lint the wiki", "health-check the garden", "find broken or
  missing links", "any orphan pages?", "what links should I add?", or "clean up the
  wiki". Maps the [[wikilink]] graph across content/ and reports (or fixes, via a PR)
  broken links, orphans, missing cross-references, undocumented concepts, stale claims,
  and frontmatter gaps. Implements the "Lint" operation of the Karpathy LLM-wiki pattern.
---

# Wiki lint

This is the **Lint** operation from the [Karpathy LLM-wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).
Keep the *whole wiki* healthy and interlinked. Read [`AGENTS.md`](../../../AGENTS.md) for the
schema.

There are two lint paths in this repo; this skill is the **interactive, deeper** one:

- The scheduled [`wiki-lint` workflow](../../workflows/wiki-lint.md) runs weekly (and on
  demand from Actions), is **read-only**, and files **one issue** with a checklist.
- **This skill** is what Floris runs conversationally. It does the same analysis but can go
  deeper, discuss findings, and — when asked — **act on them by opening a PR**.

## What to inspect

Walk every `.md` under `content/` (ignore `content/assets/`). Map the link graph with
`grep`/`rg`: wikilinks are `[[target]]` or `[[target|alias]]`; also count normal Markdown
links between pages. Then check, in order of impact:

1. **Broken links** — `[[targets]]` or relative `.md` links pointing at a page that doesn't
   exist. List each with its source file.
2. **Missing cross-references ("links to make")** — pairs of pages clearly about related
   things (shared topic, one names the other's subject in prose) that aren't linked yet.
   Propose the exact `[[wikilink]]` and the sentence it belongs in. Highest-value check —
   be concrete.
3. **Orphan pages** — pages with no inbound links (excluding `index.md` and the homepage).
   Suggest where to link them from.
4. **Undocumented concepts** — terms mentioned across several pages that deserve their own
   page. Suggest the page to create.
5. **Stale / contradictory claims** — old `date` frontmatter overtaken by a newer page, or
   two pages that disagree. Quote both sides.
6. **Frontmatter hygiene** — missing `title`/`tags`, or `draft: true` on a finished page.

## Output

- **Report mode (default):** a prioritised Markdown checklist grouped by the categories
  above, each item a concrete, actionable edit with exact filenames and quoted text. If a
  category is clean, write "none" — don't pad. Don't invent pages or facts.
- **Fix mode (when Floris asks you to act):** make the smallest sensible set of edits on a
  branch (fix links, add the proposed cross-references, fix frontmatter), append a
  `## [YYYY-MM-DD] lint | <description>` line to `LOG.md`, and open a PR. Never push to
  `main`. Leave judgement calls (new pages, resolving contradictions) for Floris unless he
  says otherwise.
