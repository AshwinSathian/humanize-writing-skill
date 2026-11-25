## Why we should adopt feature flags

Right now, deploying code and releasing a feature are the same event. When we merge to main and ship, every user gets the change at once, and if it breaks something, our only way out is a revert and a second deploy. Last quarter's checkout redesign is the example most of us remember: the bug was visible within minutes, but the rollback took about forty minutes because it had to go through CI again.

A feature flag separates the two. We ship the code turned off, then enable it for ourselves, then for a small percentage of users, then for everyone. If error rates rise, we switch the flag off, which takes seconds and needs no deploy.

This also lets us stop keeping long-lived branches. Unfinished work can merge to main behind a flag, so it gets reviewed in small pieces and we avoid the painful merges we had on the reporting rewrite.

Flags have costs. Each one adds a branch to the code, and flags that nobody removes pile up into dead paths that are hard to reason about. I'd propose that every flag gets an owner and an expiry date when it is created, and that we delete it within two weeks of reaching 100%. We should start with a hosted service or a simple config table rather than building anything custom, and pilot it on the next feature that touches payments.
