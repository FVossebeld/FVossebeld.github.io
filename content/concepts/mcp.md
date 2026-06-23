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

<figure class="sketch-board" role="group" aria-labelledby="mcpw-title">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 230" width="100%" role="img" aria-labelledby="mcpw-title mcpw-desc">
<title id="mcpw-title">The wire and the governance layer above it</title>
<desc id="mcpw-desc">MCP carries discovery, invocation, and write access on the wire between a model and external systems. Scope, permissions, approval, and audit sit above the wire and are not part of the protocol.</desc>
<style>
.mcpw-flow{stroke:var(--secondary);stroke-width:1.2;fill:none}
.mcpw-tip{fill:var(--secondary);stroke:none}
.mcpw-wire{stroke:var(--darkgray);stroke-width:1.5;stroke-dasharray:6 4}
.mcpw-h{fill:var(--darkgray);font-family:var(--bodyFont);font-size:12px;font-weight:600;text-anchor:middle;dominant-baseline:central}
.mcpw-ha{fill:var(--light);font-family:var(--bodyFont);font-size:12px;font-weight:600;text-anchor:middle;dominant-baseline:central}
.mcpw-s{fill:var(--gray);font-family:var(--bodyFont);font-size:10px;text-anchor:middle;dominant-baseline:central}
.mcpw-sa{fill:var(--light);font-family:var(--bodyFont);font-size:10px;text-anchor:middle;dominant-baseline:central;opacity:.85}
.mcpw-ann{fill:var(--gray);font-family:var(--bodyFont);font-size:10px;font-style:italic}
</style>
<rect class="sketch-node-accent" rx="10" x="20" y="12" width="620" height="72"/>
<text class="mcpw-ha" x="330" y="38">scope · permissions · approval · audit</text>
<text class="mcpw-sa" x="330" y="58">not in the protocol: lives above the wire</text>
<line class="mcpw-wire" x1="40" y1="112" x2="620" y2="112"/>
<text class="mcpw-ann" x="44" y="126">the wire</text>
<rect class="sketch-node" rx="9" x="30" y="150" width="110" height="50"/>
<text class="mcpw-h" x="85" y="175">Model</text>
<rect class="sketch-node" rx="9" x="235" y="142" width="190" height="66"/>
<text class="mcpw-h" x="330" y="164">MCP</text>
<text class="mcpw-s" x="330" y="182">JSON-RPC + tool-schema</text>
<text class="mcpw-s" x="330" y="198">discovery · invocation · write access</text>
<rect class="sketch-node" rx="9" x="520" y="150" width="120" height="50"/>
<text class="mcpw-h" x="580" y="175">Systems</text>
<line class="mcpw-flow" x1="140" y1="175" x2="226" y2="175"/>
<polygon class="mcpw-tip" points="226,171 226,179 235,175"/>
<line class="mcpw-flow" x1="425" y1="175" x2="511" y2="175"/>
<polygon class="mcpw-tip" points="511,171 511,179 520,175"/>
</svg>
<figcaption>The protocol carries the call. Everything that decides whether the call should happen lives above it.</figcaption>
</figure>

MCP also standardizes [[tool-calling]] on JSON-RPC, which inherits the argument from [[json-as-transport-not-cognition]]: JSON is excellent transport and a clumsy action layer. One call, one result, MCP is fine. A ten-step chain, you feel the cost. But that's a complaint about the cognitive layer, not the connector. The connector does its job.
