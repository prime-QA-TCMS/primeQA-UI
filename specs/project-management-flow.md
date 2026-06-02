# project-management-flow.md

## Overview
This document defines the **Project Management** user flows for TCMS, mapping **UI steps → API calls** using the current services:
- **User Service** (auth, identity)
- **Project Service** (projects, milestones, project configuration)
- **Configuration Service** (environments, parameters, integrations) — optional but commonly used inside project setup
- **Test Case / Results** — referenced only where project setup leads into test management (kept minimal here)

---

## Conventions

### Base URLs
- User Service: `http://localhost:8081`
- Project Service: `http://localhost:3000`
- Configuration Service: `http://localhost:3000`

### Auth
All protected endpoints require:
- `Authorization: Bearer <accessToken>`

### Entity IDs
- `projectId`, `milestoneId`, `environmentId`, etc. are **string IDs** (MongoDB-style in examples).

---

## Personas & Permissions (Phase 1 assumption)
- **Org Admin**: can create projects; manage users/roles/tenants.
- **Project Owner**: can create/edit their projects; manage milestones and project configuration.
- **Contributor/Viewer**: can view projects and milestones based on visibility/access rules (authorization enforcement may be Phase 2).

---

## Flow 0 — Authentication (Prerequisite)
**Goal:** User obtains an `accessToken` used for subsequent calls.

### UI Steps
1. User navigates to Login.
2. Enters email + password.
3. System stores `accessToken` (and `refreshToken` if used).

### API Calls
1. `POST UserService /auth/login`
   - Request:
     ```json
     { "email": "user@example.com", "password": "SecurePassword123!" }
     ```
   - Response:
     ```json
     {
       "accessToken": "jwt",
       "refreshToken": "token",
       "user": { "_id": "userId", "email": "user@example.com", "role": "role", "tenantId": "tenantId" }
     }
     ```

### Acceptance Criteria (Gherkin)
```gherkin
Scenario: Successful login
  Given a registered user with valid credentials
  When the user submits email and password
  Then the system returns an access token
  And the user can access protected resources
```

Flow 1 — Project List (Projects Dashboard)

Goal: User views all projects they have access to.

UI Steps

Navigate to Projects page.

Projects table loads with:

name, key, owner, visibility, isActive, updatedAt

Optional filters (Phase 1 minimal):

Active only toggle (client-side OK initially)

API Calls

GET ProjectService /

Response: Array<Project>

[
  {
    "_id": "projectId",
    "name": "Project Management System",
    "key": "PMS",
    "description": "A system for managing projects",
    "owner": "user123",
    "visibility": "private",
    "isActive": true,
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  }
]

Acceptance Criteria
Scenario: View projects list
  Given the user is authenticated
  When the user opens the Projects page
  Then the system displays a list of projects
  And each project includes name, key, visibility, and status

Flow 2 — Create Project

Goal: User creates a new project.

UI Steps

Click "Create Project".

Enter:

name (required)

description (optional)

visibility (private/public)

Submit.

Redirect to Project Overview.

API Calls

POST ProjectService /

Request:

{
  "name": "New Project",
  "description": "This is a new project",
  "owner": "user123",
  "visibility": "private"
}


Response (201):

{
  "_id": "projectId",
  "name": "New Project",
  "key": "NP",
  "description": "This is a new project",
  "owner": "user123",
  "visibility": "private",
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}

Acceptance Criteria
Scenario: Create a project
  Given the user is authenticated
  When the user submits a valid project form
  Then a project is created
  And the user is redirected to the project overview

Flow 3 — Project Details (Overview)

Goal: User opens a project and sees overview + quick actions.

UI Steps

Click a project in list.

Overview page loads:

Project metadata (name/key/description/visibility/status)

Milestones summary

Configuration summary (optional Phase 1)

API Calls

GET ProjectService /:id

GET ProjectService /:projectId/milestones (to show milestone list/summary)

(Optional) GET ConfigurationService /api/environments?projectId=... (Note: current collection shows GET all; if no query param exists, filter client-side.)

Acceptance Criteria
Scenario: Open project details
  Given the user is authenticated
  When the user opens a project
  Then the system displays project details
  And milestones for the project are shown

Flow 4 — Edit Project

Goal: Update project metadata.

UI Steps

Click "Edit Project".

Update name/description/visibility.

Save.

API Calls

PUT ProjectService /:id

Request (partial):

{ "name": "Updated Project Name", "description": "Updated description", "visibility": "public" }


Response: updated Project

Acceptance Criteria
Scenario: Edit project
  Given the user is authenticated
  And the user has edit rights for the project
  When the user updates project fields and saves
  Then the project is updated and changes are visible on reload

Flow 5 — Archive (Soft Delete) Project

Goal: Deactivate a project without hard deletion.

UI Steps

Click "Archive Project".

Confirm modal.

Project status updates to Archived/Inactive.

Project disappears from Active filter.

API Calls

DELETE ProjectService /:id

Response: { message, project } or updated project with isActive=false (implementation-dependent)

Acceptance Criteria
Scenario: Archive a project
  Given the user is authenticated
  And the user has admin/owner rights
  When the user confirms archive
  Then the project is marked inactive
  And it no longer appears in active project lists

Flow 6 — Milestones: List + Create + Update + Delete

Goal: Manage milestones for a project.

UI Steps

Open project → Milestones tab.

View milestones list.

Add milestone (title, description, start, due).

Edit milestone fields (including completion toggle if supported).

Delete milestone.

API Calls

List:

GET ProjectService /:projectId/milestones

Create:

POST ProjectService /:projectId/milestones

{ "title": "Release 1", "description": "Scope", "startDate": "ISODate", "dueDate": "ISODate" }


Delete:

DELETE ProjectService /:projectId/milestones/:milestoneId

Update:

(Not present in the Project Service collection snippet; if missing in API, milestone editing should be deferred or implemented as a new endpoint.)

Acceptance Criteria
Scenario: Create a milestone
  Given the user is authenticated
  When the user creates a milestone with required fields
  Then the milestone appears in the project milestones list

Flow 7 — Project Configuration (Project-level Settings)

Goal: Update project configuration (baseUrl + environment variables).

UI Steps

Open project → Settings → Configuration.

Set:

name/description (optional)

baseUrl

environmentVariables (key-value editor)

Save.

API Calls

PUT ProjectService /:projectId/configuration

Request:

{
  "name": "Config name",
  "description": "Config description",
  "baseUrl": "https://api.example.com",
  "environmentVariables": { "TIMEOUT": "30000" }
}

Acceptance Criteria
Scenario: Update project configuration
  Given the user is authenticated
  When the user saves configuration settings
  Then the configuration is stored
  And the updated configuration is shown on refresh

Flow 8 — Environments (Optional during Project Setup)

Goal: Create and manage environment targets (dev/staging/prod) per project.

UI Steps

Open project → Settings → Environments.

Create environment with baseUrl + variables.

Edit environment.

Delete environment.

API Calls (Configuration Service)

Create:

POST ConfigurationService /api/environments

{
  "projectId": "projectId",
  "name": "Staging",
  "description": "Staging env",
  "baseUrl": "https://staging.api.example.com",
  "variables": { "API_VERSION": "v1" },
  "isActive": true
}


List:

GET ConfigurationService /api/environments

Update:

PUT ConfigurationService /api/environments/:id

Delete:

DELETE ConfigurationService /api/environments/:id

Acceptance Criteria
Scenario: Create an environment
  Given the user is authenticated
  When the user creates an environment for a project
  Then the environment is available for selection in runs/executions

Flow 9 — Project Integrations (Optional)

Goal: Attach integrations (Jira/Slack/GitHub/custom) to a project.

UI Steps

Open project → Settings → Integrations.

Add integration type + configuration.

Edit integration config.

Remove integration.

API Calls (Configuration Service)

POST /api/integrations

GET /api/integrations

GET /api/integrations/:id

PUT /api/integrations/:id

DELETE /api/integrations/:id

Acceptance Criteria
Scenario: Add an integration
  Given the user is authenticated
  When the user adds an integration with valid config
  Then the integration appears in the integrations list for the project

Cross-Flow Data Dependencies

Project creation produces projectId

Environments and Integrations reference projectId

Milestones reference projectId

Later flows (Test Management) will use projectId to create Suites, Runs, etc.

Phase 1 Definition of Done (Project Management)

Auth works end-to-end (login + protected routes).

Project CRUD + archive works.

Milestones list + create + delete works (update only if endpoint exists).

Project configuration update works.

(Optional) Environment CRUD works.