**Resolved: false "card declined" errors at checkout, 14:02 to 14:39 UTC today**

Payments are working normally again and have been since 14:39 UTC.

From 14:02 to 14:39 UTC, about 3% of card payments at checkout failed. Customers saw "card declined", but their cards were not declined. Customers who saw the error were not charged.

**What to tell affected customers:** ask them to try the payment again. It should go through.

The cause was an expired TLS certificate on our connection to the payment provider. A new certificate is in place. The renewal job that should have replaced the old one failed because of a misconfigured cron schedule, and engineering is fixing the job this week.
