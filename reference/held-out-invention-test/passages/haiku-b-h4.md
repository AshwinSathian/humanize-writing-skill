Our test suite takes 38 minutes on the single CI runner, and that wait is the main reason CI feels slow. The team merges about 25 pull requests a week, so each of those merges waits behind the same long run. Two engineers left comments last sprint asking for faster CI. This is the change I would make first.

Running the suite in parallel means splitting the tests across several runners and running the groups at the same time. The total compute stays about the same, but the wall-clock time falls roughly in proportion to the number of runners, as long as the split is even and the tests do not share state.

That last condition is the real work. Tests that write to the same database, or that depend on the order they run in, will fail when they run side by side, so we would need to find them first. Sorting the files by how long they take is a reasonable way to choose the split points.

I propose we start with four runners and measure the result on a week of real pull requests before going further.
