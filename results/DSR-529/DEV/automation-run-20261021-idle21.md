# DSR-529 DEV baseline collection — 20261021

## 1. Header

- Run start (UTC): 2026-10-21T00:55:39.819Z
- Run end (UTC): 2026-10-21T01:01:01.550Z
- Environment: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Targets: /master/ja/library/article/stories/qa529-01, /master/en/library/article/stories/qa529-01, /master/ja/library/article/stories/qa529-r1, /master/en/library/article/stories/qa529-r1, /master/ja/library/article/stories/qa529-02
- Build under test: not independently verified.
- Baseline ID: JOB-ZZ-IDLE-21 (new recorded baseline; no comparison).
- Automation HEAD: ab115cab925042624b22e10e023e240a4791733e
- Exact command: `node /tmp/job-idle21/run.cjs`; ja qa529-01 audit rerun: `node /tmp/job-idle21/rerun.cjs`; compression/reporting: `node /tmp/job-idle21/finish.cjs`.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 0 | 0 | 0 | 0 | 0 | 1 | 0 | 321.731s |

Record-only collection: 10 screenshots and 10 Lighthouse audits. No assertion tests or npm suite executed; no QA verdicts assigned. Chromium 153.0.8010.12. Counts above refer to assertion tests, not recorded captures/audits.

## 4. Executed tests

None; record-only observations are in [result.json](../../../ykk-dsr/hub/results/JOB-ZZ-IDLE-21/result.json). Each page has HTTP status, screenshot paths, image observations and per-device Lighthouse scores. No TC IDs were invented.

## 5. Skipped tests

None.

## 6. Failed tests

None. Performance flags and image HTTP errors are recorded observations, not failed assertions.

## 7. Open points for QA

- Record only; no visual comparison or final QA verdict. Build and DSR-657/658/659 fix status not independently verified.
- Expanded abbreviated qa529-r1 URL to ja and en. Screenshot baseline path interpreted relative to project root.
- Initial ja qa529-01 Lighthouse audits overlapped a lingering helper; both were rerun sequentially. Superseded scores retained in result.json. One final Lighthouse run per device/page; scores can vary with network and server load. Lighthouse uses standard device presets, separately from screenshot viewports.
- All PNGs are committed under results/JOB-ZZ-IDLE-21/baseline/; lossless compression, 401193 bytes total.
- Raw Lighthouse reports in /tmp/job-idle21 are not committed. No artifacts from test-results/ or playwright-report/ were committed.
- Initial helper attempts stopped after a setup API error and an image-decode wait; completed run bounds image decoding to 10 seconds and records image readiness. No product failure inferred.
