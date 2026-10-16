# DSR-529 data-testid

No data-testid list for the article template yet (2026-10-16), and no test page is on DEV. Selectors in `pages/ArticleDetailPage.ts` are unverified guesses (class/role, info bar assumed to reuse the shared `article-meta` block from DSR-566), each marked `// TODO: data-testid <name>`. Confirm them on TD-529-01 before JOB-20261015-12 judges any result.

| Element (block) | Proposed data-testid | In DOM | Temporary selector |
|---|---|---|---|
| Title (3) | `article-title` | not verified | `main h1` |
| Subtitle (4) | `article-subtitle` | not verified | `[data-block-name*="subtitle"], [class*="subtitle"]` |
| Article image (5) | `article-image` | not verified | `[data-block-name*="article-image"], [class*="article-image"]` |
| Description (6) | `article-description` | not verified | `[data-block-name*="description"], [class*="article-description"]` |
| Info bar (7) | `article-info-bar` | not verified | `.article-meta.block, [data-block-name*="info-bar"]` |
| Date (7) | `article-date` | not verified | `.article-meta-date, time` in info bar |
| Category tags (7) | `article-tag` | not verified | `[class*="tag"], [class*="category"]` in info bar |
| My List (7) | `article-mylist` | not verified | role button /my ?list\|マイリスト/ in info bar |
| Share icons (7) | `article-share` | not verified | `.article-meta-actions a` or social-host links in info bar |
| Body (9) | `article-body` | not verified | `[data-block-name*="body"], .text.block` |
| Profile (11) | `article-profile` | not verified | `[data-block-name*="profile"], [class*="profile"]` |
| Related stories (12) | `article-related-stories` | not verified | `[data-block-name*="related-stories"], [class*="related-stories"]` + heading /related stories\|関連ストーリー\|関連記事/ |
| Related items (13) | `article-related-items` | not verified | `[data-block-name*="related-items"], [class*="related-items"], [class*="related-products"]` + heading /related items\|関連アイテム\|関連製品/ |
| VIEW ALL STORIES (14) | `article-view-all-stories` | not verified | role link /view all stories/i |
| Contact (14) | `article-contact` | not verified | role link /contact\|お問い合わせ/ in main |
