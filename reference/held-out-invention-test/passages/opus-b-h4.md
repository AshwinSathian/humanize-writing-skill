## Run the test suite in parallel

Our test suite takes 38 minutes on the single CI runner. We merge about 25 pull requests a week, so even if each one ran the suite only once, that would be 950 minutes, close to 16 hours of waiting every week. Any pull request that needs a second push after review or a failed test adds another 38 minutes.

Two engineers left comments last sprint asking for faster CI, so the wait is already being felt.

Running the suite in parallel is the most direct fix, because it shortens the run without removing any tests. The idea is to split the tests into groups and run each group on its own runner at the same time. The run then takes about as long as the slowest group, plus setup. As an illustration, an even split across four runners would bring 38 minutes down to roughly 10. I haven't measured how evenly our suite divides, so treat that as an estimate.

The main risk is tests that depend on shared state or on running in a particular order. Those will fail once they run side by side, and we would need to fix them as we find them.
