# CL-v0.1 – Client layout design sheets (Numata, shared by Quentin 20/10/2026)

Status: **reference, NOT baseline**. All 4 sheets are ver 0.1 ("内容確定までは 0.1"); Figma URL blank; many 未決 items.
QA rule: Sprint 12 tests keep the DEV implementation confirmed by Martin (BL-OVL-1). Items below become TCs only when
(a) the sheet reaches 1.0, or (b) Quentin/Martin confirm the row for DEV. Conflicts go to Quentin as one question (Q-CL-1).

| Sheet | Doc No | Drive ID | Related US |
|---|---|---|---|
| 製品詳細 (L12) | DSR-14-12 | 1a0zq6qFrwxxspRdJQCe71ZXpCYGzzwK4 | DSR-586, 585, 457, 503, 583 |
| 動画詳細 (L13) | DSR-14-13 | 1MW25A_llAxTmPgV3JEhHvZLanw0D2iS9 | DSR-587, 647, 173, 557 |
| 技術紹介動画詳細 (L14) | DSR-14-14 | 15Nc-EDZ8o_p0YWkcS4xfswc0V22JQkvz | DSR-587 (movies/tech) – no QA ticket yet |
| カタログ詳細 (L15) | DSR-14-15 | 1FlVCiPew2G1T7iggDCyxd1crMGB-u97c | DSR-570/607, 557, 655 |

## 1. Conflicts with DEV (BL-OVL-1) → Q-CL-1 to Quentin
| # | Topic | CL-v0.1 | DEV today (Martin) |
|---|---|---|---|
| C1 | Video URL | `/{lang}/library/video/item/{id}` | `/{lang}/library/video/{id}` |
| C2 | Tech video URL | `/{lang}/library/video/tech-talk/item/{id}` | not defined (DSR CF `/movies/tech/`) |
| C3 | Product URL | `/{lang}/product/item/{id}` | `/{lang}/products/{id}` (`/product/` = 404) |
| C4 | Catalog URL | `/{lang}/library/catalog/item/{id}` | `/{lang}/library/catalog/{id}` |
| C5 | Lang codes | jp / en / ch | ja / en (cn not present, Issue #18) |
| C6 | Breadcrumb | common mechanism, path-derived, hides `item`; level 未決 | DSR-552 block (Done 20/10) |
| C7 | Product publish gate | DSR isActive only | (video/catalog: isActive AND NOT isUnavailable) – product isUnavailable behaviour to confirm |
| C8 | Product 記事バナー 2+ items | links to article search (sheet notes 元仕様「カタログ」誤記) | – |

## 2. Testable rows once confirmed (candidate TCs, P2 – after Sprint 12 cutoff 22/10)
Video (L13) / tech (L14):
- meta title / og:title = `{movieTitle}｜YKK DIGITAL SHOWROOM`; description/og:description = {description} with newlines removed; og:image = {thumbnail}
- page title fixed text: 製品関連動画 (L13) / 技術紹介動画 (L14)
- back link → `/{lang}/library/video/search` (L13) / `/{lang}/library/video/tech-talk` (L14); hidden on SP
- player: autoplay muted; thumbnail NOT shown; YouTube/Youku by movieSourceId, DAM by movieAsset
- related products: author order, all shown, PC 4 / SP 1 per view
- related content: updateDate DESC, all shown (⚠ DSR-647 says author order, max 5 → conflict, Q-CL-1 C9)
- publish gate: DSR isActive=true AND content isUnavailable=false; isBoothLimited=true → hidden from list only
- L14 only: speaker block (image/name/title) shown only when data exists
Catalog (L15):
- title by catalogType (PDF 製品カタログ / e-book), date format `2022.01.20`, description keeps line breaks
- requiresForm=true + hubspotFormId → form, download button after submit; form ID empty → no form, no button; requiresForm=false → button immediately (要確認)
- detail page also exists for no-form catalogs
Product (L12):
- meta title `{productName}｜YKK DIGITAL SHOWROOM`, og:image = media01Asset
- NEW/UPDATE icon (180 days 未決; NEW wins when both)
- isDiscontinued: page stays published, label 未決
- each section hidden when its data is empty (9, 11-x, 12, 13, 14)

## 3. Conflict C9
DSR-647 (relatedMovies: author order, max 5, hide isUnavailable) vs L13 #7 (related content: updateDate DESC, all). QA keeps DSR-647 for Sprint 12; ask Quentin which wins.
