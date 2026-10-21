# DSR-654 DEV automation run — 20261021-idle25

Job: ykk-dsr/hub/jobs/running/JOB-ZZ-IDLE-25.md. A single run of the DSR-654 catalog-overlay scaffold against the `.aem.page` tier, en only. TC IDs are placeholders (`DSR-CATOV-NNN`).

## 1. Header

- Run start (UTC): 2026-10-21T08:46:13Z
- Run end (UTC): 2026-10-21T08:46:31Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page (`DSR654_BASE` override; BASE_URL in envs/dev.env is the .aem.live host, which DSR-CATOV-003 also uses)
- Target page(s): `/en/library/catalog/{qa190-cat-pdf, qa190-cat-pdf-form, qa190-cat-ebook, qa190-cat-ebook-form}`, `/en/library/catalog/search`, plus `.aem.live` for DSR-CATOV-003
- Build under test: not independently verified (EDS main branch as deployed at run time)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md, including the 2026-10-21 id = node-name update)
- Automation HEAD commit SHA: 0796fe9ef146975d154a589d7503b2f7e2d69de5
- Exact command used:

```sh
DSR654_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/idle25.json npm run test:dev -- tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts --project=chromium --grep '\[en\]'
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 17 | 6 | 2 | 9 | 1 | 2 (config) | configured 1; 2 used (both failures failed again) | 17.8 s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms them.
Scope/browser: a subset (en tests of one spec; the ja and cn tests were excluded by `--grep` as the job asks for en), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: overlay page 200, no redirect, catalog title shown | Pass (proposed) | 0.6s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: raw HTML head + overlay rows, DSR CF same id as content CF | Pass (proposed) | 0.4s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published → 200 on .aem.page and .aem.live | Fail (proposed) | 0.2s + 0.2s | `.aem.live` HTTP 404, expected 200 (`.aem.page` 200) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: overlay page 200, no redirect, catalog title shown | Pass (proposed) | 1.3s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: raw HTML head + overlay rows, DSR CF same id as content CF | Pass (proposed) | 0.3s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published → 200 on .aem.page and .aem.live | Fail (proposed) | 0.1s + 0.3s | `.aem.live` HTTP 404, expected 200 (`.aem.page` 200) |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore id → 404 | Pass (proposed) | 1.0s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] overlay page makes 0 GraphQL requests; html lang | Pass (proposed) | 2.0s | — |

Observed values (from the `observed` attachments; raw data in ykk-dsr/hub/results/JOB-ZZ-IDLE-25/observations.json):

| Value | qa190-cat-pdf-form | qa190-cat-ebook-form |
|---|---|---|
| `<title>` | QA190 PDF form required \| YKK DIGITAL SHOWROOM | QA190 e-book form \| YKK DIGITAL SHOWROOM |
| meta cf-path / row cfPath | /content/dam/dsr/en/catalogs/qa190-cat-pdf-form | /content/dam/dsr/en/catalogs/qa190-cat-ebook-form |
| row catalogId (vs node name) | qa190-cat-pdf-form (equal) | qa190-cat-ebook-form (equal) |
| catalogType / requiresForm / source | pdf / true / overlay | ebook / true / overlay |
| Form slot (`form.catalog-detail-form`) | 1 | 1 |
| meta description / robots | "catelog description" / absent | "catelog description" / absent |
| related.meta cq:lastModified | 2026-10-20T06:11:19.953Z | 2026-10-20T06:10:38.473Z |

DSR-CATOV-004: QA190-CAT-PDF-FORM returned 404 and qa190_cat_pdf_form returned 404. DSR-CATOV-008: there were 0 GraphQL requests, and html lang="en".

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-CATOV-001 | TD-190 qa190-cat-pdf not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-002 | TD-190 qa190-cat-pdf not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-003 | TD-190 qa190-cat-pdf not seeded / not published to this tier (/en/library/catalog/qa190-cat-pdf HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-001 | TD-190 qa190-cat-ebook not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-002 | TD-190 qa190-cat-ebook not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-003 | TD-190 qa190-cat-ebook not seeded / not published to this tier (/en/library/catalog/qa190-cat-ebook HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-005 | isActive=false: no TD id yet (set DSR654_INACTIVE_ID once seeded) |
| DSR-CATOV-006 | unpublished: no TD id yet (set DSR654_REMOVED_ID once seeded) |
| DSR-CATOV-007 | catalog/search Sites page not published (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/search HTTP 404) |

## 6. Failed tests

### DSR-CATOV-003 [en] qa190-cat-pdf-form — live-published → 200 on .aem.page and .aem.live

- Failing assertion: `expect.soft(live, '.aem.live').toBe(200)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:105`
- Expected: 200 on `.aem.live` (BL-OVL-1: live publish → page on .aem.page and .aem.live)
- Actual: `.aem.page` 200, `.aem.live` 404
- Attempt(s): the initial attempt and the retry both failed with the same values
- Evidence paths: ykk-dsr/hub/results/JOB-ZZ-IDLE-25/evidence/DSR-CATOV-003_en_qa190-cat-pdf-form_live.png (taken right after the run; generic 404 page); test-results/catalog-overlay-DSR-654.ca-8029d-00-on-aem-page-and-aem-live-chromium{,-retry1}/ (trace, error-context). This is an API-only test, so Playwright took no screenshot.

### DSR-CATOV-003 [en] qa190-cat-ebook-form — live-published → 200 on .aem.page and .aem.live

- Failing assertion: `expect.soft(live, '.aem.live').toBe(200)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:105`
- Expected: 200 on `.aem.live`
- Actual: `.aem.page` 200, `.aem.live` 404
- Attempt(s): the initial attempt and the retry both failed
- Evidence paths: ykk-dsr/hub/results/JOB-ZZ-IDLE-25/evidence/DSR-CATOV-003_en_qa190-cat-ebook-form_live.png; test-results/catalog-overlay-DSR-654.ca-ae5a0-00-on-aem-page-and-aem-live-chromium{,-retry1}/

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Classification (assertions not changed): both fails are `cause: overlay-merge`, with a 20% confidence that they are a product bug. This is lower than the 40% in JOB-20261021-02 because the BL-OVL-1 update of 2026-10-21 says only DSR CFs published after 08:25 UTC get a page. These CFs were last modified on 2026-10-20, so a re-publish (Publish → .aem.live) is most likely missing. The AEM publish state was not verified.
- "catalogId vs node name" is checked as row catalogId = last segment of the cf-path (DSR CF node name). The content CF node name is not exposed on the page and was not verified.
- The expected values (titles, catalogType, requiresForm) come from the scaffold fixture (fixtures/dsr-654.ts), not from a TC sheet.
- meta description is the authored placeholder "catelog description" (typo in the data). The test only checks that it is non-empty.
- The ja tests were not run (out of scope; no ja DSR CF per JOB-20261021-01). Build identity was not verified.
