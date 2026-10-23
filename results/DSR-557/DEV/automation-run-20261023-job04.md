# DSR-557 DEV automation run — 20261023-job04

## 1. Header

- Run start/end UTC: 2026-10-23T02:30:19Z / 2026-10-23T02:31:05Z
- Environment: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target: /ja/library/catalog and linked catalog overlays/PDF/ebook.
- Build under test: not independently verified.
- Baseline: JOB-20261023-04; BL-OVL-1 update 2026-10-21; JOB-20261022-14; DSR-570 BL-v1.
- Automation HEAD: bf52c4e0add7828b9c8dcefaf40c179960e3804f
- Exact command:
```sh
DSR_PATHS=v2 PLAYWRIGHT_JSON_OUTPUT_NAME=results/JOB-20261023-04/suite.json npm run test:dev -- tests/catalog-video/DSR-557.catalog-video.spec.ts tests/catalog-download/DSR-570.catalog-download.spec.ts --project=chromium --grep 'ja.*DSR-CAT(V-0(1[3-9]|20)|DL-00[5-7])'
```

## 2. TypeScript check

`npx tsc --noEmit`: exit 0; no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 9 | 5 | 1 | 3 | 1 | 2 | 1 configured; CATDL-007 retried once, failed again | 43.5s |

Combined suite above; this report lists 6 DSR-557 cases. Chromium; no flaky passes. Proposed outcomes only, human QA confirms.

## 4. Executed tests

Duration summed across attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | Pass | 9.9s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | Pass | 10.1s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | Pass | 6.7s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-CATV-018 | Blocked – no DEV data for QA190 NEW 0, QA190 NEW 10, QA190 NEW 11 (ja) |
| DSR-CATV-019 | Blocked – no DEV data for QA190 UPD 0, QA190 UPD 10, QA190 UPD 11 (ja) |
| DSR-CATV-020 | Blocked – no DEV data for QA190 BOTH, qa190-cat-noupd (ja) |

## 6. Failed tests

None.

`test-results/` and `playwright-report/` files are gitignored and not committed.

## 7. Open points for QA

- No AEM writes or form submissions. Build identity and unpublished inventory were not independently verified.
- CATV-014 has no canonical suite implementation; supplemental mobile check uses JOB-20261022-20 (ID mapping unverified). CATV-015 not run: no implementation or authoritative local expected result.
- CATV-018..020 skipped for absent fixture data. CATDL-007 is a known pending scope decision; no duplicate bug created.
- Full 12-load raw data, titles/links/console errors: results/JOB-20261023-04/result.json; hub summary proposes DSR-673 fix confirmed.
- One configured retry ran on a deterministic CATDL-007 assertion (existing config); this was not flakiness.
- Commit follows hub job protocol; runner owns push.
