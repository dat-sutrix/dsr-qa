# DSR-173 – data-testid map

Verified on DEV 2026-09-29, build dev/2026.09.15.2, 20/22 present (20 unique testids, 26 elements total).

Source: reported DOM scan of `/master/en/test-space/dsr-173-video-detail` and Dev status column in the QA spec spreadsheet.

Block: `movie-detail` (EDS, block root `[data-block-name="movie-detail"]`). Use confirmed data-testid selectors; for missing selectors, use role/text fallback where possible and add `// TODO: data-testid <name>`.

| data-testid | Element | HTML | Extra attribute | Cardinality | TCs | Status |
|---|---|---|---|---|---|---|
| `movie-detail-back` | Back to movie list button | `<a>` | — | Single | DSR-MOVIE-034 | Done (verified) |
| `movie-detail-heading` | Page heading "MOVIE" | `<h1>/<h2>` | — | Single | DSR-MOVIE-033 | Done (verified) |
| `movie-detail-title` | Movie title | `<h1>/<h2>` | — | Single | DSR-MOVIE-012, 013, 032 | Done (verified) |
| `movie-detail-player` | Player container | `<div>` | `data-movie-source="youtube\|youku\|dam"` | Single | DSR-MOVIE-014〜019 | Done (verified) |
| `movie-detail-player-embed` | Embedded player (YouTube/Youku) | `<iframe>` | — | Single (only when source = YouTube/Youku) | DSR-MOVIE-014, 015, 018 | Done (verified) |
| `movie-detail-player-video` | DAM video element | `<video>` | `poster = thumbnail URL` | Single (only when source = DAM) | DSR-MOVIE-016, 017 | Not implemented |
| `movie-detail-related-products` | Related products section | `<section>` | — | Single (not rendered when empty) | DSR-MOVIE-020 | Done (verified) |
| `movie-detail-related-products-heading` | Section heading | `<h2>/<h3>` | — | Single | DSR-MOVIE-020 | Done (verified) |
| `related-product-card` | Product card | `<li>/<div>` | Observed: `data-product-code="productCode2223323"` (see note below) | Repeat | DSR-MOVIE-020 | Done (verified) |
| `related-product-card-link` | Product card link | `<a>` | — | Repeat (1 per card) | DSR-MOVIE-020 | Done (verified) |
| `related-product-name` | Product name | `<p>/<span>` | — | Repeat (1 per card) | DSR-MOVIE-020 | Done (verified) |
| `related-product-code` | Product code | `<p>/<span>` | — | Repeat (1 per card) | DSR-MOVIE-020 | Done (verified) |
| `related-product-bookmark` | Bookmark (My List) icon | `<button>` | `aria-pressed="true\|false"`; observed: `data-mylist-id="productId-01x"` | Repeat (1 per card) | — (Issue #1 pending) | Done (verified) |
| `movie-detail-related-content` | Related content section | `<section>` | — | Single (not rendered when empty) | DSR-MOVIE-021〜025 | Done (verified) |
| `movie-detail-related-content-heading` | Section heading | `<h2>/<h3>` | — | Single | DSR-MOVIE-024 | Done (verified) |
| `carousel-prev` | Carousel previous arrow | `<button>` | `disabled / aria-disabled="true" at first position` | Repeat — one pair per carousel; MUST be scoped inside the parent section testid, never page-wide | DSR-MOVIE-025 | Done (verified) |
| `carousel-next` | Carousel next arrow | `<button>` | `disabled / aria-disabled="true" at last position` | Repeat — one pair per carousel; MUST be scoped inside the parent section testid, never page-wide | DSR-MOVIE-025 | Done (verified) |
| `related-content-card` | Related content card | `<li>/<div>` | `data-content-type="movie\|article\|landing-page"` | Repeat (in display order) | DSR-MOVIE-021, 022, 023, 026 | Done (verified) |
| `related-content-card-link` | Card link | `<a>` | — | Repeat (1 per card) | DSR-MOVIE-026 | Done (verified) |
| `related-content-card-image` | Card thumbnail | `<img>` | — | Repeat (1 per card) | DSR-MOVIE-026 | Blocked (DSR-538) |
| `related-content-card-title` | Card title | `<p>/<h3>` | — | Repeat (1 per card) | DSR-MOVIE-021, 026 | Done (verified) |
| `related-content-tag` | Type tag (STORY / MOVIE) | `<span>` | — | Repeat (1 per card) | DSR-MOVIE-026 | Done (verified) |

Rules: value is language-independent and static; repeated elements share the value and render in display order; elements "not rendered when empty" must be absent from DOM.

## Deployment notes

- `carousel-prev` and `carousel-next` each occur twice: one pair inside `movie-detail-related-products` and one inside `movie-detail-related-content`. Always scope each arrow to its parent section testid.

- `movie-detail-player-video`: **Not implemented**. Dev note: only rendered when `movieSource = DAM`; publish link not implemented for external sources such as YouTube/Youku. DAM test data pending (DSR-MOVIE-016, 017).
- `related-content-card-image`: **Blocked (DSR-538)**. Dev marked Done in the QA spec spreadsheet, but neither an `<img>` nor this testid is present in the related content cards in the DOM. DSR-538 also covers related content links to the AEM publish domain under `/ja/`, returning HTTP 500.
- Extra attributes observed outside the original spec: `related-product-bookmark` has `data-mylist-id="productId-01x"`; `related-product-card` has `data-product-code="productCode2223323"`. The latter does **not** match the visible product code text, `productId-01x`. Which field is authoritative is pending dev confirmation; do not assert on `data-product-code` until confirmed. Use the visible product code text for DSR-MOVIE-020.
