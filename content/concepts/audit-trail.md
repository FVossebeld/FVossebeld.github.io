---
title: Audit trail
status: working-theory
type: concept
description: The durable record of what an agent actually changed in real systems, distinct from a run-level trace, and why write access makes it non-negotiable.
tags:
  - agentic-ai
  - governance
---

An audit trail is the durable record of what was actually changed in real systems: who or what did it, when, to which record, and on whose say-so. It's the after-the-fact half of governance, the part compliance reads. Don't confuse it with an [[agent-trace]], which is the fine-grained log of a single run, what the agent saw, thought, and called. The trace explains the agent's reasoning and is mostly for debugging; the trail proves what happened to the business.

Once an agent has [[write-access]], the trail is what makes the write defensible. A person who files a change leaves a name attached to it, and an agent has to leave at least as much. In a regulated system, "the agent decided" is not an acceptable answer, so the trail has to carry the intent, the [[approval-gate|approval]], and the result in a form a human can reconstruct later. It's the least glamorous node in the governance cluster and the first one a security team will ask about.
