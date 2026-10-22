> **Claude sessions & scheduled tasks: đọc `CONTEXT.md` (cùng thư mục) TRƯỚC file này** – quy tắc đứng, IDs, baseline mới nhất. Agents VPS: theo file này.
> **Scheduled tasks (07:45/17:10/standup/TC job): trước khi soạn câu hỏi, tin đuổi, blocker hay đề xuất dời scope → đọc `KNOWN-FACTS.md` + `JIRA-SWEEP.md`; đã có câu trả lời thì không hỏi, không ghi là blocker.**

# AGENTS.md – Job protocol for VPS agents (YKK DSR QA)

This file adds the **job protocol** only. Code layout, env config (`ENV=dev|stg|pro`, `envs/<env>.env`), selectors, evidence and run reports follow the **root `AGENTS.md`**. If they conflict, the job file wins, then this file, then root AGENTS.md.

You are a test-automation agent. You receive jobs and return results **only through this repo**.
Owner of test strategy and review: Claude (web). You never talk to humans directly.

## 0. Project phase
DEV only (since 2026-10-15). Run every job on `env: dev`. Do not run against STG/PRO unless a job explicitly says so after the phase changes.

## 1. Your lane
- `agent: claude-code` → functional automation (Playwright + TypeScript, POM).
- `agent: codex` → visual tests (Playwright screenshots vs Figma baseline) + Lighthouse CI.
Only execute jobs whose front matter `agent:` equals your lane.

## 2. Job lifecycle (runner.sh does the git moves; you do the work)
1. Read the job file `ykk-dsr/hub/jobs/running/<JOB-ID>.md`.
2. Write/update code where root AGENTS.md says (`tests/`, `pages/`, `fixtures/`). Under `ykk-dsr/hub/` write only your result folder.
3. Run against `env:` from the job (`ENV=dev|stg|pro`, e.g. `npm run test:dev`), languages from `lang:`. Also write the standard run report required by root AGENTS.md.
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
- Env config: `envs/<env>.env` (local on VPS, gitignored). Credentials only from env vars – never commit secrets.
- Retries: 1 on CI-style flakiness only; report a test that passed on retry as `pass` with `error: "flaky: passed on retry"`.
- Do not change Expected results to make a test pass. If you believe the TC is wrong, mark `suspect: test` and explain.

## 5. Never
- Edit `hub/DASHBOARD.md`, `hub/us/*`, `hub/jobs/queue/*` (owned by Claude).
- Touch another lane's running job or result folder.
- Write to AEM Author / publish content / submit real forms on PRO.
- Store PII, passwords or tokens in any file.

## Fail cause tag (from 2026-10-20)
In every summary.md / result.json, each fail gets `cause`: `overlay-merge` | `dm_product-CR` | `dm_product-ver0.4` | `none` (see BUG-RULES.md §4) and a `confidence` % that it is a real product bug (BUG-RULES.md §3). Put fails with cause ≠ none in a separate table "Merge/incident-related" at the top of summary.md.

## Author lane (Dat 21/10)
AEM Author jobs (`tools/author`, manifests, authenticated Author reads/writes) run ONLY in lane `claude-code` or `author` – brain = Claude. Lane `codex` must refuse any job touching `tools/author`, `author/manifests` or `~/.dsr-secrets/`.
