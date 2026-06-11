# Agentic content pipeline — how it works & how to turn it on

This repo uses GitHub-native AI tooling to help write and *gate* content, while keeping
Floris as the editor-in-chief. There are two layers.

## Layer 1 — Shaping (already active, no setup needed)

These files steer any GitHub Copilot agent (the cloud "coding agent" you assign to
issues, or Copilot in VS Code) the moment they're on `main`:

| File | What it does |
|---|---|
| [`.github/copilot-instructions.md`](./copilot-instructions.md) | Repo-wide charter: roles, no-slop rule, workflow. Auto-loaded by Copilot. |
| [`.github/instructions/content.instructions.md`](./instructions/content.instructions.md) | Voice + style rules, auto-applied to `content/**`. |
| [`.github/CONTENT-QUALITY.md`](./CONTENT-QUALITY.md) | The single shared quality bar (AI-tell reject list, positive bar, verdict format). |
| [`.github/agents/style-editor.agent.md`](./agents/style-editor.agent.md) | Custom agent that rewrites drafts into Floris's voice. |
| [`.github/agents/slop-verifier.agent.md`](./agents/slop-verifier.agent.md) | Custom agent that strictly audits a draft and returns a PASS/REVISE/REJECT verdict. |

**Using the custom agents:** open <https://github.com/copilot/agents> (or the agent
picker in VS Code), pick `style-editor` to improve a draft or `slop-verifier` to judge
one. They appear automatically once these files are merged to the default branch.

**Typical loop:** capture a rough thought → ask `style-editor` to shape it on a branch →
run `slop-verifier` → paste its verdict in the PR → you review and merge.

## Layer 2 — Automated PR gate (one-time setup to activate)

[`.github/workflows/content-quality-review.md`](./workflows/content-quality-review.md) is
a [GitHub Agentic Workflow](https://github.com/github/gh-aw). On every PR that touches
`content/**`, a read-only agent reads the diff, applies the quality charter, and posts a
verdict comment — an automatic anti-slop reviewer on every change.

It's committed as **source** (`.md`). GitHub Actions ignores it until you compile it into
a runnable workflow. To activate:

1. Install the extension and compile (generates `content-quality-review.lock.yml`):
   ```bash
   gh extension install github/gh-aw
   gh aw compile content-quality-review
   git add .github/workflows/content-quality-review.lock.yml && git commit -m "Compile content review workflow" && git push
   ```
2. Give it an AI engine to run with. This workflow uses `engine: copilot`, so enable
   **Copilot coding agent** for the repo (Settings → Copilot) or follow gh-aw's engine
   setup for Claude/Codex/Gemini and add the corresponding repo secret.
3. Open a test PR that edits a file under `content/` and confirm the verdict comment appears.

See the gh-aw docs for engines, secrets, and safety model: <https://github.github.com/gh-aw/>.

## Why this design

- **Human in the loop:** agents propose on branches and comment; only Floris merges.
- **Read-only by default:** the review workflow can't write to the repo except a comment
  (gh-aw `safe-outputs`).
- **One bar, everywhere:** instructions, agents, and the workflow all reference
  `CONTENT-QUALITY.md`, so the definition of "not slop" lives in exactly one place.
