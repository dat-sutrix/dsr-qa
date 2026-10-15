# Câu hỏi / blocker từ Night TC job – chờ Dat duyệt mỗi sáng

> Job đêm **KHÔNG tạo Jira Question**. Ghi vào đây; sáng Dat đánh dấu cột "Dat quyết định": `Tạo ticket` / `Bỏ` / `Tự trả lời: …`. Session Điều phối thực hiện theo quyết định.
> Mỗi câu hỏi phải có mặc định QA đã áp dụng trong TC (`[Giả định]`) để TC không bị chặn.

| # | Ngày | US | Câu hỏi (EN, gửi được nguyên văn) | TC bị ảnh hưởng | Mặc định QA đã áp dụng | Gửi ai (đề xuất) | Dat quyết định |
|---|---|---|---|---|---|---|---|
| Q1 | 2026-10-15 | DSR-566 | What is the display format of the news date on the detail page (ja / en)? Figma C27 shows YYYY.MM.DD – is that the same for en? | 3.0 | ja/en = YYYY.MM.DD (Figma C27) | Quentin (PM) | |
| Q2 | 2026-10-15 | DSR-566 | Which query-index holds news pages: /{lang}/query-index.json or /{lang}/news/query-index.json? Are pages under test-space indexed? | 7.0 | Agent checks both and records which one has the page | Quentin (PM) | |
| Q3 | 2026-10-15 | DSR-566 | Breadcrumb Home > News List > title: when will a page under /master/{lang}/news/ exist on DEV so QA can verify it? | 11.0 | Blocked until a news path page exists on DEV | Quentin (PM) | |
| Q4 | 2026-10-15 | DSR-529 | Article (STORIES) detail: what is the display format of publishDate in the content info bar for ja / en / cn? Figma board 162-450 shows YYYY.MM.DD. | 7.0 | YYYY.MM.DD for all languages | Quentin (PM) | |
| Q5 | 2026-10-15 | DSR-529 | Content info bar: are category tags shown as the tag title in the page language (and meta `category` keeps tag IDs)? | 6.0, 12.0 | Visible label = tag title in page language; meta = tag IDs | Martin (dev) | |
| Q6 | 2026-10-15 | DSR-529 | Related stories NEW icon: how many days after publishDate is an article "NEW"? Same rule as product-detail isWithinDays? | 18.0 | Same as product-detail; agent records threshold; test uses publishDate −3 days | Quentin (PM) | |
| Q7 | 2026-10-15 | DSR-529 | Is the stories query-index (/{lang}/stories/query-index.json, Martin 2026-09-08 prereq #1) live on DEV, what is the exact path, and does it include pages under /master/{lang}/library/article/stories/ ? | 17.0–19.0, 26.0, 27.0 | Seed test pages under library/article/stories; agent tries 3 paths | Martin (dev) | |
| Q8 | 2026-10-15 | DSR-529 | Footer action (block 14): link targets for VIEW ALL STORIES and お問い合わせ are marked 未決定 in Figma – when will they be decided? | 24.0 | TC records hrefs only, target not judged | Quentin (PM) | |
| Q9 | 2026-10-15 | DSR-529 | Is the breadcrumb in scope for the article detail page (Martin open decision #4), or does it wait for the shared breadcrumb block (DSR-552/458)? | 28.0 | Blocked until decided (not Fail) | Quentin (PM) | |
| Q10 | 2026-10-15 | DSR-609 | Top page NEWS area: what is the defined display when the news query-index returns 0 items (hide the section, or show a message – which text)? DSR-196 says "0件時の表示が定義されていること" but no definition is written. | 8.0 | Section hidden or message; PASS only on no console error / no broken layout; display recorded | Quentin (PM) | |
| Q11 | 2026-10-15 | DSR-609 | Is SP Figma TOP_SP_02 (node 4215-26358) the latest SP design matching PC "TOP 260925" (node 6150-83741)? DSR-196 marks it 要確認. | 1.0 | Compare SP with TOP_SP_02 | Quentin (PM) | |
