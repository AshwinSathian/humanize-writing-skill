## Pin dependency versions and update on a schedule

We should pin every dependency to an exact version and update them on a fixed schedule, instead of letting versions float.

With floating ranges, such as `^2.3.0`, two builds of the same commit can install different code. A build that passed on Monday can fail on Thursday with no change on our side, and the failure appears in whichever pull request happens to run next. The person looking at that pull request then has to work out that the cause is a transitive update and not their change. Pinning removes this: the lockfile, committed to the repository, decides what gets installed, and the same commit gives the same build.

Pinning alone has its own risk. If nobody updates, the pins go stale, and security fixes stop arriving. So the second half of the policy matters as much as the first.

Proposed process:

1. Pin exact versions in the manifest and commit the lockfile.
2. Once a month, one person updates all dependencies in a single pull request, reads the changelogs for major versions, and runs the full test suite.
3. Security advisories skip the schedule. Update those as soon as they are reported.

Updating in one batch means a regression has a small set of suspects, and the rest of the month stays free of surprise changes.
