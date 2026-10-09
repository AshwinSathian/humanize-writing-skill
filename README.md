# humanizing-writing

[![Release](https://img.shields.io/github/v/release/AshwinSathian/humanize-writing-skill)](https://github.com/AshwinSathian/humanize-writing-skill/releases) [![License: MIT](https://img.shields.io/github/license/AshwinSathian/humanize-writing-skill)](LICENSE) [![skills.sh](https://img.shields.io/badge/skills.sh-listed-black)](https://skills.sh/ashwinsathian/humanize-writing-skill)

[Project page](https://ashwinsathian.com/projects/humanize-writing-skill) · [Why word lists fail](https://ashwinsathian.com/writing/why-humanize-my-writing-tools-dont-work) (August 2026) · [What changed in 2.0.0, and why](https://ashwinsathian.com/writing/the-ai-tells-moved-my-tool-for-avoiding-them-hadnt) (October 2026)

A Claude Code skill that guides how Claude writes prose (docs, reports,
emails, posts, PR descriptions) so it does not read as machine-written.
It applies while Claude is writing, and also when you ask Claude to
humanize a draft.

## Example

One of four worked examples in `examples/` (full annotations there):

**Before:**
> Rate limiting plays a crucial role in maintaining the stability and
> reliability of modern APIs. It's not just a defensive measure — it's a
> foundational component of good API design... Despite the added
> complexity it introduces, rate limiting remains a testament to
> thoughtful, resilient system design.

**After:**
> Rate limiting exists because one misbehaving client can overwhelm
> resources that every client shares, and the failure then spreads to all
> of them. With a limit in place, that client's extra requests are
> rejected (HTTP 429) and the others keep working... It also makes the
> API more complex.

The rewrite states the mechanism the original buried, and adds no fact
the original did not have. `examples/` also has two 2026-style drafts
(one all fragments and "load-bearing", one a single 61-word sentence)
and a note in each file on what the 1.x rewrite got wrong.

In a blind comparison, two model judges each preferred text written with
this skill to text written without it in 5 of 6 pairs. The sample is
small and the judges are Claude models; the pairs, the losses, and the
limits are in `reference/validation-note.md`.

## How it was built

It's built from three research passes (academic detection literature,
editorial/practitioner style guides, and a cross-referenced catalog of 27
specific AI-writing tells), a teardown of 13 existing public "humanizer"
skills, and three adversarial review rounds. Full sourcing lives in
`reference/`. See `CHANGELOG.md` for what each round changed.

**It is written for human readers and does not get text past AI
detectors.** Current detectors are trained classifiers that key on how
an instruction-tuned model writes, which a style guide does not change
(`reference/research/2026-update.md` §3). If you need a detector score,
this is the wrong tool.

**2.0.0 (October 2026)** rewrote the rules against 2026 sources. The
tells have moved since 2023: current models have mostly dropped "delve"
and now show long noun-heavy sentences, metaphor in place of plain
statement, and short closing lines written for effect. Version 1.x did
not cover those, and its own rewritten examples contained some of them.
`reference/research/2026-update.md` has the detail.

## Why this one

Most public humanizer skills reduce to a banned-word list: swap "delve" for
something else, cap em dashes, and call it done. That works until the list
goes stale, and per the research this skill is built on, it goes stale
fast (`reference/research.md` §3). Wikipedia's own list of AI vocabulary
is now sorted by model era, and its list for mid-2025 onward is four
words, one of which was on its 2023 list. This skill starts from why model text reads the way it
does (each choice is the one that would suit any reader and any subject)
and puts the rules on claims, sentence shape, and endings first. The
word list is still here as a short quick reference.

It also applies while Claude is writing. The widely used alternatives
are rewrite tools you run over a finished draft.

See `reference/oss-skills-review.md` for the full teardown of what other
public skills in this space get right and wrong, and exactly what this one
does differently as a result.

## Install

**As a skill.** Clone the repo, then symlink it into your Claude Code
skills directory:

```bash
git clone https://github.com/AshwinSathian/humanize-writing-skill.git
ln -s "$(pwd)/humanize-writing-skill" ~/.claude/skills/humanizing-writing
```

The symlink means editing the cloned repo updates the live skill directly:
pull to update, no reinstall step.

**As a plugin, from this repo's own marketplace (one-line install, no
review or account needed).** The repo ships both a
`.claude-plugin/plugin.json` manifest and a `.claude-plugin/marketplace.json`,
so it's a self-contained plugin marketplace of one. Verified working
end-to-end (add, install, uninstall) before shipping this:

```bash
/plugin marketplace add AshwinSathian/humanize-writing-skill
/plugin install humanizing-writing@humanize-writing-skill
```

This is not submitted to Anthropic's official community marketplace
(`@claude-community`), which requires going through a submission review
via Anthropic's Console. This repo's own marketplace gets you the same
one-line install today, with no review, no account, and no cost, at the
price of one extra `marketplace add` command.

**Try it without installing anything:**

```bash
claude --plugin-dir /path/to/humanize-writing-skill
```

**Via skills.sh:**

```bash
npx skills add AshwinSathian/humanize-writing-skill
```

**Verify it's working.** After installing, ask Claude something like "what
skills do you have available?" or give it a short, obviously AI-toned
paragraph and ask it to write something similar. A working install
should visibly avoid the tells in `SKILL.md`'s quick-reference table.
The skill triggers on prose of a paragraph or more; it is not meant to
fire on a one-line commit subject or a chat reply. If it doesn't
trigger: for the symlink method, confirm it resolves
(`ls -la ~/.claude/skills/humanizing-writing`); for `--plugin-dir`,
confirm the flag points at this repo's root, not a subdirectory; for the
marketplace method, run `/plugin list` and confirm
`humanizing-writing@humanize-writing-skill` shows as enabled.

**Uninstalling.** Symlink: remove it
(`rm ~/.claude/skills/humanizing-writing`). `--plugin-dir`: drop the
flag. Marketplace install: `/plugin uninstall humanizing-writing@humanize-writing-skill`,
and `/plugin marketplace remove humanize-writing-skill` if you added the
marketplace only for this. None of these leave other state behind. To
disable it for one request without uninstalling, tell Claude directly.
Per `SKILL.md`'s own "Scope" section, an explicit user instruction
overrides the skill's defaults.

## What's in here

```
.claude-plugin/plugin.json     # plugin manifest (validated, claude plugin validate . --strict)
.claude-plugin/marketplace.json # self-hosted marketplace, one plugin: this one
SKILL.md                       # the skill itself, lean and always-loadable
CHANGELOG.md                   # what changed each version, and why
reference/research.md          # research synthesis: what the literature actually says
reference/research/2026-update.md # newer sources behind 2.0.0, and the 1.x claims they weakened
reference/claude-tics.md       # habits of current Claude models, dated, with evidence tiers
reference/oss-skills-review.md # teardown of 13 existing public humanizer skills
reference/research/            # raw, fully-cited research reports (academic, editorial, tells catalog, OSS survey)
reference/validation-note.md   # blind comparison against no skill and against 1.1.1, with the losses
reference/validation-2.0.0/    # the blind pairs, the key, both judges' answers, the adversarial review
examples/                      # worked before/after passages with annotated fixes
voices/                        # an example voice profile: one author's habits as numbers and descriptions, no quoted text
scripts/measure.py             # descriptive prose metrics for comparing passages (stdlib, no verdicts)
```

`SKILL.md` stays short on purpose: it loads into context whenever the
skill triggers. The `reference/` directory carries the depth: full source
citations, credibility notes, and the reasoning behind every design
decision, so nothing in `SKILL.md` has to be taken on faith.

## Research

`reference/research.md` is the entry point, with
`reference/research/2026-update.md` as its correction for current
models. The first is a synthesis of stylometry and
AI-text-detection research (DetectGPT, Binoculars, watermarking studies,
lexical-marker research on the "delve" phenomenon), Wikipedia's
crowd-audited "Signs of AI Writing" essay, and classic prose craft guidance
(Orwell, Strunk & White). It also documents where "sound human" advice
conflicts with good writing and resolves in favor of the latter: this
skill never bans ordinary correct vocabulary, never states an invented
numeric threshold, and never asks Claude to add unearned specifics.

## Something read wrong, or didn't apply?

This skill makes judgment calls, and judgment calls are sometimes wrong.
A prior adversarial round caught it stripping a marketing page's closing
line before that got fixed (`reference/validation-note.md` has the full
account, including the miss). If it mangles something, [open an
issue](https://github.com/AshwinSathian/humanize-writing-skill/issues)
with the before/after text; that's more useful than a star. Pull requests
that add a sourced tell, a genre gap, or a false-positive case are
welcome. The bar is the same one this skill holds itself to: trace it to
something real, not a hunch.

## License

MIT. See `LICENSE`.
