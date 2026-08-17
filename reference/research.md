# Research Synthesis: What Makes Writing Read as AI-Generated (and What to Do Instead)

This document synthesizes three independent research passes — academic/
computational (stylometry and detection literature), editorial/practitioner
guidance (style guides and journalism critiques), and a cross-referenced
catalog of specific AI-writing tells. Raw reports with full citations live
in `reference/research/`. This file is the condensed, load-bearing synthesis
that `SKILL.md` and the adversarial review both work from.

## 1. Summary

Two independent literatures — computational stylometry and editorial
craft criticism — converge on the same underlying diagnosis from opposite
directions. The academic side measures it statistically: LLM text clusters
in narrower bands of sentence length, lexical rarity, and syntactic
structure than human text (`reference/research/academic.md` §3.1–3.2, §7.3),
because next-token generation is, structurally, a search through a model's
own high-probability region rather than an attempt to say something
specific. The editorial side names it qualitatively: AI prose reaches for
generic significance-language, vague attribution, and rhetorical shapes
that *perform* insight without committing to a checkable claim
(`reference/research/editorial.md` Part 1, Part 3). Both point to the same
fix — not a list of banned words, but writing that commits to specific,
falsifiable, varied statements instead of safe, generic, uniform ones. Word-
level tells ("delve," em dashes, "boasts") are real and well-documented, but
every source that addresses the question directly — Wikipedia's own essay,
Orwell, Dreyer, Purohit — warns that treating them as the *whole* problem
produces prose that merely evades pattern-matching rather than prose that
actually reads as considered and human.

## 2. Ranked tell catalog

Full sourcing for every entry below is in `reference/research/tells-catalog.md`
(27 tells, each backed by 2+ independent sources, tiered by credibility).
This is the condensed version, cross-referenced against the academic report
where a statistical study independently corroborates a qualitative
observation. Ranked by consensus strength (very strong → contested).

### Very strong (statistically confirmed + multi-source qualitative agreement)

| Tell | What it is | Why it happens |
|---|---|---|
| **"Delve"** and the excess-vocabulary cluster (boast, showcase, underscore, intricate, meticulous, commendable, pivotal, realm, garner, foster, align with) | Specific words spiked in frequency immediately after ChatGPT's release and stayed elevated | RLHF: human raters during fine-tuning scored responses containing these words more favorably; a COLING 2025 paper (Yalpi et al.) systematically ruled out training-data overrepresentation and architecture as causes, isolating RLHF as the likely mechanism (`academic.md` §6.3) |
| **"It's not X, it's Y" / negative parallelism** | Raising and knocking down a straw contrast instead of stating the point directly | Mimics the rhetorical shape of insight without requiring evidence for either half; *The Atlantic* found ~6% of a large sample of human messages now use it too — the tell has started leaking into human writing via imitation, and the construction may process *less* clearly for readers than intended (negated terms process first) |
| **Em dash overuse** | Markedly higher em-dash frequency than human baselines (GPT-4.1 measured at 3.28x) | **Mechanism genuinely contested**: one analysis attributes it to a training-data era shift (older, public-domain books skewing em-dash-heavy); another attributes it to RLHF rewarding the em dash's clarity/pacing function. The tell's *existence* is not in dispute; its cause is. Working editors (Dreyer) also caution the raw signal is weaker than social media suggests — volume and function matter more than presence |

### Strong

- **Grandiose stakes inflation / undue significance** — "marks a turning point," "underscores the importance of," inflating a mundane fact into world-historical significance. Wikipedia's largest single tell category, built from thousands of real cleanup cases.
- **Vague/weasel attribution** — "experts say," "studies show," "observers have noted" with no named source. Confirmed independently by Wikipedia, Forbes, and the community trope directory.
- **Stock transitions** — sentence-initial "Moreover," "Furthermore," "Additionally." Reuters Institute (Oxford) ties this to training data skewed toward formal/academic registers.
- **Rule-of-three / tricolon overuse** — compulsive three-item lists manufacturing an impression of thoroughness. Confirmed by GPTZero's own detector analysis, Wikipedia, and Forbes independently.
- **Vapid scene-setting openers** — "In today's fast-paced world," "In the ever-evolving landscape of." Maximally generic, commit to nothing about the actual topic.
- **Testament-to / stands-as-a-reminder constructions** and **ornate/vague nouns** (tapestry, landscape, realm, journey) — both forms of "significance-inflation" that pad a sentence with apparent weight without adding information.
- **Title Case section headers**, **bold-lead-in bullet stacks**, **uniform paragraph length / low burstiness**, and **signposted, restating conclusions** ("In conclusion," "Overall," followed by a recap) — four structural/formatting tells, each independently confirmed by 2–3 sources.

### Moderate

- Copula avoidance ("serves as," "stands as," "functions as" instead of plain "is") — Wikipedia documents a >10% measured drop in is/are frequency in AI-influenced academic writing since 2023.
- Hedge fillers ("it's important to note," "it's worth noting").
- Sycophantic chat-style openers ("Certainly!," "Great question!") and formulaic sign-offs ("I hope this helps!") — vendor-corroborated only, but consistent with RLHF's assistant-register defaults.
- Rhetorical question immediately self-answered ("What changed? The math did.").
- "Despite these challenges" + silver-lining closing formula.
- Synonym cycling / excessive lexical variation (avoiding natural repetition of a fixed referent) — has a plausible decoding-parameter explanation (repetition-penalty settings), distinct from the purely stylistic tells.
- Curly/smart quotation marks — a provenance artifact of copy-pasting from a chat interface, not really a stylistic choice.
- Perfect, uniform grammar with no contractions or fragments — Reuters Institute and Pangram both document AI text minimizing colloquial language and contractions relative to comparable human text.
- Emoji/Unicode used as structural devices (section dividers, decorative arrows).

### Contested — flagged explicitly rather than resolved

- **Semicolon frequency**: sources disagree on direction. One argues AI overuses semicolons in formal/academic registers (inherited from academic training data) while underusing them in conversational registers; another argues the opposite. **Treat as register-dependent, not a standalone signal.**
- **False-balance/generic hedging**: two peer-reviewed studies point in opposite directions on whether AI hedges more or less than humans (`tells-catalog.md` #27). Sample sizes are small in both. **Not reliable as a standalone signal.**
- **Lexical diversity** (academic.md §3.1, §3.4, §3.5): Muñoz-Ortiz et al. and Kendro et al. found LLM text *less* lexically diverse than human text; Herbold et al. found the *opposite* in argumentative-essay data, where ChatGPT essays were also rated higher quality by human graders. The direction appears to depend heavily on genre (news vs. essays vs. encyclopedic text) and which diversity metric is used. **Do not treat "AI text is less lexically diverse" as settled.**

## 3. Structural vs. surface tells — and why structure matters more

This split is the single most important design decision for the skill, and
it's directly supported by the academic literature, not just intuition.

**Surface tells** are specific words, phrases, and punctuation habits:
"delve," em dashes, "boasts," title-case headers. These are exactly the
kind of thing a banned-word list can catch — and exactly the kind of thing
that goes stale fast. The FSU/COLING paper on "delve" found the phenomenon
is *already* bleeding into ordinary human speech via imitation (`academic.md`
§6.3; `tells-catalog.md` #1) — meaning a wordlist tuned to today's tells is
actively decaying evidence as you read this. Wikipedia's own essay
documents multiple *eras* of AI vocabulary (2023 GPT-4-era words differ from
2025 GPT-5-era words), which is a maintained taxonomy's way of admitting the
word list itself has a shelf life.

**Structural tells** are patterns in how text is organized rather than
which words it uses: uniform sentence-length rhythm (low "burstiness"),
symmetric paragraph shapes, a fixed rhetorical template (vapid opener →
body → "Despite these challenges" → signposted conclusion), rule-of-three
list padding, and vague/generic claims standing in for specific, checkable
ones. These are harder to game by word substitution because they're about
*shape*, not vocabulary — and they are what the peer-reviewed literature
actually measures. Muñoz-Ortiz et al.'s methodologically careful study
(`academic.md` §3.1) found LLM output clusters narrowly in the 10–30-token
sentence-length range where human writing spreads much wider, and that this
gap plus related syntactic-uniformity measures were *larger* than the
differences between different LLMs — i.e., structural uniformity is the more
fundamental, more model-independent signal, more so than any specific word
choice. The PNAS "Echoes in AI" study found the same convergence-vs-variance
pattern one level up, at the level of narrative/plot structure, suggesting
this is a general property of how these models generate, not just a
sentence-level statistical artifact.

**Design implication:** the skill weights structural guidance (vary rhythm,
commit to specific claims, avoid templated structure) above a banned-word
list. A word list is included only as a compact, clearly-labeled quick
reference — never as the skill's primary mechanism — because the sources
above show it is both the most brittle part of this problem and the part
most likely to be mistaken for the whole solution.

## 4. Positive craft guidance (not just tell-avoidance)

Sounding human is not simply the absence of tells. The editorial sources
converge on independent, positive guidance for what to do instead
(`editorial.md` Parts 2–3):

- **Commit to specific, checkable claims over generic, safe ones.** Strunk's
  "the surest way to arouse and hold the reader's attention is by being
  specific, definite, and concrete" is the direct positive-image of the
  "vague attribution" and "grandiose stakes inflation" tells above — the
  same instinct, pointed the opposite direction.
- **Use plain, strong verbs instead of padded constructions.** Orwell's
  "operators, or verbal false limbs" (render inoperative, give rise to,
  have the effect of) and Wikipedia's "copula avoidance" (serves as,
  stands as) are the same failure mode independently named 80 years apart.
- **Vary sentence rhythm deliberately.** Mix short, punchy sentences with
  longer ones; don't let paragraphs settle into a uniform shape. This is
  the craft-side mirror of the "burstiness" finding in §3.
- **Reach for concrete sensory/physical detail over abstraction.** Gay
  Talese's Sinatra profile (via Mario Garcia's Poynter piece) is the
  worked example: specific, unrepeatable physical detail ("nubby and raw"
  fingers) does work that no adjective stack ("vibrant," "rich," "profound")
  can substitute for.
- **Cut hedge-intensifiers, not just banned nouns.** White's "rather, very,
  little, pretty — these are the leeches that infest the pond of prose" is
  a still-underused complement to word-banning: it targets the *softening*
  reflex, which shows up as hedge fillers ("it's worth noting") and
  generic hedging (§2's contested tell) alike.
- **Let punctuation do real work, not filler work.** Dreyer's and Purohit's
  point about the em dash generalizes: a device (dash, semicolon, rule of
  three) used because it's earned by the specific sentence reads
  differently from the same device used as a reflexive connective default.

## 5. Where "sound human" conflicts with "write well" — resolved in favor of good writing

Several sources explicitly warn against treating tell-avoidance as the goal
in itself:

- **Wikipedia's essay states its own tells are "symptoms, not the
  disease"** — they point to underlying problems (unreliable sourcing,
  shallow synthesis, absence of real judgment), and scrubbing the
  vocabulary alone "obscures the actual concerns."
- **Orwell's sixth rule** — "break any of these rules sooner than say
  anything outright barbarous" — is, per his own framing, the rule most
  commonly dropped by people who cite his list. Mechanically banning
  "delve" or the em dash is itself the pretentious-diction reflex he's
  diagnosing, just inverted.
- **Dreyer's pushback on em-dash panic**: he found "nothing weird" about
  em-dash usage in sample AI prose he examined directly, and warns that
  anxious self-censorship of a legitimate punctuation mark is a real cost
  with no corresponding benefit, since raw em-dash presence was never a
  reliable standalone signal.
- **The OSS-skills survey (`reference/oss-skills-review.md`) found this
  failure pattern repeatedly** in existing public "humanizer" skills: hard
  banned-word lists that forbid ordinary technical words (e.g., "robust,"
  "integrated"), invented numeric thresholds with no empirical basis, and
  in at least one case explicit instructions to *conceal* that formatting
  rules are being followed — advice that trades honesty and clarity for
  detector-evasion.

**Resolution:** where a "sound more human" instruction would degrade
clarity, accuracy, or plain correctness, this skill defers to good writing.
The skill never instructs banning an ordinary word outright, never invents
unverified statistical thresholds, and never asks Claude to add unearned
specifics (a risk flagged in `reference/oss-skills-review.md`: "add more
specific detail" is good craft advice that becomes a hallucination risk if
applied mechanically to claims the writer doesn't actually know to be true).

## 6. Full source list

See the four raw reports for complete citations with per-source credibility
notes:
- `reference/research/academic.md` — 23 sources (stylometry, detection, watermarking, lexical-marker research)
- `reference/research/editorial.md` — Wikipedia's Signs of AI Writing, Orwell, Strunk & White, Hemingway App, The Atlantic, Dreyer, Purohit, Forbes, Poynter, Ted Chiang
- `reference/research/tells-catalog.md` — 27 ranked tells, ~25 corroborating sources across 5 credibility tiers
- `reference/oss-skills-review.md` — teardown of 13 existing published humanizer skills/prompts
