## Fix flaky test_checkout_total by giving each test its own cart

test_checkout_total failed about 1 run in 20 locally. The cause is shared fixture state: test_checkout_total and test_apply_coupon both write to the same cart fixture, and pytest-xdist runs them in parallel, so one can change the cart while the other reads it.

The fix replaces the shared cart with a `cart_factory()` fixture, so each test builds its own cart. Changes are in `tests/conftest.py`, `tests/test_checkout.py` and `tests/test_coupons.py`.

I ran the full suite 200 times with the change and saw no failures.

Other things I tried:

- A clock problem was not the cause. The test still flaked with a frozen clock.
- My first fix put a lock around the shared fixture. It worked, but it made the suite about 40% slower, so I reverted it.
- I did not test network effects. The fixture race explained every failure I saw, so I stopped there.

Please check that no other tests still use the old shared cart fixture. I only changed the two that write to it.
