---
title: Workspace state
status: refined
type: concept
description: The durable, mutable state an agent keeps in its own workspace, the scratch space where tentative thinking is allowed.
tags:
  - agentic-ai
  - workspace
---

Workspace state is what an agent keeps in its own environment between steps: files, notes, scratch artifacts, a record of what it already tried. It's the durable memory of [[agent-workspaces|the workspace]], the thing that lets an agent recover from a failed step by looking at what actually happened instead of re-deriving it from the prompt.

The distinction I care about: the workspace is where tentative thinking belongs, the opposite pole of a [[system-of-record]], which only holds committed truth. An agent should be free to be messy and wrong in its workspace state, and disciplined about what it lets cross into the record. The fuller case for situated agents is in [[agent-workspaces]].
