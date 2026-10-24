#!/usr/bin/env python3
# Writes result.json, copies one failed-test PNG per TC/lang (lossless recompress via repng.py) and updates the regression ledger
# for JOB-ZY-REG-20261024-1220-claude-code (R3 P1 + P2). Retest-spec rows get their own ledger key '<TC> (retest-<ticket>) [<lang>]' (538 keeps 'DSR-538-retest'). Usage: python3 -I write_outputs.py <rows.json> <times.json> <artifact-root>
import json, os, subprocess, sys
JOB = 'JOB-ZY-REG-20261024-1220-claude-code'
D = f'ykk-dsr/hub/results/{JOB}'
LEDGER = 'ykk-dsr/hub/results/REGRESSION/ledger.json'
rows = json.load(open(sys.argv[1])); times = json.load(open(sys.argv[2])); art = sys.argv[3]
known = {  # suspect, confidence, note (all cause none; unchanged from REG-1620 / REG-1200)
 'DSR-CATDL-007': ('product', 70, 'known: draft BUG-CAT-PDF-EXPOSE (DASHBOARD 🐞); DSR-655 Y4 client question'),
 'DSR-CATDL-016': ('product', 70, 'known: draft BUG-CAT-FORM-EN (DASHBOARD 🐞)'),
 'DSR-CATOV-001': ('data', 0, 'known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form")'),
 'DSR-CATOV-012': ('data', 0, "known: no list card 'QA190 PDF catalog' (TD-190 title not seeded)"),
 'DSR-ARTICLE-012': ('data', 30, 'known (JOB-23-06, IDLE-39): meta category has 1 tag ID ["product"], expected 2'),
 'DSR-ARTICLE-024': ('product', 50, 'known (IDLE-35/39): VIEW ALL STORIES href "#"'),
 'DSR-ECO-005': ('test', 30, 'known (IDLE-35/39)'),
 'DSR-ECO-006': ('test', 30, 'known (IDLE-35/39)'),
 'DSR-PLSP-002': ('test', 10, 'known; DSR-583 SP 2-column dismissed Not a bug 23/10 (KNOWN-FACTS) → Expected outdated'),
 'DSR-PLSP-003': ('test', 10, 'known; DSR-583 dismissed Not a bug 23/10 → Expected outdated'),
 'DSR-PLSP-005': ('test', 10, 'known; DSR-583 dismissed Not a bug 23/10 → Expected outdated'),
 'DSR-PRODLIST-001': ('test', 10, 'known; DSR-583 dismissed Not a bug 23/10 → Expected outdated'),
 'DSR-PRODLIST-002': ('test', 10, 'known; DSR-583 dismissed Not a bug 23/10 → Expected outdated'),
 'DSR-PRODLIST-003': ('test', 10, 'known; DSR-583 dismissed Not a bug 23/10 → Expected outdated'),
 'DSR-PRODLIST-004': ('test', 10, 'known; column-offset check returns 1 at 1440 (IDLE-35/39)'),
 'DSR-TOP-004': ('product', 40, 'known (IDLE-35/39)'), 'DSR-TOP-005': ('product', 40, 'known (IDLE-35/39)'),
 'DSR-TOP-006': ('product', 40, 'known (IDLE-35/39)'), 'DSR-TOP-007': ('product', 40, 'known (IDLE-35/39)'),
 # P2 (not in REG-1620; already fail in ledger from REG-1200)
 'DSR-ICON-006': ('product', 40, 'pre-existing (IDLE-35/39, REG-1200): console "Failed to load resource"'),
 'DSR-MOVIE-014': ('data', 20, 'pre-existing (IDLE-39, REG-1200): legacy DSR-173 test page'),
 'DSR-MOVIE-026': ('product', 60, 'known bug DSR-538 (@known-bug-DSR-538)'),
 'DSR-MOVIE-033': ('data', 20, 'pre-existing (IDLE-39, REG-1200): legacy DSR-173 test page'),
 'DSR-501-P2': ('data', 10, 'pre-existing (IDLE-30/35/39, REG-1200): qa501-* not re-seeded after overlay merge'),
 'DSR-501-P3': ('data', 10, 'pre-existing (IDLE-30/35/39, REG-1200): qa501-* not re-seeded after overlay merge'),
 # 566 first real run (DSR566_SLUG=qa566-news-01): skip -> fail = baseline, not NEW FAIL
 'DSR-NEWS-002': ('product', 70, 'known (REG-0420 baseline): required element backToList missing = DASHBOARD 🐞 NEWS-BACK (70%)'),
 'DSR-NEWS-006': ('product', 70, 'known (REG-0420 baseline): no Back to list / 一覧へ戻る link = DASHBOARD 🐞 NEWS-BACK (70%)'),
 'DSR-NEWS-007': ('test', 20, 'known (REG-0420 baseline): spec looks in /master/{lang}/query-index.json + /master/{lang}/news/query-index.json (both 404); qa566-news-01 ja/en are in root /query-index.json (template empty)'),
 'DSR-NEWS-012': ('data', 15, 'known (REG-0420 baseline): My List/share hidden = DASHBOARD NEWS-012 (no-mylist no-share option, 15% data)'),
}
artdir = {'overlay': 'tr-overlay', 'B': 'tr-b', 'C': 'tr-c'}
L = json.load(open(LEDGER))
agg = {}
for r in rows:
    tc = r['tc']
    if 'retest-DSR-538' in r['file']:
        tc = 'DSR-538-retest'
    elif 'retest' in r['file']:
        tid = r['file'].split('retest-')[1].split('.')[0]
        tc = f'{tc} (retest-{tid})'
    r['tc'] = tc
    agg.setdefault((tc, r['lang']), []).append(r)
os.makedirs(f'{D}/evidence', exist_ok=True)
tests, changes = [], []
for (tc, lang), rs in sorted(agg.items()):
    res = 'fail' if any(r['result'] == 'fail' for r in rs) else 'pass' if any(r['result'] == 'pass' for r in rs) else 'skip'
    key = f'{tc} [{lang}]'
    old = L.get(key, {})
    partial = False  # R3 P1 + P2: every spec ran in full, so every key is refreshed
    if old.get('last') != res and not partial:
        changes.append({'key': key, 'before': old.get('last'), 'now': res})
    t = {'tc': tc, 'lang': lang, 'result': res, 'subcases': len(rs), 'spec': 'tests/' + rs[0]['file']}
    if res == 'fail':
        f = next(r for r in rs if r['result'] == 'fail')
        s, c, n = known.get(tc, ('UNCLASSIFIED', None, 'UNCLASSIFIED'))
        ev = None
        if f['shots']:
            src = f['shots'][0].replace(os.getcwd() + '/test-results', f"{art}/{artdir[f['run']]}")
            ev = f'evidence/{tc}_{lang}.png'
            subprocess.run([sys.executable, '-I', f'{D}/repng.py', src, f'{D}/{ev}'], check=True)
        t.update(error=f['error'], evidence=ev, suspect=s, cause='none', confidence=c, note=n,
                 new_fail=old.get('last') == 'pass')
    if res == 'skip':
        t['skip_reason'] = rs[0]['skip_reason'][:200]
    if any(r['flaky'] for r in rs):
        t['flaky_subcases'] = [r['title'] for r in rs if r['flaky']]
        if res == 'pass':
            t['error'] = 'flaky: passed on retry'
    tests.append(t)
    if partial:
        t['ledger'] = 'unchanged (P2 key, only the @overlay subcase ran)'
        continue
    at = times[{'overlay': 'end_overlay', 'B': 'end_b', 'C': 'end_c'}[rs[-1]['run']]]
    L[key] = {'last': res, 'at': at, 'job': JOB, 'last_pass_at': at if res == 'pass' else old.get('last_pass_at'), 'spec': t['spec']}
json.dump(L, open(LEDGER, 'w'), indent=1, ensure_ascii=False); open(LEDGER, 'a').write('\n')
def cnt(run):
    rr = [r for r in rows if r['run'] == run]
    return {'tests': len(rr), 'pass': sum(r['result'] == 'pass' for r in rr), 'fail': sum(r['result'] == 'fail' for r in rr),
            'skip': sum(r['result'] == 'skip' for r in rr), 'flaky': sum(r['flaky'] for r in rr)}
runs = {'overlay': cnt('overlay'), 'p1_p2_non_overlay_auto': cnt('B'), 'smoke_664_173_untagged': cnt('C')}
for k, e in zip(runs, ['exit_overlay', 'exit_b', 'exit_c']):
    runs[k]['exit'] = int(times[e])
result = {
 'job': JOB, 'agent': 'claude-code', 'us': 'Regression S12 R3 full P1 + P2 + REG-VOV-EN probe', 'env': 'dev',
 'started': times['start_overlay'], 'finished': times['end_c'], 'status': 'done',
 'runs': runs,
 'new_fail': [f"{t['tc']} [{t['lang']}]" for t in tests if t.get('new_fail')],
 'ledger_status_changes': changes, 'tests': tests,
 'observations': 'observations.json + summary.md §Observations (no verdict)',
 'code_changes': [], 'reports': ['results/REGRESSION/DEV/automation-run-20261024-reg1220.md'], 'probe': 'probe-vov-en.json',
 'ledger': LEDGER, 'tsc_exit': 0, 'questions': [],
}
json.dump(result, open(f'{D}/result.json', 'w'), indent=1, ensure_ascii=False)
print(len(tests), result['new_fail'], sum(t['result'] == 'fail' for t in tests), len(changes), runs)
