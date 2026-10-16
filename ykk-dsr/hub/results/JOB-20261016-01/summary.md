# JOB-20261016-01 — done
DEV Chromium. DSR-BREAD-010/014/015/018 implemented (Bug-FIELD fixme removed) and run: 7 tests, 4 passed, 2 failed, 1 skipped (018 cn, Issue #18).
Preflight: all T2 ja/en and T3 long/special pages + leaves HTTP 200 with expected titles; nothing blocked-data. T5 not touched.
Purpose mapping differs from the job: TC Excel says 015 = special characters, 018 = per-language labels (job had 015 = empty fallback, 018 = special). Followed the TC file.
The job's 015 fallback check is covered in 010/018: grandchild shows its title (QAラベル孫 / QA Label Grandchild), JSON-LD names 1..5 = visible.
010 ja/en PASS: HOME > test space > 親ラベル > 子ラベル > QAラベル孫; en EN Parent Label / EN Child Label; hrefs unchanged; child page last item = display name.
018 ja/en PASS: each language shows only its own labels/titles.
014 FAIL (suspect product): long label is white-space:nowrap, 1400px wide → document scrollWidth 1456 at 1440 and 1024 px.
014: control T1 page at 1440 has no overflow. 375 px: no overflow, ellipsis applied (record only; SP rule open DSR-575 Q5). Added 1024 px from TC step.
015 FAIL (suspect data): breadcrumb + JSON-LD show `QA & "Test" ®`; the <b>/<script> parts are gone.
015: the published navtitle meta and query-index already hold the stripped value, so the stripping happens before the block (publish pipeline or Author entry; Author not checked).
015 positives: no <b>/<script> element, no dialog, no console error; & is escaped as text.
TypeScript: exit 0, no errors. Report: results/DSR-552/DEV/automation-run-20261016.md.
Evidence: 014 section screenshots at 1440/1024/375 + 015 failure screenshot (≈116 KB). Build identity not verified; outcomes are proposals for QA.
