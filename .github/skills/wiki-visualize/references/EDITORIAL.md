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

These values are exposed as semantic `--plate-*` aliases by the opt-in
`.editorial-plate` class in `quartz/styles/custom.scss`. They apply only inside figures
using that class; the page palette and legacy sketch family are unchanged. This is not a
site-wide theme migration.

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

### A set needs its own art-direction pass

A shared paper, type and frame can make a collection feel related. It cannot do the
explanatory work inside each figure. Review the set together, preferably as a sheet of
rendered figures with labels masked or reduced. Ask whether each geometry makes its
own relationship visible: a chronology, execution spine, attached side lanes, branching
fan-out, fork/join, nested selection, comparison, continuum, or return path. Those are
examples from the reviewed set, not a required menu.

Do not invent a different shape merely to fill a quota. Reuse geometry when the claim is
the same; recompose when a repeated stack of equal boxes turns a boundary, branch, choice,
or feedback path into a checklist. Treat every connector, enclosure, line weight, gap and
empty region as a claim. Remove marks without a job. A technical pass for text size,
contrast or overflow cannot establish composition quality.

On narrow screens, preserve the relation, not just the words. A shared rail with several
inward arrows can retain fan-out; paired alternatives may need to remain side by side;
a qualitative continuum can turn vertical while retaining its endpoint order. Stacking is
right only when it does not change the reading.

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
5. **Check the collection.** Compare the proposed inner geometry with the site's other
   figures. A common frame is enough for family resemblance. If several figures reduce
   to the same boxes, identify which relationship that geometry hides and recompose it.
   Do not add variation that changes or decorates the source claim.
6. **Write a standalone brief.** Resolve missing data before construction. For
   non-trivial bespoke work, send only the brief to `figure-spec-checker`.
7. **Get Floris's approval before a public embed.** A skill update or private prototype
   is not permission to rewrite essays or replace the theme.
8. **Build natively.** HTML for reflowing labels and panels; SVG for precise geometry;
   Mermaid when automatic layout fits. A new composition is experimental until its
   actual Quartz output has been checked.
9. **Run the visual learning loop.** Build, inspect actual images, critique a concrete
   misunderstanding, revise, then rebuild and recheck. Promote only source-safe lessons
   supported by the comparison. See [`LEARNING-LOOP.md`](./LEARNING-LOOP.md).
10. **Inspect the result.** Both themes, 390/1440px, essential labels at least 14 CSS px,
    contrast, clipping, unique IDs, logical reading order and static fallback. Treat
    native zoom and assistive technology as separate checks; see
    [`ACCEPTANCE.md`](./ACCEPTANCE.md).

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

## Implementation status

The opt-in `.editorial-plate` family and its dark-mode tokens are implemented in
`quartz/styles/custom.scss`. The current feature branch also contains revised compositions
for all 16 existing figures across 14 pages. The first figure migration passed its
rendering checks but failed visual review as a set of boxed lists; the later candidate
was recomposed and independently reviewed against actual Quartz captures. The staged
evidence and limits are recorded in [`ACCEPTANCE.md`](./ACCEPTANCE.md). These are working
tree changes, not a claim that the branch has been merged or deployed.

The root site palette and page chrome were not migrated. Any wider shell change remains
a separate decision. Interactive mechanism playback also remains out of scope; page
embeds stay static and contain no scripts.

## Reference-study discipline

When studying another design, inspect the actual rendered graphics and narrow layouts.
Record layout, visual hierarchy, geometry, roles of colour and type, meaningful motion,
and failures worth avoiding. Extract a house specification and original compositions,
not a branded homage. Never name external inspiration in authored pages or skill output.

Do not claim that hidden DOM controls were reviewed as visible interactions. Distinguish
what rendered, what was inferred from source, and what has only been proposed.
