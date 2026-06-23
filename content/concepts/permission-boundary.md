---
title: Permission boundary
status: working-theory
type: concept
description: The static fence set before an agent runs, declaring what it may touch at all, and why the instinct to draw it narrow is the wrong safety move.
tags:
  - agentic-ai
  - governance
---

A permission boundary is the scope you draw before the agent starts. Not what it should do (that's the prompt), not whether a particular action needs sign-off (that's an [[approval-gate]]), not the record of what happened (that's an [[audit-trail]]). The boundary is earlier and blunter than both: the set of systems, objects, and operations the agent is physically able to reach. Everything outside is a wall, not a decision.

Concretely: a Salesforce-[[scoped-agent|scoped agent]] might have read/write on Opportunities and Tasks, read-only on Accounts, and zero access to Contacts or custom objects it doesn't need. That's the boundary. Whether it should actually move a deal to "Closed Won" without asking is the gate's job. What it changed, and on whose say-so, is the trail's job. Three primitives, three moments: boundary before, gate during, trail after.

My complaint: we draw these fences too tight. The instinct with new technology is to confine it, so most enterprise agents today can read broadly but [[write-access|write almost nothing]]. That makes them expensive search bars. The model can find the stalled deal, explain why the validation rule fires, and draft the update, but it can't commit the change. You get the cost of running the agent and still pay the full cost of doing the work by hand.

The safer default is a wider boundary with an [[approval-gate]] on the mutations that carry real risk. Let the agent read and write inside its scope. Put the gate on the actions that can hurt: a bulk data change, a customer-facing message, anything you can't [[rollback]]. Then relax the gate over time as the [[audit-trail]] shows it makes good decisions. You don't need to strangle the scope to stay safe. You need to instrument the space inside it.
