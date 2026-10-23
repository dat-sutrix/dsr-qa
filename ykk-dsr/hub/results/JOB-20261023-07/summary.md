# JOB-20261023-07 – summary (claude-code, DEV, 2026-10-23)
**Merge/incident-related fails:** none. All 20 fails are `cause: none` and were already known from earlier jobs (JOB-22-14/19, 23-03/04).
**A. Expectations.** PDO-005: Expected changed to the BL-OVL-1 21/10 node-name rule (`qa586-alpha` → 200 + detail). It now passes. Source is recorded in `docs/DSR-586/assumptions.md`; `tc-out/DSR-586.spec.json` 5.0 still needs Claude's edit. CATOV-002/021 non-form: Expected NOT changed. The tests get a `pending` annotation and the 8 fails are proposed **Pending**, not Fail (`docs/DSR-654/assumptions.md`). ARTICLE-011: verified already re-baselined (baseline A16 = spec.json 11.0 = spec). No change; see `docs/DSR-529/assumptions.md`.
**B1.** Specs/fixtures read GraphQL only through `fixtures/cf-models.ts`. It accepts the `related`/`inactive` aliases, `dm*RelatedList`/`dm*DsrList` and the content ref by name or path. Wired into CatalogDisplayPage, DSR-585, DSR-647 retest. No spec asserts a model name.
**B2.** `@overlay` tag on 587 (overlay, overlay-seo, 647/538 retests), 586, 654, 557, 570, 585 and the 529 ARTICLE-011 listing. 585 was added because its persisted queries are the direct GraphQL check of 669. Run it with `npm run test:dev:overlay` (257 tests, ~6.3 min). New tool `scripts/compare-runs.mjs` diffs two runs.
**B3.** `tools/author/lib/model-map.mjs` resolves models by live model path; `_dsr` wins over `_related`. `models` no longer hard-codes names and shows the model in use per folder. Manifests may use `model: auto`. Lint check `model-current` FAILs on an old model name and gives the model to use. Unit tests 17/17 pass. Live read-only check (03:00Z): DEV still has only `DM_*_related`. The 4 manifests linted show 0 `model-current` FAIL. The remaining lint FAILs are old data state: TD-587-01 renames are already done, and TD-190-CAT-CORE uses an old ref path.
**B4.** `docs/DSR-669/regression-runbook.md` covers trigger, 6 steps and about 1.5 h. Draft manifest: `REPUBLISH-669.draft.yaml` (`model: auto`, lint 0 FAIL today).
**Run** (pre-deploy reference, `overlay-before-669.json`): 189 pass · 20 fail · 48 skip, exit 1.
| Fail | TCs | suspect | conf. |
|---|---|---|---|
| non-form noindex / no sitemap → **Pending** | CATOV-002/021 ×8 | product | 40% |
| content CF dev-sample titles | CATOV-001 -form ×4, CATOV-012 ×2 | data | 0% |
| preview-only DSR CF renders unavailable on .page | CATOV-009, VOV-002 | product | 50% |
| subfolder path 200 instead of 404 | CATOV-010 | product | 50% |
| TD-587-08 not seeded (no seeded guard) | VOV-008 | data | 0% |
| gated PDF URL in browser / en form in Japanese | CATDL-007, CATDL-016 en | product | 70% |
Report: `results/DSR-669/DEV/automation-run-20261023.md`. Read-only on AEM: GET only (models, lint), no apply.
