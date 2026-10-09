import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Repo root is one level above site/. Everything the site quotes from the
// skill is read from there at build time so it cannot drift.
export const REPO_ROOT = join(process.cwd(), '..')
export const readRepo = (path: string) => readFileSync(join(REPO_ROOT, path), 'utf8')

const plugin = JSON.parse(readRepo('.claude-plugin/plugin.json')) as { version: string }

export const site = {
  name: 'humanizing-writing',
  url: 'https://humanize.ashwinsathian.com',
  repo: 'https://github.com/AshwinSathian/humanize-writing-skill',
  version: plugin.version,
  released: '2026-10-09',
  updated: '2026-10-10',
  author: 'Ashwin Sathian',
  authorUrl: 'https://ashwinsathian.com/',
  description:
    'A Claude Code skill that guides how Claude writes prose so it does not read as machine-written. Rules on claims, sentence shape, and endings from 2026 research, tested blind. Does not change AI-detector scores.',
}

export const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'A paragraph marked up by an editor: tells struck through in red, notes in the margin.',
}

export const blob = (path: string) => `${site.repo}/blob/main/${path}`

export const nav = [
  { href: '/tells', label: 'Tells' },
  { href: '/examples', label: 'Examples' },
  { href: '/research', label: 'Testing' },
  { href: '/compare', label: 'Compare' },
  { href: '/faq', label: 'FAQ' },
]

export const install = {
  skills: 'npx skills add AshwinSathian/humanize-writing-skill',
  plugin:
    '/plugin marketplace add AshwinSathian/humanize-writing-skill\n/plugin install humanizing-writing@humanize-writing-skill',
  symlink:
    'git clone https://github.com/AshwinSathian/humanize-writing-skill.git\nln -s "$(pwd)/humanize-writing-skill" ~/.claude/skills/humanizing-writing',
}

const ids = {
  site: `${site.url}/#website`,
  person: `${site.url}/#author`,
  software: `${site.url}/#software`,
}

// Sitewide graph: emitted once in the root layout. Pages add their own
// nodes and point back at these by @id.
export const baseGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': ids.site,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: 'en-GB',
      publisher: { '@id': ids.person },
    },
    {
      '@type': 'Person',
      '@id': ids.person,
      name: site.author,
      url: site.authorUrl,
      sameAs: ['https://github.com/AshwinSathian'],
    },
    {
      '@type': ['SoftwareApplication', 'SoftwareSourceCode'],
      '@id': ids.software,
      name: site.name,
      alternateName: ['humanize-writing-skill', 'Humanizing Writing'],
      description: site.description,
      url: site.url,
      codeRepository: site.repo,
      softwareVersion: site.version,
      dateModified: site.released,
      license: 'https://opensource.org/licenses/MIT',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux, Windows',
      softwareRequirements: 'Claude Code',
      programmingLanguage: 'Markdown',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@id': ids.person },
    },
  ],
}

export const breadcrumb = (name: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: site.name, item: site.url },
    { '@type': 'ListItem', position: 2, name, item: site.url + path },
  ],
})

export const article = (headline: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  '@id': `${site.url}${path}#article`,
  headline,
  description,
  url: site.url + path,
  datePublished: site.updated,
  dateModified: site.updated,
  inLanguage: 'en-GB',
  author: { '@id': ids.person },
  publisher: { '@id': ids.person },
  about: { '@id': ids.software },
  isPartOf: { '@id': ids.site },
})

export const pageMeta = (title: string, description: string, path: string) => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: 'article' as const, siteName: site.name, locale: 'en_GB', images: [ogImage] },
  twitter: { card: 'summary_large_image' as const, title, description, images: [ogImage.url] },
})
