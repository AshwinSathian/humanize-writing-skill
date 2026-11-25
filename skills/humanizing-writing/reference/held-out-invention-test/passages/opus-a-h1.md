## Write a postmortem after every production incident

I want us to write a postmortem after every production incident, including the small ones that we fix in ten minutes.

The reason is that most of what we learn during an incident stays with the person who was on call. They know which dashboard showed the problem first, which alert fired late or not at all, and which step in the runbook was wrong. A week later they remember about half of it. If nobody writes it down, the next person to hit the same failure starts from nothing.

Small incidents are the ones we are most likely to skip, and they are often the cheapest warning we get. A config change that broke one endpoint for a few minutes can have the same cause as a later outage that takes down the whole service. We only see that two incidents share a cause if both were recorded.

The document does not need to be long. A timeline, the cause as far as we understand it, what we did to fix it, and one or two follow-up tickets with owners is enough. Write it within two working days, while the details are still fresh, and keep it blameless: describe what the system allowed, and leave out who typed the command.

I'd suggest we try this for the next three incidents and then decide whether the template needs changing.
