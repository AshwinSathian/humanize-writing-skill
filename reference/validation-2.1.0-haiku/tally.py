"""Unblind the judges' answers with key.json and print the counts.

Usage:
    python3 tally.py
"""

import json
from collections import Counter
from pathlib import Path

HERE = Path(__file__).parent
NAMES = {"v2": "2.1.0", "v1": "1.1.1", "base": "no skill", "tie": "tie"}


def main() -> None:
    key = json.loads((HERE / "key.json").read_text())
    for path in sorted(HERE.glob("judge-*.json")):
        answers = json.loads(path.read_text())
        assert set(answers) == set(key), f"{path.name}: pairs do not match the key"
        print(path.stem)
        for other in ("base", "v1"):
            machine, prefer, invented = Counter(), Counter(), []
            for pair, k in key.items():
                if other not in (k["A"], k["B"]):
                    continue
                a = answers[pair]
                unblind = lambda side: "tie" if side == "tie" else k[side]
                machine[NAMES[unblind(a["more_machine"])]] += 1
                prefer[NAMES[unblind(a["prefer"])]] += 1
                for side in "AB":
                    for item in a["invented"][side]:
                        invented.append(f"{pair} {k['task']} {NAMES[k[side]]}: {item}")
            print(f"  2.1.0 against {NAMES[other]}")
            print(f"    read as more machine-written: {dict(machine)}")
            print(f"    preferred: {dict(prefer)}")
            for line in invented:
                print(f"    flagged as invented: {line}")


if __name__ == "__main__":
    main()
