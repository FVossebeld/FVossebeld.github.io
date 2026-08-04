---
title: Consolidation pass
status: working-theory
type: concept
description: The background job that turns a session's raw traces into deduplicated candidate memories.
tags:
  - agentic-ai
  - memory
---

A consolidation pass runs after a session has gone quiet. It reads raw [[agent-trace|traces]] alongside the memories already stored, merges duplicates, resolves contradictions, and drops stale entries. It is the maintenance work behind a [[memory-promotion-pipeline|promotion pipeline]].

What I care about is its write boundary. Anthropic calls its version [Dreams](https://platform.claude.com/docs/en/managed-agents/dreams): it produces a candidate without editing the input store. The [Azure SRE agent](https://learn.microsoft.com/en-us/azure/sre-agent/memory) runs a similar job after a thread has been idle for about thirty minutes. The job can prepare a lesson. A person decides whether it becomes shared memory or a reusable skill.
