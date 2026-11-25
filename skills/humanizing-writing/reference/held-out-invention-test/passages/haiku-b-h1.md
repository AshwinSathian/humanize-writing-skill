Every production incident should end with a written postmortem, including the small ones. The point of the document is to leave a record of what happened, what we knew at each step, and what we changed, so that the next person who sees the same symptoms does not start from zero.

A useful postmortem answers four questions. What did users see, and for how long? What was the root cause, stated as a mechanism rather than a person? How did we detect the problem, and was that fast enough? What will we change, and who owns each change?

Small incidents deserve the same treatment because they are cheap to write up and often point at the same weak spots. A stale cache that clears itself after ten minutes looks harmless once. Three of them in one month is a pattern, and only a written record makes that pattern visible.

Keep each postmortem under two pages. Put the timeline first, with timestamps taken from logs rather than memory. Turn the action items into tickets in our tracker instead of leaving them as sentences at the bottom of a document, where they will be forgotten.

Writing one is quick. Skipping it costs the next on-call engineer far more.
