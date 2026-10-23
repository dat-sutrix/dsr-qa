# Prompt – chạy chrome queue (session `DSR – Chrome` hoặc scheduled task)

1. `git pull`; đọc `ykk-dsr/hub/CONTEXT.md`, `CHROME-AGENT.md` (§3 an toàn), `BL-OVL-1` nếu job đụng overlay.
2. Giờ VN ngoài 08:30–18:00 T2–T6 → dừng, ghi 1 dòng vào DASHBOARD 🤖.
3. Chrome: `tabs_context_mcp` → không kết nối được → DASHBOARD 🔔 "Mở Chrome profile DSR-QA" và dừng. Chỉ làm trong tab tự tạo; đóng tab khi xong.
4. Kiểm phiên: mở `https://author-p192812-e2014374.adobeaemcloud.com/libs/granite/security/currentuser.json` → phải là user "Agent QA". Bị chuyển trang đăng nhập → 🔔 "Đăng nhập Author trong profile DSR-QA", dừng (không tự nhập mật khẩu/mã).
5. Lấy job `jobs/queue/*.md` có `agent: chrome`, theo tên tăng dần. Với mỗi job: `git mv` sang `running/`, commit "[chrome] start <ID>", push.
6. Làm từng step: mở URL thẳng → đọc giá trị hiện tại (`before`) → thao tác → Save → đọc lại (`after`). Path ngoài phạm vi, hộp thoại lạ, 2 lần thử thất bại → `blocked` + mô tả, sang step kế. Không đoán giá trị; chỉ dùng giá trị trong job/manifest.
7. Ghi `results/<ID>/result.json` (+ `actions[]`) và `summary.md`; `git mv` job sang `done/`; nếu có `verify_job` trong `hold/` → chuyển sang `queue/`; commit "[chrome] finish <ID> <status>", push.
8. Hết job hoặc > ~40 bước trong lượt → cập nhật DASHBOARD 🤖 (số job, blocked) và dừng. Lỗi verify của lượt trước → ghi `QA-PT-ERRORS.md` mục "chrome".
