# YKK DSR – QA Dashboard

> Cập nhật: 2026-10-15 12:20 (UTC+7) · Lần kiểm tra kế tiếp: 17:10 · Sprint 12 (15/10–27/10) · Chi tiết từng US: [hub/us/](us/) · Bug: [BUGS.md](BUGS.md)

## 🔔 Dat cần làm (sắp theo hạn)
| # | Việc | Với ai | Hạn | US | Mở khóa | Nội dung gửi sẵn |
|---|---|---|---|---|---|---|
| 1 | Share folder [`DSR_NightPack/`](https://drive.google.com/drive/folders/1QECbSzn_zdCUxyuqZrgRtxWkMuq2qnON) cho QA-PT (quyền Editor, để điền Night Report) | QA-PT | 15/10 trước 17:00 | tất cả | Night Pack 17:10 | Gửi QA-PT link folder + sheet [DSR Night Report](https://docs.google.com/spreadsheets/d/1gkH5lblKS1T3zxSTItNhX31TU-b-mY71GIFRqjMpZoU) |
| 2 | Duyệt phân tích 3 US mới (557, 566, 529) – "OK" hoặc "làm bản nhẹ" | Claude | 15/10 | 557, 566, 529 | B1 cả 3 | Trả lời trong session Điều phối |
| 3 | Forward kết quả Night Pack 14/10 của QA-PT (DSR-457 item 1/10/12/R1–R4, DSR-591, DSR-592) + ảnh item 3/7/13 | QA-PT → Claude | 15/10 | 360, 552 | DSR-457, B1 | Gửi nguyên file vào session `DSR – Bugs` |
| 4 | Publish `/master/en/test-space` (title `test-space`) trên DEV Author | — | 16/10 | 552 | B2 · 4 TC | — |
| 5 | Kiểm tra runner lane codex đang chạy trong tmux `dsr` (`tmux ls`; cửa sổ `codex`) + `@reboot` crontab | — | 16/10 | — | JOB-20261015-01 | `crontab -l \| grep reboot` |
| 6 | Hỏi PM 2 quyết định DSR-457 (webp media11; form gate catalog) | Quentin (PM) | 20/10 | 360 | DSR-457 | Đã comment Jira 61015 – chỉ cần đuổi trả lời |

## 🌙 QA part-time đêm nay
Folder [`DSR_NightPack/`](https://drive.google.com/drive/folders/1QECbSzn_zdCUxyuqZrgRtxWkMuq2qnON) · Report: [DSR Night Report](https://docs.google.com/spreadsheets/d/1gkH5lblKS1T3zxSTItNhX31TU-b-mY71GIFRqjMpZoU). Pack đêm nay tự tạo lúc 17:10 (ưu tiên: verify DSR-592/BREAD-013 + seed T2/T3, DSR-457 phần còn thiếu).

## 📋 Tổng quan US
| US | Tên | Trạng thái | DoD | DEV | STG | PRO | Blocker mở → ai mở khóa | Bug mở | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|---|
| [DSR-552](us/DSR-552.md) | Breadcrumb block | 🟡 | 2/9 | 9/35 ✅ · 7 ❌ · 19 ⛔ | — | — | B2 en test-space 404 → Dat · B1 field → QA-PT | 2 | Publish en/test-space (Dat · 16/10) |
| [DSR-557](us/DSR-557.md) | 動画・カタログ表示 | 🔴 | 0/9 | — | — | — | Chưa có TC → Dat duyệt | 0 | Duyệt phân tích (Dat · 15/10) |
| [DSR-566](us/DSR-566.md) | ニュース詳細 | 🔴 | 0/9 | — | — | — | Chưa có TC → Dat duyệt | 0 | Duyệt phân tích (Dat · 15/10) |
| [DSR-529](us/DSR-529.md) | 記事詳細 | 🔴 | 0/9 | — | — | — | Chưa có TC → Dat duyệt | 0 | Duyệt phân tích (Dat · 15/10) |
| DSR-360 (bug DSR-457) | Product Detail | 🟡 | — | xem BUGS | — | — | 2 quyết định PM → Quentin | 1 | QA-PT chạy nốt (15/10) |

Ký hiệu: DEV/STG/PRO = `pass/tổng` + số fail; `—` = chưa tới env đó.
Chưa theo dõi (ngoài phạm vi QA hôm nay): DSR-568 お問い合わせフォーム ([STG] Ready for deploy), DSR-609 Top Test ([Dev] In Testing), DSR-608/610/607 Test (To Do), DSR-538 bug movie-detail (To Do).

## 🤖 Agents
| Lane | Đang chạy | Hàng đợi | Xong 24h | Job lỗi |
|---|---|---|---|---|
| claude-code (functional) | — | 0 | 1 (JOB-20261014-01, 15/10 12:12) | 0 (2 lần rc=127 ngày 14/10 đã sửa) |
| codex (visual + Lighthouse) | ? chưa xác nhận | 1 (JOB-20261015-01) | 0 | — |

## ✅ Close gần đây
- (chưa có)
