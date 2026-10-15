# DSR-552 DEV automation run — 20261015-job06

Hub job JOB-20261015-06 retests bug DSR-591 (the breadcrumb skips published ancestors that are missing from query-index). It requeues JOB-20261015-03 (class C) after QA re-published `/master/en/test-space` on 2026-10-15 at about 13:15 (UTC+7).

## 1. Header

- Run start (UTC): 2026-10-15T06:20:08Z (PRE-INDEX curl check at 2026-10-15T06:19:30Z)
- Run end (UTC): 2026-10-15T06:20:28Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/test-space/dsr552-bc/child (001), /master/{ja,en}/test-space/dsr552-bc/child/grandchild (005, 011, 025)
- Build under test: DEV as deployed on 2026-10-15; build ID/SHA not independently verified
- Baseline ID: BL-v1 (docs/DSR-552/)
- Automation HEAD commit SHA: 59d18f96b2c0bda6b1ac9cb061295b6fa382b237, plus an uncommitted change to `open()` in `tests/breadcrumb/DSR-552.breadcrumb.spec.ts` (trail-settle wait) that is committed with this report
- Exact command used:

```sh
DSR_JOB_EVIDENCE=ykk-dsr/hub/results/JOB-20261015-06/evidence PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job06/results.json npm run test:dev -- --project=chromium tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts tests/breadcrumb/DSR-552.breadcrumb.spec.ts --grep "DSR-BREAD-0(05|11) \[(ja|en)\]|(ja|en) DSR-BREAD-0(01|25) "
```

PRE-INDEX (curl, 2026-10-15T06:19:30Z): **class B**
- `/master/en/test-space`: HTTP **200**, `<title>` `test-space`, `last-modified: Thu, 15 Oct 2026 06:09:39 GMT`.
- `/query-index.json` has 119 rows (total 119); JOB-03 saw 118. `/master/en/test-space` present: **true** (title `test-space`, robots empty).
- `/master/ja` and `/master/en` (HOME) both return 404. This is a known data gap.
- In class B the DSR-591 fix cannot be proven. The en tests were run, and their results are marked `suspect: data` in the hub result.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 8 | 8 | 0 | 0 | 0 | 2 | configured 1; 0 used | 18.1s (Playwright), 20.3s including npm startup |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: a ja + en subset of 2 specs, on chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt (single attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-005 | DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | passed | 4.5s | — |
| DSR-BREAD-011 | DSR-BREAD-011 [ja] items equal page titles | passed | 3.5s | — |
| DSR-BREAD-001 | ja › DSR-BREAD-001 child trail and placement | passed | 5.6s | — |
| DSR-BREAD-025 | ja › DSR-BREAD-025 BreadcrumbList structured data | passed | 3.2s | — |
| DSR-BREAD-005 | DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | passed | 2.4s | — |
| DSR-BREAD-011 | DSR-BREAD-011 [en] items equal page titles | passed | 3.0s | — |
| DSR-BREAD-001 | en › DSR-BREAD-001 child trail and placement | passed | 3.0s | — |
| DSR-BREAD-025 | en › DSR-BREAD-025 BreadcrumbList structured data | passed | 2.3s | — |

Observed (from the `observed` attachments):
- 005 ja: `HOME, test space, QA Parent, QA Child, QA Grandchild`. 005 en: `HOME, test-space, QA Parent, QA Child, QA Grandchild`.
- 011 ja/en: each ancestor href returns 200, and its `<title>` equals the item text. The current item equals the page title. HOME was not title-compared (fixed label).
- 001 en: trail `HOME, test-space, QA Parent, QA Child`. JSON-LD BreadcrumbList has 4 entries; position 2 is `test-space` → `https://main--dsr-eds-dev--sutrix-projects.aem.live/master/en/test-space`.
- 025 ja/en: JSON-LD has 5 entries at positions 1–5. Names equal the visible trail, items are absolute URLs to the expected paths, and the last entry has no `item`.

## 5. Skipped tests

None.

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs. The main spec's afterEach wrote pass screenshots to `evidence/DSR-552/DEV/` (it modified `DSR-BREAD-025_ja_pass.png` and created `DSR-BREAD-001_en_pass.png` and `DSR-BREAD-025_en_pass.png`). I reverted or removed these to keep the committed evidence unchanged.

## 7. Open points for QA

- **DSR-591 is not proven fixed.** `/master/en/test-space` is now published *and* indexed, so the breadcrumb result does not depend on the fix. A valid test needs a published ancestor that is absent from `query-index.json`.
- Code change: `open()` in the main spec now waits for networkidle and a stable breadcrumb item count before it reads the trail and JSON-LD (same logic as the retest spec). This affects every main-spec test that uses `open()`. Only 001 and 025 were run in this job.
- The `Bug-INDEX` annotation on en 001/005/025 in the main spec is stale now that en test-space is indexed. I left it unchanged.
- HOME `/master/{ja,en}` returns 404 (known data gap). It was noted only and did not fail any test.
- The DEV build identity was not independently verified.
