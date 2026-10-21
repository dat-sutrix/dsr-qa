# AUTHOR-AGENT – Lane `author` (tạo test data trên AEM Author DEV)

> Trạng thái: **DRAFT – chờ Dat duyệt phạm vi (§2)**. Session `DSR – Setup`, 2026-10-21. Khi duyệt: cập nhật CONTEXT.md §2/§3, hub/AGENTS.md, 03_Working_Model §2.
> Mục tiêu: chuyển phần **nhập liệu có quy tắc** của QA-PT sang máy. 14/14 lỗi trong `QA-PT-ERRORS.md` thuộc nhóm A–F, trong đó A/B/C (ID ≠ tên CF, sai/thiếu giá trị, sai tên CF) chặn được 100% bằng kiểm tra trước khi ghi.

## 1. Quyết định chính
| # | Quyết định | Lý do (1 dòng) |
|---|---|---|
| D1 | **Không dùng LLM để nhập liệu.** Lane `author` chạy script tất định `tools/author/apply` đọc **manifest** trong job | Lỗi QA-PT là lỗi diễn giải; LLM click UI cũng diễn giải → cùng loại lỗi + khó audit |
| D2 | Kênh **API** (Assets HTTP API / CF OpenAPI cho CF, Sling POST cho page properties, `/bin/replicate` cho Preview/Publish). **Không UI Playwright** ở Phase 1 | Tất định, nhanh, đọc lại được từng field; UI Author/UE dễ vỡ |
| D3 | Credential = **technical account (Service Credentials) của môi trường DEV** tạo từ AEM Developer Console, quyền ACL chỉ trên path `qa*` | Quyền giới hạn ở phía server, không dựa vào việc script "tự giác" |
| D4 | Claude web viết manifest (thay cho bảng TestData trong Night Pack); validator + read-back là cổng chất lượng | Một nguồn dữ liệu cho cả agent author, agent test và QA-PT |
| D5 | Agent test (`claude-code`, `codex`) **giữ nguyên read-only**. Chỉ lane `author` được ghi | Thu hẹp bề mặt rủi ro |

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
| P0a | Tạo technical account DEV + group ACL `qa*` | Dev có quyền Developer Console (đề xuất Martin) | Có file service credential trên VPS |
| P0b | Spike (job claude-code, **read-only**): đổi token, GET CF `qa587-main` qua Assets HTTP API và CF OpenAPI, đọc schema model, đọc replication status | Agent | Chốt endpoint từng thao tác trong §9 |
| P1 | Viết `tools/author/apply` (lint, snapshot, CF create/patch/move, replicate, verify) + dry-run trên data qa587 hiện có → 1 job apply nhỏ (1 CF ja/en) | Agent + Claude review | L0–L3 pass, writes.log đúng |
| P2 | Page properties (529 stories qa*) | Agent | Như trên |
| P3 | Night Pack mới: phần data = manifest cho lane author; QA-PT chỉ manual TC | Claude web | 3 đêm liên tiếp không có lỗi nhóm A–C |

## 9. Điểm phải xác minh ở spike (chưa coi là sự thật)
- Endpoint ghi CF ưu tiên: CF OpenAPI (`/adobe/sites/cf/...`) hay Assets HTTP API (`/api/assets/...`) trên môi trường này.
- Replicate Preview qua `/bin/replicate` với agent `preview` có kích hoạt cơ chế tự sinh trang (.page) giống thao tác UI không.
- UE Page properties (navtitle, category) lưu ở `jcr:content` dạng property thường → ghi được bằng Sling POST.
- Technical account có được cấp quyền replicate chỉ trên `qa*` bằng ACL không.
