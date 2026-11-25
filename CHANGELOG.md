# Changelog

## 2.2.1 (25 November 2026)

**If you installed by symlink, re-point it.** The skill moved from the
repo root to `skills/humanizing-writing/`. After `git pull`, an old
symlink points at a folder with no `SKILL.md`:

```bash
rm ~/.claude/skills/humanizing-writing
ln -s "/path/to/humanize-writing-skill/skills/humanizing-writing" ~/.claude/skills/humanizing-writing
```

`npx skills` and `/plugin install` users need no action beyond the
usual update. The rules in `SKILL.md` are unchanged.

**Why the move.** `npx skills` copies the whole folder that holds
`SKILL.md`, and `/plugin install` copies the whole plugin source, so
every install carried the website in `site/` (61 files, 4.7 MB). A
symlink to the repo root also exposed `site/node_modules`, where Codex
CLI listed a skill bundled with one of the site's dependencies. The skill, its references, a
copy of the LICENSE and the plugin manifest now live in
`skills/humanizing-writing/`, and the marketplace entry points there.
Links to `blob/main/SKILL.md` and `blob/main/reference/...` from
outside the repo now 404; the same files are under
`skills/humanizing-writing/`.

**Model habits, checked against the primary source.**
`reference/claude-tics.md` cited Graphite's phrase counts secondhand.
Graphite's reports (16 September and 1 October 2026) are now read in
full, and several entries changed:

- Claude Opus 5.5 uses 0.015 em dashes per 1,000 words, against 2.92
  for Opus 5 (down 99%). The em-dash row now covers Opus 5 and earlier.
- New Opus 5.5 rows: evaluative adjectives ("dependable" at 23 times
  the human rate), helpfulness phrasing, superlatives. Two of those are
  measured against Opus 5 or GPT-6 Astra rather than against human
  writers, and the file now says which basis each figure uses.
- The semicolon-pivot row, from one community source, is removed.
- "load-bearing", fragments for drama and announced candor are marked
  as Opus 5 habits. Graphite's Opus 5.5 lists have none of the first
  two, and measure "is genuinely" at 26 times the Opus 5.5 rate in
  Opus 5.

New `reference/gpt-tics.md` (GPT-6 Astra and 6.2, from Graphite,
OpenAI's GPT-6.2 guide and Wikipedia) and `reference/gemini-tics.md`
(Gemini 3.1 Pro, from Graphite and Google's prompting guide; the file
says the evidence is thin). The Sources line in `SKILL.md` points at
all three. That line is the only change to `SKILL.md`.

**Other agents.** The README has a table of where the skill was
checked: Codex CLI 0.172.0 and Gemini CLI 0.71.1 load it (run on
25 November 2026); Cursor and Copilot from their documentation only.
No test has measured its effect on GPT or Gemini output.

**Pre-registered for 2.3.0.** A rule against carrying labels coined
during the work ("H2", "Plan B", "fix-2") into prose for a reader who
never saw them, from OpenAI's note that GPT-6.2 "can carry shorthand
from its reasoning or from other agents into its final answer". The
tasks, candidate wording and decision rule are committed, with no
passages: `reference/held-out-labels-test/`.

**Checks.** `tools/check-skill.py` fails if the layout, a link in the
README or the site, or the versions drift, or if a habit-file figure
lacks its basis. `tools/check-install.sh` and `tools/check-plugin.sh`
install from the working tree and fail if `site/` comes along.

## 2.2.0 (19 November 2026)

Adds one rule to "Write this way", after "Say each thing once":

> Lead with what the reader came for. In a reply, message, PR
> description, status update, or report, the first sentence or two give
> the answer, the decision, or what you need from them, and the support
> follows. Leave out what this reader will not use, even when it is true
> and you have it.

**Why.** The "No AI Slop" manifesto (AI Engineer Code Summit, November
2026) defines slop by what it costs the reader: "less effort into
producing something than we ask the consumer to spend understanding
it." Every 2.1.0 rule worked on sentences and words, and none said
where the main point goes. Sources and the rest of what the manifesto
and the literature around it changed or did not change here:
`reference/research/2026-11-no-slop.md`.

**Test.** Pre-registered before any passage was written
(`reference/held-out-reader-first-test/preregistration.md`): four tasks
never used before, each a message whose reader wants one thing, each
with facts the reader does not need. Three writer models, three judges,
twelve pairs. With the rule, 12 of 12 passages opened with the answer
or request, against 10 of 12 without it. All three judges preferred the
candidate in 9, 9 and 10 of 12 pairs. Median length fell from 130 words
to 112. No passage under either version left out a fact the reader
needed.

**What did not work.** The second sentence, about leaving out facts the
reader will not use, changed nothing measurable: candidate passages
carried the planted noise facts at almost the same rate (for example,
the cron detail in a support-team update appeared in 3 of 3 passages
under both versions). It stays because the test adopted the bullet as
a whole, and it should go if a later test confirms it does nothing.
Full counts and limits: `reference/held-out-reader-first-test/result.md`.

**Site.** <https://humanize.ashwinsathian.com> is rebuilt in Astro and redesigned. The home page opens with a
paragraph edited in four stages (draft, marked up, rewritten, checked), and a visitor can mark up their own
paragraph with the same expressions as `scripts/measure.py`, in the browser, with no verdict. Bricolage Grotesque
is the only text face; the Newsreader serif is gone. Fonts, pictures and headers follow the loupe site's
performance rules, and `site/tests/` checks them on every build. Details: `site/README.md`.

**Also.** `reference/claude-tics.md` has three Opus 5.5 entries from
Graphite's phrase counts ("this matters" at about 116 times the human
rate), read secondhand and marked that way.

## After 2.1.0 (no release, `SKILL.md` unchanged)

**Haiku round, 10 October 2026.** The blind comparison was repeated
with Claude Haiku as the writer and with a Haiku judge added to the Opus
and Sonnet judges: three tasks, three conditions, six pairs. All three
judges preferred the 2.1.0 passage to the no-skill passage in 3 of 3
pairs. Against 1.1.1 the Opus judge preferred 2.1.0 in 3 of 3, the
Sonnet judge in 2 with one tie, and the Haiku judge in 2 with one loss.

Two judges flagged the 2.1.0 feature-flag passage for stating the
team's current practice as fact ("Right now a half-finished feature
either sits on a long-lived branch or reaches every user at once"). It
is the first recorded miss of the rule against inventing in a 2.x
passage. The rule's wording does not name that kind of claim. It has
been left as it is until a change can be tested on a task the rules
were not fitted to. Method, files, and limits:
`reference/validation-note.md` and `reference/validation-2.1.0-haiku/`.

**A rule change tested and not made, 10 October 2026.** A candidate
wording extended the rule against inventing to cover present-tense
claims about the reader's team. The test was pre-registered before any
passage was written: four tasks never used before, three writer models,
three judges, and a fixed decision rule. Under 2.1.0, 2 of 9 passages
were flagged for invention by two or more judges; under the candidate,
1 of 9. The rule required a drop of two, so the candidate was not
adopted. The judges preferred the candidate slightly more often and
found no over-correction. On a control task that told writers to add no
facts about the team, two of three models added one under each version.
Files and the full result: `reference/held-out-invention-test/`.

**Site and README.** `site/` holds the source of
<https://humanize.ashwinsathian.com>. The README now leads with the
install commands and the example. Plugin and marketplace manifests
point `homepage` at the site.

## 2.1.0

Adds one Scope rule and one example file. The other rules are unchanged.

**Voice.** When drafting in a person's own voice from their writing
sample or a voice profile, that person's habits now outrank the style
rules, except the rule against fabricating. Before this, the skill
removed dashes, negated contrasts, one-line endings, and stock idioms
even when they were the author's own. `voices/ashwin-sathian.md` is an
example profile for the skill's author: sentence-length and pronoun
counts from about 55,000 words of his writing, and descriptions of his
habits. It contains no quoted text and is meant only for drafts under
his name.

**Test.** Fresh model instances wrote a tutorial section and a film
note under 2.0.0, under 2.0.0 with the profile, and under 2.0.0 with an
added instruction to write "80% of the way to ASD-STE100". One model
judge, shown the pieces unlabelled beside real passages by the author,
ranked the profile drafts closest to him on both tasks and the STE
drafts farthest. The profile drafts moved toward his use of "we" and
of questions, and after one revision of the profile matched his rate of
contractions. They did not match his sentence length (15 words on
average against his 17 to 18, with far fewer long sentences) or his
dashes (none against five to six per 1,000 words). An early profile
draft also invented a first-person experience. The profile now warns
against that by name.

That is two tasks, one judge, and one writer model, and the second
profile round was checked by counts and not re-judged. The pieces and
the judge's packet are not published because the packet contains the
author's unpublished writing.

**Not adopted.** A Simplified Technical English filter was considered
after a suggestion by Andrej Karpathy in October 2026 and left out. In
the test above it cut average sentence length to 11 or 12 words with
little variation, and Wikipedia's "Signs of AI writing" page now lists
shorter sentences of 8 to 20 words as a habit of mid-2026 models.

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
