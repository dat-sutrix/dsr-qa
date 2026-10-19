# DSR-587 DEV automation run — 20261019-job17-01-rerun2 (JOB-20261017-01, DSR-647 retest P2 + P3, final)

## 1. Header

- Run start (UTC): 2026-10-19T04:26:33Z
- Run end (UTC): 2026-10-19T04:26:54Z
- Environment + base URL: DEV — branch preview https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page (absolute URLs in the spec; `BASE_URL` from `envs/dev.env` is not used)
- Target pages: `/en/library/video/qa501-main-a` (page A, P3), `/en/library/video/qa501-main-b` (page B, P2)
- Build under test: branch `dsr-productdetail-moustache` (aem.page). Not independently verified beyond the URL. Page A HTML `last-modified: Fri, 16 Oct 2026 06:43:41 GMT`; page B `Fri, 16 Oct 2026 06:43:43 GMT`.
- Baseline ID: BL-OVL-1 (`docs/DSR-587/overlay-data-flow-BL.md`) + order rule DSR-647 comment 61177 (newest updateDate first, max 5, `isUnavailable = true` hidden); hub job JOB-20261017-01
- Automation HEAD commit SHA: 5f135fe4a845b9e7cc3731f10823287767c5f02d, with uncommitted edits to `tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` and `fixtures/dsr-501.ts`, committed with this report
- Exact command used:

```sh
DSR_JOB_EVIDENCE=ykk-dsr/hub/results/JOB-20261017-01/evidence PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job-20261017-01-rerun.json npm run test:dev -- tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 0 | 1 | 1 | 1 | 1 | configured 1; 1 used (P2, failed again) | 19.1 s |

Subset: the DSR-587 overlay retest spec, chromium. Proposed outcomes only; human QA confirms.
Proposed job verdicts: **P2 = fail** (static-HTML criterion only; the DOM criterion passes). **P3 = blocked-data** (stale preview).

## 4. Executed tests

Duration is per attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed | failed (both attempts) | 5.5 s / 5.3 s | Static HTML of page B contains "video title off" (movieoff row, `isUnavailable: true`) |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-501-P3 | blocked-data: stale preview, static HTML has fewer relatedMovies rows than query (static HTML 5 relatedMovies rows, query 6; last-modified Fri, 16 Oct 2026 06:43:41 GMT) |

## 6. Failed tests

### DSR-501-P2 — DSR-501-P2 [en] unavailable related movie is not displayed

- Failing assertion: `expect(o.html).not.toContain(pageB.excludedTitle)` — `tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts:87`
- Expected (job JOB-20261017-01): page B shows exactly 1 related movie card (rel1), and `qa501-off` is absent from the DOM **and the static HTML**.
- Actual: the DOM part passes: the cards are exactly `["video title rel1"]`, "video title off" is not in the rendered DOM, and 0 GraphQL calls were made. The static HTML has 2 `relatedMovies` rows: `movieId: rel1 movieTitle: video title rel1 publishDate: 2026-10-15` and `movieId: movieoff movieTitle: video title off isUnavailable: true publishDate: 2026-10-15`.
- Attempt(s): initial failed, retry #1 failed with the same assertion
- Evidence paths: `ykk-dsr/hub/results/JOB-20261017-01/evidence/DSR-501-P2_en_fullpage.png` (committed); `test-results/movie-detail-DSR-587.overl-796aa-ated-movie-is-not-displayed-chromium{,-retry1}/` (test-failed-1.png, trace.zip, error-context.md)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- **P2 static-HTML criterion vs baseline:** BL-OVL-1 says the json2html template writes one block row per field and the block filters on the client. It does not say whether `isUnavailable = true` items must be dropped server-side. The job's Expected requires them to be absent from the static HTML, and the check was added for this job. Suspect: **test**. Claude should decide whether this is a product requirement (template filter) or an over-strict TC.
- **P3 stale preview:** the query returns 6 relatedMovies with distinct updateDate (raw values below). Page A's static HTML is still the 2026-10-16 06:43:41Z build: 5 rows, rel1–rel5, no rel6, no updateDate field. The cards shown were rel1, rel2, rel3, rel4, rel5 (authored order). Under the job's freshness rule this is blocked-data, not Fail. The Night Report 16/10 Fail ("order not rel6..rel2; rel1") matches this stale HTML. Fix needed: re-preview `/en/library/video/qa501-main-a` (and B) on the branch.
- Page B's static HTML is also the 16/10 build: the rel1 row has no updateDate. This does not affect the P2 criteria.
- Raw query data (publish, 2026-10-19 ~04:26Z), page A `qa501-main-a`. `isUnavailable` is null for all items:

| movieId | movieTitle | publishDate | updateDate |
|---|---|---|---|
| rel1 | video title rel1 | 2026-10-15 | 2026-10-01 |
| rel2 | video title rel2 | 2026-10-15 | 2026-10-02 |
| rel3 | video title rel3 | 2026-10-15 | 2026-10-03 |
| rel4 | video title rel4 | 2026-10-15 | 2026-10-04 |
| rel5 | video title rel5 | 2026-10-15 | 2026-10-05 |
| rel6 | video title rel6 | 2026-10-15 | 2026-10-06 |

  Page B `qa501-main-b`: rel1 (publishDate 2026-10-15, updateDate 2026-10-01, isUnavailable null); movieoff "video title off" (publishDate 2026-10-15, updateDate null, isUnavailable true).
- Main CF `qa501-main-a` on publish: `cq:lastModified` 2026-10-16T06:40:45.759Z. I could not tell from the query whether the republish of qa501-main-a requested in QA-PT Night Pack item 1 happened. The rel CF updateDates are live on publish.
- The updated P3 order assertion (query sorted by updateDate desc must equal fixture rel6, rel5, rel4, rel3, rel2, and the page must show exactly that) was **not executed**: the freshness skip fires first. From the raw data above, expected = rel6, rel5, rel4, rel3, rel2.
