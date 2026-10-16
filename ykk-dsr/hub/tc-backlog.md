# TC backlog – Night TC job (18:00–22:00 UTC+7, mỗi ngày)

> Đích: **toàn bộ xong trước sáng T2 19/10/2026**. Scheduled task "DSR TC – Đêm 18–22h" đọc file này mỗi lần chạy.
> Status: `todo` → `doing <YYYY-MM-DD HH:MM>` → `done` | `partial` (lý do ở Note) | `upload-pending` (file đã build, chưa lên Drive).
> Mode: `new` = viết TC mới · `adopt` = TC đã có trên Drive, chỉ thêm cột QA + Assumptions + TestData.
> Thứ tự = thứ tự làm (ưu tiên ticket đang [DEV] In Testing: 566, 529). Đêm dự kiến chỉ để tham khảo; còn giờ thì làm tiếp dòng kế.

| # | US (Jira) | Epic / Folder ID | Sub-task | SP | Mode | Drive folder (sẵn có) | Đêm dự kiến | Status | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | DSR-566 ニュース詳細 | DSR-357 | DSR-618 | 8 | new | — | 15/10 | done | Test page: /master/en/test-space/dsr-357-news-detail · related DSR-567 |
| 5 | DSR-529 記事詳細 | DSR-356 | DSR-619 | 8 | new | 1Jpf4BmGJ97mPCauzQnds2m-fsn6CDAgB | 15/10 | upload-pending | 32 TC; TestData trên Drive ✅; TC .xlsx 33 KB > 12 KB → Dat upload `tc-out/[Sutrix] DSR -356- [レイアウト] 記事詳細（article-detail）.xlsx` vào folder DSR-356. DSR-619 Done. JOB-20261015-12 hold (chưa có trang test) · Q4–Q9 |
| 2 | DSR-609 トップ | DSR-196 | DSR-633 | 3 | adopt | 1NC_m_XPhuxewPyTyhj411uKW71lmq-vy | 15/10 | upload-pending | adopt 9 TC; TestData trên Drive ✅; TC adopt 128 KB → Dat upload `tc-out/[Sutrix] DSR -196- [レイアウト] トップ.xlsx` vào folder DSR-196; bản dev đổi tên _v20261015_dev. DSR-633 Done. JOB-13/14 queue · Q10–Q11 |
| 3 | DSR-568 お問い合わせフォーム | DSR-199 | DSR-622 | 3 | adopt | 1WBZuy01oskHK-Cz1oEA9_8l0vzYaNxIB | 15/10 | upload-pending | adopt 18 TC + QA 19.0; TestData trên Drive ✅; TC adopt 3.2 MB → Dat upload `tc-out/[Sutrix] DSR -199- [レイアウト] お問い合わせフォーム（form）.xlsx` vào folder DSR-199; bản dev đổi tên _v20261015_dev. DSR-622 Done. Không job ([STG] Ready for deploy) · Q12–Q13 |
| 4 | DSR-560 検索データ生成 | DSR-182 | DSR-621 | 3 | adopt | 1KS_4dMiUINNRT8buwjITThqTl-UA1_Vm | 15/10 | upload-pending | adopt 8 TC + QA 9.0/10.0; TestData trên Drive ✅; TC adopt 131 KB → Dat upload `tc-out/[Sutrix] DSR -182- [AEM] 検索データ生成／検索連携用データ管理.xlsx` vào folder DSR-182; bản dev đổi tên _v20261015_dev. DSR-621 Done. Không job (DSR-560 In Progress, all ⛔) · Q14–Q15 |
| 6 | DSR-608 ブース | DSR-172 | DSR-631 | 3 | adopt | 1nkLIDrScfMJjCvSDniokMrAqOkHmBW5E | 16/10 | upload-pending | adopt chung file DSR-172: sheet ブース 12 TC + QA 13.0/14.0; TestData trên Drive ✅; TC adopt 256 KB → Dat upload `tc-out/[Sutrix] DSR -172- [レイアウト] ブース・DIGITAL SHOWROOM（展示・体験）.xlsx` vào folder DSR-172; bản dev đổi tên _v20261015_dev. DSR-631 Done. Không job (DSR-608 To Do) · Q16–Q19 |
| 7 | DSR-610 DIGITAL SHOWROOM | DSR-172 | DSR-632 | 2 | adopt | 1nkLIDrScfMJjCvSDniokMrAqOkHmBW5E | 16/10 | upload-pending | cùng file với #6: sheet DIGITAL SHOWROOM 8 TC + QA 9.0/10.0. DSR-632 Done. Không job (DSR-610 To Do) · Q16–Q17, Q19 |
| 8 | DSR-503 Product URL by product-id | DSR-503 | DSR-620 | 4 | new | 1VDMF3FnDBxgafEqJQPkuuEzZUHb6skVg | 16/10 | upload-pending | new 9 TC (7 Auto + 2 Manual), all Blocked-by DSR-586 (DSR-503 tạm dừng 09/16 → overlay); TestData trên Drive ✅; TC xlsx 26 KB > 12 KB → Dat upload `tc-out/[Sutrix] DSR -503- [AEM] Product Detail - Auto-generate URL by product-id.xlsx` vào folder DSR-503 (mới tạo). DSR-620 Done. Không job (DSR-503 In Progress/tạm dừng) · Q20–Q21 |
| 9 | DSR-583 製品一覧 SP 2列 | (parent) | DSR-624 | 2 | new | 1W80lQF61y5Wf1jdvPdqmy3bfl2UdjKLM | 16/10 | upload-pending | new 7 TC (5 Auto + 1 Visual + 1 Manual), Figma 1333-6510 (375→2 / 768,980→3 / 1200,1440→4 cột); TestData trên Drive ✅; TC xlsx 25 KB > 12 KB → Dat upload `tc-out/[Sutrix] DSR -583- [製品一覧] スマホ表示時の製品カードを2列に固定する.xlsx` vào folder DSR-583 (mới tạo). DSR-624 Done. Không job (DSR-583 To Do, お客様情報待ち) · Q22 |
| 10 | DSR-607/570 資料ダウンロード | DSR-192 | DSR-623 | 8 | new | — | 17/10 | todo | related DSR-571; nhận catalog ID từ DSR-190 |
| 11 | DSR-585 製品CF 改修 | (parent) | DSR-625 | 6 | new | — | 17/10 | todo | CF layer |
| 12 | DSR-586 製品詳細 Overlay化 | (parent) | DSR-626 | 5 | new | — | 17/10 | todo | regression DSR-360 + DSR-457 |
| 13 | DSR-587 動画詳細 Overlay化 | (parent) | DSR-627 | 3 | new | — | 17/10 | todo | reuse DSR-173 TC · **NGUỒN BẮT BUỘC: tài liệu test của Martin (claude.ai artifact RJZeN9qkbwEa8uDyTC8rQr, 16/10 – chưa đọc được, chờ Dat gửi nội dung; 'đường dẫn CF trong DAM rất quan trọng') → lưu vào docs/DSR-587/ trước khi viết TC; data qa501 hiện ở product-cf/test có thể sai path** · **bắt buộc thêm TC từ DSR-501 P2/P3 (DSR-647): relatedMovies theo thứ tự author, tối đa 5, ẩn isUnavailable=true – data qa501-* trên DEV** |
| 14 | DSR-589 アイコン差替 | (parent) | DSR-628 | 2 | new | — | 17/10 | todo | |
| 15 | DSR-590 環境配慮型製品 | (parent) | DSR-629 | 8 | new | — | 18/10 | todo | |
| 16 | DSR-227 Asset移行 | (parent) | DSR-630 | 6 | new | — | 18/10 | todo | |
| 17 | DSR-433 メール送信連携 | DSR-433 | DSR-528 | 10 | new | — | 18/10 | todo | sub-task 543–548 làm nguồn |

## Nhật ký chạy
| Thời điểm | Ticket | Kết quả | Thời gian |
|---|---|---|---|
| 2026-10-15 18:17 | DSR-529 | upload-pending (32 TC, TD trên Drive, TC xlsx chờ Dat) · DSR-619 Done · JOB-12 hold · Q4–Q9 | ~20' |
| 2026-10-15 18:25 | DSR-609 | upload-pending (adopt 9 TC, TD trên Drive) · DSR-633 Done · JOB-13 + JOB-14 queue · Q10–Q11 | ~12' |
| 2026-10-15 19:35 | DSR-568 | upload-pending (adopt 18+1 TC, TD trên Drive) · DSR-622 Done · no job · Q12–Q13 | ~13' |
| 2026-10-15 19:40 | DSR-560 | upload-pending (adopt 8+2 TC, TD trên Drive) · DSR-621 Done · no job · Q14–Q15 | ~11' |
| 2026-10-15 20:20 | DSR-608 + DSR-610 | upload-pending (adopt 12+2 / 8+2 TC, 1 file 2 sheet, TD trên Drive) · DSR-631/632 Done · no job (To Do) · Q16–Q19 | ~17' |
| 2026-10-15 21:16 | DSR-503 | upload-pending (new 9 TC, folder Drive mới, TD trên Drive) · DSR-620 Done · no job · Q20–Q21 | ~10' |
| 2026-10-15 21:23 | DSR-583 | upload-pending (new 7 TC, folder Drive mới, TD trên Drive) · DSR-624 Done · no job · Q22 | ~8' |
