# Jira sweep – kết quả lần gần nhất
last_sweep_utc: 2026-10-22T09:15:00Z

Lượt 16:05 VN (scheduled, chạy 16:06) · cửa sổ 05:10Z → 09:15Z (updated >= -4h) · đọc 17 ticket (16 cập nhật + 9 giao Dat, trùng 8; + changelog 664/566), bỏ lại 0.

## Mới phát hiện
| Ticket | Ai / khi nào | Loại | Nội dung | Đã cập nhật |
|---|---|---|---|---|
| DSR-664 | Martin 17:37–17:52 JST | **a** | Nhận bug từ Ngọc → **[Dev] In Testing**; deploy dev/2026.10.22_2 (08:52Z); liên kết DSR-662 c.64873 | **JOB-20261022-16 retest (queue)**; DASHBOARD 664 + agents; KNOWN-FACTS |
| DSR-662 | 石谷 15:13 JST | f | "null" dưới related videos trên ブースTOP = cùng lỗi 664; 662 → In Testing 17:52 | gộp vào JOB-16 (VCAP-002); KNOWN-FACTS |
| DSR-611 | Quentin 14:50 JST | **b** | Q4 Youku ID `XNTgyNzE1ODE5Ng==` (dự phòng `XNTgyNTc0MDg4NA==`) → mở TC 3.0/7.0/11.0 Youku; Q1/Q2 hỏi Numata, Q3 → Kohei | manifest `author/manifests/TD-557-YOUKU.yaml`; PLAN Night Pack 22/10 mục 4; us/DSR-557 B1 = Partial; 🔔 P2 tin cảm ơn; KNOWN-FACTS |
| DSR-566 | Ngọc 18:01 JST | f | → In Progress (sau khi Dat trả 16:55 JST), chưa comment "template updated" | DASHBOARD 653/566 (quy tắc pack 17:10 của PLAN 14:55 giữ nguyên) |
| DSR-357 | Kohei 17:52 JST | a? | Deploy dev/2026.10.22_2 trên epic news-detail – có thể chứa template; JOB-15 đã thấy template `news-detail` mới (70%) | KNOWN-FACTS; chờ Ngọc xác nhận trên 566 |
| DSR-654 | Kohei 15:49 JST | f | Deploy dev/2026.10.22 (06:48Z) – trùng fix Martin 13:45 VN, đã republish JOB-12 | KNOWN-FACTS |
| DSR-659 | QA 15:45 JST | f | QA confirm DEV – fixed → Done | – (đã có) |
| DSR-587/566/653 | QA 15:00 JST | f | Đã trả lời Quentin (665 Done, template có) | 🔔 P1 "trả lời Quentin" gạch |
| DSR-649 | Martin 16:17 JST | f | search-result chưa implement; News list tự lấy theo ngôn ngữ | KNOWN-FACTS |
| DSR-582 | Quentin 14:41 JST | f | Blocked by SharePoint access | KNOWN-FACTS |
| DSR-668 | Quentin 17:33 JST | f | Sub-task mới オーサリング追跡ファイルの作成 (Quentin) | – |
| DSR-590/666/667/610 | – | f | Không comment mới (666/667 Ngọc To Do) | – |

## Câu hỏi / tin đã gạch
- DASHBOARD 🔔 P1 "Trả lời Quentin DSR-587 + 566/653" → ✅ đã trả lời 22/10 15:00 JST – KHÔNG gửi lại.
- us/DSR-557 B1 (Youku ID) → ✅ đã trả lời DSR-611 22/10 – KHÔNG hỏi lại Youku ID.

## Dat cần làm
- P2 (23/10): cảm ơn Quentin trên DSR-611 + nhắc Kohei Q3 (tin EN sẵn trong DASHBOARD 🔔).
- Khi JOB-20261022-16 Pass: đóng DSR-664 (comment "QA confirm DEV – fixed", 211→221→231→31).

Jobs: +JOB-20261022-16 (queue, claude-code). Hold không đổi (16-08/16-11 chờ template 566; 22-03 chờ BUGCHK).
