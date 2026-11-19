Short answer: yes, if the date fix lands Thursday and passes QA that day. The hard limit is the deploy freeze, which starts at 3pm Friday. Anything not deployed by then waits for the next window.

Where it stands:

- QA found two bugs in the export last week. One is fixed.
- The other writes dates in UTC instead of the user's time zone. The fix is expected Thursday.

The risks I see:

- If the date fix slips past Thursday or fails QA, we will miss the freeze.
- The designer on this feature is on leave this week, so I can't check any design questions with them before Friday.

I'll tell you by Thursday afternoon if the date fix is at risk. If it lands and passes, I'll deploy Thursday or first thing Friday. If it doesn't, I'd hold the release for the next window rather than push it past the freeze.
