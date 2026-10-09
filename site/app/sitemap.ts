import type { MetadataRoute } from 'next'
import { nav, site } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', ...nav.map((n) => n.href)].map((path) => ({
    url: site.url + path,
    lastModified: site.updated,
    priority: path ? 0.8 : 1,
  }))
}
