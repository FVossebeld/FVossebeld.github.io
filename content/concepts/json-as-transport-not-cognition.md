---
title: JSON is transport, not cognition
description: Why JSON works as the wire format for tool calls but not as the layer an agent thinks and acts in.
tags:
  - agentic-ai
  - tool-calling
---

JSON tool calling was the obvious bridge out of chat. Early models needed the guardrails. They would miss a key, mangle an enum, or produce half a call, so schemas and constrained decoding bought real reliability. OpenAI's Structured Outputs write-up[^structured-outputs] is explicit about the mechanism: constrained decoding against the supplied schema, so only schema-valid continuations stay available during generation. I buy that. I just think many people froze that workaround into a theory of agency.

On current models, that theory already feels stale to me. For a lot of work, a CLI or a small code surface seems to give the model the same capability, often more, with less context overhead than a catalog of JSON tool definitions. `grep`, `find`, `git diff`, `jq`, `psql`, `curl`: those are compact action languages humans already use to inspect and change systems. A long function schema is usually a worse teaching interface.

The distinction I care about is **transport versus cognition**. JSON is excellent transport. It's stable, parseable, language-neutral, easy to validate against a schema, and every API already speaks it. None of that is in dispute, and I'm not arguing it should go away. The claim is narrower: JSON belongs _lower in the stack_ than we put it. Keep it as transport, validation, and logging underneath. Up top, the model may only need a few primitives: operate in a workspace or CLI, read results, and ask for clarification or approval when intent is underspecified or risk crosses a threshold. Under those primitives, you can nest as many concrete tools as you want: APIs, MCP servers, database clients, SaaS connectors, policy checks. The model does not need fifty leaf tools in its face if three well-chosen surfaces cover the job.

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

The shell version is closer to the work. The command is the thing that runs, and the output comes back through the same channel, so the model can inspect it, revise the command, pipe it onward, or stop and ask a question. A JSON tool call is one step removed. It is a description of an action handed to another layer to perform.

This argument is no longer just mine. The live version of it is happening around MCP, the protocol that standardized tool calling on JSON-RPC. MCP is fine when the task is one call and one result. It strains the moment the task is a chain: find the open tickets, look up each customer, check the subscription, issue the credit. Each link is its own round trip, its own chance to drop context or fill the wrong key, and every tool's schema sits in the window whether or not the model needs it that turn. The fix people keep reaching for is the same one I land on here: let the model write a bit of code against the tools and run the whole chain at once, instead of emitting one flat object per step.

Mukul Singh makes that case directly,[^singh] and Anthropic and Cloudflare have shipped the same move as code execution with MCP[^anthropic] and code mode.[^cloudflare] None of it throws JSON out. The generated code still calls into JSON-RPC underneath. The schemas, the validation, the audit trail all stay where they belong: under the model, not in front of it.

**The strongest counterargument:** constrained JSON is _reliable_. A tight schema is easy to validate, easy to log, and forces the model into a small, auditable action space, which in a regulated system is a feature, not a limitation. In the better implementations, that reliability is not just post-hoc validation. The decoder itself is boxed in by a schema or grammar. That's real, and it's exactly why JSON should stay as the wire format underneath. I still want that lower layer. Validation, logging, policy checks, and narrow adapters matter. I just do not think the model should have to think at that layer by default. My current bet is a stacked design: a small model-facing surface for action and clarification, then a deeper tool stack underneath that handles transport, schemas, and system-specific execution. In that stack, [[cli-as-compressed-action-language|the command line (and code) can sit above JSON as the action language]] instead of beside it.

[^structured-outputs]: OpenAI, "Introducing Structured Outputs in the API." https://openai.com/index/introducing-structured-outputs-in-the-api/
[^singh]: Mukul Singh, "MCP Is Not Enough: Why Code DSLs Will Replace JSON Tool Calling." https://mukulsingh105.github.io/articles/mcp-code-dsl-tool-calling.html
[^anthropic]: Anthropic, "Code execution with MCP: building more efficient agents." https://www.anthropic.com/engineering/code-execution-with-mcp
[^cloudflare]: Cloudflare, "Code Mode: the better way to use MCP." https://blog.cloudflare.com/code-mode/
