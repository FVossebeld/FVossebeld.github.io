---
title: CLI as a compressed action language
status: refined
type: concept
description: The shell is denser than JSON tool calls and closer to execution. That makes it the natural action surface for agents, and dangerous enough to need governing.
tags:
  - agentic-ai
  - tool-calling
---

The command line is the densest action language we have. `grep -rn foo src/ | head` expresses a search, a scope, and a truncation in a handful of tokens, and it *runs*. The [[json-as-transport-not-cognition|JSON equivalent]] takes a tool name, an arguments object, and three or four keys the model has to recall and the runtime has to dispatch. The shell outlived every GUI wave for the same reason it works for agents: it is already close to the machine.

Being shorter matters less than being closer. The same string a person types is the thing that executes, and the output returns through the same channel. No marshalling step, no dispatch layer between intent and effect. For an agent, that collapses the distance between deciding and doing in a way structured tool calls cannot.

Tokens are part of it: compact commands leave more of the context window for reasoning instead of schema recitation. But composition is the stronger win. `find … | xargs grep … | sort | uniq -c` is four actions and a data flow in one line. Pipes, redirects, and exit codes give the model branching and chaining without a round trip through orchestration code. And the model already knows how. It trained on millions of shell sessions. The action space is one it inhabits, not a bespoke schema it must learn per deployment.

Code is the next step past the shell. A short script holds a loop, a conditional, and error handling that a pipeline cannot, and the CLI shades into it continuously. This is why coding agents that work through a terminal feel less like chatbots calling functions and more like an engineer operating a system. It is also where [[tool-calling]] is drifting: instead of one JSON call per step, let the model write code that batches the workflow and run it once. Mukul Singh makes the case against JSON-RPC tool calling directly;[^singh] the argument is the same one that puts [[json-as-transport-not-cognition|the command line a layer above JSON in the stack]].

A shell is dangerous precisely because it is powerful. The same generality that lets an agent compose four steps also lets it `rm -rf` the wrong tree, pipe credentials into a log, or chain side effects nobody can trace afterward. "Closer to execution" cuts both ways. I do not think you can hand an agent a shell without:

- a sandbox;
- scoped least-privilege permissions;
- a recorded command history a human can review;
- dry-run-then-confirm on anything destructive.

Without those walls you have given an intern a root shell and left the room.

So the shell is the way *in*. It only pays off inside an [[agent-workspaces|environment that makes it durable]] and a governance layer that makes it safe. See [[json-as-transport-not-cognition]] for the layer it sits on top of.

[^singh]: Mukul Singh, "MCP Is Not Enough: Why Code DSLs Will Replace JSON Tool Calling." https://mukulsingh105.github.io/articles/mcp-code-dsl-tool-calling.html
