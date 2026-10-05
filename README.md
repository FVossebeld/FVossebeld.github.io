# FVossebeld.github.io

My personal **digital garden** — a living, version-controlled wiki where I keep public thoughts and ideas that grow over time. Live at **https://vossebeld.dev**.

It's built on the idea of a [living wiki as agent memory](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): I curate sources and edit; an AI agent helps with cross-referencing and upkeep. I stay in the loop and approve every change.

## How it's built

- **Renderer:** [Quartz v4](https://quartz.jzhao.xyz/) (static-site generator for digital gardens).
- **Content:** plain Markdown in [`content/`](./content).
- **Hosting:** GitHub Pages, auto-deployed by [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) on every push to `main`.
- **Agent schema:** [`AGENTS.md`](./AGENTS.md) tells AI assistants how to maintain the wiki, and how the instructions / agents / skills layers fit together.
- **Anti-slop pipeline:** [`.github/AGENTIC-PIPELINE.md`](./.github/AGENTIC-PIPELINE.md) — custom Copilot agents (`style-editor`, `slop-verifier`, `wiki-librarian`), portable skills (`wiki-ingest`, `wiki-query`, `wiki-lint`), and an automated content-quality PR review, all enforcing [`.github/CONTENT-QUALITY.md`](./.github/CONTENT-QUALITY.md).

## Repository layout

```
content/        # the published wiki (Markdown → website)
  index.md      # homepage
  about.md      # about me
  how-this-works.md
  thoughts/     # notes and ideas
  assets/       # images (put your profile photo here as profile.jpg)
raw/            # immutable source material the AI reads (not published)
wiki/           # optional private synthesis (not published)
.github/
  agents/       # personas: style-editor, slop-verifier, wiki-librarian
  skills/       # wiki operations: wiki-ingest, wiki-query, wiki-lint
  instructions/ # always-on voice/style rules for content/
  workflows/    # deploy + automated content-quality & wiki-lint checks
AGENTS.md       # schema: how the AI maintains the wiki
LOG.md          # append-only changelog
quartz/         # the Quartz renderer (rarely touched)
```

## Add a page

1. Create a `.md` file under `content/` with a `title` in the frontmatter.
2. Link to other pages with `[[wiki-links]]`.
3. Commit on a branch and open a pull request for review. After approval and merge, the site rebuilds automatically.
4. Use `draft: true` in frontmatter to keep a page unpublished.

## Local preview

```bash
npm ci
npm run quartz -- build --serve
# open http://localhost:8080
```

Use `npm test`, `npm run typecheck`, and `npm run build` before merging. These
commands use the renderer in this checkout, including its local customizations,
rather than downloading a different Quartz CLI through `npx`.

`npm run check:site` checks the built HTML for missing or case-mismatched internal
pages and assets. The PR validation workflow runs these checks before integration.

The optional `templates/bootstrap-hosted-agent-pages` app has its own dependencies
and TypeScript configuration. Run `npm ci` and `npm run build` in that folder to
validate it separately. It is excluded from the garden's TypeScript project and
does not replace this site's Pages deployment.

## License

- **Code** (the Quartz setup and config): MIT — see [`LICENSE.txt`](./LICENSE.txt).
- **Written content** (the prose in `content/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — reuse with attribution.
