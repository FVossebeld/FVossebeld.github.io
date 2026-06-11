---
description: Style and quality rules for everything under content/
applyTo: "content/**/*.md"
---

# Writing rules for published content

Before editing any file here, read [`../CONTENT-QUALITY.md`](../CONTENT-QUALITY.md) and its
companion [`../anti-slop-field-guide.md`](../anti-slop-field-guide.md) (the full tell
catalogue). These are the content-specific rules layered on top.

## Voice (tune this section over time)

Write as **Floris**, in the first person. The target voice is:

- **Direct and plain.** Say the thing. No throat-clearing intros.
- **Opinionated.** It's fine, encouraged, to take a side and say "I think".
- **Concrete.** Ground claims in specific examples, tools, numbers, and lived experience.
- **A little dry.** Understatement over hype. Earned wit, not jokes-for-jokes'-sake.
- **Unpadded.** Short by default. Cut anything that doesn't carry weight.

> Edit the bullets above as the real voice emerges. The more specific this gets
> (favorite words, banned words, sentence habits, sample paragraphs you love), the
> better every agent will match it.

## Thoughts vs concepts (what goes where)

Two folders under `content/`, split by what a page *does*, not by how long or how
finished it is.

- **`concepts/` is a noun.** One subject, taken apart on its own page, written to be
  linked from many places ("JSON is transport, not cognition", "federated memory"). A
  concept can be opinionated, and it can have internal structure (a multi-step mechanism
  is still one concept). It stays about its one subject: you sharpen it over time, you
  don't repurpose it. Other pages point *at* it.
- **`thoughts/` is a take.** Your synthesis at a point in time: an argument that threads
  several concepts together ("from chatbots to system operators"), or a more human field
  note (what a project or a demo taught you). It has a thesis and an arc, and it's
  provisional: when your view shifts a lot, the thought gets reworked or superseded.

Both kinds are living documents and both get revised. The difference is **scope and
role, not permanence.** A concept evolves by getting sharper about its one subject; a
thought evolves by re-drawing the connections.

The test when you're unsure:

- Would several different essays naturally link to this page? → **concept**.
- Does it only make sense as "here's how I'm connecting things right now", or is it a
  personal reflection? → **thought**.

Watch the edges:

- An opinion does not make a page a thought. Concepts take sides too.
- Internal sequence inside a page does not make it a thought. Spanning several
  *independent* subjects does.
- The same material can go either way. A page that *defines* "scoped agents" is a
  concept; a page that *argues* "omniscient agents are a trap" is a thought. File by what
  the page is doing, not by its topic.

When one source could seed both, the usual shape is a single thought that names the
pattern and links out to the concept pages it leans on (the system-operators essay and
the `concepts/` cluster under it are the worked example).

## Mechanics

- `title` frontmatter is required. Add `description` and `tags` when useful.
- New or unfinished pieces start with `draft: true` and only lose it after passing review.
- Link related pages with `[[wiki-links]]`. Prefer linking to inventing a new term twice.
- Keep headings sentence-case. Don't decorate headings with emoji.
- **No em dashes.** Use a comma, a colon, parentheses, or a full stop instead. Em-dash
  overuse is itself an AI tell (field guide family P).
- Cite sources for factual claims (link, or reference a file in `raw/`).
- Add a **visual** only when it makes an idea faster to grasp than prose, never as
  decoration. When it does, follow [`../DIAGRAMS.md`](../DIAGRAMS.md) (the visual quality
  bar) or invoke the `wiki-visualize` skill. Default to no diagram.

## Definition of done for a content PR

1. Hunted the draft against the sixteen tell-families in
   [`../anti-slop-field-guide.md`](../anti-slop-field-guide.md) and removed every hit
   *before* proposing. No em dashes, no fabricated facts.
2. Reads like a person with a point of view wrote it.
3. Passes [`../CONTENT-QUALITY.md`](../CONTENT-QUALITY.md) (score >= 80).
4. `slop-verifier` verdict is pasted in the PR description.
5. Floris has the final merge.
