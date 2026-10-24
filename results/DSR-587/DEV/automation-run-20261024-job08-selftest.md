# DSR-587 DEV automation run — 20261024-job08-selftest

JOB-20261024-08 forced case: proves `fixtures/capture-graphql.ts` writes a capture when `dsr-video-list` answers 500 (mocked with `page.route`, browser-local only).

## 1. Header

- Run start (UTC): 2026-10-24T10:25:05Z (approx., from command timestamps)
- Run end (UTC): 2026-10-24T10:25:13Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/en/library/video/search`
- Build under test: not independently verified
- Baseline ID: n/a (tooling self-test; BL-OVL-1 for the page)
- Automation HEAD commit SHA: 261456fbcb57739fc4091ae3b923569a46034d3b + uncommitted changes from this job, committed with this report
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/selftest.json ENV=dev npx playwright test tests/selftest --project=chromium --grep @selftest
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 2 | 0 | 0 | 0 | 1 | configured 1; actual 0 | 8.0 s |

Scope/browser: `tests/selftest/capture-graphql.selftest.spec.ts`, chromium. Flaky: 0.

## 4. Executed tests

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| SELFTEST (no TC ID) | capture-graphql [en] forced 500 on dsr-video-list writes a capture file | pass | 2.7 s | — |
| SELFTEST (no TC ID) | capture-graphql [en] healthy dsr-video-list writes nothing | pass | 2.7 s | — |

Raw capture written by the forced case: `test-results/graphql-capture/SELFTEST_capture-graphql_en_forced_500_on_dsr-video-list_writes_a_capture_file-r0-try0-1792837511418.json` (1664 bytes) with
`reason: "status 500"`, `status: 500`, `statusText: "Internal Server Error"`, `headers.content-type: "application/json"`, `body: {"errors":[{"message":"selftest forced 500"}]}`,
`url: https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/dsr-video-list;folder=/content/dam/dsr/en/movies/standard/;cb=1792837510225`, `timing.durationMs: 75`, `consoleErrors` populated (404 resource errors).

## 5. Skipped tests

None.

## 6. Failed tests

None.

Evidence under `test-results/` is gitignored and **not committed**; the capture file above was removed when the next run (job08 VOV run) cleaned `test-results/`.

## 7. Open points for QA

- Self-test titles carry no TC ID (tooling check, not a TC); tagged `@selftest` and outside the regression spec list.
- The healthy case would fail if live `dsr-video-list` returns an empty list (that would be a real REG-VOV-EN capture, not a hook defect).
