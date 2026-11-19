import fs from 'node:fs'
import path from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

// Satori reads TTF/OTF/WOFF, not WOFF2, so the cards use the static fontsource files. This runs at build time only:
// the cards are plain PNGs on the edge, set in the same typeface as the site.
const file = (name: string) => fs.readFileSync(path.resolve('node_modules/@fontsource/bricolage-grotesque/files', name))
const fonts = ([400, 700, 800] as const).map((weight) => ({
  name: 'Bricolage Grotesque',
  data: file(`bricolage-grotesque-latin-${weight}-normal.woff`),
  weight,
  style: 'normal' as const,
}))

const C = { paper: '#f2f4f3', sheet: '#ffffff', ink: '#16181d', muted: '#4f5561', blue: '#2347c5', red: '#c42d26', redWash: '#c42d2617', blueWash: '#2347c514' }

type Node = { type: string; props: Record<string, unknown> }
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
})

const mark = (size: number) => ({
  type: 'svg',
  props: {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    children: [
      { type: 'rect', props: { x: 1.5, y: 1.5, width: 29, height: 29, rx: 3, fill: C.sheet } },
      { type: 'path', props: { d: 'M7 10h18M7 22h12', stroke: C.ink, strokeWidth: 2.6, strokeLinecap: 'round' } },
      { type: 'path', props: { d: 'M5 16h22', stroke: C.red, strokeWidth: 2.6, strokeLinecap: 'round' } },
    ],
  },
})

const png = async (tree: Node) => {
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts })
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
}

const frame = (children: unknown[]) =>
  h('div', { width: 1200, height: 630, boxSizing: 'border-box', flexDirection: 'column', justifyContent: 'space-between', padding: '56px 64px', background: C.paper, color: C.ink, fontFamily: 'Bricolage Grotesque' }, children)

const top = (label: string) =>
  h('div', { alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }, [
    mark(36),
    h('span', {}, 'humanizing-writing'),
    h('span', { marginLeft: 'auto', fontSize: 22, fontWeight: 700, color: C.muted }, label),
  ])

const struck = (t: string) => h('span', { color: C.muted, textDecoration: 'line-through', textDecorationColor: C.red, background: C.redWash }, t)
const kept = (t: string) => h('span', { background: C.blueWash, borderBottom: `3px solid ${C.blue}` }, t)

/** The home card: the headline and a sheet with the edit the home page walks through. */
const home = () =>
  png(
    frame([
      top('A Claude Code skill'),
      h('div', { fontSize: 92, lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 800 }, 'Edit Claude before it writes.'),
      h('div', { background: C.sheet, padding: '26px 32px', gap: 40, alignItems: 'center' }, [
        h('div', { flexDirection: 'column', gap: 6, fontSize: 27, lineHeight: 1.4, width: 760 }, [
          h('div', { gap: 8, flexWrap: 'wrap' }, [h('span', {}, 'Rate limiting'), struck('plays a crucial role in maintaining stability'), h('span', {}, 'of modern APIs.')]),
          h('div', { gap: 8, flexWrap: 'wrap' }, [kept('A single misbehaving client overwhelms shared resources.')]),
        ]),
        h('div', { flexDirection: 'column', gap: 10, fontSize: 21, lineHeight: 1.3, color: C.red, width: 260 }, [
          h('span', {}, '1  Says it matters and not why.'),
          h('span', { color: C.blue }, '5  The mechanism. Lead with it.'),
        ]),
      ]),
    ]),
  )

const title = (label: string, heading: string, blurb: string) =>
  png(
    frame([
      top(label),
      h('div', { flexDirection: 'column', maxWidth: 1000 }, [
        h('div', { fontSize: heading.length > 40 ? 68 : 86, lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }, heading),
        h('div', { marginTop: 26, fontSize: 28, color: C.muted, lineHeight: 1.35 }, blurb),
      ]),
      h('div', { justifyContent: 'space-between', fontSize: 24, color: C.muted, fontWeight: 700 }, [
        h('span', {}, 'humanize.ashwinsathian.com'),
        h('span', { color: C.blue }, 'tested blind, losses published'),
      ]),
    ]),
  )

const pages: Record<string, [label: string, heading: string, blurb: string]> = {
  tells: ['Tells', 'AI writing tells in 2026', 'Long noun-built sentences, metaphor for plain statement, one-line closers. Each with its source.'],
  examples: ['Examples', 'Four drafts, rewritten', 'Before and after, with a note on every change and on what earlier rewrites got wrong.'],
  research: ['Testing', 'How it was tested, and where it lost', 'Blind pairs on Haiku, Sonnet and Opus, a pre-registered rule test, and the limits.'],
  compare: ['Compare', 'Against other humanizer skills', 'When blader/humanizer, avoid-ai-writing, stop-slop or no-ai-slop is the better choice.'],
  faq: ['FAQ', 'Questions and answers', 'Detectors, install, voice, invention, and how far to trust the tests.'],
}

export const cardNames = ['site', ...Object.keys(pages)]
export const card = (name: string) => (name === 'site' ? home() : title(...pages[name]!))
