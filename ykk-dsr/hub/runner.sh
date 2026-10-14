#!/usr/bin/env bash
# YKK DSR job runner – one process per agent lane.
# Usage (on VPS, from repo root):
#   nohup bash ykk-dsr/hub/runner.sh claude-code > ~/runner-claude-code.log 2>&1 &
#   nohup bash ykk-dsr/hub/runner.sh codex       > ~/runner-codex.log 2>&1 &
# Secrets: put DSR_USER, DSR_PASS, ... in ~/.dsr.env (never in the repo).
set -u
LANE="${1:?lane required: claude-code | codex}"
POLL=300            # seconds between checks for new jobs
JOB_TIMEOUT=7200    # max seconds per job
ROOT="$(git rev-parse --show-toplevel)"; cd "$ROOT"
HUB="ykk-dsr/hub"
[ -f ~/.dsr.env ] && set -a && . ~/.dsr.env && set +a

log()  { echo "$(date -u +%FT%TZ) [$LANE] $*"; }
sync() { for i in 1 2 3 4 5; do git pull --rebase -q && git push -q && return 0; sleep 15; done; log "PUSH FAILED"; return 1; }

run_agent() {  # $1 = job id
  local prompt="Read ykk-dsr/hub/AGENTS.md, then execute job ykk-dsr/hub/jobs/running/$1.md exactly as written. Write result files as specified and commit them."
  case "$LANE" in
    claude-code) timeout "$JOB_TIMEOUT" claude -p "$prompt" --dangerously-skip-permissions ;;
    codex)       timeout "$JOB_TIMEOUT" codex exec --full-auto "$prompt" ;;
  esac
}

log "runner started"
while true; do
  git pull --rebase -q || { log "pull failed"; sleep 60; continue; }
  JOB="$(grep -l "^agent: $LANE\$" "$HUB"/jobs/queue/*.md 2>/dev/null | sort | head -1)"
  if [ -z "$JOB" ]; then sleep "$POLL"; continue; fi

  ID="$(basename "$JOB" .md)"
  git mv "$JOB" "$HUB/jobs/running/" && git commit -qm "[$LANE] start $ID" && sync
  log "start $ID"

  run_agent "$ID"; RC=$?

  RES="$HUB/results/$ID/result.json"
  if [ ! -f "$RES" ]; then   # agent crashed or timed out without writing a result
    mkdir -p "$HUB/results/$ID"
    printf '{"job":"%s","agent":"%s","status":"failed","tests":[],"questions":["Runner: agent exited rc=%s without result.json (124 = timeout)"]}\n' "$ID" "$LANE" "$RC" > "$RES"
  fi
  git add -A "$HUB/results/$ID" ykk-dsr/tests ykk-dsr/config 2>/dev/null
  git mv "$HUB/jobs/running/$ID.md" "$HUB/jobs/done/" 2>/dev/null
  git commit -qm "[$LANE] finish $ID rc=$RC" ; sync
  log "finish $ID rc=$RC"
done
