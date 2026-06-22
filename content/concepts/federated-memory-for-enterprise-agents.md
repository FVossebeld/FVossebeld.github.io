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

<figure class="sketch-board" role="group" aria-labelledby="mem-stack-title">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 365" width="100%" role="img" aria-labelledby="mem-stack-title mem-stack-desc">
<title id="mem-stack-title">Memory layers in enterprise AI</title>
<desc id="mem-stack-desc">Six memory tiers stacked vertically and widening from narrow to full width: thread, user, customer or project, team or organization, procedural, and reusable skills. Risk increases as audience scope widens.</desc>
<style>
.mst-tip{fill:var(--gray);stroke:none}
.mst-h{fill:var(--darkgray);font-family:var(--bodyFont);font-size:12px;font-weight:600;text-anchor:middle}
.mst-s{fill:var(--gray);font-family:var(--bodyFont);font-size:10px;text-anchor:middle}
.mst-ha{fill:var(--light);font-family:var(--bodyFont);font-size:12px;font-weight:600;text-anchor:middle}
.mst-sa{fill:var(--light);font-family:var(--bodyFont);font-size:10px;opacity:.8;text-anchor:middle}
</style>
<rect class="sketch-node" rx="9" x="210" y="15" width="160" height="44"/>
<text class="mst-h" x="290" y="33">Thread memory</text>
<text class="mst-s" x="290" y="48">single conversation</text>
<polygon class="mst-tip" points="287,62 293,62 290,68"/>
<rect class="sketch-node" rx="9" x="180" y="71" width="220" height="44"/>
<text class="mst-h" x="290" y="89">User memory</text>
<text class="mst-s" x="290" y="104">one person</text>
<polygon class="mst-tip" points="287,118 293,118 290,124"/>
<rect class="sketch-node" rx="9" x="140" y="127" width="300" height="44"/>
<text class="mst-h" x="290" y="145">Customer or project memory</text>
<text class="mst-s" x="290" y="160">one account</text>
<polygon class="mst-tip" points="287,174 293,174 290,180"/>
<rect class="sketch-node-accent" rx="9" x="100" y="183" width="380" height="44"/>
<text class="mst-ha" x="290" y="201">Team or organization memory</text>
<text class="mst-sa" x="290" y="216">shared context</text>
<polygon class="mst-tip" points="287,230 293,230 290,236"/>
<rect class="sketch-node" rx="9" x="50" y="239" width="480" height="44"/>
<text class="mst-h" x="290" y="257">Procedural memory</text>
<text class="mst-s" x="290" y="272">sanitized playbooks</text>
<polygon class="mst-tip" points="287,286 293,286 290,292"/>
<rect class="sketch-node-accent" rx="9" x="20" y="295" width="540" height="44"/>
<text class="mst-ha" x="290" y="313">Reusable skills</text>
<text class="mst-sa" x="290" y="328">portable execution patterns</text>
</svg>
<figcaption>Each tier up is a wider audience. The design question is keeping a memory at the lowest useful layer and only moving it up deliberately.</figcaption>
</figure>

## The threat model

The leak is rarely dramatic. It's mundane: a "helpful" lesson retrieved in tenant B that quietly encodes a fact only true in tenant A, like a customer name in an example, an internal field, a deal size, a credential pattern, the *existence* of a project that's confidential. Retrieve by similarity across a shared store and the model will happily surface exactly the cross-boundary detail you never authorised, because it's relevant. Relevance is not permission.

## What fixes it

Two things. First, memory has to be **federated**: partitioned by boundary, with retrieval **conditioned on policy**, so the query carries who's asking and in what context, and the store only returns what that context is cleared to see. Relevance alone never decides retrieval; scope does, first.

Second, every memory needs **metadata that makes the boundary enforceable**: scope, owner, provenance, sensitivity level, and expiration. Without provenance you can't audit a leak after the fact; without expiration you accumulate stale lessons nobody retired; without a sensitivity tag you can't write a retrieval rule at all.

The cleanest distinction to hold onto is between **private memory** (scoped, sensitive, stays put), **shared memory** (explicitly promoted, reviewed), and a **reusable skill** (a procedure with the anecdote stripped out). Moving between those tiers isn't automatic; it's the [[memory-promotion-pipeline|promotion pipeline]], where abstraction and review happen. This is a large part of why [[scoped-system-specialist-agents|scoped agents]] are easier to make trustworthy than broad ones: a narrow agent has fewer boundaries to leak across in the first place.
