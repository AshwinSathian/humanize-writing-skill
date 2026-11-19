import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { marked } from 'marked'
import { REPO_ROOT, readRepo } from './site'

export type Example = {
  file: string
  title: string
  intro: string
  before: string
  after: string
  notesHtml: string
}

const flat = (s: string) => s.replace(/\s+/g, ' ').trim()

// Repo-relative file mentions (`reference/...`, `SKILL.md`) mean nothing on
// the site, so the notes keep them as plain code.
export function loadExamples(): Example[] {
  return readdirSync(join(REPO_ROOT, 'examples'))
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const file = `examples/${f}`
      const [head, ...sections] = readRepo(file).split(/^## /m)
      const section = (name: string) => {
        const hit = sections.find((s) => s.startsWith(name))
        if (!hit) throw new Error(`${file}: no "## ${name}" section`)
        return hit.slice(hit.indexOf('\n') + 1).trim()
      }
      const [titleLine, ...introLines] = head.trim().split('\n')
      return {
        file,
        title: titleLine.replace(/^# Example \d+: /, ''),
        intro: flat(introLines.join(' ')),
        before: flat(section('Before')),
        after: flat(section('After')),
        notesHtml: marked.parse(section('What changed'), { async: false }),
      }
    })
}
