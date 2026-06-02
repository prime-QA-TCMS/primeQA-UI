# test-case-management-flow.md

## Overview
This document defines **Test Case Management** user flows in TCMS. It focuses on the **test case entity lifecycle** (create, view, edit, archive, list, search/filter, and quality gates) and how it fits within the hierarchy:
**Project → Suite → Section → Test Case**.

Primary service used:
- **Test Case Service** (base: `http://localhost:3000`)

Related (optional) services:
- **Project Service** (project selection/context)
- **Configuration Service** (environment variables/parameters used during execution, not required to manage cases)

---

## Conventions

### Base URL
- Test Case Service: `http://localhost:3000`

### Auth
All endpoints except `/health` require:
- `Authorization: Bearer <jwt_token>`

### Soft delete
Delete operations are treated as **archive** behavior (set `isActive=false`), not hard deletion.

### IDs
All IDs are strings (MongoDB ObjectId style).

---

## Core Schemas

### TestCase (canonical)
```json
{
  "_id": "ObjectId",
  "projectId": "ObjectId",
  "suiteId": "ObjectId",
  "sectionId": "ObjectId",

  "title": "string",
  "preconditions": "string",

  "steps": [
    { "action": "string", "expected": "string", "data": {} }
  ],
  "expectedResult": "string",

  "priority": "Low|Medium|High|Critical",
  "type": "Functional|Regression|Performance|Security|Other",
  "status": "Draft|Ready|Deprecated",

  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
Step
{ "action": "string", "expected": "string", "data": {} }
Flow 0 — Health Check (Ops)
Goal: Verify Test Case Service is running.

API Call
GET /health

Response:

{ "status": "ok" }
Acceptance Criteria
Scenario: Test Case Service health check
  When the health endpoint is called
  Then the service returns status ok
Flow 1 — List Test Cases (within a Section)
Goal: Display test cases for a selected section.

UI Steps
User navigates: Project → Suite → Section → Test Cases

Show list/table with:

Title, Priority, Type, Status, UpdatedAt

Default filter:

Active only (isActive=true)

Optional client-side filters (Phase 1):

status, priority, type

Pagination (Phase 2 if not supported server-side)

API Calls
GET /testcases/section/:sectionId

Response: Array<TestCase>

Acceptance Criteria
Scenario: List test cases by section
  Given the user is authenticated
  When the user opens a section's test cases page
  Then the system displays all active test cases in that section
Flow 2 — Create Test Case (Wizard/Form)
Goal: Create a new test case with steps and metadata.

UI Steps
Click "New Test Case"

Enter required fields:

Title

At least one Step (action + expected)

Optional:

Preconditions

Expected Result

Priority, Type, Status

Save

Return to list and highlight new case

API Call
POST /testcases

Request (example):

{
  "projectId": "ObjectId",
  "suiteId": "ObjectId",
  "sectionId": "ObjectId",
  "title": "Login with valid credentials",
  "preconditions": "User exists",
  "steps": [
    { "action": "Open login page", "expected": "Login page visible", "data": {} },
    { "action": "Enter valid credentials and submit", "expected": "User is logged in", "data": {} }
  ],
  "expectedResult": "Dashboard is shown",
  "priority": "High",
  "type": "Functional",
  "status": "Draft"
}
Response: TestCase

Client-side validation (Phase 1 minimum)
title required (min length 2)

steps array required (min 1)

each step requires action + expected

Acceptance Criteria
Scenario: Create a test case with steps
  Given the user is authenticated
  And the user is viewing a section
  When the user submits a test case with a title and at least one step
  Then the system creates the test case
  And it appears in the section test case list
Flow 3 — View Test Case Details
Goal: Open a single test case and view full content.

UI Steps
Click a test case from list

Show:

Title, metadata, preconditions, steps, expected result

Created/Updated timestamps

Provide actions:

Edit

Archive

Duplicate (optional Phase 1/2)

API Calls
GET /testcases/:testcaseId

Response: TestCase

Acceptance Criteria
Scenario: View test case details
  Given the user is authenticated
  When the user opens a test case
  Then the system shows test case details including steps and metadata
Flow 4 — Edit Test Case (including Steps)
Goal: Update content and metadata of a test case.

UI Steps
Open test case → Edit

Edit any of:

Title, Preconditions, Expected Result

Priority/Type/Status

Steps (add/remove/reorder/update)

Save

Return to detail view with updates

API Call
PUT /testcases/:testcaseId

Request (partial or full; safest is full object update):

{
  "title": "Login with valid credentials (UI)",
  "preconditions": "User exists and is active",
  "steps": [
    { "action": "Open login page", "expected": "Login page visible", "data": {} },
    { "action": "Enter valid credentials", "expected": "Fields accept input", "data": {} },
    { "action": "Click Login", "expected": "Dashboard loads", "data": {} }
  ],
  "expectedResult": "User lands on dashboard",
  "priority": "High",
  "type": "Functional",
  "status": "Ready"
}
Acceptance Criteria
Scenario: Update a test case
  Given the user is authenticated
  And the user is viewing a test case
  When the user updates fields and saves
  Then the test case is updated
  And updatedAt is refreshed
Flow 5 — Archive Test Case (Soft Delete)
Goal: Remove test case from active lists while retaining history.

UI Steps
Open test case → Archive

Confirm modal

Test case disappears from active list

Optional: “Show archived” toggle reveals it

API Call
DELETE /testcases/:testcaseId

Response: archived entity or success message (implementation-dependent)

Acceptance Criteria
Scenario: Archive a test case
  Given the user is authenticated
  When the user archives a test case
  Then the test case is set inactive
  And it does not appear in active lists by default
Flow 6 — Duplicate Test Case (Recommended)
Goal: Create a copy for variant testing without retyping steps.

If no backend endpoint exists, implement as client-side: GET then POST with modified title.

UI Steps
Open test case → Duplicate

System creates a copy:

Title becomes "Copy of <title>" (editable before save)

Save → new test case opens

API Calls (client-side duplicate)
GET /testcases/:testcaseId

POST /testcases with same payload but new title

Acceptance Criteria
Scenario: Duplicate a test case
  Given the user is authenticated
  When the user duplicates a test case
  Then a new test case is created with copied steps and metadata
Flow 7 — Bulk Actions (Phase 2 recommended)
Goal: Multi-select test cases to archive, change status, move sections.

UI Steps
Multi-select in list

Apply action:

Archive

Set status (Draft/Ready/Deprecated)

Move to section

Confirm

API Needs (likely missing currently)
Bulk update endpoint or batched PUTs

Bulk archive endpoint or batched DELETEs

Acceptance Criteria
Scenario: Bulk update test case status
  Given the user selected multiple test cases
  When the user sets status to Ready
  Then all selected test cases are updated
Flow 8 — Search / Filter (Phase 1 client-side; Phase 2 server-side)
Goal: Find test cases by title/keyword and filter by metadata.

UI Steps
Search input (title keyword)

Filters:

Status, Priority, Type

Sort:

UpdatedAt desc (default)

Title asc

API Approach
Phase 1: load section cases via GET /testcases/section/:sectionId and filter client-side

Phase 2: add server-side search endpoint (recommended)

Acceptance Criteria
Scenario: Filter test cases by status
  Given the user is viewing a section's test cases
  When the user filters by status Ready
  Then only Ready test cases are shown
Flow 9 — Deep Linking & Reload-Safe Navigation
Recommended routes

/projects/:projectId/suites/:suiteId/sections/:sectionId/testcases

/projects/:projectId/suites/:suiteId/sections/:sectionId/testcases/:testcaseId

On page load

List page: GET /testcases/section/:sectionId

Detail page: GET /testcases/:testcaseId

Error Handling & UX Rules (Phase 1)
401 → redirect to login

404 → show not found

Validation errors (400) → show inline field errors (title, steps)

Prevent accidental loss:

warn on unsaved changes on edit screen

Phase 1 Definition of Done (Test Case Management)
List test cases by section works (active only default).

Create test case works with minimum validation (title + 1 step).

View detail works.

Edit works (including steps array updates).

Archive works (soft delete behavior).

Deep link routing works for list + detail pages.

notes: 
- Only Ready test cases can be added to runs (Phase 1).
- Draft cases are visible but not executable.
- Deprecated cases remain executable in existing runs but cannot be added to new runs.
