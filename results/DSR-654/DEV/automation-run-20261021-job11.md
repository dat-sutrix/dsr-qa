# DSR-654 DEV automation run — 20261021-job11

Job: ykk-dsr/hub/jobs/running/JOB-20261021-11.md (CATOV 001–021 from the TC sheet `ykk-dsr/hub/tc-out/DSR-654.spec.json`). One read-only preflight run on the `.aem.page` tier, ja + en.

## 1. Header

- Run start (UTC): 2026-10-21T11:40:19Z
- Run end (UTC): 2026-10-21T11:41:33Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page (`DSR654_BASE` override; BASE_URL in envs/dev.env is the .aem.live host, which DSR-CATOV-003/009/010/011/006/021 also use)
- Target page(s): `/{ja,en}/library/catalog/{qa190-cat-pdf, qa190-cat-pdf-form, qa190-cat-ebook, qa190-cat-ebook-form}` (TD-654-01), `/{ja,en}/library/catalog/qa654-inactive` (TD-654-02), `/en/library/catalog/{qa654-removed, qa654-preview, qa654-sub, qa654-folder/qa654-sub, qa654-content-only, qa654-content-unpub}` (TD-654-03..08), `/{ja,en}/library/catalog/search`, `/{ja,en}/library/catalog`, `/query-index.json`, `/sitemap.xml`
- Build under test: not independently verified (EDS main branch as deployed at run time)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md, incl. Update 2026-10-21) + DSR-570/557/655 per TC sheet
- Automation HEAD commit SHA: 8c10193bedc4e29fe9d235b5088d892a1012da88 (spec, fixture and page-object changes were uncommitted working-tree files at run time and are committed with this report)
- Exact command used:

```sh
DSR654_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job11.json npm run test:dev -- tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 62 | 11 | 2 | 49 | 1 | 2 (config) | configured 1; 2 used (both failures failed again) | 72.0 s (reporter); 74 s wall |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (one spec), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt (initial + retry where retried).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | Pass (proposed) | 2.9s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | Pass (proposed) | 2.7s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | Pass (proposed) | 0.9s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | Fail (proposed) | 1.2s + 1.4s | `.aem.live` HTTP 404, expected 200 (`.aem.page` 200) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | Pass (proposed) | 2.8s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | Pass (proposed) | 0.9s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | Fail (proposed) | 1.2s + 1.2s | `.aem.live` HTTP 404, expected 200 (`.aem.page` 200) |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | Pass (proposed) | 0.8s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | Pass (proposed) | 1.1s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | Pass (proposed) | 2.5s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | Pass (proposed) | 1.7s | — |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) | Pass (proposed) | 1.2s | — |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | Pass (proposed) | 0.8s | — |

DSR-CATOV-006 [en], 010 [en] and 011 [en] expect 404; a passing result cannot prove TD-654-03/05/06 are seeded (runtime note annotation). They are passes on the publish tier only.

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page with the catalog name shown — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live — TD-654-01 not seeded (qa190-cat-pdf) (/ja/library/catalog/qa190-cat-pdf HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown — TD-654-01 not seeded (qa190-cat-pdf-form) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id — TD-654-01 not seeded (qa190-cat-pdf-form) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live — TD-654-01 not seeded (qa190-cat-pdf-form) (/ja/library/catalog/qa190-cat-pdf-form HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap — TD-654-01 not seeded (qa190-cat-pdf-form) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page with the catalog name shown — TD-654-01 not seeded (qa190-cat-ebook) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id — TD-654-01 not seeded (qa190-cat-ebook) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live — TD-654-01 not seeded (qa190-cat-ebook) (/ja/library/catalog/qa190-cat-ebook HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap — TD-654-01 not seeded (qa190-cat-ebook) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown — TD-654-01 not seeded (qa190-cat-ebook-form) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id — TD-654-01 not seeded (qa190-cat-ebook-form) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live — TD-654-01 not seeded (qa190-cat-ebook-form) (/ja/library/catalog/qa190-cat-ebook-form HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap — TD-654-01 not seeded (qa190-cat-ebook-form) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list — TD-654-02 not seeded (qa654-inactive) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa654-inactive HTTP 404) |
| DSR-CATOV-006 | DSR-CATOV-006 [ja] unpublished DSR CF → 404 on both hosts, removed from query-index — TD-654-03 exists in en only (A7) |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site — TD-654-01 not seeded (qa190-cat-pdf-form) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → download opens the PDF directly — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed — TD-654-01 not seeded (qa190-cat-pdf-form) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → opens ebookUrl in a new tab without a form — TD-654-01 not seeded (qa190-cat-ebook) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-018 | DSR-CATOV-018 [ja] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl) — TD-654-01 not seeded (qa190-cat-ebook-form) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] catalog detail shows image, name, description, date and type label of the content CF — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-020 | DSR-CATOV-020 [ja] layout PC 1440 / SP 375 vs pre-overlay demo — Visual – codex job |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page with the catalog name shown — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live — TD-654-01 not seeded (qa190-cat-pdf) (/en/library/catalog/qa190-cat-pdf HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap — TD-654-01 not seeded (qa190-cat-pdf-form) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page with the catalog name shown — TD-654-01 not seeded (qa190-cat-ebook) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id — TD-654-01 not seeded (qa190-cat-ebook) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live — TD-654-01 not seeded (qa190-cat-ebook) (/en/library/catalog/qa190-cat-ebook HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap — TD-654-01 not seeded (qa190-cat-ebook) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap — TD-654-01 not seeded (qa190-cat-ebook-form) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list — TD-654-02 not seeded (qa654-inactive) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa654-inactive HTTP 404) |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → download opens the PDF directly — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → opens ebookUrl in a new tab without a form — TD-654-01 not seeded (qa190-cat-ebook) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-018 | DSR-CATOV-018 [en] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl) — Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-019 | DSR-CATOV-019 [en] catalog detail shows image, name, description, date and type label of the content CF — TD-654-01 not seeded (qa190-cat-pdf) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-020 | DSR-CATOV-020 [en] layout PC 1440 / SP 375 vs pre-overlay demo — Visual – codex job |
| DSR-CATOV-009 | DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live — TD-654-04 not seeded (qa654-preview) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa654-preview HTTP 404) |
| DSR-CATOV-013 | DSR-CATOV-013 [en] content CF change shows only after DSR CF republish — Manual – QA-PT |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list — TD-654-08 not seeded (qa654-content-unpub) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa654-content-unpub HTTP 404) |
| DSR-CATOV-001 | DSR-CATOV-001 [cn] catalog overlay pages — Issue #18: no /cn path on DEV |

DSR-CATOV-018 [en] is a Pending (A5) skip, not a data skip: the page rendered the download form for the e-book with requiresForm ON.

## 6. Failed tests

### DSR-CATOV-003 — DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live

- Failing assertion: `expect.soft(live, '.aem.live').toBe(200)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:130`
- Expected: HTTP 200 on both `.aem.page` and `.aem.live` (TC 3.0, BL-OVL-1 Editor action table)
- Actual: `.aem.page` 200, `.aem.live` 404 (same on retry)
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/` trace + `observed` attachment of this test (request-only test, no screenshot)

### DSR-CATOV-003 — DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live

- Failing assertion: `expect.soft(live, '.aem.live').toBe(200)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:130`
- Expected: HTTP 200 on both `.aem.page` and `.aem.live` (TC 3.0, BL-OVL-1 Editor action table)
- Actual: `.aem.page` 200, `.aem.live` 404 (same on retry)
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/` trace + `observed` attachment of this test (request-only test, no screenshot)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Seed state on DEV at run time: only `en/qa190-cat-pdf-form` and `en/qa190-cat-ebook-form` exist, on `.aem.page` only. All ja TD-654-01 ids, en `qa190-cat-pdf` / `qa190-cat-ebook`, and TD-654-02/04/08 return 404 → skipped as "not seeded". TD-654-01 precondition for TC 3.0 is Publish (live); the two 003 fails look like Preview-only data (suspect: data), not verified on Author.
- The live block `blocks/catalog-detail/catalog-detail.js` (read 2026-10-21) sends a non-form catalog straight to its file (`window.location.replace`) and sends `unavailable` pages to the list. Once qa190-cat-pdf / qa190-cat-ebook are seeded, TC 1.0, 12.0 (card href), 15.0, 17.0 and 19.0 (they expect a detail page with a button) will likely fail against the current build; TC sheet vs implementation needs a decision (suspect: test/spec). Not run yet because data is missing.
- `catalog-link.js` comment says DSR-655 Y3 was decided 2026-10-20 (e-book gated by requiresForm like a PDF). TC 18.0 still uses the A5 default → recorded Pending. Not verified against Jira.
- New selectors are class/role based with `// TODO: data-testid` (`.catalog-detail-type` has no element in DEV; download/view link role locator not observable while non-form pages redirect).
- TC 13.0 (Manual – QA-PT) and 20.0 (Visual – codex job) are `test.fixme`; cn rows remain one fixme (Issue #18).
- DSR-CATOV-018 carries the Pending reason twice in the report output (explicit annotation + skip annotation); cosmetic only.
- `/ja|en/library/catalog/search` is 404 on `.aem.page` (TC 7.0 records it; no overlay render seen).
