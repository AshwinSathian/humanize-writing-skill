## Run the test suite in parallel

Our test suite takes 38 minutes on the single CI runner. We merge about 25 pull requests a week, and each one waits on that run, so every author spends most of an hour between pushing a change and learning whether it passed. If a run fails, the fix and the second run cost another 38 minutes or more. Two engineers left comments last sprint asking for faster CI, so the delay is already noticeable to the people waiting on it.

The fix is to split the suite across several runners and execute the pieces at the same time. If the tests are independent of each other and split into even groups, four runners would bring a 38-minute run down to roughly 10 minutes, plus some setup overhead on each runner. The exact gain depends on how evenly the tests divide, so the first step is to measure how long each test file takes and split by time, not by file count.

Parallel runs do expose tests that share state, such as a common database or fixed file paths. Those tests pass today only because they run in order, and they will fail intermittently once they overlap. We should find them in the first week and give each runner its own database.

I propose we start with two runners, check that the results match the serial run, and add more from there.
