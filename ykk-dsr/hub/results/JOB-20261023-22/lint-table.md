# JOB-20261023-22 – lint before/after (22 manifests, DEV Author GET only)

| Manifest | FAIL before | model FAIL before | WARN before | FAIL after | model FAIL after | WARN after | other FAIL after |
|---|---:|---:|---:|---:|---:|---:|---|
| BUGCHK-190-FORM | 0 | 0 | 0 | 0 | 0 | 0 | — |
| BUGCHK-586-02 | 2 | 2 | 2 | 0 | 0 | 2 | — |
| P1B-PROBE | 0 | 0 | 1 | 0 | 0 | 1 | — |
| REPUBLISH-OVL-20261022 | 56 | 56 | 28 | 0 | 0 | 56 | — |
| TD-190-CAT-CORE.resolved | 16 | 16 | 0 | 2 | 0 | 0 | ref-exists:catalog 2 |
| TD-190-CAT-CORE | 16 | 16 | 0 | 8 | 0 | 0 | field-name:catalogId 8 |
| TD-190-DSR | 32 | 32 | 0 | 0 | 0 | 0 | — |
| TD-529-META | 0 | 0 | 1 | 0 | 0 | 1 | — |
| TD-557-DAM.resolved | 4 | 4 | 0 | 0 | 0 | 0 | — |
| TD-557-DAM | YAML parse error | – | – | 0 | 0 | 0 | — |
| TD-557-YOUKU.resolved | 4 | 4 | 0 | 0 | 0 | 0 | — |
| TD-557-YOUKU | 4 | 4 | 0 | 0 | 0 | 0 | — |
| TD-566-FIX | 0 | 0 | 1 | 0 | 0 | 1 | — |
| TD-586-01-02.resolved | 4 | 4 | 4 | 0 | 0 | 4 | — |
| TD-586-01-02 | 8 | 4 | 0 | 4 | 0 | 0 | lang-pair 4 |
| TD-587-01.resolved | 10 | 4 | 0 | 6 | 0 | 0 | rename-source 3, rename-target-free 3 |
| TD-587-01 | 4 | 4 | 0 | 0 | 0 | 0 | — |
| TD-587-14-15.resolved | 36 | 18 | 0 | 18 | 0 | 0 | lang-pair 18 |
| TD-587-14-15 | 36 | 18 | 0 | 18 | 0 | 0 | lang-pair 18 |
| TD-587-NEG | 10 | 10 | 9 | 0 | 0 | 9 | — |
| TD-587-PHASE2 | 4 | 4 | 3 | 0 | 0 | 3 | — |
| TD-654-02-08 | 10 | 10 | 7 | 0 | 0 | 7 | — |

Totals: model-current/model-exists FAIL 210 → 0. WARN increase after = flag-set:isActive WARN on republish-only items (no fields), visible now that the model resolves. Raw: lint-before/, lint-after/.
