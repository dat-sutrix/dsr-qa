# JOB-20261023-03 – Agent Author apply TD-587-NEG + TD-557-YOUKU, then JOB-18 + Youku TCs (DEV) – done
**Merge/incident-related:** none (all fails cause = none).
- **Gate:** fresh lint = JOB-02 (NEG PASS 212/FAIL 0/WARN 22 · Youku PASS 62/FAIL 0/WARN 4); fresh dry-run `plan.json` identical to JOB-02 (17 / 8 writes) → apply allowed.
- **Apply TD-587-NEG** (02:28:31Z): 17 writes – 13 creates HTTP 201, 4 publish requests HTTP 200 (`TD-587-NEG/writes.log`). Verify `--since`: L1 92 + L2 25 PASS; L3 9 PASS, 1 FAIL = qa587-preview `.aem.live` 404, which is the intended state (preview-only, TD-587-02).
- **Apply TD-557-YOUKU** (02:30:51Z): 8 writes – 4×201, 4×200. Verify L1 26, L2 8, L3 4 – all PASS.
- **DSR-587 run** (`results/DSR-587/DEV/automation-run-20261023-job03.md`): 3 pass (VOV-006 en, VOV-007 ja/en), 1 fail, 5 skip.
- **DSR-557 run** (`results/DSR-557/DEV/automation-run-20261023-job03.md`): new tests CATV-003/007 ja+en × page+live 8/8 pass; CATV-011 skip (DSR-611 #2 + no cn).

| Fail | TC | suspect | cause | confidence |
|---|---|---|---|---|
| qa587-preview `.aem.page` 200 but renders `unavailable: not-found` (title "YKK DIGITAL SHOWROOM", browser → video/search); `.aem.live` 404 OK. Data L1/L2 PASS. Same symptom as CATOV-009 qa654-preview (JOB-22-10) → preview-only DSR CFs never render content. Either publish-tier lookup or preview race (content + DSR CF preview 0.25 s apart); a re-preview would tell, not in plan | DSR-VOV-002 | product | none | 60% |

- **Skipped (TD not done):** VOV-004 (QA587_Upper, QA-PT) · 005 (sub-folder) · 008 / 010 (phase 2 not in plan) · 012 (tech DSR CF, DSR-669/Q32; test not written).
- [Giả định] VOV-006 counted as seeded (`DSR587_SEEDED=06`) from L1 (commune CF exists, no DSR CF). TC 3.0 (cn) run on ja/en; Youku playback not asserted (A4). TC 7.0 "only required domains" not asserted – frame-src also allows vimeo/twitter/google/hsforms.
- TC source for 3/7/11: Drive DSR-190 TC file (QA edition 15/10), read-only.
- `jobs/hold/JOB-20261022-18.md` left as is (runner/Claude to move); its TCs are covered here.
- Evidence: `evidence/DSR-VOV-002_en.png`.
