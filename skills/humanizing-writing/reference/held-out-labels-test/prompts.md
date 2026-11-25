# Prompts as sent

Committed before any passage was generated. Both prompts are the
wrappers in `../held-out-invention-test/prompts.md`, with the tasks and
the judge questions this test's `preregistration.md` names.

## Writers

Six subagents, one per model (Haiku, Sonnet, Opus) and version, each
started fresh. Each worked in a scratch directory of its own that held
only a copy of its guide, `guide-a.md` (2.2.1) or `guide-b.md`
(candidate), under the same name. The directory names did not say which
version it was. The passages were copied into `passages/` afterwards.

```
You are a writer producing four short passages. Do not invoke any skill.
Use no tool except one Read call for the writing guide below and four
Write calls to save your passages. Write in ordinary, complete English
prose.

First read the writing guide at <scratch dir>/<guide-a.md or guide-b.md> and follow it
while you write. Do not open any other file it mentions.

Write each passage as plain markdown prose, ready to publish. No
preamble, no notes to the reader about how you wrote it. Treat each task
on its own.

Task l1: <tasks.json l1 "task", word for word>

Task l2: <tasks.json l2 "task", word for word>

Task l3: <tasks.json l3 "task", word for word>

Task l4: <tasks.json l4 "task", word for word>

Save each passage on its own, with the Write tool, to these four files:
<scratch dir>/l1.md
<scratch dir>/l2.md
<scratch dir>/l3.md
<scratch dir>/l4.md
```

## Judges

Three subagents (Opus, Sonnet, Haiku), each started fresh and given
only a copy of `pairs.md` in a scratch directory of its own.

```
You are judging pairs of short passages. Do not invoke any skill. Use
only one Read call and one Write call. Read exactly one file and no
other file in that directory or anywhere else: <scratch dir>/pairs.md

It holds twelve pairs. In each pair, two writers were given the same
task and the same working notes and produced Passage A and Passage B.
You know nothing else about how either was written.

Each pair shows, in this order: the task as the reader knows it, the
facts this reader needs, the two passages, and last, the writer's
working notes. The reader never sees the notes. Read both passages as
the stated reader before you read the notes.

For each pair decide:
1. more_machine: which passage reads more like unedited output from a
   language model. "A", "B", or "tie".
2. prefer: which passage you would rather receive as the stated reader.
   "A", "B", or "no preference".
3. undefined: for each passage, list every term or reference this
   reader could not understand from the passage alone. Judge as the
   reader, without the notes. Empty list if none.
4. missing: for each passage, list each fact this reader needs that the
   passage leaves out or gets wrong. Empty list if none.
5. invented: for each passage, list anything it states as fact that
   neither the task nor the notes supply. A detail from the notes that
   the reader did not need is not invented. General domain knowledge is
   not invention. Empty list if none.
6. why: two or three sentences giving your reasons, quoting the phrases
   that decided it.

Judge each pair on its own. Write your answers as JSON to
<scratch dir>/answers.json: one object keyed by pair name ("pair01" to
"pair12"), each value an object with the keys more_machine, prefer,
undefined, missing, invented and why. undefined, missing and invented
are each an object {"A": [...], "B": [...]} of strings.
```

"General domain knowledge is not invention" is the wrapper's sentence.
It is kept so that a writer who expands a standard abbreviation (PSP,
payment service provider) is not counted as inventing. The `undefined`
question is new to this test, from the preregistration.
