---
title: Write access
status: working-theory
type: concept
description: The sandbox-boundary crossing where an agent changes a system outside itself, hard for three stacked reasons: irreversibility, shared truth, accountability.
tags:
  - agentic-ai
  - governance
---

Write access is where an agent crosses the sandbox boundary. Not editing files in its own [[workspace-state|workspace]], not drafting in a scratch buffer it owns. Writing to the CRM the account team reads from. Updating the ticket queue the on-call watches at 2 AM. Posting a journal entry finance closes the month against.

Reading those systems is cheap and reversible by definition. Writing changes the state other people depend on. That crossing is the line that matters, not how sophisticated the action looks.

It is hard for three reasons, and they stack.

The change is usually irreversible. [[Rollback]] is mostly a fiction outside version control. You cannot un-send the email, un-post the Slack announcement, or un-charge the card. Once downstream has consumed the event, the prior state is gone.

The target is shared truth. A [[system-of-record]] is not your copy; it is everyone's. A wrong write in your workspace costs you a retry. A wrong write to the record costs the organization a cleanup, and sometimes a customer conversation nobody wanted to have.

Someone has to be accountable for the result. Today that someone is a person, and the [[audit-trail]] expects a name. "The model decided" is not an answer compliance accepts. Which is why every enterprise write I've actually seen still runs through an [[approval-gate]].

Across the companies I've worked with, I don't see agents writing to live systems on their own. LLMs assist. People commit. I'm not convinced the write path should run through the model anyway. Retrieval can be agentic; the mutation usually shouldn't be. Most real requests already run on deterministic workflows and APIs, and that part stays deterministic on purpose. The model's job is intent and context. The commit stays boring.

Whether the human stays in that loop forever is the open question, and I argue it in [[approval-gate]].
