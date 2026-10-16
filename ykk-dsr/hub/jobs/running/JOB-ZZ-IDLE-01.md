---
id: JOB-ZZ-IDLE-01
agent: claude-code
us: regression
type: run-only
env: dev
lang: [ja, en]
tcs: [all existing specs]
priority: P3 (idle – runs only when no dated job is queued)
created_by: claude-web
---

## Context
Idle work, no dependency on Dat/QA-PT. Nightly regression of every existing Playwright spec on DEV to catch regressions from dev deploys.

## Steps
1. `npx tsc --noEmit`, then `npm run test:dev` (all specs, chromium, retries as configured). Read-only.
2. Compare with the previous run report per US in `results/<US>/DEV/`: list tests whose result **changed** (pass→fail, fail→pass). fixme/skip stay as is.
3. For each new fail: classify suspect product / data / env / test with one line of evidence. Do not change tests.

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-01/result.json` + `summary.md` (table: spec, TC, previous, now, suspect) + run report `results/regression/DEV/automation-run-<YYYYMMDD>.md`.
