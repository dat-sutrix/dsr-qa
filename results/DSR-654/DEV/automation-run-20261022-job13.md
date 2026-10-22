# DSR-654 DEV automation run — 20261022-job13

## 1. Header

- Run start (UTC): 2026-10-22T08:23:25Z
- Run end (UTC): 2026-10-22T08:28:57Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL = .aem.live; overridden per tier)
- Target page(s): /{ja,en}/library/catalog/qa190-cat-{pdf,pdf-form,ebook,ebook-form}
- Build under test: dsr-eds `main` on DEV after PR #206 (Martin 22/10); application SHA not independently verified
- Baseline ID: BL-OVL-1 + docs/DSR-654/assumptions.md (JOB-14 rules 1–4)
- Automation HEAD commit SHA: 8cc016fbe8b1d69780b2b266e34fde1c3d3bbb1f (spec changes of this job uncommitted in the working tree at run time; committed with this report)
- Job: ykk-dsr/hub/jobs/running/JOB-20261022-13.md
- Exact command(s) used:

```sh
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/654-page.json npm run test:dev -- tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts --grep "DSR-CATOV-0(01|02|16|18) " --project=chromium --output=test-results/j13-654-page
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/654-live.json npm run test:dev -- tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts --grep "DSR-CATOV-0(01|02|16|18) " --project=chromium --output=test-results/j13-654-live
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 42 | 20 | 16 | 6 | 654/page=1, 654/live=1 | 2 | configured 1; actual 16 test(s) retried | 246 s (sum of runs) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (job TCs), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = summed over attempts. Tier = host (.aem.page / .aem.live).

| TC ID | Title | Tier | Result | Duration | One-line failure reason |
|---|---|---|---|---|---|
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | page | passed | 6.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | page | failed | 2.2 s | Error: meta robots / expect(received).not.toContain(expected) // indexOf / Expected substring: not "noindex" |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | page | failed | 12.0 s | Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 PDF form required" |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | page | passed | 0.6 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | page | passed | 6.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | page | failed | 1.0 s | Error: meta robots / expect(received).not.toContain(expected) // indexOf / Expected substring: not "noindex" |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | page | failed | 12.1 s | Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 e-book form" |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | page | passed | 0.5 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | page | passed | 2.3 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | page | passed | 3.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | page | failed | 1.0 s | Error: meta robots / expect(received).not.toContain(expected) // indexOf / Expected substring: not "noindex" |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | page | failed | 11.7 s | Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 PDF form required" |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | page | passed | 0.5 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | page | passed | 5.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | page | failed | 1.1 s | Error: meta robots / expect(received).not.toContain(expected) // indexOf / Expected substring: not "noindex" |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | page | failed | 13.4 s | Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 e-book form" |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | page | passed | 0.6 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | page | passed | 2.0 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | live | passed | 5.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | live | failed | 2.2 s | Error: meta robots / expect(received).not.toContain(expected) // indexOf / Expected substring: not "noindex" |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | live | failed | 15.8 s | Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 PDF form required" |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | live | passed | 1.0 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | live | passed | 9.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | live | failed | 1.9 s | Error: meta robots / expect(received).not.toContain(expected) // indexOf / Expected substring: not "noindex" |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | live | failed | 13.3 s | Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 e-book form" |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | live | passed | 0.5 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | live | passed | 1.5 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | live | passed | 4.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | live | failed | 0.9 s | Error: meta robots / expect(received).not.toContain(expected) // indexOf / Expected substring: not "noindex" |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | live | failed | 11.6 s | Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 PDF form required" |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | live | passed | 0.6 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | live | passed | 5.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | live | failed | 1.1 s | Error: meta robots / expect(received).not.toContain(expected) // indexOf / Expected substring: not "noindex" |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | live | failed | 12.4 s | Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 e-book form" |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | live | passed | 1.1 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | live | passed | 4.0 s | — |

## 5. Skipped tests

| TC ID | Tier | Verbatim skip reason |
|---|---|---|
| DSR-CATOV-018 | page | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-018 | page | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-001 | page | Issue #18: no /cn path on DEV |
| DSR-CATOV-018 | live | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-018 | live | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-001 | live | Issue #18: no /cn path on DEV |

## 6. Failed tests

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (page)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
  155 |         expect.soft(raw.description ?? '', 'meta description').not.toBe('');
  156 |         expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
> 157 |         expect.soft(raw.robots ?? '', 'meta robots').not.toContain('noindex');
      |                                                          ^
```
- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: row requiresForm
expect(received).toBe(expected) // Object.is equality
Expected: "false"
Received: null
  163 |         expect.soft(row(raw.rows, 'catalogId'), 'row catalogId (content CF)').toBe(data.id);
  164 |         expect.soft(row(raw.rows, 'catalogType'), 'row catalogType').toBe(data.catalogType);
> 165 |         expect.soft(row(raw.rows, 'requiresForm'), 'row requiresForm').toBe(String(data.requiresForm));
      |                                                                        ^
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-page/catalog-overlay-DSR-654.ca-53eff-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png, test-results/j13-654-page/catalog-overlay-DSR-654.ca-53eff-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (page)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 124; failing line marked >):
```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 PDF form required"
Received: "catalog pdf form"
Timeout:  5000ms
Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-page/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/j13-654-page/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium/test-failed-1.png

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (page)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
  155 |         expect.soft(raw.description ?? '', 'meta description').not.toBe('');
  156 |         expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
> 157 |         expect.soft(raw.robots ?? '', 'meta robots').not.toContain('noindex');
      |                                                          ^
```
- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: row requiresForm
expect(received).toBe(expected) // Object.is equality
Expected: "false"
Received: null
  163 |         expect.soft(row(raw.rows, 'catalogId'), 'row catalogId (content CF)').toBe(data.id);
  164 |         expect.soft(row(raw.rows, 'catalogType'), 'row catalogType').toBe(data.catalogType);
> 165 |         expect.soft(row(raw.rows, 'requiresForm'), 'row requiresForm').toBe(String(data.requiresForm));
      |                                                                        ^
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-page/catalog-overlay-DSR-654.ca-a755e-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png, test-results/j13-654-page/catalog-overlay-DSR-654.ca-a755e-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (page)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 124; failing line marked >):
```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 e-book form"
Received: "catalog ebook form"
Timeout:  5000ms
Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-page/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/j13-654-page/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium/test-failed-1.png

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (page)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
  155 |         expect.soft(raw.description ?? '', 'meta description').not.toBe('');
  156 |         expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
> 157 |         expect.soft(raw.robots ?? '', 'meta robots').not.toContain('noindex');
      |                                                          ^
```
- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: row requiresForm
expect(received).toBe(expected) // Object.is equality
Expected: "false"
Received: null
  163 |         expect.soft(row(raw.rows, 'catalogId'), 'row catalogId (content CF)').toBe(data.id);
  164 |         expect.soft(row(raw.rows, 'catalogType'), 'row catalogType').toBe(data.catalogType);
> 165 |         expect.soft(row(raw.rows, 'requiresForm'), 'row requiresForm').toBe(String(data.requiresForm));
      |                                                                        ^
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-page/catalog-overlay-DSR-654.ca-42b16-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png, test-results/j13-654-page/catalog-overlay-DSR-654.ca-42b16-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (page)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 124; failing line marked >):
```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 PDF form required"
Received: "catalog pdf form"
Timeout:  5000ms
Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-page/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/j13-654-page/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium/test-failed-1.png

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (page)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
  155 |         expect.soft(raw.description ?? '', 'meta description').not.toBe('');
  156 |         expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
> 157 |         expect.soft(raw.robots ?? '', 'meta robots').not.toContain('noindex');
      |                                                          ^
```
- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: row requiresForm
expect(received).toBe(expected) // Object.is equality
Expected: "false"
Received: null
  163 |         expect.soft(row(raw.rows, 'catalogId'), 'row catalogId (content CF)').toBe(data.id);
  164 |         expect.soft(row(raw.rows, 'catalogType'), 'row catalogType').toBe(data.catalogType);
> 165 |         expect.soft(row(raw.rows, 'requiresForm'), 'row requiresForm').toBe(String(data.requiresForm));
      |                                                                        ^
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-page/catalog-overlay-DSR-654.ca-65f33-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png, test-results/j13-654-page/catalog-overlay-DSR-654.ca-65f33-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (page)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 124; failing line marked >):
```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 e-book form"
Received: "catalog ebook form"
Timeout:  5000ms
Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-page/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/j13-654-page/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium/test-failed-1.png

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (live)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
  155 |         expect.soft(raw.description ?? '', 'meta description').not.toBe('');
  156 |         expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
> 157 |         expect.soft(raw.robots ?? '', 'meta robots').not.toContain('noindex');
      |                                                          ^
```
- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: row requiresForm
expect(received).toBe(expected) // Object.is equality
Expected: "false"
Received: null
  163 |         expect.soft(row(raw.rows, 'catalogId'), 'row catalogId (content CF)').toBe(data.id);
  164 |         expect.soft(row(raw.rows, 'catalogType'), 'row catalogType').toBe(data.catalogType);
> 165 |         expect.soft(row(raw.rows, 'requiresForm'), 'row requiresForm').toBe(String(data.requiresForm));
      |                                                                        ^
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-live/catalog-overlay-DSR-654.ca-53eff-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png, test-results/j13-654-live/catalog-overlay-DSR-654.ca-53eff-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (live)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 124; failing line marked >):
```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 PDF form required"
Received: "catalog pdf form"
Timeout:  5000ms
Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-live/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/j13-654-live/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium/test-failed-1.png

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (live)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
  155 |         expect.soft(raw.description ?? '', 'meta description').not.toBe('');
  156 |         expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
> 157 |         expect.soft(raw.robots ?? '', 'meta robots').not.toContain('noindex');
      |                                                          ^
```
- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: row requiresForm
expect(received).toBe(expected) // Object.is equality
Expected: "false"
Received: null
  163 |         expect.soft(row(raw.rows, 'catalogId'), 'row catalogId (content CF)').toBe(data.id);
  164 |         expect.soft(row(raw.rows, 'catalogType'), 'row catalogType').toBe(data.catalogType);
> 165 |         expect.soft(row(raw.rows, 'requiresForm'), 'row requiresForm').toBe(String(data.requiresForm));
      |                                                                        ^
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-live/catalog-overlay-DSR-654.ca-a755e-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png, test-results/j13-654-live/catalog-overlay-DSR-654.ca-a755e-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (live)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 124; failing line marked >):
```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 e-book form"
Received: "catalog ebook form"
Timeout:  5000ms
Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-live/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/j13-654-live/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium/test-failed-1.png

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (live)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
  155 |         expect.soft(raw.description ?? '', 'meta description').not.toBe('');
  156 |         expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
> 157 |         expect.soft(raw.robots ?? '', 'meta robots').not.toContain('noindex');
      |                                                          ^
```
- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: row requiresForm
expect(received).toBe(expected) // Object.is equality
Expected: "false"
Received: null
  163 |         expect.soft(row(raw.rows, 'catalogId'), 'row catalogId (content CF)').toBe(data.id);
  164 |         expect.soft(row(raw.rows, 'catalogType'), 'row catalogType').toBe(data.catalogType);
> 165 |         expect.soft(row(raw.rows, 'requiresForm'), 'row requiresForm').toBe(String(data.requiresForm));
      |                                                                        ^
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-live/catalog-overlay-DSR-654.ca-42b16-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png, test-results/j13-654-live/catalog-overlay-DSR-654.ca-42b16-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (live)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 124; failing line marked >):
```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 PDF form required"
Received: "catalog pdf form"
Timeout:  5000ms
Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-live/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/j13-654-live/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium/test-failed-1.png

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (live)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
  155 |         expect.soft(raw.description ?? '', 'meta description').not.toBe('');
  156 |         expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
> 157 |         expect.soft(raw.robots ?? '', 'meta robots').not.toContain('noindex');
      |                                                          ^
```
- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 145; failing line marked >):
```
Error: row requiresForm
expect(received).toBe(expected) // Object.is equality
Expected: "false"
Received: null
  163 |         expect.soft(row(raw.rows, 'catalogId'), 'row catalogId (content CF)').toBe(data.id);
  164 |         expect.soft(row(raw.rows, 'catalogType'), 'row catalogType').toBe(data.catalogType);
> 165 |         expect.soft(row(raw.rows, 'requiresForm'), 'row requiresForm').toBe(String(data.requiresForm));
      |                                                                        ^
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-live/catalog-overlay-DSR-654.ca-65f33-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png, test-results/j13-654-live/catalog-overlay-DSR-654.ca-65f33-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (live)

- Failing assertion / message (tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, test at line 124; failing line marked >):
```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 e-book form"
Received: "catalog ebook form"
Timeout:  5000ms
Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
```
- Attempt(s): failed, failed
- Evidence paths: test-results/j13-654-live/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/j13-654-live/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium/test-failed-1.png


Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; failed-test screenshots copied to `ykk-dsr/hub/results/JOB-20261022-13/evidence/`.

## 7. Open points for QA

- Preflight: `requiresForm true` row present on all 4 -form pages × 2 tiers (raw HTML, /tmp/j13/preflight.txt).
- All 16 fails = known JOB-14 items, unchanged: CATOV-002 non-form pages carry robots noindex and omit the requiresForm row (product 40%, Claude decision pending); CATOV-001 -form title = content CF dev sample, not TD-190 (data 0%).
- CATOV-002 og:image assertion passed on all 8 runs (no about:error).
- CATOV-018 stays Pending (A5, DSR-655 Y3 open) – as JOB-14.
