---
title: Tool calling
status: working-theory
type: concept
description: The mechanism where a model emits a structured call against a schema, something else executes it, and a result comes back. The model chooses; it does not run.
tags:
  - agentic-ai
  - interfaces
---

Tool calling is how a model goes from producing text to invoking a real function. The mechanism: the model emits a structured call (usually JSON conforming to a [[tool-schema]]), glue code outside the model validates and executes it, and the result comes back as context for the next turn. The model picks what to call. It never runs anything itself. That separation is the whole point, and on early models, strict schemas were what made it reliable enough to trust at all.

I think the mechanism is right and the layer is wrong, which is the argument in [[json-as-transport-not-cognition]]. JSON is fine transport and an awkward surface to think in; a CLI or a small code surface gives a capable model the same reach in fewer tokens. Tool calling shouldn't disappear. It should drop underneath: validation, logging, and [[permission-boundary|policy]] stay in the plumbing, while a smaller surface sits in front of the model.
