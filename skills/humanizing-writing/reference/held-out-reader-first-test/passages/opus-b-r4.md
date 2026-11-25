**Resolved: false "card declined" errors at checkout, 14:02 to 14:39 UTC today**

If a customer contacts you about a card being declined at checkout today between 14:02 and 14:39 UTC, tell them to try the payment again. Their card was not declined, and they were not charged for the failed attempt.

During that window, about 3% of card payments at checkout failed and showed customers "card declined". The cause was an expired TLS certificate on our connection to the payment provider. A new certificate is in place, and payments have worked normally since 14:39.

The certificate expired because the job that renews it failed, due to a misconfigured cron schedule. Engineering is fixing the job this week.
