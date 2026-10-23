#!/usr/bin/env python3
# Writes result.json and updates the regression ledger for JOB-ZY-REG-20261023-1620-claude-code.
# Usage: python3 -I write_outputs.py <rows.json> <times.json>
import json, sys
JOB = 'JOB-ZY-REG-20261023-1620-claude-code'
D = f'ykk-dsr/hub/results/{JOB}'
LEDGER = 'ykk-dsr/hub/results/REGRESSION/ledger.json'
rows = json.load(open(sys.argv[1])); times = json.load(open(sys.argv[2]))
known = {  # suspect, confidence, note (all cause none; unchanged from REG-1200 / JOB-23-13/-15)
 'DSR-CATDL-007': ('product', 70, 'known: draft BUG-CAT-PDF-EXPOSE (DASHBOARD 🐞); DSR-655 Y4 client question'),
 'DSR-CATDL-016': ('product', 70, 'known: draft BUG-CAT-FORM-EN (DASHBOARD 🐞)'),
 'DSR-CATOV-001': ('data', 0, 'known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form"), still after 669 migration'),
 'DSR-CATOV-012': ('data', 0, "known: no list card 'QA190 PDF catalog' (TD-190 title not seeded); qa190-cat-pdf CF is in dsr-catalog-list"),
 'DSR-ARTICLE-012': ('data', 30, 'known (JOB-23-06, IDLE-39): meta category has 1 tag ID ["product"], expected 2'),
 'DSR-ARTICLE-024': ('product', 50, 'known (IDLE-35/39): VIEW ALL STORIES href "#"'),
 'DSR-ECO-005': ('test', 30, 'known (IDLE-35/39)'),
 'DSR-ECO-006': ('test', 30, 'known (IDLE-35/39)'),
 'DSR-PLSP-002': ('test', 10, 'known; DSR-583 SP 2-column dismissed Not a bug 23/10 (KNOWN-FACTS) → Expected outdated'),
 'DSR-PLSP-003': ('test', 10, 'known; DSR-583 dismissed Not a bug 23/10 → Expected outdated (timeout 30 s)'),
 'DSR-PLSP-005': ('test', 10, 'known; DSR-583 dismissed Not a bug 23/10 → Expected outdated (timeout 30 s)'),
 'DSR-PRODLIST-001': ('test', 10, 'known; DSR-583 dismissed Not a bug 23/10 → Expected outdated'),
 'DSR-PRODLIST-002': ('test', 10, 'known; DSR-583 dismissed Not a bug 23/10 → Expected outdated'),
 'DSR-PRODLIST-003': ('test', 10, 'known; DSR-583 dismissed Not a bug 23/10 → Expected outdated'),
 'DSR-PRODLIST-004': ('test', 10, 'known; column-offset check returns 1 at 1440 (IDLE-35/39)'),
 'DSR-TOP-004': ('product', 40, 'known (IDLE-35/39)'), 'DSR-TOP-005': ('product', 40, 'known (IDLE-35/39)'),
 'DSR-TOP-006': ('product', 40, 'known (IDLE-35/39)'), 'DSR-TOP-007': ('product', 40, 'known (IDLE-35/39)'),
}
L = json.load(open(LEDGER))
agg = {}
for r in rows:
    if 'retest' in r['file']:
        continue
    agg.setdefault((r['tc'], r['lang']), []).append(r)
tests = []
for (tc, lang), rs in sorted(agg.items()):
    res = 'fail' if any(r['result'] == 'fail' for r in rs) else 'pass' if any(r['result'] == 'pass' for r in rs) else 'skip'
    key = f'{tc} [{lang}]'
    old = L.get(key, {})
    t = {'tc': tc, 'lang': lang, 'result': res, 'subcases': len(rs), 'spec': 'tests/' + rs[0]['file']}
    if res == 'fail':
        f = next(r for r in rs if r['result'] == 'fail')
        s, c, n = known[tc]
        t.update(error=f['error'], evidence=f.get('evidence'), suspect=s, cause='none', confidence=c, note=n,
                 new_fail=old.get('last') == 'pass')
    if res == 'skip':
        t['skip_reason'] = rs[0]['skip_reason'][:200]
    if any(r['flaky'] for r in rs):
        t['error'] = 'flaky: passed on retry'
    tests.append(t)
    at = times[{'overlay': 'end_overlay', 'B': 'end_b', 'C': 'end_c'}[rs[-1]['run']]]
    L[key] = {'last': res, 'at': at, 'job': JOB, 'last_pass_at': at if res == 'pass' else old.get('last_pass_at'), 'spec': t['spec']}
json.dump(L, open(LEDGER, 'w'), indent=1, ensure_ascii=False); open(LEDGER, 'a').write('\n')
result = {
 'job': JOB, 'agent': 'claude-code', 'us': 'Regression S12 R2 (+R1) after DSR-669/670/671, catalog-detail refactor, DSR-667', 'env': 'dev',
 'started': times['start_overlay'], 'finished': times['end_c'], 'status': 'done',
 'runs': {'overlay': {'tests': 257, 'pass': 208, 'fail': 8, 'skip': 41, 'flaky': 0, 'exit': 1},
          'non_overlay_auto': {'tests': 118, 'pass': 66, 'fail': 24, 'skip': 28, 'flaky': 0, 'exit': 1},
          'smoke': {'tests': 1, 'pass': 1, 'fail': 0, 'skip': 0, 'flaky': 0, 'exit': 0}},
 'new_fail': [f"{t['tc']} [{t['lang']}]" for t in tests if t.get('new_fail')],
 'ledger_status_changes': 0, 'tests': tests,
 'observations': 'observations.json + summary.md §Observations (no verdict)',
 'code_changes': [], 'reports': ['results/REGRESSION/DEV/automation-run-20261023-reg1620.md'],
 'compare': f'{D}/compare.md', 'ledger': LEDGER, 'tsc_exit': 0, 'questions': [],
}
json.dump(result, open(f'{D}/result.json', 'w'), indent=1, ensure_ascii=False)
print(len(tests), result['new_fail'], sum(t['result'] == 'fail' for t in tests))
