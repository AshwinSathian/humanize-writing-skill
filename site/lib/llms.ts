import { compareRows, faqs, tellGroups } from './content'
import { loadExamples } from './examples'
import { install, readRepo, site } from './site'

const pages = [
  ['/', 'Overview', 'What the skill is, a marked-up example, the rules in brief, test results, install commands.'],
  ['/tells', 'AI writing tells in 2026', 'Each tell with its source, sorted by strength of evidence, and why fixing tells does not fool a detector.'],
  ['/examples', 'Before and after', 'Four worked rewrites with a note on every change.'],
  ['/research', 'Testing', 'The blind comparison: method, results, losses, limits.'],
  ['/compare', 'Comparison', 'Against blader/humanizer, avoid-ai-writing, stop-slop, and no-ai-slop.'],
  ['/faq', 'FAQ', 'Detectors, install, other models, other languages.'],
]

const summary = `# ${site.name}

> ${site.description}

- Version: ${site.version} (released ${site.released})
- Licence: MIT, free
- Author: ${site.author} (${site.authorUrl})
- Source: ${site.repo}
- Install: \`${install.skills}\`
- It applies while Claude is writing. It is not a detector-evasion tool and does not change AI-detector scores.
- Tested on Claude Haiku, Sonnet, and Opus, in English, in two blind rounds (18 pairs). With Sonnet and Opus writing (version 2.0.0), two Claude judges each preferred the skill's text to no-skill text in 5 of 6 pairs. With Haiku writing (version 2.1.0), three Claude judges each preferred it in 3 of 3.
- Known limit: on four held-out tasks addressed to a team, 2 of 9 passages written with the skill stated something about that team that the task had not supplied. A reworded rule was tested under a pre-registered bar (reference/held-out-invention-test/) and not adopted. Readers should check claims a draft makes about their own team or system.`

export const llmsTxt = () => `${summary}

## Pages

${pages.map(([path, name, about]) => `- [${name}](${site.url}${path}): ${about}`).join('\n')}

## Source files

- [SKILL.md](${site.repo}/blob/main/SKILL.md): the skill itself
- [Validation note](${site.repo}/blob/main/reference/validation-note.md): the blind test, with losses and limits
- [2026 research update](${site.repo}/blob/main/reference/research/2026-update.md): sources for the current rules
- [Changelog](${site.repo}/blob/main/CHANGELOG.md)

## Full text

- [llms-full.txt](${site.url}/llms-full.txt): the skill, the FAQ, the tells, the comparison, and the examples in one file
`

export const llmsFullTxt = () => `${summary}

## Install

\`\`\`
${install.skills}
\`\`\`

Or inside Claude Code:

\`\`\`
${install.plugin}
\`\`\`

Or as a symlinked clone:

\`\`\`
${install.symlink}
\`\`\`

## Questions and answers

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

## AI writing tells in 2026

${tellGroups
  .map(
    (g) =>
      `### ${g.title}\n\n${g.intro}\n\n${g.tells
        .map((t) => `- **${t.name}**${t.example ? ` (${t.example})` : ''}. ${t.note} Source: ${t.source.label}, ${t.source.href}`)
        .join('\n')}`,
  )
  .join('\n\n')}

## Compared with other humanizer skills (surveyed October 2026)

${compareRows
  .map((r) => `- **${r.name}**. Runs: ${r.runs}. Built on: ${r.mechanism}. Genre and voice: ${r.scope}. Testing: ${r.test}.${r.better ? ` Better choice when you want: ${r.better}` : ''}`)
  .join('\n')}

## Worked examples

${loadExamples()
  .map((e) => `### ${e.title}\n\nBefore: ${e.before}\n\nAfter: ${e.after}`)
  .join('\n\n')}

## The skill, verbatim (SKILL.md)

${readRepo('SKILL.md').replace(/^---[\s\S]*?---\n/, '')}`
