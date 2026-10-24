# DSR-670 DEV automation run — 20261024

## 1. Header

- Run start (UTC): 2026-10-24T02:37:45Z
- Run end (UTC): 2026-10-24T02:38:01Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (publish GraphQL https://publish-p192812-e2014374.adobeaemcloud.com)
- Target page(s): `/{ja,en}/library/video/tech-talk/qa670-tech`, `/ja/library/video/tech-talk/qa670-{inactive,booth,unavail}`, 3 naming variants (9.0), `/{ja,en}/library/video/qa587-main`, `/ja/library/video/search`; queries `dsr-techmovie-page`, `dsr-video-page`, `dsr-video-list`
- Build under test: Not independently verified. Job input: deploy `dev/2026.10.23_2` b33514f (DSR-670). Observed: `video-detail.js` Last-Modified Fri, 23 Oct 2026 07:15:23 GMT; `listing.js` Wed, 21 Oct 2026 09:11:13 GMT.
- Baseline ID: BL-670-1 (`ykk-dsr/hub/tc-out/DSR-670.spec.json` A1)
- Automation HEAD commit SHA: 400b116334d282dc23750187586d8edf5138405f (+ new uncommitted `tests/movie-detail/DSR-670.tech-talk.spec.ts`, `fixtures/dsr-670.ts`, committed with this report)
- Job: JOB-20261024-05 (lane claude-code)
- Exact command used:

```sh
node tools/author/author.mjs models --out /tmp/run670/models.md   # preflight for 1.0/2.0 → HTTP 401, exit 3 (02:35:54Z)
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/run670/spec.json npm run test:dev -- tests/movie-detail/DSR-670.tech-talk.spec.ts
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 13 | 3 | 0 | 10 | 0 | 1 | 1 configured; 0 used | 14.6 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (new DSR-670 spec only), Chromium. Flaky: 0.
13.0 DSR-587 regression run: `automation-run-20261024-r587.md` and `automation-run-20261024-rerun1.md`.

## 4. Executed tests

Duration = single attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-670 7.0 | [ja] dsr-techmovie-page …/tech/does-not-exist → 200, no errors, related [] (negative) | Pass | 0.5 s | — |
| DSR-670 13.0 | [ja] dsr-video-page qa587-main → 200, no errors, related item (regression after 670) | Pass | 0.4 s | — |
| DSR-670 13.0 | [en] dsr-video-page qa587-main → 200, no errors, related item (regression after 670) | Pass | 0.2 s | — |

Raw values: 7.0 negative `{"data":{"inactive":{"items":[]},"related":{"items":[]}}}`, HTTP 200, no `errors`. 13.0: aliases `related` + `inactive`, related `_path` `/content/dam/dsr/{lang}/movies/standard/qa587-main`, movieId `qa587-main`.

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-670 1.0 [-] | Author read-only TC: executed with tools/author models (GET only), not from Playwright (tools/author `models` → HTTP 401: cookie) |
| DSR-670 2.0 [-] | Author read-only TC: executed with tools/author models (GET only), not from Playwright (tools/author `models` → HTTP 401: cookie) |
| DSR-670 7.0 [ja] qa670-tech | Blocked-by TD-670-01 (no tech-talk data on DEV) |
| DSR-670 8.0 [ja] | Blocked-by TD-670-01 (no tech-talk data on DEV) |
| DSR-670 8.0 [en] | Blocked-by TD-670-01 (no tech-talk data on DEV, en copy optional) |
| DSR-670 9.0 [ja] | Blocked-by TD-670-01 (no tech-talk data on DEV) |
| DSR-670 10.0 [ja] | Blocked-by TD-670-02 (no tech-talk data on DEV) |
| DSR-670 11.0 [ja] | Blocked-by TD-670-03 (no tech-talk data on DEV) |
| DSR-670 12.0 [ja] | Blocked-by TD-670-04 (no tech-talk data on DEV) |
| DSR-670 14.0 [ja] | Blocked-by TD-670-01 (no tech-talk data on DEV) |

Preflight raw: `dsr-techmovie-page;path=/content/dam/dsr/ja/movies/tech/{qa670-tech,qa670-inactive,qa670-booth,qa670-unavail}` → HTTP 200, `related.items []`, `inactive.items []` (02:35Z and again in-run 02:37Z). `/ja/library/video/tech-talk/qa670-tech` → 404.
Text in parentheses for 1.0/2.0 is added context, not part of the runtime reason.

## 6. Failed tests

None.

## 7. Open points for QA

- 14.0 recorded its pre-TD-670-01 snapshot before skipping: list `/ja/library/video/search` HTTP 200 with 6 cards, `dsr-video-list` (ja) 7 items, none under `/movies/tech/` and none matching `qa670`. Saved as `ykk-dsr/hub/results/JOB-20261024-05/list-before-td670.json`; the spec reads it on the rerun to check "count unchanged".
- 9.0 is skipped even though the 3 URLs return 404 now: without qa670-tech, a 404 does not prove the naming rule.
- 8.0 checks block order against `/{lang}/library/video/qa587-main` by comparing raw `<main>` block classes (A3). The `.aem.page` tier and movieSourceId are not compared; the test adds a pending annotation for them.
- 11.0/12.0: the test checks noindex (+ `unavailable` row for 12.0); a side-by-side comparison with standard booth/unavailable videos is not automated (A4).
- 1.0/2.0 need a fresh Author `login-token` cookie (`~/.dsr-secrets/aem-dev.env`); the spec does not read the Author model (JOB-23-21 observation on isActive required stays unverified).
- Evidence under `test-results/` and `playwright-report/` is gitignored and not committed.
