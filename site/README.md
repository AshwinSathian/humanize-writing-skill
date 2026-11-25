# humanizing-writing site

The website at <https://humanize.ashwinsathian.com>. Not part of the skill. Astro, every page prerendered to a file, served by Cloudflare Pages: no adapter, no request-time code.

```
npm install
npm run dev        # http://localhost:4322
npm test           # astro check, build, then tests/*.test.mjs against dist/
npm run deploy     # build + wrangler pages deploy
```

Everything the site quotes (SKILL.md, the examples, the test results) is read from `skills/humanizing-writing/` at build time, so the pages cannot drift from the skill. The live edit on the home page fails the build if its segments stop matching `examples/before-after-2.md`.

## Design

An editor's proof: paper, ink, a red pencil for what is cut and a blue pencil for what is kept and where a claim comes from. The home page is built as one sentence with a picture of a corrected typescript where a word would be, then a paragraph edited in four stages, which a visitor can also run on their own text. The marker in `src/lib/patterns.ts` uses the same expressions as `skills/humanizing-writing/scripts/measure.py`; it marks and gives no verdict.

The pictures are archival and openly licensed, listed in `src/assets/archive/credits.json` and credited in the footer of every page.

## Why it loads fast

- Bricolage Grotesque for all text, in two cuts made by `tools/cut-fonts.sh`: a variable text cut (weights 400-800, about 26 KB) and a static condensed cut for h1 and h2 (about 13 KB). One file with both axes would be 50 KB, past the point where a font needs a third round trip. Code is the one exception, in JetBrains Mono (about 8 KB), fetched only on a page that has code. Metric-matched fallbacks keep the swap from moving the layout.
- Both Bricolage cuts are preloaded by HTTP `Link` headers, so Cloudflare can send them as 103 Early Hints. `astro.config.mjs` writes the hashed file names into `dist/_headers`.
- CSS is inline: no stylesheet request. JavaScript is small modules with no framework, and every interactive part works first as HTML (the four stages are a radio group).
- Pictures are AVIF and WebP at several widths, with dimensions set, from `astro:assets`.
- Pages are `max-age=60, stale-while-revalidate=600`; `/_astro/*` is immutable.
- Speculation Rules prefetch the nav pages and prerender on hover; `src/scripts/prefetch.ts` covers Safari and touch. View transitions are CSS only.
- Social cards are generated at build time (satori + resvg) in the same typeface.

## Checks

`tests/` fails the build on: a font other than the two faces, a glyph missing from a cut (headings are checked against the display cut), a font over its budget, home HTML over 24 KB gzipped, a stylesheet link, an inline script, a missing canonical or h1, broken links, an `<img>` without dimensions, a page missing from `_headers` or the sitemap, fewer than six pictures on the home page or a picture without its credit, and an `llms-full.txt` that no longer quotes SKILL.md.

`python3 -I tools/measure-site.py` recounts the prose numbers in the home page's colophon after a build.
