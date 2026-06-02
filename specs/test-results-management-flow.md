# test-results-management-flow.md

## Overview
This document defines **Test Results Management** flows in TCMS. It covers how users:
- view results at different levels (project/run/test),
- record results,
- update/correct results,
- derive reporting summaries,
- and handle retests / re-execution patterns.

Primary service:
- **Results Service** (base: `http://localhost:3000`)

Related service (for context during execution):
- **Test Case Service** (to show steps/expected outcomes for the test case linked to a test instance)

---

## Conventions

### Base URL
- Results Service: `http://localhost:3000`

### Auth
All endpoints except `/health` require:
- `Authorization: Bearer <authToken>`

### Soft delete
Delete operations may be soft or hard depending on implementation. UI should treat delete as **restricted/admin-only** in Phase 1.

### IDs
MongoDB-style strings:
- `projectId`, `runId`, `testId`, `resultId`

---

## Core Schemas (canonical)

### Result
```json
{
  "_id": "ObjectId",
  "testId": "ObjectId",
  "projectId": "ObjectId",

  "status": "Passed|Failed|Blocked|Skipped|Retest",
  "executedBy": "ObjectId",

  "startTime": "ISODate",
  "endTime": "ISODate",
  "duration": 0,

  "logs": "string",
  "isActive": true,

  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
ResultCreateRequest (recommended minimum)
{
  "testId": "ObjectId",
  "projectId": "ObjectId",
  "status": "Passed|Failed|Blocked|Skipped|Retest",
  "executedBy": "ObjectId",
  "startTime": "ISODate",
  "endTime": "ISODate",
  "logs": "string"
}
ResultUpdateRequest (partial)
{
  "status": "Passed|Failed|Blocked|Skipped|Retest",
  "endTime": "ISODate",
  "logs": "string"
}
Flow 0 — Health Check (Ops)
Goal: verify Results Service is running.

API Call
GET /health

Response (shape implied):

{ "status": "ok" }
Acceptance Criteria
Scenario: Results service health check
  When the health endpoint is called
  Then the service returns status ok
Flow 1 — Record a Result (Primary Flow)
Goal: executor records an outcome for a test instance.

UI Steps
User opens a Test in a Run (execution screen).

User sets:

status (Passed/Failed/Blocked/Skipped/Retest)

logs/notes (optional)

start/end time (auto-captured by UI)

User clicks Save Result.

UI shows result saved and updates test/run summary.

API Calls
Create a result:

POST /results

Request:

{
  "testId": "ObjectId",
  "projectId": "ObjectId",
  "status": "Failed",
  "executedBy": "ObjectId",
  "startTime": "ISODate",
  "endTime": "ISODate",
  "logs": "Assertion failed at step 2"
}
Response: Result

(Recommended) Ensure test instance marked completed (if not already):

PUT /tests/:testId

{ "status": "Completed" }
Acceptance Criteria
Scenario: Record a test result
  Given the user is executing a test in a run
  When the user submits a result with a valid status
  Then a result record is created for that test
  And the UI reflects the new result in summaries
Flow 2 — View Results by Test (Test History)
Goal: see all results recorded for a single test instance.

UI Steps
Open a test in a run.

Navigate to Results/History panel.

Show list ordered newest first:

status, executedBy, start/end/duration, logs preview

API Call
GET /results/test/:testId → Array<Result>

Acceptance Criteria
Scenario: View results for a test instance
  Given results exist for a test
  When the user opens the test results panel
  Then the system shows all results for that test
Flow 3 — View Results by Run (Run Report)
Goal: see aggregated results for a run.

UI Steps
Open a run.

Navigate to "Run Report".

Display:

Pass/Fail/Blocked/Skipped/Retest counts

Completion rate

Table of tests with latest result status

Optional: export (Phase 2)

API Calls
GET /results/run/:runId → Array<Result>

(Plus) GET /tests/run/:runId → Array<Test> (to map latest result to each test)

Client-side aggregation (Phase 1)
Latest result per test = max(createdAt)

Acceptance Criteria
Scenario: View run results report
  Given a run has tests and results
  When the user opens the run report
  Then the system shows aggregated counts by status
  And each test displays its latest result
Flow 4 — View Results by Project (Project Reporting)
Goal: show results across all runs for a project.

UI Steps
Open project → Reports.

Select date range (Phase 2) or show recent activity (Phase 1).

Show:

total executions

pass rate

failures trend (Phase 2 chart)

latest failed tests list

API Call
GET /results/project/:projectId → Array<Result>

Acceptance Criteria
Scenario: View project results
  Given a project has multiple runs
  When the user opens project reports
  Then the system shows aggregated result metrics for the project
Flow 5 — View Single Result (Details)
Goal: open a result record and see full details (incl. logs).

UI Steps
Click a result row in history/report.

Show:

status, executedBy, timestamps, duration

full logs (expandable)

link back to test/run

API Call
GET /results/:id → Result

Acceptance Criteria
Scenario: View a single result
  Given a result exists
  When the user opens the result detail view
  Then the system shows full result information including logs
Flow 6 — Update/Correct a Result (Controlled)
Goal: correct a result after saving (requires policy).

Policy recommendation (Phase 1)
Allow update only if:

user is admin OR same executor

AND within a short time window OR run not completed (policy-defined)

UI Steps
Open result detail.

Click Edit (if allowed).

Modify status/logs.

Save.

API Call
PUT /results/:id

Request:

{ "status": "Retest", "logs": "Marked for re-run after fix", "endTime": "ISODate" }
Response: updated Result

Acceptance Criteria
Scenario: Update a result
  Given the user is authorized to edit results
  When the user updates status or logs
  Then the result is updated
  And the change is reflected in run/project reporting
Flow 7 — Delete a Result (Admin Only)
Goal: remove an invalid result (rare; audit-sensitive).

UI Steps
Open result detail.

Click Delete (admin only).

Confirm modal.

Result disappears from history and aggregates recalc.

API Call
DELETE /results/:id

Response: success or deleted entity (implementation-dependent)

Acceptance Criteria
Scenario: Delete a result (admin)
  Given the user is an admin
  When the user deletes a result
  Then the result is removed from the system
  And reporting updates accordingly
Flow 8 — Search Results (Optional)
Goal: find results by keyword/status.

UI Steps
Search input on results list/report.

User searches (e.g., "failed", "timeout").

Results list updates.

API Call
GET /results/search?query=<q>&fields=status,comment

Note: collection shows example fields; align actual fields with implementation (logs vs comment).

Acceptance Criteria
Scenario: Search results
  Given many results exist
  When the user searches by keyword
  Then matching results are returned
Flow 9 — Retest / Re-execution Pattern (Recommended)
Goal: support retest without mutating past results.

Recommended behavior (Phase 1)
Do not overwrite the old result.

Create a new Result with status Retest or create a new result upon re-run.

Optionally set the Test back to In Progress before new execution.

UI Steps
From failed result, user clicks “Retest”.

UI sets test to In Progress (optional).

User executes again and saves a new result.

API Calls
PUT /tests/:testId → { "status": "In Progress" } (optional)

POST /results → new result record

Acceptance Criteria
Scenario: Retest creates a new result record
  Given a test has a failed result
  When the user retests and submits again
  Then a new result record is created
  And the latest result becomes the current outcome for reporting
Reporting Rules (Phase 1, client-side)
Latest result per test = result with newest createdAt for that testId

Run status breakdown computed from latest results per test:

Passed/Failed/Blocked/Skipped/Retest

Pass rate:

passed / totalCompleted (define whether Blocked/Skipped count as completed)

Error Handling & UX Rules (Phase 1)
401 → redirect to login

404 → show not found

400 validation errors → show inline messages (status required, invalid status)

If result save fails:

keep local draft, show retry button

Phase 1 Definition of Done (Test Results Management)
User can create a result for a test.

User can view results by test/run/project.

Run report shows accurate aggregates based on latest results.

Result detail view works.

Update/delete restricted by role (at least UI-gated; API enforcement Phase 2 if needed).

Retest creates a new result record (no history loss).

notes: 
- Only Ready test cases can be added to runs (Phase 1).
- Draft cases are visible but not executable.
- Deprecated cases remain executable in existing runs but cannot be added to new runs.
