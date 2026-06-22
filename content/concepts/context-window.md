---
title: Context window
status: working-theory
type: concept
description: The active space an agent reasons in, why selecting the right context is harder than enlarging the window, and why a connected source isn't the same as live context.
tags:
  - agentic-ai
  - memory
---

The context window is the active space the model reasons in: everything it can actually see this turn. The obvious framing is size, how many tokens fit. I think size is the less interesting half.

The hard part is knowing what to put in it, and that's genuinely hard. Look at how a person works: we operate on an enormous amount of implicit context, far more than we could ever write down and hand to an agent. The goal isn't to dump everything in, it's to give the model a representative space, the information a human would need to react well in the same spot. More relevant context is better. More noise isn't.

And context is not the same as a connected data source. Wiring a database to the agent doesn't mean the right facts are present when it reasons; loading the right slice into the window is what actually activates the behavior you want. That's the whole reason [[memory-promotion-pipeline|memory]] and [[federated-memory-for-enterprise-agents|federated memory]] matter: they're attempts to solve selection, not size. A bigger window doesn't save you if you can't surface the right things to fill it.
