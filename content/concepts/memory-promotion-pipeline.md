---
title: The memory promotion pipeline
description: How raw agent experience should move through abstraction and review before it becomes shared knowledge.
tags:
  - agentic-ai
  - enterprise
  - memory
---

Raw experience shouldn't become shared knowledge automatically. It should be promoted through stages, losing specificity and gaining trust at each step:

1. **Raw episode** — what actually happened this session, with all its private detail. Stays local.
2. **Private memory** — a durable note scoped to one user or tenant. Still sensitive.
3. **Sanitized lesson** — the generalisable insight with identifying detail stripped out.
4. **Approved playbook** — a sanitized lesson a human has signed off as correct and shareable.
5. **Reusable skill** — a playbook compressed into a procedure the agent reaches for by default.

Each promotion is a checkpoint a piece of knowledge has to clear, not an automatic step it rides through. Most episodes never leave the first stage. That's by design: promotion is where abstraction and human review happen, which is exactly where leaks and bad lessons get caught. Skip the checkpoints and you've rebuilt the leaky shared store from [[federated-memory-for-enterprise-agents]].

It's also how a workspace's raw memory turns into durable capability over time — see [[agent-workspaces]].
