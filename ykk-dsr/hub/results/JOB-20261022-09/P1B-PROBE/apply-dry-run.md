# apply ykk-dsr/hub/author/manifests/P1B-PROBE.yaml – DRY-RUN (no request sent)

Gates:
- ⛔ AUTHOR_WRITE_ENABLED=1
- ⛔ --apply flag
- ✅ write window Mon–Fri 08:00–18:00 Asia/Saigon (now 2026-10-22T11:47:21.969+07:00)
- ✅ lint: 0 FAIL

Lint FAIL: 0

| # | Op | Request | Target | Keys |
|---|---|---|---|---|
| 1 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/movies/qaagent-probe | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.movieId, fields.movieTitle, fields.description, fields.thumbnail, fields.movieSource, fields.publishDate |
| 2 | replicate:preview content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/en/movies/qaagent-probe | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
