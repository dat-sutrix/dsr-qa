# DSR-570 DEV automation run — 20261023-job04

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

Combined suite above; this report lists 3 DSR-570 cases. Chromium; no flaky passes. Proposed outcomes only, human QA confirms.

## 4. Executed tests

Duration summed across attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | Pass | 5.8s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | Pass | 7.0s | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | Fail | 23.6s | Gated PDF URL exposed in JSON |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
None.

## 6. Failed tests

### DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Assertion: `expect(gatedHits).toEqual([])` — tests/catalog-download/DSR-570.catalog-download.spec.ts:195
- Expected: no PDF URL delivered for requiresForm=true before submit.
- Actual: qa190-cat-pdf-form contains pdfAsset._publishUrl = https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/pdf/sample-pdf-a4-size-65kb.pdf
- Initial and retry fail identically; cause=none, confidence=70%, suspect=product. Existing issue awaits Quentin (hub/us/DSR-570.md).
- Evidence: evidence/DSR-673/DSR-CATDL-007-attempt1.png and -attempt2.png; results/JOB-20261023-04/suite.json (observed attachments).
- Local evidence: test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/test-failed-1.png
- Local evidence: test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/error-context.md
- Local evidence: test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/trace.zip
- Local evidence: test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/test-failed-1.png
- Local evidence: test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/error-context.md
- Local evidence: test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/trace.zip

`test-results/` and `playwright-report/` files are gitignored and not committed.

## 7. Open points for QA

- No AEM writes or form submissions. Build identity and unpublished inventory were not independently verified.
- CATV-014 has no canonical suite implementation; supplemental mobile check uses JOB-20261022-20 (ID mapping unverified). CATV-015 not run: no implementation or authoritative local expected result.
- CATV-018..020 skipped for absent fixture data. CATDL-007 is a known pending scope decision; no duplicate bug created.
- Full 12-load raw data, titles/links/console errors: results/JOB-20261023-04/result.json; hub summary proposes DSR-673 fix confirmed.
- One configured retry ran on a deterministic CATDL-007 assertion (existing config); this was not flakiness.
- Commit follows hub job protocol; runner owns push.
