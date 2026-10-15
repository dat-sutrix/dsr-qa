# Câu hỏi / blocker từ Night TC job – chờ Dat duyệt mỗi sáng

> Job đêm **KHÔNG tạo Jira Question**. Ghi vào đây; sáng Dat đánh dấu cột "Dat quyết định": `Tạo ticket` / `Bỏ` / `Tự trả lời: …`. Session Điều phối thực hiện theo quyết định.
> Mỗi câu hỏi phải có mặc định QA đã áp dụng trong TC (`[Giả định]`) để TC không bị chặn.

| # | Ngày | US | Câu hỏi (EN, gửi được nguyên văn) | TC bị ảnh hưởng | Mặc định QA đã áp dụng | Gửi ai (đề xuất) | Dat quyết định |
|---|---|---|---|---|---|---|---|
| Q1 | 2026-10-15 | DSR-566 | What is the display format of the news date on the detail page (ja / en)? Figma C27 shows YYYY.MM.DD – is that the same for en? | 3.0 | ja/en = YYYY.MM.DD (Figma C27) | Quentin (PM) | |
| Q2 | 2026-10-15 | DSR-566 | Which query-index holds news pages: /{lang}/query-index.json or /{lang}/news/query-index.json? Are pages under test-space indexed? | 7.0 | Agent checks both and records which one has the page | Quentin (PM) | |
| Q3 | 2026-10-15 | DSR-566 | Breadcrumb Home > News List > title: when will a page under /master/{lang}/news/ exist on DEV so QA can verify it? | 11.0 | Blocked until a news path page exists on DEV | Quentin (PM) | |
