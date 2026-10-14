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
| Test space | /master/ja/test-space | test space | 200 exact |
| Test space | /master/en/test-space | test-space | 404; Bug-INDEX; assertions remain active |

Chinese is cn; /master/cn absent (Issue #18). STG/PRO fixtures unverified. T2 display-name tests blocked by Bug-FIELD. T5 omitted and never accessed. T3 sibling paths above follow the current QA table; older nested sp-a/sp-b/sp-c scaffold paths are no longer assumed.

HOME label is HOME and URL has no trailing slash. T1 expected trails include test-space level: 3/4/5 items for parent/child/grandchild. T4 excludes x only. Raw title differences are retained in preflight JSON; do not normalize away glyph/spacing defects.
