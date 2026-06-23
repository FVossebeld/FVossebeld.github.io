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

That's the whole reason [[memory-promotion-pipeline|memory promotion]] and [[federated-memory-for-enterprise-agents|federated memory]] exist as problems. They solve selection: surfacing the right thing at the right time into a finite space. A bigger window doesn't help if nothing good fills it.
