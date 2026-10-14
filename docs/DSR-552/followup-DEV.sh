#!/usr/bin/env bash
while [ ! -f evidence/DSR-552/DEV/runs/done ]; do sleep 2; done
export ENV=dev DSR_PREFLIGHT=evidence/DSR-552/DEV/preflight.json
npx tsc --noEmit > evidence/DSR-552/DEV/runs/typecheck-final.log 2>&1
printf '%s' "$?" > evidence/DSR-552/DEV/runs/typecheck-final.exit
for label in tc001-rerun fixme; do
 if [ "$label" = tc001-rerun ]; then pattern='DSR-BREAD-001'; else pattern='DSR-BREAD-0(10|14|15|18|19|21|22|23|29|30|33|34)'; fi
 export PLAYWRIGHT_JSON_OUTPUT_NAME="evidence/DSR-552/DEV/runs/$label.json"
 date -u +%FT%TZ > "evidence/DSR-552/DEV/runs/$label.start"
 printf '%s\n' "ENV=dev DSR_PREFLIGHT=$DSR_PREFLIGHT PLAYWRIGHT_JSON_OUTPUT_NAME=$PLAYWRIGHT_JSON_OUTPUT_NAME npx playwright test --grep '$pattern' --project=chromium" > "evidence/DSR-552/DEV/runs/$label.command"
 npx playwright test --grep "$pattern" --project=chromium > "evidence/DSR-552/DEV/runs/$label.log" 2>&1
 printf '%s' "$?" > "evidence/DSR-552/DEV/runs/$label.exit"
 date -u +%FT%TZ > "evidence/DSR-552/DEV/runs/$label.end"
 cp -a test-results "evidence/DSR-552/DEV/runs/$label-artifacts"
 cp -a playwright-report "evidence/DSR-552/DEV/runs/$label-html"
done
date -u +%FT%TZ > evidence/DSR-552/DEV/runs/followup-done
