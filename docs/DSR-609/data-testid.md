# DSR-609 data-testid

No data-testid list for the top-page block yet (2026-10-16). `pages/TopPage.ts` and the spec use role/class selectors with `// TODO: data-testid <name>`.

| Element | Proposed data-testid | In DOM (DEV 2026-10-16) | Temporary selector |
|---|---|---|---|
| Main visual image | `top-hero-image` | no | `.top-hero-bg img` |
| Quick search form | `top-quick-search` | no | role `search` (`form.top-hero-search`) |
| Quick search input | `top-quick-search-input` | no | role `searchbox` in the search form |
| RECOMMEND CONTENTS | `top-recommend` | no | `.top-recommend`, cards = role `listitem` |
| Recommend card parts | `top-recommend-card` / `-media` / `-title` / `-desc` | no | `.top-recommend-card`, `.top-recommend-media`, `.top-recommend-title`, `.top-recommend-desc` |
| NEWS area | `top-news` | no | `.top-news`, items = role `listitem` |
| NEWS item title / image | `top-news-title` / `top-news-media` | no | `.top-news-title`, `.top-news-media` |
