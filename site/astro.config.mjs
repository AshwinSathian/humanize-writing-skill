// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Cloudflare Pages serves dist/ from its edge: every page is a file, no adapter, no request-time code.
// After the build, the hashed names of the two Bricolage cuts replace __FONT__ and __DISPLAY__ in dist/_headers, so
// the Link headers can start both downloads (103 Early Hints) before the HTML has finished arriving.
const headers = {
  name: 'font-link-header',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const root = fileURLToPath(dir)
      const files = fs.readdirSync(path.join(root, '_astro'))
      const find = (re) => {
        const f = files.find((n) => re.test(n))
        if (!f) throw new Error(`No font matching ${re} in dist/_astro: the Link header has nothing to preload`)
        return `/_astro/${f}`
      }
      const text = find(/^bricolage-grotesque\.[^.]+\.woff2$/)
      const display = find(/^bricolage-grotesque-display\.[^.]+\.woff2$/)
      const file = path.join(root, '_headers')
      fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replaceAll('__FONT__', text).replaceAll('__DISPLAY__', display))
    },
  },
}

export default defineConfig({
  site: 'https://humanize.ashwinsathian.com',
  output: 'static',
  trailingSlash: 'never',
  // /tells is dist/tells.html, the same URLs the Next.js export served.
  build: { format: 'file', inlineStylesheets: 'always' },
  // Prefetching is src/scripts/prefetch.ts, with the navigation feedback, not Astro's separate script.
  prefetch: false,
  devToolbar: { enabled: false },
  integrations: [sitemap({ serialize: (item) => ({ ...item, lastmod: new Date().toISOString().slice(0, 10) }) }), headers],
  // The CSP forbids inline scripts and data: fonts, so nothing is inlined as a data: URI.
  vite: { build: { assetsInlineLimit: 0 } },
})
