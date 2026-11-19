# Blind pairs

---

## pair01

**Task given to both writers:** Write the description for your pull request. Reviewers are two engineers on your team. Facts about the change:
- The order status page used to poll the server every 5 seconds. It now uses server-sent events.
- The change removes 140 lines.
- On a dropped connection the client reconnects with exponential backoff, capped at 30 seconds.
- You tested it by hand in Chrome and Safari. You did not test Firefox.
- It is behind the environment variable ORDERS_SSE_ENABLED, which defaults to off.
- You also renamed a local variable in the same file from `res` to `response`.

**Facts this reader needs:**
- polling every 5 seconds replaced by server-sent events
- behind ORDERS_SSE_ENABLED, default off
- tested by hand in Chrome and Safari only; Firefox not tested
- reconnect with exponential backoff capped at 30 seconds

### Passage A

## Replace order status polling with server-sent events

The order status page used to poll the server every 5 seconds. It now opens a server-sent events connection instead. The change removes 140 lines.

If the connection drops, the client reconnects with exponential backoff, capped at 30 seconds.

The change is behind the environment variable `ORDERS_SSE_ENABLED`, which defaults to off, so merging it does not change behavior until the flag is turned on.

I tested it by hand in Chrome and Safari. I did not test Firefox, so please try it there if you can.

Unrelated to the above, I renamed a local variable in the same file from `res` to `response`.

### Passage B

## Replace order status polling with server-sent events

The order status page used to poll the server every 5 seconds. It now opens a server-sent events connection and gets updates pushed. The change removes 140 lines.

If the connection drops, the client reconnects with exponential backoff, capped at 30 seconds.

The new path is behind the environment variable `ORDERS_SSE_ENABLED`, which defaults to off. With it off, nothing changes for users.

I tested by hand in Chrome and Safari. I did not test Firefox, so please try it there if you have a minute.

I also renamed a local variable in the same file from `res` to `response`. It is unrelated to the SSE change.

---

## pair02

**Task given to both writers:** Write the description for your pull request. Reviewers are two engineers on your team. Facts about the change:
- The order status page used to poll the server every 5 seconds. It now uses server-sent events.
- The change removes 140 lines.
- On a dropped connection the client reconnects with exponential backoff, capped at 30 seconds.
- You tested it by hand in Chrome and Safari. You did not test Firefox.
- It is behind the environment variable ORDERS_SSE_ENABLED, which defaults to off.
- You also renamed a local variable in the same file from `res` to `response`.

**Facts this reader needs:**
- polling every 5 seconds replaced by server-sent events
- behind ORDERS_SSE_ENABLED, default off
- tested by hand in Chrome and Safari only; Firefox not tested
- reconnect with exponential backoff capped at 30 seconds

### Passage A

The order status page now gets updates over server-sent events instead of polling the server every 5 seconds. This removes 140 lines.

When the connection drops, the client reconnects with exponential backoff, capped at 30 seconds.

The change is behind `ORDERS_SSE_ENABLED`, which defaults to off. Nothing changes for users until the flag is set.

**Testing**

- Tested by hand in Chrome and Safari.
- Not tested in Firefox.

**Other changes**

- In the same file, the local variable `res` is renamed to `response`. This is a rename only.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

### Passage B

## Order status page: switch from polling to server-sent events

The order status page used to poll the server every 5 seconds. This PR replaces that polling with a server-sent events (SSE) stream, so the server pushes status updates to the page.

When the connection drops, the client reconnects with exponential backoff. The wait between attempts is capped at 30 seconds.

The diff removes 140 lines.

The new path sits behind `ORDERS_SSE_ENABLED`, which defaults to off, so it stays inactive until someone sets the flag.

Testing: I tested the page by hand in Chrome and Safari. I did not test in Firefox, so please check that browser if you can.

Also in this PR: in the same file I renamed the local variable `res` to `response`. That is a rename only.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

---

## pair03

**Task given to both writers:** Write an update for the customer support team about an incident that is now resolved. Facts:
- From 14:02 to 14:39 UTC today, about 3% of card payments at checkout failed and showed customers the error "card declined", though the cards were not declined.
- The cause was an expired TLS certificate on the connection to the payment provider. A new certificate is in place and payments have worked since 14:39.
- Customers who saw the error were not charged.
- Support should tell affected customers to try the payment again.
- The certificate renewal job failed because of a misconfigured cron schedule. Engineering is fixing the job this week.

**Facts this reader needs:**
- it is resolved (payments working since 14:39)
- affected customers were not charged
- tell affected customers to retry the payment
- window 14:02-14:39 UTC and the misleading "card declined" error

### Passage A

Resolved: false "card declined" errors at checkout, 14:02–14:39 UTC today

From 14:02 to 14:39 UTC today, about 3% of card payments at checkout failed and showed customers the error "card declined". Their cards were not actually declined. Payments have worked normally since 14:39.

What to tell affected customers: they were not charged, and they should try the payment again.

The cause was an expired TLS certificate on our connection to the payment provider. A new certificate is in place. The job that should have renewed it failed because its cron schedule was misconfigured, and engineering is fixing that job this week.

### Passage B

**Resolved: false "card declined" errors at checkout, 14:02 to 14:39 UTC today**

If a customer contacts you about a card being declined at checkout today between 14:02 and 14:39 UTC, tell them to try the payment again. Their card was not declined, and they were not charged for the failed attempt.

During that window, about 3% of card payments at checkout failed and showed customers "card declined". The cause was an expired TLS certificate on our connection to the payment provider. A new certificate is in place, and payments have worked normally since 14:39.

The certificate expired because the job that renews it failed, due to a misconfigured cron schedule. Engineering is fixing the job this week.

---

## pair04

**Task given to both writers:** Write an email to your manager after evaluating three error-tracking vendors. Facts:
- Legal requires that error data stays in the EU. Security requires SSO.
- Vendor A: $260 a month, can be self-hosted, no SSO.
- Vendor B: $180 a month, no EU data residency, has SSO.
- Vendor C: $310 a month, EU data residency, SSO included.
- You recommend Vendor C and need your manager's approval of the spend by 28 November, when the free trial ends.
- You spent four days on the evaluation and set up test projects in all three.
- Vendor B's sales rep has emailed you three times.

**Facts this reader needs:**
- recommendation is Vendor C
- approval of the spend needed by 28 November (trial ends)
- C costs $310 a month
- A fails SSO and B fails EU residency (why the cheaper ones are out)

### Passage A

Subject: Error-tracking vendor: approval needed by 28 November

Hi,

I recommend Vendor C for error tracking at $310 a month, and I need your approval of the spend by 28 November, when the free trial ends.

Legal requires that error data stays in the EU, and Security requires SSO. Vendor C is the only one of the three that meets both.

- Vendor A: $260 a month. It can be self-hosted, but it has no SSO.
- Vendor B: $180 a month. It has SSO, but no EU data residency.
- Vendor C: $310 a month. It has EU data residency, and SSO is included.

I spent four days on the evaluation and set up test projects in all three vendors. Vendor B's sales rep has emailed me three times; I have not committed to anything.

Let me know if you want to go through the test projects before you decide.

Thanks

### Passage B

Subject: Error-tracking vendor: please approve Vendor C by 28 November

Hi,

I recommend Vendor C at $310 a month, and I need your approval of the spend by 28 November, when the free trial ends.

Legal requires that error data stays in the EU, and Security requires SSO. Only Vendor C meets both.

- Vendor A: $260 a month. It can be self-hosted, but it has no SSO.
- Vendor B: $180 a month. It has SSO, but no EU data residency.
- Vendor C: $310 a month. It has EU data residency, and SSO is included.

Vendor B is the cheapest, but it fails Legal's requirement. Vendor A fails Security's. Vendor C costs $50 a month more than A and $130 more than B.

The evaluation took me four days, and I set up test projects in all three vendors. Vendor B's sales rep has emailed me three times. I haven't replied, since B is out.

If you approve, I'll convert the Vendor C trial before it ends.

Thanks,

---

## pair05

**Task given to both writers:** Write an email to your manager after evaluating three error-tracking vendors. Facts:
- Legal requires that error data stays in the EU. Security requires SSO.
- Vendor A: $260 a month, can be self-hosted, no SSO.
- Vendor B: $180 a month, no EU data residency, has SSO.
- Vendor C: $310 a month, EU data residency, SSO included.
- You recommend Vendor C and need your manager's approval of the spend by 28 November, when the free trial ends.
- You spent four days on the evaluation and set up test projects in all three.
- Vendor B's sales rep has emailed you three times.

**Facts this reader needs:**
- recommendation is Vendor C
- approval of the spend needed by 28 November (trial ends)
- C costs $310 a month
- A fails SSO and B fails EU residency (why the cheaper ones are out)

### Passage A

Subject: Approval needed by 28 Nov: error-tracking vendor (Vendor C, $310/month)

Hi,

I'd like your approval to go with Vendor C for error tracking at $310 a month. The free trial ends on 28 November, so I need a decision by then.

I spent four days on the evaluation and set up a test project with each of the three vendors. Two requirements decided it: Legal needs error data to stay in the EU, and Security needs SSO.

- Vendor A ($260/month) can be self-hosted, which would keep data in the EU, but it has no SSO.
- Vendor B ($180/month) has SSO but no EU data residency.
- Vendor C ($310/month) has EU data residency and includes SSO.

Vendor C is the only one that meets both requirements. It costs $50 a month more than A and $130 more than B.

Can you approve the spend before the 28th?

Thanks

### Passage B

Subject: Approval needed by 28 November: error tracking, Vendor C at $310/month

Hi,

I recommend we go with Vendor C for error tracking, at $310 a month. Can you approve the spend by 28 November? That's when the free trial ends.

Vendor C is the only one of the three that meets both hard requirements: Legal needs error data kept in the EU, and Security needs SSO. Vendor C offers EU data residency and includes SSO.

The two cheaper options each miss one requirement:

- Vendor A ($260/month) can be self-hosted, which would keep data in the EU, but it has no SSO.
- Vendor B ($180/month) has SSO but no EU data residency.

I spent four days on the evaluation and set up a test project in each of the three.

Thanks,

---

## pair06

**Task given to both writers:** A product manager asks you in the team's chat channel: "Can the CSV export ship this Friday?" Write your reply. Facts you have:
- QA found two bugs in the export last week. One is fixed.
- The other bug writes dates in UTC instead of the user's time zone. The fix is expected on Thursday.
- The Friday deploy freeze starts at 3pm.
- The designer on the feature is on leave this week.
- The export uses papaparse 5.4.
- The feature was first planned for last sprint.

**Facts this reader needs:**
- the answer depends on the time-zone fix landing Thursday (or equivalent yes-if)
- the open bug is dates written in UTC instead of the user's time zone
- the deploy has to happen before the 3pm Friday freeze

### Passage A

Probably not Friday, and it depends on one bug. QA found two in the export last week. One is fixed. The other writes dates in UTC instead of the user's time zone, and the fix is expected Thursday. If it lands then and passes a quick recheck, we can ship Friday, but the deploy freeze starts at 3pm, so there's little room if Thursday slips. If it slips, the next window is after the freeze.

I'll confirm Thursday once the fix is in.

The designer is on leave this week, so nothing on the export is waiting on design input.

### Passage B

Probably, but it depends on one bug fix landing on time. QA found two bugs last week and one is fixed. The other writes dates in UTC instead of the user's time zone, and the fix is expected Thursday. The deploy freeze starts at 3pm Friday, so if the fix slips past Thursday, the export misses this week's deploy.

---

## pair07

**Task given to both writers:** Write an email to your manager after evaluating three error-tracking vendors. Facts:
- Legal requires that error data stays in the EU. Security requires SSO.
- Vendor A: $260 a month, can be self-hosted, no SSO.
- Vendor B: $180 a month, no EU data residency, has SSO.
- Vendor C: $310 a month, EU data residency, SSO included.
- You recommend Vendor C and need your manager's approval of the spend by 28 November, when the free trial ends.
- You spent four days on the evaluation and set up test projects in all three.
- Vendor B's sales rep has emailed you three times.

**Facts this reader needs:**
- recommendation is Vendor C
- approval of the spend needed by 28 November (trial ends)
- C costs $310 a month
- A fails SSO and B fails EU residency (why the cheaper ones are out)

### Passage A

Subject: Error-tracking vendor: recommendation and approval request

Hi,

I have finished evaluating error-tracking vendors and recommend Vendor C. I need your approval for the spend by 28 November, when the free trial ends.

Two requirements apply. Legal requires that error data stays in the EU. Security requires single sign-on (SSO). Here is how the three vendors compare:

- Vendor A: $260 a month. Can be self-hosted. No SSO.
- Vendor B: $180 a month. Has SSO. No EU data residency.
- Vendor C: $310 a month. EU data residency and SSO included.

Only Vendor C meets both requirements. It costs $130 a month more than Vendor B, or $1,560 a year.

I spent four days on the evaluation and set up a test project in each vendor, so the recommendation is based on running all three, not only on their websites.

Could you approve $310 a month for Vendor C by 28 November? If you approve it, I'll move us to Vendor C's paid plan before the trial ends.

Thanks,

### Passage B

**Subject:** Error tracking: recommending Vendor C, need spend approval by 28 November

I'd like your approval to buy Vendor C for error tracking at $310 a month. The free trial ends on 28 November, so I need a yes by then.

Only Vendor C meets both requirements. Legal requires that error data stays in the EU, and security requires single sign-on (SSO).

- Vendor A ($260 a month) can be self-hosted but has no SSO.
- Vendor B ($180 a month) has SSO but does not keep data in the EU.
- Vendor C ($310 a month) keeps data in the EU and includes SSO.

Vendor C costs $50 a month more than A and $130 a month more than B. The two cheaper options each fail a requirement that legal or security set, so I don't see them as real alternatives.

I spent four days on the evaluation and set up a test project in each of the three vendors, so the comparison rests on running the tools, not on their pricing pages. I can walk you through the test projects if that would help.

Can you approve the spend by 28 November?

---

## pair08

**Task given to both writers:** A product manager asks you in the team's chat channel: "Can the CSV export ship this Friday?" Write your reply. Facts you have:
- QA found two bugs in the export last week. One is fixed.
- The other bug writes dates in UTC instead of the user's time zone. The fix is expected on Thursday.
- The Friday deploy freeze starts at 3pm.
- The designer on the feature is on leave this week.
- The export uses papaparse 5.4.
- The feature was first planned for last sprint.

**Facts this reader needs:**
- the answer depends on the time-zone fix landing Thursday (or equivalent yes-if)
- the open bug is dates written in UTC instead of the user's time zone
- the deploy has to happen before the 3pm Friday freeze

### Passage A

Maybe. It ships Friday only if the date fix lands Thursday and passes QA that day, and the deploy goes out before the freeze at 3pm Friday.

Of the two bugs QA found in the export last week, one is fixed. The other writes dates in UTC instead of the user's time zone. The fix is expected Thursday.

The designer on this feature is on leave this week, so any design questions will wait until they're back. If the date fix slips past Thursday, I'd move the release to next week rather than push it past the freeze.

### Passage B

Short answer: yes, if the date fix lands Thursday and passes QA that day. The hard limit is the deploy freeze, which starts at 3pm Friday. Anything not deployed by then waits for the next window.

Where it stands:

- QA found two bugs in the export last week. One is fixed.
- The other writes dates in UTC instead of the user's time zone. The fix is expected Thursday.

The risks I see:

- If the date fix slips past Thursday or fails QA, we will miss the freeze.
- The designer on this feature is on leave this week, so I can't check any design questions with them before Friday.

I'll tell you by Thursday afternoon if the date fix is at risk. If it lands and passes, I'll deploy Thursday or first thing Friday. If it doesn't, I'd hold the release for the next window rather than push it past the freeze.

---

## pair09

**Task given to both writers:** Write an update for the customer support team about an incident that is now resolved. Facts:
- From 14:02 to 14:39 UTC today, about 3% of card payments at checkout failed and showed customers the error "card declined", though the cards were not declined.
- The cause was an expired TLS certificate on the connection to the payment provider. A new certificate is in place and payments have worked since 14:39.
- Customers who saw the error were not charged.
- Support should tell affected customers to try the payment again.
- The certificate renewal job failed because of a misconfigured cron schedule. Engineering is fixing the job this week.

**Facts this reader needs:**
- it is resolved (payments working since 14:39)
- affected customers were not charged
- tell affected customers to retry the payment
- window 14:02-14:39 UTC and the misleading "card declined" error

### Passage A

**Subject:** Resolved: card payment errors at checkout, today 14:02 to 14:39 UTC

The incident is resolved. Card payments at checkout are working again.

From 14:02 to 14:39 UTC today, about 3% of card payments failed. Customers who hit the failure saw the message "card declined," but their cards were not declined. The cause was an expired TLS certificate on the connection to our payment provider. A new certificate is in place, and payments have worked since 14:39.

Customers who saw the error were not charged.

**What support should do**

If a customer reports a "card declined" error at checkout between 14:02 and 14:39 UTC today, tell them the problem was on our side, their card was not declined, and they were not charged. Ask them to try the payment again.

**What engineering is doing**

The certificate renewal job failed because of a misconfigured cron schedule. Engineering is fixing the job this week.

### Passage B

Subject: Resolved: card payment errors at checkout, 14:02 to 14:39 UTC today

Hi support team,

Between 14:02 and 14:39 UTC today, about 3% of card payments at checkout failed. Customers saw the message "card declined", but their cards were not declined. The problem is resolved. Payments have worked normally since 14:39 UTC.

**What caused it:** The TLS certificate on our connection to the payment provider expired. A new certificate is now in place. The certificate renewal job failed because of a misconfigured cron schedule. Engineering is fixing the job this week.

**Customer impact:** Customers who saw the error were not charged.

**What to tell affected customers:** If a customer contacts you about the "card declined" message from this window, tell them their card was not declined and ask them to try the payment again.

Thanks,

---

## pair10

**Task given to both writers:** Write the description for your pull request. Reviewers are two engineers on your team. Facts about the change:
- The order status page used to poll the server every 5 seconds. It now uses server-sent events.
- The change removes 140 lines.
- On a dropped connection the client reconnects with exponential backoff, capped at 30 seconds.
- You tested it by hand in Chrome and Safari. You did not test Firefox.
- It is behind the environment variable ORDERS_SSE_ENABLED, which defaults to off.
- You also renamed a local variable in the same file from `res` to `response`.

**Facts this reader needs:**
- polling every 5 seconds replaced by server-sent events
- behind ORDERS_SSE_ENABLED, default off
- tested by hand in Chrome and Safari only; Firefox not tested
- reconnect with exponential backoff capped at 30 seconds

### Passage A

The order status page now gets updates over server-sent events instead of polling the server every 5 seconds. It is behind `ORDERS_SSE_ENABLED`, which defaults to off, so merging this changes nothing until the variable is set.

If the connection drops, the client reconnects with exponential backoff, capped at 30 seconds between attempts.

The change removes 140 lines. In the same file I also renamed the local variable `res` to `response`. That rename has no effect on behavior.

Testing: I tested by hand in Chrome and Safari. I have not tested Firefox, so if one of you has it handy, please check that updates arrive and that the page reconnects after you drop the connection.

### Passage B

Replace polling on the order status page with server-sent events

The order status page used to poll the server every 5 seconds. It now opens a server-sent events connection and updates when the server pushes a change. The diff removes 140 lines, most of them the polling code.

If the connection drops, the client reconnects with exponential backoff, capped at 30 seconds.

The change is behind `ORDERS_SSE_ENABLED`, which defaults to off, so merging this doesn't change behavior until someone sets it.

I also renamed a local variable in the same file from `res` to `response`. It has no effect on behavior.

Testing: I tested by hand in Chrome and Safari. I didn't test Firefox, so if one of you has it handy, a quick check with the flag on would help.

---

## pair11

**Task given to both writers:** A product manager asks you in the team's chat channel: "Can the CSV export ship this Friday?" Write your reply. Facts you have:
- QA found two bugs in the export last week. One is fixed.
- The other bug writes dates in UTC instead of the user's time zone. The fix is expected on Thursday.
- The Friday deploy freeze starts at 3pm.
- The designer on the feature is on leave this week.
- The export uses papaparse 5.4.
- The feature was first planned for last sprint.

**Facts this reader needs:**
- the answer depends on the time-zone fix landing Thursday (or equivalent yes-if)
- the open bug is dates written in UTC instead of the user's time zone
- the deploy has to happen before the 3pm Friday freeze

### Passage A

Yes, if the last bug fix lands on Thursday as expected. QA found two bugs last week. One is fixed. The other writes dates in UTC instead of the user's time zone, and its fix is due Thursday. The deploy freeze starts at 3pm Friday, so the fix has to be merged and deployed before then. If the fix slips past Thursday, the export won't make Friday. I'll post here Thursday once I know whether it's in.

### Passage B

Probably, but it depends on one fix landing Thursday. QA found two bugs last week. One is fixed. The other writes dates in UTC instead of the user's time zone, and that fix is expected Thursday. If it lands then, we have Friday morning to verify it before the deploy freeze at 3pm. If it slips past Thursday, I'd hold the export until after the freeze rather than ship wrong dates. I'll post here Thursday once I know.

---

## pair12

**Task given to both writers:** Write an update for the customer support team about an incident that is now resolved. Facts:
- From 14:02 to 14:39 UTC today, about 3% of card payments at checkout failed and showed customers the error "card declined", though the cards were not declined.
- The cause was an expired TLS certificate on the connection to the payment provider. A new certificate is in place and payments have worked since 14:39.
- Customers who saw the error were not charged.
- Support should tell affected customers to try the payment again.
- The certificate renewal job failed because of a misconfigured cron schedule. Engineering is fixing the job this week.

**Facts this reader needs:**
- it is resolved (payments working since 14:39)
- affected customers were not charged
- tell affected customers to retry the payment
- window 14:02-14:39 UTC and the misleading "card declined" error

### Passage A

Subject: Resolved: "card declined" errors at checkout, 14:02 to 14:39 UTC

Checkout payments are working normally again. If customers contact you about a failed payment from today, tell them to try the payment again. They were not charged.

From 14:02 to 14:39 UTC today, about 3% of card payments at checkout failed. Customers saw the error "card declined", but their cards were not declined. The failures were on our side.

The cause was an expired TLS certificate on our connection to the payment provider. A new certificate is in place, and payments have worked since 14:39.

The certificate should have renewed automatically. The renewal job failed because of a misconfigured cron schedule, and engineering is fixing the job this week.

### Passage B

**Resolved: false "card declined" errors at checkout, 14:02 to 14:39 UTC today**

Payments are working normally again and have been since 14:39 UTC.

From 14:02 to 14:39 UTC, about 3% of card payments at checkout failed. Customers saw "card declined", but their cards were not declined. Customers who saw the error were not charged.

**What to tell affected customers:** ask them to try the payment again. It should go through.

The cause was an expired TLS certificate on our connection to the payment provider. A new certificate is in place. The renewal job that should have replaced the old one failed because of a misconfigured cron schedule, and engineering is fixing the job this week.
