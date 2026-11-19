// Run after `astro build`. Checks what crawlers, the CSP and the edge see: every page has one h1, a canonical, a sane
// title and description, parseable JSON-LD, no inline script; every internal link and image resolves; the headers
// file covers every page; the sitemap lists them.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { withoutBlocks } from './html.mjs'

const DIST = 'dist'
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))
const pages = walk(DIST).filter((f) => f.endsWith('.html') && !f.endsWith('404.html'))
const exists = (url) => {
  const p = url.split('#')[0].split('?')[0]
  if (p === '/' || p === '') return true
  return [p, `${p}.html`, `${p}/index.html`].some((c) => fs.existsSync(path.join(DIST, c)))
}
const route = (f) => f.replace(DIST, '').replace(/\.html$/, '').replace(/^\/index$/, '/')

// Six pages: home, tells, examples, research, compare, faq (404 is excluded above).
test('dist has every page', () => assert.equal(pages.length, 6))

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8')
  const name = route(file)
  test(`${name}: head`, () => {
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? ''
    const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ''
    assert.ok(title.length > 10 && title.length <= 95, `title length ${title.length}: ${title}`)
    assert.ok(desc.length >= 60 && desc.length <= 300, `description length ${desc.length}`)
    assert.match(html, /<link rel="canonical" href="https:\/\/humanize\.ashwinsathian\.com[^"]*"/)
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, 'exactly one h1')
    assert.match(html, /<html lang="en-GB"/)
    assert.match(html, /<meta property="og:image" content="https:\/\/humanize\.ashwinsathian\.com\/og\/[a-z-]+\.png"/)
  })
  test(`${name}: json-ld`, () => {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    assert.ok(blocks.length >= 1)
    for (const [, json] of blocks) JSON.parse(json)
  })
  test(`${name}: no inline script (the CSP forbids it)`, () => {
    for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script[^>]*>/gi)) {
      if (/application\/ld\+json/.test(attrs)) continue
      assert.ok(/\ssrc="/.test(attrs) && body.trim() === '', `inline script: ${body.slice(0, 60)}`)
    }
  })
  test(`${name}: no link glued to the word before or after it`, () => {
    const body = withoutBlocks(html)
    const glued = [...body.matchAll(/[A-Za-z0-9)](<a[ >][^>]*>[^<]*)|(<\/a>)[A-Za-z(]/g)].map((m) => m[0].slice(0, 40))
    assert.deepEqual(glued, [])
  })
  test(`${name}: links and images`, () => {
    for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"/][^"]*|\/)"/g)) assert.ok(exists(href), `broken: ${href}`)
    for (const [, alt] of html.matchAll(/<img[^>]*?alt="([^"]*)"/g)) assert.ok(alt.length > 0)
    for (const [tag] of html.matchAll(/<img[^>]*>/g)) assert.match(tag, /width="\d+"[^>]*height="\d+"|height="\d+"[^>]*width="\d+"/, 'img without dimensions shifts the layout')
  })
}

test('_headers gives every page a cache rule and the security headers', () => {
  const headers = fs.readFileSync(path.join(DIST, '_headers'), 'utf8')
  for (const f of pages) {
    const r = route(f)
    const rules = [...headers.matchAll(/^(\/\S*)\n(?:  .*\n)+/gm)].map((m) => m[1])
    const covered = rules.some((rule) => rule === r || (rule.endsWith('/*') && r.startsWith(rule.slice(0, -1))))
    assert.ok(covered, `no cache rule for ${r}`)
  }
  for (const h of ['Content-Security-Policy', 'X-Content-Type-Options', 'Strict-Transport-Security', 'Speculation-Rules'])
    assert.ok(headers.includes(h), `missing ${h}`)
  assert.match(headers, /script-src 'self';/)
  assert.ok(!/script-src[^;]*unsafe-inline/.test(headers), 'script-src allows inline scripts')
})

test('sitemap lists every page', () => {
  const xml = fs.readFileSync(path.join(DIST, 'sitemap-0.xml'), 'utf8')
  for (const f of pages) {
    const r = route(f)
    assert.ok(xml.includes(`<loc>https://humanize.ashwinsathian.com${r === '/' ? '/' : r}</loc>`), `${r} is not in the sitemap`)
  }
})

test('every social card exists and is a PNG', () => {
  for (const f of pages) {
    const card = fs.readFileSync(f, 'utf8').match(/og:image" content="https:\/\/humanize\.ashwinsathian\.com(\/og\/[a-z-]+\.png)"/)[1]
    const b = fs.readFileSync(path.join(DIST, card))
    assert.equal(b.subarray(1, 4).toString(), 'PNG', card)
  }
  assert.equal(fs.readFileSync(path.join(DIST, 'og.png')).subarray(1, 4).toString(), 'PNG', '/og.png keeps working for cached link previews')
})

test('the text files for agents carry the skill', () => {
  const full = fs.readFileSync(path.join(DIST, 'llms-full.txt'), 'utf8')
  const skill = fs.readFileSync('../SKILL.md', 'utf8').replace(/^---[\s\S]*?---\n/, '')
  assert.ok(full.includes(skill.slice(0, 400)), 'llms-full.txt does not quote SKILL.md')
  assert.match(fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/humanize\.ashwinsathian\.com\/sitemap-index\.xml/)
})

test('every picture ships as AVIF and WebP with its credit in the footer', () => {
  const credits = JSON.parse(fs.readFileSync('src/assets/archive/credits.json', 'utf8'))
  const home = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
  assert.ok((home.match(/<picture>/g) ?? []).length >= 6, 'fewer than six pictures on the home page')
  assert.match(home, /type="image\/avif"/)
  for (const c of credits) assert.ok(home.includes(c.page.replace(/&/g, '&amp;')), `no credit link for ${c.file}`)
})
