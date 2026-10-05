# OSS Humanizer-Skill Teardown

Condensed from `reference/research/oss-skills.md`, which surveys 13 existing
published "humanize writing" skills/prompts in full detail with live
GitHub metadata. This file draws the design implications for
`humanizing-writing`.

The table and sections 2 to 4 describe these skills as surveyed in
August 2026. Section 5 records what had changed by October 2026 and what
2.0.0 took from it.

## 1. Surveyed skills

| Skill | Stars | Core mechanism | Notable for |
|---|---|---|---|
| [blader/humanizer](https://github.com/blader/humanizer) | 36,148 | Wikipedia-derived 35-pattern list | Best false-positive guardrails; voice-matching from user sample |
| [conorbronsdon/avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) | 3,070 | Tiered word list + rewrite/detect/edit modes | Cites real detector false-positive research; prompt-injection defense |
| [harshaneel/humanize](https://github.com/harshaneel/humanize) | 365 | 9 "humanization levers" | Only one with a real benchmark (cross-validated against Binoculars); honest about its ceiling |
| [jalaalrd/anti-ai-slop-writing](https://github.com/jalaalrd/anti-ai-slop-writing) | 370 | Banned words + hard numeric thresholds | Good specificity-over-vagueness instinct, undercut by invented thresholds and a "hide the rules" instruction |
| [matsuikentaro1/humanizer_academic](https://github.com/matsuikentaro1/humanizer_academic) | 164 | Domain-specialized (medical academic) fork | Best genre-aware false-positive handling found |
| [jpeggdev/humanize-writing](https://github.com/jpeggdev/humanize-writing) | 49 | 8-pass editing process | "Pattern stacking" (don't over-count one tell as three) |
| [gregorymm/humanize-text](https://github.com/gregorymm/humanize-text) | 6 | Figma/UX-copy scorer | Only genuinely distinct application niche (product copy, not prose) |
| [lguz/humanize-writing-skill](https://github.com/lguz/humanize-writing-skill) | 27 | 3-pass, LLM-agnostic prompt | Transparent sourcing, marred by one unverifiable "CMU research" citation |
| [haidrrrry/humanize-ai-writing](https://github.com/haidrrrry/humanize-ai-writing) | 9 | Prompt + deterministic CLI linter | Novel delivery mechanism (scriptable, CI-wireable); honest "doesn't beat detectors" scoping |
| [avectats7/anti-ai-writing](https://github.com/avectats7/anti-ai-writing) | 3 | 5-step workflow, EN/ES | Bilingual; "Notes on anything debatable" output block |
| [aaaronmiller/humanize-writing](https://github.com/aaaronmiller/humanize-writing) | 5 | 3-layer banned-word/pattern/tone | Has a genuine third-party skill-quality audit in its issues (93/100 vs. Anthropic's authoring rubric) |
| [shaswatco/anti-ai-writing-style](https://github.com/shaswatco/anti-ai-writing-style) | 2 | Flat banned-word list | Clearest negative example: bans ordinary technical words outright, on a false absolute-detection claim |
| Sabrina Ramonov's humanizer prompt (2024) | — | ~11-line paragraph | Predates the SKILL.md wave; useful "before" baseline |

## 2. What they do well

- **False-positive guardrails** (`blader`, `conorbronsdon`, `matsuikentaro1`): explicit "what not to flag" sections, tiered evidence weighting, genre-aware whitelisting of phrases that are normal in one register and a tell in another.
- **Epistemic honesty about the approach's ceiling** (`conorbronsdon`, `harshaneel`, `haidrrrry`): stating plainly that surface rewriting cannot defeat a trained classifier reading an RLHF fingerprint, and that word-frequency ratios behind a banned list are "signals, not proof."
- **Guarding against fabrication during rewrite** (`blader`, `jalaalrd`, `avectats7`): explicit instructions not to invent facts, names, dates, or citations while making prose "more specific."
- **Genre/voice adaptation** (`blader`, `matsuikentaro1`): matching a user-supplied writing sample or a named author's documented style instead of imposing one static house voice on everyone.
- **Structural over lexical framing where present** (`lguz`, `jpeggdev`): targeting sentence-level shape (parallel negation, tricolons) and editing order (macro structure before micro vocabulary), a harder-to-game signal than word choice.
- **Transparency over concealment** (`avectats7`'s "Notes on anything debatable," `conorbronsdon`'s `detect`-only mode): surfacing what was flagged and why, treating the human as a collaborator rather than a mark.

## 3. What they do poorly

- **Banned-word lists are the median mechanism, and the weakest part of nearly every entry.** Tier assignments and "N× more common in AI text" ratios are almost never sourced to an actual measurement; even the one exception (`conorbronsdon`) admits its core ratio is inherited, unverified folklore.
- **Absolute claims presented as settled fact.** `shaswatco`'s "if even one of these words appears, the text immediately flags as machine-written" is the clearest failure, but invented numeric thresholds ("max one em dash per 500 words," "no three consecutive sentences of the same length, ever") recur across multiple repos with no stated methodology.
- **Banning ordinary correct vocabulary.** `shaswatco` blanket-bans *robust*, *scalable*, *integrated*, *proactive*, normal, precise technical/business words with no natural one-word replacement in many contexts. This actively hurts clarity for zero gain in "human-sounding" quality.
- **Single-source genre lineage.** At least 6 of 13 skills are explicit derivatives of Wikipedia's Signs of AI Writing essay, a strong resource, but built for encyclopedia-article prose (biography/place-article tells like "name-dropping to prove importance") and imported wholesale into skills meant for blog posts, emails, and marketing copy where those specific patterns may not apply.
- **Concealment instructions.** `jalaalrd` explicitly tells the model to hide that it's following rules ("never mention them"), a framing that treats "sounding human" as evading detection rather than writing well.
- **No engagement with false positives, genre, or actual detection research** in roughly 9 of 13 entries. "Matches the list" is treated as sufficient evidence with no calibration.
- **Unverifiable citations used as credibility props.** `lguz`'s "Based on research from Carnegie Mellon (2025)" appears with no link, title, or author anywhere in the repo: a fabricated-looking citation in an otherwise transparent skill.

## 4. What we do differently, and why

1. **Structural guidance is primary; the word list is a compact, clearly-labeled quick reference, never the mechanism.** Per `reference/research.md` §3, this is directly supported by the academic literature (sentence-length/structural uniformity is a larger, more model-independent signal than any specific word), not just a reaction to competitors' weaknesses. The OSS survey confirms banned-word-list-as-primary-mechanism is the field's dominant and most brittle failure mode, worth deliberately avoiding.
2. **No invented numeric thresholds.** Every threshold or ratio this skill states must trace to a cited source in `reference/research.md`/`reference/research/`. (1.x broke this rule once: its checklist asked "more than one or two dashes per paragraph?" with no source. 2.0.0 removed the number.) Where the research itself is contested (e.g., semicolon direction, hedging direction), the skill says so rather than picking a side to sound authoritative.
3. **No blanket word bans on ordinary correct vocabulary.** The skill targets patterns and overuse, not individual words in isolation, directly responding to `shaswatco`'s failure mode.
4. **Explicit fabrication guard.** Any instinct toward "add specificity" is paired with a rule against inventing facts, numbers, or sources not actually known to be true, responding to the fabrication risk the OSS survey found addressed in only 3 of 13 repos.
5. **Transparency, not concealment.** The skill's self-review pass is framed as an internal check, not an instruction to hide that guidance was followed. Never a "never mention this" instruction.
6. **Honest about scope.** This skill is about writing that reads as considered and human to a reader. It does not claim to defeat trained AI-detection classifiers reading model-internal fingerprints (per `harshaneel`'s and `haidrrrry`'s honest scoping, and per `reference/research.md` §5's resolution in favor of good writing over detector-evasion).
7. **Voice and genre awareness, adopted from the field's strongest entries.** `blader/humanizer`'s voice-matching (override stylistic defaults with a user-supplied sample) and `matsuikentaro1`'s genre-aware whitelisting (the same phrase is a tell in one register and normal in another) were identified above (§2) as the strongest features found anywhere in the survey, but the original version of this skill didn't adopt either. Adversarial red-team testing across API docs, legal text, marketing copy, fiction, non-English text, and edits to someone else's prose confirmed the gap was real, not theoretical: applied without scoping, this skill's own rules regressed output in exactly those genres. `SKILL.md`'s "Scope" section closes it.

## 5. October 2026 re-survey, and what 2.0.0 took from it

| Skill | State in October 2026 | Does well | Does poorly |
|---|---|---|---|
| [blader/humanizer](https://github.com/blader/humanizer) | About 54,000 stars, version 3.1.0. Rebuilt around one explanation of why model text sounds as it does; 26 patterns ordered by strength | The single explanation lets a pattern not on the list still be recognised. States that detectors still flag most of its output. Reports a blind preference test (16 of 16) | A rewrite tool only: it runs after the draft exists. About 4,200 words loaded per use. Genre handling is one paragraph |
| [conorbronsdon/avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) | Version 3.37.0. Three priority tiers, three modes, an editing contract | Reports which checks ran, what was left, and why editing stopped. Protects code, quotes, and tables | The word list is still the bulk of it. English only by its own statement |
| [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | Four files, about 390 lines | Names rhetorical moves ("cut quotables", "false agency") instead of phrases | Bans em dashes outright. Requires 35 of 50 on a self-scored rubric with no source for the number. No genre exceptions |
| [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) | New in July 2026; about 1,000 stars in its first day | Minimum-change editing. Keeps a writer's "I think", fragments, and digressions. Names colon reveals and fake-profound kickers | Caps em dashes at "1-2 max" with no source. Rewrite tool only |

**What 2.0.0 adopted.** From blader: the single explanation as the
overview, and its five strongest patterns, none of which 1.x covered
("not X but Y" was in the 1.x table but not in its rules). From
stop-slop and no-ai-slop: the closer and the colon reveal as named
patterns. From no-ai-slop: keeping a real hedge. From conorbronsdon:
reporting validation losses, not only wins
(`reference/validation-note.md`).

**What 2.0.0 declined.** Rewrite, detect, and edit modes, because this
skill applies while writing and a mode switch adds length that loads on
every use. Numeric caps on punctuation and self-scored rubrics, because
none of the four gives a source for its numbers. "False agency" as a
rule, because inanimate subjects are normal in technical writing ("the
function returns", "the index stores").

**Where this skill is still weaker.** It has no blind test at the scale
blader reports, its validation judges are Claude models, and it is
written for and tested on Claude only.
