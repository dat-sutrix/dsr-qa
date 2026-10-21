# QA-PT error log (đến 21/10/2026) – dùng để rút kinh nghiệm, cập nhật mỗi khi có lỗi mới

| # | Đêm | Lỗi | Ảnh hưởng | Nhóm |
|---|---|---|---|---|
| 1 | 15/10 | movieId của qa501-* nhập khác tên CF (quy tắc "動画ID = tên CF" đã có trong pack) | Trang video/related không chạy → seed lại | A. ID ≠ tên CF |
| 2 | 15/10 | ebookUrl của qa190-cat-ebook / ebook-form nhập tên CF thay vì URL | TC e-book fail giả → sửa đêm 16/10 | B. Nhập sai giá trị |
| 3 | 15/10 | Dòng report DSR-BREAD-026 thiếu Env | Nhẹ – phải đoán | E. Report |
| 4 | 19/10 | qa529-01: ô **Title** nhập giá trị Navigation title ("QA529 ナビ") | Tạo nháp **bug giả** BUG-1, agent chạy lại, hỏi Dat/Martin | B |
| 5 | 19/10 | qa529-01: Related Stories gõ tên (qa529-r1) thay vì chọn bằng picker; en sai thứ tự r1,r3,r2 | **Bug giả** BUG-5 + TC 013 fail giả | B |
| 6 | 19/10 | qa529-01 bật noindex (TestData: tắt); en thiếu tags | TC 016 / 006 en fail giả | B |
| 7 | 19/10 | Ảnh bug TD-529-01 chụp ở URL cũ /master/en/qa529-01 (ngoài stories) | Không dùng được làm evidence, agent phải kiểm lại | D. Sai trang/URL |
| 8 | 20/10 | Tên CF **qa-587-main** (thừa "-") ở DSR CF en+ja và content CF ja | Trang /qa587-main 404 cả ngày | C. Sai tên CF |
| 9 | 20/10 | movieId nhập tiêu đề ("QA587 main1", "related 1"…"related 6", "rel A", "QA587 dam") trên ~12 CF | Link related hỏng/404 | A (lặp lại lỗi #1) |
| 10 | 20/10 | DSR CF qa587-r5 trỏ nhầm content CF qa587-r6 | Sai dữ liệu TC 647 | B |
| 11 | 20/10 | 表示フラグ OFF (qa557-dam en, qa587-rel-a) / bỏ trống (r1–r6, qa557-dam ja) | Trang chuyển hướng về list | B |
| 12 | 20/10 | Report "đã tạo all CF" nhưng thiếu DSR CF qa587-rel-b và 4 DSR CF catalog ja | Báo cáo không đúng thực tế, kế hoạch sai | E |
| 13 | 20/10 | Tên ảnh / TC ID không theo mẫu ("BUGCHK-529_1_ja_Missing…png", "BUGCHK-529-1 (ja) ") | Agent khó ghép ảnh–dòng report | E |

**Tác động lớn nhất (20/10):** 587/647/557/570/654 trễ 1 ngày; Dat + Martin mất thời gian điều tra 404 (Martin audit 38 CF); 2 bug giả (529).

**Phần lỗi do pack (QA lead tự nhận):** 15/10 thiếu field Release date; 20/10 pack ghi "isActive" trong khi giao diện là 表示フラグ; chưa hướng dẫn Move→Name; giá trị chưa tô nổi bật. Đã sửa từ pack 21/10.

**Nhóm lỗi:** A. ID ≠ tên CF (2 lần, ~13 CF) · B. Nhập sai/thiếu giá trị (6) · C. Sai tên CF (1, 3 CF) · D. Sai trang (1) · E. Report (3).
