---
title: From chatbots to system operators
description: A working theory about how LLM agents are evolving from chat partners into scoped operators of real systems.
tags:
  - agentic-ai
---

I keep watching the same shift happen and want to write it down while it's still in motion. LLM agents are turning from chat partners into operators of systems, and the interesting parts of the work are moving with them.

It started with chat. You typed, the model replied. The whole interface was a transcript, and the model's only power was to produce more text. Useful, but sealed off from everything that wasn't language.

Then we gave it tools, and the standard way to do that was JSON tool calling: the model emits a structured request, some code runs it, the result comes back. This was the right instinct — agents need to *act* — but I think we picked the wrong layer for the action to live in. [[json-as-transport-not-cognition|JSON is a transport format, not an action language]]. It's how machines hand data to each other; it has no sense of doing, of sequencing, of recovering from a failed step. We bolted the model's hands onto a serialization format because it was convenient.

There's a better candidate sitting right there. [[cli-as-compressed-action-language|The command line is closer to how humans actually operate systems]] — dense, composable, and, the part that matters, the same string you'd type is the thing that runs, with output returning through the same channel. Code-writing agents that work through a shell don't feel like chatbots calling functions. They feel like engineers at a terminal. That's not an accident; it's the action layer fitting the work.

But an action language is only half of it. To operate a system you have to be *in* one. [[agent-workspaces|Agents are growing habitats]]: files, a shell, durable memory, tools, state that survives the turn. Most of the recent capability jump looks to me less like smarter models and more like better environments — the model could mostly always do this; it finally has somewhere to do it.

Point that environment at the enterprise and the shape of the useful product gets clearer. Not one autonomous agent running the company, but [[scoped-system-specialist-agents|agents scoped to a single system]] — Salesforce, SAP, ServiceNow — that know it deeply and can't touch anything else. Scope is what makes them governable, and governability is what enterprises actually buy. A scoped agent stops being a feature bolted onto an app and becomes [[the-agent-as-semantic-ui|a semantic interface to the system itself]]: you state intent, it translates that into governed, logged actions.

The open problem — the one I don't think anyone has cleanly solved — is memory. An agent that can't learn is a tool; an agent that learns by pooling everything it sees is a leak. [[federated-memory-for-enterprise-agents|Enterprise memory has to be federated]]: partitioned by user, team, and customer, with hard rules about what crosses a boundary. The mechanism I find most convincing is a [[memory-promotion-pipeline|promotion pipeline]] — raw episode, to private memory, to sanitized lesson, to approved playbook, to reusable skill — where each step is a gate that strips specificity and adds review. Learning without leaking is the gate, not the conveyor belt.

Put it together and the through-line is simple: we're giving language models the action languages, environments, scopes, and memory that humans use to operate systems. Chat was the demo. The system operator is the product. The hard, unfinished part is letting these things learn from experience without betraying the boundaries that make them safe to deploy at all.

This is a working theory, not a finished one. The concept pages linked above are where I pull each thread apart; expect them to change as I do.
