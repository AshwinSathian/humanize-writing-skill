The order status page now gets updates over server-sent events instead of polling the server every 5 seconds. It is behind `ORDERS_SSE_ENABLED`, which defaults to off, so merging this changes nothing until the variable is set.

If the connection drops, the client reconnects with exponential backoff, capped at 30 seconds between attempts.

The change removes 140 lines. In the same file I also renamed the local variable `res` to `response`. That rename has no effect on behavior.

Testing: I tested by hand in Chrome and Safari. I have not tested Firefox, so if one of you has it handy, please check that updates arrive and that the page reconnects after you drop the connection.
