# Site: publish the 2.3.0 labels test (tested, not adopted)

Status: shipped · Tier: brief · Baseline: 462253f · Updated: 2026-11-25
Now: shipped; deployed from 79969e6.

## Outcome
The live research page, llms.txt, the FAQ, the comparison row and the README report the 25 November labels test as a rule tested and not adopted, with the counts from `result.md`. The site's version facts match 2.2.1.
Done when:
- `npm --prefix site test` passes
- `python3 -I tools/check-skill.py` passes (every blob() link resolves)
- `curl -s https://humanize.ashwinsathian.com/research | grep -c 'id="labels"'` prints 1 after deploy
- `curl -s https://humanize.ashwinsathian.com/llms.txt | grep -c 'held-out-labels-test'` prints 1 after deploy

## Decisions
- New research section `#labels` after the 2.2.0 section, built like the 10 October `#held-out` section (table, two paragraphs, sources aside). Reason: same kind of result, and the page reads in date order.
- Every number on the site is copied from `result.md` as committed in 462253f, not recomputed. Reason: one source of truth.
- `site.ts` `released` becomes 2026-11-25. Reason: it still holds 2.2.0's date while `version` reads 2.2.1 from plugin.json, so llms.txt says "2.2.1 (released 2026-11-19)", which is wrong. `updated` becomes 2026-11-25 too.
- `content.ts` FAQ "at version 2.2.0" becomes 2.2.1. Reason: stale since 2.2.1 shipped.
- README "Tested blind" gets two sentences on the test. Reason: the README already reports the 10 October failed rule test, and GitHub readers see it before the site.
- [one-way] Deploy to production with the account ID the owner gave. Reason: owner's request. Decided: owner 2026-11-25
- Merge the PR with a merge commit after checks pass. Reason: owner asked for the site to be updated and redeployed; deploy runs from merged main.

## Out of scope
- The `datePublished: site.updated` line in `site.ts` (pre-existing; it moves the publish date on every update). Reported, not changed.

## Questions
- None.

## Assumptions
- The page description and the 404 and OG card text say "the pre-registered test"; they become plural, since there are now three.

## Slices

### S1: Site and README text, tested, deployed [done]
Goal: all text changes in, checks green, PR merged, site deployed, live pages verified.
Touch: `site/src/pages/research.astro`, `site/src/lib/llms.ts`, `site/src/lib/content.ts`, `site/src/lib/site.ts`, `site/src/lib/og.ts`, `site/src/pages/404.astro`, `README.md`, `docs/plans/labels-test-2-3-0/PLAN.md`, `docs/plans/site-labels-test/PLAN.md`
Checks: `npm --prefix site test`, `python3 -I tools/check-skill.py`
- Risk: a number on the page drifts from result.md. Detect: grep each figure in the built HTML against result.md before deploy. Fallback: fix and redeploy.
- Risk: the new table breaks the layout at narrow widths. Detect: screenshot of the built page at 390 px and 1280 px. Fallback: shorten the row labels.

## Log
- 2026-11-25: Plan started at 462253f. Approved by agent; the one deploy door was settled by the owner's request; no gate applied.
- 2026-11-25: Built page checked: every figure matches result.md; the new table fits at 390 px. The two first-round tables (#results, #haiku) are 2 px wider than their scroll box at 390 px; pre-existing, they scroll, left alone. The Haiku/Opus/Sonnet list cells wrapped at 390 px ("3, 5," / "4"), so all six list cells on the page now use non-breaking spaces, including the two earlier tables. Fonts checked on all seven pages: every visible text element computes to Bricolage Grotesque, code to JetBrains Mono; the only other face is Arial on the stage radio inputs, which are opacity 0 and draw no text. No font change made.
- 2026-11-25: `npm --prefix site test` 42/42 pass; `python3 -I tools/check-skill.py` passes.
- 2026-11-25: S1 done. PR #6 merged (79969e6, merge commit). Deployed to humanize-writing-site (fd94ba72.humanize-writing-site.pages.dev). Live: /research has the #labels section, llms.txt cites held-out-labels-test and says "Version: 2.2.1 (released 2026-11-25)", the FAQ says 2.2.1, and the three GitHub source links return 200.
