# Run comparison

- Before: `ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json` (start 2026-10-23T03:03:13.421Z) – skipped 48 · passed 189 · failed 20
- After: `/tmp/run669/overlay.json` (start 2026-10-24T02:24:52.012Z) – skipped 41 · passed 208 · failed 8

## Regressed: passed before, failed now (0)

None.

## Fixed: failed before, passed now (4)

| Test | Before | After | After error (first line) |
|---|---|---|---|
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | failed | passed | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | failed | passed | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | failed | passed | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | failed | passed | — |

## Other status changes (skip ↔ pass/fail) (6)

| Test | Before | After | After error (first line) |
|---|---|---|---|
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › ja › DSR-CATV-018 NEW label within 10 days of publishDate | skipped | passed | — |
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › ja › DSR-CATV-019 UPDATE label within 10 days of updateDate | skipped | passed | — |
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › ja › DSR-CATV-020 only NEW when publishDate and updateDate both apply | skipped | passed | — |
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › en › DSR-CATV-018 NEW label within 10 days of publishDate | skipped | passed | — |
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › en › DSR-CATV-019 UPDATE label within 10 days of updateDate | skipped | passed | — |
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › en › DSR-CATV-020 only NEW when publishDate and updateDate both apply | skipped | passed | — |

## New tests (9)

| Test | Before | After | After error (first line) |
|---|---|---|---|
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in sitemap | — | passed | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in sitemap | — | passed | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in sitemap | — | passed | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in sitemap | — | passed | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | — | passed | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) | — | passed | — |
| chromium › movie-detail/DSR-587.movie-overlay.spec.ts › DSR-587 movie detail overlay › DSR-VOV-002 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | — | passed | — |
| chromium › movie-detail/DSR-587.movie-overlay.spec.ts › DSR-587 movie detail overlay › DSR-VOV-008 [en] CF commune unpublished → only data row is unavailable, noindex, browser sent to movie list | — | passed | — |
| chromium › product-detail/DSR-586.product-detail.spec.ts › DSR-586 product detail overlay › DSR-PDO-002 [ja] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | — | passed | — |

## Tests no longer present (9)

| Test | Before | After | After error (first line) |
|---|---|---|---|
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap | failed | — | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap | failed | — | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap | failed | — | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap | failed | — | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live | failed | — | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) | failed | — | — |
| chromium › movie-detail/DSR-587.movie-overlay.spec.ts › DSR-587 movie detail overlay › DSR-VOV-002 [en] preview-only CF related → 200 on .aem.page, 404 on .aem.live | failed | — | — |
| chromium › movie-detail/DSR-587.movie-overlay.spec.ts › DSR-587 movie detail overlay › DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list | failed | — | — |
| chromium › product-detail/DSR-586.product-detail.spec.ts › DSR-586 product detail overlay › DSR-PDO-002 [ja] preview-only CF related → 200 on .aem.page, 404 on .aem.live | skipped | — | — |
