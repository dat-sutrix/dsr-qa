---
id: JOB-ZZ-IDLE-37
agent: claude-code
us: DSR-566/653 – prepare automation for the NEW news-detail template (no run on qa566 pages yet)
type: spec update (read-only on AEM)
env: dev
priority: P3 (idle, night)
created_by: claude-web 22/10 22:55
---
Template changed 22/10 (results/JOB-20261022-15): page = Article Meta → Title → Text (news type, free text "お知らせ") → Spacer → Text (body) → Image → Spacer → Button. Old `news-detail` block with `category@select` is gone.
Update `tests/news-detail/*` (DSR-566 spec, 18 TCs from tc-out/DSR-566.spec.json) selectors/Expected to this structure WITHOUT changing the TC intent: TC 2.0 block order per template; TC 4.0 news type read from the Text block under Title; TC 7.0/8.0 also read page-level `category` meta if present; TC 3.0 date format YYYY.MM.DD (DSR-660 rule). Record changes in docs/DSR-566/ assumptions with source "JOB-20261022-15 + Dat 22/10". Do a dry run against `/master/ja/test-space/test-news-detail-template` (exists, created by dev from the new template) only to validate selectors; report results as "selector check", not verdicts. tsc must pass. Output results/JOB-ZZ-IDLE-37/summary.md. Finish before 07:30 VN.
