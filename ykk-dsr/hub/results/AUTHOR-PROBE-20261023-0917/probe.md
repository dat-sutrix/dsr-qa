# AUTHOR PROBE 20261023-0917 (read-only, GET only)

Cookie age: 17h

| Check | Path | HTTP | Summary |
|---|---|---|---|
| 1 session user | `/libs/granite/security/currentuser.json` | 401 | non-JSON:  |
| 2 csrf token endpoint | `/libs/granite/csrf/token.json` | 200 |  |
| 3 content CF (Assets API) | `/api/assets/common/ja/movies/qa587-main.json` | 401 | non-JSON:  |
| 4 DSR CF (Assets API) | `/api/assets/dsr/ja/movies/standard/qa587-main.json` | 401 | non-JSON:  |
| 5 DSR CF jcr:content (replication props) | `/content/dam/dsr/ja/movies/standard/qa587-main/jcr:content.json` | 401 | non-JSON:  |
| 6 DSR CF data node | `/content/dam/dsr/ja/movies/standard/qa587-main/jcr:content/data/master.json` | 401 | non-JSON:  |
| 7 CF OpenAPI | `/adobe/sites/cf/fragments?path=/content/dam/dsr/ja/movies/standard&limit=1` | 401 | non-JSON:  |
| 8 find page qa529-01 | `/bin/querybuilder.json?path=/content/sites/digital-showroom&type=cq:Page&nodename=qa529-01&p.limit=5&p.hits=selective&p.properties=jcr:path` | 401 | non-JSON:  |
| 9 DAM nodes named qa587-main | `/bin/querybuilder.json?path=/content/dam&nodename=qa587-main&p.limit=20&p.hits=selective&p.properties=jcr:path` | 401 | non-JSON |
| 10 DAM qa587* (any) | `/bin/querybuilder.json?path=/content/dam&nodename=qa587*&p.limit=40&p.hits=selective&p.properties=jcr:path` | 401 | non-JSON |
| 11 OpenAPI dsr/ja/movies/standard | `/adobe/sites/cf/fragments?path=/content/dam/dsr/ja/movies/standard&limit=20` | 401 | non-JSON |
| 12 OpenAPI common/ja/movies | `/adobe/sites/cf/fragments?path=/content/dam/common/ja/movies&limit=20` | 401 | non-JSON |
| 13 page qa529-01 paths | `/bin/querybuilder.json?path=/content/sites/digital-showroom&type=cq:Page&nodename=qa529-01&p.limit=5&p.hits=selective&p.properties=jcr:path` | 401 | non-JSON |
