---
id: JOB-ZZ-IDLE-02
agent: claude-code
us: DSR-529
type: write-only
env: dev
lang: [ja, en]
tcs: [DSR-ARTICLE-001..032 (Automation only)]
priority: P3 (idle)
created_by: claude-web
---

## Context
Idle work, no dependency: write the Playwright automation for DSR-529 (article detail) from `ykk-dsr/hub/tc-out/DSR-529.spec.json` (TC 1.0–32.0 → `DSR-ARTICLE-0NN`). Test pages do not exist yet (QA-PT creates them 16/10 night) – page paths/expectations: see `ykk-dsr/hub/jobs/hold/JOB-20261015-12.md` (Input + Test cases table; fallback test-space paths).

## Deliverable
- `tests/article-detail/DSR-529.article-detail.spec.ts`, `pages/ArticleDetailPage.ts`, `fixtures/dsr-529.ts`, `docs/DSR-529/` (baseline copied from spec.json).
- Every test starts with a preflight: page 404 → `test.skip('blocked-data: TD-529 page missing')`. Manual/Visual TCs → `test.fixme` with reason.
- Run once (`npm run test:dev -- tests/article-detail`) only to prove it compiles and skips cleanly; `npx tsc --noEmit` must pass.
- Do NOT move or edit JOB-20261015-12; when it runs later it will reuse this spec.

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-02/result.json` + `summary.md` (list of implemented TC IDs / fixme). Commit `[DSR-529] article-detail spec scaffold (idle)`.
