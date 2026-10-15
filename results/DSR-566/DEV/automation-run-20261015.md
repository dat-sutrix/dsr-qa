# DSR-566 DEV automation run — 20261015

## 1. Header

- Run start (UTC): 2026-10-15T09:12:17.411887+00:00
- Run end (UTC): 2026-10-15T09:12:31.832497+00:00
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page: /master/en/test-space/dsr-357-news-detail
- Build under test: not independently verified.
- Baseline ID: JOB-20261015-10 measurable criteria; no pixel baseline. Figma references C27 PC 6010-59004 / SP 6018-60532 were not compared.
- Automation HEAD commit SHA: 800bc7c18beb63bf8e01ed6e7b2b1cb1d1c5e5f0 (plus new spec committed with this report).
- Exact command used:

```sh
npm run test:dev -- tests/news-detail/DSR-566.news-detail.spec.ts --project=chromium --workers=1 --retries=0
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 2 | 0 | 0 | 0 | 1 | 0 configured; 0 actual | 14.421s command; 12.6s Playwright |

Chromium subset; PC 1440×900, SP 375×812. No flaky outcomes. Counts describe capture/check execution, not final QA verdicts. PC is captured only; result.json maps deferred visual adjudication to skip because its schema has no captured value. No runtime tests were skipped.

## 4. Executed tests

Durations are per attempt (one attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-NEWS-014 | DSR-NEWS-014 [en] PC news detail capture and layout facts | Captured; visual verdict pending | 6.319s | — |
| DSR-NEWS-015 | DSR-NEWS-015 [en] SP news detail capture and layout facts | Proposed pass | 4.486s | — |

## 5. Skipped tests

None.

## 6. Failed tests

None.

Committed evidence:
- `ykk-dsr/hub/results/JOB-20261015-10/evidence/DSR-NEWS-014_DEV_01.png`
- `ykk-dsr/hub/results/JOB-20261015-10/evidence/DSR-NEWS-015_DEV_01.png`

Facts are in `ykk-dsr/hub/results/JOB-20261015-10/DSR-NEWS-014-facts.json` and `DSR-NEWS-015-facts.json`.
`test-results/` and `playwright-report/` are gitignored and not committed; local files can be overwritten by later runs.

## 7. Open points for QA

- PC main and article section are full width (1440 px); article content wrapper is 1240 px, with 100 px left/right margins. No visible nonzero-sized DOM element bounds extend outside the viewport (0.5 px tolerance).
- SP document scrollWidth is 375 px (assertion passed); content wrapper is 327 px with 24 px margins. Title has two measured text lines, white-space normal, text-overflow clip, overflow visible and no line clamp. No detected element overflow.
- Both final URLs match the target and both HTTP statuses are 200. Exact title and metadata are in facts files. Japanese content is present on the English fixture.
- Element bounds measurement excludes invisible/zero-sized nodes and does not evaluate pseudo-element or shadow bounds; document scrollWidth independently measures horizontal scrolling.
- Build identity and Figma appearance are not independently verified. PC awaits Claude web visual review; all verdicts remain proposed.
- Only DEV was exercised. No Lighthouse run was requested. Read-only navigation; no forms or content changes.
