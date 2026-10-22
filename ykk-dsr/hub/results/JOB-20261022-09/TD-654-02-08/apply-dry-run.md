# apply ykk-dsr/hub/author/manifests/TD-654-02-08.yaml – DRY-RUN (no request sent)

Gates:
- ⛔ AUTHOR_WRITE_ENABLED=1
- ⛔ --apply flag
- ✅ write window Mon–Fri 08:00–18:00 Asia/Saigon (now 2026-10-22T11:48:00.981+07:00)
- ✅ lint: 0 FAIL

Lint FAIL: 0

| # | Op | Request | Target | Keys |
|---|---|---|---|---|
| 1 | create (ja) | POST `/adobe/sites/cf/fragments` | /content/dam/common/ja/catalogs/qa654-inactive | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.catalogId, fields.catalogTitle, fields.description, fields.catalogCategories, fields.thumbnail, fields.catalogType, fields.pdfAsset, fields.requiresForm, fields.publishDate |
| 2 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/catalogs/qa654-inactive | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.catalogId, fields.catalogTitle, fields.description, fields.catalogCategories, fields.thumbnail, fields.catalogType, fields.pdfAsset, fields.requiresForm, fields.publishDate |
| 3 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/catalogs/qa654-preview | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.catalogId, fields.catalogTitle, fields.description, fields.catalogCategories, fields.thumbnail, fields.catalogType, fields.pdfAsset, fields.requiresForm, fields.publishDate |
| 4 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/catalogs/qa654-content-only | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.catalogId, fields.catalogTitle, fields.description, fields.catalogCategories, fields.thumbnail, fields.catalogType, fields.pdfAsset, fields.requiresForm, fields.publishDate |
| 5 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/catalogs/qa654-update | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.catalogId, fields.catalogTitle, fields.description, fields.catalogCategories, fields.thumbnail, fields.catalogType, fields.pdfAsset, fields.requiresForm, fields.publishDate |
| 6 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/catalogs/qa654-content-unpub | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.catalogId, fields.catalogTitle, fields.description, fields.catalogCategories, fields.thumbnail, fields.catalogType, fields.pdfAsset, fields.requiresForm, fields.publishDate |
| 7 | create (ja) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/ja/catalogs/qa654-inactive | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.catalog |
| 8 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/en/catalogs/qa654-inactive | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.catalog |
| 9 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/en/catalogs/qa654-preview | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.catalog |
| 10 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/en/catalogs/qa654-update | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.catalog |
| 11 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/en/catalogs/qa654-content-unpub | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.catalog |
| 12 | replicate:preview content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/ja/catalogs/qa654-inactive, /content/dam/common/en/catalogs/qa654-inactive, /content/dam/common/en/catalogs/qa654-preview, /content/dam/common/en/catalogs/qa654-content-only, /content/dam/common/en/catalogs/qa654-update | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 13 | replicate:preview dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/ja/catalogs/qa654-inactive, /content/dam/dsr/en/catalogs/qa654-inactive, /content/dam/dsr/en/catalogs/qa654-preview, /content/dam/dsr/en/catalogs/qa654-update, /content/dam/dsr/en/catalogs/qa654-content-unpub | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 14 | replicate:publish content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/ja/catalogs/qa654-inactive, /content/dam/common/en/catalogs/qa654-inactive, /content/dam/common/en/catalogs/qa654-preview, /content/dam/common/en/catalogs/qa654-content-only, /content/dam/common/en/catalogs/qa654-update | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 15 | replicate:publish dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/ja/catalogs/qa654-inactive, /content/dam/dsr/en/catalogs/qa654-inactive, /content/dam/dsr/en/catalogs/qa654-update, /content/dam/dsr/en/catalogs/qa654-content-unpub | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
