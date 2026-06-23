---
title: Rollback
status: working-theory
type: concept
description: The ability to undo a committed action. Reversibility is the real axis of risk, but most real-world writes are only partially reversible.
tags:
  - agentic-ai
  - governance
---

Rollback means undoing a committed action: reverting the change, restoring the prior state. In `git` you get it for free. In a [[system-of-record]] you almost never do.

I think reversibility is the real axis of risk in agentic systems, more than scope or frequency. A write you can undo is a write you can learn from cheaply. A write you cannot undo is a bet. Most architectures treat all writes equally. They shouldn't.

The honest catch: most real-world writes are only *partially* reversible. You can delete the calendar invite, but the customer already saw it. You can void the invoice, but the vendor already booked the revenue. The system state rolls back; the human state does not. And when the undo only goes part way, the [[audit-trail]] is the one record of what actually changed and what didn't. Partial reversibility is better than none, and it still isn't a license to skip the gate.

<figure class="sketch-board" role="group" aria-labelledby="rb-title">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 175" width="100%" role="img" aria-labelledby="rb-title rb-desc">
<title id="rb-title">Reversibility spectrum: risk rises as rollback gets harder</title>
<desc id="rb-desc">Horizontal axis from free rollback on the left through partial in the middle to irreversible on the right. Most real writes cluster in the wide partial zone.</desc>
<style>
.rb-mid{fill:var(--tertiary)}
.rb-h{fill:var(--darkgray);font-family:var(--bodyFont);font-size:12px;font-weight:600;text-anchor:middle;dominant-baseline:central}
.rb-hi{fill:var(--light);font-family:var(--bodyFont);font-size:12px;font-weight:600;text-anchor:middle;dominant-baseline:central}
.rb-ex{fill:var(--gray);font-family:var(--bodyFont);font-size:10px;text-anchor:middle;dominant-baseline:central}
.rb-ax{stroke:var(--gray);stroke-width:0.8;fill:none}
.rb-arr{fill:var(--gray)}
</style>
<rect class="sketch-node" rx="8" x="35" y="35" width="130" height="42"/>
<rect class="rb-mid" rx="8" x="170" y="35" width="280" height="42"/>
<rect class="sketch-node-accent" rx="8" x="455" y="35" width="170" height="42"/>
<text class="rb-h" x="100" y="56">FREE</text>
<text class="rb-hi" x="310" y="56">PARTIAL</text>
<text class="rb-hi" x="540" y="56">IRREVERSIBLE</text>
<text class="rb-ex" x="100" y="97">git revert</text>
<text class="rb-ex" x="310" y="97">the invite the customer saw</text>
<text class="rb-ex" x="310" y="112">the invoice the vendor booked</text>
<text class="rb-ex" x="540" y="97">system-of-record write</text>
<line class="rb-ax" x1="35" y1="140" x2="620" y2="140"/>
<polygon class="rb-arr" points="617,137 617,143 625,140"/>
<text class="rb-ex" x="100" y="158">← cheap to undo</text>
<text class="rb-ex" x="555" y="158">no undo →</text>
</svg>
<figcaption>Reversibility is the axis. Most real writes land in the messy middle, not at the clean ends.</figcaption>
</figure>

That asymmetry is why the safety work moves before the action, not after it. If you cannot reliably undo, you check before you commit. The weight lands on the [[approval-gate]], on knowing what you're about to change and what it will cost if you're wrong. [[write-access|Write access]] is hard for several stacked reasons, and the fiction of easy rollback is one of them.
