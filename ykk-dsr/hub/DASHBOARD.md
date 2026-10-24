> 📌 Ngữ cảnh chung cho mọi session: [CONTEXT.md](CONTEXT.md)
# YKK DSR – QA Dashboard

> 🗣 **Daily standup hôm nay: [STANDUP.md](STANDUP.md)** (tự cập nhật 08:19 T2–T6)

> Cập nhật: 2026-10-24 07:50 (UTC+7, [schedule] morning, T7) · 23/10 17:25 evening · 12:10 [jira-sweep] · 07:50 [schedule] morning · 22/10 17:20 evening · 16:15 [jira-sweep] · 12:10 [jira-sweep] · 07:50 morning · trước đó 21/10 17:10 evening · Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10 (đã qua) → đích Done DEV 23/10** · Buffer ticket mới: 23, 26, 27/10 · Chi tiết: [PLAN](PLAN-sprint12.md) · [BUGS](BUGS.md) · [us/](us/)
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
| [DSR-529](https://sutrix.atlassian.net/browse/DSR-529) 記事詳細 | 🆕 Night 23/10: ARTICLE-001 ✅ · 032 ❌ → **DSR-677** · 005 ❌ → **DSR-678** (Profile chồng chữ, 24/10) · retest: ✅ 657/658/660 · ⚠ 659 thumbnail meta vẫn tương đối · 012/014 `category` rỗng, 016 robots, 023 (data/test) | JOB-20261022-02 (sửa locator + rerun) sáng nay · 659 trả Martin | Martin (659) | 23/10 |
| [DSR-653](https://sutrix.atlassian.net/browse/DSR-653) + [DSR-566](https://sutrix.atlassian.net/browse/DSR-566) ニュース詳細 | 5/18 ✅ · 🔄 sweep 16:05: Ngọc chuyển 566 → In Progress 18:01 JST (chưa comment); JOB-15: template `news-detail` có component sẵn (70%) · ⚠ **template news-article đã deploy DEV từ 19/10 (Ngọc, bị bỏ sót)** · ⚠ Quentin 22/10 11:54 JST comment 566+653 "Blocked by Missing News Article Template" – mâu thuẫn KNOWN-FACTS → Dat đính chính (🔔 P1) | **Jira 566 → [Dev] In Testing 18:25 JST** (Dat c.64906: template ✅ READY) · ✅ Night 22/10 TD-566-01 ja/en + 02 + NEWS-017 Pass → **JOB-20261016-08/-11 queue 23/10** | QA-PT | **23/10** (rút đề xuất Sprint 13) |
| 🆕 [DSR-590](https://sutrix.atlassian.net/browse/DSR-590) 環境配慮型製品 (giao Dat, [Dev] In Testing) | 16 TC có sẵn · Ngọc 21/10: Eco TOP xong, data demo, chỉ check layout · Figma mới 3351-51595 (Martin) | JOB-20261022-04 chạy ngay + chụp ảnh → L&F card cho Dat | — | 23/10 |
| 🆕 [DSR-664](https://sutrix.atlassian.net/browse/DSR-664) bug video block hiện "null" (Nakamoto tạo) | **[Dev] In Testing 17:52 JST (Martin nhận từ Ngọc 17:37)** · deploy dev/2026.10.22_2 08:52Z · liên kết DSR-662 c.64873 (null dưới related videos ブースTOP) · Quentin: DSR-558 blocked by 664 | ✅ **JOB-20261022-16 retest PASS 4/4** (VCAP-001..004, video.js đã fix) · Jira 18:14 JST giao lại Dat → **Dat đóng** (🔔 P1) | Dat | 22/10 |
| [DSR-611](https://sutrix.atlassian.net/browse/DSR-611) QA questions 動画・カタログ | Q4 Youku ID trả lời 22/10; Q1/Q2 Numata, Q3 Kohei | giữ mặc định; Youku seed JOB-23-02/03 | Numata · Kohei | đóng khi Q1–Q3 trả lời |
| [DSR-666](https://sutrix.atlassian.net/browse/DSR-666) bug eco TOP khoảng trắng breadcrumb→hero (590) | ✅ **Done 23/10** (JOB-20261023-12 Pass 5 viewport) · DSR-667 cũng Done | — | — | ✅ 23/10 |
| [DSR-669](https://sutrix.atlassian.net/browse/DSR-669)/[670](https://sutrix.atlassian.net/browse/DSR-670)/[671](https://sutrix.atlassian.net/browse/DSR-671) CF model refactor | 🆕 **[Dev] In Testing, giao Dat (24/10 00:27 JST)** · migration report Martin 23/10 16:15 · regression sau migrate (REG-1620/2020/0020/0420) **0 NEW FAIL** | **JOB-20261024-01** (publish-side 670 tech-talk, query 669, quan sát 671) queue · Author read-back **JOB-20261024-03 hold (cookie)** | Dat (cookie) | đóng khi 24-01 + 24-03 Pass (Claude báo) · 671 productLabel: Martin T2 26/10 · DSR-675 theo dõi |
Theo dõi (không giao Dat): DSR-590 (Ngọc) · **DSR-457 Dismissed 21/10 (Kohei) → mục OK cũ + #13 kiểm lại trong DSR-586** · DSR-503 Dismissed · DSR-585 → [STG] In Testing (Quentin; Sprint 12 chỉ DEV) · ⚠ **DSR-638 (Mayuka, In Progress): chuyển trang test-space ja sang URL chính thức** (list-catalog → /ja/library/catalog, video-list → /ja/library/video/search, product-list → /ja/product/…/product-index, article-list → /ja/library/article) – đường dẫn cũ sẽ 404 → automation 557/570/583/590 vỡ; IDLE-22 theo dõi · DSR-433 (⛔ SendGrid).

> ⚠ **T3 20/10:** overlay đã merge, Martin dọn folder → một số CF test bị xóa → tạo lại bằng TD-587 (PLAN "Night Pack 20/10"). **Product:** hỏng 12:12–13:50 JST do CR DSR-585 đổi model (−30/+9 field), Martin đã sửa – QA đang xác minh (JOB-20261020-07); field mới chưa hiển thị (chưa có design); catalog overlay đang được merge (Dat OK).

## 2. 🔔 Dat cần làm (T7 24/10 – chỉ việc thật sự cần)
| Ưu tiên | Việc | Với ai | Hạn | Nội dung gửi sẵn |
|---|---|---|---|---|
| 🆕 P1 | **Dán lại cookie Author** (login-token hết hạn từ 23/10 09:17Z → 3 job dừng needs-input: 23-11, 23-19, 23-24). Xong → move `jobs/hold/JOB-20261024-03.md` sang `jobs/queue/` (hoặc nhắn Claude) | VPS (Dat tự làm) | T7 24/10 hoặc T2 26/10 08:00 | Dán `AEM_LOGIN_TOKEN` vào `~/.dsr-secrets/aem-dev.env` (AUTHOR-AGENT §2b) → `bash ykk-dsr/hub/tools/author/probe.sh` check 1 = 200 |
| ℹ️ | TC job tự thêm DSR-669/670/671 vào backlog (sub-task TC DSR-679/680/681, 24/10 09:15) – không cần Dat làm gì | – | – | – |
| 🆕 P2 | DSR-669/670/671 đã giao Dat (In Testing) – **chưa đóng**, chờ JOB-20261024-01 + -03 | Jira | T2 26/10 | Claude soạn comment đóng khi job Pass |
| P2 | Hỏi Ngọc 2 điểm block 570: CATDL-009 + CATDL-011 (nếu chưa gửi 23/10) | Ngọc | T2 26/10 | "Hi Ngọc, DSR-570 on DEV (22/10 night run): (1) the download-form demo is still not bound to the catalog CF (TC 9.0 blocked); (2) submitting the form sends no POST to *.hubspot.com / *.hsforms.com (TC 11–13 blocked). When will the CF binding and HubSpot integration be on DEV?" |
| P2 | Duyệt (session Điều phối) 🐞 < 80% (bảng dưới) | claude-web | T2 26/10 | – |
| P2 | Gửi Martin tin 📣 (câu 1 + 3) nếu chưa gửi | Martin | T2 26/10 | xem cuối mục 📣 |
Đã xong 23/10: đóng DSR-664 ✅ · DSR-666 Done ✅ · Agent Author TD-587 ✅. **Done DEV đề xuất hôm nay: không có** (529/566/570/586/587/654 còn bug Medium mở hoặc job cookie).

## 3. 🌙 QA part-time – Night 23/10 (T6): pack đã tạo · T7/CN QA-PT nghỉ
**Pack:** [Night Work Pack 2026-10-23](https://docs.google.com/document/d/1oeDv45dho3IKj8JLhf1WPdT54iT8AU_vOstol04PGsI/edit) · ảnh → [Evidence_20261023](https://drive.google.com/drive/folders/1jvGRvqVBDesUM9GxBoqhXwh49TTVQOfy) · ~3h45, 13 dòng report.
Thứ tự (theo PLAN "Night Pack 23/10 – CHỐT 17:00"): (1) TD-587-04 · (2) TD-587-05 · (3) CATDL-008 · (4) ARTICLE-032 (qa529-02, UE tự lưu → trả before) · (5) AUDIT-CHROME-16/20 · (6) manual tồn: DSR-BREAD-016/013/012/026/024 → ARTICLE-001/005 (trang mới `qa529-tc01`).
Sáng T7 07:45: đọc Night Report → TD-587-04+05 Pass → JOB-20261023-19 queue · ARTICLE-032/005 có dòng → JOB-20261023-23 queue. Night 22/10: 17 Pass / 2 Fail / 4 Blocked (chi tiết git log).

## 4. 🤖 Agents
| Lane | Hàng đợi (24/10 07:50) | Hold |
|---|---|---|
| claude-code | **JOB-20261024-01** (669/670/671 publish-side) → **JOB-20261024-02** (sửa test VOV-005 fixture, 557 TZ Asia/Tokyo, NEWS-007 query-index) → JOB-ZZ-IDLE-44 (regression + scaffold) · regression guard 4h tự xếp | **JOB-20261024-03** (Author read-back 669/587/529 – chờ cookie) |
| codex | JOB-ZZ-IDLE-45 (visual + Lighthouse + watch DSR-678) | – |
Đêm 23/10: REG-0020 + REG-0420 claude-code **0 NEW FAIL** (461 test: 297/51/113; fail đều đã biết, cause none; 566 baseline đầu tiên 14/8/2) · codex 0 NEW FAIL (36 pass, 18 Lighthouse) · JOB-23-19: VOV-004 ✅, VOV-005 ❌ = fixture cũ (test) · JOB-23-24: live meta qa529-02 khớp, Author chưa verify (cookie) · không agent treo (running trống) · upload-queue: 0 fail.

**Lane chrome (23/10 15:47):** ✅ JOB-20261023-16 (566 xóa Image/Button rỗng qa566-news-02 + Publish live) done, 3 ghi, 0 blocked → verify JOB-20261023-17 vào queue · JOB-20261023-18 (587) vẫn hold FREEZE · CHROME_DEVICE_ID = 8eea8eec (DSR-QA).

**Lane chrome (23/10 16:56):** ✅ JOB-20261023-20 (529 manual) – 4.0 Pass đề xuất · 21.0 Fail đề xuất (picker không giới hạn stories, không max 3 – cần đối chiếu spec) · 32.0 một phần (Title bắt buộc OK; 掲載日/サムネイル/カテゴリ không có dấu bắt buộc). 3 ghi, mọi giá trị đã trả lại. JOB-20261023-18 (587) chrome không chạy kịp → chuyển vào Night Pack 23/10 (mục 1–2).

**Lane chrome (24/10 00:40):** ✅ JOB-20261023-23 (529) – qa529-02 thumbnail đã khôi phục · picker trắng không tái hiện · **ARTICLE-005 Fail đề xuất: Profile chữ Company và Text chồng nhau (live + UE)** → ứng viên bug ≥ 80% · verify JOB-20261023-24 vào queue.

## 5. TC (Jira sub-task `qa-tc`)
tc-backlog: Night TC job 24/10 11:20: done 3/3 (669, 670, 671) · upload queue pending 2 / fail 0 · auto-added 0 · job agent đã xếp 1 (JOB-20261024-06) · TC backlog trống 2026-10-24 11:20 (row 0 hold) · tc-questions: Q48–Q50 (671 open questions, giữ mặc định) · data TD-671-01..03 (en, lane chrome/author T2 26/10)

## 🐞 Bug < 80% – Dat chốt
| Nháp | Tiêu đề | % | Thiếu gì để ≥ 80% | Đề xuất |
|---|---|---|---|---|
| 🆕 BUG-CAT-LIST-JA (557/654) | /ja/library/catalog 0 thẻ, không có response `dsr-catalog-list` trong 45s (JOB-22-20 + IDLE-38); en 5–6 thẻ | 50% | Chỉ 2 lần đo cùng tối; QA-PT SHADOW-TD-654 mở ja list không báo lỗi; JSON ja chưa kiểm | JOB-20261023-01 (3 lần + JSON trực tiếp) → vẫn 0 + JSON có item → bug 80% (Martin) |
| 🆕 CATDL-004 (570) | Form tải tài liệu: lỗi bắt buộc hiện dạng popup từng ô thay vì message cạnh ô | 50% | 1 screenshot; có thể là tooltip HTML5 mặc định; Figma C10 chưa final | Giữ; xem screenshot + hỏi Ngọc kiểu lỗi mong muốn khi HubSpot form xong (cùng tin 🔔 P2) |
| 🆕 NEWS-BACK (566) | Không có link 一覧へ戻る / Back to list trên trang news (cả document, ja/en) | 70% | JOB-23-08: chỉ có link ニュース ở header; chưa rõ template có yêu cầu (TC 2.0/6.0, Toan comment 30/09 #1) | Giữ; hỏi Ngọc cùng lúc 566 L&F |
| 🆕 REG-VOV-EN (587/557) | /en/library/video/search 200 but "Unable to load video information.", no cards – **intermittent, 3 windows**: REG-1200 05:18Z 23/10 (VOV-011/013 en) · REG-0820-codex 01:25Z 24/10 (1440+390, title `search`→`YKK DIGITAL SHOWROOM`) · JOB-20261024-05 02:39Z (recovered ~1 min); `dsr-video-list` en = 30 items when OK; ja never seen | 60% (guard 24/10 12:20) | Failing `dsr-video-list`/GraphQL response never captured (status/body) → cause unknown (FE fetch vs publish GraphQL/CDN); cloud guard cannot reach DEV | JOB-ZY-REG-20261024-1220-claude-code step 3 (20× probe + HAR) + 1220-codex (3× capture): ≥ 1 fail with captured response → bug ≥ 80% Martin (FE list block → Ngọc if JS error) |
| REG-CATV-TZ (557) | CATV-018/019 ja+en: NEW/UPDATE badge vs test today() JST, browser TZ Berlin; TZ Tokyo → 6/6 pass (REG-0020 + REG-0420) | 10% (test) | – | Claude chốt test issue → **JOB-20261024-02** sửa `timezoneId` |
| NEWS-012 (566) | My List / share không hiện – class `no-mylist no-share` có sẵn trong trang (option component) | 15% (data) | Có thể là mặc định của template | Agent Author bỏ tick 2 option trên qa566-news-01 (manifest TD-566-FIX2, cần cookie) |
| 🆕 671-LABEL (586/671) | `productLabel` không có dạng `{productId}｜{productName}` (stored id hoặc null, 12 product) | 50% | Có thể chỉ áp dụng khi CF được lưu lại / label phía Author | ✅ Đã hỏi 23/10 – Martin kiểm cuối tuần / sáng T2 26/10 (Dat OK) |
| 🆕 ARTICLE-021 (529) | Picker 関連ストーリー chọn được trang ngoài stories (test-space) và không chặn mục thứ 4; help text "chỉ hiển thị 3 mục đầu" | 50% | Có thể by design (giới hạn ở hiển thị) | Dat/Martin chốt: by design → sửa TC |
| BUG-CAT-FORM-EN (570/654) → **CB-1 client (DSR-655)** | en catalog form hiển thị tiếng Nhật (CATDL-016 en) | 70% | Chưa rõ HubSpot form en đã có GUID (DSR-655 L1) | Giữ; câu 4b trong tin Martin |
| BUG-CAT-PDF-EXPOSE (570) → **CB-2 client (DSR-655 Y4)** | `dsr-catalog-list` trả `pdfAsset._publishUrl` cho catalog requiresForm=true (CATDL-007) | 70% | Chờ Quentin TC 007 (gating có là yêu cầu bảo mật) | Giữ; "phải ẩn" → bug 90% |
| BUG-OVL-INACTIVE (587/586/654) | 表示フラグ OFF: kiểm end-to-end | 50% | TD-587-07 chưa seed (Not run 22/10) | Giữ; chờ Agent Author |
Đã xử lý 24/10 07:50: 1 bug ≥ 80% → **DSR-678** (ARTICLE-005) · ARTICLE-032 → DSR-677 (Night review 23/10) · VOV-005 + NEWS-007 = test (JOB-20261024-02).

## ✅ Overlay 404 – xong nguyên nhân (21/10 15:40)
Dev fix auto-generate trang khi Publish DSR CF (từ 08:25 UTC 21/10) + data QA sai (tên node, movieId, r5→r6, 表示フラグ, thiếu rel-b). Quy tắc mới trong BL-OVL-1 "Update 2026-10-21". Sửa trong pack 21/10.

## 📣 Báo Martin – merge/incident
| URL | Triệu chứng | cause | Job | Evidence |
|---|---|---|---|---|
| (còn mở 21/10) isActive OFF · config 404 last-modified 20/10 | — | none | JOB-20261021-06 | results/JOB-20261021-06/raw/ |
Không có fail mới với cause ≠ none (24/10 07:50 – REG-0020/0420 0 NEW FAIL, DSR-678 cause none). Dòng cũ 22/10 đã đóng (DSR-665, og:image, catalog list, 659) – xem git log.
Tin gửi sẵn (Dat copy):
```
Hi Martin, two open questions from the DEV runs (read-only):
1) Is an English HubSpot form configured for the /en catalog overlay pages? /en/library/catalog/qa190-cat-pdf-form currently renders the Japanese form (labels, options, consent).
~~2) Should a DSR CF that is only Previewed (not Published) render on .aem.page? qa654-preview (catalog) shows the catalog list and 990586002 (product) returns 404 on .aem.page. We are verifying the replication state this morning and will file a bug if the data is correct.~~ ✅ đã trả lời 23/10 (DSR-674 by design) – KHÔNG gửi
3) The public 404 config.json still shows last-modified 20/10 – is the 404 page config deployed on DEV?
Thanks!
```
