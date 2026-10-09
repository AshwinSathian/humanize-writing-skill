import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { faqs } from '@/lib/content'
import { breadcrumb, pageMeta, site } from '@/lib/site'

const description =
  'Answers about the humanizing-writing skill for Claude Code: whether it gets past AI detectors (it does not), how it differs from blader/humanizer, how to install it, and how it was tested.'

export const metadata = pageMeta('FAQ: detectors, install, and how it differs', description, '/faq')

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${site.url}/faq#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FaqPage() {
  return (
    <>
      <header className="page-head">
        <h1>Questions and answers</h1>
        <p className="lede">
          The short version: it makes Claude&rsquo;s prose read well to a person, it does not change AI-detector scores,
          and it&rsquo;s free.
        </p>
      </header>

      <section className="row">
        <div className="body">
          {faqs.map((f) => (
            <div className="qa" key={f.q}>
              <h2>{f.q}</h2>
              <p>{f.a}</p>
              {f.more && (
                <p style={{ marginTop: '0.6rem' }}>
                  <Link href={f.more.href}>{f.more.label}</Link>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumb('FAQ', '/faq')} />
    </>
  )
}
