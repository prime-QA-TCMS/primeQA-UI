User Service (base: http://localhost:8081)
Auth
POST /auth/register

Request

{
  "email": "string",
  "password": "string",
  "roleId": "string",
  "tenantId": "string"
}


201 Response

{
  "_id": "string",
  "email": "string",
  "roleId": "string",
  "tenantId": "string",
  "createdAt": "ISODate"
}


POST /auth/login

Request

{ "email": "string", "password": "string" }


200 Response

{
  "accessToken": "string",
  "refreshToken": "string",
  "user": {
    "_id": "string",
    "email": "string",
    "role": "string",
    "tenantId": "string"
  }
}


POST /auth/refresh

Request

{ "refreshToken": "string" }


200 Response

{ "accessToken": "string", "refreshToken": "string" }


POST /auth/logout

Request

{ "refreshToken": "string" }


200 Response

{ "success": true }


Users (JWT required)
GET /users

200 Response: Array<User>

{
  "_id": "string",
  "email": "string",
  "roleId": "string",
  "tenantId": "string",
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}


GET /users/:id → User (same shape as above)
POST /users (admin create)

Request (same as register)

{ "email": "string", "password": "string", "roleId": "string", "tenantId": "string" }


201 Response: User

PUT /users/:id

Request (partial)

{ "email": "string", "roleId": "string", "tenantId": "string" }


200 Response: User

DELETE /users/:id

Response: not fully specified in snippet (likely { success/message })

Roles / Tenants

The collections include CRUD for Roles and Tenants, but the snippets we have don’t include full request/response examples for those objects. You can treat them as standard:

Role: { _id, name, permissions?, tenantId?, isActive, createdAt, updatedAt }

Tenant: { _id, name, ... , isActive, createdAt, updatedAt }


Project Service (base: http://localhost:8082)
Projects
GET / → Array<Project>

Project (response shape)

{
  "_id": "ObjectId",
  "name": "string",
  "key": "string",
  "description": "string",
  "owner": "string",
  "visibility": "private|public",
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}


POST /

Request

{
  "name": "string",
  "key": "string",
  "description": "string",
  "owner": "string",
  "visibility": "private|public"
}


201 Response: Project

GET /:id → Project
PUT /:id (partial) → Project
DELETE /:id soft delete

Response: described as “Project deactivated” + project object (snippet truncated)

Milestones
GET /:projectId/milestones → Array<Milestone>

Milestone (response shape)

{
  "_id": "ObjectId",
  "projectId": "ObjectId",
  "title": "string",
  "description": "string",
  "startDate": "ISODate",
  "dueDate": "ISODate",
  "isCompleted": false
}


POST /:projectId/milestones

Request

{
  "title": "string",
  "description": "string",
  "startDate": "ISODate",
  "dueDate": "ISODate"
}


201 Response: Milestone (same fields incl. _id, projectId, isCompleted)

DELETE /:projectId/milestones/:milestoneId

Response: not fully specified in snippet (likely { message, milestone })

Project Configuration
PUT /:projectId/configuration

Request

{
  "name": "string",
  "description": "string",
  "baseUrl": "string",
  "environmentVariables": { "ANY_KEY": "string" }
}


Response

{
  "_id": "ObjectId",
  "projectId": "ObjectId",
  "name": "string",
  "description": "string",
  "baseUrl": "string",
  "environmentVariables": { "ANY_KEY": "string" },
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}


Configuration Service (base: http://localhost:8085)
Health
GET /health

Response (shape implied)

{ "status": "ok" }


Environments
POST /api/environments

Request

{
  "projectId": "string",
  "name": "string",
  "description": "string",
  "baseUrl": "string",
  "variables": { "ANY_KEY": "string" },
  "isActive": true
}


Response (described)

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

GET /api/environments → Array<Environment>
GET /api/environments/:id → Environment
PUT /api/environments/:id (partial) → Environment
DELETE /api/environments/:id

Response: described as deleted environment object

Parameters
POST /api/parameters

Request (example)

{
  "id": "string",
  "name": "string",
  "value": "string",
  "type": "string|number|boolean|secret",
  "scope": "global|project|environment",
  "isActive": true
}


Response: described as created parameter with _id, createdAt, updatedAt

GET /api/parameters → Array<Parameter>
GET /api/parameters/:id → Parameter
PUT /api/parameters/:id (partial) → Parameter
DELETE /api/parameters/:id → deleted Parameter
Filter endpoints

GET /api/parameters/scope/:scope → Array<Parameter>

GET /api/parameters/project/:projectId → Array<Parameter>

GET /api/parameters/environment/:environmentId → Array<Parameter>


Integrations
POST /api/integrations

Request

{
  "projectId": "string",
  "type": "jira|slack|github|custom",
  "config": { "ANY_KEY": "string" },
  "isActive": true
}


Response: described as created integration with _id, timestamps

GET /api/integrations → Array<Integration>
GET /api/integrations/:id → Integration
PUT /api/integrations/:id (replaces config) → Integration
DELETE /api/integrations/:id → deleted Integration
Test Case Service (base: http://localhost:8083)
Health
GET /health
{ "status": "ok" }


Suites
POST /suites

Request

{
  "projectId": "ObjectId",
  "name": "string",
  "description": "string"
}


Response (described)

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


GET /suites → Array<Suite>
GET /suites/:id → Suite
PUT /suites/:id (partial) → Suite
DELETE /suites/:id (soft delete) → Suite with isActive:false
Sections
POST /sections

Request (inferred from pattern)

{
  "suiteId": "ObjectId",
  "projectId": "ObjectId",
  "name": "string",
  "description": "string"
}


Response: Section object { _id, projectId, suiteId, name, key, description, isActive, createdAt, updatedAt } (pattern used throughout)

GET /sections/suite/:suiteId → Array<Section>
GET /sections/:id → Section
PUT /sections/:id → Section
DELETE /sections/:id soft delete → Section
Test Cases
POST /testcases

Request

{
  "title": "string",
  "suiteId": "ObjectId",
  "sectionId": "ObjectId",
  "priority": "Low|Medium|High|Critical",
  "type": "Functional|Regression|Performance|Security|Other",
  "status": "Draft|Ready|Deprecated",
  "preconditions": "string",
  "steps": [
    { "action": "string", "expected": "string", "data": {} }
  ],
  "expectedResult": "string"
}


Response

{
  "_id": "ObjectId",
  "projectId": "ObjectId",
  "suiteId": "ObjectId",
  "sectionId": "ObjectId",
  "title": "string",
  "priority": "string",
  "type": "string",
  "status": "string",
  "preconditions": "string",
  "steps": [
    { "action": "string", "expected": "string", "data": {} }
  ],
  "expectedResult": "string",
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}


GET /testcases/section/:sectionId → Array<TestCase>
GET /testcases/:id → TestCase
PUT /testcases/:id → TestCase
DELETE /testcases/:id soft delete → TestCase with isActive:false
Results Service (base: http://localhost:8084)
Health
GET /health
{ "status": "ok" }


(shape implied)

Runs
POST /runs

Request

{
  "projectId": "ObjectId",
  "name": "string",
  "description": "string",
  "type": "Manual|Automated|Scheduled",
  "status": "Pending|Running|Completed|Aborted",
  "environment": "string",
  "executedBy": "ObjectId",
  "startTime": "ISODate",
  "endTime": "ISODate"
}


Response (described): Run object plus auto fields:

{
  "_id": "ObjectId",
  "projectId": "ObjectId",
  "name": "string",
  "description": "string",
  "type": "string",
  "status": "string",
  "environment": "string",
  "executedBy": "ObjectId",
  "startTime": "ISODate",
  "endTime": "ISODate",
  "duration": 0,
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}


GET /runs/:id → Run
GET /runs/:projectId → Array<Run>
GET /runs/project/:projectId → Array<Run>
PUT /runs/:id (partial) → Run
DELETE /runs/:id (soft/hard depends)
GET /runs/search?query=...&fields=... → Array<Run>
Tests
POST /tests

Request

{
  "runId": "ObjectId",
  "projectId": "ObjectId",
  "testCaseId": "ObjectId",
  "suiteId": "ObjectId",
  "sectionId": "ObjectId",
  "title": "string",
  "status": "Not Started|In Progress|Completed"
}


Response: Test instance object (described; canonical shape)

{
  "_id": "ObjectId",
  "runId": "ObjectId",
  "projectId": "ObjectId",
  "testCaseId": "ObjectId",
  "suiteId": "ObjectId",
  "sectionId": "ObjectId",
  "title": "string",
  "status": "string",
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}


GET /tests/:id → Test
PUT /tests/:id

Request (partial)

{ "status": "Not Started|In Progress|Completed", "title": "string" }


Response: Test

DELETE /tests/:id → delete/soft delete (not fully specified)
GET /tests/run/:runId → Array<Test>
GET /tests/project/:projectId → Array<Test>
GET /tests/search?query=...&fields=... → Array<Test>
Results
POST /results

Request

{
  "testId": "ObjectId",
  "projectId": "ObjectId",
  "status": "Passed|Failed|Blocked|Skipped|Retest",
  "executedBy": "ObjectId",
  "startTime": "ISODate",
  "endTime": "ISODate",
  "logs": "string"
}


Response (described): Result object + auto duration/timestamps

{
  "_id": "ObjectId",
  "testId": "ObjectId",
  "projectId": "ObjectId",
  "status": "string",
  "executedBy": "ObjectId",
  "startTime": "ISODate",
  "endTime": "ISODate",
  "duration": 0,
  "logs": "string",
  "isActive": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}

GET /results → Array<Result>
GET /results/:id → Result
PUT /results/:id

Request (partial)

{ "status": "Passed|Failed|Blocked|Skipped|Retest", "logs": "string", "endTime": "ISODate" }


Response: Result

DELETE /results/:id → delete/soft delete
GET /results/test/:testId → Array<Result>
GET /results/run/:runId → Array<Result>
GET /results/project/:projectId → Array<Result>
GET /results/search?query=...&fields=... → Array<Result>