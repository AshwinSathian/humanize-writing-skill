## Write a postmortem for every incident

We currently write postmortems for the incidents that hurt, and skip the ones that were over quickly. That filter is the problem. Nobody can tell in the moment which small incident is the early sign of a larger one, and a ten-minute outage often has the same cause as a ten-hour one. The only way to see a repeated cause is to have a written record of each incident to compare.

A postmortem also does something a fix does not. The fix changes the code. The postmortem changes what the team knows: how we noticed, how long it took to find the cause, which dashboard helped and which one misled us. Those details live in the heads of whoever was on call, and they fade within a few weeks.

The cost is low if we keep the format short. For a minor incident, a postmortem can be a page: what happened, the timeline, the cause, and the follow-up actions with an owner each. It should be blameless, meaning it describes what the system and the process allowed, not who made the mistake.

I propose we write one for every production incident, whatever its size, within a week of resolution, and keep them all in one folder anyone on the team can search.
