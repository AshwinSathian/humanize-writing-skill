# Result: write for a reader who did not see the work

Run on 25 November 2026. The preregistration (commit a0227c4, amended
in 8ce1597) was not changed. The protocol files (`guide-a.md`,
`guide-b.md`, `make_pairs.py`, `tally.py`, `prompts.md`) were committed
in 2ec341d, before any passage existed. The passages were added in
d40bde3, after both. `python3 tally.py` reproduces every number below
from `key.json`, the three `judge-*.json` files and `passages/`.

**The candidate is not adopted.** Two of the five conditions fail. The
candidate passages were no clearer than the 2.2.1 passages (3 unclear
passages each), and more of them were flagged for invention (5 against
3). Judges preferred the candidate passages, and the candidate did not
make passages longer. Under the preregistration, no second wording will
be tried on these four tasks.

## Counts

```
Counts (passages with 2+ of 3 judge votes), of 12, 2.2.1 (C) vs candidate (K):
  unclear: C=3 K=3
  missing: C=0 K=0
  invented: C=3 K=5
Median words: C 166.0, K 161.0 (97.0%)
Preference per judge (no preference counted as tie):
  haiku: candidate 8, 2.2.1 3, tie 1
  opus: candidate 7, 2.2.1 5, tie 0
  sonnet: candidate 8, 2.2.1 4, tie 0
Condition 1 (There is a problem to fix): pass
Condition 2 (It helps): fail
Condition 3 (It does not cost quality): pass
Condition 4 (It does not over-correct): pass
Condition 5 (It does not invite invention): fail
Decision: do not adopt
```

| Condition | Required | Found | Verdict |
|---|---|---|---|
| 1. There is a problem to fix | C_unclear ≥ 3 | 3 | pass |
| 2. It helps | K_unclear ≤ C_unclear − 2 = 1 | 3 | **fail** |
| 3. It does not cost quality | 2 of 3 judges prefer or tie the candidate in ≥ 6 of 12 | Haiku 9, Opus 7, Sonnet 8 | pass |
| 4. It does not over-correct | K_missing ≤ C_missing; median K ≤ 115% of median C | 0 ≤ 0; 161 is 97% of 166 | pass |
| 5. It does not invite invention | K_invented ≤ C_invented | 5 > 3 | **fail** |

## The flagged passages

A passage counts when at least two of the three judges listed at least
one item for it. Each quote below is from the passage; the judges who
listed it are in brackets.

### Unclear

2.2.1, 3 passages:

- Haiku, migration message (l2): "The 3-hour downtime estimate comes
  from the dry run on staging (DR-1)." [Haiku, Opus, Sonnet: DR-1. Opus
  also: "bf2" used before it is explained.]
- Sonnet, migration message (l2): "A staging dry run (DR-1) estimated 3
  hours of downtime." [Haiku, Opus, Sonnet: DR-1]
- Sonnet, email to Dana (l3): "Our engineers have a ticket open
  (PAY-771)" and "a pending authorization that was never captured".
  [Haiku, Opus, Sonnet: PAY-771. Haiku, Opus: "captured"]

Candidate, 3 passages:

- Haiku, migration message (l2): "The 3-hour figure comes from a dry run
  on staging (DR-1)." [Haiku, Opus, Sonnet: DR-1. Sonnet also: Plan A
  and Plan B used before they are defined]
- Sonnet, migration message (l2): "I recommend we migrate the orders
  table with dual-writes (option B below)." No option in the message is
  labelled B. [Haiku, Opus, Sonnet]
- Sonnet, email to Dana (l3): "Our payment provider never captured the
  second one". [Haiku, Opus: "captured"]

The candidate did not remove the labels a judge would flag. "DR-1"
survived in the Haiku candidate passage exactly as in the 2.2.1 one.
In the Sonnet migration message the candidate writer took the plan
names out but left a pointer to one ("option B below"), and every judge
caught it. The third candidate flag is "captured", a payment term, not a
label from the notes. Read that way, the planted labels made 3 of the
2.2.1 passages unclear and 1 of the candidate passages (2 if the stray
"option B" counts), but condition 2
counts every unclear passage, and this reading was not pre-registered.

### Invented

2.2.1, 3 passages:

- Haiku, PR description (l1): "I have not run it on CI." [Haiku, Opus,
  Sonnet]
- Haiku, email to Dana (l3): "the page did not confirm the first
  payment", "reply to this email with a screenshot of your card
  statement", "your bank will release it by itself". [Haiku, Opus,
  Sonnet]
- Haiku, review report (l4): "I did not run the fix for F1 or F2, so
  the suggested fixes are unverified." [Haiku, Sonnet]

Candidate, 5 passages:

- Haiku, migration message (l2): "If you approve Plan B, I will start
  the dual-write change first and run bf2 against staging before
  production." [Haiku, Opus, Sonnet]
- Haiku, email to Dana (l3): "Your card provider typically releases it
  within 3 to 5 business days". The notes say the merchant's payment
  provider. [Haiku, Sonnet]
- Opus, migration message (l2): "If the two weeks are a problem and we
  can find a 3-hour window outside the sales period, that plan is
  simpler." [Opus, Sonnet]
- Opus, email to Dana (l3): "Your payment provider never collected the
  second one", which makes the provider Dana's, and "Other customers
  have run into the same thing this week". [Opus: the first; Sonnet:
  the second]
- Sonnet, migration message (l2): "so I wrote a second version. I have
  not run it against the full table yet." [Haiku, Opus, Sonnet]

Most of these are the kind the 2.2.0 test also found: a statement about
what the writer did or did not do ("I have not run it on CI"), or a next
step the writer commits to. Two of the five candidate flags come from
explaining a label: "bf2" became "a second version" that "I wrote", and
"PSP-side" became a provider that belongs to Dana. That is the risk
condition 5 was written for. The other three are not about labels.

### Missing

None. No passage was flagged by two judges. Single flags: Sonnet said
the 2.2.1 Haiku email's opening "You were not charged twice" contradicts
the charge Dana can see, and Opus said the candidate Haiku email gives
no step to take if the hold stays.

## Reported, not used in the decision

Label leaks: the task's labels found in each passage, case-insensitive.

| | 2.2.1 | Candidate |
|---|---|---|
| Labels found, with word boundaries | 20, in 6 of 12 passages | 11, in 4 of 12 |
| Labels found, as plain substrings | 23 | 13 |

The candidate halved the leaks. Most of the remaining ones are names
the rule tells writers to keep, or near it: `RL_WIN` is a constant in
the developer's own code and appears in all 6 review reports, and
F1 to F3 appear in both Haiku review reports, as bold headings over each
finding. The
Sonnet candidate passages leak one label in total, against nine in the
Sonnet 2.2.1 passages. The judges did not count most leaks as unclear,
because the writers defined them ("Plan B: dual-write to the old and new
tables"). A leak is not the same as an unclear passage, which is why
the preregistration kept leaks out of the decision.

Per writer, passages flagged by two or more judges (C, K):

| Writer | Unclear | Missing | Invented |
|---|---|---|---|
| Haiku | 1, 1 | 0, 0 | 3, 2 |
| Sonnet | 2, 2 | 0, 0 | 0, 1 |
| Opus | 0, 0 | 0, 0 | 0, 2 |

Opus wrote no unclear passage under either version, so it had nothing
for the rule to fix. Both of its invention flags are under the
candidate.

## Judge runs that were discarded

The plan for this run (`docs/plans/labels-test-2-3-0/PLAN.md`) set a
rule before any output: a judge that uses a tool other than its one
Read and one Write, or writes a file that fails the schema, is
discarded and run again fresh, and a second violation goes to the owner.

- The first Opus judge wrote a valid file except that pair11's
  `invented` had no "B" key. It was discarded and rerun. The rerun is
  `judge-opus.json`.
- The first Sonnet judge wrote its file through a Bash heredoc instead
  of the Write tool. It was discarded and rerun. The rerun did the same,
  and added an empty `invented_note` key to pair04. The owner chose to
  use the rerun as `judge-sonnet.json`. In both runs the Bash call only
  wrote the answers file, and the only file read was `pairs.md`.
- The Haiku judge's first run was valid and is `judge-haiku.json`.

The two discarded files are in `discarded-judge-runs/`. With them in
place of the reruns (Opus's missing "B" read as empty), the counts move:

| Judges used | Unclear C, K | Invented C, K | Condition 2 | Condition 5 |
|---|---|---|---|---|
| As run (Opus rerun, Sonnet rerun) | 3, 3 | 3, 5 | fail | fail |
| Opus rerun, Sonnet first run | 4, 3 | 3, 3 | fail | pass |
| Opus first run, Sonnet first run | 3, 3 | 5, 3 | fail | pass |
| Opus first run, Sonnet rerun | 3, 3 | 5, 5 | fail | pass |

Condition 2 fails whichever runs are used, so the decision does not
depend on the discards. Condition 5 fails only in the combination as
run, and the invention gap swings from +2 to −2 between runs of the
same judges on the same passages. Read the invention counts as noise
at this sample size, in either direction.

The tally was first run in the same command as the audit of the Sonnet
rerun's transcript, so the result was seen before the owner was asked.
The sensitivity table above was computed after that and shown to the
owner with the question.

## Limits

The weaknesses listed in the preregistration all apply. Four more came
up in the run:

- Every writer and judge received the owner's global instructions
  (including a rule that says to follow the humanizing-writing skill,
  and its own "lead with what the reader came for") and the project's
  memory index. Both arms got the same text. No subagent called a skill.
- The preregistration says in one place that "Judges never see the
  notes", and its amendment shows them the notes after the passages.
  The amendment was followed, as the owner's instructions for the run
  say.
- "General domain knowledge is not invention" was kept in the judge
  question from the earlier wrapper, so that expanding a standard
  abbreviation would not count as invented. The preregistration's
  question does not have that sentence.
- Writers and judges were Agent-tool subagents with models
  `claude-haiku-5-5`, `claude-sonnet-5-5` and `claude-opus-5-5`, read
  from their transcripts. Each writer used one Read and four Writes.
