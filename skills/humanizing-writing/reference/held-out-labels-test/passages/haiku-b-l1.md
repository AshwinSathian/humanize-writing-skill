# Give each checkout test its own cart

`test_checkout_total` failed about 1 run in 20. The cause was shared state. `test_checkout_total` and `test_apply_coupon` both wrote to the same cart fixture, and pytest-xdist ran them in parallel, so one test could change the cart while the other was using it.

This PR adds `cart_factory()` in `tests/conftest.py`, which returns a new cart for each test. `tests/test_checkout.py` and `tests/test_coupons.py` now get their cart from the factory instead of the shared fixture.

Clock skew was ruled out: the failure still happened with the clock frozen. I did not test a network cause, because shared fixture state explains every failure I saw.

I also tried a lock around the shared fixture. It stopped the flake but made the suite about 40% slower, so I removed it.

Verification: with this change, the suite ran 200 times with no failures. Before the change, the flake reproduced locally at about 1 run in 20.
