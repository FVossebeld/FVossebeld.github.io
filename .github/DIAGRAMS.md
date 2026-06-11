# Visual quality bar — diagrams & infographics

This is the single source of truth for adding a **visual** to a page: a diagram,
chart, architecture sketch, or infographic. It is the visual sibling of
[`CONTENT-QUALITY.md`](./CONTENT-QUALITY.md), and the same prime directive holds.

**Prime directive: a visual must earn its place — and a wall of flat text is its own
failure.** Add a visual when it makes something *faster to understand* than the prose
alone (a structure, a flow, a comparison, a chronology, a set of stats), **or** when a long
stretch of unbroken prose would tire the reader and a timeline, stepper, or stat strip
would carry part of the load better. The two failure modes are equal and opposite: a
picture that just restates the text is slop with extra steps; a page that's nothing but
grey paragraphs is a missed chance to make the idea land. Vary the texture, but every
visual must still clarify — never decorate, never restate.

This garden renders on **Quartz v4**, which gives us three techniques with **no extra
build tooling** — Mermaid, inline HTML/CSS, and inline SVG. Everything below is tuned to
what actually renders here, including this site's warm palette and automatic dark mode.

> **Don't draw from scratch.** [`skills/wiki-visualize/PATTERNS.md`](./skills/wiki-visualize/PATTERNS.md)
> is a library of **verified, copy-paste** recipes (stat cards, timelines, steppers,
> swimlanes, comparisons, meters, pull-quotes, plus the Mermaid set) — each one already
> rendered and dark-mode-checked. Pick the closest pattern, swap in real content, re-verify.
> This file is the *why*; PATTERNS.md is the *what to paste*.

---

## 1. When a visual adds value (and when it doesn't)

**Reach for a visual when the content is inherently:**

- **A flow or process** — steps, pipelines, request paths, state changes → Mermaid `flowchart` / `sequenceDiagram` / `stateDiagram-v2`.
- **A structure or architecture** — services, components, how parts connect → Mermaid `flowchart` with subgraphs, or inline SVG.
- **A hierarchy or map of ideas** → Mermaid `flowchart TD` (not `mindmap` — see §4).
- **A comparison or set of stats** — numbers, before/after, feature grids → inline HTML/CSS infographic (stat cards, comparison cards, meter bars, spec list).
- **A chronology** → the HTML **vertical timeline** (not Mermaid `timeline` — see §4).
- **An ordered how-to** → HTML **numbered stepper**.
- **Who does what, across stages** → HTML **swimlane**.
- **Trade-offs** → HTML **pros & cons**; **a line worth pausing on** → HTML **pull quote**.
- **A 2×2 / prioritization** → Mermaid `quadrantChart`.

Most of these have a ready recipe in [`PATTERNS.md`](./skills/wiki-visualize/PATTERNS.md).

**Don't add a visual when:**

- The prose is already clear and linear. Three sentences beat a three-box flowchart.
- You'd be drawing a glorified bullet list with no added structure. Use a list.
- It's decorative. No "hero" diagrams that say nothing.
- The data is a plain table → use a Markdown table.
- You can't describe what it clarifies in one sentence. If you can't, it doesn't.

The bar is "does it clarify or pace the page?", not "is the page allowed to have one?".
On a long page, actively look for the one or two spots where a visual would do real work.

### House visual system for this garden

When a page needs a visual and one of these fits, prefer the same recurring motifs so the site
feels coherent across pages. Reuse the matching snippet from
[`PATTERNS.md`](./skills/wiki-visualize/PATTERNS.md), then adapt labels to the page's facts.

1. **Capability ladder**: chatbot → copilot → system operator.
2. **Coordination boundary**: process-scoped orchestrator vs system-scoped specialists.
3. **Memory stack**: thread/user/customer/team/procedural/skill layers.
4. **Action surface map**: GUI, API, CLI, DSL converging on governed execution.
5. **Governance loop**: intent → approval → action → trace → evaluation.

These are defaults, not decoration. Use them only when they clarify the local argument.

---

## 2. The toolbox (and how to choose)

Three native techniques, ranked by how often they're the right call.

| Need | Use |
|---|---|
| Flow, architecture, sequence, state, hierarchy, ER/class, quadrant, git graph | **Mermaid** |
| Stats, comparisons, **timelines**, steppers, swimlanes, pros/cons, meters, pull-quotes | **Inline HTML + CSS** |
| A precise custom layout no diagram tool handles (≤ ~25 shapes) | **Inline SVG** |

Quick decision rules:

- **Relational data → Mermaid.** It's native, theme-aware, LLMs know it well, and it
  has a built-in pan/zoom popup. This is ~85% of cases.
- **Tabular/quantitative data → HTML/CSS.** When you're fighting Mermaid to make it look
  like a grid of numbers, stop and write a small HTML card grid instead.
- **Bespoke layout → SVG.** Only when the visual is genuinely custom and Mermaid can't
  express it. Higher token cost, higher error rate — keep it small.

> **D2 (optional, manual):** for a showcase-quality architecture diagram, you can author
> [D2](https://d2lang.com) and render it to SVG yourself (`d2 in.d2 out.svg`), then embed
> the SVG. Beautiful output, but it's a manual build step — not for routine pages.

---

## 3. This site's palette (use these, nothing else)

The theme is warm and earthy. Colours come from CSS custom properties that **switch
automatically between light and dark**. Use the variables, never invent new colours.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--light` | `#f7f3ea` | `#1b1a17` | page / node background |
| `--lightgray` | `#e7e0d1` | `#322f29` | surfaces, borders, hr |
| `--gray` | `#6f736d` | `#8c8a82` | muted text, metadata |
| `--darkgray` | `#2b302c` | `#d8d3c7` | body text |
| `--dark` | `#1f2421` | `#f2eee3` | headings |
| `--secondary` | `#53665a` | `#9db0a0` | **sage** — primary accent |
| `--tertiary` | `#8a6f4d` | `#c2a079` | **amber** — secondary accent |

Fonts: `--bodyFont` (Source Sans 3), `--headerFont` (Literata), `--codeFont` (Spline Sans Mono).

**Two accents, used sparingly.** Sage and amber are mid-tones that stay legible on both
the cream and the near-black background, so they're the safe choice for emphasis in any
technique. Don't reach past two accent colours per visual.

---

## 4. Mermaid: make it look good and stay dark-mode safe

Quartz already themes Mermaid for us — at render time it injects this site's colours as
`themeVariables` and re-renders on every light/dark toggle (`securityLevel: "loose"`, so
`<br/>` and rich labels work). That gives two rules:

1. **Let the theme do the base styling.** An un-styled diagram already matches the site
   in both modes. Don't fight it.
2. **Only `classDef`/`style` for emphasis**, and only with the **brand accents** (sage /
   amber), which read on both backgrounds. Avoid pinning node fills to mode-specific
   colours like `--light`/`--darkgray` — hardcoded hex in `classDef` does **not** switch
   when the reader flips dark mode, so a node forced to a light fill goes muddy at night.

```mermaid
flowchart LR
  accTitle: Request pipeline
  accDescr: A request passes an auth check, then hits business logic backed by a cache and database.

  classDef accent fill:#8a6f4d,stroke:#6b5740,color:#f7f3ea,rx:6,ry:6

  REQ([Request]) --> AUTH{Auth?}
  AUTH -->|ok| BL[Business logic]:::accent
  AUTH -->|no| ERR[401]
  BL --> CACHE[(Cache)]
  BL --> DB[(Postgres)]
```

The amber fill + cream text on the accented node is legible in both themes; everything
else inherits the site colours and adapts automatically.

**Mermaid house rules:**

- **Keep it small.** Max ~8 nodes per diagram/subgraph (Miller's 7±2). More than that →
  split into focused diagrams or group with `subgraph`.
- **Direction:** `LR` for processes/pipelines, `TD` for hierarchies/trees. On mobile the
  content column is ~760px — wide `LR` diagrams with many nodes overflow; prefer `TD`.
- **Label edges** with 1–3 words ("valid token", "on failure"). Never a full sentence.
- **One shape per role:** `[box]` process, `{diamond}` decision, `[(cylinder)]` store,
  `([stadium])` endpoint. Be consistent.
- **Always add `accTitle` + `accDescr`** (first lines) — Quartz's Mermaid output has no
  accessible label otherwise.
- **Never** use `%%{init: {theme: "forest"}}%%` here — Quartz's injected variables bleed
  into the named theme and produce muddy, unpredictable colours. If you must tweak a
  theme variable, target it precisely: `%%{init: {themeVariables: {edgeLabelBackground: "#e7e0d1"}}}%%`.
- **Skip `timeline` and `mindmap`.** Their auto colour scales fight this palette and render
  low-contrast (dark-on-dark), and the `theme` fix above is banned. Verified alternatives:
  chronology → the HTML [vertical timeline](./skills/wiki-visualize/PATTERNS.md#vertical-timeline);
  hierarchy / idea map → `flowchart TD`. Both look better here.

---

## 5. Inline SVG & HTML: the dark-mode-safe way

Quartz passes raw HTML/SVG straight through (`rehype-raw`, `allowDangerousHtml`), so both
render. Three non-negotiables:

**Inside an HTML block: no blank lines, no 4-space indents.** Pages run through a Markdown
parser first. A blank line *ends* the HTML block; a blank line followed by a 4-space-
indented line is parsed as an **indented code block**, so your `<div>`s render as literal
grey code. Keep multi-element HTML gap-free and indent inner lines by **≤2 spaces**. This
is the #1 reason a hand-written infographic "renders as code" — and why the
[`PATTERNS.md`](./skills/wiki-visualize/PATTERNS.md) recipes (the swimlane especially) are
deliberately flattened. When in doubt, copy a verified recipe instead of free-handing it.

**Use CSS variables for every colour — but only inside `style`, not bare attributes.**
`fill="var(--tertiary)"` silently fails; it must be `style="fill:var(--tertiary)"` (or a
`<style>` block with classes). This is the single most common SVG mistake here.

```html
<!-- WRONG: var() in a presentation attribute does nothing -->
<rect fill="var(--tertiary)" />
<!-- RIGHT -->
<rect style="fill: var(--tertiary);" />
```

**Make it responsive.** Always `viewBox` + `width="100%"`, never a fixed pixel `width`/
`height` — otherwise it overflows on mobile.

Accessible, responsive, dark-mode-safe SVG skeleton:

```html
<figure role="group" aria-labelledby="fig-title">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 220" width="100%"
       style="max-width:100%;height:auto;font-family:var(--bodyFont);"
       role="img" aria-labelledby="fig-title fig-desc">
    <title id="fig-title">Short title for screen readers</title>
    <desc id="fig-desc">One or two sentences describing the structure and flow.</desc>
    <style>
      .box   { fill: var(--lightgray); stroke: var(--tertiary); stroke-width: 1.5; }
      .accent{ fill: var(--secondary); stroke: none; }
      .label { fill: var(--darkgray); font-size: 13px; text-anchor: middle; }
      .inv   { fill: var(--light);    font-size: 13px; text-anchor: middle; }
    </style>
    <!-- shapes here -->
  </svg>
  <figcaption style="text-align:center;color:var(--gray);font-size:0.85em;margin-top:0.5rem;">
    Figure: caption visible to everyone
  </figcaption>
</figure>
```

HTML infographics follow the same rules — `var(--...)` for all colours, `rem`/`%`/
`clamp()` for sizes, `flex-wrap`/`grid auto-fit` so cards reflow on mobile. A stat-card grid:

```html
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;margin:1.5rem 0;font-family:var(--bodyFont);">
  <div style="background:var(--lightgray);border:1px solid var(--tertiary);border-radius:8px;padding:1.2rem 1rem;text-align:center;">
    <div style="font-size:2rem;font-weight:700;color:var(--tertiary);line-height:1;">3</div>
    <div style="font-size:.8rem;color:var(--gray);margin-top:.4rem;text-transform:uppercase;letter-spacing:.05em;">native techniques</div>
  </div>
  <div style="background:var(--secondary);border-radius:8px;padding:1.2rem 1rem;text-align:center;">
    <div style="font-size:2rem;font-weight:700;color:var(--light);line-height:1;">0</div>
    <div style="font-size:.8rem;color:var(--lightgray);margin-top:.4rem;text-transform:uppercase;letter-spacing:.05em;">extra plugins</div>
  </div>
</div>
```

**Never** put `<script>` tags or external CDN frameworks (Tailwind, etc.) in a page. Keep
styles inline and minimal.

---

## 6. Reliability: the failure modes to self-check

LLMs break diagrams in predictable ways. Before committing a visual, run this pass:

- [ ] Every edge's source and target is a **declared node**.
- [ ] Labels with `()`, `:`, `/` or other specials are **quoted**: `A["User (admin)"]`.
- [ ] `classDef` is declared **before** it's used with `:::name`.
- [ ] Flowchart/state transitions use `-->`, not `->` (that's sequence-only).
- [ ] HTML blocks have **no blank lines** and **no 4-space-indented** inner lines (else they render as a grey code block).
- [ ] Chronology uses the HTML vertical timeline, hierarchy uses `flowchart TD` — not Mermaid `timeline`/`mindmap`.
- [ ] SVG colours use `style="fill:var(--…)"`, **not** `fill="var(--…)"`.
- [ ] SVG has `viewBox` + `width="100%"`; no fixed pixel width.
- [ ] `accTitle`/`accDescr` (Mermaid) or `<title>`/`<desc>` (SVG) are present.
- [ ] Node count is sane (≤ ~8); if not, split or group.

**When practical, verify it renders** before opening the PR: `npx quartz build --serve`
and look at the page. Mermaid syntax errors fail silently into an ugly block.

---

## 7. Accessibility & robustness checklist

- **Describe it.** `accTitle`/`accDescr` for Mermaid; `<title>` + `<desc>` for SVG; a
  `<figcaption>` or a `> [!abstract]` callout under the figure for everyone else.
- **Dark mode.** Colours come from `var(--...)` or the two brand accents — nothing
  hardcoded that only works on one background.
- **Mobile.** Responsive sizing (`viewBox`+`width:100%`, reflowing card grids); prefer
  `TD` for tall content.
- **Graceful fallback.** The surrounding prose must still make sense if the visual fails
  to render. The diagram supports the text; it never carries it alone.

---

When auditing a visual, the same verdict logic as [`CONTENT-QUALITY.md`](./CONTENT-QUALITY.md)
applies: if it doesn't make the idea faster to grasp, it's a REVISE — cut it or fix it.
