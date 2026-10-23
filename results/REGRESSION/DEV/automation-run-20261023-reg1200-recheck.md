# REGRESSION DEV automation run — 20261023-reg1200-recheck

Job: `JOB-ZY-REG-20261023-1200-claude-code`. This is a confirmation recheck of the 2 NEW FAIL from `automation-run-20261023-reg1200.md`.

## 1. Header

- Run start (UTC): 2026-10-23T05:30:23Z
- Run end (UTC): 2026-10-23T05:30:30Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /en/library/video/search
- Build under test: not independently verified (EDS `main` on DEV at run time)
- Baseline ID: BL-OVL-1 / Regression S12 baseline R2
- Automation HEAD commit SHA: 404afc89e76065a85abf88628eb0a95c03668aa6
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/reg1200/r.json ENV=dev npx playwright test tests/movie-detail/DSR-587.movie-overlay.spec.ts --grep "DSR-VOV-01[13] \[en\]" --grep-invert "@manual|@blocked|tech-talk" --output=/tmp/reg1200/test-results-R --reporter=line,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (same HEAD as the main run, checked at 05:10Z)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 2 | 0 | 0 | not captured (output was piped to `tail`; JSON stats: 2 expected, 0 unexpected) | 1 | configured 1; 0 used | 4.6 s |

Counts are unique tests. Proposed outcomes only; human QA confirms. Scope: subset, chromium.

## 4. Executed tests

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | pass | see JSON (total run 4.6 s) | — |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only | pass | see JSON (total run 4.6 s) | — |

## 5. Skipped tests

None.

## 6. Failed tests

None.

## 7. Open points for QA

- Both tests failed on both attempts at 05:18:55–05:19:24Z, then passed here at about 05:30Z. The failure was transient: about 11 minutes or less, cause not identified. See the main report §7.
- A static fetch with `curl` just before this recheck also showed `<div class="listing">` on en and ja /library/video/search (HTTP 200).
