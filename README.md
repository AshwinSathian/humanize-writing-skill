# humanizing-writing

A Claude Code skill that changes how Claude writes — prose, docs, comments,
commit messages, reports — so the output reads as a specific, considered
human voice instead of generic, templated, AI-shaped text.

It's built from three research passes (academic detection literature,
editorial/practitioner style guides, and a cross-referenced catalog of 27
specific AI-writing tells), a teardown of 13 existing public "humanizer"
skills, and one adversarial review round. Full sourcing lives in
`reference/`, not folk wisdom.

## Why this one

Most public humanizer skills reduce to a banned-word list: swap "delve" for
something else, cap em dashes, and call it done. That works until the list
goes stale — and per the research this skill is built on, it goes stale
fast (`reference/research.md` §3). Word-level tells are real, but the
literature is clear that structural uniformity — flat sentence rhythm,
symmetric paragraph shapes, safe generic claims instead of specific
checkable ones — is the larger, more durable, more model-independent
signal. This skill weights structure over vocabulary. The word list is
still here, as a compact quick reference, but it's the backup, not the
mechanism.

See `reference/oss-skills-review.md` for the full teardown of what other
public skills in this space get right and wrong, and exactly what this one
does differently as a result.

## Install

**As a skill** — clone the repo, then symlink it into your Claude Code
skills directory:

```bash
git clone https://github.com/AshwinSathian/humanize-writing-skill.git
ln -s "$(pwd)/humanize-writing-skill" ~/.claude/skills/humanizing-writing
```

The symlink means editing the cloned repo updates the live skill directly —
pull to update, no reinstall step.

**As a plugin** — the repo also ships a `.claude-plugin/plugin.json`
manifest (`claude plugin validate .` passes in strict mode). Try it without
installing anything:

```bash
claude --plugin-dir /path/to/humanize-writing-skill
```

Once submitted and approved for Claude Code's community plugin marketplace,
`/plugin install humanizing-writing@claude-community` will work directly.

**Via skills.sh:**

```bash
npx skills add AshwinSathian/humanize-writing-skill
```

## What's in here

```
.claude-plugin/plugin.json     # plugin manifest (validated, claude plugin validate . --strict)
SKILL.md                       # the skill itself — lean, always-loadable
reference/research.md          # research synthesis: what the literature actually says
reference/oss-skills-review.md # teardown of 13 existing public humanizer skills
reference/research/            # raw, fully-cited research reports (academic, editorial, tells catalog, OSS survey)
reference/validation-note.md   # before/after samples confirming the skill changes output
examples/                      # worked before/after passages with annotated fixes
```

`SKILL.md` stays short on purpose — it loads into context whenever the
skill triggers. The `reference/` directory carries the depth: full source
citations, credibility notes, and the reasoning behind every design
decision, so nothing in `SKILL.md` has to be taken on faith.

## Example

One of two worked examples in `examples/` (full annotations there):

**Before:**
> Rate limiting plays a crucial role in maintaining the stability and
> reliability of modern APIs. It's not just a defensive measure — it's a
> foundational component of good API design... Despite the added
> complexity it introduces, rate limiting remains a testament to
> thoughtful, resilient system design.

**After:**
> Rate limiting exists because one misbehaving client can take down an API
> for everyone else. A retry loop with no backoff, a scraper hitting the
> same endpoint a thousand times a second, a bug that turns one user
> action into ten thousand requests — any of these can exhaust a shared
> database connection pool in seconds... That complexity is cheaper than
> the outage it prevents.

Same information, no significance-inflation, no negative-parallelism
filler, no rule-of-three padding — the mechanism stated plainly instead.

## Research

`reference/research.md` is the entry point: a synthesis of stylometry and
AI-text-detection research (DetectGPT, Binoculars, watermarking studies,
lexical-marker research on the "delve" phenomenon), Wikipedia's
crowd-audited "Signs of AI Writing" essay, and classic prose craft guidance
(Orwell, Strunk & White). It also documents where "sound human" advice
conflicts with good writing and resolves in favor of the latter — this
skill never bans ordinary correct vocabulary, never states an invented
numeric threshold, and never asks Claude to add unearned specifics.

## License

MIT — see `LICENSE`.
