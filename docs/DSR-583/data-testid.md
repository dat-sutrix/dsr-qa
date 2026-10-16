# DSR-583 data-testid

No data-testid on the listing / cards on DEV (2026-10-16; only breadcrumb-* test IDs are in `main`). Selectors in `pages/ProductListPage.ts` are class selectors observed on /master/ja/test-space/product-list, each marked `// TODO: data-testid <name>`.

| Element | Proposed data-testid | In DOM | Temporary selector |
|---|---|---|---|
| Product list block | `product-list` | no | `main .listing.block` |
| Card grid | `product-list-grid` | no | `.listing .cards ul` (first) |
| Product card | `product-card` | no | `.cards ul > li` (`data-card-id` present) |
| Card title | `product-card-title` | no | `.cards-card-title` |
| Filter chip | `product-list-filter` | no (no filter on page) | `.listing-chip:not([data-key="__all__"])` |
| Load more | `product-list-load-more` | no (not on page) | role button /more\|もっと見る\|さらに表示/i |
