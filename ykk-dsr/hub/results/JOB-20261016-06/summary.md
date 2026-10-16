# JOB-20261016-06 – DSR-557 catalog test fixes + DEV run, en + ja

**Playwright: 14 tests (7 TCs × en/ja). 10 passed, 0 failed, 4 skipped (fixme: 016, 017). tsc: no errors. Exit code 0.**
- **Fixes (tests only):**
  - `label()` now reads only the badge (`span.cards-badge-new`, plus `.cards-badge-update` for UPDATE), not the card text.
  - `item()` matches the title exactly, so "QA190 e-book" no longer matches "QA190 e-book form".
  - 013/016/017 are pinned to `QA190 PDF catalog` / `QA190 e-book` / `QA190 e-book form`.
  - 018/019/020 assert only their own rows: new-0/10/11, upd-0/10/11, BOTH + noupd.
- **018/019/020:** pass in both languages. The 10-day boundaries and NEW-over-UPDATE precedence match the rule (today 2026-10-16 JST).
- **013:** pass on QA190 PDF catalog: `target=_blank`, `rel=noopener`, no `download`, `application/pdf` inline in a new tab, and the original tab stays.
- **016/017:** fixme, because the e-book cards are not rendered (`ebookUrl: "qa190-cat-ebook"`). Reason: "blocked-data: QA-PT fixes ebookUrl 16/10 night". The fixme is conditional, so the tests run automatically once the cards render.
- **012:** pass. 9 of 12 qa190 cards have a title, a thumbnail and a date. Three items are recorded as annotations, not failures:
  - the 2 e-books (blocked-data);
  - `QA190 PDF form required` (suspect product or DSR-570 gate).
- Run report: `results/DSR-557/DEV/automation-run-20261016-job06.md`. No failures, so no evidence was committed.
