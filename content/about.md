---
title: About me
description: Who I am, what I work on, and why this site exists.
---

<div class="portrait">

![[assets/profile.png|Floris Vossebeld]]

</div>

I'm Floris Vossebeld. I work on applied AI in regulated enterprises (mostly financial services) at Microsoft. The job sits in an awkward, interesting place: between the demo that impressed everyone in the room and the system that has to survive real data, permissions, latency, cost, and someone owning it on Monday.

That gap is what this site is about.

A lot of AI looks convincing right up until it touches any of that. I spend my time close to where it does, with banks and insurers and the constraints they can't wish away. So I'm less interested in whether a model is impressive than in what it takes to make one a governable, useful part of a system people actually depend on.

## Where I come from

My background is in computer science and data science, and the thread running through it is tool use, feedback loops, and systems that can correct themselves. That's the lens I brought to my master's thesis: using reinforcement learning to teach an agent to walk a knowledge graph, use tools, and recover from its own wrong turns instead of answering in one shot. It's still how I look at most things. The route here:

<div style="position:relative;border-left:2px solid var(--lightgray);margin:1.5rem 0;padding-left:1.6rem;display:flex;flex-direction:column;gap:1.4rem;font-family:var(--bodyFont);">
  <div style="position:relative;">
    <span style="position:absolute;left:calc(-1.6rem - 8px);top:.2rem;width:13px;height:13px;border-radius:50%;background:var(--tertiary);border:2px solid var(--light);"></span>
    <div style="font-size:.76rem;text-transform:uppercase;letter-spacing:.05em;color:var(--tertiary);font-weight:700;">2019–2022</div>
    <div style="font-weight:700;color:var(--dark);">BSc Business Information Technology · University of Twente</div>
    <div style="color:var(--gray);font-size:.92rem;">Computer science with a business-systems bent.</div>
  </div>
  <div style="position:relative;">
    <span style="position:absolute;left:calc(-1.6rem - 8px);top:.2rem;width:13px;height:13px;border-radius:50%;background:var(--secondary);border:2px solid var(--light);"></span>
    <div style="font-size:.76rem;text-transform:uppercase;letter-spacing:.05em;color:var(--secondary);font-weight:700;">2023–2025</div>
    <div style="font-weight:700;color:var(--dark);">MSc Computer Science, Data Science · University of Twente</div>
    <div style="color:var(--gray);font-size:.92rem;">Magna cum laude. Thesis graded 9.5: reinforcement learning to make an LLM build and refine SPARQL queries over a knowledge graph.</div>
  </div>
  <div style="position:relative;">
    <span style="position:absolute;left:calc(-1.6rem - 8px);top:.2rem;width:13px;height:13px;border-radius:50%;background:var(--tertiary);border:2px solid var(--light);"></span>
    <div style="font-size:.76rem;text-transform:uppercase;letter-spacing:.05em;color:var(--tertiary);font-weight:700;">2024–2025</div>
    <div style="font-weight:700;color:var(--dark);">Co-founder · ChatIT</div>
    <div style="color:var(--gray);font-size:.92rem;">Trained teams to use tools like ChatGPT and advised leaders on where generative AI actually cuts cost.</div>
  </div>
  <div style="position:relative;">
    <span style="position:absolute;left:calc(-1.6rem - 8px);top:.2rem;width:13px;height:13px;border-radius:50%;background:var(--secondary);border:2px solid var(--light);"></span>
    <div style="font-size:.76rem;text-transform:uppercase;letter-spacing:.05em;color:var(--secondary);font-weight:700;">2025</div>
    <div style="font-weight:700;color:var(--dark);">Microsoft internship → ISWC 2025, Nara</div>
    <div style="color:var(--gray);font-size:.92rem;">The thesis grew out of a Microsoft Netherlands internship. I presented <a href="https://arxiv.org/abs/2511.11770" style="color:var(--secondary);">Learning to Refine</a> at the RAGE-KG workshop — 49.7% on LC-QuAD 2.0, up 17.5 points on the prior iterative baseline.</div>
  </div>
  <div style="position:relative;">
    <span style="position:absolute;left:calc(-1.6rem - 8px);top:.2rem;width:13px;height:13px;border-radius:50%;background:var(--tertiary);border:2px solid var(--light);"></span>
    <div style="font-size:.76rem;text-transform:uppercase;letter-spacing:.05em;color:var(--tertiary);font-weight:700;">Aug 2025 – now</div>
    <div style="font-weight:700;color:var(--dark);">Solution Engineer, Cloud &amp; AI Apps (Financial Services) · Microsoft</div>
    <div style="color:var(--gray);font-size:.92rem;">Hands-on with the largest banks and insurers, moving GenAI from proof-of-concept to production.</div>
  </div>
</div>

## What I write here

This is a notebook, not a brand. Three kinds of thing end up here:

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin:1.5rem 0;font-family:var(--bodyFont);">
  <div style="background:var(--lightgray);border-left:5px solid var(--secondary);border-radius:8px;padding:.9rem 1.1rem;">
    <div style="font-weight:700;color:var(--secondary);margin-bottom:.35rem;">Essays</div>
    <div style="color:var(--darkgray);font-size:.92rem;line-height:1.5;">The longer arguments — like the case that AI is shifting from interface to infrastructure.</div>
  </div>
  <div style="background:var(--lightgray);border-left:5px solid var(--tertiary);border-radius:8px;padding:.9rem 1.1rem;">
    <div style="font-weight:700;color:var(--tertiary);margin-bottom:.35rem;">Technical sketches</div>
    <div style="color:var(--darkgray);font-size:.92rem;line-height:1.5;">One diagram, one idea: retrieval beyond vector search, federated memory, approval flows — the architectures I keep redrawing.</div>
  </div>
  <div style="background:var(--lightgray);border-left:5px solid var(--gray);border-radius:8px;padding:.9rem 1.1rem;">
    <div style="font-weight:700;color:var(--dark);margin-bottom:.35rem;">Field notes</div>
    <div style="color:var(--darkgray);font-size:.92rem;line-height:1.5;">Occasional and less technical: what demos teach about clarity, and the courage it takes to ask the obvious question.</div>
  </div>
</div>

The current spine is [[thoughts/from-chatbots-to-system-operators|From chatbots to system operators]]. Mostly the systems; sometimes the human parts of doing the work. If there's one bet under all of it, that's it — and the hard problems are the boring-sounding ones: trust, ownership, evaluation, scope.

## Find me elsewhere

- **GitHub:** [@FVossebeld](https://github.com/FVossebeld)
- **LinkedIn:** [floris-vossebeld](https://www.linkedin.com/in/floris-vossebeld/)

## How this site works

This is a public, version-controlled wiki. I curate the sources and stay the editor-in-chief; an AI agent does the cross-referencing and maintenance. The source is fully open: [view or fork it on GitHub](https://github.com/FVossebeld/FVossebeld.github.io). See [[how-this-works]] for the full picture.
