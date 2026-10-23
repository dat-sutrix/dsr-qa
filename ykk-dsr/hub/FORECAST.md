# Sprint 12 Forecast tracker (DEV) – baseline gửi Quentin 22/10 11:47 VN

**Quy tắc (Dat 22/10 16:11):** cập nhật **mỗi ngày làm việc** (standup 08:19 ghi bảng + đưa dòng "Forecast" vào Daily report). Bất kỳ ticket nào **lùi ngày đích so với baseline** hoặc **đổi mức rủi ro xấu đi** → escalate ngay trong Daily report (mục Blockers / need help, mention người liên quan) + tin EN soạn sẵn cho Quentin trong STANDUP mục D. Không để "surprise on last minute".
**Cổng nhận ticket muộn:** sprint kết thúc **27/10**. Ticket dev chuyển sang [Dev] In Testing **sau 23/10 17:00 VN** hoặc khi tổng việc test còn lại > năng lực còn lại (bảng Năng lực) → ghi "LATE HANDOVER" + escalate cùng ngày (Quentin + dev), đề xuất dời Sprint 13 hoặc giảm scope test (ghi rõ TC nào bỏ).

## Bảng theo dõi (sửa cột "Hiện tại" + "Δ"; giữ cột Baseline)
| Ticket | Baseline 22/10 (đích · rủi ro) | Hiện tại (23/10 08:25) | Δ | Đang chờ ai | Ghi chú |
|---|---|---|---|---|---|
| DSR-647, 538, 657, 658, 660 | Done 22/10 · ✅ | ✅ Done | = | – | |
| DSR-665 | (blocker 587) | ✅ Done 22/10 | = | – | |
| DSR-659 | (blocker 529) | ✅ Done 22/10 (by design) | = | – | |
| DSR-664 null caption | Ngọc | ✅ Done 23/10 09:12 | = | – | |
| DSR-590 Eco | 23/10 · 🟢 | **26/10 · 🟡** – DSR-666/667 → **In Progress 09:05** (Ngọc đang làm); IDLE-41 theo dõi fix | 🔴 lùi đích (escalate 23/10) – xu hướng tốt lên | Ngọc | Done khi 666/667 fixed + retest |
| DSR-566/653 News | 23–26/10 · 🟢 | **26/10 · 🟡** – JOB-16-08 12/10: ngày raw ISO → **bug DSR-672** (Ngọc), thiếu Back to list (70%), index (70%); title placeholder = data | 🔴 rủi ro xấu đi (escalate 23/10) | Ngọc + QA-PT (title, My list/share) | |
| DSR-586 Product overlay | 23–26/10 · 🟢 | 26/10 · 🟢 – positives 13/0, âm 6/2 (PDO-005 TC cũ, PDO-006 65%); 990586002 chưa Preview = data → tối 23/10 | = | QA-PT (Preview 990586002) | PDO-020 Blocked (no design) |
| DSR-587 Video overlay | 26/10 · 🟡 | 26/10 · 🟡 – TD-587 âm: Agent Author dry-run JOB-23-02 → apply JOB-23-03 trước 13:30 (fallback QA-PT tối 23/10) | = | Agent | |
| DSR-557 Video & Catalog | 26/10 · 🟡 | 26–27/10 · 🟠 – 24/0/6; **ja catalog list 0 thẻ, JSON 7 item → bug DSR-673 (Martin, High)**; Youku + QA190 NEW/UPD/BOTH data | 🔴 rủi ro xấu đi (escalate 23/10) | Martin (ja list) · data | |
| DSR-654 Catalog overlay | 27/10 · 🟠 | 27/10 · 🟠 – JOB-22-19 đang chạy; ja list 0 thẻ | 🔴 xấu đi so với 22/10 (escalate) | Martin | |
| DSR-570 Doc download | 27/10 · 🟠 | 27/10 · 🟠 – 12/2/2; CATDL-009/011/012/013 Blocked (CF binding + HubSpot POST, Ngọc, chưa ETA); 007/016 70% | 🔴 xấu đi (escalate) | Ngọc · Quentin (007) | không fix trước 26/10 12:00 → TC bị chặn sang S13 |
| DSR-529 Article | 26/10 · 🟠 | 26/10 · 🟡 – còn data category/robots (tối 23/10) | = | QA-PT | |
| DSR-611 Question (Youku) | – | Q4 trả lời; Q1/Q2 Numata, Q3 Kohei | = | Numata / Kohei | mặc định giữ |
| 🆕 **DSR-669 / 670 / 671** CF model refactor (Martin/Kohei, tạo 23/10 10:19–10:38 JST, Sprint 12) | – (mới) | 669 In Progress, 670 In Progress, 671 To Do. Đổi tên DM_*_related → DM_*_dsr, đổi 8 persisted query, migrate cq:model mọi CF dsr rồi republish, model mới techmovie, thêm hubspotFormId/promoText | 🔴 **LATE SCOPE** (escalate 23/10 09:25) | Martin / Kohei | 23/10 11:24 Martin: draft PR eds#212 + fullstack#108, chờ approve, chưa có ngày deploy. Deploy lên DEV = **regression toàn bộ overlay 587/586/654/557/570 + list** + Agent Author/manifest/fixture đổi model; deploy sau 26/10 12:00 → không kịp retest trong S12 |
**Forecast 23/10: 4/9 on track** (664, 586, 587, 529) · 5 at risk chờ fix dev (590, 566/653, 557, 654, 570).

## Năng lực test còn lại (cập nhật 23/10 08:25)
| Ngày | Agent | QA-PT | Dat L&F |
|---|---|---|---|
| 23/10 (T6, hôm nay) | claude-code: JOB-22-19 chạy, IDLE-39 queue · **codex trống** | đêm 23/10 ~4h (đêm data hữu ích cuối) | ≤ 20 phút |
| 26/10 (T2) | 2 lane (rerun toàn bộ sau data đêm 23/10 + retest fix dev) | đêm 26/10 ~4h (chỉ retest, data mới = không kịp) | ≤ 20 phút |
| 27/10 (T3, cuối sprint) | 2 lane tới 17:00 | – | review cuối |
Còn 2 ngày làm việc + 1 đêm data. Việc data còn lại (990586002 Preview, TD-587 âm, Youku, QA190 dsr, 566 title/My list, 529 category/robots) ≈ 3–4h → vừa đêm 23/10 (Agent Author duyệt thì nhẹ hơn). Fix dev lên sau **26/10 12:00** → không đủ thời gian retest + đóng → đề xuất S13 cho TC bị chặn.

## Lịch sử thay đổi (mới nhất ở trên)
- 23/10 09:25 (Điều phối): 664 Done; bug mới DSR-672 (566 date, Ngọc), DSR-673 (ja catalog list, Martin High); 666/667 In Progress. **Escalation #5: DSR-669/670/671 CF model refactor đưa vào Sprint 12 ngày 23/10** → rủi ro regression toàn bộ overlay nếu deploy cuối sprint; đề xuất deploy DEV trước 26/10 12:00 hoặc dời S13.
- 23/10 08:25 (standup): 4/9 on track. Escalate 4: 590 lùi 23→26/10 (666/667 To Do); 566/653 xấu đi (ngày raw 85%, Back to list); 557/654 ja catalog list 0 thẻ (JSON 7 item); 570 4 TC Blocked không ETA. 664 Done hôm nay. Không LATE HANDOVER.
- 22/10 16:15: baseline + cập nhật sau 7 bug đóng, template 566 sửa, catalog list live.
