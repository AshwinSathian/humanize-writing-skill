# Result: lead with what the reader came for

Run on 19 November 2026, after `preregistration.md` was committed
(commit 1f00b57). Nothing in the pre-registration was changed after the
run. Six writers (Haiku, Sonnet, Opus, each with `guide-a.md` and
`guide-b.md`) wrote four passages each. Three judges (Opus, Sonnet,
Haiku) saw only `pairs.md`. `python3 tally.py` reproduces every number
below from `key.json`, the three `judge-*.json` files and `passages/`.

## Counts

| Measure | 2.1.0 (C) | Candidate (K) |
|---|---|---|
| Passages that lead with the answer, decision or request, of 12 | 10 | 12 |
| Passages missing a needed fact, of 12 | 0 | 0 |
| Passages flagged for invention, of 12 | 4 | 2 |
| Median words | 129.5 | 112 (86%) |

| Judge | Candidate preferred | 2.1.0 preferred | Tie |
|---|---|---|---|
| Haiku | 9 | 3 | 0 |
| Opus | 9 | 2 | 1 |
| Sonnet | 10 | 0 | 2 |

## Decision

1. It helps: K_lead (12) is at least C_lead (10) + 2. Holds.
2. It does not cost quality: all three judges preferred or tied the
   candidate in at least 6 of 12 pairs. Holds.
3. It does not over-correct: K_missing (0) is at most C_missing (0).
   Holds.
4. It does not invite invention: K_invented (2) is at most
   C_invented (4). Holds.

The candidate is adopted as 2.2.0.

## What the test did not show

The bullet has two sentences, and only the first one moved anything
measurable. The tasks planted facts the reader did not need. A grep of
the 24 passages for those facts gives almost the same counts under both
versions:

| Noise fact | 2.1.0, of 3 | Candidate, of 3 |
|---|---|---|
| papaparse 5.4 (r1) | 0 | 0 |
| Planned for last sprint (r1) | 0 | 0 |
| Designer on leave (r1) | 2 | 1 |
| `res` renamed to `response` (r2) | 3 | 3 |
| Four days of evaluation (r3) | 3 | 3 |
| Vendor B's sales rep (r3) | 1 | 1 |
| Cron misconfiguration, for support staff (r4) | 3 | 3 |

So "leave out what this reader will not use" did not make writers drop
true facts they were given. Some of these are defensible to keep (a
reviewer may want to know about the rename), but the cron detail in a
support-team update is not. The length drop came mostly from r1 and r2,
where candidate passages opened with the answer and cut the run-up to
it. In r3 (Haiku) and r4 (Haiku, Opus) the candidate passages were
longer.

The second sentence stays in the rule because the test adopted the
bullet as a whole and found no harm from it. If a later test shows it
does nothing, it should go.

The invention counts fell from 4 to 2, but the candidate did not target
invention and two passages is within noise. The items judges listed are
mostly commitments the writer made on the user's behalf ("I'll confirm
Thursday", "I'd move the release to next week"). That kind of claim
is not named in the rule against inventing either; see the held-out
invention test for the last attempt to name it.

## Limits

The weaknesses listed in the pre-registration all apply. Two matter
most here. The judges were given the facts each reader needs, which may
have pushed them toward passages that put those facts first; the
`leads` count and the preference count are therefore not independent.
And the Opus guide-b writer used seven tool calls where the prompt
allowed five. Its transcript was not inspected, so it may have read a
file it was told not to.
