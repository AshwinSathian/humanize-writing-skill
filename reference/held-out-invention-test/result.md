# Result: the rule stays as it is

Run on 10 October 2026, after `preregistration.md` was committed
(commit c7d5044). `python3 tally.py` reproduces every count below from
the key and the three judges' files.

## Counts

Passages flagged for invention by at least two of three judges, on the
three tasks that supplied no facts about the team (nine passages per
version):

| | Flagged | Which |
|---|---|---|
| 2.1.0 (C) | 2 of 9 | Haiku on the standup message, Sonnet on the postmortem section |
| Candidate (K) | 1 of 9 | Haiku on the postmortem section |

The 2.1.0 passages said "what we decided about the payment retry logic"
and "We currently write postmortems for the incidents that hurt, and
skip the ones that were over quickly." The candidate passage referred to
"our tracker".

Preference across the 12 pairs:

| Judge | Candidate | 2.1.0 |
|---|---|---|
| Haiku | 8 | 4 |
| Opus | 7 | 5 |
| Sonnet | 6 | 6 |

No passage of either version was flagged for over-correction on the
control task. One judge noted that a candidate passage restated the
supplied 38 minutes as "most of an hour".

## The rule applied

1. C is at least 2 and K is at most C minus 2: **no.** C is 2 and K is
   1.
2. Candidate preferred or tied in at least 6 of 12 pairs for at least
   two judges: yes, for all three.
3. No over-correction beyond 2.1.0: yes.

Condition 1 fails, so the candidate is not adopted and `SKILL.md` stays
at 2.1.0.

## What the test showed

- **The slip was not a one-off.** On tasks the rules were not tuned on,
  2 of 9 passages written under 2.1.0 stated something about the team
  that the task did not supply. Both were from Haiku or Sonnet. No Opus
  passage on these three tasks was flagged by two judges.
- **The added sentence did not clearly help.** One flagged passage
  against two is a difference a second draw could reverse.
- **The control task points somewhere else.** Told to use three supplied
  facts about the team "and add no others about it", two of three models
  added one anyway under each version: "Most pull requests run it more
  than once" (2.1.0, Opus), "that wait is the main reason CI feels slow"
  (candidate, Haiku), "Those tests pass today only because they run in
  order" (candidate, Sonnet). An explicit instruction in the task did
  not stop it, so one more sentence in the rule was unlikely to.
- **The candidate did no harm that this test could see.** It was
  preferred slightly more often and did not make writers hedge or drop
  supplied facts.

## What this does not show

- That the candidate is useless. Nine passages cannot tell a rate of 2
  in 9 from 1 in 9.
- A base rate for ordinary writing. The tasks were written to invite
  claims about the team.
- Anything comparable with the earlier rounds' invention counts. These
  judges were told that "a statement of how this team works now or
  worked in the past" counts as invention. The earlier judges were not.

## What happens next

Nothing changes in the skill. The site and README now tell readers to
check any claim about their own team or system in a draft. A different
remedy (for example a check at the end of drafting, or a way for the
writer to mark a claim as assumed) would need new tasks, because these
four have now been seen.
