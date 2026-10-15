# TC night permcheck

- Dry-run: 2026-10-15T08:08Z (UTC) / 2026-10-15 15:08 (Asia/Saigon) – ngoài khung 18–22h → chỉ kiểm quyền, không nhận ticket.

| Bước | Kiểm tra | Kết quả | Ghi chú |
|---|---|---|---|
| a | git clone/pull + commit + push | OK | commit 0f9076c pushed to main |
| b1 | Drive search_files folder `1ExvkoLfUnLhfahS5jWIDY9Eco3jHvYsk` | OK | thấy folder 552, 173, 196, 352… |
| b2 | Drive create_file `permcheck-2026-10-15T08:08Z.txt` trong `1QECbSzn_zdCUxyuqZrgRtxWkMuq2qnON` | OK | file ID 1zflzNZBQ51Pn7Ya01oPP458zOTy0wKjM |
| c1 | Jira getJiraIssue DSR-618 | OK | To Do, duedate 2026-10-16 |
| c2 | Jira getTransitionsForJiraIssue DSR-618 | OK | từ To Do có: 11 Start, 91 Dismissed |
| c3 | Jira editJiraIssue DSR-618 duedate=2026-10-16 | OK | giá trị giữ nguyên |
| d | Figma whoami | OK | dev3.figma (Sutrix: Full seat) |
| e | list_triggers | OK | "DSR TC – Đêm 18–22h" trig_013uTjYksLNpDdHY3C9jedun enabled, next 18:05 |
| f | python3 + openpyxl 3.1.5 + build_tc.py (spec 1 TC) | OK | tạo TC + TestData .xlsx, exit 0 |
| g | PushNotification | OK | đã gửi |

Kết luận: đủ quyền cho Night TC job. Không cần Dat can thiệp.

## Dry-run 2026-10-15T08:09Z (15:09 Asia/Saigon) – manual fire

| Bước | Kết quả | Ghi chú |
|---|---|---|
| a git commit + push | OK | 53d7558 |
| b1 Drive search_files | OK | |
| b2 Drive create_file `permcheck-2026-10-15T08:09Z.txt` | OK | ID 1i1oenejN8rewDBZyGsxwORf9R8hutGzn |
| c1 Jira read DSR-618 | OK | To Do, duedate 2026-10-16 |
| c2 Jira transitions | OK | 11 Start, 91 Dismissed |
| c3 Jira edit duedate | OK | giữ 2026-10-16 |
| d Figma whoami | OK | dev3.figma |
| e list_triggers | OK | trig_013uTjYksLNpDdHY3C9jedun enabled, next 18:05 |
| f build_tc.py | OK | exit 0, 2 file .xlsx |
| g PushNotification | OK | |

Kết luận: 10/10 OK.
