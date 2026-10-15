# JOB-20261015-09 – DSR-566 news detail, DEV, en/ja

**Ran 11 TCs × en/ja (22 tests): en 5 pass / 6 fail; all 11 ja Blocked.** The ja page `/master/ja/test-space/dsr-357-news-detail` returns 404. tsc: no errors. Failures repeated on retry (0 flaky).
New: `tests/news-detail/DSR-566.news-detail.spec.ts`, `pages/NewsDetailPage.ts`, `fixtures/dsr-566.ts` (page slug via `DSR566_SLUG`), `docs/DSR-566/`.
Pass (en): 001 date/category/title/body visible, 004 text not image, 009 no related block, 010 CTA href = authored, 013 rich text (vacuous: body has no h2/strong/list/link).
Fail (en):
- 002 / 006: no Back to list rendered at all (A2 says the template renders it) → suspect product. The dev page's index `template` is empty, so it may not use news-article.
- 003: shown `2026.03.30` vs `meta published-time` 2026-09-29. That meta is likely the EDS publish timestamp; the page has no publish-date property → suspect data.
- 007: `/master/en/query-index.json` and `/master/en/news/query-index.json` are both 404. The page is only in `/query-index.json` (root), with empty publicationdate/category/tags/template → suspect env (Q2 open).
- 012: article-meta has `no-mylist no-share`, so there is no My List button and no share icons. Nothing was clicked → suspect data.
- 018: meta description and og:description absent → suspect data (no description authored).
Recorded, not asserted: the title is an h2 and the page has 0 h1 (spec.json 4.0 full text wants a single h1). CTA `google.com` is a relative link and resolves to a 404 path.
Next: re-run on `qa566-news-01` (TD-566-01) after 2026-10-16 with `DSR566_SLUG=qa566-news-01`.
Run report: `results/DSR-566/DEV/automation-run-20261015.md`. Evidence: 6 en failure screenshots (2.7 MB).
