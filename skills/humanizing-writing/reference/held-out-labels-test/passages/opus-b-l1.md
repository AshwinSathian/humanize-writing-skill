Fix flaky test_checkout_total by giving each test its own cart

test_checkout_total failed about 1 in 20 runs because it shared a cart fixture with test_apply_coupon. Both tests write to that cart, and pytest-xdist runs them in parallel, so one test could change the cart while the other was checking its total. This PR replaces the shared fixture with a `cart_factory()` fixture in `tests/conftest.py`, and both tests now build their own cart from it.

With this change I ran the suite 200 times and got no failures.

Changes:

- `tests/conftest.py`: adds `cart_factory()` in place of the shared cart fixture
- `tests/test_checkout.py` and `tests/test_coupons.py`: use `cart_factory()` to create a cart per test

I also tried putting a lock around the shared fixture. It fixed the flake but made the suite about 40% slower, so I reverted it.

Clock skew is not the cause: the test still failed with the clock frozen. I did not test whether network calls contribute, because the shared cart accounted for every failure I reproduced.
