# Jira sweep – rà toàn bộ comment (Dat 22/10 09:19, quy tắc đứng)

**Lý do:** 22/10 phát hiện Ngọc đã báo template news-article deploy DEV từ 19/10 (DSR-566) nhưng QA bỏ sót, Dat vẫn hỏi lại team. **Tuyệt đối không để lặp lại: không hỏi team điều đã có câu trả lời trên Jira.**

**Lịch:** T2–T6 **08:05** (trước standup 08:19 – push xong trước 08:15), **12:05**, **16:05** (giờ VN). Scheduled task "DSR Jira sweep".

## Phạm vi (bắt buộc đủ, không chỉ lọc theo từ khóa)
Cửa sổ = từ `last_sweep_utc` trong `JIRA-SWEEP.md` (lần đầu / không có → 24h trước; thứ Hai 08:05 → từ thứ Sáu 16:00 VN). Jira cloudId `85195b6d-d342-4738-a5b1-bec55923fb80`.
1. **Mọi ticket giao Dat chưa Done:** `assignee = 557058:c5a7db46-c238-4764-b110-9e38e6fd9cd7 AND statusCategory != Done` (mọi issue type, bỏ sub-task label `qa-tc`).
2. **Mọi ticket project DSR cập nhật trong cửa sổ:** `project = DSR AND updated >= "<cửa sổ>"` – đọc **toàn bộ comment mới** (không chỉ ticket của Dat): mention Dat (ADF mention accountId của Dat, hoặc tên "Dat"/"Đạt"), câu trả lời cho Question/bug label `qa-ai`, thông báo deploy/merge/"implemented"/"ready for test"/"please check", đổi assignee/status/sprint, ticket mới tạo.
3. **Ticket đã có trong DASHBOARD mục 1, BUGS.md, `tc-questions.md`:** đọc comment mới dù assignee là ai.
4. Đổi trạng thái/assignee/sprint (changelog) của các ticket trên.
Giới hạn: ≤ 60 ticket/lần (Dat đã duyệt cho sweep này, ngoại lệ rule tác vụ nặng). Vượt → ưu tiên 1 → 3 → 2, ghi số bỏ lại vào báo cáo.

## Xử lý mỗi thông tin mới
- Phân loại: **(a) mở khóa / đã giao hàng** (template, CF model, fix, deploy) · **(b) trả lời câu hỏi** · **(c) yêu cầu Dat/QA làm gì** · **(d) ticket/bug mới giao Dat** · **(e) đổi scope/URL/spec** · (f) chỉ thông tin.
- Mỗi mục (a)(b)(e) → thêm 1 dòng vào **`KNOWN-FACTS.md`** (ngày · ticket · ai · nội dung 1 dòng · link comment).
- **Cập nhật kế hoạch ngay** (không chỉ báo):
  - DASHBOARD mục 1: thêm/sửa dòng ticket (kế hoạch, đợi ai, hạn); ticket giao Dat chưa có dòng → thêm.
  - (a) → bỏ "Blocked-by" tương ứng, chuyển job `jobs/hold/` → `jobs/queue/` nếu điều kiện đã thỏa; cần data QA-PT → thêm vào mục "Night Pack <hôm nay> – bổ sung bắt buộc" của `PLAN-sprint12.md` (giá trị inline theo Quy tắc Night Pack).
  - (b)(a) → **gạch mọi câu hỏi / tin đuổi / đề xuất đã soạn sẵn** trong DASHBOARD 🔔/📣, STANDUP, `tc-questions.md` mà câu trả lời đã có: ghi `~~…~~ ✅ đã trả lời <ticket> <ngày> – KHÔNG gửi`.
  - (c)(d) → dòng 🔔 Dat cần làm (với ai, hạn, tin trả lời soạn sẵn EN) hoặc job agent mới (≤ 2 job/lần, theo `templates/JOB_TEMPLATE.md`, ID theo 03 §2).
  - (e) → ghi vào `us/DSR-<ID>.md`; ảnh hưởng automation → job sửa.
- Bug ≥ 80% không tạo ở đây (để 07:45/17:10 theo BUG-RULES); chỉ ghi vào 🐞 nếu thấy.
- Không comment/chuyển trạng thái Jira, không đổi priority.

## Theo dõi forecast (Dat 22/10 16:11)
- Mọi ticket chuyển sang [Dev] In Testing / giao QA trong cửa sổ: ghi ngày giờ vào `FORECAST.md` (cột Hiện tại). Sau **23/10 17:00 VN** (Sprint 12) hoặc khi việc test còn lại > năng lực (bảng Năng lực) → ghi `LATE HANDOVER` + PushNotification ngay cho Dat với tin EN soạn sẵn cho Quentin (+ dev): ảnh hưởng, đề xuất (dời S13 / bỏ TC nào).
- Thông tin làm ticket trễ đích baseline (blocker mới, dev hẹn ngày mới) → cập nhật `FORECAST.md` cột Δ + push Dat.

## Ghi kết quả
- Ghi đè `JIRA-SWEEP.md`: `last_sweep_utc: <ISO>` · bảng **Mới phát hiện** (Ticket | Ai/khi nào | Loại a–f | Nội dung | Đã cập nhật gì) · **Câu hỏi/tin đã gạch** · **Dat cần làm** · số ticket đã đọc / bỏ lại.
- `git pull --rebase` trước khi sửa; commit `[jira-sweep] <YYYY-MM-DD HH:MM>`; push (thử lại 3 lần).
- Có mục (a)(b)(c)(d)(e) → PushNotification: `[DSR Jira sweep HH:MM] n mới · 🔓 n mở khóa · ✂ n câu hỏi đã gạch · 🔔 n việc Dat` + 1 dòng/mục quan trọng + link https://github.com/dat-sutrix/dsr-qa/blob/main/ykk-dsr/hub/JIRA-SWEEP.md. Không có gì mới → không push notification, kết quả cuối "Không có thay đổi".

## Quy tắc cho MỌI session (không chỉ sweep)
**Trước khi soạn bất kỳ câu hỏi / tin đuổi / đề xuất dời scope cho team:** đọc `KNOWN-FACTS.md` + comment mới nhất của ticket đó. Đã có câu trả lời → không hỏi, dùng câu trả lời.
