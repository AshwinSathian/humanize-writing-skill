#!/usr/bin/env bash
# Installs the plugin from this working tree's marketplace into a throwaway Claude config,
# checks the plugin cache carries only the skill folder, then asks Haiku which skills it sees.
# The last step makes one small model call.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
export CLAUDE_CONFIG_DIR="$tmp/config"

mkdir -p "$tmp/src"
rsync -a --exclude .git --exclude node_modules --exclude dist \
  --files-from=<(git -C "$root" ls-files --cached --others --exclude-standard) "$root/" "$tmp/src/"
git -C "$tmp/src" init -q && git -C "$tmp/src" add -A >/dev/null && git -C "$tmp/src" -c user.name=t -c user.email=t@t commit -qm wip --allow-empty

claude plugin marketplace add "$tmp/src" >/dev/null
claude plugin install humanizing-writing@humanize-writing-skill >/dev/null

fail=0
cache="$(find "$CLAUDE_CONFIG_DIR/plugins" -type f -name SKILL.md -path '*humanizing-writing*' | head -1)"
[ -n "$cache" ] || { echo "no SKILL.md in the plugin cache"; fail=1; }
if [ -n "$cache" ]; then
  plugin_root="$(dirname "$cache")"
  for p in site tools docs; do
    [ ! -e "$plugin_root/$p" ] || { echo "plugin cache carries $p/"; fail=1; }
  done
fi

# The model call uses the real config (it needs the login). The personal skill there has the
# same bare name, so look for the plugin's namespaced name.
answer="$(cd "$tmp" && env -u CLAUDE_CONFIG_DIR claude -p --model haiku --plugin-dir "$tmp/src/skills/humanizing-writing" \
  "List the exact names of every skill available to you whose name contains 'humaniz'. Reply with the names only, one per line." 2>&1 || true)"
echo "$answer" | grep -q "humanizing-writing:humanizing-writing" || { echo "Claude did not list the skill: $answer"; fail=1; }

[ "$fail" = 0 ] && echo "plugin ok"
exit "$fail"
