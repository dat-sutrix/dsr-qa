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

**Night Pack T2 19/10 – bắt buộc (17:10 tạo Google Doc theo đúng thứ tự, ~2h, có bước click + URL cho từng việc):**
| # | US | Việc | ~phút | Dòng report |
|---|---|---|---|---|
| 1 | DSR-529 | Sites → master → ja → tạo cấp còn thiếu `library` → `article` → `stories` (template đơn giản nhất có sẵn, Title = Library / Article / Stories), lặp cho en. Trong `stories` tạo qa529-01 (ja+en), qa529-02 (ja), qa529-r1..r3 (ja+en) bằng template `article detail`, giá trị theo TestData DSR-356 (TD-529-01/02/03) → Publish | 70 | TD-529-01, TD-529-02, TD-529-03 |
| 2 | DSR-433 | TC 1.0, 2.0, 3.0 (chỉ xem, link trong TC file) · TC 4.0 bước 1–2: CF `/content/dam/ykk/mail-templates/e2e-test/en` → 件名 thêm " v2" → Save → Publish (để nguyên tới tối 21/10) | 30 | 433-1.0, 433-2.0, 433-3.0, 433-4.0-edit |
| 3 | DSR-457 | Item #10 (như pack 16/10) | 15 | DSR-457-#10 |
| 4 | DSR-570 | CF `qa190-cat-ebook-form`: catalogId bỏ 2 dấu cách cuối → Save → Publish | 5 | TD-190-13-fix |

**Agent – chạy ngay không chờ (19/10):** JOB-20261019-01 (557 016/017 + 647 P2: sửa phạm vi assertion theo quyết định QA) · IDLE-07/10/11/12/13 · codex IDLE-16. Hold có điều kiện: -02/-04 (529, sau Night Report), -03 (552-014 khi DSR-651 fix; 647-P3 khi re-preview).
Quyết định QA 19/10: 557-016/017 đếm form chỉ trên DSR (trang ngoài có form search = không phải gate) · 647-P2 bỏ assertion "static HTML" (BL-OVL-1: block lọc phía client) · 173 MOVIE-014/033 fail = CF movieid-01 bị xóa movieSourceId/relatedProducts (data, ngoài sprint – ghi nhận, chưa sửa).

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


## Quy tắc Night Pack (rút từ đêm 15/10 – task 17:10 phải áp dụng)
- Tổng ≤ **3h** (đêm 15/10 pack 3h55 → QA-PT mất 5h, P5 không làm).
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
