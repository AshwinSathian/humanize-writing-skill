import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { sources, tellGroups } from '@/lib/content'
import { article, blob, breadcrumb, pageMeta } from '@/lib/site'

const title = 'AI writing tells in 2026, with a source for each'
const description =
  'What makes text read as AI-written in 2026: long noun-heavy sentences, metaphor for plain statement, one-line closers. Sorted by how strong the evidence is, with the 2023 tells that have faded.'

export const metadata = pageMeta(title, description, '/tells')

export default function Tells() {
  return (
    <>
      <header className="page-head">
        <h1>{title}</h1>
        <p className="lede">
          In 2026 the signs of AI writing are long sentences chained with &ldquo;and&rdquo;, nouns built from verbs,
          metaphor where a plain statement would do, and short closing lines written for effect. &ldquo;Delve&rdquo;
          has mostly gone. This page lists each tell with where it was measured or reported, and how far to trust it.
        </p>
      </header>

      <section className="row">
        <div className="body prose">
          <p>
            Two cautions before the list. A single tell proves little, since people write lists of three and closing
            lines too, and it&rsquo;s several together that make a reader suspicious. And none of this is a way to
            accuse someone. Shan, Lee, and Hao (EMNLP 2026) found that text a model edits has a much weaker footprint
            than text a model generates, so evidence about generated text shouldn&rsquo;t be turned on a person&rsquo;s
            edited draft.
          </p>
          <p>Last checked on 10 October 2026. The entries about specific Claude versions date fastest.</p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={sources.shan.href}>{sources.shan.label}</a>
          <a href={blob('reference/research/2026-update.md')}>Full notes: 2026-update.md</a>
          <a href={blob('reference/claude-tics.md')}>Claude habits by version: claude-tics.md</a>
        </aside>
      </section>

      {tellGroups.map((group) => (
        <section className="row" key={group.id} aria-labelledby={group.id}>
          <div className="body">
            <h2 id={group.id}>{group.title}</h2>
            <p>{group.intro}</p>
            {group.tells.map((tell) => (
              <article className="tell" key={tell.name}>
                <h3>{tell.name}</h3>
                {tell.example && <p className="eg">{tell.example}</p>}
                <p>{tell.note}</p>
                <p className="meta">
                  Rule in the skill: {tell.rule} Source: <a href={tell.source.href}>{tell.source.label}</a>.
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="row" aria-labelledby="detectors">
        <div className="body prose">
          <h2 id="detectors">Why fixing tells doesn&rsquo;t fool a detector</h2>
          <p>
            Avoiding these tells does not get text past an AI detector, because detectors aren&rsquo;t reading for
            them. Current commercial detectors are trained classifiers. Pangram&rsquo;s technical report describes a
            model trained on paired human and synthetic text, and the product now has a separate head for text that has
            been through a humanizer. Pangram reports catching the output of nineteen humanizer tools more than 90% of
            the time, which is the vendor&rsquo;s own figure.
          </p>
          <p>
            Xu et al. (2026) found that GPTZero and Pangram often classify text from base models as human and text from
            the instruction-tuned versions of the same models as AI. Their conclusion is that detectors &ldquo;are
            tracking artifacts of instruction tuning and local context&rdquo;. Getting past them took a fine-tuned
            paraphraser applied repeatedly, and the published attacks of that kind use the detector&rsquo;s own score to
            guide the rewrite.
          </p>
          <p>
            A style guide read by an instruction-tuned model doesn&rsquo;t change that model&rsquo;s tuning. So{' '}
            <Link href="/">humanizing-writing</Link> makes no claim about detector scores. The reader it&rsquo;s written
            for is a person &mdash; and practised people are good at this. Russell, Karpinska, and Iyyer (2025) found
            that the majority vote of five frequent LLM users misclassified 1 of 300 articles.
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={sources.pangramReport.href}>{sources.pangramReport.label}</a>
          <a href={sources.xu.href}>{sources.xu.label}</a>
          <a href={sources.cheng.href}>{sources.cheng.label}</a>
          <a href={sources.russell.href}>{sources.russell.label}</a>
        </aside>
      </section>

      <JsonLd data={article(title, description, '/tells')} />
      <JsonLd data={breadcrumb('AI writing tells in 2026', '/tells')} />
    </>
  )
}
