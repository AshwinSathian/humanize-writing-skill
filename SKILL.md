---
name: humanize-writing
description: Use when producing any written text — prose, docs, comments, commit messages, reports, emails — before finalizing output, to avoid recognizable AI-writing tells and read as a specific, considered human voice instead of generic, templated, or padded text
---

# Humanize Writing

## Overview

Writing reads as AI-generated less because of specific words and more
because of *shape*: uniform sentence rhythm, safe generic claims instead of
specific checkable ones, and templated structure. Fix the shape first.
Word-level tells (delve, em dashes, "boasts") are real but decay fast and
are the weakest lever — treat the quick-reference table below as backup,
not the method. Full sourcing: `reference/research.md`.

## Write this way

- **Commit to specific, checkable claims.** Replace "plays a significant
  role" or "experts say" with the actual fact and its actual source. If you
  don't know the specific, say the general thing plainly — don't dress it
  up as more authoritative than it is.
- **Use the plain verb.** Prefer "is" over "serves as/stands as/represents";
  prefer one strong verb over a padded phrase ("show" not "have the effect
  of demonstrating").
- **Vary sentence rhythm on purpose.** Don't let every sentence or
  paragraph land at the same length. Mix short with long.
- **Reach for concrete, physical, or checkable detail over abstraction**
  ("nubby, arthritic fingers" beats "profound personal struggle").
- **Cut hedge-intensifiers**, not just banned nouns: rather, very, quite,
  arguably, in many ways.
- **Let structure follow the content**, not a template. Don't default to a
  triadic list, a rhetorical-question opener, or a "Despite these
  challenges..." pivot because it's the safe shape — only use them where
  the content actually earns them.
- **Never invent facts, numbers, or sources to sound more specific.**
  Specificity has to come from something true.

## Common tells (quick reference)

| Tell | Why it reads as artificial |
|---|---|
| "Delve," "boast(s)," "underscore," "intricate," "meticulous," "testament to," "tapestry/landscape/realm" | Spiked in frequency post-ChatGPT; RLHF-reinforced word preferences, not organic usage |
| "It's not X, it's Y" | Manufactures contrast without evidence for either half |
| Stock transitions ("Moreover," "Furthermore," sentence-initial "Additionally") | Defaults to the statistically safest connector instead of a natural one |
| Rule-of-three list padding | Manufactures thoroughness the content doesn't independently have |
| Vague attribution ("experts say," "studies show") | Sounds sourced without being checkable |
| Uniform paragraph/sentence length | Low structural "burstiness" — the strongest research-backed signal, more model-independent than any word |
| Signposted conclusions ("In conclusion," recapping everything already said) | Genre reflex, not an earned close |
| Em dash overuse | Well-documented, but mechanism is genuinely contested — treat volume/function, not presence, as the signal |

Full ranked catalog (27 tells, sourced): `reference/research.md` §2.
Contested signals (semicolons, hedging direction, lexical diversity) are
flagged there too — don't treat them as reliable on their own.

## Before finalizing

Reread the draft and check:
1. Does every paragraph sound the same length and shape? Vary it.
2. Any claim that could be more specific without inventing anything? Make it specific.
3. Any padded verb phrase, stock transition, or rule-of-three that isn't earned by the content? Cut or replace it.
4. Any of the quick-reference tells present, especially clustered together? Fix the cluster, not just one instance.

This is an internal check, not a rule to hide — if asked, explain what was changed and why.

## Full research

`reference/research.md` (synthesis + full source list) and
`reference/oss-skills-review.md` (what existing public humanizer skills get
right and wrong, and why this skill differs).
