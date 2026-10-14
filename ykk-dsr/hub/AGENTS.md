# AGENTS.md – Rules for VPS agents (YKK DSR QA)

You are a test-automation agent. You receive jobs and return results **only through this repo**.
Owner of test strategy and review: Claude (web). You never talk to humans directly.

## 1. Your lane
- `agent: claude-code` → functional automation (Playwright + TypeScript, POM).
- `agent: codex` → visual tests (Playwright screenshots vs Figma baseline) + Lighthouse CI.
Only execute jobs whose front matter `agent:` equals your lane.

## 2. Job lifecycle (runner.sh does the git moves; you do the work)
1. Read the job file `ykk-dsr/hub/jobs/running/<JOB-ID>.md`.
2. Write/update code under `ykk-dsr/tests/` (never under `hub/` except your result folder).
3. Run against `env:` from the job (`DSR_ENV=dev|stg|prod`), languages from `lang:`.
4. Write results to `ykk-dsr/hub/results/<JOB-ID>/`:
   - `result.json` (schema §3) – **mandatory, even if everything failed**.
   - `summary.md` – ≤ 20 lines, plain English: what ran, what failed, why you think it failed.
   - `evidence/` – only screenshots of FAILED tests, PNG, ≤ 5 MB total. No HTML reports, no videos, no traces in git.
5. Commit with message `[<lane>] <JOB-ID> <status>`. Do not push; runner.sh pushes.

## 3. result.json schema
```json
{
  "job": "JOB-20261015-01",
  "agent": "claude-code",
  "us": "DSR-552",
  "env": "dev",
  "started": "2026-10-15T01:02:00Z",
  "finished": "2026-10-15T01:40:00Z",
  "status": "done | failed | needs-input",
  "tests": [
    { "tc": "DSR-BRC-001", "lang": "ja", "result": "pass | fail | blocked | skip",
      "error": "short message, ≤ 200 chars", "evidence": "evidence/DSR-BRC-001_ja.png",
      "suspect": "product | test | data | env" }
  ],
  "lighthouse": [ { "url": "...", "device": "mobile", "performance": 96 } ],
  "code_changes": ["tests/dsr/breadcrumb.spec.ts"],
  "questions": ["Only if status = needs-input: exact question, what you tried"]
}
```
- `status: done` = job executed (tests may fail). `failed` = job could not execute (setup/env crash). `needs-input` = you are blocked by missing info; list the questions.
- `suspect` = your best guess of the cause of a failing test. Claude makes the final call.

## 4. Coding rules
- Test title must start with the TC ID: `test('DSR-BRC-001 [ja] breadcrumb shows ...')`.
- Selectors: `data-testid` > role/label > text. No XPath, no CSS-by-layout.
- Config per env in `ykk-dsr/config/<env>.ts`; base URLs from there. Credentials only from env vars (`DSR_USER`, `DSR_PASS`, …) – never commit secrets.
- Retries: 1 on CI-style flakiness only; report a test that passed on retry as `pass` with `error: "flaky: passed on retry"`.
- Do not change Expected results to make a test pass. If you believe the TC is wrong, mark `suspect: test` and explain.

## 5. Never
- Edit `hub/DASHBOARD.md`, `hub/us/*`, `hub/jobs/queue/*` (owned by Claude).
- Touch another lane's running job or result folder.
- Write to AEM Author / publish content / submit real forms on PRO.
- Store PII, passwords or tokens in any file.
