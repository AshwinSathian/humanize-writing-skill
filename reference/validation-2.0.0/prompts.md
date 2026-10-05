# Writing tasks

Write each passage as plain markdown prose, ready to publish. No preamble, no notes to the reader about how you wrote it.

## p1
Explain, in about 200 words, why database indexes speed up reads and what they cost. Audience: backend developers who have used SQL but never tuned it.

## p2
Write a section of about 200 words for an internal engineering blog arguing that the team should adopt feature flags. Audience: your own engineering team.

## p3
Write the description for a pull request, about 150 words. Use only these facts:
- Payment status was fetched by polling the provider every 30 seconds from the cron job `poll_payments` in `billing-worker`.
- This PR adds a webhook endpoint, `POST /hooks/payments`, in `billing-worker`.
- Webhook requests are verified with an HMAC-SHA256 signature.
- `notifier` now reacts to the webhook event instead of the poll result.
- The `poll_payments` job stays, but runs every 15 minutes as a fallback.
