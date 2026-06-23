---
title: Audit trail
status: working-theory
type: concept
description: The durable record of what an agent changed in a system of record (action, actor, time, object, authority), distinct from the agent-trace reasoning log.
tags:
  - agentic-ai
  - governance
---

An audit trail is the governance ledger: which actor changed which object, what the action was, when, and under whose authority. The [[system-of-record|system of record]] keeps the data; the trail keeps the receipts. Compliance reads the trail. Engineers almost never do, until something breaks.

Distinct from an [[agent-trace]]. The trace is the reasoning log: what the model saw, thought, and called during a run. You debug the trace. You audit the trail. One explains the thinking; the other proves the outcome to people who weren't in the room.

Once an agent has [[write-access]], the trail is what makes that write defensible. A person who changes a record leaves a name attached. An agent has to leave at least as much: the action, the [[approval-gate|approval]] that authorized it, and the result, all in a form a human can reconstruct six months later without reopening the model. "The agent decided" is not an acceptable answer in a regulated system. The trail is the acceptable answer.

Least glamorous piece of the governance cluster. First thing a security team asks for.
