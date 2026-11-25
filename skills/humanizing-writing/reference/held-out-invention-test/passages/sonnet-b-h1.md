## Write a postmortem after every incident

We should write a postmortem after every production incident, including the small ones. The usual objection is that a ten-minute blip doesn't deserve a document. But the size of an outage tells you little about how much it can teach. A short incident with a confusing cause is often more useful to write up than a long one with an obvious fix.

The first benefit is that writing forces precision. During an incident, people work from guesses: this deploy, that dependency, a flaky host. Putting the timeline on a page makes you check which guess was right and what evidence showed it. Gaps in the story become visible, and they usually point at missing logs or alerts.

The second benefit is that the knowledge stays with the team. Without a record, what we learned lives in the heads of whoever was on call. Someone who joins next month, or who wasn't paged, meets the same failure with no warning that it has happened before.

The third is that follow-up work gets an owner. A postmortem ends with action items, each with a name and a date, so fixes don't depend on someone remembering the incident.

To keep the cost low, use a short template: what happened, the timeline, the cause, and the actions. Focus on how the system allowed the failure rather than on who made the change. A page is enough for most incidents.
