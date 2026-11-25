"""Build the blind pairs file and its key from passages/ (stdlib only).

Usage:
    python3 make_pairs.py

Reads passages/<task>-<condition>.md, where condition is base (no skill),
v1 (the 1.1.1 SKILL.md) or v2 (the 2.1.0 SKILL.md). Each v2 passage is
paired with the base and v1 passage for the same task. Pair order and the
A/B side are shuffled with a fixed seed, so the files can be rebuilt.
"""

import json
import random
from pathlib import Path

HERE = Path(__file__).parent
SEED = 20261010

TASKS = {
    "p1": "Explain, in about 200 words, why database indexes speed up reads and what they cost. Audience: backend developers who have used SQL but never tuned it.",
    "p2": "Write a section of about 200 words for an internal engineering blog arguing that the team should adopt feature flags. Audience: your own engineering team.",
    "p3": "Write the description for a pull request, about 150 words. Use only these facts:\n"
    "- Payment status was fetched by polling the provider every 30 seconds from the cron job `poll_payments` in `billing-worker`.\n"
    "- This PR adds a webhook endpoint, `POST /hooks/payments`, in `billing-worker`.\n"
    "- Webhook requests are verified with an HMAC-SHA256 signature.\n"
    "- `notifier` now reacts to the webhook event instead of the poll result.\n"
    "- The `poll_payments` job stays, but runs every 15 minutes as a fallback.",
}


def passage(task: str, condition: str) -> str:
    return (HERE / "passages" / f"{task}-{condition}.md").read_text().strip()


def main() -> None:
    rng = random.Random(SEED)
    pairs = [(task, other) for task in TASKS for other in ("base", "v1")]
    rng.shuffle(pairs)

    key = {}
    out = ["# Blind pairs", ""]
    for n, (task, other) in enumerate(pairs, 1):
        sides = ["v2", other]
        rng.shuffle(sides)
        name = f"pair{n:02d}"
        key[name] = {"model": "haiku", "task": task, "A": sides[0], "B": sides[1]}
        out += [
            "---",
            "",
            f"## {name}",
            "",
            f"**Task given to both writers:** {TASKS[task]}",
            "",
            "### Passage A",
            "",
            passage(task, sides[0]),
            "",
            "### Passage B",
            "",
            passage(task, sides[1]),
            "",
        ]

    (HERE / "pairs.md").write_text("\n".join(out))
    (HERE / "key.json").write_text(json.dumps(key, indent=1) + "\n")
    assert len(key) == 6 and all({v["A"], v["B"]} - {"v2"} for v in key.values())
    print(f"wrote {len(key)} pairs")


if __name__ == "__main__":
    main()
