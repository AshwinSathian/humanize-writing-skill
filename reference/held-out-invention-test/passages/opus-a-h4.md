## Run the test suite in parallel

Our test suite takes 38 minutes on the single CI runner. We merge about 25 pull requests a week, so even if each one ran the suite only once, that would be 950 minutes of waiting a week, close to 16 hours. Most pull requests run it more than once, because a push after review starts the suite again.

Two engineers left comments last sprint asking for faster CI, so this is already something people on the team have noticed.

Running the tests in parallel is the most direct way to shorten the wait. The suite is split into groups, and each group runs at the same time on its own runner or worker. As an illustration, if the tests divided evenly across four workers, a 38-minute run would take about ten minutes. I have not measured how evenly ours would divide.

The main risk is tests that depend on shared state, such as a common database or a fixed port. Those will fail when run side by side and will need fixing first.
