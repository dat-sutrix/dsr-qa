# YKK DSR – Bug register

> Cập nhật: 2026-10-15 12:40 (UTC+7) · Nguồn sự thật: Jira (sutrix.atlassian.net, project DSR) · Claude cập nhật từ session `DSR – Bugs`

## 🔔 Việc cần làm về bug
| # | Bug | Việc | Ai | Với ai | Hạn |
|---|---|---|---|---|---|
| 1 | DSR-457 | Gửi Claude evidence của item 3, 7, 13 (ảnh `DSR-457_3/7/13_*.png`) để soạn comment trả dev | Dat | QA part-time | 15/10 |
| 2 | DSR-457 | Hỏi PM (Toan) 2 quyết định: (a) webp media11 → tách ticket hay bỏ; (b) catalog có cần form gate (`requiresForm`) không | Dat | Toan | 16/10 |
| 3 | DSR-457 | Retest phần còn thiếu: item 1, 10, 12, R1–R4 (+ chi tiết 3, 7, 13) – Night Pack 14/10 | QA part-time | — | 15/10 sáng |
| 4 | DSR-591 | Publish `/master/en/test-space` trên DEV Author rồi Claude requeue retest (JOB-20261014-01 chưa kết luận được) | Dat → Agent claude-code | — | 16/10 |
| 5 | DSR-592 | Verify field trên Author (BREAD-013), seed display name T2 + T3, chạy BREAD-012 – Night Pack 14/10 | QA part-time | — | 15/10 |

## Bug đang mở
| Jira | US | Tiêu đề | Sev | Trạng thái Jira | Assignee | Retest ở | Kết quả retest gần nhất | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|
| [DSR-457](https://sutrix.atlassian.net/browse/DSR-457) | DSR-360 | Product Detail – Integrate issue (13 item) | Major | [Dev] In Testing | Dat Tran | DEV | 13/10 (QA-PT): ✅ 2, 4, 5, 9, 11 · ❌ 3 (toolbar thiếu 1 icon), 7 (Youku thiếu icon play), 13 · ⚖️ 6 webp, 8 catalog mở thẳng PDF (chờ PO/PM) · ⏳ 1, 10, 12, R1–R4 chưa chạy | QA-PT chạy nốt (15/10) → Claude comment trả Ngoc item 3, 7, 13 |
| [DSR-591](https://sutrix.atlassian.net/browse/DSR-591) | DSR-552 | Breadcrumb skips published ancestors missing from query-index.json | Major | [Dev] In Testing | Dat Tran | DEV | 15/10 JOB-20261014-01: ja PASS; en vẫn thiếu test-space nhưng `/master/en/test-space` 404 (chưa publish) → chưa chứng minh fix | Dat publish page · 16/10 → requeue |
| [DSR-592](https://sutrix.atlassian.net/browse/DSR-592) | DSR-552 | Breadcrumb display name field (パンくず表示名) missing in page properties | Major | To Do (dev nói field đã có) | Dat Tran | DEV Author | 13/10 Martin: field đã tồn tại (ảnh), chưa retest | QA-PT verify BREAD-013 + seed T2/T3 · 15/10 → agent 010/015/018/025, visual 014 |

Sev: Critical / Major / Minor / Trivial. Retest ở: DEV / STG / PRO.

### Ghi chú chi tiết
- **DSR-457** – blocked ngoài code (không tính Fail): webp media11 (asset chưa publish + DM không hỗ trợ theo dev), thumbnail Youku (không có API thumbnail → cần field mới), media09 .usdz (ẩn), catalog ≥2 (chờ trang catalog search), form gate catalog, CSP STG/PRO (DSR-516 mới có DEV). Câu hỏi spec mở: DSR-462. Close khi item 1–5, 7, 8, 10–13, R1–R4 PASS DEV + blocked đã tách ticket.
- **DSR-591** – TC liên quan: DSR-BREAD-002, 005, 011, 025 (cờ `[Bug-INDEX]`). Kiểm tra fix thật: `/master/en/test-space` và `/master/en/test-space/dsr552-label` phải **vẫn không có** trong `query-index.json` lúc retest; nếu dev đã re-publish để vào index thì retest không chứng minh được fix → cần trang ancestor mới chưa index.
- **DSR-592** – TC bị chặn: DSR-BREAD-010, 012, 013, 014, 015, 018 (+ 025 dùng data T2). 012/013 đang Fail, 010/014/015/018 đang Pending.

## Đã đóng (30 ngày gần nhất)
| Jira | US | Tiêu đề | Đóng ngày | Verified ở |
|---|---|---|---|---|
