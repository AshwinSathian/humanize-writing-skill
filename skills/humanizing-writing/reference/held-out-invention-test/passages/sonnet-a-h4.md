## Run the test suite in parallel

Our test suite takes 38 minutes on the single CI runner. We merge about 25 pull requests a week, so most of them wait that long for a result, and any change pushed after review comments starts the wait again. Two engineers left comments last sprint asking for faster CI, so the cost is already noticeable to the people paying it.

The fix I propose is to split the suite across several runners and run the pieces at the same time. If the tests divide evenly across four runners, the run takes roughly a quarter of the time, plus some setup overhead for each runner. I haven't measured the real split, so the first step would be to time each test file and divide them so that no runner is left with a much longer share than the others.

Parallel runs can expose tests that depend on shared state, such as a common database or a fixed port. Those tests will fail intermittently when run side by side, and we would need to fix or isolate them. That work is worth doing anyway, because such tests are already fragile.

I suggest we start with a trial on one branch and compare the run times.
