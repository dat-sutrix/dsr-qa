# JOB-ZZ-IDLE-02: DSR-529 article-detail spec scaffold (idle), DEV, 2026-10-16
Wrote `tests/article-detail/DSR-529.article-detail.spec.ts`, `pages/ArticleDetailPage.ts`, `fixtures/dsr-529.ts` and `docs/DSR-529/` (baseline-BL-v1 copied from spec.json, test-data, data-testid).
`npx tsc --noEmit`: exit 0, no errors. `npm run test:dev -- tests/article-detail`: 47 tests, 47 skipped, 0 failed, exit 0 (11:05–11:07Z). Report: `results/DSR-529/DEV/automation-run-20261016.md`.

Implemented (page preflight → `blocked-data: TD-529 page missing (...)` on 404, primary stories path then test-space fallback):
- ja + en (TD-529-01): DSR-ARTICLE-002, 003, 006, 007, 008, 010, 011, 012, 013, 014, 016, 024, 026, 029
- ja only (TD-529-02 is ja only): DSR-ARTICLE-015, 020, 023, 025; ja only per spec: DSR-ARTICLE-009 (My List, localStorage only)

fixme (with reason):
- Manual: DSR-ARTICLE-001, 004, 005, 021, 032. Visual (no Figma frames): 030, 031
- Blocked per spec.json: 017, 018, 019 (stories index), 022 (product index), 027 (DSR-170), 028 (breadcrumb Q9), 029 [cn] (no /master/cn)

All runs skipped because every TD-529 page (ja/en, stories path and test-space) returned 404 – data, not product.
Selectors are unverified guesses (no DOM, no data-testid list); JOB-20261015-12 will need to confirm them on the seeded pages.
DSR-ARTICLE-026 also skips as blocked-data when no stories index candidate returns 200.
JOB-20261015-12 was not moved or edited.
