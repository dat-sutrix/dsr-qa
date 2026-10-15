# YKK DSR – QA Dashboard

> Cập nhật: 2026-10-15 13:30 (UTC+7) · Lần kiểm tra kế tiếp: 17:10 · Sprint 12 (15/10–27/10) · Chi tiết từng US: [hub/us/](us/) · Bug: [BUGS.md](BUGS.md)

## 🔔 Dat cần làm (sắp theo hạn)
| # | Việc | Với ai | Hạn | US | Mở khóa | Nội dung gửi sẵn |
|---|---|---|---|---|---|---|
| 1 | Publish lại `/master/en/test-space` trên DEV: Universal Editor → **Publish** (không phải Preview). Kiểm: mở link `.aem.live` thấy trang thật | — | 15/10 trước 17:00 | 552 | B2 · 4 TC en | https://main--dsr-eds-dev--sutrix-projects.aem.live/master/en/test-space – báo "đã thấy trang" |
| 2 | Restart 2 runner trên VPS để nhận `runner.sh` mới (cờ codex đã sửa + log agent) | — | 15/10 trước 17:00 | — | Lane codex, JOB-20261015-05 | Khi `jobs/running/` trống: `tmux kill-window -t dsr:codex; tmux kill-window -t dsr:claude-code` → `git -C ~/dsr-qa pull; git -C ~/dsr-qa-codex pull` → chạy lại 2 lệnh `tmux new-window` ở đầu runner.sh. Báo "restart xong" |
| 3 | Upload 2 file DSR-190 (TC bản QA + TestData) vào folder [DSR -190-](https://drive.google.com/drive/folders/1zUweyze9gu8OHBh_9mYe39qcPIeg5dSi) | — | 15/10 trước 17:00 | 557 | Night Pack seed CF | File trong chat 15/10 13:30 |
| 4 | Đuổi trả lời [DSR-611](https://sutrix.atlassian.net/browse/DSR-611) (4 câu, mặc định QA áp dụng 20/10) | Toan | 17/10 | 557 | 5 TC | "Anh Toan, QA cần 4 câu trả lời ở DSR-611 để mở 4 TC của DSR-190; nếu chưa có thì 20/10 QA áp dụng mặc định ghi trong ticket." |
| 5 | Đuổi Quentin trả lời DSR-457 comment 61015 + [DSR-613](https://sutrix.atlassian.net/browse/DSR-613) | Quentin (PM) | 20/10 | 360, 552 | DSR-457, B3 | xem BUGS.md #3, #4 |

## 🌙 QA part-time đêm nay
Folder [`DSR_NightPack/`](https://drive.google.com/drive/folders/1QECbSzn_zdCUxyuqZrgRtxWkMuq2qnON) · Report: [DSR Night Report](https://docs.google.com/spreadsheets/d/1gkH5lblKS1T3zxSTItNhX31TU-b-mY71GIFRqjMpZoU). Pack đêm nay tự tạo lúc 17:10 (ưu tiên: 1) seed CF `qa190-*` cho DSR-557 theo sheet How-to-create; 2) seed display name T2/T3 cho DSR-552; 3) DSR-457 phần còn thiếu). PDF mẫu: `qa190-catalog-sample.pdf` trong folder.

## 📋 Tổng quan US
| US | Tên | Trạng thái | DoD | DEV | STG | PRO | Blocker mở → ai mở khóa | Bug mở | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|---|
| [DSR-552](us/DSR-552.md) | Breadcrumb block | 🟡 | 2/9 | 9/35 ✅ · 7 ❌ · 19 ⛔ (ja 001/005/011/025 ✅ 15/10) | — | — | B2 en/test-space 404 → Dat · B3 HOME → Quentin | 1 | Publish lại en/test-space (Dat · 15/10) → requeue retest |
| [DSR-557](us/DSR-557.md) | 動画・カタログ表示 | 🟡 | 2/9 | 0/25 · 8 ⛔ | — | — | DSR-611 → Toan · trang dùng → dev | 0 | Discovery + Auto (Agent · JOB-20261015-04 · 16/10) |
| [DSR-566](us/DSR-566.md) | ニュース詳細 | 🔴 | 0/9 | — | — | — | Chưa phân tích (bản nhẹ 15/10 chỉ làm 557) | 0 | Phân tích (Claude · 16/10) |
| [DSR-529](us/DSR-529.md) | 記事詳細 | 🔴 | 0/9 | — | — | — | Chưa phân tích | 0 | Phân tích (Claude · 17/10) |
| DSR-360 (bug DSR-457) | Product Detail | 🟡 | — | xem BUGS | — | — | 2 quyết định PM → Quentin | 1 | QA-PT chạy nốt (15/10) |

Ký hiệu: DEV/STG/PRO = `pass/tổng` + số fail; `—` = chưa tới env đó.
Chưa theo dõi (ngoài phạm vi QA hôm nay): DSR-568 お問い合わせフォーム ([STG] Ready for deploy), DSR-609 Top Test ([Dev] In Testing), DSR-608/610/607 Test (To Do), DSR-538 bug movie-detail (To Do).

## 🤖 Agents
| Lane | Đang chạy | Hàng đợi | Xong 24h | Job lỗi |
|---|---|---|---|---|
| claude-code (functional) | — | 1 (JOB-20261015-04 P2) | 3 (JOB-20261014-01, 20261015-02, -03) | 0 |
| codex (visual + Lighthouse) | — | 0 · hold: JOB-20261015-05 (chờ restart runner) | 0 | 1 (JOB-20261015-01 rc=2: cờ `--full-auto` không còn ở codex-cli mới → đã sửa runner.sh) |

## ✅ Close gần đây
- (chưa có)
