---
id: JOB-ZZ-IDLE-13
agent: claude-code
us: DSR-433
type: write-and-run (read-only GET)
env: dev
lang: [—]
tcs: [16.0, 17.0]
priority: P3 (idle)
created_by: claude-tc-job
---

## Context
Idle work for DSR-433 (SendGrid mail platform; sub-tasks [Dev] In Testing, assignee Nakamoto) from `ykk-dsr/hub/tc-out/DSR-433.spec.json`. Only the 2 read-only endpoint checks are automated; all sending is done by dev (never send mail from tests).

## Steps
1. `tests/mail/DSR-433.mail-endpoints.spec.ts`, titles `DSR-MAIL-016`, `DSR-MAIL-017`, using Playwright `request` (no browser).
2. 016: `GET https://publish-p192812-e2014374.adobeaemcloud.com/bin/ykk/mail/webhook` no auth → expect status in [403, 404, 405]; record status + body length.
3. 017: `GET …/bin/ykk/mail/test-send` with **no query parameters** and no auth (never pass `to`) → expect status in [401, 403, 404]; record status. A 200 or 500 is a proposed Fail (possible anonymous send) – flag it in Open points.
4. Never POST. Never add credentials.
5. `npx tsc --noEmit`; run `npm run test:dev -- --grep "DSR-MAIL"` once; report per AGENTS.md "Run reporting".

## Output
Code + `results/DSR-433/DEV/automation-run-<YYYYMMDD>.md`; commit `[DSR-433] mail endpoint checks + run report`.
