# PrimeQA-UI

PrimeQA-UI is a Test Case Management System (TCMS) front-end that integrates with multiple backend services:

- User Service (auth, users, roles)
- Project Service (projects, milestones, configurations)
- Testcase Service (suites, sections, test cases)
- Results Service (runs, tests, results)
- Configuration Service (environments, parameters, integrations)

## Environment Setup

CRA loads env vars prefixed with `REACT_APP_`. Copy `.env.example` to `.env` and adjust:

```
REACT_APP_API_USER_BASE_URL=http://localhost:8081
REACT_APP_API_PROJECT_BASE_URL=http://localhost:8082
REACT_APP_API_TESTCASE_BASE_URL=http://localhost:8083
REACT_APP_API_CONFIGURATION_BASE_URL=http://localhost:8085
REACT_APP_API_RESULTS_BASE_URL=http://localhost:8084
```

Base URLs are read in `src/config/apiConfig.ts` and fall back to local defaults if env vars are missing.

## Local Development

1. Install deps
	- `npm install`
2. Start the app
	- `npm start`
3. Run tests
	- `npm test` (watch mode)
	- `npm run test:ci` (CI mode)
4. Lint and format
	- `npm run lint`
	- `npm run format`
5. Build
	- `npm run build`

## Folder Conventions

- `src/pages`: Feature pages (dashboard, projects, suites, runs, milestones)
- `src/hooks`: Data hooks wrapping service APIs
- `src/api`: API client wrappers
- `src/types`: Shared TypeScript types
- `src/config`: App and API configuration

## Contribution

- Use feature branches and PRs
- CI gates: lint + test + build (scripts provided)
- Keep API calls within hooks; components remain declarative

## Notes

- Token handling and API injection are centralized via fog-ui and Axios interceptors
- API instances and fetch functions are memoized to avoid render loops
