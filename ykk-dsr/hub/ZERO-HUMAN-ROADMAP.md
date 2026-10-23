# Zero-Human Roadmap – YKK DSR QA (chốt 21/10/2026, Dat)

**Mục tiêu:** **0% QA-PT** sau **2–3 sprint** (Sprint 13 → Sprint 15) – mọi việc QA-PT làm chuyển sang agent. **Dat giữ nguyên vai trò hiện tại** (cầu nối dev/PM, duyệt, vận hành) – không phải mục tiêu cắt giảm (Dat 21/10 17:52). Trong lộ trình vẫn giữ QA-PT làm lưới an toàn. Mỗi việc của người được **đo**, rồi chuyển dần sang agent theo cổng chất lượng. Được tạo thêm agent khi cần.
Owner mô hình: Claude (QA Manager). Đánh giá mỗi cuối sprint (Sprint Review QA).

## 1. Việc của QA-PT (H1–H4 = mục tiêu 0%) và việc của Dat (H5–H7 = giữ nguyên, chỉ theo dõi)
| ID | Việc | Ai làm hôm nay | Đo bằng |
|---|---|---|---|
| H1 | Tạo/sửa test data trên AEM Author: CF content + DSR, đổi tên, publish | QA-PT (~75–80% giờ/đêm) | phút/đêm, số CF, số lỗi data |
| H2 | Page properties (Sites + UE: Title, Tags, robots, navtitle, category) | QA-PT (~10%) | phút/đêm |
| H3 | Sửa block nội dung trong UE (ảnh, text, xóa block) | QA-PT (~5%) | phút/đêm |
| H4 | Manual TC: thao tác Author UI (validation, required, dialog), cảm quan/visual, form/mail, công cụ ngoài (Rich Results…) | QA-PT (65/213 TC = 31% TC là Manual) | số TC Manual, phút/đêm |
| H5 | Cầu nối giao tiếp: chuyển tin dev/PM ↔ Claude, đuổi người trả lời | Dat | số tin chuyển/ngày |
| H6 | Duyệt: Done US, bug < 80%, chốt scope | Dat | số quyết định/ngày |
| H7 | Vận hành: khởi động runner, dán cookie, upload file, VPS | Dat | số lần/tuần |

## 1b. Look & Feel (cảm quan) → Dat review, không phải QA-PT (Dat 21/10 17:56)
- Phần cảm quan = **look & feel** (bố cục, khoảng cách, màu, font, ảnh, cảm giác tổng thể PC/SP so với Figma). Không giao QA-PT, không đẩy hết cho UAT: **Dat "have a look" trước khi gửi khách UAT** (bước an toàn).
- **Mỗi item ≤ 2–5 phút, không thao tác**: agent chuẩn bị sẵn 1 "L&F card": ảnh PC + SP của trang (codex) đặt cạnh frame Figma, vùng khác biệt đã khoanh, A3 Design-judge ghi tối đa 5 điểm cần nhìn (kèm % chắc chắn), 1 link trang thật. Dat chỉ chọn **OK / NG + 1 dòng ghi chú**.
- Kênh: mục "👀 Look & Feel" trên DASHBOARD → mỗi card là 1 file `hub/lf/<US>-<date>.md` (ảnh hiển thị ngay trên GitHub/điện thoại); Dat trả lời OK/NG trong chat hoặc sheet review → 07:45/17:10 đọc: NG → bug (assignee dev, ảnh card làm evidence), OK → TC L&F Pass "reviewed by Dat".
- Chỉ đưa card khi functional + visual tự động đã xanh (không bắt Dat nhìn trang còn lỗi). Gom theo US, tối đa ~5 card/ngày (~20 phút).

## 2. Đội agent mục tiêu (bộ não = Claude cho mọi agent đụng AEM; codex chỉ visual)
| Agent / lane | Việc nhận | Thay H | Sprint |
|---|---|---|---|
| **A1 Author-data** (lane `author`, script + Claude) | CF create/patch/rename/publish theo manifest (P1) → page properties Sites + UE prop (P2) → nội dung block trang qua JCR/Sling (P3) | H1, H2, H3 | P1 S12 cuối/S13 · P2 S13 · P3 S14 |
| **A2 Author-UI = lane `chrome`** (Claude in Chrome trên máy Dat – đổi 23/10, thay Playwright) | H2 page properties, H3 block UE, H4 manual TC Author UI, retest bug; dự phòng H1 khi cookie hết hạn – `CHROME-AGENT.md` | H2, H3, H4 | **B2 từ 23/10** (S12) |
| **A3 Design-judge** (scheduled Claude có Figma connector + ảnh từ codex) | So screenshot PC/SP với frame Figma, khoanh khác biệt, soạn **L&F card** cho Dat (§1b) | H4 (cảm quan → Dat review 2–5 phút/item) | S13 thử → S14 |
| **A5 Ops-watch** (Claude scheduled, hỗ trợ – không thay Dat) | Cảnh báo sớm runner/job treo, cookie sắp hết hạn, upload fail → giảm sự cố làm gián đoạn agent thay QA-PT | – | S13 |
| **A6 Gatekeeper** (Claude, độc lập) | Kiểm độc lập kết quả agent Author/UI trước khi thay QA-PT (thay vai trò "QA-PT kiểm mẫu" ở bậc B2→B3) | – | S14 |
| Hiện có: claude-code (functional), codex (visual) | Automation + chạy test; chuyển dần Manual → Automation/Visual | H4 | liên tục |

## 3. Cách chuyển việc an toàn (mỗi loại việc đi qua 4 bậc)
| Bậc | Người | Agent | Điều kiện lên bậc |
|---|---|---|---|
| B0 Human | làm | – | có manifest/TC chuẩn hóa |
| B1 Shadow | làm | làm song song / verify việc người làm | 3 đêm agent khớp 100% với kết quả đúng |
| B2 Agent + audit | kiểm mẫu 20% + sự cố | làm | 5 đêm liên tiếp 0 lỗi data, L0–L3 pass |
| B3 Agent only | không | làm; Gatekeeper kiểm | rollback về B2 nếu 1 lỗi gây trễ ticket |
**23/10: lane `chrome` nhận H2/H3/H4 ở B2** (QA-PT audit mẫu 20% trong 5 ngày làm việc, verify độc lập mọi lần ghi).
Đã có ở B1: verify data QA-PT bằng manifest (JOB-20261021-09, từ 22/10).
**22/10: H1 (CF data trong guard `qa*`) lên B2 sớm 1 sprint** – JOB-20261022-07: 23 writes, 0 lỗi, L1/L2 100%, QA-PT chỉ shadow check. Còn ở B0: node ngoài guard (990586*), xóa/unpublish, sub-folder, page UE (H2/H3). Điều kiện lên B3: 5 lần apply liên tiếp 0 lỗi. Phụ thuộc: cookie < 16h → Dat dán mỗi sáng (D1).

## 4. Lộ trình & mục tiêu đo
| Mốc | H1–H3 Author data | H4 Manual TC | Agent hỗ trợ | QA-PT giờ/đêm | QA-PT % (đường găng) |
|---|---|---|---|---|---|
| Baseline S12 (đo 15–21/10) | 100% người | 31% TC Manual | – | ~4h | ~100% |
| Hết S13 | H1 B2–B3 · H2 B1–B2 · H3 B0 | Manual ≤ 20% (chuyển sang auto/visual) · A2/A3 B1 | A5 chạy | ≤ 1h | ≤ 30% |
| Hết S14 | H1–H2 B3 · H3 B2 | Manual ≤ 10% · A2/A3 B2 | A6 kiểm thay QA-PT audit | ≤ 30 phút (audit) | ≤ 10% |
| Hết S15 (nếu cần) | B3 toàn bộ | Manual ≈ 0 (look & feel = L&F card Dat review ≤ 5 phút/item, rồi UAT khách) | A6 B3 | 0 (QA-PT on-call) | ~0% |

## 5. Phụ thuộc cần mở khóa (ai, khi nào)
| # | Cần gì | Từ ai | Hạn | Thay thế nếu không có |
|---|---|---|---|---|
| D1 | Technical account / service credential AEM DEV (ghi `qa*`, không xóa) thay cookie | Dat → Quentin/Okumura (Adobe admin) | S13 tuần 1 | Cookie U1 + A5 cảnh báo hết hạn |
| D3 | Form/mail test: HubSpot form ID test + hộp thư test có API (SendGrid sandbox / inbox test) | Quentin / Nakamoto | S14 | TC form/mail giữ Manual (ít) |
| D5 | Quota Claude cho thêm agent (A2, A3, A5, A6) | Dat | S13 | giảm tần suất, ưu tiên A1 |

## 6. Rủi ro & chặn
- Agent ghi sai data trên Author → guard path `qa*`, không có delete, dry-run trước, `before.json`, A6 kiểm.
- Phụ thuộc cookie/người khởi động runner → D1 + A5.
- STG/PRO (Sprint sau): agent **không** ghi data trên STG/PRO trừ khi Dat duyệt riêng; test STG/PRO read-only.
- Đánh giá cảm quan không thay hoàn toàn bằng máy → **Dat review L&F card (2–5 phút/item)** trước UAT khách; ghi trong DoD: "L&F reviewed by Dat".

## 7. Đo lường (cập nhật mỗi ngày bởi 07:45, tổng kết cuối sprint)
`WORKLOAD.md` (giờ công quy đổi theo actor) + bảng KPI: QA-PT phút/đêm (theo H1–H4) · số lỗi data QA-PT · % TC chạy không cần người · (theo dõi, không phải mục tiêu) số việc Dat/ngày · thời gian L&F review/item (đích ≤ 5 phút) · lead time ticket giao → Done DEV · số bug giả.
