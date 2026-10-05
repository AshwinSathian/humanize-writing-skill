# Current Claude Habits

Compiled October 2026 from reports about Claude Opus 5 and Claude Fable
5.1. Nothing here was measured for this repository.
This file dates faster than anything else in the repo. Re-check it after
each Claude model release and delete entries that no longer show up.

Each entry below is an instance of a rule already in `SKILL.md`, named in the third column by its opening words. Nothing
here is a banned word: "load-bearing" is the right term for a wall.

## Evidence tiers used here

Strongest first:

- **Measured, third party**: a published corpus comparison. Here that is
  one study, read through secondary sources because it is paywalled, and
  it does not say which Claude version it tested.
- **Vendor documentation**: Anthropic's own prompting guide. The vendor
  is describing its own model, but the statements are unmeasured and
  compare the model with its predecessor, not with human writers.
- **Community report**: two blog posts summarizing forum threads. The
  threads themselves were not read. None of it is measured, and one
  widely shared post can make a habit look more common than it is.

## Habits

| Habit | Example | Rule in `SKILL.md` | Evidence |
|---|---|---|---|
| Metaphor where a literal phrase exists | "a dial worth turning" for "a parameter worth varying"; "earns its keep" for "still matters" | Replace a figure of speech with the fact it stands for | Vendor documentation: Anthropic, "Prompting Claude Fable 5.1", section "Writing density", which names this "mannered prose" and gives these two examples in its suggested prompt |
| Dense prose: longer sentences, fewer paragraph breaks than the previous model | n/a | Let sentence length follow the content (split "and" chains, break paragraphs where the subject changes) | Vendor documentation (same section) |
| Em dash above the human rate | n/a | Put asides in commas or parentheses | Measured, third party: *The Economist*, 30 July 2026. Of ChatGPT, Claude, Gemini, and Grok, only Claude exceeded the human em-dash rate |
| Long, Latinate, noun-heavy vocabulary | "significant", "increasingly", "methodology" outside technical use | Use the plain verb and the common word | Measured, third party: *The Economist* (same study), which names Gemini and Claude as the strongest cases |
| "Not X but Y" and rule-of-three | n/a | Stop when the content stops; let structure follow the content | Measured, third party: *The Economist* (same study) reports ChatGPT and Claude using these devices most per 1,000 sentences |
| Stock figurative phrases | "load-bearing", "carries the argument" | Replace a figure of speech with the fact it stands for | Community report (explainx.ai and paddo.dev, summarizing Hacker News and r/ClaudeAI threads from August 2026) |
| Announced candor | "worth stating plainly", "honestly", "frankly" | Hedge each uncertain claim once | Community report (same sources) |
| Fragments for drama | "Not a detail. A design decision." | Let sentence length follow the content | Community report (same sources) |
| Semicolon or colon pivot | "X in theory; in practice, Y" | Stop when the content stops | Community report, single source (explainx.ai). Weakest entry here, and it runs against the measured finding that models use fewer semicolons than people |

## What Anthropic's guide says about formatting

The same guide reports that Fable 5.1 uses bold, headers, and lists less
than earlier models, and advises removing anti-formatting rules written
for older models or replacing them with a rule that says when formatting
is appropriate. That is why
`SKILL.md` says when a list or header is appropriate and does not tell
Claude to avoid them.

The fragment habit (reported for Opus 5) and the dense-prose habit
(reported for Fable 5.1) pull in opposite directions and come from
different models. `SKILL.md` covers both with one rule, that sentence
length follows the content, and item 4 of its checklist guards against
fixing one by producing the other.

## Sources

- Anthropic, "Prompting Claude Fable 5.1", sections "Writing density" and
  "Formatting in chat".
  <https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1>
- "How to Spot AI Writing," *The Economist*, 30 July 2026. Paywalled; read
  through The Economist's own "Off the Charts" newsletter, Daring
  Fireball's excerpt, and secondary coverage.
  <https://www.economist.com/culture/2026/07/30/how-to-spot-ai-writing>
- "Claude Opus 5 Claudisms: Why It Says 'Load-Bearing'," explainx.ai.
  <https://explainx.ai/blog/claude-opus-5-load-bearing-claudisms-writing-tells-2026>
- "A Dial Worth Turning," paddo.dev.
  <https://paddo.dev/blog/a-dial-worth-turning/>
