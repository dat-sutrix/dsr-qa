# JOB-20261019-08 – DSR-590 C14 TOP demo page (DEV)

- Ran `npm run test:dev -- --grep "DSR-ECO"` (Chromium) against the DEV demo page `/master/ja/test-space/dsr-590-eco-top-page`, which returns 200. The en demo page returns 404, so the en cases were skipped with "en demo page not on DEV". `tsc` is clean.
- 19 tests: 4 passed, 2 failed, 13 skipped (5 in-scope en/cn skips, 8 out-of-scope C15 tests). Exit code 1.
- Passed (ja): 001 (9 cards, images loaded, names, active summary + VIEW MORE, no console errors), 003 (next ×9 loops to first, prev wraps to last, 9 dots, every dot activates its card and is highlighted), 012 (12 background/card URLs, all `media_`), 013 (html lang=ja, Japanese names, internal links keep /master/ja).
- Failed (ja): 002, because all 9 VIEW MORE links point to `http://google.com/`. 004, because the finder link points to `https://google.com/`. Both targets return 200, so the 404-skip rule did not apply.
- Likely cause: demo-content placeholder links, since the C15 detail pages and the S10 finder are not built yet (suspect: data). The carousel block itself behaves correctly.
- Notes: the card count is 9, so there is no Q37 note. All cards have the same placeholder name `bluesign認証商品`, so 003 tracks cards by data-index. The arrow icon `/blocks/eco-carousel/assets/arrow-pc.svg` is code-bundled; it was recorded but not counted as a background.
- Changes: the fixture tries the demo page first, then the A1 paths; the URL recorder has a demo-page row. The page object excludes loop clones and adds active-index, summary and VIEW MORE href helpers. 012 and 013 are now TOP-only.
- Report: `results/DSR-590/DEV/automation-run-20261019-c14.md`. Evidence: `evidence/DSR-ECO-002_ja.png`, `evidence/DSR-ECO-004_ja.png`.
