# YKK DSR – QA Dashboard

> Cập nhật: 2026-10-15 17:10 (UTC+7) · Lần kiểm tra kế tiếp: sáng 16/10 · Sprint 12 (15/10–27/10) · Chi tiết từng US: [hub/us/](us/) · Bug: [BUGS.md](BUGS.md)

## 🔔 Dat cần làm (sắp theo hạn)
| # | Việc | Với ai | Hạn | US | Mở khóa | Nội dung gửi sẵn |
|---|---|---|---|---|---|---|
| 7 | Upload TC DSR-560 adopt (131 KB) từ repo `hub/tc-out/[Sutrix] DSR -182- [AEM] 検索データ生成／検索連携用データ管理.xlsx` → [Drive DSR-182](https://drive.google.com/drive/folders/1KS_4dMiUINNRT8buwjITThqTl-UA1_Vm) | — | 16/10 | 560 | DoD TC file | — |
| 6 | Upload TC DSR-568 adopt (3.2 MB) từ repo `hub/tc-out/[Sutrix] DSR -199- [レイアウト] お問い合わせフォーム（form）.xlsx` → [Drive DSR-199](https://drive.google.com/drive/folders/1WBZuy01oskHK-Cz1oEA9_8l0vzYaNxIB) | — | 16/10 | 568 | DoD TC file | — |
| 5 | Upload TC DSR-609 adopt (128 KB) từ repo `hub/tc-out/[Sutrix] DSR -196- [レイアウト] トップ.xlsx` → [Drive DSR-196](https://drive.google.com/drive/folders/1NC_m_XPhuxewPyTyhj411uKW71lmq-vy) | — | 16/10 | 609 | DoD TC file | — |
| 4 | Upload TC DSR-529 (33 KB) từ repo `hub/tc-out/[Sutrix] DSR -356- [レイアウト] 記事詳細（article-detail）.xlsx` → [Drive DSR-356](https://drive.google.com/drive/folders/1Jpf4BmGJ97mPCauzQnds2m-fsn6CDAgB) | — | 16/10 | 529 | DoD TC file | — |
| 2 | Đuổi trả lời [DSR-611](https://sutrix.atlassian.net/browse/DSR-611) (4 câu, mặc định QA áp dụng 20/10) | Quentin (PM) | 17/10 | 557 | 5 TC | "Quentin-san, QA needs 4 answers in DSR-611 to unblock DSR-190 test cases; if no answer by 10/20 QA applies the defaults written in the ticket." |
| 3 | Đuổi trả lời DSR-457: Ngọc (comment 61011) + Quentin (comment 61015) | Ngoc, Quentin (PM) | 20/10 | 360 | DSR-457 | xem BUGS.md #2, #3 |

## 🌙 QA part-time đêm nay
**[Night Work Pack 2026-10-15 (v2)](https://docs.google.com/document/d/1TBlioRYuLYWxroJGw5hgnZxFSJ0mWzjY-0AWixr73lg)** (~3h55, v2 16:20 – bản cũ đã đổi tên [CŨ]) · P1 DSR-557 tạo 2 trang · **P1b DSR-501 seed 9 CF qa501-* + trang qa501-a/b** · P2 seed 14 CF `qa190-*` · P3 DSR-552 display name T2/T3 · P4 DSR-552 manual 016/013/012/026/024 · P5 DSR-457 #1, #10 · Report: [DSR Night Report](https://docs.google.com/spreadsheets/d/1gkH5lblKS1T3zxSTItNhX31TU-b-mY71GIFRqjMpZoU) · Evidence: `DSR_NightPack/Evidence_20261015`

## 🗂 Sub-task TC trong Jira (Sprint 12, label `qa-tc`, assignee Dat)
Night TC job 18:00–22:00 hằng ngày → [tc-backlog.md](tc-backlog.md) (17 ticket, đích sáng T2 19/10) · câu hỏi chờ duyệt: [tc-questions.md](tc-questions.md)
**Night TC job (15/10 19:40):** done 1/17 · upload-pending 4 (529, 609, 568, 560) · câu hỏi chờ duyệt 15 · job agent đã xếp 3 (JOB-12 hold, JOB-13, JOB-14)
19 sub-task · **94 SP** (1 SP = 1h) · Done 2 (DSR-612, DSR-617 = 10 SP) · To Do 17 (84 SP). Lọc: `project = DSR AND labels = qa-tc`. Mới tạo 15/10: DSR-617..633; dùng lại DSR-528 (メール送信連携).

## 🎯 Ưu tiên Sprint 12: 6 ticket In Testing → [PLAN-sprint12.md](PLAN-sprint12.md)
**Sprint 12 chỉ test DEV – xanh DEV = Done (STG/PRO ở sprint sau).** **Kế hoạch ASAP (15/10 16:30):** 591 ✅ · 501, 552, 557 → **16/10** · 566 → **17/10** · 529 → **19/10**. TC bị env chặn = ⛔ Blocked có owner, không chờ.

## 📋 Tổng quan US
| US | Tên | Trạng thái | DoD | DEV | STG | PRO | Blocker mở → ai mở khóa | Bug mở | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|---|
| [DSR-552](us/DSR-552.md) | Breadcrumb block | 🟡 | 2/9 | 9/35 ✅ · 7 ❌ · 19 ⛔ (ja 001/005/011/025 ✅ 15/10) | — | — | B3 HOME (top page chưa publish) · seed T2/T3 → QA-PT | 1 | Chốt DSR-591 (Agent · JOB-20261015-08 · 15/10) |
| [DSR-557](us/DSR-557.md) | 動画・カタログ表示 | 🟡 | 2/9 | 5/25 ✅ · 1 ❌ · 12 ⛔ | — | — | DSR-611 → Quentin · data qa190 → QA-PT | 0 | Rerun 006 (Agent · JOB-20261015-07) · seed data (QA-PT · đêm 15/10) |
| [DSR-566](us/DSR-566.md) | ニュース詳細 | 🟡 | 2/9 | 0/18 · 3 ⛔ (JOB-10 xong: 014/015 chờ so Figma + rerun 390px) | — | — | list /news/ chưa có (006/008) · cn | 0 | JOB-09 đang chạy (Agent · 15/10) · TD qa566 (QA-PT · 16/10) |
| [DSR-529](us/DSR-529.md) | 記事詳細 | 🟡 | 3/9 | 0/32 · 9 ⛔ | — | — | Chưa có trang test → QA-PT seed TD-529 · stories index → dev | 0 | Seed TD-529 (QA-PT · 16/10) → JOB-12 (Agent · 17/10) |
| [DSR-609](us/DSR-609.md) | トップ | 🟡 | 3/9 | 0/9 (dev tự ghi Pass 8) | — | — | Q10/Q11 → Quentin | 0 | JOB-13 + JOB-14 (Agent · 15/10 tối) |
| DSR-360 (bug DSR-457) | Product Detail | 🟡 | — | xem BUGS | — | — | 2 quyết định PM → Quentin | 1 | QA-PT chạy nốt (15/10) |

Ký hiệu: DEV = `pass/tổng` + số fail. STG/PRO = N/A (giai đoạn DEV only, 03 §0) – Jira status [STG]/PRO là workflow chung.
Chưa theo dõi (ngoài phạm vi QA hôm nay): DSR-568 お問い合わせフォーム ([STG] Ready for deploy), DSR-608/610/607 Test (To Do), DSR-538 bug movie-detail (To Do).

## 🤖 Agents
| Lane | Đang chạy | Hàng đợi | Xong 24h | Job lỗi |
|---|---|---|---|---|
| claude-code (functional) | JOB-09 (566, từ 16:12) | 0 + hold JOB-11 (501, chờ QA-PT seed đêm 15/10) | 7 (…-04, -06, -07, -08) | 0 |
| codex (visual + Lighthouse) | — | 0 | 2 (JOB-05, JOB-10) | 0 |

## ✅ Close gần đây
- (chưa có)
