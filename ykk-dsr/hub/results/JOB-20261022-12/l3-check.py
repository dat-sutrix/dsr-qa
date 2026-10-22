import json,re,sys,time,urllib.request
plan=json.load(open(sys.argv[1])); out=sys.argv[2]
H={'page':'https://main--dsr-eds-dev--sutrix-projects.aem.page','live':'https://main--dsr-eds-dev--sutrix-projects.aem.live'}
def url(p):
    m=re.match(r'/content/dam/dsr/(ja|en)/(catalogs|movies/standard)/(.+)$',p)
    return f"/{m[1]}/library/{'catalog' if m[2]=='catalogs' else 'video'}/{m[3]}"
jobs=[]
for st in plan:
    op=st.get('op','')
    if op.startswith('replicate:'):
        tier='page' if 'preview' in op else 'live'
        jobs+= [(tier,url(p),p) for p in st['body']['paths']]
def get(u):
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers={'Cache-Control':'no-cache','User-Agent':'dsr-qa-verify'}),timeout=30)
        return r.status,r.read().decode('utf-8','replace')
    except urllib.error.HTTPError as e: return e.code,''
    except Exception as e: return 0,str(e)[:100]
res={}
deadline=time.time()+600
while True:
    for tier,u,p in jobs:
        if res.get((tier,u),{}).get('ok'): continue
        s,b=get(H[tier]+u+'?cb=%d'%time.time())
        t=re.search(r'<title>(.*?)</title>',b,re.S); og=re.search(r'<meta[^>]+property="og:image"[^>]+content="([^"]*)"',b)
        res[(tier,u)]=dict(tier=tier,url=H[tier]+u,path=p,status=s,title=(t[1].strip() if t else ''),og_image=(og[1] if og else None),ok=(s==200 and bool(t and t[1].strip())))
    if all(r['ok'] for r in res.values()) or time.time()>deadline: break
    time.sleep(60)
json.dump(list(res.values()),open(out,'w'),ensure_ascii=False,indent=1)
for r in res.values(): print(('PASS' if r['ok'] else 'FAIL'),r['tier'],r['status'],r['url'].split('.aem.')[1][4:],'|',r['title'][:40],'| og:',(r['og_image'] or '-')[:90])
