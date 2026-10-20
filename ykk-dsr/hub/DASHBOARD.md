# YKK DSR – QA Dashboard

> 🗣 **Daily standup hôm nay: [STANDUP.md](STANDUP.md)** (tự cập nhật 08:19 T2–T6)

> Cập nhật: 2026-10-20 07:45 (UTC+7, [schedule] morning) · Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10** · Buffer ticket mới: 23, 26, 27/10 · Chi tiết: [PLAN](PLAN-sprint12.md) · [BUGS](BUGS.md) · [us/](us/)
> Lượt tự động 07:45 / 17:10 cập nhật file này. Giữ gọn: chỉ trạng thái hiện tại, lịch sử nằm trong git log và us/*.md.

## 1. Ticket đang giao Dat: 8 mở (Jira 20/10 09:15) – 566 + 653 tính là 1 việc · ✅ Done 20/10: DSR-552, DSR-648, DSR-651
| Ticket | Trạng thái | Kế hoạch (khi nào) | Blocked / đang đợi ai | Done DEV đích |
|---|---|---|---|---|
| [DSR-557](https://sutrix.atlassian.net/browse/DSR-557) 動画・カタログ | e-book ✅; 016/017 ✅ | video: seed tối 20/10 → agent 21/10 · catalog: **Martin merge catalog chiều 20/10** → seed lại tối 20–21/10 → agent 22/10 | Martin (catalog merge) · Quentin DSR-611 (mặc định) | 22/10 |
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
| P1 | **Chuyển Done DEV: DSR-552** – đóng DSR-648, DSR-651 (Done; comment retest Pass đã có: 61473, 61474) rồi chuyển DSR-552 + dán comment | Jira (tự làm) | 20/10 | "QA confirm DEV (2026-10-20): 35/35 TC executed on DEV. Fail 0. Bugs DSR-648, DSR-651 retested PASS and closed; DSR-591 Done. Blocked with owner: zh/cn – no /master/cn on DEV (Quentin); 021–023/030/034 – DSR-575 Q5 / DSR-536 (Kohei); 029 Lighthouse – STG next sprint; 033 – layout tickets. Evidence: Drive DSR_NightPack + repo results/DSR-552/DEV/." |
| ✅ | ~~Xác nhận catalog merge với Martin~~ – Martin 09:25: catalog ngoài scope, không đổi | — | — | — | — |
| P2 | 21/10 17:00: nếu chưa có template `news-article` → gửi báo cáo tách 566 (Claude soạn sẵn) | Quentin | 21/10 | — |
| P3 | DSR-433 TC 017: hỏi Nakamoto | Nakamoto | 22/10 | "GET /bin/ykk/mail/test-send on DEV publish returns 403 JSON from the servlet itself. Should the dispatcher block this path on publish (STG/PRO) too?" |
| P3 | Gửi Nakamoto 3 địa chỉ nhận mail test – **hoãn** tới khi có SendGrid chính thức | Nakamoto | — | — |
| P3 | 22/10: duyệt Done DEV các ticket đạt (Claude đề xuất + soạn comment) | — | 22/10 | 557, 570, 529, 566 |

## 3. 🌙 QA part-time tối nay (T3 20/10, ~4h) – 17:10 tạo Night Pack theo PLAN "Night Pack 20/10"
Mỗi content CF kèm 1 DSR CF cùng tên. Thứ tự: 1. qa587-main en+ja · 2. qa587-r1…r6 + rel-a (DSR-647) · 3. qa587-off + rel-b · 4. qa557-dam en+ja · 5. **catalog lõi 4 × ja/en – chỉ khi catalog đã merge** · 5b. sửa data 529 · 6. 570 manual · 7. (tùy chọn) TC phụ 587
**TD-586 dời sang tối 21/10** (product đang hỏng do đổi model).
Catalog: JOB-20261020-05 xong – chỉ en/qa190-cat-pdf-form có (chưa publish .live). Việc 5 tối nay = publish cái đó + tạo 7 cặp lõi (ja 4, en 3); 8 catalog NEW/UPDATE → 21/10. Product sau CR: JOB-07 không thấy regression (DEV).

## 4. 🤖 Agents
| Lane | Hàng đợi (tự chạy, không cần ai) | Hold (07:45/17:10 tự chuyển) |
|---|---|---|
| claude-code | **JOB-20261019-02** (529 full) · **-05** (regression sau merge) · IDLE-17 (scaffold 583) | -03 (647 P2/P3, cần seed qa501 tối 20/10) · -16-08 (566, cần template) |
| codex | **JOB-20261019-04** (529 visual) · **-06** (visual diff sau merge) · **JOB-20261020-01** (590 chụp lại C14) · IDLE-18 (baseline sau merge) | -16-11 (566 visual) |
Kết quả 19/10 tối: JOB-20261019-07 ✅ 014 ja ×2 · -08 590 C14: 4 ✅ / 2 ❌ data / 13 skip · -09 590 styling: số đo khớp Figma nhưng ảnh không khớp số đo → chụp lại. Không job treo · upload queue fail 0.

## 5. TC (Jira sub-task `qa-tc`)
Backlog 17/17 xong · TC backlog trống (Night TC job 19/10 21:11: auto-added 0, upload pending 0 / fail 0) · 0 câu hỏi mới · việc kế: re-baseline 15 TC DSR-585 khi 項目fix版 review xong.
