# JOB-20261016-02 – DSR-557 qa190 rerun, DEV, en + ja

**Playwright: 14 tests (7 TCs × en/ja). 6 passed (012, 013, 016), 8 failed (017, 018, 019, 020). Nothing skipped. tsc: no errors.** Both list-catalog pages return 200. The GraphQL response has 14 items (12 qa190 + 2 old), but the page renders only 11 cards.
- **Data:** qa190-cat-ebook, qa190-cat-ebook-form and qa190-cat-pdf-form are not rendered in either language.
  - Both e-book CFs have `ebookUrl: "qa190-cat-ebook"`, not `https://www.ykkfastening.com/`.
  - The pdf-form CF looks valid, so its absence is unexplained. It may be by design until DSR-570.
  - The "QA190 PDF catalog" CF is named `qa-190-cat-pdf`.
- **012:** the Playwright test passed: every rendered card has a title, a thumbnail and a date. Proposed **fail** (data), because 3 of the 12 qa190 items have no card.
- **013 / 016:** passed, but on the old items "catalog 02" and "catalog 01", not on the qa190 items. The spec picks the first matching item from the GraphQL response.
- **017:** fail, because the "QA190 e-book form" card is not on the page (suspect data).
- **018 / 019 / 020:** fail because of a **test defect**. `CatalogDisplayPage.label()` scans the whole card text, so the title "QA190 NEW 11" is read as a NEW label.
  - The page itself shows no badge on that card.
  - Badges were read from the DOM snapshot by hand (not asserted). They match the expected rule for all 9 rendered qa190 items: NEW on new-0, new-10, both and noupd; UPDATE on upd-0 and upd-10; none on new-11, upd-11 and the pdf item.
- No code was changed (run-only job). Suggested follow-up job:
  - Read the label from the badge element only.
  - Make each of 018/019/020 assert only its own rows.
  - Pin 013/016/017 to the qa190 CFs.
  - Ask QA-PT to fix the e-book `ebookUrl` values.
- Run report: `results/DSR-557/DEV/automation-run-20261016.md`. Evidence: screenshots of the 8 failed tests in `evidence/`.
