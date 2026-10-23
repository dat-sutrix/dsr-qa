# JOB-20261023-21 – runbook step 6: compare after DSR-669/670/671 deploy (DEV)

Two references, as the job asks:
- **A. Playwright JSON diff** (`node scripts/compare-runs.mjs ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json test-results/overlay-after-669.json`): @overlay before the deploy (03:03Z) vs after (09:28Z).
- **B. Per TC vs `results/REGRESSION/ledger.json`** (REG-1200 + JOB-23-13/-15, every entry ≤ 06:12Z, i.e. before PR #108 merged at 06:49Z). Covers @overlay + the P1 non-overlay specs + smoke.

**Result: 0 regressed (A) · 0 NEW FAIL (B).**

## A. compare-runs.mjs output (verbatim, path of "After" = copy of `test-results/overlay-after-669.json`)

### Run comparison

- Before: `ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json` (start 2026-10-23T03:03:13.421Z) – skipped 48 · passed 189 · failed 20
- After: `/tmp/job2321/a.json` (start 2026-10-23T09:28:09.928Z) – skipped 41 · passed 208 · failed 8

#### Regressed: passed before, failed now (0)

None.

#### Fixed: failed before, passed now (4)

| Test | Before | After | After error (first line) |
|---|---|---|---|
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | failed | passed | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | failed | passed | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | failed | passed | — |
| chromium › catalog-overlay/DSR-654.catalog-overlay.spec.ts › DSR-654 catalog detail overlay › DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | failed | passed | — |

#### Other status changes (skip ↔ pass/fail) (6)

| Test | Before | After | After error (first line) |
|---|---|---|---|
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › ja › DSR-CATV-018 NEW label within 10 days of publishDate | skipped | passed | — |
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › ja › DSR-CATV-019 UPDATE label within 10 days of updateDate | skipped | passed | — |
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › ja › DSR-CATV-020 only NEW when publishDate and updateDate both apply | skipped | passed | — |
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › en › DSR-CATV-018 NEW label within 10 days of publishDate | skipped | passed | — |
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › en › DSR-CATV-019 UPDATE label within 10 days of updateDate | skipped | passed | — |
| chromium › catalog-video/DSR-557.catalog-video.spec.ts › en › DSR-CATV-020 only NEW when publishDate and updateDate both apply | skipped | passed | — |

#### New tests (9)

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

#### Tests no longer present (9)

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

Note on "Tests no longer present / New tests": these are the same 9 tests with new titles (spec titles were updated after JOB-23-07, e.g. CATOV-021 "listed once in query-index" → "non-form page not listed in sitemap"). All 9 now pass.

## B. Per TC vs ledger (key `<TC> [<lang>]`, 213 keys in this job)

| Change | Keys |
|---|---:|
| same status as ledger | 196 |
| fail → pass | 2 (DSR-501-P2/P3 [en] – TC ID collision, see below) |
| pass → skip | 2 (DSR-ARTICLE-011 [ja]/[en] – scope artefact, see below) |
| pass → fail (**NEW FAIL**) | **0** |
| new key (not in ledger) | 13 (DSR-PCF-001…006, 008…012 [ja] skip "Blocked: Author UI"; DSR-538-retest [ja]/[en]) |

- **DSR-501-P2/P3 [en]:** only the `DSR-587.overlay-retest-DSR-647` version ran here (@overlay, pass). The ledger "fail" is the `DSR-173.movie-detail` version (qa501 data, not run). Ledger entry kept unchanged.
- **DSR-ARTICLE-011 [ja]/[en]:** only the listing test ran here (@overlay; skip "Blocked: article list…", same as REG-1200). The ledger "pass" is the og:image test, not run here. Ledger entry kept unchanged.
- The 24 failing keys were all failing in the ledger already (last_pass_at null, except CATOV-001 [en] last pass 2026-10-21T11:40Z, before JOB-23-13/-15 which already failed it).
- No count difference caused a fail (557/583/654 list, query-index, sitemap).
- Improvements: CATOV-002 ja/en (fail → pass) and CATV-018/019/020 ja/en (skip → pass). My guess (not verified): CATOV-002 = the 16 qa190-cat-* pages regenerated by the migration; CATV-018–020 = data that went live with the migration or the passage of time for NEW/UPDATE labels.
