# Visual learning loop

Use this procedure for a private visual experiment or when a bespoke figure needs
evidence-led revision. It does not authorize a public embed or site-wide theme change.
Read [`DIAGRAMS.md`](../../../DIAGRAMS.md), [`EDITORIAL.md`](./EDITORIAL.md), and
[`ACCEPTANCE.md`](./ACCEPTANCE.md) first.

## Procedure

1. **Freeze the source claim.** Record the exact source, section, evidence status, values,
   relationships and limits. Separate measured facts, source descriptions, working
   theories and illustrative examples. Never copy another author's artwork, code,
   branding or claims. If a needed fact is missing, ask for it or keep the drawing
   qualitative; do not fill the gap with invented values.
2. **Name the reading problem.** State what readers must otherwise reconstruct: a
   permission boundary, overlap, dimension, denominator, order or feedback path. If no
   concrete problem remains, stop and use prose.
3. **Compare different compositions.** Sketch two alternatives that change the argument's
   geometry, not merely its colors or card styling. Note what each arrangement could
   falsely imply. Fix the claim and intended reading order before styling.
4. **Make a standalone brief.** Include exact labels, marks, relationships, evidence
   status, source, desktop and narrow layouts, semantics, caption, limits and acceptance
   tests. For non-trivial bespoke work, cold-read the brief with `figure-spec-checker`;
   resolve MISSING INFO or VAGUE before drawing.
5. **Prototype in isolation.** Keep fixtures and outputs outside `content/`. Use a unique
   Quartz output directory per iteration. A candidate stylesheet may be injected for
   early comparison, but record it as prototype evidence only. Before promoting shared
   styling, render a fixture using the actual integrated stylesheet and distinguish any
   remaining composition-specific prototype styles.
6. **Inspect images, then critique.** Open rendered screenshots at 390px and 1440px in
   light and dark. Look first at the whole plate: what is noticed, what is misread, where
   the eye travels, and whether the visual says more than the prose. Record one specific
   weakness and the visible evidence for it. Then check text size, contrast, strokes,
   overflow, IDs, reading order, responsive geometry and reduced motion. Enlarge a crop
   only to examine details; the full composition still needs review.
7. **Revise one coherent issue and re-render.** Keep earlier briefs and images. Record
   what changed, what improved, what regressed and any tradeoff. Rebuild through Quartz
   and reopen the final images; do not rely on stale screenshots or CSS assertions.
8. **Promote only earned lessons.** A reusable rule needs a clear before/after observation
   and evidence it generalizes beyond an incidental label or source fact. Add a native
   Quartz snippet and exact semantics/mobility constraints for each new pattern. Keep
   specimen-specific details out of general advice.
9. **Keep approval separate.** A successful private experiment, skill edit, stylesheet
   integration or screenshot is not approval to add the figure to a public page. The
   author approves every public embed and broader shell change.

## Stop when

- The source claim, values and uncertainty are faithfully represented and the brief's
  acceptance conditions pass in the actual Quartz build.
- The intended distinction is visible in every inspected viewport and theme, with no
  unresolved high-impact misreading, false quantitative cue, clipping, illegible
  essential label, contrast failure, duplicate/unresolved accessible ID or missing
  static meaning.
- The final image review finds no further change that is both material and source-
  supported. Record remaining low-impact tradeoffs rather than polishing indefinitely.
- Final artifacts, exact build/check commands, results, image paths and untested limits
  are recorded. Never describe screenshot review as native zoom or assistive-technology
  testing.

If a blocker depends on missing source facts or a public-embedding decision, stop at that
boundary; do not guess or publish. Preserve v1 and intermediate evidence so the final
comparison remains inspectable.
