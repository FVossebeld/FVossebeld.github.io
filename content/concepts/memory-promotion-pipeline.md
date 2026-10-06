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

<figure class="editorial-plate" aria-labelledby="promo-title" aria-describedby="promo-caption">
<div class="plate-tab">MEMORY / PROMOTION GATES</div>
<div class="plate-body">
<p class="plate-claim" id="promo-title">Every promotion has a gate.</p>
<ol class="plate-sequence"><li><div class="plate-node"><strong>Raw episode</strong><span>private detail</span></div><div class="plate-gate">&#8595; scope to one tenant</div></li><li><div class="plate-node"><strong>Private memory</strong><span>user or tenant</span></div><div class="plate-gate">&#8595; strip identifying detail</div></li><li><div class="plate-node"><strong>Sanitized lesson</strong><span>generalised</span></div><div class="plate-gate plate-accent--speech">&#8595; human review + provenance</div></li><li><div class="plate-node"><strong>Approved playbook</strong><span>reviewed, signed off</span></div><div class="plate-gate">&#8595; compress the playbook into a skill</div></li><li><div class="plate-node"><strong>Reusable skill</strong><span>shareable</span></div></li></ol><p class="plate-caveat">A blocked gate leaves the lesson at its current stage. No implied pass rate.</p>
</div>
<figcaption class="plate-source" id="promo-caption">Scope the episode, remove identifying detail, review the lesson, then compress the playbook into a skill. Most episodes stay local. Working promotion pipeline.</figcaption>
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
