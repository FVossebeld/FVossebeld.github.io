---
title: Process orchestrator
status: refined
type: concept
description: The coordination layer that holds a cross-system goal and routes work to scoped specialists. It holds write access to none of the target systems.
tags:
  - agentic-ai
  - architecture
---

A process orchestrator is the coordination layer that holds a cross-system goal and routes work to the [[scoped-agent|scoped agents]] that execute it. It understands that a renewal touches CRM, billing, and legal. It holds [[write-access]] to none of them. The specialists mutate; the orchestrator sequences the work and decides what moves next.

Why this layer has to exist, and the three hard problems it creates (context handoff, transaction ownership, [[rollback]]), is the argument in [[orchestrating-scoped-agents]].
