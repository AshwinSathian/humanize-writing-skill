#!/usr/bin/env python3
"""Descriptive prose metrics for comparing passages (stdlib only).

Usage:
    python3 scripts/measure.py a.md b.md        # one column per file
    python3 scripts/measure.py --json a.md      # machine-readable
    python3 scripts/measure.py --selftest

Reports numbers, never a verdict. There is no "human" threshold in here
because no corpus in this repo could justify one: compare passages written
for the same prompt against each other. English only.
"""
import json
import re
import statistics
import sys

# ponytail: regex sentence splitter, fooled by "e.g." and decimals at line
# ends. Swap in a real tokenizer if the counts ever need to be exact.
SENTENCE_END = re.compile(r"(?<=[.!?])[\"')\]]*\s+(?=[\"'(\[]*[A-Z0-9`])")
WORD = re.compile(r"[A-Za-z][A-Za-z'’-]*")

PATTERNS = {
    # "isn't X, it's Y" / "not X but Y" / "not just|only X"
    "negated_contrast": re.compile(
        r"\b(?:is|are|was|were|does|do|did)n['’]t\b[^.!?]{0,80}?[,;—.]\s*(?:it|they|that|this)(?:['’]s|['’]re| is| are)\b"
        r"|\bnot (?:just|only|merely|simply)\b"
        r"|\bnot\b[^.!?,;]{1,60}?,? but\b"
        r"|\bnot because\b",
        re.I,
    ),
    # ", underscoring its importance"
    "ing_tail": re.compile(r",\s+(?:\w+ly\s+)?\w{4,}ing\b[^.!?]*[.!?]", re.I),
    # short clause, colon, short clause: catches reveals and some honest uses
    "short_colon_clause": re.compile(r"\b[A-Z][^.!?:\n]{0,40}:\s+[a-zA-Z][^.!?\n]{0,60}[.!?]"),
    "stock_transition": re.compile(
        r"(?:^|(?<=[.!?]\s))(?:Moreover|Furthermore|Additionally|In conclusion|Overall|Ultimately),", re.M
    ),
    "nominalization": re.compile(r"\b\w{4,}(?:tion|sion|ment|ness|ity|ance|ence)s?\b", re.I),
}


def measure(text):
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    sentences = [s for p in paragraphs for s in SENTENCE_END.split(" ".join(p.split())) if s]
    flat = "\n\n".join(" ".join(p.split()) for p in paragraphs)  # undo hard wraps
    words = WORD.findall(text)
    n_words = max(len(words), 1)
    lengths = [len(WORD.findall(s)) for s in sentences] or [0]
    last_lengths = [len(WORD.findall(SENTENCE_END.split(" ".join(p.split()))[-1])) for p in paragraphs]

    def per_k(count):
        return round(1000 * count / n_words, 1)

    def share(values, test):
        return round(sum(1 for v in values if test(v)) / max(len(values), 1), 2)

    out = {
        "words": len(words),
        "sentences": len(sentences),
        "paragraphs": len(paragraphs),
        "sentence_len_mean": round(statistics.mean(lengths), 1),
        "sentence_len_stdev": round(statistics.pstdev(lengths), 1),
        "sentence_share_le5_words": share(lengths, lambda n: n <= 5),
        "sentence_share_ge30_words": share(lengths, lambda n: n >= 30),
        "para_final_sentence_le8_words": sum(1 for n in last_lengths if n <= 8),
        "word_len_mean": round(statistics.mean(len(w) for w in words), 2) if words else 0,
        "word_share_ge10_chars": share(words, lambda w: len(w) >= 10),
        "and_per_1k": per_k(sum(1 for w in words if w.lower() == "and")),
        "commas_per_1k": per_k(text.count(",")),
        "semicolons_per_1k": per_k(text.count(";")),
        "colons_per_1k": per_k(len(re.findall(r":(?=\s)", text))),
        "parens_per_1k": per_k(text.count("(")),
        "dashes_per_1k": per_k(len(re.findall(r"—|\w –\s|\w --\s|\w -\s", text))),
    }
    for name, pattern in PATTERNS.items():
        out[name + "_per_1k"] = per_k(len(pattern.findall(flat)))
    return out


def selftest():
    slop = (
        "The cache isn't slow — it's doing exactly what we told it to. "
        "Moreover, it is not just fast but reliable, underscoring its importance. "
        "Small change. Big lever."
    )
    plain = "Hashing the full payload takes 40% of p99 latency. The key needs two fields (user ID and route)."
    a, b = measure(slop), measure(plain)
    assert a["sentences"] == 4 and b["sentences"] == 2, (a["sentences"], b["sentences"])
    assert a["negated_contrast_per_1k"] > 0 == b["negated_contrast_per_1k"]
    assert a["ing_tail_per_1k"] > 0 == b["ing_tail_per_1k"]
    assert a["stock_transition_per_1k"] > 0 and a["dashes_per_1k"] > 0
    assert a["sentence_share_le5_words"] == 0.5 and a["para_final_sentence_le8_words"] == 1
    assert b["parens_per_1k"] > 0 and b["dashes_per_1k"] == 0
    print("selftest ok")


def main(argv):
    if "--selftest" in argv:
        return selftest()
    paths = [a for a in argv if not a.startswith("--")]
    if not paths:
        sys.exit(__doc__)
    results = {}
    for path in paths:
        with open(path, encoding="utf-8") as fh:
            results[path] = measure(fh.read())
    if "--json" in argv:
        print(json.dumps(results, indent=2))
        return
    keys = list(next(iter(results.values())))
    width = max(len(k) for k in keys)
    print(" " * width, *(p[-14:].rjust(14) for p in paths))
    for key in keys:
        print(key.ljust(width), *(str(results[p][key]).rjust(14) for p in paths))


if __name__ == "__main__":
    main(sys.argv[1:])
