---
name: humanizing-writing
description: Use when producing any written text (prose, docs, comments, commit messages, reports, emails) before finalizing output, to avoid recognizable AI-writing tells and read as a specific, considered human voice instead of generic, templated, or padded text
---

# Humanize Writing

## Overview

Writing reads as AI-generated more from *shape* than word choice: uniform
sentence rhythm, safe generic claims instead of specific checkable ones,
templated structure. Fix the shape first. Word-level tells (delve, em
dashes) are real but decay fast and are the weakest lever. Full sourcing:
`reference/research.md`.

## Write this way

- **Commit to specific, checkable claims.** Replace "plays a significant
  role" or "experts say" with the actual fact and its source. Unknown? Say
  it plainly, not dressed up as more authoritative.
- **Use the plain verb.** "Is," not "serves as/stands as/represents." One
  strong verb, not a padded phrase.
- **Vary sentence rhythm on purpose.** Don't let every sentence or
  paragraph land at the same length.
- **Default to commas or periods.** Save the dash for genuine emphasis or
  interruption, not as filler between clauses a period handles just as well.
- **Reach for concrete, physical, checkable detail over abstraction**
  ("nubby, arthritic fingers" beats "profound personal struggle").
- **Cut hedge-intensifiers**, not just banned nouns: rather, very, little,
  pretty.
- **Let structure follow the content, not a template.** Triadic lists,
  rhetorical questions, "Despite these challenges..." pivots: fine when
  earned, not as a default shape.
- **Never invent facts, numbers, or sources to sound more specific.**
  Specificity has to come from something true.
- **Match the voice already established:** a codebase's commit
  conventions, a document's existing tone, a user's own writing sample.
  Follow that before reaching for a default shape. Specificity, plain
  verbs, and never fabricating are the only universal rules here; the
  rest yields to context.

## Scope

The rules above target discursive prose Claude is generating. They give
way to context:

- **Editing someone else's already-human text?** Fix what was asked,
  leave their voice, hedges, and rhythm alone. This isn't a filter to
  run over text you didn't write.
- **A format where the convention *is* uniform structure** (API/
  reference docs, schemas, repeated list entries): parallelism there is
  the usability feature, not padding. Keep it.
- **Fiction or other invented content:** "never invent facts" governs
  claims about the real world, not a story's sensory and physical
  detail, which is supposed to be invented.
- **Legal, compliance, or other fixed-register text:** enumerated legal
  theories and standard hedges ("to the maximum extent permitted by
  law") are functional boilerplate, not AI padding.
- **Non-English text:** the tell list (delve, em dash, moreover) is
  English-specific and doesn't transfer.
- **Text shorter than a paragraph** (a commit subject line, a one-line
  comment, a chat reply): specificity and plain verbs still apply; skip
  the rhythm and paragraph-shape checks, there's nothing to vary.

## Common tells (quick reference)

| Tell | Why it reads as artificial |
|---|---|
| delve, boast(s), underscore, intricate, meticulous | Post-ChatGPT spike, RLHF-reinforced (confirmed for "delve") |
| testament to, tapestry/landscape/realm | Significance-inflation: vague grandiosity is safer than a specific claim |
| "It's not X, it's Y" | Manufactured contrast, no evidence for either half |
| Moreover/Furthermore/sentence-initial Additionally | Statistically safe connector, not a natural one |
| Rule-of-three list padding | Manufactures thoroughness the content lacks |
| Vague attribution ("experts say," "studies show") | Sounds sourced without being checkable |
| Uniform paragraph/sentence length | Low "burstiness" (the strongest, most model-independent signal) |
| Signposted conclusions ("In conclusion" + recap) | Genre reflex, not an earned close |
| Em dash overuse | Real signal, contested cause: volume and default use, not any single dash. 2026 cross-model data narrows it further: Claude specifically still overuses it; other models less so |

Full ranked catalog (27 tells): `reference/research/tells-catalog.md`,
including contested signals (semicolons, hedging, lexical diversity) not
reliable alone.

## Before finalizing

Reread the draft:
1. Same length/shape every paragraph? Vary it.
2. A claim that could be specific without inventing anything? Make it specific.
3. Padded verb, stock transition, unearned rule-of-three? Cut it.
4. More than one or two dashes per paragraph? Convert most to commas or periods.
5. Quick-reference tells present, especially clustered? Fix the cluster.

Internal check, not a rule to hide. Explain changes if asked.

## Full research

`reference/research.md` (synthesis + sources, links onward to the raw
reports in `reference/research/`), `reference/oss-skills-review.md`
(what other humanizer skills get right/wrong),
`reference/validation-note.md` (does the skill measurably change output,
including the scope-gating fix's own verification), `examples/` (worked
before/after passages).
