# DSR-587 DEV automation run — 20261019 (JOB-ZZ-IDLE-06, movie overlay scaffold)

## 1. Header

- Run start (UTC): 2026-10-19T04:45:35Z
- Run end (UTC): 2026-10-19T04:46:08Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`BASE_URL` from `envs/dev.env`; `DSR587_BASE` not set). For 2.0/6.0/10.0 the `.aem.page` twin https://main--dsr-eds-dev--sutrix-projects.aem.page is derived from it.
- Target pages: `/{ja,en}/library/video/qa587-*` (TD-587-01/02/04/05/06/07/08/10/14/15), `/{ja,en}/library/video/search`, `/{ja,en}/library/video/tech-talk`
- Build under test: main branch on .aem.live, not independently verified (no build ID exposed)
- Baseline ID: BL-OVL-1 (`docs/DSR-587/overlay-data-flow-BL.md`); TCs from `ykk-dsr/hub/tc-out/DSR-587.spec.json`; hub job JOB-ZZ-IDLE-06
- Automation HEAD commit SHA: 2a9bba9ceca76c2936d605c0272e286267d21d36, plus uncommitted new `fixtures/dsr-587.ts` and `tests/movie-detail/DSR-587.movie-overlay.spec.ts` and an edit to `fixtures/dsr-173.ts`, all committed with this report
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job-zz-idle-06.json npm run test:dev -- --grep "DSR-VOV"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 24 | 0 | 2 | 22 | 1 | 2 (config) | configured 1; used by both failures, which failed again | 33 s (Playwright 31.4 s) |

All 24 tests ran on chromium (other projects only match the DSR-552 spec). These are proposed outcomes; human QA confirms.

## 4. Executed tests

Duration is per attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VOV-011 | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | failed (both attempts) | 1.3 s / 1.5 s | `/ja/library/video/search` returns HTTP 404 on .aem.live |
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | failed (both attempts) | 2.0 s / 1.4 s | `/en/library/video/search` returns HTTP 404 on .aem.live |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-VOV-001 [ja] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-001 [en] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-002 [en] | TD-587-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-preview HTTP 404) |
| DSR-VOV-003 [ja] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-003 [en] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-004 [en] | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 [en] | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 [en] | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-007 [ja] | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-007 [en] | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-008 [en] | TD-587-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-unavail HTTP 404) |
| DSR-VOV-010 [en] | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 [ja] tech-talk | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 [en] tech-talk | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-011 [cn] | Issue #18: no /cn path on DEV (fixme) |
| DSR-VOV-014 [en] | TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-015 [en] | TD-587-15 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-b HTTP 404) |
| DSR-VOV-016 [en] | TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-017 [en] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 [ja] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 [en] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 [cn] | Issue #18: no /cn path on DEV (fixme) |

## 6. Failed tests

### DSR-VOV-011 [ja] / [en] — video/search stays a list page

- Failing assertion: `expect(response?.status(), target).toBe(200)` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:197`
- Expected (11.0): HTTP 200, list block present with ≥ 1 card, no video-detail block and no 'unavailable' row.
- Actual: HTTP 404 for https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/search and …/en/library/video/search. The list block and card checks did not run.
- Manual check before the run (curl): both paths return **200 on .aem.page** (main and the moustache branch) and **404 on .aem.live**. The page appears to be previewed but not published live. That points to environment/content, not the overlay regex. Suspect: **env**.
- Attempts: the first attempt and retry #1 both failed with the same assertion.
- Evidence: `ykk-dsr/hub/results/JOB-ZZ-IDLE-06/evidence/DSR-VOV-011_ja.png`, `…/DSR-VOV-011_en.png` (committed); `test-results/movie-detail-DSR-587.movie-{f5a89,4c66c}-h-≥-1-card-no-video-detail--chromium{,-retry1}/` (test-failed-1.png, trace.zip, error-context.md)

The evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**.

## 7. Open points for QA

- **No TD-587 data on DEV.** Every qa587-* page returns 404 on .aem.live, on main .aem.page and on the moustache branch .aem.page (curl, 2026-10-19 ~04:43Z). So no assertion for 1–8, 10 or 14–18 ran, and the test logic has not been checked against a real overlay page.
- **Negative TCs 4/5/6/10** expect a 404, so a 404 cannot prove the data exists. They run only when QA-PT sets `DSR587_SEEDED=04,05,06,10`.
- **5.0 step 2 (qa501-main-a → 404) looks stale.** BL-OVL-1 Update 2026-10-16 says Martin created qa501-main-a/b under `/content/dam/dsr/en/movies/standard/`. On DEV, `/en/library/video/qa501-main-a` returns 200 on .aem.page (404 on .aem.live). The step is kept as written but is likely wrong. Suspect: **test** (A2 is outdated).
- **11.0 list page on .aem.live:** /video/search is preview-only, as described above. To run 11.0 on preview, set `DSR587_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.page`. That was **not** done in this run (one run only, per the job). The list-card locator `main .listing a[href*="/library/video/"]` is a guess from the static HTML (cards render by JS) and was not verified. `// TODO: data-testid` is marked.
- **tech-talk list page** is 404 on all three hosts, so that 11.0 step is skipped, not failed.
- **17.0** is a gate only. `fixtures/dsr-173.ts` now reads `DSR173_MOVIE_PATH` / `DSR173_RELATED_PATH`; the default paths are unchanged and no DSR-173 assertion changed. The Group A regression itself runs with `DSR173_MOVIE_PATH=/en/library/video/qa587-main DSR173_RELATED_PATH=/en/library/video/qa587-rel-a npm run test:dev -- --grep "DSR-MOVIE-0(12|14|20|25|26|27|28|29|33|34) "`. With only the URL switched, these checks will fail on qa587-main: the DSR-173 fixture values (title 'movieTitle', thumbnail path, and 026's `/master/en/` link prefix) belong to the test-space page. Claude needs to decide whether to add a TD-587-01 value set.
- **Assumptions:**
  - The ja copies of TD-587-01/07 use the same id and title as en.
  - 3.0: the line-break separator for meta description is TBD (DSR-173 TC 028), so the test checks only "no line break + both lines present".
  - 1.0: the YouTube movieSourceId is not fixed in the TestData sheet, so the embed id is compared only once it is recorded in `fixtures/dsr-587.ts`.
  - 16.0: the expected order needs the recorded update dates, so it skips until they are filled in.
  - 14/15: related movies are identified by card href (`/qa587-r1`, `qa587-off`), because the sheet gives no titles.
- Not automated in this job: 9.0 (manual), 12.0/13.0 (blocked on Q32), 19.0 (visual lane).
