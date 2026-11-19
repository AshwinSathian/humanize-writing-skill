// Navigation feedback. Pages are static and prefetched or prerendered (see public/speculation.json), so most clicks
// land at once. For the ones that do not, show a progress bar straight away and, after a beat, the shape of the next
// page instead of a frozen one.
const root = document.documentElement
const kind = (path: string) => (path === '/' ? 'home' : 'list')
// Pages only; files (llms.txt, social cards) open on their own.
const isPage = (u: URL) => !/\.[a-z0-9]+$/i.test(u.pathname) && !u.pathname.startsWith('/og/')

let timer: number | undefined
const clear = () => {
  clearTimeout(timer)
  delete root.dataset.nav
  delete root.dataset.navKind
}

document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return
  const to = new URL(a.href, location.href)
  if (to.origin !== location.origin || !isPage(to)) return
  if (to.pathname === location.pathname) return // same page or a #hash: nothing to load
  // The skeleton starts under the masthead, which stays where it is.
  root.style.setProperty('--sk-top', `${document.querySelector('.masthead')?.getBoundingClientRect().bottom ?? 0}px`)
  root.dataset.navKind = kind(to.pathname)
  root.dataset.nav = ''
  // If the navigation never lands (offline, cancelled), do not leave the skeleton up.
  timer = window.setTimeout(clear, 8000)
})

// Back/forward restores the old page from memory with the flag still set.
addEventListener('pageshow', clear)

// Images: a soft shimmer until each one has arrived.
document.querySelectorAll<HTMLImageElement>('main img').forEach((img) => {
  if (img.complete) return
  img.classList.add('is-loading')
  const done = () => img.classList.remove('is-loading')
  img.addEventListener('load', done, { once: true })
  img.addEventListener('error', done, { once: true })
})

export {}
