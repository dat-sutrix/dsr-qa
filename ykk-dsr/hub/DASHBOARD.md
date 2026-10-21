# YKK DSR – QA Dashboard

> 🗣 **Daily standup hôm nay: [STANDUP.md](STANDUP.md)** (tự cập nhật 08:19 T2–T6)

> Cập nhật: 2026-10-21 07:45 (UTC+7, [schedule] morning) · Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10** · Buffer ticket mới: 23, 26, 27/10 · Chi tiết: [PLAN](PLAN-sprint12.md) · [BUGS](BUGS.md) · [us/](us/)
> Lượt tự động 07:45 / 17:10 cập nhật file này. Giữ gọn: chỉ trạng thái hiện tại, lịch sử nằm trong git log và us/*.md.

## 1. Ticket đang giao Dat: 10 mở (Jira 21/10 13:40) – 566 + 653 tính là 1 việc · ✅ Done 20/10 (Jira xác nhận): DSR-552, DSR-648, DSR-651
| Ticket | Trạng thái | Kế hoạch (khi nào) | Blocked / đang đợi ai | Done DEV đích |
|---|---|---|---|---|
| [DSR-557](https://sutrix.atlassian.net/browse/DSR-557) 動画・カタログ | e-book ✅; 016/017 ✅ | video: seed tối 20/10 → agent 21/10 · catalog: merge ✅ 12:45 → seed lại tối 20–21/10 → agent 22/10 | Martin (catalog merge) · Quentin DSR-611 (mặc định) | 22/10 |
| [DSR-570](https://sutrix.atlassian.net/browse/DSR-570) 資料DL | 7 ✅ · 1 ❌ TC 007 · 6 ⛔ · 2 skip | manual 6 TC tối 20/10 · catalog seed lại sau merge → rerun list 22/10 (TC 007 = ⛔ Quentin) | Martin (catalog merge) · Quentin (TC 007) | 22/10 |
| [DSR-529](https://sutrix.atlassian.net/browse/DSR-529) 記事詳細 | JOB-10 (sau data fix): 12 ✅ · 19 ❌ · 16 skip · 🐞 **DSR-657/658/659** tạo 21/10 (Martin) · 4 nháp <80% chờ Dat | Martin fix 3 bug → rerun · Night 21/10: robots + republish qa529-02 | Martin (fix) · Dat (4 nháp) | 22/10 |
| [DSR-653](https://sutrix.atlassian.net/browse/DSR-653) + [DSR-566](https://sutrix.atlassian.net/browse/DSR-566) ニュース詳細 | 5/18 ✅ · 12 ⛔ (không có template) | Có template → seed tối đó → agent hôm sau | Quentin trả 566 về dev. Không có tới 21/10 → Sprint 13 | 22/10 hoặc Sprint 13 |
| 🆕 [DSR-587](https://sutrix.atlassian.net/browse/DSR-587) 動画詳細 Overlay (giao Dat 20/10) | 19 TC sẵn, automation scaffold (IDLE-06) | positive: seed TD-587 tối 20/10 → JOB-20261020-02 21/10 · negative: tối 20–21/10 → agent 22/10 | Không | **22/10** |
| 🆕 [DSR-586](https://sutrix.atlassian.net/browse/DSR-586) 製品詳細 Overlay (giao Dat 20/10) | 19 TC sẵn, scaffold (IDLE-05); URL /products/ hay /product/ (JOB-05 kiểm) | Product data: Martin báo **đã sửa 13:50 JST** (incident DSR-585 CR, chỉ kiểm tĩnh) → JOB-20261020-07 xác minh trên DEV · TC/TD 586 re-baseline theo model mới (TC job tối nay) → TD-586 tối 21/10 → agent 22/10 | **Martin** (fix query/FE) · 項目fix版 (Quentin) | 22/10 (fallback 23/10) |
| 🆕 [DSR-647](https://sutrix.atlassian.net/browse/DSR-647) bug video liên quan (giao Dat retest) | Martin fix + merge 20/10 | seed qa587-r1…r6/off/rel-a/rel-b tối 20/10 → JOB-20261019-03 21/10 → đóng bug | Không | 21/10 |
| 🆕 [DSR-654](https://sutrix.atlassian.net/browse/DSR-654) CATALOG Overlay (sub-task 586, giao Dat 20/10) | [Dev] In Testing · chưa TC riêng | TC: TC job tối 21/10 (DSR-CATOV-*, ưu tiên 1) · automation scaffold JOB-20261021-02 (chạy ngay) · chạy thật khi hết 404 | overlay 404 (表示フラグ) | 22/10 |
| 🆕 [DSR-538](https://sutrix.atlassian.net/browse/DSR-538) bug Related Content link → publish domain (retest) | [Dev] In Testing | Kiểm tĩnh code link ngay (JOB-20261021-02 Part A) · retest thật trên qa587-main khi hết 404 → Pass thì đóng | overlay 404 | 22/10 |

Theo dõi (không giao Dat): DSR-590 (Ngọc) · **DSR-457 Dismissed 21/10 (Kohei) → mục OK cũ + #13 kiểm lại trong DSR-586** · DSR-503 Dismissed · DSR-585 → [STG] In Testing (Quentin; Sprint 12 chỉ DEV) · ⚠ **DSR-638 (Mayuka, In Progress): chuyển trang test-space ja sang URL chính thức** (list-catalog → /ja/library/catalog, video-list → /ja/library/video/search, product-list → /ja/product/…/product-index, article-list → /ja/library/article) – đường dẫn cũ sẽ 404 → automation 557/570/583/590 vỡ; IDLE-22 theo dõi · DSR-433 (⛔ SendGrid).

> ⚠ **T3 20/10:** overlay đã merge, Martin dọn folder → một số CF test bị xóa → tạo lại bằng TD-587 (PLAN "Night Pack 20/10"). **Product:** hỏng 12:12–13:50 JST do CR DSR-585 đổi model (−30/+9 field), Martin đã sửa – QA đang xác minh (JOB-20261020-07); field mới chưa hiển thị (chưa có design); catalog overlay đang được merge (Dat OK).

## 2. 🔔 Dat cần làm
| Ưu tiên | Việc | Với ai | Hạn | Nội dung gửi sẵn |
|---|---|---|---|---|
| P1 | **Mở khóa overlay 404 (10 phút)**: DSR CF `/content/dam/dsr/en/movies/standard/qa587-main` → bật 表示フラグ → Save → Publish → mở https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-main. 200 → báo claude-web (chuyển -20-02/-19-03/-20-11); vẫn 404 → gửi Martin tin trong mục ⚠ | Dat / Martin | 21/10 sáng | xem mục ⚠ Night 20/10 |
| P1 | **Báo Martin 3 bug 529 mới** DSR-657/658/659 (đã gán Martin) + hỏi BUG-2 meta names | Martin | 21/10 | "Hi Martin, QA filed 3 article-detail bugs on DEV after the data fix: DSR-657 (image block duplicated/empty), DSR-658 (tag chips not rendered), DSR-659 (thumbnail/related images use relative /content/dam paths → 404 on .live). Also: are the meta names publicationdate/updatedate/searchkeywords intended (TC expects published-date/category metas)?" |
| ✅ | Nháp 529: BUG-6 → **DSR-660** (Low, Martin; chuẩn ngày YYYY.MM.DD – BUG-RULES §6) · BUG-2/NEW-1 chờ Martin · 016/023/024 QA-PT tối 21/10 | — | 21/10 15:05 | — |
| P1 | **Hỏi Martin ver0.4 xong chưa** – JOB-09 thấy `dsr-product-page` đã đổi tên field + product-detail.js redeploy 15:33 (VN). Martin xác nhận xong → báo Claude/Điều phối chuyển JOB-20261020-08 (smoke product) vào queue; TD-586 tối 21/10 dựng theo ver0.4 | Martin | 20/10 tối / 21/10 sáng | "Hi Martin, is the DM_product ver0.4 update finished on DEV? We see dsr-product-page field names changed (howToUse/notice, applicableSliderSameAsParent) and product-detail.js redeployed at 08:33 UTC. Once you confirm, QA runs a product smoke and seeds TD-586 on ver0.4 tomorrow night." |
| P1 | **Gửi Martin tin 📣 bên dưới** (catalog sau merge + video/search 404 .live) | Martin | 21/10 sáng | xem mục 📣 |
| ✅ P2 | (áp dụng từ 21/10) **CATV-017 / CATDL-018 re-baseline theo DSR-655 Y3** (e-book requiresForm → trang `/{lang}/library/catalog/{id}` thay vì mở ebookUrl). [Giả định] Y3 là spec mới vì đã deploy theo trả lời DSR-655 | — | 21/10 07:45 | — |
| P2 | 21/10 17:00: nếu chưa có template `news-article` → gửi báo cáo tách 566 (Claude soạn sẵn) | Quentin | 21/10 | — |
| P3 | DSR-433 TC 017: hỏi Nakamoto | Nakamoto | 22/10 | "GET /bin/ykk/mail/test-send on DEV publish returns 403 JSON from the servlet itself. Should the dispatcher block this path on publish (STG/PRO) too?" |
| P3 | Gửi Nakamoto 3 địa chỉ nhận mail test – **hoãn** tới khi có SendGrid chính thức | Nakamoto | — | — |
| P3 | 22/10: duyệt Done DEV các ticket đạt (Claude đề xuất + soạn comment) | — | 22/10 | 557, 570, 529, 566, 587, 647 |
| ✅ | ~~Done DEV DSR-552 + đóng DSR-648/651~~ – Jira Done 20/10 | — | — | — |

## 3. 🌙 QA part-time tối nay (T3 20/10) – [Night Work Pack 2026-10-20](https://docs.google.com/document/d/1LwiInHvxOcMerK7pPAfp94H-zDNWvkiQfCrIuXm9MH4) · 18 dòng report · evidence [Evidence_20261020](https://drive.google.com/drive/folders/17DYGJmSghWE4QBL4PTLiCEKvfLO_CLeT)
Thứ tự (theo PLAN "Night Pack 20/10"): **0.** 529 BUGCHK (Title/Tags/Related, chụp trước sửa sau) · **1.** qa587-main en+ja · **2.** qa587-r1…r6 + rel-a (DSR-647) · **3.** qa587-off + rel-b · **4.** qa557-dam en+ja — mốc ~3h20 — **5.** catalog lõi 7 cặp + publish en pdf-form · **5b.** sửa data 529 · **6.** 570 manual 6 TC. Việc 7 bỏ. Mỗi content CF kèm 1 DSR CF cùng tên. Không đụng CF sản phẩm (TD-586 → tối 21/10, theo ver0.4).

## 4. 🤖 Agents
| Lane | Hàng đợi (tự chạy) | Hold (07:45/17:10 tự chuyển) |
|---|---|---|
| claude-code | 🆕 **IDLE-19** (regression toàn bộ + check 404 overlay) · 🆕 **IDLE-20** (scaffold DSR-585 CF ver0.4) | **-20-02** (557 video + 587 positives ← TD-587-01 + TD-557-DAM) · **-19-03** (647 P2/P3 ← TD-587-14/15) · **-20-04** (catalog 557/570 ← TD-190-CAT-NEW; merge đã xong) · -20-03 (586 ← Night 21/10) · -20-08 (product smoke ← Martin xác nhận ver0.4) · -16-08 (566 ← template) |
| codex | 🆕 **IDLE-21** (visual baseline + Lighthouse article 529) | 🆕 **-20-11** (587 TC 19.0 visual ← TD-587-01 + 14) · -16-11 (566 visual ← template) |
Kết quả mới (21/10 07:45): JOB-20261020-10 (529 full rerun) done 47 test · 12 ✅ · 19 ❌ · 16 skip → 3 bug Jira, 4 nháp <80%. Hold: không job nào đủ điều kiện (overlay 404, ver0.4 chưa xác nhận, chưa có template news). 0 job treo · upload queue fail 0.

## 5. TC (Jira sub-task `qa-tc`)
Backlog 18/18 xong · Night TC job 20/10 18:35: done 1/1 (re-baseline DSR-585 19 TC + DSR-586 21 TC theo **DM_product_ver0.4**, Quentin chốt) · upload queue pending 4 / fail 0 · auto-added 0 · job agent đã xếp 0 (cập nhật hold -03/-08) · câu hỏi mới Q45 (openingType → text?), Q46 (product-detail còn tên field cũ). · 20/10 19:08: TC backlog trống (row 0 CL-v0.1 hold) · Jira check auto-added 0 · upload queue pending 0 / fail 0 (4 file ver0.4 lên Drive 11:19 UTC) · job agent đã xếp 0. · 20/10 20:12: backlog trống · Jira check auto-added 0 · upload queue pending 0 / fail 0 · job agent đã xếp 0. · 20/10 21:06: TC backlog trống 2026-10-20 21:06 · done 1/1 hôm nay · Jira check auto-added 0 · upload queue pending 0 / fail 0 · job agent đã xếp 0. · **21/10 07:45:** backlog 18/18 · auto-added 0 · câu hỏi mới: không (Q45/Q46 giữ mặc định, không rủi ro làm lại lớn) · upload fail 0 · idle scaffold 585 = IDLE-20.

## 🐞 Bug < 80% – Dat chốt (morning 21/10 07:45 theo BUG-RULES.md + bugs/529-decision-20261021.md)
| Draft | Tiêu đề | % | Thiếu gì để ≥ 80% | Đề xuất |
|---|---|---|---|---|
| 529 BUG-2 | [DSR-529] meta names = publicationdate/updatedate/searchkeywords, no category meta (TC 010/012/014 ja+en) | 70% | Martin chưa trả lời trong DSR-529/DSR-356 | Hỏi Martin (🔔 P1). Sai → tạo 90%; đúng ý → re-baseline TC |
| 529 BUG-6 | [DSR-529] date shown 2026/10/01, published-date meta absent (TC 007) | 60% | Figma format ngày chưa kiểm | Không tạo; TC job kiểm Figma |
| 529 NEW-1 | [DSR-529] article page properties have no Navigation Title → breadcrumb last item (TC 028) cannot be authored | 60% | Chưa rõ navTitle có áp cho article-detail | Hỏi Martin kèm tin BUG-2 |
| 529-016 | qa529-01 still `noindex, nofollow` after republish | 50% | Author state chưa kiểm (có thể data) | QA-PT tối 21/10 kiểm Page Properties robots |
| 529-023/024 | qa529-02: related shows 4 products / VIEW ALL, Contact href "#" | 50% | qa529-02 chưa republish; nghi TC/test | Republish qa529-02 tối 21/10 → rerun |
| CAT-1 | [DSR-570] requiresForm PDF → `/{lang}/library/catalog/qa190-cat-pdf-form` 404 .live | 50% | Trang overlay 404 cả .page sau seed (表示フラグ/Draft nghi data) | Không tạo; chờ Dat bật 表示フラグ (🔔 P1) |
| CAT-2 | [DSR-557/570] e-book requiresForm card → trang catalog thay vì ebookUrl | 30% | Khớp DSR-655 Y3 → TC cũ | Không tạo; re-baseline đã áp dụng |
✅ Đã xử lý 21/10: PEND-529-01 → DSR-657 · BUG-3 → DSR-658 · BUG-4 (+ ảnh related) → DSR-659 · BUG-1, BUG-5 = data (đóng).

## ✅ Overlay 404 – nguyên nhân rõ (21/10 15:40): dev sửa auto-generate trang khi Publish DSR CF (từ 08:25 UTC 21/10) + **data QA sai** (tên node `qa-587-main`, movieId nhập tiêu đề, r5 trỏ r6, 表示フラグ OFF/trống, thiếu DSR CF rel-b). Dat mở /en/library/video/qa-587-main → chạy. QA-PT sửa tối 21/10 (PLAN) → agent chạy 557/587/647/654/538 sáng 22/10 → **Done 22/10 vẫn giữ**.
QA-PT tạo đủ CF (qa587-main, r1–r6, rel-a, off, rel-b, qa557-dam, catalog lõi) nhưng mọi trang `/en/library/video/<id>` và `/en/library/catalog/<id>` = 404 (.page và .live). Note QA-PT: "DSR CF thiếu isActive". Ảnh DSR CF qa587-main (model DM_movie_related): field là **表示フラグ** (không có nhãn isActive) chưa bật, trạng thái **Draft** (Last published trống).
Suy luận (70%): **data** – 表示フラグ = isActive chưa ON + DSR CF chưa publish. Chưa xác minh.
Việc sáng 21/10 (Dat, 10 phút, mở khóa sớm 1 ngày): mở DSR CF `/content/dam/dsr/en/movies/standard/qa587-main` → bật 表示フラグ → Save → Publish → mở https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-main. 200 → báo claude-web, QA-PT tối 21/10 bật cho các CF còn lại (hoặc Dat làm luôn). Vẫn 404 → hỏi Martin (tin dưới).
> Hi Martin, on DEV the DSR CF (DM_movie_related) has no field labelled isActive – only 表示フラグ. Is 表示フラグ the isActive flag? With it ON and the DSR CF published, /en/library/video/qa587-main is still 404 (.page and .live). Same for /en/library/catalog/qa190-cat-pdf-form. Could you check?
Ảnh hưởng: 587, 647, 557 (video + catalog), 570 → job hold -20-02, -19-03, -20-04 chờ. Done 22/10 của 587/557/570 rủi ro cao.

## 📣 Báo Martin – merge/incident (morning 21/10 07:45)
Nguồn: JOB-20261020-09 (regression 20/10) · JOB-20261020-10 (529 rerun: 19 fail đều cause none – không liên quan merge) · Night 20/10 (overlay 404).

| URL | Triệu chứng | cause | Lần đầu | Evidence |
|---|---|---|---|---|
| /en/library/video/qa587-main (+ mọi video/catalog overlay mới seed) | 404 trên .page và .live dù CF đã tạo | overlay-merge (70% data: 表示フラグ OFF + DSR CF Draft) | Night 20/10 | Night Report 20/10 (ảnh DSR CF qa587-main) |
| .aem.live /{ja,en}/library/catalog/qa190-cat-pdf-form | 404 .live (200 .page) – card requiresForm PDF dẫn tới đây | overlay-merge (catalog) | JOB-20261020-05 | results/JOB-20261020-09/evidence/DSR-CATDL-006_{ja,en}.png |
| list-catalog / catalog-video: card e-book requiresForm | dẫn tới /{lang}/library/catalog/qa190-cat-ebook-form thay vì ebookUrl | overlay-merge (DSR-655 Y3) | JOB-20261020-05 | …/DSR-CATDL-018_{ja,en}.png, …/DSR-CATV-017_{ja,en}.png |
| publish GraphQL dsr-product-page | field đổi tên (howToUse/notice, applicableSliderSameAsParent); product-detail vẫn tên cũ (Q46) | dm_product-ver0.4 | JOB-20261020-09 | results/JOB-20261020-09/raw.md#1 |
| .aem.live /{ja,en}/library/video/search | 404 .live, 200 .page | none (theo dõi) | JOB-20261020-09 | results/JOB-20261020-09 |

Tin gửi Martin (copy, 21/10 sáng):
> Hi Martin, QA status on DEV after the 20/10 merges: (1) Video/catalog overlay pages for our new test CFs (e.g. /en/library/video/qa587-main, /{lang}/library/catalog/qa190-cat-pdf-form) are 404 on .aem.page and .aem.live. The DSR CF (DM_movie_related) has no field labelled isActive, only 表示フラグ – is that the flag? We will turn it ON and publish; if still 404 we need your help. (2) E-book cards with requiresForm=true now go to /library/catalog/<id> instead of opening ebookUrl – we treat this as DSR-655 Y3 and updated our TCs. (3) Is the DM_product ver0.4 update finished? product-detail still returns the old field names (Howtouse/Notice/applicableSliderStandard). Once you confirm, we run a product smoke and seed TD-586 tonight. (4) /{lang}/library/video/search is 404 on .aem.live but 200 on .aem.page. Thanks!
