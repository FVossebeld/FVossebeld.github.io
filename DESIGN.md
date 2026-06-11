# Design

Visual system for the site. "Quiet frontier editorial": warm paper, charcoal ink,
one muted accent, a sturdy reading serif, generous whitespace. Calm and intelligent,
never hype. Light is the primary theme; a warm (not black) dark mode is offered.

## Theme

Primary: **light, warm paper.** Scene: a technical reader opening a calm field notebook
on enterprise AI during a focused afternoon at a desk, wanting long-form thinking without
glare. Dark mode is a warm low-contrast charcoal, not "hacker dark."

## Color

Strategy: **Restrained.** Warm tinted neutrals carry the surface; a single muted accent
(olive) does the work, with copper as a secondary warm accent. Authored in OKLCH in the
stylesheet; the Quartz base palette is kept as carefully-derived sRGB hex so the graph
(d3/pixi) and OG-image generator (satori) parse colors correctly.

### Light

| Role | Hex | Use |
|---|---|---|
| paper (light) | `#F7F3EA` | page background, warm off-white |
| stone (lightgray) | `#E7E0D1` | hairlines, rules, dividers |
| muted (gray) | `#6F736D` | secondary / meta text |
| ink-soft (darkgray) | `#2B302C` | body text |
| ink (dark) | `#1F2421` | headings, strong |
| olive (secondary) | `#53665A` | links, primary accent |
| copper (tertiary) | `#8A6F4D` | hover, secondary accent |
| sand | `#EEE8DC` | code background, inset panels |

### Dark (warm)

| Role | Hex |
|---|---|
| paper (light) | `#1B1A17` |
| stone (lightgray) | `#322F29` |
| muted (gray) | `#8C8A82` |
| ink-soft (darkgray) | `#D8D3C7` |
| ink (dark) | `#F2EEE3` |
| olive (secondary) | `#9DB0A0` |
| copper (tertiary) | `#C2A079` |

## Typography

Reflective thinker + technical builder. A reading serif for headings and a calm,
highly readable sans for body. Mono only for code, never as decorative "tech" costume.

- **Headings:** `Literata` (sturdy reading serif; warm, not a high-contrast display face).
- **Body:** `Source Sans 3` (neutral-warm, highly legible).
- **Code:** `Spline Sans Mono`.

Deliberately avoids the saturated editorial-magazine reflex (italic Fraunces/Cormorant
display + tiny uppercase tracked mono labels above every section). Scale is a fluid
modular scale (`clamp()`), ≥1.25 between steps. Measure capped at ~68ch.

## Layout

Single calm reading column, left-anchored, lots of air. No content "card" wrapper:
writing sits directly on the paper. Quiet sidebar (no glass). Homepage is an essay
**archive / masthead**, not a SaaS card grid. Hairline rules and spacing carry structure.

## Components & motion

- Links: olive, underlined on a restrained offset; copper on hover.
- Blockquotes: hanging indent / quiet treatment, no colored side-stripe.
- Callouts: full hairline border + faint tinted ground; icon carries the hue.
- Tags: quiet text labels, not filled accent pills.
- Code: sand ground, hairline border, small radius.
- Motion: minimal. No gradient text, no glass, no decorative blobs, no bounce.

## Bans (enforced)

Gradient text, glassmorphism-by-default, gradient/hero buttons, identical icon-card grids,
colored side-stripe borders, decorative ambient gradients, em dashes in copy.
