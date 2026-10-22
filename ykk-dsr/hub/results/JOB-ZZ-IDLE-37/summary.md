# JOB-ZZ-IDLE-37 · DSR-566 spec moved to the new news-detail template (selector check, no verdicts)

Merge/incident-related fails: none (no test executed; cause = none).

- **Code:** `pages/NewsDetailPage.ts` now uses the new structure: title = heading in `.title.block`; category (news type) = the Text block directly under Title; body = the other Text blocks; spacers added. The fixture default page is now `test-news-detail-template`.
- **TC changes (intent unchanged):** 2.0 checks order meta → title → news type → spacer → body → image → spacer → CTA → Back to list. 3.0 requires YYYY.MM.DD (DSR-660) and compares with `publicationdate` (fallback `published-time`). 4.0 reads the news type from under Title. 7.0 checks the index `category` against `<meta name="category">` when present. 8.0 was added (reads the same meta) and is skipped unless the page is under `/ja/news/`.
- **Docs:** assumptions A7–A11 in `docs/DSR-566/baseline-BL-v1.md` (source "JOB-20261022-15 + Dat 22/10"); data-testid.md and test-data.md updated.
- **tsc:** exit 0, no errors.
- **Dry run:** 24/24 skipped. `/master/ja/test-space/test-news-detail-template` is **404 on .aem.live and .aem.page**, so the page exists in Author (JOB-15 dump) but is not published. The en copy does not exist. **The live selector check could not be done.**
- **Substitute check:** the live DEV pages /ja/news and actual-cases confirm `.title.block > h1/h2` markup. The locators matched each intended block 1:1 on a synthetic DOM that copies the template. This is logic evidence only, not page evidence.
- **Expect when the page is published:** Back to list (TC 1/2/6) is not part of the new template, so expect fails there. Suspect: product or TC (A8), Claude to decide. TC 4 "single h1" stays recorded only (template title = h2).
- **Next:** publish test-news-detail-template (Dat/QA-PT), or allow a run on qa566-news-01 (already in the query-index with the new blocks), then rerun `DSR566_SLUG=<slug> npm run test:dev -- tests/news-detail`.
- Run report: `results/DSR-566/DEV/automation-run-20261022.md`. Evidence: none (no failures).
