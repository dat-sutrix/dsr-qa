# JOB-20261023-13 – summary (claude-code, DEV)

**Merge/incident-related fails:** none (all fails cause = none). **NEW FAIL:** none.

Applied the 3 approved Expected changes:
- **VOV-008 (587):** the check now ignores the technical rows `source` / `cfPath`. The data rows must be only `unavailable`, plus noindex and a browser redirect to the list. Result: **pass** (en, 3 tests incl. overlay-seo .page/.live).
- **CATOV-021 (654):** non-form catalogs now check only the sitemap (0 `<loc>`). Their query-index check is dropped. Form catalogs are unchanged. Result: **pass** 8/8 (ja/en × pdf, pdf-form, ebook, ebook-form).
- **ARTICLE-023 (529):** `test.fixme` + `@blocked` with the reason "Blocked-by DSR-356: related-product block renders dummy fixture (QUERY = null), 0-result case unreachable on DEV" → **skip**.

**Runs:** `tsc --noEmit` exit 0. 3-TC grep run: 13 pass / 0 fail / 1 skip. The grep also matched 2 JOB-08 analysis tests; I reverted their rewrite of JOB-08's result files. `npm run test:dev:overlay`: 257 tests, 208 pass / 8 fail / 41 skip, exit 1.

| Fail (overlay suite) | Cause guess | suspect | cause | confidence |
|---|---|---|---|---|
| CATOV-001 -form ja/en (4) | titles are dev samples ("catalog pdf form"), not "QA190 …" | data | none | 0% |
| CATOV-012 ja/en (2) | no card 'QA190 PDF catalog' in list | data | none | 0% |
| CATDL-007 ja | gated PDF URL reaches browser before submit (draft BUG-CAT-PDF-EXPOSE) | product | none | 70% |
| CATDL-016 en | Japanese fixed texts on en form (draft BUG-CAT-FORM-EN) | product | none | 70% |

All 8 were already failing in JOB-10 and REG-1200, so I did not re-investigate them. Ledger: updated VOV-008 [en], CATOV-021 [ja]/[en] → pass and ARTICLE-023 [ja] → skip.
Reports: `results/DSR-587/DEV/automation-run-20261023-job13{,-overlay}.md`. Evidence: 8 first-attempt PNGs (~0.56 MB).
