---
id: JOB-ZZ-IDLE-07
agent: claude-code
us: regression
type: run-only
env: dev
lang: [ja, en]
tcs: [all specs]
priority: P3 (idle)
created_by: claude-web
---

## Context
Idle work, no dependency: daily regression of all existing specs on DEV (2026-10-17). Compare with `results/regression/DEV/automation-run-20261016.md` (JOB-ZZ-IDLE-01).

## Steps
1. `npx tsc --noEmit` (record exit code).
2. `npm run test:dev -- --project=chromium` (all specs).
3. Do not commit files the run rewrites (tracked evidence PNG/JSON of other jobs) – revert them as in IDLE-01.

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-07/result.json` + `summary.md` (table: spec, TC, previous, now, suspect – only changes vs 16/10 + count of unchanged fails) + run report `results/regression/DEV/automation-run-20261017.md`.
