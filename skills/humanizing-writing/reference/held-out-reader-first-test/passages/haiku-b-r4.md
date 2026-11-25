**Subject:** Resolved: card payment errors at checkout, today 14:02 to 14:39 UTC

The incident is resolved. Card payments at checkout are working again.

From 14:02 to 14:39 UTC today, about 3% of card payments failed. Customers who hit the failure saw the message "card declined," but their cards were not declined. The cause was an expired TLS certificate on the connection to our payment provider. A new certificate is in place, and payments have worked since 14:39.

Customers who saw the error were not charged.

**What support should do**

If a customer reports a "card declined" error at checkout between 14:02 and 14:39 UTC today, tell them the problem was on our side, their card was not declined, and they were not charged. Ask them to try the payment again.

**What engineering is doing**

The certificate renewal job failed because of a misconfigured cron schedule. Engineering is fixing the job this week.
