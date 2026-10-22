# JOB-ZZ-IDLE-30 – daily DEV regression 22/10 (run 01:11–01:35Z, .aem.live) vs JOB-ZZ-IDLE-28
## Merge/incident-related (cause ≠ none)
| Test | Symptom | cause | conf. | Evidence |
|---|---|---|---|---|
| DSR-VOV-003 ja/en | qa587-main now live, but `og:image content="about:error"` | overlay auto-gen | 75% | evidence/DSR-VOV-003_ja.png |
| DSR-VOV-011 ja/en, VOV-013 en | /library/video/search is now 200 (republished 22/10 01:04Z) but renders `video-detail` + noindex, with no listing | overlay auto-gen | 65% / 50% | evidence/DSR-VOV-011_ja.png |
| DSR-CATOV-001, 015–019 ja/en (22 tests) | catalog pages now 200 on both tiers (published 21/10 ~14:20Z), but the catalog-detail block renders empty: no title, no fields, no button | overlay auto-gen | 70% | evidence/DSR-CATOV-001_en.png, DSR-CATOV-019_en.png |
| DSR-CATOV-012 en / 021 ×8 | list card links to the DAM PDF, not the overlay page; catalog pages are not in sitemap | overlay auto-gen | 60% / 50% | evidence/DSR-CATOV-012_en.png |
| DSR-CATOV-002 ×8 | `<title>` = CF title "catalog pdf" ≠ TD-190 "QA190 PDF catalog" | data Night 21/10 | 20% (data) | result.json |
| DSR-ARTICLE-016 ja / 023 ja | qa529-01 ja noindex is gone, but qa529-02 has no robots meta; related block (282 px) still shown when empty | data Night 21/10 | 40% / 50% | evidence/DSR-ARTICLE-016_ja.png, 023_ja.png |

- **What ran:** `npm run test:dev`, all projects. 461 tests: 179 pass (1 flaky: CATDL-014), 86 fail, 196 skip, exit 1. tsc had no errors. Report: results/regression/DEV/automation-run-20261022-idle30.md.
- **Fixed by data Night 21/10:** ARTICLE-002/006/028 ja+en, VOV-001/014/015/018, 501-P3, ASSET-016, and CATOV-003/004/006/007/008/010/011 now pass.
- **Changed, cause none:** CATDL-006/007/010/018 and CATV-017 are now skipped as blocked-data, because the new spec preflight finds requiresForm=false in the content CF. MOVIE-014 en fails at an earlier step after a spec change (suspect test). PLSP-005 ja hits a 30 s timeout.
- **Article fix merge:** it changed no result since IDLE-28. **Unchanged:** 42 fails are the same as IDLE-28 (NEWS, TOP, PRODLIST/PLSP, ECO, ICON, ARTICLE-011/012/014/024, MOVIE-026/033, BREAD-032 ff/webkit).
- **DSR-638 URL move** (dsr638-paths.md): no spec base path broke yet. All ja old test-space and list paths are still 200 and the run used v1.
  - New ja paths: `/ja/library/catalog` is 404 on both tiers. product-index, `/ja/library/article`, actual-cases, `/ja/product/search` and `/ja/product/select` are 200 on .aem.page only (404 on .live). `/ja/library/video/search` is 200 but has no listing.
  - With DSR_PATHS=v2, these would break: DSR-557 + DSR-570 (catalog list), DSR-583 (primary + fallback), DSR-589 (both list paths 404). DSR-587 VOV-011/013 already break (video/search lost its listing).
  - Other 404s, not caused by 638: DSR-566 ja news, /master/ja/product-list (583/589), the DSR-529 idle27 capture /ja/library/article/stories/*, video/tech-talk and catalog/search.
- **Caveats:** cause and confidence are my inference from Last-Modified headers and hub notes. I did not check Author or Jira. I did not use pkill. DASHBOARD/BUGS were not edited.
