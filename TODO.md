# PrimeQA-UI - TODO List

**Last Updated:** January 15, 2026

This document tracks missing features, incomplete implementations, and technical debt in the PrimeQA-UI project.

---

## 🚨 Critical Issues (High Priority)

### 1. Configuration Service API Endpoints - BROKEN
**Status:** ❌ Critical Bug  
**Location:** `src/config/apiConfig.ts` (Lines 119-134)  
**Issue:** Copy-paste error - environment, parameter, and integration endpoints all incorrectly point to `/users`

**Current (Broken):**
```typescript
environment: {
  list: `${API_BASE_URLS.configuration}/users`,  // ❌ WRONG
  getById: (id: string) => `${API_BASE_URLS.configuration}/users/${id}`,
  // ...
}
```

**Should be:**
```typescript
environment: {
  list: `${API_BASE_URLS.configuration}/environments`,
  getById: (id: string) => `${API_BASE_URLS.configuration}/environments/${id}`,
  // ...
}
```

**Impact:** Configuration features completely broken  
**Estimate:** 15 minutes

---

### 2. Password Reset Not Implemented
**Status:** ❌ TODO Comment  
**Location:** `src/pages/login/components/ForgotPassword.tsx` (Line 12)

**Current State:**
- Component exists with form UI
- No actual password reset logic
- TODO comment in code

**Required:**
- Implement API call to backend password reset endpoint
- Add email validation
- Add success/error feedback
- Handle reset token flow

**Estimate:** 2-3 hours

---

### 3. User Registration - Hardcoded Admin Role
**Status:** ⚠️ Security Issue  
**Location:** `src/pages/login/components/Register.tsx` (Line 23)

**Current:**
```typescript
// TODO: This roleId is hardcoded to admin role (69037d7e04c235dfa038bc3a).
role: '69037d7e04c235dfa038bc3a',
```

**Required:**
- Create default "User" role or get from backend
- Remove hardcoded admin role assignment
- Add role selection for admin users only

**Estimate:** 1-2 hours

---

### 4. Environment Configuration Issues
**Status:** ⚠️ Configuration Error  
**Location:** `.env` file

**Issues:**
- Duplicate entries (multiple `API_CONFIG_SERVICE_URL`, `API_RESULTS_SERVICE_URL`, etc.)
- Missing `REACT_APP_` prefix (React won't read these variables)
- Poor organization

**Current:**
```env
API_USER_SERVICE_URL=http://localhost:8081
API_CONFIG_SERVICE_URL=http://localhost:8085/api
API_CONFIG_SERVICE_URL=http://localhost:8085/api  # ❌ Duplicate
```

**Required:**
- Clean up duplicates
- Rename all to `REACT_APP_*` prefix
- Create `.env.example` file
- Update references in `apiConfig.ts`

**Estimate:** 30 minutes

---

## 📋 Missing Features (Medium Priority)

### 5. TODO/Task Management Feature
**Status:** 🔨 Partially Implemented  
**Evidence:**
- Commented out in `src/config/Menus.ts` (Line 15)
- Mock data exists: `public/mock-data/todos.json`
- Form fields defined in `src/Forms/ProjectManagement.ts` (Line 185+)
- No page, route, or API implementation

**Required Work:**
- [ ] Create `src/api/todo.api.ts` with CRUD operations
- [ ] Add API endpoints to `src/config/apiConfig.ts`
- [ ] Create page: `src/pages/projects/todos/index.tsx`
- [ ] Create component: `src/pages/projects/todos/components/TodoView.tsx`
- [ ] Add route to `src/App.tsx`
- [ ] Uncomment menu item in `src/config/Menus.ts`
- [ ] Create types in `src/types/todo.types.ts`
- [ ] Export types from `src/types/index.ts`

**Estimate:** 6-8 hours

**Alternative:** If feature not needed, remove:
- Mock data file
- Form definitions
- Commented menu item
- References in activities.json

---

### 6. System Settings / Administration Page
**Status:** ❌ Not Implemented  
**Location:** Commented in `src/config/Menus.ts` (Line 34)

**Commented Out:**
```typescript
//{ label: "System Settings", path: "/configuration/administration" },
```

**Required Work:**
- [ ] Create page: `src/pages/configuration/administration/index.tsx`
- [ ] Define what system settings are needed (e.g., app config, integrations, logs)
- [ ] Create form fields in `src/Forms/SystemSettings.ts` (currently empty)
- [ ] Add route to `src/App.tsx`
- [ ] Uncomment menu item

**Estimate:** 4-6 hours

---

### 7. Testing Configurations Page
**Status:** ❌ Not Implemented  
**Location:** Commented in `src/config/Menus.ts` (Line 36)

**Commented Out:**
```typescript
//{ label: "Testing Configs", path: "/configuration/testing" }
```

**Required Work:**
- [ ] Create page: `src/pages/configuration/testing/index.tsx`
- [ ] Define testing configuration options
- [ ] Create form fields in `src/Forms/TestConfiguration.ts` (currently empty)
- [ ] Add route to `src/App.tsx`
- [ ] Uncomment menu item

**Estimate:** 4-6 hours

---

### 8. Complete Configuration API Implementation
**Status:** 🔨 Incomplete  
**Location:** `src/api/configuration.api.ts`

**Missing Methods:**
- Environment CRUD operations
- Parameter CRUD operations  
- Integration CRUD operations
- Proper typing for configuration entities

**Required:**
- [ ] Add environment API methods
- [ ] Add parameter API methods
- [ ] Add integration API methods
- [ ] Create types in `src/types/configuration.types.ts`
- [ ] Update `src/hooks/useConfiguration.ts`

**Estimate:** 3-4 hours

---

### 9. Milestone Update/Delete Operations
**Status:** 🔨 Incomplete  
**Location:** `src/api/project.api.ts`

**Current:** Only `milestoneGetAll` and `milestoneCreate` exist

**Required:**
- [ ] Add `milestoneUpdate` method
- [ ] Add `milestoneDelete` method
- [ ] Add `milestoneGetById` method

**Estimate:** 1 hour

---

## 🧪 Testing & Quality (Medium Priority)

### 10. No Unit Tests
**Status:** ❌ Not Started  
**Evidence:** No `.test.ts` or `.spec.ts` files exist

**Dependencies Installed:**
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jest`

**Required:**
- [ ] Write tests for API clients
- [ ] Write tests for hooks (useProjects, useUser, etc.)
- [ ] Write tests for forms
- [ ] Write component tests for critical pages
- [ ] Set up test coverage reporting

**Priority Areas:**
1. Authentication flow tests
2. API client tests  
3. Form validation tests
4. Hook tests

**Estimate:** 20-30 hours (ongoing)

---

### 11. ESLint & Prettier Configuration Missing
**Status:** ⚠️ Not Configured  
**Dependencies Installed:**
- `eslint`
- `prettier`
- `eslint-config-prettier`
- Various ESLint plugins

**Required:**
- [ ] Create `.eslintrc.json` or `.eslintrc.js`
- [ ] Create `.prettierrc.json`
- [ ] Create `.eslintignore` and `.prettierignore`
- [ ] Run linter and fix existing issues
- [ ] Add lint script to package.json
- [ ] Set up pre-commit hooks (optional)

**Example Config Files Needed:**

`.eslintrc.json`:
```json
{
  "extends": [
    "react-app",
    "prettier"
  ],
  "plugins": ["react", "react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

`.prettierrc.json`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

**Estimate:** 2-3 hours

---

## 📚 Documentation (Low Priority)

### 12. Project Documentation Missing
**Status:** ❌ Only Default CRA README  
**Location:** `README.md`

**Current:** Standard Create React App boilerplate

**Required Sections:**
- [ ] Project overview and purpose
- [ ] Architecture diagram (microservices)
- [ ] Prerequisites and dependencies
- [ ] Backend services setup instructions
- [ ] Local development setup
- [ ] Environment variables documentation
- [ ] API documentation or link to API docs
- [ ] Deployment instructions
- [ ] Contributing guidelines
- [ ] License information

**Estimate:** 4-6 hours

---

### 13. API Documentation
**Status:** ❌ Not Created

**Required:**
- [ ] Document all API endpoints
- [ ] Request/response examples
- [ ] Authentication flow
- [ ] Error codes and handling
- [ ] Rate limiting info (if applicable)

**Options:**
- Use Swagger/OpenAPI spec
- Create markdown docs
- Use Postman collection

**Estimate:** 6-8 hours

---

## 🌍 Internationalization (Low Priority)

### 14. i18n Setup Incomplete
**Status:** 🔨 Dependencies Only  
**Installed:**
- `i18next`
- `react-i18next`
- `i18next-browser-languagedetector`

**Missing:**
- [ ] Translation JSON files (e.g., `public/locales/en/translation.json`)
- [ ] i18n configuration file
- [ ] Language switcher component
- [ ] Wrap App with I18nextProvider
- [ ] Replace hardcoded strings with translation keys

**Estimate:** 8-12 hours (for full implementation)

---

## 🚀 DevOps & Infrastructure (Low Priority)

### 15. Docker Configuration Missing
**Status:** ❌ Not Created

**Required:**
- [ ] Create `Dockerfile` for frontend
- [ ] Create `docker-compose.yml` for full stack
- [ ] Create `.dockerignore`
- [ ] Document Docker setup in README

**Estimate:** 2-3 hours

---

### 16. CI/CD Pipeline Missing
**Status:** ❌ Not Created

**Required:**
- [ ] Create `.github/workflows/ci.yml` for automated testing
- [ ] Create `.github/workflows/deploy.yml` for deployment
- [ ] Set up linting in CI
- [ ] Set up test coverage reporting
- [ ] Set up build verification

**Estimate:** 3-4 hours

---

## 🔧 Technical Improvements (Ongoing)

### 17. Error Handling Standardization
**Status:** ⚠️ Inconsistent

**Issues:**
- Different error handling patterns across components
- No global error boundary
- Inconsistent user feedback for errors

**Required:**
- [ ] Create global error boundary component
- [ ] Standardize API error handling
- [ ] Create toast/notification system
- [ ] Add error logging service

**Estimate:** 4-6 hours

---

### 18. Loading State Management
**Status:** ⚠️ Inconsistent

**Issues:**
- Some components use local loading states
- No global loading indicator
- Inconsistent loading UX

**Required:**
- [ ] Create global loading context
- [ ] Standardize loading indicators
- [ ] Add skeleton screens for major views
- [ ] Implement optimistic updates where appropriate

**Estimate:** 3-4 hours

---

### 19. Form Validation Improvements
**Status:** ⚠️ Basic Only

**Current:** Using `react-hook-form` but minimal validation

**Required:**
- [ ] Add Zod schemas for all forms
- [ ] Improve error messages
- [ ] Add field-level validation
- [ ] Add async validation where needed

**Estimate:** 4-6 hours

---

### 20. Authentication Token Refresh
**Status:** ⚠️ Needs Verification

**Required:**
- [ ] Verify token refresh logic works
- [ ] Add automatic token refresh on 401
- [ ] Handle refresh token expiration
- [ ] Add logout on authentication failure

**Estimate:** 2-3 hours

---

## 🎨 UI/UX Improvements (Nice to Have)

### 21. Dark Mode Support
**Status:** ❌ Not Implemented

**Required:**
- [ ] Set up MUI theme with dark mode
- [ ] Add theme toggle component
- [ ] Store theme preference
- [ ] Test all components in dark mode

**Estimate:** 4-6 hours

---

### 22. Responsive Design Review
**Status:** ⚠️ Unknown

**Required:**
- [ ] Test on mobile devices
- [ ] Test on tablets  
- [ ] Fix responsive issues
- [ ] Add mobile-specific navigation

**Estimate:** 6-8 hours

---

### 23. Accessibility (a11y) Audit
**Status:** ❌ Not Done

**Required:**
- [ ] Run accessibility audit tools
- [ ] Add ARIA labels where needed
- [ ] Ensure keyboard navigation works
- [ ] Test with screen readers
- [ ] Fix color contrast issues

**Estimate:** 8-10 hours

---

## 📊 Summary

### By Priority:

**🚨 Critical (Must Fix):** 4 items (~4-6 hours)
- Configuration API endpoints fix
- Password reset implementation  
- User registration role fix
- Environment variables fix

**📋 Medium Priority:** 15 items (~80-110 hours)
- Missing features (TODO, System Settings, Testing Configs)
- API completions
- Testing setup
- Code quality tools

**📚 Low Priority:** 4 items (~25-35 hours)
- Documentation
- i18n setup
- Docker & CI/CD

**🎨 Nice to Have:** 3 items (~18-24 hours)
- Dark mode
- Responsive review
- Accessibility audit

### Total Estimated Work: 127-175 hours

---

## 🎯 Recommended Roadmap

### Sprint 1 (Week 1): Fix Critical Issues
- [x] Fix configuration API endpoints
- [x] Fix environment variables
- [x] Fix user registration role
- [ ] Implement password reset

### Sprint 2 (Week 2): Testing & Quality
- [ ] Set up ESLint & Prettier
- [ ] Write core unit tests
- [ ] Add error boundary
- [ ] Standardize loading states

### Sprint 3 (Week 3): Complete Core Features
- [ ] Implement TODO feature OR remove all references
- [ ] Complete milestone API methods
- [ ] Improve form validations

### Sprint 4 (Week 4): Configuration Features
- [ ] Implement System Settings page
- [ ] Implement Testing Configs page
- [ ] Complete configuration API

### Sprint 5 (Week 5): Documentation & DevOps
- [ ] Write comprehensive README
- [ ] Create Docker setup
- [ ] Set up CI/CD pipeline
- [ ] API documentation

### Sprint 6+ (Ongoing): Polish
- [ ] i18n implementation
- [ ] Responsive design fixes
- [ ] Accessibility improvements
- [ ] Dark mode support

---

## 📝 Notes

- **Backend Dependency:** Many of these items require corresponding backend API endpoints to exist
- **Feature Decisions:** Some commented-out features may be intentionally postponed - verify with team
- **Code Quality:** Run ESLint/Prettier once configured to identify additional technical debt
- **Testing Strategy:** Start with critical path tests (auth, data fetching) before comprehensive coverage

---

**Next Steps:**
1. Review this TODO with the team
2. Prioritize based on business requirements
3. Assign owners to each task
4. Create GitHub issues for tracking
5. Begin with Sprint 1 critical fixes
