## Write a postmortem after every incident

I'd like us to write a postmortem after every production incident, including the small ones we fix in ten minutes.

The argument for the small ones is that they are where the information is cheapest. A short outage and a long one often share a cause: a missing alert, a config change nobody reviewed, a retry with no backoff. The short one tells us about it at a lower price, but only if someone writes down what happened while they still remember. A week later the timeline lives in one person's head and a scrolled-away chat thread.

A written record also changes who can learn from an incident. Suppose a deploy breaks checkout on a Saturday and the on-call engineer rolls it back. Without a postmortem, one person knows why it broke. With one, the next person to touch that code can search for it.

The document can be short. It needs four things: what users saw and for how long, the timeline, the cause as far as we understand it, and the actions we are taking, each with an owner. If we don't know the cause, the postmortem says so.

Postmortems should name systems and decisions, not people to blame. If writing one feels like a punishment, people will stop reporting small incidents, and those are the ones we most want to hear about.
