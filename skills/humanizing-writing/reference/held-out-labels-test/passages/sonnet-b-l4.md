This is ok to merge once the race condition in the limit counter is fixed. I also strongly suggest adding a `Retry-After` header to the 429 response.

**Must fix: race in the counter.** The limiter reads the count and then writes it in two separate Redis calls. Two requests arriving together can both read a count below the limit, both pass, and both write, so the limit is exceeded. Do the increment and expiry atomically instead: `INCR` with `EXPIRE` inside one `MULTI`, or a Lua script.

**Strongly suggested: `Retry-After`.** The 429 response has no `Retry-After` header, so clients have no way to know when to retry.

**Nit.** The constant `RL_WIN` is unclear. `RATE_LIMIT_WINDOW_SECONDS` would say what it is.

**Performance.** The request middleware adds one Redis round trip, which I measured at 0.8 ms at p50 on staging.

I reviewed the change for correctness and for concurrency. The race was found in the concurrency pass. I raised one other concern about the test clock, then dropped it as a false alarm.
