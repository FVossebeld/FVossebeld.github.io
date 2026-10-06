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
   falsely imply. Fix the claim and intended reading order before styling. For a
   collection revision, also compare the figures as a set: a shared frame can unify them,
   but repeated inner geometry is a problem when it hides different relationships.
   Use a text-masked contact sheet to compare structure if labels dominate the view.
   There is no diversity quota, and no figure should be made different for decoration.
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
   the eye travels, and whether the visual says more than the prose. For a set, inspect a
   comparison sheet and the inner geometry without labels as well. Record specific
   weaknesses and the image evidence for them. Then check text size, contrast, strokes,
   overflow, IDs, reading order, responsive geometry and reduced motion. Enlarge a crop
   only to examine details; the full composition still needs review.
7. **Keep two verdicts.** Record technical rendering results separately from art-direction
   acceptance. Text size, contrast, accessibility references and overflow can all pass
   while the graphic still reads as a boxed list, broken path, lost comparison or
   unexplained enclosure. A visual critique must inspect the actual output, not only
   CSS, DOM metrics or a build log.
8. **Revise one coherent issue and re-render.** Keep earlier briefs and images. Record
   what changed, what the before/after images show, what regressed and any tradeoff.
   Rebuild through Quartz and reopen the final images; do not rely on stale screenshots
   or CSS assertions. For collection-level work, reopen the final set, not just a sample.
9. **Promote only earned lessons.** A reusable rule needs a clear before/after observation
   and evidence it generalizes beyond an incidental label or source fact. Name the
   relevant images or evidence record. Add a native Quartz starting structure and its
   semantics/mobile constraints, not a rigid universal layout. Keep specimen-specific
   details out of general advice.
10. **Keep approval separate.** A successful private experiment, skill update, stylesheet
    integration or screenshot is not approval to add a figure to a public page. The
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
- The independent visual review accepts the actual final images, including collection
  variety when several figures were revised. A technical pass cannot substitute for
  this art-direction decision.
- Final artifacts, exact build/check commands, results, image paths and untested limits
  are recorded. Never describe screenshot review as native zoom or assistive-technology
  testing.

If a blocker depends on missing source facts or a public-embedding decision, stop at that
boundary; do not guess or publish. Preserve v1 and intermediate evidence so the final
comparison remains inspectable.
