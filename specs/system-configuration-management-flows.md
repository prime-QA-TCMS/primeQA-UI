# system-configuration-management-flows.md

## Overview
This document defines **System Configuration Management** flows for TCMS using the **Configuration Service**. These flows cover:
- **Environments** (deployment targets per project)
- **Parameters** (key/value config with scope and secret handling)
- **Integrations** (external system connections like Jira/Slack/GitHub/custom)

Primary service:
- **Configuration Service** (base: `http://localhost:3000`)

Related service (context only):
- **Project Service** (select project context)

---

## Conventions

### Base URL
- Configuration Service: `http://localhost:3000`

### Auth
All endpoints except `/health` require:
- `Authorization: Bearer <bearerToken>`

### IDs
MongoDB-style strings:
- `environmentId`, `parameterId`, `integrationId`, `projectId`

### Soft vs Hard Delete
The collections describe deletes as permanent in some places; treat delete actions as **admin-only** and confirm in UI.

---

## Core Schemas (canonical)

### Environment
```json
{
  "_id": "ObjectId",
  "projectId": "string",
  "name": "string",
  "description": "string",
  "baseUrl": "string",
  "variables": { "ANY_KEY": "string" },
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
Parameter
Note: API uses id to associate to a project/environment depending on scope.

{
  "_id": "ObjectId",
  "id": "string",
  "name": "string",
  "value": "string",
  "type": "string|number|boolean|secret",
  "scope": "global|project|environment",
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
Integration
{
  "_id": "ObjectId",
  "projectId": "string",
  "type": "jira|slack|github|custom",
  "config": { "ANY_KEY": "string" },
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
Flow 0 — Health Check (Ops)
Goal: verify Configuration Service is running.

API Call
GET /health

Response (typical):

{ "status": "ok" }
Acceptance Criteria
Scenario: Configuration service health check
  When the health endpoint is called
  Then the service returns status ok
Flow 1 — Environments List (per Project)
Goal: show environments for the selected project (dev/staging/prod).

UI Steps
Project → Settings → Environments

Display environments list:

name, baseUrl, isActive, updatedAt

Default filter: Active only

Provide actions: View/Edit/Delete

API Calls
GET /api/environments

Phase 1: filter client-side by projectId

Acceptance Criteria
Scenario: View environments for a project
  Given the user is authenticated
  When the user opens the Environments settings for a project
  Then the system displays environments for that project
Flow 2 — Create Environment
Goal: create a new environment for a project.

UI Steps
Click "Add Environment"

Enter:

name (required)

baseUrl (required)

description (optional)

variables (key/value editor)

isActive toggle (default true)

Save → appears in list

API Call
POST /api/environments

Request:

{
  "projectId": "proj-12345",
  "name": "Staging",
  "description": "Staging environment",
  "baseUrl": "https://staging.api.example.com",
  "variables": { "API_VERSION": "v1", "TIMEOUT": "30000" },
  "isActive": true
}
Response: Environment

Acceptance Criteria
Scenario: Create an environment
  Given the user is authenticated
  When the user creates an environment with required fields
  Then the environment is created
  And it is visible in the environments list
Flow 3 — View Environment Details
Goal: open a single environment to view full config.

UI Steps
Click an environment row

Show details:

baseUrl

variables table (key/value)

timestamps and active flag

API Call
GET /api/environments/:id → Environment

Acceptance Criteria
Scenario: View environment details
  Given an environment exists
  When the user opens environment details
  Then the system shows baseUrl and variables
Flow 4 — Update Environment
Goal: update environment metadata and variables.

UI Steps
Open environment → Edit

Update name/baseUrl/variables/isActive

Save

API Call
PUT /api/environments/:id

Request (partial or full):

{
  "name": "Staging (Updated)",
  "baseUrl": "https://staging2.api.example.com",
  "variables": { "API_VERSION": "v2", "TIMEOUT": "45000" },
  "isActive": true
}
Response: updated Environment

Acceptance Criteria
Scenario: Update an environment
  Given the user is authenticated
  When the user updates environment fields
  Then the environment is updated
  And updatedAt is refreshed
Flow 5 — Delete Environment (Admin/Owner Only)
Goal: remove an environment (confirm destructive action).

UI Steps
Click Delete environment

Confirm modal warns about impact (runs/config references)

Delete → removed from list

API Call
DELETE /api/environments/:id

Response: deleted Environment or success message

Acceptance Criteria
Scenario: Delete an environment
  Given the user has permission
  When the user confirms deletion
  Then the environment is deleted
  And it no longer appears in the list
Flow 6 — Parameters List + Filters (Global/Project/Environment)
Goal: manage key/value config parameters and secrets.

UI Steps
Project → Settings → Parameters

Tabs or filter for scope:

Global

Project

Environment (select environment)

Show list:

name, type, scope, value (masked if secret), isActive, updatedAt

Provide actions: Create/Edit/Delete

API Calls
GET /api/parameters

Or scope-specific endpoints (preferred):

GET /api/parameters/scope/:scope

GET /api/parameters/project/:projectId

GET /api/parameters/environment/:environmentId

Acceptance Criteria
Scenario: View parameters by scope
  Given the user is authenticated
  When the user filters parameters by environment scope
  Then only parameters for that environment are shown
Flow 7 — Create Parameter
Goal: create a parameter at a chosen scope.

UI Steps
Click "Add Parameter"

Choose scope: global/project/environment

Select association:

if project scope: choose project (or current project)

if environment scope: choose environment

Enter:

name (required)

value (required)

type (string/number/boolean/secret)

isActive default true

Save

API Call
POST /api/parameters

Request:

{
  "id": "env-123",
  "name": "DATABASE_URL",
  "value": "mongodb://localhost:27017/mydb",
  "type": "secret",
  "scope": "environment",
  "isActive": true
}
UI Security Rule (Phase 1 minimum)
If type=secret, mask value in lists and details (show “•••••” + reveal toggle).

Acceptance Criteria
Scenario: Create a parameter
  Given the user is authenticated
  When the user creates a parameter with a name and value
  Then the parameter is created
  And it appears in the parameters list for its scope
Flow 8 — Update Parameter
Goal: edit parameter value/type/active state.

UI Steps
Open parameter → Edit

Modify allowed fields

Save

API Call
PUT /api/parameters/:id

Request (partial):

{ "value": "new-value", "type": "string", "isActive": true }
Acceptance Criteria
Scenario: Update a parameter
  Given a parameter exists
  When the user updates the parameter value
  Then the parameter is updated
  And updatedAt is refreshed
Flow 9 — Delete Parameter (Restricted)
Goal: remove a parameter.

UI Steps
Delete parameter

Confirm modal

Removed from list

API Call
DELETE /api/parameters/:id

Acceptance Criteria
Scenario: Delete a parameter
  Given the user has permission
  When the user deletes a parameter
  Then the parameter is deleted
Flow 10 — Integrations List (per Project)
Goal: manage integrations attached to a project.

UI Steps
Project → Settings → Integrations

Show list:

type, status(active), updatedAt

Actions: Add / Edit / Delete

API Calls
GET /api/integrations

Phase 1: filter client-side by projectId

Acceptance Criteria
Scenario: View integrations for a project
  Given the user is authenticated
  When the user opens Integrations settings
  Then integrations for that project are shown
Flow 11 — Create Integration
Goal: connect project to external system.

UI Steps
Click “Add Integration”

Choose type: Jira/Slack/GitHub/Custom

Show dynamic config form (key/value or typed fields)

Save

API Call
POST /api/integrations

Request:

{
  "projectId": "proj-12345",
  "type": "jira",
  "config": {
    "baseUrl": "https://jira.company.com",
    "projectKey": "ABC",
    "apiToken": "********"
  },
  "isActive": true
}
Acceptance Criteria
Scenario: Create an integration
  Given the user is authenticated
  When the user creates an integration with required config
  Then the integration is created
  And it appears in the integrations list
Flow 12 — Update / Delete Integration
Goal: maintain integrations over time.

Update
UI: Edit config + toggle active

API: PUT /api/integrations/:id

{ "config": { "baseUrl": "https://jira.company.com", "projectKey": "ABC" }, "isActive": true }
Delete
UI: Confirm destructive delete

API: DELETE /api/integrations/:id

Acceptance Criteria
Scenario: Update an integration
  Given an integration exists
  When the user updates integration configuration
  Then the integration is updated
Cross-Flow Dependency Notes
Environments are referenced by:

Runs (as environment string in Results Service) — recommended to select from Environments list for consistency.

Parameters should support resolution in the UI:

Global + Project + Environment combined (Phase 2 “effective config” endpoint recommended).

Integrations are typically project-scoped.

Error Handling & UX Rules (Phase 1)
401 → redirect to login

404 → show not found

400 validation errors → show inline errors (name/baseUrl required)

Confirm modals for all delete actions

Mask secrets:

Parameter type secret values are hidden by default

Integration configs containing token fields should be masked in UI

Phase 1 Definition of Done (System Configuration)
Environment CRUD works (list/create/edit/delete).

Parameter CRUD works with scope filtering.

Integration CRUD works per project.

Secret masking implemented in UI for secret parameters and token-like integration fields.

Project context is respected (filtering by projectId in UI if API lacks query params).