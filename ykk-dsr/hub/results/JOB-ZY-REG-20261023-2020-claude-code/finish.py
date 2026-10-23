#!/usr/bin/env python3
# Postprocess JOB-ZY-REG-20261023-2020-claude-code: 3 Playwright JSON reports -> per TC/lang outcomes + ledger diff.
# Usage: python3 -I finish.py <overlay.json> <b.json> <c.json> <out.json>
import json, re, sys
TC = re.compile(r'^((?:DSR|SMOKE)-[A-Z0-9]+(?:-[A-Z0-9]+)?)')
rows = []
def walk(suite, path, run):
    p = path + ([suite['title']] if suite.get('title') else [])
    for spec in suite.get('specs', []):
        for t in spec.get('tests', []):
            if t.get('projectName') != 'chromium':
                continue
            res = t.get('results', [])
            last = res[-1] if res else {}
            st = t.get('status')
            outcome = 'skip' if st == 'skipped' else 'pass' if st in ('expected', 'flaky') else 'fail'
            title = spec['title']
            m = TC.match(title)
            tc = m.group(1) if m else title
            lm = re.search(r'\[(ja|en|cn)\]', title)
            lang = lm.group(1) if lm else next((x.split()[-1].strip('[]') for x in p[1:] if re.search(r'(^|\[)(ja|en|cn)(\]|$| )', x)), '-')
            if lang not in ('ja', 'en', 'cn'):
                lang = next((l for x in p[1:] for l in ('ja', 'en', 'cn') if re.search(rf'\b{l}\b', x)), '-')
            if tc == 'SMOKE-001':
                tc = title
            err = (last.get('error') or {}).get('message', '')
            err = re.sub(r'\x1b\[[0-9;]*m', '', err).replace('\n', ' ')[:200]
            first = res[0] if res else {}
            shots = [a['path'] for r in res[:1] for a in r.get('attachments', []) if a.get('name') == 'screenshot' and a.get('path')]
            skip_reason = '; '.join(a.get('description', '') for a in t.get('annotations', []) if a.get('type') in ('skip', 'fixme'))
            rows.append(dict(run=run, file=spec['file'], title=title, tc=tc, lang=lang, result=outcome, flaky=st == 'flaky',
                             duration_ms=sum(r.get('duration', 0) for r in res), error=err, shots=shots, skip_reason=skip_reason,
                             start=first.get('startTime')))
    for s in suite.get('suites', []):
        walk(s, p, run)
for run, f in zip(['overlay', 'B', 'C'], sys.argv[1:4]):
    rep = json.load(open(f))
    for s in rep['suites']:
        walk(s, [], run)
json.dump(rows, open(sys.argv[4], 'w'), ensure_ascii=False, indent=1)
print(len(rows))
