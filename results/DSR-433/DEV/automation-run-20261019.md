# DSR-433 DEV automation run — 20261019

## 1. Header

- Run start (UTC): 2026-10-19T05:30:27Z
- Run end (UTC): 2026-10-19T05:30:33Z
- Environment + base URL: DEV — `BASE_URL` from `envs/dev.env` is not used by these tests; the target is the AEM publish host `https://publish-p192812-e2014374.adobeaemcloud.com` (override with `PUBLISH_URL`, unset for this run)
- Target page(s): `/bin/ykk/mail/webhook`, `/bin/ykk/mail/test-send` (GET, no auth, no query parameters)
- Build under test: not independently verified (no build ID exposed by the endpoints)
- Baseline ID: `ykk-dsr/hub/tc-out/DSR-433.spec.json` TCs 16.0, 17.0 (job JOB-ZZ-IDLE-13)
- Automation HEAD commit SHA: f463ae6e06956c85c69f7c9db92d9bb0b581a2ed (the new spec file was uncommitted at run time and is included in this report's commit)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/dsr-433.json npm run test:dev -- --grep "DSR-MAIL"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors. The first check, before the run, failed with TS2339 because `toBeOneOf` is not in this Playwright version's typings. It was replaced with `expect([...]).toContain(status)`, and the re-check before the run passed.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 2 | 0 | 0 | 0 | 1 | 1 configured; 0 used | 3.8 s (Playwright), ~6 s (command) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `--grep "DSR-MAIL"`. The project is chromium, but the tests use only the `request` fixture, so no browser is launched. Flaky outcomes: 0.

## 4. Executed tests

Duration is for a single attempt (no retries happened).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-MAIL-016 | DSR-MAIL-016 [—] webhook GET without auth is refused | Pass (proposed) | 700 ms | — (observed status 405, body length 292 bytes, text/html) |
| DSR-MAIL-017 | DSR-MAIL-017 [—] test-send GET without params or auth is not public | Pass (proposed) | 449 ms | — (observed status 403, body length 96 bytes, application/json) |

## 5. Skipped tests

None

## 6. Failed tests

None

Evidence: per-test `observed` JSON attachments are in `test-results/dsr-433.json` and `playwright-report/`. Both are gitignored and **not committed**; later runs may overwrite these local files.

## 7. Open points for QA

- 017 returned **403, not 200/500**, so there is no sign of an anonymous send. The body is JSON (`application/json`, 96 bytes), not a dispatcher/CDN HTML error page. This suggests the request reached the servlet and was refused by the servlet itself, not blocked at the dispatcher. The body text was not recorded and has not been verified. Dev may want to confirm that the dispatcher should block `/bin/ykk/mail/test-send` on publish.
- 016 returned 405 (text/html), which is consistent with DSR-546 comment 59305 (dispatcher allows POST only). Which layer sent the 405 was not verified.
- Redirects were not followed (`maxRedirects: 0`), so the status shown is the first response.
- Only GET was sent. There was no POST, no auth and no `to` parameter, so no mail could be triggered. Whether a mail was sent was not checked against SendGrid/AEM logs, because there is no access.
- Build identity was not verified.
