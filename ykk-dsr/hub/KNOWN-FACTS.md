# KNOWN-FACTS – điều team ĐÃ trả lời / ĐÃ giao (đọc trước khi hỏi bất kỳ ai)

Ghi bởi Jira sweep (08:05 / 12:05 / 16:05 T2–T6) và mọi session. Mới nhất ở trên. Một dòng = 1 sự thật đã xác nhận trên Jira/chat.

| Ngày | Ticket | Ai | Sự thật | Nguồn |
|---|---|---|---|---|
| 2026-10-22 | DSR-664 | Nakamoto | Bug mới: video block hiện "null" khi caption trống; giao Dat, chưa gán dev, chưa sprint | Jira DSR-664 |
| 2026-10-21 | DSR-590 | Ngọc | Eco TOP đã xong trên DEV, data là demo → chỉ cần check layout; Figma mới node 3351-51595 (Martin) | DSR-590 comment 21/10 18:18 |
| 2026-10-21 | DM_product | Martin | DM_product ver0.4 đã lên DEV; meta article 529 dùng tên không gạch: publicationdate / updatedate / searchkeywords / category | chat Martin 21/10 |
| 2026-10-21 | Overlay | Martin | URL overlay = node name CF DSR; ID field = node name; 表示フラグ = isActive; publish CF DSR tự sinh trang (sau 21/10 08:25Z) | BL-OVL-1 Update 2026-10-21 |
| 2026-10-21 | DSR-536 | Kohei | URL tech-talk: `/<lang>/library/video/tech-talk/<id>` (không có `/item/`) | DSR-536 comment |
| 2026-10-21 | DSR-457 | Kohei | Dismissed | DSR-457 |
| 2026-10-20 | DSR-638 | Mayuka | Trang test-space ja chuyển sang URL chính thức (list-catalog → /ja/library/catalog, video-list → /ja/library/video/search, …) | DSR-638 |
| 2026-10-19 | DSR-566 | Ngọc | **Template News-Detail (news-article) đã implement + deploy DEV** – không hỏi lại, không dời Sprint 13 | DSR-566 comment 19/10 15:52 |
| 2026-10-22 | DSR-654/557/570 | QA (IDLE-32) | Catalog overlay "block rỗng" KHÔNG phải bug: requiresForm=false trên `/content/dam/common/{lang}/catalogs/qa190-*-form` (data); non-form → `location.replace(pdf)` theo thiết kế (catalog-detail.js:165-169) | results/JOB-ZZ-IDLE-32 |
| 2026-10-22 | DSR-647/657/658/660/538 | QA | Đã đóng Done (retest Pass DEV) | Jira |
| 2026-10-22 | DSR-665 | Martin→QA | Fixed DEV, retest Pass (JOB-20261022-08) → Done | Jira |
| 2026-10-22 | DSR-659 | QA→Martin | og:image/twitter:image đã absolute ✅; `thumbnail` meta vẫn relative (cả .page preview 01:47Z) → trả Martin hỏi fix có cover thumbnail chưa | Jira comment 64851 |
| 2026-10-22 | Author cookie | Dat | Cookie login-token sống < 16h → dán lại mỗi sáng tới khi có D1 | probe 20261022-0435 |
