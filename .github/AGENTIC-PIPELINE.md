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

## Layer 2 — Automated PR gate (active)

[`.github/workflows/content-quality-review.md`](./workflows/content-quality-review.md) is
a [GitHub Agentic Workflow](https://github.com/github/gh-aw). On every PR that touches
`content/**`, a read-only agent reads the diff, applies the quality charter, and posts a
verdict comment — an automatic anti-slop reviewer on every change.

It's committed as **source** (`.md`) **and compiled** (`.lock.yml` — the runnable Actions
workflow), and it's **already active** — no secret required.

### How it authenticates (the `copilot-requests` approach)

This workflow uses `engine: copilot` (the GitHub Copilot CLI inside Actions). Instead of a
personal access token, it authenticates with the **per-run GitHub Actions token** by
declaring this in the workflow frontmatter:

```yaml
permissions:
  contents: read
  copilot-requests: write   # ← lets the Copilot engine bill inference to the repo's Copilot access
```

When `copilot-requests: write` is present, `gh aw compile` wires the engine to
`COPILOT_GITHUB_TOKEN: ${{ github.token }}` automatically — **no `COPILOT_GITHUB_TOKEN`
repo secret is needed**, and any secret you do set is ignored. This is the recommended path
(gh-aw auth reference) and it works on a **personal** repo, not just org repos — verified
green in [run 27351167354](https://github.com/FVossebeld/FVossebeld.github.io/actions/runs/27351167354).
It requires a recent gh-aw version (v0.62.5 did **not** support it; v0.79.x does — re-run
`gh aw compile` after upgrading the extension with `gh extension upgrade gh-aw`).

To keep things in sync after editing any `.md` workflow:
```bash
gh aw compile                # recompile all workflows
git add .github/workflows/*.lock.yml .github/aw && git commit -m "Recompile workflows" && git push
```
Then open a test PR that edits a file under `content/` and confirm the verdict comment appears.

### Fallback: PAT secret (only if `copilot-requests` is unavailable)

If you're pinned to an old gh-aw version that lacks `copilot-requests`, you can instead set a
repo secret named **`COPILOT_GITHUB_TOKEN`** to a **fine-grained PAT** (`github_pat_…`) from a
Copilot-enabled account. The token needs the account-level **"Copilot Requests"** permission
(`read`) — a plain token *without* it passes gh-aw's format check but is rejected by the
Copilot CLI at startup with `No authentication information found`, which is the failure this
repo hit before switching to the permission-based path. OAuth (`gho_…`) and classic tokens are
rejected outright. Pre-filled create link:
<https://github.com/settings/personal-access-tokens/new?name=COPILOT_GITHUB_TOKEN&description=gh-aw+Copilot+engine&user_copilot_requests=read>
then `gh secret set COPILOT_GITHUB_TOKEN --repo FVossebeld/FVossebeld.github.io`.

See the gh-aw docs for engines, auth, and safety model: <https://github.github.com/gh-aw/>.

## Layer 3 — Wiki maintenance (the "amazing wiki" brain)

The anti-slop layers above keep individual pages *good*; this layer keeps the *whole wiki*
healthy and interlinked, implementing the **Ingest**, **Query**, and **Lint** operations
from the [Karpathy LLM-wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

The three operations are implemented as **Agent Skills** (portable across the Copilot CLI,
VS Code, and cloud agents), with a thin agent as the conversational front door and a
scheduled workflow for the automated lint:

| File | Kind | What it does |
|---|---|---|
| [`.github/skills/wiki-ingest/SKILL.md`](./skills/wiki-ingest/SKILL.md) | Skill | **Ingest**: turns a `raw/` source into content pages, wires up `[[wikilinks]]`, updates `content/index.md` and `LOG.md`, opens a PR. |
| [`.github/skills/wiki-query/SKILL.md`](./skills/wiki-query/SKILL.md) | Skill | **Query**: answers a question from the wiki with citations, and offers to file good answers back as new pages so explorations compound. |
| [`.github/skills/wiki-lint/SKILL.md`](./skills/wiki-lint/SKILL.md) | Skill | **Lint** (interactive): maps the link graph and reports — or, on request, fixes via a PR — broken/missing links, orphans, undocumented concepts, stale claims. |
| [`.github/skills/wiki-visualize/SKILL.md`](./skills/wiki-visualize/SKILL.md) | Skill | **Visualize**: adds a diagram/infographic to a page when it earns its place (opt-in, human-approved). Quartz-native techniques + styling rules live in [`.github/DIAGRAMS.md`](./DIAGRAMS.md). Called by `wiki-ingest`. |
| [`.github/agents/wiki-librarian.agent.md`](./agents/wiki-librarian.agent.md) | Agent | Thin persona / front door: understands what Floris wants and routes to the three skills, keeping him in the loop. |
| [`.github/workflows/wiki-lint.md`](./workflows/wiki-lint.md) | Workflow | Automated **Lint** pass (compiled). Runs weekly (and on demand via *Actions → Wiki lint → Run workflow*). Read-only — opens **one issue** with a prioritised checklist. |

This is the part that answers "check later if links need to be made": the `wiki-lint`
workflow does exactly that on a schedule, the `wiki-lint` skill does the deeper interactive
version, and `wiki-librarian` (or you) acts on it. Both keep the human as the merge gate —
the workflow only opens an issue, the skills only open PRs.

`wiki-lint` (the workflow) authenticates the same way as Layer 2 — via `copilot-requests: write`
in its frontmatter (the Actions token), so it needs **no secret** either.

### Why skills, not just agents?

A quick map of the three mechanisms, because they're easy to confuse:

- **Instructions** (`copilot-instructions.md`, `instructions/*.instructions.md`) — always-on
  *standards*. Text only. Always loaded (or by glob).
- **Agents** (`agents/*.agent.md`) — *personas* with their own tools/instructions. Loaded
  when you switch to them.
- **Skills** (`skills/<name>/SKILL.md`) — *reusable procedures*. Open standard, portable
  across CLI / VS Code / cloud, loaded on demand.

The Karpathy operations are repeatable procedures, so they're skills. The reviewer and
editor roles are personas, so they're agents. The charter and voice are standards, so
they're instructions. See [`AGENTS.md`](../AGENTS.md) for the same breakdown in a table.

## Why this design

- **Human in the loop:** agents propose on branches and comment; only Floris merges.
- **Read-only by default:** the review workflow can't write to the repo except a comment
  (gh-aw `safe-outputs`).
- **One bar, everywhere:** instructions, agents, and the workflow all reference
  `CONTENT-QUALITY.md`, so the definition of "not slop" lives in exactly one place.
