# JOB-ZZ-IDLE-35 – nightly DEV regression 22/10 (run 09:13–09:37Z, .aem.live) vs JOB-ZZ-IDLE-30
**Merge/incident-related:** none. Every fail has cause `none`, following JOB-13/14. The overlay catalog/video fails tagged "overlay auto-gen" in IDLE-30 are now fixed, or now carry JOB-14 tags.
- **What ran:** `npm run test:dev`, all projects. 541 tests (IDLE-30 had 461; +80 come from the JOB-13/14/16 spec changes): **281 pass, 63 fail, 197 skip**, 0 flaky, exit 1. tsc had no errors. Report: results/regression/DEV/automation-run-20261022-idle35.md.
- **Newly passing:** VOV-003 ja/en, VOV-011 ja/en, VOV-013 en (og:image fix + video/search listing). CATOV-002/021 for the -form pages ja/en (8), CATOV-016 ja/en, re-baselined CATOV-001 (pdf/ebook)/015/017/019, CATV-017, CATDL-018. CATDL-001/002/006/010 and CATOV-005/014 now pass (they were skipped while the list was empty). ARTICLE-011 og:image ja/en passes. All new og:image sweep / isActive / VCAP / DSR-590 capture tests pass or skip.
- **Now skip (were fail/pass):** CATOV-018 ja/en (Pending A5) · ECO-002/004 ja (demo data) · CATV-018..020 (QA190 NEW/UPD data blocked).

| Newly failing | Was | Symptom | suspect | conf. bug | Evidence |
|---|---|---|---|---|---|
| DSR-NEWS-001/004 en | pass | en test page republished 22/10 01:47:14Z: news-detail block has only a `news` row, no `.news-detail-category` and no category meta | data | 40% | evidence/DSR-NEWS-001_en.png |
| DSR-ECO-005 ja | skip (404) | C15 demo detail page is now 200: hero has no tag element | data (demo) | 30% | evidence/DSR-ECO-005_ja.png |
| DSR-ECO-006 ja | skip (404) | free area is a `text` block; locator `[class*="free"], .default-content-wrapper` finds nothing | test | 20% | evidence/DSR-ECO-006_ja.png |
| DSR-CATDL-007 ja | skip (list empty) | `dsr-catalog-list` exposes pdfAsset._publishUrl for qa190-cat-pdf-form (same as JOB-14) | product | 70% | evidence/DSR-CATDL-007_ja.png |
| DSR-CATDL-016 en | skip | en form labels, options and consent in Japanese (same as JOB-14) | product | 70% | evidence/DSR-CATDL-016_en.png |
| DSR-CATOV-012 ja / CATOV-009 en | skip | no card 'QA190 PDF catalog' (TD-190 title) / .page preview lacks 'QA654 preview' (same as JOB-14) | test / product | 0% / 50% | evidence/DSR-CATOV-012_ja.png |

- **Still failing (55):** CATOV-002/021 for non-form pdf/ebook ja/en (noindex + no sitemap, 40%) · CATOV-001 -form title (data 0%) · CATOV-012 en · ARTICLE-012/014/016/024 ja+en, 023 ja · NEWS-002/003/006/007/012/018 en · TOP-004..007 ja/en · PRODLIST-001..004 ja · PLSP-002/003/005 ja/en · ICON-006 ja/en (console 404) · MOVIE-014 en, 026, 033, 501-P2/P3 · BREAD-032 firefox/webkit. Reasons match IDLE-30 / JOB-14.
- **Known (skip):** 566 pages are not authored yet. NEWS ja still gets 404 and stays skipped. The catalog list serves `dsr-catalog-list`, and CATDL/CATOV list TCs ran against it.
- **Caveats:** cause and % are my inference from raw HTML, Last-Modified headers and hub notes. I did not check Author, Jira or the deploy log. Both NEWS en and the ECO demo page show the same 01:47:14Z Last-Modified, which may point to a bulk republish (not verified). DASHBOARD/BUGS were not edited (agent lane). Evidence: 8 PNG, 1.6 MB.
