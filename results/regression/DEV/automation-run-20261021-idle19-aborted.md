# regression DEV automation run — 20261021-idle19-aborted (JOB-ZZ-IDLE-19, run 1, interrupted)

## 1. Header

- Run start (UTC): 2026-10-21T00:53:32Z
- Run end (UTC): ~2026-10-21T01:13Z (killed, not a normal end)
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): all specs under tests/ (23 spec files)
- Build under test: not independently verified
- Baseline ID: per US — docs/<US>/; not re-verified
- Automation HEAD commit SHA: 6e06ab85cc0f5b688127ad41a08a7aa3a70544ea + first (too broad) locator change in pages/ArticleDetailPage.ts
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/idle19.json npm run test:dev
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| ≥ 341 of 345 reached (from list log) | 113 (first attempt) | 63 (first attempt) | 165 | none (killed) | 2 | 1 configured | ~20 min, killed |

The agent tool's background time limit killed the run at attempt #404 (DSR-TOP-005 [en] retry), so it did not finish. No JSON or HTML report was written. The counts come from the list reporter log and are first-attempt outcomes only; retry outcomes are not merged in. Not a valid result: the full run in automation-run-20261021-idle19.md replaces it.

## 4. Executed tests

Not tabulated: there is no JSON output. The failed set in the log matches the full run (automation-run-20261021-idle19.md) plus the same DSR-ARTICLE-020 [ja] fail, which this job's locator change caused.

## 5. Skipped tests

165 skips, the same as the full run. See automation-run-20261021-idle19.md §5 for the verbatim reasons.

## 6. Failed tests

See automation-run-20261021-idle19.md §6. There is no separate evidence: test-results/ was overwritten by the next run.

## 7. Open points for QA

- The run was interrupted by the tooling time limit, not by a product or test problem. The full run was restarted detached with `setsid nohup`.
- Not verified: final outcomes of the last ~4 tests, and the retry outcomes.
