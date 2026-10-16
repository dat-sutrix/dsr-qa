# YKK DSR – QA Dashboard

> Cập nhật: 2026-10-16 07:50 (UTC+7, [schedule] morning) · Lần kiểm tra kế tiếp: chiều 16/10 17:10 · Sprint 12 (15/10–27/10) · Chi tiết từng US: [hub/us/](us/) · Bug: [BUGS.md](BUGS.md)

## 🔔 Dat cần làm (sắp theo hạn)
| # | Việc | Với ai | Hạn | US | Mở khóa | Nội dung gửi sẵn |
|---|---|---|---|---|---|---|
| 9 | **Agent treo:** JOB-20261015-09 nằm trong `jobs/running/` từ 15/10 16:13 (>15h, không result) → chặn cả lane claude-code (JOB-13, JOB-11, JOB-20261016-01/02 đang chờ). Vào VPS tmux `dsr` xem cửa sổ claude-code: process còn chạy thì kill, rồi `git mv jobs/running/JOB-20261015-09.md jobs/queue/` + push, restart runner | — (VPS) | 16/10 sáng | 566, 609, 552, 557, 501 | 5 job | — |
| 10 | **Tạo Jira Bug PEND-552-016** (UE preview breadcrumb thiếu ancestor; Publish đúng). Scheduled task bị chặn quyền tạo issue sáng nay. Nội dung copy nguyên văn trong [BUGS.md](BUGS.md) mục "Bug chờ tạo ticket" | — (Jira) | 16/10 | 552 | 016 | BUGS.md |
| 12 | Duyệt [tc-questions.md](tc-questions.md) (**22 câu**, 19 mới từ đêm 15/10: Q4–Q22) – cột "Dat quyết định" | — | 16/10 | 529, 609, 568, 560, 608, 610, 503, 583 | TC verdict | — |
| 13 | Nhờ dev Top page publish `/ja/top-page`, `/en/top-page` lên .aem.live (đang 404, chỉ có .aem.page) | 石谷英樹 (dev DSR-609) | 17/10 | 609, 552 | HOME + test live | "Ishitani-san, the DEV top page is only on .aem.page (/ja/top-page, /en/top-page return 404 on .aem.live). Could you publish it (Publish, not Preview) so QA can test DSR-609 and the breadcrumb HOME link?" |
| 8 | Upload TC DSR-608+610 adopt (256 KB, 1 file 2 sheet) từ repo `hub/tc-out/[Sutrix] DSR -172- [レイアウト] ブース・DIGITAL SHOWROOM（展示・体験）.xlsx` → [Drive DSR-172](https://drive.google.com/drive/folders/1nkLIDrScfMJjCvSDniokMrAqOkHmBW5E) | — | 16/10 | 608, 610 | DoD TC file | — |
| 7 | Upload TC DSR-560 adopt (131 KB) từ repo `hub/tc-out/[Sutrix] DSR -182- [AEM] 検索データ生成／検索連携用データ管理.xlsx` → [Drive DSR-182](https://drive.google.com/drive/folders/1KS_4dMiUINNRT8buwjITThqTl-UA1_Vm) | — | 16/10 | 560 | DoD TC file | — |
| 6 | Upload TC DSR-568 adopt (3.2 MB) từ repo `hub/tc-out/[Sutrix] DSR -199- [レイアウト] お問い合わせフォーム（form）.xlsx` → [Drive DSR-199](https://drive.google.com/drive/folders/1WBZuy01oskHK-Cz1oEA9_8l0vzYaNxIB) | — | 16/10 | 568 | DoD TC file | — |
| 5 | Upload TC DSR-609 adopt (128 KB) từ repo `hub/tc-out/[Sutrix] DSR -196- [レイアウト] トップ.xlsx` → [Drive DSR-196](https://drive.google.com/drive/folders/1NC_m_XPhuxewPyTyhj411uKW71lmq-vy) | — | 16/10 | 609 | DoD TC file | — |
| 4 | Upload TC DSR-529 (33 KB) từ repo `hub/tc-out/[Sutrix] DSR -356- [レイアウト] 記事詳細（article-detail）.xlsx` → [Drive DSR-356](https://drive.google.com/drive/folders/1Jpf4BmGJ97mPCauzQnds2m-fsn6CDAgB) | — | 16/10 | 529 | DoD TC file | — |
| 14 | Upload TC DSR-503 (26 KB) `hub/tc-out/[Sutrix] DSR -503- [AEM] Product Detail - Auto-generate URL by product-id.xlsx` → [Drive DSR-503](https://drive.google.com/drive/folders/1VDMF3FnDBxgafEqJQPkuuEzZUHb6skVg) · DSR-583 (25 KB) `hub/tc-out/[Sutrix] DSR -583- [製品一覧] スマホ表示時の製品カードを2列に固定する.xlsx` → [Drive DSR-583](https://drive.google.com/drive/folders/1W80lQF61y5Wf1jdvPdqmy3bfl2UdjKLM) | — | 16/10 | 503, 583 | DoD TC file | — |
| 2 | Đuổi trả lời [DSR-611](https://sutrix.atlassian.net/browse/DSR-611) (4 câu, Jira vẫn To Do, mặc định QA áp dụng 20/10) | Quentin (PM) | 17/10 | 557 | 5 TC | "Quentin-san, QA needs 4 answers in DSR-611 to unblock DSR-190 test cases; if no answer by 10/20 QA applies the defaults written in the ticket." |
| 3 | Đuổi trả lời DSR-457: Ngọc (comment 61011) + Quentin (comment 61015). Jira 16/10: assignee DSR-457 = Quentin | Ngoc, Quentin (PM) | 20/10 | 360 | DSR-457 | xem BUGS.md #1, #2 |

## 🌙 QA part-time đêm nay
**Kết quả đêm 15/10 (Night Report, 31 dòng):** P1 en list-catalog ✅, ja video-detail ❌ (không hiện video – data) · P1b 9 CF + 2 trang qa501 ✅, điểm 1 ❌ chưa kết luận (Dat #11) · P2 12 CF catalog ✅, TD-190-03/04 ❌ data (Release date bắt buộc) · P3 T2/T3 ✅ · P4 012/013/024 ✅, 016 ❌ bug thật, 026 ❌ test sai (JSON-LD do JS sinh) · P5 DSR-457 #1/#10 **không báo cáo** → đưa lại đêm 16/10. Night Pack 16/10 do task 17:10 tạo.
**[Night Work Pack 2026-10-15 (v2)](https://docs.google.com/document/d/1TBlioRYuLYWxroJGw5hgnZxFSJ0mWzjY-0AWixr73lg)** (~3h55, v2 16:20 – bản cũ đã đổi tên [CŨ]) · P1 DSR-557 tạo 2 trang · **P1b DSR-501 seed 9 CF qa501-* + trang qa501-a/b** · P2 seed 14 CF `qa190-*` · P3 DSR-552 display name T2/T3 · P4 DSR-552 manual 016/013/012/026/024 · P5 DSR-457 #1, #10 · Report: [DSR Night Report](https://docs.google.com/spreadsheets/d/1gkH5lblKS1T3zxSTItNhX31TU-b-mY71GIFRqjMpZoU) · Evidence: `DSR_NightPack/Evidence_20261015`

## 🗂 Sub-task TC trong Jira (Sprint 12, label `qa-tc`, assignee Dat)
Night TC job 18:00–22:00 hằng ngày → [tc-backlog.md](tc-backlog.md) (17 ticket, đích sáng T2 19/10) · câu hỏi chờ duyệt: [tc-questions.md](tc-questions.md)
**Sáng 16/10:** done 1/17 · upload-pending 8 · todo 8 (đêm 17–18/10) · câu hỏi chưa quyết định **22**. **Night TC job (15/10 21:30):** done 1/17 · upload-pending 8 (529, 609, 568, 560, 608, 610, 503, 583) · câu hỏi chờ duyệt 22 · job agent đã xếp 3 (JOB-12 hold, JOB-13, JOB-14) · 🔔 Dat upload 8 TC xlsx từ tc-out/ (503, 583 vào folder mới tạo) · còn 8 ticket / 48 SP
19 sub-task · **94 SP** (1 SP = 1h) · Done 2 (DSR-612, DSR-617 = 10 SP) · To Do 17 (84 SP). Lọc: `project = DSR AND labels = qa-tc`. Mới tạo 15/10: DSR-617..633; dùng lại DSR-528 (メール送信連携).

## 🎯 Ưu tiên Sprint 12: 6 ticket In Testing → [PLAN-sprint12.md](PLAN-sprint12.md)
**Sprint 12 chỉ test DEV – xanh DEV = Done (STG/PRO ở sprint sau).** **Kế hoạch ASAP (15/10 16:30):** 591 ✅ · 501, 552, 557 → **16/10** · 566 → **17/10** · 529 → **19/10**. TC bị env chặn = ⛔ Blocked có owner, không chờ.

## 📋 Tổng quan US
| US | Tên | Trạng thái | DoD | DEV | STG | PRO | Blocker mở → ai mở khóa | Bug mở | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|---|
| [DSR-552](us/DSR-552.md) | Breadcrumb block | 🟡 | 2/9 | 12/35 ✅ · 8 ❌ · 15 ⛔ (night 15/10: 012/013/024 ✅, 016 ❌ bug UE preview, 026 làm lại) | — | — | B3 HOME (top page chưa lên .aem.live) · bug PEND-552-016 chưa có Jira → Dat | 1 (chờ ticket) | JOB-20261016-01 010/014/015/018 (Agent · 16/10) · tạo bug (Dat · 16/10) |
| [DSR-557](us/DSR-557.md) | 動画・カタログ表示 | 🟡 | 2/9 | 5/25 ✅ · 1 ❌ · 12 ⛔ | — | — | DSR-611 → Quentin · TD-190-03/04 thiếu Release date → QA-PT | 0 | JOB-20261016-02 qa190 rerun (Agent · 16/10) · movie data ja (QA-PT · đêm 16/10) |
| [DSR-566](us/DSR-566.md) | ニュース詳細 | 🟡 | 2/9 | 0/18 · 3 ⛔ | — | — | **JOB-09 treo >15h → Dat kiểm VPS** · list /news/ chưa có · cn | 0 | Gỡ JOB-09 (Dat · 16/10) · TD qa566 (QA-PT · đêm 16/10) |
| [DSR-529](us/DSR-529.md) | 記事詳細 | 🟡 | 3/9 | 0/32 · 9 ⛔ | — | — | Chưa có trang test → QA-PT seed TD-529 · stories index → dev | 0 | Seed TD-529 (QA-PT · 16/10) → JOB-12 (Agent · 17/10) |
| [DSR-609](us/DSR-609.md) | トップ | 🟡 | 3/9 | 0/9 (JOB-14: 001 đã chụp chờ so Figma · PSI desktop 94 / mobile 87 trên .aem.page) | — | — | Q10/Q11 → Quentin · top page 404 trên .aem.live → dev | 0 | JOB-13 chờ lane (Agent) · so Figma 001 (Claude · 17/10) |
| DSR-501 | DM_movie question | 🟡 | — | P1 ✅ (relatedMovies / isUnavailable, Dat 16/10) · P2/P3 JOB-11 đang chạy | — | — | — | 0 | JOB-11 đã chuyển queue (Agent · 16/10) |
| DSR-360 (bug DSR-457) | Product Detail | 🟡 | — | xem BUGS | — | — | 2 quyết định PM → Quentin | 1 | QA-PT item 1, 10 chưa chạy → Night Pack 16/10 |

Ký hiệu: DEV = `pass/tổng` + số fail. STG/PRO = N/A (giai đoạn DEV only, 03 §0) – Jira status [STG]/PRO là workflow chung.
Chưa theo dõi (ngoài phạm vi QA hôm nay): DSR-568 お問い合わせフォーム ([STG] Ready for deploy), DSR-608/610/607 Test (To Do), DSR-538 bug movie-detail (To Do).

## 🤖 Agents
| Lane | Đang chạy | Hàng đợi | Xong 24h | Job lỗi |
|---|---|---|---|---|
| claude-code (functional) | ⚠️ JOB-09 (566) **treo từ 15/10 16:13** | 4: JOB-13 (609), JOB-11 (501), JOB-20261016-01 (552), JOB-20261016-02 (557) | 0 | 1 treo |
| codex (visual + Lighthouse) | — | 0 | 1 (JOB-14, 609) | 0 |

## ✅ Close gần đây
- (chưa có)
