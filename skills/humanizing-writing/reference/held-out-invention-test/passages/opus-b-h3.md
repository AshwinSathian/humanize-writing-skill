## Pin dependency versions and update them on a schedule

Recommendation: pin every dependency to an exact version, commit the lockfile, and update on a fixed schedule instead of whenever a build happens to pull something new.

### Why pin

With a version range such as `^2.3.0`, the same commit can install different code on different days. A build that passed yesterday can fail today with no change on our side, and the diff gives no clue where to look. With exact versions and a committed lockfile, a given commit always installs the same dependency tree, on a laptop and in CI. When something breaks, the cause is in a commit we can read and revert.

Pinning also means a newly published release of a package, including a compromised one, does not reach our builds until we choose to take it.

### Why a schedule

Pinning alone lets versions go stale. Security fixes don't arrive, and the longer we wait, the more releases each upgrade has to cross, which makes breaking changes harder to isolate. A regular update keeps each step small.

### Proposed practice

1. Pin exact versions and commit the lockfile in every repository.
2. Open a dependency update pull request on a fixed cadence. I'd suggest weekly, and we should adjust once we see how much review it takes.
3. Review and merge it like any other change, with the full test suite.
4. Apply security patches as they are published, outside the schedule.

A tool such as Dependabot or Renovate can open the update pull requests for us.
