# JOB-20261016-10 – DSR-557 e-book rerun (012/016/017), DEV, ja + en

**Playwright: 6 tests (3 TCs × ja/en). 2 passed, 4 failed, 0 skipped. tsc: no errors. Exit code 1. Run-only, with no code changes.**
- **The ebookUrl fix worked.** Both e-book cards now render in both languages. Their links have `href=https://www.ykkfastening.com/` (= ebookUrl), `target=_blank`, `rel=noopener` and no `download`. The conditional fixme no longer applies.
- **012: pass.** The page shows 13 cards. 11 of 12 qa190 cards have a title, a thumbnail and a date. The exception is `QA190 PDF form required`, which is still not rendered (annotation: suspect product or DSR-570 gate).
- **016/017: fail, suspect = test.** Every DSR-side check passes:
  - card rendered;
  - href = ebookUrl;
  - popup opened;
  - navigation request went to exactly the ebookUrl, with no DSR form first (017 included, `requiresForm=true`);
  - original tab unchanged.
- **Why 016/017 fail.** The last assertion `forms === 0` counts every `<form>` on the external popup page. ykkfastening.com redirects to ykkdigitalshowroom.com, which has a site search form and a hidden webfont-loader form (ja 2, en 1). Neither is a gate. The test was not changed (no Expected changes). Claude decides whether to scope the check to DSR forms or change the test URL.
- **Extra, TD-190-03/04:**
  - DEV GraphQL `dm-movie-list` returns `qa190-mv-dam` (dam) and `qa190-mv-empty` (youtube, movieSourceId null).
  - Both render at `/master/{ja,en}/test-space/dsr-173-video-detail?id=<movieId>`. mv-dam shows a `<video>` with sample-4.mp4. mv-empty shows only the title: no player, no error.
  - Neither is on the ja video-list page. "blocked-data: no page binds TD-190-03/04" does not apply.
- Run report: `results/DSR-557/DEV/automation-run-20261019-job10.md`. Evidence: `evidence/` (list page + popup screenshot per failure).
