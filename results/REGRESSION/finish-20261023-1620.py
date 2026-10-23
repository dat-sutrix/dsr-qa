import json, pathlib, collections
P=pathlib.Path
job='JOB-ZY-REG-20261023-1620-codex'; root=P('ykk-dsr/hub/results')/job
d=json.loads((root/'measurements.json').read_text()); old=json.loads(P('ykk-dsr/hub/results/JOB-ZY-REG-20261023-1220-codex/measurements.json').read_text())
prior={(r['key'],r['lang'],r['width']):r for r in old['pages']}; candidates=[]; tests=[]
for r in d['pages']:
 b=prior.get((r['key'],r['lang'],r['width']),{}); changes=[]
 for metric in ['http','title']:
  if metric in b and metric in r and b[metric]!=r[metric]:
   c=dict(page=r['key'],lang=r['lang'],vw=r['width'],metric=metric,before=b[metric],now=r[metric],suspect='DSR-669/671 cf-model, query (a47274d)',confidence=50,cause='none'); candidates.append(c);changes.append(c)
 r['pre669Comparison']=changes
 result=r['result'];reason=r.get('reason','')
 if changes and result!='blocked':result='fail';reason='NEW FAIL candidate: '+', '.join(c['metric']+' changed' for c in changes)
 tests.append(dict(tc=f"VISUAL-{r['key']}-{r['width']}",lang=r['lang'],result=result,error='' if result=='pass' else reason[:200],evidence=r.get('png','') if r.get('committed') else '',suspect='product' if changes else 'data',cause='none',confidence=50 if changes else 0,durationMs=r['durationMs']))
for g in d['lighthouse']:
 prev=d['previousLighthouse'].get(f"{g['key']} [ja] {g['device']}",{}); drops=[]
 for metric,now in g.get('scores',{}).items():
  before=prev.get('scores',{}).get(metric)
  if isinstance(before,(int,float)) and isinstance(now,(int,float)) and before-now>=10:
   candidates.append(dict(page=g['key'],lang='ja',vw=g['device'],metric=metric,before=before,now=now,suspect='DSR-669/671 cf-model, query (a47274d)',confidence=50,cause='none'));drops.append(metric)
 blocked=len(g['runs'])!=3 or any(r.get('error') or r.get('runtimeError') for r in g['runs'])
 tests.append(dict(tc=f"LIGHTHOUSE-{g['key']}-{g['device']}",lang='ja',result='blocked' if blocked else 'fail' if drops else 'pass',error='Lighthouse incomplete' if blocked else 'Score drop >=10: '+', '.join(drops) if drops else '',evidence='',suspect='env',cause='none',confidence=50 if drops else 0,durationMs=sum(r['durationMs'] for r in g['runs'])))
d['newFailCandidates']=candidates
(root/'measurements.json').write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
result=dict(job=job,agent='codex',us='Regression S12',env='dev',started=d['started'],finished=d['finished'],status='failed' if d.get('error') else 'done',tests=tests,lighthouse=[dict(url=g['url'],device=g['device'],**g.get('scores',{}),metrics=g.get('metrics',{})) for g in d['lighthouse']],code_changes=['results/REGRESSION/run-20261023-1620.cjs','results/REGRESSION/finish-20261023-1620.py'],questions=[])
(root/'result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
counts=collections.Counter(t['result'] for t in tests)
def esc(s):return str(s).replace('|','\\|').replace('\n',' ')
table=['# NEW FAIL','| page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence |','|---|---|---|---|---|---|---|---|']
for c in candidates:table.append('| '+' | '.join(esc(c[k]) for k in ['page','lang','vw','metric','before','now','suspect'])+f" | {c['confidence']}% |")
if not candidates:table.append('| baseline – none | — | — | HTTP/title + prior LH medians | pre-669 | no regression candidate | none | N/A |')
reportpath='results/REGRESSION/DEV/automation-run-'+d['started'][:10].replace('-','')+'-1620.md'
summary=table+[f"Proposed outcomes: {counts['pass']} pass, {counts['fail']} candidate fail, {counts['skip']} skip, {counts['blocked']} blocked; human QA confirms.",f"{len(d['pages'])} viewport measurements; ja/en, 1440×900 and 390×844; en-only video block.",'Empty visual ledger: post-669 baseline established; no historical pixel comparison possible.','Pre-669 HTTP/title compared per viewport; raw text retained. Candidate cause: none; data/build attribution unverified.',f"Lighthouse: {sum(len(g['runs']) for g in d['lighthouse'])} audits, three per page/device; component-wise medians in measurements.json and lighthouse-ledger.json.",'TypeScript: exit 0, no errors. Read-only navigation; no login or form submission.',f"Report: {reportpath}"]
if len(summary)>20:summary=table[:3]+['| See measurements.json newFailCandidates | ja/en | both | candidate details | pre-669 | current | DSR-669/671 | 50% |']+summary[len(table):]
(root/'summary.md').write_text('\n'.join(summary)+'\n')
report=f'''# Regression DEV automation run — 20261023-1620

## 1. Header

- Run start (UTC): {d['started']}
- Run end (UTC): {d['finished']}
- Environment + base URL: DEV — {d['base']}
- Target pages: {', '.join(sorted(set(r['path'] for r in d['pages'])))}
- Build under test: job reports dev/2026.10.23 a47274d (669/671) and dev/2026.10.23_2 b33514f (670), migration complete 16:15 VN; not independently verified.
- Baseline: post-669 visual baseline; pre-669 measurements from JOB-ZY-REG-20261023-1220-codex and existing Lighthouse medians (snapshot retained in measurements.json).
- Automation HEAD commit SHA: {d['head']}
- Postprocessing command: `python3 results/REGRESSION/finish-20261023-1620.py`
- Exact command: `node results/REGRESSION/run-20261023-1620.cjs > /tmp/reg1620-run.log 2>&1`
- Initial preparation failed because `python` was unavailable; retried preparation with `python3` before any measurements.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Blocked | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---:|---|---|
'''
from datetime import datetime
wall=(datetime.fromisoformat(d['finished'])-datetime.fromisoformat(d['started'])).total_seconds()
report+=f"| {len(tests)} | {counts['pass']} | {counts['fail']} | {counts['skip']} | {counts['blocked']} | {1 if d.get('error') else 0} | 1 | 0; 3 LH measurements, not retries | {wall:.1f} s |\n\nProposed outcomes only; pass means measurement completed with no detected HTTP/title or score regression, not final visual/design approval. Chromium capture script, no npm suite executed.\n\n## 4. Executed tests\n\nDuration per capture or sum of three audits.\n\n| TC ID | Title | Result | Duration | One-line failure reason |\n|---|---|---|---|---|\n"
for i,t in enumerate(tests):
 if t['result']=='skip':continue
 title=d['pages'][i]['path'] if i<len(d['pages']) else d['lighthouse'][i-len(d['pages'])]['url']
 report+=f"| {t['tc']} [{t['lang']}] | {title} | {t['result']} | {t['durationMs']} ms | {esc(t['error']) or '—'} |\n"
report+='\nLighthouse component-wise medians (three runs each):\n\n| Page | Device | Perf | A11y | BP | SEO | LCP ms | CLS | TBT ms |\n|---|---|---|---|---|---|---|---|---|\n'
for g in d['lighthouse']:
 report+='| '+ ' | '.join(str(v) for v in [g['key'],g['device'],*[g.get('scores',{}).get(k) for k in ['performance','accessibility','best-practices','seo']],*[g.get('metrics',{}).get(k) for k in ['largest-contentful-paint','cumulative-layout-shift','total-blocking-time']]])+' |\n'
report+='\n## 5. Skipped tests\n\n| TC ID | Verbatim skip reason |\n|---|---|\n'
for t in tests:
 if t['result']=='skip':report+=f"| {t['tc']} [{t['lang']}] | {esc(t['error'])} |\n"
if not counts['skip']:report+='None.\n'
report+='\n## 6. Failed tests\n\n'
if not counts['fail']:report+='None.\n'
for t in tests:
 if t['result']!='fail':continue
 report+=f"### {t['tc']} [{t['lang']}]\n\n- Comparison rule: HTTP/title unchanged vs pre-669; Lighthouse score drop <10. Postprocessing: `results/REGRESSION/finish-20261023-1620.py:9` (HTTP/title) or `results/REGRESSION/finish-20261023-1620.py:19` (Lighthouse); no Playwright assertion failed.\n- Expected vs actual: {esc(t['error'])}; exact values in table below.\n- Evidence: {t['evidence'] or 'measurements.json Lighthouse runs/medians'}.\n- Cause: none; product-bug confidence {t['confidence']}%; suspect {t['suspect']}.\n\n"
report+='\n'+'\n'.join(table)+'\n'
report+='''
## 7. Open points for QA

- Spot-check: catalog-detail ja mobile viewport shows header/breadcrumb and otherwise white space. Body text length matches pre-669 (183 characters); this is not evidence of a new regression or confirmed content correctness.
- Original visual ledger was empty: no prior image pixel diff is possible. Baseline captures are unmasked; future comparisons must mask carousel/video/time regions on both captures.
- HTTP 404 is skipped per job, except a changed HTTP/title is flagged as a candidate; skipped pages are never counted as passing.
- Candidate HTTP/title differences and Lighthouse drops are not confirmed bugs. AEM seed data and actual deployed build were not independently verified. CHANGES.md attribution is temporal, not causal proof.
- PNG palette compression used above 300,000 bytes, then JPEG quality 80. Files still oversized are omitted and retain SHA-256/size plus “not committed” in ledger/measurements.
- Evidence paths are project-relative. Captures in evidence/REGRESSION are committed per job exception; raw Lighthouse JSON remains /tmp/reg1620-*.json, not committed. test-results/ and playwright-report/ remain gitignored.
- All navigation was read-only; no AEM writes, login, or form submissions. Partial prior Lighthouse ledger is compared only where a median exists; remaining groups establish baselines.
'''
assert not P(reportpath).exists(), 'Refusing report overwrite'
P(reportpath).write_text(report)
print(dict(counts)); print('candidates',candidates)
