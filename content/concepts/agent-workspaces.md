---
title: Agent workspaces
description: Agents are moving from stateless chat into persistent environments with files, memory, tools, and state — and capability lives in the coupling between model and environment.
tags:
  - agentic-ai
  - agent-design
---

A chatbot is stateless. Every turn it gets a transcript and produces a reply; nothing persists but the text. An agent workspace is the opposite bet: give the model a place to stand. Files it can read and write, a shell it can run, durable memory that outlives the turn — and around those, the smaller things that make them usable: scratchpads, logs of what it already did, tests it can run to check its own work, skills it can reach for.

Once the environment is durable, behaviour changes. The agent can leave itself notes, build up scratch artifacts, check what it did last time, and recover from a failed step by looking at *what actually happened* instead of re-deriving it from the prompt. That's the difference between answering a question and operating a system: a stateless chat starts from zero every turn; a situated agent accumulates.

The pattern shows up everywhere now. Coding agents work in a real working tree with a terminal and a test runner. Assistants carry persistent memory stores across sessions. Tool-using agents get sandboxes they can poke at and roll back. The shared idea is that capability lives in the environment as much as in the weights.

I want to be careful not to overstate that, though, because it's the easy version of a more interesting claim. It's not that the model stopped mattering — it's that **the model and the environment co-evolve**. A weak model needs rigid schemas and narrow tool calls; it can't be trusted with a shell. A stronger model — better at planning, long-context reasoning, and recovering from its own mistakes — can operate a messier, more open-ended workspace, and the workspace is what turns that reasoning into durable work instead of a clever transcript. So when a new model "feels much more capable," my guess is usually that both moved at once. The capability is in the coupling.

Which is why [[cli-as-compressed-action-language|the shell]] matters as the way in, and why the next questions are about [[scoped-system-specialist-agents|where you point the workspace]] and [[federated-memory-for-enterprise-agents|what it's allowed to remember]].
