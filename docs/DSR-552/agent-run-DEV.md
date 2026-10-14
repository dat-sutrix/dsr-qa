# DSR-552 – Agent test run on DEV

## Target
- Manual agent-run instructions only; automated 2026-10-12 runs use automation-run reports.
- Paths: fixtures/dsr-552.ts after QC confirms publication and T2 slug.
- Languages: ja/en confirmed; cn absent (Issue #18).
- Viewports: PC 1440×900, SP 375×812; TC 023 also 320×812.

## Known limitations
- Baseline/build identifiers not supplied; record them before a future run.
- Source of truth: Drive TC Excel identified in automation-spec.md. Jira DSR-575 defaults remain provisional.
- data-testid deployed on DEV 2026-10-12; see data-testid.md.
- T5/manual Author workflows must never be touched by automation or agent recon.

## Test cases
- See automation-spec.md for the 30 automated/visual purposes and five manual-only IDs.
- No manual TC steps invented; read the source Excel before execution.

## Evidence
- Folder: evidence/DSR-552/DEV/.
- Names: <TC-ID>_DEV_<NN>.png; at least one screenshot per executed TC.
- Collect final URL, HTTP status, exact text and raw JSON-LD; no evidence means Pending.

## Output
Write results/DSR-552/DEV/<YYYYMMDD>.md using:

| TC ID | Proposed verdict | Expected | Observed (raw values) | Evidence | Notes |
|---|---|---|---|---|---|

Proposed Pass/Fail/Pending only; human QA confirms. Future manual agent-run commit: [DSR-552] agent run DEV <YYYYMMDD>.

## Not in this run
- Setup only: no TC executed, no screenshot evidence, no optional network recon.
- Automated npm runs use the standing run report template instead.
