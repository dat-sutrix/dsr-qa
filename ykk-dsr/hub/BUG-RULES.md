# Bug filing rules (Dat 20/10/2026 16:23 – standing)

Applies to every scheduled run (07:45 morning, 17:10 evening) and every session.

1. **Confidence ≥ 80% → create the Jira Bug yourself** (no Dat approval needed):
   project DSR · type Bug · label `qa-ai` · assignee = dev of the US (Martin = accountId `712020:fc54319c-c8aa-4a0d-a4fe-dc8ec641be79` for 552/529/586/587/647/585) · link "relates to" the US · English: Summary `[DSR-<US>] …`, Env, Preconditions, Steps, Expected (baseline ref), Actual (raw values), Evidence (project-relative paths / Drive links), Affected TCs.
   Check for duplicates first (JQL `project = DSR AND type = Bug AND statusCategory != Done AND text ~ "<key words>"`). Never change priority of dev tickets; severity → Priority field of the new bug only.
   After creating: add row to BUGS.md "Bug đang mở" with Việc kế tiếp.
2. **Confidence < 80% → do NOT create.** Add a row to DASHBOARD.md section **"🐞 Bug < 80% – Dat chốt"**: draft ID · 1-line title · % · what is missing to reach 80% · suggested decision. Standup copies this section.
3. **Confidence scale:** 90% = 2 independent sources agree (agent raw data + Author/QA-PT evidence) and baseline is explicit · 80–85% = 1 solid source + explicit baseline (design 58594 / BL-v1 / BL-OVL-1), data verified correct · 60–70% = baseline ambiguous / open decision in design / data not verified · ≤ 50% = only one screenshot or data could be wrong. Data error proven → not a bug (fix data, 0%).
4. **Merge / incident grouping (20/10):** every fail first gets `cause` = `overlay-merge` (Martin overlay merge 20/10 06:44 JST: video/product, catalog ~12:45) · `dm_product-CR` (DSR-585 CR incident 20/10, docs/incidents/2026-10-20-dm-product-CR-DSR-585.txt) · `dm_product-ver0.4` (Martin 20/10 17:14 JST) · `none`. Any fail with cause ≠ `none` goes to DASHBOARD section **"📣 Báo Martin – merge/incident"** (one row: URL · symptom · cause · first seen job · evidence), **even if it is also filed as a bug**. Draft one English Slack message to Martin at the end of that section. Known pre-existing issues (placeholders.json 404, scene7 403, DSR-583 layout, test-space 404s listed in JOB-20261020-07) are `none`.
5. Per-US decision tables in `bugs/<US>-decision-<date>.md` override the scale above for those bugs.
