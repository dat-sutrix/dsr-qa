# Jira sweep – kết quả lần gần nhất
last_sweep_utc: 2026-10-23T09:10:00Z

Lượt 16:05 VN (scheduled) · cửa sổ 2026-10-23T05:05Z → 09:10Z (JQL `updated >= "2026-10-23 14:05"` JST) · đọc 10 ticket cập nhật + 10 ticket giao Dat (không ticket nào của Dat đổi trong cửa sổ) + sprint scope 51 ticket (1 mới: DSR-675), bỏ lại 0.

## Mới phát hiện
| Ticket | Ai / khi nào | Loại | Nội dung | Đã cập nhật |
|---|---|---|---|---|
| DSR-606 | Quentin 17:52 JST | b | Q1 category = tag (không folder); Q4 lang = ja/en/cn ✅; Q2/Q3/Q7/Q9 → Martin+Kohei; Q5/Q6 Quentin kiểm; Q8 khách cập nhật sau. Assignee → Martin | KNOWN-FACTS · CLIENT-BLOCKERS CB-12 · SPRINT-SCOPE (assignee + facts) |
| DSR-670 | Kohei (bot) 17:25 JST | a | Deploy DEV `dev/2026.10.23_2` b33514f (08:25Z) – DM_techmovie_dsr | KNOWN-FACTS · regression/CHANGES · JOB-23-11 (hold, thêm commit) · FREEZE note · FORECAST · DASHBOARD |
| DSR-669 | Kohei (bot) 16:22 JST | a (đã biết) | Deploy a47274d – đã ghi lượt trước; **chưa có Martin "fixed"** → FREEZE giữ, JOB-23-11 vẫn hold | – |
| DSR-675 🆕 | Nakamoto tạo 15:54 JST → Martin | e | Product overlay: +8 field query `dsr-product-page`, 22 meta search-index trong `<head>`; detail không đổi. To Do, Sprint 12 | KNOWN-FACTS · SPRINT-SCOPE (dòng mới + gap G11) · CHANGES (pending) · FORECAST · DASHBOARD |
| DSR-614 | Kohei 16:19 JST | e/f | Memo: thiết kế Numata ghi `/jp/.../item/{ID}` + jp/ch, thực tế `/ja/library/video/{ID}` + ja/cn; path diff product thiếu `{lang}` – team đã biết lệch (Q-CL-1), Sprint 12 vẫn theo DEV | KNOWN-FACTS |
| DSR-578 | 石谷 16:06 JST | f | Category list hiện theo tag ✅; xin line-height/letter-spacing = normal (Martin) | KNOWN-FACTS · SPRINT-SCOPE |
| DSR-662 / 649 | 石谷 15:12 / 16:35 JST | f | 662 Done; 649 assignee → Martin | KNOWN-FACTS · SPRINT-SCOPE |
| DSR-667 / 666 | Dat 16:20 / 14:48 JST | f | Done (phía QA) – đã có | – |

## Câu hỏi / tin đã gạch
- CB-12 (DSR-606) Q4 mã ngôn ngữ – Quentin xác nhận ja/en/cn; Q2/Q3/Q9 không còn chờ khách (nội bộ Martin+Kohei).
- Không có câu hỏi soạn sẵn nào khác trong DASHBOARD/STANDUP/tc-questions trùng các trả lời này (Q39 DSR-227 vẫn mở).

## Dat cần làm
- Không có việc mới. (Giữ: khi Martin báo "fixed" migrate 669/670 trong chat → chuyển tin cho QA session để xóa FREEZE + chạy JOB-20261023-11.)

Jobs: không đổi (queue JOB-23-20; hold 11/18/19).
