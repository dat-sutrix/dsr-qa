# apply ykk-dsr/hub/author/manifests/TD-586-01-02.resolved.yaml – DRY-RUN (no request sent)

Gates:
- ⛔ AUTHOR_WRITE_ENABLED=1
- ⛔ --apply flag
- ✅ write window Mon–Fri 08:00–18:00 Asia/Saigon (now 2026-10-22T11:47:29.365+07:00)
- ⛔ lint: 0 FAIL

Lint FAIL: 8

| # | Op | Request | Target | Keys |
|---|---|---|---|---|
| 1 | skip | – | /content/dam/common/ja/products/990586001 | content-cf ja: no field change |
| 2 | skip | – | /content/dam/common/ja/products/990586002 | content-cf ja: no field change |
| 3 | skip | – | /content/dam/dsr/ja/products/990586001 | dsr-cf ja: no field change |
| 4 | skip | – | /content/dam/dsr/ja/products/990586002 | dsr-cf ja: no field change |
| 5 | replicate:preview content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/ja/products/990586001, /content/dam/common/ja/products/990586002 | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 6 | replicate:preview dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/ja/products/990586001, /content/dam/dsr/ja/products/990586002 | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 7 | replicate:publish content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/ja/products/990586001 | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 8 | replicate:publish dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/ja/products/990586001 | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
