# Sprint 12 – Plan xử lý ticket In Testing (assignee Dat)

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
