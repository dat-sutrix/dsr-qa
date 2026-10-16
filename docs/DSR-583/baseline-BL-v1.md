# DSR-583 baseline BL-v1 (Product list – SP product card grid fixed to 2 columns)

Copied verbatim from `ykk-dsr/hub/tc-out/DSR-583.spec.json` on 2026-10-16 (JOB-ZZ-IDLE-03). Source: https://sutrix.atlassian.net/browse/DSR-583 + Figma 1333-6510. Do not edit expected results here; re-copy when the TC file changes.

Automation ID: `DSR-PRODLIST-00N`, N = TC number (1.0 → 001).

## TCs

| TC | Automation ID | Feature | Exec | Lang | Device | Expected | TD | Blocked note |
|---|---|---|---|---|---|---|---|---|
| 1.0 | DSR-PRODLIST-001 | SP 375px = 2 columns (Fix) | Automation | ja | SP iPhone 13 emulation (Chromium) | EN: Exactly 2 distinct column offsets; every full row has 2 cards; no horizontal scroll (document.scrollWidth ≤ 375). JP: 列は2つ、各行2枚、横スクロールなし。 | TD-583-01 | DSR-583 To Do (お客様情報待ち 10/14) – owner Martin |
| 2.0 | DSR-PRODLIST-002 | SP width boundaries = 2 columns | Automation | ja | SP emulation (Chromium) | EN: Column count = 2 for every width; card does not overflow its column; no horizontal scroll. JP: 全幅で2列、はみ出し・横スクロールなし。 | TD-583-01 | DSR-583; SP breakpoint value (Q22) – owner Martin |
| 3.0 | DSR-PRODLIST-003 | Column count stable while scrolling / loading more (symptom: 3↔2 switch) | Automation | ja, en | SP emulation (Chromium) | EN: Column count = 2 at every checkpoint (never 3 or 1). JP: すべての時点で2列。 | TD-583-01 | DSR-583 – owner Martin |
| 4.0 | DSR-PRODLIST-004 | PC / TB columns unchanged (regression) | Automation | ja | PC Chromium | EN: 1440 → 4, 1200 → 4, 980 → 3, 768 → 3 columns (Figma 1333-6510 frames). JP: 1440/1200は4列、980/768は3列。 | TD-583-01 | DSR-583 – owner Martin |
| 5.0 | DSR-PRODLIST-005 | Odd number of cards / 1 card (boundary) | Automation | ja | SP emulation (Chromium) | EN: Last / single card width = other card width (±2px) and left aligned; not stretched to full width. JP: 他カードと同幅（±2px）・左寄せ、全幅に伸びない。 | TD-583-02 | DSR-583; filter data – owner Martin |
| 6.0 | DSR-PRODLIST-006 | SP card layout vs Figma (visual) | Visual (Playwright VPS) | ja, en | SP iPhone 13 emulation (Chromium) | EN: 2 columns, gutter and card width within ±4px of Figma; long names wrap inside the card without overlapping the next card. JP: 2列、余白・幅±4px、長い名前がカード内で折返し。 | TD-583-01, TD-583-03 | DSR-583 – owner Martin |
| 7.0 | DSR-PRODLIST-007 | Real device check | Manual | ja | iPhone Safari, Android Chrome | EN: 2 columns throughout on both devices; no horizontal scroll. JP: 両端末で常に2列、横スクロールなし。 | TD-583-01 | DSR-583 – owner Martin |

## Assumptions

| ID | Assumption | Source | Impact |
|---|---|---|---|
| A1 | [Giả định] Product list page on DEV = /master/{lang}/product-list (ticket shows branch preview /ja/product-list). Agent tries both; preflight 404 → blocked-data. | DSR-583 URL; AGENTS.md path prefix | All |
| A2 | [Giả định] SP = viewport < 768px (Figma has 375 SP frame and 768 TB frame with 3 cols). Exact breakpoint to be confirmed. | Figma 1333-6510 | 2.0 |
| A3 | [Giả định] With an odd count, the last card keeps the column width (left aligned). | Figma grid; not specified | 5.0 |
| A4 | Dev (Martin 10/09) could not reproduce; YKK contacted, waiting customer info (10/14). TCs check the target state (2 cols on SP) regardless of the repro. | DSR-583 comments | All |

## Test data

| TD | TCs | Description | Location | Field | ja | en | cn | Seed |
|---|---|---|---|---|---|---|---|---|
| TD-583-01 | 1.0–4.0, 6.0, 7.0 | Product list page with ≥ 6 published products | /master/{lang}/product-list | product count | ≥ 6 | ≥ 6 | — | No (existing) |
| TD-583-02 | 5.0 | Filter combinations | same page | result count | one filter → 1 result, one → 3 results | — | — | No (find existing) |
| TD-583-03 | 6.0 | Product with long name | existing product CF | name length | ≥ 40 chars | ≥ 60 chars | — | No (find existing) |
