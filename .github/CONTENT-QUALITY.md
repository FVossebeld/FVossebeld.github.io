# Content quality bar: the anti-slop charter

This is the single source of truth for what "good" looks like in this garden. Every
AI assistant, custom agent, and review workflow in this repo references this file.

**The prime directive: the human (Floris) is the author and editor. AI assists with
research, structure, and bookkeeping, but it never ships prose that sounds like a machine
wrote it.** When in doubt, write less, and write it more like a person.

This file is the bar and the verdict. The exhaustive catalogue of tells (every family
below, with real examples, sources, and the fix for each) lives in
[`anti-slop-field-guide.md`](./anti-slop-field-guide.md). Read it once; this charter assumes
you have.

---

## 1. AI tells: the machine-sounding tics (hard reject)

Reject or rewrite any draft carrying these. Each maps to its full entry (example plus the
fix) in [`anti-slop-field-guide.md`](./anti-slop-field-guide.md). The sixteen families:

- **Inflated significance / broader-trend padding** (A): "stands as a testament to", "plays
  a pivotal role", "marks a turning point", "in an ever-evolving landscape", "leaves an
  indelible mark".
- **Superficial "-ing" tails** (B): "..., highlighting its enduring relevance", "...,
  underscoring its role as a hub". Editorial gestures with nothing checkable behind them.
- **Vague attribution / manufactured consensus** (C): "experts say", "studies show",
  "widely regarded"; one source inflated to "several".
- **Negative parallelism / antithesis** (D): "It's not just X, it's Y", "not only ... but
  also". The signature AI cadence (often joined with an em dash).
- **Rule-of-three reflex** (E): "fast, simple, and powerful" everywhere; triads faking
  thoroughness.
- **Promotional / travel-brochure tone** (F): "nestled in the heart of", "rich tapestry",
  "vibrant", "breathtaking", "a diverse array".
- **Copula avoidance / marketing verbs** (G): "serves as", "stands as", "boasts",
  "features" in place of plain "is / are / has".
- **Hollow conclusions / canned outline** (H): "In conclusion", "At the end of the day",
  and the "Despite its challenges ... bright future" wrap-up.
- **Conversational scaffolding** (I): "Let's dive in", "Here's the kicker", "Here's the
  thing", "The reality is", "At its core".
- **Sycophancy / assistant chatter** (J): "Great question!", "You're absolutely right",
  "I hope this helps", "In this article, we will explore".
- **Hedge soup / knowledge-cutoff disclaimers** (K): "it's important to note", "as of my
  last update", "while specific details are limited".
- **AI-vocabulary pile-up** (L): delve, underscore, tapestry, testament, intricate,
  meticulous, pivotal, crucial, leverage (filler), robust, seamless, foster, showcase,
  harness, elevate, holistic, multifaceted. One may be chance; a cluster is the tell.
- **Elegant variation** (M): renaming the same thing with a fresh synonym every time it
  recurs.
- **Uniform rhythm** (N): every sentence the same length, no burstiness.
- **Regression to the mean** (O): bland could-be-any-subject prose, or its mirror image,
  fabricated specificity (see also section 2).
- **Formatting tells** (P): em-dash overuse, bold-everything, the "**Term**: description"
  bullet list, Title-Case Headings, emoji as decoration, listicle reflex, needless tables,
  and the conclusive paste artifacts (`cite` turn markers, `oai_citation`, stray `##` or
  `---`, `2025-XX-XX` placeholder dates).

**House style: no em dashes in our own prose.** Em-dash overuse is itself a tell (family
P). Use a comma, a colon, parentheses, or a full stop instead.

## 2. Substance failures (hard reject)

- **Fabrication, zero tolerance.** No invented stats, quotes, dates, sources, or citations.
  Every factual claim traces to a source in `raw/`, an existing page, or is clearly marked
  as the author's opinion. A confident, specific-sounding, made-up detail is the worst
  failure here, worse than vagueness, because it looks trustworthy. When a fact is missing,
  leave a visible `> TODO(floris): ...` marker; never paper the gap with a guess or
  "details are limited".
- **Misrepresented sources.** Do not attach a claim to a real source that does not support
  it. Cited-but-wrong is fabrication wearing a citation.
- **Vagueness.** If a sentence would survive unchanged for any other subject, it says
  nothing; cut it. Demand concrete nouns, real names, specific numbers.
- **Padding.** If removing a sentence loses no information, remove it.

## 3. What good looks like (the positive bar)

- **A point of view.** The piece argues or shows something the author actually thinks.
  Opinions welcome; mush is not.
- **Concrete and specific.** Real examples, real names, real numbers, lived detail.
- **Varied human rhythm.** Short punchy sentences against longer ones. Fragments allowed.
  Let it breathe.
- **Plain words.** The short, common word over the impressive one.
- **Earns its length.** Short by default. Expand only when the idea needs it.
- **Sounds like Floris.** First person, direct, a little dry, unafraid of a strong take. See
  [`instructions/content.instructions.md`](./instructions/content.instructions.md) for the
  voice in detail; the essay `thoughts/from-chatbots-to-system-operators` is the reference
  tone.

## 4. The verdict (used by every reviewer)

The bar holds at two moments, and both must pass:

1. **At write time** (these instructions, `style-editor`, `wiki-ingest`): write the draft,
   then hunt it against sections 1 and 2 and the field guide, and kill every tell *before*
   proposing. Slop should never reach review.
2. **At review time** (`slop-verifier`, the `content-quality-review` workflow): the gate
   below. Nothing under the bar passes, however polished.

**Before scoring, walk this checklist** (every item, shown in the review):

- [ ] Read the changed prose against all sixteen section-1 families and the field guide;
      listed every hit with an exact quote.
- [ ] Checked every factual-looking claim against `raw/` and cited sources; flagged anything
      unsupported or misattributed.
- [ ] Confirmed the draft has a point of view and concrete specifics, not generic
      competence.
- [ ] Read it for rhythm: burstiness, or drone?
- [ ] Confirmed it sounds like Floris, not a capable stranger.

**Then output exactly this block:**

```
VERDICT: PASS | REVISE | REJECT
SCORE: <0-100>           # publishable bar is >= 80
AI-TELLS: <exact quotes + the family each breaks, or "none">
SUBSTANCE: <fabrication / misattribution / vagueness / padding, with quotes, or "none">
VOICE: <does it sound like Floris with a view? what's missing?>
TOP FIXES: <the 3 highest-leverage concrete edits>
```

**Scoring rubric** (be strict: "fine" is a REVISE, not a PASS):

- **90 to 100 (PASS):** sounds like a specific person with a view. No tells, or one trivial
  and defensible. Concrete throughout.
- **80 to 89 (PASS):** clears the bar. Maybe a phrase to tighten, but no real tells and
  nothing fabricated.
- **60 to 79 (REVISE):** competent but soulless, or carrying tells, or vague in places. Hand
  back a rewrite.
- **Below 60 (REJECT):** slop, or a substance failure (see caps).

**Hard caps. These make it impossible for slop to score 80 or above:**

- **Any fabrication, misattributed source, or paste artifact: automatic REJECT,** score
  capped at 30, no matter how good the prose. Polish never buys back invention.
- **Any unaddressed section-1 tell: capped at 79** (cannot PASS) until it is fixed.
- **Three or more section-1 families present: capped at 60** (REVISE at best). That density
  is the signal, not coincidence.
- **Generic could-be-any-subject prose, or no discernible point of view: capped at 70,**
  even when clean of tells. Soulless competence is a fail here.

**Close the loop.** On PASS, one line confirming it clears the bar. On REVISE or REJECT,
append a `### Suggested rewrite` in Floris's voice that strips the tells, but never invent
facts, numbers, or sources to do it; leave `> TODO(floris): ...` where real substance is
missing.

**One caution on method.** Judge the *writing* against this charter and the field guide,
never an automated AI-detector score. Those tools sit barely above chance and misfire on
good human writing; a cluster of tells you can quote is the evidence, a detector's
percentage is not. The bar applies to AI and human drafts identically: the goal is good
writing, not catching a robot.