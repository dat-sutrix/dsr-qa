---
id: JOB-ZZ-IDLE-39
agent: claude-code
us: all DEV specs – daily regression 23/10
type: run-only (read-only)
env: dev
priority: P3 (idle)
created_by: claude-web 23/10 07:50 [schedule] morning
---
Run `npm run test:dev` (full suite, all specs under tests/) once, workers as configured. Write the standard run report (AGENTS.md "Run reporting") under results/<US>/DEV/automation-run-20261023[-idle39].md per US + results/JOB-ZZ-IDLE-39/summary.md: per spec totals, **new fails vs IDLE-35 (22/10)** with failing assertion + raw actual, and for each new fail `cause` (overlay-merge / dm_product-CR / dm_product-ver0.4 / none) + suspect (product/data/test/env). tsc must pass. Do not change TC expectations. Run only when no dated job is queued for this lane.
