# Sprint 12 Forecast tracker (DEV) – baseline gửi Quentin 22/10 11:47 VN

**Quy tắc (Dat 22/10 16:11):** cập nhật **mỗi ngày làm việc** (standup 08:19 ghi bảng + đưa dòng "Forecast" vào Daily report). Bất kỳ ticket nào **lùi ngày đích so với baseline** hoặc **đổi mức rủi ro xấu đi** → escalate ngay trong Daily report (mục Blockers / need help, mention người liên quan) + tin EN soạn sẵn cho Quentin trong STANDUP mục D. Không để "surprise on last minute".
**Cổng nhận ticket muộn:** sprint kết thúc **27/10**. Ticket dev chuyển sang [Dev] In Testing **sau 23/10 17:00 VN** hoặc khi tổng việc test còn lại > năng lực còn lại (bảng Năng lực) → ghi "LATE HANDOVER" + escalate cùng ngày (Quentin + dev), đề xuất dời Sprint 13 hoặc giảm scope test (ghi rõ TC nào bỏ).

## Bảng theo dõi (sửa cột "Hiện tại" + "Δ"; giữ cột Baseline)
| Ticket | Baseline 22/10 (đích · rủi ro) | Hiện tại (22/10 16:15) | Δ | Đang chờ ai | Ghi chú |
|---|---|---|---|---|---|
| DSR-647, 538, 657, 658, 660 | Done 22/10 · ✅ | ✅ Done | = | – | |
| DSR-665 | (blocker 587) | ✅ Done 22/10 | 🟢 | – | |
| DSR-659 | (blocker 529) | ✅ Done 22/10 (by design) | 🟢 | – | |
| DSR-590 Eco | 23/10 · 🟢 | layout reviewed; 2 bug FE DSR-666/667 (Ngọc) | ⚠ phụ thuộc fix 666/667 | Ngọc | Done khi 666/667 fixed |
| DSR-566/653 News | 23–26/10 · 🟢 | template sửa xong 22/10 16:00; **giao QA 22/10 18:25 JST** (566 → [Dev] In Testing, deploy dev/2026.10.22_3; trước hạn 23/10 17:00) ; TD-566 tối nay | = | QA-PT | |
| DSR-586 Product overlay | 23–26/10 · 🟢 | data tối nay (BUGCHK-586) | = | QA-PT | |
| DSR-587 Video overlay | 26/10 · 🟡 | 665 Done, og:image Pass (JOB-13) | 🟢 tốt lên | – | |
| DSR-557 Video & Catalog | 26/10 · 🟡 | catalog list live (ja 6/en 5), Youku ID có (DSR-611) | 🟢 | QA-PT (Youku data) | |
| DSR-654 Catalog overlay | 27/10 · 🟠 | data agent + republish xong; TD-654-03/05 tối nay | 🟢 tốt lên | QA-PT | |
| DSR-570 Doc download | 27/10 · 🟠 | `-form` OK; 6 manual tối nay | 🟢 tốt lên | QA-PT | |
| DSR-529 Article | 26/10 · 🟠 | 659 Done; còn data category/robots | 🟢 tốt lên | QA-PT | |
| DSR-664 null caption | Ngọc | Martin fix → In Testing; JOB-16 retest | 🟢 | Agent | |

## Năng lực test còn lại (cập nhật mỗi sáng)
| Ngày | Agent | QA-PT | Dat L&F |
|---|---|---|---|
| 23/10 (T5→T6) | 2 lane cả ngày | đêm 23/10 ~4h | ≤ 20 phút |
| 26/10 (T2) | 2 lane | đêm 26/10 ~4h | ≤ 20 phút |
| 27/10 (T3, cuối sprint) | 2 lane tới 17:00 | – | review cuối |
Việc test cần data mới sau đêm 26/10 = **không kịp** trong Sprint 12 → escalate trước 26/10 09:00.

## Lịch sử thay đổi (mới nhất ở trên)
- 22/10 16:15: baseline + cập nhật sau 7 bug đóng, template 566 sửa, catalog list live.
