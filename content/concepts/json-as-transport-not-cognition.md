---
title: JSON is transport, not cognition
status: working-theory
type: concept
description: JSON works as the wire format for tool calls, but it belongs lower in the stack than we put it. Keep transport underneath; give the model a smaller, closer-to-execution surface on top.
tags:
  - agentic-ai
  - tool-calling
---

JSON tool calling was the obvious bridge out of chat. Early models needed it. They would miss a key, mangle an enum, or produce half a call, so schemas and constrained decoding bought real reliability. OpenAI's Structured Outputs write-up[^structured-outputs] explains the mechanism: during generation, only schema-valid continuations stay available. That solved a real problem. But a lot of people froze the workaround into a theory of agency, and I think that's where things went wrong.

On current models, that theory is already creaking. I watch a coding agent burn 400 tokens on a `search_files` tool schema and then do the same job with `grep -rn` in twelve. For a lot of work, [[cli-as-compressed-action-language|a CLI or a small code surface]] gives the model the same reach with less context than a catalog of JSON definitions. `grep`, `find`, `git diff`, `jq`, `psql`, `curl`: compact action languages humans already use to inspect and change systems. A fifty-field function schema is usually a worse teaching interface than any of them.

So the distinction: **transport versus cognition**. JSON is excellent transport. Stable, parseable, language-neutral, easy to validate, and every API already speaks it. None of that is in dispute. The claim is narrower: JSON belongs _lower in the stack_ than we put it. Keep it as the wire format for validation, logging, and inter-service calls. Up top, the model may only need a few primitives: operate in a workspace or CLI, read results, and ask for clarification or approval when intent is underspecified or risk crosses a threshold. Under those primitives, nest as many concrete tools as you want: APIs, [[mcp|MCP]] servers, database clients, SaaS connectors, policy checks. The model does not need fifty leaf tools in its face if three well-chosen surfaces cover the job.

The same action, both ways. JSON:

```json
{
  "tool": "search_files",
  "arguments": {
    "query": "OPENAI_API_KEY",
    "path": ".",
    "recursive": true,
    "include_line_numbers": true
  }
}
```

The CLI equivalent:

```bash
grep -rn "OPENAI_API_KEY" .
```

The shell version is closer to the work. The command is the thing that runs; the output comes back through the same channel. The model can inspect it, revise the command, pipe it onward, or stop and ask a question. A JSON tool call is one step removed: a description of an action, handed to another layer to perform.

This argument is no longer just mine. The live version of it is happening around [[mcp|MCP]], the protocol that standardized [[tool-calling]] on JSON-RPC. MCP works fine when the task is one call and one result. It strains the moment a task turns into a chain: find the open tickets, look up each customer, check the subscription, issue the credit. Each link is its own round trip, its own chance to drop context or fill the wrong key. Every tool's [[tool-schema|schema]] sits in the window whether or not the model needs it that turn. The fix people keep reaching for is the one I land on here: let the model write a bit of code against the tools and run the whole chain at once, instead of emitting one flat JSON object per step.

Mukul Singh makes that case directly,[^singh] and Anthropic and Cloudflare have shipped the same move as code execution with MCP[^anthropic] and code mode.[^cloudflare] None of it throws JSON out. The generated code still calls into JSON-RPC underneath. Schemas, validation, the audit trail: all stay where they belong, under the model, not in front of it.

**The strongest counterargument:** constrained JSON is _reliable_. A tight schema is easy to validate, easy to log, and forces the model into a small, auditable action space. In a regulated system that's a feature, not a limitation. In the better implementations, the decoder itself is boxed in by a schema or grammar, not just validated after the fact. That's real, and it's exactly why JSON should stay as the wire format underneath.

I still want that lower layer. Validation, logging, policy checks, and narrow adapters matter. I just do not think the model should have to _think_ at that layer by default. My current bet is a stacked design: a small model-facing surface for action and clarification, then a deeper tool stack that handles transport, schemas, and system-specific execution. In that stack, [[cli-as-compressed-action-language|the command line (and code) sits above JSON as the action language]] instead of beside it.

[^structured-outputs]: OpenAI, "Introducing Structured Outputs in the API." https://openai.com/index/introducing-structured-outputs-in-the-api/
[^singh]: Mukul Singh, "MCP Is Not Enough: Why Code DSLs Will Replace JSON Tool Calling." https://mukulsingh105.github.io/articles/mcp-code-dsl-tool-calling.html
[^anthropic]: Anthropic, "Code execution with MCP: building more efficient agents." https://www.anthropic.com/engineering/code-execution-with-mcp
[^cloudflare]: Cloudflare, "Code Mode: the better way to use MCP." https://blog.cloudflare.com/code-mode/
