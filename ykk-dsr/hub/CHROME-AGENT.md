# CHROME-AGENT – Lane `chrome` (Claude in Chrome thay phần lớn việc QA-PT, làm ban ngày)

> Chốt 23/10/2026 (Dat 15:06, session `DSR – Setup`). Đã xác minh 23/10 15:10: session Claude web trên cloud điều khiển được Chrome của Dat, mở Author DEV bằng phiên đăng nhập sẵn (user "Agent QA") – **không cần cookie, không OTP**.
> Thay cho A2 "Author-UI Playwright" trong `ZERO-HUMAN-ROADMAP.md`.

## 1. Quyết định
| # | Quyết định | Lý do (1 dòng) |
|---|---|---|
| C1 | Lane `chrome` = Claude web điều khiển Chrome của Dat qua extension; job vẫn là file trong `jobs/queue` (`agent: chrome`). runner.sh **không** nhặt lane này | Executor là session Claude web, không phải VPS |
| C2 | Chia việc theo nguyên tắc: **có đường tất định thì dùng đường tất định**. CF data (create/patch/rename/publish) vẫn ưu tiên lane `author` (API, đang B2). Chrome làm việc cần UI | LLM thao tác UI có rủi ro diễn giải (AUTHOR-AGENT D1) |
| C3 | Mọi lần chrome **ghi** dữ liệu → bắt buộc kiểm độc lập bằng máy khác: CF → `tools/author verify` (API); page/UE → job `claude-code` đọc HTML/meta trên `.aem.page/.aem.live` | Người làm ≠ người kiểm |
| C4 | Chrome dùng **profile riêng "DSR-QA"** + cửa sổ riêng; agent chỉ làm trong tab nó tự tạo, không đọc/đụng tab khác của Dat | Chrome thật có login Jira/mail… của Dat |
| C5 | Bằng chứng = dữ kiện dạng chữ (URL, text nguyên văn, giá trị field, thông báo lỗi) ghi vào result; cần ảnh trang public → job `codex` chụp; L&F vẫn là L&F card Dat review | Chrome tool không lưu ảnh thẳng vào repo |
| C6 | Cookie U1 hết hạn → chrome làm thay phần CF (UI) theo cùng manifest, rồi verify khi có cookie mới | Không để việc đứng chờ Dat |

## 2. Chia việc sau 23/10
| Việc (ZERO-HUMAN H) | Trước | Từ 23/10 |
|---|---|---|
| H1 CF data trong guard `qa*` | lane `author` (B2) | giữ `author`; chrome = dự phòng khi cookie hết hạn / node ngoài guard đã được Claude duyệt |
| H2 Page properties (Sites + UE: Title, Tags, robots, navtitle, category) | QA-PT | **chrome** (B2) |
| H3 Sửa block trong UE (ảnh: chọn block → ô Image, text, xóa block trống) | QA-PT | **chrome** (B2) |
| H4 Manual TC thao tác Author (required, validation, dialog, picker) + TC đọc trang EDS cần tương tác | QA-PT | **chrome** (B2) |
| Retest bug trước đây giao QA-PT | QA-PT | **chrome** |
| Look & feel | Dat (L&F card) | giữ nguyên |
| QA-PT | ~4h/tối | **chỉ việc còn sót (overflow) + audit mẫu 20% việc chrome trong 5 ngày làm việc đầu** → rồi theo ZERO-HUMAN §3 |

## 3. Phạm vi & an toàn (giữ AUTHOR-AGENT §2, thêm cho UI)
- Chỉ Author DEV `author-p192812-e2014374`, EDS DEV `.aem.page/.aem.live`, path `qa*` (CF `/content/dam/{common,dsr}/{ja,en}/…/qa*`, trang `…/stories/qa*` và `…/master/{ja,en}/test-space/qa*` (như D15, Claude 23/10)). Ngoại lệ tên/folder chỉ khi job ghi rõ "Claude duyệt ngoại lệ". Mở URL ngoài danh sách → dừng.
- **Không**: Delete / Unpublish ngoài job ghi rõ path · sửa model/template/config/user · nhập mật khẩu hay bấm Sign out · trả lời hộp thoại xác nhận không có trong job · đụng STG/PRO · thao tác tab không do agent tạo.
- Hộp thoại lạ / trang khác mong đợi / 2 lần thử không được → ghi `blocked` + mô tả, chuyển bước kế, **không đoán**.
- Giờ chạy: **08:30–18:00 T2–T6** (QA-PT làm tối → không sửa cùng lúc; item nào nằm trong Night Pack đêm nay thì chrome không đụng).
- Trước khi ghi: đọc giá trị hiện tại → ghi `before`; sau khi Save: đọc lại → `after`. Mỗi job tối đa 30 lần ghi.
- Dat không dùng profile "DSR-QA" khi agent đang chạy (dùng profile thường cho việc khác).

## 4. Job format (lane `chrome`)
```yaml
---
id: JOB-YYYYMMDD-NN
agent: chrome
type: ui-data | manual-tc | retest
env: dev
us: DSR-529
lang: [ja, en]
max_writes: 30
manifest: ykk-dsr/hub/author/manifests/TD-529-01.yaml   # nếu có ghi data
verify_job: JOB-YYYYMMDD-NN                              # job claude-code/author kiểm lại sau khi chrome ghi
---
## Steps
| # | Việc | URL mở thẳng | Giá trị chính xác | Kết quả mong đợi (đo được) |
```
Nội dung step viết như Night Work Pack (giá trị chính xác, từng click, "Nếu gặp X thì làm Y") – QA-PT và chrome dùng chung chuẩn.

**Kết quả:** `results/<JOB>/result.json` (schema hub/AGENTS.md §3, thêm `actions[]`: `{step, url, field, before, after, saved: true|false}`) + `summary.md` ≤ 20 dòng. TC manual: `tests[]` với `result` + `actual` nguyên văn. Session chạy job tự commit + push, rồi chuyển `verify_job` từ `hold/` sang `queue/`.

## 5. Ai chạy, khi nào
1. **Thủ công (từ 23/10):** Dat mở session `DSR – Chrome` trong Project, gõ "chạy chrome queue". Session làm theo `prompts/chrome-run.md` tới khi hết job hoặc 18:00. Chrome profile DSR-QA phải đang mở, máy không ngủ.
2. **Tự động (sau 3 ngày thủ công ổn định):** scheduled task giờ hành chính gọi cùng prompt; điều kiện: lần chạy thử xác nhận scheduled session thấy được Chrome tools. Tạo task = tác vụ nặng → Claude hỏi Dat trước (03 §9).
3. Night Pack 17:10 đổi thành: việc ban ngày ngày mai → job `chrome`; QA-PT chỉ nhận phần chrome không làm được.

## 6. Đo & lên bậc (ZERO-HUMAN §3)
- Mỗi job: số bước, số ghi, blocked, thời gian; verify fail = lỗi chrome → ghi `QA-PT-ERRORS.md` mục "chrome".
- B2 → B3 khi 5 ngày làm việc liên tiếp: verify 100% pass, audit QA-PT không phát hiện lỗi. 1 lỗi gây trễ ticket → về B2.
- Quota: chrome tốn nhiều token (đọc trang/ảnh). Gom việc thành 2 lượt/ngày (sáng, đầu chiều); Claude cảnh báo nếu 1 lượt > ~40 bước.

## 7. Dat làm 1 lần
1. Chrome → góc phải ảnh đại diện → **Add** → tạo profile **DSR-QA**.
2. Trong profile đó: cài Claude in Chrome, đăng nhập claude.ai, đăng nhập Author DEV (account dùng chung) một lần.
3. Gỡ/tắt extension ở profile thường (để agent không vào nhầm profile có Jira/mail).
4. Extension → site permissions: chỉ cho phép `author-p192812-e2014374.adobeaemcloud.com`, `*.aem.page`, `*.aem.live` (và `experience.adobe.com` nếu UE mở qua đó).
5. Máy: tắt sleep trong giờ làm việc khi có job chrome.
6. **Nhận diện đúng profile:** mỗi profile có extension = 1 "browser" riêng với `deviceId` riêng (tên mặc định chung chung, vd "Browser 1" – không dùng tên để nhận diện). Sau khi tạo profile DSR-QA, session Setup/Chrome gọi `list_connected_browsers` và ghi `deviceId` của DSR-QA vào CONTEXT §7b (`CHROME_DEVICE_ID`). Session chỉ dùng đúng deviceId đó + kiểm user Author = "Agent QA" (2 lớp).
7. Khi chạy job DSR mà profile dự án khác cũng đang mở extension → session hỏi Dat chọn 1 lần (1 click). Muốn không bị hỏi: chỉ mở profile DSR-QA trong lượt chạy DSR. Scheduled run gặp nhiều browser chưa chọn → dừng, không tự chọn.

## 8. Nhật ký vận hành
| Ngày | Job | Bước | Ghi | Blocked | Lỗi môi trường | Ghi chú |
|---|---|---|---|---|---|---|
| 2026-10-23 | JOB-20261023-16 (566 UE xóa block rỗng) | ~25 | 3/3 | 0 | 2 (tab UE mở ngoài tab group; trang treo – Dat reload) | verify JOB-23-17 đang chạy |
| 2026-10-23 | JOB-20261023-20 (529 manual 4.0/21.0/32.0) | ~30 | 3/6 (trả lại 100%) | 0 (32.0 làm một phần) | 2 (tab treo, Dat reload sau khi đổi site access) | Bài học: field bài viết nằm ở **UE > Page > 記事情報** (tự lưu, không có Save/Cancel), không phải Sites properties → job sau viết bước theo UE. JOB-23-18 không kịp chạy → chuyển Night Pack |
