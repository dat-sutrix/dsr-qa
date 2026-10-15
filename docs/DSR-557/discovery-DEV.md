# DSR-557 discovery — DEV (JOB-20261015-04)

- Checked: 2026-10-15T05:59Z–06:08Z (UTC), Chromium headless 1440×900, curl. Read-only; no assertions.
- Base URL: https://main--dsr-eds-dev--sutrix-projects.aem.live
- AEM publish (GraphQL/DAM): https://publish-p192812-e2014374.adobeaemcloud.com

## 1. Pages requested by the job

| Path | HTTP | Blocks (class) | Notes |
|---|---|---|---|
| /master/ja/test-space/list-catalog | 200 | `breadcrumb block`, `listing block listing-catalog` | Client-rendered from GraphQL `ykk/dm-catalog-list` |
| /master/en/test-space/list-catalog | **404** | — | en catalog page not published |
| /ja/library/video/search | **404** | — | also 404: /master/ja/library/video/search, /master/en/library/video/search, /ja/library/video, /master/ja/library/video |
| /master/en/test-space/dsr-173-video-detail | 200 | `breadcrumb block`, `video-detail block video-detail-root` | default `movieid-01` has `movieSourceId: null` → `<!--no video source-->`; `?id=<movieId>` selects another Movie CF |
| /master/ja/test-space/dsr-173-video-detail | **404** | — | no ja video page; /ja/test-space/dsr-173-video-detail also 404 |

Other pages found and inspected (from query-index):

| Path | HTTP | Blocks | Notes |
|---|---|---|---|
| /master/ja/test-space/video-list | 200 | `listing block listing-video` | GraphQL `ykk/dm-movie-list`; card links go to `/ja/library/video/search/video-detail?id=…` which is **404** |
| /ja/test-space/pages/movie-list-test | 200 | `listing block listing-video` | same data as above |
| /master/en/wireframe/video | 200 | `block embed` | Scene7 DM VideoViewer iframe present at load (`loading="lazy"`), streams HLS on load; not a DSR-557 Movie CF player |
| /master/en/wireframe/interactive-video | 200 | `block embed` | Scene7 InteractiveVideoViewer iframe at load |
| /master/ja/test-space/dsr-570-catalog-detail | 200 | none matching video/catalog | — |

No standalone DSR-557 "video player" block was found on DEV. The shared player (`.vp-frame`, `data-provider`) is only rendered inside the DSR-173 `video-detail` block, so video TCs run there.

## 2. Catalog items — /master/ja/test-space/list-catalog

Group heading "ピックアップ", 2 cards (`.cards.catalog li`). Category chips: ALL, aluminium, concealing, cotton, decorative, magnet.

| # | Title | catalogType | requiresForm | Link href (title + CTA) | target | rel | download | CTA text | Label | Visible date | publishDate / updateDate (GraphQL) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | catalog 02 | pdf | false | https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/pdf/sample-pdf-a4-size-65kb.pdf | `_blank` | `noopener` | absent | PDF | none | `2026.09.03` (`.cards-card-meta`) | 2026-09-03 / 2026-09-03 |
| 2 | catalog 01 | ebook | false | https://translate.google.com/ (= `ebookUrl`) | `_blank` | `noopener` | absent | e-book | none | `2026.09.03` | 2026-09-03 / 2026-09-03 |

- Type signal: CTA text (`PDF` / `e-book`) and `catalogType` in the GraphQL response. `data-card-id` is the pdfAsset path for the PDF and `/` for the e-book.
- PDF response: `content-type: application/pdf`, `content-disposition: inline` (curl -I, HTTP 200).
- Dates: the DOM shows one date only (`2026.09.03`, so it is unclear whether this is publish or update date). Both dates are available in the `dm-catalog-list` GraphQL JSON. No NEW/UPDATE label element exists in the DOM. Both items are 42 days old (as of 2026-10-15), so the rule result is "no label" for both.
- No item has `requiresForm: true`. No item falls inside the 10-day window. Fields `isUnavailable` and `sortOrder` are also present.
- Thumbnails: Dynamic Media `image_7.jpg`, naturalWidth 220 for both.

## 3. Videos

The Movie CFs from `ykk/dm-movie-list` (dev-published, not QA-seeded) are:

| movieId | movieSource | movieSourceId | publishDate |
|---|---|---|---|
| long | youtube | https://youtu.be/LQe4d3ulijQ?si=… | 2026-10-08 |
| sort-main / sort-a / sort-b / sort-c | youtube | irFRtAVphCY&t=38s | 2026-07..09 |
| badid | youtube | INVALID000 | 2026-10-08 |
| movieid-01, noid, FIL-UNAV | youtube | null | — |
| rel6, FILTERED, INACT, " norelated" | dam | null (`movieAsset` not checked) | — |

No Youku Movie CF was found, and no DAM movie with an asset was rendered (rel6 → `<!--no video source-->`).

Player on `/master/en/test-space/dsr-173-video-detail?id=sort-main`:
- Before click: no `<iframe>`, no `<video>`. A facade `button.vp-facade` with poster `https://img.youtube.com/vi/irFRtAVphCY/maxresdefault.jpg` (`loading="eager" fetchpriority="high"`) is shown. **The poster request to img.youtube.com fires on page load.** It is the only youtube/youku request made before interaction.
- After click: `iframe.vp-media` src `https://www.youtube.com/embed/irFRtAVphCY?rel=0&start=38&autoplay=1&playsinline=1`, allow `autoplay; fullscreen; picture-in-picture; encrypted-media`. `autoplay=1` appears only after the user clicks.
- `?id=long` → embed `https://www.youtube.com/embed/LQe4d3ulijQ?rel=0&autoplay=1&playsinline=1`.
- Embed type: YouTube facade → iframe on click. Scene7 iframes exist only on the wireframe `embed` pages.

## 4. data-testid found

- Catalog listing: **none** (only breadcrumb: `breadcrumb`, `breadcrumb-list`, `breadcrumb-item`, `breadcrumb-link`, `breadcrumb-arrow`, `breadcrumb-current`, `breadcrumb-jsonld`).
- Video detail: `movie-detail-back`, `movie-detail-heading`, `movie-detail-title`, `movie-detail-player`, `movie-detail-player-facade`, `movie-detail-player-embed` (after click), `movie-detail-related-content`, `movie-detail-related-content-heading`, `related-content-card`, `related-content-card-link`, `related-content-card-title`, `related-content-tag`, `carousel-prev`, `carousel-next`.
- Video list / wireframe embed: none besides breadcrumb.

## 5. /query-index.json (118 rows) — paths containing catalog / video / movie / library

| Path | Title |
|---|---|
| /master/en/test-space/drs21-aem-block-library | [AEM] Block Libraryのセットアップ |
| /ja/news/2024/catalog-update | 2024 - Update - オンラインカタログ更新のお知らせ |
| /master/en/wireframe/video | Video |
| /master/en/wireframe/interactive-video | Interactive Video |
| /master/en/test-space/dsr-173-video-detail | DSR-173-Video-Detail |
| /master/ja/test-space/list-catalog | list-catalog |
| /master/ja/test-space/video-list | video-list |
| /ja/test-space/pages/movie-list-test | 動画一覧テスト |
| /master/ja/test-space/dsr-570-catalog-detail | DSR-570: Catalog Detail |

The query-index has columns `publicationdate` and `updatedate`, but the catalog cards read their dates from GraphQL, not from the index.
