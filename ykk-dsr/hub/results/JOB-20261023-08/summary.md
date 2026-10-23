# JOB-20261023-08 – follow-up of JOB-06 fails (DEV, read-only) – done
**DSR-672 residual: NOT reproduced.** qa566-news-02 (ja) shows `2026.10.02` on both .aem.live and .aem.page. The date comes from the Article Meta **component field** (authored `2026-10-02T00:00:00.000Z` in `.plain.html`). The page has **no** `meta[name=publicationdate]`. `published-time` = `2026-10-23T03:33:59.091Z` and is not used for display. Formatting works without the page property.
**Merge/incident-related:** none (every item has cause = none).

| # | TC | Observed (raw) | suspect | confidence (real bug) |
|---|---|---|---|---|
| 1 | NEWS-003 news-02 ja | shown `2026.10.02` · publicationdate = (absent) · source = Article Meta component date | — (pass) | 0% |
| 2 | NEWS-002/006 ja/en | I searched the whole document after scrolling to the bottom: no 一覧へ戻る / Back to list text anywhere. The only `/ja/news` link is the header global nav "ニュース" (en: none). Main blocks end at `button` | product | 70% (unchanged) |
| 3 | NEWS-012 ja/en | `<div class="article-meta no-mylist no-share block">…<div class="article-meta-actions"></div>`. The classes are already in the authored `.plain.html` (component option) | data | 15% |
| 4 | ARTICLE-023 ja | qa529-02 shows a `related-product auto` block, h2 関連アイテム, **4 items** (p00320, p00101, p00001, p00210). qa529-01 shows the same 4 items. Source = `/blocks/related-product/fixtures/dm-product-related.json` (dummy). `related-product.js`: `const QUERY = null` "TODO(DSR-356)…until the query is persisted… renders dummy data". With the fixture, the page filter is skipped | product (blocked by DSR-356 query) | 55% |
| 5 | VOV-008 en | qa587-unavail rows = `source:overlay`, `cfPath:/content/dam/dsr/en/movies/standard/qa587-unavail`, `unavailable:no-movie`, noindex, browser → `/en/library/video/search`. `source`+`cfPath` are also the first 2 rows of qa587-off and of normal qa587-main | test | 10% |

- **#2:** nothing exists outside `main`, so there was no locator to fix. `pages/` is unchanged and the product suspect stays. Evidence: `evidence/DSR-NEWS-002-006_{ja,en}_bottom.png`.
- **#3 option to change:** in UE, select Article Meta → field **Options** (`classes`, model `article-meta`) → untick **マイリストボタンを非表示** (`no-mylist`) and **シェアを非表示** (`no-share`), then republish. TD-566-01 does not ask for them. [Giả định] They may be a template default: the dev page `test-news-detail-template` also had them (docs/DSR-566/test-data.md). If the template presets them, this becomes a product/template question.
- **#4:** the block has トルツメ code (`if (!items.length) collapseBlock`), but on DEV the code never queries real data. qa529-02 therefore cannot reach 0 results. I propose the result **blocked** until the `dm-product-related` persisted query is published (execute.json on publish = 404).
- **#5 proposed Expected (not edited):** "video-detail data rows = only `unavailable` (+ noindex); technical rows `source`/`cfPath`, present on every overlay page, are ignored." BL-OVL-1 "single unavailable row" read as one data row. Checked against the repo copy `docs/DSR-587/overlay-data-flow-BL.md`; `claude/BL-OVL-1_*.md` is not in the repo.
- **Side note:** qa566-news-02 renders an empty Button8 frame (no label/link; empty Button node, known in TD-566-FIX).
- **Code:** I added `tests/analysis/JOB-20261023-08.analysis.spec.ts` (fact capture only). `tsc` exit 0. Run 7/7 executed. Report: `results/DSR-566/DEV/automation-run-20261023-job08.md`.
