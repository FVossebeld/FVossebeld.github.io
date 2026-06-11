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

It's committed as **source** (`.md`) **and compiled** (`.lock.yml` — the runnable Actions
workflow). The only thing left to make it run is the AI engine credential:

1. Add the engine secret. This workflow uses `engine: copilot`, which runs the GitHub
   Copilot CLI in Actions and requires a repo secret named **`COPILOT_GITHUB_TOKEN`** (a
   token belonging to an account with a Copilot subscription):
   ```bash
   gh secret set COPILOT_GITHUB_TOKEN --repo FVossebeld/FVossebeld.github.io
   ```
2. If you ever edit the `.md`, recompile so the `.lock.yml` stays in sync:
   ```bash
   gh aw compile content-quality-review   # or: gh aw compile (all)
   git add .github/workflows/*.lock.yml && git commit -m "Recompile workflows" && git push
   ```
3. Open a test PR that edits a file under `content/` and confirm the verdict comment appears.

See the gh-aw docs for engines, secrets, and safety model: <https://github.github.com/gh-aw/>.

## Layer 3 — Wiki maintenance (the "amazing wiki" brain)

The anti-slop layers above keep individual pages *good*; this layer keeps the *whole wiki*
healthy and interlinked, implementing the **Ingest** and **Lint** operations from the
[Karpathy LLM-wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

| File | What it does |
|---|---|
| [`.github/agents/wiki-librarian.agent.md`](./agents/wiki-librarian.agent.md) | Interactive **Ingest** agent: turns a `raw/` source into content pages, wires up `[[wikilinks]]`, updates `content/index.md` and `LOG.md`, and opens a PR. You drive it from the agent picker. |
| [`.github/workflows/wiki-lint.md`](./workflows/wiki-lint.md) | Automated **Lint** pass (compiled). Runs weekly (and on demand via *Actions → Wiki lint → Run workflow*). Maps the link graph and opens **one issue** listing broken links, orphan pages, **links that should be made**, undocumented concepts, stale/contradictory claims, and frontmatter gaps. Read-only — it only files an issue. |

This is the part that answers "check later if links need to be made": `wiki-lint` does
exactly that on a schedule, and `wiki-librarian` acts on it (or you do, by hand). Both
keep the human as the merge gate — lint only opens an issue, the librarian only opens PRs.

`wiki-lint` also needs the `COPILOT_GITHUB_TOKEN` secret (same as Layer 2) to run.

## Why this design

- **Human in the loop:** agents propose on branches and comment; only Floris merges.
- **Read-only by default:** the review workflow can't write to the repo except a comment
  (gh-aw `safe-outputs`).
- **One bar, everywhere:** instructions, agents, and the workflow all reference
  `CONTENT-QUALITY.md`, so the definition of "not slop" lives in exactly one place.
