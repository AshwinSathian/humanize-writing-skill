# Pinning dependencies and updating on a schedule

We recommend that every service pin its direct dependencies to exact versions in the lockfile, and that we update them on a regular schedule rather than whenever someone notices a new release.

A lockfile records the exact version of every package that was installed. When the lockfile is committed, a fresh install on a laptop, in CI, and in production all resolve to the same code. Without it, two builds from the same commit can differ, and a bug can appear in one environment and not in the others.

A pinned version still needs regular updates. One that is never touched falls behind on security fixes, and it gets harder to upgrade over time, because each skipped release adds breaking changes to the pile. The fix is a fixed rhythm:

- Once a month, run the update tooling on each repository and open a pull request with the new versions.
- Read the changelog for any major version bump before merging.
- Merge security updates as soon as they arrive, outside the monthly cycle.

Each pull request should pass the full test suite before it merges. If an update breaks something, the failure points to a single change set, which is much easier to diagnose than a long stretch of accumulated drift.
