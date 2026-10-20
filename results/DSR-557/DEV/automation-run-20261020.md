# DSR-557 DEV automation run — 20261020 (JOB-20261020-05, rerun after catalog overlay merge)

## 1. Header

- Run start (UTC): 2026-10-20T05:54:48Z
- Run end (UTC): 2026-10-20T05:56:37Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/{ja,en}/test-space/list-catalog`, `/master/{ja,en}/test-space/dsr-173-video-detail?id=…`
- Build under test: not independently verified. The DSR-655 Y3 front-end change (e-book gated like a PDF) landed between ~05:52Z and ~05:56Z, during this run.
- Baseline ID: none for DSR-557 (TC Expected results, unchanged)
- Automation HEAD commit SHA: `098be3c2ae7fb0464ed9fdb9ebc599487c724277` (no code changes)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job0505-557.json npm run test:dev -- tests/catalog-video/DSR-557.catalog-video.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit` (2026-10-20T05:52Z, shared with the DSR-570 run)
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 22 | 21 | 1 | 0 | 1 | 2 | 1 configured; 1 used (failed again) | 1.8 min |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope: one spec file, ja + en, Chromium. Flaky: 0.

## 4. Executed tests

Durations are per attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATV-012 | ja › catalog item shows thumbnail and title | passed | 8.9s | — |
| DSR-CATV-013 | ja › PDF item without form opens in a new tab | passed | 11.9s | — |
| DSR-CATV-016 | ja › e-book item opens ebookUrl without form | passed | 6.1s | — |
| DSR-CATV-017 | ja › e-book item flagged requiresForm opens ebookUrl without form | passed | 6.5s | — (pre DSR-655 Y3 deploy) |
| DSR-CATV-018 | ja › NEW label within 10 days of publishDate | passed | 3.8s | — |
| DSR-CATV-019 | ja › UPDATE label within 10 days of updateDate | passed | 3.5s | — |
| DSR-CATV-020 | ja › only NEW when publishDate and updateDate both apply | passed | 3.5s | — |
| DSR-CATV-001 | ja › no autoplay before click | passed | 6.1s | — |
| DSR-CATV-002 | ja › YouTube embed src after click (sort-main) | passed | 4.8s | — |
| DSR-CATV-002 | ja › YouTube embed src after click (long) | passed | 4.6s | — |
| DSR-CATV-006 | ja › no YouTube/Youku request before interaction | passed | 5.2s | — |
| DSR-CATV-012 | en › catalog item shows thumbnail and title | passed | 8.2s | — |
| DSR-CATV-013 | en › PDF item without form opens in a new tab | passed | 6.9s | — |
| DSR-CATV-016 | en › e-book item opens ebookUrl without form | passed | 5.4s | — |
| DSR-CATV-017 | en › e-book item flagged requiresForm opens ebookUrl without form | failed | 2.1s + 2.2s | card href = /en/library/catalog/qa190-cat-ebook-form, not ebookUrl |
| DSR-CATV-018 | en › NEW label within 10 days of publishDate | passed | 1.9s | — |
| DSR-CATV-019 | en › UPDATE label within 10 days of updateDate | passed | 1.6s | — |
| DSR-CATV-020 | en › only NEW when publishDate and updateDate both apply | passed | 1.5s | — |
| DSR-CATV-001 | en › no autoplay before click | passed | 2.5s | — |
| DSR-CATV-002 | en › YouTube embed src after click (sort-main) | passed | 1.7s | — |
| DSR-CATV-002 | en › YouTube embed src after click (long) | passed | 1.3s | — |
| DSR-CATV-006 | en › no YouTube/Youku request before interaction | passed | 2.2s | — |

## 5. Skipped tests

None.

## 6. Failed tests

### DSR-CATV-017 [en] — e-book item flagged requiresForm opens ebookUrl without form

- Failing assertion: `expect(normalize(href)).toBe(normalize(ebook.ebookUrl!))` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:102`
- Expected: `https://www.ykkfastening.com/`
- Actual: `https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook-form` (that page returns 404 on .live)
- Attempt(s): failed / failed on retry
- Evidence paths: `test-results/catalog-video-DSR-557.cata-a1b55-opens-ebookUrl-without-form-chromium{,-retry1}/test-failed-1.png` (gitignored). Committed copy: `ykk-dsr/hub/results/JOB-20261020-05/evidence/DSR-CATV-017_en.png`
- Classification: **merge-expected (product decision), so the TC is outdated (suspect: test)**. The deployed `scripts/catalog-link.js` says: "An e-book used to open without the form whatever requiresForm said (EX-10); it is now gated like a PDF (DSR-655 Y3, decided 2026-10-20)". The ja run passed only because it ran before the deploy. At 05:57Z ja shows the same `/ja/library/catalog/qa190-cat-ebook-form` link.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- The CATV-017 Expected result ("opens ebookUrl without form") contradicts DSR-655 Y3. A TC/Expected update is needed before the next run. Expected was not changed here.
- The CATV-017 [ja] pass is not representative of the current build.
- The build identity was not verified.
