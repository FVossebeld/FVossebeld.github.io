---
title: Scoped agent
status: refined
type: concept
description: An agent deliberately bounded to one system, knowing it deeply and able to touch nothing else.
tags:
  - agentic-ai
  - architecture
---

A scoped agent is one deliberately bounded to a single system (Salesforce, SAP, ServiceNow, Jira) that it knows deeply and can't reach outside of. The narrowness is the point: a bounded action space is something a security team can actually reason about, where a do-everything agent's blast radius is the union of everything it touches.

I make the full argument, why scope is what makes an agent governable and why scope alone isn't enough, in [[scoped-system-specialist-agents]]. The short version: scope buys you a [[permission-boundary]] that maps onto a real role, and it creates the fragmentation problem that [[orchestrating-scoped-agents|orchestration]] then has to solve.
