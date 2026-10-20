# YKK DSR – QA Dashboard

> 🗣 **Daily standup hôm nay: [STANDUP.md](STANDUP.md)** (tự cập nhật 08:19 T2–T6)

> Cập nhật: 2026-10-20 07:45 (UTC+7, [schedule] morning) · Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10** · Buffer ticket mới: 23, 26, 27/10 · Chi tiết: [PLAN](PLAN-sprint12.md) · [BUGS](BUGS.md) · [us/](us/)
> Lượt tự động 07:45 / 17:10 cập nhật file này. Giữ gọn: chỉ trạng thái hiện tại, lịch sử nằm trong git log và us/*.md.

## 1. Ticket đang giao Dat: 7 (Jira 20/10 07:45) – 566 + 653 tính là 1 việc
| Ticket | Trạng thái | Kế hoạch (khi nào) | Blocked / đang đợi ai | Done DEV đích |
|---|---|---|---|---|
| [DSR-552](https://sutrix.atlassian.net/browse/DSR-552) Breadcrumb | ✅ **35/35 đã chạy, Fail 0** – 014 ✅ (DSR-651) + 016 ✅ (DSR-648) 19/10 | **Đề xuất Done DEV hôm nay** (🔔 #1) | Không | 20/10 |
| [DSR-557](https://sutrix.atlassian.net/browse/DSR-557) 動画・カタログ | e-book ✅; 016/017 ✅ ja+en | 20/10 áp mặc định DSR-611 · merge overlay 20/10 xóa data video → QA-PT seed lại tối 20/10 → agent 21/10 | **Quentin** – DSR-611 (mặc định có hiệu lực 20/10) | 22/10 (rủi ro cao) |
| [DSR-570](https://sutrix.atlassian.net/browse/DSR-570) 資料DL | 16 test: 7 ✅ · 1 ❌ (lộ link PDF, chờ Quentin TC 007) · 6 ⛔ · 2 skip; catalogId đã sửa ✅ 19/10 | manual 6 TC tối 20/10 · catalog merge chiều 20/10 → seed lại tối 21/10 → rerun 22/10 | **Quentin** (TC 007) · form HubSpot (⛔ Ngọc) | 22/10 (rủi ro cao) |
| [DSR-529](https://sutrix.atlassian.net/browse/DSR-529) 記事詳細 | Trang test ✅ (stories ja+en, 02, r1–r3) · TD-529-01 ❌ ảnh article (nghi vấn, chưa bug) | **JOB-20261019-02 + -04 đang queue** → triage 17:10 20/10 · 21/10 retest | Không | 22/10 |
| [DSR-653](https://sutrix.atlassian.net/browse/DSR-653) + [DSR-566](https://sutrix.atlassian.net/browse/DSR-566) ニュース詳細 | 5/18 ✅ · 12 ⛔ (không có template `news-article`) | Có template → QA-PT seed tối đó → agent hôm sau | 566 trả về dev (Ngọc/Martin). Không có tới 21/10 → 653 sang Sprint 13 | 22/10 hoặc Sprint 13 |
| [DSR-590](https://sutrix.atlassian.net/browse/DSR-590) 環境配慮型製品 | C14 demo: 4 ✅ · 2 ❌ data (VIEW MORE/finder = link google.com tạm) · en/cn skip | **JOB-20261020-01** chụp lại styling (ảnh 19/10 không khớp số đo) → Claude trả lời Ngọc 17:10 | C15 chưa có trang (**Ngọc**) · Figma C15/SP (**Quentin**, Q36) | C14: 22/10 · C15: theo dev |

Bug Dat theo dõi: DSR-647 – **Martin 20/10: đã merge, retest được** → QA-PT seed lại qa501-* tối nay → JOB-20261019-03 sáng 21/10 · DSR-457 ✅ #1, #10 (đã comment); còn R1 (Ngọc), 61015 (Kohei, mặc định 20/10), #13 sau 587 · DSR-433: ✅ 1.0–3.0 (1.0 QA-PT ghi Fail = đọc nhầm expected → đề xuất Pass), ✅ 016/017; TC gửi mail ⛔ SendGrid.

> ⚠ **Hôm nay T3 20/10:** overlay đã merge (Martin) → data QA video/sản phẩm cũ biến mất (không phải bug). Catalog merge chiều nay. Agent chạy regression + visual diff sau merge (JOB-20261019-05/-06). QA-PT tối nay: seed lại video 557 + qa501-* (587/647) + manual 570 – xem PLAN "Merge overlay".

## 2. 🔔 Dat cần làm
| Ưu tiên | Việc | Với ai | Hạn | Nội dung gửi sẵn |
|---|---|---|---|---|
| P1 | **Chuyển Done DEV: DSR-552** – đóng DSR-648, DSR-651 (Done; comment retest Pass đã có: 61473, 61474) rồi chuyển DSR-552 + dán comment | Jira (tự làm) | 20/10 | "QA confirm DEV (2026-10-20): 35/35 TC executed on DEV. Fail 0. Bugs DSR-648, DSR-651 retested PASS and closed; DSR-591 Done. Blocked with owner: zh/cn – no /master/cn on DEV (Quentin); 021–023/030/034 – DSR-575 Q5 / DSR-536 (Kohei); 029 Lighthouse – STG next sprint; 033 – layout tickets. Evidence: Drive DSR_NightPack + repo results/DSR-552/DEV/." |
| P2 | Xác nhận với Martin catalog merge chiều nay + gửi đường dẫn folder catalog mới | Martin | 20/10 17:00 | "Martin, after the catalog overlay merge today, which DAM folder should QA use for catalog CFs (ja/en), and is the catalog list/detail URL unchanged? We re-seed test data tonight/tomorrow." |
| P2 | 21/10 17:00: nếu chưa có template `news-article` → gửi báo cáo tách 566 (Claude soạn sẵn) | Quentin | 21/10 | — |
| P3 | DSR-433 TC 017: hỏi Nakamoto | Nakamoto | 22/10 | "GET /bin/ykk/mail/test-send on DEV publish returns 403 JSON from the servlet itself. Should the dispatcher block this path on publish (STG/PRO) too?" |
| P3 | Gửi Nakamoto 3 địa chỉ nhận mail test – **hoãn** tới khi có SendGrid chính thức | Nakamoto | — | — |
| P3 | 22/10: duyệt Done DEV các ticket đạt (Claude đề xuất + soạn comment) | — | 22/10 | 557, 570, 529, 566 |

## 3. 🌙 QA part-time tối nay (T3 20/10, ~2h05) – 17:10 tạo Night Pack theo PLAN "Night Pack 20/10 – bắt buộc đưa vào"
Martin 20/10 06:44: merge xong, **một số CF test bị xóa khi dọn folder** → tạo lại bằng bộ **TD-587** (đúng folder mới), bỏ qa501-* / qa190-mv-*:
1. qa587-main en+ja (YouTube) – 557 + 587 (25') · 2. qa557-dam en+ja (video DAM) – 557 (20') · 3. qa587-r1…r6 + qa587-rel-a – bug DSR-647 thứ tự (35') · 4. qa587-off + qa587-rel-b – DSR-647 ẩn video (15') · 5. 570 manual 6 TC (30')
Catalog: chờ Martin merge chiều nay → tạo lại tối 21/10.

## 4. 🤖 Agents
| Lane | Hàng đợi (tự chạy, không cần ai) | Hold (07:45/17:10 tự chuyển) |
|---|---|---|
| claude-code | **JOB-20261019-02** (529 full) · **-05** (regression sau merge) · IDLE-17 (scaffold 583) | -03 (647 P2/P3, cần seed qa501 tối 20/10) · -16-08 (566, cần template) |
| codex | **JOB-20261019-04** (529 visual) · **-06** (visual diff sau merge) · **JOB-20261020-01** (590 chụp lại C14) · IDLE-18 (baseline sau merge) | -16-11 (566 visual) |
Kết quả 19/10 tối: JOB-20261019-07 ✅ 014 ja ×2 · -08 590 C14: 4 ✅ / 2 ❌ data / 13 skip · -09 590 styling: số đo khớp Figma nhưng ảnh không khớp số đo → chụp lại. Không job treo · upload queue fail 0.

## 5. TC (Jira sub-task `qa-tc`)
Backlog 17/17 xong · TC backlog trống (Night TC job 19/10 21:11: auto-added 0, upload pending 0 / fail 0) · 0 câu hỏi mới · việc kế: re-baseline 15 TC DSR-585 khi 項目fix版 review xong.
