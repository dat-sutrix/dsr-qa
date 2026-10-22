# DSR-566 data-testid

No data-testid list for news-article yet (2026-10-15). Selectors updated 2026-10-22 for the new `news-detail` template (JOB-ZZ-IDLE-37, assumptions A7–A11). The spec uses class/role selectors with `// TODO: data-testid <name>` in `pages/NewsDetailPage.ts`.

| Element | Proposed data-testid | In DOM (DEV 2026-10-15) | Temporary selector |
|---|---|---|---|
| Article meta | `news-article-meta` | no | `.article-meta.block` |
| Date | `news-date` | no | `.article-meta-date` |
| My List button | `news-mylist` | no (element absent, `no-mylist`) | role button /my ?list\|マイリスト/ in article-meta |
| Share icons | `news-share` | no (element absent, `no-share`) | `.article-meta-actions a` |
| Category (news type) | `news-category` | not checked (page 404, 2026-10-22) | `.title-wrapper + .text-wrapper > .text.block` (A9) |
| Title | `news-title` | not checked (page 404, 2026-10-22) | heading in `.title.block` |
| Body | `news-body` | not checked (page 404, 2026-10-22) | `.text-wrapper:not(.title-wrapper + .text-wrapper) > .text.block` |
| Spacer | — | not checked | `.spacer.block` |
| News list item (TC 8) | `news-list-item` | not checked | `main li, main article` filtered by title |
| CTA (Button8) | `news-cta` | no | `.button.block a.button8` |
| Back to list | `news-back-to-list` | no (element absent) | role link /back to list\|一覧へ戻る/ |
