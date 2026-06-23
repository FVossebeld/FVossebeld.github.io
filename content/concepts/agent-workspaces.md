---
title: Agent workspaces
status: refined
type: concept
description: Capability lives in the coupling between a model and its workspace. Give it a durable environment and behaviour changes; the two co-evolve.
tags:
  - agentic-ai
  - agent-design
---

A chatbot is stateless. Every turn it gets a transcript and produces a reply; nothing persists but the text.

An agent workspace is the opposite bet: give the model a place to stand. Files it can read and write. A shell it can run. Durable memory that outlives the turn. Around those, the smaller machinery that makes them usable: [[workspace-state|scratch state]], command history, tests the agent can run against its own output.

Once the environment is durable, behaviour changes. The agent can leave itself notes, build scratch artifacts, check what it did last time, recover from a failed step by looking at *what actually happened* instead of re-deriving from the prompt. That is the gap between answering a question and operating a system. A stateless chat starts from zero every turn. A situated agent accumulates.

I keep seeing the same structure. Copilot CLI works in a real checkout with a terminal and a test runner. Cursor gets the developer's directory and a shell. Claude Code gets a sandbox it can fork and roll back. The models underneath are from the same generation, give or take. The gap in useful output traces to the environment at least as much as to the weights.

I want to be careful not to overstate that. The model still matters. But **model and environment co-evolve**. A weak model needs rigid schemas and narrow tool calls; you cannot hand it a shell. A stronger model (better at planning, better at recovering from its own mistakes) can operate a messier workspace, and the workspace is what turns that reasoning into durable work instead of a clever transcript. When a new release "feels much more capable," both usually moved at once: the weights got better at reasoning and recovery, and someone finally gave them a persistent environment to reason *in*. Capability is in the coupling.

Which is why [[cli-as-compressed-action-language|the shell]] matters as the way in, why the next questions are about [[scoped-system-specialist-agents|where you point the workspace]] and [[federated-memory-for-enterprise-agents|what it's allowed to remember]].
