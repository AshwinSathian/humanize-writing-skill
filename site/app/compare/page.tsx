import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { compareRows } from '@/lib/content'
import { article, blob, breadcrumb, pageMeta } from '@/lib/site'

const title = 'humanizing-writing compared with blader/humanizer and other humanizer skills'
const description =
  'How humanizing-writing differs from blader/humanizer, avoid-ai-writing, stop-slop, and no-ai-slop: when each runs, what it is built on, how it handles genre, how it was tested, and where each is the better choice.'

export const metadata = pageMeta('Compared with blader/humanizer and other humanizer skills', description, '/compare')

export default function Compare() {
  const [ours, ...others] = compareRows
  return (
    <>
      <header className="page-head">
        <h1>How it compares with other humanizer skills</h1>
        <p className="lede">
          The four most-used alternatives are rewrite tools that you run over a finished draft. humanizing-writing
          applies while Claude is writing, loads about 1,150 words per use, and says where its rules stop. It also has a
          smaller test behind it than blader/humanizer does. The table is from a survey in October 2026.
        </p>
      </header>

      <section className="row" style={{ display: 'block' }}>
        <div className="scroll wide" style={{ marginTop: 0 }}>
          <table>
            <caption className="sr">Five humanizer skills compared on four points</caption>
            <thead>
              <tr>
                <th scope="col">Skill</th>
                <th scope="col">When it runs</th>
                <th scope="col">Built on</th>
                <th scope="col">Genre and voice</th>
                <th scope="col">Testing</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.name}>
                  <th scope="row">{row.href ? <a href={row.href}>{row.name}</a> : row.name}</th>
                  <td>{row.runs}</td>
                  <td>{row.mechanism}</td>
                  <td>{row.scope}</td>
                  <td>{row.test}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="row" aria-labelledby="pick-other">
        <div className="body prose">
          <h2 id="pick-other">When another one is the better choice</h2>
          <ul>
            {others.map((row) => (
              <li key={row.name}>
                <a href={row.href}>{row.name}</a>: {row.better}
              </li>
            ))}
          </ul>
          <p>
            We borrowed from all four. From blader came the single explanation of why model text sounds as it does, and
            its five strongest patterns, none of which version 1.x covered. The closer and the colon reveal as named
            patterns came from stop-slop and no-ai-slop. From avoid-ai-writing came the habit of reporting the losses
            in a test, and not only the wins.
          </p>
          <h2 id="pick-this">When this one is</h2>
          <p>
            Pick {ours.name} if you&rsquo;d rather the first draft came out right than run a second pass over it, if
            your writing crosses genres (reference docs one hour, a release post the next), or if you want Claude to
            draft in your own voice and leave your habits in. And if you write mostly in one genre and want the
            best-tested rewrite tool, use blader&rsquo;s.
          </p>
          <h2 id="declined">What we chose not to copy</h2>
          <p>
            Rewrite, detect, and edit modes, because a mode switch adds length that loads on every use. Numeric caps on
            punctuation and self-scored rubrics, because none of the four gives a source for its numbers. And
            &ldquo;false agency&rdquo; as a rule, because inanimate subjects are normal in technical writing: the
            function returns, the index stores.
          </p>
          <p className="cta-line">
            <Link href="/research">How this one was tested</Link>
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={blob('reference/oss-skills-review.md')}>The teardown of 13 skills: oss-skills-review.md</a>
          <a href={blob('reference/research/oss-skills.md')}>The longer survey, with GitHub metadata</a>
        </aside>
      </section>

      <JsonLd data={article(title, description, '/compare')} />
      <JsonLd data={breadcrumb('Compare', '/compare')} />
    </>
  )
}
