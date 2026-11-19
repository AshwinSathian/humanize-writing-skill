// Copy buttons. One delegated listener serves every command on the page; a failed copy selects the text instead.
const reset = new WeakMap<Element, number>()
// Copy needs script, so the buttons exist only once it has run.
document.querySelectorAll<HTMLElement>('button[data-copy]').forEach((b) => (b.hidden = false))

document.addEventListener('click', async (e) => {
  const btn = (e.target as Element).closest<HTMLButtonElement>('button[data-copy]')
  if (!btn) return
  const wrap = btn.closest('.cmd-wrap')!
  const pre = wrap.querySelector('pre')!
  const label = btn.querySelector('[data-copy-label]')!
  const status = wrap.querySelector('[data-copy-status]')!
  clearTimeout(reset.get(btn))
  try {
    await navigator.clipboard.writeText(pre.textContent ?? '')
    label.textContent = 'Copied'
    btn.dataset.state = 'copied'
    status.textContent = 'Copied.'
    reset.set(
      btn,
      window.setTimeout(() => {
        label.textContent = 'Copy'
        delete btn.dataset.state
        status.textContent = ''
      }, 2000),
    )
  } catch {
    // Select the command so the visitor can copy it by hand.
    const range = document.createRange()
    range.selectNodeContents(pre)
    getSelection()?.removeAllRanges()
    getSelection()?.addRange(range)
    label.textContent = 'Couldn’t copy'
    status.textContent = 'The command is selected. Press Ctrl+C or Cmd+C to copy it.'
    reset.set(btn, window.setTimeout(() => (label.textContent = 'Copy'), 4000))
  }
})

export {}
