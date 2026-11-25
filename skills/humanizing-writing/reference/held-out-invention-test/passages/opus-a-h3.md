## Pin dependency versions and update them on a schedule

We recommend pinning every dependency to an exact version, committing the lockfile, and updating on a fixed schedule instead of whenever a new release happens to be picked up.

### Why pin

With a version range such as `^2.3.0`, two builds of the same commit can install different code, because a new release in that range may be published between them. When a build then fails, the diff shows no change on our side and the cause is hard to find. With exact versions and a committed lockfile, the same commit always installs the same packages, on a laptop and in CI.

Pinning also means that a dependency only changes in a pull request, where it gets reviewed and tested like any other change and can be reverted on its own.

### Why a schedule

Pinning without updating leaves us on old versions, and security fixes stop reaching us. Skipping many releases also makes the eventual upgrade larger, since breaking changes from several versions arrive together.

### What we suggest

1. Pin exact versions and commit the lockfile in every repository.
2. Let an update tool (Dependabot or Renovate) open the update pull requests.
3. Review and merge them at a regular interval. Every two weeks is a reasonable starting point.
4. Apply security patches as soon as they are available, outside the schedule.
