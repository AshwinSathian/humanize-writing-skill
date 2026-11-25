# Fix flaky test_checkout_total by giving each test its own cart

`test_checkout_total` failed about 1 run in 20 when the suite ran in parallel. The cause was shared state: `test_checkout_total` and `test_apply_coupon` both wrote to the same cart fixture, and pytest-xdist runs them at the same time, so one test could change the cart while the other was still reading it.

This PR gives each test its own cart. A new `cart_factory()` fixture in `tests/conftest.py` builds a fresh cart for every test that asks for one. `tests/test_checkout.py` and `tests/test_coupons.py` now call the factory instead of sharing the fixture.

I also tried a lock around the shared fixture. It removed the flake but made the suite about 40% slower, so I reverted it and did not keep it.

I ruled out clock skew: the failure still happens with a frozen clock. I did not test a network cause, because the shared-state explanation accounted for every failure I saw.

Verification: I ran the full suite 200 times with this change and saw no failures. I have not run it on CI.

Files changed:
- `tests/conftest.py` (new `cart_factory()`)
- `tests/test_checkout.py`
- `tests/test_coupons.py`
