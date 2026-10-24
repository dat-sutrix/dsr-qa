# DSR-587 / DSR-557 / DSR-566 DEV automation run: 20261024-job02

## 1. Header

- Run start (UTC): 2026-10-24T00:57:24Z
- Run end (UTC): 2026-10-24T00:57:40Z
- Environment + base URL: DEV, https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/en/library/video/qa587-sub` (VOV-005); `/master/{ja,en}/test-space/list-catalog` (CATV-018/019/020); `/master/{ja,en}/test-space/qa566-news-01` + `/query-index.json` (NEWS-007)
- Build under test: not independently verified (EDS DEV main)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md, incl. update 2026-10-21) for VOV-005; DSR-557 / DSR-566 TC baselines (docs/DSR-557/, docs/DSR-566/)
- Automation HEAD commit SHA: 7aead2b02fcbd62a57782d4ace5c948cc4dcbd3d (the fixes below were uncommitted in the working tree during the run; they are committed with this report)
- Exact command used:

```sh
DSR566_SLUG=qa566-news-01 DSR587_SEEDED=05 PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job-20261024-02.json \
  npm run test:dev -- tests/movie-detail/DSR-587.movie-overlay.spec.ts tests/catalog-video/DSR-557.catalog-video.spec.ts tests/news-detail/DSR-566.news-detail.spec.ts \
  -g "DSR-VOV-005|DSR-CATV-01[89]|DSR-CATV-020|DSR-NEWS-007"
```

Code changes under test (job JOB-20261024-02):
- `fixtures/dsr-587.ts`: removed the stale `legacyId: 'qa501-main-a'` from TD-587-05 (that movie is now 200 under movies/standard, JOB-20261023-19).
- `tests/movie-detail/DSR-587.movie-overlay.spec.ts`: VOV-005 now checks only the flat id `qa587-sub`, which must return 404.
- `tests/catalog-video/DSR-557.catalog-video.spec.ts`: spec-level `test.use({ timezoneId: 'Asia/Tokyo' })`. The global config is unchanged.
- `fixtures/dsr-566.ts` + `tests/news-detail/DSR-566.news-detail.spec.ts`: NEWS-007 reads the root `/query-index.json` first, then falls back to `/master/{lang}/query-index.json` and `/master/{lang}/news/query-index.json`. The first index that lists the page wins. Paths are relative to BASE_URL, so the check does not depend on the environment.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 9 | 9 | 0 | 0 | 0 | 2 | 1 configured; 0 used | 14.4 s (Playwright), 16 s (shell) |

These are proposed automated outcomes only. Human QA confirms them. Browser: chromium. Flaky: 0.

## 4. Executed tests

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VOV-005 | DSR-VOV-005 [en] CF related in subfolder / outside /content/dam/dsr → 404 | passed | 0.1 s | — |
| DSR-CATV-018 | [ja] NEW label within 10 days of publishDate | passed | 2.2 s | — |
| DSR-CATV-019 | [ja] UPDATE label within 10 days of updateDate | passed | 2.3 s | — |
| DSR-CATV-020 | [ja] only NEW when publishDate and updateDate both apply | passed | 2.0 s | — |
| DSR-CATV-018 | [en] NEW label within 10 days of publishDate | passed | 1.8 s | — |
| DSR-CATV-019 | [en] UPDATE label within 10 days of updateDate | passed | 1.8 s | — |
| DSR-CATV-020 | [en] only NEW when publishDate and updateDate both apply | passed | 1.8 s | — |
| DSR-NEWS-007 | [ja] page row in query-index with publishDate/category/tags/template | passed | 1.9 s | — |
| DSR-NEWS-007 | [en] page row in query-index with publishDate/category/tags/template | passed | 1.7 s | — |

Raw values (from the `observed` attachments):
- VOV-005: `https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-sub` → 404, no Location.
- CATV (ja and en had the same rows, today = 2026-10-24 JST): `QA190 NEW 0` (pub 10-23) → NEW/NEW; `QA190 NEW 10` (pub 10-13) → ''/''; `QA190 NEW 11` (pub 10-12) → ''/''; `QA190 UPD 0` (upd 10-23) → UPDATE/UPDATE; `QA190 UPD 10` (upd 10-13) → ''/''; `QA190 UPD 11` (upd 10-12) → ''/''; `QA190 BOTH` (pub 10-22, upd 10-23) → NEW/NEW; `qa190-cat-noupd` (pub 10-22) → NEW/NEW. Format: expected/shown.
- NEWS-007: found in `/query-index.json` (HTTP 200, 238 rows) for both `/master/ja/test-space/qa566-news-01` and `/master/en/test-space/qa566-news-01`. Row values: category `news` (equal to the page category meta), tags `site:product/bio-based`, `site:product/zipper-chain-type`, publicationdate `2026-10-01T00:00:00.000Z`, and `template` = "" (column present, value empty). The fallback paths were not requested because the root index matched first.

## 5. Skipped tests

None.

## 6. Failed tests

None.

Evidence: the JSON report is in `test-results/job-20261024-02.json` and the HTML report is in `playwright-report/`. Both are gitignored and **not committed**. No screenshots were collected because no test failed.

## 7. Open points for QA

- **VOV-005 coverage reduced:** the "outside /content/dam/dsr" half of TC 5.0 is no longer asserted. JOB-20261023-19 raw data has no other DSR CF path that is known to return 404 for that case (`QA587_Upper` / `qa587_upper` belong to TC 4.0). A suitable id has to be seeded (QA-PT / lane author) before that half can be checked again. The flat-id → 404 part still holds.
- **CATV-018/019 day-10 boundary not exercised today:** the qa190 rows were seeded with dates relative to 2026-10-23. On 2026-10-24 JST, `NEW 10` / `UPD 10` are 11 days old, so the inclusive 10-day boundary was not tested (the 0-day and >10-day cases were). Re-seeding the dates relative to the run day, or computing them at run time, would restore the boundary check.
- NEWS-007: `template` is an empty string in the index row. The test asserts only that the column exists. Whether an empty template is acceptable was not verified against the TC.
- `DSR587_SEEDED=05` is based on the earlier seeding evidence (QA-PT Night Report 23/10, JOB-20261023-19). It was not re-verified on Author (agents are read-only, and the cookie was not used).
- The build/deploy under test was not independently identified.
