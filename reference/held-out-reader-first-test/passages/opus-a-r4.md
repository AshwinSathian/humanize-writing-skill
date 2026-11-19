Resolved: false "card declined" errors at checkout, 14:02–14:39 UTC today

From 14:02 to 14:39 UTC today, about 3% of card payments at checkout failed and showed customers the error "card declined". Their cards were not actually declined. Payments have worked normally since 14:39.

What to tell affected customers: they were not charged, and they should try the payment again.

The cause was an expired TLS certificate on our connection to the payment provider. A new certificate is in place. The job that should have renewed it failed because its cron schedule was misconfigured, and engineering is fixing that job this week.
