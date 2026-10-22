# DSR-654 DEV — JOB-ZZ-IDLE-31

## 1. Header

- UTC start/end: 2026-10-22T00:59:48.420Z / 2026-10-22T01:02:59.906Z
- DEV base URL: https://main--dsr-eds-dev--sutrix-projects.aem.live
- Targets: /en/library/catalog/qa190-cat-pdf
- Build under test: not independently verified.
- Baseline: job performance target ≥95; visual IDLE-29 (DSR-587 only).
- Automation HEAD: 16ec34691078119444d3a2f3a92c1a7f6a68f726
- Exact orchestration commands: `bash /tmp/idle31-lh.sh`, `node /tmp/idle31.cjs`, `node /tmp/idle31-compare.cjs`, `node /tmp/idle31-old.cjs`. Scripts preserved in hub result folder under execution/.
- Audit command per target: `CHROME_PATH=/home/qa/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome npm exec --yes --package=lighthouse -- lighthouse <URL> --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,seo,best-practices --output=json --output-path=/tmp/<path_with_underscores>-<device>-lh.json [--preset=desktop] --quiet`

## 2. TypeScript check

`npx tsc --noEmit`: exit 0, no errors.

## 3. Suite summary

| Total | Passed | Failed | Blocked | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---|---|---|---|
| 2 | 0 | 0 | 2 | 0 | 1 for blocked audits | 1 sequential audit | 0 | 21s summed Lighthouse timing |

Lighthouse audits, not npm suite; proposed outcomes. Four separate DSR-587 baseline captures completed, see hub summary.

## 4. Executed tests

Job audit identifiers (no source TC IDs assigned). Durations per single attempt.

| TC ID | Title | Result | Duration | Failure reason |
|---|---|---|---|---|
| N/A | /en/library/catalog/qa190-cat-pdf desktop | blocked | 6s | HTTP 404 |
| N/A | /en/library/catalog/qa190-cat-pdf mobile | blocked | 14s | HTTP 404 |

## 5. Skipped tests

None. Blocked audits are not passes.

## 6. Failed tests

### /en/library/catalog/qa190-cat-pdf desktop

- Assertion: performance ≥95 (job requirement; no spec file:line).
- Expected: page loads and performance ≥95. Actual: HTTP 404; all scores unavailable.
- Attempt: one; cause=none, product-bug confidence=40%.
- Evidence: No Lighthouse screenshot generated for blocked navigation; ykk-dsr/hub/results/JOB-ZZ-IDLE-31/lighthouse-summary.json.

### /en/library/catalog/qa190-cat-pdf mobile

- Assertion: performance ≥95 (job requirement; no spec file:line).
- Expected: page loads and performance ≥95. Actual: HTTP 404; all scores unavailable.
- Attempt: one; cause=none, product-bug confidence=40%.
- Evidence: No Lighthouse screenshot generated for blocked navigation; ykk-dsr/hub/results/JOB-ZZ-IDLE-31/lighthouse-summary.json.


## 7. Open points for QA

Single-run performance is environment-sensitive; no product bug confirmed. Build and publication state unverified; no Author access. Historical IDLE-29 missing-resource identity cannot be proven; current URLs and errors preserved. Full raw Lighthouse reports remain temporary under /tmp; extracted metrics and failed-audit details are committed. No test-results/ or playwright-report/ files committed.
