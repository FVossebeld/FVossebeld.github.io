# FVossebeld.github.io

My personal **digital garden** — a living, version-controlled wiki where I keep public thoughts and ideas that grow over time. Live at **https://fvossebeld.github.io**.

It's built on the idea of a [living wiki as agent memory](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): I curate sources and edit; an AI agent helps with cross-referencing and upkeep. I stay in the loop and approve every change.

## How it's built

- **Renderer:** [Quartz v4](https://quartz.jzhao.xyz/) (static-site generator for digital gardens).
- **Content:** plain Markdown in [`content/`](./content).
- **Hosting:** GitHub Pages, auto-deployed by [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) on every push to `main`.
- **Agent schema:** [`AGENTS.md`](./AGENTS.md) tells AI assistants how to maintain the wiki.

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
AGENTS.md       # schema: how the AI maintains the wiki
LOG.md          # append-only changelog
quartz/         # the Quartz renderer (rarely touched)
```

## Add a page

1. Create a `.md` file under `content/` with a `title` in the frontmatter.
2. Link to other pages with `[[wiki-links]]`.
3. Commit and push to `main` — the site rebuilds automatically.
4. Use `draft: true` in frontmatter to keep a page unpublished.

## Local preview

```bash
npm i
npx quartz build --serve
# open http://localhost:8080
```

## License

- **Code** (the Quartz setup and config): MIT — see [`LICENSE.txt`](./LICENSE.txt).
- **Written content** (the prose in `content/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — reuse with attribution.
