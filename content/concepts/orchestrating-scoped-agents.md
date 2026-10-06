---
title: Orchestrating scoped agents
status: working-theory
type: concept
description: Scoping an agent to one system makes it safe but leaves it unable to finish cross-system work. The fix is broad intent, narrow execution, and the hard part is owning the half-finished state when a step fails.
tags:
  - agentic-ai
  - enterprise
---

[[scoped-system-specialist-agents|Scoping an agent to one system]] is what makes it governable. It also leaves it stranded the moment a goal crosses a system boundary. Most real goals do. A customer renewal touches the CRM, the billing system, a contract in legal's repository, the calendar, and the support queue. Scope one agent to each and none of them can finish the renewal alone; let one agent reach all five and you've rebuilt the ungovernable do-everything operator scoping was meant to kill.

So you need a coordination layer, and the shape I keep landing on is **broad intent, narrow execution**: a conversational orchestrator holds the messy human goal and decides who does what; each scoped specialist performs the actual mutation, but only inside its own system and permissions. Breadth lives in the *understanding*; narrowness lives in the *doing*. The orchestrator can reason about a goal spanning six systems while holding write access to none of them.

<figure class="editorial-plate creative-figure routing-figure" aria-labelledby="orch-title" aria-describedby="orch-caption">
<div class="plate-tab">ORCHESTRATION / SYSTEM BOUNDARIES</div>
<div class="plate-body">
<p class="plate-claim" id="orch-title">Coordinate across systems. Write inside one.</p>
<div class="routing-origin"><p>Cross-system user intent</p><div class="routing-coordinator"><strong>Process-scoped orchestrator</strong><span>plans and routes</span><span>No direct system writes</span></div></div>
<div class="routing-fanout">
<section class="routing-target"><strong>Salesforce specialist</strong><span class="routing-mutation">CRM</span></section>
<section class="routing-target"><strong>SAP specialist</strong><span class="routing-mutation">ERP</span></section>
<section class="routing-target"><strong>ServiceNow specialist</strong><span class="routing-mutation">ITSM</span></section>
</div>
</div>
<figcaption class="plate-source" id="orch-caption">Each specialist mutates only its own system, within that system's permissions. Dashed: coordination only. Solid: system-scoped execution. Conceptual routing, not a distributed transaction guarantee.</figcaption>
</figure>

That separation is the easy part to state. The work is in three problems it creates.

**Context handoff without over-sharing.** To brief the billing specialist on a renewal, the orchestrator has to pass some context: the account, the contract value, the effective date. It should not pass the full conversation, which might carry a negotiation concession sales hasn't finalized, or a competitor name from the opportunity notes that billing has no business seeing. Each handoff is a boundary that can leak. The orchestrator passes the minimum a specialist needs, nothing more. This is the [[federated-memory-for-enterprise-agents|federated-memory problem]] showing up at runtime instead of in storage: even between cooperating agents, what's *relevant* to share isn't the same as what's *allowed* to cross.

**Transaction ownership.** A renewal that updates the CRM, then billing, then files a contract is a distributed transaction with no shared database underneath. If billing succeeds and the contract step fails, who owns the half-finished state? Without an answer, you get five specialists each convinced their slice is done while the whole job is broken. The orchestrator is the only layer with visibility across all steps, so it carries the ledger: what committed and what didn't.

**Clean [[rollback]].** Step three of five fails. You can't always undo steps one and two: the email is sent, the PO is approved. Rollback is rarely a literal reversal; it's compensation (issue a correction, flag the record, notify a human, or just stop and say so) and an honest report of partial completion. An orchestrator that pretends the whole thing either succeeded or didn't is lying about a state the enterprise will discover on its own.

None of these are solved, and I don't think they get solved inside the model. They're coordination problems, not inference problems. A wall of well-behaved specialists still doesn't add up to a working enterprise agent without something above them that owns the mess. The [[process-orchestrator|orchestrator]], not the model, is where the next hard engineering lives.
