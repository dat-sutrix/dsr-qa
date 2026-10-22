# JOB-20261022-10 – catalog rerun after Agent Author data fix (claude-code, DEV .aem.page + .aem.live, ja+en, 06:12–07:04Z) – status: done
**Merge/incident-related:** none (every fail has cause `none`). **Env change mid-run:** code deploy at 06:19:14Z (`blocks/listing/types.js`, `adapters/cf.js`, `scripts/catalog-link.js`). The catalog list now calls `dsr-catalog-list;folder=/content/dam/dsr/{lang}/` instead of `dm-catalog-list`, so I reran 557/570 on .aem.page after the deploy (run 2).
**Preflight:** content CFs OK (requiresForm=true on all 4 `-form` CFs). The `requiresForm` row on the 4 `-form` pages is **FAIL**: no `-form` overlay page (ja/en, both tiers) has the row. The DSR CFs were last modified 21/10 14:17–14:20Z, and JOB-07 published only the content CFs. BL-OVL-1 says the change appears only after the DSR CF is republished. Result: the client treats the pages as non-form and replaces them with the PDF or ebookUrl (`catalog-detail.js:165-168`). TD-654 node states match JOB-07.
Runs (runner counts pass/fail/skip): 557 page#1 12/2/0 · page#2 2/0/12 · live 1/6/7 | 570 page#1 6/5/5 · page#2 3/1/12 · live 3/1/12 | 654 page 20/37/5 · live 20/37/5. tsc exit 0. Job verdicts in result.json (214 rows: 63 pass, 69 fail, 62 blocked, 20 skip).

| Group | TCs | Proposed | suspect | conf. bug |
|---|---|---|---|---|
| Stale `-form` pages (DSR CF not republished) | CATOV-001 (-form), 016, 018; CATDL-006, 010 | blocked | data | 0% |
| Non-form detail redirects to file by design (IDLE-32) | CATOV-001 (pdf/ebook), 015, 019, + 017 (same mechanism) | fail – **test expectation to fix** | test | 0% |
| E-book + requiresForm now gated (DSR-655 Y3), card → detail page | CATV-017, CATDL-018 (page#1) | fail – test expectation to fix | test | 10% |
| List query retired → specs wait for `dm-catalog-list` | CATV-013..020, CATDL-005/006/007/018 (post-deploy) | blocked | test | 0% |
| Content CF titles are dev samples ("catalog pdf"), not TD-190 "QA190 …" | CATOV-002 title, CATOV-012 | fail | data | 0% |
| Every catalog overlay page `robots=noindex`, even isActive=true qa654-update, so it's not in the sitemap; og:image `about:error` | CATOV-002, 021 | fail | product | 60% |
| Gated PDF URL reaches the browser: list GraphQL item qa190-cat-pdf-form (requiresForm=true) carries pdfAsset._publishUrl, overlay HTML has a pdfAsset row | CATDL-007 (page#1); CATOV-016 once unblocked | fail | product | 70% |
| qa654-preview on .page renders `unavailable: not-found` (DSR CF is preview-only; publish-tier lookup?) | CATOV-009 | fail | product | 50% |
| ja list cards missing at 06:34Z, not reproduced at 07:04Z | CATV-012..019 ja .live | fail | env | 10% |

Expected/skip per job: qa654-preview 404 on .live and qa654-content-only 404 are as designed, so 009 (.live part) and 011 pass. TD-654-03/-05 are not seeded: CATOV-006 en and 010 are reported as skip, because a runner pass on an expected 404 is no evidence.
**Next:** (1) Agent Author: republish the DSR CFs `dsr/{ja,en}/catalogs/qa190-cat-pdf-form` and `-ebook-form` (preview + publish), then rerun this job. Also set the TD-190 titles. (2) Fix the specs (separate job): retarget the 557/570 list wait to `dsr-catalog-list`; CATOV-001/015/017/019 non-form → expect redirect to file; CATV-017/CATDL-018 → Y3 gated. (3) Claude to decide on noindex/sitemap, the gated pdfAsset exposure and qa654-preview (all < 80%).
Evidence (fails only, 208 KB): `evidence/`. Reports: `results/DSR-{557,570,654}/DEV/automation-run-20261022-job10.md`. Read-only; no form submitted; no code changed.
