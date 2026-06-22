---
title: Workspace state
status: refined
type: concept
description: The durable scratch state an agent owns and can mutate freely, on the safe side of the write-access boundary.
tags:
  - agentic-ai
  - workspace
---

Workspace state is what an agent keeps in its own environment between steps: files, notes, scratch artifacts, a record of what it already tried. It persists across turns, so the agent can look at what happened last time instead of re-deriving from the prompt.

This is the safe side of the [[write-access]] boundary. An agent can be messy and wrong here because nothing in its workspace binds anyone else. A [[system-of-record]] does bind others, which is why moving a result from workspace into record is the operation that costs trust. The discipline is keeping tentative thinking here and letting only a checked result cross that line.

The fuller argument for why a durable environment changes agent behaviour is in [[agent-workspaces]].
