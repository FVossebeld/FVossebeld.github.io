---
description: Style and quality rules for everything under content/
applyTo: "content/**/*.md"
---

# Writing rules for published content

Before editing any file here, read [`../CONTENT-QUALITY.md`](../CONTENT-QUALITY.md). These
are the content-specific rules layered on top.

## Voice (tune this section over time)

Write as **Floris**, in the first person. The target voice is:

- **Direct and plain.** Say the thing. No throat-clearing intros.
- **Opinionated.** It's fine — encouraged — to take a side and say "I think".
- **Concrete.** Ground claims in specific examples, tools, numbers, and lived experience.
- **A little dry.** Understatement over hype. Earned wit, not jokes-for-jokes'-sake.
- **Unpadded.** Short by default. Cut anything that doesn't carry weight.

> Edit the bullets above as the real voice emerges. The more specific this gets
> (favorite words, banned words, sentence habits, sample paragraphs you love), the
> better every agent will match it.

## Mechanics

- `title` frontmatter is required. Add `description` and `tags` when useful.
- New or unfinished pieces start with `draft: true` and only lose it after passing review.
- Link related pages with `[[wiki-links]]`. Prefer linking to inventing a new term twice.
- Keep headings sentence-case. Don't decorate headings with emoji.
- Cite sources for factual claims (link, or reference a file in `raw/`).

## Definition of done for a content PR

1. Reads like a person with a point of view wrote it.
2. Passes [`../CONTENT-QUALITY.md`](../CONTENT-QUALITY.md) (score >= 80).
3. `slop-verifier` verdict is pasted in the PR description.
4. Floris has the final merge.
