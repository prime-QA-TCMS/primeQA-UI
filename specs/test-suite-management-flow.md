# test-suite-management-flow.md

## Overview
This document defines the **Test Suite Management** flows for TCMS, covering the hierarchy:
**Suite → Section → Test Case**, using the **Test Case Service**.

Service used:
- **Test Case Service** (base: `http://localhost:3000`)

---

## Conventions

### Base URL
- Test Case Service: `http://localhost:3000`

### Auth
All endpoints except `/health` require:
- `Authorization: Bearer <jwt_token>`

### Hierarchy & Relationships
- **Suite**: top-level container (belongs to `projectId`)
- **Section**: belongs to `suiteId` (and usually also `projectId`)
- **Test Case**: belongs to `sectionId`, `suiteId` (and usually also `projectId`)

### Soft Delete
Delete endpoints are described as **soft deletes** (set `isActive=false`), not hard removal.

---

## Core Entities (schemas)

### Suite
```json
{
  "_id": "ObjectId",
  "projectId": "ObjectId",
  "name": "string",
  "key": "string",
  "description": "string",
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
Section
{
  "_id": "ObjectId",
  "projectId": "ObjectId",
  "suiteId": "ObjectId",
  "name": "string",
  "key": "string",
  "description": "string",
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
Test Case
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
Flow 0 — Health Check (Ops)
Goal: verify service is running.

API Call
GET /health

Response:

{ "status": "ok" }
Acceptance Criteria
Scenario: Service health check
  When the health endpoint is called
  Then the service returns status ok
Flow 1 — Suite List (within a Project)
Goal: user views suites for a selected project.

UI Steps
Open Project → Test Suites

Suites list loads (table / cards)

Optional filter: Active only

API Calls
GET /suites?projectId=<projectId> (if query param supported)

If not supported: GET /suites then filter client-side by projectId

Response
Array<Suite>

Acceptance Criteria
Scenario: List suites for a project
  Given the user is authenticated
  When the user opens Test Suites for a project
  Then the system displays all suites for that project
Flow 2 — Create Suite
Goal: create a suite under a project.

UI Steps
Click "Create Suite"

Enter name + description

Save → suite appears in list and opens suite detail

API Call
POST /suites

Request:

{
  "projectId": "ObjectId",
  "name": "API Test Suite",
  "description": "Test cases for REST API endpoints"
}
Response: Suite (includes auto-generated key)

Acceptance Criteria
Scenario: Create a suite
  Given the user is authenticated
  When the user creates a suite with a valid name
  Then the suite is created with an auto-generated key
  And it is visible in the suites list
Flow 3 — Suite Details (View + Sections Summary)
Goal: open a suite and show its sections.

UI Steps
Click a suite in list

Suite details load: name, key, description, created/updated

Sections list loads beneath

API Calls
GET /suites/:suiteId

GET /sections/suite/:suiteId

Acceptance Criteria
Scenario: View suite details and sections
  Given the user is authenticated
  When the user opens a suite
  Then the suite details are displayed
  And its sections are listed
Flow 4 — Edit Suite
Goal: update suite name/description; optionally toggle active.

UI Steps
Open suite → click Edit

Update fields

Save → details reflect changes

API Call
PUT /suites/:suiteId

Request (partial):

{
  "name": "API Integration Test Suite",
  "description": "Updated description",
  "isActive": true
}
Response: updated Suite

Acceptance Criteria
Scenario: Update a suite
  Given the user is authenticated
  When the user updates suite details
  Then the suite is updated
  And updatedAt is refreshed
Flow 5 — Archive Suite (Soft Delete)
Goal: archive suite while keeping data.

UI Steps
Open suite → click Archive

Confirm action

Suite becomes inactive and hidden from "Active" filter

API Call
DELETE /suites/:suiteId

Response: suite with isActive=false (soft delete behavior)

Acceptance Criteria
Scenario: Archive a suite
  Given the user is authenticated
  When the user archives a suite
  Then the suite is set to inactive
  And it no longer appears in active suite lists
Flow 6 — Section Management (List + Create + Edit + Archive)
Goal: manage sections inside a suite.

UI Steps
In suite details, see Sections list

Create section

Edit section

Archive section

API Calls
List sections:

GET /sections/suite/:suiteId

Create section:

POST /sections

Request:

{
  "projectId": "ObjectId",
  "suiteId": "ObjectId",
  "name": "Login Tests",
  "description": "Test cases for login functionality"
}
Response: Section (includes key)

Update section:

PUT /sections/:sectionId

{ "name": "Updated Section", "description": "Updated", "isActive": true }
Archive section:

DELETE /sections/:sectionId (soft delete)

Acceptance Criteria
Scenario: Create a section in a suite
  Given the user is authenticated
  And the user is viewing a suite
  When the user creates a section with a valid name
  Then the section is created
  And it appears in the suite section list
Flow 7 — Test Case Management (List + Create + Edit + Archive)
Goal: manage test cases within a section.

UI Steps
Select a section

Test cases list loads

Create test case (title, steps, expected results, metadata)

Edit test case

Archive test case

API Calls
List test cases by section:

GET /testcases/section/:sectionId

Create test case:

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
  "status": "Ready"
}
Response: TestCase

Get test case:

GET /testcases/:testcaseId

Update test case:

PUT /testcases/:testcaseId (partial update)

Archive test case:

DELETE /testcases/:testcaseId (soft delete)

Acceptance Criteria
Scenario: Create a test case
  Given the user is authenticated
  And the user is viewing a section
  When the user creates a test case with at least one step
  Then the test case is created
  And it appears in the section test case list
Flow 8 — Navigation & Deep Linking
Goal: allow stable URLs and reload-safe UI.

URL Patterns (recommended)
/projects/:projectId/suites

/projects/:projectId/suites/:suiteId

/projects/:projectId/suites/:suiteId/sections/:sectionId

/projects/:projectId/suites/:suiteId/sections/:sectionId/testcases/:testcaseId

Load Behavior (on deep link)
Suite page:

GET /suites/:suiteId

GET /sections/suite/:suiteId

Section page:

GET /sections/:sectionId

GET /testcases/section/:sectionId

Test case detail:

GET /testcases/:testcaseId

Error/Edge Cases (Phase 1)
401 Unauthorized → redirect to login

404 Not Found → show “Not found” page

Soft-deleted entities (isActive=false) should be hidden by default

Phase 1 Definition of Done (Test Suite Management)
Suite CRUD + archive works.

Section CRUD + archive works.

Test case CRUD + archive works.

Navigation supports deep links and refresh.

Basic validation errors are shown in UI (e.g., missing name/title).