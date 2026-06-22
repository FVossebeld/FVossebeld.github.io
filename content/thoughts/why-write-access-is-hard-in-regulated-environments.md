---
title: Why write access is hard in regulated environments
status: working-theory
type: field-note
description: The blocker on agent write access isn't mainly the regulator. It's that organizations don't yet know how, and the APIs were never built to be an agent's surface.
tags:
  - agentic-ai
  - governance
---

Everyone assumes the thing stopping agents from writing to regulated systems is the regulator. That's not what I see. Across the companies I've worked with, agents aren't so much forbidden from changing real systems as never actually tried. LLMs get used for drafting, search, and summarizing. The autonomous write, an agent that has [[write-access]] to the [[system-of-record]] and uses it unattended, basically isn't running anywhere I've looked.

Two things are doing the blocking, and neither is the compliance department.

The first is that organizations don't yet know how. This is new, the patterns aren't settled, and "we'd like an agent to file the change" runs straight into questions nobody has clean answers for yet: what's the [[permission-boundary]], where's the [[approval-gate]], what does the [[audit-trail]] need to capture. Faced with that, the safe move is to not do it. So they don't.

The second is more technical and more stubborn: the surfaces aren't ready. APIs were built for deterministic callers, a script that already knows which endpoint to hit with which payload. You can't hand an agent the full set of APIs and expect it to operate them well. They assume a caller that knows the process, not one reasoning its way through it. This is the same reason I think agents reach for [[human-tools-not-machine-protocols|the tools humans built]]: a system designed for a deterministic integration is a bad fit for an agent, and making it a good fit is real work nobody's done yet.

It's worth being precise about where the agent belongs in that picture. Retrieving data is a good fit: point an agent at a data platform, a warehouse, a Databricks-style data agent, and let it read. That's genuinely useful. The mistake is assuming the same platform should own the write. Most real requests still run on deterministic workflows and APIs, and that layer isn't going away. The agent's job is the retrieval and the intent, deciding what should change and why; the actual mutation goes through the deterministic path that already exists. Putting the AI platform in the execution seat, rather than in front of it, is the overclaim I'd push back on.

So the honest read: write access in regulated environments is hard, but mostly for unglamorous reasons. Not "the regulator forbids it," more "we haven't figured out how, and the plumbing wasn't built for this." That's a more fixable problem than it sounds, and a slower one than the demos imply.
