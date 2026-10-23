# JOB-20261023-22 · claude-code · DSR-669 follow-up + DSR-566 · DEV · done
**Merge/incident-related (cause ≠ none): none.** No AEM writes: lint + `apply --dry-run` only (GET), `AUTHOR_WRITE_ENABLED` unset.
**1. Manifests:** `model: DM_*_related` → `model: auto` in 17 files (56 lines). Also `model: (?)` placeholders → `auto` in TD-190-CAT-CORE.yaml (1) and TD-586-01-02.yaml (2): they named the same related models and failed the same checks. TD-557-DAM.yaml line 14: `movie: ref(…{lang}…)` quoted (unquoted braces in a flow map); value unchanged, file now parses.
- Lint 22/22 run: `model-current`/`model-exists` FAIL **210 → 0**; parse errors 1 → 0. Full table: `lint-table.md` (also in result.json).
- FAILs still left (not model): lang-pair (TD-586-01-02 4, TD-587-14-15 + .resolved 18 each), rename-source/target-free (TD-587-01.resolved 3+3) – same as before. Visible now that the model resolves: TD-190-CAT-CORE.yaml `field-name:catalogId` 8 (the .resolved copy already removes it), TD-190-CAT-CORE.resolved `ref-exists:catalog` 2 (`/content/dam/ykk/common/product-cf/test/qa190-cat-pdf` missing).
- Dry-run 22/22 exit 0, plans in `dryrun/`. Note: TD-557-DAM.yaml plan would PATCH `movieSource` dam → DAM (manifest value, not changed by me; .resolved uses `dam`). `npm run test:author` 17/17 pass.
**2. DSR-566 spec:** TC 3.0 compares with `publicationdate` only when present; otherwise only the Article Meta date format (YYYY.MM.DD), no `published-time` fallback. TC 10.0: slug in `noCtaSlugs` (qa566-news-02) → expect Button8 0 and no `.button-container`/`a.button`/`.button` in main. Baseline A10 updated.
- Rerun ja: news-01 7 pass / 4 fail / 1 skip; news-02 7 / 4 / 1. **003 and 010 now pass on news-02** (were the 2 test fails in JOB-23-17); news-01 still uses the publicationdate/CTA-href paths and passes.
| Fail (news-01 + news-02, unchanged since JOB-23-06/17) | suspect | cause | confidence |
|---|---|---|---|
| 002 / 006 Back to list missing in the template | product | none | 70% |
| 007 ja index paths 404, row only in /query-index.json | test | none | 30% |
| 012 Article Meta `no-mylist no-share` | data | none | 15% |
- 008 skip (needs TD-566-03). tsc exit 0. Report: `results/DSR-566/DEV/automation-run-20261023-job22.md`. Evidence = news-02 fails only (news-01 PNGs overwritten by the second run).
