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
# Where /plugin install actually put the plugin.
install_path="$(python3 -I -c '
import json, os, sys
d = json.load(open(os.path.join(os.environ["CLAUDE_CONFIG_DIR"], "plugins", "installed_plugins.json")))
entries = d.get("plugins", d).get("humanizing-writing@humanize-writing-skill")
print(entries[0]["installPath"] if entries else "")
')"
if [ -z "$install_path" ] || [ ! -f "$install_path/SKILL.md" ]; then
  echo "plugin not installed, or no SKILL.md at its root: '$install_path'"; fail=1
else
  stray="$(find "$CLAUDE_CONFIG_DIR/plugins" \( -name site -o -name tools -o -name docs -o -name README.md \) -print)"
  [ -z "$stray" ] || { echo "plugin cache carries repo files: $stray"; fail=1; }
fi

# The model call needs the login, so it runs on the real config, loading the installed copy
# by path. If the real config already has this plugin, the name would show up anyway.
if grep -q 'humanizing-writing@humanize-writing-skill' "$HOME/.claude/plugins/installed_plugins.json" 2>/dev/null; then
  echo "the real config has humanizing-writing@humanize-writing-skill installed; uninstall it to run this check"; fail=1
elif [ "$fail" = 0 ]; then
  answer="$(cd "$tmp" && env -u CLAUDE_CONFIG_DIR claude -p --model haiku --plugin-dir "$install_path" \
    "List the exact names of every skill available to you whose name contains 'humaniz'. Reply with the names only, one per line." </dev/null 2>&1 || true)"
  echo "$answer" | grep -q "humanizing-writing:humanizing-writing" || { echo "Claude did not list the installed plugin's skill: $answer"; fail=1; }
fi

[ "$fail" = 0 ] && echo "plugin ok"
exit "$fail"
