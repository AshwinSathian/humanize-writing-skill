# Current Gemini Habits

Compiled 25 November 2026 from reports about Gemini 3.1 Pro. The
evidence is thin: one measured study, one study read secondhand and one
vendor page, and nothing at all for Gemini 3.5 or later. Nothing here was
measured for this repository, and the skill's effect on Gemini output
has not been tested.
Re-check this file after each Google model release.

Each entry is an instance of a rule already in `SKILL.md`, named in the
third column by its opening words. Nothing here is a banned word.

## Evidence tiers used here

Strongest first:

- **Measured, third party**: Graphite's corpus comparison of 16
  September 2026 (method in `reference/gpt-tics.md`), and *The
  Economist*'s study of 30 July 2026, read secondhand (see
  `reference/claude-tics.md`).
- **Vendor documentation**: Google's Gemini 3 prompting guidance.

## Habits

| Habit | Example | Rule in `SKILL.md` | Evidence |
|---|---|---|---|
| Intensifiers and grand adjectives | "incredibly" (18x), "profound" (25x), "immense" (22x), "absolutely essential" (32x) | Make claims specific and checkable; significance inflation under Other tells | Measured, third party: Graphite (16 Sep 2026), intensifiers ("absolutely", "entirely", "highly", "incredibly") at about 13x the human rate for Gemini 3.1 Pro. Figures in brackets are times the human rate |
| Definition by contrast | "is not just a _, it is" (153x), "instead it is" (29x), "is not just" (18x) | Deny X only when this reader is likely to believe X | Measured, third party: Graphite (16 Sep 2026), times the human rate |
| Stock transitions | "ultimately this" (78x), "furthermore the" (43x), "additionally the" (8.6x) | "Moreover", "Furthermore" row under Other tells | Measured, third party: Graphite (16 Sep 2026), times the human rate |
| Claiming no tradeoff | "without sacrificing" (7.8x), "without losing" (5.4x), "without compromising" (5.2x) | Make claims specific and checkable | Measured, third party: Graphite (16 Sep 2026), times the human rate. A tradeoff waved away is a claim; state the cost if there is one |
| Long, Latinate, noun-heavy vocabulary | "significant", "increasingly", "methodology" outside technical use | Use the plain verb and the common word | Measured, third party, secondhand: *The Economist* (30 Jul 2026) names Gemini and Claude as the strongest cases |
| Few contractions | "it is", "do not" throughout a casual piece | Match the voice already there | Measured, third party: Graphite says contractions "nearly disappear" across Gemini versions; no rate given |

Graphite also reports that Gemini 3.1 Pro "has nearly stopped" using
em dashes, so the em-dash rule has little to act on for this model.

## What Google's guidance says about style

Google's guide says that "by default, Gemini 3 models provide direct and
efficient answers" and that a more conversational or detailed reply has
to be asked for. It also tells prompt writers to "avoid unnecessary or
overly persuasive language". Nothing in it describes Gemini's own prose habits.

## Sources

- Graphite, "AI Tells", 16 September 2026.
  <https://graphite.io/research/ai-tells>
- "How to Spot AI Writing," *The Economist*, 30 July 2026, read
  secondhand. <https://www.economist.com/culture/2026/07/30/how-to-spot-ai-writing>
- Google AI Studio, prompting strategies page, section "Gemini 3",
  read 25 November 2026. <https://aistudio.google.com/docs/prompting-strategies>
