**PRE-INDEX class: C** – `/master/en/test-space` is still HTTP 404 (content-bus 404, checked 2026-10-15T05:57:48Z); query-index present = false.

# JOB-20261015-03 – DSR-591 retest (DSR-552 breadcrumb), DEV, ja/en

The publish that QA reported has not reached DEV publish. The `/`, `/index` and `.plain.html` variants are also 404. `/master/ja/test-space` returns 200 for comparison.
**DSR-591: not proven fixed and not proven broken.** As the job requires, the en tests (001, 005, 011, 025) are `blocked` (suspect `data`) and were **not run**.

ja ran on chromium with 4 TCs: 005 and 011 from the retest spec, 001 and 025 from the main spec. All 4 pass, and 1 was flaky.
- 005 ja: `HOME > test space > QA Parent > QA Child > QA Grandchild` (5 items).
- 011 ja: every item equals its page title (each page returns 200), and none is empty or a node name.
- 001 ja: child trail and placement pass.
- 025 ja: flaky, passed on retry. On attempt 1 the BreadcrumbList JSON-LD was not yet in the DOM. On the retry it was present, with names equal to the trail and absolute item URLs. Suspect `test`: the main spec's `open()` reads JSON-LD once, without the settle wait that the retest spec uses.

HOME `/master/ja` and `/master/en` return 404. This is a known data gap and is noted only.
**Ask:** please check the activation of `/master/en/test-space` in DEV Author (publish, not just preview), confirm that it returns 200 on `.aem.live`, then requeue.
I did not change any code. The main spec overwrote committed evidence under `evidence/DSR-552/DEV/`, and I reverted it.
Run report: `results/DSR-552/DEV/automation-run-20261015-job03.md`.
