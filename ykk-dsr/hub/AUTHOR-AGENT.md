# AUTHOR-AGENT – Lane `author` (tạo test data trên AEM Author DEV)

> Trạng thái: **Phạm vi §2 đã duyệt (Dat 21/10 17:02)** · credential **U1** ✅ · probe ✅ · P1a đang chạy (JOB-20261021-08). Checklist sống: CONTEXT.md §7. Session `DSR – Setup`. Khi duyệt: cập nhật CONTEXT.md §2/§3, hub/AGENTS.md, 03_Working_Model §2.
> Mục tiêu: chuyển phần **nhập liệu có quy tắc** của QA-PT sang máy. 14/14 lỗi trong `QA-PT-ERRORS.md` thuộc nhóm A–F, trong đó A/B/C (ID ≠ tên CF, sai/thiếu giá trị, sai tên CF) chặn được 100% bằng kiểm tra trước khi ghi.

## 1. Quyết định chính
> **D0 (Dat 21/10 17:34): "bộ não" của Agent Author = Claude (Claude Code), KHÔNG dùng OpenAI/Codex.** Mọi job viết/sửa `tools/author`, resolve manifest, xử lý `needs-input`, verify có quyền đọc Author → chỉ lane `claude-code` hoặc lane `author` (script + Claude). Lane `codex` không bao giờ nhận job author, không được đọc cookie `~/.dsr-secrets/`.

| # | Quyết định | Lý do (1 dòng) |
|---|---|---|
| D1 | **Không dùng LLM để nhập liệu.** Lane `author` chạy script tất định `tools/author/apply` đọc **manifest** trong job | Lỗi QA-PT là lỗi diễn giải; LLM click UI cũng diễn giải → cùng loại lỗi + khó audit |
| D2 | Kênh **API** (Assets HTTP API / CF OpenAPI cho CF, Sling POST cho page properties, `/bin/replicate` cho Preview/Publish). **Không UI Playwright** ở Phase 1 | Tất định, nhanh, đọc lại được từng field; UI Author/UE dễ vỡ |
| D3 | Credential theo §2b (account Author **dùng chung với QA-PT**, không xin thêm account người dùng) | Ràng buộc Dat 21/10 |
| D4 | Claude web viết manifest (thay cho bảng TestData trong Night Pack); validator + read-back là cổng chất lượng | Một nguồn dữ liệu cho cả agent author, agent test và QA-PT |
| D5 | Agent test (`claude-code`, `codex`) **giữ nguyên read-only**. Chỉ lane `author` được ghi | Thu hẹp bề mặt rủi ro |
| D8 | (P1a′ 21/10) Rename **source** được khớp `^qa-?[0-9a-z][0-9a-z-]*$` (cho phép node cũ `qa-587-main`); rename **target** và mọi path create/patch giữ guard chặt (không `qa-`). Chỉ trong cùng folder | Sửa được data QA-PT đặt sai tên mà không nới guard ghi |
| D9 | Sửa tên sai bằng **rename (MOVE)**, không bao giờ xóa + tạo lại; manifest phải tự set lại ref `movie`/`product`/`catalog` sau rename (MOVE không viết lại ref) – lint `ref-set-after-rename` | Không xóa (§2); ref cũ trỏ path chết |
| D10 | Item content-cf có `replicate:` riêng (mặc định `[preview, publish]`); thứ tự publish mỗi tier: content CF trước, rồi DSR CF. Không dựa vào publish reference | Trang DSR sinh ra phải thấy content CF đã ở tier đó |
| D12 | (22/10) Sửa field **content CF** → phải republish **DSR CF** tham chiếu nó ở cùng tier (trang overlay chỉ sinh lại khi DSR CF publish) – lint `dsr-republish-after-content-change` (TODO) | JOB-10: requiresForm đổi trên content CF nhưng trang `-form` vẫn cũ |
| D11 | `agentId: preview` và MOVE qua Assets HTTP API **chưa xác minh** tới P1b (lần ghi thử đầu) – vẫn sau cổng apply | Chưa từng gửi request ghi |
| D13 | (Claude 23/10) **Allowlist path chính xác (KHÔNG phải pattern)** cho node sản phẩm số do QA tạo: `/content/dam/{common,dsr}/{ja,en}/products/9905860{01..11}` (tạo cho DSR-586). Không node số nào khác. Không rename | Data DSR-586 (productId số) không theo tên `qa*` |
| D14 | (Claude 23/10) **Unpublish** = `replicate: [unpublish-preview\|unpublish-publish]` (Deactivate) chỉ cho path trong guard; không bao giờ xóa | TD-587-08/10 phase 2 cần gỡ khỏi tier |
| D15 | (Claude 23/10) **Trang test QA**: guard thêm `^/content/sites/digital-showroom/master/(ja\|en)/test-space/qa[0-9a-z][0-9a-z-]*$` (+ stories/qa* có sẵn). Được: patch page property trên `jcr:content` (jcr:title, navTitle, category, robots, cq:tags, publicationdate…), patch text của component ĐÃ CÓ dưới trang (không thêm/xóa/di chuyển component), replicate trang (preview/publish). Bắt buộc snapshot trước, writes.log, lint | Chuyển 529 meta / 566 data fix từ QA-PT sang agent |

## 2. Phạm vi quyền (cần Dat duyệt)
**Được làm** – chỉ Author DEV `author-p192812-e2014374`:
- Tạo / sửa CF trong `/content/dam/common/{ja,en}/{movies,products,catalogs}/qa*` và `/content/dam/dsr/{ja,en}/{movies/standard,movies/tech,products,catalogs}/qa*`.
- Đổi tên node (Move → Name) **trong cùng folder**, chỉ từ `qa*` sang `qa*`.
- Sửa page properties của trang `/content/sites/digital-showroom/*/stories/qa*` (Phase 2).
- Preview / Publish / Unpublish đúng các path trên.

**Cấm tuyệt đối** (chặn ở cả ACL server lẫn script):
- Xóa bất kỳ node nào (dọn dẹp = Unpublish + 表示フラグ OFF + ghi vào `hub/author/cleanup.md` cho người xóa tay).
- Ghi ngoài `qa*`, sửa CF model, template, config, user/group, workflow.
- Mọi host khác DEV (STG/PRO) – host allowlist hard-code, sai host → thoát.
- Ghi vào data `qa*` không có trong manifest của job.

## 2b. Credential – account dùng chung (Dat 21/10)
Ràng buộc: chỉ có 1 account Author (Dat + QA-PT dùng chung); đăng nhập web lần đầu trên máy mới cần mã gửi về email. Chọn theo thứ tự, dừng ở mức đầu tiên account làm được:
| Mức | Cách | Điều kiện | Hệ quả |
|---|---|---|---|
| **T** (ưu tiên) | Account này tự tạo **technical account** trong Developer Console → service credential JSON trên VPS | Có nút "Create new technical account" | Không login người, không OTP, không gia hạn tay; gán ACL `qa*` được (account có quyền admin Author). Là integration, không chiếm license người dùng |
| **L** | **Local Development Token** (Developer Console) – token của chính account, sống 24h | Vào được Developer Console nhưng không tạo được technical account | Mỗi sáng Dat lấy token mới, dán vào VPS (~1 phút, hướng dẫn từng click). Quyền = full account → chỉ dựa vào guard script |
| **U** | Playwright đăng nhập UI trên VPS **1 lần** (Dat nhập mã email trong terminal), lưu session; script vẫn tất định, đọc manifest | Không vào được Developer Console | Session hết hạn → Dat đăng nhập lại; mật khẩu lưu `~/.dsr-secrets` (chmod 600). Kênh UI chậm và dễ vỡ hơn API |

**Chốt 21/10: U1 = chuyển cookie phiên + API.** Account không có Cloud Manager → T/L không khả dụng. Không tự động đăng nhập (tránh lưu mật khẩu + OTP trên VPS):
- Dat đăng nhập Author trên trình duyệt của mình như thường, copy giá trị cookie `login-token` của domain Author, dán vào VPS `~/.dsr-secrets/aem-dev.env` (`AEM_LOGIN_TOKEN=…`, chmod 600) – ~1 phút, khi cookie hết hạn.
- Script dùng cookie đó gọi API (Assets HTTP API / Sling POST + CSRF token / `/bin/replicate`) – vẫn đúng D1/D2, không thao tác UI.
- Cookie hết hạn → lane author trả `needs-input: refresh cookie`, DASHBOARD 🔔 nhắc Dat. Probe đo tuổi thọ cookie; nếu < 8h → xem lại (U2 = Playwright đăng nhập với mật khẩu lưu VPS).
- Bước xác minh: `tools/author/probe.sh` (chỉ GET) → `results/AUTHOR-PROBE-*/probe.md`.

Bổ sung an toàn khi dùng account chung (mức L/U, và T nếu không gán được ACL):
- **Cửa sổ chạy:** lane author chỉ ghi **08:00–18:00 VN T2–T6**; QA-PT làm tối → không sửa cùng lúc.
- **Không đụng data của Night Pack đêm đó** (path nằm trong pack ngày hiện tại → lint chặn).
- Lịch sử Author hiển thị cùng tên account → `writes.log` là nguồn phân biệt agent vs QA-PT.
- Token/mật khẩu không bao giờ vào repo, log hay result; file token tự xóa khi quá 24h.

## 3. Kiến trúc
```
Claude web ──job (lane author, manifest)──▶ jobs/queue
runner.sh (lane author, clone ~/dsr-qa-author) ──▶ node tools/author/apply.js <job>
   1 lint      : quy tắc BL-OVL-1 + schema CF model (đọc từ AEM) → sai = dừng, không ghi
   2 snapshot  : GET trạng thái hiện tại các path → results/<JOB>/before.json
   3 apply     : create/patch/move theo thứ tự phụ thuộc (content CF → DSR CF → reference)
   4 replicate : Preview / Publish theo manifest
   5 verify    : read-back Author + kiểm .aem.page / .aem.live (§5)
   6 report    : result.json + summary.md + after.json → commit
Hold jobs có hold_reason "author JOB-X verified" → 07:45/17:10 chuyển sang queue
```
- Lane mới **không gọi LLM** → không tốn quota, chạy vài phút. Lỗi script / API lạ → `status: needs-input`, Claude web đọc và sửa manifest.
- Tool `tools/author/` do lane `claude-code` viết 1 lần (job setup), Claude web review qua test dry-run.

## 4. Job format (lane `author`)
```yaml
---
id: JOB-20261022-03
agent: author
type: seed            # seed | update | rename | publish | unpublish | verify
env: dev
us: DSR-587
mode: apply           # dry-run | apply   (job đầu tiên của mỗi loại: dry-run)
replicate: preview    # none | preview | publish
max_writes: 40        # vượt → dừng
unblocks: [JOB-20261021-05]
---
items:
  - kind: content-cf
    model: movie            # tên model, lint đọc schema thật từ AEM
    lang: [ja, en]
    path: /content/dam/common/{lang}/movies/qa587-main
    fields:
      movieId: qa587-main   # lint: phải = tên node
      title: { ja: "QA587 メイン", en: "QA587 main" }
      releaseDate: 2026-10-01
  - kind: dsr-cf
    model: dsr-movie
    lang: [ja, en]
    path: /content/dam/dsr/{lang}/movies/standard/qa587-main
    fields:
      id: qa587-main
      isActive: true        # 表示フラグ
      content: ref(/content/dam/common/{lang}/movies/qa587-main)
  - kind: rename
    from: /content/dam/dsr/{lang}/movies/standard/qa-587-main
    to:   /content/dam/dsr/{lang}/movies/standard/qa587-main
verify:
  urls: ["/{lang}/library/video/qa587-main"]   # 200 trên .aem.page (preview) / .aem.live (publish)
```

## 5. Kiểm chứng sau khi tạo (bắt buộc, theo thứ tự)
| Tầng | Kiểm | Fail → |
|---|---|---|
| L0 Lint (trước ghi) | ID = tên node; tên node `^qa[0-9a-z-]+$` không bắt đầu `qa-`; mọi field required của model có giá trị; reference trỏ tới path tồn tại hoặc tạo trong cùng job; 表示フラグ đúng manifest; ngôn ngữ đủ cặp ja/en | Không ghi gì, `needs-input` |
| L1 Read-back Author | GET từng CF/page, so **từng field** với manifest (exact, kể cả hoa thường, thứ tự multi-reference) | Ghi lại lần 2; vẫn lệch → fail item |
| L2 Replication | Trạng thái replication của path = Preview/Publish đúng manifest, thời điểm sau lúc apply | fail item |
| L3 Delivery | URL trong `verify` trả 200 trên `.aem.page`/`.aem.live`, `<title>`/ID đúng; poll tối đa 10 phút (trang tự sinh) | `suspect: env`, không coi là lỗi data |
Chỉ khi L0–L2 pass cho mọi item → `status: done`, mở khóa `unblocks`.

## 6. Quy tắc an toàn
1. Hai lớp chặn: **ACL server** (technical account chỉ có quyền ghi + replicate trên `qa*`, không có quyền xóa) và **guard trong script** (host allowlist, regex path, không có hàm DELETE, `max_writes`).
2. `dry-run` bắt buộc cho job đầu của mỗi `type` mới và mỗi US mới; Claude web đọc plan trước khi tạo job `apply`.
3. Snapshot `before.json` → mọi thay đổi khôi phục được bằng job `update` ngược.
4. Credential: file JSON trên VPS `~/.dsr-secrets/aem-dev-service.json` (chmod 600, ngoài repo), script đổi lấy access token mỗi lần chạy. Không log token, không ghi vào results.
5. Audit: `results/<JOB>/writes.log` – method, path, field, giá trị trước/sau cho mọi lần ghi.
6. Không chạy song song 2 job author (1 runner, 1 clone `~/dsr-qa-author`).
7. Mọi thay đổi người khác làm tay trên `qa*` (QA-PT, dev) không bị script ghi đè ngoài các field trong manifest.

## 7. Chia việc sau khi có agent
| Việc | Phase 1 | Phase 2 | Giữ QA-PT |
|---|---|---|---|
| Tạo/sửa content CF + DSR CF, ID, 表示フラグ, reference | ✅ agent | | |
| Move → Name | ✅ agent | | |
| Preview / Publish / Unpublish | ✅ agent | | |
| Page properties Sites (Title, Tags, robots, ngày) | | ✅ agent | |
| UE Page properties (navtitle, category) | | ✅ agent (nếu lưu dạng JCR prop – spike xác nhận) | đến khi P2 xong |
| Sửa block trong UE (ảnh, text block) | | | ✅ |
| Manual TC, đánh giá cảm quan, thao tác cần nhìn UI | | | ✅ |
Ước tính: Phase 1 lấy đi phần lớn thời gian Author trong Night Pack 20–21/10 (CF overlay là khối lớn nhất). Night Pack giữ ~4h cho manual TC.

## 8. Lộ trình
| Phase | Việc | Ai | Điều kiện xong |
|---|---|---|---|
| P0a | ✅ Account: không Cloud Manager → U1. Dat dán cookie lên VPS + chạy `tools/author/probe.sh` | Dat | `probe.md` có HTTP 200 cho check 1–6 |
| P0b | Claude đọc probe → chốt endpoint (§9); đo tuổi thọ cookie (chạy lại probe sau 8h/24h) | Claude | Endpoint + chu kỳ refresh cookie |
| P1a | JOB-20261021-08: viết `tools/author` (models, lint, verify, apply bị khóa) + chạy read-only trên TD-587-01 | Agent claude-code | Lint/verify bắt đúng lỗi đã biết; dry-run plan hợp lý |
| P1b | Claude review → bật ghi thử 1 CF `qaagent-probe` (en) trong giờ 08–18 → lane `author` trong runner | Claude + Dat (khởi động runner) | L0–L3 pass |
| P1 (cũ) | Viết `tools/author/apply` (lint, snapshot, CF create/patch/move, replicate, verify) + dry-run trên data qa587 hiện có → 1 job apply nhỏ (1 CF ja/en) | Agent + Claude review | L0–L3 pass, writes.log đúng |
| P2 | Page properties (529 stories qa*) | Agent | Như trên |
| P3 | Night Pack mới: phần data = manifest cho lane author; QA-PT chỉ manual TC | Claude web | 3 đêm liên tiếp không có lỗi nhóm A–C |

## 9. Kết quả probe 21/10 (đã xác minh, chỉ GET)
- Cookie U1 dùng được: currentuser 200 ("Agent QA"), CSRF 200.
- Đọc CF: **CF OpenAPI** `/adobe/sites/cf/fragments?path=…` (path, model, status) · JCR `<cf>/jcr:content/data/master.json` (giá trị field) · Assets HTTP API `/api/assets/<path bỏ /content/dam>.json` – cả 3 trả 200.
- Replication: `<cf>/jcr:content.json` có `cq:lastReplicated_preview|_publish` + `cq:lastReplicationAction_preview|_publish` → L2 kiểm được.
- Model: content CF movie = `DM_movie`, DSR CF movie = `DM_movie_related`. Trang article: `/content/sites/digital-showroom/master/{lang}/library/article/stories/qa529-*`.
- Chưa xác minh (cần ghi thật, P1b): tạo/sửa CF qua OpenAPI (ETag), rename, replicate Preview/Publish qua API có kích hoạt trang tự sinh.
- Probe thấy đúng các lỗi data đã biết (ja còn `qa-587-main`, en thiếu DSR CF `qa587-main`, movieId = "QA587 main1") → `verify` dùng được ngay để **kiểm data QA-PT** mỗi sáng, trước khi agent test chạy.
