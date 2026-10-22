# JOB-20261022-15 · DSR-566 news template, read-only Author DEV inspection (GET only, 0 writes)

**Verdict: template ready for authoring = YES (conditional), confidence 70%.** No `news-article` node exists. The template is `/conf/digital-showroom/settings/wcm/templates/news-detail` ("ニュース詳細 / News Detail", status enabled). It now pre-places date + news type + title + body + image + button, all as UE-authorable blocks. Two open items: the order of news type and title (a), and spacing (visual check).

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Locate template | `news-detail` (QB `type=cq:Template nodename=news-article` = 0 hits; no templates under /content/sites) · `jcr:created` 2026-10-19 06:45:50Z (admin) · **no `jcr:lastModified`** on any template node | dumps/template-news-detail.infinity.json |
| 2 | Initial content, in order (section `style=w-744`) | 1 Article Meta `article-meta` (date `2026/01/01`) → 2 Title `title` h2 "タイトルが入ります。…" → 3 Text `text` "お知らせ" (class text-12 = news type) → 4 Spacer `spacer-50` → 5 Text `text` "本文が入ります。…" (body/description) → 6 Image `image` `/content/dam/ykk/asset.jpg` alt "ニュース画像" (asset exists) → 7 Spacer `spacer-40` → 8 Button `button` "詳しく見る" (button8). All `core/franklin/components/block/v1/block` | same |
| 3a | Pre-placed in design order (date, news type, title, description, image) | **FAIL (order)**: all 5 present, but news type (Text "お知らせ") sits **after** Title. Share/My List come from Article Meta (no `no-share`/`no-mylist` class → shown) | same |
| 3b | Each authorable (UE model) | **PASS (JCR level)**: models article-meta/title/text/spacer/image/button exist in component-models.json and are in the `section` filter. `data-aue` in the UE DOM not checked (no UE session) | dumps/ue-models-filters.json |
| 3c | Policy / allowed components | Template `policies` = empty mapping; `structure/root editable=true`. What editors may add comes from the `section` filter in component-filters.json: 57 blocks (text, image, button, title, spacer, article-meta, news-list, cards, columns, …). `news-detail` model is **no longer defined** | dumps/ue-models-filters.json |
| 3d | Modified after 2026-10-22 07:55Z | **PASS, indirect only (not provable from JCR)**: template has no lastModified. Supporting evidence: component-*.json redeployed 08:25:17Z. Page `/master/ja/test-space/test-news-detail-template` was created from it at 08:44:46Z with the new structure, whereas Martin (~07:00Z) saw only Article Meta + News Detail | dumps/page-test-news-detail-template.infinity.json |
| 4 | Martin's `news-test-1` | **Not found** (QB nodename `news-test-1` and `news-test*` under /content, title-like `%news%test%`). Only `/en/news-test` (+ `news-1`) exists. Closest old-style page: `/master/en/test-space/dsr-357-news-detail` (franklin page template; Article Meta + `news-detail` block with category@select). Its `news-detail` block no longer has a UE model | dumps/page-dsr-357-news-detail.infinity.json |
| 5 | Spacing | **needs visual check (Dat, 2 min)**: spacer-50 after news type, spacer-40 after image | — |

Observations for Claude:
- News type is now a free Text "お知らせ", not a `category@select` like the old news-detail block. Check whether news-list/category filtering still needs a category field (page metadata `category@select` exists at page level).
- The initial content does not set the page property `template` (article-detail sets `template: article-detail`). If the frontend relies on `<meta name="template" content="news-article">`, editors must set it by hand.
- Placeholder image `/content/dam/ykk/asset.jpg` and date `2026/01/01` are literal values that editors must replace.
