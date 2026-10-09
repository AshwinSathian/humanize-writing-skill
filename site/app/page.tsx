import Link from 'next/link'
import { Command } from '@/components/Command'
import { Manuscript } from '@/components/Manuscript'
import { faqs, sources } from '@/lib/content'
import { blob, install, site } from '@/lib/site'

const homeFaqs = faqs.slice(1, 3).concat(faqs[5])

// scripts/measure.py over the <p> text of /, /tells, /research, /compare,
// /faq in the built site. Re-run and update after editing copy.
const measured = { sentence: '16.2', short: '1 in 8', dashes: '3.1', transitions: 'none' }

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Claude writes for any reader. This skill makes it write for yours.</h1>
        <p className="lede">
          humanizing-writing is a Claude Code skill that guides how Claude writes prose (docs, emails, posts, pull
          request descriptions) so it doesn&rsquo;t read as machine-written. It works while Claude is writing, and it
          does not change AI-detector scores.
        </p>
        <Command text={install.skills} label="Install command" />
        <p className="under-cmd">
          Free, MIT, version {site.version}. <a href="#install">Two other ways to install</a>.
        </p>
        <Manuscript />
      </section>

      <section className="row" aria-labelledby="glance">
        <div className="body">
          <h2 id="glance">At a glance</h2>
          <dl className="facts">
            <div>
              <dt>What it is</dt>
              <dd>One SKILL.md of about 1,150 words that Claude Code loads when it writes a paragraph or more.</dd>
            </div>
            <div>
              <dt>Who it&rsquo;s for</dt>
              <dd>Anyone who has Claude draft docs, READMEs, reports, emails, posts, or pull request descriptions.</dd>
            </div>
            <div>
              <dt>Version</dt>
              <dd>{site.version}, released 9 October 2026.</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>Free and open source under the MIT licence.</dd>
            </div>
            <div>
              <dt>Tested on</dt>
              <dd>Claude Haiku, Sonnet, and Opus, in English.</dd>
            </div>
            <div>
              <dt>What it won&rsquo;t do</dt>
              <dd>Change an AI-detector score, or rework your own writing when you asked for a typo fix.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="row" aria-labelledby="moved">
        <div className="body">
          <h2 id="moved">Why a list of banned words isn&rsquo;t enough</h2>
          <p>
            Most humanizer tools come down to a word list: swap &ldquo;delve&rdquo; for something else, cap the em
            dashes, done. That works until the list goes stale, and it goes stale quickly. Wikipedia&rsquo;s list of AI
            vocabulary is now sorted by model era, and its list for mid-2025 onward is four words long.
          </p>
          <p>
            What replaced the old words? In July 2026 <cite>The Economist</cite> had ChatGPT, Claude, Gemini, and Grok
            rewrite its own articles, and compared 55,940 sentences with human journalism and novels. The signal now
            sits in long words, long sentences joined with &ldquo;and&rdquo;, and thin punctuation. The em dash has
            narrowed to Claude alone.
          </p>
          <div className="eras">
            <div className="old">
              <h3>2023</h3>
              <ul>
                <li>&ldquo;delve&rdquo;, &ldquo;tapestry&rdquo;, &ldquo;testament to&rdquo;</li>
                <li>&ldquo;Moreover&rdquo;, &ldquo;In conclusion&rdquo;</li>
                <li>&ldquo;In today&rsquo;s fast-paced world&rdquo;</li>
                <li>The em dash, read as a sign of any model</li>
              </ul>
            </div>
            <div>
              <h3>2026</h3>
              <ul>
                <li>Long, noun-built sentences chained with &ldquo;and&rdquo;</li>
                <li>Metaphor where a plain statement would do</li>
                <li>One-line closers and fragments for effect</li>
                <li>&ldquo;Not X but Y&rdquo;, and lists of three</li>
              </ul>
            </div>
          </div>
          <p>
            We found this out the awkward way. Version 1.x of this skill told Claude to vary its sentence rhythm on
            purpose, and a model told to do that writes short sentences for effect &mdash; the closer, the fragment, the
            colon reveal. The skill had been taking text in the 2023 style and rewriting it in the 2026 one. Version
            2.0.0 is the rewrite that followed.
          </p>
          <p className="cta-line">
            <Link href="/tells">Every 2026 tell, with its source</Link>
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={sources.wikipedia.href}>{sources.wikipedia.label}</a>
          <a href={sources.economist.href}>{sources.economist.label}</a>
          <a href={blob('reference/research/2026-update.md')}>What 1.x got wrong: 2026-update.md, section 2</a>
        </aside>
      </section>

      <section className="row" aria-labelledby="rules">
        <div className="body">
          <h2 id="rules">Eleven rules, and one that never bends</h2>
          <p>
            Text reads as machine-written when every choice in it would suit any reader and any subject. The rules
            point Claude at this reader and this subject, in the places where the default shows most.
          </p>
          <dl className="rules">
            <div>
              <dt>Claims</dt>
              <dd>
                Make them specific and checkable: the number, the command, the file, the error text. Say each thing
                once.
              </dd>
            </div>
            <div>
              <dt>Words</dt>
              <dd>
                The plain verb and the common word. Where a figure of speech stands in for a fact, write the fact:
                &ldquo;removing this check lets empty orders through&rdquo;, and not &ldquo;this check is
                load-bearing&rdquo;.
              </dd>
            </div>
            <div>
              <dt>Sentences</dt>
              <dd>
                Length follows the content. Asides go in commas or parentheses. A doubtful claim gets one hedge, at
                the claim.
              </dd>
            </div>
            <div>
              <dt>Endings and structure</dt>
              <dd>
                Stop when the content stops. Lists are for what a reader scans or follows in order, and the rest is
                paragraphs.
              </dd>
            </div>
          </dl>
          <p>
            The rule that never bends is the one against inventing. No made-up figures, quotes, incidents, or sources,
            however specific they&rsquo;d make the draft sound. The others are defaults for expository prose, and the
            skill names ten cases where they give way: an explicit request from you, someone else&rsquo;s text, your own
            voice, API reference, summaries, fiction and speeches, legal text, marketing copy, other languages, and
            anything shorter than a paragraph.
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={blob('SKILL.md')}>The full text: SKILL.md</a>
        </aside>
      </section>

      <section className="row" aria-labelledby="tested">
        <div className="body">
          <h2 id="tested">Tested blind, with the losses on record</h2>
          <p>
            Fresh Claude instances wrote three pieces &mdash; an explanation of database indexes, a blog section arguing
            for feature flags, a pull request description &mdash; with no skill, with version 1.1.1, and with the
            current rules. Model judges then read shuffled pairs with no labels and said which they&rsquo;d rather
            publish. Sonnet and Opus wrote the first round, and Haiku wrote the second.
          </p>
          <div className="scroll">
            <table>
              <caption className="sr">Pairs in which each judge preferred the text written with the skill</caption>
              <thead>
                <tr>
                  <th scope="col">Skill preferred over</th>
                  <th scope="col">Opus judge</th>
                  <th scope="col">Sonnet judge</th>
                  <th scope="col">Haiku judge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">No skill, Sonnet and Opus writing</th>
                  <td>5 of 6</td>
                  <td>5 of 6</td>
                  <td>not run</td>
                </tr>
                <tr>
                  <th scope="row">No skill, Haiku writing</th>
                  <td>3 of 3</td>
                  <td>3 of 3</td>
                  <td>3 of 3</td>
                </tr>
                <tr>
                  <th scope="row">Version 1.1.1, Sonnet and Opus writing</th>
                  <td>5 of 6</td>
                  <td>4 of 6</td>
                  <td>not run</td>
                </tr>
                <tr>
                  <th scope="row">Version 1.1.1, Haiku writing</th>
                  <td>3 of 3</td>
                  <td>2 of 3, one tie</td>
                  <td>2 of 3</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            And where did it fall short? In the first round both judges preferred the no-skill pull request
            description, because the skill&rsquo;s version was a &ldquo;Summary&rdquo; and &ldquo;Changes&rdquo;
            skeleton whose bullets repeated the summary. In the Haiku round, two of three judges flagged the
            skill&rsquo;s feature-flag passage for stating the team&rsquo;s current practice as fact &mdash; the kind of
            thing the rule against inventing is there to stop. A follow-up on four new tasks found the same slip in 2
            of 9 passages, and a reworded rule didn&rsquo;t clear the bar we&rsquo;d set for it, so the rule stands
            and the advice is to check what a draft says about your own team.
          </p>
          <p>
            Eighteen pairs is a small sample, and the judges are Claude models. No AI detector was run.
          </p>
          <p className="cta-line">
            <Link href="/research">Method, results, and limits</Link>
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={blob('reference/validation-note.md')}>validation-note.md</a>
          <a href={`${site.repo}/tree/main/reference/validation-2.0.0`}>
            The pairs, the key, and both judges&rsquo; answers
          </a>
        </aside>
      </section>

      <section className="row" aria-labelledby="voice">
        <div className="body">
          <h2 id="voice">Your voice outranks the rules</h2>
          <p>
            Since 2.1.0, when Claude drafts in your voice from a writing sample or a voice profile, your habits win. If
            you use dashes, rhetorical questions, or &ldquo;not X but Y&rdquo;, the draft does too, at about your rate.
            The repository has one worked profile, mine, built from about 55,000 words I wrote without AI assistance. It
            describes habits as counts and quotes none of the writing.
          </p>
          <p>
            It doesn&rsquo;t get all the way there. In a test of that profile the drafts moved towards my use of
            &ldquo;we&rdquo; and of questions, but their sentences stayed shorter than mine (15 words on average against
            17 to 18), and they used no dashes where I use five or six per 1,000 words.
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={blob('voices/ashwin-sathian.md')}>The profile: voices/ashwin-sathian.md</a>
          <a href={blob('CHANGELOG.md')}>The test: CHANGELOG.md, 2.1.0</a>
        </aside>
      </section>

      <section className="row" aria-labelledby="install">
        <div className="body">
          <h2 id="install">Install</h2>
          <p>Three ways, and none of them needs an account or a review.</p>
          <div className="installs">
            <div>
              <h3>With skills.sh</h3>
              <Command text={install.skills} label="Install with skills.sh" />
            </div>
            <div>
              <h3>As a Claude Code plugin</h3>
              <Command text={install.plugin} label="Install as a plugin, typed inside Claude Code" />
            </div>
            <div>
              <h3>As a symlinked clone</h3>
              <Command text={install.symlink} label="Clone and symlink" />
            </div>
          </div>
          <p>
            To check it&rsquo;s working, give Claude a short, obviously AI-toned paragraph and ask for something
            similar. The skill fires on prose of a paragraph or more. It isn&rsquo;t meant to fire on a one-line commit
            subject or a chat reply.
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={`${site.repo}#install`}>Troubleshooting and uninstalling: README</a>
        </aside>
      </section>

      <section className="row" aria-labelledby="questions">
        <div className="body">
          <h2 id="questions">Questions people ask first</h2>
          {homeFaqs.map((f) => (
            <div className="qa" key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
          <p className="cta-line">
            <Link href="/faq">All {faqs.length} questions</Link>
          </p>
        </div>
      </section>

      <section className="row" aria-labelledby="colophon">
        <div className="body">
          <h2 id="colophon">This site was written with the skill</h2>
          <p>
            Every page here was drafted by Claude with the skill loaded and my voice profile applied. Each figure was
            checked against a file in the repository, and the sources sit in the margin beside the claims.
          </p>
          <p>
            How close did it get to the profile? These are the counts for the paragraphs on this site&rsquo;s five
            written pages, from the same script the validation used. The script reports numbers and gives no verdict.
          </p>
          <div className="scroll">
            <table>
              <caption className="sr">Prose counts for this site against the author&rsquo;s voice profile</caption>
              <thead>
                <tr>
                  <th scope="col">Measured on 10 October 2026</th>
                  <th scope="col">This site</th>
                  <th scope="col">My essays</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Mean sentence length</th>
                  <td>{measured.sentence} words</td>
                  <td>18 words</td>
                </tr>
                <tr>
                  <th scope="row">Sentences of five words or fewer</th>
                  <td>{measured.short}</td>
                  <td>1 in 9</td>
                </tr>
                <tr>
                  <th scope="row">Dashes per 1,000 words</th>
                  <td>{measured.dashes}</td>
                  <td>6</td>
                </tr>
                <tr>
                  <th scope="row">&ldquo;Moreover&rdquo;, &ldquo;Furthermore&rdquo;, and the like</th>
                  <td>{measured.transitions}</td>
                  <td>not counted</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            So the sentences are still shorter than mine and the dashes fewer, which is the miss the profile&rsquo;s own
            test found.
          </p>
          <p>
            Two essays cover the thinking at more length:{' '}
            <a href="https://ashwinsathian.com/writing/why-humanize-my-writing-tools-dont-work">
              why word lists fail
            </a>{' '}
            (August 2026), and{' '}
            <a href="https://ashwinsathian.com/writing/the-ai-tells-moved-my-tool-for-avoiding-them-hadnt">
              what changed in 2.0.0
            </a>{' '}
            (October 2026).
          </p>
          <p>
            The skill makes judgement calls, and some will be wrong. If it mangles something of yours,{' '}
            <a href={`${site.repo}/issues`}>open an issue</a> with the before and after text. That&rsquo;s more useful
            than a star.
          </p>
        </div>
        <aside className="margin" aria-label="Sources">
          <a href={blob('scripts/measure.py')}>The script: scripts/measure.py</a>
          <a href={blob('voices/ashwin-sathian.md')}>The profile&rsquo;s numbers and its known misses</a>
        </aside>
      </section>
    </>
  )
}
