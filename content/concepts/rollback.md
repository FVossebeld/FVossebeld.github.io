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

The honest catch: most real-world writes are only *partially* reversible. You can delete the calendar invite, but the customer already saw it. You can void the invoice, but the vendor already booked the revenue. The system state rolls back; the human state does not. Partial reversibility is better than none, and it still isn't a license to skip the gate.

That asymmetry is why the safety work moves before the action, not after it. If you cannot reliably undo, you check before you commit. The weight lands on the [[approval-gate]], on knowing what you're about to change and what it will cost if you're wrong. [[write-access|Write access]] is hard for several stacked reasons, and the fiction of easy rollback is one of them.
