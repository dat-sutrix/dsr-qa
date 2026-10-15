# YKK DSR – QA Dashboard

> Cập nhật: 2026-10-15 13:40 (UTC+7) · Lần kiểm tra kế tiếp: 17:10 · Sprint 12 (15/10–27/10) · Chi tiết từng US: [hub/us/](us/) · Bug: [BUGS.md](BUGS.md)

## 🔔 Dat cần làm (sắp theo hạn)
| # | Việc | Với ai | Hạn | US | Mở khóa | Nội dung gửi sẵn |
|---|---|---|---|---|---|---|
| 1 | Restart 2 runner trên VPS (nhận `runner.sh` mới) – **sau khi JOB-20261015-06 và -07 xong** (`jobs/running/` trống) | — | 15/10 trước 17:00 | — | Lane codex, JOB-20261015-05 | Lệnh trong session Điều phối 15/10 13:40 |
| 2 | Đuổi trả lời [DSR-611](https://sutrix.atlassian.net/browse/DSR-611) (4 câu, mặc định QA áp dụng 20/10) | Quentin (PM) | 17/10 | 557 | 5 TC | "Quentin-san, QA needs 4 answers in DSR-611 to unblock DSR-190 test cases; if no answer by 10/20 QA applies the defaults written in the ticket." |
| 3 | Đuổi trả lời DSR-457: Ngọc (comment 61011) + Quentin (comment 61015) | Ngoc, Quentin (PM) | 20/10 | 360 | DSR-457 | xem BUGS.md #2, #3 |

## 🌙 QA part-time đêm nay
Folder [`DSR_NightPack/`](https://drive.google.com/drive/folders/1QECbSzn_zdCUxyuqZrgRtxWkMuq2qnON) · Report: [DSR Night Report](https://docs.google.com/spreadsheets/d/1gkH5lblKS1T3zxSTItNhX31TU-b-mY71GIFRqjMpZoU). Pack đêm nay tự tạo lúc 17:10 (ưu tiên: 1) DSR-557: tạo page en catalog + ja video (copy) và seed CF `qa190-*` theo sheet How-to-create; 2) seed display name T2/T3 cho DSR-552; 3) DSR-457 phần còn thiếu). PDF mẫu: `qa190-catalog-sample.pdf` trong folder.

## 📋 Tổng quan US
| US | Tên | Trạng thái | DoD | DEV | STG | PRO | Blocker mở → ai mở khóa | Bug mở | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|---|
| [DSR-552](us/DSR-552.md) | Breadcrumb block | 🟡 | 2/9 | 9/35 ✅ · 7 ❌ · 19 ⛔ (ja 001/005/011/025 ✅ 15/10) | — | — | B3 HOME (top page chưa publish) · seed T2/T3 → QA-PT | 1 | Chốt DSR-591 (Agent · JOB-20261015-08 · 15/10) |
| [DSR-557](us/DSR-557.md) | 動画・カタログ表示 | 🟡 | 2/9 | 5/25 ✅ · 1 ❌ · 12 ⛔ | — | — | DSR-611 → Quentin · data qa190 → QA-PT | 0 | Rerun 006 (Agent · JOB-20261015-07) · seed data (QA-PT · đêm 15/10) |
| [DSR-566](us/DSR-566.md) | ニュース詳細 | 🔴 | 0/9 | — | — | — | Chưa phân tích (bản nhẹ 15/10 chỉ làm 557) | 0 | Phân tích (Claude · 16/10) |
| [DSR-529](us/DSR-529.md) | 記事詳細 | 🔴 | 0/9 | — | — | — | Chưa phân tích | 0 | Phân tích (Claude · 17/10) |
| DSR-360 (bug DSR-457) | Product Detail | 🟡 | — | xem BUGS | — | — | 2 quyết định PM → Quentin | 1 | QA-PT chạy nốt (15/10) |

Ký hiệu: DEV/STG/PRO = `pass/tổng` + số fail; `—` = chưa tới env đó.
Chưa theo dõi (ngoài phạm vi QA hôm nay): DSR-568 お問い合わせフォーム ([STG] Ready for deploy), DSR-609 Top Test ([Dev] In Testing), DSR-608/610/607 Test (To Do), DSR-538 bug movie-detail (To Do).

## 🤖 Agents
| Lane | Đang chạy | Hàng đợi | Xong 24h | Job lỗi |
|---|---|---|---|---|
| claude-code (functional) | — | 2 (JOB-20261015-06 P1, -07 P2) | 4 | 0 |
| codex (visual + Lighthouse) | — | 0 · hold: JOB-20261015-05 (chờ restart runner) | 0 | 1 (JOB-20261015-01 rc=2: cờ `--full-auto` không còn ở codex-cli mới → đã sửa runner.sh) |

## ✅ Close gần đây
- (chưa có)
