# Current Claude Habits

Compiled October 2026 from reports about Claude Opus 5 and Claude Fable
5.1. Revised 25 November 2026 against Graphite's Opus 5.5 report, read
in full. Nothing here was measured for this repository.
This file dates faster than anything else in the repo. Graphite found
that 55% to 72% of the tells it measured differ between a family's two
latest versions. Re-check this file after each Claude model release and
delete entries that no longer show up. Habits of other vendors' models:
`reference/gpt-tics.md`, `reference/gemini-tics.md`.

Each entry below is an instance of a rule already in `SKILL.md`, named in the third column by its opening words. Nothing
here is a banned word: "load-bearing" is the right term for a wall.

## Evidence tiers used here

Strongest first:

- **Measured, third party**: a published corpus comparison. Here that is
  Graphite's two reports (16 September and 1 October 2026), read in
  full: 10,000 web articles from Common Crawl published before
  30 November 2022, and the same topics written by each model. Also
  *The Economist*'s study (30 July 2026), read through secondary
  sources because it is paywalled; it does not say which Claude version
  it tested.
- **Vendor documentation**: Anthropic's own prompting guides. The vendor
  is describing its own model, but the statements are unmeasured and
  compare the model with its predecessor, not with human writers.
- **Community report**: two blog posts summarizing forum threads. The
  threads themselves were not read. None of it is measured, and one
  widely shared post can make a habit look more common than it is.

Every Graphite figure says what it is compared with. Some of its tables
compare Opus 5.5 with Opus 5 or with GPT-6 Astra, not with human
writers.

## Habits

| Habit | Example | Rule in `SKILL.md` | Evidence |
|---|---|---|---|
| Announcing that something matters instead of showing it (Opus 5.5) | "this matters", "why X matters" | Stop when the content stops ("Don't announce a point before making it") | Measured, third party: Graphite (1 Oct 2026), "this matters" at 116x and "why _ matters" at 92x the human rate |
| Significance by comparison (Opus 5.5) | "is more than a _, it", "rather than simply" | Deny X only when this reader is likely to believe X | Measured, third party: Graphite (1 Oct 2026), 98x and 32x the human rate |
| Evaluative adjectives (Opus 5.5) | "dependable", "steady", "thoughtful", "meaningful" | Make claims specific and checkable | Measured, third party: Graphite (1 Oct 2026), 23x, 11x, 9x and 8x the human rate. "dependable" and "steady" are also on Wikipedia's GPT-6 list (`reference/gpt-tics.md`) |
| Stock forward-looking and additive transitions (Opus 5.5) | "Looking ahead, the", "adds another layer", "what comes next" | Stop when the content stops | Measured, third party: Graphite (1 Oct 2026), 40x, 27x and 24x the human rate |
| Helpfulness phrasing (Opus 5.5) | "is especially helpful", "can help you", "makes it easier" | Make claims specific and checkable | Measured, third party, against Opus 5 only: Graphite (1 Oct 2026), 12x, 8x and 6x the Opus 5 rate. No human ratio published |
| Superlatives (Opus 5.5) | "one of the best _ about", "perhaps the most" | Significance inflation under Other tells | Measured, third party, against GPT-6 Astra only: Graphite (1 Oct 2026), 79x and 29x the Astra rate. No human ratio published |
| Metaphor where a literal phrase exists | "a dial worth turning" for "a parameter worth varying"; "earns its keep" for "still matters" | Replace a figure of speech with the fact it stands for | Vendor documentation: Anthropic, "Prompting Claude Fable 5.1", section "Writing density", which names this "mannered prose". Measured, third party: Graphite's mannered-prose score (scored by Claude Opus 5 as judge, 0 to 100) puts Opus 5.5 at about 1.6 times the human score, down from 16.75 for Opus 5 against a human mean of 6.65 |
| Long replies and documents with filler sections and redundant summaries (Opus 5) | n/a | Say each thing once; Lead with what the reader came for | Vendor documentation: Anthropic, "Prompting Claude Opus 5" |
| Dense prose: longer sentences, fewer paragraph breaks than the previous model (Fable 5.1) | n/a | Let sentence length follow the content (split "and" chains, break paragraphs where the subject changes) | Vendor documentation: Anthropic, "Prompting Claude Fable 5.1", section "Writing density" |
| Long, Latinate, noun-heavy vocabulary | "significant", "increasingly", "methodology" outside technical use | Use the plain verb and the common word | Measured, third party: *The Economist* (30 Jul 2026), which names Gemini and Claude as the strongest cases |
| "Not X but Y" and rule-of-three | n/a | Stop when the content stops; let structure follow the content | Measured, third party: *The Economist* (30 Jul 2026) reports ChatGPT and Claude using these devices most per 1,000 sentences |
| Em dash above the human rate (Opus 5 and earlier) | n/a | Put asides in commas or parentheses | Measured, third party: *The Economist* (30 Jul 2026): of ChatGPT, Claude, Gemini, and Grok, only Claude exceeded the human em-dash rate. Opus 5.5 no longer does this: Graphite (1 Oct 2026) measures 0.015 em dashes per 1,000 words against 2.92 for Opus 5, a 99% drop. Delete this row once no supported model shows it |
| Stock figurative phrases (Opus 5) | "load-bearing", "carries the argument" | Replace a figure of speech with the fact it stands for | Community report (explainx.ai and paddo.dev, summarizing Hacker News and r/ClaudeAI threads from August 2026). Not in Graphite's Opus 5.5 lists |
| Announced candor (Opus 5) | "worth stating plainly", "honestly", "frankly", "is genuinely" | Hedge each uncertain claim once | Community report (same sources). Graphite (1 Oct 2026) measures "is genuinely" at 26 times the Opus 5.5 rate in Opus 5, so this has fallen in 5.5 |
| Fragments for drama (Opus 5) | "Not a detail. A design decision." | Let sentence length follow the content | Community report (same sources). Not in Graphite's Opus 5.5 lists |

The semicolon-or-colon pivot ("X in theory; in practice, Y") was listed
here until November 2026 on a single community source. It is removed:
it ran against the measured finding that models use fewer semicolons
than people, and Graphite puts "in practice" at only 7x the human rate
for Opus 5.5.

## What Anthropic's guide says about formatting

The Fable 5.1 guide reports that the model uses bold, headers, and lists
less than earlier models, and advises removing anti-formatting rules
written for older models or replacing them with a rule that says when
formatting is appropriate. That is why `SKILL.md` says when a list or
header is appropriate and does not tell Claude to avoid them.

The fragment habit (reported for Opus 5) and the dense-prose habit
(reported for Fable 5.1) pull in opposite directions and come from
different models. `SKILL.md` covers both with one rule, that sentence
length follows the content, and item 4 of its checklist guards against
fixing one by producing the other.

The Opus 5.5 guide makes the same point about design: a general
instruction to avoid a generic look "mostly swaps one default for
another". Naming specific patterns works better. Item 4 of the
checklist exists for that reason.

## Sources

- Graphite, "AI Tells: Opus 5.5 Update", 1 October 2026.
  <https://graphite.io/research/ai-tells-opus-5-5-update>
- Graphite, "AI Tells", 16 September 2026.
  <https://graphite.io/research/ai-tells>
- Anthropic, "Prompting Claude Fable 5.1", sections "Writing density" and
  "Formatting in chat".
  <https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1>
- Anthropic, "Prompting Claude Opus 5" and "Prompting Claude Opus 5.5".
- "How to Spot AI Writing," *The Economist*, 30 July 2026. Paywalled; read
  through The Economist's own "Off the Charts" newsletter, Daring
  Fireball's excerpt, and secondary coverage.
  <https://www.economist.com/culture/2026/07/30/how-to-spot-ai-writing>
- "Claude Opus 5 Claudisms: Why It Says 'Load-Bearing'," explainx.ai.
  <https://explainx.ai/blog/claude-opus-5-load-bearing-claudisms-writing-tells-2026>
- Tejas Kumar, "Please Stop the Slop," 10 October 2026, which first
  brought the Graphite figures to this repository.
  <https://tej.as/blog/please-stop-the-slop>
- "A Dial Worth Turning," paddo.dev.
  <https://paddo.dev/blog/a-dial-worth-turning/>
