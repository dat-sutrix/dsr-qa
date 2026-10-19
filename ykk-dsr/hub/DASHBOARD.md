# YKK DSR – QA Dashboard

> 🗣 **Daily standup hôm nay: [STANDUP.md](STANDUP.md)** (tự cập nhật 08:19 T2–T6)

> Cập nhật: 2026-10-19 12:00 (UTC+7) · Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10** · Buffer ticket mới: 23, 26, 27/10 · Chi tiết: [PLAN](PLAN-sprint12.md) · [BUGS](BUGS.md) · [us/](us/)
> Lượt tự động 07:45 / 17:10 cập nhật file này. Giữ gọn: chỉ trạng thái hiện tại, lịch sử nằm trong git log và us/*.md.

## 1. Ticket đang giao Dat: 6 (Jira 19/10) – 566 + 653 tính là 1 việc
| Ticket | Trạng thái | Kế hoạch (khi nào) | Blocked / đang đợi ai | Done DEV đích |
|---|---|---|---|---|
| [DSR-552](https://sutrix.atlassian.net/browse/DSR-552) Breadcrumb | 35/35 TC đã chạy; còn 2 bug Low | Martin fix → agent rerun 014 (JOB-20261019-03) + QA-PT retest 016 → Done | DSR-648 ✅ fixed 19/10 → QA-PT retest 016 tối nay · DSR-651 **Martin** đang fix | 21/10 (22/10 chưa fix → Done kèm 2 bug Low) |
| [DSR-557](https://sutrix.atlassian.net/browse/DSR-557) 動画・カタログ | e-book ✅ phía DSR; 016/017 lỗi do test → sửa (JOB-20261019-01, đang chạy hôm nay) | 20/10 áp mặc định DSR-611 → QA confirm DEV | **Quentin** – DSR-611 (mặc định có hiệu lực 20/10, không chặn) | 21/10 |
| [DSR-570](https://sutrix.atlassian.net/browse/DSR-570) 資料DL | 16 test: 7 ✅ · 1 ❌ (lộ link PDF) · 6 ⛔ · 2 skip; khách đang test | QA-PT sửa data tối 19/10 · rerun + manual 6 TC 20/10 | **Quentin** – có ẩn PDF sau form không (TC 007) · form HubSpot chưa có (⛔ Ngọc) | 22/10 |
| [DSR-529](https://sutrix.atlassian.net/browse/DSR-529) 記事詳細 | 0/32, chưa có trang test | QA-PT tạo folder stories + trang tối 19/10 → agent 20/10 (JOB-20261019-02/04) → triage 21/10 | Không (Martin OK 11:29) | 22/10 |
| [DSR-653](https://sutrix.atlassian.net/browse/DSR-653) ニュース詳細 Test (mới 19/10) + [DSR-566](https://sutrix.atlassian.net/browse/DSR-566) Dev | 5/18 ✅ · 12 ⛔ | Có template → QA-PT seed tối hôm đó → agent hôm sau | Quentin 19/10: 566 = Dev, 653 = Test (link 566 blocks 653). Template `news-article` là việc của **DSR-566 → Quentin trả 566 về dev** (Ngọc/Martin). Không có tới 21/10 → 653 sang Sprint 13 | 22/10 hoặc Sprint 13 |

Bug Dat theo dõi (không giao Dat): DSR-647 video liên quan (đợi **Martin** re-preview) · DSR-457 product detail (đợi **Ngọc** R1, **Kohei** 2 quyết định PM – mặc định 20/10; #10 QA-PT tối nay) · DSR-433 mail: **SendGrid trial hết hạn 19/10** → TC gửi mail (4–14, 18–20) ⛔ chờ tài khoản chính thức (ticket riêng, Nakamoto/Quentin); làm được ngay: TC 1–3 (QA-PT), 16–17 (agent IDLE-13), 21–22 (review).

## 2. 🔔 Dat cần làm
| Ưu tiên | Việc | Hạn | Mở khóa |
|---|---|---|---|
| P3 | Gửi Nakamoto 3 địa chỉ nhận mail test – **hoãn** tới khi có tài khoản SendGrid chính thức | — | DSR-433 TC 4–14 |
| P2 | Chuyển tiếp cho Claude câu trả lời đến qua chat (Quentin, Martin, Nakamoto, Ngọc); trả lời trên Jira thì 17:10 tự đọc | khi có | 566, 570, 647, 433 |
| P2 | 21/10 17:00: nếu chưa có template `news-article` → gửi báo cáo tách 566 (Claude soạn sẵn) | 21/10 | 566 |
| P3 | 22/10: duyệt Done DEV các ticket đạt (Claude đề xuất + soạn comment) | 22/10 | 552, 557, 570, 529, 566 |

## 3. 🌙 QA part-time đêm nay (T2 19/10, ~2h) – Night Pack do 17:10 tạo
1. DSR-529 (70'): tạo `/master/{ja,en}/library/article/stories` + trang qa529-01/02/r1–r3 (template `article detail`, giá trị theo TestData DSR-356)
2. DSR-433 (20'): TC 1.0–3.0 (xem trên Author); TC 4.0 hoãn – SendGrid hết hạn
3. DSR-457 #10 (15')
4. DSR-570 (5'): bỏ 2 dấu cách cuối catalogId của `qa190-cat-ebook-form`, Publish
5. DSR-552 (10'): retest DSR-648 – TC 016 trên Universal Editor (Martin fixed 19/10)

## 4. 🤖 Agents
| Lane | Đang chạy / hàng đợi (tự chạy, không cần ai) | Hold (07:45 tự chuyển khi đủ điều kiện) |
|---|---|---|
| claude-code | IDLE-07 regression → JOB-20261019-01 (557 + 647 sửa test) → IDLE-10/11/12/13 (589, 590, 227, 433 GET) | 529 run (-02, -15-12) · 552-014 / 647-P3 (-03) · 566 (-16-08) |
| codex | IDLE-16 visual diff toàn bộ trang DEV | 529 visual (-04) · 566 visual (-16-11) |
Lane claude-code chạy lại 19/10 11:12 (kẹt rebase 16/10 → runner nay tự gỡ). Upload Drive 14 file: tự chạy cùng lane.

## 5. TC (Jira sub-task `qa-tc`)
Backlog 17/17 xong · DSR-531/567 Done 19/10 · việc kế: re-baseline 15 TC DSR-585 khi 項目fix版 review xong (Quentin 19/10).
