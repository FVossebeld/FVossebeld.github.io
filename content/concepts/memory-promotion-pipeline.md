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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" width="100%" role="img" aria-labelledby="promo-title promo-desc">
<title id="promo-title">The memory promotion pipeline</title>
<desc id="promo-desc">Five stages drawn as a descending bar chart: raw episode, private memory, sanitized lesson, approved playbook, and reusable skill. Bar length shows how many episodes survive to each stage, so the bars shrink downward; most never leave the first stage. Between the stages sit four labelled gates: scope to one tenant, strip identifying detail, human review and provenance, and compress to a default.</desc>
<style>
.pp-name{fill:var(--darkgray);font-family:var(--bodyFont);font-size:14px;font-weight:600}
.pp-sub{fill:var(--gray);font-family:var(--bodyFont);font-size:11px}
.pp-gate{fill:var(--secondary);font-family:var(--bodyFont);font-size:11px;font-style:italic}
.pp-arrow{stroke:var(--secondary);stroke-width:1.4;fill:none}
.pp-tip{fill:var(--secondary);stroke:none}
.pp-axis{stroke:var(--lightgray);stroke-width:1}
</style>
<line class="pp-axis" x1="248" y1="8" x2="248" y2="412"/>
<text class="pp-name" x="14" y="31">Raw episode</text>
<text class="pp-sub" x="14" y="46">private detail</text>
<rect class="sketch-node" x="248" y="14" width="376" height="40"/>
<line class="pp-arrow" x1="266" y1="58" x2="266" y2="92"/>
<polygon class="pp-tip" points="262,92 270,92 266,99"/>
<text class="pp-gate" x="282" y="82">scope to one tenant</text>
<text class="pp-name" x="14" y="119">Private memory</text>
<text class="pp-sub" x="14" y="134">user or tenant</text>
<rect class="sketch-node" x="248" y="102" width="300" height="40"/>
<line class="pp-arrow" x1="266" y1="146" x2="266" y2="180"/>
<polygon class="pp-tip" points="262,180 270,180 266,187"/>
<text class="pp-gate" x="282" y="170">strip identifying detail</text>
<text class="pp-name" x="14" y="207">Sanitized lesson</text>
<text class="pp-sub" x="14" y="222">generalised</text>
<rect class="sketch-node" x="248" y="190" width="224" height="40"/>
<line class="pp-arrow" x1="266" y1="234" x2="266" y2="268"/>
<polygon class="pp-tip" points="262,268 270,268 266,275"/>
<text class="pp-gate" x="282" y="258">human review + provenance</text>
<text class="pp-name" x="14" y="295">Approved playbook</text>
<text class="pp-sub" x="14" y="310">reviewed, signed off</text>
<rect class="sketch-node" x="248" y="278" width="140" height="40"/>
<line class="pp-arrow" x1="266" y1="322" x2="266" y2="356"/>
<polygon class="pp-tip" points="262,356 270,356 266,363"/>
<text class="pp-gate" x="282" y="346">compress to a default</text>
<text class="pp-name" x="14" y="383">Reusable skill</text>
<text class="pp-sub" x="14" y="398">shareable</text>
<rect class="sketch-node-accent" x="248" y="366" width="76" height="40"/>
</svg>
<figcaption>Bar length is how many episodes survive to each stage, so the funnel narrows downward. Each gate strips specificity and adds review; most never leave the first stage.</figcaption>
</figure>

The climb is deliberate. A **raw episode** is what actually happened this session, private detail and all, and it stays local. Promote it and it becomes a **private memory**, a durable note still scoped to one user or tenant. Strip the identifying detail and you have a **sanitized lesson**, generalisable and carrying nobody's name. Once a human signs that off with provenance attached, it is an **approved playbook**. Compress the playbook into a procedure the agent reaches for by default, and it is a **reusable skill**.

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
