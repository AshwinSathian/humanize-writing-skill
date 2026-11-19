# Pre-registration: should the skill tell writers to lead with what the reader came for?

Written and committed on 19 November 2026, before any passage for this
test was generated. The commit that adds this file is the record of
that.

## Why

The "No AI Slop" manifesto from the AI Engineer Code Summit (November
2026) defines slop as putting "less effort into producing something than
we ask the consumer to spend understanding it." Ghostty's AI policy says
"AI is very good at being overly verbose and including noise that
distracts from the main point." Every rule in 2.1.0 works on sentences
and words. None says where the main point goes, and none says to leave
out a true fact the reader will not use. The rule against inventing
covers facts a writer adds. It says nothing about facts a writer was
given and should drop.

Two things could be true. Current models already lead with the answer
in messages and drop noise, so the rule would add length to every use
of the skill for nothing. Or they bury the point under context and pass
along every fact they were given, and one bullet changes that. This test
is meant to tell them apart.

## What is compared

Two versions of `SKILL.md` that differ in one bullet
(`candidate-rule.md`): the 2.1.0 text, and a candidate that adds it.

## Tasks

Four tasks, in `tasks.json`, none used in an earlier round. Each is a
message whose reader wants something specific: a chat reply to a
product manager's question, a pull request description, an email
asking a manager for approval, and an incident update for a support
team. Each supplies facts, and each includes at least one fact the
reader does not need (the library version, the sales rep's emails, the
cron detail for support staff, the renamed variable). No task gives a
length.

`tasks.json` also lists, per task, the facts the reader needs. Judges
get that list. Writers do not.

## Writers and judges

Six writer subagents, one per model (Haiku, Sonnet, Opus) and version,
each started fresh, each writing all four passages in one context, with
the same wrapper as the held-out invention test (`../held-out-invention-test/prompts.md`).
That gives 24 passages and 12 pairs. The guide files are named
`guide-a.md` (2.1.0) and `guide-b.md` (candidate).

Three judges (Opus, Sonnet, Haiku), each started fresh, see only the
shuffled pairs. For each pair they answer: which reads more like
unedited model output; which they would rather receive as the stated
reader; for each passage, whether its first two sentences give the
answer, decision or request (`leads`); which needed facts it leaves out
or gets wrong (`missing`); and what it states as fact that the task did
not supply (`invented`).

Word counts come from `scripts/measure.py` and are reported, not used
in the decision unless condition 1b applies.

## Definitions

- A passage **leads** when at least two of three judges answer yes.
- A passage is **missing** when at least two judges list a needed fact
  for it.
- A passage is **flagged for invention** when at least two judges list
  at least one invented item for it.
- C_x is the count for the twelve 2.1.0 passages, K_x for the twelve
  candidate passages.

## Decision rule

Adopt the candidate as 2.2.0 only if all of these hold:

1. **It helps.** Either (a) K_lead is at least C_lead + 2, or (b) C_lead
   is 11 or 12, so there is no room to improve on leading, and the
   median candidate passage is at most 85% of the median 2.1.0
   passage's word count.
2. **It does not cost quality.** For at least two of the three judges,
   the candidate is preferred or tied in at least 6 of the 12 pairs.
3. **It does not over-correct.** K_missing is at most C_missing.
4. **It does not invite invention.** K_invented is at most C_invented.

Otherwise the rule is not adopted and `result.md` says which condition
failed. No second wording will be tried against these four tasks.

## Known weaknesses, stated in advance

- Twelve pairs is a small sample.
- The judges are Claude models, and each shares a model with a third of
  the writers.
- The tasks were written by the author of the candidate. They contain
  noise facts on purpose, which is the condition the rule is for, and
  that makes a difference more likely than on ordinary tasks.
- Telling judges the needed facts makes `missing` objective but may
  also steer their preference toward passages that put those facts
  first.
- One writer per model and version writes all four tasks, so passages
  from one writer are not independent.
