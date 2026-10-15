# YKK DSR – Bug register

> Cập nhật: 2026-10-15 13:30 (UTC+7) · Nguồn sự thật: Jira (sutrix.atlassian.net, project DSR) · Claude cập nhật từ session `DSR – Bugs`

## 🔔 Việc cần làm về bug
| # | Bug | Việc | Ai | Với ai | Hạn |
|---|---|---|---|---|---|
| 1 | DSR-591 | JOB-20261015-08 (chặn query-index.json → trail còn đủ 5 item?) → pass thì Claude comment "QA confirm DEV" + close | Agent claude-code → Claude | — | 15/10 |
| 2 | DSR-457 | Nhắc Ngọc trả lời comment 61011 (fix 3, 7, 13 · check 6 · R1) | Dat | Ngoc | 16/10 |
| 3 | DSR-457 | Đuổi Quentin trả lời comment 61015 (webp, form gate catalog) – mặc định áp dụng nếu không trả lời trước 20/10 | Dat | Quentin (PM) | 20/10 |
| 4 | DSR-457 | Regression item 1, 10 – Night Pack 15/10 | QA part-time | — | 16/10 sáng |

## Bug đang mở
| Jira | US | Tiêu đề | Sev | Trạng thái Jira | Assignee | Retest ở | Kết quả retest gần nhất | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|
| [DSR-457](https://sutrix.atlassian.net/browse/DSR-457) | DSR-360 | Product Detail – Integrate issue (13 item) | Major | [Dev] In Testing | Hoang Minh Ngoc (giao lại 15/10) | DEV | 13/10 (QA-PT, có evidence): ✅ 2, 4, 5, 9, 11, 12, R2, R3, R4 · ❌ 3 (toolbar 5/6 icon), 7 (Youku: span play có trong DOM nhưng không hiện), 13 (link MOVIE = youtube.com/watch?v=movieid-01, STORY sai đích) · ❓ 6 (asset đã Published, ảnh vẫn vỡ → dev check), R1 (chưa biết field ngày) · ⚖️ 8 form gate (PM Quentin) · ⏳ 1, 10 | Ngoc trả lời 61011 · Quentin trả lời 61015 |
| [DSR-591](https://sutrix.atlassian.net/browse/DSR-591) | DSR-552 | Breadcrumb skips published ancestors missing from query-index.json | Major | [Dev] In Testing | Dat Tran | DEV | 15/10 JOB-20261015-06: ja + en PASS 8/8 (005, 011, 001, 025). Nhưng `/master/en/test-space` giờ đã có trong index → chưa chứng minh được fix; không tạo lại được trang published mà chưa index | JOB-20261015-08 kiểm tra ở mức code/network · 15/10 |

Sev: Critical / Major / Minor / Trivial. Retest ở: DEV / STG / PRO.

### Ghi chú chi tiết
- **DSR-457** – blocked ngoài code (không tính Fail): webp media11 (asset đã Published 13/10 nhưng vẫn vỡ → chờ dev; nếu không hỗ trợ được thì tách ticket PO), thumbnail Youku (không có API thumbnail → cần field mới), media09 .usdz (ẩn), catalog ≥2 (chờ trang catalog search), form gate catalog, CSP STG/PRO (DSR-516 mới có DEV). Câu hỏi spec mở: DSR-462. Close khi item 1–5, 7, 8, 10–13, R1–R4 PASS DEV + blocked đã tách ticket.
- **DSR-591** – TC liên quan: DSR-BREAD-002, 005, 011, 025 (cờ `[Bug-INDEX]`). Kiểm tra fix thật: `/master/en/test-space` và `/master/en/test-space/dsr552-label` phải **vẫn không có** trong `query-index.json` lúc retest; nếu dev đã re-publish để vào index thì retest không chứng minh được fix → cần trang ancestor mới chưa index.

## Đã đóng (30 ngày gần nhất)
| Jira | US | Tiêu đề | Đóng ngày | Verified ở |
|---|---|---|---|---|
| [DSR-613](https://sutrix.atlassian.net/browse/DSR-613) | DSR-552 | Question: HOME link /master/{lang} 404 | 2026-10-15 (Done – rút lại, không cần PM; HOME 404 = thiếu data top page) | — |
| [DSR-592](https://sutrix.atlassian.net/browse/DSR-592) | DSR-552 | Breadcrumb display name field missing | 2026-10-15 (Dismissed – not bug: field ở Universal Editor → Properties → ページ基本) | DEV Author (Dat) |
