// Entrances: the parts of each section rise in as it enters, heading first, then text, then picture, 75 ms apart.
// The page is complete without this file: the hidden state is only applied once it runs (html.js), and anything
// already on screen at load is shown at once.
const root = document.documentElement
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
const groups = document.querySelectorAll<HTMLElement>('main [data-reveal]')

if ('IntersectionObserver' in window && groups.length) {
  root.classList.add('js')
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.querySelectorAll('.rv').forEach((el) => el.classList.add('in'))
        io.unobserve(e.target)
      }
    },
    { rootMargin: '0px 0px -6% 0px' },
  )
  for (const g of groups) {
    const parts = [...g.children] as HTMLElement[]
    parts.forEach((el, i) => {
      el.classList.add('rv')
      el.style.setProperty('--i', String(reduce ? 0 : i))
    })
    if (g.getBoundingClientRect().top < innerHeight) parts.forEach((el) => el.classList.add('in'))
    else io.observe(g)
  }
}

export {}
