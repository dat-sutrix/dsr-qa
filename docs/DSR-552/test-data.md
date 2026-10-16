# DSR-552 – Test data manifest

QA values supplied 2026-10-12. Preflight requests every URL before the suite and records HTTP status, final URL and exact document title (brand suffix removed) in evidence/DSR-552/DEV/preflight.json. Only published pages are read.

| Key | Path under /master/{lang}/test-space | Expected title | Languages / observation |
|---|---|---|---|
| T1 parent | dsr552-bc | QA Parent | ja/en 200 exact |
| T1 child | dsr552-bc/child | QA Child | ja/en 200 exact |
| T1 grandchild | dsr552-bc/child/grandchild | QA Grandchild | ja/en 200 exact |
| T3 root | dsr552-edge | QA Edge | ja 200 exact |
| T3 A | dsr552-edge/sp-a | 階層Aのとても長いタイトルを持つテスト用ページ名称です確認用 | ja 200 title mismatch (spaces and PDF glyphs) |
| T3 B/C | dsr552-edge/sp-b, dsr552-edge/sp-c | Same supplied title with B/C | ja 404; blocked test data |
| T4 root | dsr552-gap | QA Gap | ja 200 exact |
| T4 missing | dsr552-gap/x | No published page | ja 404 expected |
| T4 leaf | dsr552-gap/x/leaf | QA Leaf | ja 404; TC-007 blocked |
| T2 parent | dsr552-label | QAラベル親 / QA Label Parent; display 親ラベル / EN Parent Label | ja/en 200 exact (2026-10-16); navtitle in query-index |
| T2 child | dsr552-label/child | QAラベル子 / QA Label Child; display 子ラベル / EN Child Label | ja/en 200 exact (2026-10-16) |
| T2 grandchild | dsr552-label/child/grandchild | QAラベル孫 / QA Label Grandchild; display empty | ja/en 200 exact (2026-10-16) |
| T3 long | dsr552-edge/long | QA Long; display = 長い表示名テスト×12 + 長い表示 (100 full-width chars) | ja 200 exact; navtitle equals TC value |
| T3 long leaf | dsr552-edge/long/leaf | QA Long Leaf | ja 200 exact |
| T3 special | dsr552-edge/special | QA Special; display `<b>QA</b> & "Test" ®` + `<script>alert(1)</script>` (TC value) | ja 200; published navtitle is `QA & "Test" ®` (tags already removed before the breadcrumb, 2026-10-16) |
| T3 special leaf | dsr552-edge/special/leaf | QA Special Leaf | ja 200 exact |
| Test space | /master/ja/test-space | test space | 200 exact |
| Test space | /master/en/test-space | test-space | 404; Bug-INDEX; assertions remain active |

Chinese is cn; /master/cn absent (Issue #18). STG/PRO fixtures unverified. T2/T3 display names seeded by QA-PT on DEV 2026-10-15 (Bug-FIELD/DSR-592 dismissed: field is UE → Properties → ページ基本). Tests 010/014/015/018 check each fixture path at run time; a 404 makes that TC blocked test data (fixme), not a failure. T5 omitted and never accessed. T3 sibling paths above follow the current QA table; older nested sp-a/sp-b/sp-c scaffold paths are no longer assumed.

HOME label is HOME and URL has no trailing slash. T1 expected trails include test-space level: 3/4/5 items for parent/child/grandchild. T4 excludes x only. Raw title differences are retained in preflight JSON; do not normalize away glyph/spacing defects.
