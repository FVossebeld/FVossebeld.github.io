---
title: How this site works
description: The living-wiki / agent-memory idea behind this digital garden.
tags:
  - meta
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

<figure class="sketch-board" role="group" aria-labelledby="pub-title">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 120" width="100%" role="img" aria-labelledby="pub-title pub-desc">
<title id="pub-title">How a page gets published</title>
<desc id="pub-desc">Five stages left to right: write markdown, AI drafts on a branch, review and merge, GitHub Action builds, and site is live.</desc>
<style>
.pub-tip{fill:var(--secondary);stroke:none}
.pub-fwd{stroke:var(--secondary);stroke-width:1.5;fill:none}
.pub-h{fill:var(--darkgray);font-family:var(--bodyFont);font-size:11px;font-weight:600;text-anchor:middle}
.pub-s{fill:var(--gray);font-family:var(--bodyFont);font-size:10px;text-anchor:middle}
.pub-ha{fill:var(--light);font-family:var(--bodyFont);font-size:11px;font-weight:600;text-anchor:middle}
</style>
<rect class="sketch-node" rx="9" x="14" y="36" width="100" height="48"/>
<text class="pub-h" x="64" y="55">Write</text>
<text class="pub-s" x="64" y="70">markdown</text>
<line class="pub-fwd" x1="114" y1="60" x2="133" y2="60"/>
<polygon class="pub-tip" points="133,56 133,64 142,60"/>
<rect class="sketch-node" rx="9" x="142" y="36" width="100" height="48"/>
<text class="pub-h" x="192" y="55">AI drafts</text>
<text class="pub-s" x="192" y="70">on a branch</text>
<line class="pub-fwd" x1="242" y1="60" x2="261" y2="60"/>
<polygon class="pub-tip" points="261,56 261,64 270,60"/>
<rect class="sketch-node" rx="9" x="270" y="36" width="100" height="48"/>
<text class="pub-h" x="320" y="55">Review</text>
<text class="pub-s" x="320" y="70">and merge</text>
<line class="pub-fwd" x1="370" y1="60" x2="389" y2="60"/>
<polygon class="pub-tip" points="389,56 389,64 398,60"/>
<rect class="sketch-node" rx="9" x="398" y="36" width="100" height="48"/>
<text class="pub-h" x="448" y="55">GitHub Action</text>
<text class="pub-s" x="448" y="70">builds the site</text>
<line class="pub-fwd" x1="498" y1="60" x2="517" y2="60"/>
<polygon class="pub-tip" points="517,56 517,64 526,60"/>
<rect class="sketch-node-accent" rx="9" x="526" y="36" width="100" height="48"/>
<text class="pub-ha" x="576" y="60">Site is live</text>
</svg>
<figcaption>No database, no admin panel: just markdown in git.</figcaption>
</figure>
