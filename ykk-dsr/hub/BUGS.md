# YKK DSR – Bug register

> Cập nhật: 2026-10-20 07:45 (UTC+7, [schedule] morning) · **DSR-648 ✅ retest Pass** (016, Night 19/10 – comment 61473) · **DSR-651 ✅ retest Pass** (014 ja, JOB-20261019-07 – comment 61474) → Dat đóng 2 bug · DSR-457 #10 ✅ (comment 61475) · DSR-647: Martin 20/10 "merge on 10/20, you can re-test" · 0 bug mới (1 nghi vấn PEND-529-01 chờ dữ liệu agent) · Nguồn sự thật: Jira (sutrix.atlassian.net, project DSR)

## 🔔 Việc cần làm về bug
| # | Bug | Việc | Ai | Với ai | Hạn |
|---|---|---|---|---|---|
| 1 | DSR-457 | ✅ Ngọc đã trả lời 15/10 (61026, QA bỏ sót): #3 Not bug · #7 Can not fix (known limitation) · #13 chờ trang overlay DSR-587 · #6 → PM. Còn hỏi Ngọc: **R1** (field nào điều khiển icon NEW/UPDATE) – đã hỏi lại trong comment 61340 | Dat (nhắn Ngọc) | Ngoc | 20/10 |
| 2 | DSR-457 | Đuổi Quentin trả lời comment 61015 (webp, form gate catalog) – mặc định áp dụng nếu không trả lời trước 20/10 | Dat | Quentin (PM) | 20/10 |
| 3 | DSR-457 | ✅ #1 (16/10) + ✅ #10 (19/10) – đã comment 61475 (20/10) | — | — | xong |
| 4 | DSR-647 | Martin 20/10 08:56 JST: merge overlay lên main 20/10 → QA-PT seed lại qa501-* trong folder mới (tối 20/10) → JOB-20261019-03 (P2+P3 trên main) sáng 21/10 | QA-PT → Agent | — | 21/10 |

## Bug đang mở
| Jira | US | Tiêu đề | Sev | Trạng thái Jira | Assignee | Retest ở | Kết quả retest gần nhất | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|
| [DSR-457](https://sutrix.atlassian.net/browse/DSR-457) | DSR-360 | Product Detail – Integrate issue (13 item) · ⚠ 20/10 CR DSR-585 bỏ `topBottomStopVariation` → item #12 (dòng dưới tên sản phẩm) không còn kỳ vọng hiển thị = thay đổi spec, không phải fail | Major | [Dev] In Testing (Jira 20/10) | Kohei Okumura (Jira 20/10) | DEV | 19/10 QA-PT: ✅ 10 · 16/10 QA-PT: ✅ 1 · 13/10 (QA-PT, có evidence): ✅ 2, 4, 5, 9, 11, 12, R2, R3, R4 · ❌ 3 (toolbar 5/6 icon), 7 (Youku: span play có trong DOM nhưng không hiện), 13 (link MOVIE = youtube.com/watch?v=movieid-01, STORY sai đích) · ❓ 6 (asset đã Published, ảnh vẫn vỡ → dev check), R1 (chưa biết field ngày) · ⚖️ 8 form gate (PM Quentin) · ⏳ 10 | R1 (Ngọc) · 61015 (Kohei – mặc định có hiệu lực 20/10) · #13 sau DSR-587 (overlay merge 20/10) |
| [DSR-647](https://sutrix.atlassian.net/browse/DSR-647) | DSR-501 | video-detail: relatedMovies không bao giờ hiển thị (query thiếu relatedMovies, FE đọc relatedVideos) | High | **[Dev] In Testing** · Martin 20/10: merge main 20/10 | Portal Martin | DEV (branch DSR-PRODUCTDETAIL-moustache) | 16/10 QA-PT: P3-order ❌ (sau khi set 更新日 rel-1..6) – chưa kết luận (nghi preview cũ). 16/10 JOB-05: blocked-data. Order rule = update date mới nhất trước (61177) | 19/10 JOB-20261019-01: ✅ P2 (sau khi bỏ assertion static HTML) · P3 hold JOB-20261019-03 (re-preview hoặc overlay merge 20/10 + QA-PT seed lại tối 20/10) |
| [DSR-648](https://sutrix.atlassian.net/browse/DSR-648) | DSR-552 | Breadcrumb UE preview thiếu trang cha (Publish đúng) | Minor (Low) | [Dev] In Testing (assignee Dat) | Portal Martin (dev DSR-552) | DEV | ✅ 19/10 QA-PT 016 Pass (evidence 1hatEa5W…) – comment 61473 | **Dat đóng bug** (Done) · 20/10 |
| [DSR-651](https://sutrix.atlassian.net/browse/DSR-651) | DSR-552 | Breadcrumb display name dài → scroll ngang PC 1440/1024 | Minor (Low) | [Dev] In Testing (assignee Dat) | Portal Martin | DEV | ✅ 19/10 JOB-20261019-07 014 [ja] Pass ×2 (1440/1024 không scroll ngang) – comment 61474 | **Dat đóng bug** (Done) · 20/10 |

### Bug chờ tạo ticket (QA đã phân loại = bug thật, chưa có Jira)
| Tạm ID | US | Tiêu đề | Sev đề xuất | Nguồn | Ghi chú |
|---|---|---|---|---|---|
| PEND-529-01 | DSR-529 | Article image: changing the image in UE duplicates it; after deleting one image and publishing, no image is shown | Major? (chưa chốt) | Night 19/10 TD-529-01 ❌ (evidence https://drive.google.com/file/d/1PDx8cV4oVuLjrjBEBlSIVeprRafxvl46/view) | Chưa đủ để kết luận bug: ảnh chụp ở `/master/en/qa529-01` (ngoài stories). ✅ JOB-20261019-02 xác nhận: ja có 2 block ảnh (1 trống = nhân đôi), en block ảnh trống (không hiện ảnh); ảnh QA-PT ở /master/en/qa529-01 chỉ là URL Author cũ, trang đúng ở …/stories/qa529-01. → **bug thật, nháp chờ Dat duyệt 20/10** (Medium, Martin) |

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
