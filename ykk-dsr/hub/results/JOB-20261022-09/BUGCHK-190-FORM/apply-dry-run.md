# apply ykk-dsr/hub/author/manifests/BUGCHK-190-FORM.yaml – DRY-RUN (no request sent)

Gates:
- ⛔ AUTHOR_WRITE_ENABLED=1
- ⛔ --apply flag
- ✅ write window Mon–Fri 08:00–18:00 Asia/Saigon (now 2026-10-22T11:47:35.491+07:00)
- ✅ lint: 0 FAIL

Lint FAIL: 0

| # | Op | Request | Target | Keys |
|---|---|---|---|---|
| 1 | patch (ja) | PATCH `/adobe/sites/cf/fragments/580d98c3-f3b4-48c1-afa8-de556bbb0958` | /content/dam/common/ja/catalogs/qa190-cat-pdf-form | headers: Content-Type, If-Match, CSRF-Token; body: fields.requiresForm |
| 2 | patch (en) | PATCH `/adobe/sites/cf/fragments/8d0893f5-0d7a-4c9e-9a55-581ecdb244b7` | /content/dam/common/en/catalogs/qa190-cat-pdf-form | headers: Content-Type, If-Match, CSRF-Token; body: fields.requiresForm |
| 3 | patch (ja) | PATCH `/adobe/sites/cf/fragments/8d3f9e81-6a27-4858-a593-2337aed57d58` | /content/dam/common/ja/catalogs/qa190-cat-ebook-form | headers: Content-Type, If-Match, CSRF-Token; body: fields.requiresForm |
| 4 | patch (en) | PATCH `/adobe/sites/cf/fragments/14ffb780-d713-4bcd-bc23-05e53bdc79ab` | /content/dam/common/en/catalogs/qa190-cat-ebook-form | headers: Content-Type, If-Match, CSRF-Token; body: fields.requiresForm |
| 5 | replicate:preview content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/ja/catalogs/qa190-cat-pdf-form, /content/dam/common/en/catalogs/qa190-cat-pdf-form, /content/dam/common/ja/catalogs/qa190-cat-ebook-form, /content/dam/common/en/catalogs/qa190-cat-ebook-form | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 6 | replicate:publish content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/ja/catalogs/qa190-cat-pdf-form, /content/dam/common/en/catalogs/qa190-cat-pdf-form, /content/dam/common/ja/catalogs/qa190-cat-ebook-form, /content/dam/common/en/catalogs/qa190-cat-ebook-form | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
