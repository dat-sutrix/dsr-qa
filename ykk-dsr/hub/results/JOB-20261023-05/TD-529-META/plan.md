# apply ykk-dsr/hub/author/manifests/TD-529-META.yaml – DRY-RUN (no request sent)

Gates:
- ⛔ AUTHOR_WRITE_ENABLED=1
- ⛔ --apply flag
- ✅ write window Mon–Fri 08:00–18:00 Asia/Saigon (now 2026-10-23T09:51:43.485+07:00)
- ✅ lint: 0 FAIL

Lint FAIL: 0

| # | Op | Request | Target | Keys |
|---|---|---|---|---|
| 1 | page-props (ja) | POST `/content/sites/digital-showroom/master/ja/library/article/stories/qa529-01/jcr:content` | /content/sites/digital-showroom/master/ja/library/article/stories/qa529-01/jcr:content | headers: Content-Type, CSRF-Token; body: category |
| 2 | page-props (en) | POST `/content/sites/digital-showroom/master/en/library/article/stories/qa529-01/jcr:content` | /content/sites/digital-showroom/master/en/library/article/stories/qa529-01/jcr:content | headers: Content-Type, CSRF-Token; body: category, robots |
| 3 | page-props (ja) | POST `/content/sites/digital-showroom/master/ja/library/article/stories/qa529-02/jcr:content` | /content/sites/digital-showroom/master/ja/library/article/stories/qa529-02/jcr:content | headers: Content-Type, CSRF-Token; body: robots |
| 4 | replicate:publish page | POST `/bin/replicate` | /content/sites/digital-showroom/master/ja/library/article/stories/qa529-01, /content/sites/digital-showroom/master/en/library/article/stories/qa529-01, /content/sites/digital-showroom/master/ja/library/article/stories/qa529-02 | headers: Content-Type, CSRF-Token; body: cmd, agentId, path |
