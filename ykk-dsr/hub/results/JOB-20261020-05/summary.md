# JOB-20261020-05 – catalog overlay inventory (DEV, read-only) + CATDL/CATV rerun
Only **en/qa190-cat-pdf-form** exists in the new structure (DSR CF `/content/dam/dsr/en/catalogs/…`). It is on .aem.page only and has **not been published to .live**. Every other id/lang pair returns 404 on both hosts, and `dsr-catalog-page` returns 0 items for them. The list cards still come from the old content CFs (`dm-catalog-list`, `/content/dam/ykk/common/product-cf/test/…`), which are not language-scoped, so every card shows in ja and en. `/{lang}/library/catalog/search` returns 404, as does `/ja/library/catalog`. Raw data is in inventory.md.

| id | ja .page/.live | en .page/.live | list card ja/en |
|---|---|---|---|
| qa190-cat-pdf-form | 404/404 | **200/404** | yes/yes |
| qa190-cat-pdf, -ebook, -ebook-form, -new-0, -new-10, -new-11, -upd-0, -upd-10, -upd-11, -both, -noupd (11 ids) | 404/404 | 404/404 | yes/yes |

**MISSING (QA must create):** ja: all 12 (qa190-cat-pdf, -pdf-form, -ebook, -ebook-form, -new-0, -new-10, -new-11, -upd-0, -upd-10, -upd-11, -both, -noupd); en: the 11 above except -pdf-form. Also **publish** en/qa190-cat-pdf-form to .live.

Rerun on .live: DSR-570 had 8 pass, 3 fail, 5 skip. DSR-557 had 21 pass, 1 fail.
- CATDL-006 ja/en: **merge-expected/data**. The card correctly links to `/{lang}/library/catalog/qa190-cat-pdf-form`, but that page is 404 on .live.
- CATV-017 en: **merge-expected, so the TC is outdated (suspect: test)**. DSR-655 Y3 (deployed ~05:52–05:56Z) now gates e-books with requiresForm=true, so the card goes to `/en/library/catalog/qa190-cat-ebook-form` instead of ebookUrl. CATV-017 ja and CATDL-018 ja/en passed only because they ran before the deploy, and they will fail on the next run.
- CATDL-007 ja: **product, not merge-related**. The gated PDF URL is in the dm-catalog-list response, as it has been since 16/10. The new code says "PDF public, DSR-655 Y4", so this may need a TC decision.
- CATDL-017 skips because the catalog id is now a path segment, not a query parameter. The test needs an update.
- Caveat: the 557 run cleaned `test-results/`, which deleted the 570 JSON and its screenshots. The 570 results come from the list log, and its skip reasons were reconstructed.
