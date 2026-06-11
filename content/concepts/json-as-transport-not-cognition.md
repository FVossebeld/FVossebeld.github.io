---
title: JSON is transport, not cognition
description: Why JSON works as the wire format for tool calls but not as the layer an agent thinks in.
tags:
  - agentic-ai
  - tool-calling
---

JSON tool calling was the obvious next step after chat, and we reached for it because it was already everywhere and models could produce it. That's a deployment convenience, not a design decision.

The trouble is what JSON is *for*. It's built for one machine to hand structured data to another. It carries no notion of doing — no sequencing, no composition, no "if this failed, try that." Every action is a flat object the model fills in blind, then waits for a result whose shape it couldn't see in advance.

When a person operates a system, they don't write JSON. They type a command, read the output, and pipe it into the next thing. The action language and the feedback loop are the same medium. JSON tool calling splits them: the model emits a request in one language and reads results in another, with the orchestration logic living outside the model in glue code nobody enjoys writing.

So JSON is fine as the wire format — the transport. It's a poor fit as the layer the agent actually thinks in. The interesting question is what the cognition layer should be instead, and [[cli-as-compressed-action-language|the command line is a strong candidate]].
