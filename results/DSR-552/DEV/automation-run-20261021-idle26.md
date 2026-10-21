# DSR-552 DEV automation run — 20261021-idle26 (JOB-ZZ-IDLE-26, regression after 21/10 deploys)

## 1. Header

- Run start (UTC): 2026-10-21T10:35:33Z (Playwright start 10:35:40Z)
- Run end (UTC): 2026-10-21T10:38:28Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}, /master/{ja,en}/test-space/dsr552-* fixtures (docs/DSR-552/test-data.md)
- Build under test: DEV as deployed on 2026-10-21 (after listing.js/adapters/cf.js 08:54Z and article fixes ~09:45Z per job file). Build ID/SHA not independently verified.
- Baseline ID: BL-v1 (docs/DSR-552/)
- Automation HEAD commit SHA: c22ee79bf362fdcb4c00c68b0caa3b4776168358 (no code changes)
- Exact command used:

```sh
DSR_JOB_EVIDENCE=/tmp/idle26/jobev PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/idle26/results.json npm run test:dev -- --project=chromium tests/breadcrumb/DSR-552.breadcrumb.spec.ts
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 43 | 29 | 0 | 14 | 0 | 1 actual / 2 configured | configured 1; none used | 168.2 s (Playwright), 175 s including tsc and npm startup |

Full spec, chromium project only (same project as JOB-20261019-07). Flaky: 0. Proposed outcomes only; human QA confirms.

## 4. Executed tests

Duration is per attempt (single attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-001 | en › DSR-BREAD-001 child trail and placement | passed | 4.8 s | — |
| DSR-BREAD-001 | ja › DSR-BREAD-001 child trail and placement | passed | 5.2 s | — |
| DSR-BREAD-002 | ja › DSR-BREAD-002 ancestor links | passed | 15.2 s | — |
| DSR-BREAD-003 | ja › DSR-BREAD-003 current page is not linked | passed | 5.4 s | — |
| DSR-BREAD-004 | ja › DSR-BREAD-004 HOME label and destination | passed | 4.9 s | — |
| DSR-BREAD-005 | en › DSR-BREAD-005 grandchild trail order | passed | 4.8 s | — |
| DSR-BREAD-005 | ja › DSR-BREAD-005 grandchild trail order | passed | 5.4 s | — |
| DSR-BREAD-006 | ja › DSR-BREAD-006 parent trail | passed | 5.1 s | — |
| DSR-BREAD-007 | ja › DSR-BREAD-007 missing intermediate page | passed | 3.8 s | — |
| DSR-BREAD-008 | en › DSR-BREAD-008 HOME excludes breadcrumb | passed | 4.2 s | — |
| DSR-BREAD-008 | ja › DSR-BREAD-008 HOME excludes breadcrumb | passed | 3.8 s | — |
| DSR-BREAD-009 | ja › DSR-BREAD-009 404 excludes breadcrumb | passed | 3.8 s | — |
| DSR-BREAD-010 | DSR-BREAD-010 [en] display name overrides page title | passed | 7.6 s | — |
| DSR-BREAD-010 | DSR-BREAD-010 [ja] display name overrides page title | passed | 7.3 s | — |
| DSR-BREAD-011 | ja › DSR-BREAD-011 empty label uses title | passed | 4.5 s | — |
| DSR-BREAD-014 | DSR-BREAD-014 [ja] 100-character display name keeps layout | passed | 9.2 s | — |
| DSR-BREAD-015 | DSR-BREAD-015 [ja] special characters in display name are plain text | passed | 7.3 s | — |
| DSR-BREAD-017 | en › DSR-BREAD-017 localized HOME destinations | passed | 4.3 s | — |
| DSR-BREAD-017 | ja › DSR-BREAD-017 localized HOME destinations | passed | 4.7 s | — |
| DSR-BREAD-018 | DSR-BREAD-018 [en] each language uses its own display names | passed | 5.4 s | — |
| DSR-BREAD-018 | DSR-BREAD-018 [ja] each language uses its own display names | passed | 5.8 s | — |
| DSR-BREAD-020 | DSR-BREAD-020 PC breadcrumb baseline | passed | 4.8 s | — |
| DSR-BREAD-025 | en › DSR-BREAD-025 BreadcrumbList structured data | passed | 4.8 s | — |
| DSR-BREAD-025 | ja › DSR-BREAD-025 BreadcrumbList structured data | passed | 4.5 s | — |
| DSR-BREAD-027 | ja › DSR-BREAD-027 semantic markup and accessibility | passed | 5.7 s | — |
| DSR-BREAD-028 | ja › DSR-BREAD-028 keyboard navigation | passed | 5.4 s | — |
| DSR-BREAD-031 | ja › DSR-BREAD-031 site-origin console errors | passed | 4.9 s | — |
| DSR-BREAD-032 | DSR-BREAD-032 cross-browser baseline | passed | 4.8 s | — |
| DSR-BREAD-035 | ja › DSR-BREAD-035 arrow asset origin and status | passed | 5.8 s | — |

## 5. Skipped tests

All are `test.fixme` annotations present before this run; none came from the data preflight (`requireData`).

| TC ID | Verbatim skip reason |
|---|---|
| DSR-BREAD-001 | cn › DSR-BREAD-001 child trail and placement — `cn: no /master/cn (Issue #18)` |
| DSR-BREAD-005 | cn › DSR-BREAD-005 grandchild trail order — `cn: no /master/cn (Issue #18)` |
| DSR-BREAD-008 | cn › DSR-BREAD-008 HOME excludes breadcrumb — `cn: no /master/cn (Issue #18)` |
| DSR-BREAD-017 | cn › DSR-BREAD-017 localized HOME destinations — `cn: no /master/cn (Issue #18)` |
| DSR-BREAD-018 | DSR-BREAD-018 [cn] each language uses its own display names — `cn: no /master/cn (Issue #18)` |
| DSR-BREAD-019 | DSR-BREAD-019 Japanese and Chinese fonts — `DSR-555 + cn` |
| DSR-BREAD-021 | DSR-BREAD-021 SP breadcrumb and back control — `DSR-575 Q5 (SP display)` |
| DSR-BREAD-022 | DSR-BREAD-022 SP parent navigation — `DSR-575 Q5 (SP display)` |
| DSR-BREAD-023 | DSR-BREAD-023 narrow SP overflow — `DSR-575 Q5 (SP display)` |
| DSR-BREAD-025 | cn › DSR-BREAD-025 BreadcrumbList structured data — `cn: no /master/cn (Issue #18)` |
| DSR-BREAD-029 | DSR-BREAD-029 STG Lighthouse performance — `Run on STG (Lighthouse)` |
| DSR-BREAD-030 | DSR-BREAD-030 movie breadcrumb regression — `DSR-536 / movie-detail placement` |
| DSR-BREAD-033 | DSR-BREAD-033 all page types — `Layout tickets` |
| DSR-BREAD-034 | DSR-BREAD-034 responsive movie back control — `DSR-536 / movie-detail placement` |

## 6. Failed tests

None

## 7. Open points for QA

- Comparison with JOB-20261019-07 (014 only): DSR-BREAD-014 [ja] passed again. en 014 still has no test; `/master/en/test-space/dsr552-edge/long` and `/long/leaf` still 404 on .live (curl 10:39Z) — unchanged, data gap.
- No new fails after the 21/10 deploys (listing.js/adapters/cf.js, article fixes); breadcrumb not affected as far as this suite covers.
- en 001/005/025 carry the "Bug-INDEX" annotation but passed (same as previous runs).
- Pass screenshots written by the spec to `evidence/DSR-552/DEV/*_pass.png` were reverted/removed after the run to avoid churning committed evidence; `test-results/`, `playwright-report/` and /tmp outputs are not committed.
- Build identity not verified; the deploy times come from the job file.
