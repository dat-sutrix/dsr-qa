# KNOWN-FACTS – điều team ĐÃ trả lời / ĐÃ giao (đọc trước khi hỏi bất kỳ ai)

Ghi bởi Jira sweep (08:05 / 12:05 / 16:05 T2–T6) và mọi session. Mới nhất ở trên. Một dòng = 1 sự thật đã xác nhận trên Jira/chat.

| Ngày | Ticket | Ai | Sự thật | Nguồn |
|---|---|---|---|---|
| 2026-10-22 | DSR-587 | Quentin | 11:43 JST comment "Blocked by DSR-665" – DSR-665 đã Done 13:40 JST (retest Pass) → 587 không còn blocked | DSR-587 comment 64827 |
| 2026-10-22 | DSR-566/653 | Quentin | 11:54 JST comment "Blocked by Missing News Article Template" – **mâu thuẫn** Ngọc 19/10 (template đã deploy DEV) → Dat đính chính, không dời S13 | DSR-566 c.64832 · DSR-653 c.64833 |
| 2026-10-22 | DSR-558 | Quentin | DSR-558 (TC 動画・カタログ, Nakamoto) blocked by DSR-664 | DSR-558 comment 64830 |
| 2026-10-22 | DSR-664 | QA→Ngọc | Repro YES DEV (en, .page+.live); giao Ngọc Sprint 12; nghi `blocks/video/video.js:80-83` replaceChildren(null); spec retest `tests/video-block/DSR-664.video-caption-null.spec.ts` | DSR-664 comment 64849 |
| 2026-10-22 | DSR-665/538 | QA | Retest Pass DEV → Done | DSR-665 c.64850 · DSR-538 c.64847 |
| 2026-10-22 | DSR-546 | Quentin | SendGrid webhook blocked by access/API key (DSR-302) | DSR-546 comment 64828 |
| 2026-10-22 | DSR-636 | Kohei | Directory map sheet (gid 1578088003, file 1NCngsRiDeb-IkkSDYSVgpjRNoXb8RbcV) + dev EDS domain ví dụ `main--dsr-eds-dev--sutrix-projects.aem.page/ja/about-fasteners` (gửi Mayuka) | DSR-636 c.64841/64842 |
| 2026-10-22 | DSR-583 | Quentin | "got answer from backlog" (câu hỏi SP 2 cột đã có trả lời ở Backlog) | DSR-583 comment 64814 |
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
