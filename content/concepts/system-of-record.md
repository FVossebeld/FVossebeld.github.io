---
title: System of record
status: working-theory
type: concept
description: The system an organization treats as true, why it has no room for tentative thought, and why writing to it is heavier than writing anywhere else.
tags:
  - agentic-ai
  - enterprise
---

A system of record is the place an organization treats as true. Not a scratchpad, not a cache, not somewhere you think out loud: it's the version other systems sync from and people quote in a meeting. Salesforce for the pipeline, the ERP for the books, the HR system for who actually works here.

What defines it, for me, is that there's no room for a thinking stream inside it. An agent's [[workspace-state|workspace]] is where half-formed reasoning belongs; the system of record holds only committed, trusted state. That's why writing to one is heavier than writing anywhere else. You're not editing your own copy, you're changing what everyone downstream will now treat as the truth.

Which means the [[write-access]] problem is really a system-of-record problem. An agent that scribbles in a scratch table can be wrong cheaply. An agent that writes to the record commits the whole organization to its mistake. The job is to keep the agent's thinking in its workspace and let only a checked, approved result cross the line into the record.
