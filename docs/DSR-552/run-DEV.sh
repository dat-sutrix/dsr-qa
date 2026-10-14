#!/usr/bin/env bash
export ENV=dev
export DSR_PREFLIGHT=evidence/DSR-552/DEV/preflight.json
mkdir -p evidence/DSR-552/DEV/runs
if [ -f evidence/DSR-552/DEV/runs/auto.json ]; then
 echo "First-run artifacts already exist; choose fresh run output paths before rerunning." >&2
 exit 2
fi
node fixtures/dsr-552-preflight.cjs > evidence/DSR-552/DEV/preflight.log 2>&1 || exit $?
npx tsc --noEmit > evidence/DSR-552/DEV/runs/typecheck.log 2>&1
printf '%s' "$?" > evidence/DSR-552/DEV/runs/typecheck.exit
run_case() {
 local label="$1"
 shift
 date -u +%FT%TZ > "evidence/DSR-552/DEV/runs/$label.start"
 export PLAYWRIGHT_JSON_OUTPUT_NAME="evidence/DSR-552/DEV/runs/$label.json"
 printf '%s\n' "ENV=dev DSR_PREFLIGHT=$DSR_PREFLIGHT PLAYWRIGHT_JSON_OUTPUT_NAME=$PLAYWRIGHT_JSON_OUTPUT_NAME npx playwright test $*" > "evidence/DSR-552/DEV/runs/$label.command"
 npx playwright test "$@" > "evidence/DSR-552/DEV/runs/$label.log" 2>&1
 printf '%s' "$?" > "evidence/DSR-552/DEV/runs/$label.exit"
 date -u +%FT%TZ > "evidence/DSR-552/DEV/runs/$label.end"
 cp -a test-results "evidence/DSR-552/DEV/runs/$label-artifacts"
 cp -a playwright-report "evidence/DSR-552/DEV/runs/$label-html"
}
run_case auto --grep DSR-BREAD --project=chromium --grep-invert @visual
run_case baseline --grep 'DSR-BREAD-0(20|32)' --update-snapshots
run_case visual --grep 'DSR-BREAD-0(20|32)'
date -u +%FT%TZ > evidence/DSR-552/DEV/runs/done
