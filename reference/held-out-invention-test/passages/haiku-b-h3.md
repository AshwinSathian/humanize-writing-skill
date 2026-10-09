Pin every dependency to an exact version in our lock files, and update those pins on a fixed schedule instead of whenever someone notices a new release.

A lock file records the exact version each package resolved to. When it is committed, every build installs the same code, so a failure on one machine shows up on all of them. Without it, a new release of an indirect dependency can change behavior between Monday's build and Friday's, even though nobody touched our code.

Pinning does not mean never updating. Upgrades that are left alone pile up, and a single update that is years behind often breaks several things at once. A regular schedule keeps each change small enough to read and test.

The routine we suggest:

- Run an automated update check weekly, and open one pull request per group of related packages.
- Read the changelog of any package with a major version change before merging.
- Merge security fixes as soon as CI passes, without waiting for the normal schedule.
- Let the test suite be the gate. If it passes and the change is small, merge it.

Libraries that other teams install are a separate case. Their lock files do not reach their users, so they should declare version ranges in the package manifest, and the lock file should be used only for our own builds.
