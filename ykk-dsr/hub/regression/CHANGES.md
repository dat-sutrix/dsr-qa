# Dev changes log → regression (mới nhất trên)
Loại: `cf-model` `query` `overlay` `block:<tên>` `global` `template:<tên>` `content` `fix:<DSR-ID>` – xem README §2. `regressed` = no → lượt guard chạy R2.

| Ngày giờ (VN) | Nguồn | Loại | Thay đổi | Vùng ảnh hưởng (US) | regressed |
|---|---|---|---|---|---|
| 2026-10-23 17:25 JST (deploy 08:25Z) | Kohei DSR-670 c.65033 | cf-model, query | Deploy `dev/2026.10.23_2` b33514f: DM_techmovie_dsr + `dsr-techmovie-page` (tech talks `movies/tech/`) | 587 tech-talk, 557 | yes (JOB-ZY-REG-20261023-1620-claude-code) – dup of row 15:25 VN below |
| S12 (To Do) | Nakamoto DSR-675 | query, overlay | Query `dsr-product-page` +8 field; `product.html` xuất 22 meta search-index trong head | 586 (+ overlay-seo) | pending |
| 2026-10-23 14:32 JST | Ngọc DSR-667 c.65003 | fix:DSR-667, block:eco-carousel | Fix dot carousel SP build DEV (QA retest 14:48 JST: chưa đạt – dot 9 bị container cắt) | 590 | yes (JOB-ZY-REG-20261023-1620-claude-code) – 667 fix itself still not met (dot 9 clipped 0 px, bug retest, not regression) |
| 2026-10-22 18:07 JST (chờ deploy) | Martin DSR-661 c.64907 | block:related-content, content | Fix 関連コンテンツ booth + author `/ja/digital-showroom/both/item`; "must be deployed to DEV before testing" | booth 608/610, 586 related | pending |
| S12 (In Progress) | Mayuka DSR-639 | global | Đổi href header `/ja/nav` + footer `/ja/footer` sang URL chốt (DSR-637) | smoke, 552, 609 + mọi spec click header | pending |
| S12 (To Do) | Mayuka DSR-640–646 (+638) | content | ~165 trang ja mới / port từ test-space; path cũ 404 | 557, 570, 583, 590, 529, 568 | pending |
| 21/10 → (chưa ngày) | Martin DSR-649 c.64890 → DSR-610 | block:digital-showroom | Thêm ảnh các tầng DIGITAL SHOWROOM | 610 | pending |
| 2026-10-23 ~12:50 (Ngọc thấy) | Martin commits (chat DSR-570 thread 13:00) | block:catalog-detail | **Đã deploy từ trước (Martin 17:15: "already deployed, no branch open" – catalog-detail.js 22/10 01:48 GMT chính là bản này)** Refactor detail page navigation + reserved entry checks; catalog detail hỗ trợ PDF + e-book; thêm catalog paths | 654, 570, 557 → JOB-23-14 (L&F) + JOB-23-15 (R2) | yes (JOB-ZY-REG-20261023-1620-claude-code + JOB-23-15/21; Martin 17:15: already deployed) |
| 2026-10-23 10:36 | Ngọc DSR-666 c.64967 | fix:DSR-666, block:breadcrumb/eco | Bỏ khoảng trắng breadcrumb → hero eco TOP (build DEV) | 590 (+552 breadcrumb) | yes (JOB-20261023-12 + JOB-ZY-REG-20261023-1200-claude-code) |
| 2026-10-23 **deploy `dev/2026.10.23` a47274d 14:21 VN** (Kohei DSR-669 c.65023; migrate đang chạy) | Martin chat 12:04/13:35 · draft PR dsr-eds#212, dsr-fullstack#108 | cf-model, query | DSR-669/671 rename DM_*_related → DM_*_dsr, dm*DsrList, migrate cq:model (mọi CF dưới /content/dam/dsr/, dry-run → migrate → republish CF đang live), field 671 | toàn bộ P1 + 529 + 585 → JOB-20261023-11 (hold) | yes (JOB-ZY-REG-20261023-1620-claude-code, publish side: 0 NEW FAIL) – Author side still JOB-23-11 |
| 2026-10-23 **deploy `dev/2026.10.23_2` b33514f 15:25 VN** | Kohei DSR-670 c.65033 · Martin chat 12:04 | cf-model, query | DSR-670: tech talks `/content/dam/dsr/{lang}/movies/tech/` → DM_techmovie_dsr, query `dsr-techmovie-page`, cùng template; nếu ship sau 669 thì tạm dùng DM_movie_dsr | 587 tech-talk, 557 | yes (JOB-ZY-REG-20261023-1620-claude-code) |
| 2026-10-23 ~11:30 | Ngọc DSR-672 c.64972 | template:news-detail | Ngày tin tức nhập bằng Text block thay vì Article Meta | 566 | yes (JOB-ZY-REG-20261023-1200-claude-code) |
| 2026-10-23 ~09:00 | Martin chat (DSR-673) | content | Author + publish trang `/ja/library/catalog` | 557, 654 list | yes (JOB-ZY-REG-20261023-1200-claude-code) |
| 2026-10-22 18:25 JST | Kohei DSR-357 c.64910 | global | Deploy `dev/2026.10.22_3` (12dece2) – 566 template | 566 + R1 | yes (JOB-ZY-REG-20261023-1200-claude-code) |
| 2026-10-22 ~15:50 | Ngọc / Dat verify | template:news-detail | Template news-detail có component dựng sẵn | 566 | yes (JOB-ZY-REG-20261023-1200-claude-code) |
| 2026-10-22 17:52 JST | Martin DSR-664 · Kohei DSR-357 | block:video, fix:DSR-664 | Deploy `dev/2026.10.22_2` (b6b1416) – video.js caption null | 664, 587, 557, 609, 173 | yes (JOB-ZY-REG-20261023-1200-claude-code) |
| 2026-10-22 ~13:45 | Martin chat · PR dsr-eds#206 | overlay | og:image: template không set og:image, EDS lấy ảnh đầu trang | @overlay + overlay-seo | yes (JOB-ZY-REG-20261023-1200-claude-code) |
| 2026-10-22 ~13:45 | Martin chat · Kohei DSR-654 c.64885 | query, global | Deploy `dev/2026.10.22` (bf2073a): catalog list → `dsr-catalog-list` (lọc isActive/booth/unpublished) | 557, 654, 570 | yes (JOB-ZY-REG-20261023-1200-claude-code) |
| 2026-10-22 18:17 JST | Martin DSR-578 | block:list | List config thêm field tag (Ngọc) | 557, 583 | yes (JOB-ZY-REG-20261023-1200-claude-code) |
| 2026-10-20 → | Mayuka DSR-638 | content | Trang test-space ja → URL chính thức (list-catalog → /ja/library/catalog …) | 557, 570, 583, 590 | yes (JOB-ZY-REG-20261023-1200-claude-code) |
