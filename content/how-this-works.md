---
title: How this site works
description: The living-wiki / agent-memory idea behind this digital garden.
---

This site is built on a simple but powerful idea: **a living wiki that an AI helps maintain, but that I edit and control.** It's inspired by [Andrej Karpathy's "LLM Wiki" pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) and the way [digital gardens](https://quartz.jzhao.xyz/) work.

## The three layers

The garden is built in three layers, and the difference between them is _who's allowed to touch what_.

<figure class="layers" role="group" aria-labelledby="layers-fig-title" aria-describedby="layers-fig-desc">
  <p id="layers-fig-title" class="sr-only">The three layers and who may edit each</p>
  <p id="layers-fig-desc" class="sr-only">Raw sources are read-only inputs the AI may read but never change. The wiki is the published product, drafted by the AI and approved by me. The schema is the rulebook that governs how the AI maintains the wiki.</p>
  <ol class="layer-list">
    <li>
      <span class="layer-name">Raw sources</span>
      <span class="layer-desc">Articles, notes &amp; ideas I drop in: immutable inputs.</span>
      <span class="layer-perm">AI reads only</span>
    </li>
    <li>
      <span class="layer-name">The wiki</span>
      <span class="layer-desc">The interlinked pages you're reading, written &amp; cross-linked by the AI.</span>
      <span class="layer-perm">AI drafts · I approve</span>
    </li>
    <li>
      <span class="layer-name">The schema</span>
      <span class="layer-desc"><code>AGENTS.md</code>: <em>how</em> the AI maintains the wiki: conventions, linking, logging.</span>
      <span class="layer-perm">Governs the AI</span>
    </li>
  </ol>
  <figcaption>Three layers, three permission levels: the schema governs how the AI turns raw sources into the wiki.</figcaption>
</figure>

## Why it's different from a normal blog

A blog is a stream. A wiki **compounds**: pages get revised as my thinking changes, contradictions get flagged, and connections between ideas become as valuable as the ideas themselves. Nothing is re-derived from scratch; the knowledge is kept current.

## Who's in the loop

I am. 🧑‍✈️ I curate the sources, ask the questions, and approve edits (every change is a git commit, like Wikipedia's edit history). The AI does the bookkeeping no human enjoys: summarizing, filing, and keeping links consistent.

## It's all open

- The content and the renderer ([Quartz](https://quartz.jzhao.xyz/)) live in **one public repo**: [FVossebeld/FVossebeld.github.io](https://github.com/FVossebeld/FVossebeld.github.io).
- Every page has a full version history.
- Anyone can propose an edit via pull request; I merge what I agree with.

## How a page gets published

```mermaid
flowchart LR
  A[Write or update<br/>a markdown file] --> B[AI drafts<br/>on a branch]
  B --> C[I review<br/>and merge]
  C --> D[GitHub Action<br/>builds the site]
  D --> E[Site is live]
```

No database, no admin panel: just markdown in git.
