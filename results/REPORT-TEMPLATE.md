# <US> <ENV> automation run — <YYYYMMDD>[-<suffix>]

<!-- Save a new file at results/<US>/<ENV>/automation-run-<YYYYMMDD>[-<suffix>].md.
Use the UTC run-start date. If a report exists for that day/environment, choose an
unused suffix such as -tc014 or -rerun2. Never overwrite an existing report.
Replace placeholders with observations; explicitly identify anything not verified.
Keep all seven sections in this order. Outcomes are proposed, pending human QA review.
Commit all reports with the task's code/docs in one commit and push:
[<US>] <change summary> + run report
-->

## 1. Header

- Run start (UTC): <ISO 8601 timestamp>
- Run end (UTC): <ISO 8601 timestamp>
- Environment + base URL: <DEV/STG/PRO> — <base URL>
- Target page(s): <relative path(s)>
- Build under test: <build ID/application SHA and verification source, or not independently verified>
- Baseline ID: <baseline ID>
- Automation HEAD commit SHA: <full SHA tested, before report commit>
- Exact command used (including environment overrides and subset/reporter arguments):

```sh
<exact command>
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: <code>
- Result: <no errors if successful with empty output; otherwise concise diagnostics>

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| <total> | <passed> | <failed> | <skipped> | <code> | <workers> | <configured retries; actual retries> | <duration> |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: <full suite or subset; browser/project>. Flaky outcomes: <count and details, if any>.

## 4. Executed tests

State whether duration is per attempt or summed; show retry outcomes when applicable.
Keep skipped cases in section 5; never count them as passed.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| <TC ID> | <exact title> | <proposed result> | <duration> | <reason or —> |

## 5. Skipped tests

Copy runtime skip/fixme reasons verbatim. State "None" if no tests were skipped.

| TC ID | Verbatim skip reason |
|---|---|
| <TC ID> | <verbatim reason> |

## 6. Failed tests

Repeat the subsection below for each failed test, or replace it with "None".
Include all failing assertions and differences between attempts. Include raw logs only where they explain a failure.

### <TC ID> — <title>

- Failing assertion: `<assertion>` — `<project-relative file:line>`
- Expected: <exact value/condition>
- Actual: <exact observed value/condition>
- Attempt(s): <initial/retry outcomes>
- Evidence paths: <project-relative screenshot/trace/attachment paths, or none generated>

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- <Assumptions and limitations, or none.>
- <Anything not independently verified, including build identity or fixture source values.>
- <Missing evidence or checks that could not complete, with reasons.>
