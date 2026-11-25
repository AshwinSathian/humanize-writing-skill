"""Unblind the judges' answers and apply the rule in preregistration.md.

Usage:
    python3 tally.py             # the counts, the five conditions, the decision
    python3 tally.py --guides    # guide-a.md is 2.2.1's SKILL.md; guide-b.md adds only the bullet
    python3 tally.py --selftest  # the counting and the five conditions on made-up data

Written and committed before any passage existed. Stdlib only.
"""

import json
import re
import statistics
import subprocess
import sys
from collections import Counter
from fractions import Fraction
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent.parent / "scripts"))
from measure import measure  # noqa: E402

BASELINE = "2ff1450"  # main when the test was run: SKILL.md 2.2.1
NAMES = {"a": "2.2.1", "b": "candidate"}
FIELDS = ("undefined", "missing", "invented")


def leaks(text, labels):
    """Labels that occur in text word for word, case-insensitive, with word boundaries."""
    return [l for l in labels if re.search(rf"\b{re.escape(l)}\b", text, re.I)]


def check_judge(name, answers, key):
    assert set(answers) == set(key), f"{name}: pairs do not match the key"
    for pair, a in answers.items():
        assert a.get("more_machine") in ("A", "B", "tie"), f"{name} {pair}: more_machine"
        assert a.get("prefer") in ("A", "B", "no preference"), f"{name} {pair}: prefer"
        for f in FIELDS:
            assert set(a.get(f, {})) == {"A", "B"}, f"{name} {pair}: {f} needs A and B"
            assert all(isinstance(a[f][s], list) for s in "AB"), f"{name} {pair}: {f} must be lists"
        assert isinstance(a.get("why"), str) and a["why"].strip(), f"{name} {pair}: why"


def votes(key, judges):
    """For each field, how many judges listed at least one item per passage (model, task, version)."""
    v = {f: Counter() for f in FIELDS}
    items = []
    for name, answers in judges.items():
        for pair, k in key.items():
            for side in "AB":
                p = (k["model"], k["task"], k[side])
                for f in FIELDS:
                    if answers[pair][f][side]:
                        v[f][p] += 1
                        items += [(f, p, name, i) for i in answers[pair][f][side]]
    return v, items


def counts(key, v):
    """Passages per version with at least two of three judges' votes."""
    passages = [(k["model"], k["task"], s) for k in key.values() for s in "ab"]
    return {f: {s: sum(1 for p in passages if p[2] == s and v[f][p] >= 2) for s in "ab"} for f in FIELDS}


def preferences(key, judges):
    out = {}
    for name, answers in judges.items():
        c = Counter()
        for pair, k in key.items():
            pick = answers[pair]["prefer"]
            c["tie" if pick == "no preference" else NAMES[k[pick]]] += 1
        out[name] = c
    return out


def conditions(count, prefer, med):
    u, m, i = count["undefined"], count["missing"], count["invented"]
    return [
        u["a"] >= 3,
        u["b"] <= u["a"] - 2,
        sum(1 for c in prefer.values() if c["candidate"] + c["tie"] >= 6) >= 2,
        m["b"] <= m["a"] and Fraction(med["b"]) <= Fraction(115, 100) * Fraction(med["a"]),
        i["b"] <= i["a"],
    ]


def guides():
    skill = subprocess.run(["git", "show", f"{BASELINE}:skills/humanizing-writing/SKILL.md"],
                           cwd=HERE, capture_output=True, text=True, check=True).stdout
    a = (HERE / "guide-a.md").read_text()
    b = (HERE / "guide-b.md").read_text()
    assert a == skill, "guide-a.md is not SKILL.md at the baseline"
    rule = (HERE / "candidate-rule.md").read_text()
    bullet = re.search(r"^- Write for a reader.*?\n(?=\n)", rule, re.S | re.M).group(0)
    anchor = "  follows. Leave out what this reader will not use, even when it is true\n  and you have it.\n"
    assert a.count(anchor) == 1, "anchor bullet not found once"
    assert b == a.replace(anchor, anchor + bullet), "guide-b.md is not guide-a.md plus the bullet"
    print("guides ok")


def selftest():
    def cnt(ua, ub, ma=0, mb=0, ia=0, ib=0):
        return {"undefined": {"a": ua, "b": ub}, "missing": {"a": ma, "b": mb}, "invented": {"a": ia, "b": ib}}

    def pref(*cands, ties=(0, 0, 0)):
        return {n: Counter(candidate=c, tie=t) for n, c, t in zip(("opus", "sonnet", "haiku"), cands, ties)}

    ok_p, ok_m = pref(6, 6, 0), {"a": 100, "b": 115}
    assert conditions(cnt(3, 1), ok_p, ok_m) == [True] * 5
    assert conditions(cnt(2, 0), ok_p, ok_m)[0] is False          # 1: needs C_unclear >= 3
    assert conditions(cnt(3, 2), ok_p, ok_m)[1] is False          # 2: needs a drop of two
    assert conditions(cnt(3, 1), pref(6, 5, 12), ok_m)[2] is True
    assert conditions(cnt(3, 1), pref(6, 5, 5), ok_m)[2] is False  # 3: two judges, not one
    assert conditions(cnt(3, 1), pref(3, 6, 0, ties=(3, 0, 0)), ok_m)[2] is True  # ties count
    assert conditions(cnt(3, 1, 1, 1), ok_p, ok_m)[3] is True
    assert conditions(cnt(3, 1, 1, 2), ok_p, ok_m)[3] is False    # 4: missing
    assert conditions(cnt(3, 1), ok_p, {"a": 100, "b": 115.5})[3] is False  # 4: length
    assert conditions(cnt(3, 1), ok_p, {"a": 129.5, "b": Fraction(129.5) * Fraction(115, 100)})[3] is True
    assert conditions(cnt(3, 1, 0, 0, 2, 2), ok_p, ok_m)[4] is True
    assert conditions(cnt(3, 1, 0, 0, 2, 3), ok_p, ok_m)[4] is False  # 5: invented

    key = {"pair01": {"model": "opus", "task": "l1", "A": "b", "B": "a"}}
    empty = {f: {"A": [], "B": []} for f in FIELDS}

    def ans(prefer, **flags):
        d = {f: {"A": list(v.get("A", [])), "B": list(v.get("B", []))} for f, v in {**empty, **flags}.items()}
        return {"pair01": {"more_machine": "A", "prefer": prefer, "why": "x", **d}}

    judges = {"opus": ans("A", undefined={"A": ["H2"]}), "sonnet": ans("no preference", undefined={"A": ["H2", "fix-2"]}),
              "haiku": ans("B", undefined={"B": ["H2"]})}
    for n, a in judges.items():
        check_judge(n, a, key)
    v, items = votes(key, judges)
    c = counts(key, v)
    assert c["undefined"] == {"a": 0, "b": 1}, c  # candidate (side A) has two votes; 2.2.1 (side B) one
    assert c["missing"] == {"a": 0, "b": 0}
    assert len(items) == 4
    p = preferences(key, judges)
    assert p["opus"]["candidate"] == 1 and p["sonnet"]["tie"] == 1 and p["haiku"]["2.2.1"] == 1

    assert leaks("We call it H2. The engineering team", ["h2", "ENG"]) == ["h2"]
    assert leaks("PSP-side, step 10", ["PSP", "PSP-side", "step 1"]) == ["PSP", "PSP-side"]
    assert leaks("RL_WIN and the hot path", ["RL_WIN", "the hot path", "RL"]) == ["RL_WIN", "the hot path"]
    print("selftest ok")


def main():
    tasks = json.loads((HERE / "tasks.json").read_text())
    key = json.loads((HERE / "key.json").read_text())
    assert len(key) == 12, "expected twelve pairs"
    judges = {p.stem.removeprefix("judge-"): json.loads(p.read_text()) for p in sorted(HERE.glob("judge-*.json"))}
    assert sorted(judges) == ["haiku", "opus", "sonnet"], "expected the three judges"
    for name, answers in judges.items():
        check_judge(name, answers, key)

    v, items = votes(key, judges)
    count = counts(key, v)
    prefer = preferences(key, judges)
    passages = sorted((k["model"], k["task"], s) for k in key.values() for s in "ab")
    text = {p: (HERE / "passages" / f"{p[0]}-{p[2]}-{p[1]}.md").read_text() for p in passages}
    words = {p: measure(t)["words"] for p, t in text.items()}
    med = {s: statistics.median(words[p] for p in passages if p[2] == s) for s in "ab"}

    print("Counts (passages with 2+ of 3 judge votes), of 12, 2.2.1 (C) vs candidate (K):")
    label = {"undefined": "unclear", "missing": "missing", "invented": "invented"}
    for f in FIELDS:
        print(f"  {label[f]}: C={count[f]['a']} K={count[f]['b']}")
    print(f"Median words: C {med['a']}, K {med['b']} ({float(Fraction(med['b']) / Fraction(med['a'])):.1%})")
    print("Preference per judge (no preference counted as tie):")
    for name, c in prefer.items():
        print(f"  {name}: candidate {c['candidate']}, 2.2.1 {c['2.2.1']}, tie {c['tie']}")

    names = ["There is a problem to fix", "It helps", "It does not cost quality",
             "It does not over-correct", "It does not invite invention"]
    result = conditions(count, prefer, med)
    for n, (title, ok) in enumerate(zip(names, result), 1):
        print(f"Condition {n} ({title}): {'pass' if ok else 'fail'}")
    print("Decision:", "adopt" if all(result) else "do not adopt")

    print("\nReported, not used in the decision:")
    print("Per passage: words, judges' votes (unclear/missing/invented), leaked labels")
    for p in passages:
        found = leaks(text[p], tasks[p[1]]["labels"])
        vv = "/".join(str(v[f][p]) for f in FIELDS)
        print(f"  {p[0]:6} {p[1]} {NAMES[p[2]]:9} {words[p]:4}w  {vv}  {len(found)}: {', '.join(found)}")
    for s in "ab":
        total = sum(len(leaks(text[p], tasks[p[1]]["labels"])) for p in passages if p[2] == s)
        some = sum(1 for p in passages if p[2] == s and leaks(text[p], tasks[p[1]]["labels"]))
        plain = sum(1 for p in passages if p[2] == s for l in tasks[p[1]]["labels"] if l.lower() in text[p].lower())
        print(f"Leaks, {NAMES[s]}: {total} labels across {some} of 12 passages (word boundaries); {plain} as plain substrings")
    for m in ("haiku", "sonnet", "opus"):
        row = ", ".join(f"{label[f]} C={sum(1 for p in passages if p[0] == m and p[2] == 'a' and v[f][p] >= 2)}"
                        f" K={sum(1 for p in passages if p[0] == m and p[2] == 'b' and v[f][p] >= 2)}" for f in FIELDS)
        print(f"  {m}: {row}")
    print("Items listed by judges:")
    for f, p, name, i in sorted(items):
        print(f"  {label[f]} | {p[0]} {p[1]} {NAMES[p[2]]} | {name}: {i}")


if __name__ == "__main__":
    {"--selftest": selftest, "--guides": guides}.get(sys.argv[1] if len(sys.argv) > 1 else "", main)()
