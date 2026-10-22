# Jira sweep – kết quả lần gần nhất
last_sweep_utc: 2026-10-22T05:10:00Z

Lượt 12:05 VN (scheduled) · cửa sổ 02:15Z → 05:10Z (updated >= -3h) · đọc 25 ticket (22 cập nhật + 9 giao Dat, trùng 6), bỏ lại 0.

## Mới phát hiện
| Ticket | Ai / khi nào | Loại | Nội dung | Đã cập nhật |
|---|---|---|---|---|
| DSR-566 + DSR-653 | Quentin 11:54 JST | e/c | "Blocked by Missing News Article Template" – mâu thuẫn Ngọc 19/10 (template đã deploy DEV) | DASHBOARD 653/566 + 🔔 P1 (tin EN soạn sẵn); us/DSR-566; KNOWN-FACTS |
| DSR-587 | Quentin 11:43 JST | b/c | "Blocked by DSR-665" – 665 đã Done 13:40 JST → hết block | DASHBOARD 587; 🔔 P1 chung tin Quentin; us/DSR-587; KNOWN-FACTS |
| DSR-665 | QA (Dat) 13:40 JST | a | Retest Pass DEV → Done | DASHBOARD 587, 📣 dòng + mục 1 tin Martin gạch |
| DSR-647/657/658/660/538 | Dat 13:29 JST | f | Đã chuyển Done | 🔔 P1 "chuyển Done" gạch |
| DSR-659 | QA→Martin 13:40 JST | c (đã làm) | Thumbnail meta vẫn relative → trả Martin (c.64851) | 🔔 P1 "trả 659" gạch; mục 2 tin Martin gạch |
| DSR-664 | QA→Ngọc 13:32 JST | a/f | Repro YES, giao Ngọc Sprint 12, spec retest sẵn | DASHBOARD 664; KNOWN-FACTS |
| DSR-558 | Quentin 11:53 JST | f | Blocked by DSR-664 | KNOWN-FACTS |
| DSR-546 | Quentin 11:52 JST | f | Blocked by API key (DSR-302) | KNOWN-FACTS |
| DSR-636 | Kohei 12:32 JST | f | Directory map sheet + dev EDS domain (cho Mayuka) | KNOWN-FACTS |
| DSR-583 | Quentin 11:23 JST | f | "got answer from backlog" | KNOWN-FACTS |
| DSR-661/662/610/638/639/588 | – | f | Cập nhật không comment mới trong cửa sổ | – |

## Câu hỏi / tin đã gạch
- STANDUP: đề xuất dời 566/653 sang Sprint 13 (5 chỗ) → ✅ đã trả lời DSR-566 19/10 – KHÔNG gửi.
- STANDUP/DASHBOARD 📣: "please fix DSR-665" + mục 1 tin Martin → ✅ Done 22/10; mục 2 (DSR-659) → đã gửi qua Jira c.64851.
- DASHBOARD 🔔: P1 chuyển Done 4 bug, P1 trả 659 → ✅ đã làm.

## Dat cần làm
- **P1 (trưa nay):** trả lời Quentin trên DSR-587 + DSR-566/653 (tin EN trong DASHBOARD 🔔 P1): 665 Done → 587 hết block; template news-article đã có từ 19/10 → không dời S13.
- Tin 📣 Martin: chỉ gửi mục 3–5 (og:image, catalog list, isActive/404 config).

Jobs: không đổi (hold 16-08/16-11 chờ data TD-566 Night 22/10; 22-03 chờ BUGCHK Night 22/10).
