# DSR-654 DEV automation run — 20261021

Job: ykk-dsr/hub/jobs/running/JOB-20261021-02.md (Part B, catalog overlay scaffold). First run of a new spec. All TC IDs are placeholders (`DSR-CATOV-NNN`) until the TC job delivers the sheet.

## 1. Header

- Run start (UTC): 2026-10-21T08:32:40Z
- Run end (UTC): 2026-10-21T08:33:27Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (BASE_URL, envs/dev.env; DSR654_BASE not set)
- Target page(s): `/{ja,en}/library/catalog/{qa190-cat-pdf, qa190-cat-pdf-form, qa190-cat-ebook, qa190-cat-ebook-form}`, `/{ja,en}/library/catalog/search`, plus `.aem.page` for DSR-CATOV-003
- Build under test: not independently verified (EDS main branch as deployed at run time)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md, catalog row)
- Automation HEAD commit SHA: da09f4434bb1cce3d9547932b01dda896f7dded3 (the new spec, fixture and page object were uncommitted working-tree files at run time and are committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job02.json npm run test:dev -- tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 35 | 0 | 2 | 33 | 1 | 1 | configured 1; 2 used (both failures failed again) | 45.7 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (one new spec), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt (initial + retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published → 200 on .aem.page and .aem.live | Fail (proposed) | 1.1s + 1.2s (initial + retry) | `.aem.live` HTTP 404, expected 200 (`.aem.page` 200) |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published → 200 on .aem.page and .aem.live | Fail (proposed) | 1.4s + 1.2s (initial + retry) | `.aem.live` HTTP 404, expected 200 (`.aem.page` 200) |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: overlay page 200, no redirect, catalog title shown — TD-190 qa190-cat-pdf not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: raw HTML head + overlay rows, DSR CF same id as content CF — TD-190 qa190-cat-pdf not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published → 200 on .aem.page and .aem.live — TD-190 qa190-cat-pdf not seeded / not published to this tier (/ja/library/catalog/qa190-cat-pdf HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: overlay page 200, no redirect, catalog title shown — TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: raw HTML head + overlay rows, DSR CF same id as content CF — TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published → 200 on .aem.page and .aem.live — TD-190 qa190-cat-pdf-form not seeded / not published to this tier (/ja/library/catalog/qa190-cat-pdf-form HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: overlay page 200, no redirect, catalog title shown — TD-190 qa190-cat-ebook not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: raw HTML head + overlay rows, DSR CF same id as content CF — TD-190 qa190-cat-ebook not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published → 200 on .aem.page and .aem.live — TD-190 qa190-cat-ebook not seeded / not published to this tier (/ja/library/catalog/qa190-cat-ebook HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: overlay page 200, no redirect, catalog title shown — TD-190 qa190-cat-ebook-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: raw HTML head + overlay rows, DSR CF same id as content CF — TD-190 qa190-cat-ebook-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published → 200 on .aem.page and .aem.live — TD-190 qa190-cat-ebook-form not seeded / not published to this tier (/ja/library/catalog/qa190-cat-ebook-form HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore id → 404 — TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] isActive (表示フラグ) = false → noindex, browser sent to catalog list — isActive=false: no TD id yet (set DSR654_INACTIVE_ID once seeded) |
| DSR-CATOV-006 | DSR-CATOV-006 [ja] unpublished DSR CF → 404 on both hosts, absent from query-index — unpublished: no TD id yet (set DSR654_REMOVED_ID once seeded) |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not an overlay page — catalog/search Sites page not published (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/search HTTP 404) |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] overlay page makes 0 GraphQL requests; html lang — TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: overlay page 200, no redirect, catalog title shown — TD-190 qa190-cat-pdf not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: raw HTML head + overlay rows, DSR CF same id as content CF — TD-190 qa190-cat-pdf not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published → 200 on .aem.page and .aem.live — TD-190 qa190-cat-pdf not seeded / not published to this tier (/en/library/catalog/qa190-cat-pdf HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: overlay page 200, no redirect, catalog title shown — TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: raw HTML head + overlay rows, DSR CF same id as content CF — TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: overlay page 200, no redirect, catalog title shown — TD-190 qa190-cat-ebook not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: raw HTML head + overlay rows, DSR CF same id as content CF — TD-190 qa190-cat-ebook not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published → 200 on .aem.page and .aem.live — TD-190 qa190-cat-ebook not seeded / not published to this tier (/en/library/catalog/qa190-cat-ebook HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: overlay page 200, no redirect, catalog title shown — TD-190 qa190-cat-ebook-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: raw HTML head + overlay rows, DSR CF same id as content CF — TD-190 qa190-cat-ebook-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore id → 404 — TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-005 | DSR-CATOV-005 [en] isActive (表示フラグ) = false → noindex, browser sent to catalog list — isActive=false: no TD id yet (set DSR654_INACTIVE_ID once seeded) |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, absent from query-index — unpublished: no TD id yet (set DSR654_REMOVED_ID once seeded) |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not an overlay page — catalog/search Sites page not published (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/search HTTP 404) |
| DSR-CATOV-008 | DSR-CATOV-008 [en] overlay page makes 0 GraphQL requests; html lang — TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-001 | DSR-CATOV-001 [cn] catalog overlay pages — Issue #18: no /cn path on DEV |

The 1 `fixme` is `DSR-CATOV-001 [cn]`. All other skips are runtime preflight skips: the TD page returned 404 on the tier under test, or there is no TD id for the negative case yet.

## 6. Failed tests

### DSR-CATOV-003 [en] qa190-cat-pdf-form — live-published → 200 on .aem.page and .aem.live

- Failing assertion: `expect.soft(live, '.aem.live').toBe(200)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:105`
- Expected: 200 on `.aem.live` (BL-OVL-1: live publish → page on aem.page + aem.live)
- Actual: `.aem.page` 200, `.aem.live` 404
- Attempt(s): initial fail, retry fail (same values)
- Evidence paths: ykk-dsr/hub/results/JOB-20261021-02/evidence/DSR-CATOV-003_en_qa190-cat-pdf-form_live.png (taken after the run, generic 404 page); test-results/catalog-overlay-DSR-654.ca-8029d-00-on-aem-page-and-aem-live-chromium{,-retry1}/ (trace, error-context; API-only test so there is no Playwright screenshot)

### DSR-CATOV-003 [en] qa190-cat-ebook-form — live-published → 200 on .aem.page and .aem.live

- Failing assertion: `expect.soft(live, '.aem.live').toBe(200)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:105`
- Expected: 200 on `.aem.live`
- Actual: `.aem.page` 200, `.aem.live` 404
- Attempt(s): initial fail, retry fail
- Evidence paths: ykk-dsr/hub/results/JOB-20261021-02/evidence/DSR-CATOV-003_en_qa190-cat-ebook-form_live.png; test-results/catalog-overlay-DSR-654.ca-ae5a0-00-on-aem-page-and-aem-live-chromium{,-retry1}/

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Classification (job: classify, do not fix): both fails are `cause: overlay-merge` with a 40% confidence that they are a product bug. The pages exist on .aem.page, but no overlay page has been live-published (JOB-20261021-01). That may be a missing publish step and not a defect.
- ja skips: data. No ja DSR CF exists for any qa190-cat-* id (JOB-20261021-01: dsr-catalog-page returns 0 items), so all 4 are 404 on both tiers. The en skips for qa190-cat-pdf and qa190-cat-ebook are also 404 on both tiers (not seeded or not previewed).
- The content checks (DSR-CATOV-001/002/004/008) never ran because the default tier is .aem.live. A run with `DSR654_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.page` would exercise them on en pdf-form / ebook-form. It was not run, because the job asked for one run.
- Expected values for the scaffold come from the static HTML of /en/library/catalog/qa190-cat-pdf-form on .aem.page (rows source/cfPath/catalogId/catalogType/requiresForm, meta cf-path, `.catalog-detail-title`, `form.catalog-detail-form`) and from the TD-190 titles in fixtures/dsr-557.ts / dsr-570.ts. They are not checked against a TC sheet. catalogType / requiresForm for ja are assumed to be the same as en.
- No data-testid on catalog-detail; class selectors have `// TODO: data-testid`.
- DSR-CATOV-005/006 need TD ids for isActive=false and an unpublished DSR CF (env `DSR654_INACTIVE_ID` / `DSR654_REMOVED_ID`). Subfolder / outside-/content/dam/dsr cases have no test yet (TODO in spec).
- catalog/search is 404 on .page and .live for ja and en, so DSR-CATOV-007 was skipped. Whether that Sites page should exist is not verified.
