# Sprint 12 – Plan xử lý 6 ticket In Testing (assignee Dat)

> Lập 2026-10-15 14:30 (UTC+7) · Sprint 12: 15/10–27/10 (9 ngày làm việc) · Nguồn trạng thái: `hub/us/*`, BUGS.md, Jira.
> Nguyên tắc: (1) đóng nhanh cái gần xong để giảm WIP, (2) ban ngày Claude + agent làm việc tự động được, ban đêm QA-PT chỉ làm data Author + manual, (3) blocker ngoài QA không giữ ticket: TC chỉ thiếu môi trường (cn, Top page) ghi Known/Blocked trong comment "QA confirm DEV", chạy lại ở STG.

## 1. Thứ tự ưu tiên
| # | Ticket | Tình trạng 15/10 | Đích DEV xanh | STG | PRO | Rủi ro |
|---|---|---|---|---|---|---|
| 1 | DSR-591 (bug breadcrumb) | **Fixed DEV** (JOB-20261015-08) | 15/10 | cùng DSR-552 | cùng DSR-552 | — |
| 2 | DSR-501 (DM_movie, 4 điểm verify) | Chưa test; nhỏ | 17/10 | 20/10 | 22/10 | Thấp |
| 3 | DSR-552 Breadcrumb | DEV 9/35 ✅ · 19 ⛔ (data/HOME/cn/Q) | 17/10 | 20–21/10 | 22/10 | HOME (Top page chưa ở `/master/{lang}`) |
| 4 | DSR-557 動画・カタログ | DEV 6/25 ✅ · data seed đêm 15/10 | 20/10 | 21–22/10 | 23/10 | DSR-611 (mặc định 20/10) |
| 5 | DSR-566 ニュース詳細 | Chưa phân tích; dev đã gửi link 08/10 | 20/10 | 22/10 | 23/10 | Thiếu TC (DSR-567 bên JP đang viết) |
| 6 | DSR-529 記事詳細 | Vào In Testing 15/10 14:23; scope lớn | 22/10 | 23/10 | 26/10 | **Cao** – 70 bài, OGP, related auto, 3 ngôn ngữ |

Buffer 27/10 cho fix/retest. Quá 22/10 mà 529 chưa DEV xanh → báo PM tách phần còn lại sang Sprint 13.

## 2. Lịch theo ngày
| Ngày | Claude (ban ngày) | Agent (VPS) | QA-PT (đêm) | Dat |
|---|---|---|---|---|
| T5 15/10 | Plan · Night Pack · sub-task Jira ✅ | JOB-05 smoke codex | Pack 15/10: 557 data, 552 T2/T3 + manual, 457 #1 #10 | Restart runner ✅ · đuổi DSR-611 |
| T6 16/10 | Triage Night Report · **566: baseline + TC** (adopt DSR-567 nếu có) · Night Pack 16/10 | 552 full DEV rerun (T2/T3) · 557 auto 12–20 trên `qa190-*` · 566 smoke | 501 (4 điểm) · 566 manual + data · 552 phần dở | Gửi dev link test 566 nếu thiếu |
| T2 19/10 | **529: baseline + TC** · QA confirm DEV 552 + 591 (Jira comment) | 566 auto DEV · 501 check FE | 529 tạo trang test theo hướng dẫn Martin (template article) · 557 manual | Báo dev deploy STG 552/591/501 |
| T3 20/10 | Áp mặc định DSR-611 nếu chưa trả lời · QA confirm DEV 557, 566 | 552 + 501 STG · 529 auto DEV vòng 1 | 529 manual (OGP, page properties) · STG manual 552 (024 thiết bị thật) | Báo dev deploy STG 557/566 |
| T4 21/10 | Triage 529 · bug mới → Jira | 557 + 566 STG · 529 retest | 529 manual vòng 2 · STG manual 557 | — |
| T5 22/10 | QA confirm DEV 529 · STG verdict 552/501/591 | PRO 552/501/591 · 529 STG | STG manual 566 | Báo deploy PRO đợt 1 |
| T6 23/10 | STG verdict 557/566 | PRO 557/566 · 529 STG retest | STG manual 529 | Báo deploy PRO đợt 2 |
| T2 26/10 | Close đợt 1+2 (DoD) | PRO 529 | PRO manual (nếu cần) | Báo deploy PRO 529 |
| T3 27/10 | Buffer · tổng kết sprint | — | — | Review sprint |

## 3. Blocker cần Dat đuổi (theo hạn)
| Blocker | Chặn | Ai | Hạn | Mặc định nếu không trả lời |
|---|---|---|---|---|
| DSR-611 (4 câu) | 557: TC 3, 7, 10, 11, 21 | Quentin | 20/10 | Áp mặc định ghi trong ticket |
| HOME `/master/{lang}` 404 (Top page) | 552: bước HOME 002/004/008/017 | Dev Top page (DSR-609) / Quentin | 19/10 | Ghi Known trong QA confirm DEV, kiểm lại ở STG |
| DSR-536 / DSR-575 Q5 (SP display, placement) | 552: 021–023, 030, 034 | Kohei | 19/10 | Test theo Figma SP hiện tại |
| Site cn chưa có trên DEV | phần cn của 552, 557 | Quentin | — | Chạy cn ở STG |
| Trang dùng block (529, 608, 170, 586) | 557: TC 9, 22 | dev từng ticket | — | Chuyển TC 9/22 sang regression của các US đó |

## 4. Việc đã quyết (không hỏi lại)
- DSR-591 fixed → session Bugs comment "QA confirm DEV" + gom deploy STG cùng DSR-552.
- 557 TC 9, 22 (trang sử dụng) tách khỏi DoD 557, đưa vào TC regression của 529/586/170.
- 501: điểm 4 = N/A (đã theo dõi ở DSR-447); điểm 1 kiểm trên Author (tên field `relatedMovies`), điểm 2–3 kiểm FE với 2 CF mới (isUnavailable=TRUE; 6 related → hiển thị 5).
