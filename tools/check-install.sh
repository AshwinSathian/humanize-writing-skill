#!/usr/bin/env bash
# Installs the skill from this working tree with `npx skills` into a throwaway HOME
# and checks what was copied. Never installs from GitHub, so it tests the tree as it is now.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# Copy only the files git knows about (tracked, or new and not ignored), so build
# output (site/node_modules, site/dist) and files deleted in the tree stay out.
mkdir -p "$tmp/src"
rsync -a --exclude .git --exclude node_modules --exclude dist \
  --files-from=<(git -C "$root" ls-files --cached --others --exclude-standard) "$root/" "$tmp/src/"

(cd "$tmp" && HOME="$tmp/home" npx -y skills@1.9.0 add "$tmp/src" -g -a codex -y >/dev/null 2>&1)
dest="$tmp/home/.agents/skills/humanizing-writing"

fail=0
for p in SKILL.md LICENSE reference/claude-tics.md examples voices scripts/measure.py; do
  [ -e "$dest/$p" ] || { echo "missing in install: $p"; fail=1; }
done
for p in site tools docs README.md CHANGELOG.md node_modules; do
  [ ! -e "$dest/$p" ] || { echo "should not be installed: $p"; fail=1; }
done
[ "$fail" = 0 ] && echo "install ok"
exit "$fail"
