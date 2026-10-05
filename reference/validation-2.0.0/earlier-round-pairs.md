# Blind pairs

---

## pair01

**Task given to both writers:** Explain, in about 200 words, why database indexes speed up reads and what they cost. Audience: backend developers who have used SQL but never tuned it.

### Passage A

Without an index, a query like `WHERE email = 'a@b.com'` forces the database to read every row in the table and check each one. On a table with ten million rows, that is ten million comparisons for one answer. An index is a separate structure, usually a B-tree, that keeps the indexed column's values in sorted order alongside pointers to the rows that hold them. Finding a value means walking down a tree three or four levels deep, not scanning a table. Range queries and `ORDER BY` get cheaper too, because the sorting was already done.

None of this is free. Every index takes disk space, sometimes a large fraction of the table's own size. Every `INSERT` has to add an entry to each index on the table, and every `UPDATE` to an indexed column has to move one, so write-heavy tables slow down as indexes pile up. The planner can also ignore an index. A filter on a column with only a few distinct values, like a boolean, often matches so many rows that a full scan is faster.

So the habit to build is to index for the queries you actually run. Check them with `EXPLAIN`, add an index when a slow query scans the whole table, and drop the ones nothing uses.

### Passage B

Without an index, a query like `SELECT * FROM orders WHERE customer_id = 4217` makes the database read every row in the table and check each one. That is a full table scan, and its cost grows with the size of the table. With ten million rows, finding the three that match means ten million checks.

An index is a separate, sorted structure that maps column values to the location of the matching rows. Most relational databases implement it as a B-tree. The database starts at the root, follows a few pointers down the tree, and arrives at the right entries, because each level narrows the range by a large factor. Sorted order also helps range queries (`BETWEEN`, `<`, `ORDER BY`), since neighbouring values sit next to each other.

The costs are real. Every index takes disk space and competes with your data for memory. Every `INSERT`, `UPDATE`, and `DELETE` must also update each index on the affected columns, so a table with eight indexes does about nine writes per row change. An index can also go unused: a filter like `WHERE lower(email) = ...` cannot use a plain index on `email`.

Index the columns that frequent queries filter, join, and sort on, and confirm with `EXPLAIN` that the index is used. On write-heavy tables, add them sparingly.

---

## pair02

**Task given to both writers:** Explain, in about 200 words, why database indexes speed up reads and what they cost. Audience: backend developers who have used SQL but never tuned it.

### Passage A

Without an index, a query like `SELECT * FROM orders WHERE customer_id = 42` makes the database read every row in `orders` and check each one. On a table of ten million rows, that is ten million comparisons to find a handful of matches.

An index on `customer_id` is a separate structure, usually a B-tree, that keeps the column's values in sorted order next to pointers to the rows they came from. Because the values are sorted, the database can find 42 the way you find a name in a phone book: open to the middle, throw away half, repeat. Binary search over ten million entries takes about 24 steps. A B-tree holds hundreds of keys per page, so it gets there in three or four page reads. The same ordering speeds up range filters, `ORDER BY`, and joins on that column.

You pay for this on writes. Every `INSERT` and `DELETE`, and every `UPDATE` that touches an indexed column, has to change the index as well as the table, so a table with six indexes does roughly seven writes per insert. Indexes also take disk space and compete with table data for memory.

They don't always help, either. If a filter matches most of the table, the planner skips the index and scans, because following pointers one row at a time is slower than reading straight through. Run `EXPLAIN` on the query to see which you got.

### Passage B

Without an index, a query like `SELECT * FROM orders WHERE customer_id = 42` makes the database read every row in `orders` and test each one. This is a sequential scan, and its cost grows in step with the table: ten times the rows means ten times the work.

An index is a separate structure that stores the values of one or more columns in sorted order, each with a pointer to its row. Most databases use a B-tree for this. Because the values are sorted, the database can find `customer_id = 42` by descending a few levels of the tree, and that number of levels grows very slowly as the table grows. The same ordering helps range filters such as `created_at > '2026-01-01'`, `ORDER BY` on the indexed column, and joins on it.

You pay for this on writes and in storage. Every `INSERT` and `DELETE`, and every `UPDATE` that changes an indexed column, has to modify the index as well as the table, so a table with six indexes does roughly seven writes for each inserted row. Each index also takes disk space and competes with table data for memory.

An index is also no help when a filter matches a large share of the table. The planner will usually ignore it and scan, because following pointers one row at a time is slower than reading the table straight through. Run `EXPLAIN` on the query to see which plan the database chose.

---

## pair03

**Task given to both writers:** A section of about 200 words for an internal engineering blog arguing that the team should adopt feature flags. Audience: the writer's own engineering team. The writer was given NO facts about the team or its history.

### Passage A

We should start using feature flags, and the reason is the last release.

Two weeks ago we shipped the new checkout flow together with the tax library upgrade. When error rates rose, we could not tell which change caused it, and the only way to undo either was to revert the whole deploy and take both changes with it. That cost us most of an afternoon and a rebuilt release branch.

A flag would have changed that. Merge the checkout code dark, deploy it with the flag off, and turn it on for ten percent of users. If errors climb, turning it off takes seconds and needs no deploy. Deploying and releasing become two separate decisions, which also means half-finished work can land on main every day instead of living on a long branch that someone has to rebase on Friday.

Flags have a cost, and we should be honest about it. Each one is an extra code path to test, and a flag nobody removes becomes permanent clutter. So I propose a rule: every flag gets an owner and a removal date when it is created, and we clean up the expired ones at the start of each sprint.

For a first step, I would pick a hosted flag service over building our own, and use it for just the next risky change.

### Passage B

## Why we should adopt feature flags

Today, shipping code and releasing a feature are the same event. When a change merges and deploys, every user gets it at once, and if it breaks something, our only option is a revert and a second deploy. That is slow during an outage, and it makes us cautious about merging anything large.

A feature flag separates the two. We deploy the code with the new behavior switched off, then turn it on when we choose: first for the team, then for a small percentage of users, then for everyone. If error rates rise, we switch it off in seconds without a deploy.

In practice, long-running features can merge to main in small pieces behind a flag, which ends the week-long branches that are painful to rebase. Product can schedule a launch for Tuesday morning without engineering holding a release candidate. Incidents get shorter, because turning off a flag is faster than building and deploying a revert.

Flags have a cost. Each one adds a branch to the code, and flags that are never removed pile up as dead paths nobody dares delete. Every flag would need an owner and a removal date.

I suggest we start with one upcoming feature, use a simple config-backed flag rather than buying a platform, and review the result after a month.

---

## pair04

**Task given to both writers:** A pull request description, about 150 words, using ONLY these facts: (1) payment status was fetched by polling the provider every 30 seconds from the cron job `poll_payments` in `billing-worker`; (2) the PR adds a webhook endpoint `POST /hooks/payments` in `billing-worker`; (3) webhook requests are verified with an HMAC-SHA256 signature; (4) `notifier` now reacts to the webhook event instead of the poll result; (5) `poll_payments` stays but runs every 15 minutes as a fallback.

### Passage A

## Summary

Until now we learned about payment status changes only by polling. The `poll_payments` cron job in `billing-worker` asked the provider for status every 30 seconds. This PR adds a webhook endpoint to `billing-worker`, so the provider can send us status changes, and makes the webhook the event that `notifier` responds to.

## Changes

- Adds `POST /hooks/payments` to `billing-worker`.
- Verifies each webhook request with an HMAC-SHA256 signature.
- `notifier` now reacts to the webhook event instead of the poll result.
- `poll_payments` now runs every 15 minutes instead of every 30 seconds.

## Why the cron job stays

`poll_payments` is not removed. It remains as a fallback alongside the webhook, at the lower frequency above.

## Reviewing

The two things to check are the signature verification on `POST /hooks/payments` and the switch in `notifier` from the poll result to the webhook event.

### Passage B

## Receive payment status by webhook instead of polling

Until now, `billing-worker` learned about payment status changes by polling the provider every 30 seconds from the `poll_payments` cron job. A status change could therefore sit unnoticed for up to 30 seconds, and we made a request to the provider on every tick whether or not anything had changed.

This PR adds a webhook endpoint, `POST /hooks/payments`, to `billing-worker`, so the provider can tell us about a status change when it happens.

### Changes

- **New endpoint:** `POST /hooks/payments` in `billing-worker` receives payment status events from the provider.
- **Signature check:** each webhook request is verified with an HMAC-SHA256 signature.
- **`notifier`:** now reacts to the webhook event instead of the poll result.
- **`poll_payments`:** the job stays, but its interval goes from 30 seconds to 15 minutes. It now serves as a fallback for any status change the webhook does not deliver.

---

## pair05

**Task given to both writers:** A pull request description, about 150 words, using ONLY these facts: (1) payment status was fetched by polling the provider every 30 seconds from the cron job `poll_payments` in `billing-worker`; (2) the PR adds a webhook endpoint `POST /hooks/payments` in `billing-worker`; (3) webhook requests are verified with an HMAC-SHA256 signature; (4) `notifier` now reacts to the webhook event instead of the poll result; (5) `poll_payments` stays but runs every 15 minutes as a fallback.

### Passage A

## Replace payment polling with a webhook

Until now, `billing-worker` learned about payment status by polling the provider every 30 seconds from the `poll_payments` cron job. This PR adds a webhook endpoint, `POST /hooks/payments`, so the provider can report a status change to us directly instead of us asking for it.

Each webhook request is verified with an HMAC-SHA256 signature before it is processed, so requests that do not carry a valid signature are not acted on.

`notifier` now reacts to the webhook event instead of the poll result.

The `poll_payments` job stays as a fallback, in case a webhook is missed. It now runs every 15 minutes instead of every 30 seconds.

Reviewers may want to start with the signature verification in the new endpoint, since it is the only thing standing between the public internet and the `notifier` trigger.

### Passage B

## Summary

Until now, `billing-worker` learned about payment status by polling the provider every 30 seconds from the `poll_payments` cron job. This PR adds a webhook so the provider tells us when the status changes.

## Changes

- Add `POST /hooks/payments` to `billing-worker`. Each request is verified with an HMAC-SHA256 signature.
- `notifier` now reacts to the webhook event instead of the poll result.
- `poll_payments` stays, but runs every 15 minutes instead of every 30 seconds. It is now a fallback for any webhook we miss.

## Notes

Notifications should now fire when the provider sends the event, not on the next poll. Reviewers may want to look closely at the signature check, since it is the only thing authenticating requests to the new endpoint.

---

## pair06

**Task given to both writers:** A section of about 200 words for an internal engineering blog arguing that the team should adopt feature flags. Audience: the writer's own engineering team. The writer was given NO facts about the team or its history.

### Passage A

## Why we should ship behind flags

Right now, deploying code and releasing a feature are the same event for us. The moment a branch merges and goes out, every user gets the change, and if it misbehaves our only way back is another deploy.

A feature flag splits those two events. The code ships dark, wrapped in a conditional that reads a value we can change at runtime. We turn it on for ourselves first, then for a small share of users, then for everyone. If error rates climb, we turn it off. That takes seconds and needs no revert, no rebuild, and nobody hunting for the last good commit while the incident channel fills up.

Flags also change how we merge. Half-finished work can go into main behind a disabled flag, so a feature that takes three weeks no longer needs a three-week branch and the rebase that comes with it.

There is a cost, and I'd rather name it now. Every flag adds a second code path that someone has to test, and a flag left in place after launch is dead code with a switch attached. So the proposal comes with a rule: each flag gets an owner and a removal ticket on the day it is created.

I think that trade is worth making. I'd like to try it on the next feature we start and review how it went once that feature is fully released.

### Passage B

## Why we should adopt feature flags

Without flags, deploying code and releasing a feature are the same event. Whatever is on main when we deploy is what every user gets. A feature flag separates the two: the code ships switched off, and we turn it on later, for whoever we choose.

That separation changes how we can work. Unfinished work can merge behind a flag, so branches stay short and merge conflicts stay small. A new code path can go to internal accounts first, then to 5% of users, then to everyone, and we can watch error rates at each step. Rollback also gets faster. Suppose a new checkout flow starts throwing errors an hour after it goes live. Today the fix is a revert and a full redeploy. With a flag, we switch it off and debug with the old path serving traffic.

Flags have a cost. Each one adds a second code path that needs testing, and a flag left in place after its rollout is dead code with a conditional around it.

I propose we start small: put the next risky change behind a single flag read from config, with no vendor or new service. Each flag gets an owner, and the owner opens a removal ticket on the day the flag is created. If that works for two or three releases, we can decide whether a proper flag service is worth it.

---

## pair07

**Task given to both writers:** Explain, in about 200 words, why database indexes speed up reads and what they cost. Audience: backend developers who have used SQL but never tuned it.

### Passage A

Without an index, a query like `SELECT * FROM orders WHERE customer_id = 4217` makes the database read every row in the table and check each one. That is a full table scan, and its cost grows with the size of the table. With ten million rows, finding the three that match means ten million checks.

An index is a separate, sorted structure that maps column values to the location of the matching rows. Most relational databases implement it as a B-tree. The database starts at the root, follows a few pointers down the tree, and arrives at the right entries, because each level narrows the range by a large factor. Sorted order also helps range queries (`BETWEEN`, `<`, `ORDER BY`), since neighbouring values sit next to each other.

The costs are real. Every index takes disk space and competes with your data for memory. Every `INSERT`, `UPDATE`, and `DELETE` must also update each index on the affected columns, so a table with eight indexes does about nine writes per row change. An index can also go unused: a filter like `WHERE lower(email) = ...` cannot use a plain index on `email`.

Index the columns that frequent queries filter, join, and sort on, and confirm with `EXPLAIN` that the index is used. On write-heavy tables, add them sparingly.

### Passage B

A database index speeds up reads because it lets the engine skip most of the table. Without one, a query like `WHERE email = 'a@example.com'` forces a full scan: the database reads every row and checks each against the condition. That cost grows linearly with table size. An index, usually a B-tree, is a separate sorted structure that maps column values to the rows that hold them. Because it is sorted and shallow, the database can find a value in a handful of steps, typically three or four page reads even for millions of rows, and then jump straight to the matching rows.

The speedup comes at a price, and writes pay it. Every INSERT, UPDATE, or DELETE must also update each index on the affected table, so a table with six indexes does roughly seven writes for every row change. Indexes also consume disk and memory. A large index competes with your data for the buffer cache, which can slow down other queries.

There is a planning cost too. Indexes help most when a query is selective, returning a small fraction of rows. On a low-cardinality column such as a boolean flag, the optimizer will often ignore the index and scan anyway. Add indexes for the queries you actually run, confirm with `EXPLAIN` that they are used, and drop the ones that never are.

---

## pair08

**Task given to both writers:** A section of about 200 words for an internal engineering blog arguing that the team should adopt feature flags. Audience: the writer's own engineering team. The writer was given NO facts about the team or its history.

### Passage A

## Why we should adopt feature flags

Right now, deploying code and releasing a feature are the same event. When we merge to main and ship, every user gets the change at once, and if something goes wrong, our only remedy is a rollback or a hotfix. Both are slow and stressful, and both usually happen at the worst possible time.

Feature flags separate those two events. We ship code to production switched off, then turn it on when we are ready: first for ourselves, then for a small percentage of users, then for everyone. If error rates climb, we flip the flag off in seconds without a deploy.

This changes how we work in a few concrete ways. Long-running projects can merge to main daily behind a flag instead of living on a branch for weeks and producing painful merges. Product and support can see a feature in production before launch day. And we can run experiments, comparing behavior between groups, without building custom machinery each time.

Flags are not free. Each one adds a branch in the code and a state to test, and stale flags become clutter. To keep that manageable, every flag should have an owner and a removal date, and we should delete it once the rollout is complete. I propose we start with one upcoming feature, use a simple hosted or open-source flag service, and review how it went after a month.

### Passage B

## Why we should adopt feature flags

Today, shipping code and releasing a feature are the same event. When a change merges and deploys, every user gets it at once, and if it breaks something, our only option is a revert and a second deploy. That is slow during an outage, and it makes us cautious about merging anything large.

A feature flag separates the two. We deploy the code with the new behavior switched off, then turn it on when we choose: first for the team, then for a small percentage of users, then for everyone. If error rates rise, we switch it off in seconds without a deploy.

In practice, long-running features can merge to main in small pieces behind a flag, which ends the week-long branches that are painful to rebase. Product can schedule a launch for Tuesday morning without engineering holding a release candidate. Incidents get shorter, because turning off a flag is faster than building and deploying a revert.

Flags have a cost. Each one adds a branch to the code, and flags that are never removed pile up as dead paths nobody dares delete. Every flag would need an owner and a removal date.

I suggest we start with one upcoming feature, use a simple config-backed flag rather than buying a platform, and review the result after a month.

---

## pair09

**Task given to both writers:** Explain, in about 200 words, why database indexes speed up reads and what they cost. Audience: backend developers who have used SQL but never tuned it.

### Passage A

Without an index, a query like `SELECT * FROM orders WHERE customer_id = 42` makes the database read every row in the table and check each one. That is a full table scan, and its cost grows in step with the table. At a thousand rows you will never notice. At fifty million you will.

An index is a second, smaller structure the database keeps alongside the table, usually a B-tree. It holds the values of the indexed column in sorted order, each with a pointer back to its row. Because the values are sorted, the database can find `customer_id = 42` by descending a few levels of the tree instead of reading everything. A lookup in fifty million rows takes about four or five page reads. The same sorted order also helps range filters, `ORDER BY`, and joins on that column.

The cost falls on writes. Every `INSERT`, `DELETE`, and `UPDATE` of an indexed column has to change the index as well as the table, so a table with six indexes does roughly seven writes per inserted row. Indexes also take disk space and compete with table data for memory.

Index the columns your slow queries filter, join, and sort on, then check with `EXPLAIN` that the planner is using them. Drop the ones it ignores.

### Passage B

Without an index, a query like `SELECT * FROM orders WHERE customer_id = 42` makes the database read every row in `orders` and test each one. This is a sequential scan, and its cost grows in step with the table: ten times the rows means ten times the work.

An index is a separate structure that stores the values of one or more columns in sorted order, each with a pointer to its row. Most databases use a B-tree for this. Because the values are sorted, the database can find `customer_id = 42` by descending a few levels of the tree, and that number of levels grows very slowly as the table grows. The same ordering helps range filters such as `created_at > '2026-01-01'`, `ORDER BY` on the indexed column, and joins on it.

You pay for this on writes and in storage. Every `INSERT` and `DELETE`, and every `UPDATE` that changes an indexed column, has to modify the index as well as the table, so a table with six indexes does roughly seven writes for each inserted row. Each index also takes disk space and competes with table data for memory.

An index is also no help when a filter matches a large share of the table. The planner will usually ignore it and scan, because following pointers one row at a time is slower than reading the table straight through. Run `EXPLAIN` on the query to see which plan the database chose.

---

## pair10

**Task given to both writers:** A pull request description, about 150 words, using ONLY these facts: (1) payment status was fetched by polling the provider every 30 seconds from the cron job `poll_payments` in `billing-worker`; (2) the PR adds a webhook endpoint `POST /hooks/payments` in `billing-worker`; (3) webhook requests are verified with an HMAC-SHA256 signature; (4) `notifier` now reacts to the webhook event instead of the poll result; (5) `poll_payments` stays but runs every 15 minutes as a fallback.

### Passage A

## Summary

Until now we learned about payment status changes only by polling. The `poll_payments` cron job in `billing-worker` asked the provider for status every 30 seconds. This PR adds a webhook endpoint to `billing-worker`, so the provider can send us status changes, and makes the webhook the event that `notifier` responds to.

## Changes

- Adds `POST /hooks/payments` to `billing-worker`.
- Verifies each webhook request with an HMAC-SHA256 signature.
- `notifier` now reacts to the webhook event instead of the poll result.
- `poll_payments` now runs every 15 minutes instead of every 30 seconds.

## Why the cron job stays

`poll_payments` is not removed. It remains as a fallback alongside the webhook, at the lower frequency above.

## Reviewing

The two things to check are the signature verification on `POST /hooks/payments` and the switch in `notifier` from the poll result to the webhook event.

### Passage B

## Receive payment status by webhook instead of polling

### Before

`billing-worker` learned about payment status changes from the `poll_payments` cron job, which asked the provider every 30 seconds. `notifier` acted on whatever each poll returned.

### What changed

- `billing-worker` has a new endpoint, `POST /hooks/payments`, that the provider calls when a payment's status changes.
- Each request to that endpoint is verified with an HMAC-SHA256 signature.
- `notifier` now reacts to the webhook event. It no longer reads the poll result.
- `poll_payments` is still here, but it runs every 15 minutes instead of every 30 seconds.

### Why the cron job stays

The webhook is now the main path for status updates. Polling remains as a fallback at the longer interval, so a status change still reaches us if a webhook delivery never arrives.

### Reviewing

The signature check on `POST /hooks/payments` deserves the closest read, since that endpoint accepts requests from outside. The `notifier` change is the other place behaviour differs from before.

---

## pair11

**Task given to both writers:** A section of about 200 words for an internal engineering blog arguing that the team should adopt feature flags. Audience: the writer's own engineering team. The writer was given NO facts about the team or its history.

### Passage A

## Why we should adopt feature flags

Without flags, deploying code and releasing a feature are the same event. Whatever is on main when we deploy is what every user gets. A feature flag separates the two: the code ships switched off, and we turn it on later, for whoever we choose.

That separation changes how we can work. Unfinished work can merge behind a flag, so branches stay short and merge conflicts stay small. A new code path can go to internal accounts first, then to 5% of users, then to everyone, and we can watch error rates at each step. Rollback also gets faster. Suppose a new checkout flow starts throwing errors an hour after it goes live. Today the fix is a revert and a full redeploy. With a flag, we switch it off and debug with the old path serving traffic.

Flags have a cost. Each one adds a second code path that needs testing, and a flag left in place after its rollout is dead code with a conditional around it.

I propose we start small: put the next risky change behind a single flag read from config, with no vendor or new service. Each flag gets an owner, and the owner opens a removal ticket on the day the flag is created. If that works for two or three releases, we can decide whether a proper flag service is worth it.

### Passage B

## Why we should adopt feature flags

Right now, merging code and releasing it to users are the same event for us. That coupling is behind most of what makes our releases stressful. A half-finished feature has to live on a long-running branch until it is ready, and the longer the branch lives, the worse the merge. When something breaks in production, our only fix is a revert and a full redeploy, which takes long enough that users feel it.

Feature flags separate the two. We merge unfinished work to main behind a flag that is off, so branches stay short and conflicts stay small. When the work is ready, we turn it on for ourselves, then for a small percentage of users, and then for everyone, watching the error rates at each step. If the numbers go wrong, we switch the flag off in seconds, without a deploy.

Flags do have a cost. Each one adds a branch to the code, and a flag nobody removes becomes a path nobody tests. We can keep that under control with one rule: every flag gets an owner and a removal date when it is created, and we clear out expired ones every sprint.

I propose we try this on the next two projects and then compare how those releases went against our last two.

---

## pair12

**Task given to both writers:** A pull request description, about 150 words, using ONLY these facts: (1) payment status was fetched by polling the provider every 30 seconds from the cron job `poll_payments` in `billing-worker`; (2) the PR adds a webhook endpoint `POST /hooks/payments` in `billing-worker`; (3) webhook requests are verified with an HMAC-SHA256 signature; (4) `notifier` now reacts to the webhook event instead of the poll result; (5) `poll_payments` stays but runs every 15 minutes as a fallback.

### Passage A

## Replace payment polling with a webhook

Until now, `billing-worker` learned about payment status by polling the provider every 30 seconds from the `poll_payments` cron job. This PR adds a webhook endpoint, `POST /hooks/payments`, so the provider can report a status change to us directly instead of us asking for it.

Each webhook request is verified with an HMAC-SHA256 signature before it is processed, so requests that do not carry a valid signature are not acted on.

`notifier` now reacts to the webhook event instead of the poll result.

The `poll_payments` job stays as a fallback, in case a webhook is missed. It now runs every 15 minutes instead of every 30 seconds.

Reviewers may want to start with the signature verification in the new endpoint, since it is the only thing standing between the public internet and the `notifier` trigger.

### Passage B

## Add payment webhook; reduce polling to a fallback

Until now, `billing-worker` learned about payment status changes by polling the provider every 30 seconds from the `poll_payments` cron job.

This PR adds a webhook endpoint, `POST /hooks/payments`, to `billing-worker`. Incoming requests are verified with an HMAC-SHA256 signature before they are processed.

`notifier` now reacts to the webhook event instead of the poll result, so status changes are no longer tied to the polling interval.

The `poll_payments` job is not removed. It now runs every 15 minutes instead of every 30 seconds and acts as a fallback in case a webhook is missed.
