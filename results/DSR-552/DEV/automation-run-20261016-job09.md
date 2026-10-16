# DSR-552 DEV automation run — 20261016-job09 (JOB-20261016-09 part B, HOME steps after B3)

Before the run, `/master/ja` and `/master/en` both returned 200 on DEV aem.live.
- 10:27:14Z precheck: ja 200 (last-modified 10:26:28Z); en 404 (`failed to load /master/en.md from content-bus`).
- 10:27:5xZ recheck: en 200 (last-modified 10:27:18Z).

With both pages at 200, the conditional B3 fixme no longer applies. There were no code changes.

## 1. Header

- Run start (UTC): 2026-10-16T10:28:31Z
- Run end (UTC): 2026-10-16T10:28:57Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s):
  - /master/{ja,en} (008, plus the HOME click in 002)
  - /master/{ja,en}/test-space/dsr552-bc/child[/grandchild] (002, 004, 017)
- Build under test: DEV as deployed on 2026-10-16. Build ID/SHA not independently verified.
- Baseline ID: BL-v1 (docs/DSR-552/)
- Automation HEAD commit SHA: 74a4ef6d4031c034beb2df5eae83df2d4ec1a92e (no code changes)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/b3.json npm run test:dev -- tests/breadcrumb/DSR-552.breadcrumb.spec.ts tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts -g "(ja|en) .*DSR-BREAD-(002|004|008|017)|DSR-BREAD-002 \[(ja|en)\]" --reporter=list,json
```

A first attempt with `-g "DSR-BREAD-(002|004|008|017) \[(ja|en)\]"` (10:28:10Z) matched no tests, exit 1, because main-spec titles carry the language as the describe name. Nothing was executed in that attempt.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 8 | 8 | 0 | 0 | 0 | 2 | configured 1; none used | 24.5 s |

Subset: main spec 002/004/008/017 for ja and en, plus DSR-591 retest spec 002 for ja and en; chromium.
The main spec has 002 and 004 for ja only, so en 002 comes from the DSR-591 spec and en 004 has no test. No flaky results. Proposed outcomes only.

## 4. Executed tests

Duration is for a single attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-002 | ja › DSR-BREAD-002 ancestor links | passed | 11.5 s | — |
| DSR-BREAD-002 | DSR-BREAD-002 [ja] ancestor links navigate in same tab (DSR-591 spec) | passed | 6.0 s | — |
| DSR-BREAD-002 | DSR-BREAD-002 [en] ancestor links navigate in same tab (DSR-591 spec) | passed | 4.7 s | — |
| DSR-BREAD-004 | ja › DSR-BREAD-004 HOME label and destination | passed | 2.6 s | — |
| DSR-BREAD-008 | ja › DSR-BREAD-008 HOME excludes breadcrumb | passed | 1.8 s | — |
| DSR-BREAD-008 | en › DSR-BREAD-008 HOME excludes breadcrumb | passed | 1.6 s | — |
| DSR-BREAD-017 | ja › DSR-BREAD-017 localized HOME destinations | passed | 2.4 s | — |
| DSR-BREAD-017 | en › DSR-BREAD-017 localized HOME destinations | passed | 2.5 s | — |

## 5. Skipped tests

None. The B3 fixme was not triggered in any test.

## 6. Failed tests

None

Screenshots from the spec's capture hook are in `evidence/DSR-552/DEV/DSR-BREAD-{002_ja,004_ja,008_ja,008_en,017_ja,017_en}_pass.png` and are committed with this report. Other raw output (`test-results/`, the JSON report in /tmp) is not committed.

## 7. Open points for QA

- **HOME click (002, DSR-591 spec):**
  - ja: href `/master/ja`, HTTP 200, same tab, final URL `https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja`.
  - en: href `/master/en`, HTTP 200, same tab, final URL `/master/en`.
- **008:**
  - `/master/ja` and `/master/en` return 200.
  - Breadcrumb count 0 and BreadcrumbList JSON-LD `[]` for both languages.
- **004/017:**
  - HOME label is `HOME`.
  - HOME href is `/master/{lang}`.
  - The JSON-LD position 1 item is `…/master/{lang}`.
- The en 004 case does not exist in the main spec (ja only), so it was not run. The en HOME destination is still covered by 017 en and 002 en.
- The root pages were published minutes before the run. This run does not verify their content beyond status 200 and breadcrumb absence.
- The en trail label `test-space` (vs ja `test space`) was observed as before and is not in scope here.
