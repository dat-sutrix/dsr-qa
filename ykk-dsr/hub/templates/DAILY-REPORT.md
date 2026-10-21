# Daily report template – group chat (Dat 21/10, bắt buộc dùng cho MỌI daily report)

Quy tắc:
- Giữ nguyên cấu trúc, tiêu đề và thứ tự: `QA Daily – <DD/MM> (DEV ENV)` → `Done` → `In progress` → `Blockers / need help` → `Plan`. Dòng trống giữa các mục. Gạch đầu dòng `*`.
- Mỗi gạch đầu dòng: mã ticket trước, rồi kết quả cụ thể (số pass/fail, số TC, mã bug + mô tả ngắn trong ngoặc).
- Mention đúng tên hiển thị trong group: `@martin portal` (dev), `@Quentin Milavec` (PM), `@Minh Ngọc Hoàng` (FE). Bug thuộc FE → thêm câu "Please assign the ticket to @Minh Ngọc Hoàng if they belong to FE."
- Blocker: `@<người>: <cần gì> (<ticket>)`; câu hỏi viết dạng câu hỏi trực tiếp. Mục FYI để cuối Blockers.
- Plan: đích Done DEV + điều kiện phụ thuộc.
- Không dùng thuật ngữ nội bộ (JOB-ID, lane, QA-PT, agent) → "QA team", "automation", "test data".

Mẫu chuẩn (bản Dat duyệt 21/10):

```
QA Daily – 21/10 (DEV ENV)
Done

* DSR-529 article-detail: re-run after data fix: 12 pass / 19 fail. 3 bugs filed to @martin portal : DSR-657 (image block duplicated), DSR-658 (tag chips not rendered), DSR-659 (thumbnail/related images use relative paths). Please assign the ticket to @Minh Ngọc Hoàng if they belong to FE.
* DSR-585/586: TCs re-baselined to DM_product ver0.4 (40 TCs).
* DSR-552, DSR-648, DSR-651 closed.

In progress

* DSR-587 / 647 / 557 / 570 / 654: test data created on DEV, but the new video/catalog overlay pages return 404. We are checking the DSR CF flag 表示フラグ (isActive) and publish status.
* DSR-586: product smoke + TD-586 seeding tonight, pending ver0.4 confirmation.

Blockers / need help

* @martin portal : overlay pages 404 (e.g. /en/library/video/qa587-main). Is 表示フラグ the isActive flag? Is the ver0.4 update finished? Also, please share your fix plan for DSR-657/658/659.
* @Quentin Milavec : news-article template for DSR-566/653. If it is not ready today, we propose moving it to Sprint 13. This ticket was assigned to @Minh Ngọc Hoàng
* FYI DSR-638: moving test-space pages to public URLs will break current test links. QA will switch paths once the move is done.

Plan

* Target Done DEV on 22/10 for 529, 587, 647, 557, 570, 586. This depends on the 404 being fixed today.
```
