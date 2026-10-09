import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

// Everything is public, including to AI crawlers: being quoted by an
// answer engine is the point of the site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
