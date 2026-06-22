---
title: Agent trace
status: working-theory
type: concept
description: The fine-grained record of a single agent run, what it's for, and why it's also the raw material a memory loop learns from.
tags:
  - agentic-ai
  - governance
---

An agent trace is the fine-grained record of a single run: what the agent saw, what it reasoned, and which tools it called, in order. It's the thing you read to answer "why did it do that," and it's how you resume a session instead of starting cold.

Keep it distinct from the [[audit-trail]]. The trace is about the agent's reasoning and is mostly for debugging and observability; the trail is about what changed in real systems and is for compliance. One explains the thinking, the other proves the outcome.

The part I find most interesting is that the trace is also feedstock. The same record that helps you debug is what a memory loop learns from: feed traces into a [[memory-promotion-pipeline|consolidation pass]] and the agent can carry forward what worked and what didn't. That's the bridge from observability into memory, and it's why I treat traces as more than a log to grep when something breaks.
