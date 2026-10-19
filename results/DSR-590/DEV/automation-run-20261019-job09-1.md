# DSR-590 DEV automation run — 2026-10-19

## 1. Header

- Run start (UTC): 2026-10-19T12:16:04Z
- Run end (UTC): 2026-10-19T12:16:24Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page: /master/ja/test-space/dsr-590-eco-top-page
- Build under test: not independently verified; HTTP 200 for both captures.
- Baseline ID: JOB-20261019-09 and DSR-590.spec.json; no pixel baseline. PC Figma reference 3066-24396 not independently compared; SP Q36 missing.
- Automation HEAD commit SHA: 42e680f18e323c62de1b0cf857ae1d37cf17712b (new capture spec uncommitted during run; included with this report).
- Exact command used:

```sh
npm run test:dev -- tests/eco-products/DSR-590.visual-capture.spec.ts --project=chromium --workers=1 --retries=0
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (empty output).

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 2 | 0 | 0 | 0 | 1 | 0 configured / 0 actual | 18.490s |

Unique tests, proposed automated outcomes only. Chromium subset, ja; 0 flaky outcomes.
PC: 1440×900. SP: iPhone 13 device settings with viewport 375×812 in Chromium. PNGs use CSS pixel scale.

## 4. Executed tests

Durations per single attempt. PC pass only indicates successful capture, not Figma conformity.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ECO-014 | DSR-ECO-014 [ja] PC carousel visual capture and measurements | captured (automation passed) | 9.199s | — |
| DSR-ECO-016 | DSR-ECO-016 [ja] SP capture, horizontal overflow and carousel interaction facts | proposed PASS (scrollWidth) | 8.067s | — |

## 5. Skipped tests

None.

## 6. Failed tests

None.

Committed evidence under `ykk-dsr/hub/results/JOB-20261019-09/evidence/`:

- `DSR-ECO-014_DEV_01.png`: full PC page, initial state.
- `DSR-ECO-014_DEV_02.png`: initial carousel area.
- `DSR-ECO-014_DEV_03.png`: carousel after one Next (index 0→1).
- `DSR-ECO-016_DEV_01.png`: full SP page, initial state.

Raw measurements: `ykk-dsr/hub/results/JOB-20261019-09/pc-facts.json` and `sp-facts.json`.
`test-results/results.json` and `playwright-report/` are gitignored and not committed.

## 7. Open points for QA

- 014 is captured only; Claude web must compare with Figma. No final visual verdict. Image content is temporary under A8 and excluded from judgment.
- PC hero x/y/w/h 0/230/1440/947.390625 px; active 443×556; inactive width 150; gap 8. Heading 24px/40.8px, card heading 24px/normal, summary 16px/32px, VIEW MORE 237×44. Inactive labels vertical-rl with no rotation. Exact initial and after-Next facts recorded in JSON.
- SP scrollWidth 375 in all three states: proposed PASS. Arrow index 0→1, CDP touch swipe 1→2. These interactions are recorded facts; only HTTP status and scrollWidth asserted for 016.
- SP active card x=16/right=359, width=343/height=609: horizontally inside viewport throughout. Initially y=340.390625/bottom=949.390625 exceeds the 812px screen; after arrow auto-scroll y=-246.609375; after scrollIntoView and swipe y=0.390625/bottom=609.390625 fits geometrically. Thus full initial two-axis containment is false; horizontal containment is true. No blanket full-containment pass claimed.
- All recorded measurements use getBoundingClientRect (viewport-relative); scroll offsets are included. Locator screenshots may scroll to capture the entire block.
- No SP Figma node (Q36); no detail template scope in this job. Build SHA not independently verified. Browser emulation is not a physical iPhone.
- Four committed PNGs fulfill full PC + initial carousel + after-Next carousel + full SP; the job's three named PNGs are included. Combined PNG size is below 5 MB. Job instructions override hub's failed-only evidence rule.
- Semantic CSS component hooks temporarily substitute for missing data-testid; TODOs in spec. No content changes or external links followed.
