# DSR-529 DEV automation run — 2026-10-20 — JOB-20261019-04

## 1. Header

- Run start (UTC): 2026-10-20T00:55:07.702Z
- Run end (UTC): 2026-10-20T00:55:09.643Z + 22.679 seconds
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /master/ja/library/article/stories/qa529-01, /master/en/library/article/stories/qa529-01, /master/ja/library/article/stories/qa529-02
- Build under test: not independently verified.
- Baseline ID: BL-v1 (DSR-529.spec.json); no Figma baseline accessed or compared.
- Automation HEAD commit SHA: dd681baac3763ddd0966f5c8d2a33528a9cf21fe (plus new capture spec in this commit).
- Exact command used:

```sh
npm run test:dev -- tests/article-detail/DSR-529.visual-capture.spec.ts --project=chromium --workers=1 --retries=0
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (empty output).

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 6 | 6 | 0 | 0 | 0 | 1 | 0 configured / 0 actual | 22.679s |

Chromium capture subset only. Passed means capture execution completed, not visual compliance. No product pass/fail verdicts proposed. Visual comparison is unperformed (skip in hub result.json). No flaky outcomes.

## 4. Executed tests

Durations are per attempt; one attempt each.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-030 | DSR-ARTICLE-030 [ja] qa529-01 1440x900 capture only | Capture completed; no visual verdict | 5.237s | — |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 [ja] qa529-01 390x844 capture only | Capture completed; no visual verdict | 3.285s | — |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 [en] qa529-01 1440x900 capture only | Capture completed; no visual verdict | 2.754s | — |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 [en] qa529-01 390x844 capture only | Capture completed; no visual verdict | 2.616s | — |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 [ja] qa529-02 1440x900 capture only | Capture completed; no visual verdict | 2.961s | — |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 [ja] qa529-02 390x844 capture only | Capture completed; no visual verdict | 3.312s | — |

## 5. Skipped tests

None in the capture runner. Figma visual comparison was outside this run and is recorded as skip in result.json, not passed.

## 6. Failed tests

None.

## 7. Open points for QA

- No Figma access on VPS: Claude must compare the captures. No visual verdict, including for the qa529-01 image issue.
- All requested pages returned HTTP 200, with document/body scrollWidth equal to viewport width; exact URLs, titles, headings and dimensions are in the hub result.json.
- Screenshots are full page, captured after network idle + 1 second; no additional interactions or scrolling were performed. Offscreen lazy-loaded imagery is not independently verified.
- Build identity and fixture content correctness were not independently verified.
- Six PNGs committed under ykk-dsr/hub/results/JOB-20261019-04/evidence/ as required by the job, which overrides the hub failed-only screenshot rule.
- test-results/ observations and playwright-report/ are gitignored and not committed; observations are preserved in result.json.
- Hub protocol overrides root commit/push convention: commit only; runner.sh pushes.
