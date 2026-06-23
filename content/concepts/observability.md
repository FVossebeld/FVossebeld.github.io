---
title: Observability
status: seed
type: concept
description: Watching agents in aggregate across many production runs, the layer above a single trace, so you see drift before it becomes an incident.
tags:
  - agentic-ai
  - governance
---

An [[agent-trace]] is one run. Observability is the whole population: every run an agent has made in production, watched in aggregate so you can see drift before it turns into an incident. The idea is borrowed from ops, where observability means metrics, logs, and traces over a running system. Here the unit isn't a server's requests, it's an agent's decisions.

Concretely, it's the things you can't read off a single trace: how often the [[approval-gate]] rejects what the agent proposed, the tool-call error rate, how frequently a human later overrides the path the agent picked, and the cost and latency per task. One trace tells you why a single run went wrong. Observability tells you that rejections on the refund tool tripled this week, which is a different and earlier kind of signal.

It sits on top of the rest of the governance cluster rather than beside it. It reads the [[agent-trace]] as its raw event stream, leans on the [[audit-trail]] for the record of what actually changed, and feeds [[agent-evaluation]], because you can't widen a [[permission-boundary]] you can't see. I reach for it the moment an agent runs somewhere I'm not watching: observability is what you build on top of the trace to run agents you never personally saw act.
