# Daily standup 2026-10-23 (Thứ Sáu)

> Tạo 08:25 (UTC+7) [schedule standup] · nguồn: git log từ 22/10 08:00, DASHBOARD 23/10 07:50, BUGS.md, PLAN-sprint12 (ghi chú 23/10 07:50), JIRA-SWEEP 01:08Z (mới, < 2h), KNOWN-FACTS, Jira (11 ticket mở giao Dat + 7 ticket liên quan), Night Report (Night 22/10 theo DASHBOARD mục 3), summary JOB-20261022-03/-17, JOB-20261016-08/-11, JOB-20261023-01 (result.json), IDLE-40.

## A. 📋 Daily report – copy & paste vào group chat (EN)

```
QA Daily – 23/10 (DEV ENV)
Done

* DSR-647, DSR-538, DSR-657, DSR-658, DSR-660: retest pass on DEV, closed. DSR-665 (video search page reloads endlessly): fixed by @martin portal, retest pass, closed. DSR-659: closed as by design (thumbnail meta).
* DSR-664 (video block shows "null"): retest pass 4/4 on DEV. Closing today.
* DSR-587 video overlay: og:image fix verified, no "about:error" left on the overlay pages.
* DSR-586 product overlay: main cases 13 pass / 0 fail; negative cases 6 pass / 2 fail (1 test case outdated, 1 under review).
* DSR-557 catalog/video: 24 pass / 0 fail / 6 skipped (test data). DSR-570: 12 pass / 2 fail / 2 skipped.
* DSR-566/653 news detail: new template checked, test pages created. Automation 12 pass / 10 fail (see Blockers).
* DSR-590 eco TOP: layout reviewed, 2 bugs filed: DSR-666 (extra space under breadcrumb), DSR-667 (SP carousel dot hidden by ">" button). Please assign the ticket to @Minh Ngọc Hoàng if they belong to FE.

In progress

* DSR-654 catalog overlay: remaining checks (CATOV-006/010) running now.
* DSR-586 / 587 / 557: last negative-case test data (inactive flag, preview-only, Youku video) prepared today and tonight; re-run on 26/10 morning.
* DSR-529: remaining fails are test data (category, robots), fixed tonight.

Blockers / need help

* @martin portal : /ja/library/catalog shows 0 cards, although the dsr-catalog-list JSON returns 7 items (3 loads, same result). /en shows 6 cards. Can you check the JA rendering? (DSR-557, DSR-654)
* @Minh Ngọc Hoàng : DSR-566 news detail: the date shows the raw value "2026-10-01T00:00:00.000Z" instead of 2026.10.01, and there is no "Back to list" link. Is the link planned for this template? (DSR-566/653)
* ~~@Minh Ngọc Hoàng : DSR-666 / DSR-667 are still To Do. When can they be fixed? DSR-590 cannot be Done without them.~~ ✅ đã trả lời DSR-666 23/10 (fixed, In Testing) – KHÔNG gửi lại (667 vẫn In Progress)
* @Minh Ngọc Hoàng : DSR-570: (1) the download-form demo is still not bound to the catalog CF; (2) the form sends no request to HubSpot. When will both be on DEV? 4 TCs are blocked.
* @Quentin Milavec : DSR-590 moves from 23/10 to 26/10, and DSR-566/653, 557, 654, 570 now depend on the fixes above. If they are not on DEV by 26/10 12:00, we propose closing the tested scope and moving the blocked TCs to Sprint 13.
* FYI DSR-611: QA uses Youku ID XNTgyNzE1ODE5Ng== (thanks @Quentin Milavec). Q1/Q2 still wait for Numata-san, Q3 for Kohei; QA keeps the defaults until then.

Plan

* Today: close DSR-664; finish DSR-654 checks; test data for the remaining negative cases tonight.
* Target Done DEV 26/10: 586, 587, 529 (test data only). 26–27/10: 557, 654, 566/653, 590, 570 – each depends on the fix listed in Blockers.
*Sprint forecast:* 4/9 tickets on track for Done DEV by 27/10 (changes vs yesterday: 664 done today; 590 23/10 → 26/10; 566/653, 557, 654, 570 now waiting for dev fixes)
```

## B. 🗣 Present nhanh (VI, 30 giây)
- Hôm qua đóng **7 bug/ticket** (647, 538, 657, 658, 660, 665, 659); 664 retest Pass → đóng sáng nay.
- 586/557 phần chính **Pass hết**; fail còn lại là data test hoặc TC cũ.
- **Mới phát hiện:** list catalog **ja 0 thẻ** dù JSON có 7 item (Martin); news detail **ngày hiển thị dạng thô** + thiếu "Back to list" (Ngọc).
- **Rủi ro:** 590 lùi 23→26/10 (666/667 Ngọc chưa làm); 570 chờ HubSpot + gắn CF (Ngọc). Đã báo Quentin: fix chưa lên DEV trước 26/10 12:00 → đóng phần đã test, TC bị chặn sang Sprint 13.
- Forecast: **4/9** ticket chắc Done DEV trước 27/10, 5 ticket phụ thuộc fix dev.

**Nếu bị hỏi:**
- "Sao 586 chưa Done?" → Phần chính Pass; còn 1 case preview cần data (QA làm tối nay), rerun sáng 26/10.
- "ja catalog 0 thẻ có phải data không?" → Không: JSON trả 7 item, en hiển thị bình thường, đo 3 lần → nghi lỗi render, nhờ Martin xem.
- "Có kịp sprint không?" → 4 ticket chắc chắn; 5 ticket kịp nếu fix dev lên DEV trước trưa 26/10, không thì đóng phần đã test và dời TC bị chặn.

## C. Standup
**Yesterday**
- Closed DSR-647/538/657/658/660/665/659; DSR-664 retest Pass 4/4 (to close).
- DSR-586 main 13/0, negatives 6/2; DSR-557 24/0/6; DSR-570 12/2/2.
- DSR-566 new template verified, pages seeded, automation 12 pass / 10 fail.
- DSR-590 L&F reviewed → DSR-666, DSR-667 filed (Ngọc); og:image fixed, 0 about:error.

**Today**
- Close DSR-664; finish DSR-654 CATOV-006/010 (running).
- Approve automated test data for DSR-587 negatives + Youku (Dat, 10:00).
- Tonight test data: 990586002 preview, 566 title, 529 category/robots, QA190 catalogs.
- Send questions: Martin (ja catalog list), Ngọc (566 date, 666/667, 570).

**Blockers / need help**
- Martin: ja catalog list 0 cards, JSON has 7 items – DSR-557/654.
- Ngọc: 566 raw date + Back to list; 666/667 To Do – DSR-566/590.
- Ngọc: 570 CF binding + HubSpot POST, 4 TCs blocked – DSR-570.
- Quentin: agree Sprint 13 move for blocked TCs if fixes miss 26/10 12:00.

## D.
### 🚨 Escalation (4)
1. **DSR-590** đích 23/10 → **26/10**: DSR-666/667 (Ngọc) vẫn To Do.
2. **DSR-566/653** rủi ro 🟢 → 🟡: ngày hiển thị raw ISO (85%, product) + thiếu Back to list (70%) – Ngọc.
3. **DSR-557 + DSR-654** rủi ro xấu đi: /ja/library/catalog 0 thẻ, JSON 7 item (JOB-20261023-01, lần đo thứ 3) – Martin.
4. **DSR-570** rủi ro 🟠 giữ nhưng 4 TC Blocked (CATDL-009/011/012/013) chờ Ngọc – không ETA.
Không có LATE HANDOVER (sweep 08:05). Năng lực: còn 1 đêm data hữu ích (23/10) + agent 26–27/10 → đủ nếu fix dev lên trước 26/10 12:00.

Tin EN cho Quentin (copy):
```
Hi Quentin, Sprint 12 forecast update (23/10, DEV):
- DSR-664 closes today. DSR-586, 587, 529 stay on track for Done DEV 26/10 (test data only).
- DSR-590: target moves 23/10 → 26/10. Bugs DSR-666/667 (Ngọc) are still To Do.
- DSR-566/653: 2 new findings on the news detail page (date shows the raw value "2026-10-01T00:00:00.000Z" instead of 2026.10.01; no "Back to list" link). Waiting for Ngọc.
- DSR-557/654: /ja/library/catalog shows 0 cards although the list JSON returns 7 items (en is fine). Asked Martin to check.
- DSR-570: 4 TCs blocked (form demo not bound to the catalog CF, no HubSpot submission). No ETA yet from Ngọc.
Proposal: if these fixes are not on DEV by 26/10 12:00, we close each ticket with the tested scope and move the blocked TCs to Sprint 13. Forecast: 4/9 on track, 5 at risk (dev fixes). Please confirm or tell us which tickets to prioritise.
```

### 🐞 Bug < 80% – Dat chốt sáng nay
(Nguyên văn DASHBOARD 23/10 07:50)
| Nháp | Tiêu đề | % | Thiếu gì để ≥ 80% | Đề xuất |
|---|---|---|---|---|
| BUG-CAT-PREVIEW (654/586) ↑ | Overlay DSR CF chỉ Preview không hiện trên .aem.page: catalog qa654-preview → list (JOB-10/-14 + SHADOW-TD-654), **product 990586002 → 404 (.page + .live, BUGCHK-586-02 22/10)** | 70% | Chưa xác minh DSR CF 990586002 thật sự đã Preview (data QA-PT); video qa587-preview chưa seed | JOB-20261022-03 ghi replication props → Preview OK + vẫn 404 → bug 85% (Martin) |
| 🆕 BUG-CAT-LIST-JA (557/654) | /ja/library/catalog 0 thẻ, không có response `dsr-catalog-list` trong 45s (JOB-22-20 + IDLE-38); en 5–6 thẻ | 50% | Chỉ 2 lần đo cùng tối; QA-PT SHADOW-TD-654 mở ja list không báo lỗi; JSON ja chưa kiểm | JOB-20261023-01 (3 lần + JSON trực tiếp) → vẫn 0 + JSON có item → bug 80% (Martin) |
| 🆕 CATDL-004 (570) | Form tải tài liệu: lỗi bắt buộc hiện dạng popup từng ô thay vì message cạnh ô | 50% | 1 screenshot; có thể là tooltip HTML5 mặc định; Figma C10 chưa final | Giữ; xem screenshot + hỏi Ngọc kiểu lỗi mong muốn khi HubSpot form xong (cùng tin 🔔 P2) |
| BUG-CAT-FORM-EN (570/654) | en catalog form hiển thị tiếng Nhật (CATDL-016 en) | 70% | Chưa rõ HubSpot form en đã có GUID (DSR-655 L1) | Giữ; câu 4b trong tin Martin |
| BUG-CAT-PDF-EXPOSE (570) | `dsr-catalog-list` trả `pdfAsset._publishUrl` cho catalog requiresForm=true (CATDL-007) | 70% | Chờ Quentin TC 007 (gating có là yêu cầu bảo mật) | Giữ; "phải ẩn" → bug 90% |
| BUG-CAT-NOINDEX (654) | non-form catalog `robots=noindex`, không trong sitemap (CATOV-002/021) | 40% | non-form redirect file by design → có thể chủ ý | Đề xuất coi by design, sửa kỳ vọng (Dat OK/NG) |
| BUG-OVL-INACTIVE (587/586/654) | 表示フラグ OFF: kiểm end-to-end | 50% | TD-587-07 chưa seed (Not run 22/10) | Giữ; chờ Agent Author |

**Cập nhật sau 07:50 (job xong 08:00–08:17, chưa vào DASHBOARD) – để session Điều phối xử lý:**
- BUG-CAT-PREVIEW: JOB-20261022-03 xác nhận DSR CF 990586002 **chưa từng Preview** (DRAFT, NEVER_PUBLISHED) → 404 là **data (0%)**, không phải bằng chứng bug. QA-PT Preview lại tối nay → rerun PDO-002/012.
- BUG-CAT-LIST-JA: JOB-20261023-01: ja 0 thẻ / JSON **7 item**, en 6 thẻ, 12 lần tải → **đạt điều kiện 80%** → session Điều phối tạo bug (Martin). Lưu ý runner ghi job "failed" vì thiếu summary.md (agent đã chạy xong).
- 🆕 NEWS-003 date (566): hiển thị `2026-10-01T00:00:00.000Z` ≠ YYYY.MM.DD – **85%** (JOB-16-08 + JOB-16-11, rule DSR-660) → session Điều phối tạo bug (Ngọc, FE).
- 🆕 NEWS-002/006 Back to list (566): 70% · NEWS-007 index (566): 70% · PDO-006 subfolder page (586): 65% · PDO-005 = TC cũ (đề xuất sửa kỳ vọng theo BL-OVL-1 21/10).

### 📣 Báo Martin
(Nguyên văn DASHBOARD 23/10 07:50)
| URL | Triệu chứng | cause | Job | Evidence |
|---|---|---|---|---|
| (còn mở 21/10) isActive OFF · config 404 last-modified 20/10 | — | none | JOB-20261021-06 | results/JOB-20261021-06/raw/ |
Không có fail mới với cause ≠ none (23/10 07:50). Dòng cũ 22/10 đã đóng (DSR-665, og:image, catalog list, 659) – xem git log.

Việc cho Dat: gửi Martin tin dưới. ⚠ Câu 2 đã sửa: phần product 990586002 là lỗi data (JOB-20261022-03) → bỏ; thêm câu ja catalog list.
```
Hi Martin, open questions from the DEV runs (read-only):
1) Is an English HubSpot form configured for the /en catalog overlay pages? /en/library/catalog/qa190-cat-pdf-form currently renders the Japanese form (labels, options, consent).
2) Should a DSR CF that is only Previewed (not Published) render on .aem.page? (catalog qa654-preview). We will re-check a product case after tonight's data fix.
3) The public 404 config.json still shows last-modified 20/10 – is the 404 page config deployed on DEV?
4) /ja/library/catalog shows 0 cards, but the dsr-catalog-list JSON for ja returns 7 items (3 loads). /en shows 6 cards. Could you check the JA rendering?
Thanks!
```

### 🆕 Ticket chưa lên kế hoạch
Jira: 11 ticket mở giao Dat · đã lên kế hoạch 10. ⚠ Bảng mục 1 DASHBOARD lệch Jira: tiêu đề ghi "10 mở", còn 2 dòng đã Done (DSR-647, DSR-538), thiếu DSR-611.

| Mã | Tiêu đề | Type/Status | Giao Dat | Việc QA đề xuất |
|---|---|---|---|---|
| [DSR-611](https://sutrix.atlassian.net/browse/DSR-611) | QA questions 動画・カタログ (URL, cn video, NEW/UPDATE, Youku ID) | Question / To Do | 15/10 (QA tạo) | Q4 đã trả lời (Youku ID); giữ mặc định Q1–Q3, đóng khi Numata/Kohei trả lời – thêm 1 dòng DASHBOARD mục 1 |

Dat cần nhắc trong meeting: Martin xem list catalog ja 0 thẻ; Ngọc cho ETA 666/667, ngày news 566 và HubSpot/CF 570; Quentin đồng ý hạn 26/10 12:00 (quá hạn → TC bị chặn sang Sprint 13); Dat đóng DSR-664 và duyệt data tự động cho 587 trước 10:00.
