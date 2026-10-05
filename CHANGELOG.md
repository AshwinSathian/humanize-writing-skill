# Changelog

## 2.0.0

The rules were rewritten against 2026 sources, and the rewrite was
tested blind before release. Existing installs will see different output:
that is the reason for the major version.

**Why.** The tells this skill targeted have moved. A July 2026 study by
*The Economist* of four major models found the signal now sits in long
words, long "and"-chained sentences, and thin punctuation, with the em
dash narrowed to Claude alone. Wikipedia's AI-vocabulary list for mid-2025
onward is four words, one of which was on its 2023 list. Anthropic's own
prompting guide names "mannered prose" (metaphor in place of direct
statement) as a habit of its current model. Version 1.x covered none of
this, and an audit of its own examples found that its rewrites had
swapped 2023 tells for 2026 ones: negated contrasts, one-line closers,
fragments for effect. They had also added facts the originals did not
contain. Details and sources: `reference/research/2026-update.md`.

**Rules that changed.**

- "Vary sentence rhythm on purpose" is replaced by "let sentence length
  follow the content". The old rule produced short sentences written for
  effect.
- "Cut hedge-intensifiers (rather, very, little, pretty)" is replaced by
  "hedge each uncertain claim once". The old rule came from a 1959 style
  guide and no source reported those words as a model habit.
- The dash rule no longer carries a number ("one or two per paragraph"),
  which had no source.
- New rules: say each thing once; replace a figure of speech with the
  fact it stands for; prefer the verb to its noun form and the common
  word to the long one; stop when the content stops (no closing line
  that repeats the paragraph, no announcing a point, no denying a view
  the reader does not hold).
- "Never invent" is now its own rule and covers plausible-sounding
  incidents, mechanisms the writer does not know, and anything a rewrite
  adds to its source. Blind testing caught both 1.1.1 and an early 2.0.0
  draft inventing a past incident for an internal blog post.
- The tells table is cut from nine rows of mostly 2023 vocabulary to six
  patterns that no rule already names.
- Rules and Scope are written as plain sentences. They were bold-lead
  bullets, a format the repo's own catalog lists as a tell.

**Scope.** All 1.1.0 carve-outs remain. Added: summaries (an abstract or
TL;DR exists to restate), speeches, poetry, and brand voice. The
non-English entry no longer says the tells do not transfer; a 2026 study
found model-preferred vocabulary recurring across 34 languages.

**Trigger.** The description now fires on prose of a paragraph or more
and on requests to humanize text, and says what the skill is not for
(proofreading a person's own writing, evading AI detectors). In 1.x it
fired on any written text, including one-line commit subjects where
Scope then told it to do almost nothing.

**Detectors.** `SKILL.md` and the README now say plainly that the skill
does not change AI-detector scores, with the research behind that in
`reference/research/2026-update.md` §3. The `ai-detection` keyword is
removed from the plugin manifest.

**Validation.** Replaced the 1.x method (a judge who knew which passage
was which, scoring against the skill's own list) with shuffled blind
pairs judged by two models, plus `scripts/measure.py` for descriptive
metrics. In the released round both judges preferred 2.0.0 to no skill
in 5 of 6 pairs, and to 1.1.1 in 5 of 6 and 4 of 6. An earlier 2.0.0
draft did no better than 1.1.1 and was revised. Losses, limits, and all
the raw pairs are in `reference/validation-note.md` and
`reference/validation-2.0.0/`.

**Also.** Four worked examples (two rewritten, two new in 2026 styles),
each noting what the 1.x rewrite got wrong. `reference/claude-tics.md`
records habits reported for current Claude versions with an evidence
grade for each. `reference/oss-skills-review.md` has an October 2026
re-survey of the most-used alternatives and what was taken from them.
`SKILL.md` is about a quarter longer than in 1.1.1.

## 1.1.1

Audited the repo against Anthropic's actual plugin submission
requirements (manifest schema, directory structure, validation, security
surface) ahead of a community-marketplace submission attempt. Nothing
needed fixing there. The manifest was already fully compliant, `claude
plugin validate . --strict` already passed clean, and the plugin has
zero executable surface (no hooks, MCP/LSP servers, or scripts).

The submission itself turned out to require going through Anthropic's
Console, which gates access behind purchasing usage credits. Rather than
pay for that, added `.claude-plugin/marketplace.json`, making this repo
its own self-hosted plugin marketplace: `/plugin marketplace add
AshwinSathian/humanize-writing-skill` then `/plugin install
humanizing-writing@humanize-writing-skill` installs it directly from
GitHub, no Anthropic review, account, or cost involved. Verified
end-to-end locally (add, install, uninstall) before shipping it.

## 1.1.0

Two adversarial review rounds against the shipped 1.0.0 skill, both
verified with fresh, independently skeptical subagents rather than
assumed to work once the text was written.

**Genre and voice scoping** (the larger change): 1.0.0's rules for
sentence-rhythm variation, avoiding templated structure, and cutting
hedge language were correct for discursive essay prose but stated as if
universal. Red-team testing found they actively regressed output in
API/reference docs (broke required parallel structure), legal
boilerplate (stripped enforceability-critical enumerations and hedges),
marketing copy (cut the persuasive close), fiction ("never invent
facts" bled hedging into invented narration), non-English text
(English-only tell vocabulary misapplied), and edits to someone else's
already-human prose (overwrote their voice). Added a `## Scope` section
to `SKILL.md` with explicit, checkable carve-outs for each case, plus a
rule to match an already-established voice or convention before
defaulting to the skill's own shape.

**Explicit user-instruction priority.** Testing found that when a user
explicitly asks for something the skill would normally flag (house-style
buzzwords, a mandated template, a policy-required phrase), the correct
behavior only happened via reasoning entirely outside the skill's own
text. Added an explicit bullet: a specific user request overrides these
defaults.

**Research currency.** Verified all cited sources (12 checked, including
several from after a typical model's training cutoff), and none were
fabricated or misattributed, though two specific figures couldn't be
independently re-confirmed behind paywalls and are now flagged as such
rather than stated as flat fact. Added a July 2026 cross-model study
(*The Economist*) that narrows the em-dash tell specifically: of the
four models tested, only Claude, the model this skill runs on, still
exceeds human em-dash frequency.

**Documentation standards.** Added tables of contents to every reference
file over 100 lines, per Anthropic's own skill-authoring checklist.

## 1.0.0

Initial release. Built from three research passes (academic detection
literature, editorial/practitioner style guides, a cross-referenced
catalog of 27 AI-writing tells) and a teardown of 13 existing public
"humanizer" skills. Weights structural guidance (vary rhythm, commit to
specific claims, avoid templated structure) above a banned-word list,
which the research found to be the field's dominant and most brittle
mechanism.
