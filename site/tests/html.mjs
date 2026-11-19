// Small helpers for reading built HTML in the tests. Each loops until nothing changes, so nested or odd closing tags
// (`</script >`) cannot leave a fragment behind.
const loop = (s, f) => {
  let prev
  do {
    prev = s
    s = f(s)
  } while (s !== prev)
  return s
}
export const withoutBlocks = (html) => loop(html, (s) => s.replace(/<(script|style)\b[\s\S]*?<\/\1[^>]*>/gi, ' '))
export const withoutTags = (html) => loop(html, (s) => s.replace(/<[^>]*>/g, ' '))
