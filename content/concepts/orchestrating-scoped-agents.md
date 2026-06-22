---
title: Orchestrating scoped agents
status: working-theory
type: concept
description: Scoping an agent to one system makes it safe but leaves it unable to finish cross-system work. The fix is broad intent, narrow execution, and the hard parts are handoff, ownership, and rollback.
tags:
  - agentic-ai
  - enterprise
---

[[scoped-system-specialist-agents|Scoping an agent to one system]] is what makes it governable. It also leaves it stranded the moment a goal crosses a system boundary. Most real goals do. A customer renewal touches the CRM, the billing system, a contract in legal's repository, the calendar, and the support queue. Scope one agent to each and none of them can finish the renewal alone; let one agent reach all five and you've rebuilt the ungovernable do-everything operator scoping was meant to kill.

So you need a coordination layer, and the shape I keep landing on is **broad intent, narrow execution**: a conversational orchestrator holds the messy human goal and decides who does what; each scoped specialist performs the actual mutation, but only inside its own system and permissions. Breadth lives in the *understanding*; narrowness lives in the *doing*. The orchestrator can reason about a goal spanning six systems while holding write access to none of them.

<figure class="sketch-board" role="group" aria-labelledby="orch-title">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 330" width="100%" role="img" aria-labelledby="orch-title orch-desc">
<title id="orch-title">System-scoped specialists coordinated by a process-scoped orchestrator</title>
<desc id="orch-desc">Cross-system user intent flows into a process-scoped orchestrator, which routes work to three scoped specialists: Salesforce for CRM, SAP for ERP, and ServiceNow for ITSM. Each specialist mutates only its own system.</desc>
<style>
.orch-tip{fill:var(--secondary);stroke:none}
.orch-flow{stroke:var(--secondary);stroke-width:1.5;fill:none}
.orch-h{fill:var(--darkgray);font-family:var(--bodyFont);font-size:12px;font-weight:600;text-anchor:middle}
.orch-s{fill:var(--gray);font-family:var(--bodyFont);font-size:10px;text-anchor:middle}
.orch-ha{fill:var(--light);font-family:var(--bodyFont);font-size:12px;font-weight:600;text-anchor:middle}
.orch-sa{fill:var(--light);font-family:var(--bodyFont);font-size:10px;opacity:.8;text-anchor:middle}
.orch-sys{fill:var(--darkgray);font-family:var(--bodyFont);font-size:11px;font-weight:600;text-anchor:middle}
.orch-sysb{fill:color-mix(in srgb,var(--lightgray) 55%,var(--light));stroke:var(--gray);stroke-width:1}
</style>
<rect class="sketch-node" rx="9" x="220" y="10" width="200" height="46"/>
<text class="orch-h" x="320" y="29">Cross-system user intent</text>
<rect class="sketch-node-accent" rx="9" x="220" y="92" width="200" height="46"/>
<text class="orch-ha" x="320" y="111">Process-scoped orchestrator</text>
<text class="orch-sa" x="320" y="126">plans, routes, tracks</text>
<rect class="sketch-node" rx="9" x="20" y="178" width="160" height="46"/>
<text class="orch-h" x="100" y="197">Salesforce specialist</text>
<text class="orch-s" x="100" y="212">system scope: CRM</text>
<rect class="sketch-node" rx="9" x="240" y="178" width="160" height="46"/>
<text class="orch-h" x="320" y="197">SAP specialist</text>
<text class="orch-s" x="320" y="212">system scope: ERP</text>
<rect class="sketch-node" rx="9" x="460" y="178" width="160" height="46"/>
<text class="orch-h" x="540" y="197">ServiceNow specialist</text>
<text class="orch-s" x="540" y="212">system scope: ITSM</text>
<rect class="orch-sysb" rx="20" x="20" y="262" width="160" height="46"/>
<text class="orch-sys" x="100" y="290">CRM</text>
<rect class="orch-sysb" rx="20" x="240" y="262" width="160" height="46"/>
<text class="orch-sys" x="320" y="290">ERP</text>
<rect class="orch-sysb" rx="20" x="460" y="262" width="160" height="46"/>
<text class="orch-sys" x="540" y="290">ITSM</text>
<line class="orch-flow" x1="320" y1="56" x2="320" y2="84"/>
<polygon class="orch-tip" points="316,84 324,84 320,92"/>
<line class="orch-flow" x1="320" y1="138" x2="100" y2="170"/>
<polygon class="orch-tip" points="96,170 104,170 100,178"/>
<line class="orch-flow" x1="320" y1="138" x2="320" y2="170"/>
<polygon class="orch-tip" points="316,170 324,170 320,178"/>
<line class="orch-flow" x1="320" y1="138" x2="540" y2="170"/>
<polygon class="orch-tip" points="536,170 544,170 540,178"/>
<line class="orch-flow" x1="100" y1="224" x2="100" y2="254"/>
<polygon class="orch-tip" points="96,254 104,254 100,262"/>
<line class="orch-flow" x1="320" y1="224" x2="320" y2="254"/>
<polygon class="orch-tip" points="316,254 324,254 320,262"/>
<line class="orch-flow" x1="540" y1="224" x2="540" y2="254"/>
<polygon class="orch-tip" points="536,254 544,254 540,262"/>
</svg>
<figcaption>Breadth in the orchestrator, narrowness in the specialists: each mutation stays inside one system's boundary.</figcaption>
</figure>

That separation is the easy part to state. The work is in three problems it creates.

**Context handoff without over-sharing.** To brief the billing specialist on a renewal, the orchestrator has to pass some context: the account, the contract value, the effective date. It should not pass the full conversation, which might carry a negotiation concession sales hasn't finalized, or a competitor name from the opportunity notes that billing has no business seeing. Each handoff is a boundary that can leak. The orchestrator passes the minimum a specialist needs, nothing more. This is the [[federated-memory-for-enterprise-agents|federated-memory problem]] showing up at runtime instead of in storage: even between cooperating agents, what's *relevant* to share isn't the same as what's *allowed* to cross.

**Transaction ownership.** A renewal that updates the CRM, then billing, then files a contract is a distributed transaction with no shared database underneath. If billing succeeds and the contract step fails, who owns the half-finished state? Without an answer, you get five specialists each convinced their slice is done while the whole job is broken. The orchestrator is the only layer with visibility across all steps, so it carries the ledger: what committed, what didn't, what needs attention next.

**Clean [[rollback]].** Step three of five fails. You can't always undo steps one and two: the email is sent, the PO is approved. Rollback is rarely a literal reversal; it's compensation (issue a correction, flag the record, notify a human) and an honest report of partial completion. An orchestrator that pretends the whole thing either succeeded or didn't is lying about a state the enterprise will discover on its own.

None of these are solved, and I don't think they get solved inside the model. They're coordination problems, not inference problems. A wall of well-behaved specialists still doesn't add up to a working enterprise agent without something above them that owns the mess. The [[process-orchestrator|orchestrator]], not the model, is where the next hard engineering lives.
