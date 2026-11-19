## Replace order status polling with server-sent events

The order status page used to poll the server every 5 seconds. It now opens a server-sent events connection and gets updates pushed. The change removes 140 lines.

If the connection drops, the client reconnects with exponential backoff, capped at 30 seconds.

The new path is behind the environment variable `ORDERS_SSE_ENABLED`, which defaults to off. With it off, nothing changes for users.

I tested by hand in Chrome and Safari. I did not test Firefox, so please try it there if you have a minute.

I also renamed a local variable in the same file from `res` to `response`. It is unrelated to the SSE change.
