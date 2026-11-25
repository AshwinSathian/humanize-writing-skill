This is ready to merge once the race in the limit counter is fixed. I'd also strongly suggest adding a Retry-After header before you merge.

**Race in the counter (must fix).** The middleware reads the counter and then writes it back in two separate Redis calls. Two requests that arrive when the count is one below the limit can both read the same value and both get through. Make the increment atomic, either with INCR and EXPIRE inside a single MULTI or with a Lua script.

**Missing Retry-After (strongly suggested).** The 429 response doesn't tell clients when they can try again. Without a Retry-After header, well-behaved clients have to guess.

**Naming (nit).** `RL_WIN` is hard to read. `RATE_LIMIT_WINDOW_SECONDS` says what it holds and in what unit.

On performance, the middleware adds one Redis round trip per request, which I measured at 0.8 ms at p50 on staging.

I reviewed for correctness first and then for concurrency, which is where the race showed up. I also suspected a problem with the test clock, but it turned out to be fine.
