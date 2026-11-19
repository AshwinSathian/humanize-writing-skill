Subject: Resolved: "card declined" errors at checkout, 14:02 to 14:39 UTC

Checkout payments are working normally again. If customers contact you about a failed payment from today, tell them to try the payment again. They were not charged.

From 14:02 to 14:39 UTC today, about 3% of card payments at checkout failed. Customers saw the error "card declined", but their cards were not declined. The failures were on our side.

The cause was an expired TLS certificate on our connection to the payment provider. A new certificate is in place, and payments have worked since 14:39.

The certificate should have renewed automatically. The renewal job failed because of a misconfigured cron schedule, and engineering is fixing the job this week.
