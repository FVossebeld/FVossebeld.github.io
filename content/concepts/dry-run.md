---
title: Dry run
status: seed
type: concept
description: A preview of an agent's proposed change before it can affect a real system.
tags:
  - agentic-ai
  - governance
---

A dry run shows what an agent would change without making the change. I want one before an [[approval-gate]] when the next step writes to a [[system-of-record|system of record]].

It shows the proposed action or diff while the record remains untouched. The approval can then be about that particular change, rather than a vague promise that the agent will behave. A dry run can catch a wrong record or field before execution, when [[rollback]] is still unnecessary.
