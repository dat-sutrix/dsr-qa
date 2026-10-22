# Sprint 12 – Plan xử lý ticket In Testing (assignee Dat)

## ▶ RE-PLAN 19/10 10:45 (bản hiện hành – thay mọi lịch bên dưới)
**Quy tắc sprint (Dat 19/10, áp dụng mọi sprint):** sprint 2 tuần; **3 ngày làm việc cuối sprint = buffer** cho ticket mới giao Dat (thường dồn nhiều). Việc đã biết phải xanh DEV trước buffer.
Sprint 12: 15/10 → 27/10 · **Hạn chót việc đã biết: T5 22/10 18:00** · Buffer: T6 23/10, T2 26/10, T3 27/10.

| Ticket | Hiện trạng 19/10 | Đường găng | Done DEV đích | Nếu trượt |
|---|---|---|---|---|
| DSR-552 Breadcrumb | 35/35 đã chạy, 2 bug Low Martin đang fix (In Progress 19/10) | fix lên DEV → rerun 014 (agent) + 016 (QA-PT) → Done | **21/10** | 22/10 chưa fix → Done kèm 2 bug Low |
| DSR-557 動画・カタログ | 8/25 ✅, data e-book đã sửa 16/10 | lane claude-code sống lại → JOB-20261016-10 · 20/10 áp mặc định DSR-611 | **21/10** | TC 611 = ⛔ có owner (Quentin) |
| DSR-570 資料DL | 19 TC, JOB-20261016-12 treo, khách đang test (Tsukiji "テスト中" 19/10) | rerun JOB-12 sau khi sửa VPS · manual 6 TC QA-PT 20/10 | **22/10** | form HubSpot chưa có = ⛔ (Ngoc) |
| DSR-529 記事詳細 | 0/32, chưa có trang test | QA-PT tạo folder stories + TD-529 path gốc (`article detail`) **tối 19/10** → JOB-20261015-12 sáng 20/10 → triage 21/10 | **22/10** | phần chưa xanh báo PM tách sang Sprint 13 |
| DSR-566 ニュース詳細 | 5/18 ✅, **không có template news-article** | dev deploy template ≤ 20/10 → QA-PT seed 20/10 tối → JOB-08/11 21/10 | **22/10** | không có template tới 20/10 → 22/10 báo PM: ⛔ dev, chuyển Sprint 13 |
| DSR-647 (bug, video overlay) | trang branch vẫn bản 16/10 | Martin re-preview → JOB-20261017-01 | 20/10 | giữ bug mở, không chặn ticket Dat |
| DSR-457 (bug, product detail) | #1 ✅, #10 chưa chạy | QA-PT #10 tối 19/10 · Quentin/Ngọc trả lời | — | mặc định 20/10 |

**Night Pack 19/10 – bắt buộc đưa vào (17:10 tạo Google Doc theo đúng thứ tự, ~2h, có bước click + URL cho từng việc):**
| # | US | Việc | ~phút | Dòng report |
|---|---|---|---|---|
| 1 | DSR-529 | Sites → master → ja → tạo cấp còn thiếu `library` → `article` → `stories` (template đơn giản nhất có sẵn, Title = Library / Article / Stories), lặp cho en. Trong `stories` tạo qa529-01 (ja+en), qa529-02 (ja), qa529-r1..r3 (ja+en) bằng template `article detail`, rồi theo đúng hướng dẫn Martin (DSR-529 comment 59484): mở trang → Page configuration (Properties) → chọn template **article** → nhập giá trị theo TestData DSR-356 (TD-529-01/02/03) → Publish | 70 | TD-529-01, TD-529-02, TD-529-03 |
| 2 | DSR-433 | TC 1.0, 2.0, 3.0 (chỉ xem trên Author, link trong TC file). **Không làm TC 4.0** (SendGrid trial hết hạn 19/10 – không gửi được mail) | 20 | 433-1.0, 433-2.0, 433-3.0 |
| 3 | DSR-457 | Item #10 (như pack 16/10) | 15 | DSR-457-#10 |
| 4 | DSR-570 | CF `qa190-cat-ebook-form`: catalogId bỏ 2 dấu cách cuối → Save → Publish | 5 | TD-190-13-fix |
| 5 | DSR-552 | Retest bug DSR-648 (Martin fixed 19/10 13:55): mở `/master/ja/test-space/dsr552-author/child` trong Universal Editor (không thêm block) → breadcrumb trong canvas phải là **HOME > test space > QA Author Parent > QA Author Child**, giống trang Publish https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/dsr552-author/child. Chụp cả 2 màn hình. Thiếu cấp cha → Fail | 10 | DSR-BREAD-016 |

**Agent – chạy ngay không chờ (19/10):** JOB-20261019-01 (557 016/017 + 647 P2: sửa phạm vi assertion theo quyết định QA) · IDLE-07/10/11/12/13 · codex IDLE-16. Hold có điều kiện: -02/-04 (529, sau Night Report), -03 (552-014 khi DSR-651 fix; 647-P3 khi re-preview).
Quyết định QA 19/10: 557-016/017 đếm form chỉ trên DSR (trang ngoài có form search = không phải gate) · 647-P2 bỏ assertion "static HTML" (BL-OVL-1: block lọc phía client) · 173 MOVIE-014/033 fail = CF movieid-01 bị xóa movieSourceId/relatedProducts (data, ngoài sprint – ghi nhận, chưa sửa).

**Ticket mới giao Dat 20/10 sáng (Jira):** DSR-586, DSR-587 (overlay, trước là Martin theo dõi) + bug DSR-647 retest. Áp quy tắc buffer: ticket mới → được dùng 22–23/10.
- Night Pack 21/10 (≤3h sau ×1.5): (1) catalog 557/570 theo folder Martin gửi · (2) **TD-586-01 + TD-586-02** (ja, `/content/dam/common/ja/products/990586001|990586002` + `/content/dam/dsr/ja/products/…`) · (3) qa557-dam ja.
- Night Pack 22/10: TD-586 negative (05–09, 11) + TD-587 negative (02, 04–08, 10, 12). Agent chạy sáng 23/10 → Done 586/587 đích 23/10.
  - **[schedule 22/10 07:45] Sửa data (BẮT BUỘC, làm TRƯỚC negative – dòng report BUGCHK-*):** (a) **BUGCHK-586-02**: mở DSR CF `/content/dam/dsr/ja/products/990586002` → bấm **Preview** (KHÔNG Publish) → kiểm `https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002` = trang hiện, `.aem.live` cùng đường dẫn = 404 (đúng). Lỗi do pack v3 việc 6 ghi "Publish" cho cả 2 (lỗi pack, ghi QA-PT-ERRORS dạng "pack"). (b) **BUGCHK-586-01**: content CF `/content/dam/common/ja/products/990586001` → kiểm trạng thái **Published**; DSR CF `/content/dam/dsr/ja/products/990586001` → ô sản phẩm (product) phải trỏ đúng content CF đó → Publish lại cả 2 (content trước, DSR sau); chụp ô product. Kiểm .aem.live `/ja/products/990586001` hiện tên sản phẩm (không phải trang trống). Bổ sung field tùy chọn TD-586-01 (productCategories, applications, media01Asset) nếu còn thiếu. (c) **BUGCHK-190-FORM**: content CF `/content/dam/common/{ja,en}/catalogs/qa190-cat-pdf-form` và `qa190-cat-ebook-form` → **requiresForm = ON**; tiêu đề + ngày theo TestData TD-190 (không để "catalog pdf form"/2026-09-03); ja `qa190-cat-pdf` catalogTitle theo TD-190 → Publish (content trước, DSR sau). ~35 phút (×1.5). Pass hết → 07:45 23/10 chuyển JOB-20261022-03.
- Agent: job hold 586 positive sau Night 21/10 (17:10 21/10 tạo).

**Night Pack 20/10 – bắt buộc đưa vào (việc 0 thêm 16:23 – làm đầu tiên; vì thêm 30 phút: việc 7 bỏ, việc 6 làm nếu còn giờ, không thì Not run) (chốt 20/10 09:15 – Dat yêu cầu tăng tải để kéo tiến độ; ~4h thực tế; việc 7 tùy chọn):**
Martin 20/10 06:44: merge xong, **một số CF test bị xóa khi dọn folder** → tạo lại bằng bộ **TD-587 / TD-586** (đúng folder mới, file `…_TestData.xlsx` trên Drive), **không dùng lại qa501-* / qa190-mv-***. Trước khi tạo: CF nào đã có đúng tên thì bỏ qua (ghi "exists"). Tạo CF đúng folder (directory-strict), tên chữ thường/số/"-". **Quy tắc Martin 20/10: mỗi content CF phải có 1 DSR CF cùng tên** (trừ TC âm cố ý "chỉ content CF": TD-587-06, TD-586-07). Thứ tự = hạn ticket; hết giờ thì dừng ở việc đang làm, việc còn lại ghi Not run.
| # | US | Việc | ~phút (thô) | Dòng report |
|---|---|---|---|---|
| **0** | **529 – CHECK BUG (ưu tiên cao nhất, Dat 20/10 16:23)** | Làm TRƯỚC mọi việc. Chụp trước, sửa sau. **0a** Mở `https://author-p192812-e2014374.adobeaemcloud.com/mnt/overlay/wcm/core/content/sites/properties.html?item=/content/dsr/master/ja/library/article/stories/qa529-01` → tab **Basic** → chụp 1 ảnh thấy 3 ô **Title, Page Title, Navigation Title** (cuộn xuống nếu cần) → ghi nguyên văn 3 giá trị vào cột Actual. Lặp lại cho en: thay `/ja/` bằng `/en/`. Nếu Title hoặc Page Title = "QA529 ナビ"/"QA529 Nav" → sửa: Title = "QA529 ストーリー詳細テスト" (ja) / "QA529 Story detail test" (en), Page Title để trống, Navigation Title = "QA529 ナビ"/"QA529 Nav" → Save & Close → Quick Publish. **0b** Cùng màn hình: chụp ô **Tags** (ja và en), ghi các tag thấy được (hoặc "trống"). en trống → thêm 2 tag giống ja (bấm icon thư mục cạnh ô Tags, chọn đúng 2 tag như ja) → Save & Close → Quick Publish. **0c** Tìm ô **Related Stories** (xem lần lượt các tab Basic/Advanced/… hoặc nơi đã nhập relatedStories hôm 19/10) → chụp ô đó (ja và en) → ghi nguyên văn: là đường dẫn `/content/…/qa529-r1` hay chỉ chữ `qa529-r1`. Nếu chỉ là chữ → xóa, chọn lại bằng icon thư mục: qa529-r1, qa529-r2, qa529-r3 (đúng thứ tự) → Save & Close → Quick Publish. Ảnh lưu vào Evidence_20261020, tên `BUGCHK-529-<1|3|5>_<ja|en>.png` | 20 (×1.5 = 30) | BUGCHK-529-1 ja/en · BUGCHK-529-3 ja/en · BUGCHK-529-5 ja/en (6 dòng) |
| 1 | 587 + 557 | TD-587-01 `qa587-main` (YouTube): content CF `/content/dam/common/{en,ja}/movies/qa587-main` (DM_movie, giá trị TestData) → Publish; DSR CF `/content/dam/dsr/{en,ja}/movies/standard/qa587-main` (isActive ON, movie = content CF cùng ngôn ngữ) → Publish. Kiểm https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-main (và /ja/) | 25 | TD-587-01 |
| 2 | 587 / bug DSR-647 | TD-587-14: content CF `qa587-r1`…`qa587-r6` trong `/content/dam/common/en/movies/` (更新日 r1 = 2026-10-01 … r6 = 2026-10-06) → Publish từng cái · **mỗi r1…r6 thêm DSR CF cùng tên** trong `/content/dam/dsr/en/movies/standard/` (isActive ON) → Publish (Martin 20/10: 1 content CF ⇒ 1 DSR CF cùng ID) · content CF `qa587-rel-a` (relatedMovies = r1…r6) + DSR CF `/content/dam/dsr/en/movies/standard/qa587-rel-a` → Publish. Kiểm /en/library/video/qa587-rel-a: 5 thẻ r6→r2 | 50 | TD-587-14 |
| 3 | 587 / bug DSR-647 | TD-587-15: content CF `qa587-off` (isUnavailable = TRUE) + DSR CF `qa587-off` cùng tên · content CF `qa587-rel-b` (relatedMovies = qa587-r1, qa587-off) + DSR CF `qa587-rel-b` → Publish. Kiểm /en/library/video/qa587-rel-b: đúng 1 thẻ (r1) | 18 | TD-587-15 |
| 4 | 557 | `qa557-dam` (en + ja): như #1 nhưng movieSource = DAM, movieAsset = 1 file mp4 có sẵn trong DAM test, Release date 2026-09-15 → DSR CF cùng tên → Publish. Kiểm /en/library/video/qa557-dam | 20 | TD-557-DAM |
| 5 | 557 + 570 | **Catalog (JOB-20261020-05: MISSING)** – (a) **Publish** en `qa190-cat-pdf-form` (đã có trên .page, chưa lên .live): mở DSR CF `/content/dam/dsr/en/catalogs/qa190-cat-pdf-form` → Publish, rồi content CF cùng tên → Publish. (b) Tạo 7 cặp CF: ja × 4 (`qa190-cat-pdf`, `-pdf-form`, `-ebook`, `-ebook-form`) + en × 3 (`qa190-cat-pdf`, `-ebook`, `-ebook-form`): content CF `/content/dam/common/{lang}/catalogs/<id>` (giá trị copy CF cũ cùng tên ở `/content/dam/ykk/common/product-cf/test/`, không còn thì theo TestData DSR-190) + DSR CF cùng tên `/content/dam/dsr/{lang}/catalogs/<id>` (isActive ON) → Publish cả 2. (c) Mở `https://main--dsr-eds-dev--sutrix-projects.aem.live/{lang}/library/catalog/<id>` → chụp màn hình, ghi 200/404. 8 catalog NEW/UPDATE còn lại → Night 21/10 | 60 | TD-190-CAT-NEW |
| 5b | 529 | Sửa data theo triage 20/10: qa529-01 (ja + en) robots/noindex = **OFF** · qa529-02 (ja) robots = **ON** · en qa529-01 relatedStories sắp lại **r1, r2, r3** · chụp ô Title của qa529-01 (ja) trong Page configuration → Publish lại cả 3 trang | 10 | TD-529-fix |
| 6 | 570 | Manual 6 TC trên trang demo /master/ja/test-space/dsr-570-catalog-detail (không đụng CF catalog) | 30 | DSR-CATDL-… (6 dòng) |
| 7 | 587 (nếu còn giờ) | TD-587-06 (chỉ content CF `qa587-commune-only`), TD-587-07 (`qa587-inactive`: isActive OFF → republish), TD-587-02 (`qa587-preview`: DSR CF chỉ Preview) | 18 | TD-587-06, -07, -02 |
⚠ **Đổi 12:40:** Product data trên DEV đang hỏng (CF model product đổi – Martin sửa query/FE chiều nay) → **TD-586 dời sang tối 21/10** (sau khi Martin xác nhận sửa xong, giá trị theo model mới). Catalog **được merge chiều nay** (Martin hỏi, Dat OK) → việc 5 = catalog lõi nếu đã merge. qa587-main: ô relatedProducts nếu picker lỗi thì để trống + Note. URL sản phẩm = `/{lang}/products/{id}` (JOB-05).

**Night Pack 21/10 – ĐÃ TẠO DOC v3 (claude-web 16:35, Drive 1xY_ghkX8I3LqTSyziO-Ef8AU_tN3JF4aru0R29aMddo – thêm 0c sửa block ảnh 657 theo Martin, 0d publish lại 6 trang 529; v1/v2 đánh dấu CŨ; 17:10 không tạo lại) – bắt buộc đưa vào (chốt lại 21/10 15:45 sau audit Martin – xem BL-OVL-1 'Update 2026-10-21'; ~4h, đã ×1.5):** Nguyên nhân 404: (a) dev sửa xong 08:25 UTC 21/10 – từ giờ Publish DSR CF là tự sinh trang; (b) **data QA sai**. Quy tắc bắt buộc cho MỌI CF overlay: **tên node DSR CF = id**, chỉ chữ thường/số/"-"; ô **movieId/productId/catalogId = đúng tên node** (không phải tiêu đề); **表示フラグ = ON**; đổi tên node bằng **Move → Name** (sửa Title không đủ); sửa xong **Publish lại** DSR CF. Thứ tự:

| # | US | Việc | phút (×1.5) | Dòng report |
|---|---|---|---|---|
| 0 | 529 | qa529-01 ja+en: Page Properties → chụp robots/noindex → bỏ noindex nếu bật → Publish. qa529-02 ja: Publish lại | 25 | BUGCHK-529-016 (ja,en) · BUGCHK-529-02 |
| 1 | 587 | **Sửa qa587-main en + ja:** DSR CF `/content/dam/dsr/{en,ja}/movies/standard/qa-587-main` → Move → Name = `qa587-main` (cả 2 ngôn ngữ). Content CF ja `/content/dam/common/ja/movies/qa-587-main` → Move → Name = `qa587-main`. Ô movieId (content CF + DSR CF nếu có) = `qa587-main`. DSR CF: movie trỏ content CF cùng ngôn ngữ `qa587-main`, 表示フラグ ON → Save → Publish. Mở https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-main và /ja/… → chụp | 35 | TD-587-01 |
| 2 | 587/647 | **Sửa qa587-r1…r6 + rel-a (en):** ô movieId = đúng tên (`qa587-r1` … `qa587-r6`, `qa587-rel-a`) trong content CF và DSR CF; DSR CF `qa587-r5` sửa movie → content CF `qa587-r5` (đang trỏ nhầm r6); 表示フラグ ON cho r1–r6 và rel-a; content CF qa587-rel-a: relatedMovies = r1…r6 (đúng thứ tự). Publish lại từng DSR CF (r1…r6 trước, rel-a cuối). Mở /en/library/video/qa587-rel-a → chụp: 5 thẻ, có link | 45 | TD-587-14 |
| 3 | 587/647 | **qa587-off + rel-b (en):** kiểm content CF qa587-off (isUnavailable TRUE, movieId `qa587-off`) có DSR CF cùng tên (chưa có → tạo, 表示フラグ ON). **Tạo DSR CF `qa587-rel-b`** (chưa có) → movie = content CF qa587-rel-b, 表示フラグ ON; content CF rel-b: movieId `qa587-rel-b`, relatedMovies = qa587-r1, qa587-off → Publish. Mở /en/library/video/qa587-rel-b → chụp: đúng 1 thẻ (r1) | 25 | TD-587-15 |
| 4 | 557 | **qa557-dam en + ja:** movieId = `qa557-dam` (đang "QA587 dam"), 表示フラグ ON (en đang OFF, ja trống) → Publish lại. Mở /en/library/video/qa557-dam và /ja/… → chụp, video DAM phát được | 20 | TD-557-DAM |
| 5 | 557/570/654 | **Catalog lõi:** với mọi DSR CF trong `/content/dam/dsr/{en,ja}/catalogs/` tên `qa190-cat-*`: ô catalogId = đúng tên node, 表示フラグ ON, content CF cùng tên tồn tại trong `/content/dam/common/{lang}/catalogs/` → Publish lại. Thiếu cặp nào trong 4 lõi (`qa190-cat-pdf`, `-pdf-form`, `-ebook`, `-ebook-form`) × ja/en thì tạo (giá trị theo TestData DSR-190, catalogId = tên). Mở /{lang}/library/catalog/<id> → chụp | 50 | TD-190-CAT-NEW |
| 6 | 586 | **TD-586-01 + 02 (ja)** theo TestData DSR-586 (ver0.4): content CF `/content/dam/common/ja/products/990586001|990586002` (productId = `990586001`/`990586002`) + DSR CF cùng tên `/content/dam/dsr/ja/products/…` (表示フラグ ON) → Publish → mở /ja/products/990586001 → chụp | 60 | TD-586-01, TD-586-02 |
| 7 | 570 | (nếu còn giờ) Manual 6 TC trên /master/ja/test-space/dsr-570-catalog-detail | 45 | DSR-CATDL-… |

Tổng chắc chắn ≈ 4h20 (0–6), việc 7 nếu còn giờ. **Không đụng** CF của dev/cũ (qa501-*, filtered, norelated, fil-unav, sort-*, productid-01x, 46, 135, catalogid-*). **Night 22/10:** TD-586 en + negative, TD-587 negative, 570 manual (nếu chưa), retest DSR-657/658/659/660 nếu fixed.
**Đích Done mới:** DSR-647 21/10 · DSR-586, DSR-587 **22/10** (sớm hơn 1 ngày) · 557, 570 **22/10** (catalog merge 20/10 chiều → seed lại 20–21/10) · 586 **22/10, fallback 23/10** (product model đổi) · 529 22/10.

**⚠ Merge overlay (Martin) sáng T3 20/10 – ảnh hưởng (chốt 19/10 14:45):**
- Sau merge, trang/danh sách sản phẩm & video trên DEV chỉ còn item trong folder mới (`/content/dam/common|dsr/{lang}/products|movies/…`); dữ liệu mẫu bị xóa. Data QA cũ (`/content/dam/ykk/common/product-cf/test/` – qa190-mv-*, qa501-*) sẽ mất khỏi trang → **không phải bug**.
- Ảnh hưởng: DSR-557 (phần video) · DSR-647/587 retest · 586 · regression DSR-173/278. Không ảnh hưởng: 552, 529, 566/653, 570 (catalog – chờ xác nhận Martin).
- Agent: JOB-20261019-05 (regression sau merge) + -06 (visual diff vs IDLE-16 trước merge) – hold, tự chạy khi trang main có overlay.
- Martin 16:20: **catalog overlay merge riêng, dự kiến chiều 20/10** → phần catalog của 557 + 570 cũng phải seed lại. Video chỉ test trên `/{lang}/library/video/{id}`; trang test-space dsr-173-video-detail bỏ. Tạo CF **đúng folder** (directory-strict).
- QA-PT tối T3 20/10 (≤3h): (1) 557 video: 2 movie (youtube + dam) × ja/en = content CF `/content/dam/common/{lang}/movies/qa190-mv-yt|qa190-mv-dam` + DSR CF `/content/dam/dsr/{lang}/movies/standard/` cùng tên (tick isActive) – 45' · (2) 587/647: qa501-rel-1..6 + qa501-off làm content CF trong `/content/dam/common/en/movies/` (updateDate 10-01…10-06), sửa DSR CF qa501-main-a/b trỏ sang – 50' · (3) 570 manual 6 TC – 30' · (4) 557/570 catalog: **chỉ khi** Martin đã merge catalog và gửi đường dẫn – còn không thì tối 21/10.
- Agent: 21/10 sáng rerun 557 video + 647 trên overlay main; 22/10 sáng rerun catalog (557, 570).
- **557 và 570 Done đích 22/10, rủi ro cao** (phụ thuộc catalog merge 20/10 chiều). Trượt → 22/10 17:10 báo PM, phần catalog sang Sprint 13.

**Lịch theo ngày**
| Ngày | Dat (giờ hành chính) | Agent | QA-PT (tối) | Claude tự động |
|---|---|---|---|---|
| T2 19/10 | ✅ sửa lane · nhắn Martin (re-preview) · Ngọc (template 566) · Quentin · Nakamoto | xả hàng đợi 11 job (557, 647, 173, TOP, 570 rerun, idle) | TD-529 + folder stories (70') · 457 #10 (15') · TD-586/587 path BL-OVL-1 (45') · tối đa 2h | 17:10 Night Pack theo thứ tự này |
| T3 20/10 | trả lời/nhắc DSR-611, 457 (mặc định có hiệu lực) | 529 vòng 1 · 570 rerun | 570 manual 6 TC · TD-566 (nếu có template) · retest fail 529 | 07:45 triage, đề xuất Done 557 |
| T4 21/10 | tạo bug đã duyệt | 529 retest · 566 (nếu có data) | retest bug / manual 529 còn lại | QA confirm DEV 557 |
| T5 22/10 | **chốt sprint:** Done DEV 529/566/570 hoặc báo PM phần tách | regression toàn bộ US đã Done | retest cuối | 17:10 soạn tóm tắt sprint + nội dung báo PM |
| T6 23 → T3 27/10 | **Buffer:** ticket mới giao trong ngày → TC job viết TC ngay, xếp agent cùng ngày | retest + ticket mới | ticket mới | TC job ưu tiên ticket mới lên đầu |


> **Chốt 15/10 15:55 (Dat): Sprint 12 chỉ test DEV. Ticket xanh trên DEV = Done trong sprint. STG/PRO test ở sprint sau, Dat xác nhận khi đó.**

> Lập 2026-10-15 14:30 (UTC+7) · Sprint 12: 15/10–27/10 (9 ngày làm việc) · Nguồn trạng thái: `hub/us/*`, BUGS.md, Jira.
> Nguyên tắc: (1) đóng nhanh cái gần xong để giảm WIP, (2) ban ngày Claude + agent làm việc tự động được, ban đêm QA-PT chỉ làm data Author + manual, (3) blocker ngoài QA không giữ ticket: TC chỉ thiếu môi trường (cn, Top page) ghi Known/Blocked trong comment "QA confirm DEV", chạy lại ở STG.

## 1. Thứ tự ưu tiên (chỉ DEV)
| # | Ticket | Tình trạng 15/10 | DEV xanh = Done | Rủi ro |
|---|---|---|---|---|
| 1 | DSR-591 (bug breadcrumb) | ✅ Fixed DEV | 15/10 | — |
| 2 | DSR-501 (DM_movie, 4 điểm) | Chưa test; nhỏ | 17/10 | Thấp |
| 3 | DSR-552 Breadcrumb | DEV 9/35 ✅ · 19 ⛔ | 19/10 | HOME (Top page) |
| 4 | DSR-557 動画・カタログ | DEV 6/25 ✅ | 20/10 | DSR-611 |
| 5 | DSR-566 ニュース詳細 | TC viết đêm 15/10 | 20/10 | — |
| 6 | DSR-529 記事詳細 | TC viết đêm 16/10; scope lớn | 22/10 | **Cao** |

Buffer 23–27/10 cho fix/retest DEV. Quá 22/10 mà 529 chưa xanh → báo PM tách phần còn lại sang Sprint 13.
TC chỉ chặn do môi trường DEV (site cn, Top page) → ⛔ Blocked có owner (03 §0), liệt kê trong comment "QA confirm DEV"; phần còn lại xanh thì ticket Done.

## 2. Lịch theo ngày
| Ngày | Claude (ban ngày) | Agent (VPS) | QA-PT (đêm) | Night TC job |
|---|---|---|---|---|
| T5 15/10 | Plan · Night Pack · sub-task ✅ | JOB-05 smoke codex | 557 data, 552 T2/T3 + manual, 457 #1 #10 | 566, 609, 568, 560 |
| T6 16/10 | Triage Night Report · review TC 566 · Night Pack | 552 full DEV · 557 TC 12–20 · 566 smoke | 501 (4 điểm) · 566 manual + data | 529, 608/610, 503, 583 |
| T7–CN 17–18/10 | — | — | — | 資料DL, 585, 586, 587, 589 · 590, 227, 433 |
| T2 19/10 | Review TC đêm 16–18 · QA confirm DEV 552/591/501 (Jira comment) | 566 auto DEV · 501 FE | 529 tạo trang test (template article) · 557 manual | (đã tắt) |
| T3 20/10 | Áp mặc định DSR-611 · QA confirm DEV 557, 566 | 529 auto DEV vòng 1 | 529 manual (OGP, page properties) | |
| T4 21/10 | Triage 529 · bug → Jira | 529 retest | 529 manual vòng 2 | |
| T5 22/10 | QA confirm DEV 529 | regression DEV toàn bộ US đã Done | retest bug | |
| T6 23 → T3 27/10 | Buffer: retest bug DEV, tổng kết sprint | | | |

## 3. Blocker cần Dat đuổi (theo hạn)
| Blocker | Chặn | Ai | Hạn | Mặc định nếu không trả lời |
|---|---|---|---|---|
| DSR-611 (4 câu) | 557: TC 3, 7, 10, 11, 21 | Quentin | 20/10 | Áp mặc định ghi trong ticket |
| HOME `/master/{lang}` 404 (Top page) | 552: bước HOME 002/004/008/017 | Dev Top page (DSR-609) / Quentin | 19/10 | ⛔ Blocked có owner, liệt kê trong QA confirm DEV |
| DSR-536 / DSR-575 Q5 (SP display, placement) | 552: 021–023, 030, 034 | Kohei | 19/10 | Test theo Figma SP hiện tại |
| Site cn chưa có trên DEV | phần cn của 552, 557 | Quentin | — | ⛔ Blocked có owner (Quentin) |
| Trang dùng block (529, 608, 170, 586) | 557: TC 9, 22 | dev từng ticket | — | Chuyển TC 9/22 sang regression của các US đó |

## 4. Việc đã quyết (không hỏi lại)
- DSR-591 fixed DEV → Done trong sprint (session Bugs).
- Sprint 12 không chạy job STG/PRO; Lighthouse (cần STG) và TC chỉ chạy ở STG để sprint sau.
- 557 TC 9, 22 (trang sử dụng) tách khỏi DoD 557, đưa vào TC regression của 529/586/170.
- 501: điểm 4 = N/A (đã theo dõi ở DSR-447); điểm 1 kiểm trên Author (tên field `relatedMovies`), điểm 2–3 kiểm FE với 2 CF mới (isUnavailable=TRUE; 6 related → hiển thị 5).

## 5. Night TC job (18:00–22:00 hằng ngày, kể cả T7/CN)
Scheduled task "DSR TC – Đêm 18–22h" (chỉ Claude) viết/adopt TC theo `tc-backlog.md`, upload Drive, Jira sub-task Done; câu hỏi chỉ ghi `tc-questions.md` (Dat duyệt sáng). Đích: 17/17 trước sáng T2 19/10, rồi tự tắt.

## Cập nhật 2026-10-15 16:30 – kế hoạch ASAP (thay ngày đích ở trên)
| Ticket | Done DEV | Đường găng |
|---|---|---|
| 501 | 16/10 | Dat seed qa501-* tối 15/10 → JOB-11 → QA confirm DEV |
| 552 | 16/10 | QA-PT seed T2/T3 + manual đêm 15/10 → agent rerun 16/10; HOME/cn/DSR-575 = Blocked có owner |
| 557 | 16/10 | QA-PT seed qa190 đêm 15/10 → agent 16/10; DSR-611 = default/Blocked |
| 566 | 17/10 | TC xong 15/10 · JOB-09/10 tối 15/10 · QA-PT qa566 đêm 16/10 → rerun 17/10 |
| 529 | 19/10 | TC night job 15/10 · QA-PT trang test 16/10 · agent cuối tuần |
Nguyên tắc: không chờ – TC bị env/ticket khác chặn ghi ⛔ Blocked + owner, không giữ ticket ở In Testing.



**Night Pack 22/10 – bổ sung bắt buộc (claude-web 09:20, sau khi rà Jira):** thứ tự đầu pack:
1. BUGCHK sửa data (theo DASHBOARD/JOB-21-09, JOB-20-03, JOB-20-04): DSR CF `/content/dam/dsr/ja/products/990586002` → **Preview** (không Publish); 990586001: content CF Publish + DSR CF ô `product` trỏ `/content/dam/common/ja/products/990586001` → Publish; catalog `common/{ja,en}/catalogs/qa190-cat-pdf-form` + `-ebook-form`: **requiresForm = ON** → Publish; field tùy chọn TD-586-01 (doc 1VkiFqzmlrJVnGB0rVq8awmVnedjwiDlNxsLtbrUoP1o).
2. **DSR-566 – template news-article ĐÃ CÓ trên DEV (Ngọc 19/10 15:52 trên DSR-566; trước đó bị bỏ sót)** → tạo trang (ghi giá trị inline trong pack, không trỏ file):
   - TD-566-01 ja: Sites → `/content/sites/digital-showroom/master/ja/test-space` → Create Page → template **news-article** → tên **`qa566-news-01`** · title **`QA566 ニュース詳細テスト`** · category **お知らせ** · publish date **2026-10-01** · tags **2 tag bất kỳ (ghi tên vào Note)** · description **`QA566 description ja`** · body: 1 heading h2 **`QA566 見出し`**, 1 câu **in đậm**, 1 list 3 dòng, 1 link tới `/master/ja/test-space` · 1 ảnh test png · CTA **`詳しく見る`** → `/master/ja/test-space` → Publish.
   - TD-566-01 en: tương tự trong `/master/en/test-space`, tên **`qa566-news-01`**, title **`QA566 News detail test`**, category **News**, description **`QA566 description en`**, CTA **`Learn more`** → `/master/en/test-space` → Publish.
   - TD-566-02 ja: tên **`qa566-news-02`**, title = 100 ký tự full-width (dán: 「長いタイトル」×16 + 「長いタ」 = 100 ký tự – pack phải ghi sẵn chuỗi), **không ảnh, không CTA** → Publish.
   - Không thấy template news-article → chụp màn hình Create Page, ghi Blocked, làm tiếp.
3. Sau đó: TD-654-02..08 · 570 manual 6 TC · TD-586 en + negative · TD-587 negative (cắt từ cuối nếu hết giờ).

## Sprint 12 Review QA – 27/10 (thảo luận chiến lược Sprint 13)
Scheduled task 27/10 09:40 tổng hợp `SPRINT12-REVIEW.md`: kết quả ticket (Done DEV / trễ / lý do), bug (tạo, đóng, giả), WORKLOAD (giờ công theo actor), KPI QA-PT (phút/đêm theo H1–H4, lỗi data, % TC không cần QA-PT; mục tiêu 0% QA-PT, Dat giữ vai trò), tiến độ Agent Author, đề xuất Sprint 13 theo `ZERO-HUMAN-ROADMAP.md` (mốc 'Hết S13').

## Quy tắc Night Pack (rút từ đêm 15/10 – task 17:10 phải áp dụng)
- **Ước lượng ×1.5 cho việc tạo trang/CF trên Author** (đêm 19/10: dự kiến 2h05, thực tế 3h30).
- **Tổng sau nhân ~4h, không ít hơn** (Dat 20–21/10, kéo tiến độ; thay quy tắc ≤ 3h cũ). Có việc dự phòng cuối pack.
- **Không trỏ sang file khác ("theo sheet TestData…")**: mọi giá trị (kể cả field tùy chọn) ghi thẳng trong pack – QA-PT không có/không tìm được sheet (21/10 22:06). Tên field đúng nhãn trên màn hình (vd UE: Navigation title = ô **Breadcrumb label**).
- **Định dạng pack (Dat 21/10 – lỗi QA-PT ảnh hưởng cả ngày + dev):** khung đỏ "5 quy tắc bắt buộc" đầu pack; **mọi giá trị phải nhập chính xác (tên CF, ID, đường dẫn, mã TC) tô vàng + đậm + font mono**; việc cấm / sai thường gặp tô đỏ; ô ON/OFF tô xanh; checklist "tự kiểm 30 giây trước Publish" (tên CF, ID = tên CF, 表示フラグ ON, trỏ đúng CF cùng tên cùng ngôn ngữ); bảng giá trị theo từng CF thay vì đoạn văn; ghi cả giá trị SAI hiện tại nếu đang sửa; mỗi việc có TC ID report và tên ảnh = TC ID. Mẫu: Night Work Pack 2026-10-21 (Drive 1ei7k_ENSM8aXBgDjXkAgxpQmhsKnk4d6_3ezLvJxul4).
- Tạo CF: liệt kê **mọi field bắt buộc (\*)** với giá trị chính xác, đặc biệt **動画ID = tên CF** (DM_movie) và **Release date** (catalog/movie). Đêm 15/10 thiếu → qa501 sai ID, TD-190-03/04 không publish được.
- Bước gắn CF vào trang / sửa trang phải có 1 dòng báo cáo riêng + link .aem.live kiểm tra (đêm 15/10 bỏ sót P1b dòng 6).
- Mỗi dòng report phải có Date + Env; việc chưa làm phải ghi `Not run` (không bỏ trống).

## Night Pack 16/10 – bắt buộc đưa vào (session Điều phối, 16:30) – tổng ≤ 3h
| Ưu tiên | US | Việc | ~phút |
|---|---|---|---|
| 1 | DSR-587/501 | Mở lần lượt CF `qa501-rel-1` … `qa501-rel-6` (`/content/dam/ykk/common/product-cf/test/`), tab 管理情報, ô **更新日** = 2026-10-01 (rel-1), 10-02 (rel-2), … 10-06 (rel-6); Save → Publish từng CF. Sau đó Assets `/content/dam/dsr/en/movies/standard/` → tích `qa501-main-a` → Quick Publish. Kiểm https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa501-main-a : 5 thẻ, thứ tự rel6, rel5, rel4, rel3, rel2 (rel1 không hiện). Report TC ID `DSR-501-P3-order`. | 20 |
| 2 | DSR-557 | CF `qa190-cat-ebook` và `qa190-cat-ebook-form`: ô **ebookUrl** = `https://www.ykkfastening.com/` (đang sai = tên CF) → Save → Publish. TD-190-03/04: nhập **Release date** (bắt buộc) = 2026-09-15 rồi Publish. | 20 |
| 3 | DSR-566 | TD-566-01/02 + manual 017 (như us/DSR-566.md). | 60 |
| 4 | DSR-529 | Tạo trang test TD-529 theo TestData DSR-356. | 45 |
| 5 | DSR-457 | P5 cũ: item #1, #10 (chưa làm đêm 15/10). | 15 |
| 6 | DSR-552 | TC 026 làm lại: DevTools → Elements → chuột phải `<html>` → Copy outerHTML → dán vào Rich Results Test tab Code (không dùng view-source). | 10 |

## ⚠ QA-PT KHÔNG làm T7 17/10 và CN 18/10 (Dat xác nhận 16/10) → 17:10 T7/CN KHÔNG tạo Night Pack; việc manual dồn sang tối T2 19/10

## Lịch cuối tuần 16–18/10 (bản cũ, phần QA-PT T7/CN bị hủy – xem dòng trên) – 07:45 và 17:10 chạy cả T7/CN
| Thời điểm | QA-PT | Agent claude-code | Agent codex | Claude (tự động) |
|---|---|---|---|---|
| T6 16/10 tối | Night Pack 16/10 (6 việc ở trên, ≤3h) | JOB-20261016-07 (552 close-out) | — | 17:10 tạo pack · 18–22h Night TC job (backlog 10→17, đọc BL-OVL-1 cho 585/586/587) |
| T7 17/10 07:45 | — | Hold → queue nếu Night Report Pass: JOB-20261016-08 (566 rerun), JOB-20261015-12 (529), JOB-20261016-02/06 rerun e-book (557) | 566 visual 014/015 rerun trên TD-566-01 (390px) | Phân loại kết quả, tạo bug (draft, chờ Dat duyệt), chốt Done 552/557/566 nếu đạt |
| T7 17/10 tối | Night Pack 17/10: retest fail của 566/529/557 + data overlay DSR-587 (chỉ khi Martin trả lời câu 1) | Job do 07:45/17:10 xếp | — | 18–22h Night TC job |
| CN 18/10 | Night Pack 18/10: dự phòng – việc chưa xong + manual 529 | Rerun còn lại | Visual 529 | 18–22h Night TC job (backlog phải xong) |
| T2 19/10 07:45 | — | — | — | Tổng kết: TC 17/17, 552/557/566/529 Done DEV, báo Dat |
Nguyên tắc: job dựa trên data QA-PT để sẵn ở `jobs/hold/` với điều kiện; lượt 07:45 chuyển sang queue khi Night Report có Pass.

## Lịch cuối tuần – bản chốt (16/10 17:20)
| Thời điểm | QA-PT | Agent claude-code | Agent codex | Claude (tự động) |
|---|---|---|---|---|
| T6 16/10 tối | Night Pack 16/10 (đêm duy nhất tới T2) | JOB-20261016-07 (552 close-out) | — | 18–22h viết TC |
| T7 17/10 | **nghỉ** | 07:45 chuyển hold→queue: JOB-20261016-08 (566 trên TD-566), JOB-20261015-12 (529), rerun 557 e-book, 501 order (nếu Martin đã re-preview) | 566 visual 014/015 (390px) trên TD-566-01 | 07:45 phân loại · 17:10 không tạo pack, chỉ xếp job agent · 18–22h viết TC |
| CN 18/10 | **nghỉ** | rerun còn lại / retest bug đã fix | visual 529 | như T7 – backlog TC phải xong |
| T2 19/10 | Night Pack 19/10: retest fail + manual 529/566 + data overlay DSR-587 | — | — | 07:45 tổng kết + đề xuất Done · 08:30 nhắc 611/457 |

## Ghi chú 16/10 17:45
- DSR-647/501-P3: trang overlay trên nhánh Martin KHÔNG tự tạo lại sau khi publish CF related (JOB-20261016-09: last-modified 06:43Z). Kết quả Việc 1 của QA-PT tối 16/10 nếu "Fail" = **blocked-env**, không phải bug. Cần Martin re-preview sau khi QA-PT set 更新日 → Dat nhắn Martin sáng T2 19/10.
- DSR-552: B3 đã gỡ (JOB-09 8/8 pass HOME). Còn 026 (QA-PT tối 16/10). Bug mở chỉ Low (DSR-648, DSR-651). → đề xuất Done DEV khi 026 Pass.

### Night Pack 22/10 – chuyển sớm sang Agent Author (Claude 22/10 09:40, Dat duyệt đẩy sớm, không chờ S13)
- Ban ngày 22/10 agent làm thay (JOB-20261022-06 dry-run → JOB-20261022-07 apply, hạn 16:30): **BUGCHK-586-01/02**, **BUGCHK-190-FORM** (nếu trong guard), **TD-654-02, 04–08**.
- 17:10 khi tạo pack: đọc `results/JOB-20261022-07/summary.md`. Item nào **done + L0–L3 pass** → trong pack thay bằng "Shadow check ≤ 5 phút" (QA-PT mở URL, xác nhận đúng giá trị, ghi Night Report `SHADOW-<TD>`; không sửa gì). Item failed/không làm → giữ nguyên task đầy đủ cho QA-PT như cũ (giá trị inline).
- Vẫn QA-PT: TD-566 trang news (UE, P2/P3 chưa có), TD-654-03 (cần xóa), TD-586-01 optional fields (giá trị ở Drive doc), 570 manual, TD-586 en + negative, TD-587 negative. Giờ trống → thêm manual TC tồn (giữ ~4h).
- Bậc: CF data Night 22/10 = **B2 (Agent + QA-PT shadow)**, sớm hơn roadmap 1 sprint.
- 12:05 review JOB-20261022-09: agent ghi **P1B-PROBE, BUGCHK-190-FORM, TD-654-02/04/06/07/08** (JOB-07). **TD-586 (BUGCHK-586-01/02) + TD-654-03 + TD-654-05 vẫn QA-PT** (ngoài guard `qa*` / cần xóa / sub-folder). BUGCHK-586 chỉ còn bước Preview/Publish (giá trị field đã đúng – JOB-09 đọc lại).
