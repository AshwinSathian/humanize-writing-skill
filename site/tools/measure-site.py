"""Run scripts/measure.py over the paragraph text of the built site (dist/), for the colophon table on the home page.

Usage, from site/ after a build:
    python3 -I tools/measure-site.py

Reads the <p> elements of the home, tells, research, compare and faq pages, one paragraph each, skipping the
paragraph the skill rewrites on purpose (the 2023-style draft in the live edit).
"""
import html
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "scripts"))
from measure import measure  # noqa: E402

PAGES = ["index", "tells", "research", "compare", "faq"]
paras = []
for name in PAGES:
    doc = (Path("dist") / f"{name}.html").read_text()
    doc = re.sub(r"<(script|style)\b[\s\S]*?</\1>", " ", doc)
    doc = re.sub(r'<div class="edit"[\s\S]*?<div class="yours"', "<div", doc)  # the specimen draft and rewrite
    doc = re.sub(r"<footer[\s\S]*?</footer>", " ", doc)
    for p in re.findall(r"<p\b[^>]*>([\s\S]*?)</p>", doc):
        text = " ".join(html.unescape(re.sub(r"<[^>]+>", " ", p)).split())
        if len(text.split()) >= 8:
            paras.append(text)

m = measure("\n\n".join(paras))
share = m["sentence_share_le5_words"]
print(f"paragraphs {len(paras)}, words {m['words']}")
print(f"sentence {m['sentence_len_mean']}, short share {share} (1 in {round(1 / share) if share else 'none'}), dashes {m['dashes_per_1k']}, transitions {m['stock_transition_per_1k']}")
