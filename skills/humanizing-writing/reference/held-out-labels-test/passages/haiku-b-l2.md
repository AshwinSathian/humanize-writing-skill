I recommend Plan B: dual-write to the old and new tables, backfill the existing rows, then switch reads to the new table. It causes no downtime, and it takes about two weeks of work. Checkout cannot be down for the roughly 3 hours that Plan A needs, so Plan B is the only option that fits the sales period.

Plan A takes the site down and migrates in one pass. The 3-hour figure comes from a dry run on staging (DR-1).

Plan B depends on the backfill. The first backfill script timed out at 12 GB of the 40 GB table, so we are using the second version, which we call bf2.

Plan C uses logical replication to a new cluster. I rejected it because our hosting tier does not support logical replication.

I need a decision from you today. If you approve Plan B, I will start the dual-write change first and run bf2 against staging before production.
