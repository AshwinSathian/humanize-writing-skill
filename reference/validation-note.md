# Validation

This file has four parts. The first is a pre-registered test of one
proposed rule change, run on 10 October 2026 and not adopted. The second
is a round on Claude Haiku, run the same day against the 2.1.0 text. The
third covers 2.0.0 (October 2026) on Sonnet and Opus. The fourth is the
1.x validation, kept as it was written, with a note on what is wrong
with it.

## A rule change that was tested and not made (10 October 2026)

The Haiku round below found a 2.1.0 passage that stated a team's current
practice as fact. The rule against inventing names incidents, figures,
quotes, and sources, and a past-tense example; it does not name a
present-tense claim about the reader's team. A candidate wording added
one sentence to cover that.

The test was fixed before it ran
(`reference/held-out-invention-test/preregistration.md`): four tasks
never used before, a decision rule, and a control task that supplied
team facts to check that the candidate did not make writers hedge or
drop them. Haiku, Sonnet, and Opus each wrote all four tasks under 2.1.0
and under the candidate (24 passages, 12 blind pairs, three judges).

| | 2.1.0 | Candidate |
|---|---|---|
| Passages flagged for invention by two or more judges, of 9 | 2 | 1 |
| Pairs preferred, Haiku judge | 4 | 8 |
| Pairs preferred, Opus judge | 5 | 7 |
| Pairs preferred, Sonnet judge | 6 | 6 |
| Control passages flagged for over-correction, of 3 | 0 | 0 |

The rule required the candidate to cut the flagged count by at least
two. It cut it by one, which a second draw could reverse, so the
candidate was not adopted and `SKILL.md` is unchanged.

Two things came out of it that matter more than the verdict. The slip
reproduced: on held-out tasks, 2 of 9 passages written under 2.1.0
invented something about the team. And on the control task, where the
prompt itself said to add no other facts about the team, two of three
models added one anyway under each version. An instruction in the task
did not stop it, which is a reason to doubt that a sentence in the rule
would. Anyone using the skill for a piece addressed to their own team
should check what the draft says about that team.

Counts, quotes, and limits: `reference/held-out-invention-test/result.md`.

## 2.1.0 on Claude Haiku: blind comparison against no skill and against 1.1.1

The 2.0.0 round below used Sonnet and Opus as writers. This round asks
whether the result holds on the smallest current Claude model.

### Method

The same three tasks (`reference/validation-2.0.0/prompts.md`), each
written once by a fresh Haiku subagent under three conditions: no skill,
the 1.1.1 `SKILL.md`, and the 2.1.0 `SKILL.md`. That gives 9 passages
and 6 pairs, each pairing the 2.1.0 passage with the no-skill or 1.1.1
passage for the same task. A seeded script shuffled the pairs and the
A and B sides. Three judges (Opus, Sonnet, and Haiku subagents) saw only
the pairs file and answered the same three questions as in the 2.0.0
round.

Everything is in `reference/validation-2.1.0-haiku/`: the passages, the
pairs, the key, all three judges' answers, the prompts as sent, and the
two scripts that build the pairs and count the answers.

Three things differ from the 2.0.0 round. The skill under test is 2.1.0,
whose rules are those of 2.0.0 plus one Scope entry about voice. The
writers read the skill from a file where the earlier writers had it
pasted into the prompt. And every writer was told not to invoke any
skill and to write in ordinary prose, because the machine that ran the
test has this skill installed and runs a hook that shortens replies
(`reference/validation-2.1.0-haiku/prompts.md`).

### Result

| Comparison (3 pairs each) | Judge | Read as more machine-written | Preferred |
|---|---|---|---|
| 2.1.0 against no skill | Opus | no skill 3 | 2.1.0 3 |
| 2.1.0 against no skill | Sonnet | no skill 3 | 2.1.0 3 |
| 2.1.0 against no skill | Haiku | no skill 3 | 2.1.0 3 |
| 2.1.0 against 1.1.1 | Opus | 1.1.1 2, tie 1 | 2.1.0 3 |
| 2.1.0 against 1.1.1 | Sonnet | 1.1.1 3 | 2.1.0 2, tie 1 |
| 2.1.0 against 1.1.1 | Haiku | 1.1.1 2, tie 1 | 2.1.0 2, 1.1.1 1 |

All three judges flagged the no-skill pull request description for
claims the five supplied facts did not contain ("status changes can lag
by up to half a minute", "catches any event that never arrives"). Two
flagged the 1.1.1 description for the same thing ("nothing is lost for
good").

### Where 2.1.0 fell short

- **It stated the team's practice as fact.** The 2.1.0 feature-flag
  passage says "Right now a half-finished feature either sits on a
  long-lived branch or reaches every user at once." The writer had been
  told nothing about the team. The Sonnet and Haiku judges both flagged
  it, and the Opus judge did not. No 2.0.0 passage was flagged for
  invention in the Sonnet and Opus round, so this is the first recorded
  miss of the rule against inventing in a 2.x passage. The rule names
  "made-up incidents, figures, quotes, or sources" and a plausible "last
  quarter we..."; it does not name a claim about how the reader's team
  works today. `SKILL.md` has not been changed in response, because a
  change made after seeing this passage would need a held-out task to
  test it.
- **Database indexes, against 1.1.1.** The Haiku judge preferred 1.1.1
  for its running example and its point about logarithmic cost. The
  Sonnet judge called the pair a tie. The Opus judge preferred 2.1.0
  and called it close.
- **Pull request description, against 1.1.1.** All three judges
  preferred 2.1.0, but the Opus judge called it "a flat restatement of
  the bullets" and preferred it "by a narrow margin" because the 1.1.1
  passage made promises the facts did not support. The 2.1.0
  description is 107 words against a brief of about 150.
- **An opinion in a facts-only task.** The same description adds "The
  signature check is the part to review most closely". Two judges noted
  it. None counted it as invention.
- The Opus judge called two of its three preferences over the no-skill
  passage narrow, and said the no-skill feature-flag passage had the
  better ending (a pilot with something to measure).

### Measured features

`scripts/measure.py` over the three passages per condition, concatenated:

| | Haiku none | Haiku 1.1.1 | Haiku 2.1.0 |
|---|---|---|---|
| Words | 636 | 613 | 549 |
| Mean sentence length (words) | 16.7 | 17.0 | 17.2 |
| Share of sentences of 30+ words | 0.03 | 0.14 | 0.09 |
| Share of sentences of 5 or fewer words | 0.11 | 0.03 | 0.03 |
| Paragraphs ending on a sentence of 8 or fewer words | 0 | 2 | 1 |
| Trailing "-ing" clauses per 1,000 words | 1.6 | 0 | 0 |
| Noun-suffix words per 1,000 words | 9.4 | 13.1 | 10.9 |
| Em dashes per 1,000 words | 0 | 0 | 0 |
| Negated contrasts (regex) per 1,000 words | 0 | 0 | 0 |

As in the 2.0.0 round, the script separates the conditions far less
than the judges did, and no Haiku passage in any condition used an em
dash or a pattern-matchable negated contrast. What the judges quoted
was framing: "Every production release is a bet", "The benefits extend
past safety", "An index is therefore a trade", "First... Second...
Third", "The costs are real".

### Limits

- Six pairs, one passage per task and condition. One different draw
  could move any row by a pair.
- These are the three tasks the 2.0.0 rules were revised against. No
  held-out task was run.
- The judges are Claude models, and one of them is the model that wrote
  the passages.
- The no-skill and 1.1.1 passages were written fresh for this round, so
  the numbers are not comparable pair for pair with the 2.0.0 table.
- English technical writing only. No AI detector was run.

## 2.0.0: blind comparison against no skill and against 1.1.1

### Method

Three writing tasks (`reference/validation-2.0.0/prompts.md`): an
explanation of database indexes, an internal blog section arguing for
feature flags, and a pull request description written from five supplied
facts. Each was written by fresh subagents on two models (Sonnet and
Opus) under three conditions: no skill, the 1.1.1 `SKILL.md`, and the
2.0.0 `SKILL.md`. That gives 18 passages and 12 pairs, each pairing a
2.0.0 passage with the no-skill or 1.1.1 passage for the same task and
model.

The pairs were shuffled and labeled A and B by a seeded script. Two
judges (one Opus subagent, one Sonnet subagent) saw only the pairs file.
For each pair they said which passage read more like unedited model
output, which they would rather publish, and whether either stated
anything as fact that the task had not supplied. The pairs, the key, and
both judges' full answers are in `reference/validation-2.0.0/`.

### Result

| Comparison (6 pairs each) | Judge | Read as more machine-written | Preferred |
|---|---|---|---|
| 2.0.0 against no skill | Opus | no skill 5, 2.0.0 1 | 2.0.0 5, no skill 1 |
| 2.0.0 against no skill | Sonnet | no skill 5, 2.0.0 1 | 2.0.0 5, no skill 1 |
| 2.0.0 against 1.1.1 | Opus | 1.1.1 3, 2.0.0 2, tie 1 | 2.0.0 5, 1.1.1 1 |
| 2.0.0 against 1.1.1 | Sonnet | 1.1.1 4, 2.0.0 2 | 2.0.0 4, 1.1.1 2 |

Both judges flagged invented facts in the 1.1.1 feature-flag passage
(Sonnet): a release "two weeks ago" that shipped "the new checkout flow
together with the tax library upgrade", an afternoon lost to the revert.
The writer had been given no facts about the team. Both judges also
flagged the no-skill Opus passage for stating the team's history as fact
("takes long enough that users feel it"). Neither judge flagged an
invented fact in any 2.0.0 passage. The 2.0.0 Opus passage for the same
task cites the Knight Capital loss of 2012, which is a real event.

### Where 2.0.0 lost

- **Database indexes, Opus, against 1.1.1.** The Opus judge preferred
  1.1.1, which explained a B-tree lookup with a phone-book analogy and a
  worked figure, and called the 2.0.0 passage "uniformly flat textbook
  summary". The Sonnet judge preferred 2.0.0 on the same pair and called
  the analogy stock. `SKILL.md` now says to keep an analogy that
  explains how something works; this pair suggests the rule does not
  always produce one.
- **Pull request description, Sonnet, against no skill.** Both judges
  preferred the no-skill passage. The 2.0.0 passage was a "Summary" and
  "Changes" skeleton whose bullets repeated the summary.
- **Pull request description, Sonnet, against 1.1.1.** The judges split.
- "Flags have a cost." appears as a paragraph opener in 2.0.0 passages
  although `SKILL.md` lists "The cost is real." as an announcement to
  avoid.

### This was the third attempt, and the first two were worse

The numbers above are for the 2.0.0 text as released. Two earlier drafts
of the 2.0.0 rules were tested the same way against the same no-skill
and 1.1.1 passages.

- **First draft.** The Sonnet passage for the feature-flag task invented
  an incident ("Last quarter's checkout redesign... the rollback took
  about forty minutes"). The draft had folded "never invent" into the
  end of another rule. It was restored as its own rule and widened
  (`reference/validation-2.0.0/first-draft-fabrication-sample.md`).
- **Second draft.** Judged blind, it did no better than 1.1.1: the Opus
  judge called it more machine-like in 5 of 6 pairs and preferred 1.1.1
  in 4. It lost every pull-request pair. The judges' reasons were
  restatement ("so requests that do not carry a valid signature are not
  acted on"), sections that repeated the bullet list, a dramatic closing
  claim that went past the supplied facts, and flat prose where 1.1.1
  had used an analogy. The earlier-round files in
  `reference/validation-2.0.0/` hold this round.
- **Changes made for the released text.** A "say each thing once" rule.
  A rule that a rewrite or a fact-bound task adds no claim. An exception
  for explanatory analogy. The negated-contrast rule narrowed to cases
  where the reader does not hold the view. Plus the 20 findings of an
  adversarial review of the draft
  (`reference/validation-2.0.0/adversarial-review.md`), which found,
  among other things, that the rewritten examples had added facts their
  originals did not contain.

### Measured features

`scripts/measure.py` over the three passages per condition, concatenated:

| | Sonnet none | Sonnet 1.1.1 | Sonnet 2.0.0 | Opus none | Opus 1.1.1 | Opus 2.0.0 |
|---|---|---|---|---|---|---|
| Mean sentence length (words) | 17.1 | 17.0 | 18.7 | 18.2 | 16.3 | 17.5 |
| Share of sentences of 30+ words | 0.06 | 0.15 | 0.07 | 0.09 | 0.10 | 0.12 |
| Share of sentences of 5 or fewer words | 0.03 | 0.09 | 0.07 | 0.16 | 0.13 | 0.12 |
| Paragraphs ending on a sentence of 8 or fewer words | 0 | 2 | 2 | 2 | 5 | 2 |
| Trailing "-ing" clauses per 1,000 words | 5.3 | 1.8 | 1.8 | 3.4 | 1.6 | 1.7 |
| Noun-suffix words per 1,000 words | 14.2 | 8.9 | 10.7 | 5.2 | 3.2 | 6.7 |
| Em dashes per 1,000 words | 0 | 0 | 0 | 0 | 0 | 0 |
| Negated contrasts (regex) per 1,000 words | 0 | 0 | 0 | 0 | 0 | 0 |

The script separates the conditions much less than the judges did. On
these tasks neither model used an em dash or a pattern-matchable negated
contrast in any condition, including with no skill, so the two most
discussed tells did not appear at all. The one clear difference is the
short paragraph ending, which is the one-line closer: five in the Opus
1.1.1 passages against two with no skill and two with 2.0.0. What the
judges reacted to (restatement, stock transitions such as "The speedup
comes at a price, and writes pay it", invented history) is not something
this script counts.

### Scope cases

Nine tasks run by one Sonnet subagent with the 2.0.0 `SKILL.md`
(`reference/validation-2.0.0/scope/`): the seven cases from the 1.x
round, a retirement toast, and a request to use a mandated buzzword
house style. The outputs were read by the Claude session that wrote the
skill, not by a blind judge.

| Case | Result |
|---|---|
| API reference entries | Parallel structure kept across all three |
| One-line code comment | One plain line, nothing added |
| Limitation-of-liability clause | Standard hedges and the enumeration of legal theories kept |
| Fiction opening | Invented detail and a fragment kept |
| Typo fix in a user's own paragraph | Only the typo changed; hedges, dash, and run-on left |
| French paragraph | Idiomatic French, no English tell list applied |
| Marketing hero copy | Specific, no invented figures or customers, ends on a call to action. A run against an earlier draft of the rules had dropped the close; the Scope wording was changed and this run kept it |
| Retirement toast | Emotional close kept, no invented anecdotes. It thanks her twice |
| Mandated buzzwords | Used as required and not changed back |

### Limits

- Twelve pairs and two judges is a small sample. A different seed or
  task could move any row of the result table by one or two pairs.
- The judges are Claude models. They may share blind spots with the
  writers, and Russell et al. (2025) found practiced human readers to be
  better at this than most automated judges.
- The released rules were revised after seeing how earlier drafts did on
  these same three tasks. The result is therefore partly fitted to them,
  and no held-out task was run afterward.
- The no-skill and 1.1.1 passages were generated once and reused across
  rounds. Only the 2.0.0 passages were regenerated.
- All three tasks are technical writing in English, on two Claude
  models. Nothing here says how the skill behaves on other models.
- No AI detector was run. The skill makes no claim about detector
  scores.
- The scope cases were not judged blind.

## 1.x validation (August 2026), kept for the record

The rest of this file is the validation note as shipped with 1.1.x. Read
it with three corrections in mind. The judge knew which passage was
which and scored against the skill's own tell list. Several of the
"skill-loaded" samples it praises contain patterns that 2.0.0 treats as
tells: "Variable names get clearer. Functions get shorter.", "Speed
compounds:", "That's the main value, not politeness or box-checking."
And its verdict that the skill "measurably changes output" was true
without showing that the change was an improvement.

### Validation Sample: Skill-Loaded vs. Baseline

Four evaluation rounds. The first three are topic/model coverage
(three different topics, three different models: default/Sonnet, Haiku,
Opus). Each pair of passages was generated by fresh subagents (no shared
context) given the identical prompt; one agent had no skill, the other
had the full `SKILL.md` content pasted into its instructions. This was
extended from a single-topic check to this three-topic, three-model form
specifically in response to an adversarial review finding that one
comparison fell short of the "multiple evaluations, multiple models" bar
in Anthropic's own skill-authoring guidance. The fourth round, below, is
genre coverage: it tests whether the skill's rules, which the first
three rounds only exercise in one register (discursive explainer prose),
hold up or misfire outside it. All four remain application-scenario
sanity checks, not exhaustive pressure-testing: technique/reference
skills need this kind of check, not discipline-rule bulletproofing (see
`writing-skills` skill's "Testing All Skill Types" table).

## Evaluation 1: "why code review matters" (default/Sonnet)

### Baseline (no skill)

> Code review matters because no single engineer catches everything, and
> a second set of eyes routinely surfaces bugs, edge cases, and security
> issues before they reach production. Beyond defect detection, review
> spreads knowledge across the team: reviewers learn how a system works,
> and authors get exposed to different approaches and idioms, which
> raises everyone's skill level over time. It also protects
> consistency—shared conventions, architecture patterns, and coding
> standards survive only if someone is checking that new code follows
> them. Review creates a natural checkpoint for questioning design
> decisions before they're locked in, which is far cheaper than
> refactoring later. Just as important is the cultural effect: knowing
> your code will be read by a colleague encourages clearer naming,
> better structure, and more thoughtful tradeoffs from the start.
> Finally, review distributes ownership—when multiple people have seen
> and understood a piece of code, the team is less vulnerable to a
> single person's absence, and bus-factor risk drops accordingly.

**Tells present:**
- Rule-of-three list padding, twice: "bugs, edge cases, and security
  issues"; "clearer naming, better structure, and more thoughtful
  tradeoffs."
- Stock enumerator transitions doing the work a real structure should:
  "Beyond defect detection," "Just as important," "Finally" walk through
  six benefits in one undifferentiated paragraph.
- Uniform shape: one single paragraph, every sentence a similar
  medium-long length, no rhythm variation.
- Generic, non-specific claims throughout ("routinely surfaces bugs,"
  "different approaches and idioms"). Nothing a reader could check
  against a concrete instance.

### Skill-loaded

> Code review catches what a single set of eyes misses. A second
> reviewer reads the diff cold, without the assumptions the author built
> up over hours of writing it, so they notice the null check that got
> skipped or the edge case that only shows up when the cache is empty.
> That's the main value, not politeness or box-checking.
>
> It also spreads knowledge. When two people understand a change, the
> team survives one person being on vacation, or leaving. Junior
> engineers learn a codebase's conventions by watching senior reviewers
> explain why a pattern works one way and not another.
>
> There's a slower effect too: people write cleaner code when they know
> someone else will read it before it ships. Variable names get
> clearer. Functions get shorter. That discipline holds even when the
> reviewer approves without comment — the anticipation does the work.
>
> None of this requires an adversarial process. A reviewer who asks
> "why" instead of "no" gets better code and a better team.

**Tells absent that were present in the baseline:**
- No rule-of-three padding anywhere.
- No stock enumerator transitions: paragraphs are separated by an idea,
  not a "Beyond X / Just as important / Finally" counter.
- Sentence rhythm varies deliberately: "Variable names get clearer.
  Functions get shorter." (two short declaratives back to back) against
  longer sentences elsewhere.
- Concrete, specific detail replaces generic claims: "the null check
  that got skipped," "the edge case that only shows up when the cache is
  empty" vs. the baseline's generic "bugs, edge cases, and security
  issues."
- Closes on a specific, earned point ("A reviewer who asks 'why' instead
  of 'no'...") instead of a signposted recap.

## Evaluation 2: "why automated tests matter" (Haiku)

### Baseline (no skill)

> Automated tests are the foundation of sustainable software development.
> They catch bugs early, when they're cheapest to fix, and prevent
> regressions as codebases grow. By running thousands of checks in
> seconds, automated tests give teams confidence to refactor and improve
> code without fear of breaking existing functionality.
>
> Beyond bug prevention, tests serve as executable documentation—they show
> how code should behave and make onboarding new team members faster.
> They enable continuous integration and deployment, letting teams ship
> features multiple times daily with minimal manual verification. Without
> tests, deployments become risky events requiring extensive manual
> verification and rollback plans.
>
> Automated tests also foster better code design. Writing testable code
> naturally leads to more modular, loosely-coupled architectures that are
> easier to maintain and extend. They reduce the cognitive load on
> developers, eliminating the need to mentally trace through complex
> scenarios. By catching defects automatically rather than relying on
> manual testing, teams spend more time building features and less time
> firefighting production issues. This directly improves velocity,
> reliability, and team morale.

**Tells present:** grandiose opener ("the foundation of sustainable
software development"); stock enumerator transition ("Beyond bug
prevention"); rule-of-three closer ("velocity, reliability, and team
morale"); three paragraphs of near-identical length and pacing; generic
claims with no concrete instance ("catch bugs early," "reduce the
cognitive load").

### Skill-loaded

> Automated tests catch regressions before they hit production. When a
> developer changes code, tests run in seconds. Breaks surface in
> minutes, not after customers find them. Speed compounds: the team ships
> more often because each change feels lower-risk.
>
> Tests serve as documentation. A test shows how a function works in
> actual code, not in comments that eventually drift. New engineers read
> the tests to understand how the system behaves.
>
> Tests make refactoring safe. Without them, touching old code feels
> dangerous—you can't tell what broke elsewhere. With tests, you refactor
> freely and the suite catches mistakes immediately.
>
> For teams, this means less time fighting fires and more time building
> features. Code quality doesn't decay as fast. The codebase stays
> movable instead of hardening into something fragile you're afraid to
> change.

**Tells absent that were present in the baseline:** no grandiose opener;
no stock enumerator transition; no rule-of-three closer; visible rhythm
variation (three-word fragment "Speed compounds:" against longer
sentences); closes on a concrete image ("hardening into something fragile
you're afraid to change") instead of an abstract triad.

## Evaluation 3: "why written documentation matters" (Opus)

### Baseline (no skill)

> Distributed teams pay a tax that co-located ones don't: the hallway
> conversation, the whiteboard sketch, the overheard debugging session —
> none of it happens by accident. Written documentation is how that
> context gets rebuilt deliberately. When an engineer in another timezone
> hits a wall at 2am, a good design doc is the difference between
> shipping and waiting eight hours for someone to wake up. Writing also
> forces a rigor that talking doesn't. Vague reasoning survives a
> meeting; it rarely survives a paragraph. The act of documenting a
> decision often reveals that the decision wasn't actually made. And
> documentation compounds. Every onboarding, every postmortem, every "why
> is this like this" question draws down a balance someone deposited
> months earlier. Teams that skip it aren't moving faster — they're
> borrowing against future velocity at a punishing rate, paying interest
> in repeated explanations, duplicated work, and decisions quietly
> relitigated because nobody wrote down why they were settled.

**Notable finding:** Opus's unprompted baseline is already substantially
better than the Sonnet/Haiku baselines above. It uses concrete imagery
from the start and avoids most vocabulary-level tells entirely. It still
shows two of the structural tells the skill targets: a triadic list
("hallway conversation... whiteboard sketch... overheard debugging
session") and a closing triad ("repeated explanations, duplicated work,
and decisions quietly relitigated"). This is a useful data point on its
own: it suggests stronger baseline models drift toward structural tells
(uniform triadic padding) even when they've already shed most word-level
ones, which supports `research.md` §3's argument that structure is the
harder, more durable signal.

### Skill-loaded

> When your team spans eight time zones, a question asked in chat at 4pm
> in Berlin waits until tomorrow for an answer from Sydney. That round
> trip costs a day. A written doc costs the author an hour and answers
> the question every time it's asked afterward.
>
> Documentation also survives people. Someone leaves, and whatever they
> knew about why the retry logic uses exponential backoff with jitter
> leaves with them, unless it's in a design doc. In an office you can
> absorb that knowledge by overhearing it. Remotely, you can't.
>
> The harder benefit is that writing forces you to finish thinking.
> Half-formed architectural ideas sound fine spoken aloud in a meeting
> where nobody wants to interrupt. Written down, the gaps show. You
> notice you never decided what happens when the queue backs up.
>
> Docs go stale, and stale docs mislead. That's a real cost. It's smaller
> than the cost of a team that only knows things verbally.

**What changed relative to the baseline:** no triadic list construction
anywhere; a concrete illustrative mechanism ("the retry logic uses
exponential backoff with jitter": a real, generic engineering pattern
used as a plausible example, not asserted as a specific documented fact)
in place of the baseline's abstract "why is this like this" gesture;
short paragraphs of noticeably different lengths and purposes rather than
one long enumeration.

## Verdict

**Skill measurably changes output: yes, across all three
topics and all three models.** Every skill-loaded sample shows the tells
present in its corresponding baseline reduced or eliminated (rule-of-three
padding, stock enumerator transitions, uniform paragraph shape, generic
non-checkable claims), and independently exhibits the positive craft
guidance the skill asks for (varied rhythm, concrete specific detail). The
effect is largest against Sonnet and Haiku baselines (which show the full
range of word- and structure-level tells) and smaller but still present
against the Opus baseline (which starts from stronger prose but still
carries structural triadic padding that the skill-loaded version drops).
This is not a claim of statistical significance; three topics across
three models is still a small sample. It clears the application-scenario
bar this validation step is meant to meet, across more than one model as
the adversarial review requested.

This verdict is scoped to the discursive-essay register these three
evaluations tested; see "Scope-gating verification" below for what
changes (and what doesn't) outside that register.

## Scope-gating verification (post adversarial review)

An adversarial review round found that SKILL.md's structural-variation
and specificity rules, applied without any genre or authorship
awareness, actively regressed output outside the discursive-essay
register the three evaluations above test. A "## Scope" section was
added to close that gap (see `research.md` §5 and `SKILL.md` itself).
This section documents the RED (failure under the pre-fix SKILL.md) and
GREEN (confirmation after the fix) pattern for each case, generated the
same way as the evaluations above: fresh subagents, no shared context,
told explicitly to be skeptical rather than to confirm the fix works.

### Case 1: API reference docs

**RED (pre-fix):** asked for three REST endpoint entries in "the same
consistent format... so a developer scanning the page can find things
fast," the skill's "vary structure, avoid templates" instinct broke the
requested parallelism and drifted into inconsistent second-person
asides ("you get a 200," "that's a 404") across entries.

**GREEN (post-fix):** full parallel structure preserved across all
three entries; the agent explicitly cited the Scope bullet "A format
where the convention *is* uniform structure... parallelism there is
the usability feature, not padding. Keep it" as the reason it didn't
apply the "vary it" checklist item. **PASS.**

### Case 2: one-line code comment

**RED (pre-fix):** a literal checklist pass could flag an already-
correct one-liner as "could be more specific," then flag the dash in
the invented example it would add — self-contradicting on text too
short to need any intervention.

**GREEN (post-fix):** the comment was left as a plain, correct
one-liner; the agent cited the "text shorter than a paragraph" bullet
and explicitly declined to pad it with a fabricated example. **PASS**,
with an honest caveat from the verifying agent: the Scope bullet's
wording is close to the test case itself, so this confirms the two
known failures are fixed, not that the principle generalizes to novel
short-form cases untested here.

### Case 3: legal liability clause

**RED (pre-fix):** "cut hedge-intensifiers" and "unearned rule-of-three"
would strike "to the maximum extent permitted by applicable law" and
collapse the contract/tort/strict-liability enumeration — stripping
language that makes the clause enforceable across legal theories and
jurisdictions, not AI padding.

**GREEN (post-fix):** the full hedge phrase and the legal-theory
enumeration both survived intact in the regenerated clause. The agent
cited Scope's "Legal, compliance, or other fixed-register text"
bullet, noting that without it, the plain-verb and hedge-cutting rules
would have pressured the enumeration even though the underlying draft
was otherwise unchanged. **PASS.**

### Case 4: fiction opening

**RED (pre-fix):** "never invent facts, numbers, or sources to sound
more specific" bled into the narration itself — a detective's confident
noticing of invented physical detail ("three days of newspapers")
became hedged uncertainty ("she wasn't about to guess at details she
couldn't verify"), a genre-inappropriate epistemic caution.

**GREEN (post-fix):** the regenerated opening keeps confident, specific
invented detail (a full teacup on a dusty counter, four parallel
grooves cut into a door frame) with no hedging language. The agent
cited Scope's "Fiction or other invented content" bullet as the reason
"never invent facts" didn't reach the story's sensory detail. **PASS.**

### Case 5: editing someone else's already-human text

**RED (pre-fix):** given a user's own idiosyncratic paragraph with one
requested typo fix, a literal checklist pass would break up their
run-on sentence and cut their hedges ("kind of," "honestly,"
"basically") and em dash — none of which are AI tells there, just their
voice.

**GREEN (post-fix):** only the requested typo was changed; the run-on
sentence, hedges, and em dash were left untouched. The agent reported
the "Before finalizing" checklist was correctly never invoked at all —
Scope gated the text before the checklist could fire, rather than the
checklist firing and Scope cleaning up afterward. **PASS.**

### Case 6: non-English text (French)

**RED (pre-fix):** asked to write a short French paragraph, a literal
pass cut standard French connective tissue ("également," "enfin") as if
they were the English stock-transition tell ("moreover," "additionally"
in disguise) — the word-level tell list is English-specific and doesn't
map onto French at all.

**GREEN (post-fix):** the regenerated French paragraph kept
"également" and "enfin" without hesitation; the agent cited the
"Non-English text" Scope bullet as unambiguous and directly on point,
needing no inference. **PASS.**

### Case 7: persuasive/marketing copy — a real gap the first fix missed

**RED (pre-fix):** asked for 3-sentence SaaS hero copy, "commit to
specific, checkable claims" and "unearned rule-of-three" flagged the
closing emotional payoff line as unfounded padding, cutting the one
line doing the copy's actual persuasive job.

**First GREEN attempt, found insufficient:** the initial Scope section
(six bullets: editing someone else's text, uniform-structure formats,
fiction, legal text, non-English text, short text) had **no bullet
covering marketing/persuasive copy**, and the verifying agent found the
regression could still recur under a strict checklist pass — the
nearest bullet ("match the voice already established") only helps when
editing an *existing* sample, not greenfield persuasive copy. Rated
**PARTIAL**, not PASS, and treated as a real gap rather than closed.

**Second GREEN attempt, after adding a seventh Scope bullet**
("Persuasive or marketing copy: an earned emotional close or call to
action is the point of the piece, not an unearned rule-of-three or an
unchecked claim to be flattened. Cut what's generic, keep what
lands."): re-verified by a fresh, independently skeptical agent. The
regenerated copy kept its closing line ("you see your business the way
it actually looks, not the way five vendors decided to divide it up")
intact; the agent explicitly flagged that line as a candidate for
"tightening into something checkable" under checklist item 1, then
overrode it by citing the new Scope bullet by name. **PASS**, with a
caveat from the verifying agent worth keeping on record rather than
smoothing over: the bullet's operative language ("cut what's generic,
keep what lands") is a judgment call, not a bright-line test, so it
resists the checklist's specificity pressure by asserting a priority
order (Scope gives way over Write-this-way) rather than by making the
tension disappear. That's consistent with this skill's standing
design choice against invented numeric thresholds (`research.md` §5,
`oss-skills-review.md` item 2) — a hard rule here would trade one
failure mode for another rather than fixing it — but it does mean this
bullet leans on judgment more than the others and is worth re-checking
if future testing finds it drifting.

### Summary

All seven scope-gaps found by the original red-team round now resolve
correctly (API docs, code comments, legal text, fiction, editing
someone else's prose, non-English text, and — after a second pass —
marketing/persuasive copy). Six closed cleanly on the first attempt.
The seventh (marketing copy) was missed entirely by the first Scope
section: its six initial bullets covered every case the original
red-team round had explicitly tested except this one, and it was only
caught because this verification round re-tested the same case rather
than assuming the fix generalized from "the section now exists." A
second, seventh Scope bullet was added and independently re-verified
before this file was finalized. That's the practical value of
GREEN-phase verification with a fresh, independently skeptical agent
instead of treating the presence of a fix as proof it works: it caught
a real remaining gap the first implementation pass missed, on a case
that mattered (persuasive copy is a common, everyday genre, not an
edge case).
