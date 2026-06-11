# Copilot instructions — FVossebeld.github.io

This is a personal **digital garden**: a living, version-controlled wiki of Floris
Vossebeld's public thoughts. It is **content-first**. The writing is the product.

## Roles (read this first)

- **Floris is the author and editor-in-chief.** He curates sources, decides what to
  publish, and approves every change.
- **You (AI) are the assistant.** You research, draft, restructure, cross-link, and do
  bookkeeping. You do **not** ship prose that reads like a machine wrote it.

## Non-negotiable: no AI slop

All content must clear the bar in [`.github/CONTENT-QUALITY.md`](./CONTENT-QUALITY.md).
Read that file before writing or editing anything under `content/`. In short: no AI
tics, no fabrication, no vagueness, no padding; concrete, opinionated, human prose that
sounds like Floris.

## How work flows

- Never push to `main`. Make changes on a branch and open a pull request for review.
- Content lives in `content/` (published). `raw/` is immutable source material —
  read it, never edit it. `wiki/` is private synthesis, not published.
- After any content change, run the **slop-verifier** agent on the draft and include
  its verdict in the PR description. Drafts scoring below 80 stay `draft: true`.
- See [`AGENTS.md`](../AGENTS.md) for the full wiki-maintenance schema (ingest / query / lint).

## Specialized agents

- **`style-editor`** — rewrites a rough draft into Floris's voice. Use it to *improve*.
- **`slop-verifier`** — strict auditor. Use it to *gate*. Its verdict decides publish.

(Definitions in [`.github/agents/`](./agents/).)

## Technical notes (rarely relevant — this repo is mostly prose)

- Renderer: Quartz v4. Build locally with `npm i && npx quartz build --serve`.
- Don't touch `quartz/` internals unless explicitly asked.
- Pages are Markdown with YAML frontmatter; `title` is required; `draft: true` hides a page.
- Link pages with `[[wiki-links]]`.
