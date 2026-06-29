---
title: Agent workspaces
status: refined
type: concept
description: Capability lives in the coupling between a model and its workspace. Give it a durable environment and behaviour changes; the two co-evolve.
tags:
  - agentic-ai
  - agent-design
---

A chatbot is stateless. Every turn it gets a transcript and produces a reply; nothing persists but the text.

An agent workspace is the opposite bet: give the model a place to stand. Files it can read and write. A shell it can run. Durable memory that outlives the turn. Around those, the smaller machinery that makes them usable: [[workspace-state|scratch state]], command history, tests the agent can run against its own output.

Once the environment is durable, behaviour changes. The agent can leave itself notes, build scratch artifacts, check what it did last time, recover from a failed step by looking at *what actually happened* instead of re-deriving from the prompt. That is the gap between answering a question and operating a system. A stateless chat starts from zero every turn. A situated agent accumulates.

<figure class="sketch-board" role="group" aria-labelledby="aws-title">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 220" width="100%" role="img" aria-labelledby="aws-title aws-desc">
<title id="aws-title">Stateless chat versus situated agent workspace</title>
<desc id="aws-desc">Two panels. Left: a model connected only to a transcript that resets each turn. Right: the same model coupled to durable workspace primitives: files, shell, memory. The coupling is where capability comes from.</desc>
<style>
.aws-h{fill:var(--darkgray);font-family:var(--bodyFont);font-size:13px;font-weight:600;text-anchor:middle}
.aws-ha{fill:var(--light);font-family:var(--bodyFont);font-size:11px;font-weight:600;text-anchor:middle}
.aws-s{fill:var(--gray);font-family:var(--bodyFont);font-size:10px;font-style:italic;text-anchor:middle}
.aws-link{stroke:var(--gray);stroke-width:1.2;fill:none}
.aws-link-a{stroke:var(--secondary);stroke-width:1.5;fill:none}
.aws-tip{fill:var(--gray);stroke:none}
.aws-tip-a{fill:var(--secondary);stroke:none}
.aws-div{stroke:var(--lightgray);stroke-width:1;stroke-dasharray:4 3;fill:none}
</style>
<text class="aws-h" x="155" y="16">Stateless chat</text>
<rect class="sketch-node" rx="8" x="90" y="28" width="130" height="40"/>
<text class="aws-h" x="155" y="52">Model</text>
<line class="aws-link" x1="155" y1="68" x2="155" y2="108"/>
<polygon class="aws-tip" points="152,105 158,105 155,112"/>
<rect class="sketch-node" rx="8" x="90" y="112" width="130" height="38"/>
<text class="aws-h" x="155" y="135">Transcript</text>
<text class="aws-s" x="155" y="170">resets each turn</text>
<line class="aws-div" x1="320" y1="6" x2="320" y2="214"/>
<text class="aws-h" x="495" y="16">Situated agent</text>
<rect class="sketch-node" rx="8" x="430" y="28" width="130" height="40"/>
<text class="aws-h" x="495" y="52">Model</text>
<line class="aws-link-a" x1="465" y1="68" x2="395" y2="118"/>
<polygon class="aws-tip-a" points="392,115 398,115 395,122"/>
<line class="aws-link-a" x1="495" y1="68" x2="495" y2="118"/>
<polygon class="aws-tip-a" points="492,115 498,115 495,122"/>
<line class="aws-link-a" x1="525" y1="68" x2="595" y2="118"/>
<polygon class="aws-tip-a" points="592,115 598,115 595,122"/>
<rect class="sketch-node-accent" rx="8" x="355" y="122" width="80" height="36"/>
<text class="aws-ha" x="395" y="144">Files</text>
<rect class="sketch-node-accent" rx="8" x="455" y="122" width="80" height="36"/>
<text class="aws-ha" x="495" y="144">Shell</text>
<rect class="sketch-node-accent" rx="8" x="555" y="122" width="80" height="36"/>
<text class="aws-ha" x="595" y="144">Memory</text>
<text class="aws-s" x="495" y="180">persists</text>
</svg>
<figcaption>Same model on both sides. The gap in useful output traces to the right: a durable environment the model can read, write, and return to.</figcaption>
</figure>

I keep seeing the same structure. Copilot CLI works in a real checkout with a terminal and a test runner. Cursor gets the developer's directory and a shell. Claude Code gets a sandbox it can fork and roll back. The models underneath are from the same generation, give or take. The gap in useful output traces to the environment at least as much as to the weights.

I want to be careful not to overstate that. The model still matters. But **model and environment co-evolve**. A weak model needs rigid schemas and narrow tool calls; you cannot hand it a shell. A stronger model (better at planning, better at recovering from its own mistakes) can operate a messier workspace, and the workspace is what turns that reasoning into durable work instead of a clever transcript. When a new release "feels much more capable," both usually moved at once: the weights got better at reasoning and recovery, and someone finally gave them a persistent environment to reason *in*.

<blockquote style="margin:1.5rem 0;padding:.6rem 0 .6rem 1.4rem;border-left:4px solid var(--tertiary);font-family:var(--headerFont);font-size:1.3rem;line-height:1.4;color:var(--dark);font-style:italic;">
  Capability is in the coupling.
  <footer style="margin-top:.5rem;font-family:var(--bodyFont);font-size:.85rem;font-style:normal;color:var(--gray);">
    - agent workspaces
  </footer>
</blockquote>

Which is why [[cli-as-compressed-action-language|the shell]] matters as the way in, why the next questions are about [[scoped-system-specialist-agents|where you point the workspace]] and [[federated-memory-for-enterprise-agents|what it's allowed to remember]].
