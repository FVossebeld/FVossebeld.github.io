---
name: wiki-visualize
description: >
  Add a diagram, chart, or infographic to a wiki page when it genuinely makes an idea
  faster to understand. Use when Floris says "add a diagram", "visualize this", "draw
  this", "make an infographic", "can you chart this", or when a new/updated page has
  structure, flow, comparison, or stats that a picture would clarify. Picks the right
  Quartz-native technique (Mermaid, inline HTML/CSS, or inline SVG), styles it to the
  site palette, verifies it renders, and keeps Floris as the approver. Also use for
  visual reference studies and bespoke editorial infographics, not just flowcharts.
---

# Wiki visualize

Turn a page's structure, flow, or numbers into a clear visual — without adding slop.
Read [`.github/DIAGRAMS.md`](../../DIAGRAMS.md) first; it is the visual quality bar and
the schema this skill follows. Use [`PATTERNS.md`](./PATTERNS.md) for known recipes.
For a visual reference study or a bespoke explanatory figure, read
[`references/EDITORIAL.md`](./references/EDITORIAL.md). **Reuse the technical
scaffolding, not a layout that distorts the idea.** Floris approves every embed.

## Hard rules

- **A visual must earn its place — and so does a wall of flat text.** Add a visual when it
  makes something faster to understand _or_ when it paces a long stretch of prose better
  than another paragraph would. Don't add one that just restates the text, and don't add
  one you can't justify in a sentence. (See [`DIAGRAMS.md`](../../DIAGRAMS.md) §1.)
- **Start from the claim, not the recipe.** Use a verified pattern when it fits. If it
  hides timing, boundaries, scope, or a meaningful contrast, design a bespoke figure
  using the editorial procedure. New layouts must clear the same rendering checks.
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
- **Study references in a browser.** Inspect actual graphics and narrow layouts, not
  only extracted text. Separate observed design, interpretation, and proposed changes.
  Borrow principles, never another site's assets, code, branding, or research claims.
- **Mobile is a composition, not a smaller SVG.** Aim for at least 14 CSS px for essential
  labels at a 390px viewport. Reflow HTML labels, simplify, or provide a separate narrow
  composition when SVG text would shrink below that. Zoom is a supplement, not the fix.

## Steps

1. **Decide if it's worth it.** Look at the page. Is there a flow, structure, hierarchy,
   chronology, comparison, or set of stats that prose handles awkwardly — or a long grey
   stretch a timeline / stepper / stat strip would pace better? If genuinely nothing fits,
   say so; recommending _no_ visual is a valid outcome. But on a long page, actively hunt
   for the one or two spots where a visual would do real work.
2. **Choose the visual argument.** Name what the reader should see: a blocked boundary,
   a widening scope, an overlapping operation, a difference in magnitude. For a bespoke
   figure, sketch two materially different compositions in words and choose the one that
   exposes that relationship fastest. Then pick the technique from
   [`DIAGRAMS.md`](../../DIAGRAMS.md) §2 and a fitting recipe from [`PATTERNS.md`](./PATTERNS.md).
   Simple relationships → Mermaid; reflowing editorial layout → HTML; precise geometry
   → SVG. Steer chronology → HTML timeline and
   hierarchy → `flowchart TD` (Mermaid `timeline`/`mindmap` render low-contrast here).
3. **Propose it to Floris.** One line: the technique, the type, and the single thing it
   clarifies. Wait for a yes before writing it into the page.
4. **Write a buildable brief, then draft.** Fix the claim, exact labels and relationships,
   sources, visual encoding, reading order, narrow layout, and caption. Gate non-trivial
   bespoke briefs with `figure-spec-checker`, passing only the brief. A MISSING INFO or
   VAGUE result goes back for clarification, not a guessed drawing.
   Adapt a recipe or compose a new figure within its technical scaffolding.
   Keep node counts sane (≤ ~8), label edges in 1–3 words,
   group with subgraphs before things sprawl. Add `accTitle`/`accDescr` (Mermaid) or
   `<title>`/`<desc>` + `<figcaption>` (SVG/HTML). For HTML, keep the block gap-free with
   ≤2-space indentation — a blank line or 4-space indent turns it into a grey code block.
5. **Style to the palette.** Let Mermaid inherit the site theme; use `classDef` only to
   accent key nodes with ink blue/sky blue. For SVG/HTML use `style="…:var(--…)"` (never bare
   `fill="var(--…)"`) and responsive sizing (`viewBox`+`width:100%`, reflowing grids).
6. **Self-check syntax.** Run the failure-mode checklist in [`DIAGRAMS.md`](../../DIAGRAMS.md)
   §6 (declared nodes, quoted labels, `classDef` before use, `-->` vs `->`, etc.).
7. **Verify the actual output.** Build with `npx quartz build`; restore dependencies only
   if missing. Inspect in **both light and dark** at 390px and 1440px, including actual
   rendered SVG text sizes, clipping, contrast, and 200% zoom. Check motion with reduced
   motion enabled; a static figure must carry the full argument. Mermaid syntax errors
   fail silently. Record which checks ran; never call an unrendered recipe verified.
8. **Embed with a caption and open/extend the PR.** Place the visual right after the prose
   it supports, with a one-line caption or `> [!abstract]` description. If this is part of
   an ingest, fold it into that PR; otherwise open one summarising what you added and why.

## When to hand off

- To gate a figure brief _before_ building it: the **`figure-spec-checker`** agent. Hand it
  only the instruction (no page, no context) and it cold-reads whether the figure is
  interpretable (CLEAR), missing specific facts (MISSING INFO), or too vague to draw (VAGUE).
  Useful at step 1–3 when the brief is non-trivial or you're unsure you've understood it.
- To shape the surrounding prose into Floris's voice: the **`style-editor`** agent.
- To gate the page (prose _and_ whether the visual earns its place): the **`slop-verifier`** agent.
- To file a whole new source into pages first: the **`wiki-ingest`** skill (which calls
  this skill at its "consider a visual" step).
