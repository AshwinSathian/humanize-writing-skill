import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Newsreader } from 'next/font/google'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { baseGraph, blob, nav, ogImage, site } from '@/lib/site'
import './globals.css'

const sans = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-sans',
})

const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
  variable: '--font-serif',
})

const title = 'humanizing-writing: a Claude Code skill for prose that reads as written by a person'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.authorUrl }],
  creator: site.author,
  keywords: [
    'Claude Code skill',
    'humanize AI writing',
    'AI humanizer',
    'AI writing tells',
    'Claude skill',
    'SKILL.md',
    'AI slop',
    'technical writing',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title,
    description: site.description,
    url: '/',
    locale: 'en_GB',
    images: [ogImage],
  },
  twitter: { card: 'summary_large_image', title, description: site.description, images: [ogImage.url] },
  robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f4f3' },
    { media: '(prefers-color-scheme: dark)', color: '#121418' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="wrap">
          <header className="masthead">
            <Link className="wordmark" href="/">
              {site.name}
            </Link>
            <nav aria-label="Main">
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <li>
                  <a href={site.repo}>GitHub</a>
                </li>
              </ul>
            </nav>
          </header>
          <main id="main">{children}</main>
          <footer className="colophon-foot">
            <ul>
              <li>
                <a href={site.repo}>Source on GitHub</a>
              </li>
              <li>
                <a href={blob('SKILL.md')}>SKILL.md</a>
              </li>
              <li>
                <a href={blob('CHANGELOG.md')}>Changelog</a>
              </li>
              <li>
                <a href={`${site.repo}/issues`}>Report a bad rewrite</a>
              </li>
              <li>
                <a href="/llms.txt">llms.txt</a>
              </li>
            </ul>
            <p>
              Version {site.version}, MIT licence. Built by <a href={site.authorUrl}>{site.author}</a>. Every page on
              this site was written with the skill.
            </p>
          </footer>
        </div>
        <JsonLd data={baseGraph} />
      </body>
    </html>
  )
}
