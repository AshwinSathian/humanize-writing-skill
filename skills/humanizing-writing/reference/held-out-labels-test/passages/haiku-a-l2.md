I recommend Plan B for the orders table migration: dual-write to the old and new tables, backfill with the bf2 script, then switch reads over. It needs no downtime. The cost is about two weeks of work.

I need a decision today. The other option, Plan A, takes the site down and migrates in one go. The 3-hour downtime estimate comes from the dry run on staging (DR-1). Checkout cannot be down for 3 hours during the sales period, so I ruled it out.

Plan C, logical replication to a new cluster, is off the table. Our hosting tier does not support it.

One risk to know about: the first backfill script (bf1) timed out at 12 GB. bf2 is the second version of that script and is the one the plan depends on.
