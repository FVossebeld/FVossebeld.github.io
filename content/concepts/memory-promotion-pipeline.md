---
title: The memory promotion pipeline
status: working-theory
type: concept
description: How raw agent experience should move through abstraction and review before it becomes shared knowledge, with a worked example and its failure modes.
tags:
  - agentic-ai
  - enterprise
  - memory
---

Raw experience shouldn't become shared knowledge automatically. It gets *promoted* through stages, shedding specificity and gaining trust at each one. Each arrow below is a gate: knowledge clears it before it earns a wider audience, or it stays put.

<figure class="sketch-board" role="group" aria-labelledby="promo-title">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 532 420" width="100%" role="img" aria-labelledby="promo-title promo-desc">
<title id="promo-title">The memory promotion pipeline</title>
<desc id="promo-desc">Five stages drawn as a descending funnel: raw episode, private memory, sanitized lesson, approved playbook, and reusable skill. Each bar is shorter than the one above it because every gate rejects most of what reaches it. Between the stages sit four labelled gates: scope to one tenant, strip identifying detail, human review and provenance, and compress to a default.</desc>
<style>
.pp-name{fill:var(--darkgray);font-family:var(--bodyFont);font-size:17px;font-weight:600;text-anchor:end}
.pp-sub{fill:var(--gray);font-family:var(--bodyFont);font-size:13px;text-anchor:end}
.pp-gate{fill:var(--secondary);font-family:var(--bodyFont);font-size:14px;font-style:italic}
.pp-arrow{stroke:var(--secondary);stroke-width:1.6;fill:none}
.pp-tip{fill:var(--secondary);stroke:none}
</style>
<text class="pp-name" x="172" y="32">Raw episode</text>
<text class="pp-sub" x="172" y="48">private detail</text>
<rect class="sketch-node" x="186" y="14" width="332" height="40"/>
<line class="pp-arrow" x1="204" y1="58" x2="204" y2="92"/>
<polygon class="pp-tip" points="200,92 208,92 204,99"/>
<text class="pp-gate" x="220" y="82">scope to one tenant</text>
<text class="pp-name" x="172" y="120">Private memory</text>
<text class="pp-sub" x="172" y="136">user or tenant</text>
<rect class="sketch-node" x="186" y="102" width="266" height="40"/>
<line class="pp-arrow" x1="204" y1="146" x2="204" y2="180"/>
<polygon class="pp-tip" points="200,180 208,180 204,187"/>
<text class="pp-gate" x="220" y="170">strip identifying detail</text>
<text class="pp-name" x="172" y="208">Sanitized lesson</text>
<text class="pp-sub" x="172" y="224">generalised</text>
<rect class="sketch-node" x="186" y="190" width="198" height="40"/>
<line class="pp-arrow" x1="204" y1="234" x2="204" y2="268"/>
<polygon class="pp-tip" points="200,268 208,268 204,275"/>
<text class="pp-gate" x="220" y="258">human review + provenance</text>
<text class="pp-name" x="172" y="296">Approved playbook</text>
<text class="pp-sub" x="172" y="312">reviewed, signed off</text>
<rect class="sketch-node" x="186" y="278" width="118" height="40"/>
<line class="pp-arrow" x1="204" y1="322" x2="204" y2="356"/>
<polygon class="pp-tip" points="200,356 208,356 204,363"/>
<text class="pp-gate" x="220" y="346">compress to a default</text>
<text class="pp-name" x="172" y="384">Reusable skill</text>
<text class="pp-sub" x="172" y="400">shareable</text>
<rect class="sketch-node-accent" x="186" y="366" width="60" height="40"/>
</svg>
<figcaption>The funnel narrows because each gate rejects most of what reaches it, not because the bars count anything. Every step strips specificity and adds review; few episodes reach the bottom.</figcaption>
</figure>

The climb is deliberate. A **raw episode** is what actually happened this session, private detail and all, and it stays local. Promote it and it becomes a **private memory**, a durable note still scoped to one user or tenant. Strip the identifying detail and you have a **sanitized lesson**, generalisable and carrying nobody's name. Once a human signs that off with provenance attached, it is an **approved playbook**. Compress the playbook into a procedure the agent reaches for by default, and it is a **reusable skill**.

Most episodes never leave the first stage. That's the point. Promotion is where abstraction and human review happen, which is where leaks and bad lessons get caught. Skip the checkpoints and you've rebuilt the leaky shared store from [[federated-memory-for-enterprise-agents]].

## What actually does the climbing

The stages are the ladder; they don't say what moves a lesson up one. For the early, unsupervised steps the answer is increasingly a consolidation pass: a background job that fires after a session goes quiet, reads the raw [[agent-trace|traces]] plus whatever's already in memory, and rewrites the store. Duplicates merged, contradictions resolved, stale entries dropped. Anthropic ships this as a feature literally called [Dreams](https://platform.claude.com/docs/en/managed-agents/dreams); the [Azure SRE agent](https://learn.microsoft.com/en-us/azure/sre-agent/memory) does the same thing about thirty minutes after a thread goes idle.

The detail I care about is where it stops. Dreams never edits the input store; it produces a candidate the agent's owner can review and discard. Same boundary as the ladder: the machine can dedupe and generalize on its own, but the step from sanitized lesson to approved playbook is still a human gate. Consolidation automates the climb right up to that line and no further. Treat it as auto-promotion past the gate and you've rebuilt the leaky shared store, just with extra steps.

## A worked example

Watch one fact climb the ladder:

> **Raw episode:** "Customer X's integration failed because their internal SAP field Y was misconfigured."
> **Sanitized lesson:** "In enterprise ERP integrations, validate custom field mappings before assuming an API failure."
> **Reusable skill:** "When debugging an ERP integration failure, check authentication first, then field mappings, then validation rules, then downstream workflow triggers."

Same knowledge, three boundaries. The raw episode names a customer and stays in their tenant. The lesson is true across customers and carries nobody's name. The skill is a procedure worth running by default, the anecdote gone entirely. Learning without leaking.

## Failure modes worth naming

Each gate exists because the pipeline fails in predictable ways:

- **Over-generalisation**: a one-off incident promoted into a "rule" that's wrong most of the time.
- **Hidden leakage**: identifying detail surviving sanitization (a customer name buried in an example, a field only one tenant has).
- **Wrong lessons**: a confidently-stated playbook that was coincidence, not cause.
- **Stale lessons**: knowledge that was true once and quietly expired because nothing retired it.

This is how a workspace's raw memory turns into durable capability over time (see [[agent-workspaces]]), and it's what makes [[federated-memory-for-enterprise-agents|federated memory]] more than a set of walls.
