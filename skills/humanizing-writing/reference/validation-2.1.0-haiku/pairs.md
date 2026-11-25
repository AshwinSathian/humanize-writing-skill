# Blind pairs

---

## pair01

**Task given to both writers:** Write a section of about 200 words for an internal engineering blog arguing that the team should adopt feature flags. Audience: your own engineering team.

### Passage A

## Why we should adopt feature flags

A feature flag is a conditional around new behavior. A small service decides, per request or per user, whether the new branch runs. The code ships on the day it merges, but it stays off until someone turns it on. That separates deploying code from releasing it to users.

Right now a half-finished feature either sits on a long-lived branch or reaches every user at once. With flags, we can merge to main every day, enable the change for internal accounts, then widen the rollout to a small share of traffic while we watch error rates. If the new path misbehaves, we turn the flag off in seconds instead of reverting and redeploying.

Suppose a deploy changes how checkout totals are calculated. Behind a flag, the new calculation can run for 5% of orders while the old path runs for the rest, and we can compare the two results before anyone sees a wrong price.

Flags have costs too. Each one is a branch that needs tests in both states, and old flags pile up if nobody removes them. We should give every flag an owner and a removal date, and delete it once its rollout is finished.

### Passage B

Feature flags let us ship code to production without turning it on for everyone. A flag wraps a code path in a conditional, and its value comes from a config service instead of from a deploy. That split helps us in three concrete ways.

First, a risky change can go out switched off. If a release misbehaves, we flip the flag and the old path runs again. Nobody waits for a rollback build to clear CI, and nobody has to find the offending commit under pressure.

Second, we can release to a small group first. A flag can target internal accounts, one region, or a fixed slice of users, so the first people to hit a new checkout flow are the ones we can reach quickly if something breaks.

Third, unfinished work can merge to main. Long-lived branches are where conflicts and stale assumptions pile up. A flag lets a half-built feature sit in the codebase, hidden, while everyone else keeps integrating.

The costs are real. Each flag is a second code path to test, and flags nobody removes turn into a maze. So I'd propose a simple rule: every flag gets an owner and a removal date, and once a feature is fully on, the flag comes out. We could pilot this on the next checkout change and see whether the overhead stays small.

---

## pair02

**Task given to both writers:** Write the description for a pull request, about 150 words. Use only these facts:
- Payment status was fetched by polling the provider every 30 seconds from the cron job `poll_payments` in `billing-worker`.
- This PR adds a webhook endpoint, `POST /hooks/payments`, in `billing-worker`.
- Webhook requests are verified with an HMAC-SHA256 signature.
- `notifier` now reacts to the webhook event instead of the poll result.
- The `poll_payments` job stays, but runs every 15 minutes as a fallback.

### Passage A

Payment status used to come from polling. The cron job `poll_payments` in `billing-worker` asked the payment provider for status every 30 seconds. This PR adds a webhook endpoint, `POST /hooks/payments`, in `billing-worker`, so the provider sends status changes to us when they happen instead.

Each webhook request is checked against an HMAC-SHA256 signature before its payload is used. The signature check is the part to review most closely, because it decides whether a request is accepted at all.

`notifier` now reacts to the webhook event instead of the result of the poll.

The `poll_payments` job stays in place. It now runs every 15 minutes as a fallback.

### Passage B

Until now, payment status has come from polling. The `poll_payments` cron job in `billing-worker` asked the payment provider for status every 30 seconds, and downstream processing acted on whatever each poll returned. That works, but it means status changes can lag by up to half a minute, and every check costs a request whether or not anything has changed.

This PR switches the primary path to push. It adds a webhook endpoint, `POST /hooks/payments`, in `billing-worker` that receives payment events from the provider as they happen. Each webhook request is verified with an HMAC-SHA256 signature before its payload is trusted, so unsigned or tampered requests do not reach the handler.

`notifier` now reacts to the webhook event instead of the poll result, so notifications go out as soon as the provider reports a change.

The `poll_payments` job is not removed. It stays in place as a fallback and now runs every 15 minutes, which catches any event that never arrives, at a much lower request volume than before.

---

## pair03

**Task given to both writers:** Write the description for a pull request, about 150 words. Use only these facts:
- Payment status was fetched by polling the provider every 30 seconds from the cron job `poll_payments` in `billing-worker`.
- This PR adds a webhook endpoint, `POST /hooks/payments`, in `billing-worker`.
- Webhook requests are verified with an HMAC-SHA256 signature.
- `notifier` now reacts to the webhook event instead of the poll result.
- The `poll_payments` job stays, but runs every 15 minutes as a fallback.

### Passage A

Payment status used to come from polling. The cron job `poll_payments` in `billing-worker` asked the payment provider for status every 30 seconds. This PR adds a webhook endpoint, `POST /hooks/payments`, in `billing-worker`, so the provider sends status changes to us when they happen instead.

Each webhook request is checked against an HMAC-SHA256 signature before its payload is used. The signature check is the part to review most closely, because it decides whether a request is accepted at all.

`notifier` now reacts to the webhook event instead of the result of the poll.

The `poll_payments` job stays in place. It now runs every 15 minutes as a fallback.

### Passage B

Payment status used to come from polling. The `poll_payments` cron job in `billing-worker` asked the provider for each payment's status every 30 seconds. This PR adds a webhook in the same service, `POST /hooks/payments`, so the provider can post payment events to us as they happen instead of us asking over and over.

Every webhook request is verified with an HMAC-SHA256 signature before the body is trusted. Reviewers should look at that check first, since it decides which requests get through.

`notifier` now reacts to the webhook event instead of the poll result. Notifications no longer depend on the polling loop.

The `poll_payments` job stays, but it now runs every 15 minutes as a fallback. If a webhook is missed or delayed, the next poll still picks up the change, so nothing is lost for good.

---

## pair04

**Task given to both writers:** Explain, in about 200 words, why database indexes speed up reads and what they cost. Audience: backend developers who have used SQL but never tuned it.

### Passage A

A database index is a separate sorted structure, usually a B-tree, that maps column values to the rows holding them. Without one, a query such as `SELECT * FROM orders WHERE customer_id = 42` makes the engine scan every row in the table. With an index on `customer_id`, the engine walks a tree a few levels deep, finds the matching entries, and reads only the pages that contain those rows. On a table with ten million rows, that is typically a few page reads instead of hundreds of thousands.

Because the index is sorted, it also serves range conditions like `created_at > '2026-01-01'` and `ORDER BY` clauses without a separate sort step.

The costs fall on writes and storage. Each INSERT, UPDATE, or DELETE that touches an indexed column must update every index on the table, so each index adds work to every write. Indexes take disk space, sometimes a large fraction of the table's own size, and their hot pages compete for memory in the buffer cache. An index the application no longer uses still gets maintained on every write.

An index is not always used. A query that returns most of a table may still scan it, because reading the index first costs more than reading the table. Run `EXPLAIN` on a slow query to see which access path the engine chose before adding an index, and check index usage statistics later to find the ones nobody reads.

### Passage B

A database index is a separate data structure that lets the engine find rows without reading the whole table. Most indexes are B-trees: sorted, balanced trees whose leaves point to rows. When a query filters on an indexed column, the engine walks a few levels of the tree to reach the matching keys and then fetches only those rows. Without an index, the same query triggers a full table scan, reading every row to check the condition. On a table with ten million rows, that difference is often the gap between milliseconds and several seconds.

Indexes also help with sorting and joins. If an index already holds values in the order a query asks for, the engine can skip the sort step. A join on an indexed column can look up matching rows directly instead of comparing every pair.

The cost is paid on writes and storage. Every INSERT, UPDATE, or DELETE that touches an indexed column must also update each index on that table, so a row change on a table with six indexes becomes roughly seven writes. Indexes take disk space, sometimes as much as the table itself, and they compete for memory with the data pages the database wants to keep cached. The query planner also has more options to evaluate, which adds planning work.

An index is therefore a trade. Columns that appear often in WHERE, JOIN, and ORDER BY clauses usually earn their keep, especially on read-heavy tables. Indexing every column does not. Check the query plan with EXPLAIN before adding one, and drop indexes that no query uses.

---

## pair05

**Task given to both writers:** Explain, in about 200 words, why database indexes speed up reads and what they cost. Audience: backend developers who have used SQL but never tuned it.

### Passage A

A database index is a separate sorted structure, usually a B-tree, that maps column values to the rows holding them. Without one, a query such as `SELECT * FROM orders WHERE customer_id = 42` makes the engine scan every row in the table. With an index on `customer_id`, the engine walks a tree a few levels deep, finds the matching entries, and reads only the pages that contain those rows. On a table with ten million rows, that is typically a few page reads instead of hundreds of thousands.

Because the index is sorted, it also serves range conditions like `created_at > '2026-01-01'` and `ORDER BY` clauses without a separate sort step.

The costs fall on writes and storage. Each INSERT, UPDATE, or DELETE that touches an indexed column must update every index on the table, so each index adds work to every write. Indexes take disk space, sometimes a large fraction of the table's own size, and their hot pages compete for memory in the buffer cache. An index the application no longer uses still gets maintained on every write.

An index is not always used. A query that returns most of a table may still scan it, because reading the index first costs more than reading the table. Run `EXPLAIN` on a slow query to see which access path the engine chose before adding an index, and check index usage statistics later to find the ones nobody reads.

### Passage B

A database index is a separate structure, usually a B-tree, that maps the values of one or more columns to the rows that contain them. Without one, a query like `WHERE email = 'a@b.com'` has to scan the whole table and check every row. With an index on `email`, the engine walks a tree of sorted keys, which is only a few levels deep even for large tables, and jumps straight to the matching rows. The work grows with the logarithm of the table size instead of the table size itself.

The cost shows up on the write side. Every INSERT, UPDATE, or DELETE that touches an indexed column also has to update each index on that table, so a table with five indexes does five extra tree modifications for every row written. Indexes take disk space, often a large fraction of the table's own size, and they compete for memory with the data pages the database would otherwise keep cached. The planner has to weigh them too, and when it picks an index that doesn't fit the query, the result can be slower than the scan it replaced.

So an index is a trade. Columns that appear often in filters, joins, and sort orders usually earn their place. A column you never query by only slows your writes. Run EXPLAIN before adding an index to see whether the planner would use it, and run it again afterward, because the plan is the only reliable evidence that the index helps.

---

## pair06

**Task given to both writers:** Write a section of about 200 words for an internal engineering blog arguing that the team should adopt feature flags. Audience: your own engineering team.

### Passage A

Every production release is a bet that the code will behave the way we tested it. Usually the bet pays off. When it doesn't, our fastest exit is a rollback, which also pulls back the good work shipped alongside the bad. Feature flags give us a better option. We deploy new behavior behind a switch that starts off, then enable it for internal accounts, a small slice of users, or one region. If something breaks, we turn it off in seconds without redeploying.

The benefits extend past safety. Flags let us merge unfinished work to main without exposing it, which keeps branches short and cuts the merge pain of long-lived feature branches. They also let product and engineering agree on a rollout that moves in measured steps rather than one launch day.

Flags carry a cost. Each one is a branch someone has to understand, and stale flags pile up fast. So we adopt them with a rule: every flag gets an owner, a planned removal date, and a ticket to delete it once the rollout is complete. I propose we pilot this on the next two releases, track how often we flip a switch instead of rolling back, and decide from there.

### Passage B

## Why we should adopt feature flags

A feature flag is a conditional around new behavior. A small service decides, per request or per user, whether the new branch runs. The code ships on the day it merges, but it stays off until someone turns it on. That separates deploying code from releasing it to users.

Right now a half-finished feature either sits on a long-lived branch or reaches every user at once. With flags, we can merge to main every day, enable the change for internal accounts, then widen the rollout to a small share of traffic while we watch error rates. If the new path misbehaves, we turn the flag off in seconds instead of reverting and redeploying.

Suppose a deploy changes how checkout totals are calculated. Behind a flag, the new calculation can run for 5% of orders while the old path runs for the rest, and we can compare the two results before anyone sees a wrong price.

Flags have costs too. Each one is a branch that needs tests in both states, and old flags pile up if nobody removes them. We should give every flag an owner and a removal date, and delete it once its rollout is finished.
