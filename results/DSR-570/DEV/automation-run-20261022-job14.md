# DSR-570 DEV automation run — 20261022-job14

JOB-20261022-14 (test-expectation fixes found in JOB-20261022-10, rerun ja+en on .aem.page and .aem.live). Proposed outcomes only; human QA confirms.

## 1. Header

- Run start (UTC): 2026-10-22T07:51:14Z
- Run end (UTC): 2026-10-22T07:59:45Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL = .aem.live; overridden per tier)
- Target page(s): /master/{ja,en}/test-space/list-catalog; /{ja,en}/library/catalog/{qa190-cat-pdf-form,qa190-cat-ebook-form}
- Build under test: not independently verified (no build ID exposed). No deploy observed during the run. Catalog list served by `dsr-catalog-list;folder=/content/dam/dsr/{lang}/catalogs/` (ja 6 / en 5 items, probe 07:4xZ).
- Baseline ID: DSR-570 TC sheet (CATDL) + BL-OVL-1 + DSR-655 Y3; docs/DSR-570/automation-spec.md A8/A9
- Automation HEAD commit SHA: 28697db5eae8cae31dbe951080a45f5dc2fbb7b7 plus the uncommitted JOB-14 spec changes, which are committed together with this report
- Exact commands used:

```sh
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job14/run/570-page.json npm run test:dev -- tests/catalog-download/DSR-570.catalog-download.spec.ts --project=chromium --output=test-results/job14-570-page
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job14/run/570-live.json npm run test:dev -- tests/catalog-download/DSR-570.catalog-download.spec.ts --project=chromium --output=test-results/job14-570-live
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run before the reruns and again after the redirect-helper fix)

## 3. Suite summary

| Tier | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| .aem.page | 16 | 12 | 2 | 2 | 1 | 2 | 1 configured; each failed test retried once and failed again | 0m46s |
| .aem.live | 16 | 12 | 2 | 2 | 1 | 2 | 1 configured; each failed test retried once and failed again | 1m11s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: one spec file, chromium project only. Flaky outcomes: 0.

## 4. Executed tests

Duration = sum of all attempts. Result = proposed.

| TC ID | Title | Tier | Result | Duration | One-line failure reason |
|---|---|---|---|---|---|
| DSR-CATDL-001 | ja > DSR-CATDL-001 [ja] catalog detail header renders | .aem.page | pass | 1.8s | — |
| DSR-CATDL-002 | ja > DSR-CATDL-002 [ja] download form fields, labels, consent and button present | .aem.page | pass | 1.8s | — |
| DSR-CATDL-005 | ja > DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | .aem.page | pass | 2.2s | — |
| DSR-CATDL-006 | ja > DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | .aem.page | pass | 1.9s | — |
| DSR-CATDL-018 | ja > DSR-CATDL-018 [ja] e-book form card links to the detail page with the form | .aem.page | pass | 1.8s | — |
| DSR-CATDL-001 | en > DSR-CATDL-001 [en] catalog detail header renders | .aem.page | pass | 1.7s | — |
| DSR-CATDL-002 | en > DSR-CATDL-002 [en] download form fields, labels, consent and button present | .aem.page | pass | 1.8s | — |
| DSR-CATDL-005 | en > DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | .aem.page | pass | 1.3s | — |
| DSR-CATDL-006 | en > DSR-CATDL-006 [en] requiresForm=true card leads to the download form | .aem.page | pass | 1.9s | — |
| DSR-CATDL-018 | en > DSR-CATDL-018 [en] e-book form card links to the detail page with the form | .aem.page | pass | 1.8s | — |
| DSR-CATDL-003 | ja > DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | .aem.page | pass | 1.7s | — |
| DSR-CATDL-007 | ja > DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | .aem.page | fail (retry: failed/failed) | 8.3s | gated PDF URL delivered before submit: dsr-catalog-list item qa190-cat-pdf-form (requiresForm=true) carries pdfAsset._publishUrl |
| DSR-CATDL-010 | ja > DSR-CATDL-010 [ja] catalog ID handed to the form | .aem.page | pass | 3.2s | — |
| DSR-CATDL-016 | en > DSR-CATDL-016 [en] fixed texts translated (no Japanese) | .aem.page | fail (retry: failed/failed) | 3.1s | en overlay form /en/library/catalog/qa190-cat-pdf-form renders all labels, options, consent and button in Japanese |
| DSR-CATDL-001 | ja > DSR-CATDL-001 [ja] catalog detail header renders | .aem.live | pass | 2.5s | — |
| DSR-CATDL-002 | ja > DSR-CATDL-002 [ja] download form fields, labels, consent and button present | .aem.live | pass | 2.4s | — |
| DSR-CATDL-005 | ja > DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | .aem.live | pass | 3.2s | — |
| DSR-CATDL-006 | ja > DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | .aem.live | pass | 3.0s | — |
| DSR-CATDL-018 | ja > DSR-CATDL-018 [ja] e-book form card links to the detail page with the form | .aem.live | pass | 3.0s | — |
| DSR-CATDL-001 | en > DSR-CATDL-001 [en] catalog detail header renders | .aem.live | pass | 2.1s | — |
| DSR-CATDL-002 | en > DSR-CATDL-002 [en] download form fields, labels, consent and button present | .aem.live | pass | 2.0s | — |
| DSR-CATDL-005 | en > DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | .aem.live | pass | 2.1s | — |
| DSR-CATDL-006 | en > DSR-CATDL-006 [en] requiresForm=true card leads to the download form | .aem.live | pass | 2.6s | — |
| DSR-CATDL-018 | en > DSR-CATDL-018 [en] e-book form card links to the detail page with the form | .aem.live | pass | 2.5s | — |
| DSR-CATDL-003 | ja > DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | .aem.live | pass | 4.3s | — |
| DSR-CATDL-007 | ja > DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | .aem.live | fail (retry: failed/failed) | 15.9s | gated PDF URL delivered before submit: dsr-catalog-list item qa190-cat-pdf-form (requiresForm=true) carries pdfAsset._publishUrl |
| DSR-CATDL-010 | ja > DSR-CATDL-010 [ja] catalog ID handed to the form | .aem.live | pass | 4.9s | — |
| DSR-CATDL-016 | en > DSR-CATDL-016 [en] fixed texts translated (no Japanese) | .aem.live | fail (retry: failed/failed) | 7.1s | en overlay form /en/library/catalog/qa190-cat-pdf-form renders all labels, options, consent and button in Japanese |

## 5. Skipped tests

| TC ID | Tier | Verbatim skip reason |
|---|---|---|
| DSR-CATDL-017 [ja] | .aem.page | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 [cn] | .aem.page | cn: no /master/cn (Issue #18) |
| DSR-CATDL-017 [ja] | .aem.live | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 [cn] | .aem.live | cn: no /master/cn (Issue #18) |

## 6. Failed tests

### DSR-CATDL-007 — ja > DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion(s): `gated PDF URL delivered to the browser before submit` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:195`
- Expected: no gated PDF URL in any response or DOM before submit (A4). Actual: the `dsr-catalog-list` item `qa190-cat-pdf-form` (requiresForm=true) carries `pdfAsset._publishUrl = https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/pdf/sample-pdf-a4-size-65kb.pdf`. The same file is shared by `catalogid-02` and `qa190-cat-pdf` (requiresForm=false). The form page has no hits. JOB-10 saw the same exposure via dm-catalog-list.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `product` · cause `none` · confidence 70%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATDL-007_ja_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATDL-007_ja_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATDL-016 — en > DSR-CATDL-016 [en] fixed texts translated (no Japanese)

- Failing assertion(s): `fixed texts containing Japanese` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:245`
- Expected: no Japanese in the fixed texts of the en form. Actual: the en overlay detail `/en/library/catalog/qa190-cat-pdf-form` renders the form (this was blocked in JOB-10) with Japanese texts: 必須 / 氏名（姓） / メールアドレス / … / 利用規約への同意 + full consent paragraph / ダウンロードする. Only "Product Catalog", "MD", "QC", "Production" and "R&D" are English. New finding.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `product` · cause `none` · confidence 70%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATDL-016_en_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATDL-016_en_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- CATDL-016 [en] is a new finding (Japanese form on en, ~70%, <80% → Dat list). Assumption A3: the plain HTML form may be replaced by HubSpot, which could change the texts.
- CATDL-007: gated pdfAsset in the list response persists after the query change (product, 70%). This repeats the JOB-10 finding.
- CATDL-017 is still skipped: no catalog-ID mechanism exists (detail is path-based).
- The CATDL-018 / CATV-017 change (A8) and the list change (A9) are recorded in docs/DSR-570/automation-spec.md.
- Read-only: no form submitted, no AEM content changed.
