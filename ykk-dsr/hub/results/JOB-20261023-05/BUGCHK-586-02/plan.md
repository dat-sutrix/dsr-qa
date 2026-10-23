# apply ykk-dsr/hub/author/manifests/BUGCHK-586-02.yaml – DRY-RUN (no request sent)

Gates:
- ⛔ AUTHOR_WRITE_ENABLED=1
- ⛔ --apply flag
- ✅ write window Mon–Fri 08:00–18:00 Asia/Saigon (now 2026-10-23T09:51:36.543+07:00)
- ✅ lint: 0 FAIL

Lint FAIL: 0

| # | Op | Request | Target | Keys |
|---|---|---|---|---|
| 1 | skip | – | /content/dam/common/ja/products/990586002 | content-cf ja: no field change |
| 2 | skip | – | /content/dam/dsr/ja/products/990586002 | dsr-cf ja: no field change |
| 3 | replicate:preview content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/ja/products/990586002 | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 4 | replicate:preview dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/ja/products/990586002 | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
