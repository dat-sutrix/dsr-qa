# DSR-587 DEV automation run — 20261016 (JOB-20261016-05, DSR-501-P3 rerun)

## 1. Header

- Run start (UTC): 2026-10-16T09:28:38Z
- Run end (UTC): 2026-10-16T09:28:49Z
- Environment + base URL: DEV — branch preview https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page (absolute URLs in the spec; `BASE_URL` from `envs/dev.env` is not used)
- Target page: `/en/library/video/qa501-main-a` (page A)
- Build under test: branch `DSR-PRODUCTDETAIL-moustache` (aem.page), not independently verified beyond the URL
- Baseline ID: BL-OVL-1 (`docs/DSR-587/overlay-data-flow-BL.md`); hub job JOB-20261016-05
- Automation HEAD commit SHA: 719bf08313c6fce6eb00bc6a5cb694e61fb9506a (no code changes)
- Exact command used:

```sh
DSR_JOB_EVIDENCE=ykk-dsr/hub/results/JOB-20261016-05/evidence PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job16-05.json npm run test:dev -- tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts --project chromium --grep "DSR-501-P3" --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 1 | 0 | 0 | 0 | 1 (2 configured) | 1 configured; 0 used | 11 s (Playwright 9.0 s) |

Proposed automated outcomes only; human QA confirms. Scope: subset (P3 only, `--grep`), chromium. Flaky outcomes: 0.

## 4. Executed tests

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-501-P3 | DSR-501-P3 [en] related movies are max 5, newest updated first | Passed (automation). Proposed hub verdict: **blocked (data)**, see §7 | 6.2 s | — |

## 5. Skipped tests

None. The spec's blocked-data skip did not trigger because the query now returns 6 items.

## 6. Failed tests

None.

## 7. Open points for QA

- Persisted query (unencoded `;path=/content/dam/dsr/en/movies/standard/qa501-main-a`, HTTP 200, ~09:28Z) returns 1 related item, inactive 0, and **relatedMovies: 6**:

  | movieId | movieTitle | _path | isUnavailable | publishDate | updateDate |
  |---|---|---|---|---|---|
  | rel1 | video title rel1 | /content/dam/ykk/common/product-cf/test/qa-501-rel-1 | null | 2026-10-15 | null |
  | rel2 | video title rel2 | /content/dam/ykk/common/product-cf/test/qa-501-rel-2 | null | 2026-10-15 | null |
  | rel3 | video title rel3 | /content/dam/ykk/common/product-cf/test/qa501-rel-3 | null | 2026-10-15 | null |
  | rel4 | video title rel4 | /content/dam/ykk/common/product-cf/test/qa501-rel-4 | null | 2026-10-15 | null |
  | rel5 | video title rel5 | /content/dam/ykk/common/product-cf/test/qa501-rel-5 | null | 2026-10-15 | null |
  | rel6 | video title rel6 | /content/dam/ykk/common/product-cf/test/qa501-rel-6 | null | 2026-10-15 | null |

- Page A shows **5 movie cards**: `video title rel1` … `video title rel5`, in authored order. rel6 is not shown. The title `video title main a` is in the static HTML. The browser made 0 `graphql|execute.json` requests.
- **The 5-cap is not proven.** The page response has `last-modified: Fri, 16 Oct 2026 06:43:41 GMT`. That is before rel6 was published: JOB-20261016-04 still saw 5 items at ~07:01Z. The static HTML has only 5 `relatedMovies` rows (rel1–rel5), and the string `rel6` does not appear in the source (checked with a cache-buster).
  So the page was rendered from 5 inputs, and the overlay/preview has not been regenerated since the data change. Suggested action: re-preview the branch page, then rerun P3.
- **Order rule: order not verifiable.** updateDate is null for all six, and publishDate is identical. The spec's `toEqual(newest)` assertion passed only because a stable sort on equal keys keeps the authored order.
- The job gives the data change time as "16:20" without a time zone. The 06:43:41Z page timestamp predates it under any plausible offset, because the 07:01Z run still saw 5.
- Evidence: `ykk-dsr/hub/results/JOB-20261016-05/evidence/DSR-501-P3_en_fullpage.png` (committed). `test-results/` and `playwright-report/` are gitignored and not committed.
