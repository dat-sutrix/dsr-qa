# JOB-20261023-14 — DEV catalog L&F
Capture UTC: 2026-10-23T06:10:06.330Z → 2026-10-23T06:11:17.738Z; status: done.
Five URLs × 1440×900 and 390×844; 10 captures, all HTTP 200, no redirects.
All pages now render title, cover/description, date/category and form/download button.
PC image-left/text-right and SP stacking match the demo; all mobile scrollWidth values are 390.
Proposed results: 6 pass; 4 fail (English PDF/e-book × both widths), no blocked/skipped.
Each English failure: Japanese form/consent/button; suspect=product, cause=none, confidence=70%.
Quotes: “氏名（姓）”, “メールアドレス”, “利用規約への同意”, “ダウンロードする”.
Japanese overlays log /ja/library 404: cause=none, confidence=0% new product bug; no uncaught page errors.
No merge/incident-related failure established.
JS Last-Modified: Thu, 22 Oct 2026 01:48:45 GMT; CSS: Thu, 15 Oct 2026 03:59:54 GMT.
The described 23 October refactor deployment is not independently verified.
Viewport screenshots overlap to cover sticky-header boundaries; all requested evidence committed.
Full table/evidence index: results/JOB-20261023-14/look-and-feel.md.
TypeScript: npx tsc --noEmit — exit 0, no errors; capture command exit 0.
Read-only; submissions, downloads and Author data unverified; human QA confirms.
