---
title: Agent evaluation
status: seed
type: concept
description: How you find out whether an agent works well enough to trust with more, before you widen its permission boundary.
tags:
  - agentic-ai
  - governance
---

Evaluation is how you find out whether an agent works before you trust it with more. Not "does the model score well on a public benchmark," but "does this agent, on this system, do the right thing often enough that I'd widen its boundary." Those are different questions, and only the second one decides whether something ships.

The shape I keep landing on is staged. A new [[scoped-agent]] starts read-only: it proposes actions, a human compares each one to what they would have done, and you score the gap. Clear a bar and it gets to act, first behind an [[approval-gate]], then with the gate removed for the low-risk actions where it has earned it. You never hand over [[write-access]] on day one. Evaluation is the evidence that earns each step.

The hard part is that enterprise work has no clean answer key. "Move every stalled deal over 50k to renewals" has judgment baked into it, so there's rarely one correct output to diff against. Instead, evaluation is three things stitched together: golden tasks with known-good outcomes, human review of the [[agent-trace]] for the cases that have no obvious right answer, and [[observability]] over what the agent actually does in production. The trace is the unit you read; evaluation is the verdict you reach by reading many of them. It's one of the boring-sounding hard problems the [[from-chatbots-to-system-operators|system-operator essay]] keeps coming back to, and it's mostly unsolved.
