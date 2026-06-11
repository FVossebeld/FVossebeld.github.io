# Content quality bar — the anti-slop charter

This is the single source of truth for what "good" looks like in this garden. Every
AI assistant, custom agent, and review workflow in this repo references this file.

**The prime directive: the human (Floris) is the author and editor. AI assists with
research, structure, and bookkeeping — it never ships prose that sounds like a machine
wrote it.** When in doubt, write less, and write it more like a person.

---

## 1. Hard rejects — telltale AI tics (never publish these)

Reject or rewrite any draft containing these "AI giveaways":

- **"It's not just X — it's Y"** and "not only… but also" inflation.
- **Empty grandiosity:** "In today's fast-paced world", "ever-evolving landscape",
  "game-changer", "unlock", "harness the power of", "navigate the complexities of".
- **Thesaurus tells:** *delve, tapestry, testament, realm, underscore, moreover,
  furthermore, leverage (as filler), robust, seamless, crucial, pivotal, vibrant.*
- **Mechanical rule-of-three** everywhere ("fast, simple, and powerful").
- **Sycophancy:** "Great question!", "You're absolutely right", "Let's dive in!".
- **Hollow conclusions:** "In conclusion", "At the end of the day", "The bottom line is".
- **Listicle reflex:** turning every idea into a bulleted list when prose is better.
- **Uniform rhythm:** every paragraph the same length, every sentence the same shape.
- **Hedge soup:** "it's important to note", "it's worth mentioning", "generally speaking".
- **Emoji-as-decoration** in headings or to punctuate every bullet.

## 2. Hard rejects — substance failures

- **No fabrication.** Every factual claim must trace to a source in `raw/` or be
  clearly marked as the author's opinion. No invented stats, quotes, or citations.
- **No vagueness.** If a sentence survives unchanged for any topic, it says nothing —
  cut it. Demand concrete nouns, real examples, specific numbers.
- **No padding.** If removing a sentence loses no information, remove it.

## 3. What good looks like (the positive bar)

- **A point of view.** The piece argues something or shows something the author
  actually thinks. Opinions are welcome; mush is not.
- **Concrete and specific.** Real examples, real names, real numbers, lived detail.
- **Varied human rhythm.** Mix short punchy sentences with longer ones. Allow
  fragments. Let it breathe.
- **Plain words.** Prefer the short, common word over the impressive one.
- **Earns its length.** Short by default. Expand only when the idea needs it.
- **Sounds like Floris.** First person, direct, a little dry, unafraid of a strong
  take. (Tune this line as the voice settles — see `.github/instructions/content.instructions.md`.)

## 4. The verdict format (used by review agents)

When auditing a draft, output exactly:

```
VERDICT: PASS | REVISE | REJECT
SCORE: <0-100>           # publishable bar is >= 80
AI-TELLS: <list specific quotes + the rule each violates, or "none">
SUBSTANCE: <fabrication / vagueness / padding issues, or "none">
VOICE: <does it sound like a person with a view? what's missing?>
TOP FIXES: <the 3 highest-leverage edits, concrete>
```

Be strict. A draft that is merely "fine" is a REVISE, not a PASS. Only genuinely
good, human-sounding writing passes.
