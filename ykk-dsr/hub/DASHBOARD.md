# YKK DSR – QA Dashboard

> Cập nhật: 2026-10-16 17:15 (UTC+7, [schedule] evening) · Lần kiểm tra kế tiếp: sáng 17/10 07:45 · Sprint 12 (15/10–27/10) · Chi tiết từng US: [hub/us/](us/) · Bug: [BUGS.md](BUGS.md)

## 🔔 Dat cần làm (sắp theo hạn)
| # | Việc | Với ai | Hạn | US | Mở khóa | Nội dung gửi sẵn |
|---|---|---|---|---|---|---|
| 2 | Đuổi trả lời [DSR-611](https://sutrix.atlassian.net/browse/DSR-611) (4 câu, Jira vẫn To Do, mặc định QA áp dụng 20/10) | Quentin (PM) | 17/10 | 557 | 5 TC | "Quentin-san, QA needs 4 answers in DSR-611 to unblock DSR-190 test cases; if no answer by 10/20 QA applies the defaults written in the ticket." |
| 3 | Đuổi trả lời DSR-457: Ngọc (comment 61011) + Quentin (comment 61015). Jira 16/10: assignee DSR-457 = Quentin | Ngoc, Quentin (PM) | 20/10 | 360 | DSR-457 | xem BUGS.md #1, #2 |

## 🌙 QA part-time đêm nay
**[Night Work Pack 2026-10-16 (v2)](https://docs.google.com/document/d/1PnPq3ejwpM3PJ6VR5ioQ4m1V0q9oWPdeOphoS3RSXT0)** (~2h55, 6 việc, 15 dòng report) · Evidence: `DSR_NightPack/Evidence_20261016` · QA-PT nghỉ T7/CN, pack kế tiếp T2 19/10
Đêm 15/10 (đã triage sáng 16/10): [Night Work Pack 2026-10-15 (v2)](https://docs.google.com/document/d/1TBlioRYuLYWxroJGw5hgnZxFSJ0mWzjY-0AWixr73lg).

## 🗂 Sub-task TC trong Jira (Sprint 12, label `qa-tc`, assignee Dat)
Night TC job 18:00–22:00 hằng ngày → [tc-backlog.md](tc-backlog.md) (17 ticket, đích sáng T2 19/10) · câu hỏi chờ duyệt: [tc-questions.md](tc-questions.md)
**Sáng 16/10:** done 1/17 · upload-pending 8 · todo 8 (đêm 17–18/10) · câu hỏi chưa quyết định **22**. **Night TC job (15/10 21:30):** done 1/17 · upload-pending 8 (529, 609, 568, 560, 608, 610, 503, 583) · câu hỏi chờ duyệt 22 · job agent đã xếp 3 (JOB-12 hold, JOB-13, JOB-14) · 🔔 Dat upload 8 TC xlsx từ tc-out/ (503, 583 vào folder mới tạo) · còn 8 ticket / 48 SP
19 sub-task · **94 SP** (1 SP = 1h) · Done 2 (DSR-612, DSR-617 = 10 SP) · To Do 17 (84 SP). Lọc: `project = DSR AND labels = qa-tc`. Mới tạo 15/10: DSR-617..633; dùng lại DSR-528 (メール送信連携).

## 🎯 Ưu tiên Sprint 12: 6 ticket In Testing → [PLAN-sprint12.md](PLAN-sprint12.md)
**Sprint 12 chỉ test DEV – xanh DEV = Done (STG/PRO ở sprint sau).** **Kế hoạch ASAP (15/10 16:30):** 591 ✅ · 501 ✅ 16/10 · 552, 557 → **17/10** · 566 → **17/10** · 529 → **19/10**. TC bị env chặn = ⛔ Blocked có owner, không chờ.

## 📋 Tổng quan US
| US | Tên | Trạng thái | DoD | DEV | STG | PRO | Blocker mở → ai mở khóa | Bug mở | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|---|
| [DSR-552](us/DSR-552.md) | Breadcrumb block | 🟡 | 2/9 | 12/35 ✅ · 8 ❌ · 15 ⛔ (night 15/10: 012/013/024 ✅, 016 ❌ bug UE preview, 026 làm lại) | — | — | B3 HOME (top page chưa lên .aem.live) · bug DSR-648 (UE preview) → dev | 1 (DSR-648) | 026 làm lại (QA-PT · đêm 16/10) · B3 top page (dev · 17/10) · close-out JOB-07 ✅ 0 fail |
| [DSR-557](us/DSR-557.md) | 動画・カタログ表示 | 🟡 | 2/9 | 8/25 ✅ · 0 ❌ · 10 ⛔ (JOB-06/07 15/10) | — | — | DSR-611 → Quentin · e-book ebookUrl sai + TD-190-03/04 thiếu Release date → QA-PT | 0 | DEV 8/25 ✅ 0 ❌ · e-book + TD-190-03/04 (QA-PT · đêm 16/10) → JOB-10 hold |
| [DSR-566](us/DSR-566.md) | ニュース詳細 | 🟡 | 2/9 | 5/18 ✅ · 6 ❌ nghi data · 3 ⛔ | — | — | JOB-09 xong (6 fail nghi data → rerun TD-566) · list /news/ chưa có · cn | 0 | TD qa566 + 017 (QA-PT · đêm 16/10) → JOB-08/11 hold (17/10) |
| [DSR-529](us/DSR-529.md) | 記事詳細 | 🟡 | 3/9 | 0/32 · 9 ⛔ | — | — | Chưa có trang test → QA-PT seed TD-529 · stories index → dev | 0 | Seed TD-529 ja (QA-PT · đêm 16/10) → JOB-12 hold (17/10) |
| [DSR-609](us/DSR-609.md) | トップ | 🟡 | 3/9 | 0/9 (JOB-14: 001 đã chụp chờ so Figma · PSI desktop 94 / mobile 87 trên .aem.page) | — | — | Q10/Q11 → Quentin · top page 404 trên .aem.live → dev | 0 | JOB-13 chờ lane (Agent) · so Figma 001 (Claude · 17/10) |
| DSR-360 (bug DSR-457) | Product Detail | 🟡 | — | xem BUGS | — | — | 2 quyết định PM → Quentin | 1 | QA-PT item 1, 10 (Night Pack 16/10 việc 5) |
| DSR-587 (bug DSR-647, từ 501) | Video detail overlay | 🟡 | — | DSR-647 [Dev] In Testing 16/10 | — | — | — | 1 | 更新日 rel (QA-PT · đêm 16/10) → JOB-09 hold (17/10) |

Ký hiệu: DEV = `pass/tổng` + số fail. STG/PRO = N/A (giai đoạn DEV only, 03 §0) – Jira status [STG]/PRO là workflow chung.
Chưa theo dõi (ngoài phạm vi QA hôm nay): DSR-568 お問い合わせフォーム ([STG] Ready for deploy), DSR-608/610/607 Test (To Do), DSR-538 bug movie-detail (To Do).

## 🤖 Agents
| Lane | Đang chạy | Hàng đợi | Hold (07:45 chuyển khi Night Report Pass) | Xong 24h | Job lỗi |
|---|---|---|---|---|---|
| claude-code (functional) | — | 0 | JOB-20261016-09 (DSR-647 retest · cần `DSR-501-P3-order`) · JOB-20261016-10 (557 e-book · cần TD-190-12/13) · JOB-20261016-08 (566 rerun · cần TD-566-01/02) · JOB-20261015-12 (529 · cần TD-529-01/03) | 7 (JOB-20261016-01..07, 0 fail sản phẩm mới) | 0 |
| codex (visual + Lighthouse) | — | 0 | JOB-20261016-11 (566 visual 014/015 SP 390 · cần TD-566-01) | 0 | 0 |
Kết quả chiều 16/10: JOB-05 (501 P3) blocked-data (updateDate null, preview cũ) · JOB-06 (557) 10 pass / 4 skip data e-book · JOB-07 (552 close-out) 3 pass / 7 skip (HOME B3, cn). Không có bug thật mới.

## ✅ Close gần đây
- 2026-10-16 **DSR-501** Done (DEV): P1 ✅, P4 N/A, P2/P3 → bug DSR-647 (fix trong DSR-587, Martin)
