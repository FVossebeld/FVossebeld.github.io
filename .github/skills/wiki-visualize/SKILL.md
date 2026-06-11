---
name: wiki-visualize
description: >
  Add a diagram, chart, or infographic to a wiki page when it genuinely makes an idea
  faster to understand. Use when Floris says "add a diagram", "visualize this", "draw
  this", "make an infographic", "can you chart this", or when a new/updated page has
  structure, flow, comparison, or stats that a picture would clarify. Picks the right
  Quartz-native technique (Mermaid, inline HTML/CSS, or inline SVG), styles it to the
  site palette, verifies it renders, and keeps Floris as the approver.
---

# Wiki visualize

Turn a page's structure, flow, or numbers into a clear visual — without adding slop.
Read [`.github/DIAGRAMS.md`](../../DIAGRAMS.md) first; it is the visual quality bar and
the schema this skill follows. Floris approves every embed.

## Hard rules

- **A visual must earn its place.** The default is no diagram. Add one only when it makes
  something faster to understand than the prose alone. If you can't say in one sentence
  what it clarifies, don't add it. (See [`DIAGRAMS.md`](../../DIAGRAMS.md) §1.)
- **Quartz-native only.** Use Mermaid, inline HTML/CSS, or inline SVG — no new plugins,
  no `<script>`, no external CSS frameworks.
- **Site palette, dark-mode safe.** Colours come from the CSS variables / two brand
  accents in [`DIAGRAMS.md`](../../DIAGRAMS.md) §3–5. Never hardcode colours that only
  work on one background.
- **Don't invent facts.** A diagram is a claim. Everything in it must trace to the page's
  sources, just like prose. No invented boxes, arrows, or numbers.
- **Never push to `main`.** Work on a branch; Floris merges.
- **Ask before embedding.** Propose the visual (type + what it clarifies), get a yes,
  then embed.

## Steps

1. **Decide if it's worth it.** Look at the page. Is there a flow, structure, hierarchy,
   chronology, comparison, or set of stats that prose handles awkwardly? If not, stop and
   say so — recommending *no* visual is a valid, good outcome here.
2. **Pick the technique and type.** Use the decision table in [`DIAGRAMS.md`](../../DIAGRAMS.md)
   §2: relational → Mermaid; tabular/quantitative → HTML/CSS; bespoke layout → SVG. Name
   the specific Mermaid type (flowchart, sequence, timeline, quadrant, …) and *why*.
3. **Propose it to Floris.** One line: the technique, the type, and the single thing it
   clarifies. Wait for a yes before writing it into the page.
4. **Draft it small.** Keep node counts sane (≤ ~8), label edges in 1–3 words, group with
   subgraphs before things sprawl. Add `accTitle`/`accDescr` (Mermaid) or `<title>`/
   `<desc>` + `<figcaption>` (SVG/HTML).
5. **Style to the palette.** Let Mermaid inherit the site theme; use `classDef` only to
   accent key nodes with sage/amber. For SVG/HTML use `style="…:var(--…)"` (never bare
   `fill="var(--…)"`) and responsive sizing (`viewBox`+`width:100%`, reflowing grids).
6. **Self-check syntax.** Run the failure-mode checklist in [`DIAGRAMS.md`](../../DIAGRAMS.md)
   §6 (declared nodes, quoted labels, `classDef` before use, `-->` vs `->`, etc.).
7. **Verify it renders.** When practical: `npm i && npx quartz build --serve`, open the
   page, confirm the visual renders in **both light and dark** and reflows on a narrow
   width. Mermaid syntax errors fail silently — don't skip this for non-trivial diagrams.
8. **Embed with a caption and open/extend the PR.** Place the visual right after the prose
   it supports, with a one-line caption or `> [!abstract]` description. If this is part of
   an ingest, fold it into that PR; otherwise open one summarising what you added and why.

## When to hand off

- To shape the surrounding prose into Floris's voice: the **`style-editor`** agent.
- To gate the page (prose *and* whether the visual earns its place): the **`slop-verifier`** agent.
- To file a whole new source into pages first: the **`wiki-ingest`** skill (which calls
  this skill at its "consider a visual" step).
