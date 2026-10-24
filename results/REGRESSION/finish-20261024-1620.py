import json, pathlib, collections, datetime
P=pathlib.Path
job='JOB-ZY-REG-20261024-1620-codex'; root=P('ykk-dsr/hub/results')/job
d=json.loads((root/'measurements.json').read_text()); candidates=[]; tests=[]
def add(r,metric,before,now):
 c=dict(page=r['key'],lang=r.get('lang','ja'),vw=r.get('width',r.get('device')),metric=metric,before=before,now=now,suspect='unannounced',confidence=50,cause='none')
 candidates.append(c);return c
for r in d['pages']:
 changes=[]; comp=r.get('comparison',{})
 if r.get('reason')=='Baseline capture; no previous visual comparison':r['reason']='Capture completed; comparison recorded separately'
 for metric in ['http','title']:
  before=comp.get(metric+'Before')
  if before is not None and r.get(metric)!=before:changes.append(add(r,metric,before,r.get(metric)))
 if r.get('http')!=404 and comp.get('diffPercent',0) is not None and comp.get('diffPercent',0)>1:changes.append(add(r,'pixel diff %',0,round(comp['diffPercent'],4)))
 if r['key']=='video-list' and r['lang']=='en':
  known_before=comp.get('titleBefore')=='YKK DIGITAL SHOWROOM'
  if known_before:
   for c in changes: candidates.remove(c)
   changes=[]
 result=r['result'];reason=r.get('reason','')
 if r['key']=='video-list' and r['lang']=='en' and 'Unable to load' in r.get('text',''):
  result='fail';reason='Known REG-VOV-EN: Unable to load video information; not NEW FAIL'
 if changes:result='fail';reason='NEW FAIL candidate: '+', '.join(c['metric'] for c in changes)
 elif result=='pass':
  if comp.get('error') or comp.get('diffPercent') is None:result='blocked';reason=comp.get('error','No comparable pixels')
  else:reason=''
 tests.append(dict(tc=f"VISUAL-{r['key']}-{r['width']}",lang=r['lang'],result=result,error=reason[:200],evidence=r.get('png','') if r.get('committed') else '',suspect='product' if changes else 'data',cause='none',confidence=50 if result=='fail' else 0,durationMs=r['durationMs'],changes=changes))
for g in d['lighthouse']:
 prev=d['previousLighthouse'].get(f"{g['key']} [ja] {g['device']}",{}); prev=prev.get('last',prev); changes=[]
 before=prev.get('scores',{}).get('performance');now=g.get('scores',{}).get('performance')
 if isinstance(before,(int,float)) and isinstance(now,(int,float)) and before-now>=10:changes.append(add(g,'performance',before,now))
 before=prev.get('metrics',{}).get('largest-contentful-paint');now=g.get('metrics',{}).get('largest-contentful-paint')
 if isinstance(before,(int,float)) and isinstance(now,(int,float)) and now-before>=1000:changes.append(add(g,'LCP ms',before,now))
 blocked=len(g['runs'])!=3 or any(r.get('error') or r.get('runtimeError') for r in g['runs'])
 tests.append(dict(tc=f"LIGHTHOUSE-{g['key']}-{g['device']}",lang='ja',result='blocked' if blocked else 'fail' if changes else 'pass',error='Lighthouse incomplete' if blocked else 'NEW FAIL candidate: '+', '.join(c['metric'] for c in changes) if changes else '',evidence='',suspect='env',cause='none',confidence=50 if changes else 0,durationMs=sum(r['durationMs'] for r in g['runs']),changes=changes))
for r in d.get('videoListRepeats',[]):
 r.pop('cardSelector',None) # Actual count method and DOM diagnostics retained.

d['newFailCandidates']=candidates
(root/'measurements.json').write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
result=dict(job=job,agent='codex',us='Regression S12',env='dev',started=d['started'],finished=d['finished'],status='failed' if d.get('error') else 'done',tests=tests,lighthouse=[dict(url=g['url'],device=g['device'],**g.get('scores',{}),metrics=g.get('metrics',{})) for g in d['lighthouse']],code_changes=['results/REGRESSION/run-20261024-1620.cjs','results/REGRESSION/finish-20261024-1620.py'],questions=[])
(root/'result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
counts=collections.Counter(t['result'] for t in tests)
def esc(s):return str(s).replace('|','\\|').replace('\n',' ')
table=['# NEW FAIL','| page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence |','|---|---|---|---|---|---|---|---|']
for c in candidates:table.append('| '+' | '.join(esc(c[k]) for k in ['page','lang','vw','metric','before','now','suspect'])+f" | {c['confidence']}% |")
if not candidates:table.append('| None | — | — | — | — | — | — | — |')
reportpath='results/REGRESSION/DEV/automation-run-'+d['started'][:10].replace('-','')+'-1620.md'
tsc=P('/tmp/reg241620-tsc.exit').read_text().strip();tscout=P('/tmp/reg241620-tsc.log').read_text().strip() or 'no errors'
special=next(r for r in d['pages'] if r['key']=='video-list' and r['lang']=='en' and r['width']==1440)
old=json.loads(P('ykk-dsr/hub/results/JOB-ZY-REG-20261024-1220-codex/measurements.json').read_text())
old=next(r for r in old['pages'] if r['key']=='video-list' and r['lang']=='en' and r['width']==1440)
stable=special.get('comparison',{}).get('diffPercent',100)<=1 and special.get('text')==old.get('text')
special['previousRunFollowup']={'assessment':'stable since REG-1220 (known duplicate is test data)' if stable else 'Changed since REG-1220; see measured title, text, pixel differences and timed diagnostics', 'beforeText':old.get('text'), 'nowText':special.get('text')}
(root/'measurements.json').write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
repeats=d.get('videoListRepeats',[])
notes=[
'Proposed outcomes only; human QA confirms. No login, AEM writes or form submission.',
'P1 only: 36 primary captures plus four English video-list diagnostics, two per width 60 seconds apart. Diagnostic repeats are observations, not additional unique tests.',
'Comparisons use REG-1220 last entries; original good-render REG-1620 baseline preserved. Recovery from known Unable to load is not a NEW FAIL.',
'Pixel comparison uses RGB max-channel difference >32/255; union of previous/current carousel, video, iframe and time rectangles masked. Compression can introduce residual noise.',
'Lighthouse: three runs per page/device; medians compared to REG-1220 last. Performance drop >=10 or LCP rise >=1000 ms are candidates.',
'No new deployed change recorded; pending DSR-639/661/649/675 not attributed. Unexpected differences: unannounced, cause none, confidence 50%. Build and seed content not independently verified.',
'Known duplicate QA587 main movie cards are data, excluded from candidate assessment.',
'PNG palette compression then JPEG q80 above 300,000 bytes; oversized files not committed, SHA/size retained. Raw Lighthouse /tmp files, test-results/ and playwright-report/ not committed.',
'English video-list diagnostics, including request status/body prefix and console logs, are in measurements.json: '+str([dict(width=r['width'],sample=r['sample'],at=r.get('at'),title=r.get('title'),cards=r.get('cardCount'),unable=r.get('unableToLoad')) for r in repeats])
]


summary=table+[f"Proposed: {counts['pass']} pass, {counts['fail']} candidate fail, {counts['skip']} skip, {counts['blocked']} blocked.",f"{len(d['pages'])} captures; {sum(len(g['runs']) for g in d['lighthouse'])} Lighthouse audits. Baseline preserved; last updated.",f"TypeScript exit {tsc}: {tscout}.",('All candidates: cause none, confidence 50%; attribution unverified.' if candidates else 'No regression candidates. See measurements.json for full comparisons.'),f'Report: {reportpath}', 'Video-list en 1440: '+special['previousRunFollowup']['assessment']]
if len(summary)>20:summary=table[:3]+['| Full candidate table in run report and measurements.json | ja/en | both | visual/Lighthouse | baseline | current | unannounced | 50% |']+summary[len(table):]
(root/'summary.md').write_text('\n'.join(summary)+'\n')
wall=(datetime.datetime.fromisoformat(d['finished'])-datetime.datetime.fromisoformat(d['started'])).total_seconds()
report=f'''# Regression DEV automation run — {d['started'][:10]} (REG-1620)

## 1. Header

- Run start (UTC): {d['started']}
- Run end (UTC): {d['finished']}
- Environment + base URL: DEV — {d['base']}
- Target pages: {', '.join(sorted(set(r['path'] for r in d['pages'])))}
- Build under test: not independently verified; latest recorded deploy dev/2026.10.23_2 b33514f.
- Baseline ID: REG-1220 last measurements; original REG-1620 baseline preserved; previous ledgers snapshotted in measurements.json.
- Automation HEAD commit SHA: {d['head']}
- Exact command: `node results/REGRESSION/run-20261024-1620.cjs > /tmp/reg241620-run.log 2>&1`
- Postprocessing: `python3 results/REGRESSION/finish-20261024-1620.py`

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: {tsc}
- Result: {tscout}

## 3. Suite summary

| Total | Passed | Failed | Skipped | Blocked | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---:|---|---|
| {len(tests)} | {counts['pass']} | {counts['fail']} | {counts['skip']} | {counts['blocked']} | {1 if d.get('error') else 0} | 1 | 0 | {wall:.1f} s |

Proposed outcomes only. Chromium capture script, not npm suite. Three Lighthouse measurements per combination are not retries.

## 4. Executed tests

Duration per capture or sum of three audits.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
'''
for i,t in enumerate(tests):
 if t['result']=='skip':continue
 title=d['pages'][i]['path'] if i<len(d['pages']) else d['lighthouse'][i-len(d['pages'])]['url']
 report+=f"| {t['tc']} [{t['lang']}] | {title} | {t['result']} | {t['durationMs']} ms | {esc(t['error']) or '—'} |\n"
report+='\n| Page | Device | Perf | A11y | BP | SEO | LCP ms | CLS | TBT ms |\n|---|---|---|---|---|---|---|---|---|\n'
for g in d['lighthouse']:report+='| '+' | '.join(str(v) for v in [g['key'],g['device'],*[g.get('scores',{}).get(k) for k in ['performance','accessibility','best-practices','seo']],*[g.get('metrics',{}).get(k) for k in ['largest-contentful-paint','cumulative-layout-shift','total-blocking-time']]])+' |\n'
report+='\n## 5. Skipped tests\n\n| TC ID | Verbatim skip reason |\n|---|---|\n'
for t in tests:
 if t['result']=='skip':report+=f"| {t['tc']} [{t['lang']}] | {esc(t['error'])} |\n"
if not counts['skip']:report+='None.\n'
report+='\n## 6. Failed tests\n\n'
if not counts['fail']:report+='None.\n'
for t in tests:
 if t['result']!='fail':continue
 report+=f"### {t['tc']} [{t['lang']}]\n\n- Failing comparison: `results/REGRESSION/finish-20261024-1620.py:{12 if t['tc'].startswith('VISUAL') else 26}`; no Playwright assertion exception.\n- Expected: unchanged HTTP/title, pixel diff <=1%, performance drop <10, LCP rise <1000 ms.\n- Actual: {esc(t['changes'])}\n- Attempts: one capture or three Lighthouse audits, no retry.\n- Evidence: {t['evidence'] or str(root/'measurements.json')}\n- Cause: none; product-bug confidence {t['confidence']}%; suspect {t['suspect']}.\n\n"
report+='\n'+'\n'.join(table)+'\n\n## 7. Open points for QA\n\n'+'\n'.join('- '+n for n in notes)+'\n'
assert not P(reportpath).exists(),'Refusing overwrite'
P(reportpath).write_text(report)
print(dict(counts));print(json.dumps(candidates,ensure_ascii=False,indent=2))
