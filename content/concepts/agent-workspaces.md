---
title: Agent workspaces
description: Agents are moving from stateless chat into persistent environments with files, memory, tools, and state.
tags:
  - agentic-ai
  - agent-design
---

A chatbot is stateless. Every turn it gets a transcript and produces a reply; nothing persists but the text. An agent workspace is the opposite bet: give the model a place to stand. Files it can read and write, a shell it can run, memory that outlives the turn, tools and skills it can reach for, state it can inspect.

Once the environment is durable, behaviour changes. The agent can leave itself notes, build up scratch artifacts, check what it did last time, and recover from a failed step by looking at what actually happened rather than re-deriving it from the prompt.

When someone tells me a new model is more capable, my first guess is usually that the environment around it got better, not the weights. The model could mostly always do this work. It finally has somewhere to keep its tools down and pick them back up.

The pattern shows up everywhere now: coding agents with a working tree, assistants with persistent memory stores, tool-using agents with sandboxes. The shared idea is that capability lives in the environment as much as in the weights. Which is why [[cli-as-compressed-action-language|the shell]] matters as the way in, and why the next questions are about [[scoped-system-specialist-agents|where you point the workspace]] and [[federated-memory-for-enterprise-agents|what it's allowed to remember]].
