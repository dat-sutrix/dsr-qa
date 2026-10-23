# 03 – Working Model: Claude web ↔ VPS Agents ↔ QA part-time ↔ Dat

Chốt ngày 2026-10-14, cập nhật 2026-10-21 (§0 bug ≥ 80%, Sprint field, nhất quán hiển thị; §4 lịch; §6 Night Pack ~4h + định dạng; §10 overlay update 21/10; §13 CONTEXT.md). Mục tiêu: mọi trao đổi đi qua kênh máy đọc được, Dat chỉ làm việc cần con người.

> **Điểm vào mọi session: repo `dat-sutrix/dsr-qa` → `ykk-dsr/hub/CONTEXT.md`** (quy tắc đứng, IDs, trạng thái, baseline mới nhất). File này mô tả cơ chế; CONTEXT.md là bản tóm tắt sống, cập nhật cùng commit với thay đổi.

## 0. Giai đoạn dự án hiện tại: **DEV only** (chốt 15/10/2026)
- Dự án đang ở giai đoạn DEV, **chưa tới STG/PRO**. Mọi ticket trong active sprint chỉ test và kết luận trên **DEV**. Không tạo job, Night Pack hay việc chờ cho STG/PRO.
- Jira dùng **workflow chung** có các status [STG]/PRO. Các status đó **không** có nghĩa là đã test ở STG/PRO.
- **Bug:** hết lỗi trên DEV → comment "QA confirm DEV – fixed" (nêu job/evidence) → chuyển **Done** ngay: `211` [STG] Deploy → `221` [STG] Ready to Test → `231` Ready for client review → `31` Finish (Done). "Dismissed" chỉ dùng cho bug không phải lỗi.
- **Tạo bug (Dat 20/10):** độ chắc ≥ 80% → Claude/scheduled task **tự tạo** Jira Bug, không chờ Dat duyệt; < 80% → DASHBOARD "🐞 Bug < 80%" + standup cho Dat chốt sáng hôm sau; lỗi liên quan merge/incident → nhóm "📣 Báo Martin". Chi tiết: `ykk-dsr/hub/BUG-RULES.md`.
- **Mọi ticket QA tạo phải có Sprint đang active** (Martin 21/10) – Sprint 12 id 3275 (`customfield_10020`).
- **Nhất quán hiển thị (Dat 21/10):** định dạng ngày/nhãn/số theo chuẩn đã có ở nguồn khác (sheet khách, block khác, TC baseline), thống nhất theo ngôn ngữ; 1 frame Figma lệch = lỗi designer, không hỏi. Chỉ tạo bug khi implementation lệch chuẩn đó. Ngày = YYYY.MM.DD.
- **US/Task:** DoD, tiến độ và trạng thái 🟢/🟡/🔴 chỉ tính trên DEV. Dòng STG/PRO trong báo cáo ghi `N/A (giai đoạn DEV)`. Done: Dat duyệt → `151` → `161` → `171` → `71`.
- TC chỉ bị chặn do môi trường DEV → ⛔ Blocked có owner, không chuyển sang "chạy lại ở STG".
- **Data/trang test (chốt 19/10):** QA tự chọn cách tạo hợp lý và làm luôn, **không hỏi dev xác nhận**; ghi giả định vào us/*.md. Dev đổi gì Dat sẽ báo.
- **Buffer cuối sprint (chốt 19/10, mọi sprint):** sprint 2 tuần, 3 ngày làm việc cuối = buffer cho ticket mới giao Dat. Sprint 12: hạn 22/10, buffer 23, 26, 27/10.

## 1. Kênh giao tiếp (1 bên = 1 kênh)
| Từ → Đến | Kênh | Ai tự động |
|---|---|---|
| Claude → Agents | GitHub `ykk-dsr/hub/jobs/queue/*.md` | Claude ghi, runner.sh tự nhặt |
| Agents → Claude | GitHub `ykk-dsr/hub/results/<JOB>/result.json` + `summary.md` (mỗi fail có `cause` + `confidence`) | Agent ghi, Claude đọc theo lịch |
| Claude → QA part-time | Google Doc "Night Work Pack <ngày>" trong Drive `DSR_NightPack/` (`1QECbSzn_zdCUxyuqZrgRtxWkMuq2qnON`); sửa sau khi gửi → bản `(vN)`, bản cũ đổi tên "[CŨ – không dùng]" | Claude (Điều phối hoặc task 17:10) |
| QA part-time → Claude | Google Sheet "DSR Night Report" (`1gkH5lblKS1T3zxSTItNhX31TU-b-mY71GIFRqjMpZoU`, 1 dòng / TC × ngôn ngữ) | QA điền, Claude đọc 07:45 |
| Claude → Jira | Bug / Question / comment (label `qa-ai`, Sprint active); sub-task trace TC (§10) | Claude tạo trực tiếp (trừ TC job – §10) |
| Claude → Drive | Folder/TestData nhỏ: Drive connector · file TC .xlsx: `hub/tc-out/upload-queue.tsv` → rclone trên VPS | Tự động |
| Claude → Dat | `hub/DASHBOARD.md`, `hub/STANDUP.md` + push/email của scheduled task | Tự động |
| Dat → Dev/BA/khách | Ngoài hệ thống – chỉ những gì nằm trong "🔔 Dat cần làm" | Người |

Bug gán **dev phụ trách US** (Portal Martin cho 529/552/586/587/647/654). PM nhận Question: **Milavec Quentin**. Trước khi soạn tin hỏi/đuổi ai: đọc lại comment mới trên ticket.

## 2. Không có prompt tay cho agents
`runner.sh` chạy nền trên VPS, 5 phút `git pull`, thấy job đúng lane thì gọi agent headless, xong push kết quả; tự upload `hub/tc-out/upload-queue.tsv` bằng rclone (lane claude-code). Runner tự giải conflict rebase (output agent giữ bản agent, còn lại giữ upstream). Dat chỉ khởi động lại runner khi VPS reboot hoặc `runner.sh` đổi.

Lane: `claude-code` = functional Playwright (POM, TypeScript) · `codex` = visual + Lighthouse (`codex exec --dangerously-bypass-approvals-and-sandbox`) · **`author` (đang setup 21/10)** = tạo test data trên Author DEV bằng script tất định đọc manifest, không LLM, chỉ path `qa*`, không xóa, 08–18 T2–T6 – thiết kế `hub/AUTHOR-AGENT.md`, trạng thái CONTEXT §7. Agent test vẫn read-only AEM. · **`chrome` (từ 23/10)** = Claude web điều khiển Chrome của Dat (Claude in Chrome) làm việc QA-PT ban ngày: page properties, block UE, manual TC Author UI, retest – `hub/CHROME-AGENT.md`, chạy qua session `DSR – Chrome` ("chạy chrome queue"); runner không nhặt lane này. QA-PT chỉ còn overflow + audit.

Job ID: `JOB-YYYYMMDD-NN` (git pull, NN lớn nhất trong `jobs/queue|running|done|hold` + 1). `jobs/hold/` = chờ điều kiện `hold_reason`; 07:45 chuyển sang `queue/`. Idle: `JOB-ZZ-IDLE-NN` (§12).

## 3. Cấu trúc repo (`dat-sutrix/dsr-qa`, Private)
```
ykk-dsr/hub/
  CONTEXT.md              # ĐIỂM VÀO mọi session (§13)
  DASHBOARD.md · STANDUP.md · PLAN-sprint12.md · BUGS.md
  BUG-RULES.md · bugs/<US>-decision-<date>.md   # quy tắc + bảng quyết định bug
  QA-PT-ERRORS.md         # sổ lỗi QA-PT (rút kinh nghiệm)
  tc-backlog.md · tc-questions.md · prompts/tc-job.md
  us/DSR-<ID>.md · jobs/queue|running|done|hold · results/<JOB-ID>/ · tc-out/
  templates/ tools/ AGENTS.md runner.sh
docs/<US>/ (BL-OVL-1 = docs/DSR-587/overlay-data-flow-BL.md) · docs/client-layout/ · docs/incidents/
tests/ pages/ fixtures/ results/<US>/<ENV>/
```
Quyền ghi: `hub/` (trừ results) = Claude; `results/`, `tests/`, `pages/`, `fixtures/` = agent.

## 4. Lịch Claude tự chạy (scheduled task, UTC+7, auto mode)
| Giờ | Task | Việc |
|---|---|---|
| 07:45 hằng ngày | `DSR QA – Sáng 07:45` | Kết quả agent + Night Report → phân loại + `cause`/% → **tự tạo bug ≥ 80%** (BUG-RULES + bảng decision) → hold→queue → job mới + idle → DASHBOARD (🐞, 📣) → push trước 08:15 |
| 08:19 T2–T6 | `DSR Daily – 3 câu standup` | Chỉ ghi `STANDUP.md`: Yesterday/Today/Blockers + 🐞 bug < 80% + 📣 Báo Martin + ticket chưa lên kế hoạch ("Jira n/m planned") |
| 17:10 hằng ngày | `DSR QA – Chiều 17:10` | Kết quả ngày + Jira → bug theo BUG-RULES → job đêm / hold → Night Work Pack (~4h; **không tạo nếu đã có doc của ngày**) |
| T2–T6 18:05–21:05 · T7/CN 09:05–21:05 | `DSR TC – viết TC` | Theo `hub/prompts/tc-job.md` |

## 5. Vòng đời 1 US
1. US được giao Dat → sub-task TC (`qa-tc`, 1 SP = 1h) → baseline → TC → `hub/us/DSR-<ID>.md` → Drive → sub-task Done.
2. Chặn bởi câu hỏi/CF/data → Question (PM) / comment → Blocker có owner.
3. Auto/Visual → agent; Manual + seed CF → Night Work Pack.
4. Kết quả → bug (BUG-RULES) / data → QA-PT / test sai → sửa TC/job.
5. DEV xanh → "QA confirm DEV" → Done (Dat duyệt).

Project DSR không dùng Story; đơn vị QA = Task `[...] Dev → Test` (assignee Dat). Story point `customfield_10016`.

## 6. Night Report & Night Work Pack (QA part-time)
- Sheet cột: `Date | US | TC ID | Env | Result (Pass/Fail/Blocked/Not run) | Actual | Evidence link | Note`. Mỗi dòng Date + Env; chưa làm = `Not run`; Actual ghi nguyên văn giá trị thấy được; TC ID đúng mã pack (không khoảng trắng/ngoặc); tên ảnh = TC ID + .png trong `Evidence_<YYYYMMDD>`.
- QA-PT làm **tối T2–T6, ~4h** (Dat 20–21/10; không ít hơn), không T7/CN.
- **Ước lượng ×1.5** cho việc Author.
- **Định dạng bắt buộc (Dat 21/10):** khung đỏ "quy tắc bắt buộc" đầu pack · giá trị nhập chính xác (tên CF, ID, path, TC ID) **tô vàng + đậm + mono** · việc cấm / giá trị sai đang có tô đỏ · ON tô xanh · checklist "tự kiểm 30 giây trước Publish" · bảng giá trị theo từng CF · "Nếu gặp X thì làm Y" · URL mở thẳng, từng click. Mẫu: Night Work Pack 2026-10-21 (v3).
- Lỗi QA-PT ghi `hub/QA-PT-ERRORS.md` (kèm phần lỗi do pack).

## 7. Setup 1 lần – xong (14–16/10)
Repo, runner 2 lane, Drive `DSR_NightPack/`, scheduled tasks, Night Report, rclone `gdrive` trên VPS. Repo cũ `Sutrix-projects/automation-test`: đóng băng.

## 8. Quy tắc session Claude web
Trạng thái nằm trong file (CONTEXT, DASHBOARD, us/, Jira, Project) → session khác nhau **không đọc chat của nhau**.
| Session | Tên | Dùng cho |
|---|---|---|
| Điều phối | `DSR – Điều phối` | Inventory, triage, việc nhiều US, Night Pack, workflow |
| Setup | `DSR – Setup` | Cơ chế/hạ tầng (runner, lane mới, agent mới) |
| Theo US | `DSR-<ID> <tên ngắn>` | Phân tích, TC, job của US |
| Bugs | `DSR – Bugs` | Thảo luận bug |
| Chrome | `DSR – Chrome` | Chạy job `agent: chrome` qua Claude in Chrome (`prompts/chrome-run.md`) |
- Hướng dẫn Dat thao tác Author/VPS: viết cho người **chưa có kinh nghiệm**.
- **Đầu session: git pull + đọc CONTEXT.md. Cuối session: cập nhật CONTEXT.md (nếu quy tắc/trạng thái đổi) + DASHBOARD + us/.**

## 9. Rule tác vụ nặng (bảo vệ quota)
Cảnh báo + chờ Dat xác nhận: đọc > 20 Jira ticket / > 5 file Drive-Figma lớn; viết TC ≥ 3 US một lần; subagent; > 10 job result hoặc file > ~1 MB; tạo / tăng tần suất scheduled task. Ngoại lệ đã duyệt: TC job; scale agent/TC job theo velocity.

## 10. TC & test data
- TC theo format DSR-173 (sheet Assumptions), `[Sutrix] DSR -<ID>- <US name>.xlsx`, Exec type `Automation` | `Visual (Playwright VPS)` | `Manual`. Build `hub/tools/build_tc.py`. Dev đã viết TC → adopt.
- Test data file riêng `..._TestData.xlsx` (Data + How-to-create); cột Test data chỉ ghi TD ID.
- **Page properties:** Sites Page Properties (Title, Tags, robots…) **và Universal Editor > Page properties** (navtitle, category, trường riêng template). Đổi ảnh UE: chọn block → ô Image (kéo từ Assets = thêm block).
- **Overlay video/product/catalog (BL-OVL-1 + update 21/10 – bắt buộc):** content CF `/content/dam/common/{lang}/…/{id}` + DSR CF `/content/dam/dsr/{lang}/…/{id}`; **URL = tên node DSR CF**; **ID field = tên node** (chữ thường/số/"-"); **表示フラグ = isActive**; đổi tên bằng Move → Name; Publish DSR CF tự sinh trang (Preview → .page, Publish → .live).
- Upload Drive: TC .xlsx → `hub/tc-out/` + `upload-queue.tsv` → rclone.
- Trace TC trên Jira: sub-task `[QA] Create TC – <US> (DSR-<ID>)`, Dat, labels `qa-ai`, `qa-tc`, SP, description = link folder → Done (`11` → `221` → `151` → `161` → `171` → `71`).
- Câu hỏi TC job: ghi `hub/tc-questions.md` kèm mặc định (Dat: giữ mặc định).
- Sheet khách CL-v0.1 (Numata 20/10): tham khảo, chưa baseline (`docs/client-layout/`).

## 11. Bug
Sổ bug `hub/BUGS.md` (nguồn sự thật Jira). Quy tắc tạo: `hub/BUG-RULES.md`. Retest cho QA-PT: instruction tự chứa. Không phải lỗi → `141` Dismissed + lý do. Fail lại → `201` Back to Fix.

## 12. Tận dụng năng lực
- Mỗi lane luôn có ≥ 1 job idle trong queue (regression, automation từ TC spec, visual baseline). `hub/jobs/IDLE-README.md`.
- Ticket mới giao Dat: TC job tự phát hiện, đưa lên đầu backlog.
- Cuối tuần: việc không phụ thuộc Dat/QA-PT. Ngày thường: được giao việc cần Dat trong giờ làm việc.

## 13. Đồng bộ ngữ cảnh giữa session (chốt 21/10)
- `ykk-dsr/hub/CONTEXT.md` = một nguồn: vai trò, quy tắc đứng của Dat, IDs, kiến thức kỹ thuật đã xác minh, trạng thái tóm tắt, chủ đề mở.
- Quy tắc mới từ Dat → ghi CONTEXT.md + file chi tiết (BUG-RULES / PLAN / 03) trong cùng commit; Project doc 03 cập nhật khi cơ chế đổi.
- Memory của Claude chỉ giữ con trỏ + sở thích của Dat; không tin memory hơn repo.
