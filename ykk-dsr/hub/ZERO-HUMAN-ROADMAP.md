# Zero-Human Roadmap – YKK DSR QA (chốt 21/10/2026, Dat)

**Mục tiêu:** giảm việc của con người (QA-PT + Dat) về tối thiểu, đích **0%** sau **2–3 sprint** (Sprint 13 → Sprint 15). Trong lộ trình vẫn giữ QA-PT làm lưới an toàn. Mỗi việc của người được **đo**, rồi chuyển dần sang agent theo cổng chất lượng. Được tạo thêm agent khi cần.
Owner mô hình: Claude (QA Manager). Đánh giá mỗi cuối sprint (Sprint Review QA).

## 1. Định nghĩa "việc của người" (H) – đo từ Sprint 12
| ID | Việc | Ai làm hôm nay | Đo bằng |
|---|---|---|---|
| H1 | Tạo/sửa test data trên AEM Author: CF content + DSR, đổi tên, publish | QA-PT (~75–80% giờ/đêm) | phút/đêm, số CF, số lỗi data |
| H2 | Page properties (Sites + UE: Title, Tags, robots, navtitle, category) | QA-PT (~10%) | phút/đêm |
| H3 | Sửa block nội dung trong UE (ảnh, text, xóa block) | QA-PT (~5%) | phút/đêm |
| H4 | Manual TC: thao tác Author UI (validation, required, dialog), cảm quan/visual, form/mail, công cụ ngoài (Rich Results…) | QA-PT (65/213 TC = 31% TC là Manual) | số TC Manual, phút/đêm |
| H5 | Cầu nối giao tiếp: chuyển tin dev/PM ↔ Claude, đuổi người trả lời | Dat | số tin chuyển/ngày |
| H6 | Duyệt: Done US, bug < 80%, chốt scope | Dat | số quyết định/ngày |
| H7 | Vận hành: khởi động runner, dán cookie, upload file, VPS | Dat | số lần/tuần |

## 2. Đội agent mục tiêu (bộ não = Claude cho mọi agent đụng AEM; codex chỉ visual)
| Agent / lane | Việc nhận | Thay H | Sprint |
|---|---|---|---|
| **A1 Author-data** (lane `author`, script + Claude) | CF create/patch/rename/publish theo manifest (P1) → page properties Sites + UE prop (P2) → nội dung block trang qua JCR/Sling (P3) | H1, H2, H3 | P1 S12 cuối/S13 · P2 S13 · P3 S14 |
| **A2 Author-UI** (Playwright trên Author/UE, Claude) | Manual TC loại "thao tác Author": required/validation/dialog/picker, chỉ path `qa*` DEV | H4 (Author UI) | S13 spike → S14 |
| **A3 Design-judge** (scheduled Claude có Figma connector + ảnh từ codex) | So screenshot PC/SP với frame Figma, chấm theo checklist, chỉ báo khác biệt có bằng chứng | H4 (cảm quan) | S13 thử → S14 |
| **A4 Comms** (Claude scheduled) | Hỏi/đuổi dev & PM **trực tiếp trên Jira** (comment + @mention, ticket Question), đọc trả lời → cập nhật plan; tóm tắt cho Dat | H5 | S13 |
| **A5 Ops-watch** (Claude scheduled) | Theo dõi runner/job treo, cookie sắp hết hạn, upload fail → tự sửa được thì sửa, không thì 1 cảnh báo | H7 | S13 |
| **A6 Gatekeeper** (Claude, độc lập với người làm) | Kiểm lại trước khi tự tạo bug / tự đề xuất & chuyển Done theo luật; Dat chỉ có quyền phủ quyết | H6 | S14 |
| Hiện có: claude-code (functional), codex (visual) | Automation + chạy test; chuyển dần Manual → Automation/Visual | H4 | liên tục |

## 3. Cách chuyển việc an toàn (mỗi loại việc đi qua 4 bậc)
| Bậc | Người | Agent | Điều kiện lên bậc |
|---|---|---|---|
| B0 Human | làm | – | có manifest/TC chuẩn hóa |
| B1 Shadow | làm | làm song song / verify việc người làm | 3 đêm agent khớp 100% với kết quả đúng |
| B2 Agent + audit | kiểm mẫu 20% + sự cố | làm | 5 đêm liên tiếp 0 lỗi data, L0–L3 pass |
| B3 Agent only | không | làm; Gatekeeper kiểm | rollback về B2 nếu 1 lỗi gây trễ ticket |
Đã có ở B1: verify data QA-PT bằng manifest (JOB-20261021-09, từ 22/10).

## 4. Lộ trình & mục tiêu đo
| Mốc | H1–H3 Author data | H4 Manual TC | H5–H7 Dat | QA-PT giờ/đêm | Human % (đường găng) |
|---|---|---|---|---|---|
| Baseline S12 (đo 15–21/10) | 100% người | 31% TC Manual | ~10–15 việc/ngày | ~4h | ~100% |
| Hết S13 | H1 B2–B3 · H2 B1–B2 · H3 B0 | Manual ≤ 20% (chuyển sang auto/visual) · A2/A3 B1 | A4 + A5 chạy; Dat ≤ 5 việc/ngày | ≤ 1h | ≤ 30% |
| Hết S14 | H1–H2 B3 · H3 B2 | Manual ≤ 10% · A2/A3 B2 | A6 B2; Dat ≤ 2/ngày | ≤ 30 phút (audit) | ≤ 10% |
| Hết S15 (nếu cần) | B3 toàn bộ | Manual ≈ 0 (còn lại = chấp nhận rủi ro hoặc test bởi khách/UAT) | Dat chỉ escalations | 0 (QA-PT on-call) | ~0% |

## 5. Phụ thuộc cần mở khóa (ai, khi nào)
| # | Cần gì | Từ ai | Hạn | Thay thế nếu không có |
|---|---|---|---|---|
| D1 | Technical account / service credential AEM DEV (ghi `qa*`, không xóa) thay cookie | Dat → Quentin/Okumura (Adobe admin) | S13 tuần 1 | Cookie U1 + A5 cảnh báo hết hạn |
| D2 | Dev chấp nhận trao đổi qua Jira comment (@mention) thay chat riêng | Dat → Martin, Quentin | S13 tuần 1 | A4 soạn sẵn, Dat chỉ copy |
| D3 | Form/mail test: HubSpot form ID test + hộp thư test có API (SendGrid sandbox / inbox test) | Quentin / Nakamoto | S14 | TC form/mail giữ Manual (ít) |
| D4 | Quy tắc auto-Done (luật Gatekeeper) được PM chấp nhận | Dat | S14 | Dat duyệt 1 lần/ngày |
| D5 | Quota Claude cho thêm agent (A2–A6) | Dat | S13 | giảm tần suất, ưu tiên A1/A4 |

## 6. Rủi ro & chặn
- Agent ghi sai data trên Author → guard path `qa*`, không có delete, dry-run trước, `before.json`, A6 kiểm.
- Phụ thuộc cookie/người khởi động runner → D1 + A5.
- STG/PRO (Sprint sau): agent **không** ghi data trên STG/PRO trừ khi Dat duyệt riêng; test STG/PRO read-only.
- Đánh giá cảm quan không thay hoàn toàn bằng máy → chấp nhận phần còn lại cho UAT của khách, ghi rõ trong DoD.

## 7. Đo lường (cập nhật mỗi ngày bởi 07:45, tổng kết cuối sprint)
`WORKLOAD.md` (giờ công quy đổi theo actor) + bảng KPI: QA-PT phút/đêm (theo H1–H4) · số lỗi data QA-PT · % TC chạy không cần người · số việc Dat/ngày (đếm 🔔) · lead time ticket giao → Done DEV · số bug giả.
