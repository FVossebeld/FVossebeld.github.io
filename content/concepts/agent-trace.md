---
title: Agent trace
status: working-theory
type: concept
description: The step-by-step record of how an agent reached an action, and why it doubles as raw material for memory.
tags:
  - agentic-ai
  - governance
---

An agent trace is the step-by-step record of how an agent reached an action: the prompts it received, the tool calls it made, the intermediate results, the branch it picked at each fork. You read it when the agent did something wrong and you need to know why.

Keep it distinct from the [[audit-trail]]. The trace records the agent's internal path (what it saw, tried, chose). The trail records the effect on real systems (what changed, when, who approved it). You debug the trace. You audit the trail. They often share a run ID but serve different readers: the trace is for the builder, the trail is for compliance.

What I keep coming back to is that the trace is also feedstock. The same record that helps me debug a bad tool call is what a [[consolidation-pass]] reads when deciding what the agent should carry forward, and what [[agent-evaluation|evaluation]] reads in aggregate to decide whether the agent is ready for more. That's why I don't treat traces as just a log to grep when something breaks. They're where [[observability]] and memory meet.
