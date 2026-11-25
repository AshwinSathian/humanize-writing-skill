# Blind pairs

---

## pair01

**The task, as the reader knows it:** You are a support agent who investigated a customer's complaint with the help of an internal assistant. Your working notes are below. Write the email reply to the customer, Dana, who reported being charged twice for one order.

**Facts this reader needs:**
- Dana will only be charged once
- the second charge is a pending authorization that disappears by itself in 3 to 5 business days
- order #48213 has shipped
- it happened because the payment page timed out and Pay was pressed again, and a fix is in progress

### Passage A

Hi Dana,

You were charged once for order #48213. The second charge you see is a pending authorization that will not be collected, and it should disappear from your statement on its own within 3 to 5 business days.

Your order is fine and has already shipped.

This happened because our payment page timed out, and pressing Pay again created a second authorization. We reproduced it on our side. Our payment provider never captured the second one, so only one payment will settle. Our engineers have a ticket open to stop the second press from going through.

If the extra charge is still on your statement after 5 business days, reply to this email and we will look into it right away.

I'm sorry for the worry this caused.

### Passage B

Hi Dana,

You were charged once for order #48213. The second charge you see is a pending authorization that was never captured, and it will drop off your statement by itself in 3 to 5 business days. You don't need to do anything.

Your order is fine and has already shipped.

The cause was on our side. When the payment page times out and you press Pay again, our system creates a second authorization. We reproduced this, and your case matches it. Our engineers have a ticket open (PAY-771) to stop the second press from going through.

If the extra charge is still there after 5 business days, reply to this email and I'll follow up with the payment provider.

Best,
Support

### The writer's working notes (the reader never sees these)

Working notes:
- bucket C (double-charge reports this week): Dana's case matches
- repro-3 confirmed: when the payment page times out and the customer presses Pay again, two authorizations are created
- PSP-side: the second authorization was never captured, so only one charge will settle
- the extra pending charge drops off by itself in 3 to 5 business days (PSP SLA)
- Dana's order #48213 is fine and has shipped
- ENG ticket PAY-771 is open to block the second press

---

## pair02

**The task, as the reader knows it:** You are a support agent who investigated a customer's complaint with the help of an internal assistant. Your working notes are below. Write the email reply to the customer, Dana, who reported being charged twice for one order.

**Facts this reader needs:**
- Dana will only be charged once
- the second charge is a pending authorization that disappears by itself in 3 to 5 business days
- order #48213 has shipped
- it happened because the payment page timed out and Pay was pressed again, and a fix is in progress

### Passage A

Hi Dana,

You will only be charged once for order #48213. The second charge you see is a pending authorization that was never completed, and it will drop off your statement by itself within 3 to 5 business days. You don't need to do anything.

This happened because the payment page timed out and the Pay button was pressed again, which created a second authorization. Only the first one went through as a payment. Our engineers are working on a change so that a second press can't create another authorization.

Your order is fine and has already shipped.

Sorry for the worry this caused. If the pending charge is still there after 5 business days, reply to this email and I'll look into it.

Best regards,

### Passage B

Hi Dana,

You will only be charged once for order #48213. The second charge you see is a pending authorization, and it will drop off your statement on its own within 3 to 5 business days. You don't need to do anything.

Here is what happened. When our payment page times out and the Pay button is pressed again, our system creates a second authorization on the card. Your payment provider never collected the second one, so only the first charge will go through.

Your order itself is fine and has already shipped.

Our engineering team is working on a change that stops a second press of the Pay button from creating another authorization. Other customers have run into the same thing this week, and I'm sorry it happened to you.

If the extra charge is still showing after 5 business days, reply to this email and I'll look into it again.

Best regards,

### The writer's working notes (the reader never sees these)

Working notes:
- bucket C (double-charge reports this week): Dana's case matches
- repro-3 confirmed: when the payment page times out and the customer presses Pay again, two authorizations are created
- PSP-side: the second authorization was never captured, so only one charge will settle
- the extra pending charge drops off by itself in 3 to 5 business days (PSP SLA)
- Dana's order #48213 is fine and has shipped
- ENG ticket PAY-771 is open to block the second press

---

## pair03

**The task, as the reader knows it:** You are a support agent who investigated a customer's complaint with the help of an internal assistant. Your working notes are below. Write the email reply to the customer, Dana, who reported being charged twice for one order.

**Facts this reader needs:**
- Dana will only be charged once
- the second charge is a pending authorization that disappears by itself in 3 to 5 business days
- order #48213 has shipped
- it happened because the payment page timed out and Pay was pressed again, and a fix is in progress

### Passage A

Hi Dana,

You were not charged twice for order #48213. You will see one charge on your statement for the order. Your order is fine, and it has already shipped.

Here is what happened. When our payment page timed out during checkout, the page did not confirm the first payment. Pressing Pay again created a second authorization on your card. Only one of the two was captured, so only one charge will settle. The second authorization is a pending hold, and your bank will release it by itself within 3 to 5 business days. You do not need to contact your bank or do anything on your end.

I am sorry for the scare this caused. Our engineering team is working on a fix so that a second press of Pay during a timeout cannot create a second authorization.

If the pending amount is still showing after 5 business days, reply to this email with a screenshot of your card statement and we will look into it.

Support Team

### Passage B

Subject: Re: Charged twice for order #48213

Hi Dana,

You were charged once for order #48213. Your order is fine, and it has already shipped.

The second charge is a pending authorization, not a payment. It happened because the payment page timed out while you were checking out, and pressing Pay again created a second authorization. Only one of the two was completed, so only one charge will settle on your statement.

The pending authorization should disappear from your account on its own. Your card provider typically releases it within 3 to 5 business days. You do not need to contact your bank or do anything else.

We are fixing the cause so that pressing Pay twice cannot create a second authorization.

Thank you for reporting this.

### The writer's working notes (the reader never sees these)

Working notes:
- bucket C (double-charge reports this week): Dana's case matches
- repro-3 confirmed: when the payment page times out and the customer presses Pay again, two authorizations are created
- PSP-side: the second authorization was never captured, so only one charge will settle
- the extra pending charge drops off by itself in 3 to 5 business days (PSP SLA)
- Dana's order #48213 is fine and has shipped
- ENG ticket PAY-771 is open to block the second press

---

## pair04

**The task, as the reader knows it:** You are an agent that compared ways to migrate a 40 GB orders table to a new schema. Your working notes are below. Write a message to the team lead in the team's chat channel. The lead has not seen your notes and has to pick an approach today.

**Facts this reader needs:**
- recommendation: dual-write to both tables, backfill, then switch reads
- this means no downtime and about two weeks of work
- the alternative is one migration with about 3 hours of downtime, measured in a staging dry run
- the downtime option is ruled out by the sales period (checkout cannot be down)
- a decision is needed today

### Passage A

I recommend Plan B: dual-write to the old and new tables, backfill the existing rows, then switch reads to the new table. It causes no downtime, and it takes about two weeks of work. Checkout cannot be down for the roughly 3 hours that Plan A needs, so Plan B is the only option that fits the sales period.

Plan A takes the site down and migrates in one pass. The 3-hour figure comes from a dry run on staging (DR-1).

Plan B depends on the backfill. The first backfill script timed out at 12 GB of the 40 GB table, so we are using the second version, which we call bf2.

Plan C uses logical replication to a new cluster. I rejected it because our hosting tier does not support logical replication.

I need a decision from you today. If you approve Plan B, I will start the dual-write change first and run bf2 against staging before production.

### Passage B

I recommend Plan B for the orders table migration: dual-write to the old and new tables, backfill with the bf2 script, then switch reads over. It needs no downtime. The cost is about two weeks of work.

I need a decision today. The other option, Plan A, takes the site down and migrates in one go. The 3-hour downtime estimate comes from the dry run on staging (DR-1). Checkout cannot be down for 3 hours during the sales period, so I ruled it out.

Plan C, logical replication to a new cluster, is off the table. Our hosting tier does not support it.

One risk to know about: the first backfill script (bf1) timed out at 12 GB. bf2 is the second version of that script and is the one the plan depends on.

### The writer's working notes (the reader never sees these)

Working notes:
- Plan A: take the site down, migrate in one go. Estimated 3 hours of downtime
- Plan B: dual-write to old and new tables, backfill with the bf2 job, then switch reads. No downtime, about 2 weeks of work
- Plan C: logical replication to a new cluster. Rejected: our hosting tier does not support it
- bf2 = the second version of the backfill script; bf1 timed out at 12 GB
- the 3-hour figure comes from the dry run on staging (DR-1)
- recommendation: B, because checkout cannot be down for 3 hours during the sales period

---

## pair05

**The task, as the reader knows it:** You are an agent that compared ways to migrate a 40 GB orders table to a new schema. Your working notes are below. Write a message to the team lead in the team's chat channel. The lead has not seen your notes and has to pick an approach today.

**Facts this reader needs:**
- recommendation: dual-write to both tables, backfill, then switch reads
- this means no downtime and about two weeks of work
- the alternative is one migration with about 3 hours of downtime, measured in a staging dry run
- the downtime option is ruled out by the sales period (checkout cannot be down)
- a decision is needed today

### Passage A

I recommend we migrate the orders table with dual writes and a backfill, which needs no downtime but takes about two weeks of work. The alternative is to take the site down and migrate in one go, which a staging dry run put at about three hours of downtime. Checkout can't be down for three hours during the sales period, so I'd go with the dual-write plan. I need your call on this today.

How the dual-write plan works: we write every order to both the old and new tables, backfill the existing 40 GB into the new table, then switch reads over. The backfill script is on its second version, because the first one timed out at 12 GB.

I also looked at logical replication to a new cluster, but our hosting tier doesn't support it, so it's off the table.

### Passage B

I recommend we migrate the orders table with dual writes and a backfill, which needs no downtime and takes about two weeks of work. The other realistic option is a single migration with the site down for about 3 hours, and checkout can't be down that long during the sales period.

How the dual-write approach works: the app writes every order to both the old and new tables, a backfill job copies the existing 40 GB into the new table, and once the new table is complete we switch reads over to it. The backfill would use the second version of our backfill script. The first version timed out after 12 GB.

The 3-hour downtime figure comes from a dry run of the one-shot migration on staging. If the two weeks are a problem and we can find a 3-hour window outside the sales period, that plan is simpler.

I also looked at logical replication to a new cluster, but our hosting tier doesn't support it, so it's off the table.

Can you confirm which way you want to go today?

### The writer's working notes (the reader never sees these)

Working notes:
- Plan A: take the site down, migrate in one go. Estimated 3 hours of downtime
- Plan B: dual-write to old and new tables, backfill with the bf2 job, then switch reads. No downtime, about 2 weeks of work
- Plan C: logical replication to a new cluster. Rejected: our hosting tier does not support it
- bf2 = the second version of the backfill script; bf1 timed out at 12 GB
- the 3-hour figure comes from the dry run on staging (DR-1)
- recommendation: B, because checkout cannot be down for 3 hours during the sales period

---

## pair06

**The task, as the reader knows it:** You are an agent that just spent an hour fixing a flaky test. Your working notes are below. Write the description for your pull request. Reviewers are two engineers on your team who have not seen your notes.

**Facts this reader needs:**
- the flaky test was test_checkout_total, failing about 1 in 20 runs
- cause: two tests share one cart fixture and run in parallel under pytest-xdist
- fix: each test gets its own cart from cart_factory()
- 200 runs after the fix with 0 failures

### Passage A

Fix flaky `test_checkout_total` by giving each test its own cart

`test_checkout_total` failed about 1 run in 20 locally. The cause is that it and `test_apply_coupon` both write to the same cart fixture, and pytest-xdist runs them in parallel, so one test can overwrite the other's cart mid-run.

The fix is a `cart_factory()` fixture in `tests/conftest.py`. `tests/test_checkout.py` and `tests/test_coupons.py` now call it, so each test builds its own cart and nothing is shared.

I ran the full suite 200 times with this change and saw 0 failures.

What I ruled out:

- Clock skew. The test still failed with a frozen clock.
- A lock around the shared fixture. It also fixed the flake, but it made the suite about 40% slower, so I reverted it.

I did not test network effects, since the shared fixture accounted for the failures.

If another test starts using the old shared cart fixture, it can bring the flake back. Reviewers may want to check for other users of that fixture.

### Passage B

## Fix flaky test_checkout_total by giving each test its own cart

test_checkout_total failed about 1 run in 20 locally. The cause is shared fixture state: test_checkout_total and test_apply_coupon both write to the same cart fixture, and pytest-xdist runs them in parallel, so one can change the cart while the other reads it.

The fix replaces the shared cart with a `cart_factory()` fixture, so each test builds its own cart. Changes are in `tests/conftest.py`, `tests/test_checkout.py` and `tests/test_coupons.py`.

I ran the full suite 200 times with the change and saw no failures.

Other things I tried:

- A clock problem was not the cause. The test still flaked with a frozen clock.
- My first fix put a lock around the shared fixture. It worked, but it made the suite about 40% slower, so I reverted it.
- I did not test network effects. The fixture race explained every failure I saw, so I stopped there.

Please check that no other tests still use the old shared cart fixture. I only changed the two that write to it.

### The writer's working notes (the reader never sees these)

Working notes:
- step 1: reproduced the flake locally, about 1 in 20 runs of test_checkout_total
- H1 (clock skew): ruled out, the failure happens with a frozen clock too
- H2 (shared fixture state): confirmed. test_checkout_total and test_apply_coupon both write to the same cart fixture, and pytest-xdist runs them in parallel
- H3 (network): never tested, H2 explained everything
- fix-2 (the one I kept): each test gets its own cart via a factory, cart_factory(). fix-1 was a lock around the fixture; reverted, it made the suite 40% slower
- ran the suite 200 times with fix-2: 0 failures
- touched files: tests/conftest.py, tests/test_checkout.py, tests/test_coupons.py

---

## pair07

**The task, as the reader knows it:** You are a code-review agent that has finished reviewing a pull request that adds rate limiting to an API. Your working notes are below. Write your final report to the developer who asked for the review. They have not seen your notes or your progress updates.

**Facts this reader needs:**
- the race: the counter is read and written in two separate Redis calls, so two requests at the limit can both get through
- the fix for it: an atomic INCR with EXPIRE (MULTI) or a Lua script
- the 429 response lacks a Retry-After header
- it can merge once the race is fixed
- the middleware adds one Redis round trip, 0.8 ms at p50 on staging

### Passage A

This is OK to merge once the race condition in the limit counter is fixed. I'd also strongly suggest adding a Retry-After header to the 429 response before merging.

**Must fix: two requests can both pass at the limit.** The counter is read in one Redis call and written in a second. If two requests arrive when the count is one below the limit, both read the same value, both pass, and both write. Make the increment and the expiry atomic, either with INCR and EXPIRE inside one MULTI block or with a Lua script.

**Strongly suggested: add Retry-After to the 429.** Without it, clients have no way to know how long to wait and will tend to retry right away.

**Nit:** the name `RL_WIN` is hard to read. `RATE_LIMIT_WINDOW_SECONDS` says what it is and what unit it's in.

On performance, the request middleware now makes one extra Redis round trip per request. I measured it at 0.8 ms at p50 on staging.

I reviewed the change once for correctness and once for concurrency. The counter race only showed up in the concurrency pass.

### Passage B

This is ready to merge once the race in the limit counter is fixed. I'd also strongly suggest adding a Retry-After header before you merge.

**Race in the counter (must fix).** The middleware reads the counter and then writes it back in two separate Redis calls. Two requests that arrive when the count is one below the limit can both read the same value and both get through. Make the increment atomic, either with INCR and EXPIRE inside a single MULTI or with a Lua script.

**Missing Retry-After (strongly suggested).** The 429 response doesn't tell clients when they can try again. Without a Retry-After header, well-behaved clients have to guess.

**Naming (nit).** `RL_WIN` is hard to read. `RATE_LIMIT_WINDOW_SECONDS` says what it holds and in what unit.

On performance, the middleware adds one Redis round trip per request, which I measured at 0.8 ms at p50 on staging.

I reviewed for correctness first and then for concurrency, which is where the race showed up. I also suspected a problem with the test clock, but it turned out to be fine.

### The writer's working notes (the reader never sees these)

Working notes:
- pass 1 (correctness), pass 2 (concurrency)
- F1: limit counter is read and then written in two Redis calls, so two requests can both pass at the limit. Found in pass 2. Fix: use INCR with EXPIRE in one MULTI, or a Lua script
- F2: 429 response has no Retry-After header
- F3: nit, the constant RL_WIN is unclear, suggest RATE_LIMIT_WINDOW_SECONDS
- F4: dropped, was a false alarm about the test clock
- the hot path (the request middleware) adds one Redis round trip, measured 0.8 ms at p50 on staging
- verdict: ok to merge after F1; F2 strongly suggested

---

## pair08

**The task, as the reader knows it:** You are a code-review agent that has finished reviewing a pull request that adds rate limiting to an API. Your working notes are below. Write your final report to the developer who asked for the review. They have not seen your notes or your progress updates.

**Facts this reader needs:**
- the race: the counter is read and written in two separate Redis calls, so two requests at the limit can both get through
- the fix for it: an atomic INCR with EXPIRE (MULTI) or a Lua script
- the 429 response lacks a Retry-After header
- it can merge once the race is fixed
- the middleware adds one Redis round trip, 0.8 ms at p50 on staging

### Passage A

Verdict: OK to merge once F1 is fixed. F2 is strongly recommended before merge. F3 is optional.

**F1 (must fix): the limit check is not atomic.** The limit counter is read in one Redis call and written in a second. Two requests that arrive together can both read a count below the limit and both pass, so a client can exceed the limit under concurrency. I found this in the concurrency pass. Fix it with either `INCR` plus `EXPIRE` inside one `MULTI` block, or a Lua script that does the read and the write together.

**F2 (strongly recommended): the 429 response has no `Retry-After` header.** Clients have no way to know when to retry, so they will likely retry immediately and hit the limit again. Add the header with the number of seconds until the window resets.

**F3 (nit): rename `RL_WIN`.** The constant name is unclear. I suggest `RATE_LIMIT_WINDOW_SECONDS`.

The request middleware adds one Redis round trip per request. On staging it measured 0.8 ms at p50, so I do not see a performance problem with this change.

I reviewed the change for correctness and for concurrency. I did not run the fix for F1 or F2, so the suggested fixes are unverified.

### Passage B

The rate limiting PR is OK to merge once F1 is fixed. I also strongly suggest F2.

**F1 (must fix): the limit check can be passed by two requests at once.** The counter is read in one Redis call and written in a second. Two requests that arrive together can both read a count below the limit, and both pass. Fix it with one atomic step: `INCR` followed by `EXPIRE` inside a `MULTI` block, or a Lua script that does both.

**F2 (strongly suggested): the 429 response has no `Retry-After` header.** Clients have no way to know how long to wait, so they will likely retry at once and get another 429.

**F3 (nit): rename `RL_WIN` to `RATE_LIMIT_WINDOW_SECONDS`.** The current name does not say what the value means.

The middleware adds one Redis round trip per request. On staging it measured 0.8 ms at p50.

I reviewed for correctness and for concurrency. The concurrency pass found F1.

### The writer's working notes (the reader never sees these)

Working notes:
- pass 1 (correctness), pass 2 (concurrency)
- F1: limit counter is read and then written in two Redis calls, so two requests can both pass at the limit. Found in pass 2. Fix: use INCR with EXPIRE in one MULTI, or a Lua script
- F2: 429 response has no Retry-After header
- F3: nit, the constant RL_WIN is unclear, suggest RATE_LIMIT_WINDOW_SECONDS
- F4: dropped, was a false alarm about the test clock
- the hot path (the request middleware) adds one Redis round trip, measured 0.8 ms at p50 on staging
- verdict: ok to merge after F1; F2 strongly suggested

---

## pair09

**The task, as the reader knows it:** You are an agent that just spent an hour fixing a flaky test. Your working notes are below. Write the description for your pull request. Reviewers are two engineers on your team who have not seen your notes.

**Facts this reader needs:**
- the flaky test was test_checkout_total, failing about 1 in 20 runs
- cause: two tests share one cart fixture and run in parallel under pytest-xdist
- fix: each test gets its own cart from cart_factory()
- 200 runs after the fix with 0 failures

### Passage A

Fix flaky test_checkout_total by giving each test its own cart

test_checkout_total failed about 1 in 20 runs because it shared a cart fixture with test_apply_coupon. Both tests write to that cart, and pytest-xdist runs them in parallel, so one test could change the cart while the other was checking its total. This PR replaces the shared fixture with a `cart_factory()` fixture in `tests/conftest.py`, and both tests now build their own cart from it.

With this change I ran the suite 200 times and got no failures.

Changes:

- `tests/conftest.py`: adds `cart_factory()` in place of the shared cart fixture
- `tests/test_checkout.py` and `tests/test_coupons.py`: use `cart_factory()` to create a cart per test

I also tried putting a lock around the shared fixture. It fixed the flake but made the suite about 40% slower, so I reverted it.

Clock skew is not the cause: the test still failed with the clock frozen. I did not test whether network calls contribute, because the shared cart accounted for every failure I reproduced.

### Passage B

This fixes the intermittent failure in `test_checkout_total`. The cause was shared test state: `test_checkout_total` and `test_apply_coupon` both wrote to the same cart fixture, and pytest-xdist runs them in parallel, so one test sometimes saw the other's items. Each test now builds its own cart through a new `cart_factory()` fixture.

Locally the test failed in about 1 of every 20 runs before the change. With the change, I ran the suite 200 times and got no failures.

I also checked clock skew and ruled it out, because the test still failed with a frozen clock. I did not look into network causes, since the shared cart explained every failure I saw.

My first attempt put a lock around the shared fixture. It fixed the flake but made the suite about 40% slower, so I reverted it in favor of the factory.

Files changed:

- `tests/conftest.py`: adds `cart_factory()`
- `tests/test_checkout.py` and `tests/test_coupons.py`: use the factory instead of the shared cart

### The writer's working notes (the reader never sees these)

Working notes:
- step 1: reproduced the flake locally, about 1 in 20 runs of test_checkout_total
- H1 (clock skew): ruled out, the failure happens with a frozen clock too
- H2 (shared fixture state): confirmed. test_checkout_total and test_apply_coupon both write to the same cart fixture, and pytest-xdist runs them in parallel
- H3 (network): never tested, H2 explained everything
- fix-2 (the one I kept): each test gets its own cart via a factory, cart_factory(). fix-1 was a lock around the fixture; reverted, it made the suite 40% slower
- ran the suite 200 times with fix-2: 0 failures
- touched files: tests/conftest.py, tests/test_checkout.py, tests/test_coupons.py

---

## pair10

**The task, as the reader knows it:** You are a code-review agent that has finished reviewing a pull request that adds rate limiting to an API. Your working notes are below. Write your final report to the developer who asked for the review. They have not seen your notes or your progress updates.

**Facts this reader needs:**
- the race: the counter is read and written in two separate Redis calls, so two requests at the limit can both get through
- the fix for it: an atomic INCR with EXPIRE (MULTI) or a Lua script
- the 429 response lacks a Retry-After header
- it can merge once the race is fixed
- the middleware adds one Redis round trip, 0.8 ms at p50 on staging

### Passage A

This is ok to merge once the race condition in the limit counter is fixed. I also strongly suggest adding a `Retry-After` header to the 429 response.

**Must fix: race in the counter.** The limiter reads the count and then writes it in two separate Redis calls. Two requests arriving together can both read a count below the limit, both pass, and both write, so the limit is exceeded. Do the increment and expiry atomically instead: `INCR` with `EXPIRE` inside one `MULTI`, or a Lua script.

**Strongly suggested: `Retry-After`.** The 429 response has no `Retry-After` header, so clients have no way to know when to retry.

**Nit.** The constant `RL_WIN` is unclear. `RATE_LIMIT_WINDOW_SECONDS` would say what it is.

**Performance.** The request middleware adds one Redis round trip, which I measured at 0.8 ms at p50 on staging.

I reviewed the change for correctness and for concurrency. The race was found in the concurrency pass. I raised one other concern about the test clock, then dropped it as a false alarm.

### Passage B

The rate limiting PR is fine to merge once F1 is fixed. I also strongly suggest fixing F2.

**F1: the limit can be exceeded under concurrency.** The middleware reads the counter and then writes it in two separate Redis calls. Two requests arriving at the limit can both read a passing value and both be allowed. Do the increment and expiry atomically instead, either with INCR plus EXPIRE inside one MULTI, or with a Lua script.

**F2: the 429 response has no Retry-After header.** Clients can't tell how long to back off. Add the header with the seconds left in the current window.

**F3 (nit):** `RL_WIN` is unclear. I'd rename it `RATE_LIMIT_WINDOW_SECONDS`.

The middleware adds one Redis round trip per request, which I measured at 0.8 ms at p50 on staging.

I reviewed for correctness and then for concurrency. F1 came from the concurrency pass. I raised one other concern about the test clock and dropped it after checking, since it was a false alarm.

### The writer's working notes (the reader never sees these)

Working notes:
- pass 1 (correctness), pass 2 (concurrency)
- F1: limit counter is read and then written in two Redis calls, so two requests can both pass at the limit. Found in pass 2. Fix: use INCR with EXPIRE in one MULTI, or a Lua script
- F2: 429 response has no Retry-After header
- F3: nit, the constant RL_WIN is unclear, suggest RATE_LIMIT_WINDOW_SECONDS
- F4: dropped, was a false alarm about the test clock
- the hot path (the request middleware) adds one Redis round trip, measured 0.8 ms at p50 on staging
- verdict: ok to merge after F1; F2 strongly suggested

---

## pair11

**The task, as the reader knows it:** You are an agent that compared ways to migrate a 40 GB orders table to a new schema. Your working notes are below. Write a message to the team lead in the team's chat channel. The lead has not seen your notes and has to pick an approach today.

**Facts this reader needs:**
- recommendation: dual-write to both tables, backfill, then switch reads
- this means no downtime and about two weeks of work
- the alternative is one migration with about 3 hours of downtime, measured in a staging dry run
- the downtime option is ruled out by the sales period (checkout cannot be down)
- a decision is needed today

### Passage A

I recommend we migrate the orders table with dual-writes (option B below). Can you confirm today?

We would write every order to both the old and new tables, copy the existing 40 GB across with a backfill job, then switch reads to the new table. There is no downtime. It is about 2 weeks of work.

The alternative is to take the site down and migrate in one go. A dry run on staging took 3 hours, and checkout cannot be down that long during the sales period.

We also looked at logical replication to a new cluster, but our hosting tier does not support it.

One risk with dual-writes: the first version of the backfill script timed out at 12 GB, so I wrote a second version. I have not run it against the full table yet.

### Passage B

I recommend Plan B for the orders table migration: dual-write to the old and new tables, backfill, then switch reads. It needs no downtime and about 2 weeks of work. Can you confirm today?

The alternative is Plan A, taking the site down and migrating in one go. A staging dry run (DR-1) estimated 3 hours of downtime. Checkout can't be down that long during the sales period.

I ruled out a third option, logical replication to a new cluster, because our hosting tier doesn't support it.

For the backfill I'd use bf2, the second version of the backfill script. The first version timed out at 12 GB, and the table is 40 GB.

### The writer's working notes (the reader never sees these)

Working notes:
- Plan A: take the site down, migrate in one go. Estimated 3 hours of downtime
- Plan B: dual-write to old and new tables, backfill with the bf2 job, then switch reads. No downtime, about 2 weeks of work
- Plan C: logical replication to a new cluster. Rejected: our hosting tier does not support it
- bf2 = the second version of the backfill script; bf1 timed out at 12 GB
- the 3-hour figure comes from the dry run on staging (DR-1)
- recommendation: B, because checkout cannot be down for 3 hours during the sales period

---

## pair12

**The task, as the reader knows it:** You are an agent that just spent an hour fixing a flaky test. Your working notes are below. Write the description for your pull request. Reviewers are two engineers on your team who have not seen your notes.

**Facts this reader needs:**
- the flaky test was test_checkout_total, failing about 1 in 20 runs
- cause: two tests share one cart fixture and run in parallel under pytest-xdist
- fix: each test gets its own cart from cart_factory()
- 200 runs after the fix with 0 failures

### Passage A

# Fix flaky test_checkout_total by giving each test its own cart

`test_checkout_total` failed about 1 run in 20 when the suite ran in parallel. The cause was shared state: `test_checkout_total` and `test_apply_coupon` both wrote to the same cart fixture, and pytest-xdist runs them at the same time, so one test could change the cart while the other was still reading it.

This PR gives each test its own cart. A new `cart_factory()` fixture in `tests/conftest.py` builds a fresh cart for every test that asks for one. `tests/test_checkout.py` and `tests/test_coupons.py` now call the factory instead of sharing the fixture.

I also tried a lock around the shared fixture. It removed the flake but made the suite about 40% slower, so I reverted it and did not keep it.

I ruled out clock skew: the failure still happens with a frozen clock. I did not test a network cause, because the shared-state explanation accounted for every failure I saw.

Verification: I ran the full suite 200 times with this change and saw no failures. I have not run it on CI.

Files changed:
- `tests/conftest.py` (new `cart_factory()`)
- `tests/test_checkout.py`
- `tests/test_coupons.py`

### Passage B

# Give each checkout test its own cart

`test_checkout_total` failed about 1 run in 20. The cause was shared state. `test_checkout_total` and `test_apply_coupon` both wrote to the same cart fixture, and pytest-xdist ran them in parallel, so one test could change the cart while the other was using it.

This PR adds `cart_factory()` in `tests/conftest.py`, which returns a new cart for each test. `tests/test_checkout.py` and `tests/test_coupons.py` now get their cart from the factory instead of the shared fixture.

Clock skew was ruled out: the failure still happened with the clock frozen. I did not test a network cause, because shared fixture state explains every failure I saw.

I also tried a lock around the shared fixture. It stopped the flake but made the suite about 40% slower, so I removed it.

Verification: with this change, the suite ran 200 times with no failures. Before the change, the flake reproduced locally at about 1 run in 20.

### The writer's working notes (the reader never sees these)

Working notes:
- step 1: reproduced the flake locally, about 1 in 20 runs of test_checkout_total
- H1 (clock skew): ruled out, the failure happens with a frozen clock too
- H2 (shared fixture state): confirmed. test_checkout_total and test_apply_coupon both write to the same cart fixture, and pytest-xdist runs them in parallel
- H3 (network): never tested, H2 explained everything
- fix-2 (the one I kept): each test gets its own cart via a factory, cart_factory(). fix-1 was a lock around the fixture; reverted, it made the suite 40% slower
- ran the suite 200 times with fix-2: 0 failures
- touched files: tests/conftest.py, tests/test_checkout.py, tests/test_coupons.py
