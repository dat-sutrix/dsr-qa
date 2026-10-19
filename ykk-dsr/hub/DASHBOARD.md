# YKK DSR – QA Dashboard

> 🗣 **Daily standup hôm nay: [STANDUP.md](STANDUP.md)** (tự cập nhật 08:19 T2–T6)

> Cập nhật: 2026-10-19 17:10 (UTC+7, [schedule] evening) · Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10** · Buffer ticket mới: 23, 26, 27/10 · Chi tiết: [PLAN](PLAN-sprint12.md) · [BUGS](BUGS.md) · [us/](us/)
> Lượt tự động 07:45 / 17:10 cập nhật file này. Giữ gọn: chỉ trạng thái hiện tại, lịch sử nằm trong git log và us/*.md.

## 1. Ticket đang giao Dat: 6 (Jira 19/10) – 566 + 653 tính là 1 việc
| Ticket | Trạng thái | Kế hoạch (khi nào) | Blocked / đang đợi ai | Done DEV đích |
|---|---|---|---|---|
| [DSR-552](https://sutrix.atlassian.net/browse/DSR-552) Breadcrumb | 35/35 TC đã chạy; 2 bug Low **đều đã fix (In Testing)** | agent rerun 014 (**JOB-20261019-07, queue**) + QA-PT retest 016 tối nay → đề xuất Done 20/10 | Không (DSR-648, DSR-651 [Dev] In Testing 19/10) | 21/10 (22/10 chưa fix → Done kèm 2 bug Low) |
| [DSR-557](https://sutrix.atlassian.net/browse/DSR-557) 動画・カタログ | e-book ✅; **016/017 ✅ ja+en** (JOB-20261019-01, sửa phạm vi assertion) | 20/10 áp mặc định DSR-611 → QA confirm DEV | **Quentin** – DSR-611 (mặc định có hiệu lực 20/10, không chặn) | 22/10 (merge 20/10 xóa data video cũ → QA-PT seed lại tối 20/10) |
| [DSR-570](https://sutrix.atlassian.net/browse/DSR-570) 資料DL | 16 test: 7 ✅ · 1 ❌ (lộ link PDF) · 6 ⛔ · 2 skip; khách đang test | QA-PT sửa data tối 19/10 · manual 6 TC tối 20/10 · catalog merge chiều 20/10 → seed lại tối 21/10 → rerun 22/10 | **Quentin** – có ẩn PDF sau form không (TC 007) · form HubSpot chưa có (⛔ Ngọc) | 22/10 |
| [DSR-529](https://sutrix.atlassian.net/browse/DSR-529) 記事詳細 | 0/32, chưa có trang test | QA-PT tạo folder stories + trang tối 19/10 → agent 20/10 (JOB-20261019-02/04) → triage 21/10 | Không (Martin OK 11:29) | 22/10 |
| [DSR-653](https://sutrix.atlassian.net/browse/DSR-653) ニュース詳細 Test (mới 19/10) + [DSR-566](https://sutrix.atlassian.net/browse/DSR-566) Dev | 5/18 ✅ · 12 ⛔ | Có template → QA-PT seed tối hôm đó → agent hôm sau | Quentin 19/10: 566 = Dev, 653 = Test (link 566 blocks 653). Template `news-article` là việc của **DSR-566 → Quentin trả 566 về dev** (Ngọc/Martin). Không có tới 21/10 → 653 sang Sprint 13 | 22/10 hoặc Sprint 13 |

Bug Dat theo dõi (không giao Dat): DSR-647 video liên quan (đợi **Martin** re-preview) · DSR-457 product detail (đợi **Ngọc** R1, **Kohei** 2 quyết định PM – mặc định 20/10; #10 QA-PT tối nay) · DSR-433 mail: **SendGrid trial hết hạn 19/10** → TC gửi mail (4–14, 18–20) ⛔ chờ tài khoản chính thức (ticket riêng, Nakamoto/Quentin); làm được ngay: TC 1–3 (QA-PT), 16–17 (agent IDLE-13), 21–22 (review).

> ⚠ **Sáng T3 20/10 Martin merge overlay:** trang/danh sách sản phẩm & video trên DEV chỉ còn item trong folder mới, data QA cũ biến mất (không phải bug). **Catalog merge riêng chiều 20/10** (Martin) → 557 + 570 phần catalog cũng seed lại. Video test chỉ trên `/{lang}/library/video/{id}`. Agent tự chạy regression + visual diff sau merge; QA-PT seed lại tối 20/10 (video) và 21/10 (catalog). 557 + 570 Done 22/10 = rủi ro cao. Chi tiết: PLAN mục "Merge overlay".

## 2. 🔔 Dat cần làm
| Ưu tiên | Việc | Hạn | Mở khóa |
|---|---|---|---|
| P3 | Gửi Nakamoto 3 địa chỉ nhận mail test – **hoãn** tới khi có tài khoản SendGrid chính thức | — | DSR-433 TC 4–14 |
| P2 | Chuyển tiếp cho Claude câu trả lời đến qua chat (Quentin, Martin, Nakamoto, Ngọc); trả lời trên Jira thì 17:10 tự đọc | khi có | 566, 570, 647, 433 |
| P2 | 21/10 17:00: nếu chưa có template `news-article` → gửi báo cáo tách 566 (Claude soạn sẵn) | 21/10 | 566 |
| P3 | DSR-433 TC 017: hỏi Nakamoto – "GET /bin/ykk/mail/test-send on DEV publish returns 403 JSON from the servlet itself. Should the dispatcher block this path on publish (STG/PRO) too?" | 22/10 | 433-17 open point |
| P3 | 22/10: duyệt Done DEV các ticket đạt (Claude đề xuất + soạn comment) | 22/10 | 552, 557, 570, 529, 566 |

## 3. 🌙 QA part-time đêm nay (T2 19/10, ~2h05) – [Night Work Pack 2026-10-19](https://docs.google.com/document/d/1l_8fu_mTx-9j5W0_RHTrH4wqcs1pzbz2exwWf6es-c0) · evidence [Evidence_20261019](https://drive.google.com/drive/folders/1kjZdm9guLlKnrwMPxhXJsYtTFB6g50qM) · report 10 dòng
1. DSR-529 (70'): tạo `/master/{ja,en}/library/article/stories` + qa529-r1..r3 (ja+en), qa529-01 (ja+en), qa529-02 (ja) – template `article detail` → Page configuration chọn article
2. DSR-433 (20'): TC 1.0–3.0 (chỉ xem trên Author); TC 4.0 hoãn – SendGrid hết hạn
3. DSR-457 #10 (15')
4. DSR-570 (5'): bỏ 2 dấu cách cuối catalogId của `qa190-cat-ebook-form`, Publish
5. DSR-552 (10'): retest DSR-648 – TC 016 trên Universal Editor

## 4. 🤖 Agents
| Lane | Hàng đợi (tự chạy, không cần ai) | Hold (07:45 tự chuyển khi đủ điều kiện) |
|---|---|---|
| claude-code | **JOB-20261019-07** (552-014 retest, DSR-651 fixed) | 529 run (-02, -15-12; cần Night Report TD-529 Pass) · 647-P3 (-03) · 566 (-16-08) · regression sau merge overlay (-05) |
| codex | — | 529 visual (-04) · 566 visual (-16-11) · visual diff sau merge (-06) |
Kết quả 19/10: JOB-20261019-01 ✅ 5/5 (557 CATV-016/017, 647-P2) · IDLE-07 regression 82 pass / 32 fail – không fail mới là bug (fail = data/env/test hoặc trùng bug/câu hỏi đã mở) · IDLE-13 ✅ 433 016/017 · IDLE-10/11/12 scaffold 589/590/227 (trang chưa có → skip) · IDLE-16 visual: list-catalog diff 23% (data), product-detail capture timeout.

## 5. TC (Jira sub-task `qa-tc`)
Backlog 17/17 xong · DSR-531/567 Done 19/10 · việc kế: re-baseline 15 TC DSR-585 khi 項目fix版 review xong (Quentin 19/10).
