# DSR-557 DEV automation run — 20261022-job10

JOB-20261022-10 (catalog rerun after Agent Author data fix JOB-20261022-07). Proposed outcomes only; human QA confirms.

## 1. Header

- Run start (UTC): 2026-10-22T06:14:04.336Z
- Run end (UTC): 2026-10-22T06:58:40.454Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL = .aem.live; overridden per tier)
- Target page(s): /master/{ja,en}/test-space/list-catalog (DSR_PATHS unset → v1), card targets /{lang}/library/catalog/{id}
- Build under test: not independently verified (no build ID exposed). Code deploy observed at 2026-10-22T06:19:14Z (last-modified of blocks/listing/types.js, blocks/listing/adapters/cf.js, scripts/catalog-link.js on .aem.live); catalog list switched from dm-catalog-list to dsr-catalog-list;folder=/content/dam/dsr/{lang}/. Runs before/after are labelled.
- Baseline ID: DSR-557 TC sheet (CATV 12.0–20.0) + BL-OVL-1
- Automation HEAD commit SHA: af233042023099969048f3de0c84aee54dc76c6f
- Exact commands used (in this order):

```sh
# .aem.page (run 1, 06:14Z, pre-deploy)
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job10/run/557-page.json npm run test:dev -- tests/catalog-video/DSR-557.catalog-video.spec.ts --project=chromium --grep "DSR-CATV-0(1[2-9]|20)" --output=test-results/job10-557-page
# .aem.live
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job10/run/557-live.json npm run test:dev -- tests/catalog-video/DSR-557.catalog-video.spec.ts --project=chromium --grep "DSR-CATV-0(1[2-9]|20)" --output=test-results/job10-557-live
# .aem.page (run 2, post-deploy)
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job10/run/557-page2.json npm run test:dev -- tests/catalog-video/DSR-557.catalog-video.spec.ts --project=chromium --grep "DSR-CATV-0(1[2-9]|20)" --output=test-results/job10-557-page2
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run once at 06:13:56Z on the same tree before the test runs).

## 3. Suite summary

| Run | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| .aem.page (run 1, 06:14Z, pre-deploy) | 14 | 12 | 2 | 0 | 1 | 2 | 1 configured; 2 tests retried | 98s |
| .aem.live | 14 | 1 | 6 | 7 | 1 | 2 | 1 configured; 6 tests retried | 396s |
| .aem.page (run 2, post-deploy) | 14 | 2 | 0 | 12 | 0 | 2 | 1 configured; 0 tests retried | 220s |

Counts are runner outcomes (unique tests). Job-level proposed verdicts (pass/fail/blocked/skip with suspect) are in ykk-dsr/hub/results/JOB-20261022-10/result.json; the column "Result" below shows the proposed verdict. Scope/browser: chromium only. Flaky: 0.

## 4. Executed tests

Duration = last attempt.

| TC ID | Title | Host | Result | Duration | One-line failure reason |
|---|---|---|---|---|---|
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 11.1s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 7.0s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 5.4s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | .aem.page (run 1, 06:14Z, pre-deploy) | fail | 2.4s | test expectation to fix: e-book + requiresForm is gated since DSR-655 Y3 (catalog-link.js header, 2026-10-20); card links to detail page |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 3.7s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 3.8s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 3.3s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 11.9s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 10.5s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 8.5s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | .aem.page (run 1, 06:14Z, pre-deploy) | fail | 4.2s | test expectation to fix: e-book + requiresForm is gated since DSR-655 Y3 (catalog-link.js header, 2026-10-20); card links to detail page |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 4.7s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 4.6s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | .aem.page (run 1, 06:14Z, pre-deploy) | pass | 2.8s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | .aem.live | fail | 20.9s | ja list .cards.catalog li not found at 06:34Z (dsr-catalog-list); not reproduced 07:04Z (6 cards on .page and .live) |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | .aem.live | fail | 21.1s | ja list .cards.catalog li not found at 06:34Z (dsr-catalog-list); not reproduced 07:04Z (6 cards on .page and .live) |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | .aem.live | fail | 20.7s | ja list .cards.catalog li not found at 06:34Z (dsr-catalog-list); not reproduced 07:04Z (6 cards on .page and .live) |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | .aem.live | fail | 20.6s | ja list .cards.catalog li not found at 06:34Z (dsr-catalog-list); not reproduced 07:04Z (6 cards on .page and .live) |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | .aem.live | fail | 20.7s | ja list .cards.catalog li not found at 06:34Z (dsr-catalog-list); not reproduced 07:04Z (6 cards on .page and .live) |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | .aem.live | fail | 20.7s | ja list .cards.catalog li not found at 06:34Z (dsr-catalog-list); not reproduced 07:04Z (6 cards on .page and .live) |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | .aem.live | pass | 16.6s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | .aem.page (run 2, post-deploy) | pass | 17.2s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | .aem.page (run 2, post-deploy) | pass | 16.5s | — |

## 5. Skipped tests

| TC ID | Host | Verbatim skip reason |
|---|---|---|
| DSR-CATV-020 [ja] | .aem.live | Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dm-catalog-list response) (en) |
| DSR-CATV-013 [en] | .aem.live | Blocked – no DEV data: /content/dam/common/en/catalogs/qa190-cat-pdf absent from dm-catalog-list (en) |
| DSR-CATV-016 [en] | .aem.live | Blocked – no DEV data: /content/dam/common/en/catalogs/qa190-cat-ebook absent from dm-catalog-list (en) |
| DSR-CATV-017 [en] | .aem.live | Blocked – no DEV data: /content/dam/common/en/catalogs/qa190-cat-ebook-form absent from dm-catalog-list (en) |
| DSR-CATV-018 [en] | .aem.live | Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dm-catalog-list response) (en) |
| DSR-CATV-019 [en] | .aem.live | Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dm-catalog-list response) (en) |
| DSR-CATV-020 [en] | .aem.live | Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dm-catalog-list response) (en) |
| DSR-CATV-013 [ja] | .aem.page (run 2, post-deploy) | Blocked – no DEV data: /content/dam/common/en/catalogs/qa190-cat-pdf absent from dm-catalog-list (en) |
| DSR-CATV-016 [ja] | .aem.page (run 2, post-deploy) | Blocked – no DEV data: /content/dam/common/en/catalogs/qa190-cat-ebook absent from dm-catalog-list (en) |
| DSR-CATV-017 [ja] | .aem.page (run 2, post-deploy) | Blocked – no DEV data: /content/dam/common/en/catalogs/qa190-cat-ebook-form absent from dm-catalog-list (en) |
| DSR-CATV-018 [ja] | .aem.page (run 2, post-deploy) | Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dm-catalog-list response) (en) |
| DSR-CATV-019 [ja] | .aem.page (run 2, post-deploy) | Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dm-catalog-list response) (en) |
| DSR-CATV-020 [ja] | .aem.page (run 2, post-deploy) | Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dm-catalog-list response) (en) |
| DSR-CATV-013 [en] | .aem.page (run 2, post-deploy) | Blocked – no DEV data: /content/dam/common/en/catalogs/qa190-cat-pdf absent from dm-catalog-list (en) |
| DSR-CATV-016 [en] | .aem.page (run 2, post-deploy) | Blocked – no DEV data: /content/dam/common/en/catalogs/qa190-cat-ebook absent from dm-catalog-list (en) |
| DSR-CATV-017 [en] | .aem.page (run 2, post-deploy) | Blocked – no DEV data: /content/dam/common/en/catalogs/qa190-cat-ebook-form absent from dm-catalog-list (en) |
| DSR-CATV-018 [en] | .aem.page (run 2, post-deploy) | Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dm-catalog-list response) (en) |
| DSR-CATV-019 [en] | .aem.page (run 2, post-deploy) | Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dm-catalog-list response) (en) |
| DSR-CATV-020 [en] | .aem.page (run 2, post-deploy) | Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dm-catalog-list response) (en) |

## 6. Failed tests

### DSR-CATV-017 — DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form

- Failing assertion — `tests/catalog-video/DSR-557.catalog-video.spec.ts:104`:
  - .aem.page (run 1, 06:14Z, pre-deploy) (2 attempts, all failed): Error: expect(received).toBe(expected) // Object.is equality; Expected: "https://www.ykkfastening.com/"; Received: "https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-ebook-form"
  - .aem.page (run 1, 06:14Z, pre-deploy) (2 attempts, all failed): Error: expect(received).toBe(expected) // Object.is equality; Expected: "https://www.ykkfastening.com/"; Received: "https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-ebook-form"
  - .aem.live (2 attempts, all failed): Error: expect(locator).toBeVisible() failed; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect test; cause none; product-bug confidence 10% — test expectation to fix: e-book + requiresForm is gated since DSR-655 Y3 (catalog-link.js header, 2026-10-20); card links to detail page
- Evidence paths: `test-results/job10-557-page/catalog-video-DSR-557.cata-e2823-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`, `test-results/job10-557-page/catalog-video-DSR-557.cata-a1b55-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`, `test-results/job10-557-live/catalog-video-DSR-557.cata-e2823-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`

### DSR-CATV-012 — DSR-CATV-012 catalog item shows thumbnail and title

- Failing assertion — `tests/catalog-video/DSR-557.catalog-video.spec.ts:52`:
  - .aem.live (2 attempts, all failed): Error: expect(locator).toBeVisible() failed; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect env; cause none; product-bug confidence 10% — ja list .cards.catalog li not found at 06:34Z (dsr-catalog-list); not reproduced 07:04Z (6 cards on .page and .live)
- Evidence paths: `test-results/job10-557-live/catalog-video-DSR-557.cata-4f590-m-shows-thumbnail-and-title-chromium-retry1/test-failed-1.png`

### DSR-CATV-013 — DSR-CATV-013 PDF item without form opens in a new tab

- Failing assertion — `tests/catalog-video/DSR-557.catalog-video.spec.ts:76`:
  - .aem.live (2 attempts, all failed): Error: expect(locator).toBeVisible() failed; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect env; cause none; product-bug confidence 10% — ja list .cards.catalog li not found at 06:34Z (dsr-catalog-list); not reproduced 07:04Z (6 cards on .page and .live)
- Evidence paths: `test-results/job10-557-live/catalog-video-DSR-557.cata-96526-out-form-opens-in-a-new-tab-chromium-retry1/test-failed-1.png`

### DSR-CATV-016 — DSR-CATV-016 e-book item opens ebookUrl without form

- Failing assertion — `tests/catalog-video/DSR-557.catalog-video.spec.ts:104`:
  - .aem.live (2 attempts, all failed): Error: expect(locator).toBeVisible() failed; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect env; cause none; product-bug confidence 10% — ja list .cards.catalog li not found at 06:34Z (dsr-catalog-list); not reproduced 07:04Z (6 cards on .page and .live)
- Evidence paths: `test-results/job10-557-live/catalog-video-DSR-557.cata-99949-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`

### DSR-CATV-018 — DSR-CATV-018 NEW label within 10 days of publishDate

- Failing assertion — `tests/catalog-video/DSR-557.catalog-video.spec.ts:129`:
  - .aem.live (2 attempts, all failed): Error: expect(locator).toBeVisible() failed; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect env; cause none; product-bug confidence 10% — ja list .cards.catalog li not found at 06:34Z (dsr-catalog-list); not reproduced 07:04Z (6 cards on .page and .live)
- Evidence paths: `test-results/job10-557-live/catalog-video-DSR-557.cata-65adf-thin-10-days-of-publishDate-chromium-retry1/test-failed-1.png`

### DSR-CATV-019 — DSR-CATV-019 UPDATE label within 10 days of updateDate

- Failing assertion — `tests/catalog-video/DSR-557.catalog-video.spec.ts:129`:
  - .aem.live (2 attempts, all failed): Error: expect(locator).toBeVisible() failed; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect env; cause none; product-bug confidence 10% — ja list .cards.catalog li not found at 06:34Z (dsr-catalog-list); not reproduced 07:04Z (6 cards on .page and .live)
- Evidence paths: `test-results/job10-557-live/catalog-video-DSR-557.cata-84297-ithin-10-days-of-updateDate-chromium-retry1/test-failed-1.png`

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; selected failure screenshots are copied to `ykk-dsr/hub/results/JOB-20261022-10/evidence/`.

## 7. Open points for QA

- Preflight: content CFs common/{ja,en}/catalogs/qa190-cat-pdf-form + -ebook-form have requiresForm=true (dm-catalog-list 06:12Z), but none of the 4 -form overlay pages has a requiresForm row (DSR CF cq:lastModified 2026-10-21T14:17–14:20Z). BL-OVL-1: a content CF change shows only after the DSR CF is republished; JOB-20261022-07 published the content CFs only. Proposed fix: Agent Author republishes dsr/{ja,en}/catalogs/qa190-cat-pdf-form and -ebook-form (preview + publish), then rerun.
- A code deploy at 06:19:14Z changed the catalog list query (dm-catalog-list → dsr-catalog-list;folder=/content/dam/dsr/{lang}/). Runs after it are on a different build than page run 1; build identity is not independently verified.
- Content CF titles/dates are dev samples (catalog pdf / qa190-cat-pdf ja, 2026-09-03), not TD-190 values.
- Not verified: Author-side state (no Author access in this lane); whether a republished -form page drops the pdfAsset row.
- CATV-017 (page run 1, pre-deploy): e-book requiresForm=true card links to /{lang}/library/catalog/qa190-cat-ebook-form, not ebookUrl. Live scripts/catalog-link.js states e-book is gated since DSR-655 Y3 (2026-10-20) → TC expectation looks outdated (suspect test, 10%). Re-baseline needed.
- Post-deploy runs: CATV-013..020 skip because the spec waits for dm-catalog-list; the spec must be retargeted to dsr-catalog-list (not done – run-only job). Those skips are not passes.
- ja .aem.live CATV-012..019 failed at 06:34Z (no .cards.catalog li); at 07:04Z the same list renders 6 cards on .page and .live → transient, suspect env.
- Side observation (DSR-638, not tested here): /ja/library/catalog is served with an empty <main> since 06:12:53Z on both tiers.
