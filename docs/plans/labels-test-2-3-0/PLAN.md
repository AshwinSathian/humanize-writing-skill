# 2.3.0: run the pre-registered working-labels test, ship only on a pass

Status: shipped · Tier: full · Baseline: 2ff1450 · Updated: 2026-11-25
Now: shipped as a test record (PR #5, merged 462253f). Decision: do not adopt.

## Outcome
The test in `skills/humanizing-writing/reference/held-out-labels-test/` is run exactly as `preregistration.md` (with its 25 Nov amendment) says, and its record (guides, 24 passages, key, pairs, three judges' answers, tally, result) is committed after the preregistration. If all five conditions hold, 2.3.0 ships with the bullet; if any fails, `SKILL.md` stays as it is and the CHANGELOG gets an "After 2.2.1 (no release)" note.
Done when:
- `tally.py --selftest` passes, with every threshold tested at and one step past its boundary (C1)
- `guide-a.md` equals `git show 2ff1450:skills/humanizing-writing/SKILL.md`, and `guide-b.md` is that plus the candidate bullet, nothing else (C2)
- 24 non-empty passages exist, added in a commit that descends from the preregistration's and amendment's commits (C3)
- three judge files cover all 12 pairs with every required field, and `tally.py` prints a decision (C4)
- `result.md` contains tally.py's count, condition and decision lines verbatim (C13)
- pass only (S5): `diff guide-b.md SKILL.md` is empty, the six repo checks pass (C5–C11), `gh release view v2.3.0` shows the release
- fail only (S6): `SKILL.md` and both manifests are byte-identical to 2ff1450 and the CHANGELOG has the dated note (C12, C14)

## Decisions
- The judge questions are those in `preregistration.md`, asked through the frame of the judge wrapper in `../held-out-invention-test/prompts.md` (one Read, one Write, own directory, no skill, JSON out). Reason: that wrapper's five questions belong to the invention test; the preregistration names its own five and says the wrapper is reused. The exact prompts as sent go in `held-out-labels-test/prompts.md`.
- In `pairs.md` the task is split at its first blank line: the first paragraph is shown as the reader's view at the top; the rest (from "Working notes:") comes after Passage B under a heading saying the reader never sees it. Reason: that is what the amendment says, and every task has exactly one blank line.
- `tally.py`, `make_pairs.py`, `guide-a.md`, `guide-b.md` and `prompts.md` are committed before any passage is generated. Reason: the counting can't then be fitted to the data. `make_pairs.py` changes from the reader-first copy only in its seed, docstring, and the task split above.
- Writers and judges work in their own scratchpad directories (guide copy in, passages out), not in the test directory. Reason: the test directory holds the preregistration, which names the hypothesis. Passages and judge files are copied in afterwards.
- Each subagent's transcript is read after it finishes (tool-use names from its JSONL). A writer or judge that calls Skill, or uses any tool beyond its allowed Read and Writes, is discarded and run again once, fresh; both runs are logged and reported in `result.md`. If the rerun breaks the rule too, the run stops and the owner is asked. Reason: the owner's no-skill rule, and the 2.2.0 test's unexplained seven-tool-call writer. Decided now, before any output.
- `leaks`: tally.py reports two counts, plain case-insensitive substring (the owner's literal wording) and the same with word boundaries. Reason: plain substring counts "ENG" inside "engineering" and "step 1" inside "step 10". Not used in the decision.
- "no preference" counts as a tie in condition 3. Reason: the amendment added it for that purpose.
- [one-way] On a pass: bullet into `SKILL.md`, 2.3.0 manifests and CHANGELOG, site research page, `llms.ts`, `content.ts` version line, `site.ts` release date, PR, merge with a merge commit (not squash, which would lose the protocol-before-passages order), deploy, tag, release. Reason: owner's instruction, conditional on the pass. Decided: owner 2026-11-25
- [one-way] On a fail: test record and CHANGELOG note on a branch, PR opened, no merge until the owner says. Reason: the owner authorised merging only for the pass path. No site change. Decided: owner 2026-11-25 (no merge was authorised for this path)

## Out of scope
- A second wording on these tasks (the preregistration forbids it), GPT or Gemini writers, and any change to `preregistration.md`, `tasks.json` or `candidate-rule.md`.

## Questions
- None.

## Assumptions
- The Agent tool's `haiku`, `sonnet` and `opus` models are the Claude Haiku, Sonnet and Opus the preregistration means; the model ids used are recorded in `result.md`.
- Subagents may receive the owner's global rules (`~/.claude/rules/no-slop.md` says "follow the humanizing-writing skill" and carries its own "lead with what the reader came for"), the project memory and session hooks (caveman, ponytail). The reviewer subagent received the rules. These reach both arms alike, so they do not stop the run; they make a Skill call more likely (handled by the rerun rule) and are named as a limit in `result.md`.
- Where the preregistration's line "Judges never see the notes" conflicts with its amendment, the amendment is followed, as the owner's request says; `result.md` records it.
- `content.ts` still says "version 2.2.0"; on a pass it becomes 2.3.0.

## Slices

### S1: Protocol files committed before any passage [done]
Goal: guides, pair builder, tally with self-test, and the prompts are committed on the branch, with no passages.
Touch: `skills/humanizing-writing/reference/held-out-labels-test/guide-a.md (new)`, `skills/humanizing-writing/reference/held-out-labels-test/guide-b.md (new)`, `skills/humanizing-writing/reference/held-out-labels-test/make_pairs.py (new)`, `skills/humanizing-writing/reference/held-out-labels-test/tally.py (new)`, `skills/humanizing-writing/reference/held-out-labels-test/prompts.md (new)`, `docs/plans/labels-test-2-3-0/PLAN.md`, `docs/plans/labels-test-2-3-0/checks.json`
Checks: C1, C2
- Risk: the self-test passes on a wrong rule (for example `<` for `<=`). Detect: C1 builds a boundary case for each condition (exactly at the threshold, and one step past it) and asserts the verdict flips. Fallback: fix tally.py before S2.

### S2: 24 passages [done]
Goal: six fresh writers (Haiku, Sonnet, Opus × guide-a, guide-b) have each written all four tasks; transcripts checked; passages committed.
Touch: `skills/humanizing-writing/reference/held-out-labels-test/passages/ (new)`, `docs/plans/labels-test-2-3-0/PLAN.md`
Checks: C3
- Risk: a writer invokes a skill or reads the preregistration. Detect: transcript read. Fallback: the rerun rule in Decisions.
- Risk: hook-injected terse style shows up in passages. Detect: transcript shows injected context; passages read before commit. Fallback: report as a limit; both arms share it.

### S3: Pairs and three judges [done]
Goal: `pairs.md` and `key.json` built with seed 20261125; Opus, Sonnet and Haiku judges each answer all 12 pairs; files committed.
Touch: `skills/humanizing-writing/reference/held-out-labels-test/pairs.md (new)`, `skills/humanizing-writing/reference/held-out-labels-test/key.json (new)`, `skills/humanizing-writing/reference/held-out-labels-test/judge-opus.json (new)`, `skills/humanizing-writing/reference/held-out-labels-test/judge-sonnet.json (new)`, `skills/humanizing-writing/reference/held-out-labels-test/judge-haiku.json (new)`, `docs/plans/labels-test-2-3-0/PLAN.md`
Checks: C4
- Risk: a judge writes invalid JSON or skips a field. Detect: C4's schema check. Fallback: rerun that judge fresh once and log it; never hand-edit an answer.

### S4: Tally and result [done]
Goal: `result.md` gives every count, each condition's verdict, the leaks table, per-model counts, and quotes of every flagged item, losses first where there are losses.
Touch: `skills/humanizing-writing/reference/held-out-labels-test/result.md (new)`, `docs/plans/labels-test-2-3-0/PLAN.md`
Checks: C4, C13

S5 and S6 exclude each other. The one the decision rules out is marked `[dropped]` with a Log line.

### S5: Ship 2.3.0 (pass only) [dropped]
Goal: 2.3.0 merged with a merge commit, site deployed, v2.3.0 tagged at the merge and released.
Touch: `skills/humanizing-writing/SKILL.md`, `skills/humanizing-writing/.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `CHANGELOG.md`, `site/src/pages/research.astro`, `site/src/lib/llms.ts`, `site/src/lib/content.ts`, `site/src/lib/site.ts`, `docs/plans/labels-test-2-3-0/PLAN.md`
Checks: C5, C6, C7, C8, C9, C10, C11
- Risk: the site claims more than the result. Detect: every number on the page is checked against `tally.py` output before deploy. Fallback: fix and redeploy.

### S6: Record the fail (fail only) [done]
Goal: CHANGELOG has a dated "After 2.2.1 (no release, `SKILL.md` unchanged)" note above 2.2.1; PR open, not merged; nothing released.
Touch: `CHANGELOG.md`, `docs/plans/labels-test-2-3-0/PLAN.md`
Checks: C6, C12, C14

## Log
- 2026-11-25: Plan started at 2ff1450.
- 2026-11-25: jig-reviewer (plan mode): fix first, 11 findings. Applied: S5 split into S5 (pass) and S6 (fail) so neither slice holds checks that exclude each other; C14 added for the fail note; a second violation by a rerun subagent stops the run; the owner's global rules (no-slop.md names the skill) added to Assumptions; C1 relabelled acceptance; C13 ties result.md to tally.py's output; leaks reported both as plain substring and with word boundaries; merge commit, not squash; site.ts in S5's Touch. Already handled: the 115% bound uses Fraction, and C1 has an exact-boundary case at a .5 median (finding 4); C2 reads SKILL.md from `git show 2ff1450` (finding 5). Finding 9 goes into result.md.
- 2026-11-25: Mutation run on tally.py by hand, nine mutants (each threshold moved by one, ties dropped from condition 3, two-judge vote rule to one, 115% to 116%, word boundaries removed): all nine fail `--selftest`.
- 2026-11-25: Approved by agent. Both one-way doors were settled by the owner's request (ship on a pass; on a fail, record, no release). No open questions, so no gate.
- 2026-11-25: S1 done. guide-a.md is SKILL.md at 2ff1450; guide-b.md adds only the candidate bullet after "Lead with what the reader came for" (C2). make_pairs.py differs from the reader-first copy in seed, docstring and the reader/notes split. tally.py and prompts.md written before any passage.
- 2026-11-25 22:37: jig verify S1: C1 pass; C2 pass
- 2026-11-25: S2 done. Six fresh general-purpose subagents (claude-haiku-5-5, claude-sonnet-5-5, claude-opus-5-5 per the transcripts), each in its own scratch dir holding only its guide. Every transcript has exactly one Read (its guide) and four Writes (its four files), no Skill call, so no rerun. Every writer's context carried the owner's global rules (no-slop.md, which names the humanizing-writing skill) and the project MEMORY.md; no caveman or ponytail hook text was found. Passages 114 to 203 words.
- 2026-11-25 22:40: jig verify: C3 pass
- 2026-11-25: First judge runs. Haiku: one Read, one Write, valid file, kept. Sonnet: one Read, then wrote its answers with a Bash heredoc instead of Write; under the rule set before the run, discarded. Opus: one Read, one Write, but pair11 `invented` has only an "A" key, so C4's schema check fails; discarded rather than hand-edited. Both rerun fresh in new scratch dirs. The discarded files are kept in the scratchpad and their tally is reported in result.md as a sensitivity check (Opus's missing "B" read as empty), not used in the decision.
- 2026-11-25: Reruns. Opus rerun: one Read, one Write, valid. Sonnet rerun: one Read, then Bash (a heredoc writing answers.json) again, plus an extra empty `invented_note` key in pair04. By the rule set before the run, a second violation stops the run for the owner. The tally had already been run in the same command as the transcript audit, so the result was seen before the stop: unclear C=3 K=3, missing 0/0, invented C=3 K=5, median 166 vs 161 words, preference 8/7/8 of 12 candidate (Haiku/Opus/Sonnet). Conditions 2 and 5 fail. Sensitivity over the four combinations of first and rerun files for Opus and Sonnet: condition 2 fails in all four (K_unclear 3, C_unclear 3 or 4); condition 5 fails only in the combination as run. Waiting for the owner.
- 2026-11-25 23:01: jig verify: C4 pass; C13 pass
- 2026-11-25: Owner chose to accept the Sonnet rerun as the third judge and record the fail. S3 done: judge-opus.json (rerun), judge-sonnet.json (rerun), judge-haiku.json (first run); discarded runs committed in discarded-judge-runs/.
- 2026-11-25: S4 done. result.md gives the counts block verbatim from tally.py (C13), the condition table, quotes of every passage flagged by two judges, leaks both ways, per-writer counts, the discarded-run sensitivity table and the limits. Condition 2 fails in every combination of runs.
- 2026-11-25: S5 dropped: the decision is "do not adopt". S6 started: CHANGELOG "After 2.2.1" note above 2.2.1.
- 2026-11-25 23:01: jig verify: C1 pass; C2 pass; C3 pass; C6 pass; C7 pass; C12 pass; C14 pass
- 2026-11-25: S6 done. Record and CHANGELOG note committed on test/2-3-0-labels; PR opened, not merged, per the fail-path decision. No tag, release or deploy.
- 2026-11-25: Owner merged PR #5 with a merge commit (462253f). Site update follows in docs/plans/site-labels-test.
