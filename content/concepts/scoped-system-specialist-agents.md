---
title: Scoped system-specialist agents
description: Why enterprise agents should be scoped to one system rather than one broad autonomous operator.
tags:
  - agentic-ai
  - enterprise
---

The fantasy is one autonomous agent that runs the whole company. The useful version is narrower: an agent scoped to a single system — Salesforce, SAP, ServiceNow, Jira, Workday — that knows that system deeply and can't touch anything else.

The narrowness is the design, not a compromise. A Salesforce-scoped agent can be given the system's real semantics — its objects, permissions, and validation rules — a bounded set of actions, and an audit trail a security team will actually sign off on. A do-everything agent can't be reasoned about: its blast radius is the union of every system it touches, and nobody can say what it will or won't do. Enterprises don't buy capability they can't bound.

This also matches how organisations already divide work — by system and by role, not by one omniscient operator.

The interesting consequence is that the agent stops being a chatbot bolted onto an app and becomes [[the-agent-as-semantic-ui|the interface to the system itself]]. The hard part is governance, especially memory: see [[federated-memory-for-enterprise-agents]].
