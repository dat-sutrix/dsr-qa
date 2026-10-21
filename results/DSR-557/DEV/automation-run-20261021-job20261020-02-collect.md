# DSR-557 DEV automation run — 20261021-job20261020-02-collect

Job: JOB-20261020-02 (lane claude-code). First attempt of the retargeted video TCs; aborted at test collection, 0 tests executed.

## 1. Header

- Run start (UTC): 2026-10-21T16:23:55Z (shell timestamp)
- Run end (UTC): 2026-10-21T16:23:57Z (shell timestamp)
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (+ .aem.page via videoHosts())
- Target page(s): /{ja,en}/library/video/qa587-main, /{ja,en}/library/video/qa557-dam (not reached)
- Build under test: not independently verified
- Baseline ID: DSR-557 TC sheet (DSR-190 動画・カタログ表示), TC 1.0/2.0/6.0 → DSR-CATV-001/002/006
- Automation HEAD commit SHA: 06430495f4af596cb6a3b18dd4c230cf03dad272 plus uncommitted working-tree changes from this job (first draft of the retargeted spec)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job02/r1.json npm run test:dev -- tests/catalog-video --project=chromium --grep "DSR-CATV-00[126] "
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (after restoring the `catalogQuery` export; the first tsc of this job returned exit 2: `pages/CatalogDisplayPage.ts(2,10): error TS2305: Module '"../fixtures/dsr-557"' has no exported member 'catalogQuery'.`)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 0 | 0 | 0 | 0 | 1 | — | configured 1; none used | ~2 s |

Collection error, no test executed. Scope/browser: subset, chromium.

## 4. Executed tests

None (collection failed).

## 5. Skipped tests

None

## 6. Failed tests

None executed. Collection error:

```
Error: duplicate test title "en video page › DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page)", first declared in catalog-video/DSR-557.catalog-video.spec.ts:167
```

Cause: the tier label was computed from the second-to-last hostname label (`aem`), so both hosts were labelled `page`. Fixed (`hostname.endsWith('.aem.live')`) and rerun: automation-run-20261021-job20261020-02.md.

## 7. Open points for QA

- Test-code defect only; no product observation from this attempt.
