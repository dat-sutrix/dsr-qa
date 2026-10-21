#!/usr/bin/env bash
# READ-ONLY probe of AEM Author DEV with the shared account's browser session cookie.
# Run on VPS as user qa:  bash ~/dsr-qa/ykk-dsr/hub/tools/author/probe.sh
# Needs ~/.dsr-secrets/aem-dev.env containing AEM_LOGIN_TOKEN=<value of cookie "login-token">.
# Only GET requests. Never prints the cookie. Report is pushed via a temporary clone.
set -u
HOST="https://author-p192812-e2014374.adobeaemcloud.com"   # DEV only – hard-coded
SECRET="$HOME/.dsr-secrets/aem-dev.env"
[ -f "$SECRET" ] || { echo "Missing $SECRET"; exit 1; }
. "$SECRET"; [ -n "${AEM_LOGIN_TOKEN:-}" ] || { echo "AEM_LOGIN_TOKEN empty"; exit 1; }
AGE_H=$(( ( $(date +%s) - $(stat -c %Y "$SECRET") ) / 3600 ))

DAY=$(date -u +%Y%m%d-%H%M); TMP=$(mktemp -d); OUT="$TMP/probe.md"
get() {  # $1 label, $2 path  -> writes status + trimmed body summary
  local code body
  body=$(curl -s -o "$TMP/b" -w '%{http_code}' -H "Cookie: login-token=$AEM_LOGIN_TOKEN" -H "Accept: application/json" "$HOST$2")
  code=$body
  local summ; summ=$(python3 -I - "$TMP/b" <<'PY'
import json,sys,re
raw=open(sys.argv[1],'rb').read()[:400000].decode('utf-8','replace')
try:
  d=json.loads(raw)
except Exception:
  print("non-JSON: "+re.sub(r'\s+',' ',raw[:160])); sys.exit()
def keys(x,depth=0):
  if isinstance(x,dict):
    out=[]
    for k,v in list(x.items())[:40]:
      if isinstance(v,(dict,list)): out.append(f"{k}{{…}}" if isinstance(v,dict) else f"{k}[{len(v)}]")
      else:
        s=str(v); s=re.sub(r'[\w.+-]+@[\w-]+\.[\w.]+','<email>',s)
        out.append(f"{k}={s[:60]}")
    return "; ".join(out)
  if isinstance(x,list): return f"list[{len(x)}] " + (keys(x[0]) if x else "")
  return str(x)[:160]
print(keys(d))
PY
)
  printf '| %s | `%s` | %s | %s |\n' "$1" "$2" "$code" "${summ//|//}" >> "$OUT"
}

{ echo "# AUTHOR PROBE $DAY (read-only, GET only)"; echo; echo "Cookie age: ${AGE_H}h"; echo
  echo "| Check | Path | HTTP | Summary |"; echo "|---|---|---|---|"; } > "$OUT"
get "1 session user"        "/libs/granite/security/currentuser.json"
get "2 csrf token endpoint" "/libs/granite/csrf/token.json"
get "3 content CF (Assets API)" "/api/assets/common/ja/movies/qa587-main.json"
get "4 DSR CF (Assets API)"     "/api/assets/dsr/ja/movies/standard/qa587-main.json"
get "5 DSR CF jcr:content (replication props)" "/content/dam/dsr/ja/movies/standard/qa587-main/jcr:content.json"
get "6 DSR CF data node"    "/content/dam/dsr/ja/movies/standard/qa587-main/jcr:content/data/master.json"
get "7 CF OpenAPI"          "/adobe/sites/cf/fragments?path=/content/dam/dsr/ja/movies/standard&limit=1"
get "8 find page qa529-01"  "/bin/querybuilder.json?path=/content/sites/digital-showroom&type=cq:Page&nodename=qa529-01&p.limit=5&p.hits=selective&p.properties=jcr:path"
sed -i 's/login-token=[^;" ]*/login-token=<hidden>/g' "$OUT"
cat "$OUT"

# Push report via a temporary clone (does not touch runner clones)
REPO="$TMP/repo"
if gh repo clone dat-sutrix/dsr-qa "$REPO" -- --depth 1 -q 2>/dev/null; then
  D="$REPO/ykk-dsr/hub/results/AUTHOR-PROBE-$DAY"; mkdir -p "$D"; cp "$OUT" "$D/probe.md"
  git -C "$REPO" add -A && git -C "$REPO" -c user.name="qa-vps" -c user.email="qa-vps@localhost" commit -qm "[author-probe] $DAY read-only probe" \
    && git -C "$REPO" push -q origin HEAD:main && echo "Pushed: ykk-dsr/hub/results/AUTHOR-PROBE-$DAY/probe.md"
else echo "Could not clone repo; copy the table above to Claude."; fi
rm -rf "$TMP"
