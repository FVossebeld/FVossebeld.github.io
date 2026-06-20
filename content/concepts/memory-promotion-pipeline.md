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

Raw experience shouldn't become shared knowledge automatically. It should be *promoted* through stages, losing specificity and gaining trust at each step. Each arrow below is a gate, a checkpoint a piece of knowledge has to clear before it earns a wider audience, not a default it slides through.

<figure class="sketch-board" role="group" aria-labelledby="promo-title">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 150" width="100%" role="img" aria-labelledby="promo-title promo-desc">
<title id="promo-title">The memory promotion pipeline</title>
<desc id="promo-desc">Five stages left to right: raw episode, private memory, sanitized lesson, approved playbook, and reusable skill. Each arrow is a gate. Most episodes never leave the first stage.</desc>
<style>
.prm-tip{fill:var(--secondary);stroke:none}
.prm-fwd{stroke:var(--secondary);stroke-width:1.5;fill:none}
.prm-h{fill:var(--darkgray);font-family:var(--bodyFont);font-size:11px;font-weight:600;text-anchor:middle}
.prm-s{fill:var(--gray);font-family:var(--bodyFont);font-size:9px;text-anchor:middle}
.prm-ha{fill:var(--light);font-family:var(--bodyFont);font-size:11px;font-weight:600;text-anchor:middle}
.prm-sa{fill:var(--light);font-family:var(--bodyFont);font-size:9px;opacity:.8;text-anchor:middle}
</style>
<rect class="sketch-node" rx="9" x="24" y="50" width="100" height="50"/>
<text class="prm-h" x="74" y="69">Raw episode</text>
<text class="prm-s" x="74" y="83">private detail</text>
<line class="prm-fwd" x1="124" y1="75" x2="143" y2="75"/>
<polygon class="prm-tip" points="143,71 143,79 152,75"/>
<rect class="sketch-node" rx="9" x="152" y="50" width="100" height="50"/>
<text class="prm-h" x="202" y="69">Private memory</text>
<text class="prm-s" x="202" y="83">user or tenant</text>
<line class="prm-fwd" x1="252" y1="75" x2="271" y2="75"/>
<polygon class="prm-tip" points="271,71 271,79 280,75"/>
<rect class="sketch-node" rx="9" x="280" y="50" width="100" height="50"/>
<text class="prm-h" x="330" y="69">Sanitized lesson</text>
<text class="prm-s" x="330" y="83">generalised</text>
<line class="prm-fwd" x1="380" y1="75" x2="399" y2="75"/>
<polygon class="prm-tip" points="399,71 399,79 408,75"/>
<rect class="sketch-node" rx="9" x="408" y="50" width="100" height="50"/>
<text class="prm-h" x="458" y="69">Approved playbook</text>
<text class="prm-s" x="458" y="83">reviewed</text>
<line class="prm-fwd" x1="508" y1="75" x2="527" y2="75"/>
<polygon class="prm-tip" points="527,71 527,79 536,75"/>
<rect class="sketch-node-accent" rx="9" x="536" y="50" width="100" height="50"/>
<text class="prm-ha" x="586" y="69">Reusable skill</text>
<text class="prm-sa" x="586" y="83">shareable</text>
</svg>
<figcaption>Each arrow is a gate that strips specificity and adds review. Most episodes never leave the first stage.</figcaption>
</figure>

1. **Raw episode**: what actually happened this session, with all its private detail. Stays local.
2. **Private memory**: a durable note scoped to one user or tenant. Still sensitive.
3. **Sanitized lesson**: the generalisable insight with identifying detail stripped out.
4. **Approved playbook**: a sanitized lesson a human has signed off as correct and shareable, with provenance attached.
5. **Reusable skill**: a playbook compressed into a procedure the agent reaches for by default.

Most episodes never leave the first stage, and that's the point. Promotion is exactly where abstraction and human review happen, which is exactly where leaks and bad lessons get caught. Skip the checkpoints and you've rebuilt the leaky shared store from [[federated-memory-for-enterprise-agents]].

## A worked example

Watch one fact climb the ladder:

> **Raw episode:** "Customer X's integration failed because their internal SAP field Y was misconfigured."
> **Sanitized lesson:** "In enterprise ERP integrations, validate custom field mappings before assuming an API failure."
> **Reusable skill:** "When debugging an ERP integration failure, check authentication first, then field mappings, then validation rules, then downstream workflow triggers."

Same knowledge, three boundaries. The raw episode names a customer and stays in their tenant. The lesson is true across customers and carries nobody's name. The skill is a procedure worth running by default, with the anecdote gone entirely. That's how learning happens without leaking.

## Failure modes worth naming

The pipeline can fail in predictable ways, and each is a reason a gate has to be a real check and not a rubber stamp:

- **Over-generalisation**: promoting a one-off incident into a "rule" that's wrong most of the time.
- **Hidden leakage**: identifying detail surviving sanitization (a customer name buried in an example, a field only one tenant has).
- **Wrong lessons**: a confidently-stated playbook that was a coincidence, not a cause.
- **Stale lessons**: knowledge that was true once and quietly went out of date because nothing expires it.

This is also how a workspace's raw memory turns into durable capability over time (see [[agent-workspaces]]), and it's the mechanism that makes [[federated-memory-for-enterprise-agents|federated memory]] more than just a set of walls.
