---
title: Federated memory for enterprise agents
description: Letting agents learn from experience without leaking across users, teams, projects, or customers.
tags:
  - agentic-ai
  - enterprise
  - memory
---

An agent that never learns from a job stays a tool forever. An agent that learns by absorbing everything it touches will, sooner or later, carry one customer's data into another customer's session. Enterprise memory has to sit between those two failures: get better over time without leaking across the boundaries that matter — user, team, project, customer, tenant.

The reason this is hard is that the valuable lesson and the sensitive detail arrive in the same episode. "Last time this customer's integration failed, the fix was X" is worth remembering. The customer's name, data, and credentials are not things to carry into the next customer's session. Naive memory — dump every transcript into one store and retrieve by similarity — hands you the lesson and the leak together.

So memory has to be *federated*: partitioned by boundary, with explicit rules about what can move up a level and what stays put. The mechanism for that promotion is the real design problem — see [[memory-promotion-pipeline]] — and it's a large part of why I think [[scoped-system-specialist-agents|scoped agents]] are easier to make trustworthy than broad ones.
