# JOB-20261016-12 – DSR-570 catalog download spec on DEV, ja + en

**Final run (rerun2): 16 tests, 7 passed, 1 failed, 8 skipped. tsc: no errors. Exit code 1 (007 failed).** Three runs were needed; runs 1–2 failed 018 because of a test defect that has now been fixed.
- **Passed:** 001 ja, 002 ja, 003 ja, 005 ja/en, 018 ja/en.
  - 002 checks structure only (A2). There are 2 required consent checkboxes; only `consent_store` mentions 個人情報.
  - 003 passes via `required`. The button is not disabled and was never clicked.
- **Failed, 007 ja (suspect product):** the list page's `dm-catalog-list` GraphQL response delivers `pdfAsset._publishUrl` for `qa190-cat-pdf-form` (requiresForm=true), which is the gated PDF URL. The form page itself is clean.
  - Caveat: all QA190 PDF CFs share `qa190-catalog-sample.pdf`, so a distinct PDF for the form CF would make this check unambiguous.
- **Blocked-data:**
  - en form page returns 404 (001/002/016 en).
  - The "QA190 PDF form required" card is in the GraphQL response but not rendered (006 ja/en, 010). This is DSR-570 CF integration; verdict Pending.
  - 010: the demo page has no catalog ID in the URL and 0 hidden inputs, as expected before HubSpot.
- **Skipped:**
  - 017: there is no catalog-ID mechanism yet. The demo page with `?id=999999` returns 200 and shows the same demo catalog.
  - 016 cn: fixme (Issue #18).
- **018:** the e-book form card links straight to ebookUrl `https://www.ykkfastening.com/` with `_blank`. That site then redirects to ykkdigitalshowroom.com.
- **TD sheet mismatch:** the CF paths are actually under `/content/dam/ykk/common/product-cf/test/`, and the `qa190-cat-ebook-form` catalogId has 2 trailing spaces.
- **Reports:** `results/DSR-570/DEV/automation-run-20261016{,-rerun,-rerun2}.md`. Evidence: `evidence/DSR-CATDL-007_ja.png`.
