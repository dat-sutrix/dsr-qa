# DSR-609 DEV automation run — 20261015

## 1. Header

- Run start (UTC): 2026-10-15T11:36:09Z
- Run end (UTC): 2026-10-15T11:38:56.802Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live; both target pages HTTP 404. Allowed fallback https://main--dsr-eds-dev--sutrix-projects.aem.page served both HTTP 200 and was used for captures and Lighthouse.
- Target pages: /ja/top-page, /en/top-page
- Build under test: not independently verified.
- Baseline ID: job JOB-20261015-14 measurable criteria; DSR-196 BL-v1 referenced in US record. Design B01, Figma file ILi1KhW94Zb3zcQfzgIBAd, PC 6150-83741 / SP 4215-26358. No pixel baseline; Figma comparison deferred to Claude web.
- Automation HEAD commit SHA: 430317d0814d84e6c67f8c9768def3df5afefc7a (new capture spec uncommitted during run).
- Exact commands (stdout/stderr retained in /tmp/job14 during execution):

```sh
npm run test:dev -- tests/top-page/DSR-609.visual-capture.spec.ts --project=chromium --workers=1 --retries=0
CHROME_PATH=/home/qa/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome npx --yes lighthouse https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/top-page --preset=desktop --only-categories=performance --chrome-flags='--headless --no-sandbox' --output=json --output-path=/tmp/job14/lighthouse-desktop.json
CHROME_PATH=/home/qa/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome npx --yes lighthouse https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/top-page --only-categories=performance --chrome-flags='--headless --no-sandbox' --output=json --output-path=/tmp/job14/lighthouse-mobile.json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (empty output).

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 4 | 4 | 0 | 0 | 0 | 1 | 0 configured; 0 actual | 33.158s |

Counts cover Playwright Chromium capture instances, not Lighthouse. No flaky tests. Lighthouse completed two separate measurements, each exit 0, with no runtime errors or run warnings. Proposed automated outcomes only; human QA confirms. DSR-TOP-001 pass refers only to page horizontal width, layout is captured. DSR-TOP-009 is recorded, not a performance verdict.

## 4. Executed tests

Durations are per attempt; no retries.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-TOP-001 | DSR-TOP-001 [ja] PC full-page capture and horizontal overflow | Proposed pass (width); captured (layout) | 9.193s | — |
| DSR-TOP-001 | DSR-TOP-001 [ja] SP full-page capture and horizontal overflow | Proposed pass (width); captured (layout) | 7.009s | — |
| DSR-TOP-001 | DSR-TOP-001 [en] PC full-page capture and horizontal overflow | Proposed pass (width); captured (layout) | 7.878s | — |
| DSR-TOP-001 | DSR-TOP-001 [en] SP full-page capture and horizontal overflow | Proposed pass (width); captured (layout) | 6.941s | — |
| DSR-TOP-009 | [ja] Lighthouse desktop | Recorded: 94/100, LCP 0.699s | 17.680s | — |
| DSR-TOP-009 | [ja] Lighthouse mobile | Recorded: 87/100, LCP 1.822s | 14.652s | — |

Actual section order in every capture: main visual (H1 logo) → quick search (search form) → RECOMMEND CONTENTS → NEWS. Positions and exact page text are in layout JSON files.

| Capture | Width / viewport | Direct-text horizontal overflow | Committed evidence |
|---|---|---|---|
| ja-pc | 1440 / 1440px | None detected | ykk-dsr/hub/results/JOB-20261015-14/evidence/DSR-TOP-001_DEV_01.png |
| ja-sp | 390 / 390px | None detected | ykk-dsr/hub/results/JOB-20261015-14/evidence/DSR-TOP-001_DEV_02.png |
| en-pc | 1440 / 1440px | Site Update Information: 122px > 90px | ykk-dsr/hub/results/JOB-20261015-14/evidence/DSR-TOP-001_DEV_03.png |
| en-sp | 390 / 390px | None detected | ykk-dsr/hub/results/JOB-20261015-14/evidence/DSR-TOP-001_DEV_04.png |

Lighthouse LCP element, both devices: `div.top-hero > div.top-hero-bg > picture > img`. Exact nodes, times, settings and versions: `ykk-dsr/hub/results/JOB-20261015-14/lighthouse-summary.json`.

## 5. Skipped tests

None. English returned 404 on primary but 200 on permitted fallback, so both English viewports were captured; skip interpreted as applying when fallback also returns 404.

## 6. Failed tests

None. English PC text-overflow finding is recorded separately from the job's page-width pass criterion: `span.top-news-category`, exact text “Site Update Information”, scrollWidth 122px versus clientWidth 90px, overflow-x visible; suspect product. Evidence: `ykk-dsr/hub/results/JOB-20261015-14/evidence/DSR-TOP-001_DEV_03.png`. All overflowing containers are listed in layout JSON (including intentional carousel overflow).

## 7. Open points for QA

- Layout versus Figma was not judged; no pixel baseline. Claude web must review captures and the text-overflow finding.
- English uses fallback despite primary 404; confirm this interpretation of the job's skip rule. Fallback results do not establish publication on .aem.live.
- English top-page search and some content remain Japanese; exact text recorded, translation correctness not asserted.
- Text overflow detection lists visible elements with scrollWidth > clientWidth and direct text nodes; it does not certify absence of vertical clipping or all visual overlap.
- Local Lighthouse 13.5.0 lab measurements, one run per device with default simulated throttling; not an actual PSI service run. PC target >=90 recorded only. Device viewports are Lighthouse defaults in summary JSON, independent of screenshot viewports.
- Build identity, STG/PRO and authenticated experiences not verified. No forms submitted or content changed.
- Job explicitly requires all capture PNGs to be committed, overriding hub failed-only evidence rule; PNG total stays below 5 MB.
- Raw Playwright files under test-results/ and playwright-report/ are gitignored and not committed; raw Lighthouse output is under /tmp/job14 and not committed. Required Lighthouse summary and screenshots are committed.
- Job-specific commit format and no-push instruction override root reporting convention; runner.sh pushes.
