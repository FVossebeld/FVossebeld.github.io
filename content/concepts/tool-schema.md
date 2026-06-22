---
title: Tool schema
status: working-theory
type: concept
description: The contract that tells a model what a tool expects and what comes back. Underrated as infrastructure, overrated as an action language.
tags:
  - agentic-ai
  - interfaces
---

A tool schema is the contract for a [[tool-calling|tool call]]: the named arguments, their types, which ones are required, what shape the result takes. It lets a runtime validate a call before running it, and constrained decoding against it is what kept early models from dropping keys or inventing fields.

That validation still belongs in the stack. My doubt is about putting schemas in front of the model as its action language. A long catalog is a worse teaching interface than a compact surface like a shell, and it eats context whether or not the model needs it this turn. The fix is the same one [[tool-calling]] and [[json-as-transport-not-cognition]] land on: keep schemas underneath as the validation layer, don't make the model think in them.
