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

## Editorial plate family

For a figure using `.editorial-plate`, also verify the opt-in frame and palette in actual
Quartz output. Use an isolated Markdown fixture and build-output directory; an injected-
CSS-only preview does not establish that integrated styles work.

- Exactly one native semantic figure (do not override it with `role="group"`) with
  unique, resolving title and description references; a visible figcaption includes
  source and evidence limits.
- The plate frame, attached identifier, claim typography and source footer are present;
  legacy `.sketch-board` and page chrome are unchanged.
- Both themes at 390px and 1440px: essential text at least 14 CSS px, normal text
  contrast at least 4.5:1, meaningful strokes at least 3:1, and no page or figure
  horizontal overflow.
- Each vivid mark has a textual meaning; test its fill, label and outline separately.
  A token name does not establish adequate contrast.
- Narrow layouts reflow labels and geometry without implying extra scale, rank or time;
  reading order and static/reduced-motion presentation retain the full argument.
- For one-to-many handoffs, keep each target independently bounded and its arrow outside
  and meeting that target's border. A shared origin label is enough only when operation
  destinations and per-system permission limits remain explicit.
- For schedule comparisons, keep one aligned source-backed scale, put the illustrative-
  time caveat beside it, and align any labelled overlap bracket to the actual interval.
  If narrow layouts hide ticks, remove their matching grid marks and preserve endpoints.
- Capture actual images and inspect them. A CSS metric pass is not a visual critique.
  A 720px or 200%-equivalent reflow check is not native browser zoom; screenshots and
  DOM inspection are not assistive-technology operation.

See [`LEARNING-LOOP.md`](./LEARNING-LOOP.md) for the repeatable build/inspect/critique/
revise/recheck process and stopping conditions.

For a repeatable browser check, use
[`scripts/verify-editorial-plate.mjs`](../scripts/verify-editorial-plate.mjs). It builds
one isolated fixture, checks the frame in 390/720/1440px light and dark, and captures
390/1440px images. It requires an externally installed Playwright module and Microsoft
Edge; do not add either as a project dependency. In PowerShell:

```powershell
$env:PLAYWRIGHT_MODULE = "C:\path\to\playwright\index.mjs"
node .github\skills\wiki-visualize\scripts\verify-editorial-plate.mjs `
  --fixture "C:\scratch\fixture" `
  --output "C:\scratch\unique-quartz-output" `
  --screenshots "C:\scratch\plate-evidence"
```

Use new output and screenshot directories per run. The script checks computed styles and
DOM geometry; it does not replace opening the screenshots or testing native zoom and
assistive technology.
It rejects repository outputs and overlapping fixture/output/evidence paths before
Quartz can clean an output directory. Three-tick schedule recipes also assert tick
centres against the track's start, midpoint and end; generic readability checks alone
cannot establish correct axis geometry.

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

The warm-palette screenshot was an art-direction proposal at the time of that check.
The integrated opt-in plate family has since received its own fixture checks below;
the earlier injected-preview evidence alone does not verify the integrated styles.

## Recorded integrated plate study, 2026-10-05

Three private Quartz fixtures (authority handoffs, memory scope, and an illustrative
schedule) were built against the integrated `quartz/styles/custom.scss` plate family.
The browser script checked 390, 720, and 1440 CSS px in light and dark for each
fixture; screenshots were captured at 390 and 1440px in both themes and all 12 images
were opened for visual inspection.

- Essential text was at least 14px in all 18 viewport/theme cases. Minimum measured
  text contrast was 18.39:1 light and 16.03:1 dark for authority; 7.00:1 in both themes
  for memory and schedule. Minimum measured meaningful-stroke contrast was 7.00:1.
- The browser accessibility query found one native figure. Page and figure overflow
  were absent; fixed-shell intersections were absent in the tested tall-viewport
  captures. IDs were unique; title/description references and
  direct-child captions resolved. The figure remained complete under reduced-motion
  preference and had no figure animation.
- The authority handoffs reflowed to one target per row on mobile and a two-by-two
  grid on desktop; memory audience rows retained equal widths; the schedule hid the
  unnecessary mobile tick and grid marks together and retained the labelled overlap
  interval. The schedule is explicitly illustrative, not a latency or performance
  measurement.
- The specimen fixtures were tested, not verbatim extractions of every HTML/CSS fence
  in `PATTERNS.md`. Treat those fences as starting recipes and build/check each
  adapted figure independently.

The exact integrated commands, image paths, per-specimen measurements, iteration notes,
and untested limits are recorded in a private experiment report alongside the external
scratch evidence, not in the published garden. These screenshot/reflow checks do not
establish native browser zoom, keyboard reading order, assistive-technology operation,
or reader comprehension. Normal-height page shell overlap was not established by the
tall-viewport captures.

## Recorded exact plate recipes, 2026-10-05

The editorial frame, authority-handoff and illustrative-schedule HTML/CSS fences in
`PATTERNS.md` were extracted verbatim into three private fixtures and built through
Quartz with the integrated plate styles. All 18 combinations of 390, 720 and 1440 CSS
px in light and dark passed the browser checker.

Essential text remained at least 14px. Minimum text contrast was 11.92:1 light and
13.26:1 dark for the frame and handoff, and 7.00:1 in both themes for the schedule.
No page or figure horizontal overflow was found. Representative screenshots were
opened for inspection, not every captured image.

Screenshot inspection caught centred tick labels that did not meet schedule interval
endpoints. The recipe now places tick centres at the track's start, midpoint and end;
the checker asserts alignment within one CSS pixel in all six schedule cases.
The same native-zoom, assistive-technology, comprehension and normal-height shell
limitations recorded above still apply.
