---
title: Tool schema
status: working-theory
type: concept
description: The contract that says what arguments a tool takes, why it bought reliability on weaker models, and why it's a poor teaching interface for stronger ones.
tags:
  - agentic-ai
  - interfaces
---

A tool schema is the contract for a tool call: the named arguments, their types, which ones are required, what shape the result takes. It's what lets a runtime validate a call before running it, and constrained decoding against it is how early models were kept from dropping keys or inventing fields.

That validation still belongs in the stack. My doubt is about putting the schema in front of the model as its action language: a long catalog of schemas is a worse teaching interface than a compact surface like a shell, and it eats context whether or not the model needs it this turn. Same argument as [[tool-calling]] and [[json-as-transport-not-cognition]]: keep the schema underneath as the validation layer, don't make the model think in it.
