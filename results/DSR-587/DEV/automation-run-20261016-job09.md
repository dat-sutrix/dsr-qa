# DSR-587 DEV automation run — 20261016-job09 (JOB-20261016-09 part A, DSR-501-P3 recheck)

## 1. Header

- Run start (UTC): 2026-10-16T10:27:41Z
- Run end (UTC): 2026-10-16T10:27:48Z
- Environment + base URL: DEV — branch preview https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page (absolute URLs in the spec; `BASE_URL` from `envs/dev.env` is not used)
- Target page: `/en/library/video/qa501-main-a` (page A)
- Build under test: branch `DSR-PRODUCTDETAIL-moustache` (aem.page), not independently verified beyond the URL
- Baseline ID: BL-OVL-1 (`docs/DSR-587/overlay-data-flow-BL.md`); hub job JOB-20261016-09
- Automation HEAD commit SHA: 74a4ef6d4031c034beb2df5eae83df2d4ec1a92e (no code changes)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/p3.json npm run test:dev -- tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts -g "DSR-501-P3" --reporter=list,json
```

Before this, the same subset was started once by mistake without `ENV=dev` (`npx playwright test …`, 10:27:27Z). It ran against the same absolute URLs and exited with code 0. That run is not counted here.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 1 | 0 | 0 | 0 | 1 | configured 1; none used | 5.6 s |

Subset: DSR-501-P3 only, chromium. Proposed outcomes only; human QA confirms.
**Job verdict for P3: blocked-data**, not pass (see section 7). The job rule applies: the HTML still has 5 rows and last-modified is before 2026-10-16T09:20Z.

## 4. Executed tests

Duration is for a single attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-501-P3 | DSR-501-P3 [en] related movies are max 5, newest updated first | passed (job: blocked-data) | 4.2 s | — |

## 5. Skipped tests

None

## 6. Failed tests

None

Evidence: `test-results/movie-detail-DSR-587.overl-7d384--max-5-newest-updated-first-chromium/attachments/page-*.png` (full page). This is gitignored and not committed.

## 7. Open points for QA

- Static HTML of the branch page:
  - `last-modified: Fri, 16 Oct 2026 06:43:41 GMT`, which is before 09:20Z. The value is unchanged since JOB-20261016-05.
  - 5 `relatedMovies` rows (rel1–rel5).
  - Per the job rule this is **blocked-data: "branch page not regenerated after CF related republish"**. The page did not regenerate automatically after the CF republish (Martin, 17:20).
- Publish GraphQL (`dsr-video-page`) returns 6 related movies, rel1–rel6.
  - All have `publishDate` 2026-10-15 and `updateDate` null; `isUnavailable` is null.
  - The spec "passes" only because the page cannot show rel6. This does not prove the 5-card cap or the order.
- Rendered movie cards: 5 (rel1, rel2, rel3, rel4, rel5), all dated 2026-10-15. Only movie cards were counted. No GraphQL call was made in the browser.
- The 6-row check (exactly 5 movie cards, newest first) was not reached.
