This fixes the intermittent failure in `test_checkout_total`. The cause was shared test state: `test_checkout_total` and `test_apply_coupon` both wrote to the same cart fixture, and pytest-xdist runs them in parallel, so one test sometimes saw the other's items. Each test now builds its own cart through a new `cart_factory()` fixture.

Locally the test failed in about 1 of every 20 runs before the change. With the change, I ran the suite 200 times and got no failures.

I also checked clock skew and ruled it out, because the test still failed with a frozen clock. I did not look into network causes, since the shared cart explained every failure I saw.

My first attempt put a lock around the shared fixture. It fixed the flake but made the suite about 40% slower, so I reverted it in favor of the factory.

Files changed:

- `tests/conftest.py`: adds `cart_factory()`
- `tests/test_checkout.py` and `tests/test_coupons.py`: use the factory instead of the shared cart
