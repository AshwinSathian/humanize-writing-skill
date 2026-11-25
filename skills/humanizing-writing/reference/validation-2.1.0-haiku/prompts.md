# Prompts for the Haiku round (10 October 2026)

The three writing tasks are the ones in
`reference/validation-2.0.0/prompts.md`, word for word. This file records
the text wrapped around them, which differs from the 2.0.0 round and is
the same across the three conditions except where marked.

## Writers

Nine subagents, one per task and condition, each started fresh on Claude
Haiku with this prompt. `<task>` is one of the three tasks.

No skill:

```
You are a writer producing one passage. Do not invoke any skill. Use no
tool except one Write call to save your passage. Write in ordinary,
complete English prose.

Write the passage as plain markdown prose, ready to publish. No preamble,
no notes to the reader about how you wrote it.

Task: <task>

Save only the passage, with the Write tool, to <path> and then reply
with the single word: done
```

With a skill (1.1.1 or 2.1.0), the first paragraph allows one Read call
as well, and this paragraph is added after it:

```
First read the writing guide at <path to that version's SKILL.md> and
follow it while you write. Do not open any other file it mentions.
```

The 1.1.1 guide is `git show v1.1.1:SKILL.md`. The 2.1.0 guide is
`SKILL.md` at commit c7a84f4.

Two lines here were not in the 2.0.0 round. "Do not invoke any skill" is
there because the machine that ran the test has this skill installed,
and a writer in the no-skill condition could otherwise have loaded it.
"Write in ordinary, complete English prose" is there because the same
machine runs a session hook that shortens replies. Both lines went to
all nine writers.

## Judges

Three subagents (Opus, Sonnet, Haiku), each started fresh and given only
`pairs.md`:

```
You are judging pairs of short passages. Do not invoke any skill. Use
only one Read call and one Write call. Read exactly one file and no
other file in that directory or anywhere else: <path to pairs.md>

It holds six pairs. In each pair, two writers were given the same task
and produced Passage A and Passage B. You know nothing else about how
either was written.

For each pair decide:
1. more_machine: which passage reads more like unedited output from a
   language model. "A", "B", or "tie".
2. prefer: which passage you would rather publish for the stated
   audience. "A", "B", or "tie".
3. invented: for each passage, list anything it states as fact that the
   task did not supply and that a writer could not know (an incident, a
   figure about this team or system, a quote, a source). General domain
   knowledge is not invention, and a case clearly marked as hypothetical
   is not invention. Empty list if none.
4. why: two or three sentences giving your reasons, quoting the phrases
   that decided it.

Judge each pair on its own. Write your answers as JSON to <path>.
```

The pairs file was copied to a directory of its own before judging, so
`key.json` was not beside it.
