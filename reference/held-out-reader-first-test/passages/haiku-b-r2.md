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
