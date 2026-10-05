# 2026 Research Update

Written October 2026 for version 2.0.0. The four older reports in this
directory were written in August 2026 against sources that mostly
describe 2023–2025 models. This file records what newer sources say,
which claims in the older reports they weaken, and what changed in
`SKILL.md` as a result. Where this file and an older report disagree,
this file is the current position.

## Contents

1. What the tells are now
2. Claims in the 1.x research that did not hold up
3. How detectors work, and why this skill does not target them
4. Who the reader is
5. What other skills changed
6. What could not be verified
7. Sources

## 1. What the tells are now

**The Economist, "How to Spot AI Writing" (30 July 2026).** The paper
had ChatGPT, Claude, Gemini, and Grok rewrite its own articles from
AI-written summaries, without web access, and compared 55,940 sentences
and 1.2 million words against human journalism (CNN, the New York Times,
the Washington Post) and novels published from 1950 to 2022. Its
findings:

- **Words.** The models prefer polysyllables ("significant",
  "increasingly", "consequences"), rare words ("interdependence",
  "reindustrialisation"), scientific vocabulary ("parameter",
  "methodology"), Latinate suffixes, and nominalizations. All four do
  this; Gemini and Claude do it most.
- **Sentences.** They are longer than human sentences. "And" is the most
  overused word, and paragraphs are rarely broken by a short statement.
- **Punctuation.** Fewer commas and semicolons than human writers and
  almost no parentheses.
- **Devices.** "Not X but Y", "not only but also", and the rule of
  three. ChatGPT and Claude use these most per 1,000 sentences.
- **Sources.** The models do not quote experts.
- **Em dashes.** Only Claude uses more than human writers. ChatGPT uses
  fewer than any other writer in the study.

Version 1.1.0 of this skill took the em-dash result from this study and
set the rest aside "pending independent corroboration". Corroboration
for two of the items already existed:

- **Reinhart et al., PNAS 2025**, measured instruction-tuned models
  using nominalizations at 1.5 to 2 times the human rate and present
  participial clauses (the trailing "-ing" clause) at 2 to 5 times.
- **Anthropic's own prompting guide for Claude Fable 5.1** says the
  model's "sentences run longer and there are fewer paragraph breaks"
  than its predecessor's, and names a second habit, "mannered prose":
  metaphor and flourish in place of direct statement. Its suggested
  prompt gives two examples, "a dial worth turning" for "a parameter
  worth varying" and "this point earns its keep" for "this point still
  matters".

**Wikipedia's "Signs of AI writing"** now sorts its vocabulary list by
model era. The 2023 to mid-2024 list has "delve", "tapestry",
"testament", and "intricate". The list for mid-2025 onward is four
words: "emphasizing", "enhance", "highlighting", "showcasing". The page
records that "delve" fell sharply in 2025, and in August 2026 it carried
a notice saying it needed updating for the newest models. It has also
moved "elegant variation" (synonym cycling) to its list of historical
indicators.

**Community reports on Claude Opus 5** (a Hacker News thread and
r/ClaudeAI posts from August 2026) describe stock figurative phrases,
announced candor, and short fragments used for drama. These are
unmeasured. `reference/claude-tics.md` lists them with that caveat.

## 2. Claims in the 1.x research that did not hold up

**"Uniform sentence length is the strongest, most model-independent
signal."** `SKILL.md` 1.x said this in its tells table and
`reference/research.md` §3 built the skill's design on it. The claim
rested on one 2024 study of Mistral, Falcon, and LLaMA news text. Three
newer results weaken it:

- El Attar et al. (2026) tested 284 interpretable linguistic features
  across 27 models and ten domains. Most previously proposed indicators
  were "strongly context-dependent". Measures of lexical richness were
  the exception.
- Nieth et al. (2026) compared seven models with human text across five
  registers and found that how far a model sits from human writing
  depends on the register.
- Pangram, whose detector performs best in independent tests, argues
  that perplexity and burstiness are unreliable signals and does not use
  them.

Sentence-length distribution still differs between current models and
people, but in the other direction from the one 1.x assumed: the
Economist finding is that model sentences are too long and too rarely
interrupted, not that they are all the same medium length.

**"Vary sentence rhythm on purpose."** This rule followed from the claim
above. In practice it asked for short sentences as a stylistic effect,
and the 1.x examples and validation samples show the result: "Variable
names get clearer. Functions get shorter.", "Speed compounds:", "That
complexity is cheaper than the outage it prevents." Current sources list
exactly these (fragments for drama, the colon reveal, the one-line
closer) among the most recognizable habits of 2026 models. Version 2.0.0
replaces the rule with "let sentence length follow the content".

**The rewritten examples were clean.** Both 1.x "after" passages removed
the 2023 tells and introduced "not X but Y" constructions that were not
in the originals. They also added facts the originals did not contain (a database
connection pool, a `Retry-After` header, an explanation of why
map-reading helps), which the skill's own rule against invention should
have stopped. They have been rewritten, and each example file now records
what the earlier rewrite got wrong.

**"RLHF-reinforced (confirmed for 'delve')."** `SKILL.md` 1.x said
"confirmed"; `reference/research/academic.md` §6.3 calls it a candidate
mechanism from one unreplicated study. The table no longer states a
cause.

**"Cut hedge-intensifiers: rather, very, little, pretty."** This came
from E. B. White in 1959. No source in this repository reports these
words as more common in model text, and `reference/research.md` already
listed hedging as a contested signal. The rule is replaced by "hedge
once, where the doubt is real".

**"More than one or two dashes per paragraph?"** A number with no source,
in a skill whose design notes promise no invented thresholds. Removed.
The em-dash rule now says what the dash is for and sets no count.

**"The tell list doesn't transfer to non-English text."** Juzek (2026)
found model-preferred vocabulary recurring across 34 languages, with
"emphasize"-type verbs overused in 24 of them. The English word examples
still do not map across, but the claim was too broad. The Scope entry
now says so.

## 3. How detectors work, and why this skill does not target them

Current commercial detectors are trained classifiers. Pangram's
technical report describes a model trained with hard negative mining on
paired human and synthetic text, and the product now includes a separate
head for text that has been through a humanizer. Pangram reports
detecting the output of nineteen humanizer tools more than 90% of the
time; that is a vendor figure. An NBER working paper (September 2025)
and a University of Chicago Booth test independently found very low
error rates for it across genres, lengths, and models.

Xu et al. (2026) found that GPTZero and Pangram often classify text from
base models as human and text from the instruction-tuned versions of the
same models as AI. Their conclusion is that detectors "are tracking
artifacts of instruction tuning and local context". Evading them took a
fine-tuned paraphraser applied repeatedly, and published attacks of that
kind (Cheng et al., 2025) use the detector's own score to guide the
rewrite.

A style guide read by an instruction-tuned model does not change that
model's instruction tuning. So this skill makes no claim about detector
scores, and nobody should use it to get past one. The most-used skill in
this space, `blader/humanizer`, says the same of itself: "detectors
still flag most of its output."

Shan et al. (EMNLP 2026) add a caution about the other direction.
Text that a model edits has a different and much weaker stylometric
footprint than text a model generates, so evidence about generated text
should not be applied to edited human text. That supports the existing
Scope rule against running these checks over someone else's writing.

## 4. Who the reader is

Russell et al. (2025) found that people who use LLMs often for writing
are very good at recognizing model text: the majority vote of five such
readers misclassified 1 of 300 articles, better than most commercial
detectors tested. They cite vocabulary, but also formality, an
over-polished evenness, and a lack of originality. The last of these is
not a style problem and no style rule fixes it. The skill's first rule
(a specific, checkable claim, or cut the sentence) is the nearest it
gets.

Röttger et al. (2026), with 2,939 writers and 11,091 readers, found that
AI assistance made writers seem more opinionated, more competent, and
more positive than they were, and that writers preferred the assisted
text even after being told this. That is a reason to keep the Scope rule
about leaving a person's own hedges and voice alone.

## 5. What other skills changed

- **blader/humanizer** (about 54,000 stars, version 3.1.0) was rebuilt
  around a single explanation, that models make the choice that suits
  the widest range of readers, with 26 patterns ordered by strength. Its
  first five are "not X but Y", one-line closers, sayings that sound
  deep, a staged run-up, and arguing with no one. Version 2.0.0 of this
  skill adopts the single-explanation framing and covers those five
  patterns, which 1.x did not.
- **conorbronsdon/avoid-ai-writing** (version 3.37.0) added an editing
  contract and a verification report that says which checks ran and why
  editing stopped.
- **hardikpandya/stop-slop** contributes a "cut quotables" rule and a
  "false agency" rule (inanimate subjects doing human things). It also
  bans em dashes outright and requires 35 of 50 on a self-scored rubric,
  with no source for either number.
- **petergyang/no-ai-slop** (July 2026) names colon reveals, fake-profound
  kickers, and interpretive metadiscourse, and tells the editor to make
  the minimum change and keep "I think" where it reflects real doubt.

All four are rewrite tools that a user runs over a finished draft. This
skill still differs in applying at the time of writing and in its Scope
section, which none of the four matches for genre coverage.

## 6. What could not be verified

- The Economist article is paywalled. Its findings above come from the
  paper's own "Off the Charts" newsletter, the excerpt on Daring
  Fireball, and two secondary summaries that agree with each other. The
  article gives no figures for the size of the em-dash gap.
- The Economist corpus is news journalism. Whether "long words" is a
  tell in technical writing, where "parameter" is the correct term, is
  untested. The skill's rule is limited to cases where two words mean
  the same thing for that reason.
- Blog figures for Claude Opus 5 response length and em-dash frequency
  (paddo.dev) come from a single author's measurement and are not used
  as evidence here.
- Pangram's accuracy figures on humanizer output are the vendor's own.
- El Attar et al. found lexical richness to be the one indicator that
  held across models and domains. Only the abstract was read, and it
  does not say in which direction model text differs. No rule in
  `SKILL.md` acts on it, and the "common word" rule could move output
  either way on that measure.
- The Reinhart et al. figures (nominalizations, participial clauses)
  were measured on 2024 models.
- The community threads about Claude Opus 5 were read only through two
  blog summaries.

## 7. Sources

- "How to Spot AI Writing," *The Economist*, 30 July 2026.
  <https://www.economist.com/culture/2026/07/30/how-to-spot-ai-writing>.
  Newsletter version: <https://theeconomistoffthecharts.substack.com/p/how-to-spot-ai-writing>.
  Excerpt: <https://daringfireball.net/linked/2026/08/11/economist-ai-writing>
- Reinhart et al., "Do LLMs write like humans? Variation in grammatical
  and rhetorical styles," *PNAS*, 2025.
  <https://www.pnas.org/doi/10.1073/pnas.2422455122>
- Anthropic, "Prompting Claude Fable 5.1."
  <https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1>
- Wikipedia, "Signs of AI writing," read October 2026.
  <https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing>
- El Attar, Dönmez, Maurer, Falenska, "A Systematic Analysis of
  Linguistic Features in AI-Generated Text Detection Across Domains and
  Models," 2026. <https://arxiv.org/abs/2606.04177>
- Nieth et al., "How Human-Like Are Large Language Models? A
  Register-Aware Linguistic Evaluation Framework," 2026.
  <https://arxiv.org/abs/2605.23651>
- Shan, Lee, Hao, "AI Writers Have a Consistent Stylometric Footprint,
  but AI Editors Do Not," EMNLP 2026. <https://arxiv.org/abs/2608.27855>
- Xu, Zhong, Raghunathan, Fang, Kolter, "Base Models Look Human To AI
  Detectors," 2026. <https://arxiv.org/abs/2605.19516>
- Cheng et al., "Adversarial Paraphrasing: A Universal Attack for
  Humanizing AI-Generated Text," 2025. <https://arxiv.org/abs/2506.07001>
- Emi and Spero, "Technical Report on the Pangram AI-Generated Text
  Classifier," 2024. <https://arxiv.org/abs/2402.14873>
- Pangram, "Why Perplexity and Burstiness Fail to Detect AI."
  <https://www.pangram.com/blog/why-perplexity-and-burstiness-fail-to-detect-ai>
- Russell, Karpinska, Iyyer, "People who frequently use ChatGPT for
  writing tasks are accurate and robust detectors of AI-generated text,"
  2025. <https://arxiv.org/abs/2501.15654>
- Röttger, Hackenburg, Kirk, Summerfield, "Measuring and Mitigating
  Persona Distortions from AI Writing Assistance," 2026.
  <https://arxiv.org/abs/2604.22503>
- Juzek, "AI-Associated Lexical Shifts Across 34 Languages," 2026.
  <https://arxiv.org/abs/2605.25358>
- blader/humanizer. <https://github.com/blader/humanizer>
- conorbronsdon/avoid-ai-writing. <https://github.com/conorbronsdon/avoid-ai-writing>
- hardikpandya/stop-slop. <https://github.com/hardikpandya/stop-slop>
- petergyang/no-ai-slop. <https://github.com/petergyang/no-ai-slop>
