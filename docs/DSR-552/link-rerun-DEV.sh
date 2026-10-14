#!/usr/bin/env bash
while [ ! -f evidence/DSR-552/DEV/runs/followup-done ]; do sleep 2; done
export ENV=dev DSR_PREFLIGHT=evidence/DSR-552/DEV/preflight.json
label=links-rerun
export PLAYWRIGHT_JSON_OUTPUT_NAME="evidence/DSR-552/DEV/runs/$label.json"
date -u +%FT%TZ > "evidence/DSR-552/DEV/runs/$label.start"
printf '%s\n' "ENV=dev DSR_PREFLIGHT=$DSR_PREFLIGHT PLAYWRIGHT_JSON_OUTPUT_NAME=$PLAYWRIGHT_JSON_OUTPUT_NAME npx playwright test --grep 'DSR-BREAD-00(2|8)' --project=chromium" > "evidence/DSR-552/DEV/runs/$label.command"
npx playwright test --grep 'DSR-BREAD-00(2|8)' --project=chromium > "evidence/DSR-552/DEV/runs/$label.log" 2>&1
printf '%s' "$?" > "evidence/DSR-552/DEV/runs/$label.exit"
date -u +%FT%TZ > "evidence/DSR-552/DEV/runs/$label.end"
cp -a test-results "evidence/DSR-552/DEV/runs/$label-artifacts"
cp -a playwright-report "evidence/DSR-552/DEV/runs/$label-html"
npx tsc --noEmit > evidence/DSR-552/DEV/runs/typecheck-final.log 2>&1
printf '%s' "$?" > evidence/DSR-552/DEV/runs/typecheck-final.exit
date -u +%FT%TZ > evidence/DSR-552/DEV/runs/links-done
