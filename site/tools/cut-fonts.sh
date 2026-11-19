#!/usr/bin/env bash
# Builds the site's two font files from @fontsource-variable (OFL), Latin only and trimmed to what the site shows:
#   bricolage-grotesque.woff2          text, numbers and labels: variable weight 400-800 at normal width
#   bricolage-grotesque-display.woff2  h1 and h2 only: one static instance, weight 750 at width 84 (the condensed cut)
# One file with both axes is 50 KB, past the ~42 KB at which a font needs a third TCP round trip; split, they are
# about 26 KB and 14 KB, fetched in parallel.
#   jetbrains-mono.woff2       code and commands only: weights 400-600, Basic Latin plus the few signs code uses
# Output is committed in src/fonts. Needs python3 and network once (a throwaway venv with fonttools and brotli).
# Run from site/ when a face or a character set changes, then `npm test`: tests/fonts.test.mjs fails when a page
# needs a character that is not in a cut, and says which. The glyphs really in each cut land in a .codepoints.json
# beside the file (pyftsubset drops ones the face lacks).
set -euo pipefail
FONTS=node_modules/@fontsource-variable
OUT=src/fonts
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
python3 -m venv "$TMP/v"; "$TMP/v/bin/pip" install -q fonttools brotli
FT="$TMP/v/bin"

cut() { # source axis-limits unicodes features output
  "$FT/fonttools" varLib.instancer "$1" $2 -o "$TMP/n.woff2" >/dev/null 2>&1
  "$FT/pyftsubset" "$TMP/n.woff2" --unicodes="$3" --layout-features="$4" --flavor=woff2 --output-file="$5"
  "$FT/python" - "$5" <<'PY'
import json, sys
from fontTools.ttLib import TTFont
f = TTFont(sys.argv[1])
json.dump(sorted(f.getBestCmap()), open(sys.argv[1].replace(".woff2", ".codepoints.json"), "w"))
PY
  ls -l "$5" | awk '{print "wrote", $9, $5, "bytes"}'
}

# Basic Latin, no-break space, and the signs the pages use: £ § « » ‹ › © ° · À Ï Þ × ç é í ñ ð ó ü, dashes, curly
# quotes, bullet, ellipsis, minus, arrows. Every extra glyph costs bytes on the first paint: add one only when the test names it.
TEXT="U+0020-007E,U+00A0,U+00A2,U+00A3,U+00A7,U+00AB,U+00BB,U+2039,U+203A,U+00A9,U+00B0,U+00B7,U+00C0,U+00CF,U+00D7,U+00DE,U+00E7,U+00E9,U+00ED,U+00F0,U+00F1,U+00F3,U+00FC,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2022,U+2026,U+2212,U+2190,U+2192"
cut "$FONTS/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2" "wght=400:800 wdth=100" "$TEXT" "kern,mark,mkmk,ccmp,locl,tnum,pnum" "$OUT/bricolage-grotesque.woff2"
cut "$FONTS/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2" "wght=750 wdth=84" "$TEXT" "kern,mark,mkmk,ccmp,locl,pnum" "$OUT/bricolage-grotesque-display.woff2"
# No ligatures in code (the site sets font-variant-ligatures: none), so the liga/calt tables are dropped.
cut "$FONTS/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2" "wght=400:600" "U+0020-007E,U+00A0,U+00B7,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2026,U+2190,U+2192" "kern,mark,mkmk,ccmp" "$OUT/jetbrains-mono.woff2"
