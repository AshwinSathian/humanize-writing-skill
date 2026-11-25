# Example 2: A short technical explanation

## Before (AI-toned original)

Rate limiting plays a crucial role in maintaining the stability and
reliability of modern APIs. It's not just a defensive measure — it's a
foundational component of good API design. By implementing rate limits,
engineering teams can ensure fair usage, protect backend infrastructure,
and foster a more predictable system for all consumers. Additionally,
rate limiting helps mitigate the risk of cascading failures, which can
occur when a single misbehaving client overwhelms shared resources.
Furthermore, well-designed rate limiting strategies typically incorporate
several key elements: clear error messaging, transparent limits, and
graceful degradation. Despite the added complexity it introduces, rate
limiting remains a testament to thoughtful, resilient system design, and
its importance cannot be overstated in today's increasingly
interconnected digital landscape.

## After (humanized rewrite)

Rate limiting exists because one misbehaving client can overwhelm
resources that every client shares, and the failure then spreads to all
of them. With a limit in place, that client's extra requests are rejected
(HTTP 429) and the others keep working. A well-designed limit returns a
clear error, publishes its limits, and degrades gradually. It also makes
the API more complex.

## What changed, and why

- "Plays a crucial role in maintaining the stability and reliability" is
  replaced by the mechanism the original gives two sentences later: one
  client overwhelming shared resources.
- "It's not just a defensive measure, it's a foundational component" and
  the closing "testament to... cannot be overstated" are cut. Neither
  carried information.
- The first list ("ensure fair usage, protect backend infrastructure, and
  foster a more predictable system") is cut. It says the same thing as
  the mechanism, three ways.
- The second list stays at three items. The original names three
  properties of a good rate limit and each is a different property.
- "Additionally" and "Furthermore" are gone.
- The verbs are plain: "exists because", "are rejected", "keep working".
- 429 is the standard HTTP status for a rate-limited request, so adding
  it is not invention. Which resource runs out, and how fast, the
  original does not say, and the rewrite does not guess. A writer who
  knows the system should name it.

Version 1.x of this rewrite added a retry loop, a scraper, a database
connection pool exhausted "in seconds", and a `Retry-After` header. All
are plausible and none was in the original. It also ended on "That
complexity is cheaper than the outage it prevents", a closing line
that repeats the paragraph as a saying.
