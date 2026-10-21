# DSR-638 DEV automation run — 20261021

JOB-ZZ-IDLE-22: DSR-638 path-move impact. Affected specs (DSR-557, DSR-570, DSR-583, DSR-589) were run once with **default (old) paths** after the paths were moved into `fixtures/paths.ts`. No assertions were changed.

## 1. Header

- Run start (UTC): 2026-10-21T06:46:04Z
- Run end (UTC): 2026-10-21T06:53:35Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/test-space/list-catalog (557, 570), /master/{lang}/test-space/dsr-570-catalog-detail, /master/{lang}/test-space/dsr-173-video-detail, /master/{lang}/test-space/product-list → fallback /master/{lang}/product-list (583), /master/{lang}/product-list → fallback /{lang}/product-list (583 SP, 589)
- Build under test: not independently verified (DEV `main` branch at run time)
- Baseline ID: per-US baselines unchanged (see docs/DSR-557, DSR-570, DSR-583, DSR-589)
- Automation HEAD commit SHA: 189ea403fb66e2e09fef92968833237d96336719 plus the uncommitted fixtures change from this job (it ships in the same commit as this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/idle22.json npm run test:dev -- tests/catalog-video/DSR-557.catalog-video.spec.ts tests/catalog-download/DSR-570.catalog-download.spec.ts tests/product-list/DSR-583.product-list.spec.ts tests/product-list/DSR-583.product-list-sp.spec.ts tests/icons/DSR-589.icons.spec.ts
```

`DSR_PATHS` was not set (default = old paths). Before the run I printed the resolved fixture paths for ja/en: they are identical to the pre-change values.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 72 | 30 | 19 | 23 | 1 | 2 | 1 configured; 19 used (all failed again) | 7.5 min |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (5 spec files); chromium only (the firefox/webkit projects match only DSR-552). Flaky outcomes: 0.

## 4. Executed tests

Duration = per attempt (first + retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders | passed | 5.5s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | passed | 4.3s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | passed | 5.8s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | failed (retry failed again) | 11.5s + 10.7s | form page from card has no form (card → /{lang}/library/catalog/qa190-cat-pdf-form) |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form | failed (retry failed again) | 30.6s + 30.6s | timeout waiting for popup: card links to /{lang}/library/catalog/… page (DSR-655 Y3), not ebookUrl |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | passed | 4.7s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | failed (retry failed again) | 9.6s + 10.5s | form page from card has no form (card → /{lang}/library/catalog/qa190-cat-pdf-form) |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card opens ebookUrl without form | failed (retry failed again) | 30.4s + 30.5s | timeout waiting for popup: card links to /{lang}/library/catalog/… page (DSR-655 Y3), not ebookUrl |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | passed | 3.3s | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | failed (retry failed again) | 7.9s + 8.1s | gated PDF URL delivered to the browser before submit (dm-catalog-list) |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | passed | 5.6s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | passed | 12.8s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | passed | 9.6s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | passed | 8.2s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | failed (retry failed again) | 4.1s + 4.4s | card href = /{lang}/library/catalog/qa190-cat-ebook-form, not ebookUrl (DSR-655 Y3) |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | passed | 4.2s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 4.1s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 5.0s | — |
| DSR-CATV-001 | DSR-CATV-001 no autoplay before click | passed | 6.5s | — |
| DSR-CATV-002 | DSR-CATV-002 YouTube embed src after click (sort-main) | passed | 5.2s | — |
| DSR-CATV-002 | DSR-CATV-002 YouTube embed src after click (long) | passed | 3.9s | — |
| DSR-CATV-006 | DSR-CATV-006 no YouTube/Youku request before interaction | passed | 6.3s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | passed | 7.9s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | passed | 8.8s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | passed | 6.5s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | failed (retry failed again) | 3.3s + 3.6s | card href = /{lang}/library/catalog/qa190-cat-ebook-form, not ebookUrl (DSR-655 Y3) |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | passed | 5.2s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 3.8s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 3.6s | — |
| DSR-CATV-001 | DSR-CATV-001 no autoplay before click | passed | 6.8s | — |
| DSR-CATV-002 | DSR-CATV-002 YouTube embed src after click (sort-main) | passed | 5.7s | — |
| DSR-CATV-002 | DSR-CATV-002 YouTube embed src after click (long) | passed | 5.1s | — |
| DSR-CATV-006 | DSR-CATV-006 no YouTube/Youku request before interaction | passed | 4.2s | — |
| DSR-ICON-006 | DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error | failed (retry failed again) | 7.8s + 6.4s | console error: /placeholders.json 404 |
| DSR-ICON-006 | DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error | failed (retry failed again) | 7.7s + 6.9s | console error: /placeholders.json 404 |
| DSR-PLSP-001 | DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 4.4s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width | failed (retry failed again) | 12.7s + 17.6s | 320: cards overflow their column |
| DSR-PLSP-003 | DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload | failed (retry failed again) | 30.6s + 30.5s | timeout in filter step (known test defect, IDLE-17) |
| DSR-PLSP-005 | DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned | failed (retry failed again) | 8.2s + 9.3s | left aligned: card left 2 vs grid left 0 (known test defect) |
| DSR-PLSP-004 | DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 10.9s | — |
| DSR-PLSP-001 | DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 5.8s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width | failed (retry failed again) | 16.5s + 17.4s | 320: cards overflow their column |
| DSR-PLSP-003 | DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload | failed (retry failed again) | 30.5s + 30.5s | timeout in filter step (known test defect, IDLE-17) |
| DSR-PLSP-005 | DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned | failed (retry failed again) | 3.5s + 4.8s | left aligned: card left 2 vs grid left 0 (known test defect) |
| DSR-PLSP-004 | DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 10.7s | — |
| DSR-PRODLIST-001 | DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | failed (retry failed again) | 5.5s + 7.3s | TD-583-01 ≥ 6 products: received 3 |
| DSR-PRODLIST-002 | DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | failed (retry failed again) | 19.3s + 18.9s | 320: 1 column offset, expected 2 |
| DSR-PRODLIST-003 | DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | failed (retry failed again) | 12.4s + 10.2s | open: 1 column offset, expected 2 |
| DSR-PRODLIST-004 | DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | failed (retry failed again) | 11.2s + 11.3s | 1440: 1 column offset, expected 4 |

## 5. Skipped tests

| TC ID | Title | Verbatim skip reason |
|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [en] catalog detail header renders | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-002 | DSR-CATDL-002 [en] download form fields, labels, consent and button present | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-017 | DSR-CATDL-017 [ja] unknown or missing catalog ID never shows another catalog form | no catalog-ID mechanism on DEV yet: "QA190 PDF form required" card href carries no catalog id; demo form page is not bound to a CF (Ngoc 10/15) |
| DSR-CATDL-016 | DSR-CATDL-016 [en] fixed texts translated (no Japanese) | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-016 | DSR-CATDL-016 [cn] fixed texts translated (Chinese) | cn: no /master/cn (Issue #18) |
| DSR-ICON-001 | DSR-ICON-001 [ja] product detail performance/function icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 | DSR-ICON-002 [ja] product list card icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 | DSR-ICON-003 [ja] condition search option and result icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 | DSR-ICON-004 [ja] no temporary icon (TD-589-06) remains on the target pages | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-001 | DSR-ICON-001 [en] product detail performance/function icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 | DSR-ICON-002 [en] product list card icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 | DSR-ICON-003 [en] condition search option and result icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 | DSR-ICON-004 [en] no temporary icon (TD-589-06) remains on the target pages | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-005 | DSR-ICON-005 [ja] same function uses the same asset on detail, list card and condition search | Blocked: TD-589-04 official icon list |
| DSR-ICON-007 | DSR-ICON-007 [ja] product without function values shows no icon area | blocked-data: TD-589-02 product with 0 function values not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-008 | DSR-ICON-008 [ja] maximum number of icons wraps on SP without overflow or overlap | blocked-data: TD-589-03 product with the most function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 | DSR-ICON-009 [ja] language versions show the same ordered icon set | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 | DSR-ICON-009 [en] language versions show the same ordered icon set | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-PRODLIST-003 | DSR-PRODLIST-003 [en] SP column count stays 2 after scroll, load more, filter and 3 reloads | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 | DSR-PRODLIST-005 [ja] SP odd count (3) and single result (1): last card = column width, left aligned | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-PRODLIST-006 | DSR-PRODLIST-006 [ja] SP card layout vs Figma 375 frame (visual) | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-006 | DSR-PRODLIST-006 [en] SP card layout vs Figma 375 frame (visual) | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-007 | DSR-PRODLIST-007 [ja] Real device iOS Safari / Android Chrome: 2 columns (manual) | Manual TC (real iOS Safari / Android Chrome) – documented only, not automated |

## 6. Failed tests

All 19 fails were already known before this job (see the column "Known since"). Default paths did not change, so the path refactor did not cause any of them. Screenshot evidence for each fail is committed under `ykk-dsr/hub/results/JOB-ZZ-IDLE-22/evidence/<TC>_<lang>.png`. Traces and error-context files are under `test-results/` (gitignored, **not committed**).

| TC | Lang | Failing assertion (file:line) | Expected | Actual | Known since |
|---|---|---|---|---|---|
| DSR-CATDL-006 | ja, en | `expect(form.form).toHaveCount(1)` — tests/catalog-download/DSR-570.catalog-download.spec.ts:101 | 1 form on the page the card opens | 0 (card → /{lang}/library/catalog/qa190-cat-pdf-form, no form) | 20/10 (results/DSR-570/DEV/automation-run-20261020.md) |
| DSR-CATDL-018 | ja, en | test timeout 30 s waiting for the popup — tests/catalog-download/DSR-570.catalog-download.spec.ts:120 | card opens ebookUrl in a popup | no popup: card links to /{lang}/library/catalog/qa190-cat-ebook-form (DSR-655 Y3) | predicted in the 20/10 DSR-570 report (passed only before the Y3 deploy) |
| DSR-CATDL-007 | ja | gated PDF not exposed — tests/catalog-download/DSR-570.catalog-download.spec.ts:187 | [] | the dm-catalog-list response for qa190-cat-pdf-form contains pdfAsset._publishUrl | 16/10 |
| DSR-CATV-017 | ja, en | href = ebookUrl — tests/catalog-video/DSR-557.catalog-video.spec.ts:102 | https://www.ykkfastening.com/ | …aem.live/{lang}/library/catalog/qa190-cat-ebook-form | en 20/10; ja predicted (TC conflicts with DSR-655 Y3) |
| DSR-ICON-006 | ja, en | console errors — tests/icons/DSR-589.icons.spec.ts:107 | [] | "Failed to load resource: … 404" (/placeholders.json) | 19/10 |
| DSR-PLSP-002 | ja, en | overflow — tests/product-list/DSR-583.product-list-sp.spec.ts:45 | [] at 320 px | all cards overflow their column | 20/10 (IDLE-17) |
| DSR-PLSP-003 | ja, en | test timeout in the filter step | — | the locator never matches (known test defect) | 20/10 |
| DSR-PLSP-005 | ja, en | left aligned — tests/product-list/DSR-583.product-list-sp.spec.ts:130 | 0 | 2 (known test defect: card left vs grid border-box) | 20/10 |
| DSR-PRODLIST-001 | ja | `TD-583-01 ≥ 6 products` — tests/product-list/DSR-583.product-list.spec.ts:48 | ≥ 6 | 3 | 16/10 failed (1 column). **The message changed**: the page now has only 3 cards. It now renders a `listing` block, not product-list (see §7) |
| DSR-PRODLIST-002/003/004 | ja | distinct column offsets — tests/product-list/DSR-583.product-list.spec.ts:33 / :70 / :153 | 2 / 2 / 4 | 1 | 16/10 |

## 7. Open points for QA

- **DSR-638 path status** (from `ENV=dev node fixtures/dsr-638-path-status.cjs`, 06:45Z). Every old path is still 200 on .live. Of the new ja paths, `/ja/library/catalog` is **404 on both .page and .live**. The others are 200 on .page only and 404 on .live (previewed, not published). The full table is in ykk-dsr/hub/results/JOB-ZZ-IDLE-22/summary.md.
- Once the old paths go 404, the specs will skip (as blocked-data), not fail: 557 and 570 skip on a catalog page 404, and 583 falls back. The exceptions are 583 SP and 589: they reach `/{lang}/product-list` through their fallback lists. `DSR_PATHS=v2` switches the ja paths to the new ones. It was **not run**, because the new ja pages are not published on .live.
- `/master/ja/test-space/product-list` (DSR-583 primary) now renders a `listing` block. ProductListPage was written against a product-list grid there. This may explain the "3 products" message in PRODLIST-001. Not verified against Author.
- The "same main block" check compares only the block class in the raw EDS HTML. Block configuration rows (query, filters) were not compared.
- Build identity was not verified. Only chromium was used.
