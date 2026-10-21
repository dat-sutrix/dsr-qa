# Daily standup 2026-10-21 (Thứ Tư)

> Generated 08:20 (UTC+7) from git log since 20/10 08:00, DASHBOARD/BUGS/PLAN, Night Report 20/10 and Jira (21/10 08:20).

**Yesterday**
- DSR-552 Done on Jira; bugs DSR-648, DSR-651 closed.
- DSR-529 rerun (JOB-20261020-10): 12 pass / 19 fail → filed DSR-657, DSR-658, DSR-659 (Martin).
- DSR-585/586 TCs re-baselined to DM_product ver0.4 (19 + 21 TC), uploaded to Drive.
- QA-PT seeded DSR-587/647/557 and catalog CFs, but all overlay pages return 404; DSR-570 manual not run.

**Today**
- Unlock overlay 404: turn on 表示フラグ + publish DSR CF qa587-main (DSR-587, DSR-647, DSR-557).
- Agents: IDLE-19 full regression, IDLE-20 DSR-585 ver0.4 scaffold; 557/587/647 jobs wait for 404 fix.
- Tonight QA-PT: DSR-529 robots/republish, TD-586 on ver0.4, catalog NEW/UPDATE, DSR-587 negatives.
- Triage DSR-529 remaining fails; prepare Done DEV proposals for 22/10 deadline.

**Blockers / need help**
- Overlay pages 404 · Martin (if 表示フラグ fix fails) · DSR-587/647/557/570 · 21/10 morning.
- DSR-657/658/659 fixes + meta-name question · Martin · DSR-529 · 22/10.
- DM_product ver0.4 finished? · Martin · DSR-586 (TD-586 tonight) · 21/10.
- news-article template · Quentin · DSR-566/653 · 21/10 17:00, else Sprint 13.

## 🐞 Bug < 80% – Dat chốt sáng nay
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

## 📣 Báo Martin
Nguồn: JOB-20261020-09 (regression 20/10) · JOB-20261020-10 (529 rerun: 19 fail đều cause none – không liên quan merge) · Night 20/10 (overlay 404). Jira 21/10 08:20: Martin chưa trả lời mới.

| URL | Triệu chứng | cause | Lần đầu | Evidence |
|---|---|---|---|---|
| /en/library/video/qa587-main (+ mọi video/catalog overlay mới seed) | 404 trên .page và .live dù CF đã tạo | overlay-merge (70% data: 表示フラグ OFF + DSR CF Draft) | Night 20/10 | Night Report 20/10 (ảnh DSR CF qa587-main) |
| .aem.live /{ja,en}/library/catalog/qa190-cat-pdf-form | 404 .live (200 .page) – card requiresForm PDF dẫn tới đây | overlay-merge (catalog) | JOB-20261020-05 | results/JOB-20261020-09/evidence/DSR-CATDL-006_{ja,en}.png |
| list-catalog / catalog-video: card e-book requiresForm | dẫn tới /{lang}/library/catalog/qa190-cat-ebook-form thay vì ebookUrl | overlay-merge (DSR-655 Y3) | JOB-20261020-05 | …/DSR-CATDL-018_{ja,en}.png, …/DSR-CATV-017_{ja,en}.png |
| publish GraphQL dsr-product-page | field đổi tên (howToUse/notice, applicableSliderSameAsParent); product-detail vẫn tên cũ (Q46) | dm_product-ver0.4 | JOB-20261020-09 | results/JOB-20261020-09/raw.md#1 |
| .aem.live /{ja,en}/library/video/search | 404 .live, 200 .page | none (theo dõi) | JOB-20261020-09 | results/JOB-20261020-09 |

Tin gửi Martin (copy, 21/10 sáng):
> Hi Martin, QA status on DEV after the 20/10 merges: (1) Video/catalog overlay pages for our new test CFs (e.g. /en/library/video/qa587-main, /{lang}/library/catalog/qa190-cat-pdf-form) are 404 on .aem.page and .aem.live. The DSR CF (DM_movie_related) has no field labelled isActive, only 表示フラグ – is that the flag? We will turn it ON and publish; if still 404 we need your help. (2) E-book cards with requiresForm=true now go to /library/catalog/<id> instead of opening ebookUrl – we treat this as DSR-655 Y3 and updated our TCs. (3) Is the DM_product ver0.4 update finished? product-detail still returns the old field names (Howtouse/Notice/applicableSliderStandard). Once you confirm, we run a product smoke and seed TD-586 tonight. (4) /{lang}/library/video/search is 404 on .aem.live but 200 on .aem.page. Thanks!

## 🆕 Ticket chưa lên kế hoạch
Jira: 10 ticket mở giao Dat · đã lên kế hoạch 8

| Ticket | Tiêu đề | Type / Status | Giao Dat | Việc QA đề xuất |
|---|---|---|---|---|
| [DSR-654](https://sutrix.atlassian.net/browse/DSR-654) | CATALOG Overlay化（json2html）(sub-task của DSR-586) | Sub-task / [Dev] In Testing | 20/10 13:34 (UTC+7, Martin) | Test ngay: gộp vào catalog seed + JOB-20261020-04 của 557/570 (cùng trang /library/catalog/<id>) |
| [DSR-538](https://sutrix.atlassian.net/browse/DSR-538) | [DSR-173] Related Content card link → AEM publish domain, HTTP 500 | Bug / [Dev] In Testing | 20/10 10:36 (UTC+7, Ngọc) | Retest bug trên trang overlay video mới (qa587-main relatedArticles) sau khi hết 404 |

Lệch DASHBOARD mục 1 vs Jira: DASHBOARD ghi "7 mở" (Jira 20/10 17:10) – Jira hiện 10 (566 và 653 là 2 ticket); thiếu dòng DSR-654, DSR-538. Không có ticket nào Done trên Jira mà DASHBOARD còn ghi mở.

Dat cần nhắc trong meeting: Martin – overlay 404 (表示フラグ), xác nhận ver0.4 và lịch fix DSR-657/658/659; Quentin – template news (566/653) trước 17:00.
