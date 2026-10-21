# AUTHOR PROBE 20261021-1019 (read-only, GET only)

Cookie age: 0h

| Check | Path | HTTP | Summary |
|---|---|---|---|
| 1 session user | `/libs/granite/security/currentuser.json` | 200 | type=user; authorizableId_xss=<email>; authorizableId=<email>; name_xss=Agent QA; name=Agent QA; home=<hidden> isImpersonated=False |
| 2 csrf token endpoint | `/libs/granite/csrf/token.json` | 200 | token=<hidden> |
| 3 content CF (Assets API) | `/api/assets/common/ja/movies/qa587-main.json` | 404 | non-JSON: <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN"> <html> <head><title>404 Resource at '/api/assets/common/ja/movies/qa587-main.json' not found: No resource |
| 4 DSR CF (Assets API) | `/api/assets/dsr/ja/movies/standard/qa587-main.json` | 404 | non-JSON: <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN"> <html> <head><title>404 Resource at '/api/assets/dsr/ja/movies/standard/qa587-main.json' not found: No re |
| 5 DSR CF jcr:content (replication props) | `/content/dam/dsr/ja/movies/standard/qa587-main/jcr:content.json` | 404 | non-JSON: <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN"> <html> <head><title>404 Resource at '/content/dam/dsr/ja/movies/standard/qa587-main/jcr:content.json' not |
| 6 DSR CF data node | `/content/dam/dsr/ja/movies/standard/qa587-main/jcr:content/data/master.json` | 404 | non-JSON: <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN"> <html> <head><title>404 Resource at '/content/dam/dsr/ja/movies/standard/qa587-main/jcr:content/data/mast |
| 7 CF OpenAPI | `/adobe/sites/cf/fragments?path=/content/dam/dsr/ja/movies/standard&limit=1` | 200 | items[1]; cursor=F2Dfc5fWi0VwSChE8z2-UiaVFIcNj3pUegc0RAR8WM9nfe_IpL9k0UhM9sbD |
| 8 find page qa529-01 | `/bin/querybuilder.json?path=/content/sites/digital-showroom&type=cq:Page&nodename=qa529-01&p.limit=5&p.hits=selective&p.properties=jcr:path` | 200 | success=True; results=2; total=2; more=False; offset=0; hits[2] |
