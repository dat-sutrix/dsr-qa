# JOB-20261022-14 – catalog spec expectation fixes + rerun (claude-code, DEV .aem.page + .aem.live, ja+en, 07:46–08:10Z) – status: done
**Merge/incident-related:** none (every fail has cause `none`). No deploy observed. The list now serves `dsr-catalog-list` with ja 6 / en 5 items, as Martin 22/10 expected. The JOB-12 republish landed: all 4 `-form` pages carry `requiresForm true`.
**Spec changes (docs/DSR-654/assumptions.md, docs/DSR-570/automation-spec.md A8/A9):**
(1) CATOV-001 pdf/ebook, 015, 017, 019 expect a redirect to the file (pdfAsset path / ebookUrl). (2) CATV-017 and CATDL-018 expect card → overlay detail with form. (3) The list waits for `dsr-catalog-list`; an empty list skips as "Blocked-by: catalog list AEM query deploy (Martin 22/10)". (4) CATOV-002 `<title>` = live content CF title, annotated `data`; the TD-190 title stays the target.
Runs (pass/fail/skip): 557 page 24/0/6 · live 24/0/6 | 570 page 12/2/2 · live 12/2/2 | 654 page 40/15/7 · live 40/15/7. tsc exit 0. A first 654 .page run had a test bug (asserted the external ykkfastening.com → ykkdigitalshowroom.com hop) and was fixed and rerun. Job verdicts: 216 rows, 152 pass, 34 fail, 16 blocked, 14 skip.
**All TCs named in the job now pass on both tiers.**

| Group | TCs | Proposed | suspect | conf. bug |
|---|---|---|---|---|
| **NEW:** en overlay form renders in Japanese (labels, options, consent, ダウンロードする) | CATDL-016 en | fail | product | 70% |
| Gated PDF URL in list response: `dsr-catalog-list` item qa190-cat-pdf-form has pdfAsset._publishUrl (same as JOB-10) | CATDL-007 ja | fail | product | 70% |
| Non-form pages `robots=noindex` + no sitemap entry; requiresForm row omitted when false. -form pages OK, so this may be by design because the page redirects | CATOV-002, 021 (pdf, ebook) | fail | product | 40% |
| -form page title = content CF dev sample, not TD-190 (rule 4 covers 002 only) | CATOV-001 -form | fail | data | 0% |
| Card title TD-190 + card → overlay for non-form PDF (outside job scope) | CATOV-012 | fail | test | 0% |
| qa654-preview on .page lacks 'QA654 preview' (as JOB-10) | CATOV-009 | fail | product | 50% |
| CATV-018..020: QA190 NEW/UPD CFs are in the old folder, not read by dsr-catalog-list | CATV-018..020 | blocked | data | 0% |
| CATOV-018: form shown for e-book+requiresForm; spec still treats Y3 as open | CATOV-018 | blocked | test | 0% |

**Next:** (1) Claude: decide on noindex/sitemap for non-form pages and the 2 × 70% items (Dat list). (2) Separate job: update CATOV-001 -form title, 012 and 018 to Y3; re-seed QA190 NEW/UPD as content+DSR CF. (3) Author: set the TD-190 titles on the content CFs.
Evidence (fails only, 1.6 MB): `evidence/`; API-only TCs (009, 021) have no screenshot. Reports: `results/DSR-{557,570,654}/DEV/automation-run-20261022-job14.md`. Read-only; no form submitted.
