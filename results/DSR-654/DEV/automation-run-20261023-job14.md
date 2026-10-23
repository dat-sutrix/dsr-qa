# DSR-654 / DSR-570 DEV capture run — JOB-20261023-14

## 1. Header
- Run UTC: 2026-10-23T06:10:06.330Z → 2026-10-23T06:11:17.738Z
- Environment: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Automation HEAD: `729884debbdbf8509022efc8013d48fb7a17cc3b`
- Baseline: JOB-20261023-14 requested layout checks; DSR-570 live demo reference; BL-OVL-1 update 2026-10-21
- Build: JS Last-Modified 2026-10-22 01:48:45 GMT; CSS 2026-10-15 03:59:54 GMT; application SHA / 23 October refactor unverified.
- Exact command: `node ykk-dsr/hub/results/JOB-20261023-14/capture.cjs`
- Targets: https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook-form, https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf-form, https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook-form, https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf-form, https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/dsr-570-catalog-detail

## 2. TypeScript check
`npx tsc --noEmit` — exit 0, no errors.

## 3. Suite summary
| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---:|---|
| 10 | 6 | 4 | 0 | 0 | 1 sequential | 0 | 71.408s |
Custom Playwright capture, Chromium 156.0.8078.4; no npm suite. Proposed visual observations, not final QA verdicts. Exit 0 means capture completed, not all checks passed.

## 4. Executed tests
| TC ID | title | result | duration | one-line failure reason |
|---|---|---|---|---|
| DSR-CATOV-020 | ja-pdf-1440 | pass | Not separately measured | — |
| DSR-CATOV-020 | ja-pdf-390 | pass | Not separately measured | — |
| DSR-CATOV-020 | en-pdf-1440 | fail | Not separately measured | English catalog form displays Japanese labels, consent text and download button |
| DSR-CATOV-020 | en-pdf-390 | fail | Not separately measured | English catalog form displays Japanese labels, consent text and download button |
| DSR-CATOV-020 | ja-ebook-1440 | pass | Not separately measured | — |
| DSR-CATOV-020 | ja-ebook-390 | pass | Not separately measured | — |
| DSR-CATOV-020 | en-ebook-1440 | fail | Not separately measured | English catalog form displays Japanese labels, consent text and download button |
| DSR-CATOV-020 | en-ebook-390 | fail | Not separately measured | English catalog form displays Japanese labels, consent text and download button |
| DSR-CATOV-020 | demo-ja-1440 | pass | Not separately measured | — |
| DSR-CATOV-020 | demo-ja-390 | pass | Not separately measured | — |

## 5. Skipped tests
None.

## 6. Failed tests

### en-pdf-1440
- Review check: English-page form localization; post-capture visual observation (no Playwright assertion/file:line).
- Expected (proposed): form text follows English page language; approved translated copy unverified.
- Actual: Japanese labels “氏名（姓）”, “メールアドレス”, consent “利用規約への同意”, button “ダウンロードする”.
- suspect=product; cause=none; real-product-bug confidence=70%.
- Evidence: results/JOB-20261023-14/evidence/en-pdf-1440-01.png, results/JOB-20261023-14/evidence/en-pdf-1440-02.png, results/JOB-20261023-14/evidence/en-pdf-1440-03.png, results/JOB-20261023-14/evidence/en-pdf-1440-04.png

### en-pdf-390
- Review check: English-page form localization; post-capture visual observation (no Playwright assertion/file:line).
- Expected (proposed): form text follows English page language; approved translated copy unverified.
- Actual: Japanese labels “氏名（姓）”, “メールアドレス”, consent “利用規約への同意”, button “ダウンロードする”.
- suspect=product; cause=none; real-product-bug confidence=70%.
- Evidence: results/JOB-20261023-14/evidence/en-pdf-390-01.png, results/JOB-20261023-14/evidence/en-pdf-390-02.png, results/JOB-20261023-14/evidence/en-pdf-390-03.png, results/JOB-20261023-14/evidence/en-pdf-390-04.png

### en-ebook-1440
- Review check: English-page form localization; post-capture visual observation (no Playwright assertion/file:line).
- Expected (proposed): form text follows English page language; approved translated copy unverified.
- Actual: Japanese labels “氏名（姓）”, “メールアドレス”, consent “利用規約への同意”, button “ダウンロードする”.
- suspect=product; cause=none; real-product-bug confidence=70%.
- Evidence: results/JOB-20261023-14/evidence/en-ebook-1440-01.png, results/JOB-20261023-14/evidence/en-ebook-1440-02.png, results/JOB-20261023-14/evidence/en-ebook-1440-03.png, results/JOB-20261023-14/evidence/en-ebook-1440-04.png

### en-ebook-390
- Review check: English-page form localization; post-capture visual observation (no Playwright assertion/file:line).
- Expected (proposed): form text follows English page language; approved translated copy unverified.
- Actual: Japanese labels “氏名（姓）”, “メールアドレス”, consent “利用規約への同意”, button “ダウンロードする”.
- suspect=product; cause=none; real-product-bug confidence=70%.
- Evidence: results/JOB-20261023-14/evidence/en-ebook-390-01.png, results/JOB-20261023-14/evidence/en-ebook-390-02.png, results/JOB-20261023-14/evidence/en-ebook-390-03.png, results/JOB-20261023-14/evidence/en-ebook-390-04.png

## 7. Open points for QA
- Last-Modified does not establish deployment of the 23 October refactor commits.
- Japanese English-form text is an observed localization concern; approved translated copy and seed configuration not independently verified (70% product-bug confidence).
- No form submissions, downloads, Author access or Figma pixel comparison.
- Console 404s and exact resource URLs are in result.json and the L&F table. No attribution to the refactor is established.
- All viewport PNGs committed per the job-specific capture requirement; no traces/videos/HTML reports.
- Final run repeated the exploratory capture to add scroll overlap and HTTP-error URL evidence.
