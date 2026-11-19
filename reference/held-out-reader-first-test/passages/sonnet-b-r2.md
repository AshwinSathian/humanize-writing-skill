## Replace order status polling with server-sent events

The order status page used to poll the server every 5 seconds. It now opens a server-sent events connection instead. The change removes 140 lines.

If the connection drops, the client reconnects with exponential backoff, capped at 30 seconds.

The change is behind the environment variable `ORDERS_SSE_ENABLED`, which defaults to off, so merging it does not change behavior until the flag is turned on.

I tested it by hand in Chrome and Safari. I did not test Firefox, so please try it there if you can.

Unrelated to the above, I renamed a local variable in the same file from `res` to `response`.
