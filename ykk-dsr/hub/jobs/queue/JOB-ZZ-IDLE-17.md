---
id: JOB-ZZ-IDLE-17
agent: claude-code
us: DSR-583
type: write-and-run
env: dev
lang: [ja, en]
tcs: [1.0, 2.0, 3.0, 4.0, 5.0]
priority: P3 (idle)
created_by: claude-web
---

## Context
Idle, no dependency. Scaffold automation for DSR-583 (product list: SP card grid fixed to 2 columns; Jira To Do, owner Martin) from `ykk-dsr/hub/tc-out/DSR-583.spec.json` (Automation TCs). Read-only. Note: after the 20/10 overlay merge the product list may hold few items – record counts, do not fail on count.

## Steps
1. `tests/product-list/DSR-583.product-list-sp.spec.ts` (reuse the existing product-list page object/fixtures). Titles `DSR-PLSP-001…005` (1.0 → 001).
2. Page `/master/{lang}/product-list` (fallback `/{lang}/product-list`, Q22 default). SP widths 320/360/375/390/414/430 + 767 (Q22 default breakpoint unknown → record columns per width = count distinct card `left` values in the first row); PC/TB 768/1024/1440 record columns.
3. 3.0: scroll to bottom, apply first filter, reload → record columns each time. 5.0: find a filter giving an odd count; record last card width vs others.
4. Preflight: page 404 or < 2 cards → `test.skip('DSR-583 product list data missing')`.
5. Expected (spec): SP ≤ breakpoint = exactly 2 columns. Because DSR-583 is To Do, report fails as proposed with `suspect: product` and note "ticket To Do".
6. `npx tsc --noEmit`; run once; run report per root AGENTS.md "Run reporting".

## Output
Code + `results/DSR-583/DEV/automation-run-<YYYYMMDD>.md` + `ykk-dsr/hub/results/JOB-ZZ-IDLE-17/`.
