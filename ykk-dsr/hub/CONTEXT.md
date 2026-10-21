# CONTEXT – YKK DSR QA (đọc ĐẦU TIÊN ở mọi session)

> Cập nhật: 2026-10-21 16:50 (UTC+7) bởi session "DSR – Điều phối". Mọi session/scheduled task: `git pull` rồi đọc file này trước khi làm. Sửa quy tắc/IDs → sửa ở đây + file chi tiết, commit cùng lúc.
> Chat giữa các session không đọc được của nhau → **trạng thái chỉ tin vào repo + Jira + Project docs**. Memory của Claude chỉ là con trỏ tới file này.

## 1. Đọc theo thứ tự
1. `ykk-dsr/hub/CONTEXT.md` (file này) – vai trò, quy tắc, IDs, trạng thái tóm tắt.
2. `ykk-dsr/hub/DASHBOARD.md` – trạng thái ticket, việc Dat, QA-PT tối nay, agent.
3. `ykk-dsr/hub/PLAN-sprint12.md` – kế hoạch, "Quy tắc Night Pack", Night Pack từng ngày.
4. `ykk-dsr/hub/BUG-RULES.md` – quy tắc tạo bug (tự tạo ≥ 80%, sprint, nhất quán hiển thị).
5. `ykk-dsr/hub/BUGS.md`, `ykk-dsr/hub/us/DSR-<ID>.md`, `ykk-dsr/hub/bugs/*-decision-*.md`.
6. Baseline: `docs/DSR-587/overlay-data-flow-BL.md` (BL-OVL-1 – overlay video/product/catalog, có "Update 2026-10-21" BẮT BUỘC) · `docs/client-layout/CL-v0.1-numata-20261020.md` (sheet khách v0.1 – tham khảo, KHÔNG baseline) · `docs/incidents/`.
7. Project claude.ai "Stx - DSR (new)" (bản sao repo: `docs/03_Working_Model.md`): `claude/03_Working_Model.md` (cách vận hành), `claude/04_Report_Template.md`, `claude/BL-OVL-1_Overlay_Data_Flow.md`.

## 2. Vai trò
| Ai | Vai trò | Giới hạn |
|---|---|---|
| Claude web (session Điều phối / Setup / theo US / Bugs) | QA Manager: strategy, TC, job, Night Pack, review, Jira bug/question | Không chạy code trên VPS |
| Scheduled tasks (Claude) | 07:45 morning, 17:10 evening, 08:19 standup, TC job tối | Mỗi lần = session mới, đọc repo |
| VPS agents `claude-code` (functional) / `codex` (visual) | Playwright/Lighthouse qua `runner.sh` (poll 5', job trong `jobs/queue`) | **Read-only AEM**: không sửa content, không submit form, không login. Không có Jira/Figma/Drive |
| Dat | Cầu nối: chuyển tin dev/PM, duyệt Done, việc trong "🔔 Dat cần làm" | Không review code; không có kinh nghiệm Author → hướng dẫn từng click |
| QA part-time (QA-PT) | Tạo test data trên Author, manual TC – **tối T2–T6, ~4h**, không T7/CN | Không có Jira; làm theo Night Work Pack; lỗi ghi `QA-PT-ERRORS.md` |
| Dev | **Portal Martin** (dev chính 529/552/586/587/647/654/657–660), Ngọc (590), Mayuka (DSR-638), Okumura (CF design 614) | — |
| PM | **Milavec Quentin** (Question ticket, scope) · khách: Numata-san (layout sheets) | — |

## 3. Quy tắc đứng (Dat) – tóm tắt, chi tiết ở file nguồn
- Sprint 12 (15/10–27/10) **chỉ DEV**; DEV xanh = Done. Hạn việc đã biết **22/10**; buffer 23, 26, 27/10 cho ticket mới.
- Claude **quyết định**, không đưa A/B; thiếu thông tin → `[Giả định]` và làm tiếp. Không bịa requirement.
- **Bug:** confidence ≥ 80% → tự tạo Jira (label `qa-ai`, assignee dev US, **Sprint đang active – Sprint 12 id 3275, `customfield_10020`**, link US); < 80% → DASHBOARD "🐞" + standup cho Dat chốt; bug liên quan merge/incident → nhóm "📣 Báo Martin". (BUG-RULES.md)
- **Hiển thị nhất quán:** chuẩn lấy từ nguồn đã có (sheet khách, block khác, TC baseline), theo từng ngôn ngữ; 1 frame Figma lệch = lỗi designer, không hỏi. Ngày = **YYYY.MM.DD** mọi ngôn ngữ.
- **Đóng bug fixed:** comment "QA confirm DEV – fixed" → transitions 211 → 221 → 231 → 31. **US/Task Done (Dat duyệt):** 151 → 161 → 171 → 71 (từ To Do: 11 → 221 → 151 → 161 → 171 → 71).
- **TC trace:** mỗi US 1 sub-task Jira (label `qa-tc`, SP 1 = 1h, assignee Dat), description = link folder TC → Done. Task "Create Test Case" giao Dat: link folder + Done.
- **Trước khi soạn tin hỏi/đuổi ai:** đọc lại mọi comment mới trên ticket.
- **QA tự tạo data/trang test**, không chờ dev xác nhận.
- **Night Pack:** ~4h (không ít hơn), ước lượng ×1.5 cho việc Author, mọi field bắt buộc + giá trị chính xác, **giá trị tô vàng/đậm, cấm tô đỏ, ON tô xanh, khung "quy tắc bắt buộc" + checklist trước Publish**, mỗi dòng report có Date + Env, chưa làm = Not run. Mẫu: Night Work Pack 2026-10-21 (v3).
- **Agents luôn có việc:** ≥ 1 idle job/lane; cuối tuần việc không phụ thuộc người.
- Cảnh báo trước tác vụ nặng (ngoại lệ: TC job, scale theo velocity). Không đổi priority ticket dev. Không xóa file Drive nếu không được yêu cầu. Không ghi password, không PII. Chỉ dùng Jira/Drive Sutrix.
- Chat với Dat tiếng Việt; TC, bug, tin cho dev/PM tiếng Anh.

## 4. IDs
| Thứ | ID |
|---|---|
| Jira cloudId | 85195b6d-d342-4738-a5b1-bec55923fb80 (sutrix.atlassian.net, project DSR) |
| Dat accountId | 557058:c5a7db46-c238-4764-b110-9e38e6fd9cd7 |
| Martin accountId | 712020:fc54319c-c8aa-4a0d-a4fe-dc8ec641be79 |
| Quentin accountId | 712020:0f089f60-fc19-4a4e-94d9-20745c0c22c0 |
| Sprint 12 | id 3275 (board 400), field `customfield_10020`; story point `customfield_10016` |
| Drive DSR_NightPack | 1QECbSzn_zdCUxyuqZrgRtxWkMuq2qnON (Night Work Pack docs, Evidence_<YYYYMMDD>) |
| Night Report sheet | 1gkH5lblKS1T3zxSTItNhX31TU-b-mY71GIFRqjMpZoU |
| DM_product ver0.4 (oracle 585/586) | 1uUgIMKKSL93jjVCQpfTTYtkrFJlAAiSD |
| Sheet khách CL-v0.1 | product 1a0zq6qFrwxxspRdJQCe71ZXpCYGzzwK4 · video 1MW25A_llAxTmPgV3JEhHvZLanw0D2iS9 · tech video 15Nc-EDZ8o_p0YWkcS4xfswc0V22JQkvz · catalog 1FlVCiPew2G1T7iggDCyxd1crMGB-u97c |
| AEM Author DEV | https://author-p192812-e2014374.adobeaemcloud.com · sites root `/content/sites/digital-showroom/` |
| EDS DEV | https://main--dsr-eds-dev--sutrix-projects.aem.page / .aem.live |
| Scheduled tasks | morning 07:45 `trig_01SCv6jagd1SYyuLn1ocq86A` · evening 17:10 `trig_01Ct7VRTABy8TGt9DVx4m1xK` · standup 08:19 T2–T6 `trig_019ttBvvE82mnQfV3eHQN5KC` · TC job `trig_013uTjYksLNpDdHY3C9jedun` |

## 5. Kiến thức kỹ thuật then chốt (đã xác minh)
- **Overlay (BL-OVL-1 + update 21/10):** content CF `/content/dam/common/{lang}/{movies|products|catalogs}/{id}` + DSR CF `/content/dam/dsr/{lang}/{movies/standard|movies/tech|products|catalogs}/{id}`. URL = **tên node DSR CF**: `/{lang}/library/video/{id}` · `/{lang}/products/{id}` · `/{lang}/library/catalog/{id}`. **ID field = tên node** (chữ thường/số/"-", phân biệt hoa thường). **表示フラグ = isActive** (OFF → redirect list). Đổi tên = Move → Name. Publish DSR CF tự sinh trang (từ 21/10 08:25 UTC): Preview → .page, Publish → .live.
- **Article (529):** trang AEM + page properties; meta **publicationdate / updatedate / searchkeywords / category** (không gạch nối; category chỉ khi có giá trị); tags = `<meta property="article:tag">`; **navtitle + category ở Universal Editor > Page properties**; index chỉ cập nhật khi publish lại. Đổi ảnh: chọn block → ô Image (kéo từ Assets = thêm block).
- **DM_product ver0.4** đã trên DEV (howToUse/howToUseImage/notice/noticeImage/applicableSliderSameAsParent).
- **DSR-638** (Mayuka): chuyển trang test-space ja sang URL chính thức → automation dùng `fixtures/paths.ts` (DSR_PATHS=v2).
- Sheet khách v0.1 mâu thuẫn URL (`/item/`, jp/ch) với DEV → Sprint 12 theo DEV; hỏi Quentin (Q-CL-1).

## 6. Trạng thái tóm tắt (21/10 16:50) – chi tiết DASHBOARD
- 10 ticket mở giao Dat: 587, 647, 538, 557, 570, 654, 586, 529, 653+566 (566/653 đề xuất Sprint 13). Đích Done 22/10 (586 fallback 23/10).
- Night 21/10 (pack v3, ~4h20): sửa data overlay + 529, catalog lõi, TD-586-01/02 → agent sáng 22/10 (hold jobs tự chuyển).
- Bug mở của QA: DSR-657/658/659/660 – Martin **đã merge 21/10 16:45** (+ deploy cấu hình trang 404 vào repo) → retest JOB-20261021-05 sáng 22/10 sau khi QA-PT publish lại trang 529.
- Lỗi QA-PT: `QA-PT-ERRORS.md` (14 mục; nhóm lớn nhất: ID ≠ tên CF).

## 7. Chủ đề đang mở cho session "DSR – Setup"
- **Agent hỗ trợ Author** (Dat muốn giảm phụ thuộc QA-PT). Dữ kiện cần cân nhắc:
  - Hiện quy tắc an toàn: agents **read-only trên AEM** (không sửa content, không submit form, không login) – tạo Author agent = đổi quy tắc này, cần Dat duyệt rõ phạm vi (chỉ DEV, chỉ path test `qa*`, không xóa).
  - Việc Author lặp lại nhiều nhất: tạo/sửa CF (content + DSR, đúng folder/tên/ID/表示フラグ), Move→Name, Publish/Preview, page properties (Sites + UE), kiểm .page/.live.
  - Lỗi QA-PT 15–21/10 (QA-PT-ERRORS.md) gần như đều là lỗi nhập liệu có quy tắc → ứng viên tự động hóa tốt.
  - Kênh khả thi cần đánh giá: AEM Assets HTTP API / Sling POST / CF API (OpenAPI) với service credential (env var, không hard-code), hoặc Playwright UI trên Author. Cần tài khoản/credential riêng + quyền chỉ ghi `/content/dam/{common,dsr}/*/qa*` và trang `stories/qa529-*`.
  - Giữ QA-PT cho manual TC/đánh giá cảm quan; agent Author chạy theo job file như hiện tại (lane mới, vd `author`), log kết quả + verify bằng GraphQL/EDS status.
