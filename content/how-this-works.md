---
title: How this site works
description: The living-wiki / agent-memory idea behind this digital garden.
---

This site is built on a simple but powerful idea: **a living wiki that an AI helps maintain, but that I edit and control.** It's inspired by [Andrej Karpathy's "LLM Wiki" pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) and the way [digital gardens](https://quartz.jzhao.xyz/) work.

## The three layers

1. **Raw sources** — articles, notes, and ideas I drop in. Immutable inputs; the AI reads them but never rewrites them.
2. **The wiki** — the interlinked markdown pages you're reading now. The AI helps write and cross-reference these; **I review and approve every change.**
3. **The schema** — an `AGENTS.md` file in the repo that tells the AI *how* to maintain the wiki (conventions, when to link, how to log changes).

## Why it's different from a normal blog

A blog is a stream. A wiki **compounds**: pages get revised as my thinking changes, contradictions get flagged, and connections between ideas become as valuable as the ideas themselves. Nothing is re-derived from scratch — the knowledge is kept current.

## Who's in the loop

I am. 🧑‍✈️ I curate the sources, ask the questions, and approve edits (every change is a git commit, like Wikipedia's edit history). The AI does the bookkeeping no human enjoys — summarizing, filing, and keeping links consistent.

## It's all open

- The content and the renderer ([Quartz](https://quartz.jzhao.xyz/)) live in **one public repo**: [FVossebeld/FVossebeld.github.io](https://github.com/FVossebeld/FVossebeld.github.io).
- Every page has a full version history.
- Anyone can propose an edit via pull request — I merge what I agree with.

## How a page gets published

```
write/update a .md file  →  (AI helps on a branch)  →  I review & merge  →  GitHub Action builds  →  site is live
```

No database, no admin panel — just markdown in git.
