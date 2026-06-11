---
title: CLI as a compressed action language
description: The command line isn't just shorter than JSON tool calls — it's closer to execution.
tags:
  - agentic-ai
  - tool-calling
---

The command line is the densest action language we have. `grep -rn foo src/ | head` expresses a search, a scope, and a truncation in a handful of tokens, and it runs. The JSON equivalent is a tool name, an arguments object, and three or four keys whose exact schema the model has to recall.

The CLI version is shorter, but that's the least of it. It's *closer to execution*: the same string a person would type is the thing that runs, and the output comes back through the same channel.

That matters for agents for three reasons:

- **Tokens.** Commands are compact, so more of the budget goes to thinking instead of restating schemas.
- **Composition.** Pipes and redirects let the model chain steps without a round-trip through orchestration code.
- **Familiarity.** The model has read millions of shell sessions. The action space is one it already inhabits, not a bespoke schema it has to be taught per tool.

This is why code-writing agents that work through a shell feel different from chatbots wired to JSON tools. They're not calling functions; they're operating a system the way an engineer does. See [[json-as-transport-not-cognition]] for the other half of this, and [[agent-workspaces]] for the environment that makes it pay off.
