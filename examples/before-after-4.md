# Example 4: A draft in the 2026 long-sentence style

This is the style the 2026 measurements describe: long sentences joined
with "and", verbs turned into nouns, and no short statement anywhere
(`reference/research/2026-update.md` §1). It has no "delve" and no
fragments.

## Before (AI-toned original)

The implementation of the new caching layer resulted in a significant
reduction in response times and an improvement in overall system
reliability, and the team's utilization of a write-through strategy
ensured the consistency of data across services and reduced the
occurrence of stale reads, and these changes have increasingly
demonstrated the importance of careful architectural consideration in the
optimization of performance.

## After (humanized rewrite)

The new caching layer cut response times and made the system more
reliable. The team used a write-through strategy, which keeps data
consistent across services and reduces stale reads.

## What changed, and why

- One 61-word sentence became two. The break falls where the subject
  changes from the result to how the team got it.
- Nouns went back to verbs: "the implementation of... resulted in a
  reduction" became "cut", "utilization of" became "used", "ensured the
  consistency of" became "keeps consistent", "reduced the occurrence of"
  became "reduces".
- The last clause is deleted. "Demonstrated the importance of careful
  architectural consideration in the optimization of performance" says
  that the work mattered and gives no fact.
- "Significant" is deleted and nothing replaces it. The original gives no
  figure for the reduction, so the rewrite cannot supply one. The fix
  that would help most is the measurement, and only the writer has it.
