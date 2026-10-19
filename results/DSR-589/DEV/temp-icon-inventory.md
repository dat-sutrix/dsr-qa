# DSR-589 DEV temporary icon inventory (TD-589-06) — 20261019

- Captured: 2026-10-19T05:10:08Z – 05:10:25Z UTC, DEV `https://main--dsr-eds-dev--sutrix-projects.aem.live`, Chromium 1440×900, read-only.
- Data: [temp-icon-inventory.json](temp-icon-inventory.json), unique by sha1, with every page and selector where each icon is used. Script: `fixtures/dsr-589-inventory.cjs` (`ENV=dev node fixtures/dsr-589-inventory.cjs`).
- Scope: `main .product-list.block` (cards and filter panel, which A3 treats as the condition search) and `main .product-detail.block`. Product photos (Dynamic Media renditions) are excluded.

## Pages

| Page | HTTP | Icon occurrences | Unique icons |
|---|---:|---:|---:|
| /master/ja/product-list | 404 | — (fallback used) | — |
| /ja/product-list | 200 | 44 | 5 |
| /master/en/product-list | 404 | — (fallback used) | — |
| /en/product-list | 200 | 44 | 5 |
| /ja/products/{id} × 15 card ids | 404 (all) | skipped | — |
| /en/products/{id} × 15 card ids | 404 (all) | skipped | — |

Product cards have no `<a href>`, and clicking a card name does not navigate. Detail ids were taken from the card `data-id` values: applicableSliderSpecial-2, productId-01x, parentProduct-2, 01-0001…01-0005, 135, 46, 1107, 1120, 1131, productId-02, DSR361-RT-001. Every one returned 404 on DEV main in both ja and en, so no product detail page was captured.

## Unique icons

| File | sha1 | HTTP | Used as | Occurrences per page (ja / en) | Visible |
|---|---|---:|---|---|---|
| styles/icons/chevron-right.svg | 54ed8e1b… | 200 | `::after` background on filter close, filter headings (5), clear, fav button | 24 / 24 | no (pseudo not rendered at 1440) |
| blocks/product-list/assets/bookmark.svg | e981c176… | 200 | mask on `.pl-fav-btn` (each card) | 17 / 17 | yes |
| blocks/product-list/assets/search.svg | 6f60b943… | 200 | background on `.pl-search-icon` (aria-hidden) | 1 / 1 | yes |
| blocks/product-list/assets/color-card-standard.png | 266aa36a… | 200 | `img.pl-color-card` in one card, alt "Standard Color Card" | 1 / 1 | yes |
| inline `<svg>` in `.pl-filter-close` | d1be7d41… (markup) | — | close icon, aria-hidden | 1 / 1 | no (0×0 at 1440) |

## TC 6.0 baseline

- Broken: 0. All 4 icon files return HTTP 200. Inline SVG has no file.
- Missing text alternative among visible icons: 0 per page (19 visible occurrences). The fav button has aria-label (マイリストに登録する / Add to My List), the color card has alt, and the search icon is aria-hidden next to the search input.
- **No performance/function icons were found on DEV.** Cards show no function icons, filter options are text-only, and detail pages are 404. The inventory therefore contains only UI chrome icons (chevron, bookmark, search, color card). Whether these count as "temporary icons" under A2 is for QA to decide; see the open points in automation-run-20261019.md.
