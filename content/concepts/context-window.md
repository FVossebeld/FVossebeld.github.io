---
title: Context window
status: working-theory
type: concept
description: The active space an agent reasons in. The hard part is selection, not size; a connected data source is not live context.
tags:
  - agentic-ai
  - memory
---

The context window is everything the model can see this turn. Not what it could theoretically retrieve. Not what's connected. What's literally present when it reasons.

The industry obsession is size: 128K, 200K, a million tokens, whatever comes next. I think size is the less interesting constraint. The hard problem is *what goes in*. A million-token window full of the wrong documents is worse than an 8K window holding exactly the three facts that matter right now.

Think about how you work. You carry an enormous amount of implicit context into any decision: organizational politics, last week's conversation, the fact that this customer is touchy about timelines. You never write it all down. You *select*, unconsciously, the subset that's relevant to the problem in front of you. The context window is the agent's version of that subset, and the hard part is doing the selection well.

The mistake I keep seeing: people wire a database or a document store to the agent and call it "context." It isn't. A connected source is plumbing, not cognition. The agent has *access*, the way you have access to your company's entire SharePoint. Access doesn't mean the right fact is present at the moment of reasoning. Until something selects the relevant slice and loads it into the window, the connection is inert. The model attends to what's literally there this turn. Nothing else exists for it.

<figure class="sketch-board" role="group" aria-labelledby="cw-nest-title">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 240" width="100%" role="img" aria-labelledby="cw-nest-title cw-nest-desc">
<title id="cw-nest-title">Nested containment: connected sources down to the window this turn</title>
<desc id="cw-nest-desc">Three concentric rounded rectangles show that connected sources (outermost, large) contain a smaller retrievable set, which contains the tiny inner region that is actually in the window this turn. An arrow labeled "selection" points inward, showing the act that pulls relevant facts into the window.</desc>
<style>
.cwn-outer{fill:var(--lightgray);stroke:var(--gray);stroke-width:1.2}
.cwn-mid{fill:var(--light);stroke:var(--gray);stroke-width:1;stroke-dasharray:4 3}
.cwn-inner{fill:var(--secondary);stroke:none;opacity:.92}
.cwn-h{fill:var(--darkgray);font-family:var(--bodyFont);font-size:12px;font-weight:600}
.cwn-s{fill:var(--gray);font-family:var(--bodyFont);font-size:10px}
.cwn-hi{fill:var(--light);font-family:var(--bodyFont);font-size:11px;font-weight:600}
.cwn-arr{stroke:var(--tertiary);stroke-width:1.4;fill:none;marker-end:url(#cwn-tip)}
</style>
<defs>
<marker id="cwn-tip" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
<polygon points="0,0 7,3.5 0,7" style="fill:var(--tertiary)"/>
</marker>
</defs>
<rect class="cwn-outer" rx="14" x="20" y="16" width="420" height="208"/>
<text class="cwn-h" x="40" y="40">Connected sources</text>
<text class="cwn-s" x="40" y="56">SharePoint, databases, doc stores</text>
<rect class="cwn-mid" rx="11" x="80" y="72" width="300" height="138"/>
<text class="cwn-h" x="100" y="94">Retrievable</text>
<text class="cwn-s" x="100" y="109">what could be fetched</text>
<rect class="cwn-inner" rx="8" x="160" y="124" width="140" height="72"/>
<text class="cwn-hi" x="230" y="155" text-anchor="middle">In the window</text>
<text class="cwn-hi" x="230" y="171" text-anchor="middle">this turn</text>
<path class="cwn-arr" d="M480,180 C440,180 380,172 306,172"/>
<text class="cwn-s" x="490" y="176">selection</text>
<text class="cwn-s" x="490" y="192">(the hard part)</text>
<text class="cwn-s" x="490" y="56">The model attends</text>
<text class="cwn-s" x="490" y="70">only to the inner region.</text>
<text class="cwn-s" x="490" y="84">Everything else is inert.</text>
</svg>
<figcaption>Connected is not contextual. Only what selection pulls into the inner window exists for the model this turn.</figcaption>
</figure>

That's the whole reason [[memory-promotion-pipeline|memory promotion]] and [[federated-memory-for-enterprise-agents|federated memory]] exist as problems. They solve selection: surfacing the right thing at the right time into a finite space. A bigger window doesn't help if nothing good fills it.
