# DSR-570 DEV automation run — 20261016

## 1. Header

- Run start (UTC): 2026-10-16T13:14:42Z
- Run end (UTC), including Lighthouse: 2026-10-16T13:17:08Z
- Playwright start (UTC): 2026-10-16T13:14:50.255Z; duration: 8.625s.
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page: /master/ja/test-space/dsr-570-catalog-detail
- Build under test: not independently verified.
- Baseline ID: JOB-20261016-13 and hub/tc-out/DSR-570.spec.json; no pixel baseline. Figma C10 3326-80556 comparison deferred to Claude web.
- Automation HEAD commit SHA: 24d0311911fc8965ef7ddbb012634d61d6175294 (new capture spec uncommitted during run, committed with this report).
- Exact test command:

```sh
npm run test:dev -- tests/catalog-detail/DSR-570.visual.spec.ts --project=chromium --workers=1 --retries=0
```

Lighthouse command, run sequentially for mobile and desktop, each with run=1,2,3 (desktop only adds `--preset=desktop`):

```sh
export CHROME_PATH=/home/qa/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome
node /home/qa/.npm/_npx/0f94ee7615faf582/node_modules/lighthouse/cli/index.js https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/dsr-570-catalog-detail --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,best-practices,seo --output=json --output-path="/tmp/job1613/lighthouse-$device-$run.json" "${args[@]}"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (empty output).

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 2 | 0 | 0 | 0 | 1 | 0 configured / actual | 8.625s |

Playwright capture/scroll checks only; no flaky outcomes. Chromium 153.0.8010.12. These are proposed outcomes, not final QA verdicts.
Lighthouse: six successful CLI runs (exit 0 each), one additional TC with scores recorded; no threshold assertion.

## 4. Executed tests

Durations are per attempt, without retries.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-014 | DSR-CATDL-014 [ja] capture catalog download form at 1440px | captured; visual verdict pending | 3.877s | — |
| DSR-CATDL-015 | DSR-CATDL-015 [ja] capture catalog download form at 375px | proposed pass — scrollWidth only | 3.172s | — |
| DSR-CATDL-019 | Lighthouse — form page, mobile and desktop | scores recorded | six sequential runs; timestamps in lighthouse-summary.json | No threshold assertion |

Lighthouse category medians (target ≥95, record only):

| Device | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| mobile | 79.0 | 96.0 | 100 | 61.0 |
| desktop | 100 | 90.0 | 100 | 61.0 |

### Measured layout observations

- Both final URLs equal the target; HTTP 200; h1 exact text: 製品カタログ.
- PC: h1 y=230; catalog y=324.39 (image x=340, text x=740); fields y=664.39; consent y=1511.39; button y=1887.91. Button center x=720 equals viewport center, radius=50px.
- PC labels are ABOVE controls in two columns, not label-left/input-right as requested. Text inputs and selects are 320px wide. Example label y=664.39–704.39; input y=712.39–760.39.
- SP: scrollWidth=375 (passes ≤375); content width=343px (form inner content width, excluding padding); nine text inputs/selects each 217px = 63.3% of content, below ≥90% (308.7px). Checkbox widths are excluded from the full-width input calculation.
- SP button x=42.5, width=290px; fully in viewport after scroll. Full-page screenshots captured after returning to top.
- Raw bounding boxes, labels, HTTP status and final URL: `ykk-dsr/hub/results/JOB-20261016-13/DSR-CATDL-014-measurements.json` and `DSR-CATDL-015-measurements.json`.

## 5. Skipped tests

None.

## 6. Failed tests

None. The explicit job pass criterion for 015 is horizontal scroll only. Input-width and desktop-label discrepancies above remain open for QA; capture success does not imply design acceptance.

Committed screenshots:
- `ykk-dsr/hub/results/JOB-20261016-13/evidence/DSR-CATDL-014_DEV_01.png`
- `ykk-dsr/hub/results/JOB-20261016-13/evidence/DSR-CATDL-015_DEV_01.png`

`test-results/` and `playwright-report/` are gitignored and not committed. Raw Lighthouse JSON/logs stay in `/tmp/job1613/`; committed `lighthouse-summary.json` retains per-run scores, settings, warnings and deficient audit titles.

## 7. Open points for QA

- Claude web owns visual comparison; Figma was not accessed and no pixel baseline exists. No thank-you navigation or submission performed (read-only form scope).
- PC labels above controls and SP widths below 90% may be product layout discrepancies; human review required.
- result.json uses schema `pass` for capture completion (014), scroll criterion (015), and score recording (019), not final visual or Lighthouse-target acceptance.
- Build identity and CF/HubSpot integration not independently verified. Only DEV ja tested.
- Lighthouse scores are lab measurements; see per-device medians and all six run scores/settings in the committed summary JSON. Targets ≥95 are informational per job.
- Job-specific commit/no-push protocol supersedes root reporting commit/push convention; runner handles pushing.
