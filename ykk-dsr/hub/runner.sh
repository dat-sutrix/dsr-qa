#!/usr/bin/env bash
# YKK DSR job runner – one process per agent lane.
# ONE CLONE PER LANE (two runners in one clone corrupt each other's git state):
#   ~/dsr-qa        -> claude-code
#   ~/dsr-qa-codex  -> codex
# Usage (on VPS, as user qa), one tmux window per lane:
#   tmux new-window -t dsr -n claude-code -c ~/dsr-qa       'bash ykk-dsr/hub/runner.sh claude-code 2>&1 | tee -a ~/runner-claude-code.log'
#   tmux new-window -t dsr -n codex       -c ~/dsr-qa-codex 'bash ykk-dsr/hub/runner.sh codex       2>&1 | tee -a ~/runner-codex.log'
# Secrets / overrides: ~/.dsr.env (never in the repo). Optional: CLAUDE_BIN, CODEX_BIN = full path of the CLI.
set -u
LANE="${1:?lane required: claude-code | codex}"
POLL=300            # seconds between checks for new jobs
JOB_TIMEOUT=7200    # max seconds per job
ROOT="$(git rev-parse --show-toplevel)"; cd "$ROOT"
HUB="ykk-dsr/hub"
[ -f ~/.dsr.env ] && set -a && . ~/.dsr.env && set +a

# Non-interactive shells (tmux, cron) often miss user install dirs.
export PATH="$HOME/.local/bin:$HOME/.npm-global/bin:$HOME/.bun/bin:$HOME/.claude/local:/usr/local/bin:$PATH"
[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh" >/dev/null 2>&1

log()  { echo "$(date -u +%FT%TZ) [$LANE] $*"; }
pull() { git pull --rebase -q origin main; }
sync() { for i in 1 2 3 4 5; do pull && git push -q origin HEAD:main && return 0; sleep 15; done; log "PUSH FAILED"; return 1; }

# One runner per clone.
exec 9>"$(git rev-parse --git-dir)/dsr-runner.lock"
if ! flock -n 9; then
  log "FATAL: another runner already uses this clone ($ROOT). Use a separate clone per lane, e.g. ~/dsr-qa-codex for codex."
  exit 3
fi

case "$LANE" in
  claude-code) BIN="${CLAUDE_BIN:-$(command -v claude)}" ;;
  codex)       BIN="${CODEX_BIN:-$(command -v codex)}" ;;
  *) log "unknown lane"; exit 1 ;;
esac
# Preflight: never take a job if the agent CLI is missing.
if [ -z "$BIN" ] || [ ! -x "$BIN" ]; then
  log "FATAL: CLI for $LANE not found. Run 'which claude' / 'which codex' as this user, then set CLAUDE_BIN / CODEX_BIN in ~/.dsr.env"
  exit 2
fi
log "using $BIN"

run_agent() {  # $1 = job id
  local prompt="Read AGENTS.md (repo root) and ykk-dsr/hub/AGENTS.md, then execute job ykk-dsr/hub/jobs/running/$1.md exactly as written. Write result files as specified and commit them."
  case "$LANE" in
    claude-code) timeout "$JOB_TIMEOUT" "$BIN" -p "$prompt" --dangerously-skip-permissions ;;
    codex)       timeout "$JOB_TIMEOUT" "$BIN" exec --full-auto "$prompt" ;;
  esac
}

log "runner started"
while true; do
  pull || { log "pull failed"; sleep 60; continue; }
  JOB="$(grep -l "^agent: $LANE\$" "$HUB"/jobs/queue/*.md 2>/dev/null | sort | head -1)"
  if [ -z "$JOB" ]; then sleep "$POLL"; continue; fi

  ID="$(basename "$JOB" .md)"
  git mv "$JOB" "$HUB/jobs/running/" && git commit -qm "[$LANE] start $ID" && sync
  log "start $ID"

  run_agent "$ID"; RC=$?

  RES="$HUB/results/$ID/result.json"
  if [ ! -f "$RES" ]; then   # agent crashed or timed out without writing a result
    mkdir -p "$HUB/results/$ID"
    printf '{"job":"%s","agent":"%s","status":"failed","tests":[],"questions":["Runner: agent exited rc=%s without result.json (124 = timeout, 127 = CLI not found)"]}\n' "$ID" "$LANE" "$RC" > "$RES"
  fi
  [ -f "$HUB/jobs/running/$ID.md" ] && git mv "$HUB/jobs/running/$ID.md" "$HUB/jobs/done/"
  git add -A   # .gitignore keeps node_modules, reports and envs out
  git commit -qm "[$LANE] finish $ID rc=$RC" ; sync
  log "finish $ID rc=$RC"
done
