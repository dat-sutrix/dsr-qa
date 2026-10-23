# DSR-566 DEV automation run — 2026-10-23

## 1. Header

- Run start (UTC): 2026-10-23T00:54:06Z
- Run end (UTC): 2026-10-23T00:54:26Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page: /master/ja/test-space/qa566-news-01
- Build under test: not independently verified.
- Baseline: JOB-20261016-11 capture requirements; DSR-566 BL-v1; DSR-660 date rule.
- Automation HEAD commit SHA: 572c6a0933d760ff33056ff8ac5fc8b426990ed3 (new capture spec uncommitted at execution).
- Exact command:

```sh
npm run test:dev -- tests/news-detail/DSR-566.visual-capture.spec.ts --project=chromium --workers=1 --retries=0
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 2 | 0 | 0 | 0 | 1 | 0 configured / actual | 10.848s |

Chromium capture subset; runner counts only. PC visual verdict remains captured. Extra date-format observation below is outside the two runner assertions. No flaky outcomes. Proposed outcomes only; human QA confirms.

## 4. Executed tests

Durations are per attempt; one attempt each.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-NEWS-014 | DSR-NEWS-014 [ja] capture news layout at 1440x900 | Captured (runner passed) | 4.988s | — |
| DSR-NEWS-015 | DSR-NEWS-015 [ja] capture news layout at 390x844 | Proposed pass | 3.840s | — |

## 5. Skipped tests

None. The result.json PC schema mapping to skip denotes pending visual adjudication only.

## 6. Failed tests

None in the automated suite.

Supplemental date-format check: proposed FAIL on both viewports. Expected `YYYY.MM.DD`; actual `2026-10-01T00:00:00.000Z`. Recorded by `tests/news-detail/DSR-566.visual-capture.spec.ts` in facts JSON, not asserted as a capture test. Cause `none`; product-bug confidence 70% because Author data was not independently verified.
Evidence: `ykk-dsr/hub/results/JOB-20261016-11/evidence/DSR-NEWS-014_DEV_01.png` and `ykk-dsr/hub/results/JOB-20261016-11/evidence/DSR-NEWS-015_DEV_01.png` (both committed per job).
Raw measurements: `ykk-dsr/hub/results/JOB-20261016-11/DSR-NEWS-014-facts.json`, `ykk-dsr/hub/results/JOB-20261016-11/DSR-NEWS-015-facts.json`.
`test-results/` and `playwright-report/` are gitignored and not committed.

## 7. Open points for QA

- Figma comparison delegated to Claude web; no local design baseline. News-type position and image height recorded, design match not verified.
- PC article 744 px with 348 px margins; SP article 342 px with 24 px margins. No measured viewport overflow; SP title two lines without ellipsis.
- Article image 220×132 px on both viewports; news type follows title.
- Build identity, authored data and template provenance were not independently verified.
- Date issue requires reviewer triage/duplicate check; no Jira changes made by this repo-only job.
