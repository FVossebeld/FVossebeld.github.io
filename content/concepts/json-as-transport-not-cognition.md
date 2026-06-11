---
title: JSON is transport, not cognition
description: Why JSON works as the wire format for tool calls but not as the layer an agent thinks and acts in.
tags:
  - agentic-ai
  - tool-calling
---

JSON tool calling was the obvious next step after chat. We reached for it because it was already everywhere and models could already produce it. If you used the early function-calling stacks, the failure mode was obvious: wrong keys, missing fields, half-formed calls. A schema cleaned that up enough for a runtime to validate and execute it. That was a useful reliability hack, not some deep statement about how agents should act. Then the hack quietly became the default mental model for what "an agent doing something" _is_: emit an object, get an object back.

The distinction I care about is **transport versus cognition**. JSON is excellent transport. It's stable, parseable, language-neutral, easy to validate against a schema, and every API already speaks it. None of that is in dispute, and I'm not arguing it should go away. The claim is narrower: JSON belongs _lower in the stack_ than we put it. It's a fine way for one machine to hand structured data to another; it's a poor layer for the model to think and act _in_.

Why poor? Because it carries no notion of doing. There's no sequencing, no composition, no "if this failed, try that." Each action is a flat object the model fills in blind, then waits for a result whose shape it couldn't see in advance. Watch a person operate a system and they don't write JSON; they type a command, read the output, and pipe it into the next thing. The action language and the feedback loop are the same medium. JSON tool calling splits them: the model emits a request in one language and reads results in another, with all the orchestration logic living outside the model in glue code nobody enjoys writing.

The same action, both ways. JSON:

```json
{
  "tool": "search_files",
  "arguments": {
    "query": "OPENAI_API_KEY",
    "path": ".",
    "recursive": true,
    "include_line_numbers": true
  }
}
```

The CLI equivalent:

```bash
grep -rn "OPENAI_API_KEY" .
```

The shell version isn't just shorter. It's the thing that _runs_, and its output comes back through the same channel it went out on, so it composes. The JSON version is a description of an action handed to someone else to perform.

**The strongest counterargument:** constrained JSON is _reliable_. A tight schema is easy to validate, hard to inject into, trivial to log, and forces the model into a small, auditable action space, which in a regulated system is a feature, not a limitation. That's real, and it's exactly why JSON should stay as the wire format underneath. The part I think changed is the model. If the model is now good enough to plan, recover, and operate a richer surface, the old reason for making it think in flat objects gets weaker. The real question is whether the layer the model _reasons in_ should stay that same flat schema, or move up to something with a sense of execution. My current bet is that it should move up: keep JSON as transport, and let [[cli-as-compressed-action-language|the command line (and code) be the action language]] above it.
