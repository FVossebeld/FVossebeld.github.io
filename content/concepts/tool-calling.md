---
title: Tool calling
status: working-theory
type: concept
description: The mechanism where a model emits a structured request, glue code runs it, and a result comes back, and why I think it belongs lower in the stack than we put it.
tags:
  - agentic-ai
  - interfaces
---

Tool calling is the mechanism that gave models hands: the model emits a structured request (usually JSON against a fixed [[tool-schema]]), some glue code validates and runs it, and a result comes back. It's how chat became action, and on weaker models the rigid schema bought real reliability.

I think it's pinned to the wrong layer, and that's the argument in [[json-as-transport-not-cognition]]. JSON is excellent transport and an awkward thing to make the model think in; a CLI or a small code surface often gives a capable model the same reach with less overhead. Tool calling shouldn't disappear, it should drop underneath, with validation and [[permission-boundary|policy]] in the plumbing and a smaller surface in front of the model.
