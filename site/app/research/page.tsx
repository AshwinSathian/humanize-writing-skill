import { JsonLd } from '@/components/JsonLd'
import { sources } from '@/lib/content'
import { article, blob, breadcrumb, pageMeta, site } from '@/lib/site'

const title = 'How the skill was tested, and where it lost'
const description =
  'The blind comparisons behind humanizing-writing: three tasks, written by Claude Haiku, Sonnet, and Opus, judged without labels, eighteen pairs. Results, the pairs it lost, a known miss, and the limits of the test.'

export const metadata = pageMeta(title, description, '/research')

export default function Research() {
  return (
    <>
      <header className="page-head">
        <h1>{title}</h1>
        <p className="lede">
          In two blind comparisons, model judges preferred text written with the skill to text written without it:
          in 5 of 6 pairs each with Sonnet and Opus writing, and in 3 of 3 each with Haiku writing. The samples are
          small and the judges are Claude models. The method, the losses, and the limits are below, and the raw files
          are in the repository.
        </p>
      </header>

      <section className="row" aria-labelledby="method">
        <div className="body prose">
          <h2 id="method">Method, first round</h2>
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
          <h2 id="results">Results, Sonnet and Opus writing</h2>
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

      <section className="row" aria-labelledby="haiku">
        <div className="body">
          <h2 id="haiku">The Haiku round</h2>
          <p>
            Does the result hold on the smallest current Claude model? On 10 October 2026 the same three tasks were
            written by fresh Haiku subagents with no skill, with 1.1.1, and with 2.1.0 (the 2.0.0 rules plus one Scope
            entry about voice). That gives nine passages and six pairs. A Haiku judge joined the Opus and Sonnet
            judges.
          </p>
          <div className="scroll">
            <table>
              <caption className="sr">Haiku round results, three pairs per row</caption>
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
                  <th scope="row">2.1.0 against no skill</th>
                  <td>Opus</td>
                  <td>no skill 3</td>
                  <td>2.1.0 3</td>
                </tr>
                <tr>
                  <th scope="row">2.1.0 against no skill</th>
                  <td>Sonnet</td>
                  <td>no skill 3</td>
                  <td>2.1.0 3</td>
                </tr>
                <tr>
                  <th scope="row">2.1.0 against no skill</th>
                  <td>Haiku</td>
                  <td>no skill 3</td>
                  <td>2.1.0 3</td>
                </tr>
                <tr>
                  <th scope="row">2.1.0 against 1.1.1</th>
                  <td>Opus</td>
                  <td>1.1.1 2, tie 1</td>
                  <td>2.1.0 3</td>
                </tr>
                <tr>
                  <th scope="row">2.1.0 against 1.1.1</th>
                  <td>Sonnet</td>
                  <td>1.1.1 3</td>
                  <td>2.1.0 2, tie 1</td>
                </tr>
                <tr>
                  <th scope="row">2.1.0 against 1.1.1</th>
                  <td>Haiku</td>
                  <td>1.1.1 2, tie 1</td>
                  <td>2.1.0 2, 1.1.1 1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            All three judges flagged the no-skill pull request description for claims the five supplied facts
            didn&rsquo;t contain, such as &ldquo;status changes can lag by up to half a minute&rdquo;.
          </p>
          <h3>Where 2.1.0 fell short</h3>
          <div className="prose">
            <ul>
              <li>
                It stated the team&rsquo;s practice as fact. The feature-flag passage says &ldquo;Right now a
                half-finished feature either sits on a long-lived branch or reaches every user at once&rdquo;, and
                the writer had been told nothing about the team. The Sonnet and Haiku judges flagged it. It&rsquo;s
                the first recorded miss of the rule against inventing in a 2.x passage.
              </li>
              <li>
                The rule names made-up incidents, figures, quotes, and sources. It doesn&rsquo;t name a claim about
                how the reader&rsquo;s team works today. The wording hasn&rsquo;t been changed yet, because a change
                made after seeing this passage would need a task the rules weren&rsquo;t fitted to.
              </li>
              <li>
                On database indexes against 1.1.1, the Haiku judge preferred 1.1.1 for its running example and the
                Sonnet judge called it a tie.
              </li>
              <li>
                All three preferred the 2.1.0 pull request description to 1.1.1&rsquo;s, but the Opus judge called
                it &ldquo;a flat restatement of the bullets&rdquo; and the margin narrow. It runs to 107 words
                against a brief of about 150.
              </li>
            </ul>
          </div>
          <p>
            Three things differ from the first round, so the two tables shouldn&rsquo;t be added together pair for
            pair: the skill version, the fact that writers read the skill from a file, and two lines sent to every
            writer (don&rsquo;t invoke any skill, write in ordinary prose) because the test machine has this skill
            installed.
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={`${site.repo}/tree/main/reference/validation-2.1.0-haiku`}>
            Passages, pairs, key, and all three judges&rsquo; answers
          </a>
          <a href={blob('reference/validation-2.1.0-haiku/prompts.md')}>The prompts as sent</a>
          <a href={blob('reference/validation-note.md')}>validation-note.md</a>
        </aside>
      </section>

      <section className="row" aria-labelledby="limits">
        <div className="body prose">
          <h2 id="limits">Limits</h2>
          <ul>
            <li>
              Twelve pairs and two judges in the first round is a small sample. A different seed or task could move
              any row of the table by one or two pairs.
            </li>
            <li>
              The judges are Claude models and may share blind spots with the writers. Russell et al. (2025) found
              practised human readers to be better at this than most automated judges.
            </li>
            <li>
              The released rules were revised after seeing how earlier drafts did on these same three tasks, so the
              result is partly fitted to them. No held-out task was run afterwards.
            </li>
            <li>All three tasks are technical writing in English, on three Claude models.</li>
            <li>
              The Haiku round is six pairs, one passage per task and condition, on the same three tasks. One of its
              judges is the model that wrote the passages.
            </li>
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
