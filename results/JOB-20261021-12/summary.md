# JOB-20261021-12 — DEV visual capture
Run UTC: 2026-10-22T00:57:17.515Z → 2026-10-22T00:58:11.116Z; Chromium 153.0.8010.12; job status: done.
DSR-CATOV-020 proposed outcome: Pending (4 overlay captures blocked); 2 demo references captured.
All three URLs returned HTTP 200 on .aem.live; final URLs unchanged; .aem.page fallback unnecessary.
Evidence: evidence/DSR-654/DEV/DSR-CATOV-020_DEV_01.png … _06.png (758101 bytes, committed per job).
01/02 = ja 1440/375; 03/04 = en 1440/375; 05/06 = demo 1440/375.
| L&F item | Proposed OK/NG | Observation / Dat review |
|---|---|---|
| Title → image/text → form/button | NG | Both overlay languages have an empty catalog-detail block (height 0); demo has all sections. TC blocked by data, not a confirmed product bug. |
| Desktop alignment | NG | Demo image left, text right, two-column form below; overlay content absent. |
| Mobile stacking | NG | Demo title → image → text/date/category → form → download; overlay content absent. |
| Horizontal scroll at 375 | OK | scrollWidth = 375 for ja, en and demo; overlay measurement covers an empty content area only. |
| Breadcrumb difference | OK | Recorded: ja HOME → title; en HOME → library → catalog → title; demo HOME → test space → DSR-570: Catalog Detail. Informational, not a baseline verdict. |
Observed shell order: header → breadcrumb → empty catalog area → footer (ja/en); demo renders catalog between breadcrumb and footer.
Likely blocker: known BUGCHK-190-FORM data issue; ja public HTML omits requiresForm; code redirects non-form items to PDF; all overlay captures record PDF net::ERR_ABORTED.
Suspect=data, cause=none, real-product-bug confidence=0%; Author fields and download outcome not verified. No confirmed product failures or merge-related failures.
Command: node ykk-dsr/hub/results/JOB-20261021-12/capture.cjs; exit 0; sequential contexts, no retries, no npm suite.
TypeScript: npx tsc --noEmit — exit 0, no errors. Automation HEAD: 81033ca08778398c8731f2c009c3c16e4ed8b447; deployed build SHA unknown (Last-Modified in result.json).
Baseline: DSR-654.spec.json TC 20.0; BL-OVL-1 update 2026-10-21. Figma pixel comparison not performed.
Open points for QA: correct/publish form-gated seed data, repeat comparison; Dat confirms L&F. Read-only capture; no form submissions.
