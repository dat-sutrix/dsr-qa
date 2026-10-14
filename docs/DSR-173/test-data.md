# DSR-173 – Test data manifest

Last synced with fixtures/dsr-173.ts on 2026-09-29, automation HEAD 51686ff

Source of truth for currently seeded data: `fixtures/dsr-173.ts`. **Seeded** means fixture values are filled in; **Pending** means the data set still contains only null values. Seeding on STG/PRO is not verified. The states below describe the intended test data, not independently verified Author flags.

| Key | State to seed | movieId | Page path (DEV) | Used by | Status |
|---|---|---|---|---|---|
| VALID_YOUTUBE | isUnavailable=FALSE, isActive=TRUE, isBoothLimited=FALSE, movieSource=YouTube, relatedProducts ≥ 1 | `movieid-01` | `/master/en/test-space/dsr-173-video-detail` | 006, 012, 014, 020, 027, 028, 029 | Seeded |
| VALID_DAM | Valid, movieSource=DAM, movieAsset + thumbnail set | TBD | TBD | 016, 017 | Pending |
| UNAVAILABLE | isUnavailable=TRUE (ja/en/zh) | TBD | TBD | 007, 010 | Pending |
| INACTIVE | Movie Related CF isActive=FALSE | TBD | TBD | 008 | Pending |
| BOOTH_LIMITED | isBoothLimited=TRUE + dsrFeatures tag | TBD | TBD | 009 | Pending |
| YOUTUBE_EMPTY_ID | movieSource=YouTube, movieSourceId empty | TBD | TBD | 018 | Pending |
| RELATED_SORT | relatedVideos V1 (2026-09-01), V2 (2026-08-01); article A1 (modified 2026-09-10); LP L1 (2026-07-01) → expected A1, V1, V2, L1 | TBD | TBD | 021 | Pending |
| RELATED_NO_UPDATEDATE | V3 (no updateDate, publishDate 2026-08-15), V1, V2 → expected V1, V3, V2 | TBD | TBD | 022 | Pending |
| RELATED_FILTERED | V1 valid, V4 unavailable, V5 inactive → expected V1 only | TBD | TBD | 023 | Pending |
| NO_RELATED | relatedVideos / relatedArticles / relatedLandingPages empty | TBD | TBD | 024 | Pending |
| RELATED_6 | 6 displayable related items | TBD | TBD | 025 | Pending |
| RELATED_MIXED | 1 video, 1 article, 1 LP | TBD | TBD | 026 | Pending |
| I18N | Same movieId in ja/en/zh with different movieTitle | TBD | TBD | 032, 034 | Pending |

## VALID_YOUTUBE seeded values

Author source: CF `DM_movie_1` / `DM_movie_related_1` at `/content/dam/ykk/common/product-cf/test/`. These names do not follow the CF spec's `m-{movieId}` / `mr-{movieId}` naming convention.

| Field | Fixture value |
|---|---|
| movieId | `movieid-01` |
| paths.en (DEV page path) | `/master/en/test-space/dsr-173-video-detail` |
| movieTitle.en | `movieTitle` |
| description.en | `movie description\nmovie description` (the `\n` represents one actual line break) |
| movieSourceId | `irFRtAVphCY&t=38s` |
| thumbnail | `/content/dam/ykk/digital-showroom/test/png/image 7.png` |
| relatedProducts | `['productId-01']` |
| relatedArticles | `['Article Page 1', 'Article Page 2', 'Article Page 3']` |
| relatedLandingPages | `['Landing page 1', 'Landing page 2']` |

The ja/zh paths, titles, and descriptions remain null. `movieAsset`, `expectedOrder`, `excludedTitles`, and `relatedContent` also remain null for this data set; Seeded does not mean every field or language is available.

## Known data caveats

- The DEV page is a manually authored placeholder embedding the movie component, not an auto-generated detail page.
- Only 2 of 3 related articles render and no landing page renders. Publish status of Article Page 3 / Landing page 1–2 is unverified (relates to DSR-538).
- `movieSourceId` contains `&t=38s`, while the CF spec says the field holds the id only.
- The observed `data-product-code` (`productCode2223323`) differs from the displayed product code (`productId-01x`). The fixture's `relatedProducts` value remains `productId-01`.

Conventions: the planned `TEST-MV-` movieId prefix is not used by the seeded `movieid-01`; do not reuse test CFs in other User Stories; STG/PRO seeding policy pending confirmation.
