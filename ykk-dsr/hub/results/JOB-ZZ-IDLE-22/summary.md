# JOB-ZZ-IDLE-22 – DSR-638 path-move impact (DEV, 21/10 06:45–06:54Z)
## Merge/incident-related
None. All 19 fails have cause `none` and were already known before this job: DSR-655 Y3 card links, placeholders.json 404, DSR-583 layout, and PLSP test defects. Details: results/DSR-638/DEV/automation-run-20261021.md.
**Old/new path status** (`ENV=dev node fixtures/dsr-638-path-status.cjs`, 06:45Z; blocks = classes in the raw `<main>`):
| Page | lang | old path | old .page | old .live | old blocks (.live, else .page) | new path | new .page | new .live | new blocks (.live, else .page) | same main block |
|---|---|---|---|---|---|---|---|---|---|---|
| list-catalog | ja | /master/ja/test-space/list-catalog | 200 | 200 | listing | /ja/library/catalog | 404 | 404 | – | n/a |
| list-catalog | en | /master/en/test-space/list-catalog | 200 | 200 | listing | /en/library/catalog | 200 | 200 | listing | yes (listing) |
| video-list | ja | /master/ja/test-space/video-list | 200 | 200 | listing | /ja/library/video/search | 200 | 404 | listing | yes (listing) |
| video-list | en | /master/en/test-space/video-list | 404 | 404 | – | /en/library/video/search | 200 | 404 | listing | n/a |
| product-list | ja | /master/ja/test-space/product-list | 200 | 200 | listing | /ja/product/performance/sustainable/product-index | 200 | 404 | listing | yes (listing) |
| product-list | en | /master/en/test-space/product-list | 404 | 404 | – | /en/product/performance/sustainable/product-index | 200 | 404 | listing | n/a |
| article-list | ja | /master/ja/test-space/article-list | 200 | 200 | listing | /ja/library/article | 200 | 404 | listing | yes (listing) |
| article-list | en | /master/en/test-space/article-list | 404 | 404 | – | /en/library/article | 200 | 404 | listing | n/a |
| actual-cases | ja | /master/ja/test-space/actual-cases | 200 | 200 | title align-center, listing | /ja/product/application/industrial/actual-cases | 200 | 404 | listing | yes (listing) |
| actual-cases | en | /master/en/test-space/actual-cases | 404 | 404 | – | /en/product/application/industrial/actual-cases | 200 | 404 | listing | n/a |
| /{lang}/product-list | ja | /ja/product-list | 200 | 200 | product-list | /ja/product/search | 200 | 404 | product-list | yes (product-list) |
| /{lang}/product-list | en | /en/product-list | 200 | 200 | product-list | /en/product/search | 200 | 404 | product-list | yes (product-list) |
| /{lang}/search-condition | ja | /ja/search-condition | 200 | 200 | product-condition-search | /ja/product/select | 200 | 404 | product-condition-search | yes (product-condition-search) |
| /{lang}/search-condition | en | /en/search-condition | 200 | 200 | product-condition-search | /en/product/select | 200 | 404 | product-condition-search | yes (product-condition-search) |

- **Reading:** the old paths are all still 200, so nothing is broken yet. Of the new ja paths, `/ja/library/catalog` is 404 everywhere (not created yet). The other 6 are on .page only (404 on .live). Where both pages exist, the main block matches. The en counterparts exist on .page under the new structure; the old en test-space pages are mostly 404.
- **Code:** new `fixtures/paths.ts` (one map: old = default, `DSR_PATHS=v2` = new ja path). It is used by `fixtures/dsr-557.ts` (catalogPath), `dsr-570.ts` (listPath), `dsr-583.ts` (primaryPath, plspFallbackPath) and `dsr-589.ts` (listPaths). I also added a read-only probe, `fixtures/dsr-638-path-status.cjs`. No spec file was edited. Specs touched through fixtures: DSR-557.catalog-video, DSR-570.catalog-download, DSR-583.product-list, DSR-583.product-list-sp, DSR-589.icons. tsc: no errors. The default paths resolve to the same values as before (I printed them for ja/en). **No hit:** video-list, article-list, actual-cases and search-condition are not used in tests, fixtures or pages. They are in the map only. DSR-529 (library/article/stories) and DSR-590 (dsr-590-eco-top-page) use no moved path. DSR-587 already uses `/{lang}/library/video/search`. **Not migrated:** `fixtures/dsr-589-inventory.cjs` (a plain-JS tool; it cannot import .ts) still hard-codes `/{lang}/product-list`. The `/master/{lang}/product-list` A1 fallback in 583/589 is not in DSR-638's list, so I left it.
- **Run (default paths):** 72 tests: 30 pass, 19 fail, 23 skip, exit 1. Every fail matches an earlier report, so the refactor caused none of them. One new detail: `/master/ja/test-space/product-list` now renders a `listing` block with 3 cards, and PRODLIST-001 now fails on "≥ 6 products" (it was 1 column on 16/10). **Not done:** `DSR_PATHS=v2` was not run, because the new ja pages are not published on .live. I made no Jira, DASHBOARD or BUGS edits.
