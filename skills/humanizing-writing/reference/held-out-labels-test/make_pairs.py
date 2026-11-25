"""Build the blind pairs file and its key from passages/ (stdlib only).

Usage:
    python3 make_pairs.py

Copied from ../held-out-reader-first-test/make_pairs.py. Two changes: the
seed, and the task split the 25 November amendment asks for. Judges see
the task's first paragraph (what the reader knows) at the top, and the
working notes after both passages, marked as material the reader never
sees.

Reads passages/<model>-<version>-<task>.md, where version is "a" (the
2.2.1 SKILL.md) or "b" (the candidate), and tasks.json. Each candidate
passage is paired with the 2.2.1 passage for the same model and task.
Pair order and the A/B side are shuffled with a fixed seed.
"""

import json
import random
from pathlib import Path

HERE = Path(__file__).parent
SEED = 20261125
MODELS = ("haiku", "sonnet", "opus")
TASKS = json.loads((HERE / "tasks.json").read_text())


def passage(model: str, version: str, task: str) -> str:
    return (HERE / "passages" / f"{model}-{version}-{task}.md").read_text().strip()


def split(task: str) -> tuple[str, str]:
    reader, notes = TASKS[task]["task"].split("\n\n", 1)
    assert notes.startswith("Working notes:"), task
    return reader, notes


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
        reader, notes = split(task)
        needed = "\n".join(f"- {f}" for f in TASKS[task]["needed"])
        out += [
            "---", "", f"## {name}", "",
            f"**The task, as the reader knows it:** {reader}", "",
            f"**Facts this reader needs:**\n{needed}", "",
            "### Passage A", "", passage(model, sides[0], task), "",
            "### Passage B", "", passage(model, sides[1], task), "",
            "### The writer's working notes (the reader never sees these)", "",
            notes, "",
        ]

    (HERE / "pairs.md").write_text("\n".join(out))
    (HERE / "key.json").write_text(json.dumps(key, indent=1) + "\n")
    assert len(key) == 12
    print(f"wrote {len(key)} pairs")


if __name__ == "__main__":
    main()
