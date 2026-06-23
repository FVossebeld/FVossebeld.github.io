---
title: MCP
status: working-theory
type: concept
description: The Model Context Protocol is a wire standard for tool discovery and invocation. What I care about is that it also carries write access, which makes it a governance surface whether anyone planned that or not.
tags:
  - agentic-ai
  - interfaces
  - governance
---

MCP (Model Context Protocol) is a wire standard: one protocol for any model to discover and call any tool or data source. Anthropic published it, others adopted it, and the pitch is USB-C for agents. One port, any peripheral. JSON-RPC underneath, a [[tool-schema]] on top that tells the model what's available and how to call it. That part works. Interoperable tools beat one-off integrations the same way a common port beats a drawer of adapters, and I use MCP servers daily.

What I actually care about: MCP carries [[write-access]]. A model that discovers a tool through MCP can call it, and "call it" often means mutating a system other people depend on. The protocol describes what a tool accepts. It says nothing about who may invoke it, under what conditions, with what oversight. Scope, [[permission-boundary|permissions]], [[approval-gate|approval]], audit: all above the wire, not inside it. That makes every MCP server a governance surface whether anyone designed it as one. If you expose a write tool over MCP you are publishing a mutation endpoint to anything with a token. MCP answers "can the model call this." Nobody answers "should it."

MCP also standardizes [[tool-calling]] on JSON-RPC, which inherits the argument from [[json-as-transport-not-cognition]]: JSON is excellent transport and a clumsy action layer. One call, one result, MCP is fine. A ten-step chain, you feel the cost. But that's a complaint about the cognitive layer, not the connector. The connector does its job.
