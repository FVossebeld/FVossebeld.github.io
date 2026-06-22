---
title: MCP
status: working-theory
type: concept
description: The model context protocol as a standard connector spec, an API with a semantic layer, and why I don't read it as the revolution it gets sold as.
tags:
  - agentic-ai
  - interfaces
---

MCP, the model context protocol, is a standard way to expose tools and data to an agent so every model and every tool don't have to reinvent the wiring. That's the honest description: a connector spec. An API with a semantic layer on top, so an agent can discover what's there and call it.

I don't read it as much more than that. It's useful (interoperable tools beat one-off integrations, the way a common port beats a drawer of adapters) but it isn't revolutionary on its own. It standardizes [[tool-calling]] on JSON-RPC, which inherits the thing I keep arguing: [[json-as-transport-not-cognition|JSON is the right transport and the wrong layer to make a model think in]]. The hard problems in enterprise agents, scope, [[write-access]], governance, all sit above the protocol, not inside it. MCP moves the plumbing. It doesn't decide what the agent is allowed to do with it.
