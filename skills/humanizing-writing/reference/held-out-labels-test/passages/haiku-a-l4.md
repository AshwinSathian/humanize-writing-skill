Verdict: OK to merge once F1 is fixed. F2 is strongly recommended before merge. F3 is optional.

**F1 (must fix): the limit check is not atomic.** The limit counter is read in one Redis call and written in a second. Two requests that arrive together can both read a count below the limit and both pass, so a client can exceed the limit under concurrency. I found this in the concurrency pass. Fix it with either `INCR` plus `EXPIRE` inside one `MULTI` block, or a Lua script that does the read and the write together.

**F2 (strongly recommended): the 429 response has no `Retry-After` header.** Clients have no way to know when to retry, so they will likely retry immediately and hit the limit again. Add the header with the number of seconds until the window resets.

**F3 (nit): rename `RL_WIN`.** The constant name is unclear. I suggest `RATE_LIMIT_WINDOW_SECONDS`.

The request middleware adds one Redis round trip per request. On staging it measured 0.8 ms at p50, so I do not see a performance problem with this change.

I reviewed the change for correctness and for concurrency. I did not run the fix for F1 or F2, so the suggested fixes are unverified.
