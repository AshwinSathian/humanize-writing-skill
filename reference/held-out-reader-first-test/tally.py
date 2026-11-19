"""Unblind the judges' answers and apply the rule in preregistration.md.

Usage:
    python3 tally.py
"""

import json
import statistics
import sys
from collections import Counter
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent.parent / "scripts"))
from measure import measure  # noqa: E402

NAMES = {"a": "2.1.0", "b": "candidate"}


def main() -> None:
    key = json.loads((HERE / "key.json").read_text())
    judges = {p.stem.removeprefix("judge-"): json.loads(p.read_text()) for p in sorted(HERE.glob("judge-*.json"))}
    assert len(judges) == 3, "expected three judges"
    for name, answers in judges.items():
        assert set(answers) == set(key), f"{name}: pairs do not match the key"

    votes = {k: Counter() for k in ("leads", "missing", "invented")}
    prefer = {name: Counter() for name in judges}
    notes = []
    for name, answers in judges.items():
        for pair, k in key.items():
            a = answers[pair]
            prefer[name]["tie" if a["prefer"] == "tie" else NAMES[k[a["prefer"]]]] += 1
            for side in "AB":
                p = (k["model"], k["task"], k[side])
                if a["leads"][side]:
                    votes["leads"][p] += 1
                for field in ("missing", "invented"):
                    if a[field][side]:
                        votes[field][p] += 1
                        notes += [f"  {name}: {p[0]} {p[1]} {NAMES[p[2]]} {field}: {i}" for i in a[field][side]]

    passages = [(k["model"], k["task"], v) for k in key.values() for v in "ab"]
    count = {f: {v: sum(1 for p in passages if p[2] == v and votes[f][p] >= 2) for v in "ab"} for f in votes}
    words = {v: [measure((HERE / "passages" / f"{m}-{v}-{t}.md").read_text())["words"] for (m, t, vv) in passages if vv == v] for v in "ab"}
    med = {v: statistics.median(words[v]) for v in "ab"}

    print("Counts (passages with 2+ judge votes), 2.1.0 vs candidate:")
    for f in votes:
        print(f"  {f}: C={count[f]['a']} K={count[f]['b']}")
    print(f"Median words: 2.1.0 {med['a']}, candidate {med['b']} ({med['b'] / med['a']:.0%})")
    print("Preference per judge:")
    for name, c in prefer.items():
        print(f"  {name}: candidate {c['candidate']}, 2.1.0 {c['2.1.0']}, tie {c['tie']}")

    c1 = count["leads"]["b"] >= count["leads"]["a"] + 2 or (count["leads"]["a"] >= 11 and med["b"] <= 0.85 * med["a"])
    c2 = sum(1 for c in prefer.values() if c["candidate"] + c["tie"] >= 6) >= 2
    c3 = count["missing"]["b"] <= count["missing"]["a"]
    c4 = count["invented"]["b"] <= count["invented"]["a"]
    for n, ok in enumerate((c1, c2, c3, c4), 1):
        print(f"Condition {n}: {'holds' if ok else 'fails'}")
    print("Decision:", "adopt" if all((c1, c2, c3, c4)) else "do not adopt")
    print("Items listed by judges:")
    print("\n".join(notes) or "  none")


if __name__ == "__main__":
    main()
