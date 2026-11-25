# Pre-registration: should the skill tell writers not to carry their working labels into prose?

Written and committed on 25 November 2026, before any passage for this
test was generated. The commit that adds this file, `tasks.json` and
`candidate-rule.md` is the record of that. The commit that adds
`passages/` must come after it.

## Why

OpenAI's guide to GPT-6.2 Astra (read 25 November 2026) says: "During
longer tasks, the model can carry shorthand from its reasoning or from
other agents into its final answer." Its suggested prompt says: "Do not
carry over working shorthand, jargon, or abbreviations from your
reasoning, tool calls, or instructions to subagents and automations."
The skill is used mostly by agents that write after doing work: a pull
request after a fix, a report after a review. No rule in 2.2.1 covers a
label the writer coined along the way. "Use the plain verb and the
common word" is about word choice, and "Lead with what the reader came
for" is about order.

Two things could be true. Claude writers already translate their
working labels for the reader, so the rule adds length for nothing. Or
they pass "H2" and "Plan B" through to a reader who never saw them, and
one bullet changes that. This test is meant to tell them apart. It does
not test GPT or Gemini writers, which is where the vendor evidence
comes from (see "Known weaknesses").

## What is compared

Two versions of `SKILL.md` that differ in one bullet
(`candidate-rule.md`): the 2.2.1 text, and a candidate that adds it.
The writers get them as `guide-a.md` (2.2.1) and `guide-b.md`
(candidate).

## Tasks

Four tasks, in `tasks.json`, none used in an earlier round. Each gives
the writer a set of working notes from a finished task and asks for the
message a named reader gets afterwards: a pull request description, a
chat message to a team lead, an email to a customer, and a code-review
report. Each set of notes is full of labels the writer made up (`H2`,
`Plan B`, `bf2`, `repro-3`, `F1`), listed per task under `labels`. No
task gives a length or mentions the labels.

`tasks.json` also lists, per task, the facts the reader needs
(`needed`). Judges get that list. Writers do not. Judges never see the
notes or the `labels` list. They read as the named reader would.

## Writers and judges

Six writer subagents, one per model (Haiku, Sonnet, Opus) and version,
each started fresh, each writing all four passages in one context, with
the wrapper in `../held-out-invention-test/prompts.md`. That gives 24
passages and 12 pairs, built by a copy of
`../held-out-reader-first-test/make_pairs.py` with a new seed
(20261125). Each task's text goes to the writer word for word as in
`tasks.json`, notes included.

Three judges (Opus, Sonnet, Haiku), each started fresh, see only the
shuffled pairs: the task as the reader would know it (the first
paragraph of the task, without the notes), the needed facts, and the
two passages. For each pair they answer:

- which reads more like unedited model output;
- which they would rather receive as the stated reader;
- for each passage, every term or reference this reader could not
  understand from the passage alone (`undefined`);
- which needed facts it leaves out or gets wrong (`missing`);
- what it states as fact that the task did not supply (`invented`).

`tally.py` also counts, for each passage, how many of the task's
`labels` appear in it word for word, case-insensitive, with or without
a definition (`leaks`). Word counts come from `scripts/measure.py`.

## Definitions

- A passage is **unclear** when at least two of three judges list at
  least one `undefined` item for it.
- A passage is **missing** when at least two judges list a needed fact
  for it.
- A passage is **flagged for invention** when at least two judges list
  at least one invented item for it.
- C_x is the count for the twelve 2.2.1 passages, K_x for the twelve
  candidate passages.

## Decision rule

Adopt the candidate as 2.3.0 only if all of these hold:

1. **There is a problem to fix.** C_unclear is at least 3. If the 2.2.1
   passages are already clear, the rule is not adopted: it would add
   length to every use of the skill for nothing.
2. **It helps.** K_unclear is at most C_unclear − 2.
3. **It does not cost quality.** For at least two of the three judges,
   the candidate is preferred or tied in at least 6 of the 12 pairs.
4. **It does not over-correct.** K_missing is at most C_missing, and
   the median candidate passage is at most 115% of the median 2.2.1
   passage's word count. Defining every label could make a passage
   longer without making it clearer.
5. **It does not invite invention.** K_invented is at most C_invented.
   A writer told to say what "bf2" stands for could make up more than
   the notes say.

`leaks` is reported and not used in the decision. A label used with a
definition counts as a leak, and the rule allows that.

Otherwise the rule is not adopted, and `result.md` says which condition
failed. No second wording will be tried against these four tasks.

## Known weaknesses, stated in advance

- The evidence for the rule is about GPT-6.2. The writers here are
  Claude models, because this round has no budget for other vendors'
  APIs. A pass shows the rule helps Claude. A fail on condition 1 says
  only that Claude doesn't have the problem on these tasks.
- The notes are written out in the task, not produced by the writer
  doing the work. A writer that coined a label itself may hold on to it
  more than one that was handed it, so this may understate the problem.
- Twelve pairs is a small sample.
- The judges are Claude models, and each shares a model with a third of
  the writers.
- The tasks were written by the author of the candidate, with labels
  planted on purpose.
- One writer per model and version writes all four tasks, so passages
  from one writer are not independent.
- Some labels sit close to real terms. "PSP" is a standard abbreviation
  for a payment service provider, but a customer does not know it.
  Judges decide that as the named reader, which is the point, and also
  a source of noise.
