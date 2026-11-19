// Your own paragraph, marked up in the browser with the patterns in src/lib/patterns.ts. Nothing is sent anywhere.
import { counts, findMarks } from '../lib/patterns'

const form = document.querySelector<HTMLElement>('[data-yours]')
if (form) {
  form.hidden = false
  const input = form.querySelector('textarea')!
  const out = form.querySelector<HTMLElement>('[data-out]')!
  const notes = form.querySelector<HTMLOListElement>('[data-notes]')!
  const tally = form.querySelector<HTMLElement>('[data-tally]')!

  const render = () => {
    const text = input.value.trim()
    out.replaceChildren()
    notes.replaceChildren()
    tally.textContent = ''
    if (!text) return
    const hits = findMarks(text)
    let at = 0
    hits.forEach((h, n) => {
      out.append(text.slice(at, h.start))
      const del = document.createElement('del')
      const span = document.createElement('span')
      span.textContent = text.slice(h.start, h.end)
      del.append(span)
      const sup = document.createElement('sup')
      sup.textContent = String(n + 1)
      out.append(del, sup)
      at = h.end
      const li = document.createElement('li')
      const b = document.createElement('b')
      b.textContent = String(n + 1)
      const t = document.createElement('span')
      t.textContent = `${h.mark.note} Rule: ${h.mark.rule}.`
      li.append(b, t)
      notes.append(li)
    })
    out.append(text.slice(at))
    const c = counts(text)
    const marks = hits.length === 1 ? '1 mark' : `${hits.length} marks`
    tally.textContent = `${marks}. ${c.words} words in ${c.sentences} sentence${c.sentences === 1 ? '' : 's'}, ${c.mean} words each on average, ${c.long || "none"} of 30 words or more, “and” ${c.and} time${c.and === 1 ? '' : 's'}.`
  }

  let t: number | undefined
  input.addEventListener('input', () => {
    clearTimeout(t)
    t = window.setTimeout(render, 120)
  })
  render()
}

export {}
