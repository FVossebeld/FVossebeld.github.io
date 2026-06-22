---
title: Write access
status: working-theory
type: concept
description: The point where an agent stops describing a system and starts changing it, and why crossing that line is the hard part of enterprise AI.
tags:
  - agentic-ai
  - governance
---

Write access is the point where an agent stops describing the world and starts changing it. Not changing its own scratch space (a [[workspace-state|workspace]], a draft, a sandbox it owns) but a system that lives outside it: the CRM other people read from, the ticket queue the on-call watches, the ledger finance closes the month against. Reading those is cheap. Writing to them is the whole game, and the line that matters is the sandbox boundary, not how clever the action looks.

Crossing that boundary is hard for three reasons that stack. The change is often irreversible, since [[rollback]] is mostly a fiction for real systems: you can't un-send the mail or un-charge the card. The target is shared truth, a [[system-of-record]] that other people and processes depend on, so a wrong write isn't your problem, it's everyone's. And someone has to be accountable for the result. Today that someone is a human, which is why every enterprise write I've actually seen still runs through an [[approval-gate]].

So the honest state of things: across the companies I've worked with, I don't see agents writing to live systems on their own. LLMs assist, people commit. And I'm not convinced the write path should run through the model anyway. Retrieval can be agentic; the mutation usually shouldn't be. Most real requests already run on deterministic workflows and APIs, and that part stays deterministic on purpose. The model's job is intent and context. The commit stays boring. Whether the human stays in that loop forever is the open question, and I argue it out in [[approval-gate]].
