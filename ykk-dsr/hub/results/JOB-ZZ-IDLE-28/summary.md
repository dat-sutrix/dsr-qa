# JOB-ZZ-IDLE-28 – full DEV regression after Martin 21/10 merges (run 11:11–11:31Z, .aem.live)
## Merge/incident-related
| Test | Symptom | cause | conf. | JOB-09 (20/10) | Evidence |
|---|---|---|---|---|---|
| DSR-ARTICLE-006 [ja]/[en] | tag chips now render (DSR-658), but the spec counts 3: "do-not-translate バイオベース", "do-not-translate", "バイオベース". The locator also matches the wrapper; one chip text is "do-not-translate", and en shows a ja label | article fix merge | 10% (suspect test) | fail, 0 labels | evidence/DSR-ARTICLE-006_{ja,en}.png |
| DSR-CATOV-003 [en] qa190-cat-pdf-form, qa190-cat-ebook-form (new DSR-654 spec) | /en/library/catalog/<id> is 200 on .aem.page but 404 on .aem.live (previewed, not published?) | overlay auto-gen | 30% (suspect data) | not in suite | result.json (HTTP only) |
| DSR-CATDL-006/018, DSR-CATV-017 ja+en | unchanged, same fail as 20/10 | overlay-merge (20/10) | 30–50% | same | see JOB-20261020-09 |

- **What ran:** `npm run test:dev`, all projects. 416 tests: 139 pass (2 of them flaky), 63 fail, 214 skip. tsc had no errors. Report: results/regression/DEV/automation-run-20261021-idle28.md.
- **Fixed by the article merge:** DSR-ARTICLE-007 ja/en now pass. The date shows 2026.10.01, matching meta publicationdate (DSR-660).
- **Changed, cause none:** ARTICLE-010 passes because of the meta rename in the spec. ARTICLE-003/013/029 already passed after the QA-PT data fix on 20/10. ARTICLE-012/014/028 fail on the new spec checks: no `category` meta, and the breadcrumb last item is the title, not the navtitle. That data is due in Night 21/10 0b, so I suspect data. ECO-002 ja now fails because every VIEW MORE links to `dsr-590-eco-detail-page` (data). CATDL-014/015 timed out once, then passed.
- **404 config deploy:** no result changed. VOV-011 is still 404 on .live, and ICON-006 still gets /placeholders.json 404.
- **Unchanged:** 53 fails match JOB-09 exactly. Among them, ARTICLE-011's thumbnail meta is still relative (DSR-659 not visible yet; the page needs to be republished).
- **New specs:** DSR-585 PCF (25 tests: 8 pass, 17 skip/blocked) and DSR-654 CATOV (35 tests: 2 fail, 33 skip, because TD-190 is not on .live or the ids are not seeded).
- **Caveats:** cause tags are my inference from timing and the hub notes; I did not check Author or Jira. I stopped an earlier attempt after about 1 minute (shell timeout too short) and used `pkill -f "playwright test"`, which could have matched another lane's run. DASHBOARD/BUGS were not edited. Evidence for unchanged fails is in test-results/ (not committed).
