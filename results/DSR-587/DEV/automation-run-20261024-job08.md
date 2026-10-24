# DSR-587 DEV automation run — 20261024-job08

JOB-20261024-08: capture-on-fail hook for `dsr-video-list` / `dsr-catalog-list` (REG-VOV-EN) + VOV-011/013 ja+en ×3.

## 1. Header

- Run start (UTC): 2026-10-24T10:25:20Z
- Run end (UTC): 2026-10-24T10:25:48Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/ja/library/video/search`, `/en/library/video/search`, `/ja/library/video/tech-talk`, `/en/library/video/tech-talk`
- Build under test: not independently verified (no build ID exposed on the page)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md)
- Automation HEAD commit SHA: 261456fbcb57739fc4091ae3b923569a46034d3b + uncommitted changes from this job (fixtures/capture-graphql.ts, spec imports), committed with this report
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job08.json ENV=dev npx playwright test tests/movie-detail/DSR-587.movie-overlay.spec.ts --project=chromium --grep "DSR-VOV-01[13]" --repeat-each=3
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 18 (6 tests × 3 repeats) | 9 | 0 | 9 | 0 | 2 | configured 1; actual 0 | 25.6 s |

Counts are attempts across `--repeat-each=3` (6 unique tests). Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (VOV-011/013), chromium. Flaky outcomes: 0. GraphQL captures written: 0 (no failing `dsr-video-list` response observed).

## 4. Executed tests

Duration per attempt (repeat 1 / 2 / 3).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VOV-011 | [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | pass ×3 (HTTP 200, 6 cards each) | 2.9 / 3.0 / 1.8 s | — |
| DSR-VOV-011 | [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | pass ×3 (HTTP 200, 12 cards each) | 2.8 / 2.9 / 2.5 s | — |
| DSR-VOV-013 | [en] movie list shows standard movies only | pass ×3 (HTTP 200, 12 card paths, 0 video-detail blocks, 2 main-frame navigations) | 2.5 / 2.5 / 4.2 s | — |

DSR-VOV-013 card paths (identical in all 3 repeats): `/en/library/video/QA587_Upper`, `qa587-main`, `qa587-rel-b`, `qa501-main-a`, `qa501-main-b`, `qa557-dam`, `badid`, `long`, `noid`, `rel6`, `qa587-r6`, `qa587-rel-a`.

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-VOV-011 [ja] video/tech-talk (×3) | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 [en] video/tech-talk (×3) | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-011 [cn] list pages (×3) | Issue #18: no /cn path on DEV |

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**.

## 7. Open points for QA

- REG-VOV-EN was not reproduced in this window (9/9 search-page attempts passed, 0 captures). The hook only helps once a failing window coincides with a run.
- Playwright empties `test-results/` at the start of every run, so a capture in `test-results/graphql-capture/` survives only until the next run; REG jobs must copy it into their result folder right after their own run.
- Build identity not verified.
