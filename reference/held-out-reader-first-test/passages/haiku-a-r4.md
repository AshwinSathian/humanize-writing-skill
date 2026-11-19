Subject: Resolved: card payment errors at checkout, 14:02 to 14:39 UTC today

Hi support team,

Between 14:02 and 14:39 UTC today, about 3% of card payments at checkout failed. Customers saw the message "card declined", but their cards were not declined. The problem is resolved. Payments have worked normally since 14:39 UTC.

**What caused it:** The TLS certificate on our connection to the payment provider expired. A new certificate is now in place. The certificate renewal job failed because of a misconfigured cron schedule. Engineering is fixing the job this week.

**Customer impact:** Customers who saw the error were not charged.

**What to tell affected customers:** If a customer contacts you about the "card declined" message from this window, tell them their card was not declined and ask them to try the payment again.

Thanks,
