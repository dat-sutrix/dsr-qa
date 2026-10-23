# Jira sweep – kết quả lần gần nhất
last_sweep_utc: 2026-10-23T01:08:00Z

Lượt 08:05 VN (scheduled) · cửa sổ 2026-10-22T09:15Z → 2026-10-23T01:08Z (updated >= -16h) · đọc 20 ticket (9 cập nhật + 11 giao Dat, trùng 2), bỏ lại 0.
Ghi chú kỹ thuật: JQL `labels != qa-tc` loại cả ticket không có label → dùng `(labels is EMPTY OR labels != qa-tc)`.

## Mới phát hiện
| Ticket | Ai / khi nào | Loại | Nội dung | Đã cập nhật |
|---|---|---|---|---|
| DSR-566 / DSR-357 | Kohei 18:25 JST 22/10 | a | Deploy Dev `dev/2026.10.22_3` (12dece2, 09:25Z) cùng lúc 566 → [Dev] In Testing giao Dat. Đã được session 17:10 xử lý (JOB-16-08/-11 queue 23/10) | KNOWN-FACTS; FORECAST (giờ giao QA, trước hạn 23/10 17:00 → không LATE) |
| DSR-578 | Martin 18:17 JST 22/10 | a | List Design Fixes: Ngọc thêm field tag vào list config, nhờ 石谷 kiểm tra | KNOWN-FACTS (ticket của 石谷, không đổi kế hoạch QA) |
| DSR-182 | nakamoto 20:03 JST 22/10 | f | Hỏi Kohei xác nhận luồng index tìm kiếm (json2html → helix-query.yaml → block). Liên quan Q14 (DSR-560), chưa phải câu trả lời | – (theo dõi trả lời của Kohei) |
| DSR-589 | Martin 09:35 JST 23/10 | f | Comment chỉ là link Google Chat (không đọc được) – có thể liên quan Q34/Q35 icon | Dat cần làm (P3) |
| DSR-635 | Quentin 09:27 JST 23/10 | f | Sprint Review 11 Preparation → Dismissed | – |
| DSR-664/662/661 | 18:13–18:14 JST 22/10 | f | Đổi trạng thái đã ghi ở lượt 16:05 | – |

## Câu hỏi / tin đã gạch
- Không có (chưa có câu trả lời mới cho tc-questions / 🔔).

## Dat cần làm
- P3: mở link chat Martin trên DSR-589 (c.64925); nếu đã trả lời Q34/Q35 (icon) → báo QA session để gạch, **không hỏi lại**.

Jobs: không thêm. Hold/queue không đổi.
