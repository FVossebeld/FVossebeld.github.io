---
title: Start with one agent, delegate by evidence
status: working-theory
type: essay
description: Agent count is an architectural decision. Start with one capable agent, then add boundaries when their value beats their coordination cost.
tags:
  - agentic-ai
  - architecture
draft: true
---

My default is one capable agent, a clear set of tools, and skills it can load when a task needs them. I add another agent when a boundary earns its keep, not because the task sounds complicated.

Complexity is a poor proxy for agent count. A task can involve many steps and still be easier to reason about in one context, with one agent making tool calls and seeing the results. Splitting it creates work of its own: deciding what to delegate, assembling a handoff, reconciling results, and recovering when one part fails. Those costs are real even when the subagents are competent.

That is why I separate skills from agents. A skill packages a procedure the main agent can use on demand. It does not need its own identity, context, or message-passing protocol. [[tool-calling]] gives the agent ways to act; [[context-window|context selection]] determines what it can reason over. Neither requires a team.

## What earns another boundary

Parallel work can cut elapsed time when the parts are genuinely independent. If two research questions can be investigated at once and combined without much negotiation, separate agents may help. If each answer depends on the other, the handoffs can cost more than the parallelism saves.

There is also a case for context isolation. A focused job can run without filling the main agent's window with material it does not need. Claude Code's [subagent documentation](https://code.claude.com/docs/en/sub-agents) describes sending exploration into its own context, or giving a focused task its own tools and instructions, then bringing back the useful result. Speed is not the only reason to delegate.

Claude Code subagents are a harness feature for bounded delegation: the parent asks the harness to run focused work with its own context, tools, and instructions, then gets a result back. That is communication between agents in the ordinary sense. The parent still owns the decision to delegate and what happens after the result returns.

I use “agent-to-agent communication” here for a different architectural question: do distinct agents exchange messages through an explicit interface as part of the system's control flow? An orchestrator can route that exchange, as in Anthropic's multi-agent research system, or agents can coordinate more directly. That example is orchestrator-worker, not peer-to-peer. A harness can run workers within a larger multi-agent system, so the categories can overlap. A subagent feature alone does not tell me whether the larger system has an agent-to-agent communication architecture.

Review is a more delicate case. A separate agent can catch errors the producing agent is too close to notice, but only if the review is meaningfully independent and its findings are cheaper to resolve than the mistakes it catches.

These boundaries are choices about coordination and permissions as much as about model calls. [[scoped-agent|A scoped agent]] makes sense when limiting what it can see or change is valuable in its own right. When work crosses those scopes, [[orchestrating-scoped-agents|an orchestrator]] may have to own handoffs and partial completion. That architecture solves a real problem, but it is not free.

## The counterexample matters

“Use one agent” is a starting point, not a rule against teams. Anthropic reports that its multi-agent research system scored 90.2% better than a single-agent baseline on its internal research evaluation. The same post says the system used roughly 15 times as many tokens as chat, describes duplicated work caused by over-spawning, and warns that the pattern fits poorly when tasks are highly interdependent. Those are results and cautions about one research system, not a universal forecast for agent architectures. [Anthropic's account](https://www.anthropic.com/engineering/multi-agent-research-system) is useful precisely because it shows both the gain and its price.

Anthropic's broader [guide to building effective agents](https://www.anthropic.com/engineering/building-effective-agents) recommends starting with the simplest solution and adding complexity when it measurably improves results. OpenAI's [practical guide](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) says to maximize a single agent's capabilities first, then consider splitting when its domain grows too broad or its prompt becomes unreasonably long or convoluted. I read these as design advice, not evidence that production systems are broadly moving in one direction.

The test is comparative. Run the same kind of work with one agent and with the proposed boundary. Compare the result, elapsed time, token cost, and failures that need human repair. [[agent-evaluation|Evaluation]] is what turns “this seems easier to manage” into evidence. If the second agent does not improve an outcome I care about, it has not earned its place.

I want architectures that can grow into multi-agent systems without treating them as the destination. Start with one agent. Add a boundary when the measured gain pays for the coordination it brings.

## Sources

- [Anthropic, “Building effective agents”](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic, “How we built our multi-agent research system”](https://www.anthropic.com/engineering/multi-agent-research-system)
- [OpenAI, “A practical guide to building agents”](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)
- [Claude Code, “Subagents”](https://code.claude.com/docs/en/sub-agents)
