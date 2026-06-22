---
title: Rollback
status: working-theory
type: concept
description: Undoing an action after it's committed, why it mostly doesn't exist for real systems, and why that pushes the safety work before the action.
tags:
  - agentic-ai
  - governance
---

Rollback is the idea that you can undo an action after it's committed: revert the change, restore the prior state, pretend it didn't happen. In version control it's real. In most systems it isn't.

That's the point I care about. You can't un-send the email, un-charge the card, or un-notify the customer who already saw the message. So leaning on rollback as the safety net is mostly a comfort, not a plan. For the narrow set of systems that genuinely support it, fine, use it. For everything else, treating "we can always roll it back" as the answer is how you get burned.

Which is why the real work moves earlier. If you can't reliably undo, you check before you commit, not after. That puts the weight on the [[approval-gate]] and on double-checking what's about to happen, not on cleaning up afterwards. Rollback being mostly unavailable is one of the stacked reasons [[write-access]] is hard.
