---
title: Permission boundary
status: working-theory
type: concept
description: The fence that decides what an agent may touch at all, set before it runs, and why we draw it too tight today.
tags:
  - agentic-ai
  - governance
---

A permission boundary is the fence: what an agent is allowed to touch at all, decided before it runs. It's the static half of governance, and it's worth keeping separate from the two things it gets confused with. An [[approval-gate]] is a pause for sign-off on a specific action, decided in the moment. An [[audit-trail]] is the record you read afterwards. The boundary says where the agent can go, the gate says wait here, the trail says here's what happened.

My complaint is that we draw the fence too tight. The instinct with anything new is to box it in, so most agents today are allowed to read everything and change almost nothing. For where the models now are, that's the wrong default. We should let agents help more inside the systems we already run, and widen what they're permitted to do. The safety move isn't a narrow fence, it's a wider fence with an [[approval-gate]] on the actions that can hurt, and then relaxing the gate as the agent earns the trust.
