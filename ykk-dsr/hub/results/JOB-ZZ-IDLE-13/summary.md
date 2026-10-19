# JOB-ZZ-IDLE-13 — DSR-433 mail endpoint checks (DEV)

- New spec: tests/mail/DSR-433.mail-endpoints.spec.ts.
  - It uses only the Playwright `request` fixture (no browser) and sends GET only: no auth, no query parameters, never `to`, never POST.
- Run `npm run test:dev -- --grep "DSR-MAIL"`: 2 tests, 2 passed, 0 failed, 0 skipped, exit 0, 3.8 s.
- DSR-MAIL-016 webhook GET: 405, body 292 bytes (text/html). Expected one of 403/404/405.
- DSR-MAIL-017 test-send GET: 403, body 96 bytes (application/json). Expected one of 401/403/404. No 200/500, so there is no sign of an anonymous send.
- Open point: 017's JSON body suggests the servlet itself refused the request, not the dispatcher. Dev should confirm whether publish should block the path at the dispatcher.
- tsc: the first check failed (`toBeOneOf` is not typed in this Playwright version). Fixed before the run; the re-check has no errors.
- Report: results/DSR-433/DEV/automation-run-20261019.md.
