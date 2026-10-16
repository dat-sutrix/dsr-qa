# DSR-570 test data (DEV)

From `DSR-570.spec.json` (testdata). Read-only; agents never edit CFs or pages.

| TD | TCs | Purpose | Path | Field | ja | en | cn | QA-PT to create |
|---|---|---|---|---|---|---|---|---|
| TD-570-01 | 1.0–4.0, 14.0–17.0, 19.0 | Catalog detail demo page | /master/{lang}/test-space/dsr-570-catalog-detail | page | exists (dev) | copy of ja → create | — (no /master/cn) | en: Yes |
| TD-570-02 | 5.0 | Catalog CF requiresForm=false | /content/dam/dsr/{lang}/catalogs/qa-190-cat-pdf | requiresForm | false | false | — | No (exists qa190) |
| TD-570-03 | 6.0, 7.0, 10.0 | Catalog CF requiresForm=true | /content/dam/dsr/{lang}/catalogs/qa-190-cat-pdf-form | requiresForm | true | true | — | No (exists qa190) |
| TD-570-04 | 18.0 | e-book CF requiresForm=true | /content/dam/dsr/{lang}/catalogs/qa-190-cat-ebook-form | type / requiresForm / ebookUrl | ebook / true / https://www.ykkfastening.com/ | same | — | No (fix ebookUrl 16/10) |
| TD-570-05 | 8.0 | New catalog CF (default check) | /content/dam/dsr/ja/catalogs/qa-192-cat-default | title / pdfAsset | QA192 default / any QA PDF | — | — | Yes |
| TD-570-06 | 9.0 | Toggle CF | /content/dam/dsr/ja/catalogs/qa-192-cat-toggle | title / type / requiresForm / pdfAsset / publishDate | QA192 toggle / pdf / true / qa190-catalog-sample.pdf / 2026-10-01 | — | — | Yes |
| TD-570-07 | 11.0–13.0 | Form input values | form page | company / name / email / country | Sutrix QA / QA Test / qa570+YYYYMMDD@sutrix.com / Japan | — | — | At run time |

## Observed on DEV 2026-10-16 (JOB-20261016-12)

- `/master/ja/test-space/dsr-570-catalog-detail` 200. Block `catalog-detail` authored with `catalogid-02`; shows demo catalog "AQUASEAL® 製品カタログ", 2022.01.20, STANDARD CATALOG. `?id=999999` → same page, same catalog (no ID binding).
- `/master/en/test-space/dsr-570-catalog-detail` 404 (TD-570-01 en copy not created).
- `/master/{ja,en}/test-space/list-catalog` 200; data from `ykk/dm-catalog-list` GraphQL.
- Actual CF paths differ from the TD sheet: `/content/dam/ykk/common/product-cf/test/qa-190-cat-pdf` (catalogId `qa190-cat-pdf`), `/content/dam/ykk/common/product-cf/test/qa190-cat-pdf-form`, `/content/dam/ykk/common/product-cf/test/qa190-cat-ebook-form` (catalogId `"qa190-cat-ebook-form  "` with 2 trailing spaces).
- `QA190 PDF form required` (requiresForm=true) is in the GraphQL response with `pdfAsset` but is not rendered as a card (ja, en).
- `QA190 e-book form` is rendered; ebookUrl `https://www.ykkfastening.com/` (fix applied), which redirects to `https://ykkdigitalshowroom.com/?utm_source=ykkfastening…`.
- All QA190 PDF CFs share one asset: `/content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf`. A distinct PDF for `qa190-cat-pdf-form` would make 007 unambiguous.
