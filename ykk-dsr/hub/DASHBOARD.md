> 📌 Ngữ cảnh chung cho mọi session: [CONTEXT.md](CONTEXT.md)
# YKK DSR – QA Dashboard

> 🗣 **Daily standup hôm nay: [STANDUP.md](STANDUP.md)** (tự cập nhật 08:19 T2–T6)

> Cập nhật: 2026-10-22 07:50 (UTC+7, [schedule] morning) · trước đó 21/10 17:10 evening · Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10 (hôm nay)** · Buffer ticket mới: 23, 26, 27/10 · Chi tiết: [PLAN](PLAN-sprint12.md) · [BUGS](BUGS.md) · [us/](us/)
> Lượt tự động 07:45 / 17:10 cập nhật file này. Giữ gọn: chỉ trạng thái hiện tại, lịch sử nằm trong git log và us/*.md.

## 1. Ticket đang giao Dat: 10 mở (Jira 21/10 16:40) – 566 + 653 tính là 1 việc · ✅ Done 20/10: DSR-552, DSR-648, DSR-651
> Bối cảnh 21/10: overlay 404 đã rõ nguyên nhân (dev fix auto-gen trang 08:25 UTC + data QA sai) → **Night 21/10 sửa data** (pack v3) → agent sáng 22/10 → **Done 22/10 giữ**.
| Ticket | Trạng thái | Kế hoạch (khi nào) | Blocked / đang đợi ai | Done DEV đích |
|---|---|---|---|---|
| [DSR-587](https://sutrix.atlassian.net/browse/DSR-587) 動画詳細 Overlay | Night 21/10 data ✅ (verify JOB-21-09) · JOB-20-02: 1.0/18.0 ✅, 3.0 ❌ og:image `about:error` (65%), 13.0 ❌ **🐞 DSR-665** video/search reload vô hạn · visual 19.0 ✅ (JOB-20-11) · 17.0 6 fail (4 test, 1 data, 1 og:image) | JOB-20261022-01 (fixture 173 + 538) sáng nay · DSR-665 chờ Martin | Martin (DSR-665, og:image) | 23/10 (rủi ro DSR-665) |
| [DSR-647](https://sutrix.atlassian.net/browse/DSR-647) bug related movies (retest) | ✅ retest Pass 2/2 (JOB-19-03), comment 64798 | Dat chuyển Done hôm nay | — | ✅ 22/10 |
| [DSR-538](https://sutrix.atlassian.net/browse/DSR-538) bug link publish domain (retest) | ✅ JOB-20261022-01 Pass (.page + .live, 5 card) | Dat đóng hôm nay | — | ✅ 22/10 |
| [DSR-557](https://sutrix.atlassian.net/browse/DSR-557) 動画・カタログ | video 16/16 ✅ (qa587-main + qa557-dam) · catalog 12 ✅ 2 skip (017: requiresForm=false – data) | Night 22/10 BUGCHK-190-FORM → JOB-20261022-03 23/10 | QA-PT (data) | 23/10 |
| [DSR-570](https://sutrix.atlassian.net/browse/DSR-570) 資料DL | 5 ✅ thêm (JOB-20-04) · 11 skip: catalog `-form` requiresForm=false (data) · manual 6 TC chưa chạy | Night 22/10 BUGCHK-190-FORM + manual 6 TC → JOB-20261022-03 | QA-PT · Quentin (TC 007) | 23/10 |
| [DSR-654](https://sutrix.atlassian.net/browse/DSR-654) CATALOG Overlay (sub-task 586) | 21 TC + automation CATOV-001..021 (JOB-21-11): 11 ✅ 2 ❌ (data) 49 skip (chưa seed TD-654-02..08) · ⚠ catalog-detail.js: non-form → mở file thẳng → TC 1/12/15/17/19 có thể sai kỳ vọng | Night 22/10 TD-654-02..08 + BUGCHK-190-FORM → JOB-20261022-03 · visual JOB-21-12 queue | QA-PT | 23/10 |
| [DSR-586](https://sutrix.atlassian.net/browse/DSR-586) 製品詳細 Overlay | JOB-20-03: 11/11 skip – 990586001 overlay `unavailable \| no-product` (data), 990586002 DSR CF chưa Preview (lỗi pack v3) | Night 22/10 BUGCHK-586-01/02 → JOB-20261022-03 23/10 | QA-PT | 23/10 |
| [DSR-529](https://sutrix.atlassian.net/browse/DSR-529) 記事詳細 | retest: ✅ 657/658/660 · ⚠ 659 thumbnail meta vẫn tương đối · 012/014 `category` rỗng, 016 robots, 023 (data/test) | JOB-20261022-02 (sửa locator + rerun) sáng nay · 659 trả Martin | Martin (659) | 23/10 |
| [DSR-653](https://sutrix.atlassian.net/browse/DSR-653) + [DSR-566](https://sutrix.atlassian.net/browse/DSR-566) ニュース詳細 | 5/18 ✅ · ⚠ **template news-article đã deploy DEV từ 19/10 (Ngọc, bị bỏ sót)** | Night 22/10 tạo TD-566-01/02 → JOB-20261016-08/-11 sáng 23/10 | QA-PT | **23/10** (rút đề xuất Sprint 13) |
| 🆕 [DSR-590](https://sutrix.atlassian.net/browse/DSR-590) 環境配慮型製品 (giao Dat, [Dev] In Testing) | 16 TC có sẵn · Ngọc 21/10: Eco TOP xong, data demo, chỉ check layout · Figma mới 3351-51595 (Martin) | JOB-20261022-04 chạy ngay + chụp ảnh → L&F card cho Dat | — | 23/10 |
| 🆕 [DSR-664](https://sutrix.atlassian.net/browse/DSR-664) bug video block hiện "null" (Nakamoto tạo, giao Dat) | To Do | JOB-20261022-05 repro + viết check retest | Dev (chưa gán) | theo dõi |
Theo dõi (không giao Dat): DSR-590 (Ngọc) · **DSR-457 Dismissed 21/10 (Kohei) → mục OK cũ + #13 kiểm lại trong DSR-586** · DSR-503 Dismissed · DSR-585 → [STG] In Testing (Quentin; Sprint 12 chỉ DEV) · ⚠ **DSR-638 (Mayuka, In Progress): chuyển trang test-space ja sang URL chính thức** (list-catalog → /ja/library/catalog, video-list → /ja/library/video/search, product-list → /ja/product/…/product-index, article-list → /ja/library/article) – đường dẫn cũ sẽ 404 → automation 557/570/583/590 vỡ; IDLE-22 theo dõi · DSR-433 (⛔ SendGrid).

> ⚠ **T3 20/10:** overlay đã merge, Martin dọn folder → một số CF test bị xóa → tạo lại bằng TD-587 (PLAN "Night Pack 20/10"). **Product:** hỏng 12:12–13:50 JST do CR DSR-585 đổi model (−30/+9 field), Martin đã sửa – QA đang xác minh (JOB-20261020-07); field mới chưa hiển thị (chưa có design); catalog overlay đang được merge (Dat OK).

## 2. 🔔 Dat cần làm
| Ưu tiên | Việc | Với ai | Hạn | Nội dung gửi sẵn |
|---|---|---|---|---|
| P1 | **Đính chính với Quentin: DSR-566 KHÔNG cần dời Sprint 13** – template news-article đã có (Ngọc 19/10) → QA test tối 22/10, đích 23/10 | Quentin (+Ngọc) | 22/10 sáng | xem tin trong chat |
| P2 | Trả lời Ngọc DSR-590: QA đang check layout Eco TOP (kết quả 22/10 chiều) | Ngọc | 22/10 | "Thanks Ngọc, QA is checking the Eco TOP layout today and will update this ticket." |
| P1 | Chuyển **Done** 4 bug đã retest Pass DEV (comment QA đã có): DSR-647, DSR-657, DSR-658, DSR-660 | Jira (Dat là assignee) | 22/10 sáng | "QA confirm DEV – fixed (see comment)." |
| P1 | Trả **DSR-659** lại Martin (thumbnail meta vẫn tương đối → 404 .live; ảnh related đã OK) | Martin | 22/10 sáng | xem comment 64797 trong DSR-659 + tin 📣 |
| P1 | Gửi Martin tin 📣 (DSR-665 mới High + og:image + catalog list + 2 câu hỏi cũ) | Martin | 22/10 sáng | xem cuối mục 📣 |
| P1 | Night Pack 22/10: thêm **việc sửa data BUGCHK-586-01/02 + BUGCHK-190-FORM** (PLAN "Night Pack 22/10") TRƯỚC negative 586/587 + TD-654-02..08 + 570 manual | QA-PT (pack 17:10) | 22/10 tối | PLAN-sprint12.md mục Night Pack 22/10 |
| P2 | **Author agent P0′:** chạy lại `tools/author/probe.sh` trên VPS → báo dòng "Cookie age" + check 1 | — | 22/10 sáng | AUTHOR-AGENT.md §2b |
| P2 | Trả lời 4 câu hỏi tool author của JOB-20261021-10 (đề xuất mặc định: đổi tên sp test → `qa586-…`; thêm `lang_pair: false` + lý do; ref TD-190 → `/content/dam/common/{lang}/catalogs/{id}`; điền productCategories/applications/media01Asset) – duyệt trong session Điều phối | claude-web | 22/10 | results/JOB-20261021-10/summary.md "Open questions" |
| P3 | Re-baseline câu hỏi DSR-654: catalog-detail.js live gửi catalog không form thẳng tới file, e-book gated (DSR-655 Y3) → TC 1/12/15/17/18/19 cần chốt (Q47 mở rộng) | Martin/Quentin | 23/10 | "Is opening the file directly (no detail page) intended for non-form catalogs?" |

## 3. 🌙 QA part-time – Night 21/10 ✅ (đã xử lý) · Night 22/10 cần sửa data
Night Report: không có dòng mới sau 21/10 (đã đọc). Agent verify (JOB-20261021-09) phát hiện 2 lỗi data dù báo Pass: **TD-586-02** chưa Preview (lỗi câu chữ pack v3), catalog `-form` requiresForm=false (JOB-20-04) + 990586001 không resolve product (JOB-20-03). → Night 22/10 làm BUGCHK trước.

## 4. 🤖 Agents
| Lane | Hàng đợi | Hold |
|---|---|---|
| claude-code | **JOB-20261022-01** (587 fixture 173 + retest 538) · **JOB-20261022-02** (529 locator + rerun) · IDLE-30 (regression ngày + theo dõi URL DSR-638) | -22-03 (586/557/570/654 sau BUGCHK Night 22/10) · -16-08 (566 ← template) |
| codex | JOB-20261021-12 (654 visual, chuyển từ hold) · IDLE-31 (Lighthouse 587/529/catalog + visual sau đổi tên) | -16-11 (566 visual ← template) |
Kết quả đêm 21/10 (11 job, 0 treo, upload-queue 0 fail): 19-03 ✅ 647 · 20-02 video 557 ✅, 587 DSR-665 + og:image · 20-03 586 skip (data) · 20-04 catalog data · 20-11 587 visual ✅ · 21-05 retest 529 · 21-09 verify data · 21-10 tool author D8–D11 (4 câu hỏi) · 21-11 654 automation · IDLE-28 regression 139✅/63❌ (53 như cũ) · IDLE-29 baseline trước đổi tên.

## 5. TC (Jira sub-task `qa-tc`)
tc-backlog: 2/2 done 21/10 (529 re-baseline, DSR-654 21 TC) · backlog trống · auto-added 0 (Jira connector timeout 20:07/21:06 – lượt 18:05 22/10 thử lại) · tc-questions: không câu mới sau Q47.

## 🐞 Bug < 80% – Dat chốt
| Nháp | Tiêu đề | % | Thiếu gì để ≥ 80% | Đề xuất |
|---|---|---|---|---|
| BUG-OVL-INACTIVE (587/586/654) | 表示フラグ OFF: json2html 200 + `unavailable \| inactive`, không redirect list (BL-OVL-1) | 50% | Chưa quan sát end-to-end; Martin chưa trả lời | Giữ; Night 22/10 seed TD-587-07 `qa587-inactive` → agent 23/10 |
| BUG-OVL-OGIMG (587, cả catalog) | Raw `og:image` = `about:error` trên mọi trang overlay QA (og:image:secure_url đúng 200) – VOV-003, MOVIE-029 | 65% | Mọi CF test dùng thumbnail `image 7.png` (có dấu cách) → chưa loại trừ data | Hỏi Martin (📣); nếu cần: QA-PT đổi thumbnail 1 CF sang tên không dấu cách → agent so sánh |
| BUG-CAT-EMPTY (654/557/570) | Trang catalog overlay 200 nhưng block catalog-detail rỗng (không title/field/nút) – IDLE-30 22 test | 70% | Chưa loại trừ data requiresForm (BUGCHK-190-FORM) | JOB-ZZ-IDLE-32 chẩn đoán hôm nay; hỏi Martin (📣) |
| BUG-CAT-LIST-OLD (557/654) | Catalog list vẫn trả 15 CF folder cũ `ykk/common/product-cf/test`, ja/en cùng 26 thẻ (không lọc ngôn ngữ) | 55% | Chưa rõ list đã lên overlay chưa (BL-OVL-1 20/10 12:40) | Hỏi Martin (📣) |
Đã xử lý 22/10: VOV-013 → **DSR-665** (85%) · 586/570/557 fail = data (Night 22/10) · CATOV-003 en .live 404 = data.

## ✅ Overlay 404 – xong nguyên nhân (21/10 15:40)
Dev fix auto-generate trang khi Publish DSR CF (từ 08:25 UTC 21/10) + data QA sai (tên node, movieId, r5→r6, 表示フラグ, thiếu rel-b). Quy tắc mới trong BL-OVL-1 "Update 2026-10-21". Sửa trong pack 21/10.

## 📣 Báo Martin – merge/incident
| URL | Triệu chứng | cause | Job | Evidence |
|---|---|---|---|---|
| /{ja,en}/library/video/search (.page + .live) | overlay trả video-detail not-found → video-detail.js:238 redirect về chính URL → reload vô hạn, trang trắng → **DSR-665** | overlay-merge | JOB-20261020-02 | results/JOB-20261020-02/evidence/DSR-VOV-013_en.png |
| mọi trang overlay QA (video + catalog) | raw og:image = `about:error`; og:image:secure_url 200 | overlay-merge (65%) | JOB-20261020-02 | evidence/DSR-VOV-003_{ja,en}.png, DSR-MOVIE-029_en.png |
| /{ja,en}/library/catalog (list) | còn 15 CF folder cũ, ja/en cùng 26 thẻ; thẻ gated cũ trùng id với CF mới không gated | overlay-merge (55%/30%) | JOB-20261020-04 | results/DSR-570/DEV/automation-run-20261021-job20261020-04.md |
| /{ja,en}/library/article/stories/qa529-01 | DSR-659: thumbnail meta vẫn `/content/dam/…` tương đối → 404 .live | none | JOB-20261021-05 | results/DSR-529/DEV/automation-run-20261021-job05.md |
| (còn mở 21/10) isActive OFF không redirect · config 404 last-modified 20/10 | — | none | JOB-20261021-06 | results/JOB-20261021-06/raw/ |
Tin gửi sẵn (Dat copy):
```
Hi Martin, results from last night's DEV runs (read-only):
1) New bug DSR-665 (High): /ja|en/library/video/search is served by the video overlay as a "not-found" detail; video-detail.js:238 redirects to backListUrl() = the same URL, so the page reloads endlessly and stays blank (.page and .live). BL-OVL-1 excludes search/tech-talk from the overlay route.
2) DSR-659 is partly fixed: related-article images are absolute and 200 now, but the thumbnail meta on qa529-01 is still a relative /content/dam/... path (404 on .aem.live). I moved it back to you.
3) og:image on every overlay page is "about:error" while og:image:secure_url is fine. Our test CFs all use a thumbnail named "image 7.png" (with a space) - could the space be the cause, or is og:image built differently?
4) Catalog list still returns the 15 old CFs from /content/dam/ykk/common/product-cf/test and shows the same 26 cards on ja and en. Is the list already on the overlay / language-filtered, or still to come?
5) Still open from yesterday: isActive OFF redirect to the list, and the 404 config deploy (public config.json last-modified 20/10).
Thanks!
```
