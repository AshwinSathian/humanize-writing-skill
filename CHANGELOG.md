# Changelog

## 1.1.1

Audited the repo against Anthropic's actual plugin submission
requirements (manifest schema, directory structure, validation, security
surface) ahead of a community-marketplace submission attempt. Nothing
needed fixing there. The manifest was already fully compliant, `claude
plugin validate . --strict` already passed clean, and the plugin has
zero executable surface (no hooks, MCP/LSP servers, or scripts).

The submission itself turned out to require going through Anthropic's
Console, which gates access behind purchasing usage credits. Rather than
pay for that, added `.claude-plugin/marketplace.json`, making this repo
its own self-hosted plugin marketplace: `/plugin marketplace add
AshwinSathian/humanize-writing-skill` then `/plugin install
humanizing-writing@humanize-writing-skill` installs it directly from
GitHub, no Anthropic review, account, or cost involved. Verified
end-to-end locally (add, install, uninstall) before shipping it.

## 1.1.0

Two adversarial review rounds against the shipped 1.0.0 skill, both
verified with fresh, independently skeptical subagents rather than
assumed to work once the text was written.

**Genre and voice scoping** (the larger change): 1.0.0's rules for
sentence-rhythm variation, avoiding templated structure, and cutting
hedge language were correct for discursive essay prose but stated as if
universal. Red-team testing found they actively regressed output in
API/reference docs (broke required parallel structure), legal
boilerplate (stripped enforceability-critical enumerations and hedges),
marketing copy (cut the persuasive close), fiction ("never invent
facts" bled hedging into invented narration), non-English text
(English-only tell vocabulary misapplied), and edits to someone else's
already-human prose (overwrote their voice). Added a `## Scope` section
to `SKILL.md` with explicit, checkable carve-outs for each case, plus a
rule to match an already-established voice or convention before
defaulting to the skill's own shape.

**Explicit user-instruction priority.** Testing found that when a user
explicitly asks for something the skill would normally flag (house-style
buzzwords, a mandated template, a policy-required phrase), the correct
behavior only happened via reasoning entirely outside the skill's own
text. Added an explicit bullet: a specific user request overrides these
defaults.

**Research currency.** Verified all cited sources (12 checked, including
several from after a typical model's training cutoff), and none were
fabricated or misattributed, though two specific figures couldn't be
independently re-confirmed behind paywalls and are now flagged as such
rather than stated as flat fact. Added a July 2026 cross-model study
(*The Economist*) that narrows the em-dash tell specifically: of the
four models tested, only Claude, the model this skill runs on, still
exceeds human em-dash frequency.

**Documentation standards.** Added tables of contents to every reference
file over 100 lines, per Anthropic's own skill-authoring checklist.

## 1.0.0

Initial release. Built from three research passes (academic detection
literature, editorial/practitioner style guides, a cross-referenced
catalog of 27 AI-writing tells) and a teardown of 13 existing public
"humanizer" skills. Weights structural guidance (vary rhythm, commit to
specific claims, avoid templated structure) above a banned-word list,
which the research found to be the field's dominant and most brittle
mechanism.
