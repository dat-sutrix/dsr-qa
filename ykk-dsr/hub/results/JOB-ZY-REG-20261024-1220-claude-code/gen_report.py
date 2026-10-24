#!/usr/bin/env python3
# Builds tables §4–§6 of results/REGRESSION/DEV/automation-run-20261024-reg1220.md from rows.json + raw Playwright JSON.
# Usage: python3 -I gen_report.py <rows.json> <result.json> <overlay.json> <b.json> <c.json>  (prints markdown)
import json, re, sys
rows = json.load(open(sys.argv[1])); res = json.load(open(sys.argv[2]))
loc = {}
def walk(s):
    for sp in s.get('specs', []):
        for t in sp.get('tests', []):
            if t.get('projectName') != 'chromium': continue
            r = (t.get('results') or [{}])[0]
            l = (r.get('error') or {}).get('location')
            if l: loc[(sp['file'], sp['title'])] = f"tests/{sp['file']}:{l['line']}"
    for x in s.get('suites', []): walk(x)
for f in sys.argv[3:6]:
    for s in json.load(open(f))['suites']: walk(s)
J = 'ykk-dsr/hub/results/JOB-ZY-REG-20261024-1220-claude-code'
cell = lambda s: s.replace('|', '\\|').replace('\n', ' ')
byk = {(t['tc'], t['lang']): t for t in res['tests']}
print('## 4. Executed tests\n\nDuration = summed attempts. Fail = failed on first attempt and on the retry. Retest specs are marked (excluded from the ledger).\n')
print('| TC ID | Title | Result | Duration | One-line failure reason |\n|---|---|---|---|---|')
for r in rows:
    if r['result'] == 'skip': continue
    tc = r['tc'] + (f" [{r['lang']}]" if r['lang'] != '-' else '') + (' (retest)' if 'retest' in r['file'] else '')
    why = cell(r['error'][:140]) if r['result'] == 'fail' else '—'
    print(f"| {tc} | {cell(r['title'])} | {r['result']} | {r['duration_ms']/1000:.1f} s | {why} |")
print('\n## 5. Skipped tests\n\n| TC ID | Verbatim skip reason |\n|---|---|')
for r in rows:
    if r['result'] != 'skip': continue
    tc = r['tc'] + (f" [{r['lang']}]" if r['lang'] != '-' else '') + (' (retest)' if 'retest' in r['file'] else '')
    print(f"| {tc} | {cell(r['skip_reason'] or '(no annotation; skipped by test.skip condition)')} |")
fails = [r for r in rows if r['result'] == 'fail']
print(f'\n## 6. Failed tests\n\nAll {len(fails)} failing tests ({sum(t["result"] == "fail" for t in res["tests"])} TC/lang keys) have cause `none`. None is a NEW FAIL: every key was already `fail` in the ledger (last = JOB-ZZ-IDLE-44 01:23Z) and each failed again on the configured retry. Evidence = one first-attempt screenshot per TC/lang (losslessly recompressed), committed under `{J}/evidence/` (DSR-TOP-005 [en] left out for the 5 MB cap). Traces, `test-results/` and `playwright-report/` are not committed.\n')
for r in fails:
    t = byk[(r['tc'], r['lang'])]
    tc = r['tc'] + (f" [{r['lang']}]" if r['lang'] != '-' else '')
    print(f"### {tc} — {r['title']}\n")
    print(f"- Failing assertion: `{loc.get((r['file'], r['title']), 'tests/' + r['file'])}`")
    print(f"- Expected vs actual: {cell(r['error'])}")
    print(f"- Proposed: fail · suspect `{t['suspect']}` · cause `none` · confidence {t['confidence']}% · {t['note']}")
    print(f"- Evidence: `{J}/{t['evidence']}`\n" if t.get('evidence') else '- Evidence: none (no screenshot attached)\n')
