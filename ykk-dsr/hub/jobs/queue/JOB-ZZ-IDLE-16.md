---
id: JOB-ZZ-IDLE-16
agent: codex
us: visual-regression
type: visual-capture
env: dev
lang: [ja, en]
tcs: [diff vs JOB-ZZ-IDLE-04 baseline]
priority: P3 (idle)
created_by: claude-web
---

## Context
Idle, no dependency. Detect unannounced DEV deploy changes: recapture the pages of JOB-ZZ-IDLE-04 (same list, viewports, wait) and pixel-diff against the IDLE-04 captures (results/JOB-ZZ-IDLE-04). Record per page: status, diff % per viewport, scrollWidth. No verdicts.

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-16/` result.json + summary.md; commit only PNGs whose diff > 2 %.
