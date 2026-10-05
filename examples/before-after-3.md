# Example 3: A draft in the 2026 fragment style

Examples 1 and 2 start from the 2023 style: "testament to", "Moreover",
"plays a crucial role". Community reports on Claude Opus 5 describe
drafts like the one below. It has dropped the 2023 vocabulary and kept
the negated contrast and the dash. The figures in it are made up for the
example.

## Before (AI-toned original)

The cache isn't slow — it's doing exactly what we told it to. That
distinction is load-bearing. Every request hashes the full payload; in
theory that's cheap, in practice it's 40% of p99. Here's the part worth
stating plainly: we never needed the full hash. The key is the user ID
and the route. Nothing else. So the fix isn't a faster hash function.
It's a smaller key. Two fields, not two kilobytes. The numbers carry the
argument: p99 drops from 310 ms to 190 ms. Small change. Big lever.

## After (humanized rewrite)

Hashing the full request payload (two kilobytes) for the cache key takes
40% of p99 latency. The cache only needs the user ID and the route to
identify an entry, so the key can be built from those two fields. With
the smaller key, p99 falls from 310 ms to 190 ms.

## What changed, and why

- The two negated contrasts are gone ("isn't slow — it's doing exactly
  what we told it to", "the fix isn't a faster hash function. It's a
  smaller key"). Nothing in the passage suggests the reader thought the
  cache was slow or wanted a faster hash, so the rewrite states what is
  true.
- "Load-bearing", "carry the argument", and "big lever" each stood in for
  "this matters". The 40% figure already shows that it matters, so they
  are deleted without a replacement.
- "Here's the part worth stating plainly:" is deleted and the thing it
  announced is stated.
- The fragments are deleted. "Nothing else." and "Small change. Big
  lever." repeated the sentence before them. "Two fields, not two
  kilobytes" held one fact, the payload size, and the rewrite keeps it in
  a parenthesis.
- "In theory that's cheap, in practice it's 40% of p99" becomes the
  measurement.
- Every number in the rewrite was in the original. It is three sentences
  where the original had twelve.
