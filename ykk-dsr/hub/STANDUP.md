# Daily standup 2026-10-20 (Thứ Ba)

**Yesterday**
- DSR-552: all 35 TCs run, 0 fail; bugs DSR-648 and DSR-651 retested Pass.
- DSR-529: stories test pages created; JOB-20261019-02 ran: 6 pass, 25 fail (meta names, h1=navTitle).
- DSR-590: C14 demo 4 pass, 2 fail (data, temp links); styling screenshots recaptured (JOB-20261020-01).
- DSR-457 #10 Pass; DSR-570 catalogId fixed; post-merge visual baseline captured (IDLE-18).

**Today**
- DSR-552: close DSR-648/651, move DSR-552 to Done DEV.
- DSR-529: triage 25 failures (product vs data vs test) → raise bugs by 17:10.
- Overlay merged: regression JOB-20261019-05 running; tonight QA re-seeds video (DSR-557) and qa501 (DSR-647).
- DSR-570: 6 manual TCs tonight; catalog merge this afternoon → re-seed 21/10, rerun 22/10.

**Blockers / need help**
- DSR-566/653: no `news-article` template · Ngọc/Martin · 12 TCs blocked · by 21/10, else Sprint 13.
- DSR-570: TC 007 PDF link exposure · Quentin; catalog folder after merge · Martin · due 22/10.
- DSR-590: C15 page missing (Ngọc) · Figma C15/SP (Quentin, Q36) · C15 not testable.
- DSR-457 R1: which field drives NEW/UPDATE icon · Ngọc · due 20/10.

**🆕 New tickets not yet planned**
| Mã | Tiêu đề ngắn | Status | Ai giao / khi nào | Việc QA đề xuất |
|---|---|---|---|---|
| [DSR-571](https://sutrix.atlassian.net/browse/DSR-571) | 資料ダウンロード – Create Test Case (form, HubSpot, 3 ngôn ngữ), epic DSR-192 | To Do | 石谷英樹 giao Dat 19/10 15:09 JST ("TC đã viết rồi") | Chỉ theo dõi: TC DSR-570 đã có → gắn link TC file rồi chuyển Done |

Dat cần nhắc trong meeting: Ngọc/Martin – template `news-article` cho DSR-566 (hạn 21/10), và Martin – đường dẫn folder catalog sau merge chiều nay.
