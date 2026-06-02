# test-plan-and-run-management-flow.md

## Overview
This document defines **Test Plan** and **Test Run (Execution)** management flows in TCMS.

**Important note on terminology (current APIs):**
- The current Postman collection does **not** expose a dedicated “Test Plan” resource.
- In Phase 1, “Test Plan” is treated as a **UI construct** that selects:
  - Project
  - Scope (Suites/Sections/Test Cases)
  - Environment (string)
  - Optional metadata (name/description/type)
- The “plan” becomes actionable when you **Create a Run** in the **Results Service**, then create **Test instances** for the selected test cases.

Primary services:
- **Results Service** (Runs, Tests, Results)
- **Test Case Service** (to select Suites/Sections/Test Cases)
Optional:
- **Configuration Service** (Environments) for environment selection UX

---

## Conventions

### Base URLs
- Results Service: `http://localhost:3000`
- Test Case Service: `http://localhost:3000`
- Configuration Service: `http://localhost:3000`

### Auth
All endpoints except `/health` require:
- `Authorization: Bearer <token>`

### IDs
All IDs are strings (MongoDB ObjectId style): `projectId`, `runId`, `testId`, `testCaseId`, etc.

---

## Core Schemas (canonical)

### Run (Results Service)
```json
{
  "_id": "ObjectId",
  "projectId": "ObjectId",
  "name": "string",
  "description": "string",
  "type": "Manual|Automated|Scheduled",
  "status": "Pending|Running|Completed|Aborted",
  "environment": "string",
  "executedBy": "ObjectId",
  "startTime": "ISODate",
  "endTime": "ISODate",
  "duration": 0,
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
Test (Test Instance inside a Run)
{
  "_id": "ObjectId",
  "runId": "ObjectId",
  "projectId": "ObjectId",
  "testCaseId": "ObjectId",
  "suiteId": "ObjectId",
  "sectionId": "ObjectId",
  "title": "string",
  "status": "Not Started|In Progress|Completed",
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
Result (Execution outcome for a Test)
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
Flow 0 — Service Health Checks (Ops)
Goal: verify services are running.

API Calls
GET ResultsService /health → { "status": "ok" } (shape implied)

GET TestCaseService /health → { "status": "ok" }

Acceptance Criteria
Scenario: Results Service health check
  When the health endpoint is called
  Then the service returns status ok
Flow 1 — Test Plan Builder (Scope Selection)
Goal: Build a test plan by selecting test cases (without creating a run yet).

UI Steps
Navigate: Project → Test Plans → "New Plan"

Enter plan metadata:

Plan name (required)

Description (optional)

Type: Manual / Automated / Scheduled

Environment (dropdown or free text)

Select scope:

Choose one or more Suites

Optionally filter down to Sections

Select Test Cases (multi-select)

Review selected test cases count

Click Create Run (moves into Flow 2)

API Calls (data for selection)
Suites:

GET TestCaseService /suites (filter client-side by projectId if needed)

Sections:

GET TestCaseService /sections/suite/:suiteId

Test Cases:

GET TestCaseService /testcases/section/:sectionId

Optional environment list (nice UX)
GET ConfigurationService /api/environments (filter by projectId client-side if needed)

Acceptance Criteria
Scenario: Build a test plan scope
  Given the user is authenticated
  When the user selects test cases for a project
  Then the plan summary shows the selected test case count
  And the user can proceed to create a run
Flow 2 — Create Test Run from Plan
Goal: Create a Run that represents the execution container.

UI Steps
From Plan Builder, click "Create Run"

Confirm run metadata:

Name (required; default from plan name)

Description

Type (Manual/Automated/Scheduled)

Status defaults to Pending

Environment (string)

ExecutedBy defaults to current user

StartTime optionally set now

Create

API Call
POST ResultsService /runs

Request (example):

{
  "projectId": "ObjectId",
  "name": "Regression Test Run Q1 2026",
  "description": "Full regression suite for release 2.5.0",
  "type": "Manual",
  "status": "Pending",
  "environment": "staging",
  "executedBy": "ObjectId",
  "startTime": "2026-01-20T10:00:00.000Z"
}
Response: Run

Acceptance Criteria
Scenario: Create a test run
  Given the user has selected test cases for a project
  When the user creates a run with a valid name
  Then the system creates a run with status Pending
  And the run is visible in the project's runs list
Flow 3 — Populate Run with Test Instances (Add Tests to Run)
Goal: For each selected Test Case, create a Test instance in the Run.

UI Steps
After run creation, show "Run Contents" screen

System creates test instances automatically for each selected test case

Display a list of tests in the run:

Title, status, suite/section, link to execute

API Calls
For each selected test case:

POST ResultsService /tests

Request:

{
  "runId": "ObjectId",
  "projectId": "ObjectId",
  "testCaseId": "ObjectId",
  "suiteId": "ObjectId",
  "sectionId": "ObjectId",
  "title": "Login with valid credentials",
  "status": "Not Started"
}
Response: Test

Then to load list:

GET ResultsService /tests/run/:runId → Array<Test>

Implementation Note (Phase 1)
If there is no bulk endpoint, do one POST /tests per test case (batched client-side).

Acceptance Criteria
Scenario: Populate a run with test instances
  Given a run exists
  When the user adds selected test cases to the run
  Then the system creates a test instance for each selected test case
  And the run shows the full list of tests
Flow 4 — Run List (by Project)
Goal: User views all runs in a project.

UI Steps
Navigate Project → Runs

Runs list shows:

Name, status, type, environment, startTime/endTime, duration

Filter:

status, type, date range (Phase 2 if server-side needed)

API Calls
GET ResultsService /runs/:projectId → Array<Run>

(Alternative exists): GET /runs/project/:projectId

Acceptance Criteria
Scenario: View runs list
  Given the user is authenticated
  When the user opens the Runs page for a project
  Then the system lists runs for that project
Flow 5 — Run Details (Monitor Progress)
Goal: View run metadata + test list + summary counts.

UI Steps
Open a run

Show:

Run metadata

Summary: total tests, completed, passed, failed, blocked, etc.

Test list

API Calls
GET ResultsService /runs/:id → Run

GET ResultsService /tests/run/:runId → Array<Test>

Optional summary (if not in API): compute client-side from tests/results:

GET ResultsService /results/run/:runId → Array<Result>

Acceptance Criteria
Scenario: View run details
  Given a run exists
  When the user opens the run details
  Then the system shows run metadata and its tests
Flow 6 — Start Run / Update Run Status
Goal: Mark run as Running and set start time.

UI Steps
Click "Start Run"

Run status updates to Running

Start time set to now (if not set)

API Call
PUT ResultsService /runs/:id

Request:

{ "status": "Running", "startTime": "ISODate" }
Response: updated Run

Acceptance Criteria
Scenario: Start a run
  Given a run is Pending
  When the user starts the run
  Then the run status becomes Running
  And the run start time is recorded
Flow 7 — Execute a Test (Manual Execution)
Goal: Run a single test instance and record a result.

UI Steps
From Run test list, open a Test

Fetch test case definition (steps/expected)

Executor steps through and selects outcome (Passed/Failed/Blocked/etc.)

Add logs/notes and save result

Test instance status becomes Completed

API Calls
Load test instance:

GET ResultsService /tests/:id → Test

Load test case definition (for steps):

GET TestCaseService /testcases/:testcaseId → TestCase

Create result:

POST ResultsService /results

{
  "testId": "ObjectId",
  "projectId": "ObjectId",
  "status": "Failed",
  "executedBy": "ObjectId",
  "startTime": "ISODate",
  "endTime": "ISODate",
  "logs": "Assertion failed on step 2"
}
Update test instance status:

PUT ResultsService /tests/:id

{ "status": "Completed" }
Acceptance Criteria
Scenario: Record a test result
  Given a test exists in a running run
  When the executor submits a result for the test
  Then the system stores the result
  And the test status becomes Completed
Flow 8 — Update / Edit a Result (Optional)
Goal: Allow correcting a recorded result (audit implications).

UI Steps
Open result details from a test

Edit status/logs

Save

API Calls
GET ResultsService /results/test/:testId → Array<Result> (use latest)

PUT ResultsService /results/:id

{ "status": "Retest", "logs": "Re-run required" }
Acceptance Criteria
Scenario: Update a result
  Given a result exists
  When the user updates the result status
  Then the result is updated and reflected in run summaries
Flow 9 — Complete / Abort a Run
Goal: Close a run and record end time/duration.

UI Steps
Click "Complete Run" (or "Abort Run")

Confirm

Run status updates, end time set

API Call
PUT ResultsService /runs/:id

Complete:

{ "status": "Completed", "endTime": "ISODate" }
Abort:

{ "status": "Aborted", "endTime": "ISODate" }
Acceptance Criteria
Scenario: Complete a run
  Given a run is Running
  When the user completes the run
  Then the run status becomes Completed
  And the end time is recorded
Flow 10 — Search Runs / Tests / Results (Optional)
Goal: Find specific executions quickly.

UI Steps
Search bar on Runs page (name/description)

Search bar on Tests list (title/status)

Search on Results (status/logs)

API Calls
Runs:

GET ResultsService /runs/search?query=<q>&fields=name,description

Tests:

GET ResultsService /tests/search?query=<q>&fields=title,status

Results:

GET ResultsService /results/search?query=<q>&fields=status,comment (fields may vary)

Acceptance Criteria
Scenario: Search runs by keyword
  Given multiple runs exist
  When the user searches for "regression"
  Then matching runs are returned
Error Handling & UX Rules (Phase 1)
401 → redirect to login

404 → show not found (run/test/result missing)

If creating N tests fails mid-way:

show partial success count

provide “retry failed creations” action

Prevent accidental data loss:

confirm before aborting run or archiving run

Phase 1 Definition of Done (Test Plan + Run Management)
User can select test cases (plan scope).

User can create a run from selected scope.

System creates test instances for each selected test case.

User can start/complete/abort a run.

User can execute a test manually, store results, and mark the test Completed.

Run details show tests and basic progress summary.

notes: 
- Only Ready test cases can be added to runs (Phase 1).
- Draft cases are visible but not executable.
- Deprecated cases remain executable in existing runs but cannot be added to new runs.
