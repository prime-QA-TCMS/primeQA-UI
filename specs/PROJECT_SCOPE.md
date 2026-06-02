# PrimeQA TCMS Phase 1 Scope

## 1. Purpose
Deliver a production-ready Phase 1 of the PrimeQA Test Case Management System (TCMS) that enables teams to manage core test assets and execute manual test runs with traceable results. Phase 1 focuses on the minimum viable capability set required for day-to-day QA operations, with a stable architecture that can be extended in Phase 2+.

## 2. In Scope
### 2.1 Platform Foundations
- Authentication:
  - Login, logout
  - Access token + refresh token support
  - Protected routes
- Global UI foundations (via `fog-ui`):
  - `AxiosProvider` configured with service base URLs and auth refresh flow
  - `PageWrapper`, navigation/menu framework
  - Standard components: tables, forms, popups, tabs, cards, charts, toast notifications, error boundary
- Environment configuration:
  - `.env.example` and documented local configuration
  - API base URLs per service (user, project, testcase, results, configuration)

### 2.2 User and Access Management (Minimum)
- Roles and permissions:
  - View roles
  - Create/update roles (supported by backend)
- User management:
  - View users
  - Create/update users (supported by backend)
- Session controls:
  - Graceful handling of expired tokens (refresh or redirect to login)

### 2.3 Projects
- Projects:
  - List projects
  - Create project
  - View project overview
  - Update project (basic fields)
- Project dashboard (basic metrics):
  - Total test cases
  - Total runs
  - Pass/fail/blocked counts (if available)
  - Recent activity/trend (date-based, last 7 days)

### 2.4 Test Case Management (Core)
- Suites:
  - List suites per project
  - Create suite
  - View suite details
  - Update suite
- Sections:
  - Create/update sections within a suite
  - Basic section listing and navigation within a suite
- Test Cases:
  - Create test case in a section
  - View test case
  - Update test case
  - Basic fields:
    - Title
    - Preconditions
    - Steps (manual steps)
    - Expected results
    - Priority (enum)
    - Type (enum)
    - Status (draft/active/deprecated)
  - Basic filtering within a suite/section (title search, priority, status)

### 2.5 Test Execution (Manual Runs)
- Test Runs:
  - Create run
    - Select project
    - Select suite/section/cases (at least suite-level selection)
    - Select configuration/environment (if supported)
    - Assign owner (optional)
  - List runs
  - View run details
- Run Execution:
  - Execute tests in a run:
    - Set status per test: Pass/Fail/Blocked/Untested
    - Add notes/comments per test
  - Persist results and display run summary:
    - Counts per status
    - Completion % and last updated timestamp

### 2.6 Reporting (Phase 1 Minimal)
- Run-level reporting:
  - Summary counts by status
  - Basic trend chart of run results over time (optional if endpoint exists)
- Export (optional, only if backend supports reliably in Phase 1):
  - Export run summary to CSV or PDF

## 3. Out of Scope (Phase 1)
- Automation execution integration (CI triggers, Playwright/Selenium run ingestion)
- Advanced test case features:
  - Parameterized steps/datasets
  - Shared steps library
  - Rich custom fields designer
  - Tag/label taxonomy management beyond basic enums
  - Case versioning and approvals workflow
- Advanced run features:
  - Test plans, milestones/releases, cross-project runs
  - Rerun subsets, failure clustering, flakiness analytics
- Defect management integrations (Jira, Azure DevOps) beyond storing external links
- Multi-tenant administration UI (tenant provisioning, billing, org management)
- Audit logs, compliance evidence trails (Phase 2+)
- Full permissions matrix UI (fine-grained feature flags)
- Attachments and media evidence management (Phase 2 unless already trivial)

## 4. Deliverables
### 4.1 UI Application (PrimeQA UI)
- Fully functional Phase 1 UI integrated with backend services
- Consistent use of `fog-ui` for:
  - API client lifecycle (AxiosProvider)
  - Shared UI components
  - Toast and error handling

### 4.2 Documentation
- README:
  - Local setup steps
  - Environment variable definitions
  - Service dependency list and expected ports
- `.env.example`
- Minimal developer notes:
  - Folder structure conventions
  - How to add a new service/module pattern

### 4.3 Quality Gates
- Lint and typecheck passing
- Minimal automated tests:
  - Smoke test for login + protected route
  - API client token injection + refresh path test (unit-level)
  - Render test for key pages (dashboard, suites list)

## 5. Assumptions and Dependencies
- Backend services exist and expose stable contracts for:
  - Auth (login + refresh)
  - Projects
  - Suites/sections/cases
  - Runs/results
  - Configurations/environments
- All service base URLs are configurable via environment variables.
- RBAC endpoints exist or are stubbed for Phase 1.

## 6. Acceptance Criteria
- A user can:
  1. Log in and remain logged in via refresh tokens
  2. Create a project and view the project dashboard
  3. Create suites, sections, and test cases
  4. Create a manual test run from selected cases
  5. Execute tests in the run and see persisted results with correct summary counts

## 7. Milestones
- M1: Auth + AxiosProvider integration complete
- M2: Projects + Dashboard stable
- M3: Suites/Sections/Cases CRUD complete
- M4: Runs + Execution + Results complete
- M5: Reporting minimal + docs + quality gates


# PrimeQA TCMS Phase 2 Scope

## 1. Purpose
Expand PrimeQA TCMS from “core manual test management and execution” into a scalable, enterprise-capable platform with richer test asset modeling, advanced execution workflows, configurable metadata, integrations, and actionable reporting. Phase 2 focuses on depth (power features) and operational maturity (governance, extensibility, reliability).

## 2. In Scope

### 2.1 Platform and Architecture Enhancements
- Multi-tenant readiness (if not fully delivered in Phase 1):
  - Tenant context selection (if applicable)
  - Tenant-scoped data isolation behaviors validated in UI flows
- Improved navigation and UX consistency:
  - Global search (projects/suites/cases/runs)
  - Breadcrumbs for Suite > Section > Case navigation
  - Saved filters per user (local storage or backend if available)
- Performance and resilience:
  - Pagination for all large lists (users, cases, runs, results)
  - Debounced search and server-side filtering
  - Standardized loading/error states across modules (via `fog-ui` patterns)
- Accessibility and UI quality:
  - Keyboard navigation baseline
  - Form validation completeness, consistent error messaging

### 2.2 Test Case Management (Advanced)
- Shared Steps Library
  - Create, edit, version shared steps
  - Insert shared steps into cases
  - Track usage and impact (where shared steps are used)
- Datasets and Parameterization
  - Case-level datasets (multiple rows)
  - Parameter tokens in steps and expected results
  - Run-time dataset selection for execution
- Attachments
  - Attach files to cases and steps (if backend supports)
  - Preview/download attachments in UI
- Case versioning and audit trail (if supported)
  - Version history view
  - Compare versions (basic diff)
  - Restore previous version (optional)
- Bulk operations
  - Bulk edit fields (priority/type/status/labels)
  - Bulk move between sections/suites
  - Bulk archive/deprecate
- Labels and tagging
  - Tag management (create/edit/delete)
  - Tag assignment and tag-based filtering
- Rich filtering
  - Filter by tags, owner, updated date, automation status, custom fields
  - Advanced query builder (optional, if endpoint exists)

### 2.3 Custom Fields and Metadata Configuration
- Custom field schema per project:
  - Define custom fields for cases, runs, results (text, number, enum, boolean, date)
  - Required/optional rules
  - Default values
- Case Templates / Case Types management
- Priority, Status, and Resolution catalogs (project-configurable)
- Result fields configuration:
  - Configure what evidence/metadata is collected per result

### 2.4 Test Execution (Advanced Workflows)
- Test Plans
  - Create plan containing multiple runs
  - Plan progress dashboard and drill-down views
- Milestones/Releases
  - Link runs and plans to milestones
  - Release readiness reporting
- Rerun and retest workflows
  - Rerun failed tests only
  - Clone run with selective inclusion
  - Regression vs smoke run templates
- Assignment and collaboration
  - Assign tests to users within a run
  - Per-test discussion/comments thread
  - Reviewer/approver workflow (optional)
- Evidence-first execution
  - Attach screenshots/logs per result
  - Structured “actual result” capture
- Execution modes (UI-level)
  - Step-by-step runner with per-step pass/fail (if supported)
  - Quick status update mode for large regression runs

### 2.5 Integrations (Operational)
- Defect tracking integration (at least one):
  - Jira integration (create/link issue from failed result)
  - Store external issue key + status snapshot
- Identity and authentication hardening (optional, if required):
  - SSO (OIDC/SAML) support, if backend supports
  - MFA support, if backend supports
- Webhooks (if backend supports):
  - Emit events for run created, result updated, case changed

### 2.6 Automation and CI Ingestion (Foundational)
Phase 2 does not need to “run automation,” but it should accept automation results reliably.
- Automation result ingestion:
  - Import results into a run from CI (API-driven)
  - Map automated tests to cases via identifiers/tags
  - Display automation metadata (build number, commit SHA, pipeline link)
- Flaky test indicators (basic):
  - Mark tests as flaky based on repeated inconsistent outcomes (if backend supports)

### 2.7 Reporting and Analytics (Meaningful Insights)
- Dashboards:
  - Project quality dashboard (pass rate trends, failure hotspots)
  - Run velocity metrics (completion over time, tester throughput)
- Analytics:
  - Trends by suite/section/tag/configuration
  - Failure categorization (manual tagging or configured taxonomy)
- Exporting:
  - CSV export for runs, results, and cases
  - PDF summary export (optional)

### 2.8 Governance and Compliance Readiness (Lightweight)
- Audit log UI (if backend supports):
  - Who changed what, when (cases/runs/results/configs)
- Role-based access control (expanded):
  - Permissions matrix view (read/write/admin per module)
  - Enforce restricted actions in UI (hide/disable controls)

## 3. Out of Scope (Phase 2)
- Full test automation execution orchestration platform
- Visual test design studio / low-code automation builder
- Requirements management module (full RM with traceability matrices)
- Full billing/subscription management UI (unless explicitly required)
- Advanced AI test generation features (Phase 3+)

## 4. Deliverables
### 4.1 UI Capabilities
- Complete advanced test asset workflows:
  - Shared steps, datasets, attachments, bulk operations
- Complete advanced execution workflows:
  - Plans, milestones, reruns, assignment, evidence capture
- Integrations:
  - At least one defect tool integration (Jira preferred)
  - Automation result ingestion UI support (viewing and mapping)

### 4.2 Configuration UI
- Project-level configuration pages for:
  - Custom fields
  - Status/priority catalogs
  - Result field schema
  - Environments/integrations parameters fully corrected and functional

### 4.3 Reporting UI
- Dashboard pages with drill-down
- Export features (CSV minimum)

### 4.4 Quality and Delivery
- Expanded automated tests:
  - Hook/API layer tests
  - Page-level smoke tests for major flows
- Performance baseline:
  - Pagination everywhere
  - No major UI regressions under large datasets

## 5. Assumptions and Dependencies
- Backend supports (or will support) Phase 2 entities:
  - Shared steps, datasets, attachments, custom fields, plans, milestones
  - Integration endpoints (Jira/webhooks)
  - Automation ingestion endpoints
- Stable identifiers exist to map automated tests to cases.

## 6. Acceptance Criteria
- A team can:
  1. Build and maintain a mature test case repository (shared steps, datasets, bulk operations)
  2. Execute structured releases via plans and milestones
  3. Assign work across testers and track progress at plan/run/test level
  4. Link failures to defects and track status
  5. Ingest automation results from CI into runs and view them in the same reporting model
  6. Configure project-specific metadata (custom fields and result schema) without code changes
- Reports provide actionable insights (trend + drill-down) and can be exported.
- UI remains performant under realistic enterprise dataset sizes.

## 7. Milestones
- M1: Custom fields + catalogs configuration UI
- M2: Shared steps + datasets + bulk operations
- M3: Plans + milestones + rerun workflows
- M4: Integrations (Jira) + automation ingestion baseline
- M5: Reporting expansion + exports + governance/audit views


# PrimeQA TCMS Phase 3 Scope

## 1. Purpose
Transform PrimeQA from a feature-complete TCMS into an enterprise-grade Quality Intelligence and Test Operations platform. Phase 3 focuses on scale (multi-tenant and enterprise controls), deep automation orchestration, traceability across the SDLC, advanced analytics, and optional AI-assisted acceleration. Phase 3 should make PrimeQA competitive against mature incumbents while preserving extensibility for domain-specific customization.

## 2. In Scope

### 2.1 Enterprise Platform Capabilities
- Multi-tenant administration (full):
  - Tenant provisioning and lifecycle (create/suspend/delete)
  - Tenant-level settings and branding
  - Data partitioning validation (hard isolation)
- Organization and team structure:
  - Orgs, teams, and team-scoped project visibility
  - Delegated administration per team
- Advanced access control:
  - Full RBAC/ABAC support (roles + attribute-based restrictions)
  - Permission sets per project, suite, run, configuration, and integration
  - Impersonation (admin only) for support and troubleshooting (if permitted)
- Security and compliance baseline:
  - MFA enforcement policies (if supported)
  - Session controls, device/session management
  - Audit log export
  - Data retention policies (results retention, attachment retention)
  - GDPR/DSAR support workflows (if applicable)

### 2.2 Requirements and Traceability (Quality Management Layer)
- Requirements module (light-to-medium weight):
  - Requirements repository per project
  - Hierarchies/epics/stories mapping
- Traceability:
  - Requirement → Test Case linkage
  - Requirement → Run/Result coverage tracking
  - Traceability matrix views and export
- Change impact analysis:
  - Identify impacted cases/runs by requirement changes
  - Highlight untested/at-risk requirements

### 2.3 Automation Orchestration (Beyond Ingestion)
Phase 2 accepts automation results. Phase 3 orchestrates automation at scale.
- Execution orchestration:
  - Trigger automation runs from PrimeQA (via CI providers)
  - Queueing, scheduling, and concurrency control
  - Environment reservation/locking (optional)
- Provider integrations:
  - Jenkins, GitHub Actions, GitLab CI (minimum 2 supported)
  - Pipeline templates per project
- Test selection intelligence:
  - Run subsets based on tags, impacted areas, recent changes, risk profile
  - “Smoke/regression” suite definitions as reusable presets
- Artifact ingestion:
  - Structured upload of logs, traces, screenshots, videos
  - Build metadata capture (commit, branch, PR, deploy version)
- Flaky test management (full):
  - Flakiness scoring and quarantine workflows
  - Retry policies and confidence scoring
  - Trend analysis and stabilization backlog export

### 2.4 Quality Intelligence and Advanced Analytics
- Cross-cutting analytics:
  - Failure clustering (by component, error signature, endpoint, stack trace)
  - Hotspot detection (most frequently failing areas)
  - Mean-time-to-detect / mean-time-to-repair metrics (if integrated)
- Engineering performance alignment (optional where data exists):
  - DORA-adjacent insights: change failure rate signals via CI and defects
- Reliability and signal quality:
  - Distinguish product regressions from environment failures
  - Noise reduction mechanisms (quarantine, suppression, rerun confirmation)
- Executive dashboards:
  - Release readiness scorecards
  - Coverage health by requirement/component
  - Risk heatmaps by product area

### 2.5 Defect and Work Management Ecosystem (Expanded)
- Deep integration with issue trackers:
  - Jira (advanced), Azure DevOps, Linear (optional)
  - Bi-directional sync: status updates, comments, links
- Workflow automation:
  - Auto-create defects on threshold rules (e.g., “3 failures in main branch”)
  - Auto-assign based on ownership mapping
- Ownership mapping:
  - Component ownership registry (team/service ownership)
  - Auto-routing of failures and stability tasks

### 2.6 Extensibility and Marketplace Model
- Plugin architecture (UI + API):
  - Custom panels in case/run/result views
  - Custom field types and validators
  - Custom reports as modules
- Integration registry:
  - OAuth token vault patterns (if applicable)
  - Admin UI for managing integrations
- SDK and templates:
  - Reference plugin examples
  - CI integration templates and quick-start kits

### 2.7 AI-Assisted Capabilities (Optional but Strategic)
AI features should be guarded behind explicit user controls and auditability.
- Test authoring assistance:
  - Suggest steps based on templates
  - Convert notes into structured steps
  - Improve phrasing consistency and reduce ambiguity
- Failure triage assistance:
  - Suggest likely root cause category
  - Recommend owner/team based on patterns
  - Summarize failure evidence
- Coverage guidance:
  - Identify low-coverage requirements/components
  - Suggest test additions based on change patterns
- Governance:
  - AI suggestions are non-destructive by default
  - Explainability: show what data informed recommendations
  - “Human approval required” workflows

### 2.8 Non-Functional Requirements and Operational Excellence
- Scalability:
  - Large enterprise dataset performance targets
  - Efficient search indexing (cases/results/requirements)
- Observability:
  - Admin dashboards for service health
  - Error tracking and alerting integration points
- Backup and disaster recovery considerations (supporting UI hooks, if relevant)
- Localization/i18n expansion (if needed)

## 3. Out of Scope (Phase 3)
- Full ALM replacement (complete Jira/Azure DevOps project management replacement)
- Full performance testing platform (dedicated load testing orchestration)
- Full security scanning platform (SAST/DAST orchestration)
- Fully autonomous AI agents that change production without explicit approval

## 4. Deliverables
### 4.1 Enterprise Admin Console
- Tenant, org/team, policy, access control management
- Audit and retention controls
- Integration management at org/tenant level

### 4.2 Requirements and Traceability Module
- Requirements repository views
- Coverage and traceability matrix
- Impact analysis reports

### 4.3 Automation Orchestration Module
- Trigger and schedule automation runs
- Provider integrations (minimum two CI systems)
- Artifact management and flakiness workflows

### 4.4 Quality Intelligence Suite
- Advanced analytics dashboards and drill-down
- Failure clustering and hotspot detection
- Executive scorecards and risk heatmaps

### 4.5 Extensibility Framework
- Plugin SDK, documentation, and example plugins
- Integration registry and module loading pattern

### 4.6 AI Assistance (If Enabled)
- Authoring assistance and triage summaries
- Administrative controls and auditing of AI actions

## 5. Assumptions and Dependencies
- Backend capabilities exist or will be delivered for:
  - Requirements/traceability entities
  - Orchestration endpoints and CI provider connectors
  - Analytics pipelines and indexing
  - Plugin/module loading support
- Legal/security review for tenant isolation, audit, and AI features where applicable.

## 6. Acceptance Criteria
- Enterprise tenant can be provisioned and administered entirely through the UI.
- Requirements can be linked to cases and coverage can be reported at release level.
- Users can trigger automation runs from PrimeQA and see artifacts and results linked to cases/runs.
- Flaky tests can be identified, quarantined, tracked, and reported with measurable reduction over time.
- Dashboards provide actionable, drillable insights at team and executive levels.
- Extension points exist to add custom reports/integrations without modifying core UI.
- Optional AI features are controlled, auditable, and non-destructive by default.

## 7. Milestones (Suggested)
- M1: Enterprise admin console + tenant/org/team controls
- M2: Requirements + traceability matrix + coverage reporting
- M3: Automation orchestration (CI integrations, triggers, artifacts)
- M4: Quality intelligence dashboards + failure clustering + flakiness suite
- M5: Plugin framework + SDK + example modules
- M6: Optional AI assistance rollout (guardrails + pilot)
