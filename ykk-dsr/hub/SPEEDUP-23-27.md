# Speed-up plan Sprint 12 (23/10 → 27/10) – Claude 23/10 09:45, Dat yêu cầu
Nguyên tắc: agent làm mọi việc không cần dev; việc QA-PT agent làm được → agent; việc chặn bởi dev → Dat push (bảng dưới). Mốc cứng: fix dev lên DEV **trước 26/10 12:00**.

| Khi | claude-code | codex | Agent Author (ghi AEM) | QA-PT | Dat |
|---|---|---|---|---|---|
| 23/10 sáng | JOB-23-03 apply TD-587 âm + Youku → chạy TC · JOB-23-05 mở rộng tool (D13–D15) + 5 manifest dry-run | JOB-23-04 retest DSR-673 · IDLE-42 canh fix 666/667/672 + visual 566 | JOB-23-03 | – | push dev (bảng dưới) · **dán cookie 13:00** |
| 23/10 chiều | JOB-23-06 apply (586-02, 529 meta, 566 fix, 190 DSR, 587 phase 2) → rerun · JOB-23-07 sửa kỳ vọng + chuẩn bị 669 | IDLE-42 tiếp | JOB-23-06 (13:00–18:00) | – | – |
| 23/10 đêm | regression đêm | visual/Lighthouse đêm | – | **chỉ còn**: TD-587-04 (UI tên in hoa), TD-587-05 (sub-folder), phần agent fail + manual tồn | dán cookie 22–23h CN 25/10 (cho T2) |
| 26/10 T2 | 08:00 regression toàn bộ · retest fix dev · 669 regression nếu đã deploy | visual cuối | data cuối (nếu fix dev cần data) | đêm 26/10: chỉ retest | 12:00 chốt: fix chưa lên → TC sang S13 |
| 27/10 T3 | rerun cuối, report đóng ticket | – | – | – | Done DEV / Sprint review |

## Dat push dev (blocked by dev)
| Việc | Ai | Ảnh hưởng | Hạn |
|---|---|---|---|
| DSR-666/667 (In Progress) | Ngọc | 590 | 26/10 12:00 |
| DSR-672 ngày raw ISO + "Back to list" có trong scope 566 không | Ngọc | 566/653 | 26/10 12:00 |
| 570: form demo gắn CF catalog + POST HubSpot (có thể cần `hubspotFormId` của DSR-671) | Ngọc (+Martin 671) | 570 (4 TC) | 26/10 12:00 |
| DSR-669/670/671 ngày deploy DEV | Martin/Kohei | regression toàn bộ overlay | trả lời hôm nay; deploy ≤ 26/10 12:00 |
| CATOV-010: DSR CF trong sub-folder vẫn sinh trang (70%) + PDO-006 (65%) | Martin | 654/586 | hỏi hôm nay |
| TC 007 (pdf lộ trong list khi requiresForm) | Quentin | 570 | 24/10 |
| DSR-611 Q1/Q2 (Numata), Q3 (Kohei) | Quentin/Kohei | 557 | mặc định giữ |

## QA-PT → Agent (chuyển hôm nay)
Agent làm: 990586002 Preview (D13), TD-587-08/10 phase 2 (D14), qa529 category/robots (D15), qa566 data fix (D15), QA190 DSR, TD-587-02/06/07, Youku. QA-PT giữ: TD-587-04 (thao tác UI), TD-587-05 (tạo sub-folder), manual tồn, shadow check.
