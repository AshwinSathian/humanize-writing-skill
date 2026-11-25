## Pin dependency versions and update them on a schedule

We recommend pinning every dependency to an exact version and updating them together on a fixed schedule, instead of letting versions float.

When a dependency is specified as a range such as `^2.3.0`, two builds of the same commit can install different code. A build that passed yesterday can fail today because a transitive package published a new release overnight. The failure shows up in a commit that did not touch the dependency, so the team ends up hunting through its own changes for a bug that lives elsewhere. Pinning removes that: the same commit installs the same code every time. Commit the lockfile, and have CI install from it without modifying it (`npm ci`, `pip install -r requirements.txt` with hashes, or your tool's equivalent).

Pinning alone causes a different problem. Versions that never move fall behind, and security fixes go unapplied. The remedy is a routine update, not an occasional emergency one.

Proposed process:

1. Once a month, one person opens a single pull request that bumps dependencies.
2. CI runs the full test suite against it.
3. Read the changelogs for major version bumps before merging.
4. If an update breaks something, pin the old version, open a ticket, and move on.

Security advisories are the exception. Apply those as soon as they appear, outside the schedule.

Updating in one batch means upgrade problems arrive at a time we chose, and the diff is small enough to review.
