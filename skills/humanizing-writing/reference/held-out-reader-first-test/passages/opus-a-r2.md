Replace polling on the order status page with server-sent events

The order status page used to poll the server every 5 seconds. It now opens a server-sent events connection and updates when the server pushes a change. The diff removes 140 lines, most of them the polling code.

If the connection drops, the client reconnects with exponential backoff, capped at 30 seconds.

The change is behind `ORDERS_SSE_ENABLED`, which defaults to off, so merging this doesn't change behavior until someone sets it.

I also renamed a local variable in the same file from `res` to `response`. It has no effect on behavior.

Testing: I tested by hand in Chrome and Safari. I didn't test Firefox, so if one of you has it handy, a quick check with the flag on would help.
