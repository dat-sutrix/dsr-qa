# KNOWN-FACTS – điều team ĐÃ trả lời / ĐÃ giao (đọc trước khi hỏi bất kỳ ai)

Ghi bởi Jira sweep (08:05 / 12:05 / 16:05 T2–T6) và mọi session. Mới nhất ở trên. Một dòng = 1 sự thật đã xác nhận trên Jira/chat.

| Ngày | Ticket | Ai | Sự thật | Nguồn |
|---|---|---|---|---|
| 2026-10-23 | DSR-669/670/671 | Martin/Kohei | CF model refactor Sprint 12 (tạo 23/10): DM_*_related → DM_*_dsr (+GraphQL dm*DsrList, 8 persisted query, migrate cq:model + republish, fullstack+eds deploy cùng lúc); DM_techmovie_dsr mới cho movies/tech; 671: catalog thêm hubspotFormId/promoText, product label {productId}｜{productName}, bỏ relatedMoodboards, kiểm ngôn ngữ ref, isActive của catalog/video liên quan trên product detail. Giữ alias related/inactive → template overlay không đổi | DSR-669/670/671 description |
| 2026-10-23 | DSR-666/667 | Ngọc | → In Progress 23/10 ~09:05 VN | Jira changelog |
| 2026-10-23 | DSR-664 | QA | Done 23/10 (retest Pass 4/4) | DSR-664 c.64945 |
| 2026-10-23 | DSR-672/673 | QA | Bug mới: 672 news date raw ISO (Ngọc, Medium); 673 ja catalog list 0 thẻ/JSON 7 (Martin, High) | Jira |
| 2026-10-22 | DSR-357 (566) | Kohei | Deploy Dev `dev/2026.10.22_3` commit 12dece2 lúc 09:25Z, trùng lúc 566 → [Dev] In Testing giao Dat 18:25 JST | https://sutrix.atlassian.net/browse/DSR-357?focusedCommentId=64910 |
| 2026-10-22 | DSR-578 | Martin | List (一覧) Design Fixes: Ngọc đã thêm field tag vào list configuration; Martin nhờ 石谷 kiểm tra (chưa xác nhận fixed) | https://sutrix.atlassian.net/browse/DSR-578?focusedCommentId=64909 |
| 2026-10-22 | DSR-611 | Quentin | **Q4 Youku test ID:** `XNTgyNzE1ODE5Ng==` (CN movie 345 闪亮金属拉链简介); dự phòng `XNTgyNTc0MDg4NA==` (movie 346) – nguồn DSR-582 動画_CN → mở TC 3.0/7.0/11.0 phần Youku (557). Q1/Q2 đang hỏi Numata; Q3 (setting NEW/UPDATE) chuyển Kohei – chưa trả lời | DSR-611 c.64863 (14:50 JST) |
| 2026-10-22 | DSR-664 | Martin | Martin nhận lại bug (từ Ngọc 17:37 JST), → **[Dev] In Testing 17:52 JST**; deploy dev/2026.10.22_2 (b6b1416, 08:52Z); liên kết DSR-662 c.64873 → retest JOB-20261022-16 | DSR-664 c.64902 + changelog |
| 2026-10-22 | DSR-662 | 石谷 | ブースTOP: chữ "null" dưới related videos (cùng lỗi DSR-664); 662 → [Dev] In Testing 17:52 JST | DSR-662 c.64873 |
| 2026-10-22 | DSR-357/566 | Kohei/Ngọc | Deploy dev/2026.10.22_2 08:52Z trên epic 357; Ngọc chuyển DSR-566 → In Progress 18:01 JST (chưa comment "template updated"). JOB-15: template thật tên `news-detail`, đã có component sẵn (70%) | DSR-357 c.64904 · DSR-566 changelog |
| 2026-10-22 | DSR-649 | Martin | Trang search-result chưa implement (#8); News list field: tự lấy tin cùng ngôn ngữ (/en → EN) (#12); "ảnh các tầng" thuộc DSR-610 | DSR-649 c.64890 |
| 2026-10-22 | DSR-582 | Quentin | Migration data 動画・カタログ blocked by SharePoint access | DSR-582 c.64861 |
| 2026-10-22 | DSR-654 | Kohei | Deploy dev/2026.10.22 (bf2073a, 06:48Z) – trùng fix og:image/catalog Martin 13:45 VN | DSR-654 c.64885 |
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
| 2026-10-22 | Author cookie | Dat | Cookie login-token sống < 16h. **Dat không có mặt trước 8:30** → dán lại lúc **22:00–23:00** tối hôm trước (nhắc tự động 22:30) để 07:45 verify + Agent Author buổi sáng chạy; cần ghi chiều → dán thêm khi Agent Author báo needs-input. Tới khi có D1 | probe 20261022-0435 · Dat 22/10 16:17 |
| 2026-10-22 | DSR-590 | Dat (L&F) | Eco TOP: khoảng trắng dưới breadcrumb trước banner = bug UI → DSR-666 (Ngọc). Thứ tự header/breadcrumb + tiêu đề hero PC đúng (ảnh agent sai) | DSR-666 |
| 2026-10-22 | DSR-590 | Dat (L&F) | SP carousel: chấm 9 bị nút ">" che ở ≤ 393 px (DevTools 390/393); máy thật 428–440 px OK → DSR-667 (Ngọc). L&F card DSR-590 đóng: 2 NG | DSR-667 |
| 2026-10-22 | DSR-659 | Martin | `<meta name="thumbnail">` relative = **by design** (EDS chỉ absolute og:image/og:image:secure_url/twitter:image; thumbnail chỉ cho query-index) → 659 Done, TC ARTICLE-011 đổi kỳ vọng | chat Martin 13:45 VN · DSR-659 c.64884 |
| 2026-10-22 | og:image overlay | Martin | `about:error` = EDS không copy og:image từ overlay head; fix PR dsr-eds#206 merged: template không set og:image, EDS lấy ảnh đầu trang (thumbnail; product = media01). **Phải republish DSR CF** để áp dụng; còn `about:error` ngay sau → cache, thêm `?cb=1`. Trang redirect/CF thiếu có thể không có og:image = expected | chat Martin 13:45 VN |
| 2026-10-22 | Catalog list 557/654 | Martin | List đọc DSR CF `/content/dam/dsr/{lang}/catalogs/` (query `dsr-catalog-list`), loại isActive false / booth-limited / CF chưa publish; card có form → link trang detail overlay. Đang deploy AEM query → list RỖNG trên DEV tới khi Martin ping. Kỳ vọng: ja 6, en 5 thẻ | chat Martin 13:45 VN |
| 2026-10-22 | isActive OFF | Martin | 200 + `unavailable | inactive` là by design; redirect về list xảy ra ở browser (không thấy bằng curl). `/ja/library/catalog` đã publish → redirect JA chạy | chat Martin 13:45 VN |
| 2026-10-22 | DSR-566 template | Martin | Trang tạo từ template news-article chỉ có Article Meta + News Detail (placeholder), không có component dựng sẵn (date/news type/title/description/image), khoảng cách component chưa đúng; Martin tự kiểm, có thể sửa trước tối 22/10 | chat Martin ~14:00 VN |
| 2026-10-22 | DSR-566 template | Ngọc / Dat | Template news-article đã sửa (~15:50 VN): page mới có sẵn Article Meta, Title, Text, Spacer, Text, Image, Spacer, Button. Dat verify UE 16:06 = READY | evidence/DSR-566/20261022/dat-qa566-template-check-UE.png |
| 2026-10-23 | DSR-673 | Martin | `/ja/library/catalog` "fixed – the page wasn't authored at all" (Google Chat ~09:00 VN) → nguyên nhân: trang list ja chưa được author/publish, không phải lỗi code. Retest JOB-20261023-04 | Chat DSR Daily MTG 23/10 |
| 2026-10-23 | DSR-570 | QA-PT | Night 22/10 (5h): việc 1→6 xong; CATDL-011 Blocked – không có POST tới *.hubspot.com / *.hsforms.com (khớp kết quả agent) | QA-PT report 23/10 |
