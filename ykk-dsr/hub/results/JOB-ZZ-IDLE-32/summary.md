# JOB-ZZ-IDLE-32 – catalog overlay empty-block diagnosis (DEV, 2026-10-22 02:34–02:38Z, read-only)
## Merge/incident-related (cause ≠ none)
None. BUG-CAT-EMPTY is **not** an overlay-merge product bug. Proposal: close it as data + test; do not file.

| Page (ja+en, .page = .live) | Verdict | Product-bug conf. | Exact cause |
|---|---|---|---|
| qa190-cat-pdf-form | data | 5% | content CF `/content/dam/common/{lang}/catalogs/qa190-cat-pdf-form` `requiresForm: false` (TD expects true) |
| qa190-cat-ebook-form | data | 5% | same CF field: `requiresForm: false` → browser leaves for ebookUrl (final URL ykkdigitalshowroom.com/en/) |
| qa190-cat-pdf | test (+data title ja) | 0% | non-form PDF → code redirects to the PDF by design; CATOV-001/015/019 expect a rendered page |

- **What ran:** curl of 14 URLs, the public persisted query `ykk/dsr-catalog-page` for the 6 CFs, the deployed block JS and cf-templates/catalog.html, plus one headless pass (`diag.cjs`). Detail: `diag.md`; raw data in `raw/` and `browser-diag.json`.
- **Raw HTML:** all 6 pages return 200 on both tiers, with no HTTP redirect, `robots=noindex` and **no `requiresForm` row**. They carry `pdfAsset`/`ebookUrl` rows instead. The template writes those only when requiresForm is falsy. The GraphQL response confirms `requiresForm: false` on all 6.
- **Code** (`catalog-detail.js:153,165-169`): it clears the block, then `!requiresForm(cf)` → `location.replace(file)`. Headless Chromium turns the inline PDF navigation into a download (`net::ERR_ABORTED`), so the tab stays on an empty block. Console shows only the known placeholders.json 404; there are no JS errors.
- **Demo page** `/master/ja/test-space/dsr-570-catalog-detail` has no `source|overlay` row, so it renders the hard-coded MOCK_CATALOG ("AQUASEAL®", 2022.01.20). It is not real data, so a full render there does not show that the overlay path works.
- **Data fix (BUGCHK-190-FORM, already in Night Pack 22/10):** set requiresForm=ON on the 4 `-form` content CFs and apply the TD-190 title/date. ja qa190-cat-pdf catalogTitle is "qa190-cat-pdf". Publish content first, then DSR.
- **Test fix (suspect test):** CATOV-001 (pdf/ebook keys), 015, 017 and 019 should assert a redirect to the file / no page for non-form items. CATOV-019 needs a form-gated TD. CATOV-018 default "no form" conflicts with code "e-book gated like PDF (DSR-655 Y3, decided 2026-10-20)", while hub us/DSR-654.md B3 lists Y3 as Open. Claude to decide.
- **Caveats:** I did not access Author. The gated render path is unverified, because no CF currently has requiresForm=true. Headed-browser PDF behaviour was not checked. The block JS was redeployed at 01:48:45Z, after IDLE-30. No npm suite ran, so there is no run report and no tsc run.
- Evidence: evidence/DSR-654/DEV/diag-20261022/ (11 PNG, 440 KB). I removed the 3 ebook screenshots of the external ykkdigitalshowroom.com site (2 MB each); `browser-diag.json` keeps their redirect chain.
