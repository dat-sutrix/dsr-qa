# apply ykk-dsr/hub/author/manifests/TD-587-NEG.yaml – DRY-RUN (no request sent)

Gates:
- ⛔ AUTHOR_WRITE_ENABLED=1
- ⛔ --apply flag
- ✅ write window Mon–Fri 08:00–18:00 Asia/Saigon (now 2026-10-23T09:20:23.063+07:00)
- ✅ lint: 0 FAIL

Lint FAIL: 0

| # | Op | Request | Target | Keys |
|---|---|---|---|---|
| 1 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/movies/qa587-preview | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.movieId, fields.movieTitle, fields.description, fields.thumbnail, fields.movieSource, fields.movieSourceId, fields.publishDate |
| 2 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/movies/qa587-sub | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.movieId, fields.movieTitle, fields.description, fields.thumbnail, fields.movieSource, fields.movieSourceId, fields.publishDate |
| 3 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/movies/qa587-commune-only | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.movieId, fields.movieTitle, fields.description, fields.thumbnail, fields.movieSource, fields.movieSourceId, fields.publishDate |
| 4 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/movies/qa587-unavail | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.movieId, fields.movieTitle, fields.description, fields.thumbnail, fields.movieSource, fields.movieSourceId, fields.publishDate |
| 5 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/movies/qa587-removed | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.movieId, fields.movieTitle, fields.description, fields.thumbnail, fields.movieSource, fields.movieSourceId, fields.publishDate |
| 6 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/movies/qa587-tt | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.movieId, fields.movieTitle, fields.description, fields.thumbnail, fields.movieSource, fields.movieSourceId, fields.publishDate |
| 7 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/common/en/movies/qa587-inactive | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.movieId, fields.movieTitle, fields.description, fields.thumbnail, fields.movieSource, fields.movieSourceId, fields.publishDate |
| 8 | create (ja) | POST `/adobe/sites/cf/fragments` | /content/dam/common/ja/movies/qa587-inactive | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.movieId, fields.movieTitle, fields.description, fields.thumbnail, fields.movieSource, fields.movieSourceId, fields.publishDate |
| 9 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/en/movies/standard/qa587-preview | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.movie |
| 10 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/en/movies/standard/qa587-inactive | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.movie |
| 11 | create (ja) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/ja/movies/standard/qa587-inactive | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.movie |
| 12 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/en/movies/standard/qa587-unavail | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.movie |
| 13 | create (en) | POST `/adobe/sites/cf/fragments` | /content/dam/dsr/en/movies/standard/qa587-removed | headers: Content-Type, CSRF-Token; body: title, name, modelId, parentPath, fields.isActive, fields.movie |
| 14 | replicate:preview content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/en/movies/qa587-preview, /content/dam/common/en/movies/qa587-sub, /content/dam/common/en/movies/qa587-commune-only, /content/dam/common/en/movies/qa587-unavail, /content/dam/common/en/movies/qa587-removed, /content/dam/common/en/movies/qa587-tt, /content/dam/common/en/movies/qa587-inactive, /content/dam/common/ja/movies/qa587-inactive | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 15 | replicate:preview dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/en/movies/standard/qa587-preview, /content/dam/dsr/en/movies/standard/qa587-inactive, /content/dam/dsr/ja/movies/standard/qa587-inactive, /content/dam/dsr/en/movies/standard/qa587-unavail, /content/dam/dsr/en/movies/standard/qa587-removed | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 16 | replicate:publish content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/en/movies/qa587-preview, /content/dam/common/en/movies/qa587-sub, /content/dam/common/en/movies/qa587-commune-only, /content/dam/common/en/movies/qa587-unavail, /content/dam/common/en/movies/qa587-removed, /content/dam/common/en/movies/qa587-tt, /content/dam/common/en/movies/qa587-inactive, /content/dam/common/ja/movies/qa587-inactive | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 17 | replicate:publish dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/en/movies/standard/qa587-inactive, /content/dam/dsr/ja/movies/standard/qa587-inactive, /content/dam/dsr/en/movies/standard/qa587-unavail, /content/dam/dsr/en/movies/standard/qa587-removed | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
