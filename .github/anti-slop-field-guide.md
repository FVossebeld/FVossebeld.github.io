# The anti-slop field guide: every tell, and the fix

This is the long reference behind [`CONTENT-QUALITY.md`](./CONTENT-QUALITY.md). The charter
is the bar and the verdict; this file is the catalogue. When the charter says "AI tell,"
this is the list it means.

Use it two ways:

- **Writing or rewriting** (`style-editor`, `wiki-ingest`, any agent on `content/`): read a
  family, hunt your own draft for it, and kill it *before* you propose. The "Write instead"
  line under each family is the move.
- **Reviewing** (`slop-verifier`, the `content-quality-review` workflow): quote the exact
  offending text and name the family. A cluster of these is the signal; one in isolation
  may be a coincidence (see [How to read these](#how-to-read-these)).

The catalogue is grounded in two bodies of evidence: Wikipedia's community field guide
[*Signs of AI writing*](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) (the
most thorough running list, with real examples), and Kobak et al., *Delving into
LLM-assisted writing in biomedical publications through excess vocabulary*, Science
Advances 2025 ([arXiv:2406.07016](https://arxiv.org/abs/2406.07016)), which measured which
words spiked in millions of abstracts the moment ChatGPT shipped. Specific claims are cited
inline. The full source list is in the research report this guide was built from.

The deep cause underneath almost every tell: an LLM predicts the most statistically likely
next token, so it **regresses to the mean**. It smooths a sharp, specific fact into a
generic, slightly inflated statement that could apply to a thousand other subjects.
"Inventor of the first train-coupling device" becomes "a revolutionary titan of industry":
less specific *and* more grandiose at once. Every family below is a surface symptom of that
one disease. The cure is always the same direction: more specific, less inflated.

---

## A. Inflated significance and broader-trend padding

**The tell.** Sentences that puff up the subject's importance by tying it to a larger
movement, era, or legacy, usually with no source and no need. *Stands as a testament to;
plays a vital/pivotal/crucial role; marks a turning point; reflects a broader shift; leaves
an indelible mark; in an ever-evolving landscape; cements its place in history.* Wikipedia
files this as its single largest category, and notes LLMs do it even for mundane subjects
like a town's population or a word's etymology.

> The founding of Idescat represented a significant shift toward regional statistical
> independence ... part of a broader movement across Spain to decentralize administrative
> functions. *(real example, Wikipedia)*

**Write instead.** State what the thing *is* and what it *did*, concretely. If it matters,
the specific fact shows that on its own; you do not need to announce the importance. Cut
every "stands as a testament."

## B. The superficial "-ing" tail

**The tell.** A present-participle clause bolted onto the end of a sentence to editorialise
about meaning or impact: *..., highlighting its enduring relevance. ..., reflecting the
region's rich heritage. ..., underscoring its role as a hub. ..., cementing its legacy.* It
reads as analysis but adds nothing checkable; it is the model gesturing at significance.
This is one of the most reliable single tells (Reinhart et al., cited by Wikipedia).

> Douera enjoys close proximity to Algiers, further enhancing its significance as a dynamic
> hub of activity and culture. *(real example, Wikipedia)*

**Write instead.** Delete the tail. If the point in it is real, make it its own sentence
with a fact behind it. If it is not, you have just removed filler.

## C. Vague attribution and manufactured consensus

**The tell.** Opinions hung on an unnamed authority, or one source inflated into many.
*Experts say; observers note; critics argue; industry reports suggest; it is widely
regarded; many believe; studies show*, with nothing cited, or with one blog dressed up as
"several publications." This is classic weasel-wording, and RAG-era models will even attach
the claim to a *named* source that never said it.

**Write instead.** Name who, link it, or own it as your opinion ("I think..."). If you
cannot attribute it, you cannot claim it: flag it `> TODO(floris): source or cut`.

## D. Negative parallelism and antithesis

**The tell.** The signature ChatGPT rhythm. *It's not just X, it's Y. Not only ... but also
... No X, no Y, just Z. It isn't A; it's B.* The two halves are often joined with an em
dash, which is why the construction and the dash tend to travel together. It feels punchy
and balanced and says less than it seems to. Wikipedia and multiple writing analyses flag
the "not just / but" construction as the stereotypical AI sign.

> Example of the tell: "These comments are not just dismissive, they're outright
> disrespectful." *(Wikipedia's instance joins the halves with an em dash; the cadence is
> the tell either way.)*

**Write instead.** Say the positive claim once, directly. "X is dismissive" or "X is
disrespectful": pick the true one and commit. If you want contrast, earn it with a real
counterpoint, not a template.

## E. The rule of three

**The tell.** Everything arrives in triples: three adjectives, three-item lists, three
parallel clauses (*fast, simple, and powerful*). One triple is fine; the tell is the
*habit*, using triads to make a thin point sound thorough.

**Write instead.** Use the number of items the idea actually has. Two is fine. Four is
fine. A single sharp word beats three soft ones.

## F. Promotional / travel-brochure tone

**The tell.** Marketing gloss on anything. *Nestled in the heart of; boasts a rich tapestry
of; breathtaking; vibrant; renowned; a diverse array; stunning natural beauty; a must-see.*
LLMs slide into this even when told to be neutral, and even about things with no business
sounding like a tourism ad (Wikipedia; the effect is stronger in older models like GPT-4).

> Nestled within the breathtaking region of Gondar ... stands as a vibrant town with a rich
> cultural heritage. *(real example, Wikipedia)*

**Write instead.** Plain, declarative, specific. Numbers and names instead of adjectives.
If it is genuinely impressive, the detail proves it without the gloss.

## G. Copula avoidance and marketing verbs

**The tell.** Dodging plain *is / are / has* for inflated substitutes: *serves as, stands
as, functions as, represents, marks,* and the brochure verbs *boasts, features, offers,
houses.* A measured drop of over 10% in "is/are" hit academic writing the year ChatGPT
arrived (Geng & Trotta, cited by Wikipedia). "Gallery 825 *is* the exhibition arm" becomes
"*serves as* the exhibition space."

**Write instead.** Use *is*, *are*, *has*. "The town has 8 platforms," not "the station
boasts 8 platforms." Reserve "serves as" for when something literally serves a function you
are naming.

## H. Hollow conclusions and the "Challenges / Future" outline

**The tell.** Two shapes. First, the wrap-up that adds nothing: *In conclusion; In summary;
At the end of the day; The bottom line is.* Second, the canned outline ending: a
*"Challenges"* or *"Future prospects"* section that opens "Despite its ... faces several
challenges ..." and closes on vague optimism about "ongoing initiatives." Wikipedia flags
the rigid formula, not the mere mention of challenges.

> Despite its success, the Panama Canal faces challenges ... Future investments ... could
> enhance the canal's efficiency and maintain its relevance. *(real example, Wikipedia)*

**Write instead.** End on the strongest real point, or a genuine open question. A page can
just stop. If there are real obstacles, name the specific one and what would fix it.

## I. Conversational scaffolding and transition crutches

**The tell.** Spoken-radio filler that holds the reader's hand: *Let's dive in; Here's the
thing; Here's the kicker; But here's the catch; The reality is; Make no mistake; At its
core; Let's unpack this; Buckle up.* These signal a transition while carrying no content.

**Write instead.** Just make the next point. Transitions should come from the logic of the
argument, not from a stock phrase. Delete the runway and start at the takeoff.

## J. Sycophancy and assistant chatter

**The tell.** The chatbot's customer-service register leaking into prose: *Great question!
You're absolutely right! Certainly! I hope this helps. Let me know if you'd like... Would
you like me to... In this article, we will explore...* Wikipedia lists these as
"collaborative communication" artifacts: text meant as chat, pasted into a document.

**Write instead.** There is no one to flatter and nothing to offer. Cut all of it. A page
states things; it does not serve a user.

## K. Hedge soup and knowledge-cutoff disclaimers

**The tell.** Reflexive throat-clearing (*it's important to note; it's worth mentioning;
generally speaking; in many ways; it should be noted*) and the model admitting its own
limits (*As of my last knowledge update; while specific details are scarce/limited; based
on the available information*). That last family is doubly bad: it is both a tell *and*
usually a sign the fact was guessed. Models pair it with speculation ("the subject
likely...", "maintains a low profile") that is pure invention (Wikipedia).

**Write instead.** Note the thing, do not note that you are noting it. If you do not know
something, leave `> TODO(floris): verify`. Never paper over a gap with "details are
limited" and a guess.

## L. AI-vocabulary words

**The tell.** A cluster of words that spiked in 2023 and after and co-occur in LLM output.
One may be coincidence; a pile of them in one post-2022 paragraph is among the strongest
signals (Kobak et al. measured *delves* in about 25 times as many 2024 abstracts as the
prior trend predicted, *underscores* about 9 times). The set drifts by model era
(Wikipedia's breakdown):

- **GPT-4 era (2023 to mid-2024):** *delve, underscore, tapestry, testament, intricate,
  interplay, meticulous, pivotal, crucial, boasts, garner, enduring, vibrant, landscape,
  realm.*
- **GPT-4o era (mid-2024 to mid-2025):** *align with, foster, enhance, highlight, showcase,
  underscore, pivotal, vibrant, bolster.*
- **GPT-5 era (mid-2025 onward):** *emphasizing, enhance, highlighting, showcasing* (plus
  the notability-padding phrases in family A).

The wider standby set this garden also bans: *leverage* (as filler), *robust, seamless,
streamline, navigate (figurative), harness, unlock, elevate, holistic, nuanced,
multifaceted, myriad, plethora, bustling, rich (figurative), profound, commitment to, dive
deep, game-changer, paradigm shift.*

**Write instead.** The short, common word. *Use*, not *leverage*. *Look at*, not *delve
into*. *Strong*, not *robust*. *Detailed* or *careful*, not *meticulous*. If a fancy word
is the *precise* one (sometimes "intricate" really is right), keep it, but earn it, and do
not let its friends in with it.

## M. Elegant variation (forced synonyms)

**The tell.** The repetition penalty making the model rename the same thing every time it
recurs ("the artist... the painter... the non-conformist creative... the visionary"), so a
single subject sprouts a thesaurus of labels. Reads as restless and slightly off.

**Write instead.** Call the same thing the same name. Repeating "the model" four times is
clearer than four euphemisms for it.

## N. Uniform rhythm (no burstiness)

**The tell.** Every sentence about the same length, every paragraph the same shape. Human
writing is *bursty*: it mixes a three-word sentence against a forty-word one. Flat,
metronomic rhythm is one thing detectors lean on, and one thing readers feel without naming
it.

**Write instead.** Vary it on purpose. Put a short, blunt sentence next to a long one.
Fragments are allowed. Read it aloud; if it drones, break the cadence.

## O. Regression to the mean: blandness and fabricated specificity

**The tell.** Two faces of the same root cause. **Blandness:** a sentence that would
survive unchanged if you swapped the subject for any other, so it says nothing. **Fabricated
specificity:** the opposite failure, where the model *invents* concrete-sounding detail
(stats, dates, quotes, "studies," citations) to fill the gap, because
plausible-and-specific is statistically likely even when false. The second is the dangerous
one: it is confident, checkable-looking, and wrong.

**Write instead.** Demand a real, sourced specific or cut the sentence. Never invent a
number, a quote, a date, or a citation. If the draft needs a fact you do not have, mark
`> TODO(floris): ...`. A visible gap beats an invisible fabrication.

## P. Formatting and mechanical tells

Surface signatures of generated-and-pasted text. Several have innocent explanations
(Markdown is normal for developers; curly quotes come from Word and macOS), so weight them
as *supporting* evidence, not proof, except the paste artifacts, which are conclusive.

- **Em-dash overuse.** Em dashes everywhere a comma, colon, or full stop would do, in a
  punched-up sales cadence. Common in human writing too, so it is weak alone, but combined
  with families A to O it corroborates. **House rule for this garden: avoid the em dash in
  our own prose.** Use a comma, a colon, parentheses, or a full stop instead. (Some 2025
  models now suppress the dash on their own.)
- **Bold-everything.** Mechanical boldface on every key term, "key takeaways" style,
  inherited from READMEs and slide decks.
- **The `**Term**: description` bullet list.** A vertical list where each item is a bold
  inline header, a colon, then a sentence. A near-fingerprint of pasted chatbot output.
  (This guide uses that shape on purpose, for a scannable catalogue; in published prose it
  is a tell.)
- **Title-Case Headings.** Capitalising Every Main Word in section headings. This garden
  uses sentence case.
- **Emoji as decoration.** Emoji punctuating headings or bullets. Banned here outright.
- **Listicle reflex.** Turning prose into a bulleted list when a paragraph would read
  better. Default to prose; list only genuinely parallel items.
- **Needless tables.** A two-row table for something that is a sentence.
- **Thematic breaks before headings**, **skipped heading levels**, and **curly quotes**
  pasted mid-document: minor, but they cluster with the rest.
- **Paste artifacts (conclusive).** Leftover tool markup such as `cite` turn tokens,
  `:contentReference[oaicite:0]`, `oai_citation`, the bracketed citation markers some chat
  UIs emit, `[attached_file:1]`, `grok_card`, literal `##` or `---` Markdown where the site
  uses its own syntax, or `2025-XX-XX` placeholder dates. If you see these, the text was
  generated and pasted without reading. Automatic reject.

---

## How to read these

A few rules so this guide sharpens judgement instead of replacing it:

- **Clusters, not single signals.** Any one item here can show up in good human writing:
  people use em dashes, the rule of three, the occasional "delve." The signal is *density*,
  several families stacking up in one post-2022 draft. Wikipedia makes the same point; so
  does the co-occurrence finding in Kobak et al. Quote the cluster.
- **Do not trust automated AI detectors.** GPTZero and friends sit barely above chance, are
  fooled by light paraphrasing, and disproportionately flag non-native English. Humans
  alone do no better than a coin flip at spotting AI text; only heavy LLM users reach about
  90%. So judge the *writing* against this guide, never a detector's percentage. Never
  accuse on a tool's say-so.
- **The bar applies to AI and humans equally.** This is not "catch the robot." Floris can
  write a hollow conclusion or a rule of three on a tired afternoon; the fix is identical.
  The target is good writing, not human provenance.
- **The list moves.** Models are trained against these tells, and human writing is drifting
  toward them as people absorb LLM phrasing. *Delve* already faded after early 2024. Treat
  the word lists as living, re-check them, and weight rhythm, substance, and voice (families
  M to O) over any single banned word; those are harder to fake and slower to drift.

The one-line summary, for when you do not want to read the whole thing: **be specific, drop
the inflation, vary the rhythm, never fabricate, and sound like a person with a view.**
Everything above is a special case of that.
