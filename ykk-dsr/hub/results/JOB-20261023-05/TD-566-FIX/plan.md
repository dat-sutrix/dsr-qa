# apply ykk-dsr/hub/author/manifests/TD-566-FIX.yaml – DRY-RUN (no request sent)

Gates:
- ⛔ AUTHOR_WRITE_ENABLED=1
- ⛔ --apply flag
- ✅ write window Mon–Fri 08:00–18:00 Asia/Saigon (now 2026-10-23T09:51:49.278+07:00)
- ✅ lint: 0 FAIL

Lint FAIL: 0

| # | Op | Request | Target | Keys |
|---|---|---|---|---|
| 1 | page-props (ja) | POST `/content/sites/digital-showroom/master/ja/test-space/qa566-news-01/jcr:content` | /content/sites/digital-showroom/master/ja/test-space/qa566-news-01/jcr:content | headers: Content-Type, CSRF-Token; body: publicationdate |
| 2 | component-text (ja) | POST `/content/sites/digital-showroom/master/ja/test-space/qa566-news-01/jcr:content/root/section/title` | /content/sites/digital-showroom/master/ja/test-space/qa566-news-01/jcr:content/root/section/title | headers: Content-Type, CSRF-Token; body: title |
| 3 | page-props (en) | POST `/content/sites/digital-showroom/master/en/test-space/qa566-news-01/jcr:content` | /content/sites/digital-showroom/master/en/test-space/qa566-news-01/jcr:content | headers: Content-Type, CSRF-Token; body: publicationdate |
| 4 | component-text (en) | POST `/content/sites/digital-showroom/master/en/test-space/qa566-news-01/jcr:content/root/section/title` | /content/sites/digital-showroom/master/en/test-space/qa566-news-01/jcr:content/root/section/title | headers: Content-Type, CSRF-Token; body: title |
| 5 | component-text (ja) | POST `/content/sites/digital-showroom/master/ja/test-space/qa566-news-02/jcr:content/root/section/title` | /content/sites/digital-showroom/master/ja/test-space/qa566-news-02/jcr:content/root/section/title | headers: Content-Type, CSRF-Token; body: title |
| 6 | replicate:publish page | POST `/bin/replicate` | /content/sites/digital-showroom/master/ja/test-space/qa566-news-01, /content/sites/digital-showroom/master/en/test-space/qa566-news-01, /content/sites/digital-showroom/master/ja/test-space/qa566-news-02 | headers: Content-Type, CSRF-Token; body: cmd, agentId, path |
