# JOB-ZZ-IDLE-30 – DSR-638 URL move check (read-only HTTP, DEV)

## Old vs new paths (fixtures/dsr-638-path-status.cjs)

Checked (UTC): 2026-10-22T01:39:20.398Z · https://main--dsr-eds-dev--sutrix-projects.aem.page / https://main--dsr-eds-dev--sutrix-projects.aem.live

| Page | lang | old path | old .page | old .live | old blocks (.live, else .page) | new path | new .page | new .live | new blocks (.live, else .page) | same main block |
|---|---|---|---|---|---|---|---|---|---|---|
| list-catalog | ja | /master/ja/test-space/list-catalog | 200 | 200 | listing | /ja/library/catalog | 404 | 404 | – | n/a |
| list-catalog | en | /master/en/test-space/list-catalog | 200 | 200 | listing | /en/library/catalog | 200 | 200 | listing | yes (listing) |
| video-list | ja | /master/ja/test-space/video-list | 200 | 200 | listing | /ja/library/video/search | 200 | 200 | video-detail | no (listing vs video-detail) |
| video-list | en | /master/en/test-space/video-list | 404 | 404 | – | /en/library/video/search | 200 | 200 | video-detail | n/a |
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

## Spec base paths (/tmp probe, same method: fetch, redirect manual)

Checked (UTC): 2026-10-22T01:12:14.019Z
| Spec / use | path | .page | .live |
|---|---|---|---|
| smoke | /master/en/test-space/dsr-173-video-detail | 200 | 200 |
| DSR-173 | /master/en/test-space/dsr-173-video-detail | 200 | 200 |
| DSR-501 (587 retest) | /master/en/test-space/qa501-a | 200 | 200 |
| DSR-529 | /master/ja/library/article/stories/qa529-01 | 200 | 200 |
| DSR-529 | /master/en/library/article/stories/qa529-01 | 200 | 200 |
| DSR-529 idle27 | /ja/library/article/stories/qa529-01 | 404 | 404 |
| DSR-552 | /master/ja/test-space/dsr552-bc/child/grandchild | 200 | 200 |
| DSR-552 | /master/en/test-space/dsr552-bc/child/grandchild | 200 | 200 |
| DSR-557/570 list (v1) | /master/ja/test-space/list-catalog | 200 | 200 |
| DSR-557/570 list (v1) | /master/en/test-space/list-catalog | 200 | 200 |
| DSR-557/570 list (v2 ja) | /ja/library/catalog | 404 | 404 |
| DSR-570 form | /master/ja/test-space/dsr-570-catalog-detail | 200 | 200 |
| DSR-566 | /master/ja/test-space/dsr-357-news-detail | 404 | 404 |
| DSR-566 | /master/en/test-space/dsr-357-news-detail | 200 | 200 |
| DSR-583 primary (v1) | /master/ja/test-space/product-list | 200 | 200 |
| DSR-583 primary (v1) | /master/en/test-space/product-list | 404 | 404 |
| DSR-583 primary (v2 ja) | /ja/product/performance/sustainable/product-index | 200 | 404 |
| DSR-583 fallback / PLSP | /master/ja/product-list | 404 | 404 |
| DSR-583/589 fallback (v1) | /ja/product-list | 200 | 200 |
| DSR-583/589 fallback (v2 ja) | /ja/product/search | 200 | 404 |
| DSR-587 list | /ja/library/video/search | 200 | 200 |
| DSR-587 list | /en/library/video/search | 200 | 200 |
| DSR-587 tech-talk | /en/library/video/tech-talk | 404 | 404 |
| DSR-590 | /master/ja/test-space/dsr-590-eco-top-page | 200 | 200 |
| DSR-654 list | /en/library/catalog | 200 | 200 |
| DSR-654 search | /en/library/catalog/search | 404 | 404 |
| DSR-654 search | /ja/library/catalog/search | 404 | 404 |
| DSR-638 article list (v2 ja) | /ja/library/article | 200 | 404 |
| DSR-638 actual-cases (v2 ja) | /ja/product/application/industrial/actual-cases | 200 | 404 |
| DSR-638 select (v2 ja) | /ja/product/select | 200 | 404 |
