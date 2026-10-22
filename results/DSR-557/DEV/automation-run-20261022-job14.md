# DSR-557 DEV automation run — 20261022-job14

JOB-20261022-14 (test-expectation fixes found in JOB-20261022-10, rerun ja+en on .aem.page and .aem.live). Proposed outcomes only; human QA confirms.

## 1. Header

- Run start (UTC): 2026-10-22T07:49:38Z
- Run end (UTC): 2026-10-22T07:58:33Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL = .aem.live; overridden per tier)
- Target page(s): /master/{ja,en}/test-space/list-catalog; /{ja,en}/library/catalog/qa190-cat-ebook-form; /{ja,en}/library/video/{qa587-main,qa557-dam}
- Build under test: not independently verified (no build ID exposed). No deploy observed during the run. Catalog list served by `dsr-catalog-list;folder=/content/dam/dsr/{lang}/catalogs/` (ja 6 / en 5 items, probe 07:4xZ).
- Baseline ID: DSR-557 TC sheet (CATV) + BL-OVL-1; JOB-20261022-14 rules 2–3
- Automation HEAD commit SHA: 28697db5eae8cae31dbe951080a45f5dc2fbb7b7 plus the uncommitted JOB-14 spec changes, which are committed together with this report
- Exact commands used:

```sh
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job14/run/557-page.json npm run test:dev -- tests/catalog-video/DSR-557.catalog-video.spec.ts --project=chromium --output=test-results/job14-557-page
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job14/run/557-live.json npm run test:dev -- tests/catalog-video/DSR-557.catalog-video.spec.ts --project=chromium --output=test-results/job14-557-live
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run before the reruns and again after the redirect-helper fix)

## 3. Suite summary

| Tier | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| .aem.page | 30 | 24 | 0 | 6 | 0 | 2 | 1 configured; each failed test retried once and failed again | 1m34s |
| .aem.live | 30 | 24 | 0 | 6 | 0 | 2 | 1 configured; each failed test retried once and failed again | 1m31s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: one spec file, chromium project only. Flaky outcomes: 0.

## 4. Executed tests

Duration = sum of all attempts. Result = proposed.

| TC ID | Title | Tier | Result | Duration | One-line failure reason |
|---|---|---|---|---|---|
| DSR-CATV-012 | ja > DSR-CATV-012 catalog item shows thumbnail and title | .aem.page | pass | 6.7s | — |
| DSR-CATV-013 | ja > DSR-CATV-013 PDF item without form opens in a new tab | .aem.page | pass | 9.5s | — |
| DSR-CATV-016 | ja > DSR-CATV-016 e-book item opens ebookUrl without form | .aem.page | pass | 8.4s | — |
| DSR-CATV-017 | ja > DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | .aem.page | pass | 3.6s | — |
| DSR-CATV-012 | en > DSR-CATV-012 catalog item shows thumbnail and title | .aem.page | pass | 3.6s | — |
| DSR-CATV-013 | en > DSR-CATV-013 PDF item without form opens in a new tab | .aem.page | pass | 7.1s | — |
| DSR-CATV-016 | en > DSR-CATV-016 e-book item opens ebookUrl without form | .aem.page | pass | 4.9s | — |
| DSR-CATV-017 | en > DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | .aem.page | pass | 3.3s | — |
| DSR-CATV-001 | ja video page > DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) | .aem.page | pass | 2.2s | — |
| DSR-CATV-001 | ja video page > DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) | .aem.page | pass | 2.0s | — |
| DSR-CATV-002 | ja video page > DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) | .aem.page | pass | 1.7s | — |
| DSR-CATV-006 | ja video page > DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) | .aem.page | pass | 1.9s | — |
| DSR-CATV-001 | ja video live > DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) | .aem.page | pass | 2.4s | — |
| DSR-CATV-001 | ja video live > DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) | .aem.page | pass | 2.5s | — |
| DSR-CATV-002 | ja video live > DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) | .aem.page | pass | 1.7s | — |
| DSR-CATV-006 | ja video live > DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) | .aem.page | pass | 1.8s | — |
| DSR-CATV-001 | en video page > DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) | .aem.page | pass | 1.7s | — |
| DSR-CATV-001 | en video page > DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) | .aem.page | pass | 2.8s | — |
| DSR-CATV-002 | en video page > DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) | .aem.page | pass | 3.3s | — |
| DSR-CATV-006 | en video page > DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) | .aem.page | pass | 2.0s | — |
| DSR-CATV-001 | en video live > DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) | .aem.page | pass | 2.0s | — |
| DSR-CATV-001 | en video live > DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) | .aem.page | pass | 2.6s | — |
| DSR-CATV-002 | en video live > DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) | .aem.page | pass | 1.7s | — |
| DSR-CATV-006 | en video live > DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) | .aem.page | pass | 1.7s | — |
| DSR-CATV-012 | ja > DSR-CATV-012 catalog item shows thumbnail and title | .aem.live | pass | 5.3s | — |
| DSR-CATV-013 | ja > DSR-CATV-013 PDF item without form opens in a new tab | .aem.live | pass | 8.5s | — |
| DSR-CATV-016 | ja > DSR-CATV-016 e-book item opens ebookUrl without form | .aem.live | pass | 6.5s | — |
| DSR-CATV-017 | ja > DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | .aem.live | pass | 4.3s | — |
| DSR-CATV-012 | en > DSR-CATV-012 catalog item shows thumbnail and title | .aem.live | pass | 4.4s | — |
| DSR-CATV-013 | en > DSR-CATV-013 PDF item without form opens in a new tab | .aem.live | pass | 8.1s | — |
| DSR-CATV-016 | en > DSR-CATV-016 e-book item opens ebookUrl without form | .aem.live | pass | 5.7s | — |
| DSR-CATV-017 | en > DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | .aem.live | pass | 4.5s | — |
| DSR-CATV-001 | ja video page > DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) | .aem.live | pass | 2.1s | — |
| DSR-CATV-001 | ja video page > DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) | .aem.live | pass | 2.6s | — |
| DSR-CATV-002 | ja video page > DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) | .aem.live | pass | 1.5s | — |
| DSR-CATV-006 | ja video page > DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) | .aem.live | pass | 2.0s | — |
| DSR-CATV-001 | ja video live > DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) | .aem.live | pass | 1.7s | — |
| DSR-CATV-001 | ja video live > DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) | .aem.live | pass | 1.7s | — |
| DSR-CATV-002 | ja video live > DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) | .aem.live | pass | 1.6s | — |
| DSR-CATV-006 | ja video live > DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) | .aem.live | pass | 1.7s | — |
| DSR-CATV-001 | en video page > DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) | .aem.live | pass | 1.4s | — |
| DSR-CATV-001 | en video page > DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) | .aem.live | pass | 1.7s | — |
| DSR-CATV-002 | en video page > DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) | .aem.live | pass | 1.2s | — |
| DSR-CATV-006 | en video page > DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) | .aem.live | pass | 1.5s | — |
| DSR-CATV-001 | en video live > DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) | .aem.live | pass | 1.4s | — |
| DSR-CATV-001 | en video live > DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) | .aem.live | pass | 1.8s | — |
| DSR-CATV-002 | en video live > DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) | .aem.live | pass | 1.5s | — |
| DSR-CATV-006 | en video live > DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) | .aem.live | pass | 1.4s | — |

## 5. Skipped tests

| TC ID | Tier | Verbatim skip reason |
|---|---|---|
| DSR-CATV-018 [ja] | .aem.page | Blocked – no DEV data for QA190 NEW 0, QA190 NEW 10, QA190 NEW 11 (ja) |
| DSR-CATV-019 [ja] | .aem.page | Blocked – no DEV data for QA190 UPD 0, QA190 UPD 10, QA190 UPD 11 (ja) |
| DSR-CATV-020 [ja] | .aem.page | Blocked – no DEV data for QA190 BOTH, qa190-cat-noupd (ja) |
| DSR-CATV-018 [en] | .aem.page | Blocked – no DEV data for QA190 NEW 0, QA190 NEW 10, QA190 NEW 11 (en) |
| DSR-CATV-019 [en] | .aem.page | Blocked – no DEV data for QA190 UPD 0, QA190 UPD 10, QA190 UPD 11 (en) |
| DSR-CATV-020 [en] | .aem.page | Blocked – no DEV data for QA190 BOTH, qa190-cat-noupd (en) |
| DSR-CATV-018 [ja] | .aem.live | Blocked – no DEV data for QA190 NEW 0, QA190 NEW 10, QA190 NEW 11 (ja) |
| DSR-CATV-019 [ja] | .aem.live | Blocked – no DEV data for QA190 UPD 0, QA190 UPD 10, QA190 UPD 11 (ja) |
| DSR-CATV-020 [ja] | .aem.live | Blocked – no DEV data for QA190 BOTH, qa190-cat-noupd (ja) |
| DSR-CATV-018 [en] | .aem.live | Blocked – no DEV data for QA190 NEW 0, QA190 NEW 10, QA190 NEW 11 (en) |
| DSR-CATV-019 [en] | .aem.live | Blocked – no DEV data for QA190 UPD 0, QA190 UPD 10, QA190 UPD 11 (en) |
| DSR-CATV-020 [en] | .aem.live | Blocked – no DEV data for QA190 BOTH, qa190-cat-noupd (en) |

## 6. Failed tests

None
Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- CATV-017 now expects the DSR-655 Y3 gated behaviour (card → /{lang}/library/catalog/qa190-cat-ebook-form with form) – recorded in docs/DSR-570/automation-spec.md A8 (the job names docs/DSR-654 + docs/DSR-570 only).
- CATV-018..020 are blocked-data: the QA190 NEW/UPD/BOTH CFs live in the old folder, and dsr-catalog-list reads only DSR CFs (/content/dam/dsr/{lang}/). Re-seeding them as content CF + DSR CF would unblock them.
- The empty-list skip "Blocked-by: catalog list AEM query deploy (Martin 22/10)" is in the shared helper, so it also covers CATV-012. It did not trigger: the list returned ja 6 / en 5, as Martin expected.
- The dsr-catalog-list item shape (data.related.items[].catalog) comes from probing DEV on 2026-10-22, not from a dev spec.
- Read-only: no form submitted, no AEM content changed.
