## Run the test suite in parallel

Our test suite takes 38 minutes on the single CI runner, and we merge about 25 pull requests a week. Every one of those merges waits on that run. Two engineers asked for faster CI in comments last sprint, and they are right to.

Running the suite in parallel is the most direct fix. The tests are split into shards, and each shard runs on its own runner at the same time, so the wall-clock time falls toward the time of the slowest shard. If the work splits evenly across four shards, the run would finish in about 10 minutes instead of 38. The real gain depends on how evenly the shards divide, so we should measure test timings before we choose a shard count.

Parallel runs require independent tests. A test that relies on data left behind by another test can pass on one runner and fail on another. Finding those dependencies now is worth the effort, because they otherwise show up later as flaky builds.

I propose we start by pulling test timings, split the suite into four shards, and run that setup for two weeks before deciding whether to add more runners.
