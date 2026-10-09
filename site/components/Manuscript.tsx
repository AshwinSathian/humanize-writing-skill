import { loadExamples } from '@/lib/examples'

// The hero marks up examples/before-after-2.md. Segments are typed by what
// an editor does with them: cut (struck, numbered note), keep (underlined,
// numbered note), or leave alone.
type Seg = { t: string; cut?: number; keep?: number }

const segments: Seg[] = [
  { t: 'Rate limiting ' },
  { t: 'plays a crucial role in maintaining the stability and reliability', cut: 1 },
  { t: ' of modern APIs. ' },
  { t: "It's not just a defensive measure — it's a foundational component of good API design.", cut: 2 },
  { t: ' By implementing rate limits, engineering teams can ' },
  { t: 'ensure fair usage, protect backend infrastructure, and foster a more predictable system', cut: 3 },
  { t: ' for all consumers. ' },
  { t: 'Additionally,', cut: 4 },
  { t: ' rate limiting helps mitigate the risk of cascading failures, which can occur when ' },
  { t: 'a single misbehaving client overwhelms shared resources', keep: 5 },
  { t: '. ' },
  { t: 'Furthermore,', cut: 4 },
  { t: ' well-designed rate limiting strategies typically incorporate several key elements: ' },
  { t: 'clear error messaging, transparent limits, and graceful degradation', keep: 6 },
  { t: '. ' },
  {
    t: "Despite the added complexity it introduces, rate limiting remains a testament to thoughtful, resilient system design, and its importance cannot be overstated in today's increasingly interconnected digital landscape.",
    cut: 7,
  },
]

const notes: { n: number; text: string; kept?: boolean }[] = [
  { n: 1, text: 'Says it matters and not why.' },
  { n: 2, text: 'Denies a claim nobody made.' },
  { n: 3, text: 'One point, said three ways.' },
  { n: 4, text: 'Connectors that would fit any text.' },
  { n: 5, text: 'The mechanism, buried in sentence four. Lead with it.', kept: true },
  { n: 6, text: 'Three items, three different things. The list stays.', kept: true },
  { n: 7, text: 'A closing line with no fact in it.' },
]

const words = (s: string) => s.split(/\s+/).filter(Boolean).length

export function Manuscript() {
  const example = loadExamples().find((e) => e.file.endsWith('before-after-2.md'))
  const before = segments.map((s) => s.t).join('')
  if (!example || example.before !== before) {
    throw new Error('Manuscript segments no longer match examples/before-after-2.md')
  }

  return (
    <div className="manuscript">
      <fieldset className="views">
        <legend className="sr">Show the paragraph</legend>
        <label>
          <input type="radio" name="view" id="view-before" />
          Before
        </label>
        <label>
          <input type="radio" name="view" id="view-marked" defaultChecked />
          Marked up
        </label>
        <label>
          <input type="radio" name="view" id="view-after" />
          After
        </label>
      </fieldset>

      <div className="sheet">
        <div className="panel" data-view="before">
          <div>
            <p className="specimen">{before}</p>
            <p className="tally">{words(before)} words, in the style models wrote in 2023.</p>
          </div>
        </div>

        <div className="panel" data-view="marked">
          <p className="specimen">
            {segments.map((s, i) =>
              s.cut ? (
                <span key={i}>
                  <del>
                    <span>{s.t}</span>
                  </del>
                  <sup>{s.cut}</sup>
                </span>
              ) : s.keep ? (
                <span key={i}>
                  <mark>{s.t}</mark>
                  <sup>{s.keep}</sup>
                </span>
              ) : (
                <span key={i}>{s.t}</span>
              ),
            )}
          </p>
          <ol className="notes" aria-label="Editor's notes">
            {notes.map((note) => (
              <li key={note.n} data-kept={note.kept || undefined}>
                <b>{note.n}</b>
                <span>{note.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="panel" data-view="after">
          <div>
            <p className="specimen">{example.after}</p>
            <p className="tally">
              {words(example.after)} words. The one addition is 429, the standard HTTP status for a rate-limited
              request. Every other fact was in the original.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
