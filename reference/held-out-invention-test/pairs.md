# Blind pairs

---

## pair01

**Task given to both writers:** Write a message of about 150 words for the team channel proposing that the team move its daily standup to a written update. Audience: your own team.

### Passage A

I would like us to try replacing the daily standup with a written update for two weeks. Each person posts a short message in the team channel before the time the standup would have started. Three lines is enough: what I finished since the last update, what I am working on today, and anything blocking me.

Here is why I think it helps. A spoken standup gives everyone the same few minutes, and the people who speak last often have the least time left. A written update can be read at any point in the day, and it stays searchable. When someone asks next month what we decided about the payment retry logic, the answer is in the channel instead of in someone's memory.

Blockers still need a quick live response. If you post a blocker, tag the person who can help and let them reply in the thread. If a thread gets long, we can move it to a call.

At the end of two weeks we will look at what worked and decide whether to keep it, change it, or go back. I would like to hear objections before we start, so reply here or find me this week.

### Passage B

I'd like us to try replacing the daily standup with a written update for two weeks, starting Monday.

Each person posts three short lines in the team channel by 10:00: what they finished since the last update, what they are working on today, and anything blocking them. A blocker gets tagged to the person who can unblock it.

Why this might help: a written update can be read at any time, and it can be searched later when someone asks what happened with a change. A meeting gives the answer only to the people in the room, on that day.

We keep the conversation where it is needed. If a blocker needs a discussion, the people involved talk right after the update is posted. Nobody has to sit through a round of status reports to hear about one problem.

At the end of two weeks we'll look at whether blockers were caught sooner and whether anything got missed. If the written version isn't working, we go back to the meeting. Reply in the thread with any objections before Monday.

---

## pair02

**Task given to both writers:** Write a message of about 150 words for the team channel proposing that the team move its daily standup to a written update. Audience: your own team.

### Passage A

I'd like to propose that we replace the daily standup call with a written update in this channel, and try it for two weeks.

Each morning, everyone posts three lines: what you finished yesterday, what you're working on today, and anything blocking you. If something needs discussion, reply in a thread or grab the people involved for a short call.

My reasons: a written update can be read in a minute, at whatever time suits the reader, and it doesn't interrupt anyone mid-task. It also leaves a record, so if you were out for a day you can scroll back and catch up without asking around. And a blocker posted in writing reaches only the people who can help, where a call holds everyone while two people sort it out.

What we would lose is the daily face time, and I don't want to wave that away. If the written version leaves people feeling out of touch, we go back.

Objections and tweaks welcome in the thread. If nobody objects by Friday, I'll start us off on Monday.

### Passage B

I'd like to propose that we replace the daily standup call with a written update in this channel.

Each of us would post three lines by mid-morning: what I finished yesterday, what I'm doing today, and anything that is blocking me. If a blocker needs a conversation, the people involved can start a thread or a quick call, and everyone else can keep working.

My reasons: a fixed meeting time cuts into the morning for whoever is in the middle of something, and it is awkward for anyone in a different time zone or on a different schedule. Written updates can also be searched later, which helps when we are trying to remember when a piece of work started or why it stalled.

What we would lose is the daily face-to-face time, so I'd keep one call a week for that.

Could we try it for two weeks, starting Monday, and then decide whether to keep it? Reply here if you have objections or a better format.

---

## pair03

**Task given to both writers:** Write a section of about 200 words for an internal engineering blog arguing that the team should write a postmortem after every production incident. Audience: your own engineering team.

### Passage A

## Write a postmortem after every incident

I'd like us to write a postmortem after every production incident, including the small ones we fix in ten minutes.

The argument for the small ones is that they are where the information is cheapest. A short outage and a long one often share a cause: a missing alert, a config change nobody reviewed, a retry with no backoff. The short one tells us about it at a lower price, but only if someone writes down what happened while they still remember. A week later the timeline lives in one person's head and a scrolled-away chat thread.

A written record also changes who can learn from an incident. Suppose a deploy breaks checkout on a Saturday and the on-call engineer rolls it back. Without a postmortem, one person knows why it broke. With one, the next person to touch that code can search for it.

The document can be short. It needs four things: what users saw and for how long, the timeline, the cause as far as we understand it, and the actions we are taking, each with an owner. If we don't know the cause, the postmortem says so.

Postmortems should name systems and decisions, not people to blame. If writing one feels like a punishment, people will stop reporting small incidents, and those are the ones we most want to hear about.

### Passage B

## Write a postmortem after every production incident

I want us to write a postmortem after every production incident, including the small ones that we fix in ten minutes.

The reason is that most of what we learn during an incident stays with the person who was on call. They know which dashboard showed the problem first, which alert fired late or not at all, and which step in the runbook was wrong. A week later they remember about half of it. If nobody writes it down, the next person to hit the same failure starts from nothing.

Small incidents are the ones we are most likely to skip, and they are often the cheapest warning we get. A config change that broke one endpoint for a few minutes can have the same cause as a later outage that takes down the whole service. We only see that two incidents share a cause if both were recorded.

The document does not need to be long. A timeline, the cause as far as we understand it, what we did to fix it, and one or two follow-up tickets with owners is enough. Write it within two working days, while the details are still fresh, and keep it blameless: describe what the system allowed, and leave out who typed the command.

I'd suggest we try this for the next three incidents and then decide whether the template needs changing.

---

## pair04

**Task given to both writers:** Write a section of about 150 words for an internal engineering blog arguing that the team should run its test suite in parallel. Use these facts about the team, and add no others about it:
- The test suite takes 38 minutes on the single CI runner.
- The team merges about 25 pull requests a week.
- Two engineers left comments last sprint asking for faster CI.

### Passage A

## Run the test suite in parallel

Our test suite takes 38 minutes on the single CI runner, and we merge about 25 pull requests a week. Every one of those merges waits on that run. Two engineers asked for faster CI in comments last sprint, and they are right to.

Running the suite in parallel is the most direct fix. The tests are split into shards, and each shard runs on its own runner at the same time, so the wall-clock time falls toward the time of the slowest shard. If the work splits evenly across four shards, the run would finish in about 10 minutes instead of 38. The real gain depends on how evenly the shards divide, so we should measure test timings before we choose a shard count.

Parallel runs require independent tests. A test that relies on data left behind by another test can pass on one runner and fail on another. Finding those dependencies now is worth the effort, because they otherwise show up later as flaky builds.

I propose we start by pulling test timings, split the suite into four shards, and run that setup for two weeks before deciding whether to add more runners.

### Passage B

Our test suite takes 38 minutes on the single CI runner, and that wait is the main reason CI feels slow. The team merges about 25 pull requests a week, so each of those merges waits behind the same long run. Two engineers left comments last sprint asking for faster CI. This is the change I would make first.

Running the suite in parallel means splitting the tests across several runners and running the groups at the same time. The total compute stays about the same, but the wall-clock time falls roughly in proportion to the number of runners, as long as the split is even and the tests do not share state.

That last condition is the real work. Tests that write to the same database, or that depend on the order they run in, will fail when they run side by side, so we would need to find them first. Sorting the files by how long they take is a reasonable way to choose the split points.

I propose we start with four runners and measure the result on a week of real pull requests before going further.

---

## pair05

**Task given to both writers:** Write about 200 words for an internal wiki page recommending that the team pin its dependency versions and update them on a schedule. Audience: your own engineering team.

### Passage A

Pin every dependency to an exact version in our lock files, and update those pins on a fixed schedule instead of whenever someone notices a new release.

A lock file records the exact version each package resolved to. When it is committed, every build installs the same code, so a failure on one machine shows up on all of them. Without it, a new release of an indirect dependency can change behavior between Monday's build and Friday's, even though nobody touched our code.

Pinning does not mean never updating. Upgrades that are left alone pile up, and a single update that is years behind often breaks several things at once. A regular schedule keeps each change small enough to read and test.

The routine we suggest:

- Run an automated update check weekly, and open one pull request per group of related packages.
- Read the changelog of any package with a major version change before merging.
- Merge security fixes as soon as CI passes, without waiting for the normal schedule.
- Let the test suite be the gate. If it passes and the change is small, merge it.

Libraries that other teams install are a separate case. Their lock files do not reach their users, so they should declare version ranges in the package manifest, and the lock file should be used only for our own builds.

### Passage B

# Pinning dependencies and updating on a schedule

We recommend that every service pin its direct dependencies to exact versions in the lockfile, and that we update them on a regular schedule rather than whenever someone notices a new release.

A lockfile records the exact version of every package that was installed. When the lockfile is committed, a fresh install on a laptop, in CI, and in production all resolve to the same code. Without it, two builds from the same commit can differ, and a bug can appear in one environment and not in the others.

A pinned version still needs regular updates. One that is never touched falls behind on security fixes, and it gets harder to upgrade over time, because each skipped release adds breaking changes to the pile. The fix is a fixed rhythm:

- Once a month, run the update tooling on each repository and open a pull request with the new versions.
- Read the changelog for any major version bump before merging.
- Merge security updates as soon as they arrive, outside the monthly cycle.

Each pull request should pass the full test suite before it merges. If an update breaks something, the failure points to a single change set, which is much easier to diagnose than a long stretch of accumulated drift.

---

## pair06

**Task given to both writers:** Write about 200 words for an internal wiki page recommending that the team pin its dependency versions and update them on a schedule. Audience: your own engineering team.

### Passage A

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

### Passage B

## Pin dependency versions and update on a schedule

We should pin every dependency to an exact version and update them on a fixed schedule, instead of letting versions float.

With floating ranges, such as `^2.3.0`, two builds of the same commit can install different code. A build that passed on Monday can fail on Thursday with no change on our side, and the failure appears in whichever pull request happens to run next. The person looking at that pull request then has to work out that the cause is a transitive update and not their change. Pinning removes this: the lockfile, committed to the repository, decides what gets installed, and the same commit gives the same build.

Pinning alone has its own risk. If nobody updates, the pins go stale, and security fixes stop arriving. So the second half of the policy matters as much as the first.

Proposed process:

1. Pin exact versions in the manifest and commit the lockfile.
2. Once a month, one person updates all dependencies in a single pull request, reads the changelogs for major versions, and runs the full test suite.
3. Security advisories skip the schedule. Update those as soon as they are reported.

Updating in one batch means a regression has a small set of suspects, and the rest of the month stays free of surprise changes.

---

## pair07

**Task given to both writers:** Write a section of about 200 words for an internal engineering blog arguing that the team should write a postmortem after every production incident. Audience: your own engineering team.

### Passage A

Every production incident should end with a written postmortem, including the small ones. The point of the document is to leave a record of what happened, what we knew at each step, and what we changed, so that the next person who sees the same symptoms does not start from zero.

A useful postmortem answers four questions. What did users see, and for how long? What was the root cause, stated as a mechanism rather than a person? How did we detect the problem, and was that fast enough? What will we change, and who owns each change?

Small incidents deserve the same treatment because they are cheap to write up and often point at the same weak spots. A stale cache that clears itself after ten minutes looks harmless once. Three of them in one month is a pattern, and only a written record makes that pattern visible.

Keep each postmortem under two pages. Put the timeline first, with timestamps taken from logs rather than memory. Turn the action items into tickets in our tracker instead of leaving them as sentences at the bottom of a document, where they will be forgotten.

Writing one is quick. Skipping it costs the next on-call engineer far more.

### Passage B

## Write a postmortem after every production incident

Every production incident should end with a written postmortem, including the small ones. The goal is a record that the next person on call can read at 3 a.m. without having lived through the outage.

A postmortem answers four questions: what users saw, when we noticed, what we did to recover, and why the system allowed the failure in the first place. The last question matters most. A restart fixes the symptom for today. The write-up is where we find the missing alert, the config nobody tested, or the deploy step that let a bad change reach everyone at once.

Small incidents deserve the same treatment. A five-minute blip that recurs three times in a month is often one underlying problem, and it only shows up as a pattern if each occurrence left a document behind. Without those documents, each person learns about the failure from memory, and memory is unreliable once the engineer who fixed it has moved on to other work.

The format does not need to be long. A page with a timeline, a cause, and a short list of follow-up tasks is enough. Each follow-up task gets an owner and a ticket. A postmortem with no tickets has not finished its job.

---

## pair08

**Task given to both writers:** Write a section of about 200 words for an internal engineering blog arguing that the team should write a postmortem after every production incident. Audience: your own engineering team.

### Passage A

## Write a postmortem after every incident

We should write a postmortem after every production incident, including the small ones. The usual objection is that a ten-minute blip doesn't deserve a document. But the size of an outage tells you little about how much it can teach. A short incident with a confusing cause is often more useful to write up than a long one with an obvious fix.

The first benefit is that writing forces precision. During an incident, people work from guesses: this deploy, that dependency, a flaky host. Putting the timeline on a page makes you check which guess was right and what evidence showed it. Gaps in the story become visible, and they usually point at missing logs or alerts.

The second benefit is that the knowledge stays with the team. Without a record, what we learned lives in the heads of whoever was on call. Someone who joins next month, or who wasn't paged, meets the same failure with no warning that it has happened before.

The third is that follow-up work gets an owner. A postmortem ends with action items, each with a name and a date, so fixes don't depend on someone remembering the incident.

To keep the cost low, use a short template: what happened, the timeline, the cause, and the actions. Focus on how the system allowed the failure rather than on who made the change. A page is enough for most incidents.

### Passage B

## Write a postmortem for every incident

We currently write postmortems for the incidents that hurt, and skip the ones that were over quickly. That filter is the problem. Nobody can tell in the moment which small incident is the early sign of a larger one, and a ten-minute outage often has the same cause as a ten-hour one. The only way to see a repeated cause is to have a written record of each incident to compare.

A postmortem also does something a fix does not. The fix changes the code. The postmortem changes what the team knows: how we noticed, how long it took to find the cause, which dashboard helped and which one misled us. Those details live in the heads of whoever was on call, and they fade within a few weeks.

The cost is low if we keep the format short. For a minor incident, a postmortem can be a page: what happened, the timeline, the cause, and the follow-up actions with an owner each. It should be blameless, meaning it describes what the system and the process allowed, not who made the mistake.

I propose we write one for every production incident, whatever its size, within a week of resolution, and keep them all in one folder anyone on the team can search.

---

## pair09

**Task given to both writers:** Write about 200 words for an internal wiki page recommending that the team pin its dependency versions and update them on a schedule. Audience: your own engineering team.

### Passage A

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

### Passage B

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

---

## pair10

**Task given to both writers:** Write a section of about 150 words for an internal engineering blog arguing that the team should run its test suite in parallel. Use these facts about the team, and add no others about it:
- The test suite takes 38 minutes on the single CI runner.
- The team merges about 25 pull requests a week.
- Two engineers left comments last sprint asking for faster CI.

### Passage A

## Run the test suite in parallel

Our test suite takes 38 minutes on the single CI runner. We merge about 25 pull requests a week, so even if each one ran the suite only once, that would be 950 minutes, close to 16 hours of waiting every week. Any pull request that needs a second push after review or a failed test adds another 38 minutes.

Two engineers left comments last sprint asking for faster CI, so the wait is already being felt.

Running the suite in parallel is the most direct fix, because it shortens the run without removing any tests. The idea is to split the tests into groups and run each group on its own runner at the same time. The run then takes about as long as the slowest group, plus setup. As an illustration, an even split across four runners would bring 38 minutes down to roughly 10. I haven't measured how evenly our suite divides, so treat that as an estimate.

The main risk is tests that depend on shared state or on running in a particular order. Those will fail once they run side by side, and we would need to fix them as we find them.

### Passage B

## Run the test suite in parallel

Our test suite takes 38 minutes on the single CI runner. We merge about 25 pull requests a week, so even if each one ran the suite only once, that would be 950 minutes of waiting a week, close to 16 hours. Most pull requests run it more than once, because a push after review starts the suite again.

Two engineers left comments last sprint asking for faster CI, so this is already something people on the team have noticed.

Running the tests in parallel is the most direct way to shorten the wait. The suite is split into groups, and each group runs at the same time on its own runner or worker. As an illustration, if the tests divided evenly across four workers, a 38-minute run would take about ten minutes. I have not measured how evenly ours would divide.

The main risk is tests that depend on shared state, such as a common database or a fixed port. Those will fail when run side by side and will need fixing first.

---

## pair11

**Task given to both writers:** Write a message of about 150 words for the team channel proposing that the team move its daily standup to a written update. Audience: your own team.

### Passage A

Hi all, I'd like us to try replacing the daily standup with a written update.

Each of us would post three lines in this channel by 10:00 each morning: what I finished yesterday, what I'm working on today, and anything blocking me. Anyone who can unblock someone replies in the thread.

My reasoning is that a standup works well for the person speaking and poorly for everyone else, who mostly wait for their turn. A written update can be read when you have a break in your work, and it stays searchable, so "who was working on the billing change last week?" has an answer without asking around. It also gives people in different time zones the same access to the information.

What we'd lose is the chance to talk. To keep some of that, a blocker that needs discussion should become a short call that day, with only the people involved.

Let's try it for two weeks and then decide whether to keep it. If you have concerns, reply here and I'll adjust the plan before we start.

### Passage B

Hi all, I'd like us to try replacing the daily standup with a written update, starting with a trial of a few weeks.

The idea is simple. Each morning, everyone posts three short lines in this channel: what you finished, what you're working on today, and anything blocking you. Read them when it suits you. If a post shows a blocker or a question, reply in the thread, and pull in whoever needs to help.

My reasoning is that a live standup asks everyone to stop at the same moment, even though most updates only matter to one or two people. A written update can be read at your own pace, it leaves a record we can search later, and it works for anyone who is away or in a different time zone. Blockers also get answered in the thread by the right person, rather than waiting for the call to end.

If we need to talk something through, we can set up a short call for just the people involved.

Let's run it for three weeks and then decide together whether to keep it. Reply here with objections or changes to the format before we begin.

---

## pair12

**Task given to both writers:** Write a section of about 150 words for an internal engineering blog arguing that the team should run its test suite in parallel. Use these facts about the team, and add no others about it:
- The test suite takes 38 minutes on the single CI runner.
- The team merges about 25 pull requests a week.
- Two engineers left comments last sprint asking for faster CI.

### Passage A

## Run the test suite in parallel

Our test suite takes 38 minutes on the single CI runner. We merge about 25 pull requests a week, so most of them wait that long for a result, and any change pushed after review comments starts the wait again. Two engineers left comments last sprint asking for faster CI, so the cost is already noticeable to the people paying it.

The fix I propose is to split the suite across several runners and run the pieces at the same time. If the tests divide evenly across four runners, the run takes roughly a quarter of the time, plus some setup overhead for each runner. I haven't measured the real split, so the first step would be to time each test file and divide them so that no runner is left with a much longer share than the others.

Parallel runs can expose tests that depend on shared state, such as a common database or a fixed port. Those tests will fail intermittently when run side by side, and we would need to fix or isolate them. That work is worth doing anyway, because such tests are already fragile.

I suggest we start with a trial on one branch and compare the run times.

### Passage B

## Run the test suite in parallel

Our test suite takes 38 minutes on the single CI runner. We merge about 25 pull requests a week, and each one waits on that run, so every author spends most of an hour between pushing a change and learning whether it passed. If a run fails, the fix and the second run cost another 38 minutes or more. Two engineers left comments last sprint asking for faster CI, so the delay is already noticeable to the people waiting on it.

The fix is to split the suite across several runners and execute the pieces at the same time. If the tests are independent of each other and split into even groups, four runners would bring a 38-minute run down to roughly 10 minutes, plus some setup overhead on each runner. The exact gain depends on how evenly the tests divide, so the first step is to measure how long each test file takes and split by time, not by file count.

Parallel runs do expose tests that share state, such as a common database or fixed file paths. Those tests pass today only because they run in order, and they will fail intermittently once they overlap. We should find them in the first week and give each runner its own database.

I propose we start with two runners, check that the results match the serial run, and add more from there.
