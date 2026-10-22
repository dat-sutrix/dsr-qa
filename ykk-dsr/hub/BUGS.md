# YKK DSR – Bug register

> 22/10 17:10 [schedule] evening: ✅ **DSR-664** retest Pass 4/4 (JOB-20261022-16) → Dat đóng · DSR-665 Done · og:image (BUG-OVL-OGIMG) đóng – 0 about:error (JOB-13) · 0 bug mới ≥ 80% · 4 nháp catalog < 80% → DASHBOARD 🐞.

> 22/10 07:45 [schedule] morning: 🐞 **DSR-665** mới (587 video/search reload loop, 85%, Martin) · retest ✅ 647/657/658/660 (comment, Dat chuyển Done) · ⚠ 659 thumbnail meta vẫn tương đối (trả Martin) · DSR-538 chưa retest (JOB-20261022-01) · DSR-457 Dismissed (Jira).

> 21/10 17:10 [schedule] evening: Jira 657–660 → In Progress (merged); kiểm sớm JOB-20261021-07 tối nay, retest chính thức JOB-20261021-05 sáng 22/10. Không bug mới ≥ 80%.
> 21/10 16:45 Martin: fix DSR-657/658/659/660 **ĐÃ MERGE** (.aem.live) + deploy DEV cấu hình trang 404 (đưa vào repo). Retest JOB-20261021-05 chạy sáng 22/10 sau khi QA-PT sửa block ảnh + publish lại (Night 21/10 việc 0). Cả 4 đã gán Sprint 12.
> Cập nhật: 2026-10-21 07:45 (UTC+7, [schedule] morning) · 🐞 3 bug mới DSR-529: **DSR-657, DSR-658, DSR-659** (qa-ai, 90%) · BUG-1/BUG-5 529 = data (đóng nháp) · 529 <80% → DASHBOARD 🐞 · DSR-457/647/538 trạng thái Jira không đổi · Nguồn sự thật: Jira (sutrix.atlassian.net, project DSR)

## 🔔 Việc cần làm về bug
| # | Bug | Việc | Ai | Với ai | Hạn |
|---|---|---|---|---|---|
| 1 | DSR-457 | ✅ Ngọc đã trả lời 15/10 (61026, QA bỏ sót): #3 Not bug · #7 Can not fix (known limitation) · #13 chờ trang overlay DSR-587 · #6 → PM. Còn hỏi Ngọc: **R1** (field nào điều khiển icon NEW/UPDATE) – đã hỏi lại trong comment 61340 | Dat (nhắn Ngọc) | Ngoc | 20/10 |
| 2 | DSR-457 | Đuổi Quentin trả lời comment 61015 (webp, form gate catalog) – mặc định áp dụng nếu không trả lời trước 20/10 | Dat | Quentin (PM) | 20/10 |
| 3 | DSR-457 | ✅ #1 (16/10) + ✅ #10 (19/10) – đã comment 61475 (20/10) | — | — | xong |
| 4 | DSR-647 | Overlay merged main 20/10. QA-PT seed TD-587-14/15 (qa587-r1…r6, rel-a, off, rel-b – KHÔNG dùng qa501-*) tối 20/10 (Night Pack Việc 2–3) → JOB-20261019-03 (P3 trên qa587-rel-a, P2 trên qa587-rel-b) sáng 21/10 | QA-PT → Agent | — | 21/10 |

## Bug đang mở
| Jira | US | Tiêu đề | Sev | Trạng thái Jira | Assignee | Retest ở | Kết quả retest gần nhất | Việc kế tiếp (ai · hạn) |
|---|---|---|---|---|---|---|---|---|
| [DSR-457](https://sutrix.atlassian.net/browse/DSR-457) | DSR-360 | **Dismissed (Jira 21/10, Kohei)** – mục còn lại kiểm trong DSR-586 · Product Detail – Integrate issue (13 item) · ⚠ 20/10 CR DSR-585 bỏ `topBottomStopVariation` → item #12 (dòng dưới tên sản phẩm) không còn kỳ vọng hiển thị = thay đổi spec, không phải fail | Major | [Dev] In Testing (Jira 20/10) | Kohei Okumura (Jira 20/10) | DEV | 19/10 QA-PT: ✅ 10 · 16/10 QA-PT: ✅ 1 · 13/10 (QA-PT, có evidence): ✅ 2, 4, 5, 9, 11, 12, R2, R3, R4 · ❌ 3 (toolbar 5/6 icon), 7 (Youku: span play có trong DOM nhưng không hiện), 13 (link MOVIE = youtube.com/watch?v=movieid-01, STORY sai đích) · ❓ 6 (asset đã Published, ảnh vẫn vỡ → dev check), R1 (chưa biết field ngày) · ⚖️ 8 form gate (PM Quentin) · ⏳ 10 | R1 (Ngọc) · 61015 (Kohei – mặc định có hiệu lực 20/10) · #13 sau DSR-587 (overlay merge 20/10) |
| [DSR-647](https://sutrix.atlassian.net/browse/DSR-647) | DSR-501 | video-detail: relatedMovies không bao giờ hiển thị | High | [Dev] In Testing (Jira 22/10) | Dat (QA) | DEV main | ✅ JOB-20261019-03 (21/10): P3 rel-a 5 thẻ r6→r2, P2 rel-b 1 thẻ – comment 64798 | Dat chuyển Done (QA confirm DEV) · 22/10 |
| [DSR-657](https://sutrix.atlassian.net/browse/DSR-657) | DSR-529 | Article image block duplicated in UE / empty image block on Publish (TC 002) | Medium | [Dev] In Testing (Jira 22/10) | Dat (QA) | DEV | ✅ JOB-20261021-05: 1 block ảnh, 200, 0 block trống – comment 64794 | Dat chuyển Done · 22/10 |
| [DSR-658](https://sutrix.atlassian.net/browse/DSR-658) | DSR-529 | Tag chips not rendered (TC 006) | Medium | [Dev] In Testing (Jira 22/10) | Dat (QA) | DEV | ✅ JOB-20261021-05: 2 meta → 2 chip – comment 64795 | Dat chuyển Done · 22/10 |
| [DSR-659](https://sutrix.atlassian.net/browse/DSR-659) | DSR-529 | Thumbnail + related-article images relative /content/dam → 404 .live (TC 011, 013) | Medium | [Dev] In Testing (Jira 22/10) | Dat (QA) | DEV | ⚠ JOB-20261021-05: ảnh related ✅ tuyệt đối 200 · **thumbnail meta vẫn tương đối → 404** – comment 64797 | Dat trả lại Martin (Reopen/In Progress) · 22/10 |
| [DSR-660](https://sutrix.atlassian.net/browse/DSR-660) | DSR-529 | Info bar date YYYY/MM/DD ≠ YYYY.MM.DD (TC 007) | Low | [Dev] In Testing (Jira 22/10) | Dat (QA) | DEV | ✅ JOB-20261021-05 + IDLE-28: 2026.10.01 – comment 64796 | Dat chuyển Done · 22/10 |
| [DSR-665](https://sutrix.atlassian.net/browse/DSR-665) | DSR-587 | /{lang}/library/video/search reload vô hạn (VOV-013) | High | **Done 22/10** | Portal Martin | DEV | ✅ JOB-20261022-08 + IDLE-35 VOV-013 Pass | — (đã đóng) |
| [DSR-664](https://sutrix.atlassian.net/browse/DSR-664) | DSR-190 | Video block shows "null" when caption empty (+ DSR-662 ブースTOP) | — | [Dev] In Testing (giao lại Dat 18:14 JST) | Dat (QA) | DEV | ✅ JOB-20261022-16: VCAP-001..004 Pass (.page + .live; booth TOP/46 chỉ .page) | **Dat đóng** (comment sẵn DASHBOARD 🔔 P1, 211→221→231→31) · 22–23/10 |

### Bug chờ tạo ticket (QA đã phân loại = bug thật, chưa có Jira)
| Tạm ID | US | Tiêu đề | Sev đề xuất | Nguồn | Ghi chú |
|---|---|---|---|---|---|
| ~~PEND-529-01~~ | DSR-529 | → đã tạo **DSR-657** (21/10 07:45) | — | — | — |

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
| [DSR-648](https://sutrix.atlassian.net/browse/DSR-648) | DSR-552 | Breadcrumb UE preview thiếu trang cha | 2026-10-20 (Done) | DEV – Night 19/10 016 Pass (61473) |
| [DSR-651](https://sutrix.atlassian.net/browse/DSR-651) | DSR-552 | Breadcrumb display name dài → scroll ngang PC | 2026-10-20 (Done) | DEV – JOB-20261019-07 014 ja ×2 (61474) |
| [DSR-591](https://sutrix.atlassian.net/browse/DSR-591) | DSR-552 | Breadcrumb skips published ancestors missing from query-index.json | 2026-10-15 (Done) | DEV – JOB-06 (ja+en 8/8) + JOB-08 (chặn query-index vẫn đủ trail) |
| [DSR-613](https://sutrix.atlassian.net/browse/DSR-613) | DSR-552 | Question: HOME link /master/{lang} 404 | 2026-10-15 (Done – rút lại, không cần PM; HOME 404 = thiếu data top page) | — |
| [DSR-592](https://sutrix.atlassian.net/browse/DSR-592) | DSR-552 | Breadcrumb display name field missing | 2026-10-15 (Dismissed – not bug: field ở Universal Editor → Properties → ページ基本) | DEV Author (Dat) |
