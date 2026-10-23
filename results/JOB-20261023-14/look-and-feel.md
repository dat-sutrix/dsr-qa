# JOB-20261023-14 — catalog detail L&F

DEV .aem.live; capture UTC 2026-10-23T06:10:06.330Z → 2026-10-23T06:11:17.738Z. Proposed observations only; human QA confirms.

## Build under test

- `https://main--dsr-eds-dev--sutrix-projects.aem.live/blocks/catalog-detail/catalog-detail.js`: HTTP 200; Last-Modified **Thu, 22 Oct 2026 01:48:45 GMT**; ETag `"b7e43493b9bdc11fcbbeb85cf528194e"`.
- `https://main--dsr-eds-dev--sutrix-projects.aem.live/blocks/catalog-detail/catalog-detail.css`: HTTP 200; Last-Modified **Thu, 15 Oct 2026 03:59:54 GMT**; ETag `"c5f817d59708438c190b3b1670f95a84"`.

These dates predate the described 23 October refactor. Deployment of those commits is **not independently verified**.

Reference: `/master/ja/test-space/dsr-570-catalog-detail`, the exact demo URL from JOB-20261021-12; that job contains no English demo URL.

All ten page/viewport combinations returned HTTP 200 and stayed at the requested URL. Screenshots are viewport-only, with overlap to preserve content beneath the sticky header; the final screen is clamped to the document bottom. All screenshots are committed as explicitly requested by this capture job.

| # | what | overlay vs demo image | observation | proposed OK/NG | confidence |
|---|---|---|---|---|---|
| 1 | ja-pdf-1440: Visible title | [ja-pdf-1440](evidence/ja-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Page heading “製品カタログ”; visible catalog title “catalog pdf form”. | OK | 99% observation |
| 2 | ja-pdf-1440: Block order | [ja-pdf-1440](evidence/ja-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Heading → cover + catalog title/description → date/category → form/consent → “ダウンロードする”. On mobile the cover precedes the catalog title. Matches demo structure. | OK | 95% |
| 3 | ja-pdf-1440: PC columns | [ja-pdf-1440](evidence/ja-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Cover x=340.0, y=324.4; text x=740.0, y=324.4; form y=664.4. Image left/text right; form below. | OK | 99% |
| 4 | ja-pdf-1440: Width | [ja-pdf-1440](evidence/ja-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | scrollWidth=1440 ≤ viewport 1440. | OK | 99% |
| 5 | ja-pdf-1440: Date/category | [ja-pdf-1440](evidence/ja-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Date “2026.09.03”; category chips “aluminium”, “cotton”, “magnet”; content differs from demo, not a layout failure. | OK | 95% |
| 6 | ja-pdf-1440: Language | [ja-pdf-1440](evidence/ja-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Japanese page/form; overlay seed catalog title remains English. | OK | 95% observation |
| 7 | ja-pdf-1440: Console | [ja-pdf-1440](evidence/ja-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Failed to load resource: the server responded with a status of 404 (). HTTP: 404 https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library. Uncaught page errors: 0. | NG (resource; cause=none) | 0% new product bug |
| 8 | ja-pdf-390: Visible title | [ja-pdf-390](evidence/ja-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Page heading “製品カタログ”; visible catalog title “catalog pdf form”. | OK | 99% observation |
| 9 | ja-pdf-390: Block order | [ja-pdf-390](evidence/ja-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Heading → cover + catalog title/description → date/category → form/consent → “ダウンロードする”. On mobile the cover precedes the catalog title. Matches demo structure. | OK | 95% |
| 10 | ja-pdf-390: SP stacking | [ja-pdf-390](evidence/ja-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Cover x=16.0, y=210.8; text x=16.0, y=491.8; form y=690.6. Cover then text; single-column fields below. | OK | 99% |
| 11 | ja-pdf-390: Width | [ja-pdf-390](evidence/ja-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | scrollWidth=390 ≤ viewport 390. | OK | 99% |
| 12 | ja-pdf-390: Date/category | [ja-pdf-390](evidence/ja-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Date “2026.09.03”; category chips “aluminium”, “cotton”, “magnet”; content differs from demo, not a layout failure. | OK | 95% |
| 13 | ja-pdf-390: Language | [ja-pdf-390](evidence/ja-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Japanese page/form; overlay seed catalog title remains English. | OK | 95% observation |
| 14 | ja-pdf-390: Console | [ja-pdf-390](evidence/ja-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Failed to load resource: the server responded with a status of 404 (). HTTP: 404 https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library. Uncaught page errors: 0. | NG (resource; cause=none) | 0% new product bug |
| 15 | en-pdf-1440: Visible title | [en-pdf-1440](evidence/en-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Page heading “Product Catalog”; visible catalog title “catalog pdf form”. | OK | 99% observation |
| 16 | en-pdf-1440: Block order | [en-pdf-1440](evidence/en-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Heading → cover + catalog title/description → date/category → form/consent → “ダウンロードする”. On mobile the cover precedes the catalog title. Matches demo structure. | OK | 95% |
| 17 | en-pdf-1440: PC columns | [en-pdf-1440](evidence/en-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Cover x=340.0, y=324.4; text x=740.0, y=324.4; form y=664.4. Image left/text right; form below. | OK | 99% |
| 18 | en-pdf-1440: Width | [en-pdf-1440](evidence/en-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | scrollWidth=1440 ≤ viewport 1440. | OK | 99% |
| 19 | en-pdf-1440: Date/category | [en-pdf-1440](evidence/en-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Date “2026.09.03”; category chips “aluminium”, “cotton”, “magnet”; content differs from demo, not a layout failure. | OK | 95% |
| 20 | en-pdf-1440: Japanese on English page | [en-pdf-1440](evidence/en-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | English heading “Product Catalog”, but form shows “必須”, “氏名（姓）”, “メールアドレス”, “利用規約への同意”, “YKK株式会社からの連絡を許可します。” and “ダウンロードする”. Same Japanese form as demo. cause=none; suspect=product; translation/data baseline unverified. | NG | 70% product bug; 100% observed |
| 21 | en-pdf-1440: Console | [en-pdf-1440](evidence/en-pdf-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | None. Uncaught page errors: 0. | OK | 99% observation |
| 22 | en-pdf-390: Visible title | [en-pdf-390](evidence/en-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Page heading “Product Catalog”; visible catalog title “catalog pdf form”. | OK | 99% observation |
| 23 | en-pdf-390: Block order | [en-pdf-390](evidence/en-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Heading → cover + catalog title/description → date/category → form/consent → “ダウンロードする”. On mobile the cover precedes the catalog title. Matches demo structure. | OK | 95% |
| 24 | en-pdf-390: SP stacking | [en-pdf-390](evidence/en-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Cover x=16.0, y=210.8; text x=16.0, y=491.8; form y=690.6. Cover then text; single-column fields below. | OK | 99% |
| 25 | en-pdf-390: Width | [en-pdf-390](evidence/en-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | scrollWidth=390 ≤ viewport 390. | OK | 99% |
| 26 | en-pdf-390: Date/category | [en-pdf-390](evidence/en-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Date “2026.09.03”; category chips “aluminium”, “cotton”, “magnet”; content differs from demo, not a layout failure. | OK | 95% |
| 27 | en-pdf-390: Japanese on English page | [en-pdf-390](evidence/en-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | English heading “Product Catalog”, but form shows “必須”, “氏名（姓）”, “メールアドレス”, “利用規約への同意”, “YKK株式会社からの連絡を許可します。” and “ダウンロードする”. Same Japanese form as demo. cause=none; suspect=product; translation/data baseline unverified. | NG | 70% product bug; 100% observed |
| 28 | en-pdf-390: Console | [en-pdf-390](evidence/en-pdf-390-01.png) / [demo](evidence/demo-ja-390-01.png) | None. Uncaught page errors: 0. | OK | 99% observation |
| 29 | ja-ebook-1440: Visible title | [ja-ebook-1440](evidence/ja-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Page heading “製品カタログ”; visible catalog title “catalog ebook form”. | OK | 99% observation |
| 30 | ja-ebook-1440: Block order | [ja-ebook-1440](evidence/ja-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Heading → cover + catalog title/description → date/category → form/consent → “ダウンロードする”. On mobile the cover precedes the catalog title. Matches demo structure. | OK | 95% |
| 31 | ja-ebook-1440: PC columns | [ja-ebook-1440](evidence/ja-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Cover x=340.0, y=324.4; text x=740.0, y=324.4; form y=664.4. Image left/text right; form below. | OK | 99% |
| 32 | ja-ebook-1440: Width | [ja-ebook-1440](evidence/ja-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | scrollWidth=1440 ≤ viewport 1440. | OK | 99% |
| 33 | ja-ebook-1440: Date/category | [ja-ebook-1440](evidence/ja-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Date “2026.09.03”; category chips “aluminium”, “cotton”, “magnet”; content differs from demo, not a layout failure. | OK | 95% |
| 34 | ja-ebook-1440: Language | [ja-ebook-1440](evidence/ja-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Japanese page/form; overlay seed catalog title remains English. | OK | 95% observation |
| 35 | ja-ebook-1440: Console | [ja-ebook-1440](evidence/ja-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Failed to load resource: the server responded with a status of 404 (). HTTP: 404 https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library. Uncaught page errors: 0. | NG (resource; cause=none) | 0% new product bug |
| 36 | ja-ebook-390: Visible title | [ja-ebook-390](evidence/ja-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Page heading “製品カタログ”; visible catalog title “catalog ebook form”. | OK | 99% observation |
| 37 | ja-ebook-390: Block order | [ja-ebook-390](evidence/ja-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Heading → cover + catalog title/description → date/category → form/consent → “ダウンロードする”. On mobile the cover precedes the catalog title. Matches demo structure. | OK | 95% |
| 38 | ja-ebook-390: SP stacking | [ja-ebook-390](evidence/ja-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Cover x=16.0, y=210.8; text x=16.0, y=491.8; form y=690.6. Cover then text; single-column fields below. | OK | 99% |
| 39 | ja-ebook-390: Width | [ja-ebook-390](evidence/ja-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | scrollWidth=390 ≤ viewport 390. | OK | 99% |
| 40 | ja-ebook-390: Date/category | [ja-ebook-390](evidence/ja-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Date “2026.09.03”; category chips “aluminium”, “cotton”, “magnet”; content differs from demo, not a layout failure. | OK | 95% |
| 41 | ja-ebook-390: Language | [ja-ebook-390](evidence/ja-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Japanese page/form; overlay seed catalog title remains English. | OK | 95% observation |
| 42 | ja-ebook-390: Console | [ja-ebook-390](evidence/ja-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Failed to load resource: the server responded with a status of 404 (). HTTP: 404 https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library. Uncaught page errors: 0. | NG (resource; cause=none) | 0% new product bug |
| 43 | en-ebook-1440: Visible title | [en-ebook-1440](evidence/en-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Page heading “Product Catalog”; visible catalog title “catalog ebook form”. | OK | 99% observation |
| 44 | en-ebook-1440: Block order | [en-ebook-1440](evidence/en-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Heading → cover + catalog title/description → date/category → form/consent → “ダウンロードする”. On mobile the cover precedes the catalog title. Matches demo structure. | OK | 95% |
| 45 | en-ebook-1440: PC columns | [en-ebook-1440](evidence/en-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Cover x=340.0, y=324.4; text x=740.0, y=324.4; form y=664.4. Image left/text right; form below. | OK | 99% |
| 46 | en-ebook-1440: Width | [en-ebook-1440](evidence/en-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | scrollWidth=1440 ≤ viewport 1440. | OK | 99% |
| 47 | en-ebook-1440: Date/category | [en-ebook-1440](evidence/en-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Date “2026.09.03”; category chips “aluminium”, “cotton”, “magnet”; content differs from demo, not a layout failure. | OK | 95% |
| 48 | en-ebook-1440: Japanese on English page | [en-ebook-1440](evidence/en-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | English heading “Product Catalog”, but form shows “必須”, “氏名（姓）”, “メールアドレス”, “利用規約への同意”, “YKK株式会社からの連絡を許可します。” and “ダウンロードする”. Same Japanese form as demo. cause=none; suspect=product; translation/data baseline unverified. | NG | 70% product bug; 100% observed |
| 49 | en-ebook-1440: Console | [en-ebook-1440](evidence/en-ebook-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | None. Uncaught page errors: 0. | OK | 99% observation |
| 50 | en-ebook-390: Visible title | [en-ebook-390](evidence/en-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Page heading “Product Catalog”; visible catalog title “catalog ebook form”. | OK | 99% observation |
| 51 | en-ebook-390: Block order | [en-ebook-390](evidence/en-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Heading → cover + catalog title/description → date/category → form/consent → “ダウンロードする”. On mobile the cover precedes the catalog title. Matches demo structure. | OK | 95% |
| 52 | en-ebook-390: SP stacking | [en-ebook-390](evidence/en-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Cover x=16.0, y=210.8; text x=16.0, y=491.8; form y=690.6. Cover then text; single-column fields below. | OK | 99% |
| 53 | en-ebook-390: Width | [en-ebook-390](evidence/en-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | scrollWidth=390 ≤ viewport 390. | OK | 99% |
| 54 | en-ebook-390: Date/category | [en-ebook-390](evidence/en-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Date “2026.09.03”; category chips “aluminium”, “cotton”, “magnet”; content differs from demo, not a layout failure. | OK | 95% |
| 55 | en-ebook-390: Japanese on English page | [en-ebook-390](evidence/en-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | English heading “Product Catalog”, but form shows “必須”, “氏名（姓）”, “メールアドレス”, “利用規約への同意”, “YKK株式会社からの連絡を許可します。” and “ダウンロードする”. Same Japanese form as demo. cause=none; suspect=product; translation/data baseline unverified. | NG | 70% product bug; 100% observed |
| 56 | en-ebook-390: Console | [en-ebook-390](evidence/en-ebook-390-01.png) / [demo](evidence/demo-ja-390-01.png) | None. Uncaught page errors: 0. | OK | 99% observation |
| 57 | demo-ja-1440: Visible title | [demo-ja-1440](evidence/demo-ja-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Page heading “製品カタログ”; visible catalog title “AQUASEAL® 製品カタログ”. | OK | 99% observation |
| 58 | demo-ja-1440: Block order | [demo-ja-1440](evidence/demo-ja-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Heading → cover + catalog title/description → date/category → form/consent → “ダウンロードする”. On mobile the cover precedes the catalog title. Matches demo structure. | OK | 95% |
| 59 | demo-ja-1440: PC columns | [demo-ja-1440](evidence/demo-ja-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Cover x=340.0, y=324.4; text x=740.0, y=324.4; form y=664.4. Image left/text right; form below. | OK | 99% |
| 60 | demo-ja-1440: Width | [demo-ja-1440](evidence/demo-ja-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | scrollWidth=1440 ≤ viewport 1440. | OK | 99% |
| 61 | demo-ja-1440: Date/category | [demo-ja-1440](evidence/demo-ja-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Date “2022.01.20”; demo category “STANDARD CATALOG”. | OK | 95% |
| 62 | demo-ja-1440: Language | [demo-ja-1440](evidence/demo-ja-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | Japanese reference page/form. | OK | 95% observation |
| 63 | demo-ja-1440: Console | [demo-ja-1440](evidence/demo-ja-1440-01.png) / [demo](evidence/demo-ja-1440-01.png) | None. Uncaught page errors: 0. | OK | 99% observation |
| 64 | demo-ja-390: Visible title | [demo-ja-390](evidence/demo-ja-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Page heading “製品カタログ”; visible catalog title “AQUASEAL® 製品カタログ”. | OK | 99% observation |
| 65 | demo-ja-390: Block order | [demo-ja-390](evidence/demo-ja-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Heading → cover + catalog title/description → date/category → form/consent → “ダウンロードする”. On mobile the cover precedes the catalog title. Matches demo structure. | OK | 95% |
| 66 | demo-ja-390: SP stacking | [demo-ja-390](evidence/demo-ja-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Cover x=16.0, y=210.8; text x=16.0, y=491.8; form y=738.2. Cover then text; single-column fields below. | OK | 99% |
| 67 | demo-ja-390: Width | [demo-ja-390](evidence/demo-ja-390-01.png) / [demo](evidence/demo-ja-390-01.png) | scrollWidth=390 ≤ viewport 390. | OK | 99% |
| 68 | demo-ja-390: Date/category | [demo-ja-390](evidence/demo-ja-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Date “2022.01.20”; demo category “STANDARD CATALOG”. | OK | 95% |
| 69 | demo-ja-390: Language | [demo-ja-390](evidence/demo-ja-390-01.png) / [demo](evidence/demo-ja-390-01.png) | Japanese reference page/form. | OK | 95% observation |
| 70 | demo-ja-390: Console | [demo-ja-390](evidence/demo-ja-390-01.png) / [demo](evidence/demo-ja-390-01.png) | None. Uncaught page errors: 0. | OK | 99% observation |

## All viewport evidence

- ja-pdf-1440: [screen 1, y=0](evidence/ja-pdf-1440-01.png), [screen 2, y=740](evidence/ja-pdf-1440-02.png), [screen 3, y=1480](evidence/ja-pdf-1440-03.png), [screen 4, y=1548](evidence/ja-pdf-1440-04.png)
- ja-pdf-390: [screen 1, y=0](evidence/ja-pdf-390-01.png), [screen 2, y=780](evidence/ja-pdf-390-02.png), [screen 3, y=1560](evidence/ja-pdf-390-03.png), [screen 4, y=2014](evidence/ja-pdf-390-04.png)
- en-pdf-1440: [screen 1, y=0](evidence/en-pdf-1440-01.png), [screen 2, y=740](evidence/en-pdf-1440-02.png), [screen 3, y=1480](evidence/en-pdf-1440-03.png), [screen 4, y=1548](evidence/en-pdf-1440-04.png)
- en-pdf-390: [screen 1, y=0](evidence/en-pdf-390-01.png), [screen 2, y=780](evidence/en-pdf-390-02.png), [screen 3, y=1560](evidence/en-pdf-390-03.png), [screen 4, y=2014](evidence/en-pdf-390-04.png)
- ja-ebook-1440: [screen 1, y=0](evidence/ja-ebook-1440-01.png), [screen 2, y=740](evidence/ja-ebook-1440-02.png), [screen 3, y=1480](evidence/ja-ebook-1440-03.png), [screen 4, y=1548](evidence/ja-ebook-1440-04.png)
- ja-ebook-390: [screen 1, y=0](evidence/ja-ebook-390-01.png), [screen 2, y=780](evidence/ja-ebook-390-02.png), [screen 3, y=1560](evidence/ja-ebook-390-03.png), [screen 4, y=2014](evidence/ja-ebook-390-04.png)
- en-ebook-1440: [screen 1, y=0](evidence/en-ebook-1440-01.png), [screen 2, y=740](evidence/en-ebook-1440-02.png), [screen 3, y=1480](evidence/en-ebook-1440-03.png), [screen 4, y=1548](evidence/en-ebook-1440-04.png)
- en-ebook-390: [screen 1, y=0](evidence/en-ebook-390-01.png), [screen 2, y=780](evidence/en-ebook-390-02.png), [screen 3, y=1560](evidence/en-ebook-390-03.png), [screen 4, y=2014](evidence/en-ebook-390-04.png)
- demo-ja-1440: [screen 1, y=0](evidence/demo-ja-1440-01.png), [screen 2, y=740](evidence/demo-ja-1440-02.png), [screen 3, y=1480](evidence/demo-ja-1440-03.png), [screen 4, y=1548](evidence/demo-ja-1440-04.png)
- demo-ja-390: [screen 1, y=0](evidence/demo-ja-390-01.png), [screen 2, y=780](evidence/demo-ja-390-02.png), [screen 3, y=1560](evidence/demo-ja-390-03.png), [screen 4, y=2061](evidence/demo-ja-390-04.png)

## Review limits

- The demo uses a placeholder cover; overlays use the seeded zipper cover. No exact-image equivalence is expected.
- English localization NG applies to four captures (two formats × two sizes); cause=none, 70% real-product-bug confidence. No merge attribution is supported by this capture.
- Resource console errors are recorded separately from layout outcomes; no blank catalog or uncaught JavaScript exception was observed.
- Layout checks pass for all ten captures. Proposed capture outcomes: six pass, four fail for localization. No skipped/blocked captures.
- No form was filled or submitted. PDF/e-book destination behavior and server-side gating remain untested.
- TypeScript: `npx tsc --noEmit`, exit 0, no errors. No npm test suite was run.
- Capture repeated with overlapping scroll steps and HTTP-error URL collection; these final captures supersede the initial exploratory screenshots.
