# JOB-20261020-05 – catalog overlay inventory (DEV, read-only), raw data

Collected 2026-10-20 05:49–05:57 UTC with curl (static HTML), plain GETs of the persisted query, and Playwright (Chromium, 1440×900) for the rendered list pages. No form was submitted. Screenshots were taken locally under /tmp and are not committed (hub rule: evidence/ is for failed tests only).

## Step 1 – detail pages `/{lang}/library/catalog/{id}`

| id | lang | .aem.page | .aem.live | `<title>` | h1 (static) | h1 (rendered) | PDF link / form |
|---|---|---|---|---|---|---|---|
| qa190-cat-pdf-form | en | **200** | 404 | QA190 PDF form required \| YKK DIGITAL SHOWROOM | QA190 PDF form required | `Product Catalog` (block heading; title shown in `.catalog-detail-title`) | form: 1, PDF link: none (expected for gated). Static rows: source=overlay, cfPath=/content/dam/dsr/en/catalogs/qa190-cat-pdf-form, catalogType=pdf, requiresForm=true, publishDate=2026-09-15, related cq:lastModified 2026-10-20T05:34:54.230Z, no pdfAsset row |
| all other 23 id/lang pairs | ja, en | 404 | 404 | Page not found | – | – | – |

- `last-modified` was `Tue, 20 Oct 2026 05:43:36 GMT` on every response, including the 404s. It looks like a site-wide value and does not identify individual pages.
- `qa190-cat-pdf-form` en `.page` is canonical to `https://dev-eds.ykkdigitalshowroom.com/en/library/catalog/qa190-cat-pdf-form`, with `x-robots-tag: noindex, nofollow`.

## Step 2 – persisted query

- Detail page (from `blocks/catalog-detail/catalog-detail.js`): `GET {publish}/graphql/execute.json/ykk/dsr-catalog-page;path={cfPath}`. Publish host: `https://publish-p192812-e2014374.adobeaemcloud.com`. The page itself only carries `cfPath` (meta `cf-path` and the block row). The query is fetched only after the form has been sent.
- Result for `path=/content/dam/dsr/{lang}/catalogs/{id}` (24 GETs, all HTTP 200):
  - en/qa190-cat-pdf-form: 1 item. DSR CF `/content/dam/dsr/en/catalogs/qa190-cat-pdf-form` points to content CF `/content/dam/ykk/common/product-cf/test/qa190-cat-pdf-form` (pdfAsset `/content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf`, requiresForm=true).
  - The other 23 pairs return `related.items = []` (no DSR CF).
- Content CFs referenced are under `/content/dam/ykk/common/product-cf/test/…`, **not** `/content/dam/common/{lang}/catalogs/…`. The only CFs under `/content/dam/common/{ja,en}/catalogs/` are `dm-catalog-1` and `dm-catalog-10` (non-QA).
- List pages use `ykk/dm-catalog-list`. It returns 18 items: 6 non-QA, plus all 12 qa190 content CFs from `/content/dam/ykk/common/product-cf/test/` (note `qa190-cat-pdf` lives at `…/test/qa-190-cat-pdf`). The query is not language-scoped, and both ja and en get the same 18.

## Step 3 – list pages

| page | .page | .live | cards | qa190 cards |
|---|---|---|---|---|
| /master/ja/test-space/list-catalog | 200 | 200 | 18 | all 12 |
| /master/en/test-space/list-catalog | 200 | 200 | 18 | all 12 |
| /en/library/catalog | 200 | 200 | 18 | all 12 |
| /ja/library/catalog | 404 | 404 | – | – |
| /{ja,en}/library/catalog/search | 404 | 404 | – | – |

Card targets on .live at 05:57Z, identical for ja and en except the language prefix:
- Form-gated cards go to the detail page: `QA190 PDF form required` → `/{lang}/library/catalog/qa190-cat-pdf-form`, and `QA190 e-book form` → `/{lang}/library/catalog/qa190-cat-ebook-form`. Both targets return 404 on .live, apart from en/pdf-form on .page.
- `QA190 e-book` → `https://www.ykkfastening.com/`.
- The other 9 qa190 cards → `…/test/qa190-catalog-sample.pdf`.
- At 05:51–05:52Z the ebook-form card still linked to `https://www.ykkfastening.com/` on all 6 rendered list pages (.page and .live). The deployed `scripts/catalog-link.js` now says: "An e-book … is now gated like a PDF (DSR-655 Y3, decided 2026-10-20)". The front-end change landed between ~05:52 and ~05:56Z (CATDL-018 [en] still passed during the 570 run, and CATV-017 [en] failed at ~05:56).
