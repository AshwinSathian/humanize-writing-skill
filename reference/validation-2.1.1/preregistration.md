# Pre-registration: should the rule against inventing name claims about the reader's team?

Written and committed on 10 October 2026, before any passage for this
test was generated. The commit that adds this file is the record of
that.

## Why

In the Haiku round (`reference/validation-2.1.0-haiku/`), two of three
judges flagged a 2.1.0 passage for stating a team's current practice as
fact: "Right now a half-finished feature either sits on a long-lived
branch or reaches every user at once." The rule against inventing names
"made-up incidents, figures, quotes, or sources" and gives a past-tense
example ("last quarter we..."). It does not name a present-tense claim
about how the reader's team works.

That is one passage, on a task the rules were tuned on. Two things
could be true. The wording has a gap that a short addition closes, or
the passage was noise and an addition would cost length on every use
and push writers into hedged, conditional prose. This test is meant to
tell them apart.

## What is compared

Two versions of `SKILL.md` that differ in one rule
(`candidate-rule.md`): the 2.1.0 text, and a candidate that adds a
sentence covering the team's past and present.

## Tasks

None of these has been used in an earlier round, and none is about
feature flags, database indexes, or payment webhooks. The first three
give the writer no facts about the team. The fourth supplies facts and
is a control for over-correction.

- **h1.** Write a section of about 200 words for an internal engineering
  blog arguing that the team should write a postmortem after every
  production incident. Audience: your own engineering team.
- **h2.** Write a message of about 150 words for the team channel
  proposing that the team move its daily standup to a written update.
  Audience: your own team.
- **h3.** Write about 200 words for an internal wiki page recommending
  that the team pin its dependency versions and update them on a
  schedule. Audience: your own engineering team.
- **h4 (control).** Write a section of about 150 words for an internal
  engineering blog arguing that the team should run its test suite in
  parallel. Use these facts about the team, and add no others about it:
  the test suite takes 38 minutes on the single CI runner; the team
  merges about 25 pull requests a week; two engineers left comments last
  sprint asking for faster CI.

## Writers and judges

Six writer subagents, one per model (Haiku, Sonnet, Opus) and version,
each started fresh. Each reads its version of the skill from a file and
writes all four passages. That gives 24 passages and 12 pairs, each
pairing the candidate passage with the 2.1.0 passage for the same task
and model. Writers get the same wrapper as in the Haiku round (do not
invoke any skill, write in ordinary prose).

One writer per model and version writes all four tasks in one context.
Earlier rounds used one writer per passage. This is cheaper and is the
same for both versions, but passages from one writer are not
independent of each other.

Three judges (Opus, Sonnet, Haiku), each started fresh, see only the
shuffled pairs. They answer the questions from the earlier rounds
(which reads as more machine-written, which they would publish, what
each passage states as fact that the task did not supply) and one new
one: whether either passage hedges or leaves out a fact the task did
supply.

## Definitions

- A passage is **flagged for invention** when at least two of the three
  judges list at least one invented item for it.
- A passage is **flagged for over-correction** when at least two judges
  say it hedged or left out a supplied fact. Only h4 supplies facts.
- **C** is the number of 2.1.0 passages flagged for invention among the
  nine written for h1 to h3. **K** is the same count for the candidate.

## Decision rule

Adopt the candidate as 2.1.1 only if all three hold:

1. **The problem reproduces and the candidate reduces it.** C is at
   least 2, and K is at most C minus 2.
2. **It does not cost quality.** For at least two of the three judges,
   the candidate is preferred or tied in at least 6 of the 12 pairs.
3. **It does not over-correct.** No candidate h4 passage is flagged for
   over-correction, unless the 2.1.0 passage for the same model is
   flagged too.

If C is 0 or 1, the slip did not reproduce on held-out tasks. The rule
stays as it is and this file's result section says so.

If C is at least 2 and condition 1, 2, or 3 fails, the rule stays as it
is and the result is recorded with the reason.

No second candidate wording will be tried against these four tasks.

## Known weaknesses, stated in advance

- Nine passages per version is a small sample for an event that has
  been seen once.
- The judges are Claude models, and one of them shares a model with a
  third of the writers.
- "At least one invented item" counts any invention, and judges differ
  on where inference from the task ends and invention begins.
- The author of the candidate wording also wrote the tasks. The tasks
  were written to invite claims about the team, which is the condition
  the rule is for, and it also makes C larger than it would be on
  ordinary tasks.
