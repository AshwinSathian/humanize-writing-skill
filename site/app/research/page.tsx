import { JsonLd } from '@/components/JsonLd'
import { sources } from '@/lib/content'
import { article, blob, breadcrumb, pageMeta, site } from '@/lib/site'

const title = 'How the skill was tested, and where it lost'
const description =
  'The blind comparison behind humanizing-writing 2.0.0: three tasks, two Claude models, two model judges, twelve pairs. Results, the pairs it lost, and the limits of the test.'

export const metadata = pageMeta(title, description, '/research')

export default function Research() {
  return (
    <>
      <header className="page-head">
        <h1>{title}</h1>
        <p className="lede">
          In a blind comparison, two model judges each preferred text written with version 2.0.0 of the skill to text
          written without it in 5 of 6 pairs. The sample is small and the judges are Claude models. The method, the
          losses, and the limits are below, and the raw files are in the repository.
        </p>
      </header>

      <section className="row" aria-labelledby="method">
        <div className="body prose">
          <h2 id="method">Method</h2>
          <p>
            There were three writing tasks: an explanation of database indexes, an internal blog section arguing for
            feature flags, and a pull request description written from five supplied facts. Fresh subagents on two
            models (Sonnet and Opus) wrote each one under three conditions &mdash; no skill, the 1.1.1 skill, and the
            2.0.0 skill. That gives 18 passages and 12 pairs, each setting a 2.0.0 passage against the no-skill or
            1.1.1 passage for the same task and model.
          </p>
          <p>
            A seeded script shuffled the pairs and labelled them A and B. Two judges, one Opus subagent and one Sonnet
            subagent, saw only the pairs file. For each pair they said which passage read more like unedited model
            output, which they would rather publish, and whether either stated as fact anything the task had not
            supplied.
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={blob('reference/validation-2.0.0/prompts.md')}>The three prompts</a>
          <a href={blob('reference/validation-2.0.0/pairs.md')}>The pairs as the judges saw them</a>
          <a href={blob('reference/validation-2.0.0/key.json')}>The key</a>
        </aside>
      </section>

      <section className="row" aria-labelledby="results">
        <div className="body">
          <h2 id="results">Results</h2>
          <div className="scroll" style={{ marginTop: 0 }}>
            <table>
              <caption className="sr">Blind comparison results, six pairs per row</caption>
              <thead>
                <tr>
                  <th scope="col">Comparison</th>
                  <th scope="col">Judge</th>
                  <th scope="col">Read as more machine-written</th>
                  <th scope="col">Preferred</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">2.0.0 against no skill</th>
                  <td>Opus</td>
                  <td>no skill 5, 2.0.0 1</td>
                  <td>2.0.0 5, no skill 1</td>
                </tr>
                <tr>
                  <th scope="row">2.0.0 against no skill</th>
                  <td>Sonnet</td>
                  <td>no skill 5, 2.0.0 1</td>
                  <td>2.0.0 5, no skill 1</td>
                </tr>
                <tr>
                  <th scope="row">2.0.0 against 1.1.1</th>
                  <td>Opus</td>
                  <td>1.1.1 3, 2.0.0 2, tie 1</td>
                  <td>2.0.0 5, 1.1.1 1</td>
                </tr>
                <tr>
                  <th scope="row">2.0.0 against 1.1.1</th>
                  <td>Sonnet</td>
                  <td>1.1.1 4, 2.0.0 2</td>
                  <td>2.0.0 4, 1.1.1 2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '1.5rem' }}>
            Both judges flagged invented facts in a 1.1.1 passage: a release &ldquo;two weeks ago&rdquo; and an
            afternoon lost to a revert, written for a team the writer had been told nothing about. Both also flagged a
            no-skill passage for stating the team&rsquo;s history as fact. Neither flagged an invented fact in any 2.0.0
            passage.
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={blob('reference/validation-2.0.0/judge-opus.json')}>Opus judge, full answers</a>
          <a href={blob('reference/validation-2.0.0/judge-sonnet.json')}>Sonnet judge, full answers</a>
        </aside>
      </section>

      <section className="row" aria-labelledby="lost">
        <div className="body prose">
          <h2 id="lost">Where 2.0.0 lost</h2>
          <ul>
            <li>
              Pull request description, Sonnet, against no skill. Both judges preferred the no-skill passage. The 2.0.0
              one was a &ldquo;Summary&rdquo; and &ldquo;Changes&rdquo; skeleton whose bullets repeated the summary.
            </li>
            <li>
              Database indexes, Opus, against 1.1.1. The Opus judge preferred 1.1.1, which explained a B-tree lookup
              with a phone-book analogy and a worked figure, and called the 2.0.0 passage a &ldquo;uniformly flat
              textbook summary&rdquo;. The Sonnet judge preferred 2.0.0 on the same pair and called the analogy stock.
            </li>
            <li>Pull request description, Sonnet, against 1.1.1. The judges split.</li>
            <li>
              &ldquo;Flags have a cost.&rdquo; opens a paragraph in the 2.0.0 passages, although the skill lists
              &ldquo;The cost is real.&rdquo; as an announcement to avoid.
            </li>
          </ul>
          <h2 id="third">This was the third attempt</h2>
          <p>
            The numbers above are for the rules as released, and two earlier drafts did worse. The first invented an
            incident (&ldquo;Last quarter&rsquo;s checkout redesign&hellip; the rollback took about forty
            minutes&rdquo;), because the draft had folded &ldquo;never invent&rdquo; into the end of another rule. The
            second, judged blind, did no better than 1.1.1 &mdash; the Opus judge called it more machine-like in 5 of 6
            pairs, and it lost every pull request pair.
          </p>
          <p>
            What came out of those two rounds is in the released text: a &ldquo;say each thing once&rdquo; rule, a rule
            that a rewrite adds no claim, an exception for an analogy that explains how something works, and the 20
            findings of an adversarial review.
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={blob('reference/validation-2.0.0/first-draft-fabrication-sample.md')}>
            The invented incident, in full
          </a>
          <a href={blob('reference/validation-2.0.0/adversarial-review.md')}>The adversarial review</a>
        </aside>
      </section>

      <section className="row" aria-labelledby="limits">
        <div className="body prose">
          <h2 id="limits">Limits</h2>
          <ul>
            <li>
              Twelve pairs and two judges is a small sample. A different seed or task could move any row of the table
              by one or two pairs.
            </li>
            <li>
              The judges are Claude models and may share blind spots with the writers. Russell et al. (2025) found
              practised human readers to be better at this than most automated judges.
            </li>
            <li>
              The released rules were revised after seeing how earlier drafts did on these same three tasks, so the
              result is partly fitted to them. No held-out task was run afterwards.
            </li>
            <li>All three tasks are technical writing in English, on two Claude models.</li>
            <li>No AI detector was run. The skill makes no claim about detector scores.</li>
            <li>
              The 2.1.0 voice test was smaller still: two tasks, one judge, one writer model. Its pieces aren&rsquo;t
              published because the judge&rsquo;s packet contains unpublished writing of mine.
            </li>
          </ul>
          <h2 id="built">What the rules are built on</h2>
          <p>
            Three research passes (the academic detection literature, editorial style guides, and a catalogue of 27
            specific tells), a teardown of 13 public humanizer skills, and a 2026 update that records which of the
            earlier claims didn&rsquo;t hold up. It&rsquo;s all in the <a href={`${site.repo}/tree/main/reference`}>
              reference folder
            </a>
            , along with a list of what could not be verified.
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={sources.russell.href}>{sources.russell.label}</a>
          <a href={blob('reference/validation-note.md')}>validation-note.md</a>
          <a href={blob('reference/research.md')}>research.md</a>
          <a href={blob('reference/oss-skills-review.md')}>oss-skills-review.md</a>
        </aside>
      </section>

      <JsonLd data={article(title, description, '/research')} />
      <JsonLd data={breadcrumb('Testing', '/research')} />
    </>
  )
}
