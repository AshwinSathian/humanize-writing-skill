"""Unblind the judges' answers and apply the rule in preregistration.md.

Usage:
    python3 tally.py
"""

import json
from collections import Counter
from pathlib import Path

HERE = Path(__file__).parent
NAMES = {"a": "2.1.0", "b": "candidate"}
OPEN_TASKS = ("h1", "h2", "h3")  # no team facts supplied
CONTROL = "h4"


def main() -> None:
    key = json.loads((HERE / "key.json").read_text())
    judges = {p.stem.removeprefix("judge-"): json.loads(p.read_text()) for p in sorted(HERE.glob("judge-*.json"))}
    assert len(judges) == 3, "expected three judges"
    for name, answers in judges.items():
        assert set(answers) == set(key), f"{name}: pairs do not match the key"

    # votes[(model, task, version)] = number of judges who flagged it
    invented, overcorrected = Counter(), Counter()
    items = []
    prefer = {name: Counter() for name in judges}
    for name, answers in judges.items():
        for pair, k in key.items():
            a = answers[pair]
            choice = a["prefer"]
            prefer[name]["tie" if choice == "tie" else NAMES[k[choice]]] += 1
            for side in "AB":
                passage = (k["model"], k["task"], k[side])
                if a["invented"][side]:
                    invented[passage] += 1
                    items += [f"  {name}: {k['model']} {k['task']} {NAMES[k[side]]}: {i}" for i in a["invented"][side]]
                if a["dropped_or_hedged"][side]:
                    overcorrected[passage] += 1
                    items += [f"  {name}: {k['model']} {k['task']} {NAMES[k[side]]} (supplied fact): {i}" for i in a["dropped_or_hedged"][side]]

    flagged = lambda votes, version, tasks: sorted(p for p, n in votes.items() if n >= 2 and p[2] == version and p[1] in tasks)
    c_list, k_list = flagged(invented, "a", OPEN_TASKS), flagged(invented, "b", OPEN_TASKS)
    C, K = len(c_list), len(k_list)

    print("Preference, 12 pairs per judge")
    for name, counts in prefer.items():
        print(f"  {name}: {dict(counts)}")
    print(f"\nFlagged for invention by at least two judges, h1 to h3 (9 passages per version)")
    print(f"  C (2.1.0) = {C}: {[f'{m} {t}' for m, t, _ in c_list]}")
    print(f"  K (candidate) = {K}: {[f'{m} {t}' for m, t, _ in k_list]}")
    print("\nFlagged for invention on the control task h4 (not part of C or K)")
    for version in "ab":
        print(f"  {NAMES[version]}: {[m for m, _, _ in flagged(invented, version, (CONTROL,))]}")
    over_a = {m for m, _, _ in flagged(overcorrected, "a", (CONTROL,))}
    over_b = {m for m, _, _ in flagged(overcorrected, "b", (CONTROL,))}
    print(f"\nFlagged for over-correction on h4: 2.1.0 {sorted(over_a)}, candidate {sorted(over_b)}")

    print("\nEvery item a judge listed")
    print("\n".join(items) or "  none")

    print("\nDecision rule")
    if C <= 1:
        print(f"  C = {C}: the slip did not reproduce on held-out tasks. The rule stays as it is.")
        return
    cond1 = K <= C - 2
    ok_judges = [n for n, c in prefer.items() if c["candidate"] + c["tie"] >= 6]
    cond2 = len(ok_judges) >= 2
    cond3 = over_b <= over_a
    print(f"  1. C >= 2 and K <= C - 2: {cond1}")
    print(f"  2. candidate preferred or tied in >= 6 of 12 for >= 2 judges: {cond2} ({ok_judges})")
    print(f"  3. no over-correction on h4 beyond 2.1.0: {cond3}")
    print("  ADOPT the candidate as 2.1.1." if cond1 and cond2 and cond3 else "  The rule stays as it is.")


if __name__ == "__main__":
    main()
