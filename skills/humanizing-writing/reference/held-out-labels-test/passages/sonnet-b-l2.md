I recommend we migrate the orders table with dual-writes (option B below). Can you confirm today?

We would write every order to both the old and new tables, copy the existing 40 GB across with a backfill job, then switch reads to the new table. There is no downtime. It is about 2 weeks of work.

The alternative is to take the site down and migrate in one go. A dry run on staging took 3 hours, and checkout cannot be down that long during the sales period.

We also looked at logical replication to a new cluster, but our hosting tier does not support it.

One risk with dual-writes: the first version of the backfill script timed out at 12 GB, so I wrote a second version. I have not run it against the full table yet.
