# YKK DSR – Bug register

> Cập nhật: 2026-10-15 13:00 (UTC+7) · Nguồn sự thật: Jira (sutrix.atlassian.net, project DSR) · Claude cập nhật từ session `DSR – Bugs`

## 🔔 Việc cần làm về bug
| # | Bug | Việc | Ai | Với ai | Hạn |
|---|---|---|---|---|---|
| 1 | DSR-457 | Nhắc Ngọc trả lời comment 61011 (fix 3, 7, 13 · check 6 · cho biết field nào điều khiển icon NEW/UPDATE (R1)) | Dat | Ngoc | 16/10 |
| 2 | DSR-457 | Hỏi PM (Toan) 2 quyết định: (a) webp media11 → tách ticket hay bỏ; (b) catalog có cần form gate (`requiresForm`) không | Dat | Toan | 16/10 |
| 3 | DSR-457 | Regression item 1, 10 (QA-PT bỏ trống 2 lần) – Night Pack 15/10 | QA part-time | — | 16/10 sáng |
| 4 | DSR-591 | JOB-20261015-02 (requeue sau khi Dat publish `/master/en/test-space`) | Agent claude-code | — | 15/10 |
| 5 | DSR-592 | Tìm field trong Universal Editor (Properties panel, tab ページ基本) trên trang `dsr552-*`; báo Claude có/không | Dat | — | 15/10 |

## Bug đang mở
| Jira | US | Tiêu đề | Sev | Trạng thái Jira | Assignee | Retest ở | Kết quả retest gần nhất | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|
| [DSR-457](https://sutrix.atlassian.net/browse/DSR-457) | DSR-360 | Product Detail – Integrate issue (13 item) | Major | [Dev] In Testing | Hoang Minh Ngoc (giao lại 15/10) | DEV | 13/10 (QA-PT, có evidence): ✅ 2, 4, 5, 9, 11, 12, R2, R3, R4 · ❌ 3 (toolbar 5/6 icon), 7 (Youku: span play có trong DOM nhưng không hiện), 13 (link MOVIE = youtube.com/watch?v=movieid-01, STORY sai đích) · ❓ 6 (asset đã Published, ảnh vẫn vỡ → dev check), R1 (chưa biết field ngày) · ⚖️ 8 form gate (PM) · ⏳ 1, 10 | Ngoc trả lời comment 61011 · 16/10 |
| [DSR-591](https://sutrix.atlassian.net/browse/DSR-591) | DSR-552 | Breadcrumb skips published ancestors missing from query-index.json | Major | [Dev] In Testing | Dat Tran | DEV | 15/10 JOB-20261014-01 không kết luận (ancestor 404). Dat đã publish 15/10 | JOB-20261015-02 · 15/10 |
| [DSR-592](https://sutrix.atlassian.net/browse/DSR-592) | DSR-552 | Breadcrumb display name field (パンくず表示名) missing in page properties | Major | To Do (dev nói field đã có) | Dat Tran | DEV Author | Ảnh của dev: field nằm ở **Universal Editor → Properties → tab ページ基本 / Page** (trang list-catalog). Chưa thấy trên trang test | Dat kiểm theo hướng dẫn · 15/10 |

Sev: Critical / Major / Minor / Trivial. Retest ở: DEV / STG / PRO.

### Ghi chú chi tiết
- **DSR-457** – blocked ngoài code (không tính Fail): webp media11 (asset đã Published 13/10 nhưng vẫn vỡ → chờ dev; nếu không hỗ trợ được thì tách ticket PO), thumbnail Youku (không có API thumbnail → cần field mới), media09 .usdz (ẩn), catalog ≥2 (chờ trang catalog search), form gate catalog, CSP STG/PRO (DSR-516 mới có DEV). Câu hỏi spec mở: DSR-462. Close khi item 1–5, 7, 8, 10–13, R1–R4 PASS DEV + blocked đã tách ticket.
- **DSR-591** – TC liên quan: DSR-BREAD-002, 005, 011, 025 (cờ `[Bug-INDEX]`). Kiểm tra fix thật: `/master/en/test-space` và `/master/en/test-space/dsr552-label` phải **vẫn không có** trong `query-index.json` lúc retest; nếu dev đã re-publish để vào index thì retest không chứng minh được fix → cần trang ancestor mới chưa index.
- **DSR-592** – Nếu field chỉ có ở page mới (template mới) mà không có ở page cũ → vẫn là bug (≈1.200 page migrate). TC bị chặn: DSR-BREAD-010, 012, 013, 014, 015, 018 (+ 025 dùng data T2). 012/013 đang Fail, 010/014/015/018 đang Pending.

## Đã đóng (30 ngày gần nhất)
| Jira | US | Tiêu đề | Đóng ngày | Verified ở |
|---|---|---|---|---|
