# DSR-552 – data-testid map

Live DEV selectors independently observed 2026-10-12 on Japanese T1 child. All breadcrumb locators are scoped to breadcrumb.

| data-testid | Element | Attribute | Cardinality | TCs |
|---|---|---|---|---|
| breadcrumb | nav | non-empty aria-label | One except HOME/404 | All runnable |
| breadcrumb-list | ol | — | One | 005, 027 |
| breadcrumb-item | li | — | Repeated | Trail checks |
| breadcrumb-link | a | href | Ancestors | 002, 004, 017, 028 |
| breadcrumb-current | span | aria-current=page | Last only | 003, 027 |
| breadcrumb-arrow | img | alt empty | Between items | 027, 035 |
| breadcrumb-jsonld | script | type=application/ld+json | Pending testid | 008, 009, 025 |

BreadcrumbList was found in **head**, one script on Japanese T1 child. Raw script and nav markup are in evidence/DSR-552/DEV/preflight.json. Locator always scans all document `script[type="application/ld+json"]`, parses each and selects @type BreadcrumbList, including arrays and @graph. Location is not assumed in tests. Invalid JSON raises an error.

HOME href observed /master/ja; trailing-slash normalization applies. Arrows currently use absolute DEV URLs. TC-035 retains the same-host check for every environment. Header has no supplied testid: TC-028 uses semantic header links with a TODO. Section screenshot/placement uses stable authored data-auto-block=breadcrumb, rather than generated classes.
