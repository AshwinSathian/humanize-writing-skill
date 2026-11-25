The rate limiting PR is OK to merge once F1 is fixed. I also strongly suggest F2.

**F1 (must fix): the limit check can be passed by two requests at once.** The counter is read in one Redis call and written in a second. Two requests that arrive together can both read a count below the limit, and both pass. Fix it with one atomic step: `INCR` followed by `EXPIRE` inside a `MULTI` block, or a Lua script that does both.

**F2 (strongly suggested): the 429 response has no `Retry-After` header.** Clients have no way to know how long to wait, so they will likely retry at once and get another 429.

**F3 (nit): rename `RL_WIN` to `RATE_LIMIT_WINDOW_SECONDS`.** The current name does not say what the value means.

The middleware adds one Redis round trip per request. On staging it measured 0.8 ms at p50.

I reviewed for correctness and for concurrency. The concurrency pass found F1.
