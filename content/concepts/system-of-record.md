---
title: System of record
status: working-theory
type: concept
description: The authoritative store a business treats as truth, and why writing to it is the consequential act.
tags:
  - agentic-ai
  - enterprise
---

A system of record is the store an organization treats as true. Salesforce for the pipeline, the ERP for the ledger, the HR system for headcount. Other systems sync from it. People quote it in meetings without checking twice. When two sources disagree, the record wins.

No room for tentative thinking inside it. A [[workspace-state|workspace]] is where an agent's half-formed reasoning belongs, where being wrong is cheap. The record holds only committed state. Writing to it is heavier than writing anywhere else, because you're not editing your own copy; you're changing what everyone downstream now treats as fact.

Which makes the [[write-access]] problem really a system-of-record problem. An agent that scribbles in a scratch table can fail quietly. An agent that writes to the record commits the organization to its output, and because that commit is effectively irreversible, it demands an [[audit-trail]]. The rule I keep landing on: think in the workspace, cross into the record only when the result has been checked. The boundary between the two is the governance.
