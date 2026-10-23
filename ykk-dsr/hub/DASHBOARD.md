> 📌 Ngữ cảnh chung cho mọi session: [CONTEXT.md](CONTEXT.md)
# YKK DSR – QA Dashboard

> 🗣 **Daily standup hôm nay: [STANDUP.md](STANDUP.md)** (tự cập nhật 08:19 T2–T6)

> Cập nhật: 2026-10-23 12:10 (UTC+7, [jira-sweep]) · 07:50 [schedule] morning · 22/10 17:20 evening · 16:15 [jira-sweep] · 12:10 [jira-sweep] · 07:50 morning · trước đó 21/10 17:10 evening · Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10 (đã qua) → đích Done DEV 23/10** · Buffer ticket mới: 23, 26, 27/10 · Chi tiết: [PLAN](PLAN-sprint12.md) · [BUGS](BUGS.md) · [us/](us/)
> Lượt tự động 07:45 / 17:10 cập nhật file này. Giữ gọn: chỉ trạng thái hiện tại, lịch sử nằm trong git log và us/*.md.

## 1. Ticket đang giao Dat: 10 mở (Jira 21/10 16:40) – 566 + 653 tính là 1 việc · ✅ Done 20/10: DSR-552, DSR-648, DSR-651
> Bối cảnh 21/10: overlay 404 đã rõ nguyên nhân (dev fix auto-gen trang 08:25 UTC + data QA sai) → **Night 21/10 sửa data** (pack v3) → agent sáng 22/10 → **Done 22/10 giữ**.
| Ticket | Trạng thái | Kế hoạch (khi nào) | Blocked / đang đợi ai | Done DEV đích |
|---|---|---|---|---|
| [DSR-587](https://sutrix.atlassian.net/browse/DSR-587) 動画詳細 Overlay | Night 21/10 data ✅ (verify JOB-21-09) · JOB-20-02: 1.0/18.0 ✅, 3.0 ❌ og:image `about:error` (65%), 13.0 ❌→✅ **DSR-665 Done 22/10** (retest Pass JOB-20261022-08) · visual 19.0 ✅ (JOB-20-11) · 17.0 6 fail (4 test, 1 data, 1 og:image) | JOB-20261022-01 ✅ · ⚠ Quentin 22/10 11:43 JST comment "Blocked by DSR-665" → 665 đã Done, Dat báo Quentin (🔔 P1) | TD-587 âm Night 22/10 = **Not run** → JOB-22-18 giữ hold, fallback Agent Author (🔔 P2) | 23/10 |
| [DSR-647](https://sutrix.atlassian.net/browse/DSR-647) bug related movies (retest) | ✅ retest Pass 2/2 (JOB-19-03), comment 64798 | ✅ Done 22/10 (Jira) | — | ✅ 22/10 |
| [DSR-538](https://sutrix.atlassian.net/browse/DSR-538) bug link publish domain (retest) | ✅ JOB-20261022-01 Pass (.page + .live, 5 card) | ✅ Done 22/10 (Jira) | — | ✅ 22/10 |
| [DSR-557](https://sutrix.atlassian.net/browse/DSR-557) 動画・カタログ | video 16/16 ✅ · catalog 12 ✅ 2 skip (017 data) · SHADOW-190-FORM ✅ · TD-557-YOUKU Not run | JOB-20261022-03 queue · Youku → Agent Author (🔔 P2) | QA-PT/Agent Author | 23/10 |
| [DSR-570](https://sutrix.atlassian.net/browse/DSR-570) 資料DL | manual Night 22/10: 008 ✅ · 004 ❌ popup lỗi từng ô (≠ "message next to field", 50% → 🐞) · 009 Blocked (demo chưa gắn CF – Ngọc) · 011 Blocked (không có POST HubSpot – EX-06/07) → 012/013 Blocked · SHADOW-190-FORM ✅ | JOB-20261022-03 queue (11 skip cũ) | Ngọc (009/011) · Quentin (007) | 23/10 (Blocked có owner) |
| [DSR-654](https://sutrix.atlassian.net/browse/DSR-654) CATALOG Overlay (sub-task 586) | Night 22/10 ✅ TD-654-03/05 + SHADOW-TD-654 · ⚠ ja list 0 thẻ (JOB-22-20 + IDLE-38) | **JOB-20261022-19 + JOB-20261023-01 (recheck list ja) queue** | Agent | 23/10 |
| [DSR-586](https://sutrix.atlassian.net/browse/DSR-586) 製品詳細 Overlay | Night 22/10 ✅ BUGCHK-586-01, TD-586-01 en, 05/06/07/08/09/11 Pass · ❌ BUGCHK-586-02: 990586002 .page 404 (.live 404) → BUG-CAT-PREVIEW 70% | **JOB-20261022-03 + -17 queue 23/10 sáng** | Agent | 23/10 |
| [DSR-529](https://sutrix.atlassian.net/browse/DSR-529) 記事詳細 | retest: ✅ 657/658/660 · ⚠ 659 thumbnail meta vẫn tương đối · 012/014 `category` rỗng, 016 robots, 023 (data/test) | JOB-20261022-02 (sửa locator + rerun) sáng nay · 659 trả Martin | Martin (659) | 23/10 |
| [DSR-653](https://sutrix.atlassian.net/browse/DSR-653) + [DSR-566](https://sutrix.atlassian.net/browse/DSR-566) ニュース詳細 | 5/18 ✅ · 🔄 sweep 16:05: Ngọc chuyển 566 → In Progress 18:01 JST (chưa comment); JOB-15: template `news-detail` có component sẵn (70%) · ⚠ **template news-article đã deploy DEV từ 19/10 (Ngọc, bị bỏ sót)** · ⚠ Quentin 22/10 11:54 JST comment 566+653 "Blocked by Missing News Article Template" – mâu thuẫn KNOWN-FACTS → Dat đính chính (🔔 P1) | **Jira 566 → [Dev] In Testing 18:25 JST** (Dat c.64906: template ✅ READY) · ✅ Night 22/10 TD-566-01 ja/en + 02 + NEWS-017 Pass → **JOB-20261016-08/-11 queue 23/10** | QA-PT | **23/10** (rút đề xuất Sprint 13) |
| 🆕 [DSR-590](https://sutrix.atlassian.net/browse/DSR-590) 環境配慮型製品 (giao Dat, [Dev] In Testing) | 16 TC có sẵn · Ngọc 21/10: Eco TOP xong, data demo, chỉ check layout · Figma mới 3351-51595 (Martin) | JOB-20261022-04 chạy ngay + chụp ảnh → L&F card cho Dat | — | 23/10 |
| 🆕 [DSR-664](https://sutrix.atlassian.net/browse/DSR-664) bug video block hiện "null" (Nakamoto tạo) | **[Dev] In Testing 17:52 JST (Martin nhận từ Ngọc 17:37)** · deploy dev/2026.10.22_2 08:52Z · liên kết DSR-662 c.64873 (null dưới related videos ブースTOP) · Quentin: DSR-558 blocked by 664 | ✅ **JOB-20261022-16 retest PASS 4/4** (VCAP-001..004, video.js đã fix) · Jira 18:14 JST giao lại Dat → **Dat đóng** (🔔 P1) | Dat | 22/10 |
| [DSR-611](https://sutrix.atlassian.net/browse/DSR-611) QA questions 動画・カタログ | Q4 Youku ID trả lời 22/10; Q1/Q2 Numata, Q3 Kohei | giữ mặc định; Youku seed JOB-23-02/03 | Numata · Kohei | đóng khi Q1–Q3 trả lời |
| 🆕 [DSR-666](https://sutrix.atlassian.net/browse/DSR-666) bug eco TOP khoảng trắng breadcrumb→hero (590) | **Ngọc fixed + build DEV, [Dev] In Testing giao Dat 12:36 JST (10:36 VN)** · IDLE-41 04:17Z: gap 0 px (CHANGED) | **JOB-20261023-12 (codex) queue** retest → Pass → Dat đóng (🔔 P1) | Agent → Dat | 23/10 |
| 🆕 [DSR-669](https://sutrix.atlassian.net/browse/DSR-669)/[670](https://sutrix.atlassian.net/browse/DSR-670)/[671](https://sutrix.atlassian.net/browse/DSR-671) CF model refactor (Martin/Kohei, không giao Dat) | tạo 23/10, Sprint 12 | khi deploy DEV: regression overlay toàn bộ + cập nhật Agent Author models/manifest + fixtures | Martin · Kohei | escalate – xem FORECAST · 23/10: 669 deploy 14:21 VN, **670 deploy 15:25 VN** (b33514f); chờ Martin "fixed" → JOB-23-11 · 🆕 [DSR-675](https://sutrix.atlassian.net/browse/DSR-675) (22 meta product overlay, To Do) → TC thêm vào 586 khi giao QA |
Theo dõi (không giao Dat): DSR-590 (Ngọc) · **DSR-457 Dismissed 21/10 (Kohei) → mục OK cũ + #13 kiểm lại trong DSR-586** · DSR-503 Dismissed · DSR-585 → [STG] In Testing (Quentin; Sprint 12 chỉ DEV) · ⚠ **DSR-638 (Mayuka, In Progress): chuyển trang test-space ja sang URL chính thức** (list-catalog → /ja/library/catalog, video-list → /ja/library/video/search, product-list → /ja/product/…/product-index, article-list → /ja/library/article) – đường dẫn cũ sẽ 404 → automation 557/570/583/590 vỡ; IDLE-22 theo dõi · DSR-433 (⛔ SendGrid).

> ⚠ **T3 20/10:** overlay đã merge, Martin dọn folder → một số CF test bị xóa → tạo lại bằng TD-587 (PLAN "Night Pack 20/10"). **Product:** hỏng 12:12–13:50 JST do CR DSR-585 đổi model (−30/+9 field), Martin đã sửa – QA đang xác minh (JOB-20261020-07); field mới chưa hiển thị (chưa có design); catalog overlay đang được merge (Dat OK).

## 2. 🔔 Dat cần làm
| Ưu tiên | Việc | Với ai | Hạn | Nội dung gửi sẵn |
|---|---|---|---|---|
| ~~P1~~ | ~~**Đóng DSR-664** (Jira vẫn [Dev] In Testing) – retest Pass 4/4 (JOB-20261022-16): comment rồi transitions 211 → 221 → 231 → 31 | Jira | 23/10 sáng | "QA confirm DEV – fixed. Retest 22/10 (JOB-20261022-16, .page + .live, en): no \"null\" text in the video block (authored block, booth TOP code-built video, video-detail and product-detail controls). Served video.js last-modified 2026-10-22 09:07 GMT. Booth TOP + product 46 verified on .page only (.live 404). Report: dsr-qa ykk-dsr/hub/results/DSR-664/DEV/automation-run-20261022-rerun-job16.md"~~ ✅ DSR-664 Done 23/10 09:12 – xong |
| ~~P1~~ | ~~**Duyệt Agent Author** cho TD-587 âm + TD-557-YOUKU~~ ✅ đã làm – JOB-20261023-03 PASS (25 writes) – KHÔNG cần | claude-web | – | – |
| P2 | Hỏi Ngọc 2 điểm block 570: CATDL-009 (demo chưa gắn catalog CF) + CATDL-011 (form không POST tới HubSpot) | Ngọc | 23/10 | "Hi Ngọc, DSR-570 on DEV (22/10 night run): (1) the download-form demo is still not bound to the catalog CF (TC 9.0 blocked); (2) submitting the form sends no POST to *.hubspot.com / *.hsforms.com (TC 11–13 blocked). When will the CF binding and HubSpot integration be on DEV?" |
| P2 | Duyệt (session Điều phối) 🐞 < 80%: BUG-CAT-PREVIEW 70% (mới tăng), BUG-CAT-LIST-JA 50% (mới), CATDL-004 50% (mới) + 4 điểm cũ | claude-web | 23/10 | – |
| 🆕 P1 | **Đóng DSR-666** khi JOB-20261023-12 Pass (Claude báo): comment rồi transitions 211 → 221 → 231 → 31 | Jira | 23/10 chiều | "QA confirm DEV – fixed. Retest 23/10 (JOB-20261023-12, .live + .page, 1440/428/393/390/375 px): no extra white space between breadcrumb and hero banner. Thanks Ngọc." |
| P2 | Gửi Martin tin 📣 – 4b (form en tiếng Nhật) + 404 config (~~preview overlay~~ ✅ đã trả lời DSR-674 by design 23/10 – bỏ câu 2) | Martin | 23/10 | xem cuối mục 📣 |
| P2 | Cảm ơn Quentin DSR-611 (Youku ID) – nếu chưa gửi 22/10 | Quentin | 23/10 | "Thanks Quentin – QA will use Youku ID XNTgyNzE1ODE5Ng== (movie 345) for TC 3.0/7.0/11.0. Q1/Q2: waiting for Numata-san; Q3: @Kohei Okumura please confirm. Until then QA keeps the defaults in this ticket." |
| ~~P3~~ | ~~Re-baseline câu hỏi DSR-654: catalog non-form mở file thẳng (Q47) – "Is opening the file directly … intended for non-form catalogs?"~~ ✅ đã trả lời KNOWN-FACTS 23/10 (Dat 11:52: by design) – KHÔNG gửi | – | – | – |
| P3 | 4 câu hỏi tool author JOB-20261021-10 + Author probe (đã chạy 22/10 15:49, cookie age 0h ✅) | claude-web | 23/10 | results/JOB-20261021-10/summary.md |

## 3. 🌙 QA part-time – Night 22/10 (T5) kết quả · Night 23/10 (T6): 17:10 tạo pack
Night 22/10: **23 dòng mới** – Pass 17 (BUGCHK-586-01, SHADOW-190-FORM, SHADOW-TD-654, NEWS-017, TD-566-01 ja/en, TD-566-02, TD-654-03/05, CATDL-008, TD-586-01 en/05/06/07/08/09/11) · Fail 2 (BUGCHK-586-02, CATDL-004) · Blocked 4 (CATDL-009/011/012/013) · Not run: DSR-587 (TD-587 âm), DSR-557 (Youku). Pack Night 23/10 (17:10) phải có: (1) nếu JOB-22-03 xác nhận 990586002 DSR CF chưa Preview → BUGCHK-586-02 làm lại (Preview DSR CF, mở .page) · (2) TD-587 âm/Youku nếu Agent Author không được duyệt.

## 4. 🤖 Agents
| Lane | Hàng đợi (23/10 07:50) | Hold |
|---|---|---|
| claude-code | **JOB-20261022-03** (586/557/570) → **-22-17** (586 âm) → **-22-19** (654 CATOV-006/010) → **-16-08** (566 news) → IDLE-39 (regression) | -22-18 (587 âm – Not run) |
| codex | **JOB-20261016-11** (566 visual) → **JOB-20261023-01** (recheck ja catalog list) → IDLE-40 (LH + baseline trang seed 22/10) | – |
Kết quả mới từ 22/10 17:10 (3 job + 1 probe): **JOB-22-20** capture catalog list: en 5 thẻ ✅ (YYYY.MM.DD, ảnh 200, SP không tràn) · **ja 0 thẻ** (không có response dsr-catalog-list 45s) · **IDLE-37** spec 566 sang template mới, tsc ✅, dry run 24 skip (test-news-detail-template 404) · **IDLE-38** baseline: article/video OK, catalog ja 0 / en 6 (kỳ vọng 5) · **Author probe** 15:49 ✅ (cookie 0h, 16/16 HTTP 200). Không job treo (running trống). upload-queue fail 0. **0 fail cause ≠ none.**

**Lane chrome (23/10 15:47):** ✅ JOB-20261023-16 (566 xóa Image/Button rỗng qa566-news-02 + Publish live) done, 3 ghi, 0 blocked → verify JOB-20261023-17 vào queue · JOB-20261023-18 (587) vẫn hold FREEZE · CHROME_DEVICE_ID = 8eea8eec (DSR-QA).

## 5. TC (Jira sub-task `qa-tc`)
tc-backlog: trống (row 0 hold) · Night TC job 22/10: 18:09/19:06 Jira OK, auto-added 0 · 20:07/21:11 Atlassian CONNECT_TIMEOUT (retry 23/10 18:05) · upload pending 0 / fail 0 · tc-questions: không câu mới sau Q47.

## 🐞 Bug < 80% – Dat chốt
| Nháp | Tiêu đề | % | Thiếu gì để ≥ 80% | Đề xuất |
|---|---|---|---|---|
| ~~BUG-CAT-PREVIEW (654/586)~~ ✅ by design (Martin 23/10, DSR-674 Dismissed) | Overlay DSR CF chỉ Preview không hiện trên .aem.page: catalog qa654-preview → list (JOB-10/-14 + SHADOW-TD-654), **product 990586002 → 404 (.page + .live, BUGCHK-586-02 22/10)** | 70% | Chưa xác minh DSR CF 990586002 thật sự đã Preview (data QA-PT); video qa587-preview chưa seed | JOB-20261022-03 ghi replication props → Preview OK + vẫn 404 → bug 85% (Martin) |
| 🆕 BUG-CAT-LIST-JA (557/654) | /ja/library/catalog 0 thẻ, không có response `dsr-catalog-list` trong 45s (JOB-22-20 + IDLE-38); en 5–6 thẻ | 50% | Chỉ 2 lần đo cùng tối; QA-PT SHADOW-TD-654 mở ja list không báo lỗi; JSON ja chưa kiểm | JOB-20261023-01 (3 lần + JSON trực tiếp) → vẫn 0 + JSON có item → bug 80% (Martin) |
| 🆕 CATDL-004 (570) | Form tải tài liệu: lỗi bắt buộc hiện dạng popup từng ô thay vì message cạnh ô | 50% | 1 screenshot; có thể là tooltip HTML5 mặc định; Figma C10 chưa final | Giữ; xem screenshot + hỏi Ngọc kiểu lỗi mong muốn khi HubSpot form xong (cùng tin 🔔 P2) |
| 🆕 NEWS-BACK (566) | Không có link 一覧へ戻る / Back to list trên trang news (cả document, ja/en) | 70% | JOB-23-08: chỉ có link ニュース ở header; chưa rõ template có yêu cầu (TC 2.0/6.0, Toan comment 30/09 #1) | Giữ; hỏi Ngọc cùng lúc 566 L&F |
| NEWS-012 (566) | My List / share không hiện – class `no-mylist no-share` có sẵn trong trang (option component) | 15% (data) | Có thể là mặc định của template | Agent Author bỏ tick 2 option trên qa566-news-01 (manifest TD-566-FIX2, cần cookie) |
| BUG-CAT-FORM-EN (570/654) → **CB-1 client (DSR-655)** | en catalog form hiển thị tiếng Nhật (CATDL-016 en) | 70% | Chưa rõ HubSpot form en đã có GUID (DSR-655 L1) | Giữ; câu 4b trong tin Martin |
| BUG-CAT-PDF-EXPOSE (570) → **CB-2 client (DSR-655 Y4)** | `dsr-catalog-list` trả `pdfAsset._publishUrl` cho catalog requiresForm=true (CATDL-007) | 70% | Chờ Quentin TC 007 (gating có là yêu cầu bảo mật) | Giữ; "phải ẩn" → bug 90% |
| ~~BUG-CAT-NOINDEX (654)~~ ✅ by design (Dat 23/10) | non-form catalog `robots=noindex`, không trong sitemap (CATOV-002/021) | 40% | non-form redirect file by design → có thể chủ ý | Đề xuất coi by design, sửa kỳ vọng (Dat OK/NG) |
| BUG-OVL-INACTIVE (587/586/654) | 表示フラグ OFF: kiểm end-to-end | 50% | TD-587-07 chưa seed (Not run 22/10) | Giữ; chờ Agent Author |
Đã xử lý 23/10: 0 bug ≥ 80% · CATDL-009/011/012/013 = Blocked có owner (Ngọc), không phải fail.

## ✅ Overlay 404 – xong nguyên nhân (21/10 15:40)
Dev fix auto-generate trang khi Publish DSR CF (từ 08:25 UTC 21/10) + data QA sai (tên node, movieId, r5→r6, 表示フラグ, thiếu rel-b). Quy tắc mới trong BL-OVL-1 "Update 2026-10-21". Sửa trong pack 21/10.

## 📣 Báo Martin – merge/incident
| URL | Triệu chứng | cause | Job | Evidence |
|---|---|---|---|---|
| (còn mở 21/10) isActive OFF · config 404 last-modified 20/10 | — | none | JOB-20261021-06 | results/JOB-20261021-06/raw/ |
Không có fail mới với cause ≠ none (23/10 07:50). Dòng cũ 22/10 đã đóng (DSR-665, og:image, catalog list, 659) – xem git log.
Tin gửi sẵn (Dat copy):
```
Hi Martin, two open questions from the DEV runs (read-only):
1) Is an English HubSpot form configured for the /en catalog overlay pages? /en/library/catalog/qa190-cat-pdf-form currently renders the Japanese form (labels, options, consent).
~~2) Should a DSR CF that is only Previewed (not Published) render on .aem.page? qa654-preview (catalog) shows the catalog list and 990586002 (product) returns 404 on .aem.page. We are verifying the replication state this morning and will file a bug if the data is correct.~~ ✅ đã trả lời 23/10 (DSR-674 by design) – KHÔNG gửi
3) The public 404 config.json still shows last-modified 20/10 – is the 404 page config deployed on DEV?
Thanks!
```
