// The sources sentence: one name is lit at a time and the light moves every two seconds. Hover or focus pins it.
const box = document.querySelector<HTMLElement>('[data-sources]')
if (box && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const names = [...box.querySelectorAll<HTMLAnchorElement>('a')]
  let i = 0
  let paused = false
  box.addEventListener('pointerenter', () => (paused = true))
  box.addEventListener('pointerleave', () => (paused = false))
  box.addEventListener('focusin', () => (paused = true))
  box.addEventListener('focusout', () => (paused = false))
  const step = () => {
    if (paused || document.hidden) return
    names.forEach((n, j) => n.classList.toggle('lit', j === i))
    i = (i + 1) % names.length
  }
  step()
  setInterval(step, 2000)
}

export {}
