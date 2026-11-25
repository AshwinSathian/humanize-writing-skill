// The live marker on the home page. Its first five patterns are skills/humanizing-writing/scripts/measure.py's PATTERNS, ported as written, so
// the page marks what the repository measures. The others are phrases SKILL.md names. It marks; it gives no verdict,
// and it is not a detector: a single mark proves little, which is what the skill's own tells table says.
export type Mark = { id: string; note: string; rule: string; re: RegExp }

export const marks: Mark[] = [
  {
    id: 'negated_contrast',
    note: 'Denies something before saying it. Fine only if this reader believes the denied part.',
    rule: 'Deny X only when this reader is likely to believe X',
    re: /\b(?:is|are|was|were|does|do|did)n['’]t\b[^.!?]{0,80}?[,;—.]\s*(?:it|they|that|this)(?:['’]s|['’]re| is| are)\b|\bnot (?:just|only|merely|simply)\b|\bnot\b[^.!?,;]{1,60}?,? but\b|\bnot because\b/gi,
  },
  {
    id: 'ing_tail',
    note: 'A trailing “-ing” clause that attaches significance without evidence.',
    rule: 'Other tells: trailing “-ing” clause',
    re: /,\s+(?:\w+ly\s+)?\w{4,}ing\b[^.!?]*[.!?]/gi,
  },
  {
    id: 'stock_transition',
    note: 'A connector that would fit any text.',
    rule: 'Other tells: “Moreover”, “Furthermore”',
    re: /(?:^|(?<=[.!?]\s))(?:Moreover|Furthermore|Additionally|In conclusion|Overall|Ultimately),/gm,
  },
  {
    id: 'announcement',
    note: 'Announces a point before making it.',
    rule: 'Don’t announce a point before making it',
    re: /\b(?:Here['’]s the thing|Here['’]s why|The result\?|The catch\?|The cost is real|Let['’]s dive in|It['’]s worth noting(?: that)?|It['’]s important to note(?: that)?)/gi,
  },
  {
    id: 'inflation',
    note: 'Says it matters without saying why.',
    rule: 'Make claims specific and checkable',
    re: /\b(?:plays? an? (?:crucial|pivotal|key|vital|significant) role|a testament to|pivotal|cannot be overstated|in today['’]s [\w-]+(?: [\w-]+)? (?:world|landscape)|ever-evolving|tapestry|delve)\b/gi,
  },
  {
    id: 'candor',
    note: 'Announced candor. Hedge once, at the claim, or not at all.',
    rule: 'Hedge each uncertain claim once',
    re: /\b(?:honestly|frankly|to be clear|worth stating plainly)\b,?/gi,
  },
  {
    id: 'dash',
    note: 'An em dash. Keep it only for a break a comma would hide.',
    rule: 'Put asides in commas or parentheses',
    re: /\s?—\s?/g,
  },
]

export type Hit = { start: number; end: number; mark: Mark }

/** Every mark in the text, earliest first, with overlaps dropped (the first match wins). */
export const findMarks = (text: string): Hit[] => {
  const hits: Hit[] = []
  for (const mark of marks) for (const m of text.matchAll(mark.re)) hits.push({ start: m.index!, end: m.index! + m[0].length, mark })
  hits.sort((a, b) => a.start - b.start || b.end - a.end)
  const kept: Hit[] = []
  for (const h of hits) if (!kept.length || h.start >= kept[kept.length - 1].end) kept.push(h)
  return kept
}

const WORD = /[A-Za-z][A-Za-z'’-]*/g
const SENTENCE_END = /(?<=[.!?])["')\]]*\s+(?=["'(\[]*[A-Z0-9`])/

/** The counts measure.py reports first, for one paragraph or several. */
export const counts = (text: string) => {
  const sentences = text.split(SENTENCE_END).filter((s) => s.trim())
  const lengths = sentences.map((s) => (s.match(WORD) ?? []).length)
  const words = (text.match(WORD) ?? []).length
  return {
    words,
    sentences: sentences.length,
    mean: sentences.length ? Math.round((words / sentences.length) * 10) / 10 : 0,
    long: lengths.filter((n) => n >= 30).length,
    and: (text.match(/\band\b/gi) ?? []).length,
  }
}
