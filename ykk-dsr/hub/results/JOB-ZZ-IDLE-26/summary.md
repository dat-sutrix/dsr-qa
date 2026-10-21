# JOB-ZZ-IDLE-26 – DSR-552 regression + DSR-638 watch (DEV, 21/10 10:35–10:39Z)
## Merge/incident-related
None. 0 fails, so no `cause`/confidence to assign (all `none`, product-bug confidence 0%).
**1. DSR-552 regression** (`--project=chromium`, full spec, as JOB-20261019-07): 43 tests – 29 pass, 0 fail, 14 skip (all pre-existing fixme: cn Issue #18, DSR-575 Q5, DSR-555, DSR-536, STG Lighthouse, layout tickets). Exit 0, no retries, tsc no errors. vs JOB-20261019-07: 014 [ja] still pass; 014 [en] still blocked (data) – `/master/en/test-space/dsr552-edge/long[/leaf]` 404 on .live. No new fails after the 21/10 deploys (listing.js/adapters/cf.js 08:54Z, article ~09:45Z). Report: `results/DSR-552/DEV/automation-run-20261021-idle26.md`.
**2. DSR-638 watch** (`ENV=dev node fixtures/dsr-638-path-status.cjs`, 10:38:46Z):
| path (ja / en) | .page ja / en | .live ja / en | changed vs IDLE-24 / IDLE-22 |
|---|---|---|---|
| /master/{lang}/test-space/list-catalog | 200 / 200 | 200 / 200 | no / no |
| /master/{lang}/test-space/video-list | 200 / 404 | 200 / 404 | no / no |
| /master/{lang}/test-space/product-list | 200 / 404 | 200 / 404 | no / no |
| /master/{lang}/test-space/article-list | 200 / 404 | 200 / 404 | not in IDLE-24 / no |
| /{lang}/library/catalog | 404 / 200 | 404 / 200 | ja not in IDLE-24, en no / no |
| /{lang}/library/video/search | 200 / 200 | 404 / 404 | no (IDLE-24 .page only) / no |
| /{lang}/product/performance/sustainable/product-index | 200 / 200 | 404 / 404 | no (IDLE-24 .page only) / no |
| /{lang}/library/article | 200 / 200 | 404 / 404 | not in IDLE-24 / no |
Reading: nothing changed since IDLE-22 (06:45Z). `/ja/library/catalog` still not created; new paths except `/en/library/catalog` are still .page only (not published on .live). Main block matches where both exist (listing). Read-only; no content writes; build identity not verified.
