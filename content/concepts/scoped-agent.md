---
title: Scoped agent
status: refined
type: concept
description: An agent deliberately bounded to one system, knowing it deeply and able to touch nothing else.
tags:
  - agentic-ai
  - architecture
---

A scoped agent is one deliberately bounded to a single system (Salesforce, SAP, ServiceNow, Jira) that it knows deeply and can't reach outside of. The narrowness is the point: a bounded action space is something a security team can reason about, where a do-everything agent's blast radius is the union of everything it touches.

Scope buys you a [[permission-boundary]] that maps onto a real role. It also creates the fragmentation problem that [[orchestrating-scoped-agents|orchestration]] has to solve. [[scoped-system-specialist-agents]] carries the full argument: why scope is what makes an agent governable, and why it isn't enough on its own.
