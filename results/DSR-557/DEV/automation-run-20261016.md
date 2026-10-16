# DSR-557 DEV automation run — 20261016

## 1. Header

- Run start (UTC): 2026-10-16T05:04:08Z
- Run end (UTC): 2026-10-16T05:07:28Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/en/test-space/list-catalog`, `/master/ja/test-space/list-catalog` (both HTTP 200)
- Build under test: not independently verified (no build ID exposed on publish)
- Baseline ID: none for DSR-557. Expected results come from JOB-20261016-02 (QA190 seeded data, label rule computed in Asia/Tokyo).
- Automation HEAD commit SHA: `8ab2e7c66a8fa38797fb3a94ef6cd146b9880c41` (run-only job, no code change)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job20261016-02.json npm run test:dev -- tests/catalog-video --project=chromium --grep "DSR-CATV-0(12|13|16|17|18|19|20)"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 14 | 6 | 8 | 0 | 1 | 1 (2 configured) | 1 configured; 8 used (all 8 failures failed again on retry) | 198.9s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/catalog-video` grep `DSR-CATV-0(12|13|16|17|18|19|20)`, languages ja + en, Chromium. Flaky outcomes: 0.
Run date in Asia/Tokyo (`today()`): 2026-10-16.

## 4. Executed tests

Duration is the first attempt; failed tests show first / retry.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATV-012 | ja › DSR-CATV-012 catalog item shows thumbnail and title | passed | 8.9s | — (only 11 rendered cards checked; see §7) |
| DSR-CATV-013 | ja › DSR-CATV-013 PDF item without form opens in a new tab | passed | 9.0s | — (exercised "catalog 02", not qa190-cat-pdf; see §7) |
| DSR-CATV-016 | ja › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 4.9s | — (exercised "catalog 01", not qa190-cat-ebook; see §7) |
| DSR-CATV-017 | ja › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | failed | 7.4s / 7.3s | card "QA190 e-book form" not rendered (count 0, expected 1) |
| DSR-CATV-018 | ja › DSR-CATV-018 NEW label within 10 days of publishDate | failed | 4.8s / 8.6s | "QA190 NEW 11" read as NEW because the title text contains "NEW" (test defect) |
| DSR-CATV-019 | ja › DSR-CATV-019 UPDATE label within 10 days of updateDate | failed | 5.1s / 5.0s | same shared assertion as 018; all UPDATE rows match |
| DSR-CATV-020 | ja › DSR-CATV-020 only NEW when publishDate and updateDate both apply | failed | 5.9s / 6.9s | same shared assertion as 018; BOTH row matches |
| DSR-CATV-012 | en › DSR-CATV-012 catalog item shows thumbnail and title | passed | 6.8s | — (only 11 rendered cards checked; see §7) |
| DSR-CATV-013 | en › DSR-CATV-013 PDF item without form opens in a new tab | passed | 9.8s | — (exercised "catalog 02", not qa190-cat-pdf; see §7) |
| DSR-CATV-016 | en › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 9.6s | — (exercised "catalog 01", not qa190-cat-ebook; see §7) |
| DSR-CATV-017 | en › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | failed | 9.5s / 11.0s | card "QA190 e-book form" not rendered (count 0, expected 1) |
| DSR-CATV-018 | en › DSR-CATV-018 NEW label within 10 days of publishDate | failed | 6.9s / 6.4s | "QA190 NEW 11" read as NEW because the title text contains "NEW" (test defect) |
| DSR-CATV-019 | en › DSR-CATV-019 UPDATE label within 10 days of updateDate | failed | 8.4s / 8.3s | same shared assertion as 018; all UPDATE rows match |
| DSR-CATV-020 | en › DSR-CATV-020 only NEW when publishDate and updateDate both apply | failed | 6.1s / 6.4s | same shared assertion as 018; BOTH row matches |

Observed data (ja and en identical): the `dm-catalog-list` GraphQL response returns 14 items (12 qa190 + "catalog 01", "catalog 02"). The page renders 11 cards. These 3 qa190 items have no card: `qa190-cat-ebook`, `qa190-cat-ebook-form`, `qa190-cat-pdf-form`.

DSR-CATV-012 (rendered cards): every card has a non-empty title, a thumbnail with naturalWidth > 0 (1200 for qa190 items, 220 for catalog 01/02) and one date in `.cards-card-meta`.

DSR-CATV-013 observed: link href `.../test/pdf/sample-pdf-a4-size-65kb.pdf`, `target="_blank"`, `rel="noopener"`, no `download`. The response was HTTP 200 `application/pdf` with `content-disposition: inline`. 2 pages were open and the original tab stayed on the list-catalog URL.

DSR-CATV-016 observed: ebookUrl `https://translate.google.com/`, navigation request went to that URL, the popup had 0 `<form>` elements, and the original tab was unchanged.

### Label table (DSR-CATV-018/019/020), today = 2026-10-16 (Asia/Tokyo)

"Badge in DOM" is read from the Playwright ARIA snapshot (`error-context.md`, first attempt). It shows the separate NEW/UPDATE badge element next to the thumbnail. "Test read" is what `CatalogDisplayPage.label()` returned. It scans the whole card text, title included.

| Item (CF name) | Title on page | publishDate | updateDate | Expected | Badge in DOM | Test read | Match (badge) |
|---|---|---|---|---|---|---|---|
| qa190-cat-new-0 | QA190 NEW 0 | 2026-10-15 | – | NEW | NEW | NEW | yes |
| qa190-cat-new-10 | QA190 NEW 10 | 2026-10-06 | – | NEW | NEW | NEW | yes |
| qa190-cat-new-11 | QA190 NEW 11 | 2026-10-05 | – | none | none | **NEW** | yes |
| qa190-cat-upd-0 | QA190 UPD 0 | 2026-09-15 | 2026-10-15 | UPDATE | UPDATE | UPDATE | yes |
| qa190-cat-upd-10 | QA190 UPD 10 | 2026-09-15 | 2026-10-06 | UPDATE | UPDATE | UPDATE | yes |
| qa190-cat-upd-11 | QA190 UPD 11 | 2026-09-15 | 2026-10-05 | none | none | none | yes |
| qa190-cat-both | QA190 BOTH | 2026-10-14 | 2026-10-15 | NEW | NEW | NEW | yes |
| qa190-cat-noupd | qa190-cat-noupd | 2026-10-14 | – | NEW | NEW | NEW | yes |
| qa-190-cat-pdf | QA190 PDF catalog | 2026-09-15 | – | none | none | none | yes |
| qa190-cat-pdf-form | QA190 PDF form required | 2026-09-15 | – | none | not rendered | – | n/a |
| qa190-cat-ebook | QA190 e-book | 2026-09-15 | – | none | not rendered | – | n/a |
| qa190-cat-ebook-form | QA190 e-book form | 2026-09-15 | – | none | not rendered | – | n/a |
| dm-catalog-1 (non-QA) | catalog 02 | 2026-09-03 | 2026-09-03 | none | none | none | yes |
| dm-catalog-10 (non-QA) | catalog 01 | 2026-09-03 | 2026-09-03 | none | none | none | yes |

All 9 rendered qa190 cards show the expected badge in both languages, including both 11-day boundaries (new-11, upd-11 → no label), NEW precedence (both) and the 10-day inclusive boundary (new-10, upd-10). The date in the card meta is the publishDate (e.g. UPD 0 shows 2026.09.15).

## 5. Skipped tests

None.

## 6. Failed tests

### DSR-CATV-017 (ja, en) — e-book item flagged requiresForm opens ebookUrl without form

- Failing assertion: `await expect(item).toHaveCount(1)` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:87`
- Expected: one card titled "QA190 e-book form"
- Actual: 0 cards. The item is in the GraphQL response (`catalogType: ebook`, `requiresForm: true`, `ebookUrl: "qa190-cat-ebook"`) but not rendered. Its `ebookUrl` is not a URL; the job input says `https://www.ykkfastening.com/`.
- Attempt(s): failed / failed on retry
- Evidence paths: `ykk-dsr/hub/results/JOB-20261016-02/evidence/DSR-CATV-017_ja.png`, `..._en.png` (committed). Also `test-results/catalog-video-DSR-557.cata-e2823-opens-ebookUrl-without-form-chromium/` (ja) and `...-a1b55-...` (en): screenshot, trace, error-context.

### DSR-CATV-018 / 019 / 020 (ja, en) — label rule

- Failing assertion: `expect(rows.filter(r => r.shown !== null && r.shown !== r.expected)).toEqual([])` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:114`. All three TCs run this same assertion over every item.
- Expected: `[]`
- Actual: one row: `{ title: "QA190 NEW 11", publishDate: "2026-10-05", updateDate: null, today: "2026-10-16", expected: "", shown: "NEW" }`
- Cause (proposed): test defect. `CatalogDisplayPage.label()` (`pages/CatalogDisplayPage.ts:32`) matches `\bNEW\b` on the whole card `innerText`, and the title "QA190 NEW 11" contains "NEW". The ARIA snapshot shows no badge element on that card. The product label appears correct for every rendered item (table in §4).
- Attempt(s): failed / failed on retry (identical)
- Evidence paths: `ykk-dsr/hub/results/JOB-20261016-02/evidence/DSR-CATV-01{8,9}_{ja,en}.png`, `DSR-CATV-020_{ja,en}.png` (committed). ARIA snapshot: `test-results/catalog-video-DSR-557.cata-eb87b-thin-10-days-of-publishDate-chromium/error-context.md` (en), `...-65adf-...` (ja).

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs. Only failure screenshots are committed under the hub result folder.

## 7. Open points for QA

- **Data ≠ job input.** 3 of 12 qa190 items are not rendered on either language page:
  - `qa190-cat-ebook` and `qa190-cat-ebook-form` have `ebookUrl: "qa190-cat-ebook"`, not `https://www.ykkfastening.com/`.
  - `qa190-cat-pdf-form` has a valid `pdfAsset`. Why it is hidden is unknown; it may be by design while the form (DSR-570) is pending, or a product issue.
  - The CF for "QA190 PDF catalog" is named `qa-190-cat-pdf`, not `qa190-cat-pdf`.
- **DSR-CATV-012** passed in Playwright, but it only iterates rendered cards. The job criterion "each qa190 item" is not met for those 3 items, so the proposed outcome is Fail (suspect data).
- **DSR-CATV-013 / 016** passed, but `pick()` selects the first matching item in the GraphQL order. That gave "catalog 02" (`sample-pdf-a4-size-65kb.pdf`) and "catalog 01" (`translate.google.com`), not qa190-cat-pdf / qa190-cat-ebook.
  - The card "QA190 PDF catalog" links to `.../test/qa190-catalog-sample.pdf` (ARIA snapshot). Its target/rel/download were not asserted in this run.
  - qa190-cat-ebook could not be exercised (not rendered).
- **DSR-CATV-018/019/020**: the Playwright failure is a test defect (see §6). Per-TC breakdown based on the ARIA-snapshot badges: 018 NEW rows correct, 019 UPDATE rows correct, 020 BOTH → NEW correct. This reading is manual and was not asserted by the automation.
- Suggested follow-up (not done; this job is run-only):
  - Read the label from the badge element only (add a `catalog-label` data-testid when available).
  - Make 018/019/020 assert only their own rows.
  - Pin 013/016/017 to the qa190 items by CF name/title.
- Build identity and Author-side CF values were not independently verified; values come from the publish GraphQL response.
