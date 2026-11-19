// Warm the next page as soon as intent shows: a mouse over a link, a finger down, keyboard focus. By the click the HTML is in the cache.
// Chrome also prerenders on hover through public/speculation.json; this covers every other browser and the touch case.
const seen = new Set<string>();
const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
const frugal = conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "");
const canLink = document.createElement("link").relList?.supports?.("prefetch");

function warm(e: Event) {
  if (frugal) return;
  const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a || (a.target && a.target !== "_self")) return;
  const u = new URL(a.href, location.href);
  if (u.origin !== location.origin || u.pathname === location.pathname || /\.[a-z0-9]+$/i.test(u.pathname) || seen.has(u.pathname)) return;
  seen.add(u.pathname);
  if (canLink) {
    const l = document.createElement("link");
    l.rel = "prefetch";
    l.href = u.pathname;
    l.as = "document";
    document.head.append(l);
  } else {
    // Safari: no <link rel=prefetch>, so a low-priority fetch fills the HTTP cache the same way.
    fetch(u.pathname, { priority: "low" } as RequestInit).catch(() => {});
  }
}
// pointerenter does not bubble: capture it. pointerdown covers touch (and a mouse that skipped the hover).
for (const t of ["pointerenter", "pointerdown", "focusin"]) document.addEventListener(t, warm, { capture: true, passive: true });
