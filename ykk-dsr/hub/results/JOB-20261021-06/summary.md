# JOB-20261021-06: overlay + 404 smoke after Martin's 21/10 deploy (DEV, read-only), 09:53–09:56Z
## Merge/incident-related
None; every difference from JOB-20261021-01 is an improvement or unchanged (cause `none`).
## Step 1: overlay pages (.page / .live), compared with JOB-21-01
| path | .page | .live | preview entry (source) | vs JOB-21-01 |
|---|---|---|---|---|
| ja/library/video/qa-587-main | 200 | 200 | pv 21/10 08:26:41Z, live 08:25:58Z (json2html main) | same (200 since 08:25Z) |
| en/library/video/qa-587-main | **200** | **200** | pv+live 21/10 08:38:40Z (main) | **fixed**: was 404/404 |
| en/library/catalog/qa190-cat-pdf-form | 200 | 404 | pv 20/10 06:12Z (main), never live | same |
| en/library/catalog/qa190-cat-ebook-form | 200 | 404 | pv 20/10 06:12Z (main), never live | not checked in -01 |
| en/products/46 | 200 | 404 | pv 16/10 (moustache branch), never live | same |
| ja/products/46 | 200 | 404 | pv 20/10 08:38Z (main), never live | same |
No regressions. Live 404s are the same "never published to live" state as before (cause `none`, pre-existing).
## Step 2: 404 handling
- Non-existent ids (`en/library/video/qa-nonexistent-404`, `en/products/999999999`, `en/library/catalog/qa-nonexistent`) return **404 on .page and .live** with `x-error: failed to load …md from content-bus: 404`. The body is the **site 404 template** `/404.html` (2133 B; it loads scripts.js/styles.css and has "Page Not Found", "Go home" → `/`, RUM `404`). It is byte-identical to `/404.html` except for the CSP nonce. It is the same for all 14 404 responses and is not language-specific (`/ja/404`, `/en/404` do not exist).
- The "775 B" 404 recorded in JOB-21-01 was the brotli-compressed size of this same body (br = 775, gzip = 940, raw = 2133), so the 404 page is unchanged.
- isActive OFF: en qa587-rel-a and qa557-dam still have `isActive=false` and no preview entry, so both are 404 with the site 404 page and **no redirect**. The redirect cannot be tested until such a CF is previewed. Observation (not verified end-to-end): json2html main renders inactive or unknown ids as **HTTP 200** with a marker row `unavailable | inactive` / `not-found`. The live block JS (video/product/catalog-detail, scripts.js) contains no handler for that marker, no redirect and no "404". If an inactive CF is previewed, it would probably show as a 200 page instead of redirecting to the list (BL-OVL-1). Confidence that this is a product bug: 50% (redirect may be handled elsewhere; not observed). Goes to the Dat list, not filed.
## Step 3: deploy evidence (public surfaces only)
**No 21/10 change is visible.** Public `config.json` and all 404 responses have last-modified 20/10 11:36:16Z (as in -01). The code-bus `404.html` was last modified 07/09 07:12Z (GitHub dsr-eds main), scripts.js on 19/10, and the detail blocks on 19–20/10. The admin site config needs auth (401), so the "404 config in repo" deploy is not verified.
Method: curl GETs only (EDS, admin.hlx.page status, publish persisted queries, json2html). No POST, login or form submit. No npm test run, so there is no automation-run report and no tsc. Raw: raw/headers.txt, raw/admin-status-all.txt, raw/404-template.txt, raw/public-config.json, raw/j2h_*.html.
