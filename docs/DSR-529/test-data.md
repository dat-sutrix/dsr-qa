# DSR-529 test data (DEV)

All checks are read-only (DSR-ARTICLE-009 writes only the browser's localStorage). Page paths are fixture values (`fixtures/dsr-529.ts`). Expected values come from TD-529-01/02 in `baseline-BL-v1.md`.

| TD | Page | Used by | Status on DEV 2026-10-16 11:0x UTC |
|---|---|---|---|
| TD-529-01 | /master/{ja,en}/library/article/stories/qa529-01 | 002, 003, 006–014, 016, 024, 026, 029 | 404 (ja, en) – QA-PT seeds ja 2026-10-16 night, en later |
| TD-529-02 | /master/ja/library/article/stories/qa529-02 (ja only) | 015, 016, 020, 023, 025 | 404 |
| TD-529-03 | /master/{lang}/library/article/stories/qa529-r1, -r2, -r3 | 013 (meta paths only); 017–019 fixme | not checked |
| Fallback | /master/{lang}/test-space/qa529-* | all page TCs | 404 (ja-01, en-01, ja-02) |

Preflight: each test opens the primary path, then the test-space fallback automatically. Both 404 → `test.skip` with reason `blocked-data: TD-529 page missing (...)`. Force a root without code change: `DSR529_ROOT=test-space npm run test:dev -- tests/article-detail`.

DSR-ARTICLE-026 also skips (blocked-data) when none of the three stories index candidates returns 200.
