---
id: JOB-ZZ-IDLE-03
agent: claude-code
us: DSR-583
type: write-and-run
env: dev
lang: [ja, en]
tcs: [DSR-583 Automation TCs]
priority: P3 (idle)
created_by: claude-web
---

## Context
Idle work, no dependency: DSR-583 (product list – SP fixed 2 columns). TC source `ykk-dsr/hub/tc-out/DSR-583.spec.json` (Figma 1333-6510: 375 → 2 columns). Existing DEV page: `/master/{ja,en}/test-space/product-list`.

## Deliverable
Spec `tests/product-list/DSR-583.product-list.spec.ts` (+ page object/fixture). Run on DEV chromium at the viewports listed in the TCs. Record computed grid column count and card width per viewport. Manual/Visual → fixme. Page 404 → blocked-data.

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-03/result.json` + `summary.md`; run report per root AGENTS.md; commit `[DSR-583] product-list SP columns spec + run report (idle)`.
