# DSR-566 test data (DEV)

All checks are read-only. The page under test is a fixture value (`fixtures/dsr-566.ts`, `newsPath`), overridable without code change: `DSR566_SLUG=qa566-news-01 npm run test:dev -- tests/news-detail`.

| Run | Page | Status on DEV 2026-10-15 |
|---|---|---|
| First pass (JOB-20261015-09) | /master/en/test-space/dsr-357-news-detail | 200, dev-authored, not TD-566-01 values |
| First pass (JOB-20261015-09) | /master/ja/test-space/dsr-357-news-detail | 404 → ja Blocked "page not on DEV" |
| Default from 2026-10-22 (JOB-ZZ-IDLE-37) | /master/ja/test-space/test-news-detail-template (dev, new template; ja only on Author) | 404 on .aem.live and .aem.page 2026-10-22 16:00Z (not published). en: not created |
| From 2026-10-16 | /master/{lang}/test-space/qa566-news-01 (TD-566-01), qa566-news-02 (TD-566-02) | not yet created |

Observed dev page content (en, 2026-10-15): date `2026.03.30`; category `News`; title `「YKK EXPERIENCE」ページを公開しました。` (h2); one text block (plain paragraph only); one image; Button8 `詳しく見る` → `google.com` (authored as plain text, renders as relative link); article-meta classes `no-mylist no-share`; no Back to list; no meta description; `published-time` 2026-09-29T04:17:55.512Z.

Query-index (DSR-NEWS-007): `/master/{lang}/query-index.json` and `/master/{lang}/news/query-index.json` both 404. The page row exists in `/query-index.json` (site root) with empty category/tags/template/publicationdate (recorded only, not asserted).

Planned QA data: see baseline-BL-v1.md (TD-566-01…05).
