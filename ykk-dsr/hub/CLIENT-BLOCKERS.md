# Client blockers – việc chờ khách (YKK / LOWP / Numata) (Dat 23/10 13:07)
**Quy tắc:** TC/bug cần khách trả lời hoặc giao hàng → ghi ở đây, đánh `Blocked-by: <ticket> (client)`, **không tính vào forecast S12** (dự kiến S13+), không coi là fail. Nhắc trong mỗi báo cáo standup (mục "Client blockers", 1 dòng/mục) và trong tin forecast gửi Quentin; nhắc Quentin đuổi khách **mỗi thứ Hai** + sprint review. Không hứa ngày.

| # | Đợi gì (ticket · câu) | Ai bên khách | TC / bug bị chặn | Từ ngày | Nhắc lần cuối | Ghi chú |
|---|---|---|---|---|---|---|
| CB-1 | **HubSpot form** – DSR-655 L1 (form GUID ja/en/cn), L2 (hidden catalog_id), L4 (inline message), L5 (mapping + nhãn en/cn), L7 (form test DEV/STG) | LOWP (qua YKK) | 570 CATDL-011/012/013 (POST HubSpot), CATDL-016 en (chữ Nhật trên form en), CATDL-004 (kiểu lỗi), 671 hubspotFormId | 2026-10-23 (Martin: "not ready, didn't get it from client") | 2026-10-23 (Dat hỏi Quentin ETA 13:10 – chưa trả lời) | DSR-655 To Do, assignee Quentin. Martin đã thêm field **hubspot ID** vào CF `DM_catalog_dsr` (DSR-671) để cấu hình sau. **Dat chốt trong thread (13:15, Martin 👍): blocked by client – mọi TC liên quan test khi nhận được HubSpot ID** |
| CB-2 | **Bảo vệ URL PDF** – DSR-655 Y4 (chấp nhận gate phía browser hay cần cách chặt hơn) | YKK | 570 CATDL-007 (BUG-CAT-PDF-EXPOSE 70% → chờ Y4, không tạo bug) | 2026-10-23 | 2026-10-23 | Quentin 23/10 13:20: không được thấy URL PDF trước khi gửi form (UX). Đang hỏi lại: chỉ ẩn trên UI hay URL không được có trong JSON/source (Y4)? Nếu "không được có" → CATDL-007 thành bug (Martin) |
| CB-3 | **Nghiệp vụ form** – DSR-655 Y1 (field + bắt buộc), Y2 (PDF trực tiếp / thank-you page), Y3 (eBook có cần form), Y5 (consent + privacy ja/en/cn), Y6 (truy cập từ Trung Quốc) | YKK | 570 form TC, 654 ebook-form | 2026-10-23 | 2026-10-23 | |
| CB-4 | DSR-611 Q1/Q2 (動画・カタログ) | Numata | 557 – đang giữ mặc định | 2026-10-22 | 2026-10-22 | Q3 = Kohei (nội bộ) |
| CB-5 | Migration data 動画・カタログ – quyền SharePoint (DSR-582) | YKK | data thật 557/654 (QA dùng data qa*) | 2026-10-22 | – | Quentin DSR-582 c.64861 |
| CB-6 | SendGrid webhook – access/API key (DSR-546 / DSR-302) | YKK | 433 mail, 546 | 2026-10-22 | – | Quentin DSR-546 c.64828 |
| CB-7 | **Sửa directory map** – DSR-637 (#2 function/performance row #72 và các điểm cần khách xác nhận) | 石谷 (khách) | 637 → URL chốt cho 638–646, 639 header/footer; spec dùng path chính thức | 2026-10-23 | – | Đề xuất trong 637 chưa chốt; QA giữ path hiện tại tới khi có PDF danh sách |
| CB-8 | **Icon chính thức** + A03 – DSR-589 | YKK | 589 toàn bộ TC (Q34/Q35) | 2026-10-21 | – | Quentin 21/10 "Blocked. Pending Icons" |
| CB-9 | **Ảnh nền eco** (bản bỏ object) – DSR-590, dự kiến cuối 10 | YKK | 590 visual (baseline sẽ đổi khi thay ảnh) | 2026-10-23 | – | Không chặn TC layout; chỉ ghi chú L&F |
| CB-10 | **Booth CTA modal** (nội dung) – DSR-172 / DSR-661 #9; **TOP hover** – DSR-649 #8 (仕様未決定) | YKK | 608-9.0 (tc Q18), TOP hover | 2026-10-23 | – | 石谷 c.64723 · Martin c.61568 |
| CB-11 | **Mail nghiệp vụ** – DSR-433 確認事項1 (gửi mail catalog/eBook DL và 3D simulator từ đâu) + DSR-655 L6 (thank-you mail có link tài liệu?) + L3 (legacy form editor) | YKK / LOWP | 433 mail thật (ngoài mail tham chiếu), 570 sau submit | 2026-10-23 | – | Bổ sung ngoài CB-1 (L1/L2/L4/L5/L7) |
| CB-12 | **DAM path asset / mã ngôn ngữ** – DSR-606 Q2/Q3/Q4/Q5/Q9 `[Giả định: cần khách]` | YKK (qua Quentin) | 227 TC asset path, fixture path CF | 2026-10-23 | – | Q6/Q7/Q8 đã có đáp án ở 669–671 (KNOWN-FACTS 23/10) |

## Tin nhắc mẫu (Dat gửi Quentin, thứ Hai / khi cần)
```
Hi Quentin, client blockers still open for QA (no change expected this sprint, just a reminder):
- DSR-655 HubSpot form (LOWP: L1/L2/L4/L5/L7) → blocks DSR-570 form submit/HubSpot TCs + en form texts
- DSR-655 Y4 PDF URL protection (YKK) → decides whether CATDL-007 is a bug
- DSR-655 Y1/Y2/Y3/Y5/Y6 form business rules (YKK)
- DSR-611 Q1/Q2 (Numata-san) · DSR-582 SharePoint access · DSR-546/302 SendGrid key
Could you include them in the next client follow-up?
```
