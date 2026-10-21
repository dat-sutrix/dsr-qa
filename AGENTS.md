> **Session context (Claude web / scheduled tasks): read `ykk-dsr/hub/CONTEXT.md` first.** Project rules for the DSR hub live there and in `ykk-dsr/hub/BUG-RULES.md`.

# Project: YKK DSR (AEM Sites + Edge Delivery Services)

## Context
- YKK Digital Showroom migration. Sites: ja / en / zh. Path prefix: `/master/{lang}/`.
- Environments (Publish, `.aem.live`): configured in `envs/dev.env`, `envs/stg.env`, `envs/pro.env`.
- Test order: DEV first, then STG, then PRO. The same specs must run on every environment without code changes.

## Conventions
- TC ID format: `DSR-<MODULE>-<NNN>` (e.g. `DSR-MOVIE-001`). Source of truth: TC Excel files per User Story.
- Tests grouped by User Story: `tests/<feature>/DSR-<USID>.<feature>.spec.ts`.
- Selectors: follow `docs/<US-ID>/data-testid.md`. If a data-testid is not yet in the DOM, use role/text temporarily and add `// TODO: data-testid <name>`.
- Automate only read-only checks on pre-seeded test data. Do not modify AEM content from tests.

## Current User Stories
| US | Feature | Spec | Docs |
|---|---|---|---|
| DSR-173 | Movie detail (movie-detail) | tests/movie-detail/DSR-173.movie-detail.spec.ts | docs/DSR-173/ |
| DSR-552 | Breadcrumb (breadcrumb) | tests/breadcrumb/DSR-552.breadcrumb.spec.ts | docs/DSR-552/ |

## Known limitations
- Dev test page: `/master/en/test-space/dsr-173-video-detail` (manually authored, may differ from auto-generated pages).
- Pending from dev: URL pattern of auto-generated pages, movie list URL, seeded test data, data-testid.

## Agent test run (manual TCs executed via Playwright MCP)
- Source of truth for expected results: docs/DSR-173/ (baseline BL-v1). Never infer spec.
- Read-only: never submit forms, log in, or change content.
- For each TC: navigate, collect raw data (final URL, HTTP status, exact text, meta values) and at least one screenshot.
- Evidence file name: evidence/<US>/<ENV>/<TC-ID>_<ENV>_<NN>.png
- Verdict is a PROPOSAL only: Pass / Fail / Pending. No evidence → Pending. Human QA confirms.
- Write results to results/<US>/<ENV>/<YYYYMMDD>.md as a table:
  | TC ID | Proposed verdict | Expected | Observed | Evidence | Notes |
- Commit message: [<US>] agent run <ENV> <YYYYMMDD>

## Run reporting (standing rule)

- Any test run requested by QA (`npm run test:dev`, `npm run test:stg`, or `npm run test:pro`, full suite or a subset) MUST produce a markdown report without a separate reporting request, including failed runs and reruns.
- Path (relative to this project): `results/<US>/<ENV>/automation-run-<YYYYMMDD>[-<suffix>].md`. Use the UTC run-start date and uppercase environment. Use a suffix (e.g. `-tc014`, `-rerun2`) when a report already exists for that day and environment; choose an unused filename and never overwrite an existing report.
- Use [results/REPORT-TEMPLATE.md](results/REPORT-TEMPLATE.md). Required sections, in this order:
  1. Header: run start/end time (UTC), environment + base URL, target page, build under test, baseline ID, automation HEAD commit SHA, exact command used.
  2. TypeScript check result (`npx tsc --noEmit`).
  3. Suite summary table: total / passed / failed / skipped, exit code, workers, retries, wall time.
  4. Executed tests table: TC ID | title | result | duration | one-line failure reason.
  5. Skipped tests table: TC ID | verbatim skip reason.
  6. One subsection per failed test: failing assertion with file:line, expected vs actual, evidence paths. State "None" if no tests failed.
  7. "Open points for QA": assumptions, anything not independently verified.
- Run `npx tsc --noEmit` and record its exit code and result; state "no errors" if output is empty and the command succeeds. State plainly if a check could not be completed.
- Report proposed outcomes, never final QA verdicts; never mark a skipped test as passed. Keep raw logs only where they explain a failure. State plainly when something was not verified.
- Commit the report together with any code or docs change from the same task, in a single commit, and push. Commit message: `[<US>] <change summary> + run report`. Include all reports if the task required multiple runs.
- `test-results/` and `playwright-report/` stay gitignored; reference evidence by project-relative path and note that those files are not committed.
- This section governs automated npm test runs. The earlier "Agent test run" section governs manual TCs executed via Playwright MCP and retains its own report format and commit message. The automated commit format refines the global `[<US-ID>] <summary>` convention; read-only testing and all other repository safety rules still apply.

# Project: DSR-552 Breadcrumb block

## Context
- Ticket: DSR-552 [汎用ブロック] パンくずリスト（Breadcrumb）ブロック開発 – https://sutrix.atlassian.net/browse/DSR-552
- TC source of truth on Drive: `[Sutrix] DSR -552- [汎用ブロック] パンくずリスト（Breadcrumb）ブロック開発.xlsx`.
- 35 TCs: 24 automation, 6 visual, 5 manual. Prefix `DSR-BREAD-NNN`.
- Status: DEV implementation/run on 2026-10-12; data-testid live. Open: DSR-575 (questions), Bug-FIELD (missing display-name property), Bug-INDEX (en test-space absent from query-index).

## Conventions
- Mirror DSR-173: docs/DSR-552/, fixtures/dsr-552.ts, pages/BreadcrumbPage.ts, tests/breadcrumb/DSR-552.breadcrumb.spec.ts.
- 30 TC purposes: 18 implemented (16 auto + 2 visual), 12 fixme; manual 012, 013, 016, 024, 026 documented only. Read-only; never touch T5.

## Current User Stories
- DSR-552: see docs/DSR-552/automation-spec.md, test-data.md and data-testid.md.

## Known limitations
- Languages ja/en; cn cases fixme: no /master/cn (Issue #18).
- DEV preflight guards publication/title mismatches. STG/PRO, Author and dependent tickets are not verified. See docs/DSR-552/ and results/DSR-552/DEV/.
