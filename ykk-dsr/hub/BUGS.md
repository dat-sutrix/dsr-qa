# YKK DSR – Bug register

> Cập nhật: 2026-10-19 17:10 (UTC+7, [schedule] evening) · Jira 19/10 17:10: **DSR-651 → [Dev] In Testing** (13:55 JST) · DSR-648 [Dev] In Testing · 457/647/611 không đổi · 0 bug mới (agent fail hôm nay = test/env/data hoặc trùng bug/câu hỏi đã có) · DSR-647 P3-order: IDLE-14 xác nhận trang branch stale (last-modified 16/10 06:43Z) → môi trường, không bug · Nguồn sự thật: Jira (sutrix.atlassian.net, project DSR) · Claude cập nhật từ session `DSR – Bugs`

## 🔔 Việc cần làm về bug
| # | Bug | Việc | Ai | Với ai | Hạn |
|---|---|---|---|---|---|
| 1 | DSR-457 | ✅ Ngọc đã trả lời 15/10 (61026, QA bỏ sót): #3 Not bug · #7 Can not fix (known limitation) · #13 chờ trang overlay DSR-587 · #6 → PM. Còn hỏi Ngọc: **R1** (field nào điều khiển icon NEW/UPDATE) – đã hỏi lại trong comment 61340 | Dat (nhắn Ngọc) | Ngoc | 20/10 |
| 2 | DSR-457 | Đuổi Quentin trả lời comment 61015 (webp, form gate catalog) – mặc định áp dụng nếu không trả lời trước 20/10 | Dat | Quentin (PM) | 20/10 |
| 3 | DSR-457 | Night 16/10: #1 ✅ Pass (evidence Drive 18GECm86…, 1lv09Z…) · #10 chưa chạy → Night Pack T2 19/10. Comment kết quả #1 vào DSR-457 (lượt tự động bị chặn quyền ghi Jira – xem DASHBOARD 🔔) | Dat (comment) · QA-PT (#10) | — | 19/10 |
| 4 | DSR-647 | Night 16/10 DSR-501-P3-order ❌ (thứ tự sai, evidence Drive 1y0kdjL7…) – **18/10 IDLE-14 xác nhận stale** (last-modified 16/10 06:43Z, DOM rel1→rel5) = môi trường. Dat nhờ Martin re-preview qa501-main-a (T2 19/10) → rồi JOB-20261017-01 (P2 + P3) | Agent → Claude → Dat | Martin | 19/10 |

## Bug đang mở
| Jira | US | Tiêu đề | Sev | Trạng thái Jira | Assignee | Retest ở | Kết quả retest gần nhất | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|
| [DSR-457](https://sutrix.atlassian.net/browse/DSR-457) | DSR-360 | Product Detail – Integrate issue (13 item) | Major | [Dev] In Testing (Jira 17/10) | Milavec Quentin (Jira 16/10; trước đó Ngoc) | DEV | 16/10 QA-PT: ✅ 1 · 13/10 (QA-PT, có evidence): ✅ 2, 4, 5, 9, 11, 12, R2, R3, R4 · ❌ 3 (toolbar 5/6 icon), 7 (Youku: span play có trong DOM nhưng không hiện), 13 (link MOVIE = youtube.com/watch?v=movieid-01, STORY sai đích) · ❓ 6 (asset đã Published, ảnh vẫn vỡ → dev check), R1 (chưa biết field ngày) · ⚖️ 8 form gate (PM Quentin) · ⏳ 10 | R1 (Ngọc) · 61015 (Quentin → hỏi Kohei 19/10 10:42; mặc định 20/10) · #10 tối 19/10 · #13 sau DSR-587 |
| [DSR-647](https://sutrix.atlassian.net/browse/DSR-647) | DSR-501 | video-detail: relatedMovies không bao giờ hiển thị (query thiếu relatedMovies, FE đọc relatedVideos) | High | **[Dev] In Testing** (16/10 17:54 JST) | Portal Martin | DEV (branch DSR-PRODUCTDETAIL-moustache) | 16/10 QA-PT: P3-order ❌ (sau khi set 更新日 rel-1..6) – chưa kết luận (nghi preview cũ). 16/10 JOB-05: blocked-data. Order rule = update date mới nhất trước (61177) | 19/10 JOB-20261019-01: ✅ P2 (sau khi bỏ assertion static HTML) · P3 hold JOB-20261019-03 (re-preview hoặc overlay merge 20/10 + QA-PT seed lại tối 20/10) |
| [DSR-648](https://sutrix.atlassian.net/browse/DSR-648) | DSR-552 | Breadcrumb UE preview thiếu trang cha (Publish đúng) | Minor (Low) | [Dev] In Testing (Martin "modification done" 19/10 13:55) | Portal Martin (dev DSR-552) | DEV | 15/10 QA-PT: ❌ 016 | QA-PT retest 016 tối 19/10 → Pass thì Claude comment + đóng bug |
| [DSR-651](https://sutrix.atlassian.net/browse/DSR-651) | DSR-552 | Breadcrumb display name dài → scroll ngang PC 1440/1024 | Minor (Low) | **[Dev] In Testing** (19/10 13:55 JST) | Portal Martin | DEV | 16/10 JOB-20261016-01: ❌ 014 · 19/10 IDLE-07: ✅ 014 [ja] (chưa xác nhận chính thức) | JOB-20261019-07 (queue) → Pass thì Claude comment + đóng · 20/10 |

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
