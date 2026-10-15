# DSR-<ID> · <Tên US>   <🟢 On track | 🟡 At risk | 🔴 Blocked | ✅ Closed>

> Cập nhật: <YYYY-MM-DD HH:MM> (UTC+7) · Sprint <N> · Clone: <DSR-xxx | —> · Close dự kiến: <YYYY-MM-DD>
> Jira: [DSR-<ID>](https://sutrix.atlassian.net/browse/DSR-<ID>) · Jira status: <status> · TC file: [Drive](<link>)

**Để close còn thiếu:** <1 câu, tối đa 3 ý, theo thứ tự>

## 1. Việc cần làm (sắp theo hạn)
| # | Việc | Ai làm | Với ai | Hạn | Mở khóa | Nội dung gửi sẵn |
|---|---|---|---|---|---|---|
| 1 | | Dat / QA-PT / Agent / Claude | | | B1 / TC… | <link hoặc đoạn copy> |

## 2. Blockers
| ID | Blocker | Chặn | Ai mở khóa | Cách mở khóa | Từ ngày | Trạng thái |
|---|---|---|---|---|---|---|
| B1 | | <số TC / env> | <tên> | <hành động cụ thể> | | Open / Done |

## 3. Tiến độ test
| Env | Tổng TC | ✅ Pass | ❌ Fail | ⛔ Blocked | ⏳ Chưa chạy | % đã chạy |
|---|---|---|---|---|---|---|
| DEV | | | | | | |
| STG | | | | | | |
| PRO | | | | | | |

CF layer <x/y pass> · Page layer <x/y pass> · Exec: Auto <n> · Visual <n> · Manual <n>

## 4. Bugs
| Jira | Tiêu đề | Sev | Trạng thái Jira | Assignee | Retest ở | Kết quả retest |
|---|---|---|---|---|---|---|

## 5. Dependency (CF / ticket)
| Phụ thuộc | Trạng thái | TC bị chặn |
|---|---|---|
| <CF / ticket> | Ready / In dev / Missing | |

## 6. Definition of Done  (<n>/9)
- [ ] Baseline requirement đã lưu (BL-vN)
- [ ] TC file trên Drive
- [ ] DEV: 100% TC đã chạy, 0 Fail
- [ ] QA confirm DEV
- [x] STG: N/A (giai đoạn DEV)
- [x] PRO: N/A (giai đoạn DEV)
- [ ] Bug Critical/Major mở = 0
- [ ] Lighthouse ≥ 95 mobile & desktop (N/A nếu US không có page)
- [ ] Evidence DEV đã upload Drive

## 7. Nhật ký (5 dòng gần nhất)
- <YYYY-MM-DD> <sự kiện>
