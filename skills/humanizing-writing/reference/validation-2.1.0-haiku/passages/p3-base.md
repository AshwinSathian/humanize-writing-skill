Until now, payment status has come from polling. The `poll_payments` cron job in `billing-worker` asked the payment provider for status every 30 seconds, and downstream processing acted on whatever each poll returned. That works, but it means status changes can lag by up to half a minute, and every check costs a request whether or not anything has changed.

This PR switches the primary path to push. It adds a webhook endpoint, `POST /hooks/payments`, in `billing-worker` that receives payment events from the provider as they happen. Each webhook request is verified with an HMAC-SHA256 signature before its payload is trusted, so unsigned or tampered requests do not reach the handler.

`notifier` now reacts to the webhook event instead of the poll result, so notifications go out as soon as the provider reports a change.

The `poll_payments` job is not removed. It stays in place as a fallback and now runs every 15 minutes, which catches any event that never arrives, at a much lower request volume than before.
