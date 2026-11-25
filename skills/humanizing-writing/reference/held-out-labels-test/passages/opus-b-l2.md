I recommend we migrate the orders table with dual writes and a backfill, which needs no downtime and takes about two weeks of work. The other realistic option is a single migration with the site down for about 3 hours, and checkout can't be down that long during the sales period.

How the dual-write approach works: the app writes every order to both the old and new tables, a backfill job copies the existing 40 GB into the new table, and once the new table is complete we switch reads over to it. The backfill would use the second version of our backfill script. The first version timed out after 12 GB.

The 3-hour downtime figure comes from a dry run of the one-shot migration on staging. If the two weeks are a problem and we can find a 3-hour window outside the sales period, that plan is simpler.

I also looked at logical replication to a new cluster, but our hosting tier doesn't support it, so it's off the table.

Can you confirm which way you want to go today?
