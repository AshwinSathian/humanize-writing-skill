## Order status page: switch from polling to server-sent events

The order status page used to poll the server every 5 seconds. This PR replaces that polling with a server-sent events (SSE) stream, so the server pushes status updates to the page.

When the connection drops, the client reconnects with exponential backoff. The wait between attempts is capped at 30 seconds.

The diff removes 140 lines.

The new path sits behind `ORDERS_SSE_ENABLED`, which defaults to off, so it stays inactive until someone sets the flag.

Testing: I tested the page by hand in Chrome and Safari. I did not test in Firefox, so please check that browser if you can.

Also in this PR: in the same file I renamed the local variable `res` to `response`. That is a rename only.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
