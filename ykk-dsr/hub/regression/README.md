# Regression – Sprint 12 (Dat 23/10 11:56, quy tắc đứng)

**Mục tiêu:** dev đổi nhiều (deploy 22/10 ×3, template 566, catalog list, og:image, sắp tới 669/670/671) → không để lọt regression. Agent rảnh = chạy regression; chọn case theo **(1) thay đổi dev thông báo** (`CHANGES.md`) và **(2) độ quan trọng feature** (bảng dưới).

## 1. Độ quan trọng feature (Claude định nghĩa)
| Mức | Feature (US) | Spec | Lý do |
|---|---|---|---|
| **P1** | Overlay video / product / catalog (587, 586, 654) + SEO overlay | `movie-detail/DSR-587.*`, `product-detail/DSR-586.*`, `catalog-overlay/DSR-654.*`, `overlay-seo/*` (`@overlay`) | Engine chung (json2html, persisted query, CF model) – 1 thay đổi làm vỡ cả 3; 669–671 sắp đổi model |
| **P1** | List video/catalog (557), product list (583) | `catalog-video/*`, `product-list/*` | Đọc cùng query/CF; lỗi = trang rỗng (DSR-673) |
| **P1** | Catalog download / form (570) | `catalog-download/*` | Lead form, đụng HubSpot + 671 hubspotFormId |
| **P1** | Header / breadcrumb / TOP / smoke (552, 609) | `smoke.spec.ts`, `breadcrumb/DSR-552.breadcrumb.spec.ts`, `top/*` | Mọi trang dùng; scripts.js/styles đổi là ảnh hưởng |
| **P2** | Article (529), News (566), Video block (664), Movie detail (173) | `article-detail/DSR-529.article-detail.spec.ts`, `news-detail/DSR-566.news-detail.spec.ts`, `video-block/*`, `movie-detail/DSR-173.*` | Template/block riêng, đang có fix dev |
| **P2** | Eco (590), icons (589), product CF (585) | `eco-products/DSR-590.eco-products.spec.ts`, `icons/*`, `product-cf/*` | |
| **P3** | Asset migration (227), mail (433, blocked SendGrid), retest specs cũ | `asset-migration/*`, `mail/*`, `*retest*` | Ít thay đổi |
| – | Không chạy trong regression | `analysis/*`, `*capture*` (trừ lane visual), `@manual`, `@blocked` | Job phân tích 1 lần / manual |

## 2. Thay đổi dev → vùng ảnh hưởng (impact map)
| Loại thay đổi (CHANGES.md cột Loại) | Chạy |
|---|---|
| `cf-model` / `query` (CF model, persisted query, GraphQL, migrate cq:model) | **Toàn bộ P1** + 529 related + 585 (= `npm run test:dev:overlay` + list + 570) |
| `overlay` (json2html, overlay config, 404 config, cf-templates) | `@overlay` + overlay-seo + smoke |
| `block:<tên>` (dsr-eds `blocks/<tên>`) | spec dùng block đó (grep tên block trong `pages/` + `tests/`) + smoke |
| `global` (scripts.js, styles, header/footer/nav, aem.js, deploy không ghi rõ nội dung) | smoke + 552 + 609 + 1 test positive mỗi spec P1 (R1) + visual P1 |
| `template:<tên>` (AEM page template) | spec của template đó (news-detail → 566, article → 529) |
| `content` (dev author/publish trang, đổi URL – vd DSR-638) | spec trỏ tới URL đó |
| `fix:<DSR-ID>` | retest ticket + spec của US liên kết + P1 cùng engine |

## 3. Cấp regression
- **R1 Smoke** (~10–15 phút): `smoke.spec.ts` + 552 + 609 + test đầu tiên ja/en của mỗi spec P1.
- **R2 Impact:** union các vùng của mọi dòng `CHANGES.md` có `regressed = no`.
- **R3 Full S12:** mọi spec P1 + P2 (functional, `@auto`, trừ `@manual`/`@blocked`/analysis/capture). P3 1 lần/ngày (lượt 00:20).
- **Visual (lane codex):** chụp viewport (không fullPage) 1440/390 các trang P1/P2 → so với lần trước trong `results/REGRESSION/visual-ledger.json`; khác > ngưỡng = điểm L&F.

## 4. Lịch & chọn việc
**Trước tiên:** nếu có file `regression/FREEZE.md` → không tạo job regression nào, chỉ ghi LOG "freeze" (DEV đang deploy).
 (scheduled task "DSR regression guard", mỗi 4h: 00:20 / 04:20 / 08:20 / 12:20 / 16:20 / 20:20 VN, mọi ngày)
1. `git pull`. Lane nào **không có job trong queue và không có job running** → tạo job regression cho lane đó (tối đa 1 job/lane/lượt).
2. claude-code: `CHANGES.md` có dòng `regressed = no` → **R2** (+R1); không có → **R3** (xoay vòng: lượt chẵn P1, lượt lẻ P1+P2).
3. codex: Visual P1 (+ P2 nếu R2 có `global`/`block`/`template`) + Lighthouse 3 trang P1.
4. Lane đang bận → không thêm job, chỉ ghi `regression/LOG.md`.
5. Ưu tiên luôn thấp hơn job thật: đặt tên `JOB-ZY-REG-<YYYYMMDD>-<HHMM>-<lane>` (sort sau JOB-2026…, trước JOB-ZZ-IDLE).

## 5. Kết quả & phát hiện regression
- Agent ghi `results/JOB-ZY-REG-…/summary.md` + `result.json` + run report chuẩn, và cập nhật **`results/REGRESSION/ledger.json`** (`{ "<TC> [<lang>]": { "last": "pass|fail|skip", "at": "<ISO>", "job": "...", "last_pass_at": "<ISO>" } }`).
- **Regression candidate** = TC **trước đó pass** (ledger) nay fail. Ghi bảng "NEW FAIL" ở đầu summary.md với commit/deploy gần nhất trong `CHANGES.md` (nếu có) và `confidence`.
- Claude (lượt guard sau / 07:45 / 17:10): NEW FAIL ≥ 80% → bug Jira theo BUG-RULES + label `regression` + link ticket thay đổi gây ra; < 80% → DASHBOARD 🐞. Dòng `CHANGES.md` đã chạy R2 xong → `regressed = yes (<job>)`.
- Fail đã biết (đã có bug mở / Blocked-by) **không** coi là regression.

## 6. Ai ghi CHANGES.md
Jira sweep (08:05/12:05/16:05), mọi session Claude khi Dat chuyển tin dev (chat Martin/Ngọc/Kohei), lượt guard (Jira comment deploy `dev/<tag>`). 1 dòng / 1 thay đổi.

## 7. Kiểm build (bài học 23/10)
Không kết luận "thay đổi chưa deploy" chỉ từ `Last-Modified` của 1 file. Ghi là "chưa xác minh" và hỏi dev (commit/PR + thời gian deploy) trước khi báo.
