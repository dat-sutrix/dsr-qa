# DSR-590 DEV automation run — 20261020 stable capture

## 1. Header

- Run start (UTC): 2026-10-20T01:02:37Z
- Run end (UTC): 2026-10-20T01:02:57.787382Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page: /master/ja/test-space/dsr-590-eco-top-page
- Build under test: not independently verified.
- Baseline ID: job-provided C14 PC 1440, Figma ILi1KhW94Zb3zcQfzgIBAd node 3066-24396.
- Automation HEAD: ec93c8a7ffec24361d95347d72035c56d4130d5d plus new stable-capture spec in this commit.
- Exact command:

```sh
npm run test:dev -- tests/eco-products/DSR-590.stable-capture.spec.ts --project=chromium --workers=1 --retries=0
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 2 | 0 | 0 | 0 | 1 | 0 configured / actual | 19.438s |

Chromium capture subset; no flaky outcomes. Proposed capture-integrity outcomes only, no visual QA verdict.

## 4. Executed tests

Durations per single attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ECO-014 | DSR-ECO-014 [ja] stable PC initial, Next, dot 5 and fullPage captures | Proposed pass (capture integrity only) | 11.208s | — |
| DSR-ECO-016 | DSR-ECO-016 [ja] stable SP initial and swipe captures | Proposed pass (capture integrity only) | 6.905s | — |

## 5. Skipped tests

None.

## 6. Failed tests

None.

All six PNGs and before/after measurements are committed under `ykk-dsr/hub/results/JOB-20261020-01/`; PNG total 4,210,194 bytes.
`test-results/` and `playwright-report/` remain gitignored and are not committed.

## 7. Open points for QA

- See job summary for per-PNG visual observations; all show expanded active content.
- Before/after geometry is identical, but sampling and screenshots are separate browser operations, not atomic.
- PC sticky header overlaps the top of the cards; fullPage retains the sticky header at the capture scroll position. Rects are viewport-relative, with scroll offsets recorded.
- PC active 443×556, neighbours 150×506 at y+25, gap 8; arrows 60×60 at x=40/1340. Observed dots: 9 versus job baseline 8. No visual verdict assigned.
- SP scrollWidth 375 before/after swipe; active index changes 0 to 1. Chromium mobile emulation, not physical Safari.
- Original Figma file and application build identity not independently verified; only job-provided baseline used.
- Job/hub commit and no-push instructions override root automated-run commit/push convention.
