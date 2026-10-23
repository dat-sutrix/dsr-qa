#!/usr/bin/env python3
# Adds NEW FAIL retries (2x, retries 0) + TZ diagnostic + step-4 observations to result.json of JOB-ZY-REG-20261024-0020-claude-code.
# Usage: python3 -I finalize.py <times.json> <retry.json> <tzjst.json>
import json, sys
D = 'ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code'
times = json.load(open(sys.argv[1]))
def outcomes(f):
    out = []
    def walk(s):
        for sp in s.get('specs', []):
            for t in sp.get('tests', []):
                for r in t.get('results', []):
                    out.append({'title': sp['title'], 'status': r['status']})
        for x in s.get('suites', []): walk(x)
    for s in json.load(open(f))['suites']: walk(s)
    return out
res = json.load(open(f'{D}/result.json'))
raw = json.load(open(f'{D}/catv-raw.json'))
res['new_fail_retry'] = {
 'command': 'ENV=dev npx playwright test tests/catalog-video/DSR-557.catalog-video.spec.ts --project=chromium --grep "DSR-CATV-01[89]" --repeat-each 2 --retries 0',
 'started': times['start_retry'], 'finished': times['end_retry'], 'exit': int(times['exit_retry']),
 'outcomes': outcomes(sys.argv[2]),
 'diagnostic_tz_asia_tokyo': {'command': 'TZ=Asia/Tokyo ENV=dev npx playwright test tests/catalog-video/DSR-557.catalog-video.spec.ts --project=chromium --grep "DSR-CATV-01[89]|DSR-CATV-020" --retries 0',
   'started': times['start_tz'], 'finished': times['end_tz'], 'exit': int(times['exit_tz']), 'outcomes': outcomes(sys.argv[3])},
 'raw': {'file': 'catv-raw.json', 'host_tz': raw['hostTZ'], 'list_page_http': {r['tz'] + ' ' + r['url'].split('/master/')[1]: r['httpStatus'] for r in raw['runs']},
         'query_http': {r['tz'] + ' ' + r['url'].split('/master/')[1]: r.get('queryStatus') for r in raw['runs']},
         'query_json': ['q_dsr-catalog-list_ja.json', 'q_dsr-catalog-list_en.json']},
 'finding': 'QA190 NEW 10 (publishDate 2026-10-13) and QA190 UPD 10 (updateDate 2026-10-13) show NEW/UPDATE with browser date 2026-10-23 (Europe/Berlin) and no label with browser date 2026-10-24 (Asia/Tokyo). Test computes today in JST, so between 15:00Z and 22:00Z it expects no label while the product (browser-local date) still shows it. Data unchanged vs REG-2020.',
}
for t in res['tests']:
    if t['tc'] in ('DSR-CATV-018', 'DSR-CATV-019'):
        t['retry'] = 'fail 2/2 (host TZ); pass with browser TZ Asia/Tokyo'
res['finished'] = times['end_tz']
res['observations'] = {'file': 'observations.json',
 '4a_REG-VIDLIST': 'en page 1 shows "QA587 main movie" twice with different hrefs (/en/library/video/QA587_Upper, /en/library/video/qa587-main) = 2 different DSR CFs (/content/dam/dsr/en/movies/standard/QA587_Upper and .../qa587-main) that both reference the same content CF /content/dam/common/en/movies/qa587-main → data, not a duplicated id. A 3rd DSR CF .../standard/qa587/qa587-sub also references it (not on page 1). ja: shown once (.../ja/movies/standard/qa587-main). Raw: q_video-search_{ja,en}_0.json',
 '4b_566': 'not found: no news-detail page under a new path. /master/{ja,en}/test-space/test-news-detail-template and /{ja,en}/test-space/test-news-detail-template are 404 on .live and .page. fixtures/paths.ts has no news-detail entry. query-index candidates (200 on .live/.page): /master/en/test-space/qa566-news-01 (QA page, fixture option DSR566_SLUG), /master/ja/test-space/qa566-news-01 (200, not in query-index), /master/en/test-space/dsr-357-news-detail (old page), /ja/news/2024/recruitment (template news-article)',
 '4c_headers': '.live = .page; all unchanged vs REG-2020; footer.js first observed: Tue, 15 Sep 2026 06:07:33 GMT. Not verified ≠ not deployed (README §7)'}
res['reports'] = ['results/REGRESSION/DEV/automation-run-20261023-reg0020.md']
res['code_changes'] = []
json.dump(res, open(f'{D}/result.json', 'w'), indent=1, ensure_ascii=False)
print(res['new_fail_retry']['outcomes'], res['new_fail_retry']['diagnostic_tz_asia_tokyo']['outcomes'])
