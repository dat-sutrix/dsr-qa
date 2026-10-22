# DSR-590 DEV automation run — 20261022-capture

Job: JOB-20261022-04 step 2 – PC 1440 / SP 390 full-page captures of both demo pages for the Look & Feel card. Capture only, no layout assertions.

## 1. Header

- Run start (UTC): 2026-10-22T02:23:49Z
- Run end (UTC): 2026-10-22T02:24:47Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live, then https://main--dsr-eds-dev--sutrix-projects.aem.page
- Target page(s): `/master/ja/test-space/dsr-590-eco-top-page`, `/master/ja/test-space/dsr-590-eco-detail-page`
- Build under test: not independently verified
- Baseline ID: none (captures for human L&F review; Figma 3351-51595 not accessible to the agent)
- Automation HEAD commit SHA: 17074b71fbaa189501bd2d144cfcaaf9b70ad2c5 + new spec `tests/eco-products/DSR-590.layout-capture.spec.ts` (committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/eco-probe/cap.json npx playwright test tests/eco-products/DSR-590.layout-capture.spec.ts --project=chromium
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/eco-probe/cap-page.json npx playwright test tests/eco-products/DSR-590.layout-capture.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 8 (4 per host) | 8 | 0 | 0 | 0 / 0 | 2 | 1 configured; 0 used | 24.2 s (live) + 30.4 s (page) |

"Passed" = page answered HTTP 200 and the PNG was written; it is not a layout verdict.

## 4. Executed tests

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| — | DSR-590 capture [ja] eco-top PC 1440 full page | captured (live, page) | see JSON | — |
| — | DSR-590 capture [ja] eco-top SP 390 full page | captured (live, page) | see JSON | — |
| — | DSR-590 capture [ja] eco-detail PC 1440 full page | captured (live, page) | see JSON | — |
| — | DSR-590 capture [ja] eco-detail SP 390 full page | captured (live, page) | see JSON | — |

Files (committed): `evidence/DSR-590/20261022/{eco-top,eco-detail}_{PC1440,SP390}_{live,page}.png` + matching `.json` (URL, HTTP status, scrollWidth/Height). scrollWidth = viewport width on all 8 captures (no horizontal overflow). SP uses iPhone 13 emulation on Chromium with viewport 390×844.

## 5. Skipped tests

None

## 6. Failed tests

None

## 7. Open points for QA

- Seen while checking the PNGs (not asserted, for the L&F card): TOP SP 390 – the 9th carousel dot is partly hidden under the next arrow; all TOP cards still carry the same demo name `bluesign認証商品`; detail page shows a stray paragraph "a" under the hero summary (demo data).
- Captures are not compared to Figma 3351-51595 by the agent.
