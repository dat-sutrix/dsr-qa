> 📌 Ngữ cảnh chung cho mọi session: [CONTEXT.md](CONTEXT.md)
# YKK DSR – QA Dashboard

> 🗣 **Daily standup hôm nay: [STANDUP.md](STANDUP.md)** (tự cập nhật 08:19 T2–T6)

> Cập nhật: 2026-10-22 17:20 (UTC+7, [schedule] evening) · 16:15 [jira-sweep] · 12:10 [jira-sweep] · 07:50 morning · trước đó 21/10 17:10 evening · Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10 (hôm nay)** · Buffer ticket mới: 23, 26, 27/10 · Chi tiết: [PLAN](PLAN-sprint12.md) · [BUGS](BUGS.md) · [us/](us/)
> Lượt tự động 07:45 / 17:10 cập nhật file này. Giữ gọn: chỉ trạng thái hiện tại, lịch sử nằm trong git log và us/*.md.

## 1. Ticket đang giao Dat: 10 mở (Jira 21/10 16:40) – 566 + 653 tính là 1 việc · ✅ Done 20/10: DSR-552, DSR-648, DSR-651
> Bối cảnh 21/10: overlay 404 đã rõ nguyên nhân (dev fix auto-gen trang 08:25 UTC + data QA sai) → **Night 21/10 sửa data** (pack v3) → agent sáng 22/10 → **Done 22/10 giữ**.
| Ticket | Trạng thái | Kế hoạch (khi nào) | Blocked / đang đợi ai | Done DEV đích |
|---|---|---|---|---|
| [DSR-587](https://sutrix.atlassian.net/browse/DSR-587) 動画詳細 Overlay | Night 21/10 data ✅ (verify JOB-21-09) · JOB-20-02: 1.0/18.0 ✅, 3.0 ❌ og:image `about:error` (65%), 13.0 ❌→✅ **DSR-665 Done 22/10** (retest Pass JOB-20261022-08) · visual 19.0 ✅ (JOB-20-11) · 17.0 6 fail (4 test, 1 data, 1 og:image) | JOB-20261022-01 ✅ · ⚠ Quentin 22/10 11:43 JST comment "Blocked by DSR-665" → 665 đã Done, Dat báo Quentin (🔔 P1) | Martin (og:image) · data negative Night 22/10 | 23/10 |
| [DSR-647](https://sutrix.atlassian.net/browse/DSR-647) bug related movies (retest) | ✅ retest Pass 2/2 (JOB-19-03), comment 64798 | ✅ Done 22/10 (Jira) | — | ✅ 22/10 |
| [DSR-538](https://sutrix.atlassian.net/browse/DSR-538) bug link publish domain (retest) | ✅ JOB-20261022-01 Pass (.page + .live, 5 card) | ✅ Done 22/10 (Jira) | — | ✅ 22/10 |
| [DSR-557](https://sutrix.atlassian.net/browse/DSR-557) 動画・カタログ | video 16/16 ✅ (qa587-main + qa557-dam) · catalog 12 ✅ 2 skip (017: requiresForm=false – data) | Night 22/10 BUGCHK-190-FORM → JOB-20261022-03 23/10 | QA-PT (data) | 23/10 |
| [DSR-570](https://sutrix.atlassian.net/browse/DSR-570) 資料DL | 5 ✅ thêm (JOB-20-04) · 11 skip: catalog `-form` requiresForm=false (data) · manual 6 TC chưa chạy | Night 22/10 BUGCHK-190-FORM + manual 6 TC → JOB-20261022-03 | QA-PT · Quentin (TC 007) | 23/10 |
| [DSR-654](https://sutrix.atlassian.net/browse/DSR-654) CATALOG Overlay (sub-task 586) | 21 TC + automation CATOV-001..021 (JOB-21-11): 11 ✅ 2 ❌ (data) 49 skip (chưa seed TD-654-02..08) · ⚠ catalog-detail.js: non-form → mở file thẳng → TC 1/12/15/17/19 có thể sai kỳ vọng | Night 22/10 TD-654-02..08 + BUGCHK-190-FORM → JOB-20261022-03 · visual JOB-21-12 queue | QA-PT | 23/10 |
| [DSR-586](https://sutrix.atlassian.net/browse/DSR-586) 製品詳細 Overlay | JOB-20-03: 11/11 skip – 990586001 overlay `unavailable \| no-product` (data), 990586002 DSR CF chưa Preview (lỗi pack v3) | Night 22/10 BUGCHK-586-01/02 → JOB-20261022-03 23/10 | QA-PT | 23/10 |
| [DSR-529](https://sutrix.atlassian.net/browse/DSR-529) 記事詳細 | retest: ✅ 657/658/660 · ⚠ 659 thumbnail meta vẫn tương đối · 012/014 `category` rỗng, 016 robots, 023 (data/test) | JOB-20261022-02 (sửa locator + rerun) sáng nay · 659 trả Martin | Martin (659) | 23/10 |
| [DSR-653](https://sutrix.atlassian.net/browse/DSR-653) + [DSR-566](https://sutrix.atlassian.net/browse/DSR-566) ニュース詳細 | 5/18 ✅ · 🔄 sweep 16:05: Ngọc chuyển 566 → In Progress 18:01 JST (chưa comment); JOB-15: template `news-detail` có component sẵn (70%) · ⚠ **template news-article đã deploy DEV từ 19/10 (Ngọc, bị bỏ sót)** · ⚠ Quentin 22/10 11:54 JST comment 566+653 "Blocked by Missing News Article Template" – mâu thuẫn KNOWN-FACTS → Dat đính chính (🔔 P1) | **Jira 566 → [Dev] In Testing 18:25 JST** (Dat c.64906: template ✅ READY) · Night 22/10 pack Việc 3 tạo TD-566-01/02 → JOB-20261016-08/-11 sáng 23/10 | QA-PT | **23/10** (rút đề xuất Sprint 13) |
| 🆕 [DSR-590](https://sutrix.atlassian.net/browse/DSR-590) 環境配慮型製品 (giao Dat, [Dev] In Testing) | 16 TC có sẵn · Ngọc 21/10: Eco TOP xong, data demo, chỉ check layout · Figma mới 3351-51595 (Martin) | JOB-20261022-04 chạy ngay + chụp ảnh → L&F card cho Dat | — | 23/10 |
| 🆕 [DSR-664](https://sutrix.atlassian.net/browse/DSR-664) bug video block hiện "null" (Nakamoto tạo) | **[Dev] In Testing 17:52 JST (Martin nhận từ Ngọc 17:37)** · deploy dev/2026.10.22_2 08:52Z · liên kết DSR-662 c.64873 (null dưới related videos ブースTOP) · Quentin: DSR-558 blocked by 664 | ✅ **JOB-20261022-16 retest PASS 4/4** (VCAP-001..004, video.js đã fix) · Jira 18:14 JST giao lại Dat → **Dat đóng** (🔔 P1) | Dat | 22/10 |
Theo dõi (không giao Dat): DSR-590 (Ngọc) · **DSR-457 Dismissed 21/10 (Kohei) → mục OK cũ + #13 kiểm lại trong DSR-586** · DSR-503 Dismissed · DSR-585 → [STG] In Testing (Quentin; Sprint 12 chỉ DEV) · ⚠ **DSR-638 (Mayuka, In Progress): chuyển trang test-space ja sang URL chính thức** (list-catalog → /ja/library/catalog, video-list → /ja/library/video/search, product-list → /ja/product/…/product-index, article-list → /ja/library/article) – đường dẫn cũ sẽ 404 → automation 557/570/583/590 vỡ; IDLE-22 theo dõi · DSR-433 (⛔ SendGrid).

> ⚠ **T3 20/10:** overlay đã merge, Martin dọn folder → một số CF test bị xóa → tạo lại bằng TD-587 (PLAN "Night Pack 20/10"). **Product:** hỏng 12:12–13:50 JST do CR DSR-585 đổi model (−30/+9 field), Martin đã sửa – QA đang xác minh (JOB-20261020-07); field mới chưa hiển thị (chưa có design); catalog overlay đang được merge (Dat OK).

## 2. 🔔 Dat cần làm
| Ưu tiên | Việc | Với ai | Hạn | Nội dung gửi sẵn |
|---|---|---|---|---|
| P1 | **Đóng DSR-664** – retest Pass 4/4 (JOB-20261022-16): comment rồi transitions 211 → 221 → 231 → 31 | Jira | 22/10 tối / 23/10 sáng | "QA confirm DEV – fixed. Retest 22/10 (JOB-20261022-16, .page + .live, en): no \"null\" text in the video block (authored block, booth TOP code-built video, video-detail and product-detail controls). Served video.js last-modified 2026-10-22 09:07 GMT. Booth TOP + product 46 verified on .page only (.live 404). Report: dsr-qa ykk-dsr/hub/results/DSR-664/DEV/automation-run-20261022-rerun-job16.md" |
| P2 | Duyệt (session Điều phối) 2 điểm 70% mới của catalog – xem 🐞 BUG-CAT-FORM-EN, BUG-CAT-PDF-EXPOSE (+ noindex 40%, qa654-preview 50%) | claude-web | 23/10 | – |
| P2 | Nếu Night 22/10 Việc 7/8 (TD-587 âm, Youku) = Not run → 23/10 08–18 giao **Agent Author** phần tên `qa*` (TD-587-07/02/06/12 + TD-557-YOUKU; manifest có sẵn cho Youku) – cần review + bật cờ trong session Điều phối | claude-web + Dat | 23/10 | – |
| P2 | Cảm ơn Quentin DSR-611 (Youku ID đã nhận; Q1/Q2 chờ Numata, Q3 chờ Kohei) – data `qa557-youku` theo TD-557-YOUKU | Quentin | 23/10 | "Thanks Quentin – QA will use Youku ID XNTgyNzE1ODE5Ng== (movie 345) for TC 3.0/7.0/11.0. Q1/Q2: waiting for Numata-san; Q3: @Kohei Okumura please confirm. Until then QA keeps the defaults in this ticket." |
| ~~P1~~ | ~~Trả lời Quentin DSR-587 + DSR-566/653~~ ✅ đã trả lời 22/10 15:00 JST (c.64866/64867/64868) – KHÔNG gửi lại | | | |
| P2 | Trả lời Ngọc DSR-590: QA đang check layout Eco TOP (kết quả 22/10 chiều) | Ngọc | 22/10 | "Thanks Ngọc, QA is checking the Eco TOP layout today and will update this ticket." |
| ~~P1~~ | ~~Chuyển Done 647/657/658/660~~ ✅ đã làm 22/10 13:29 JST (+538, 665) | | | |
| ~~P1~~ | ~~Trả DSR-659 lại Martin~~ ✅ đã làm 22/10 13:40 JST (comment 64851) – chờ Martin | | | |
| P2 | Gửi Martin tin 📣 – **chỉ còn 4b (form en tiếng Nhật) + 404 config** (1–5 cũ đã xử lý, KHÔNG gửi) | Martin | 23/10 sáng | xem cuối mục 📣 |
| ~~P1~~ | ~~Night Pack 22/10~~ ✅ đã tạo 17:20 (xem 🌙) | | | |
| P2 | **Author agent P0′:** chạy lại `tools/author/probe.sh` trên VPS → báo dòng "Cookie age" + check 1 | — | 22/10 sáng | AUTHOR-AGENT.md §2b |
| P2 | Trả lời 4 câu hỏi tool author của JOB-20261021-10 (đề xuất mặc định: đổi tên sp test → `qa586-…`; thêm `lang_pair: false` + lý do; ref TD-190 → `/content/dam/common/{lang}/catalogs/{id}`; điền productCategories/applications/media01Asset) – duyệt trong session Điều phối | claude-web | 22/10 | results/JOB-20261021-10/summary.md "Open questions" |
| P3 | Re-baseline câu hỏi DSR-654: catalog-detail.js live gửi catalog không form thẳng tới file, e-book gated (DSR-655 Y3) → TC 1/12/15/17/18/19 cần chốt (Q47 mở rộng) | Martin/Quentin | 23/10 | "Is opening the file directly (no detail page) intended for non-form catalogs?" |

## 3. 🌙 QA part-time – Night 22/10 (T5) · [Night Work Pack 2026-10-22](https://docs.google.com/document/d/1_ZmmosDXtIHqO8FTnQTR_L-qIhMg-R9fYKYGBahfgrM) (17:10 tạo – không tạo lại) · ~4h25 + dự phòng
Thứ tự: (1) BUGCHK-586-01/02 25' · (2) shadow check SHADOW-190-FORM + SHADOW-TD-654 10' · (3) TD-566-01 ja/en + 02 + DSR-NEWS-017 80' · (4) TD-654-03/05 35' · (5) 570 manual 6 TC 45' · (6) TD-586-01 en + TD-586-05/06/07/08/09/11 70' · **dự phòng** (7) TD-587-07/02/06/10/08/05/04/12 75' · (8) TD-557-YOUKU 30'. 34 dòng report, Evidence_20261022 (Drive 1zE4Xj-kDYdZywN13l-o0fm_HHW6-erFR). Night Report: không có dòng mới sau 21/10. [Giả định] TD-587 âm sau mốc 4h25 → nhiều khả năng Not run → fallback Agent Author 23/10 (🔔 P2).

## 4. 🤖 Agents
| Lane | Hàng đợi | Hold |
|---|---|---|
| claude-code | (trống – IDLE-35 xong 09:37Z; ≤ 4 job/lượt đã dùng cho hold + codex) | **-22-03** (586/557/570 ← BUGCHK-586 + SHADOW-190-FORM) · **-22-17** (586 âm ← TD-586-*) · **-22-18** (587 âm ← TD-587-*, có thể Not run) · **-22-19** (654 CATOV-006/010 ← TD-654-03/05) · -16-08 (566 ← TD-566-01/02) |
| codex | **JOB-20261022-20** (catalog list capture ja/en PC+SP sau chuyển `dsr-catalog-list`) | -16-11 (566 visual ← TD-566-01) |
Kết quả hôm nay 22/10 (đọc 6 job mới nhất): **JOB-16 ✅ DSR-664 Pass 4/4** · JOB-13 og:image 0 `about:error` ✅, ARTICLE-011 re-baseline ✅, isActive OFF redirect browser ✅ (qa654), 16 fail = data (title -form) + noindex 40% · JOB-14 spec catalog sửa xong, list `dsr-catalog-list` ja 6/en 5 ✅; 2 điểm 70% mới (🐞) · JOB-10 trước republish (đã giải quyết bởi JOB-12/14) · IDLE-35 regression 541: 281✅/63❌/197 skip – mới fail NEWS-001/004 en (data 40%), ECO-005/006 (demo/test) · IDLE-36 Lighthouse: catalog detail mobile 57/67 (< 95, chưa có ngưỡng Sprint 12 – ghi nhận). **0 fail cause ≠ none → không có mục 📣 mới. 0 bug ≥ 80%.**

## 5. TC (Jira sub-task `qa-tc`)
tc-backlog: 2/2 done 21/10 (529 re-baseline, DSR-654 21 TC) · backlog trống · auto-added 0 (Jira connector timeout 20:07/21:06 – lượt 18:05 22/10 thử lại) · tc-questions: không câu mới sau Q47.

## 🐞 Bug < 80% – Dat chốt
| Nháp | Tiêu đề | % | Thiếu gì để ≥ 80% | Đề xuất |
|---|---|---|---|---|
| ~~BUG-OVL-INACTIVE~~ ✅ không phải bug (Martin 22/10: redirect ở browser) → JOB-20261022-13 kiểm bằng browser | | | | |
| (cũ) BUG-OVL-INACTIVE (587/586/654) | 表示フラグ OFF: json2html 200 + `unavailable \| inactive`, không redirect list (BL-OVL-1) | 50% | Chưa quan sát end-to-end; Martin chưa trả lời | Giữ; Night 22/10 seed TD-587-07 `qa587-inactive` → agent 23/10 |
| ~~BUG-OVL-OGIMG~~ ✅ Martin fix PR #206 (22/10) – cần republish DSR CF → JOB-11/12 agent republish → JOB-13 retest | | | | |
| ~~(cũ) BUG-OVL-OGIMG~~ ✅ **đóng 22/10 17:10**: JOB-13 + IDLE-35 – 0 trang `about:error`, VOV-003/MOVIE-029 Pass | | | | |
| ~~BUG-CAT-EMPTY~~ ✅ đóng (IDLE-32) | Không phải bug: `-form` CF requiresForm=false (data) + qa190-cat-pdf non-form redirect PDF theo thiết kế (test sai kỳ vọng) | 5% | — | KHÔNG báo Martin; sửa data BUGCHK-190-FORM + sửa kỳ vọng CATOV-001/015/019 |
| ~~BUG-CAT-LIST-OLD~~ ✅ Martin 22/10: list chuyển sang overlay data (`dsr-catalog-list`), đang deploy – list rỗng trên DEV tới khi Martin ping; kỳ vọng ja 6 / en 5 thẻ | | | | |
| ~~(cũ) BUG-CAT-LIST-OLD~~ ✅ **đóng 22/10 17:10**: JOB-14 – list dùng `dsr-catalog-list`, ja 6 / en 5 thẻ | | | | |
| 🆕 BUG-CAT-FORM-EN (570/654) | en catalog overlay form (qa190-cat-*-form) hiện nhãn, lựa chọn, consent, nút ダウンロードする bằng tiếng Nhật – CATDL-016 en (JOB-14 + IDLE-35, 2 lần) | 70% | Chưa rõ HubSpot form en đã có GUID chưa (DSR-655 L1 mở) – nếu chưa có form en thì là thiếu config, không phải bug code | Giữ; Dat hỏi Martin 1 câu trong tin tiếp theo: "Is an English HubSpot form configured for /en catalog overlay pages? The en page currently renders the Japanese form." – có form en → tạo bug (Ngọc) |
| 🆕 BUG-CAT-PDF-EXPOSE (570) | `dsr-catalog-list` trả `pdfAsset._publishUrl` cho catalog requiresForm=true (qa190-cat-pdf-form) → URL PDF gated lộ ra trình duyệt – CATDL-007 ja (JOB-10, -14, IDLE-35) | 70% | Trùng TC 007 đang chờ Quentin (gating có phải yêu cầu bảo mật không) – KHÔNG tạo trùng | Giữ tới khi Quentin trả lời TC 007; trả lời "phải ẩn" → bug 90% (Martin) |
| 🆕 BUG-CAT-PREVIEW (654) | qa654-preview (DSR CF chỉ Preview) trên .aem.page không hiện 'QA654 preview' – CATOV-009 (JOB-10, -14) | 50% | So sánh tối nay: 990586002 (BUGCHK-586-02) + qa587-preview (TD-587-02). Cả 3 overlay cùng lỗi → 80% (Martin) | Chờ JOB-22-03/-18 sáng 23/10 |
| 🆕 BUG-CAT-NOINDEX (654) | Trang catalog overlay non-form `robots=noindex`, không có trong sitemap, không có dòng requiresForm khi false – CATOV-002/021 | 40% | Trang non-form tự redirect sang file (by design IDLE-32) → noindex có thể là chủ ý | Đề xuất: coi là by design, sửa kỳ vọng CATOV-002/021 cho non-form (Dat OK/NG) |
Đã xử lý 22/10: VOV-013 → **DSR-665** (85%) · 586/570/557 fail = data (Night 22/10) · CATOV-003 en .live 404 = data.

## ✅ Overlay 404 – xong nguyên nhân (21/10 15:40)
Dev fix auto-generate trang khi Publish DSR CF (từ 08:25 UTC 21/10) + data QA sai (tên node, movieId, r5→r6, 表示フラグ, thiếu rel-b). Quy tắc mới trong BL-OVL-1 "Update 2026-10-21". Sửa trong pack 21/10.

## 📣 Báo Martin – merge/incident
| URL | Triệu chứng | cause | Job | Evidence |
|---|---|---|---|---|
| ~~/{ja,en}/library/video/search (.page + .live) | overlay trả video-detail not-found → video-detail.js:238 redirect về chính URL → reload vô hạn, trang trắng → **DSR-665** | overlay-merge | JOB-20261020-02 | results/JOB-20261020-02/evidence/DSR-VOV-013_en.png~~ ✅ DSR-665 Done 22/10 |
| ~~mọi trang overlay QA (video + catalog) | raw og:image = `about:error`~~ ✅ fix PR #206 + republish JOB-12, JOB-13 0 lỗi | | | |
| ~~/{ja,en}/library/catalog (list) – CF cũ~~ ✅ JOB-14 `dsr-catalog-list` ja 6/en 5 | | | |
| ~~qa529-01 thumbnail meta tương đối (DSR-659)~~ ✅ by design (Martin 22/10), 659 Done | | | |
| (còn mở 21/10) isActive OFF không redirect · config 404 last-modified 20/10 | — | none | JOB-20261021-06 | results/JOB-20261021-06/raw/ |
Tin gửi sẵn (Dat copy):
```
Hi Martin, results from last night's DEV runs (read-only):
~~1) New bug DSR-665 (High): /ja|en/library/video/search is served by the video overlay as a "not-found" detail; video-detail.js:238 redirects to backListUrl() = the same URL, so the page reloads endlessly and stays blank (.page and .live). BL-OVL-1 excludes search/tech-talk from the overlay route.~~ ✅ đã fix DSR-665 Done 22/10 – KHÔNG gửi
~~2) DSR-659 is partly fixed: related-article images are absolute and 200 now, but the thumbnail meta on qa529-01 is still a relative /content/dam/... path (404 on .aem.live). I moved it back to you.~~ ✅ đã gửi qua Jira DSR-659 comment 64851 – KHÔNG gửi lại
~~3) og:image …~~ ✅ đã fix (PR #206) – KHÔNG gửi
~~4) Catalog list …~~ ✅ đã chuyển `dsr-catalog-list` – KHÔNG gửi
4b) (mới 22/10) Is an English HubSpot form configured for the /en catalog overlay pages? /en/library/catalog/qa190-cat-pdf-form currently renders the Japanese form (labels, options, consent).
~~5) isActive OFF~~ ✅ browser redirect OK (JOB-13) · còn: 404 config deploy (public config.json last-modified 20/10) – gửi nếu chưa hỏi
Thanks!
```
