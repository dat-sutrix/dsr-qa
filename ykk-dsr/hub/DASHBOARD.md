> 📌 Ngữ cảnh chung cho mọi session: [CONTEXT.md](CONTEXT.md)
# YKK DSR – QA Dashboard

> 🗣 **Daily standup hôm nay: [STANDUP.md](STANDUP.md)** (tự cập nhật 08:19 T2–T6)

> Cập nhật: 2026-10-21 17:10 (UTC+7, [schedule] evening) · trước đó 16:45 claude-web Điều phối · Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10** · Buffer ticket mới: 23, 26, 27/10 · Chi tiết: [PLAN](PLAN-sprint12.md) · [BUGS](BUGS.md) · [us/](us/)
> Lượt tự động 07:45 / 17:10 cập nhật file này. Giữ gọn: chỉ trạng thái hiện tại, lịch sử nằm trong git log và us/*.md.

## 1. Ticket đang giao Dat: 10 mở (Jira 21/10 16:40) – 566 + 653 tính là 1 việc · ✅ Done 20/10: DSR-552, DSR-648, DSR-651
> Bối cảnh 21/10: overlay 404 đã rõ nguyên nhân (dev fix auto-gen trang 08:25 UTC + data QA sai) → **Night 21/10 sửa data** (pack v3) → agent sáng 22/10 → **Done 22/10 giữ**.
| Ticket | Trạng thái | Kế hoạch (khi nào) | Blocked / đang đợi ai | Done DEV đích |
|---|---|---|---|---|
| [DSR-587](https://sutrix.atlassian.net/browse/DSR-587) 動画詳細 Overlay | 19 TC + automation; /ja/…/qa-587-main 200 sau republish | Night 21/10 việc 1–3 (đổi tên qa587-main, movieId, 表示フラグ, rel-b) → JOB-20261020-02 sáng 22/10 | QA-PT (data) | 22/10 |
| [DSR-647](https://sutrix.atlassian.net/browse/DSR-647) bug related movies (retest) | Martin đã merge 20/10 | Night 21/10 việc 2–3 → JOB-20261019-03 (retarget qa587-rel-a/b) 22/10 → đóng bug | QA-PT (data) | 22/10 |
| [DSR-538](https://sutrix.atlassian.net/browse/DSR-538) bug link publish domain (retest) | kiểm tĩnh: likely fixed (JOB-20261021-02) | retest trên qa587-main trong JOB-20261020-02 22/10 → Pass thì đóng | QA-PT (data) | 22/10 |
| [DSR-557](https://sutrix.atlassian.net/browse/DSR-557) 動画・カタログ | e-book ✅; 016/017 ✅ | video: Night 21/10 việc 4 (qa557-dam) · catalog: việc 5 → JOB-20261020-02/-04 22/10 | QA-PT (data) · Quentin DSR-611 (mặc định) | 22/10 |
| [DSR-570](https://sutrix.atlassian.net/browse/DSR-570) 資料DL | 7 ✅ · 1 ❌ TC 007 · 6 ⛔ · 2 skip | catalog: Night 21/10 việc 5 → JOB-20261020-04 · manual 6 TC việc 7 (nếu còn giờ, không thì 22/10) | QA-PT · Quentin (TC 007) | 22/10 (rủi ro manual) |
| [DSR-654](https://sutrix.atlassian.net/browse/DSR-654) CATALOG Overlay (sub-task 586) | automation scaffold DSR-CATOV-001..008 (JOB-20261021-02) | TC job tối 21/10 viết TC · chạy cùng JOB-20261020-04 22/10 | QA-PT (catalog data) | 22/10 |
| [DSR-586](https://sutrix.atlassian.net/browse/DSR-586) 製品詳細 Overlay | 12/20 ✅ trên product 46 (.page, JOB-20261021-03) · ver0.4 xác nhận (Martin) | Night 21/10 việc 6 TD-586-01/02 ja → JOB-20261020-03 22/10 · TD-586 en + negative Night 22/10 | QA-PT | 22/10, fallback 23/10 |
| [DSR-529](https://sutrix.atlassian.net/browse/DSR-529) 記事詳細 | 🐞 DSR-657/658/659/660 – Martin fix xong local, chờ merge · BUG-2/NEW-1 không phải bug (re-baseline TC) | Night 21/10 việc 0 (navtitle/category, sửa block ảnh, publish lại 6 trang) → JOB-20261021-05 retest khi Martin merge | Martin (merge) | 22/10 |
| [DSR-653](https://sutrix.atlassian.net/browse/DSR-653) + [DSR-566](https://sutrix.atlassian.net/browse/DSR-566) ニュース詳細 | 5/18 ✅ · 12 ⛔ (không có template news-article) | Có template → seed tối đó → agent hôm sau · Dat đã báo Quentin đề xuất Sprint 13 | Quentin | Sprint 13 (đề xuất) |
Theo dõi (không giao Dat): DSR-590 (Ngọc) · **DSR-457 Dismissed 21/10 (Kohei) → mục OK cũ + #13 kiểm lại trong DSR-586** · DSR-503 Dismissed · DSR-585 → [STG] In Testing (Quentin; Sprint 12 chỉ DEV) · ⚠ **DSR-638 (Mayuka, In Progress): chuyển trang test-space ja sang URL chính thức** (list-catalog → /ja/library/catalog, video-list → /ja/library/video/search, product-list → /ja/product/…/product-index, article-list → /ja/library/article) – đường dẫn cũ sẽ 404 → automation 557/570/583/590 vỡ; IDLE-22 theo dõi · DSR-433 (⛔ SendGrid).

> ⚠ **T3 20/10:** overlay đã merge, Martin dọn folder → một số CF test bị xóa → tạo lại bằng TD-587 (PLAN "Night Pack 20/10"). **Product:** hỏng 12:12–13:50 JST do CR DSR-585 đổi model (−30/+9 field), Martin đã sửa – QA đang xác minh (JOB-20261020-07); field mới chưa hiển thị (chưa có design); catalog overlay đang được merge (Dat OK).

## 2. 🔔 Dat cần làm
| Ưu tiên | Việc | Với ai | Hạn | Nội dung gửi sẵn |
|---|---|---|---|---|
| P1 | Gửi QA-PT link **Night Work Pack 2026-10-21 (v3)** + bảng lỗi QA-PT (QA-PT-ERRORS.md) | QA-PT | 21/10 tối | https://docs.google.com/document/d/1xY_ghkX8I3LqTSyziO-Ef8AU_tN3JF4aru0R29aMddo |
| P2 | Gửi Martin tin trong mục 📣 (2 câu hỏi: redirect isActive OFF + xác nhận deploy cấu hình 404) | Martin | 22/10 sáng | xem cuối mục 📣 |
| P3 | Chốt nháp 🐞 BUG-OVL-INACTIVE (50%) sau khi Martin trả lời | — | 22/10 | — |
| ✅ | Martin đã merge fix 657/658/659/660 (16:45) + deploy cấu hình 404 → QA-PT publish lại 6 trang tối nay là đủ (sau merge) → JOB-20261021-05 sáng 22/10 · JOB-20261021-06 smoke overlay/404 sau deploy | — | — | — |
| P2 | **Author agent P0′:** sáng 22/10 trên VPS (terminal `bash`, user `qa`) chạy lại `tools/author/probe.sh` → báo claude-web dòng "Cookie age" + check 1 có 200 không (đo tuổi thọ cookie) | — | 22/10 sáng | lệnh: xem AUTHOR-AGENT.md §2b |
| ✅ | 21/10 đã xong: tin Martin (404, ver0.4, 529 Q), daily report group, Quentin (566 → Sprint 13), Sprint 12 gán cho 657–660 + 611 | — | — | — |

## 3. 🌙 QA part-time tối nay (T4 21/10) – [Night Work Pack 2026-10-21 (v3)](https://docs.google.com/document/d/1xY_ghkX8I3LqTSyziO-Ef8AU_tN3JF4aru0R29aMddo) · evidence [Evidence_20261021](https://drive.google.com/drive/folders/1JZFIibeWPO3y2gR05MFlirQb0u0dCjCq)
~4h20: **0.** 529 (robots, navtitle/category UE, sửa block ảnh, publish lại 6 trang, publish video/search) · **1.** qa587-main đổi tên + movieId · **2.** r1–r6 + rel-a · **3.** off + rel-b · **4.** qa557-dam · **5.** catalog lõi en+ja · **6.** TD-586-01/02 ja · **7.** (nếu còn giờ) 570 manual. v1/v2 = CŨ.

## 4. 🤖 Agents
| Lane | Hàng đợi | Hold (07:45 tự chuyển khi đủ điều kiện) |
|---|---|---|
| claude-code | **JOB-20261021-07** (529 kiểm sớm sau merge 658/659/660 + thêm assertion ngày 007) · IDLE-26 (regression 552 + theo dõi URL DSR-638) | -20-02 (587/557 video + 538) · -19-03 (647 rel-a/b) · -20-04 (catalog 557/570 + 654) · -20-03 (586 positives ← TD-586) · -21-05 (retest 657–660 ← Night 21/10 việc 0) |
| codex | IDLE-27 (chụp trang 529 sau merge, trước republish) | -20-11 (587 visual) · -16-11 (566 visual ← template) |
Kết quả 21/10 chiều (17:10 đã đọc): JOB-20261020-08 product ver0.4 không regression (10 fail = DSR-583 cũ) · JOB-20261021-04 529: 010 ✅, 002/006/011 ❌ = bug 657/658/659 (chạy trước merge), 012/014/028 = data (chờ publish lại), 007 chưa assert định dạng ngày → sửa trong -07 · JOB-20261021-06: en qa587-main ✅ 200 .page+.live; trang 404 = template site; deploy cấu hình 404 **không thấy công khai** · IDLE-25 catalog en .page ✅, .live 404 = chưa publish lại (Night việc 5) · IDLE-24 visual URL mới DSR-638: 8/8 khớp layout.

## 5. TC (Jira sub-task `qa-tc`)
Night TC job (21/10 20:07): done 2/2 hôm nay (✅ 529 re-baseline · ✅ DSR-654 21 TC) · upload queue pending 0 / fail 0 · TC backlog trống 21/10 20:07 · Jira check KHÔNG chạy được (Atlassian connector timeout) → lượt 21:05 thử lại · auto-added 0 · job agent đã xếp 0 lượt này (2 trong ngày: JOB-20261021-11 queue, -12 hold) · hold: CL-v0.1. **Night 22/10 cần thêm TD-654-02..08** (How-to trong TestData 654).

## 🐞 Bug < 80% – Dat chốt
| Nháp | Tiêu đề | % | Thiếu gì để ≥ 80% | Đề xuất |
|---|---|---|---|---|
| BUG-OVL-INACTIVE (DSR-587/586/654) | DSR CF 表示フラグ OFF: json2html trả **HTTP 200** + dòng `unavailable \| inactive`, block JS không có xử lý redirect → BL-OVL-1 yêu cầu redirect về list (JOB-20261021-06 bước 2) | 50% | Chưa quan sát end-to-end (chưa có CF OFF nào được Preview); redirect có thể nằm chỗ khác | Hỏi Martin (📣) + Night 22/10 seed TD-587-07 `qa587-inactive` (OFF → Preview/Publish) → agent kiểm 23/10 |
Đã xử lý 21/10: BUG-1/BUG-5 = data · BUG-2/NEW-1 = không phải bug · BUG-6 → DSR-660 · 016/023/024 chờ data tối 21/10 → JOB-20261021-05.

## ✅ Overlay 404 – xong nguyên nhân (21/10 15:40)
Dev fix auto-generate trang khi Publish DSR CF (từ 08:25 UTC 21/10) + data QA sai (tên node, movieId, r5→r6, 表示フラグ, thiếu rel-b). Quy tắc mới trong BL-OVL-1 "Update 2026-10-21". Sửa trong pack 21/10.

## 📣 Báo Martin
Đã gửi 21/10. Còn mở: /ja|en/library/video/search chưa publish (QA-PT publish tối 21/10) · overlay chỉ lên .live khi Publish DSR CF.
| URL | Triệu chứng | cause | Job | Evidence |
|---|---|---|---|---|
| /en/library/video/qa587-rel-a (khi isActive OFF được Preview) | json2html main trả 200 + marker `unavailable \| inactive`, không redirect list | none (quan sát code) | JOB-20261021-06 | results/JOB-20261021-06/raw/j2h_*.html |
| config.json, mọi trang 404 | last-modified vẫn 20/10 11:36Z → không thấy deploy cấu hình 404 ngày 21/10 (admin config 401) | none | JOB-20261021-06 | results/JOB-20261021-06/raw/public-config.json |
Tin gửi sẵn (Dat copy):
```
Hi Martin, thanks for the 21/10 merge. Two quick checks from our smoke run (DEV, read-only):
1) Overlay isActive OFF: json2html (main) renders an inactive id as HTTP 200 with a row "unavailable | inactive"; we found no redirect handler in video/product/catalog-detail JS. BL-OVL-1 expects a redirect to the list page. Is the redirect implemented somewhere else, or still to do?
2) 404 config deploy: public config.json and all 404 responses still show last-modified 20/10 11:36 UTC, and 404s return the site /404.html. Is that the expected result of today's deploy?
```
