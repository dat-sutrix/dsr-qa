# apply ykk-dsr/hub/author/manifests/REPUBLISH-OVL-20261022.yaml – DRY-RUN (no request sent)

Gates:
- ⛔ AUTHOR_WRITE_ENABLED=1
- ⛔ --apply flag
- ✅ write window Mon–Fri 08:00–18:00 Asia/Saigon (now 2026-10-22T14:10:44.704+07:00)
- ✅ lint: 0 FAIL

Lint FAIL: 0

| # | Op | Request | Target | Keys |
|---|---|---|---|---|
| 1 | skip | – | /content/dam/dsr/en/catalogs/qa190-cat-ebook | dsr-cf en: no field change |
| 2 | skip | – | /content/dam/dsr/en/catalogs/qa190-cat-ebook-form | dsr-cf en: no field change |
| 3 | skip | – | /content/dam/dsr/en/catalogs/qa190-cat-pdf | dsr-cf en: no field change |
| 4 | skip | – | /content/dam/dsr/en/catalogs/qa190-cat-pdf-form | dsr-cf en: no field change |
| 5 | skip | – | /content/dam/dsr/en/catalogs/qa654-content-unpub | dsr-cf en: no field change |
| 6 | skip | – | /content/dam/dsr/en/catalogs/qa654-inactive | dsr-cf en: no field change |
| 7 | skip | – | /content/dam/dsr/en/catalogs/qa654-preview | dsr-cf en: no field change |
| 8 | skip | – | /content/dam/dsr/en/catalogs/qa654-update | dsr-cf en: no field change |
| 9 | skip | – | /content/dam/dsr/en/movies/standard/qa501-main-a | dsr-cf en: no field change |
| 10 | skip | – | /content/dam/dsr/en/movies/standard/qa501-main-b | dsr-cf en: no field change |
| 11 | skip | – | /content/dam/dsr/en/movies/standard/qa557-dam | dsr-cf en: no field change |
| 12 | skip | – | /content/dam/dsr/en/movies/standard/qa587-main | dsr-cf en: no field change |
| 13 | skip | – | /content/dam/dsr/en/movies/standard/qa587-off | dsr-cf en: no field change |
| 14 | skip | – | /content/dam/dsr/en/movies/standard/qa587-r1 | dsr-cf en: no field change |
| 15 | skip | – | /content/dam/dsr/en/movies/standard/qa587-r2 | dsr-cf en: no field change |
| 16 | skip | – | /content/dam/dsr/en/movies/standard/qa587-r3 | dsr-cf en: no field change |
| 17 | skip | – | /content/dam/dsr/en/movies/standard/qa587-r4 | dsr-cf en: no field change |
| 18 | skip | – | /content/dam/dsr/en/movies/standard/qa587-r5 | dsr-cf en: no field change |
| 19 | skip | – | /content/dam/dsr/en/movies/standard/qa587-r6 | dsr-cf en: no field change |
| 20 | skip | – | /content/dam/dsr/en/movies/standard/qa587-rel-a | dsr-cf en: no field change |
| 21 | skip | – | /content/dam/dsr/en/movies/standard/qa587-rel-b | dsr-cf en: no field change |
| 22 | skip | – | /content/dam/dsr/ja/catalogs/qa190-cat-ebook | dsr-cf ja: no field change |
| 23 | skip | – | /content/dam/dsr/ja/catalogs/qa190-cat-ebook-form | dsr-cf ja: no field change |
| 24 | skip | – | /content/dam/dsr/ja/catalogs/qa190-cat-pdf | dsr-cf ja: no field change |
| 25 | skip | – | /content/dam/dsr/ja/catalogs/qa190-cat-pdf-form | dsr-cf ja: no field change |
| 26 | skip | – | /content/dam/dsr/ja/catalogs/qa654-inactive | dsr-cf ja: no field change |
| 27 | skip | – | /content/dam/dsr/ja/movies/standard/qa557-dam | dsr-cf ja: no field change |
| 28 | skip | – | /content/dam/dsr/ja/movies/standard/qa587-main | dsr-cf ja: no field change |
| 29 | replicate:preview dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/en/catalogs/qa654-content-unpub, /content/dam/dsr/en/catalogs/qa654-inactive, /content/dam/dsr/en/catalogs/qa654-preview, /content/dam/dsr/en/catalogs/qa654-update, /content/dam/dsr/en/movies/standard/qa501-main-a, /content/dam/dsr/en/movies/standard/qa501-main-b, /content/dam/dsr/en/movies/standard/qa557-dam, /content/dam/dsr/en/movies/standard/qa587-main, /content/dam/dsr/en/movies/standard/qa587-r1, /content/dam/dsr/en/movies/standard/qa587-r2, /content/dam/dsr/en/movies/standard/qa587-r3, /content/dam/dsr/en/movies/standard/qa587-r4, /content/dam/dsr/en/movies/standard/qa587-r5, /content/dam/dsr/en/movies/standard/qa587-r6, /content/dam/dsr/en/movies/standard/qa587-rel-a, /content/dam/dsr/ja/catalogs/qa654-inactive, /content/dam/dsr/ja/movies/standard/qa587-main | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 30 | replicate:publish dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/en/catalogs/qa190-cat-ebook, /content/dam/dsr/en/catalogs/qa190-cat-ebook-form, /content/dam/dsr/en/catalogs/qa190-cat-pdf, /content/dam/dsr/en/catalogs/qa190-cat-pdf-form, /content/dam/dsr/en/catalogs/qa654-content-unpub, /content/dam/dsr/en/catalogs/qa654-inactive, /content/dam/dsr/en/catalogs/qa654-update, /content/dam/dsr/en/movies/standard/qa501-main-a, /content/dam/dsr/en/movies/standard/qa501-main-b, /content/dam/dsr/en/movies/standard/qa557-dam, /content/dam/dsr/en/movies/standard/qa587-main, /content/dam/dsr/en/movies/standard/qa587-off, /content/dam/dsr/en/movies/standard/qa587-r1, /content/dam/dsr/en/movies/standard/qa587-r2, /content/dam/dsr/en/movies/standard/qa587-r3, /content/dam/dsr/en/movies/standard/qa587-r4, /content/dam/dsr/en/movies/standard/qa587-r5, /content/dam/dsr/en/movies/standard/qa587-r6, /content/dam/dsr/en/movies/standard/qa587-rel-a, /content/dam/dsr/en/movies/standard/qa587-rel-b, /content/dam/dsr/ja/catalogs/qa190-cat-ebook, /content/dam/dsr/ja/catalogs/qa190-cat-ebook-form, /content/dam/dsr/ja/catalogs/qa190-cat-pdf, /content/dam/dsr/ja/catalogs/qa190-cat-pdf-form, /content/dam/dsr/ja/catalogs/qa654-inactive, /content/dam/dsr/ja/movies/standard/qa557-dam, /content/dam/dsr/ja/movies/standard/qa587-main | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
