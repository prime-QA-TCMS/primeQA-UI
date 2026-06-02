// Base URLs for AxiosProvider configuration (env-driven with safe fallbacks)
export const API_BASE_URLS = {
  user: process.env.REACT_APP_API_USER_BASE_URL || 'http://localhost:8081',
  project: process.env.REACT_APP_API_PROJECT_BASE_URL || 'http://localhost:8082',
  testcase: process.env.REACT_APP_API_TESTCASE_BASE_URL || 'http://localhost:8083',
  configuration: process.env.REACT_APP_API_CONFIGURATION_BASE_URL || 'http://localhost:8085',
  results: process.env.REACT_APP_API_RESULTS_BASE_URL || 'http://localhost:8084',
};

// Relative paths for use with fog-ui service instances
export const API_ENDPOINTS = {
  // 🧍 USER-SERVICE
  auth: {
    login: `/auth/login`,
    register: `/auth/register`,
    logout: `/auth/logout`,
    refresh: `/auth/refresh`,
  },
  user: {
    list: `/users`,
    getById: (id: string) => `/users/${id}`,
    create: `/users`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  role: {
    list: `/roles`,
    getById: (id: string) => `/roles/${id}`,
    create: `/roles`,
    update: (id: string) => `/roles/${id}`,
    delete: (id: string) => `/roles/${id}`,
  },
  tenant: {
    list: `/tenants`,
    getById: (id: string) => `/tenants/${id}`,
    create: `/tenants`,
    update: (id: string) => `/tenants/${id}`,
    delete: (id: string) => `/tenants/${id}`,
  },
  userHealth: `/health`,

  // 📁 PROJECT-SERVICE
  project: {
    list: `/projects`,
    getById: (id: string) => `/projects/${id}`,
    create: `/projects`,
    update: (id: string) => `/projects/${id}`,
    delete: (id: string) => `/projects/${id}`,
  },
  projectConfiguration: {
    list: (id: string) => `/projects/${id}/configurations`,
    create: (id: string) => `/projects/${id}/configurations`,
    getById: (projectId: string, configId: string) =>
      `/projects/${projectId}/configurations/${configId}`,
    update: (projectId: string, configId: string) =>
      `/projects/${projectId}/configurations/${configId}`,
  },
  milestone: {
    list: (id: string) => `/projects/${id}/milestones`,
    create: (id: string) => `/projects/${id}/milestones`,
    getById: (projectId: string, milestoneId: string) =>
      `/projects/${projectId}/milestones/${milestoneId}`,
    delete: (projectId: string, milestoneId: string) =>
      `/projects/${projectId}/milestones/${milestoneId}`,
  },
  projectHealth: `/health`,

  // 🧪 TESTCASE-SERVICE
  suite: {
    list: `/suites`,
    getById: (id: string) => `/suites/${id}`,
    create: `/suites`,
    update: (id: string) => `/suites/${id}`,
    delete: (id: string) => `/suites/${id}`,
  },
  section: {
    list: (suiteId: string) => `/sections/suite/${suiteId}`,
    getById: (id: string) => `/sections/${id}`,
    create: `/sections`,
    update: (id: string) => `/sections/${id}`,
    delete: (id: string) => `/sections/${id}`,
  },
  testcase: {
    list: (sectionId: string) => `/cases/section/${sectionId}`,
    getById: (id: string) => `/cases/${id}`,
    create: `/cases`,
    update: (id: string) => `/cases/${id}`,
    delete: (id: string) => `/cases/${id}`,
  },
  testcaseHealth: `/health`,

  // 📊 RESULTS-SERVICE
  run: {
    list: (projectId: string) => `/runs/${projectId}`,
    getById: (id: string) => `/runs/${id}`,
    getByProjectId: (projectId: string) => `/runs/project/${projectId}`,
    search: `/runs/search`,
    create: `/runs`,
    update: (id: string) => `/runs/${id}`,
    delete: (id: string) => `/runs/${id}`,
  },
  test: {
    list: (runId: string) => `/tests?runId=${runId}`,
    getById: (id: string) => `/tests/${id}`,
    getByProjectId: (projectId: string) => `/tests/project/${projectId}`,
    search: `/tests/search`,
    create: `/tests`,
    update: (id: string) => `/tests/${id}`,
    delete: (id: string) => `/tests/${id}`,
  },
  result: {
    list: (testId: string) => `/results?testId=${testId}`,
    getById: (id: string) => `/results/${id}`,
    getByProjectId: (projectId: string) => `/results/project/${projectId}`,
    getByTestId: (testId: string) => `/results/test/${testId}`,
    getByRunId: (runId: string) => `/results/run/${runId}`,
    search: `/results/search`,
    create: `/results`,
    update: (id: string) => `/results/${id}`,
    delete: (id: string) => `/results/${id}`,
  },
  resultsHealth: `/health`,

  // ⚙️ CONFIGURATION-SERVICE
  environment: {
    list: `/api/environments`,
    getById: (id: string) => `/api/environments/${id}`,
    create: `/api/environments`,
    update: (id: string) => `/api/environments/${id}`,
    delete: (id: string) => `/api/environments/${id}`,
  },
  parameter: {
    list: `/api/parameters`,
    getById: (id: string) => `/api/parameters/${id}`,
    create: `/api/parameters`,
    update: (id: string) => `/api/parameters/${id}`,
    delete: (id: string) => `/api/parameters/${id}`,
    getByScope: (scope: string) => `/api/parameters/scope/${scope}`,
    getByProject: (projectId: string) => `/api/parameters/project/${projectId}`,
    getByEnvironment: (environmentId: string) => `/api/parameters/environment/${environmentId}`,
  },
  integration: {
    list: `/api/integrations`,
    getById: (id: string) => `/api/integrations/${id}`,
    create: `/api/integrations`,
    update: (id: string) => `/api/integrations/${id}`,
    delete: (id: string) => `/api/integrations/${id}`,
  },
  configurationHealth: `/health`,
  configurationLiveness: `/health/live`,
  configurationReadiness: `/health/ready`,
};
