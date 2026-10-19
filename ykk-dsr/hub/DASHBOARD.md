# YKK DSR – QA Dashboard

> Cập nhật: 2026-10-19 10:50 (UTC+7, session Điều phối) · Lần kiểm tra kế tiếp: 19/10 17:10 · Sprint 12 (15/10–27/10) · **Hạn chót việc đã biết: T5 22/10** · Buffer ticket mới: 23, 26, 27/10 ([PLAN](PLAN-sprint12.md)) · Chi tiết US: [hub/us/](us/) · Bug: [BUGS.md](BUGS.md)

## 🔔 Dat cần làm (sắp theo hạn)
| # | Việc | Với ai | Hạn | Mở khóa | Nội dung gửi sẵn |
|---|---|---|---|---|---|
| 1 | ✅ (11:12) ~~Sửa VPS lane claude-code~~: nguyên nhân = rebase conflict (không phải agent treo); JOB-12 đã xong từ 16/10, kết quả đã lên repo. runner.sh giờ tự gỡ conflict. Runner chạy lại 04:12Z, đang upload Drive rồi xả 11 job | — | — | — | — |
| 2 | ~~Duyệt Done 552~~ → **hoãn**: Martin đang fix DSR-648/651 (In Progress 19/10 09:42). Fix lên DEV → agent rerun 014, QA-PT retest 016 → Done. Chưa fix tới 22/10 → Done kèm 2 bug Low (03 §5) | Martin | 22/10 | 552 | — |
| 3 | Nhắn Martin: re-preview `qa501-main-a` trên branch + hỏi cách QA tự refresh (tin soạn sẵn trong chat 19/10 11:22). 529: **không hỏi** – QA tự tạo trang test bằng `article detail` dưới test-space (Dat 19/10) | Martin | 19/10 | 647 | xem chat 19/10 |
| 4 | DSR-566: DEV Author **không có template `news-article`** → không seed được, 12 TC + 2 visual đứng. Không có tới 20/10 → 22/10 báo PM tách sang Sprint 13 | Ngọc (dev DSR-566) | **20/10** | 566 | "Hi, QA cannot create a news page on DEV Author: template `news-article` is not available (screenshot: https://drive.google.com/file/d/11UjvHFVP4mU3JqXWytcSUWPtk0vdqIzH/view). Please enable/deploy the template on DEV by 10/20 or tell us which template to use for DSR-566." |
| 5 | 🔴 Đuổi trả lời [DSR-611](https://sutrix.atlassian.net/browse/DSR-611) + [DSR-457](https://sutrix.atlassian.net/browse/DSR-457) (61011 Ngọc, 61015 Quentin) – mặc định có hiệu lực 20/10 | Quentin, Ngọc | 19/10 | 557, 360 | "Quentin-san, QA still needs answers in DSR-611 (4 questions, DSR-190) and DSR-457 comments 61011/61015. From 10/20 QA applies the defaults in the tickets." |
| 6 | ✅ Comment DSR-457 #1 đã đăng (Claude, 19/10 11:17, comment 61340) | — | — | — | — |
| 7 | Q27: DSR-585 項目fix版 khi nào giao (15 TC dựa bản tạm v0.1) | Quentin | 20/10 | 585 | "Quentin-san, when will the fixed Product CF field list (項目fix版) be delivered? QA test cases for DSR-585 are written on v0.1 (20260930) and must be redone if fields change." |
| 8 | DSR-433: cn vs zh, allowlist DEV, hẹn test gửi mail (~30') | Nakamoto | 20/10 | 433 | "Nakamoto-san, for DSR-433 QA: (1) templates use zh but the site uses cn – which code will callers pass? (2) is MAIL_RECIPIENT_ALLOWLIST_PATTERN set on DEV now (it was empty on 9/25)? (3) could you run the test sends listed in our TC file with QA watching the inboxes (about 30 min)?" |

**Jira 19/10:** không có ticket mới giao Dat từ 16/10. Hoạt động mới: Tsukiji (khách) comment "テスト中" trên DSR-552 và DSR-570 lúc 09:13. DSR-531 / DSR-567 (task "Create Test Case" của 529/566, To Do) → Claude đã gắn link folder TC và chuyển **Done** 19/10.

## 🌙 QA part-time đêm nay
**T2 19/10:** Night Pack do lượt 17:10 tạo, ≤ 2h, thứ tự: (1) TD-529 trang test `article detail` dưới test-space (60') · (2) DSR-457 #10 (15') · (3) TD-586/587 ở path BL-OVL-1 (45'). 566 bỏ (chưa có template).
Report 16/10 (2h40, đã triage): việc 1, 2, 5, 6 ✅ (501-P3 ❌ = trang branch cũ, 557 e-book + TD-190-03/04 ✅, 457 #1 ✅, 552-026 ✅) · việc 3 (566) và 4 (529) ⛔ do thiếu template/folder trên DEV – không phải lỗi QA-PT.

## 🗂 Sub-task TC trong Jira (Sprint 12, label `qa-tc`, assignee Dat)
TC job (T2–T6 18–22h, T7/CN 9–22h) → [tc-backlog.md](tc-backlog.md) · câu hỏi: [tc-questions.md](tc-questions.md)
**Trạng thái 19/10:** backlog **17/17 done**, không ticket mới · upload queue **14 pending** (585, 586, 587, 589, 590, 227, 433) – chờ sửa VPS (🔔 #1) · rủi ro làm lại: Q27 (🔔 #7), Q42/Q43 (🔔 #8).
19 sub-task · **94 SP** (1 SP = 1h) · Done 2 (DSR-612, DSR-617 = 10 SP) · To Do 17 (84 SP). Lọc: `project = DSR AND labels = qa-tc`. Mới tạo 15/10: DSR-617..633; dùng lại DSR-528 (メール送信連携).

## 🎯 Ưu tiên Sprint 12: 6 ticket In Testing → [PLAN-sprint12.md](PLAN-sprint12.md)
**Sprint 12 chỉ test DEV – xanh DEV = Done (STG/PRO ở sprint sau).** **Kế hoạch ASAP (15/10 16:30):** 591 ✅ · 501 ✅ 16/10 · 552, 557 → **17/10** · 566 → **17/10** · 529 → **19/10**. TC bị env chặn = ⛔ Blocked có owner, không chờ.

## 📋 Tổng quan US
| US | Tên | Trạng thái | DoD | DEV | STG | PRO | Blocker mở → ai mở khóa | Bug mở | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|---|
| [DSR-552](us/DSR-552.md) | Breadcrumb block | 🟢 | 2/9 | 35/35 đã chạy · ≈22 ✅ · 2 ❌ Low (014, 016) · ≈11 ⛔ có owner | — | — | — | 2 Low (DSR-648, DSR-651) | Chờ Martin fix 648/651 → retest 014/016 → Done (đích **21/10**, muộn nhất 22/10) |
| [DSR-557](us/DSR-557.md) | 動画・カタログ表示 | 🟡 | 2/9 | 8/25 ✅ · 0 ❌ · 10 ⛔ | — | — | DSR-611 → Quentin (mặc định 20/10) | 0 | JOB-20261016-10 (e-book) chờ lane · Done đích **21/10** |
| [DSR-566](us/DSR-566.md) | ニュース詳細 | 🔴 | 2/9 | 5/18 ✅ · 6 ❌ nghi data · 3 ⛔ | — | — | **Không có template news-article trên DEV** → dev DSR-357 (🔔 #4) | 0 | template ≤ 20/10 → seed → JOB-08/11 · đích **22/10**, không có → báo PM |
| [DSR-529](us/DSR-529.md) | 記事詳細 | 🟡 | 3/9 | 0/32 · 9 ⛔ (spec scaffold xong, 47 skip blocked-data) | — | — | Không có folder stories / template `article` → Martin xác nhận (🔔 #5) | 0 | QA-PT TD-529 tối 19/10 → JOB-20261015-12 20/10 · đích **22/10** |
| DSR-570 | 資料DL (khách đang test) | 🟡 | — | JOB-12 (16 test): 7 ✅ · 1 ❌ 007 (list GraphQL trả `_publishUrl` PDF của catalog requiresForm=true → bỏ qua form; chờ quyết định PM form gate, DSR-457 61015) · 6 ⛔ (en 404, card form-required không render) · 2 skip | — | — | form HubSpot chưa có (Ngoc) | 0 | 007 → hỏi Quentin cùng 61015 · manual 6 TC 20/10 · đích **22/10** |
| [DSR-609](us/DSR-609.md) | トップ | 🟡 | 3/9 | 0/9 (JOB-14: 001 đã chụp chờ so Figma · PSI desktop 94 / mobile 87 trên .aem.page) | — | — | Q10/Q11 → Quentin · top page 404 trên .aem.live → dev | 0 | JOB-13 chờ lane (Agent) · so Figma 001 (Claude · 17/10) |
| DSR-360 (bug DSR-457) | Product Detail | 🟡 | — | xem BUGS | — | — | 2 quyết định PM → Quentin | 1 | QA-PT item 1, 10 (Night Pack 16/10 việc 5) |
| DSR-587 (bug DSR-647, từ 501) | Video detail overlay | 🟡 | — | QA-PT 16/10: P3-order ❌ (nghi preview cũ) | — | — | Martin re-preview nếu stale | 1 | Martin re-preview (🔔 #3) → JOB-20261017-01 |

Ký hiệu: DEV = `pass/tổng` + số fail. STG/PRO = N/A (giai đoạn DEV only, 03 §0) – Jira status [STG]/PRO là workflow chung.
Chưa theo dõi (ngoài phạm vi QA hôm nay): DSR-568 お問い合わせフォーム ([STG] Ready for deploy), DSR-608/610/607 Test (To Do), DSR-538 bug movie-detail (To Do).

## 🤖 Agents
| Lane | Đang chạy | Hàng đợi | Hold (07:45 chuyển khi Night Report Pass) | Xong 24h | Job lỗi |
|---|---|---|---|---|---|
| claude-code (functional) | ⚠️ JOB-20261016-12 (DSR-570) **treo ~52h** | 11: JOB-20261016-10 (557 e-book) · JOB-20261017-01 (DSR-647 retest) · -02 (DSR-173 MOVIE-014/033 pass→fail) · -03 (TOP-001 fix test) · IDLE-05 (586) · -06 (587) · -07 (regression) · -10 (589) · -11 (590) · -12 (227) · -13 (433) | JOB-20261016-08 (566 · chờ template) · JOB-20261015-12 (529 · chờ TD-529 T2) | 3 (IDLE-01/02/03) | 0 (1 treo) |
| codex (visual + Lighthouse) | — | 1: JOB-ZZ-IDLE-15 (570 baseline + 647 freshness) | JOB-20261016-11 (566 visual · chờ template) | 1 (IDLE-14 00:53Z 18/10) | 0 |
**07:45 19/10:** Không có kết quả agent mới (0 commit claude-code/codex từ 17:10 18/10). Night Report: không dòng mới (QA-PT nghỉ T7/CN). Jira: 457/647/648/651/611 và 552/557/566/529/609 không đổi. Hold: 3 job giữ nguyên (566 chờ template, 529 chờ TD-529 tối nay). Bug thật mới: 0. Xếp **JOB-ZZ-IDLE-15 (codex)**: baseline + Lighthouse trang DSR-570 và kiểm lại freshness qa501-main-a (DSR-647) – lane codex trước đó 0 job. Không thêm regression claude-code (IDLE-07 chưa chạy, lane treo).
**17:10 18/10:** IDLE-14 (record only): 586 /en/products/46 200, hiện PC+SP; /ja/products/46 404 (chưa có trang ja); 587 qa501-main-a 200 nhưng `last-modified` 16/10 06:43Z → **stale**, thứ tự rel1→rel5 là dữ liệu cũ → DSR-647 P3 = môi trường (🔔 #5b). Lighthouse median 586 m81/d92 · 587 m98/d99 (SEO 61/69 = DEV noindex). Jira: không ticket qa-ai/bug nào đổi. Bug thật mới: 0. Không xếp job mới: lane claude-code treo (11 chờ), không TC mới mở khóa, codex không còn việc độc lập dữ liệu.
**07:45 18/10:** IDLE-09 (record only): en SP 390 trống ở +3s, hiện ở +10s; en PC + ja OK ở +3s; lỗi tài nguyên placeholders.json 404, ảnh hero ja 403 – chưa rõ nguyên nhân, không verdict → ghi cho DSR-278, không bug. Night Report: không có dòng mới (QA-PT nghỉ T7/CN). Jira: 457/647/648/651/611 và 552/557/566/529 không đổi. Hold: 3 job giữ nguyên (566 chờ template, 529 chờ TD-529 T2). Bug thật mới: 0. Không xếp regression mới cho claude-code (IDLE-07 chưa chạy, lane treo).
**17:10 17/10:** IDLE-08 xong (record only, không verdict): Lighthouse 9 trang DEV mobile 71–100 / desktop 86–99; SEO 61 mọi trang do `is-crawlable` (DEV noindex – môi trường, không bug) + thiếu meta-description; A11y desktop 79–94 (`aria-allowed-attr`, `button-name`, `color-contrast`) – ghi nhận, chờ baseline DoD sprint sau. DSR-278 SP 390: breadcrumb hiện, nội dung sản phẩm trống ở load+3s → IDLE-09 kiểm timing. Bug thật mới: 0. Jira: không ticket qa-ai/bug nào đổi từ sáng. Không xếp job mới cho claude-code (lane treo, 6 job chờ, không TC mới mở khóa).
Kết quả 16/10 tối: IDLE-01 regression 72 ✅ / 22 ❌ (mới: **MOVIE-014/033 pass→fail** – player không render trên trang dsr-173, nghi product → JOB-20261017-02 xác minh trước khi tạo bug; TOP-001 PC timeout = test) · IDLE-02 529 scaffold (all skip data) · IDLE-03 583: 4 ❌ = data (sai trang) · IDLE-04 baseline 19 ảnh · JOB-13 570: 015 ✅ đề xuất, SP input 63% (ghi cho dev, 570 In Progress), Lighthouse m79/d100. Bug thật mới: 0.

## ✅ Close gần đây
- 2026-10-16 **DSR-501** Done (DEV): P1 ✅, P4 N/A, P2/P3 → bug DSR-647 (fix trong DSR-587, Martin)
