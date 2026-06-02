# What the UI Already Has ✅ (Important Context)

From the repo structure and tests present:

Foundations
✅ React + TypeScript scaffold
✅ API layer (src/api/*)
✅ configuration.api.ts exists
✅ central api index
✅ Env handling (.env, .env.example)
✅ Linting, formatting, TS config
✅ Test setup (Jest / RTL style tests present)
✅ Domain UI (Partial)
✅ Project-level structure exists
✅ Milestones dashboard component exists
✅ Suite list view exists (with tests)
⚠️ These are isolated screens, not yet wired into full flows

This is good progress — the app is mid-Phase-1, not early.
UI TODO — Delta to Phase 1 Completion

# 6. Run Management UI (MISSING)
TODO

 Runs list per project

 Create Run UI (no Test Plan concept):

name

environment

suite selection

 Run detail page

 Start / Complete / Abort run actions

📌 This is required to unlock execution and results.

# 7. Test Execution UI (MISSING)
TODO

 Test execution screen:

show test steps

expected results

 Result submission UI:

status selector

notes/logs

 Persist result + update test status

 Retry UX on failure

📌 Without this, Phase 1 acceptance criteria #4–#6 are unmet.

# 8. Results & Reporting UI (MISSING)
TODO

 Results history per test

 Run report:

pass/fail/blocked/skipped counts

completion %

 Project-level reporting (minimal)

📌 Metrics exist in scope but not UI yet.

# 9. System Configuration UI (MOSTLY MISSING)
Exists

API layer for configuration

TODO

 Environments list per project

 Create / Edit / Delete environment UI

 Parameters list

 Parameter CRUD UI

 Secret masking

 Reporting rules config UI (as discussed)

# 10. Authorization-Aware UI (PENDING USER SERVICE)

Assuming BE enforces rules:

 Hide/disable forbidden actions

 Read-only states where applicable

 Graceful “not allowed” messaging
