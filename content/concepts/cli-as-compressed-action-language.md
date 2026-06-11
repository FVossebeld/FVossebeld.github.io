---
title: CLI as a compressed action language
description: The command line isn't just shorter than JSON tool calls; it's closer to execution. Powerful, composable, and dangerous enough to need governing.
tags:
  - agentic-ai
  - tool-calling
---

The command line is the densest action language we have, and it outlived wave after wave of GUIs for a reason. `grep -rn foo src/ | head` expresses a search, a scope, and a truncation in a handful of tokens, and it *runs*. The [[json-as-transport-not-cognition|JSON equivalent]] is a tool name, an arguments object, and three or four keys whose exact schema the model has to recall and the runtime has to dispatch.

Being shorter is the least interesting thing about it. What matters is that it's *closer to execution*: the same string a person would type is the thing that runs, and the output comes back through the same channel. That buys three things for an agent.

- **Tokens.** Commands are compact, so more of the budget goes to thinking instead of restating schemas.
- **Composition.** Pipes, redirects, and exit codes let the model chain and branch steps without a round-trip through orchestration code. `find … | xargs grep … | sort | uniq -c` is four actions and a data flow in one line.
- **Familiarity.** The model has read millions of shell sessions. The action space is one it already inhabits, not a bespoke schema it has to be taught per tool.

Code is the next abstraction past the shell. A short script can hold a loop, a condition, and error handling that a pipeline can't, and the CLI shades into it continuously, which is why coding agents that work through a terminal feel less like chatbots calling functions and more like an engineer operating a system. This is also where tool-calling protocols are drifting: rather than emit one JSON call per step, let the model write code that batches the whole workflow and run it once. Mukul Singh argues the case against JSON-RPC tool calling in [MCP Is Not Enough: Why Code DSLs Will Replace JSON Tool Calling](https://mukulsingh105.github.io/articles/mcp-code-dsl-tool-calling.html); it is the same reason the [[json-as-transport-not-cognition|command line sits above JSON, not beside it]].

**The part the enthusiasm skips:** a shell is dangerous precisely because it's powerful. The same generality that lets an agent compose four steps also lets it `rm -rf` the wrong directory, leak a secret into a log, or build a chain of side effects nobody can reconstruct afterward. "Closer to execution" cuts both ways. A CLI-driven agent is only safe inside a real harness: a sandbox, scoped and least-privilege permissions, a recorded and reviewable command history, dry-run-then-confirm on anything destructive. The action language being expressive is a feature; it's also exactly why it can't run ungoverned.

So the shell is the way *in*, but it only pays off inside an [[agent-workspaces|environment that makes it durable]] and a governance layer that makes it safe. See [[json-as-transport-not-cognition]] for the layer it sits on top of.
