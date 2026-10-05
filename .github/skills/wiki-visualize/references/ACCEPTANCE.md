# Editorial visual acceptance

Use these scenarios to check the skill's behavior and each new pattern. They are
manual acceptance cases, not an automated model evaluation. Record actual outcomes
in the PR; a scenario description is not evidence that a run passed.

| Prompt / fixture                                                                  | Expected behavior                                                                                                             | Reject                                                                                    |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| "Learn from this reference site's infographics"                                   | Inspect rendered graphics at desktop and narrow widths; distinguish observation from proposal; preserve the garden's identity | Text-only scan presented as a visual review; copied assets; theme change without approval |
| "Visualize broad intent, narrow execution" with the essay's orchestration passage | Compare two compositions; fix responsibilities and boundaries in a standalone brief; get approval before embedding            | Generic boxes selected before reading the claim; implied unrestricted writes              |
| "Make a latency chart" with no measured durations                                 | Ask for durations or use an explicitly qualitative relationship without a numerical axis                                      | Invented times, baselines or improvement percentages                                      |
| "Make this six-stage SVG responsive" with a 580-unit viewBox and 11-unit labels   | Calculate effective label size; reflow HTML or provide a narrow composition                                                   | `width:100%` declared sufficient while labels render around 7px                           |
| "Use the editorial evidence panel twice"                                          | Replace IDs and claims/sources together; preserve meaningful border distinctions                                              | Duplicate `scope-demo-caption` IDs; example facts pasted into unrelated content           |
| "Animate the authority boundary"                                                  | Prefer static; explain any real benefit; no scripts in page embeds; obtain separate approval for component work               | Endless decorative animation or meaning lost under reduced motion                         |

## Rendering the evidence-panel recipe

Build a temporary fixture outside published `content/` containing the HTML fence from
`PATTERNS.md` as raw Markdown HTML, then build it through this checkout's Quartz.
Never mark a pattern verified using only a standalone HTML preview.

Check the resulting page at 390px and 1440px in light and dark, plus a 200%-zoom
equivalent narrow layout:

- Exactly one semantic `figure` and its associated `figcaption`; IDs unique.
- Two responsibility sections; both retain their labels, text and boundary semantics.
- No literal `<figure>` text inside a code block.
- Panels side by side at the wide viewport, stacked at the narrow viewport.
- All essential text at least 14 CSS px; no overflowing label or page-level overflow.
- Text contrast at least 4.5:1, meaningful boundary strokes at least 3:1.
- Logical DOM reading order; no meaning dependent on colour or pointer hover.
- No scripts, external frameworks or new fonts required by the recipe.
- Reduced-motion view remains complete; this particular recipe has no motion.

Every adapted instance needs its own source and rendering checks. A verified frame does
not verify new facts, longer labels, a different source link, or a new graphic.

## Recorded recipe check, 2026-10-05

The exact HTML fence was extracted into an external temporary fixture and built by
this checkout's Quartz 4.5.2. Browser assertions and rendered screenshots passed for
390, 720 and 1440 CSS px, each in light and dark:

- Minimum essential label size: 14px in all six cases.
- Minimum text contrast: 12.31:1 in light, 11.81:1 in dark.
- Minimum tested frame/section stroke contrast: 7.45:1 in light, 7.17:1 in dark.
- One labelled figure, direct-child caption, unique IDs and two responsibility sections.
- Side-by-side wide panels, stacked narrow panels; no page/figure horizontal overflow
  and no Markdown code-block trap.
- Reduced-motion preference enabled; the recipe is static.

720px is a 200%-reflow-equivalent layout for a 1440px starting viewport, not a run
of the browser's native zoom control. Native zoom and assistive-technology operation
were not tested. Screenshots showed the existing floating garden launcher over part
of the caption at the bottom of the mobile fixture; that shell overlap remains a
site-level issue, not a verified aspect of this pattern.

The warm-palette screenshot is an art-direction proposal only. Its palette and a
future shared plate theme still need their own checks.
