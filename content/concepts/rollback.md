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

<figure class="editorial-plate creative-figure rollback-figure" aria-labelledby="rb-title" aria-describedby="rb-caption">
<div class="plate-tab">ROLLBACK / REVERSIBILITY</div>
<div class="plate-body">
<p class="plate-claim" id="rb-title">Undoing state cannot undo what people saw.</p>
<div class="rollback-scale"><div class="rollback-continuum"><div class="rollback-point"><strong>Free</strong><span><code>git revert</code></span></div><div class="rollback-point rollback-point--partial"><strong>Partial</strong><span>the invite the customer saw<br>the invoice the vendor booked</span></div><div class="rollback-point"><strong>Irreversible</strong><span>no reliable undo</span></div></div>
<div class="rollback-endpoints"><span>Cheap to undo</span><span>No undo</span></div>
</div>
</div>
<figcaption class="plate-source" id="rb-caption">Real writes can leave human consequences after system state is restored. Qualitative reversibility continuum; spacing does not measure risk or count writes.</figcaption>
</figure>

That asymmetry is why the safety work moves before the action, not after it. If you cannot reliably undo, you check before you commit. The weight lands on the [[approval-gate]], on knowing what you're about to change and what it will cost if you're wrong. [[write-access|Write access]] is hard for several stacked reasons, and the fiction of easy rollback is one of them.
