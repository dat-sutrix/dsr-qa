# SPRINT-SCOPE – Sprint 12 (toàn bộ ticket dev đang mở, góc nhìn QA)

`last_full_read_utc: 2026-10-23T06:20:00Z` · Sprint 12: **15/10 – 27/10**, QA chỉ **DEV** · Nguồn: JQL `project = DSR AND sprint = 3275 AND statusCategory != Done AND (labels is EMPTY OR labels != qa-tc) AND issuetype != Epic` → **51 ticket**, đọc đủ description + toàn bộ comment (không đọc changelog). Đọc trước khi hỏi dev/PM; sự thật đã chốt nằm ở [KNOWN-FACTS](KNOWN-FACTS.md).

**Theo status:** [Dev] In Testing 17 · In Progress 16 · To Do 16 · In Client Review 1 (541) · [STG] In Testing 1 (585).
**Ai là ai (từ ticket):** 石谷英樹 = phía khách (DSR-637: "クライアント（石谷さん）") – đang tự test 578/649/661/610. Tsukiji = dev lead comment trạng thái; Nakamoto = mail + search; Mayuka (千葉) = site structure; Martin = overlay/CF/list; Ngọc = FE block; Kohei = TL/deploy; Numata = CF design; Quentin = PM.

Cột QA coverage: TC = file `hub/tc-out/`; spec = `tests/`; "ai test" = người đang test thực tế. Regression impact theo [regression/README §2](regression/README.md).

## 1. Bảng scope

### Overlay / CF model
| Ticket | Loại | Assignee | Status | Làm gì (1 dòng) | QA coverage | Regression impact | Chờ ai / blocker | Rủi ro QA |
|---|---|---|---|---|---|---|---|---|
| [DSR-669](https://sutrix.atlassian.net/browse/DSR-669) | Task | Martin | In Progress | Đổi tên DM_*_related → DM_*_dsr, 8 persisted query → dm*DsrList, migrate cq:model + republish; fullstack + eds deploy cùng lúc | none (không TC riêng) – kiểm qua regression P1 | `cf-model`,`query` → toàn bộ P1 + 529 + 585 | Draft PR eds#212 / fullstack#108; chờ approve | 🔴 Deploy cuối sprint → vỡ cả 3 overlay + list; Agent Author/manifest/fixture đổi tên model |
| [DSR-670](https://sutrix.atlassian.net/browse/DSR-670) | Task | Martin | In Progress | Model mới DM_techmovie_dsr cho `movies/tech/`, query `dsr-techmovie-page`, policy chỉ cho model đúng folder | none – 587 tech-talk TC | `cf-model`,`query` → 587 tech-talk, 557 | Sau 669 (PR riêng) | 🟠 CF tech-talk QA (qa587-*) phải migrate; tạo CF sai folder sẽ bị chặn |
| [DSR-671](https://sutrix.atlassian.net/browse/DSR-671) | Task | Martin | In Progress | Catalog thêm hubspotFormId/promoText; productLabel = {productId}｜{productName}; bỏ relatedMoodboards; picker relatedArticles/Contents chỉ article; check ngôn ngữ ref; dsrFeatures forceSelection; product detail ẩn catalog/video isActive=false | none – ảnh hưởng 586/654/570 TC | `cf-model` + `block:product-detail` → P1 + 586 related | Kohei LGTM 23/10; 4 open question trong ticket | 🟠 TC 586 related catalog/video cần case isActive=false (mới) |
| [DSR-585](https://sutrix.atlassian.net/browse/DSR-585) | Task | Quentin | [STG] In Testing | DM_product theo bản fix (110→85 field) + template nhập | TC ✅ · spec `product-cf/DSR-585` · QA DEV | `cf-model` → 586, 182/560 | STG ngoài S12 | Doc mới nhất = Quentin c.61605 (20/10) |
| [DSR-586](https://sutrix.atlassian.net/browse/DSR-586) | Task | Dat | [Dev] In Testing | Product detail overlay json2html `/{lang}/products/{id}` | TC ✅ · spec `product-detail/DSR-586` · QA agent + QA-PT | P1 `@overlay` | Tsukiji: dev test chờ DSR-634 | 669/671 đổi query |
| [DSR-587](https://sutrix.atlassian.net/browse/DSR-587) | Task | Dat | [Dev] In Testing | Video detail overlay + tech-talk URL + regex/paths.json 3 ngôn ngữ | TC ✅ · spec `movie-detail/DSR-587*`, `overlay-seo` | P1 `@overlay` | – | 670 đổi model tech-talk |
| [DSR-654](https://sutrix.atlassian.net/browse/DSR-654) | Sub-task | Dat | [Dev] In Testing | Catalog overlay `/{lang}/library/catalog/{id}` | TC ✅ 21 TC · spec `catalog-overlay/DSR-654` | P1 `@overlay` | – | 671 hubspotFormId/promoText chưa có design TC |
| [DSR-606](https://sutrix.atlassian.net/browse/DSR-606) | Question | Quentin | To Do | 9 câu về DAM path CF/asset, mã ngôn ngữ, quy tắc ID, URL catalog, model mới | – | – | Chưa ai trả lời (0 comment) | Q6/7/8 đã có đáp án ngầm ở 669–671 (xem §3); Q2/3/4/5/9 vẫn mở |
| [DSR-614](https://sutrix.atlassian.net/browse/DSR-614) | Task | Kohei | In Progress | Thiết kế CF (product/catalog/movie/techmovie, 7 sheet Numata) | – | gián tiếp (nguồn spec 669–671) | Kohei review → gửi YKK | Spec CF có thể đổi tiếp sau review khách |

### Lists
| Ticket | Loại | Assignee | Status | Làm gì | QA coverage | Regression impact | Chờ ai / blocker | Rủi ro QA |
|---|---|---|---|---|---|---|---|---|
| [DSR-557](https://sutrix.atlassian.net/browse/DSR-557) | Task | Dat | [Dev] In Testing | Video player + catalog list/hiển thị (DSR-190) | TC ✅ · spec `catalog-video/DSR-557` | P1 list | CB-4 (611 Q1/Q2) | Có **2 bộ TC** (QA + DSR-558 dev) |
| [DSR-558](https://sutrix.atlassian.net/browse/DSR-558) | Task | Nakamoto | In Progress | Dev tạo TC cho DSR-190 (Google Sheet) + Tsukiji test | TC dev (Sheet c.60454) – không đồng bộ với TC QA | – | Quentin 22/10: blocked by 664 (664 Done 23/10) | Trùng việc QA 557; kết quả 2 bên có thể lệch |
| [DSR-578](https://sutrix.atlassian.net/browse/DSR-578) | Bug | 石谷 (khách) | In Progress | Fix design 6 list (eco product, article, actual-cases, video, catalog, news) | none (khách test) | `block:list` → 557, 583, 590 list | 石谷 xác nhận tag field (Martin 22/10) | Thay CSS list → visual baseline list đổi |
| [DSR-611](https://sutrix.atlassian.net/browse/DSR-611) | Question | Dat | To Do | Câu hỏi QA 557: direct URL, cn Youku, NEW/UPDATE 10 ngày, Youku ID | – | – | Q1/Q2 Numata (CB-4), Q3 Kohei | Đang dùng mặc định |

### Catalog DL / HubSpot
| Ticket | Loại | Assignee | Status | Làm gì | QA coverage | Regression impact | Chờ ai / blocker | Rủi ro QA |
|---|---|---|---|---|---|---|---|---|
| [DSR-570](https://sutrix.atlassian.net/browse/DSR-570) | Task | Dat | In Progress | Catalog download + form (DSR-192) | TC ✅ (DSR-192 xlsx) · spec `catalog-download/DSR-570`, `catalog-detail/DSR-570.visual` | P1 570 | CB-1/2/3 HubSpot | Form TC → S13+ |
| [DSR-607](https://sutrix.atlassian.net/browse/DSR-607) | Task | **unassigned** | To Do | Ticket "Test" của DSR-192 | **none trên Jira** (TC QA nằm ở 570) | – | Không owner | Dev/PM không thấy kết quả test 192 |
| [DSR-655](https://sutrix.atlassian.net/browse/DSR-655) | Question | Quentin | To Do | Câu hỏi khách HubSpot (Y1–Y6 YKK, L1–L7 LOWP) | – | – | Khách (CB-1/2/3, CB-11) | 0 comment |

### News / Article
| Ticket | Loại | Assignee | Status | Làm gì | QA coverage | Regression impact | Chờ ai / blocker | Rủi ro QA |
|---|---|---|---|---|---|---|---|---|
| [DSR-566](https://sutrix.atlassian.net/browse/DSR-566) | Task | Dat | [Dev] In Testing | News detail template news-article | TC ✅ 18 TC · spec `news-detail/DSR-566` | P2 `template:news-detail` | – | Quentin ghi "blocked" sai (đã đính chính) |
| [DSR-653](https://sutrix.atlassian.net/browse/DSR-653) | Task | Dat | In Progress | Ticket test của DSR-357 | = 566 | P2 | – | – |
| [DSR-529](https://sutrix.atlassian.net/browse/DSR-529) | Task | Dat | [Dev] In Testing | Article detail (page + page properties, không CF) | TC ✅ · spec `article-detail/DSR-529` | P2 `template:article` | data QA-PT | 671 #6/#7 giới hạn picker related article |

### Eco
| Ticket | Loại | Assignee | Status | Làm gì | QA coverage | Regression impact | Chờ ai / blocker | Rủi ro QA |
|---|---|---|---|---|---|---|---|---|
| [DSR-590](https://sutrix.atlassian.net/browse/DSR-590) | Task | Dat | [Dev] In Testing | Eco TOP (C14) + detail template (C15) | TC ✅ 16 · spec `eco-products/DSR-590*` | P2 | 667; ảnh nền khách cuối 10 (CB-9) | Ảnh thật về → visual baseline đổi |
| [DSR-667](https://sutrix.atlassian.net/browse/DSR-667) | Bug | Ngọc | In Progress | SP carousel chấm 9 bị cắt ≤ 393 px | QA retest JOB-23-12 | `fix:DSR-667` → 590 | Ngọc (Dat c.65005: chưa fix, chấm bị container cắt 1/4/19 px) | 590 không Done tới khi fix |

### TOP / Booth / Layout fixes (khách test)
| Ticket | Loại | Assignee | Status | Làm gì | QA coverage | Regression impact | Chờ ai / blocker | Rủi ro QA |
|---|---|---|---|---|---|---|---|---|
| [DSR-649](https://sutrix.atlassian.net/browse/DSR-649) | Bug | 石谷 (khách) | [Dev] In Testing | Fix TOP theo sheet test khách (DSR-196) | spec `top/DSR-609`, `top-page/DSR-609.visual` (regression, không test sheet khách) | P1 TOP | #8 hover 仕様未決定; search-result chưa làm | Fix TOP → smoke/609 visual đổi |
| [DSR-661](https://sutrix.atlassian.net/browse/DSR-661) | Bug | 石谷 (khách) | [Dev] In Testing | Fix booth (DSR-172): related content, CTA modal | TC ✅ (DSR-172 xlsx, `tc-out/DSR-608.spec.json`) · **không có spec** | `block:related-content` → booth, 586 | #9 modal chờ YKK (CB-10); fix Martin "must be deployed to DEV" | Video chưa hiện trong related content (query thiếu tag) |
| [DSR-610](https://sutrix.atlassian.net/browse/DSR-610) | Task | 石谷 (khách) | **[Dev] In Testing** | Test trang DIGITAL SHOWROOM (DSR-172) | TC ✅ (DSR-172 xlsx) · **không spec, us/DSR-610.md dừng 15/10 ("To Do")** | P2 booth | Q16/Q17/Q19; ảnh các tầng Martin đang làm (649 c.64890) | QA chưa biết ticket đã sang testing |

### Site structure / pages (DSR-636 family – ja, DEV)
| Ticket | Loại | Assignee | Status | Làm gì | QA coverage | Regression impact | Chờ ai / blocker | Rủi ro QA |
|---|---|---|---|---|---|---|---|---|
| [DSR-637](https://sutrix.atlassian.net/browse/DSR-637) | Task | Mayuka | To Do | Chốt danh sách URL công khai ja (~170 trang) + 13 điểm lệch map | none | – (nguồn URL cho mọi spec) | Khách sửa map (#2 …) → CB-7 | URL chưa chốt → automation hard-code path sẽ phải đổi |
| [DSR-638](https://sutrix.atlassian.net/browse/DSR-638) | Task | Mayuka | In Progress | Port trang test-space → URL chính thức; dời trang test khỏi `/ja` | none (IDLE-22 theo dõi) | `content` → 557, 570, 583, 590, 609, 529 list | Form contact chờ 646 | Path cũ **404** sau Move Page → spec/fixture vỡ |
| [DSR-639](https://sutrix.atlassian.net/browse/DSR-639) | Task | Mayuka | In Progress | Sửa href header/footer ja theo URL chốt + crawl toàn link | none | `global` (header/footer) → smoke + 552 + 609 | AC2 (all 200) chờ 640–646 | Smoke/header test dùng href cũ sẽ fail |
| [DSR-640](https://sutrix.atlassian.net/browse/DSR-640) | Task | Mayuka | To Do | Tạo 33 trang product section (search/select là port) | none | `content` | 637; G9 block | Trang rỗng (title-only) = đúng phạm vi |
| [DSR-641](https://sutrix.atlassian.net/browse/DSR-641) | Task | Mayuka | To Do | 36 trang application/industrial (actual-cases port) | none | `content` → 578 actual-cases | 637; DSR-564, G9 | như trên |
| [DSR-642](https://sutrix.atlassian.net/browse/DSR-642) | Task | Mayuka | To Do | 16 trang performance (eco product-index port) | none | `content` → 590 | 637 #2 | như trên |
| [DSR-643](https://sutrix.atlassian.net/browse/DSR-643) | Task | Mayuka | To Do | 31 trang collection/trend | none | `content` | G9; Japan collection chưa design | như trên |
| [DSR-644](https://sutrix.atlassian.net/browse/DSR-644) | Task | Mayuka | To Do | 18 trang gallery (YFA, student collab) | none | `content` | 637 | như trên |
| [DSR-645](https://sutrix.atlassian.net/browse/DSR-645) | Task | Mayuka | To Do | 10 trang library (article/catalog/video list port) | none | `content` → 557, 529 list | 638 | như trên |
| [DSR-646](https://sutrix.atlassian.net/browse/DSR-646) | Task | Mayuka | To Do | 21 trang about/contact/legal/mylist | none | `content` → 568 form contact | 637; mypage chưa quyết | Form contact đổi URL |

### Search
| Ticket | Loại | Assignee | Status | Làm gì | QA coverage | Regression impact | Chờ ai / blocker | Rủi ro QA |
|---|---|---|---|---|---|---|---|---|
| [DSR-560](https://sutrix.atlassian.net/browse/DSR-560) | Task | Nakamoto | In Progress | Sinh JSON tìm kiếm (DSR-182) | TC ✅ (DSR-182 xlsx, `tc-out/DSR-560.spec.json`) · không spec | `query` → 583/586 | Tsukiji 19/10: chờ 585; Q14 URL JSON | Chưa testable trong S12 [Giả định] |

### Mail (DSR-433 SendGrid)
| Ticket | Loại | Assignee | Status | Làm gì | QA coverage | Regression impact | Chờ ai / blocker | Rủi ro QA |
|---|---|---|---|---|---|---|---|---|
| [DSR-433](https://sutrix.atlassian.net/browse/DSR-433) | Task | Nakamoto | In Progress | Nền tảng gửi mail SendGrid (cha 541–549) | TC ✅ (DSR-433 xlsx) · spec `mail/DSR-433.mail-endpoints` | P3 | CB-6, CB-11 | – |
| [DSR-541](https://sutrix.atlassian.net/browse/DSR-541) | Sub-task | Quentin | In Client Review | Tài khoản SendGrid + SMTP Cloud Manager | thuộc TC 433 | – | Toan 02/10 "依頼済み" (org account) | Đang dùng trial cá nhân |
| [DSR-543](https://sutrix.atlassian.net/browse/DSR-543) | Sub-task | Nakamoto | [Dev] In Testing | MailService (MessageGatewayService, From OSGi) | TC 433 · **không ai test** | – | – | From mặc định `noreply@ykkdigitalshowroom.com` |
| [DSR-544](https://sutrix.atlassian.net/browse/DSR-544) | Sub-task | Nakamoto | [Dev] In Testing | Model MailTemplate + render 3 ngôn ngữ, fallback en | TC 433 · **không ai test** | – | Q42 zh vs cn | cn site → mail tiếng Anh nếu truyền `cn` |
| [DSR-545](https://sutrix.atlassian.net/browse/DSR-545) | Sub-task | Nakamoto | [Dev] In Testing | Sling Job queue, retry 5 × 30 s | TC 433 · **không ai test** | – | – | Chỉ kiểm được qua log (cần dev) |
| [DSR-546](https://sutrix.atlassian.net/browse/DSR-546) | Sub-task | Nakamoto | [Dev] In Testing | Webhook `/bin/ykk/mail/webhook` (POST, publish, Ed25519) | spec `mail/` (endpoint) · **không ai test E2E** | – | CB-6 (Quentin 22/10) | – |
| [DSR-547](https://sutrix.atlassian.net/browse/DSR-547) | Sub-task | Nakamoto | [Dev] In Testing | Allowlist người nhận DEV/STG | TC 433 · **không ai test** | – | Q43: biến chưa đăng ký DEV (25/09) | DEV đang gửi không giới hạn |
| [DSR-548](https://sutrix.atlassian.net/browse/DSR-548) | Sub-task | Nakamoto | [Dev] In Testing | E2E mail tham chiếu ja/en/zh, Gmail/Outlook/carrier | TC 433 · **không ai test, 0 comment** | – | Q43 địa chỉ test | Không có bằng chứng E2E |
| [DSR-549](https://sutrix.atlassian.net/browse/DSR-549) | Sub-task | Nakamoto | In Progress | Tài liệu thêm mail mới | – | – | – | Nội dung đã có ở c.59558 |

### Migration / assets
| Ticket | Loại | Assignee | Status | Làm gì | QA coverage | Regression impact | Chờ ai / blocker | Rủi ro QA |
|---|---|---|---|---|---|---|---|---|
| [DSR-227](https://sutrix.atlassian.net/browse/DSR-227) | Task | Kohei | In Progress | DAM structure, naming, DM preset, mẫu migrate sản phẩm (hạn import 10/23) | TC ✅ · spec `asset-migration/DSR-227` | P3 | Quentin hỏi Kohei preset DM (c.64936) | Không có asset design doc → TC 1.0+ mặc định |
| [DSR-582](https://sutrix.atlassian.net/browse/DSR-582) | Task | Quentin | In Progress | Trích dữ liệu video/catalog site cũ → Excel cho YKK | – (nguồn Youku ID) | – | CB-5 SharePoint | Data thật 557/654 không có trong S12 |
| [DSR-589](https://sutrix.atlassian.net/browse/DSR-589) | Task | Martin | To Do | Thay icon chính thức (A03) | TC ✅ · spec `icons/DSR-589` | P2 | Icon khách (CB-8) | Không testable S12 [Giả định] |

### Design / docs / questions
| Ticket | Loại | Assignee | Status | Làm gì | QA coverage | Regression impact | Chờ ai / blocker | Rủi ro QA |
|---|---|---|---|---|---|---|---|---|
| [DSR-663](https://sutrix.atlassian.net/browse/DSR-663) | Task | Kohei | [Dev] In Testing | Gom tài liệu cho Adobe Solution Design review (15 mục) | none | – | – | Mục 13 "test plan" = **không có tài liệu** → QA có sẵn |
| [DSR-656](https://sutrix.atlassian.net/browse/DSR-656) | Task | Tsukiji | To Do | Quyết độ chi tiết 機能設計書 | – | – | – | – |
| [DSR-615](https://sutrix.atlassian.net/browse/DSR-615) | Task | Numata | To Do | Thiết kế cấu trúc tag (description trống) | – | – | – | Ảnh hưởng tag eco/booth sau này |
| [DSR-616](https://sutrix.atlassian.net/browse/DSR-616) | Task | Numata | To Do | Thiết kế chức năng common block (trống) | – | – | – | – |

## 2. QA gaps (đề xuất – chưa thực hiện)
| # | Ticket | Gap | Đề xuất (ai / làm gì / khi nào) |
|---|---|---|---|
| G1 | DSR-638 / 639 | Port URL + đổi href header/footer: path test-space cũ 404, smoke/552/609 dùng href cũ | **Claude** 23/10 chiều: grep `master/ja/test-space` + href header trong `fixtures/`/`pages/` → bảng path cũ→mới (theo bảng 638/639); **agent** chạy R1 smoke + 552 mỗi lần Mayuka comment "published"; Dat xin Mayuka ping khi publish `/ja/nav` `/ja/footer` |
| G2 | DSR-543–548 mail | 6 sub-task [Dev] In Testing, không ai test; TC 433 có sẵn | **Dat** gửi Nakamoto 24/10: xin 30' demo gửi mail e2e-test (ja/en/zh) với QA quan sát + xác nhận allowlist DEV (Q43); TC webhook/E2E vẫn Blocked CB-6; **không** tự gọi `/bin/ykk/mail/test-send` (cần admin auth – trái quy tắc read-only) |
| G3 | DSR-610 | [Dev] In Testing (khách 石谷 test), QA không biết – us/DSR-610.md dừng 15/10, không spec | **Claude** 23/10: cập nhật us/DSR-610.md; **agent (codex)** 26/10: job read-only từ `tc-out/DSR-608.spec.json` + DSR-172 xlsx phần 610 (URL `/ja/digital-showroom`, giữ mặc định Q16/Q19) |
| G4 | DSR-607 | Ticket test DSR-192 không owner | **Dat** nhờ Quentin 24/10 giao 607 cho Dat; Claude comment link TC/run 570 vào 607 khi được giao |
| G5 | DSR-661 | Fix related content cần deploy; QA không có spec booth | **Agent** sau khi Martin báo deploy: check read-only `/ja/digital-showroom/both/item` (badge, click card, ẩn khi 0 kết quả, chỉ cùng ngôn ngữ); video = N/A tới khi query có tag |
| G6 | DSR-640–646 | ~165 trang ja mới, không TC | **Claude** khi 637 chốt: 1 spec `site-structure` đọc PDF danh sách URL → HTTP 200 + `<title>` + `lang=ja` (= AC1/AC3 của 640–646); chạy 1 lần/ngày sau 26/10; trang rỗng không phải fail |
| G7 | DSR-669/670/671 | Không TC riêng; 671 thêm hành vi mới (ẩn catalog/video isActive=false trên product detail, check ngôn ngữ ref) | **Claude** 24/10: thêm 2–3 TC vào file 586 (related catalog/video isActive=false; label `{productId}｜{productName}`), chạy cùng JOB-23-11 khi Martin ping deploy |
| G8 | DSR-558 vs 557 | 2 bộ TC cho cùng DSR-190 (dev Sheet + QA xlsx) | **Dat** gửi Tsukiji link TC QA + kết quả run 557 (26/10), đề xuất 558 dùng kết quả QA thay vì test lại |
| G9 | DSR-663 | Adobe hỏi "test plan" (#13), dự án chưa có | **Dat** đề xuất Kohei 24/10: dùng `regression/README.md` + test strategy (2 lớp CF/Page, DEV→STG→PRO) làm bản nháp mục 13 |
| G10 | DSR-578 / 649 | Khách fix CSS list/TOP → baseline visual đổi | **Agent codex** lượt visual kế tiếp: đánh dấu diff list/TOP là "expected change (578/649)" thay vì L&F mới |

## 3. Facts that answer questions (đọc trước khi hỏi)
- DSR-606 Q7 (model mới, khi nào): đổi tên DM_*_related → DM_*_dsr + migrate mọi CF `/content/dam/dsr/` trong DSR-669 – [DSR-669](https://sutrix.atlassian.net/browse/DSR-669)
- DSR-606 Q8 / tc Q32 (tech-talk): model riêng `DM_techmovie_dsr`, folder `/content/dam/dsr/{lang}/movies/tech/`, trang `/{lang}/library/video/tech-talk/{movieId}`, cùng template video – [DSR-670](https://sutrix.atlassian.net/browse/DSR-670)
- DSR-606 Q8: `dsrFeatures` / `isBoothLimited` **có** trong DM_movie_dsr (thêm lại 20/10) – [DSR-671](https://sutrix.atlassian.net/browse/DSR-671)
- tc Q33 (thứ tự related): product detail 関連コンテンツ sắp theo ngày cập nhật mới nhất trước = đúng – [DSR-671](https://sutrix.atlassian.net/browse/DSR-671) #11
- Booth 関連コンテンツ: chỉ nội dung **cùng ngôn ngữ** có ≥ 1 tag của block, mới nhất trước; 0 kết quả → block ẩn (トルツメ, by design), UE hiện 「このタグを持つページはまだありません。」; cache list CF ≤ 5'; video chưa hiện được (query thiếu tag) – [DSR-661 c.64907](https://sutrix.atlassian.net/browse/DSR-661?focusedCommentId=64907)
- Booth CTA modal (tc Q18): nội dung vẫn chờ YKK (9/30) → 661 #9 on hold – [DSR-661 c.64723](https://sutrix.atlassian.net/browse/DSR-661?focusedCommentId=64723)
- Eco product list: tiêu đề nhóm (バイオベース…) lấy từ field CF product **社内認証 (`internalCertifications`)**; field trống → 0 heading = data, không phải bug – [DSR-578 c.60542](https://sutrix.atlassian.net/browse/DSR-578?focusedCommentId=60542)
- Actual-cases: nút category 226.75 px chỉ khi khung promo catalog được author; không author → 291 px (by design) – [DSR-578 c.60542](https://sutrix.atlassian.net/browse/DSR-578?focusedCommentId=60542)
- Article list: chỉ section PICK UP có heading, phần còn lại không heading = cố ý – [DSR-578 c.60542](https://sutrix.atlassian.net/browse/DSR-578?focusedCommentId=60542)
- TOP #8: hover cho 製品条件検索 / DIGITAL SHOWROOM / 製品クイック検索 = 仕様未決定 – [DSR-649 c.61568](https://sutrix.atlassian.net/browse/DSR-649?focusedCommentId=61568)
- DSR-638: Move Page tự unpublish path cũ → path cũ **404**; `/ja/member` (Okta test) giữ lại; `/ja/product-detail`, `/ja/library/video/search/video-detail` bị dời (overlay thay); form contact port sau DSR-646 – [DSR-638](https://sutrix.atlassian.net/browse/DSR-638) · [c.64706](https://sutrix.atlassian.net/browse/DSR-638?focusedCommentId=64706)
- DSR-639: AC "mọi link header/footer 200" chỉ verify lại sau 640–646; cn nav đang trỏ `/en/…` (ghi nhận, chưa sửa) – [DSR-639 c.64707](https://sutrix.atlassian.net/browse/DSR-639?focusedCommentId=64707)
- DSR-637: quy tắc URL (đề xuất, **chưa chốt**): `/jp`→`/ja`, `_`→`-`, chữ thường, không `/` cuối; legal → `/ja/legal/…`; contact → `/ja/contact-us`; 3D → `/ja/product/ykk-trim-creator` – [DSR-637](https://sutrix.atlassian.net/browse/DSR-637)
- DSR-640–646: chỉ DEV; trang không có block/CF → chỉ title + template + property (rỗng là đúng phạm vi) – [DSR-640](https://sutrix.atlassian.net/browse/DSR-640)
- Mail: template CF tại `/content/dam/ykk/mail-templates/<templateId>/<ja|en|zh>`, thiếu ngôn ngữ → fallback `en`; node name phải là ja/en/zh; phải Publish – [DSR-433 c.59430](https://sutrix.atlassian.net/browse/DSR-433?focusedCommentId=59430)
- Mail: queue retry 5 lần × 30 s; người nhận ngoài allowlist → **không gửi, chỉ WARN log, không lỗi**; webhook thiếu verification key → bỏ qua verify + WARN – [DSR-545 c.59302](https://sutrix.atlassian.net/browse/DSR-545?focusedCommentId=59302) · [DSR-547 c.59308](https://sutrix.atlassian.net/browse/DSR-547?focusedCommentId=59308) · [DSR-546 c.59305](https://sutrix.atlassian.net/browse/DSR-546?focusedCommentId=59305)
- Mail: SendGrid đang là trial cá nhân (Single Sender), chờ org account; `MAIL_RECIPIENT_ALLOWLIST_PATTERN` chưa đăng ký DEV (25/09) – [DSR-433 c.59553](https://sutrix.atlassian.net/browse/DSR-433?focusedCommentId=59553)
- DSR-586/587: dev (Tsukiji) chỉ test được sau DSR-634 (Chiba) – [DSR-586 c.61303](https://sutrix.atlassian.net/browse/DSR-586?focusedCommentId=61303)
- DSR-560: dev chờ DSR-585 – [DSR-560 c.61307](https://sutrix.atlassian.net/browse/DSR-560?focusedCommentId=61307)
- DSR-585: tài liệu product CF mới nhất = Sheet `1uUgIMKK…` (bản cũ đính kèm sai) – [DSR-585 c.61605](https://sutrix.atlassian.net/browse/DSR-585?focusedCommentId=61605)
- DSR-529 phạm vi: không gồm block breadcrumb (DSR-458), article list (DSR-170), migrate 70 bài (DSR-225), C06 – [DSR-529](https://sutrix.atlassian.net/browse/DSR-529)
- DSR-570 demo: chỉ layout, form HTML chưa chạy, sau sẽ là HubSpot – [DSR-570 c.61054](https://sutrix.atlassian.net/browse/DSR-570?focusedCommentId=61054)
- DSR-649 #12: field News list trên TOP tự lấy tin cùng ngôn ngữ; cn TOP không có data – [DSR-649 c.64890](https://sutrix.atlassian.net/browse/DSR-649?focusedCommentId=64890)

## 4. Changes affecting regression (từ ticket; dòng mới đã thêm vào [CHANGES.md](regression/CHANGES.md))
| Ngày (JST) | Ticket | Loại (README §2) | Thay đổi | Trạng thái |
|---|---|---|---|---|
| 23/10 14:32 | DSR-667 c.65003 | `fix:DSR-667`, `block:eco-carousel` | Ngọc build DEV fix dot carousel → QA retest: chưa đạt | deployed |
| 22/10 18:07 | DSR-661 c.64907 | `block:related-content`, `content` | Martin fix related content + author `/ja/digital-showroom/both/item`; "must be deployed to DEV" | pending deploy |
| 21/10 → | DSR-610 (649 c.64890) | `block:<digital-showroom>` | Martin sẽ thêm ảnh các tầng DIGITAL SHOWROOM | pending |
| S12 (In Progress) | DSR-639 | `global` | href header/footer ja đổi sang URL chốt | pending |
| S12 (To Do) | DSR-640–646 | `content` | ~165 trang ja mới / port | pending |
| 23/10 (pending) | DSR-669/670/671 | `cf-model`,`query` | đã có trong CHANGES.md | pending |
| 22/10 · 21/10 · 20/10 | 654 / 587 / 585 | `global` | deploy `dev/2026.10.22` bf2073a (đã có) · `dev/2026.10.21` a16f746 · `dev/2026.10.20(_2)` 2ac176e/1845066 | đã phủ bởi baseline R2 P1+P2 23/10 12:00 – không thêm dòng |
