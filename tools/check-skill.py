"""Repository checks for the skill layout, links and versions. Stdlib only.

Usage, from the repo root:
    python3 -I tools/check-skill.py          # layout, links, versions
    python3 -I tools/check-skill.py --tics   # the model-habit tables

Exits 1 and lists every problem found.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = "skills/humanizing-writing"
SK = ROOT / SKILL
problems = []


def need(ok, msg):
    if not ok:
        problems.append(msg)


def tracked():
    out = subprocess.run(["git", "ls-files"], cwd=ROOT, capture_output=True, text=True, check=True).stdout
    return out.splitlines()


def layout():
    files = tracked()
    skill_mds = [f for f in files if f.endswith("SKILL.md")]
    need(skill_mds == [f"{SKILL}/SKILL.md"], f"expected one tracked SKILL.md at {SKILL}/, found {skill_mds}")
    need(not (ROOT / "SKILL.md").exists(), "SKILL.md still at the repo root")
    for d in ["reference", "examples", "voices", "scripts"]:
        need(not any(f.startswith(d + "/") for f in files), f"{d}/ still tracked at the repo root")
    fm = re.match(r"^---\n(.*?)\n---\n", (SK / "SKILL.md").read_text(), re.S)
    need(fm and re.search(r"^name: humanizing-writing$", fm.group(1), re.M), "SKILL.md frontmatter name is not humanizing-writing")
    need((SK / "LICENSE").read_bytes() == (ROOT / "LICENSE").read_bytes(), "skill LICENSE differs from root LICENSE")
    need(not (ROOT / ".claude-plugin/plugin.json").exists(), "plugin.json still at the repo root")


def versions():
    plugin = json.loads((SK / ".claude-plugin/plugin.json").read_text())
    market = json.loads((ROOT / ".claude-plugin/marketplace.json").read_text())
    entry = market["plugins"][0]
    need(entry["source"] == f"./{SKILL}", f"marketplace source is {entry['source']!r}, expected './{SKILL}'")
    head = re.search(r"^## (\d+\.\d+\.\d+)", (ROOT / "CHANGELOG.md").read_text(), re.M).group(1)
    need(plugin["version"] == entry["version"] == head,
         f"versions differ: plugin.json {plugin['version']}, marketplace {entry['version']}, CHANGELOG {head}")


PATHLIKE = r"(?:SKILL\.md|LICENSE|(?:reference|examples|voices|scripts)/[\w./-]*)"


def skill_refs():
    """Backticked paths in SKILL.md and the habit files are relative to the skill folder."""
    for f in [SK / "SKILL.md", *sorted((SK / "reference").glob("*-tics.md"))]:
        for p in re.findall(rf"`({PATHLIKE})`", f.read_text()):
            need((SK / p).exists(), f"{f.relative_to(ROOT)}: `{p}` does not exist in {SKILL}/")


def readme_links():
    text = (ROOT / "README.md").read_text()
    for p in re.findall(r"\]\((?!https?:|#|mailto:)([^)\s]+)\)", text):
        need((ROOT / p.split("#")[0]).exists(), f"README.md: link ({p}) does not resolve from the repo root")
    for p in re.findall(rf"`({PATHLIKE})`", text):
        need((ROOT / p).exists() or (SK / p).exists(), f"README.md: `{p}` exists neither at the root nor in {SKILL}/")
    for kind, target in re.findall(r"(ln -s|--plugin-dir) \"?([^\s\"]+)", text):
        need(target.rstrip("/").endswith(SKILL), f"README.md: {kind} points at {target}, not at {SKILL}")
    tree = re.search(r"## What's in here\n\n```\n(.*?)```", text, re.S)
    need(tree, "README.md: no file tree under \"What's in here\"")
    if tree:
        parent = ""
        for line in tree.group(1).splitlines():
            name = line.split("#")[0].strip()
            path = (parent + name) if line.startswith("  ") else name
            if not line.startswith("  "):
                parent = name if name.endswith("/") else ""
            need(list(ROOT.glob(path.rstrip("/"))), f"README.md file tree: {path} does not exist")


def site_refs():
    src = ROOT / "site"
    files = [*src.glob("src/**/*.astro"), *src.glob("src/**/*.ts"), *src.glob("tests/*.mjs"), *src.glob("tools/*.py")]
    for f in files:
        text = f.read_text()
        for p in re.findall(r"\b(?:blob|tree|readRepo)\(\s*['\"`]([^'\"`$]+)['\"`]", text):
            need((ROOT / p).exists(), f"{f.relative_to(ROOT)}: {p} does not exist")
        for p in re.findall(r"/(?:blob|tree)/main/([\w./-]+)", text):
            need((ROOT / p).exists(), f"{f.relative_to(ROOT)}: link to {p} does not exist")
        if f.parent.name == "tests":  # tests run from site/, so '../x' is the repo root
            for p in re.findall(r"['\"]\.\./([\w./-]+)['\"]", text):
                need((ROOT / p).exists(), f"{f.relative_to(ROOT)}: ../{p} does not exist")
    r = subprocess.run([sys.executable, "-I", "-c",
                        "f='site/tools/measure-site.py'; import os; __file__=os.path.abspath(f); "
                        "exec(open(f).read().split('PAGES =')[0])"],
                       cwd=ROOT, capture_output=True, text=True)
    need(r.returncode == 0, f"site/tools/measure-site.py cannot import measure: {r.stderr.strip()[-200:]}")


TIERS = ("Measured, third party", "Vendor documentation", "Community report", "Editor consensus")
PLACEHOLDER = re.compile(r"^\s*(n/a|tbd|todo|unknown|-|)\s*$", re.I)


def tics():
    files = sorted((SK / "reference").glob("*-tics.md"))
    need({f.name for f in files} >= {"claude-tics.md", "gpt-tics.md", "gemini-tics.md"}, "a habit file is missing")
    for f in files:
        rows = [l for l in f.read_text().splitlines() if l.startswith("| ") and not l.startswith("| Habit")]
        need(rows, f"{f.name}: no table rows")
        for row in rows:
            cells = [c.strip() for c in row.strip("|").split("|")]
            where = f"{f.name}: row '{cells[0][:40]}'"
            if len(cells) != 4:
                problems.append(f"{where} has {len(cells)} cells, expected 4")
                continue
            habit, example, rule, ev = cells
            need(not PLACEHOLDER.match(habit) and not PLACEHOLDER.match(rule), f"{where}: empty habit or rule")
            need(ev.startswith(TIERS), f"{where}: evidence does not start with a tier {TIERS}")
            if re.search(r"\d(?:\.\d+)?x\b", example + ev):
                need(re.search(r"(human|Opus 5(?:\.5)?|Astra) (rate|score)", ev),
                     f"{where}: a multiplier without its basis (human rate, Opus 5 rate, Astra rate)")


if "--tics" in sys.argv:
    tics()
    ok = "tics ok"
else:
    layout()
    versions()
    skill_refs()
    readme_links()
    site_refs()
    ok = "skill ok"

if problems:
    print("\n".join(problems))
    sys.exit(1)
print(ok)
