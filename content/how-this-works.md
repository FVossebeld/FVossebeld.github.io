---
title: How this site works
description: The living-wiki / agent-memory idea behind this digital garden.
---

This site is built on a simple but powerful idea: **a living wiki that an AI helps maintain, but that I edit and control.** It's inspired by [Andrej Karpathy's "LLM Wiki" pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) and the way [digital gardens](https://quartz.jzhao.xyz/) work.

## The three layers

The garden is built in three layers, and the difference between them is *who's allowed to touch what*.

<figure role="group" aria-labelledby="layers-fig-title" aria-describedby="layers-fig-desc" style="margin:1.6rem 0;font-family:var(--bodyFont);">
  <p id="layers-fig-title" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);">The three layers and who may edit each</p>
  <p id="layers-fig-desc" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);">Raw sources are read-only inputs the AI may read but never change. The wiki is the published product, drafted by the AI and approved by me. The schema is the rulebook that governs how the AI maintains the wiki.</p>
  <div style="display:flex;flex-direction:column;gap:.55rem;">
    <div style="display:flex;align-items:center;gap:1rem;background:var(--lightgray);border-left:5px solid var(--tertiary);border-radius:8px;padding:.9rem 1.1rem;">
      <span aria-hidden="true" style="font-size:1.4rem;line-height:1;flex:none;">📥</span>
      <span style="flex:1;min-width:0;">
        <span style="display:block;font-weight:700;color:var(--dark);">Raw sources</span>
        <span style="display:block;font-size:.9rem;color:var(--gray);">Articles, notes &amp; ideas I drop in: immutable inputs.</span>
      </span>
      <span style="flex:none;font-size:.72rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--light);background:var(--tertiary);border-radius:999px;padding:.25rem .6rem;">AI reads only</span>
    </div>
    <div style="display:flex;align-items:center;gap:1rem;background:var(--lightgray);border-left:5px solid var(--secondary);border-radius:8px;padding:.9rem 1.1rem;">
      <span aria-hidden="true" style="font-size:1.4rem;line-height:1;flex:none;">🌳</span>
      <span style="flex:1;min-width:0;">
        <span style="display:block;font-weight:700;color:var(--dark);">The wiki</span>
        <span style="display:block;font-size:.9rem;color:var(--gray);">The interlinked pages you're reading, written &amp; cross-linked by the AI.</span>
      </span>
      <span style="flex:none;font-size:.72rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--light);background:var(--secondary);border-radius:999px;padding:.25rem .6rem;">AI drafts · I approve</span>
    </div>
    <div style="display:flex;align-items:center;gap:1rem;background:var(--lightgray);border-left:5px solid var(--gray);border-radius:8px;padding:.9rem 1.1rem;">
      <span aria-hidden="true" style="font-size:1.4rem;line-height:1;flex:none;">📐</span>
      <span style="flex:1;min-width:0;">
        <span style="display:block;font-weight:700;color:var(--dark);">The schema</span>
        <span style="display:block;font-size:.9rem;color:var(--gray);"><code>AGENTS.md</code>: <em>how</em> the AI maintains the wiki: conventions, linking, logging.</span>
      </span>
      <span style="flex:none;font-size:.72rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--darkgray);background:var(--light);border:1px solid var(--gray);border-radius:999px;padding:.25rem .6rem;">Governs the AI</span>
    </div>
  </div>
  <figcaption style="text-align:center;color:var(--gray);font-size:.85em;margin-top:.7rem;">Three layers, three permission levels: the schema governs how the AI turns raw sources into the wiki.</figcaption>
</figure>

## Why it's different from a normal blog

A blog is a stream. A wiki **compounds**: pages get revised as my thinking changes, contradictions get flagged, and connections between ideas become as valuable as the ideas themselves. Nothing is re-derived from scratch; the knowledge is kept current.

## Who's in the loop

I am. I curate the sources, ask the questions, and approve edits (every change is a git commit, like Wikipedia's edit history). The AI does the bookkeeping no human enjoys: summarizing, filing, and keeping links consistent.

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
