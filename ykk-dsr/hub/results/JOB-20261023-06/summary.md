# JOB-20261023-06 – Agent Author apply of 5 manifests + reruns + BUG-PREVIEW check (DEV) – done
**Merge/incident-related:** none. Every fail has cause = none.
- **Gate:** I re-ran lint on all 5 manifests (0 FAIL) and a fresh dry-run. Each `plan.json` is identical to JOB-05 (`diff` empty), 52 writes in total. Lint now has more PASS rows because of the new `model-current` check.
- **Apply** (03:33:44Z–03:35:53Z, order as in the job): BUGCHK-586-02 2, TD-529-META 4, TD-566-FIX 6, TD-190-DSR 36, TD-587-PHASE2 4. **52/52 HTTP 2xx** (32×201, 20×200). This was the first real use of `/bin/replicate` (Deactivate and page Activate) and of Sling POST page writes, and all of them returned 2xx. Verify L1–L3: 0 FAIL on every manifest. The first TD-190 verify (03:36Z) had 7 L3 `.aem.live` 404s because the live pages were still being generated. The re-verify (~03:39Z) shows 376 PASS.
- **BUG-PREVIEW: "BUG-PREVIEW reproduced after re-preview".** I re-sent Preview with no field change (manifest `BUGCHK-PREVIEW/`, content CFs first, then DSR CFs, 2 writes at 03:37:30Z). At 03:38:31Z (+61 s) with `?cb=`: qa587-preview and qa654-preview `.aem.page` = 200, title "YKK DIGITAL SHOWROOM", rows `source: overlay` + `unavailable: not-found`, noindex. `.aem.live` = 404. The content CFs were already on preview from earlier jobs, so a race is unlikely. A 3rd case: DSR-PDO-002 `/ja/products/990586002` shows the same `not-found` body after today's preview.
- **Runs** (reports `results/<US>/DEV/automation-run-20261023-job06[-rerun2].md`): 586 1P/1F · 529 4P/3F · 566 14P/8F/2S · 557 6/6 P · 587 1P/1F. Run 2 reran the same subsets because Playwright overwrote the run 1 JSON and screenshots. Both runs gave the same results.

| Fail | TC | suspect | cause | confidence |
|---|---|---|---|---|
| `.aem.page` shows `unavailable: not-found`, no product name (BUG-PREVIEW) | PDO-002 ja | product | none | 85% |
| meta category = `product` (one value); TC expects 2 tag IDs → Pending review (accepted [Giả định]) | ARTICLE-012 ja/en | test | none | 10% |
| related items block and heading visible on qa529-02 (0 results); also failed in JOB-21-05/07 | ARTICLE-023 ja | product | none | 50% |
| Back to list missing (template area) | NEWS-002/006 ja/en | product | none | 70% |
| qa566-news-01 is in neither query-index (Q2 open) | NEWS-007 ja/en | product | none | 50% |
| My List button and share icons not found in article-meta | NEWS-012 ja/en | product | none | 60% |
| rows = source, cfPath, unavailable (TC: "single unavailable row"); noindex and redirect OK | VOV-008 en | test | none | 30% |

- **Passed with the new data:** PDO-012, ARTICLE-014/016, NEWS-001/003/004/009/010/013/018, CATV-018/019/020 ja+en, VOV-010. **Skipped:** NEWS-008 (en: ja only; ja: needs TD-566-03). NEWS-005 has no automated test. Visual 014/015 are left for the codex follow-up.
- **Code:** CATV-018–020 now select the TD-190-DSR CFs (`/content/dam/common/{lang}/catalogs/qa190-cat-*`) instead of the old folder. `tsc` exit 0. **Note:** the content/DSR re-preview requests were 0.4 s apart, so the race is not fully excluded. TD-190 dates are valid only on 23/10 JST.
