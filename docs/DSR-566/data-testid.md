# DSR-566 data-testid

No data-testid list for news-article yet (2026-10-15). The spec uses class/role selectors with `// TODO: data-testid <name>` in `pages/NewsDetailPage.ts`.

| Element | Proposed data-testid | In DOM (DEV 2026-10-15) | Temporary selector |
|---|---|---|---|
| Article meta | `news-article-meta` | no | `.article-meta.block` |
| Date | `news-date` | no | `.article-meta-date` |
| My List button | `news-mylist` | no (element absent, `no-mylist`) | role button /my ?list\|マイリスト/ in article-meta |
| Share icons | `news-share` | no (element absent, `no-share`) | `.article-meta-actions a` |
| Category | `news-category` | no | `.news-detail-category` |
| Title | `news-title` | no | `.news-detail-title` |
| Body | `news-body` | no | `.text.block` |
| CTA (Button8) | `news-cta` | no | `.button.block a.button8` |
| Back to list | `news-back-to-list` | no (element absent) | role link /back to list\|一覧へ戻る/ |
