# Prompts as sent

## Writers

Six subagents, one per model (Haiku, Sonnet, Opus) and version. The
skill files were named `guide-a.md` (2.1.0) and `guide-b.md`
(candidate), so nothing in the prompt said which was which.

```
You are a writer producing four short passages. Do not invoke any skill.
Use no tool except one Read call for the writing guide below and four
Write calls to save your passages. Write in ordinary, complete English
prose.

First read the writing guide at <path to guide-a.md or guide-b.md> and
follow it while you write. Do not open any other file it mentions.

Write each passage as plain markdown prose, ready to publish. No
preamble, no notes to the reader about how you wrote it. Treat each task
on its own.

Task h1: ... Task h2: ... Task h3: ... Task h4: ...
(the four tasks, word for word as in preregistration.md)

Save each passage on its own, with the Write tool, to these four files:
<four paths>
```

## Judges

Three subagents (Opus, Sonnet, Haiku), each given only `pairs.md` in a
directory of its own.

```
You are judging pairs of short passages. Do not invoke any skill. Use
only one Read call and one Write call. Read exactly one file and no
other file in that directory or anywhere else: <path to pairs.md>

It holds twelve pairs. In each pair, two writers were given the same
task and produced Passage A and Passage B. You know nothing else about
how either was written.

For each pair decide:
1. more_machine: which passage reads more like unedited output from a
   language model. "A", "B", or "tie".
2. prefer: which passage you would rather publish for the stated
   audience. "A", "B", or "tie".
3. invented: for each passage, list anything it states as fact that the
   task did not supply and that a writer could not know (an incident, a
   figure about this team or system, a statement of how this team works
   now or worked in the past, a quote, a source). General domain
   knowledge is not invention, and a case clearly marked as hypothetical
   is not invention. Empty list if none.
4. dropped_or_hedged: for each passage, list any fact the task did
   supply that the passage leaves out, or states with a hedge the task
   did not give it. Empty list if none, and always empty when the task
   supplied no facts.
5. why: two or three sentences giving your reasons, quoting the phrases
   that decided it.

Judge each pair on its own. Write your answers as JSON to <path>.
```

Item 3 names "a statement of how this team works now or worked in the
past". The judges in the two earlier rounds were not given that phrase.
