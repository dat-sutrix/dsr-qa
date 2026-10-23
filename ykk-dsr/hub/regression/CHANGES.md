# Dev changes log → regression (mới nhất trên)
Loại: `cf-model` `query` `overlay` `block:<tên>` `global` `template:<tên>` `content` `fix:<DSR-ID>` – xem README §2. `regressed` = no → lượt guard chạy R2.

| Ngày giờ (VN) | Nguồn | Loại | Thay đổi | Vùng ảnh hưởng (US) | regressed |
|---|---|---|---|---|---|
| 2026-10-23 10:36 | Ngọc DSR-666 c.64967 | fix:DSR-666, block:breadcrumb/eco | Bỏ khoảng trắng breadcrumb → hero eco TOP (build DEV) | 590 (+552 breadcrumb) | no → JOB-20261023-12 |
| 2026-10-23 (deploy dự kiến hôm nay, ~1–2h sau 12:00) | Martin chat 12:04 · draft PR dsr-eds#212, dsr-fullstack#108 | cf-model, query | DSR-669/671 rename DM_*_related → DM_*_dsr, dm*DsrList, migrate cq:model (mọi CF dưới /content/dam/dsr/, dry-run → migrate → republish CF đang live), field 671 | toàn bộ P1 + 529 + 585 → JOB-20261023-11 (hold) | pending (chạy khi Martin ping) |
| 2026-10-23 (PR riêng, xếp sau 669) | Martin chat 12:04 | cf-model, query | DSR-670: tech talks `/content/dam/dsr/{lang}/movies/tech/` → DM_techmovie_dsr, query `dsr-techmovie-page`, cùng template; nếu ship sau 669 thì tạm dùng DM_movie_dsr | 587 tech-talk, 557 | pending |
| 2026-10-23 ~11:30 | Ngọc DSR-672 c.64972 | template:news-detail | Ngày tin tức nhập bằng Text block thay vì Article Meta | 566 | no |
| 2026-10-23 ~09:00 | Martin chat (DSR-673) | content | Author + publish trang `/ja/library/catalog` | 557, 654 list | no |
| 2026-10-22 18:25 JST | Kohei DSR-357 c.64910 | global | Deploy `dev/2026.10.22_3` (12dece2) – 566 template | 566 + R1 | no |
| 2026-10-22 ~15:50 | Ngọc / Dat verify | template:news-detail | Template news-detail có component dựng sẵn | 566 | no |
| 2026-10-22 17:52 JST | Martin DSR-664 · Kohei DSR-357 | block:video, fix:DSR-664 | Deploy `dev/2026.10.22_2` (b6b1416) – video.js caption null | 664, 587, 557, 609, 173 | no |
| 2026-10-22 ~13:45 | Martin chat · PR dsr-eds#206 | overlay | og:image: template không set og:image, EDS lấy ảnh đầu trang | @overlay + overlay-seo | no |
| 2026-10-22 ~13:45 | Martin chat · Kohei DSR-654 c.64885 | query, global | Deploy `dev/2026.10.22` (bf2073a): catalog list → `dsr-catalog-list` (lọc isActive/booth/unpublished) | 557, 654, 570 | no |
| 2026-10-22 18:17 JST | Martin DSR-578 | block:list | List config thêm field tag (Ngọc) | 557, 583 | no |
| 2026-10-20 → | Mayuka DSR-638 | content | Trang test-space ja → URL chính thức (list-catalog → /ja/library/catalog …) | 557, 570, 583, 590 | no |
