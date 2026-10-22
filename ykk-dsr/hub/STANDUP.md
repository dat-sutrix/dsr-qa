# Daily standup 2026-10-22 (Thứ Năm)

> Tạo 08:27 (UTC+7) [schedule standup] · nguồn: git log từ 21/10 08:00, DASHBOARD 22/10 07:50, BUGS.md, PLAN-sprint12 (RE-PLAN 19/10), Jira (16 ticket mở giao Dat), Night Report (không có dòng mới sau 21/10), summary JOB-20261022-01/-02, JOB-20261021-12, IDLE-31.

## A. 📋 Daily report – copy & paste vào group chat (EN)

```
QA Daily – 22/10 (DEV ENV)
Done

* DSR-529 article-detail: fixes retested: DSR-657 (image block duplicated), DSR-658 (tag chips) and DSR-660 (date format) pass on DEV. DSR-659 (thumbnail meta still a relative path, 404 on .aem.live) is not fixed yet, moved back to @martin portal . Re-run today: 6 pass / 9 fail (fails = DSR-659 + test data, no new product bug).
* DSR-647 (related movies) and DSR-538 (related card links on publish domain): retest pass on DEV. Will close today.
* DSR-587 video overlay: re-run of movie-detail checks on overlay pages 14/14 pass. New bug DSR-665 (High) filed to @martin portal : /ja|en/library/video/search reloads endlessly and stays blank.
* DSR-557 video part 16/16 pass. DSR-654: 21 TCs written + automation (11 pass, rest waiting for test data).
* DSR-664 filed (video block shows "null" when caption is empty).

In progress

* DSR-557 / 570 / 654 / 586: test data fixes found by automation (catalog form flag, product reference, preview) are scheduled tonight; automation re-run tomorrow morning.
* DSR-529: remaining fails are test data (category, robots on qa529-02) + DSR-659.
* DSR-587: negative cases (inactive flag etc.) seeded tonight.

Blockers / need help

* @martin portal : ~~please fix DSR-665~~ (✅ Done 22/10) and DSR-659 (thumbnail meta – reassigned with comment 64851). Also: og:image is "about:error" on every overlay page – could the space in the thumbnail file name "image 7.png" be the cause? Is the catalog list already on the overlay / language-filtered? (it still shows 15 old CFs, same 26 cards on ja and en). Is isActive OFF supposed to redirect to the list?
* @martin portal / @Quentin Milavec : non-form catalogs open the PDF directly with no detail page. Is this intended? (DSR-654)
* ~~@Quentin Milavec : news-article template for DSR-566/653 is still missing. We propose moving them to Sprint 13 – please confirm.~~ ✅ đã trả lời DSR-566 (Ngọc 19/10: template deployed DEV) – KHÔNG gửi. Thay bằng: "@Quentin Milavec : DSR-566/653 – the news-article template is already on DEV (Ngọc, 19/10); QA tests on 23/10, no Sprint 13 move. DSR-665 is fixed and closed, so DSR-587 is unblocked."
* FYI DSR-638: test-space pages are moving to public URLs; QA will switch test paths once done. Some public paths (article qa529-01, catalog qa190-cat-pdf) already return 404 on .aem.live.

Plan

* Today: close DSR-647, 657, 658, 660, 538 on DEV.
* Target Done DEV 23/10 for 587, 557, 570, 654, 586, 529. Depends on tonight's test data + DSR-665/659 fixes.
* Risk: 587 Done depends on DSR-665; 529 depends on DSR-659 – if not fixed by 23/10, remaining parts move to Sprint 13.
```

## B. 🗣 Present nhanh (VI, 30 giây)
- Retest sáng nay: 657/658/660/647/538 **Pass DEV** → Dat đóng hôm nay; 659 chưa fix → trả Martin.
- Bug mới **DSR-665** (High): trang video/search reload vô hạn – chặn Done 587.
- 557/570/654/586: fail còn lại là **data test**, tối nay sửa → automation sáng 23/10.
- Đích Done DEV dời sang **23/10** (buffer sprint); ~~566/653 đề xuất Sprint 13~~ ✅ đã trả lời DSR-566 19/10 – KHÔNG gửi; 566/653 đích 23/10.
- Cần Martin: ~~665~~ (Done), 659, og:image, catalog list; ~~cần Quentin: chốt 566/653 sang Sprint 13~~ ✅ KHÔNG gửi – báo Quentin template đã có.

**Nếu bị hỏi:**
- *Sao hạn 22/10 trượt?* → Overlay 404 do dev fix auto-gen 21/10 + data test sai; data sửa đêm 21–22/10, còn trong buffer 23/10.
- *529 còn bao nhiêu fail?* → 9/15 fail: 2 do DSR-659, còn lại là data (category/robots), không có bug sản phẩm mới.
- *og:image có phải bug không?* → Chưa chắc (65%), có thể do tên file ảnh có dấu cách – đang hỏi Martin.

## C. Standup
**Yesterday**
- DSR-529: retest 657/658/660 pass; 659 still fails (thumbnail relative path); 6/15 pass.
- DSR-647, DSR-538 retest pass on DEV; DSR-587 movie checks 14/14 pass on overlay.
- New bugs: DSR-665 (587 search reload loop, Martin), DSR-664 (video caption "null").
- DSR-654: 21 TCs + automation (11 pass); DSR-557 video 16/16 pass.

**Today**
- Close DSR-647/657/658/660/538; move DSR-659 back to Martin.
- Night: data fixes 586/570/557/654, negative data 587/586, DSR-570 manual 6 TCs.
- Automation 23/10 morning: 586/557/570/654 rerun (JOB-20261022-03).
- ~~Sprint 12 deadline today: report split of 566/653 (and leftovers) to Quentin at 17:10.~~ ✅ không cần – 566/653 trong Sprint 12 (template có từ 19/10)

**Blockers / need help**
- Martin: fix DSR-659 (~~665~~ ✅ Done) – blocks 529 Done 23/10.
- Martin: og:image `about:error`, catalog list old CFs, isActive redirect – 587/557/654.
- Martin/Quentin: non-form catalog opens PDF directly – intended? (DSR-654, by 23/10).
- ~~Quentin: news-article template / Sprint 13 decision – DSR-566/653.~~ ✅ đã trả lời DSR-566 19/10 – KHÔNG gửi

## D.
### 🐞 Bug < 80% – Dat chốt sáng nay
| Nháp | Tiêu đề | % | Thiếu gì để ≥ 80% | Đề xuất |
|---|---|---|---|---|
| BUG-OVL-INACTIVE (587/586/654) | 表示フラグ OFF: json2html 200 + `unavailable \| inactive`, không redirect list (BL-OVL-1) | 50% | Chưa quan sát end-to-end; Martin chưa trả lời | Giữ; Night 22/10 seed TD-587-07 `qa587-inactive` → agent 23/10 |
| BUG-OVL-OGIMG (587, cả catalog) | Raw `og:image` = `about:error` trên mọi trang overlay QA (og:image:secure_url đúng 200) – VOV-003, MOVIE-029 | 65% | Mọi CF test dùng thumbnail `image 7.png` (có dấu cách) → chưa loại trừ data | Hỏi Martin (📣); nếu cần: QA-PT đổi thumbnail 1 CF sang tên không dấu cách → agent so sánh |
| BUG-CAT-LIST-OLD (557/654) | Catalog list vẫn trả 15 CF folder cũ `ykk/common/product-cf/test`, ja/en cùng 26 thẻ (không lọc ngôn ngữ) | 55% | Chưa rõ list đã lên overlay chưa (BL-OVL-1 20/10 12:40) | Hỏi Martin (📣) |

Đã xử lý 22/10: VOV-013 → **DSR-665** (85%) · 586/570/557 fail = data (Night 22/10) · CATOV-003 en .live 404 = data.
Ghi chú sáng nay: JOB-20261022-01 xác nhận og:image vẫn `about:error` cả 3 trang. IDLE-31: perf ja mobile qa587-main = 71 (60%), article qa529-01 + catalog qa190-cat-pdf .live 404 (40%) – chưa đưa vào bảng, theo dõi.

### 📣 Báo Martin
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

### 🆕 Ticket chưa lên kế hoạch
Jira: 16 ticket mở giao Dat · đã lên kế hoạch 14
| Mã | Tiêu đề ngắn | Type / status | Giao Dat khi nào | Việc QA đề xuất |
|---|---|---|---|---|
| [DSR-664](https://sutrix.atlassian.net/browse/DSR-664) | [DSR-190] Video block hiện "null" khi caption rỗng | Bug / To Do | tạo 21/10 20:39 JST (assignee Dat) | Thêm dòng BUGS.md; gán dev (Martin/Ngọc nếu FE), retest bằng TD-190 `qa190-mv-empty` khi fix |
| [DSR-590](https://sutrix.atlassian.net/browse/DSR-590) | 環境配慮型製品 (TOP/詳細テンプレート) | Task / [Dev] In Testing | Jira cập nhật 21/10 18:18 JST | DASHBOARD ghi "Ngọc, không giao Dat" nhưng Jira giao Dat → Dat xác nhận; nếu của QA: viết TC + thêm dòng mục 1 (lưu ý DSR-638 đổi URL) |

⚠ Lệch DASHBOARD mục 1 vs Jira: mục 1 ghi "10 mở" (566+653 tính 1); Jira hiện 16 (thêm 4 bug 657/658/659/660 – đã có trong BUGS.md, + 664, 590). DSR-665 giao Martin (không tính).

Dat cần nhắc trong meeting: DSR-665 + DSR-659 là điều kiện Done 587/529 ngày 23/10, Martin cần fix hôm nay; ~~Quentin chốt 566/653 sang Sprint 13~~ ✅ KHÔNG gửi (template có 19/10); xác nhận DSR-590 có giao QA không.
