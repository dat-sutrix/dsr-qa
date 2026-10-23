# apply ykk-dsr/hub/author/manifests/TD-557-YOUKU.resolved.yaml – EXECUTE

Gates:
- ✅ AUTHOR_WRITE_ENABLED=1
- ✅ --apply flag
- ✅ write window Mon–Fri 08:00–18:00 Asia/Saigon (now 2026-10-23T09:31:04.213+07:00)
- ✅ lint: 0 FAIL

Lint FAIL: 0

| # | Op | Request | Target | Keys |
|---|---|---|---|---|
| 1 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/movies/qa557-youku | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.movieId, fields.movieTitle, fields.description, fields.thumbnail, fields.movieSource, fields.movieSourceId, fields.publishDate |
| 2 | create (ja) | POST `/adobe/sites/cf/fragments` | /content/dam/common/ja/movies/qa557-youku | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.movieId, fields.movieTitle, fields.description, fields.thumbnail, fields.movieSource, fields.movieSourceId, fields.publishDate |
| 3 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/en/movies/standard/qa557-youku | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.movie |
| 4 | create (ja) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/ja/movies/standard/qa557-youku | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.movie |
| 5 | replicate:preview content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/en/movies/qa557-youku, /content/dam/common/ja/movies/qa557-youku | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 6 | replicate:preview dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/en/movies/standard/qa557-youku, /content/dam/dsr/ja/movies/standard/qa557-youku | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 7 | replicate:publish content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/en/movies/qa557-youku, /content/dam/common/ja/movies/qa557-youku | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 8 | replicate:publish dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/en/movies/standard/qa557-youku, /content/dam/dsr/ja/movies/standard/qa557-youku | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
executed 8 writes; see ykk-dsr/hub/results/JOB-20261023-03/TD-557-YOUKU/writes.log
