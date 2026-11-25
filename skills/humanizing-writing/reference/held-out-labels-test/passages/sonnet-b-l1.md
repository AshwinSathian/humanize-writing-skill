Fix flaky `test_checkout_total` by giving each test its own cart

`test_checkout_total` failed about 1 run in 20 locally. The cause is that it and `test_apply_coupon` both write to the same cart fixture, and pytest-xdist runs them in parallel, so one test can overwrite the other's cart mid-run.

The fix is a `cart_factory()` fixture in `tests/conftest.py`. `tests/test_checkout.py` and `tests/test_coupons.py` now call it, so each test builds its own cart and nothing is shared.

I ran the full suite 200 times with this change and saw 0 failures.

What I ruled out:

- Clock skew. The test still failed with a frozen clock.
- A lock around the shared fixture. It also fixed the flake, but it made the suite about 40% slower, so I reverted it.

I did not test network effects, since the shared fixture accounted for the failures.

If another test starts using the old shared cart fixture, it can bring the flake back. Reviewers may want to check for other users of that fixture.
