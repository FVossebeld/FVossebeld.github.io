---
title: Write access
status: working-theory
type: concept
description: "The sandbox-boundary crossing where an agent changes a system outside itself, hard for three stacked reasons: irreversibility, shared truth, accountability."
tags:
  - agentic-ai
  - governance
---

Write access is where an agent crosses the sandbox boundary. Not editing files in its own [[workspace-state|workspace]], not drafting in a scratch buffer it owns. Writing to the CRM the account team reads from. Updating the ticket queue the on-call watches at 2 AM. Posting a journal entry finance closes the month against.

Reading those systems is cheap and reversible by definition. Writing changes the state other people depend on. That crossing is the line that matters, not how sophisticated the action looks.

It is hard for three reasons, and they stack.

<section aria-label="Why write access is hard" style="margin:1.25rem 0 1.5rem 0;">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:1rem;font-family:var(--bodyFont);">
  <article style="background:var(--lightgray);border:1px solid var(--tertiary);border-radius:10px;padding:1rem;">
    <h3 style="font-size:1rem;font-weight:700;color:var(--dark);margin:0 0 .35rem 0;">Irreversible</h3>
    <div style="color:var(--gray);font-size:.92rem;">Email sent, card charged, prior state gone.</div>
  </article>
  <article style="background:var(--lightgray);border:1px solid var(--tertiary);border-radius:10px;padding:1rem;">
    <h3 style="font-size:1rem;font-weight:700;color:var(--dark);margin:0 0 .35rem 0;">Shared truth</h3>
    <div style="color:var(--gray);font-size:.92rem;">A wrong write costs the organization a cleanup.</div>
  </article>
  <article style="background:var(--lightgray);border:1px solid var(--tertiary);border-radius:10px;padding:1rem;">
    <h3 style="font-size:1rem;font-weight:700;color:var(--dark);margin:0 0 .35rem 0;">Accountability</h3>
    <div style="color:var(--gray);font-size:.92rem;">The audit trail still expects a name.</div>
  </article>
  </div>
</section>

**Irreversibility.** The change is usually irreversible. [[Rollback]] is mostly a fiction outside version control. You cannot un-send the email, un-post the Slack announcement, or un-charge the card. Once downstream has consumed the event, the prior state is gone.

**Shared truth.** The target is shared truth. A [[system-of-record]] is not your copy; it is everyone's. A wrong write in your workspace costs you a retry. A wrong write to the record costs the organization a cleanup, and sometimes a customer conversation nobody wanted to have.

**Accountability.** Someone has to be accountable for the result. Today that someone is a person, and the [[audit-trail]] expects a name. "The model decided" is not an answer compliance accepts. Which is why every enterprise write I've actually seen still runs through an [[approval-gate]].

<blockquote style="margin:1.5rem 0;padding:.6rem 0 .6rem 1.4rem;border-left:4px solid var(--tertiary);font-family:var(--headerFont);font-size:1.3rem;line-height:1.4;color:var(--dark);font-style:italic;">
  Retrieval can be agentic; the mutation usually shouldn't be.
  <footer style="margin-top:.5rem;font-family:var(--bodyFont);font-size:.85rem;font-style:normal;color:var(--gray);">
    <cite>write access</cite>
  </footer>
</blockquote>

Across the companies I've worked with, I don't see agents writing to live systems on their own. LLMs assist. People commit. I'm not convinced the write path should run through the model anyway. Most real requests already run on deterministic workflows and APIs, and that part stays deterministic on purpose. The model's job is intent and context. The commit stays boring.

Whether the human stays in that loop forever is the open question, and I argue it in [[approval-gate]].
