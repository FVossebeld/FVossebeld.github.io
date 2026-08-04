---
title: Approval gate
status: working-theory
type: concept
description: The in-the-moment human sign-off before an irreversible agent action, why it sits before the action, and why it's transitional.
tags:
  - agentic-ai
  - governance
---

An approval gate is the pause before an irreversible action. The agent stops, shows you what it's about to do (send the email, update the record, charge the card), and waits for you to say yes. It sits _before_ the action because [[rollback]] mostly doesn't exist: you can't un-send the email or un-notify the customer. After the fact, all you have is an [[audit-trail]]. Before the fact, you still have a choice.

I think the gate is transitional. The reason a human sits there today is that the agent lacks the context and the judgment to decide safely on its own. The day we can get [[context-window|the right context]] in and make the agent's reasoning legible enough to trust, I don't see what the sign-off adds. That day is further off than the demos suggest. But the direction is towards fewer gates, not more. You widen the [[permission-boundary]] as the agent earns trust, not before, and [[agent-evaluation|evaluation]] is how you measure whether it has.

The gate does a second job people overlook: teaching. Every approval, every correction, every "no, not that account" is a signal. That signal feeds the [[consolidation-pass]] agents run after sessions go quiet. Anthropic ships a version as [Dreams](https://platform.claude.com/docs/en/managed-agents/dreams): the agent reviews what happened and keeps what worked. The human in the loop is also the training set. The honest counterpoint: sometimes the human is the weak link, the slow and inconsistent step in a process that was otherwise sound.
