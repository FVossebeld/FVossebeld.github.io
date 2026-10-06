---
title: How this site works
description: The living-wiki / agent-memory idea behind this digital garden.
tags:
  - meta
---

This site is built on a simple but powerful idea: **a living wiki that an AI helps maintain, but that I edit and control.** It's inspired by [Andrej Karpathy's "LLM Wiki" pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) and the way [digital gardens](https://quartz.jzhao.xyz/) work.

## The three layers

The garden is built in three layers, and the difference between them is _who's allowed to touch what_.

<figure class="editorial-plate" aria-labelledby="layers-fig-title" aria-describedby="layers-fig-caption">
<div class="plate-tab">GARDEN / EDITING RIGHTS</div>
<div class="plate-body">
<p class="plate-claim" id="layers-fig-title">Different layers. Different permissions.</p>
<div class="plate-flow"><div class="plate-node "><strong>Raw sources</strong><span>Articles, notes and ideas: immutable inputs.</span></div><p class="plate-apparatus">AI reads only</p><div class="plate-node "><strong>The wiki</strong><span>The interlinked published pages.</span></div><p class="plate-apparatus">AI drafts &middot; I approve</p><div class="plate-node "><strong>The schema</strong><span><code>AGENTS.md</code>: conventions, linking, logging.</span></div><p class="plate-apparatus">Governs the AI</p></div>
</div>
<figcaption class="plate-source" id="layers-fig-caption">The schema governs how the AI turns raw sources into the wiki.</figcaption>
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

<figure class="editorial-plate" aria-labelledby="pub-title" aria-describedby="pub-caption">
<div class="plate-tab">PUBLISHING / REVIEW GATE</div>
<div class="plate-body">
<p class="plate-claim" id="pub-title">Review comes before publication.</p>
<ol class="plate-sequence"><li><div class="plate-node "><strong>Write</strong><span>markdown</span></div></li><li><div class="plate-node "><strong>AI drafts</strong><span>on a branch</span></div><div class="plate-gate plate-accent--speech">&#8595; human review</div></li><li><div class="plate-node "><strong>Review</strong><span>and merge</span></div></li><li><div class="plate-node "><strong>GitHub Action</strong><span>builds the site</span></div></li><li><div class="plate-node "><strong>Site is live</strong></div></li></ol>
</div>
<figcaption class="plate-source" id="pub-caption">No database, no admin panel: just markdown in git.</figcaption>
</figure>
