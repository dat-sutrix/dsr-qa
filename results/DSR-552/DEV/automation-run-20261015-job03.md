# DSR-552 DEV automation run — 20261015-job03

Hub job JOB-20261015-03 retests bug DSR-591 (breadcrumb skips published ancestors that are missing from query-index). QA reported that `/master/en/test-space` was published on DEV on 2026-10-15.

## 1. Header

- Run start (UTC): 2026-10-15T05:58:10Z (PRE-INDEX curl check at 2026-10-15T05:57:48Z)
- Run end (UTC): 2026-10-15T05:58:30Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/ja/test-space/dsr552-bc/child (001), /master/ja/test-space/dsr552-bc/child/grandchild (005, 011, 025)
- Build under test: DEV as deployed on 2026-10-15; build ID/SHA not independently verified
- Baseline ID: BL-v1 (docs/DSR-552/)
- Automation HEAD commit SHA: 44144ff8995cc48e7cd1d79262b9a15f27aa925f (no code changes in this job)
- Exact command used:

```sh
DSR_JOB_EVIDENCE=ykk-dsr/hub/results/JOB-20261015-03/evidence PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job03/results.json npm run test:dev -- --project=chromium tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts tests/breadcrumb/DSR-552.breadcrumb.spec.ts --grep "DSR-BREAD-0(05|11) \[ja\]|ja DSR-BREAD-0(01|25) "
```

PRE-INDEX (curl, 2026-10-15T05:57:48Z): **class C**
- `/master/en/test-space`: HTTP **404**, `<title>` `Page not found`. The response header is `x-error: [pipeline: html] Lambda: x-error: failed to load /master/en/test-space.md from content-bus: 404`. The trailing-slash, `/index` and `.plain.html` variants also return 404. For comparison, `/master/ja/test-space` returns 200 with title `test space`.
- `/query-index.json` has 118 rows (total 118). `/master/en/test-space` present: **false**; `/master/ja/test-space` present: true.
- `/master/ja` and `/master/en` (HOME) both return 404. This is a known data gap.
- The job says that class C means en tests are `blocked` and must not be run. Only ja was executed.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 4 | 4 (1 flaky) | 0 | 0 | 0 | 2 | configured 1; 1 retry used (025 ja, passed) | 13.3s (Playwright), 20s including npm startup |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: a ja subset of 2 specs on chromium. The 4 en tests (001, 005, 011, 025) were not run because PRE-INDEX is class C. Flaky: 1 (DSR-BREAD-025 ja, see section 6).

## 4. Executed tests

Duration is per attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-005 | DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy (retest spec) | passed | 5.0s | — |
| DSR-BREAD-011 | DSR-BREAD-011 [ja] items equal page titles (retest spec) | passed | 5.9s | — |
| DSR-BREAD-001 | ja › DSR-BREAD-001 child trail and placement (main spec) | passed | 2.9s | — |
| DSR-BREAD-025 | ja › DSR-BREAD-025 BreadcrumbList structured data (main spec) | flaky: attempt 1 failed (2.7s), retry passed (2.6s) | 5.3s total | attempt 1: no BreadcrumbList JSON-LD yet at read time |

Observed (ja):
- 005: `HOME > test space > QA Parent > QA Child > QA Grandchild` (5 items).
- 011: each item equals its page title. test space, QA Parent and QA Child pages return 200 with matching `<title>`. The current item equals the document title, and HOME is a fixed label.
- 025 retry: one BreadcrumbList in JSON-LD, with names equal to the trail and absolute `https://` item URLs.

## 5. Skipped tests

None were skipped by Playwright. The en cases were not executed because of the job rule (PRE-INDEX class C), and Playwright did not skip them:

| TC ID | Verbatim skip reason |
|---|---|
| DSR-BREAD-001/005/011/025 [en] | Not run. Job JOB-20261015-03: "C = still 404 (publish failed, mark en tests `blocked`, do not run them)" |

## 6. Failed tests

None failed in the end. The flaky attempt is detailed below.

### DSR-BREAD-025 — BreadcrumbList structured data (ja), attempt 1

- Failing assertion: `expect(lists).toHaveLength(1)` — `tests/breadcrumb/DSR-552.breadcrumb.spec.ts:103`
- Expected: 1 BreadcrumbList JSON-LD block
- Actual: `[]` (0 blocks) on attempt 1. On the retry there was 1 block, and all soft checks passed.
- Attempt(s): retry0 failed, retry1 passed
- Evidence paths: `test-results/breadcrumb-DSR-552.breadcr-40dd2-adcrumbList-structured-data-chromium/` (screenshot, trace)
- Likely cause (test side): `open()` reads JSON-LD once, before the block has finished its asynchronous render. The `observed` attachment shows only `HOME, QA Grandchild` at read time on both attempts. The retest spec waits for the trail to settle, but the main spec does not.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs. The main spec's afterEach overwrote `evidence/DSR-552/DEV/DSR-BREAD-001_ja_pass.png` and created `DSR-BREAD-025_ja_fail.png`. Both were reverted or removed so that committed evidence from 2026-10-12 is unchanged.

## 7. Open points for QA

- **DSR-591 is not proven fixed and not proven broken.** `/master/en/test-space` is still not published on DEV (content-bus 404) at 05:57Z. That is after the reported publish, so the publish did not reach the publish tier. Please check the publish/activation status in DEV Author, then requeue.
- The main spec does not wait for the breadcrumb or JSON-LD to settle (025 race; the `observed` attachments for 001/025 show only 2 items at read time). Web-first `toHaveText` assertions still passed. Suggest adding the settle wait from the retest spec to `open()`.
- HOME `/master/ja` and `/master/en` return 404 (known data gap). This is not counted as a failure.
- Build identity was not independently verified.
