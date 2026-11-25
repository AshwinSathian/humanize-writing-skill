I recommend we migrate the orders table with dual writes and a backfill, which needs no downtime but takes about two weeks of work. The alternative is to take the site down and migrate in one go, which a staging dry run put at about three hours of downtime. Checkout can't be down for three hours during the sales period, so I'd go with the dual-write plan. I need your call on this today.

How the dual-write plan works: we write every order to both the old and new tables, backfill the existing 40 GB into the new table, then switch reads over. The backfill script is on its second version, because the first one timed out at 12 GB.

I also looked at logical replication to a new cluster, but our hosting tier doesn't support it, so it's off the table.
