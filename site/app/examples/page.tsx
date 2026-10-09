import { JsonLd } from '@/components/JsonLd'
import { loadExamples } from '@/lib/examples'
import { blob, breadcrumb, pageMeta } from '@/lib/site'

const title = 'Before and after: four AI-toned drafts, rewritten'
const description =
  'Four worked rewrites from the humanizing-writing skill, two in the 2023 style and two in the 2026 style, with a note on every change and on what the earlier version of each rewrite got wrong.'

export const metadata = pageMeta(title, description, '/examples')

export default function Examples() {
  const examples = loadExamples()
  return (
    <>
      <header className="page-head">
        <h1>{title}</h1>
        <p className="lede">
          Each rewrite below removes the machine habits from a draft and adds no fact the draft didn&rsquo;t have. The
          first two start from the 2023 style, the third is all fragments and &ldquo;load-bearing&rdquo;, and the fourth
          is a single 61-word sentence. They&rsquo;re read straight from the{' '}
          <a href={blob('examples')}>examples folder</a> of the repository.
        </p>
      </header>

      {examples.map((ex, i) => (
        <article className="example" key={ex.file} aria-labelledby={`ex-${i + 1}`}>
          <h2 id={`ex-${i + 1}`}>{ex.title}</h2>
          {ex.intro && <p style={{ marginTop: '0.8rem', maxWidth: '41rem' }}>{ex.intro.replace(/`/g, '')}</p>}
          <div className="pair">
            <div className="before">
              <h3>Before</h3>
              <p className="specimen">{ex.before}</p>
            </div>
            <div className="after">
              <h3>After</h3>
              <p className="specimen">{ex.after}</p>
            </div>
          </div>
          <h3>What changed, and why</h3>
          <div
            className="prose"
            style={{ maxWidth: '41rem', marginTop: '0.8rem' }}
            dangerouslySetInnerHTML={{ __html: ex.notesHtml }}
          />
        </article>
      ))}

      <JsonLd data={breadcrumb('Examples', '/examples')} />
    </>
  )
}
