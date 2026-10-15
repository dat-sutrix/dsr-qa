# TC backlog – Night TC job (18:00–22:00 UTC+7, mỗi ngày)

> Đích: **toàn bộ xong trước sáng T2 19/10/2026**. Scheduled task "DSR TC – Đêm 18–22h" đọc file này mỗi lần chạy.
> Status: `todo` → `doing <YYYY-MM-DD HH:MM>` → `done` | `partial` (lý do ở Note) | `upload-pending` (file đã build, chưa lên Drive).
> Mode: `new` = viết TC mới · `adopt` = TC đã có trên Drive, chỉ thêm cột QA + Assumptions + TestData.
> Thứ tự = thứ tự làm (ưu tiên ticket đang [DEV] In Testing: 566, 529). Đêm dự kiến chỉ để tham khảo; còn giờ thì làm tiếp dòng kế.

| # | US (Jira) | Epic / Folder ID | Sub-task | SP | Mode | Drive folder (sẵn có) | Đêm dự kiến | Status | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | DSR-566 ニュース詳細 | DSR-357 | DSR-618 | 8 | new | — | 15/10 | done | Test page: /master/en/test-space/dsr-357-news-detail · related DSR-567 |
| 5 | DSR-529 記事詳細 | DSR-356 | DSR-619 | 8 | new | 1Jpf4BmGJ97mPCauzQnds2m-fsn6CDAgB | 15/10 | upload-pending | 32 TC; TestData trên Drive ✅; TC .xlsx 33 KB > 12 KB → Dat upload `tc-out/[Sutrix] DSR -356- [レイアウト] 記事詳細（article-detail）.xlsx` vào folder DSR-356. DSR-619 Done. JOB-20261015-12 hold (chưa có trang test) · Q4–Q9 |
| 2 | DSR-609 トップ | DSR-196 | DSR-633 | 3 | adopt | 1NC_m_XPhuxewPyTyhj411uKW71lmq-vy | 15/10 | doing 2026-10-15 18:25 | |
| 3 | DSR-568 お問い合わせフォーム | DSR-199 | DSR-622 | 3 | adopt | 1WBZuy01oskHK-Cz1oEA9_8l0vzYaNxIB | 15/10 | todo | file 2.8MB – chỉ thêm cột, có thể upload-pending |
| 4 | DSR-560 検索データ生成 | DSR-182 | DSR-621 | 3 | adopt | 1KS_4dMiUINNRT8buwjITThqTl-UA1_Vm | 15/10 | todo | |
| 6 | DSR-608 ブース | DSR-172 | DSR-631 | 3 | adopt | 1nkLIDrScfMJjCvSDniokMrAqOkHmBW5E | 16/10 | todo | cùng file với #7 |
| 7 | DSR-610 DIGITAL SHOWROOM | DSR-172 | DSR-632 | 2 | adopt | 1nkLIDrScfMJjCvSDniokMrAqOkHmBW5E | 16/10 | todo | làm chung lần với #6 |
| 8 | DSR-503 Product URL by product-id | DSR-503 | DSR-620 | 4 | new | — | 16/10 | todo | |
| 9 | DSR-583 製品一覧 SP 2列 | (parent) | DSR-624 | 2 | new | — | 16/10 | todo | |
| 10 | DSR-607/570 資料ダウンロード | DSR-192 | DSR-623 | 8 | new | — | 17/10 | todo | related DSR-571; nhận catalog ID từ DSR-190 |
| 11 | DSR-585 製品CF 改修 | (parent) | DSR-625 | 6 | new | — | 17/10 | todo | CF layer |
| 12 | DSR-586 製品詳細 Overlay化 | (parent) | DSR-626 | 5 | new | — | 17/10 | todo | regression DSR-360 + DSR-457 |
| 13 | DSR-587 動画詳細 Overlay化 | (parent) | DSR-627 | 3 | new | — | 17/10 | todo | reuse DSR-173 TC |
| 14 | DSR-589 アイコン差替 | (parent) | DSR-628 | 2 | new | — | 17/10 | todo | |
| 15 | DSR-590 環境配慮型製品 | (parent) | DSR-629 | 8 | new | — | 18/10 | todo | |
| 16 | DSR-227 Asset移行 | (parent) | DSR-630 | 6 | new | — | 18/10 | todo | |
| 17 | DSR-433 メール送信連携 | DSR-433 | DSR-528 | 10 | new | — | 18/10 | todo | sub-task 543–548 làm nguồn |

## Nhật ký chạy
| Thời điểm | Ticket | Kết quả | Thời gian |
|---|---|---|---|
| 2026-10-15 18:17 | DSR-529 | upload-pending (32 TC, TD trên Drive, TC xlsx chờ Dat) · DSR-619 Done · JOB-12 hold · Q4–Q9 | ~20' |
