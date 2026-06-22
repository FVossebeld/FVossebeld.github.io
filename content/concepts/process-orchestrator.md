---
title: Process orchestrator
status: refined
type: concept
description: The layer that understands a cross-system goal and routes the work to scoped agents, without doing the mutations itself.
tags:
  - agentic-ai
  - architecture
---

A process orchestrator is the layer that holds a broad, cross-system goal and routes the work to the [[scoped-agent|scoped agents]] that execute it. Broad intent, narrow execution: the orchestrator understands that a renewal touches CRM, billing, and legal, but it doesn't do those mutations itself. The specialists do, each inside its own boundary.

The reason this layer has to exist (a wall of narrow agents that can't coordinate is as useless as one broad agent is dangerous) is the argument in [[orchestrating-scoped-agents]]. This node is just the name for the routing layer.
