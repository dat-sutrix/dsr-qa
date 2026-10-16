# JOB-20261015-13 — done
DEV Chromium, DSR-TOP-004…009 × ja/en (12 tests). ja ran on .aem.page (live 404); en on .aem.live (200).
Run 1: 3 passed, 9 failed. TOP-008 ja was a test defect (counted the .aem.live preflight 404); fixed, rerun 2/2 passed.
Proposed: 004 Fail, 005 Fail, 006 Fail, 007 Fail (SP part; PC part not exercised), 008 Pass (Q10 rule), 009 Pass.
004: hover changes only the border colour (grey → rgb(0,130,190)); text/background unchanged. Search goes to /{lang}/search-result?q=zipper → HTTP 404. Product page may not exist on DEV yet.
005: 4 cards with equal image ratio (OK), but border-radius is 0 everywhere and cards have no link at all.
006: NEWS fetches root /query-index.json; /{lang}/news/query-index.json (TC path) is 404 on both hosts.
006: shows news-7, news-9, news-8; news-9/8 have empty publicationdate yet outrank dated rows (ja 2026-06-19, en 2026-06-25). Links all 200.
007: at 390 px titles render 2 lines (line-clamp 2) vs expected 1. At 1440 px no title is long enough → PC clamp not exercised.
008: empty mock shows "現在、お知らせはありません。" / "There is no news at the moment.", no layout break, no relevant console error.
009: hero img loading=eager + fetchpriority=high, and it is the LCP element (headless, no throttling).
Side notes (not asserted): en "VIEW ALL NEWS" links to /ja/news; en page texts are Japanese.
TypeScript: exit 0, no errors. Reports: results/DSR-609/DEV/automation-run-20261016.md and -tc008.md.
Evidence: 8 failure screenshots in evidence/ (2.4 MB). Build identity not verified; outcomes are proposals for QA.
