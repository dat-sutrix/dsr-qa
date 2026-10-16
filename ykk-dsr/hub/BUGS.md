# YKK DSR – Bug register

> Cập nhật: 2026-10-16 07:50 (UTC+7, [schedule] morning) · Nguồn sự thật: Jira (sutrix.atlassian.net, project DSR) · Claude cập nhật từ session `DSR – Bugs`

## 🔔 Việc cần làm về bug
| # | Bug | Việc | Ai | Với ai | Hạn |
|---|---|---|---|---|---|
| 1 | DSR-457 | Nhắc Ngọc trả lời comment 61011 (fix 3, 7, 13 · check 6 · R1) | Dat | Ngoc | 16/10 |
| 2 | DSR-457 | Đuổi Quentin trả lời comment 61015 (webp, form gate catalog) – mặc định áp dụng nếu không trả lời trước 20/10 | Dat | Quentin (PM) | 20/10 |
| 3 | DSR-457 | Regression item 1, 10 – Night Pack 15/10: **không có dòng trong Night Report (Not run)** → đưa lại Night Pack 16/10 | QA part-time | — | 17/10 sáng |
| 4 | (mới) DSR-BREAD-016 | **Tạo Jira Bug** – scheduled task bị chặn quyền tạo issue. Nội dung soạn sẵn ở mục "Bug chờ tạo ticket" bên dưới | Dat (hoặc session Bugs) | — | 16/10 |

## Bug đang mở
| Jira | US | Tiêu đề | Sev | Trạng thái Jira | Assignee | Retest ở | Kết quả retest gần nhất | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|
| [DSR-457](https://sutrix.atlassian.net/browse/DSR-457) | DSR-360 | Product Detail – Integrate issue (13 item) | Major | [Dev] In Testing (Jira 16/10) | Milavec Quentin (Jira 16/10; trước đó Ngoc) | DEV | 13/10 (QA-PT, có evidence): ✅ 2, 4, 5, 9, 11, 12, R2, R3, R4 · ❌ 3 (toolbar 5/6 icon), 7 (Youku: span play có trong DOM nhưng không hiện), 13 (link MOVIE = youtube.com/watch?v=movieid-01, STORY sai đích) · ❓ 6 (asset đã Published, ảnh vẫn vỡ → dev check), R1 (chưa biết field ngày) · ⚖️ 8 form gate (PM Quentin) · ⏳ 1, 10 | Ngoc trả lời 61011 · Quentin trả lời 61015 |
| [DSR-647](https://sutrix.atlassian.net/browse/DSR-647) | DSR-501 | video-detail: relatedMovies không bao giờ hiển thị (query thiếu relatedMovies, FE đọc relatedVideos) | High | To Do (tạo 16/10 14:15 JST) | Portal Martin | DEV | 16/10 JOB-20261016-03: ❌ P2, P3 | Fix trong DSR-587 (Overlay json2html, Martin xác nhận 16/10) → QA verify khi 587 lên DEV, data qa501 giữ nguyên |
| [DSR-648](https://sutrix.atlassian.net/browse/DSR-648) | DSR-552 | Breadcrumb UE preview thiếu trang cha (Publish đúng) | Minor (Low) | To Do (tạo 16/10) | Portal Martin (dev DSR-552) | DEV | 15/10 QA-PT: ❌ 016 | Dev xác nhận fix / known limitation → QA retest 016 |

### Bug chờ tạo ticket (QA đã phân loại = bug thật, chưa có Jira)
| Tạm ID | US | Tiêu đề | Sev đề xuất | Nguồn | Ghi chú |
|---|---|---|---|---|---|

**(Đã tạo DSR-648 16/10 12:53) Nội dung ticket PEND-552-016 (copy nguyên văn, label `qa-ai`, link "is a bug of" DSR-552, priority Low):**
```
Env: DEV – AEM Author Universal Editor vs DEV Publish (main--dsr-eds-dev--sutrix-projects.aem.live)
TC: DSR-BREAD-016 (breadcrumb shown automatically without adding a block, in Preview and Publish)
Steps:
1. Page /master/ja/test-space/dsr552-author/child (title "QA Author Child"); parent dsr552-author ("QA Author Parent") published.
2. Open /child in Universal Editor (no block added); look at the breadcrumb in the canvas.
3. Publish; open https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/dsr552-author/child
Expected: same breadcrumb in UE preview and Publish: HOME > test space > QA Author Parent > QA Author Child (one breadcrumb).
Actual: UE preview: HOME > QA Author Child (ancestors missing). Publish: HOME > test space > QA Author Parent > QA Author Child (correct).
Impact: authors see a wrong trail while editing; Publish output correct.
Evidence: DSR_NightPack/Evidence_20261015/DSR-BREAD-016_Fail.png – https://drive.google.com/file/d/1w8-oqVpDDMYmMpZ_nGrC4Mvt5v5nUEEO/view
```

Sev: Critical / Major / Minor / Trivial. **Giai đoạn DEV only (03 §0):** retest và đóng bug chỉ trên DEV; pass DEV → Done.

### Ghi chú chi tiết
- **DSR-457** – blocked ngoài code (không tính Fail): webp media11 (asset đã Published 13/10 nhưng vẫn vỡ → chờ dev; nếu không hỗ trợ được thì tách ticket PO), thumbnail Youku (không có API thumbnail → cần field mới), media09 .usdz (ẩn), catalog ≥2 (chờ trang catalog search), form gate catalog, CSP STG/PRO (DSR-516 mới có DEV). Câu hỏi spec mở: DSR-462. Close khi item 1–5, 7, 8, 10–13, R1–R4 PASS DEV + blocked đã tách ticket.

## Đã đóng (30 ngày gần nhất)
| Jira | US | Tiêu đề | Đóng ngày | Verified ở |
|---|---|---|---|---|
| [DSR-591](https://sutrix.atlassian.net/browse/DSR-591) | DSR-552 | Breadcrumb skips published ancestors missing from query-index.json | 2026-10-15 (Done) | DEV – JOB-06 (ja+en 8/8) + JOB-08 (chặn query-index vẫn đủ trail) |
| [DSR-613](https://sutrix.atlassian.net/browse/DSR-613) | DSR-552 | Question: HOME link /master/{lang} 404 | 2026-10-15 (Done – rút lại, không cần PM; HOME 404 = thiếu data top page) | — |
| [DSR-592](https://sutrix.atlassian.net/browse/DSR-592) | DSR-552 | Breadcrumb display name field missing | 2026-10-15 (Dismissed – not bug: field ở Universal Editor → Properties → ページ基本) | DEV Author (Dat) |
