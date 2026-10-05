# Editorial visual system

This is the house direction for bespoke explanatory graphics: warm paper, near-black
rules, expressive serif headlines, mono apparatus, sharp panels, and colour that carries
meaning. The aim is a research publication with creative, purpose-built illustrations,
not a dashboard, a stock flowchart collection, or a landing-page template.

The technical rules still live in [`DIAGRAMS.md`](../../../DIAGRAMS.md).
Use [`PATTERNS.md`](../PATTERNS.md) for verified building blocks. This specification
captures the intended styling and composition method; it does not claim that a new
site-wide theme has already shipped.

## Art direction

### Surface and colour

Use paper as the dominant ground, hairline ink borders, and sparse flat fills.
Keep evidence panels rectangular. No soft shadows, rounded card grids, gradient washes,
glass panels, or gratuitous decorative icons in the figure family.

Target palette for an opt-in editorial theme:

| Role                     | Light target | Dark target | Use                                                         |
| ------------------------ | ------------ | ----------- | ----------------------------------------------------------- |
| Paper                    | `#f7f4ef`    | `#140206`   | Figure ground                                               |
| Ink                      | `#140206`    | `#f7f4ef`   | Text, rules, arrowheads                                     |
| Inset paper              | `#fbf9f6`    | `#21161a`   | Secondary panels                                            |
| Neutral mark             | `#e4ddd2`    | `#463b40`   | Comparator bars, controls                                   |
| Positive / focal result  | `#00d22e`    | `#00d22e`   | Selected result fill, never an unsupported "success" signal |
| Speech / human signal    | `#ff6183`    | `#ff6183`   | Speech or human-response encoding                           |
| Video / secondary signal | `#d9ebff`    | `#7ca7d9`   | Video or secondary channel encoding                         |

These are **target values, not currently installed CSS tokens**. A theme implementation
should expose semantic aliases such as `--plate-paper`, `--plate-ink`,
`--plate-neutral`, `--plate-positive`, `--plate-speech`, and `--plate-video`.
Existing published figures continue to use the current garden palette until the theme
is approved and tested.

Do not use bright green or pink for small text on paper. Put ink labels beside the mark,
or ink text inside a sufficiently large light accent fill. In dark mode, outline pale
fills where necessary and pair them with near-black text, not the mode's pale body text.
Check actual contrast; a token name does not guarantee it. Each figure needs only the
colours required by its encodings, not the whole palette.

### Typography

Three roles, with a visible change of voice:

- **Claim:** expressive, relatively narrow serif; tight leading and deliberate line breaks.
  Spectral is the installed starting point. A different display face is a separate
  font decision, with licensing, download weight and dark/mobile testing.
- **Explanation:** quiet, readable sans serif for figure text. Use the existing `--uiFont`
  before adding another body font. Keep article prose in its existing serif unless
  Floris approves a broader typography change.
- **Apparatus:** Spline Sans Mono for identifiers, units, axis labels, keys and technical
  notes. Compact uppercase labels, modest tracking, tabular numerals.

Large percentages can use the display serif. Short metric deltas can use mono. Essential
labels remain at least 14 CSS px after rendering, including SVG scaling. Do not reproduce
a tiny raster label at the expense of readability.

### Framing and rhythm

Give a figure these parts, omitting only those that genuinely add nothing:

1. A small, outlined identifier tab attached to the top-left rule.
2. The one claim or explanation that establishes what the reader is looking at.
3. A compact key when marks have non-obvious meanings.
4. The graphic, with enough internal space for relationships to be obvious.
5. A thin separator and one interpretive sentence.
6. A source, evidence status and relevant limitation.

Desktop starting dimensions: 1px frame and internal rules; roughly 24-32px inset;
8-16px between tightly related marks; 24-40px around the actual graphic. Treat these as
spacing ranges, not facts about the subject. On mobile, reduce inset to about 16px,
stack explanatory units, and preserve text size.

Keep prose around 60-72ch. Give selected figures modest extra width, around 1.08 times
the prose wrapper as a starting proportion, only where navigation rails permit it.
Alternate prose, mechanism, evidence and interpretation. Do not turn every paragraph
into a figure or use a fixed diagram quota.

### Atmosphere is a separate layer

An opening may use dark grain, abstract photographic texture, soft pink/lavender light
and a large serif title. That mood belongs to a selected essay opening, not behind
charts. Evidence stays flat, ruled and legible. Create original artwork or use cleared
assets; no copied photos, logos, font files or third-party animation code.

Do not add fake headline statistics to make an opening look complete. The homepage
still needs to work as a catalogue.

## Composition vocabulary

The creativity comes from choosing geometry that explains the idea. Reuse the frame,
type and marks; change the composition.

| Reader needs to understand       | Composition to consider                                         | Meaning carried by the drawing                                                    |
| -------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| System control and feedback      | Inputs → engines → outputs, with a separate return path         | Forward operation and continuous observation are different paths                  |
| Waiting versus simultaneous work | Aligned lanes on a shared time axis                             | Overlap, silence and response order become visible                                |
| A change in representation       | Waveform → compressed cells → reconstructed signal              | Information changes form, not just ownership                                      |
| Compression across time          | Older history, current unit, next unit; expanded frames below   | Nested scales show what one unit contains                                         |
| A measured improvement           | Mechanism sketch plus bars on a common baseline                 | The reader sees both the cause described by the source and the measured magnitude |
| Relative rank                    | Metric tiles with rank, denominator and better-direction labels | First place is not the same as a percentage improvement                           |
| Results against a reference      | Direct-labelled bars, shared axis, distinct reference outline   | Comparator and distance from reference are visible                                |
| A proportion in a small sample   | One mark per item, numerator/denominator and large percentage   | The sample size cannot disappear behind the percentage                            |
| Responsibility and permission    | Enclosures with distinct boundaries and a visible handoff       | Coordinating does not grant authority to mutate                                   |
| Expanding scope                  | Nested regions or a reflowing scope ladder                      | Widening reach is different from merely adding features                           |

Use dashed outlines for reference, absence, or restricted authority only when the
reading key states which one they mean. A solid fill should identify the focal item,
not conceal uncertainty. Arrowheads imply direction; adjacency alone should not be
used to claim causation. Repeated cells imply counts unless explicitly marked schematic.

No source values means no numerical axis. No source counts means no countable waffle.
Label illustrative timing as illustrative. Keep exceptions beside the headline.

## Procedure: compose, do not decorate

1. **Read the passage and source.** Record the exact claim, relationships and known
   numbers. Separate observations, working theories, measured results and illustrations.
2. **Find the difficulty.** Name what the reader must otherwise reconstruct: an authority
   boundary, an overlap, a change of scale, a denominator, or a feedback path.
   If there is none, tighten the prose.
3. **Compare two materially different compositions.** For scope, compare nested
   boundaries with paired responsibility panels. For concurrency, compare aligned lanes
   with a sequence diagram. Two colours of the same card grid are not two ideas.
4. **Assign meaning to the marks.** Position, length, enclosure, repetition, line type
   and colour each need a job. Drop visual elements with no explanatory role.
5. **Write a standalone brief.** Resolve missing data before construction. For
   non-trivial bespoke work, send only the brief to `figure-spec-checker`.
6. **Get Floris's approval before a public embed.** A skill update or private prototype
   is not permission to rewrite essays or replace the theme.
7. **Build natively.** HTML for reflowing labels and panels; SVG for precise geometry;
   Mermaid when automatic layout fits. A new composition is experimental until its
   actual Quartz output has been checked.
8. **Inspect the result.** Both themes, 390/1440px, essential labels at least 14 CSS px,
   200% zoom, contrast, clipping, unique IDs, logical reading order and static fallback.
   See [`ACCEPTANCE.md`](./ACCEPTANCE.md).

### Standalone brief

```text
Claim: the one thing this figure makes visible.
Evidence status: measured / source-described / working theory / illustrative.
Source: file + section or URL; exact values and relationships to use.
Technique and type: HTML boundary comparison / SVG timing lanes / Mermaid sequence / ...
Elements: every label, value, unit, node, and edge; no "etc."
Encoding: what position, size, enclosure, line style and colour mean.
Reading order: where the eye starts and the comparison it makes.
Desktop composition: arrangement and maximum useful width.
Narrow composition: exact stacking, simplification or alternate geometry.
Title, reading key, caption: exact text, including caveats.
Accessibility: text equivalents, unique IDs, contrast, essential label size.
Motion: none by default; if needed, mechanism shown and static/reduced-motion version.
Acceptance: what would prove the drawing communicates the claim.
```

Fix the facts and meaning in the brief; allow freedom in spacing and finish.
Never reuse another site's product claims, study results or technical architecture
as if they were evidence for the garden's argument.

## Site changes, in order

These are proposed stages, not shipped theme changes.

### 1. Change authoring first

Claim-first composition is now part of this skill and `DIAGRAMS.md`. The
[editorial evidence panel](../PATTERNS.md#editorial-evidence-panel) is an original,
native prototype requiring no global CSS. It uses current site tokens while the target
palette remains a proposal.

The first useful public candidate is the orchestration section in "From chatbots to
system operators": show **coordinates** versus **changes state**, not merely component
names. It is a working theory, not a measured comparison.

### 2. Repair narrow-screen figures

The six-stage ladder has a 580-unit viewBox and 11-13-unit labels. In the inspected
390px layout the whole figure, including padding, was about 358px wide. Even before
subtracting padding, that bounds effective text at about 6.8-8px. The architecture
drawing has a 680-unit viewBox and some 10-unit labels, so it has the same problem.
`width:100%` prevents overflow but does not preserve readability.

Replace the ladder with HTML rows that preserve font size. For architecture, test a
narrow vertical arrangement with policy/memory notes outside the geometry. Review each
page; do not blindly restyle all `.sketch-board` instances.

### 3. Add an opt-in editorial plate family

After a representative figure is approved, introduce shared classes and semantic
colour aliases in `quartz/styles/custom.scss`: frame, identifier, claim, key, diagram,
interpretation and source. Implement the target palette above, with tested dark
counterparts. Keep the legacy sketch family for informal drawings.

Make the identifier tab, sharp rules and typographic roles consistent across different
compositions. Do not apply a border-radius-only facelift and call it a visual system.
Test normal text and meaningful strokes independently.

### 4. Give selected figures more room

The stylesheet caps the article and its blocks at `--measure:72ch`. Keep that prose
measure. An opt-in wider figure requires coordinating the article container, paragraph
measure and figure width; a child cannot escape a capped parent by setting width alone.
Check 390, 768, 1024 and 1440px and preserve the navigation rails.

No negative-margin breakout that collides with the TOC. No need to replace Quartz,
install a visualization framework or remove search, backlinks, reader mode or dark mode.

### 5. Decide the overall shell separately

If Floris wants the entire site to follow the warm-paper direction, change the root
palette in `quartz.config.ts` and harmonize the existing cool `--panel` surfaces in
`quartz/styles/custom.scss`. Review homepage, essays, concept pages, code, tables,
graphs and both themes together. Figure styling alone is not a complete theme migration.

Only then consider atmospheric openings. Interactive mechanism playback requires a
separately approved component, keyboard controls, Quartz SPA cleanup, reduced-motion
behavior and a full static alternative. Never insert scripts into Markdown pages.

## Reference-study discipline

When studying another design, inspect the actual rendered graphics and narrow layouts.
Record layout, visual hierarchy, geometry, roles of colour and type, meaningful motion,
and failures worth avoiding. Extract a house specification and original compositions,
not a branded homage. Do not name the inspiration in authored pages or skill output
unless Floris asks for attribution.

Do not claim that hidden DOM controls were reviewed as visible interactions. Distinguish
what rendered, what was inferred from source, and what has only been proposed.
