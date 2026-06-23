---
title: Permission boundary
status: working-theory
type: concept
description: The static fence set before an agent runs, declaring what it may touch at all, and why the instinct to draw it narrow is the wrong safety move.
tags:
  - agentic-ai
  - governance
---

A permission boundary is the scope you draw before the agent starts. Not what it should do (that's the prompt), not whether a particular action needs sign-off (that's an [[approval-gate]]), not the record of what happened (that's an [[audit-trail]]). The boundary is earlier and blunter than both: the set of systems, objects, and operations the agent is physically able to reach. Everything outside is a wall, not a decision.

Concretely: a Salesforce-[[scoped-agent|scoped agent]] might have read/write on Opportunities and Tasks, read-only on Accounts, and zero access to Contacts or custom objects it doesn't need. That's the boundary. Whether it should actually move a deal to "Closed Won" without asking is the gate's job. What it changed, and on whose say-so, is the trail's job. Three primitives, three moments: boundary before, gate during, trail after.

<figure class="sketch-board" role="group" aria-labelledby="pbt-title">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 180" width="100%" role="img" aria-labelledby="pbt-title pbt-desc">
<title id="pbt-title">Three governance primitives on a timeline: boundary before, gate during, trail after</title>
<desc id="pbt-desc">A left-to-right time axis with three stations. The permission boundary is a dashed fence set before execution. The approval gate fires during risky mutations. The audit trail records what happened after.</desc>
<style>
.pbt-fence{fill:var(--lightgray);stroke:var(--secondary);stroke-width:1.5;stroke-dasharray:5 3}
.pbt-arr{stroke:var(--gray);stroke-width:1.2;fill:none}
.pbt-tip{fill:var(--gray)}
.pbt-h{fill:var(--darkgray);font-family:var(--bodyFont);font-size:12px;font-weight:600;text-anchor:middle;dominant-baseline:central}
.pbt-ha{fill:var(--light);font-family:var(--bodyFont);font-size:12px;font-weight:600;text-anchor:middle;dominant-baseline:central}
.pbt-s{fill:var(--gray);font-family:var(--bodyFont);font-size:10px;text-anchor:middle;dominant-baseline:central}
.pbt-sa{fill:var(--light);font-family:var(--bodyFont);font-size:10px;text-anchor:middle;dominant-baseline:central;opacity:.8}
.pbt-ph{fill:var(--secondary);font-family:var(--bodyFont);font-size:10px;font-weight:600;text-anchor:middle;text-transform:uppercase;letter-spacing:.5px}
</style>
<rect class="pbt-fence" rx="9" x="32" y="20" width="150" height="65"/>
<text class="pbt-h" x="107" y="43">Permission boundary</text>
<text class="pbt-s" x="107" y="62">static scope set before</text>
<rect class="sketch-node-accent" rx="9" x="245" y="20" width="150" height="65"/>
<text class="pbt-ha" x="320" y="43">Approval gate</text>
<text class="pbt-sa" x="320" y="62">fires on risky mutation</text>
<rect class="sketch-node" rx="9" x="458" y="20" width="150" height="65"/>
<text class="pbt-h" x="533" y="43">Audit trail</text>
<text class="pbt-s" x="533" y="62">record of what happened</text>
<line class="pbt-arr" x1="107" y1="85" x2="107" y2="120"/>
<line class="pbt-arr" x1="320" y1="85" x2="320" y2="120"/>
<line class="pbt-arr" x1="533" y1="85" x2="533" y2="120"/>
<line class="pbt-arr" x1="20" y1="125" x2="615" y2="125"/>
<polygon class="pbt-tip" points="615,121 615,129 625,125"/>
<text class="pbt-ph" x="107" y="152">before</text>
<text class="pbt-ph" x="320" y="152">during</text>
<text class="pbt-ph" x="533" y="152">after</text>
</svg>
<figcaption>Boundary sets the outer limit, gate catches mutations inside it, trail writes the receipt.</figcaption>
</figure>

My complaint: we draw these fences too tight. The instinct with new technology is to confine it, so most enterprise agents today can read broadly but [[write-access|write almost nothing]]. That makes them expensive search bars. The model can find the stalled deal, explain why the validation rule fires, and draft the update, but it can't commit the change. You get the cost of running the agent and still pay the full cost of doing the work by hand.

The safer default is a wider boundary with an [[approval-gate]] on the mutations that carry real risk. Let the agent read and write inside its scope. Put the gate on the actions that can hurt: a bulk data change, a customer-facing message, anything you can't [[rollback]]. Then relax the gate over time as the [[audit-trail]] shows it makes good decisions. You don't need to strangle the scope to stay safe. You need to instrument the space inside it.
