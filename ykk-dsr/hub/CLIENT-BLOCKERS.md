# Client blockers – việc chờ khách (YKK / LOWP / Numata) (Dat 23/10 13:07)
**Quy tắc:** TC/bug cần khách trả lời hoặc giao hàng → ghi ở đây, đánh `Blocked-by: <ticket> (client)`, **không tính vào forecast S12** (dự kiến S13+), không coi là fail. Nhắc trong mỗi báo cáo standup (mục "Client blockers", 1 dòng/mục) và trong tin forecast gửi Quentin; nhắc Quentin đuổi khách **mỗi thứ Hai** + sprint review. Không hứa ngày.

| # | Đợi gì (ticket · câu) | Ai bên khách | TC / bug bị chặn | Từ ngày | Nhắc lần cuối | Ghi chú |
|---|---|---|---|---|---|---|
| CB-1 | **HubSpot form** – DSR-655 L1 (form GUID ja/en/cn), L2 (hidden catalog_id), L4 (inline message), L5 (mapping + nhãn en/cn), L7 (form test DEV/STG) | LOWP (qua YKK) | 570 CATDL-011/012/013 (POST HubSpot), CATDL-016 en (chữ Nhật trên form en), CATDL-004 (kiểu lỗi), 671 hubspotFormId | 2026-10-23 (Martin: "not ready, didn't get it from client") | 2026-10-23 | DSR-655 To Do, assignee Quentin |
| CB-2 | **Bảo vệ URL PDF** – DSR-655 Y4 (chấp nhận gate phía browser hay cần cách chặt hơn) | YKK | 570 CATDL-007 (BUG-CAT-PDF-EXPOSE 70% → chờ Y4, không tạo bug) | 2026-10-23 | 2026-10-23 | Thay cho "chờ Quentin TC 007" |
| CB-3 | **Nghiệp vụ form** – DSR-655 Y1 (field + bắt buộc), Y2 (PDF trực tiếp / thank-you page), Y3 (eBook có cần form), Y5 (consent + privacy ja/en/cn), Y6 (truy cập từ Trung Quốc) | YKK | 570 form TC, 654 ebook-form | 2026-10-23 | 2026-10-23 | |
| CB-4 | DSR-611 Q1/Q2 (動画・カタログ) | Numata | 557 – đang giữ mặc định | 2026-10-22 | 2026-10-22 | Q3 = Kohei (nội bộ) |
| CB-5 | Migration data 動画・カタログ – quyền SharePoint (DSR-582) | YKK | data thật 557/654 (QA dùng data qa*) | 2026-10-22 | – | Quentin DSR-582 c.64861 |
| CB-6 | SendGrid webhook – access/API key (DSR-546 / DSR-302) | YKK | 433 mail, 546 | 2026-10-22 | – | Quentin DSR-546 c.64828 |

## Tin nhắc mẫu (Dat gửi Quentin, thứ Hai / khi cần)
```
Hi Quentin, client blockers still open for QA (no change expected this sprint, just a reminder):
- DSR-655 HubSpot form (LOWP: L1/L2/L4/L5/L7) → blocks DSR-570 form submit/HubSpot TCs + en form texts
- DSR-655 Y4 PDF URL protection (YKK) → decides whether CATDL-007 is a bug
- DSR-655 Y1/Y2/Y3/Y5/Y6 form business rules (YKK)
- DSR-611 Q1/Q2 (Numata-san) · DSR-582 SharePoint access · DSR-546/302 SendGrid key
Could you include them in the next client follow-up?
```
