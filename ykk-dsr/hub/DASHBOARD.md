# YKK DSR – QA Dashboard

> 🗣 **Daily standup hôm nay: [STANDUP.md](STANDUP.md)** (tự cập nhật 08:19 T2–T6)

> Cập nhật: 2026-10-20 17:10 (UTC+7, [schedule] evening) · Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10** · Buffer ticket mới: 23, 26, 27/10 · Chi tiết: [PLAN](PLAN-sprint12.md) · [BUGS](BUGS.md) · [us/](us/)
> Lượt tự động 07:45 / 17:10 cập nhật file này. Giữ gọn: chỉ trạng thái hiện tại, lịch sử nằm trong git log và us/*.md.

## 1. Ticket đang giao Dat: 7 mở (Jira 20/10 17:10) – 566 + 653 tính là 1 việc · ✅ Done 20/10 (Jira xác nhận): DSR-552, DSR-648, DSR-651
| Ticket | Trạng thái | Kế hoạch (khi nào) | Blocked / đang đợi ai | Done DEV đích |
|---|---|---|---|---|
| [DSR-557](https://sutrix.atlassian.net/browse/DSR-557) 動画・カタログ | e-book ✅; 016/017 ✅ | video: seed tối 20/10 → agent 21/10 · catalog: merge ✅ 12:45 → seed lại tối 20–21/10 → agent 22/10 | Martin (catalog merge) · Quentin DSR-611 (mặc định) | 22/10 |
| [DSR-570](https://sutrix.atlassian.net/browse/DSR-570) 資料DL | 7 ✅ · 1 ❌ TC 007 · 6 ⛔ · 2 skip | manual 6 TC tối 20/10 · catalog seed lại sau merge → rerun list 22/10 (TC 007 = ⛔ Quentin) | Martin (catalog merge) · Quentin (TC 007) | 22/10 |
| [DSR-529](https://sutrix.atlassian.net/browse/DSR-529) 記事詳細 | JOB-02: 6 ✅ · 25 ❌ (phần lớn nghi product) · bug ảnh article (nháp, chờ Dat duyệt) | 17:10 20/10 triage + nháp bug · 21/10 retest | Martin (fix) | 22/10 |
| [DSR-653](https://sutrix.atlassian.net/browse/DSR-653) + [DSR-566](https://sutrix.atlassian.net/browse/DSR-566) ニュース詳細 | 5/18 ✅ · 12 ⛔ (không có template) | Có template → seed tối đó → agent hôm sau | Quentin trả 566 về dev. Không có tới 21/10 → Sprint 13 | 22/10 hoặc Sprint 13 |
| 🆕 [DSR-587](https://sutrix.atlassian.net/browse/DSR-587) 動画詳細 Overlay (giao Dat 20/10) | 19 TC sẵn, automation scaffold (IDLE-06) | positive: seed TD-587 tối 20/10 → JOB-20261020-02 21/10 · negative: tối 20–21/10 → agent 22/10 | Không | **22/10** |
| 🆕 [DSR-586](https://sutrix.atlassian.net/browse/DSR-586) 製品詳細 Overlay (giao Dat 20/10) | 19 TC sẵn, scaffold (IDLE-05); URL /products/ hay /product/ (JOB-05 kiểm) | Product data: Martin báo **đã sửa 13:50 JST** (incident DSR-585 CR, chỉ kiểm tĩnh) → JOB-20261020-07 xác minh trên DEV · TC/TD 586 re-baseline theo model mới (TC job tối nay) → TD-586 tối 21/10 → agent 22/10 | **Martin** (fix query/FE) · 項目fix版 (Quentin) | 22/10 (fallback 23/10) |
| 🆕 [DSR-647](https://sutrix.atlassian.net/browse/DSR-647) bug video liên quan (giao Dat retest) | Martin fix + merge 20/10 | seed qa587-r1…r6/off/rel-a/rel-b tối 20/10 → JOB-20261019-03 21/10 → đóng bug | Không | 21/10 |

Theo dõi (không giao Dat): DSR-590 環境配慮型製品 (C14 4 ✅ / 2 ❌ data; C15 chờ Ngọc) · DSR-457 (R1 Ngọc, 61015 Kohei – mặc định 20/10) · DSR-433 (TC gửi mail ⛔ SendGrid).

> ⚠ **T3 20/10:** overlay đã merge, Martin dọn folder → một số CF test bị xóa → tạo lại bằng TD-587 (PLAN "Night Pack 20/10"). **Product:** hỏng 12:12–13:50 JST do CR DSR-585 đổi model (−30/+9 field), Martin đã sửa – QA đang xác minh (JOB-20261020-07); field mới chưa hiển thị (chưa có design); catalog overlay đang được merge (Dat OK).

## 2. 🔔 Dat cần làm
| Ưu tiên | Việc | Với ai | Hạn | Nội dung gửi sẵn |
|---|---|---|---|---|
| P1 | **Hỏi Martin ver0.4 xong chưa** – JOB-09 thấy `dsr-product-page` đã đổi tên field + product-detail.js redeploy 15:33 (VN). Martin xác nhận xong → báo Claude/Điều phối chuyển JOB-20261020-08 (smoke product) vào queue; TD-586 tối 21/10 dựng theo ver0.4 | Martin | 20/10 tối / 21/10 sáng | "Hi Martin, is the DM_product ver0.4 update finished on DEV? We see dsr-product-page field names changed (howToUse/notice, applicableSliderSameAsParent) and product-detail.js redeployed at 08:33 UTC. Once you confirm, QA runs a product smoke and seeds TD-586 on ver0.4 tomorrow night." |
| P1 | **Gửi Martin tin 📣 bên dưới** (catalog sau merge + video/search 404 .live) | Martin | 21/10 sáng | xem mục 📣 |
| P2 | Không phản đối = áp dụng 21/10: **CATV-017 / CATDL-018 re-baseline theo DSR-655 Y3** (e-book requiresForm → trang `/{lang}/library/catalog/{id}` thay vì mở ebookUrl). [Giả định] Y3 là spec mới vì đã deploy theo trả lời DSR-655 | — | 21/10 07:45 | — |
| P2 | 21/10 17:00: nếu chưa có template `news-article` → gửi báo cáo tách 566 (Claude soạn sẵn) | Quentin | 21/10 | — |
| P3 | DSR-433 TC 017: hỏi Nakamoto | Nakamoto | 22/10 | "GET /bin/ykk/mail/test-send on DEV publish returns 403 JSON from the servlet itself. Should the dispatcher block this path on publish (STG/PRO) too?" |
| P3 | Gửi Nakamoto 3 địa chỉ nhận mail test – **hoãn** tới khi có SendGrid chính thức | Nakamoto | — | — |
| P3 | 22/10: duyệt Done DEV các ticket đạt (Claude đề xuất + soạn comment) | — | 22/10 | 557, 570, 529, 566, 587, 647 |
| ✅ | ~~Done DEV DSR-552 + đóng DSR-648/651~~ – Jira Done 20/10 | — | — | — |

## 3. 🌙 QA part-time tối nay (T3 20/10) – [Night Work Pack 2026-10-20](https://docs.google.com/document/d/1LwiInHvxOcMerK7pPAfp94H-zDNWvkiQfCrIuXm9MH4) · 18 dòng report · evidence [Evidence_20261020](https://drive.google.com/drive/folders/17DYGJmSghWE4QBL4PTLiCEKvfLO_CLeT)
Thứ tự (theo PLAN "Night Pack 20/10"): **0.** 529 BUGCHK (Title/Tags/Related, chụp trước sửa sau) · **1.** qa587-main en+ja · **2.** qa587-r1…r6 + rel-a (DSR-647) · **3.** qa587-off + rel-b · **4.** qa557-dam en+ja — mốc ~3h20 — **5.** catalog lõi 7 cặp + publish en pdf-form · **5b.** sửa data 529 · **6.** 570 manual 6 TC. Việc 7 bỏ. Mỗi content CF kèm 1 DSR CF cùng tên. Không đụng CF sản phẩm (TD-586 → tối 21/10, theo ver0.4).

## 4. 🤖 Agents
| Lane | Hàng đợi (tự chạy) | Hold (07:45/17:10 tự chuyển) |
|---|---|---|
| claude-code | (trống) | **-20-02** (557 video + 587 positives ← TD-587-01 + TD-557-DAM) · **-19-03** (647 P2/P3 ← TD-587-14/15) · **-20-04** (catalog 557/570 ← TD-190-CAT-NEW; merge đã xong) · 🆕 **-20-10** (529 full rerun ← BUGCHK-529-1 / TD-529-fix) · -20-03 (586 ← Night 21/10) · -20-08 (product smoke ← Martin xác nhận ver0.4) · -16-08 (566 ← template) |
| codex | (trống) | 🆕 **-20-11** (587 TC 19.0 visual ← TD-587-01 + 14) · -16-11 (566 visual ← template) |
Kết quả hôm nay: JOB-20261020-09 regression toàn bộ DEV: 345 test · 112 ✅ · 69 ❌ · 165 skip; 6 fail liên quan merge catalog (<80%, xem 📣), 63 fail trùng lần chạy trước (cause none); 0 job treo.

## 5. TC (Jira sub-task `qa-tc`)
Backlog 17/17 xong · TC backlog trống (Night TC job 19/10 21:11: auto-added 0, upload pending 0 / fail 0) · 0 câu hỏi mới · việc kế: re-baseline 15 TC DSR-585 khi 項目fix版 review xong.

## 🐞 Bug < 80% – Dat chốt (morning 07:45 điền theo BUG-RULES.md)
| Draft | Tiêu đề | % | Thiếu gì để ≥ 80% | Đề xuất |
|---|---|---|---|---|
| CAT-1 | [DSR-570] requiresForm PDF card → `/{lang}/library/catalog/qa190-cat-pdf-form` 404 on .live (CATDL-006 ja+en) | 50% | Data: CF chưa publish .live (JOB-05) → Night 20/10 Việc 5a publish | Không tạo; rerun JOB-20261020-04. Vẫn 404 sau publish → 85% tạo |
| CAT-2 | [DSR-557/570] e-book requiresForm card không mở ebookUrl, đi tới trang catalog (CATV-017, CATDL-018 ja+en) | 30% | Hành vi khớp DSR-655 Y3 → nhiều khả năng TC cũ | Không tạo; re-baseline TC (🔔 P2) |
| 529 BUG-1…6, PEND-529-01 | xem bugs/529-decision-20261021.md | 50–90% | Night 20/10 BUGCHK-529-* | 07:45 21/10 áp bảng quyết định |

## 📣 Báo Martin – merge/incident 20/10 (nguồn JOB-20261020-09, 09:31–09:49Z; agent đêm 20/10 → morning 21/10 bổ sung)
| URL | Triệu chứng | cause | Job đầu tiên | Evidence |
|---|---|---|---|---|
| .aem.live /{ja,en}/library/catalog/qa190-cat-pdf-form (từ list-catalog card) | 404 on .live (200 .page) – card requiresForm PDF dẫn tới đây | overlay-merge (catalog) | JOB-20261020-05 | results/JOB-20261020-09/evidence/DSR-CATDL-006_{ja,en}.png |
| list-catalog / catalog-video: card "QA190 e-book form" | href = /{lang}/library/catalog/qa190-cat-ebook-form (404 .live), không còn mở ebookUrl | overlay-merge (DSR-655 Y3) | JOB-20261020-05 | …/DSR-CATDL-018_{ja,en}.png, …/DSR-CATV-017_{ja,en}.png |
| publish GraphQL dsr-product-page | field đổi tên: howToUse/notice camelCase, applicableSliderSameAsParent; bỏ applicableSliderStandard/Special. product-detail.js + product.html redeploy 08:33:41Z | dm_product-ver0.4 | JOB-20261020-09 | results/JOB-20261020-09/raw.md#1 |
| .aem.live /{ja,en}/library/video/search | 404 on .live, 200 on .page (pass 01:36Z hôm nay, fail lại 09:3xZ) | none (theo dõi) | JOB-20261019 | results/JOB-20261020-09 |

Tin gửi Martin (copy):
> Hi Martin, QA regression on DEV after today's merges (20/10, 16:31–16:49 VN): (1) Catalog: `/{lang}/library/catalog/qa190-cat-pdf-form` is 200 on .aem.page but 404 on .aem.live – we will publish our test CFs tonight, just confirming no extra step is needed for .live. (2) E-book cards with requiresForm=true now go to `/library/catalog/<id>` instead of opening ebookUrl – we read this as DSR-655 Y3 and will update our TCs; tell us if that is not intended. (3) dsr-product-page field names changed (ver0.4) – please ping us when ver0.4 is finished so we can run a product smoke. (4) `/{lang}/library/video/search` is 404 on .aem.live but 200 on .aem.page – is the live publish of that page pending? Thanks!
