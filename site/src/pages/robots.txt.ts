import { site } from '../lib/site'

// Everything is public, including to AI crawlers: being quoted by an answer engine is the point of the site.
export const GET = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
