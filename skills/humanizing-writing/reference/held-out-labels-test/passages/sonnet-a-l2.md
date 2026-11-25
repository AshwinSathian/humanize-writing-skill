I recommend Plan B for the orders table migration: dual-write to the old and new tables, backfill, then switch reads. It needs no downtime and about 2 weeks of work. Can you confirm today?

The alternative is Plan A, taking the site down and migrating in one go. A staging dry run (DR-1) estimated 3 hours of downtime. Checkout can't be down that long during the sales period.

I ruled out a third option, logical replication to a new cluster, because our hosting tier doesn't support it.

For the backfill I'd use bf2, the second version of the backfill script. The first version timed out at 12 GB, and the table is 40 GB.
