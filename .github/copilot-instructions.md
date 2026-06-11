# Copilot instructions, FVossebeld.github.io

This is a personal **digital garden**: a living, version-controlled wiki of Floris
Vossebeld's public thoughts. It is **content-first**. The writing is the product.

## Roles (read this first)

- **Floris is the author and editor-in-chief.** He curates sources, decides what to
  publish, and approves every change.
- **You (AI) are the assistant.** You research, draft, restructure, cross-link, and do
  bookkeeping. You do **not** ship prose that reads like a machine wrote it.

## Non-negotiable: no AI slop

All content must clear the bar in [`.github/CONTENT-QUALITY.md`](./CONTENT-QUALITY.md),
backed by the full tell catalogue in
[`.github/anti-slop-field-guide.md`](./anti-slop-field-guide.md).
Read both before writing or editing anything under `content/`. In short: no AI
tics, no fabrication, no vagueness, no padding, no em dashes; concrete, opinionated, human
prose that sounds like Floris.

The same "earn your place" rule covers **visuals**: a diagram or infographic is only
worth adding when it makes an idea faster to grasp than prose. When one does,
[`.github/DIAGRAMS.md`](./DIAGRAMS.md) is the visual quality bar (Quartz-native
techniques, the site palette, dark-mode safety). Default to no diagram.

## How work flows

- Never push to `main`. Make changes on a branch and open a pull request for review.
- Content lives in `content/` (published). `raw/` is immutable source material, read it, never edit it. `wiki/` is private synthesis, not published.
- After any content change, run the **slop-verifier** agent on the draft and include
  its verdict in the PR description. Drafts scoring below 80 stay `draft: true`.
- See [`AGENTS.md`](../AGENTS.md) for the full wiki-maintenance schema (ingest / query / lint).

## Specialized agents and skills

**Agents** (personas, in [`.github/agents/`](./agents/), pick from the agent picker):

- **`style-editor`**: rewrites a rough draft into Floris's voice. Use it to *improve*.
- **`slop-verifier`**: strict auditor. Use it to *gate*. Its verdict decides publish.
- **`wiki-librarian`**: the thin conversational front door; routes to the skills below.

**Skills** (the repeatable wiki operations, in [`.github/skills/`](./skills/), load on
demand or invoke by name):

- **`wiki-ingest`**: file a `raw/` source into `content/` pages, wire up links, open a PR.
- **`wiki-query`**: answer a question from the wiki with citations; file good answers back.
- **`wiki-lint`**: health-check the link graph (broken/missing links, orphans, stale claims).
- **`wiki-visualize`**: add a diagram/infographic to a page when it earns its place (see [`DIAGRAMS.md`](./DIAGRAMS.md)).

Rule of thumb: a *standard* is an instruction, a *role* is an agent, a repeatable
*procedure* is a skill. See [`AGENTS.md`](../AGENTS.md) for the full breakdown.

## Technical notes (rarely relevant, this repo is mostly prose)

- Renderer: Quartz v4. Build locally with `npm i && npx quartz build --serve`.
- Don't touch `quartz/` internals unless explicitly asked.
- Pages are Markdown with YAML frontmatter; `title` is required; `draft: true` hides a page.
- Link pages with `[[wiki-links]]`.
