# JOB-20261020-06 – raw values (DEV, read-only, 2026-10-20 ~06:10–06:14Z)
Base L = https://main--dsr-eds-dev--sutrix-projects.aem.live · P = …aem.page. Tools: curl, plus Playwright Chromium for the rendered DOM. P1 = /master/{ja,en}/library/article/stories/qa529-01.

## Status
- qa529-01, qa529-r1..r3 (ja and en) and qa529-02 (ja): 200 on L and P for page, `.md` and `.plain.html`. en/qa529-02: 404 on L and P (TD = ja only).
- The `<head>` on P is byte-identical to L except for the script nonces (ja and en). `.md` and `.plain.html` are identical on L and P.

## Check 1 – title (#1)
- `.md` Metadata table: `title` = "QA529 ナビ" (ja) / "QA529 Nav" (en). No `navTitle`/`navtitle` key anywhere in `.md`, `.plain.html` or the HTML. The string "QA529 ストーリー詳細テスト" / "Story detail test" is absent from all sources (L and P).
- `.plain.html`: no h1 (no authored title block; source = text, image, text, [image], text, profile).
- Rendered (L and P): `<title>` = h1 (`.article-title-heading`, count 1) = "QA529 ナビ" / "QA529 Nav". og:title = "QA529 OGPタイトル" / "QA529 OGP title". There is no `<meta name="navtitle">`. The last breadcrumb item is "QA529 ナビ".
- Code `/blocks/article-title/article-title.js`: h1 = `document.title || getMetadata('og:title')`.
- query-index row: title = og:title value ("QA529 OGPタイトル" / "QA529 OGP title"); navtitle = "".

## Check 2 – all head meta, P1 (#2/#3)
ja: description=QA529 説明 ja · og:title=QA529 OGPタイトル · og:description=QA529 OGP説明 · og:url=https://dev-eds.ykkdigitalshowroom.com/master/ja/library/article/stories/qa529-01 · og:image=…/media_125138bf….png?width=1200&format=pjpg&optimize=medium · og:image:secure_url=…/media_1b1b7cd0….png?width=1200&format=pjpg&optimize=medium · article:tag=do-not-translate · article:tag=site:product/bio-based · twitter:card=summary_large_image · twitter:title=QA529 OGPタイトル · twitter:description=QA529 OGP説明 · twitter:image=(=og:image) · template=article-detail · thumbnail=/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png · published-time=2026-10-19T15:30:48.971Z · showbreadcrumb=true · showfooter=true · showheader=true · searchkeywords=qa529kw1, qa529kw2 · publicationdate=2026-10-01T00:00:00.000Z · updatedate=2026-10-10T00:00:00.000Z · related-stories=qa529-r1, qa529-r2, qa529-r3 · robots=noindex, nofollow · modified-time=2026-10-19T13:57:43.223Z · content-page-ref=(token) · viewport
en: same keys, except **no `article:tag`** (the en `.md` Metadata table has no `tags` row either). Values: thumbnail=/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png, related-stories=qa529-r1, qa529-r3, qa529-r2, published-time=2026-10-19T15:30:11.810Z, modified-time=2026-10-19T14:18:09.431Z, og:image(:secure_url)=…/media_14f6ec45….png.
- Absent on both: published-date, updated-date, category, search-keywords, tags (name=).
- `.md` ja Metadata contains `tags | do-not-translate, site:product/bio-based`, which is output as `article:tag` only.
- Code `/blocks/article-meta/article-meta.js` (auto): date = `getMetadata('publicationdate')`, chips = `splitTags(getMetadata('tags'))`, i.e. `meta[name="tags"]`, which is never emitted.

/query-index.json (L and P: 200, 149 rows). Columns: path, lastModified, robots, title, description, category, tags, image, template, publicationdate, navtitle, updatedate, thumbnail, searchkeywords, caseitem, caseuse, caseissue, caseproduct.
- ja qa529-01 row: robots=noindex, nofollow · title=QA529 OGPタイトル · description=QA529 説明 ja · **category="" · tags=""** · template=article-detail · **publicationdate=2026-10-01T00:00:00.000Z** · navtitle="" · updatedate=2026-10-10T00:00:00.000Z · thumbnail=/content/dam/…/gradient-transparent-1920x1080.png · searchkeywords=qa529kw1, qa529kw2
- en qa529-01 row: same pattern (title=QA529 OGP title, category/tags empty, publicationdate 2026-10-01).
- r1..r3 (ja/en) are present: publicationdate 2026-10-16 / 2026-01-15 / 2026-02-01; category/tags empty.

## Check 3 – thumbnail (#4)
| value | L | P | publish-p192812-e2014374 |
|---|---|---|---|
| ja /content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png | 404 text/html | 404 text/html | **200 image/png** (11 309 B) |
| en /content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png | 404 text/html | 404 text/html | **200 image/png** (7 172 617 B) |
The value has no transform params, but it is not an absolute URL and does not resolve on EDS hosts.

## Check 4 – related (#5)
| URL (L and P identical) | status |
|---|---|
| /ja/stories/query-index.json, /en/stories/query-index.json | 404 |
| /master/{ja,en}/stories/query-index.json | 404 |
| /master/{ja,en}/library/article/stories/query-index.json | 404 |
| /helix-query.yaml | 404 (not public) |
| /blocks/related-stories/related-stories.js | 404 (no such block) |
| /blocks/related-articles/related-articles.js (block 12 関連ストーリー, injected by scripts.js AUTO_BLOCKS as `related-articles auto`) | 200 |
- related-articles.js reads **`/query-index.json`** (scripts/query-index.js), not a stories index. It splits `related-stories` on ",", normalises with toIndexPath() and looks the result up by `path`. "qa529-r1" ≠ "/master/ja/library/article/stories/qa529-r1", so there are 0 matches and collapseBlock() removes the block.
- DOM (L and P, ja and en): **no `.related-articles` element** (removed, not hidden). Rendered blocks: breadcrumb, article-title, text, image, text, [image ja], article-meta auto, text, profile, related-product auto, footer-actions.

## Check 5 – date (#6)
- Info bar `.article-meta-date` = "2026/10/01" (ja and en, L and P). Source = `<meta name="publicationdate">` 2026-10-01T00:00:00.000Z.
- The code comment in article-meta.js says the slash format is intentional: "block 7 of the layout writes YYYY/MM/DD … normalize.js#formatDate writes 2022.01.20 for the card library".

## Check 6 – other dev-made article pages
No path under /library/article/stories/ except qa529-*. Closest dev pages with template=article-detail:
- /ja/article-1001 (200): title=og:title=記事１００１ · article:tag ×3 (site:product/performance/durability, …/flexible, …/repair) · template · published-time · **related-stories=/ja/test-mylist/product-1, /ja/test-mylist/story-1 (paths)** · show* flags. No publicationdate/updatedate/searchkeywords/thumbnail/category/tags meta. Rendered: info bar date "" and **0 chips despite 3 article:tag**. No related-articles block (the two paths are not in /query-index.json).
- /master/en/test-space/article-template (200): title=og:title=testing, template, published-time, show* only.
