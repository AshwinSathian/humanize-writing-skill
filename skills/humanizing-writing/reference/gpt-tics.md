# Current GPT Habits

Compiled 25 November 2026 from reports about GPT-6 Astra and GPT-6.2
Astra. Nothing here was measured for this repository, and the skill's
effect on GPT output has not been tested: every blind round in
`reference/validation-note.md` used Claude writers.
Re-check this file after each OpenAI model release. Graphite found that
only 45% of the tells it measured in GPT-5.6 Sol and GPT-6 Astra were
shared between the two, so an entry here can go stale within one
release.

Each entry is an instance of a rule already in `SKILL.md`, named in the
third column by its opening words. Nothing here is a banned word.

## Evidence tiers used here

Strongest first:

- **Measured, third party**: Graphite's corpus comparisons (16 September
  and 1 October 2026). 10,000 web articles from Common Crawl published
  before 30 November 2022, and the same topics written by each model
  from a summary, with the prompt "Write an online article based on the
  summary provided below". One genre: web articles.
- **Vendor documentation**: OpenAI's guide to GPT-6.2 Astra. Unmeasured,
  and it compares the model with earlier GPT models, not with people.
- **Editor consensus**: Wikipedia's "Signs of AI writing" page, as read
  on 25 November 2026. Compiled by editors from cleanup work, partly
  citing Graphite, and unmeasured where it does not cite.

Every figure says what it is compared with. Some of Graphite's tables
compare one model with another, not with human writers.

## Habits

| Habit | Example | Rule in `SKILL.md` | Evidence |
|---|---|---|---|
| Corrective framing: saying what a thing is not | "not simply", "rather than", "not just" | Deny X only when this reader is likely to believe X | Measured, third party: Graphite (16 Sep 2026), about 12x the human rate for GPT-6 Astra; "not simply" at 157x the human rate. Wikipedia lists "corrective framings" as a sign from mid-2026 on |
| Announcing that something matters | "matters because" | Stop when the content stops ("Don't announce a point before making it") | Measured, third party: Graphite (16 Sep 2026), 357x the human rate for Astra |
| Stacked qualification | "not necessarily", "may provide", "does not establish" | Hedge each uncertain claim once | Measured, third party, against another model only: Graphite gives "not necessarily" at 18x and "may provide" at 36x the Claude Opus 5 rate (16 Sep), and "does not establish" at 275x the Opus 5.5 rate (1 Oct). No human ratio published |
| Working shorthand carried into the answer | step numbers, coined names, abbreviations from the model's own reasoning or tool calls | Lead with what the reader came for; Use the plain verb and the common word | Vendor documentation: OpenAI, GPT-6.2 Astra guide: "During longer tasks, the model can carry shorthand from its reasoning or from other agents into its final answer." No rule in `SKILL.md` names this yet; see `reference/held-out-labels-test/` |
| AI vocabulary, GPT-6 era | "dependable", "steady", "foster", "leverage", "multifaceted", "quietly", "universally" | Use the plain verb and the common word | Editor consensus: Wikipedia's list for "Mid-2026 and on (GPT-6)". "dependable" and "steady" are also measured for Claude Opus 5.5 (`reference/claude-tics.md`) |
| Uniform short sentences | most sentences 8 to 20 words | Let sentence length follow the content | Editor consensus, unmeasured: Wikipedia ("shorter sentences around a strict 8–20 word limit"). This runs against checklist item 3, which splits long sentences; on GPT output, apply item 3 only to sentences that really chain clauses |
| Commas and periods where people use dashes | n/a | Put asides in commas or parentheses | Measured, third party: Graphite (16 Sep 2026), Astra uses em dashes about one-eighth as often as human writers. Wikipedia says commas and periods are now "its own sign" (citation needed on the page). The rule's "or parentheses" matters here: an aside does not have to become a new sentence |

## What OpenAI's guide says about style

The GPT-6.2 Astra guide says the model "is more concise and direct by
default than earlier models" and advises revisiting "be concise"
instructions when migrating. Its suggested prompts ask for "terminology
the user and sources use", key points "up front", and the active voice.
Those match the rules in `SKILL.md` on plain words and on leading with
what the reader came for.

The guide does not say that the model overuses lists, tables or
Markdown. That claim circulates secondhand and is left out here.

## Sources

- Graphite, "AI Tells", 16 September 2026.
  <https://graphite.io/research/ai-tells>
- Graphite, "AI Tells: Opus 5.5 Update", 1 October 2026.
  <https://graphite.io/research/ai-tells-opus-5-5-update>
- OpenAI, "GPT-6.2 Astra" (latest-model guide), read 25 November 2026.
  <https://developers.openai.com/api/docs/guides/latest-model/gpt-6.2-astra>
- Wikipedia, "Signs of AI writing", read 25 November 2026.
  <https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing>
