# DSR-609 DEV automation run — 20261019-tc001

## 1. Header

- Run start (UTC): 2026-10-19T04:34:33Z
- Run end (UTC): 2026-10-19T04:35:14Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (ja and en both returned HTTP 200 on .aem.live; no .aem.page fallback used).
- Target page(s): /ja/top-page, /en/top-page
- Build under test: not independently verified.
- Baseline ID: DSR-609 BL-v1 (docs/DSR-609/baseline-BL-v1.md). Job JOB-20261017-03, run 1 of 2; run 2: `automation-run-20261019-tc001-run2.md`.
- Automation HEAD commit SHA: fdd17c419185ed911180a9f2a7a113cdbc378741 (spec change uncommitted at run time: bounded image decode wait in `tests/top-page/DSR-609.visual-capture.spec.ts:22`).
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job03/run1.json npm run test:dev -- --grep DSR-TOP-001
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (empty output).

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 4 | 4 | 0 | 0 | 0 | 1 (config 2) | 1 configured; 0 used | 38.9 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `--grep DSR-TOP-001`; chromium only (firefox/webkit projects match only DSR-BREAD-032). Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt (single attempt each, no retries).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-TOP-001 | DSR-TOP-001 [ja] PC full-page capture and horizontal overflow | passed (proposed) | 9.5 s | — |
| DSR-TOP-001 | DSR-TOP-001 [ja] SP full-page capture and horizontal overflow | passed (proposed) | 7.9 s | — |
| DSR-TOP-001 | DSR-TOP-001 [en] PC full-page capture and horizontal overflow | passed (proposed) | 10.1 s | — |
| DSR-TOP-001 | DSR-TOP-001 [en] SP full-page capture and horizontal overflow | passed (proposed) | 9.3 s | — |

## 5. Skipped tests

None.

## 6. Failed tests

None.

## 7. Open points for QA

- Fix (test only, expectation unchanged): the lazy-load step is now bounded — scroll loop stops when the 30 s total budget is near, each `img.decode()` races a 5 s timeout, and images that do not decode are logged (src, naturalWidth/Height, outcome) in console, test annotation `undecoded-images` and `undecodedImages` in the layout JSON. Viewports (1440×900, 390×844) and screenshot paths unchanged.
- Undecoded images (same in both runs, all `timeout`, natural size 0×0 — never loaded):
  - ja PC/SP (3 of 17 images): `https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/media_133c223720b35cd5f71bf7b688a81f0570f663551.jpg?width=750&format=jpg&optimize=medium`, `https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/media_14f6ec45300969a41023acb94fb0df63487cafec8.png?width=750&format=png&optimize=medium` (×2).
  - en PC/SP (2 of 13 images): `https://main--dsr-eds-dev--sutrix-projects.aem.live/en/media_14f6ec45300969a41023acb94fb0df63487cafec8.png?width=750&format=png&optimize=medium` (×2).
  - Likely lazy images in non-visible positions (e.g. hidden slides/SP-only sources) that never start loading; not verified. Whether they should appear in the full-page capture is for the Figma compare (Claude web).
- Page scrollWidth equals viewport width on all four captures (1440 / 390); no horizontal overflow.
- The spec writes captures into codex's `ykk-dsr/hub/results/JOB-20261015-14/` (path kept unchanged per job). The PNGs were rewritten byte-identical (no git diff); the four `layout-*.json` changed (new `undecodedImages`, `.aem.live` now 200 instead of 404→.aem.page). These were reverted and not committed (other lane's folder).
- Evidence under `test-results/` and `playwright-report/` is gitignored and not committed. No failure screenshots were produced.
- Build identity not verified.
