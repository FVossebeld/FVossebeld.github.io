---
title: Federated memory for enterprise agents
status: working-theory
type: concept
description: "Letting agents learn from experience without leaking across users, teams, projects, or customers: a taxonomy, a threat model, and the metadata every memory needs."
tags:
  - agentic-ai
  - enterprise
  - memory
---

An agent that never learns from a job stays a tool forever. An agent that learns by absorbing everything it touches will, sooner or later, carry one customer's data into another customer's session. Enterprise memory has to sit between those two failures: get better over time without leaking across the boundaries that matter.

The reason it's hard is that the valuable lesson and the sensitive detail arrive in the *same* episode. "Last time this customer's integration failed, the fix was X" is worth remembering. The customer's name, data, and credentials are not things to carry into the next customer's session. Naive memory, where you dump every transcript into one store and retrieve by similarity, hands you the lesson and the leak together. So the real question isn't "how do we remember more?" It's **"how does an agent generalize a useful lesson without carrying private detail across a boundary?"**

## Memory isn't one thing

"Memory" used as a single word hides the whole problem. It's a stack of layers, each with different access rules:

- **Thread memory**: the current conversation. Evaporates or stays local.
- **User memory**: preferences and history for one person.
- **Project / customer memory**: scoped to one engagement or account.
- **Team / organization memory**: shared, and therefore the dangerous tier.
- **Procedural memory & reusable skills**: *how* to do something, ideally with no specific *who* attached.

Each layer up is a wider audience. The work is keeping a memory at the lowest layer that's still useful, and only moving it up deliberately.

<figure class="editorial-plate creative-figure memory-figure" aria-labelledby="mem-stack-title" aria-describedby="mem-stack-caption">
<div class="plate-tab">MEMORY / BOUNDARIES</div>
<div class="plate-body">
<p class="plate-claim" id="mem-stack-title">Keep the lesson inside its boundary.</p>
<div class="memory-audiences"><span class="memory-direction">Wider audience</span><div class="memory-audience"><strong>Thread</strong><span>single conversation</span></div><div class="memory-audience"><strong>User</strong><span>one person</span></div><div class="memory-audience"><strong>Customer or project</strong><span>one account</span></div><div class="memory-audience"><strong>Team or organization</strong><span>shared context</span></div></div>
<div class="memory-knowhow"><p class="plate-apparatus">A DIFFERENT DIMENSION / REUSABLE KNOW-HOW</p><div><strong>Procedural memory</strong><span>sanitized playbooks</span></div><div><strong>Reusable skills</strong><span>portable execution patterns</span></div></div>
</div>
<figcaption class="plate-source" id="mem-stack-caption">Wider sharing creates more opportunities for leakage. Keep memory at the lowest useful scope; promotion is deliberate and sharing requires review. Audience scope and reusable procedures are different dimensions. Working taxonomy, not a size scale.</figcaption>
</figure>

## The threat model

The leak is rarely dramatic. It's mundane: a "helpful" lesson retrieved in tenant B that quietly encodes a fact only true in tenant A, like a customer name in an example, an internal field, a deal size, a credential pattern, the *existence* of a project that's confidential. Retrieve by similarity across a shared store and the model will happily surface exactly the cross-boundary detail you never authorised, because it's relevant. Relevance is not permission.

## What fixes it

Two things. First, memory has to be **federated**: partitioned by boundary, with retrieval **conditioned on policy**, so the query carries who's asking and in what context, and the store only returns what that context is cleared to see. Relevance alone never decides retrieval; scope does, first.

Second, every memory needs **metadata that makes the boundary enforceable**: scope, owner, provenance, sensitivity level, and expiration. Without provenance you can't audit a leak after the fact. Without expiration you accumulate stale lessons nobody retired, which is exactly the cleanup a [[memory-promotion-pipeline|consolidation pass]] automates. Without a sensitivity tag you can't write a retrieval rule at all.

In practice I think about three tiers: **private memory** (scoped, sensitive, stays put), **shared memory** (explicitly promoted, reviewed), and a **reusable skill** (a procedure with the anecdote stripped out). Moving between them isn't automatic; it's the [[memory-promotion-pipeline|promotion pipeline]], where abstraction and review happen. And this is why [[scoped-system-specialist-agents|scoped agents]] are easier to make trustworthy than broad ones: a narrow agent has fewer boundaries to leak across in the first place.
