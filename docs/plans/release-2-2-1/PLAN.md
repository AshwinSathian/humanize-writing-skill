# 2.2.1: skill in its own folder, current model habits, cross-agent installs

Status: building · Tier: full · Baseline: 66edd80 · Updated: 2026-11-25
Now: S2 doing.

## Outcome
An install of 2.2.1 by `npx skills`, by `/plugin install` or by symlink gets only the skill folder, not `site/`. The model-habit files match what Graphite, OpenAI and Wikipedia say as of November 2026. The README says which agents the skill was checked in and how. The 2.3.0 test is pre-registered before any passage for it exists. 2.2.1 is tagged, released, deployed, and installed on this machine.
Done when:
- `python3 -I tools/check-skill.py` exits 0 (C1)
- `claude plugin validate . --strict` exits 0 (C2)
- `npm --prefix site test` exits 0 (C3)
- `bash tools/check-install.sh` exits 0 (C4)
- `bash tools/check-plugin.sh` exits 0 (C7)
- a `npx skills` install snapshotted from pre-merge `main` updates cleanly after merge (S5 Log)
- `gh release view v2.2.1` shows the release; `readlink ~/.claude/skills/humanizing-writing` ends in `skills/humanizing-writing`; `git diff v2.2.1 -- skills/humanizing-writing` is empty (S5 Log)

## Decisions
- [one-way] Move SKILL.md, reference/, examples/, voices/ and scripts/ into `skills/humanizing-writing/`. Reason: `npx skills` 1.9.0 copies the whole folder that holds SKILL.md and reads no ignore file, so this move is the only way installs skip `site/`. External `blob/main/SKILL.md` links will 404. Rejected: keeping SKILL.md at the root and moving site/ to another repo (the owner chose a subfolder). Decided: owner 2026-11-25
- [one-way] The plugin root becomes `skills/humanizing-writing/`: `plugin.json` moves into `skills/humanizing-writing/.claude-plugin/`, and the marketplace entry's `source` becomes `./skills/humanizing-writing`. Reason: with `source: "."`, `/plugin install` copies the whole repo, `site/` included. Rejected: narrowing the outcome to `npx skills` only. Decided: agent 2026-11-25, inside the owner's "installs skip site/"; C7 proves the skill still loads.
- Ship as 2.2.1, not 3.0.0. Reason: the rules in SKILL.md and the install commands stay the same. Only the layout and symlink path change, and the CHANGELOG gets an upgrade note. Decided: owner 2026-11-25
- Move all of `reference/` along with the skill, the test records included. Reason: the files link to each other by relative path, so keeping the set together keeps every link working. The cost is about 1 MB per install. Rejected: splitting the test records out, which would break dozens of links inside the reference files.
- Copy LICENSE into the skill folder. Reason: MIT requires the notice to travel with copies, and copy installs carry only that folder. C1 checks that the two copies are identical.
- SKILL.md's text changes in one place, the Sources line, which now also points to `gpt-tics.md` and `gemini-tics.md`. Reason: the skill now runs in Codex and Gemini CLI. This adds no rule, so no blind test is needed.
- Every figure in a tics file names what it is compared against (human writing, Opus 5, Astra). Reason: the Graphite check found that several ratios the literature review reported as against human writing are against another model.
- [one-way] Release: tag v2.2.0 at 66edd80 after the fact, then tag v2.2.1, cut a GitHub release, and redeploy the site. Reason: 2.2.0 shipped without a tag. Gemini installs the latest release, which is currently 2.1.0. Decided: owner 2026-11-25 ("ship it")
- No CLI, Action, npm package, gemini-extension.json, hooks or MCP. Reason: the scope review. Prose has no ground truth to gate on, vale-ai-tells already covers linting, and Gemini needs no extension manifest.

## Out of scope
- The 2.3.0 rule itself. Only its pre-registration ships in 2.2.1.
- Any claim that the skill improves GPT or Gemini output. The README says the effect was tested only on Claude.

## Questions
- None.

## Assumptions
- The labels rule's evidence is OpenAI's GPT-6.2 Astra page, read 25 Nov 2026. "Tends to use lists, tables and Markdown" is not on that page and is left out of gpt-tics.md.
- The 2.3.0 test reuses the held-out-reader-first protocol: three writers, three judges, a key, blind pairs.

## Slices

### S1: Skill lives in skills/humanizing-writing/ [done]
Goal: The move is done, and every link in the repo, the site and the manifests resolves. A copy install contains no `site/`.
Touch: the old root SKILL.md, reference, examples, voices and scripts (moved), `skills/humanizing-writing/ (new)`, `skills/humanizing-writing/LICENSE (new)`, `.claude-plugin/marketplace.json`, `README.md`, `.github/ISSUE_TEMPLATE/bad-rewrite.yml`, `site/src/lib/site.ts`, `site/src/lib/examples.ts`, `site/src/lib/llms.ts`, `site/src/pages/index.astro`, `site/src/pages/research.astro`, `site/src/pages/examples.astro`, `site/src/pages/compare.astro`, `site/src/pages/tells.astro`, `site/src/layouts/Base.astro`, `site/tests/dist.test.mjs`, `site/tools/measure-site.py`, `site/README.md`, `tools/check-skill.py (new)`, `tools/check-install.sh (new)`, `tools/check-plugin.sh (new)`
Checks: C1, C2, C3, C4, C7
Order: first snapshot an `npx skills` install from GitHub `main` (still 2.2.0) into a temp HOME, kept for S5. Then `git mv`, then re-point `~/.claude/skills/humanizing-writing` to the new folder right away, so the skill keeps loading while S2 and S3 write prose. C4 installs from the local working tree, never from GitHub. C1 also runs `site/tools/measure-site.py` with `--help` and asserts no root `SKILL.md`.
- Risk: Claude Code doesn't load SKILL.md at the root of the moved plugin. Detect: C7 installs the local marketplace into a temp `CLAUDE_CONFIG_DIR`, asserts the plugin cache has no `site/`, and runs `claude --plugin-dir skills/humanizing-writing` with Haiku to list skills. Fallback: keep the plugin root at the repo root and narrow the Outcome to `npx skills` and symlink installs.
- Risk: the site quietly links to a moved path. Detect: C1 checks every `blob()`, `tree()` and `readRepo()` argument in site/src. Fallback: fix the path.

### S2: Model-habit files current [doing]
Goal: claude-tics.md is corrected against Graphite (1 Oct 2026). gpt-tics.md and gemini-tics.md exist, and every row carries an evidence tier and a comparison basis.
Touch: `skills/humanizing-writing/reference/claude-tics.md (new)`, `skills/humanizing-writing/reference/gpt-tics.md (new)`, `skills/humanizing-writing/reference/gemini-tics.md (new)`, `skills/humanizing-writing/SKILL.md (new)`, `tools/check-skill.py (new)`
Checks: C1, C5
- Risk: a figure is copied wrong. Detect: each figure is checked against the verbatim quotes in the Log (Graphite, OpenAI, Wikipedia, Google) before commit; C5 rejects rows with an empty or placeholder basis. Fallback: drop the row.

### S3: README, site text, changelog, version [todo]
Goal: The README has the cross-agent table (checked vs docs only, with versions and date) and the new paths. The site FAQ states the install facts. CHANGELOG has 2.2.1 with the upgrade note. Both manifests say 2.2.1.
Touch: `README.md`, `CHANGELOG.md`, `skills/humanizing-writing/.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `site/src/lib/content.ts`, `site/src/lib/llms.ts`
Checks: C1, C2, C3

### S4: Pre-register the 2.3.0 labels test [done]
Goal: The preregistration and candidate rule are committed before any task output exists.
Touch: `skills/humanizing-writing/reference/held-out-labels-test/preregistration.md (new)`, `skills/humanizing-writing/reference/held-out-labels-test/candidate-rule.md (new)`, `skills/humanizing-writing/reference/held-out-labels-test/tasks.json (new)`
Checks: C6

### S5: Ship and install [todo]
Goal: PR reviewed and merged, tags and release out, site deployed, upgrade path checked, local symlink re-pointed and loading.
Touch: `docs/plans/release-2-2-1/PLAN.md`
Checks: C1, C2, C3, C4, C7
Order: tag v2.2.0 at 66edd80 and push it; merge the PR; run `npx skills update` on the S1 snapshot; deploy the site; tag v2.2.1 and cut the release, with notes written after the update result is known.
- Risk: an old `npx skills` lock (skillPath `SKILL.md`) fails to update after the move. Detect: the S1 snapshot, updated after merge. Fallback: the release notes and CHANGELOG lead with remove-and-re-add.
- Risk: symlink users' skill stops loading after `git pull`. Detect: certain, by design. Fallback: none needed; CHANGELOG and release notes lead with the new `ln -s` command.

## Log
- 2026-11-25: Plan started at 66edd80.
- 2026-11-25: OpenAI GPT-6.2 Astra page read (developers.openai.com/api/docs/guides/latest-model/gpt-6.2-astra): "During longer tasks, the model can carry shorthand from its reasoning or from other agents into its final answer." "Do not carry over working shorthand, jargon, or abbreviations from your reasoning, tool calls, or instructions to subagents and automations." "GPT-6.2 Astra is more concise and direct by default than earlier models." No statement on lists/tables/Markdown. Wikipedia Signs of AI writing (as of Oct 2026): em dashes under "Historical indicators" (2022–September 2026); "commas and periods are more likely now than even human text" [citation needed]; GPT-6 list "challenge, clearer, dependable, echoed, foster, leverage, matters, multifaceted, practical, prioritize, quietly, steady, universally"; "shorter sentences around a strict 8–20 word limit". Google AI Studio prompting strategies, Gemini 3: "By default, Gemini 3 models provide direct and efficient answers." Graphite Gemini 3.1 Pro rows (times human): incredibly 18x, profound 25x, immense 22x, furthermore the 43x, ultimately this 78x, additionally the 8.6x, is not just 18x, instead it is 29x, is not just a _ it is 153x, without sacrificing 7.8x, without losing 5.4x, without compromising 5.2x, absolutely essential 32x. Forum thread on stacked adverbs not found; row dropped.
- 2026-11-25: Graphite figures verified against the primary pages: Opus 5.5 update (1 Oct 2026) and AI Tells (16 Sep 2026). Not against human writing: "is especially helpful" 12x, "can help you" 8x and "makes it easier" 6x are against Opus 5. "one of the best _ about" 79x and "perhaps the most" 29x are against Astra. Astra's "not necessarily" 18x and "may provide" 36x are against Opus 5. "does not establish" 275x is against Opus 5.5. Opus 5 mannered prose 16.75 against a human mean of 6.65 (2.5x is derived, not stated).
- 2026-11-25: jig-reviewer (plan mode) returned 10 findings; all applied: plugin root moved so `/plugin install` skips site/ (C7 added), missing site files added to S1, measure-site.py and root-SKILL.md checks in C1, symlink re-pointed in S1, C4 installs from the working tree, S5 ordered around the pre-merge snapshot, C6 requires committed files, done-when for the local install made falsifiable, C5 rejects placeholder bases.
- 2026-11-25: Approved by agent under the owner's "ship it"; the owner settled the layout move and the 2.2.1 version; the plugin-root door stays inside that scope and C7 gates it.
- 2026-11-25 22:10: jig verify S1: C1 pass; C2 pass; C3 pass; C4 pass; C7 pass
- 2026-11-25: S1 done. The skill, its references and the plugin manifest now live in `skills/humanizing-writing/`, and the marketplace points there, so `npx skills` and `/plugin install` copy only that folder (C4, C7). Site paths, the site test and measure-site.py follow the move; C1 now fails if any of them points at a missing file. The local symlink was re-pointed at the start. Before the move, a GitHub `main` install was snapshotted into a scratch HOME for the S5 upgrade test; it carried `site/`, which confirms the problem.
- 2026-11-25: Touch lists edited after the move: the old root paths no longer exist, and plugin.json now lives in the skill folder. Scope unchanged.
- 2026-11-25: S4 committed before S2, because gpt-tics.md (S2) links to `reference/held-out-labels-test/`, and C1 fails on a dangling link. tasks.json added to S4's Touch: the four tasks are pre-registered with the rule, so they can't be written after seeing passages.
- 2026-11-25: S4 done. Pre-registration, candidate rule and four tasks are committed alone, with no passages. The decision rule adds a condition the 2.2.0 test lacked: if Claude writers don't leak labels without the rule (C_unclear under 3), the rule is not adopted.
