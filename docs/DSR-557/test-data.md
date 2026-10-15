# DSR-557 test data (DEV)

Only dev-published data is used. QA-seeded `qa190-*` CFs are not available yet. All checks are read-only.

| Use | Page | Data |
|---|---|---|
| Catalog TCs (012, 013, 016–020) | /master/ja/test-space/list-catalog | `catalog 02` (pdf, requiresForm=false), `catalog 01` (ebook, requiresForm=false, ebookUrl https://translate.google.com/); both publishDate/updateDate 2026-09-03 |
| Video TCs (001, 002, 006) | /master/en/test-space/dsr-173-video-detail?id=sort-main / ?id=long | YouTube ids `irFRtAVphCY`, `LQe4d3ulijQ` |

- The spec skips a language with reason `Blocked – no DEV data …` when its page returns 404 (en catalog, ja video). It also skips a TC when no item matches its case (017 requiresForm=true e-book; 018/019/020 dates inside the 10-day window).
- NEW/UPDATE dates come from the `ykk/dm-catalog-list` GraphQL response that the page loads. "Today" is the Asia/Tokyo calendar date. Inclusive window: 0–10 days (`fixtures/dsr-557.ts`).
- Data needed to unblock: an en catalog page; a ja video page; an e-book with requiresForm=true; catalogs with publishDate/updateDate = today, today−10 and today−11; a Youku Movie CF; a DAM movie with `movieAsset`.
