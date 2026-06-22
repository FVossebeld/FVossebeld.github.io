---
title: Approval gate
status: working-theory
type: concept
description: The in-the-moment pause where a human signs off before a risky agent action, why it sits before the action, and why I think it is transitional.
tags:
  - agentic-ai
  - governance
---

An approval gate is a deliberate pause: before an agent commits a risky action, it stops and asks a human to sign off. It sits in the moment, right before the action, which is exactly where it has to be, because [[rollback]] won't save you afterwards. A careful agent reconsiders before it sends, the way a person reads an email three times before hitting send on the one that matters.

Here's the part I'll argue for: the gate is transitional, not a permanent floor. The reason a human sits there today is accountability and missing context. The day we can capture the full context, and the way an expert actually thinks, into the agent and make its reasoning explainable, I don't see what the human still adds. That day is further off than the demos suggest, mostly because [[context-window|getting the right context in]] is genuinely hard. But the direction is towards fewer gates, not more.

The gate is also doing a second job people miss: it's how the agent learns. Every approval and correction is a signal that becomes feedstock for the [[memory-promotion-pipeline|consolidation pass]] agents now run over past sessions, the kind of thing Anthropic ships as [Dreams](https://platform.claude.com/docs/en/managed-agents/dreams): the agent reflects on what happened, keeps what worked, and drops the dead ends. So the human in the loop isn't only a safety brake, it's the teacher. The honest risk runs both ways, though: sometimes the human is the weak link, the slow and inconsistent step in a process that was otherwise sound.
