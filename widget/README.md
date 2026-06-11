# widget/ — AG-UI chat widget (CopilotKit, React/Vite)

The public chat widget for the garden. It speaks the **AG-UI** protocol to the
hosted agent (see `agent/`) and renders streaming tokens, a generative-UI
issue-draft card, and the human-in-the-loop approve step.

## How it fits the static site

Quartz is Preact + esbuild and must never compile React. So this is an
**independent subproject** with its own toolchain:

1. `widget/` builds to a self-contained static bundle.
2. The bundle is emitted into `quartz/static/ag-ui-widget/`.
3. Quartz serves that bundle and the site mounts it as an **island** behind a
   feature toggle (off by default).

The root `npm ci` and `npx quartz build` never see this folder's React deps.
`deploy.yml` ignores `widget/**`, so editing widget source alone does not
rebuild the site; only regenerating the bundle under `quartz/static/` does.

## Status

- Phase 1: scaffold only (this README + `.gitignore`).
- Phase 2: real CopilotKit widget against a mock AG-UI endpoint, built to the
  static bundle and mounted as a toggled island.
- Phase 6: pointed at the live deployed agent (CORS + Turnstile).
