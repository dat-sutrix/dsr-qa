# apply ykk-dsr/hub/author/manifests/TD-587-01.resolved.yaml – DRY-RUN (no request sent)

Gates:
- ⛔ AUTHOR_WRITE_ENABLED=1
- ⛔ --apply flag
- ⛔ write window Mon–Fri 08:00–18:00 Asia/Saigon (now 2026-10-21T18:08:29.213+07:00)
- ✅ lint: 0 FAIL

Lint FAIL: 0

| # | Op | Request | Target | Keys |
|---|---|---|---|---|
| 1 | rename (ja) | MOVE `/api/assets/common/ja/movies/qa-587-main` | /content/dam/common/ja/movies/qa-587-main | headers: X-Destination, X-Depth, X-Overwrite; body: – |
| 2 | rename (en) | MOVE `/api/assets/dsr/en/movies/standard/qa-587-main` | /content/dam/dsr/en/movies/standard/qa-587-main | headers: X-Destination, X-Depth, X-Overwrite; body: – |
| 3 | rename (ja) | MOVE `/api/assets/dsr/ja/movies/standard/qa-587-main` | /content/dam/dsr/ja/movies/standard/qa-587-main | headers: X-Destination, X-Depth, X-Overwrite; body: – |
| 4 | patch (en) | PATCH `/adobe/sites/cf/fragments/c30079bc-0421-4b88-ba54-83d307a338ce` | /content/dam/common/en/movies/qa587-main | headers: Content-Type, If-Match, CSRF-Token; body: fields.movieId |
| 5 | patch (ja) | PATCH `/adobe/sites/cf/fragments/<id of qa-587-main after rename>` | /content/dam/common/ja/movies/qa587-main | headers: Content-Type, If-Match, CSRF-Token; body: fields.movieId |
| 6 | skip | – | /content/dam/dsr/en/movies/standard/qa587-main | dsr-cf en: no field change |
| 7 | patch (ja) | PATCH `/adobe/sites/cf/fragments/<id of qa-587-main after rename>` | /content/dam/dsr/ja/movies/standard/qa587-main | headers: Content-Type, If-Match, CSRF-Token; body: fields.movie |
| 8 | replicate:preview content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/en/movies/qa587-main, /content/dam/common/ja/movies/qa587-main | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 9 | replicate:preview dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/en/movies/standard/qa587-main, /content/dam/dsr/ja/movies/standard/qa587-main | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 10 | replicate:publish content-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/common/en/movies/qa587-main, /content/dam/common/ja/movies/qa587-main | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
| 11 | replicate:publish dsr-cf | POST `/adobe/sites/cf/fragments/publish` | /content/dam/dsr/en/movies/standard/qa587-main, /content/dam/dsr/ja/movies/standard/qa587-main | headers: Content-Type, CSRF-Token; body: paths, agentId, filterReferencesByStatus, workflowTitle |
