"""Build the blind pairs file and its key from passages/ (stdlib only).

Usage:
    python3 make_pairs.py

Reads passages/<model>-<version>-<task>.md, where version is "a" (the
2.1.0 SKILL.md) or "b" (the candidate). Each candidate passage is paired
with the 2.1.0 passage for the same model and task. Pair order and the
A/B side are shuffled with a fixed seed.
"""

import json
import random
from pathlib import Path

HERE = Path(__file__).parent
SEED = 20261011
MODELS = ("haiku", "sonnet", "opus")

TASKS = {
    "h1": "Write a section of about 200 words for an internal engineering blog arguing that the team should write a postmortem after every production incident. Audience: your own engineering team.",
    "h2": "Write a message of about 150 words for the team channel proposing that the team move its daily standup to a written update. Audience: your own team.",
    "h3": "Write about 200 words for an internal wiki page recommending that the team pin its dependency versions and update them on a schedule. Audience: your own engineering team.",
    "h4": "Write a section of about 150 words for an internal engineering blog arguing that the team should run its test suite in parallel. Use these facts about the team, and add no others about it:\n"
    "- The test suite takes 38 minutes on the single CI runner.\n"
    "- The team merges about 25 pull requests a week.\n"
    "- Two engineers left comments last sprint asking for faster CI.",
}


def passage(model: str, version: str, task: str) -> str:
    return (HERE / "passages" / f"{model}-{version}-{task}.md").read_text().strip()


def main() -> None:
    rng = random.Random(SEED)
    pairs = [(model, task) for model in MODELS for task in TASKS]
    rng.shuffle(pairs)

    key = {}
    out = ["# Blind pairs", ""]
    for n, (model, task) in enumerate(pairs, 1):
        sides = ["a", "b"]
        rng.shuffle(sides)
        name = f"pair{n:02d}"
        key[name] = {"model": model, "task": task, "A": sides[0], "B": sides[1]}
        out += [
            "---",
            "",
            f"## {name}",
            "",
            f"**Task given to both writers:** {TASKS[task]}",
            "",
            "### Passage A",
            "",
            passage(model, sides[0], task),
            "",
            "### Passage B",
            "",
            passage(model, sides[1], task),
            "",
        ]

    (HERE / "pairs.md").write_text("\n".join(out))
    (HERE / "key.json").write_text(json.dumps(key, indent=1) + "\n")
    assert len(key) == 12
    print(f"wrote {len(key)} pairs")


if __name__ == "__main__":
    main()
