The rate limiting PR is fine to merge once F1 is fixed. I also strongly suggest fixing F2.

**F1: the limit can be exceeded under concurrency.** The middleware reads the counter and then writes it in two separate Redis calls. Two requests arriving at the limit can both read a passing value and both be allowed. Do the increment and expiry atomically instead, either with INCR plus EXPIRE inside one MULTI, or with a Lua script.

**F2: the 429 response has no Retry-After header.** Clients can't tell how long to back off. Add the header with the seconds left in the current window.

**F3 (nit):** `RL_WIN` is unclear. I'd rename it `RATE_LIMIT_WINDOW_SECONDS`.

The middleware adds one Redis round trip per request, which I measured at 0.8 ms at p50 on staging.

I reviewed for correctness and then for concurrency. F1 came from the concurrency pass. I raised one other concern about the test clock and dropped it after checking, since it was a false alarm.
