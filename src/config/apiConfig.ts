
export const API_BASE_URLS = {
  user: "http://localhost:8081",
  project: "http://localhost:8082",
  testcase: "http://localhost:8083",
  configuration: "http://localhost:4004/api",
  results: "http://localhost:8084",
};

export const API_ENDPOINTS = {
  // 🧍 USER-SERVICE
  auth: {
    login: `${API_BASE_URLS.user}/auth/login`,
    register: `${API_BASE_URLS.user}/auth/register`,
    logout: `${API_BASE_URLS.user}/auth/logout`,
    refresh: `${API_BASE_URLS.user}/auth/refresh`,
  },
  user: {
    list: `${API_BASE_URLS.user}/users`,
    getById: (id: string) => `${API_BASE_URLS.user}/users/${id}`,
    create: `${API_BASE_URLS.user}/users`,
    update: (id: string) => `${API_BASE_URLS.user}/users/${id}`,
    delete: (id: string) => `${API_BASE_URLS.user}/users/${id}`,
  },
  role: {
    list: `${API_BASE_URLS.user}/roles`,
    create: `${API_BASE_URLS.user}/roles`,
    update: (id: string) => `${API_BASE_URLS.user}/roles/${id}`,
    delete: (id: string) => `${API_BASE_URLS.user}/roles/${id}`,
  },
  tenant: {
    list: `${API_BASE_URLS.user}/tenants`,
    create: `${API_BASE_URLS.user}/tenants`,
    update: (id: string) => `${API_BASE_URLS.user}/tenants/${id}`,
    delete: (id: string) => `${API_BASE_URLS.user}/tenants/${id}`,
  },
  userHealth: `${API_BASE_URLS.user}/health`,

  // 📁 PROJECT-SERVICE
  project: {
    list: `${API_BASE_URLS.project}/projects`,
    getById: (id: string) => `${API_BASE_URLS.project}/projects/${id}`,
    create: `${API_BASE_URLS.project}/projects`,
    update: (id: string) => `${API_BASE_URLS.project}/projects/${id}`,
    delete: (id: string) => `${API_BASE_URLS.project}/projects/${id}`,
  },
  projectConfiguration: {
    list: (id: string) => `${API_BASE_URLS.project}/projects/${id}/configurations`,
    create: (id: string) => `${API_BASE_URLS.project}/projects/${id}/configurations`,
  },
  milestone: {
    list:  (id: string) => `${API_BASE_URLS.project}/projects/${id}/milestones`,
    create: (id: string) => `${API_BASE_URLS.project}/projects/${id}/milestones`,
  },
  projectHealth: `${API_BASE_URLS.project}/health`,

  // 🧪 TESTCASE-SERVICE
  suite: {
    list: `${API_BASE_URLS.testcase}/suites`,
    getById: (id: string) => `${API_BASE_URLS.testcase}/suites/${id}`,
    create: `${API_BASE_URLS.testcase}/suites`,
    update: (id: string) => `${API_BASE_URLS.testcase}/suites/${id}`,
    delete: (id: string) => `${API_BASE_URLS.testcase}/suites/${id}`,
  },
  section: {
    list: (suiteId: string) => `${API_BASE_URLS.testcase}/sections/suite/${suiteId}`,
    getById: (id: string) => `${API_BASE_URLS.testcase}/sections/${id}`,
    create: `${API_BASE_URLS.testcase}/sections`,
    update: (id: string) => `${API_BASE_URLS.testcase}/sections/${id}`,
    delete: (id: string) => `${API_BASE_URLS.testcase}/sections/${id}`,
  },
  testcase: {
    list: (sectionId: string) => `${API_BASE_URLS.testcase}/cases/section/${sectionId}`,
    getById: (id: string) => `${API_BASE_URLS.testcase}/cases/${id}`,
    create: `${API_BASE_URLS.testcase}/cases`,
    update: (id: string) => `${API_BASE_URLS.testcase}/cases/${id}`,
    delete: (id: string) => `${API_BASE_URLS.testcase}/cases/${id}`,
  },
  testcaseHealth: `${API_BASE_URLS.testcase}/health`,

  // 📊 RESULTS-SERVICE
  run: {
    list: (projectId: string) => `${API_BASE_URLS.results}/runs/${projectId}`,
    getById: (id: string) => `${API_BASE_URLS.results}/runs/${id}`,
    getByProjectId: (projectId: string) => `${API_BASE_URLS.results}/runs/project/${projectId}`,
    search: `${API_BASE_URLS.results}/runs/search`,
    create: `${API_BASE_URLS.results}/runs`,
    update: (id: string) => `${API_BASE_URLS.results}/runs/${id}`,
    delete: (id: string) => `${API_BASE_URLS.results}/runs/${id}`,
  },
  test: {
    list: (runId: string) => `${API_BASE_URLS.results}/tests?runId=${runId}`,
    getById: (id: string) => `${API_BASE_URLS.results}/tests/${id}`,
    getByProjectId: (projectId: string) => `${API_BASE_URLS.results}/tests/project/${projectId}`,
    search: `${API_BASE_URLS.results}/tests/search`,
    create: `${API_BASE_URLS.results}/tests`,
    update: (id: string) => `${API_BASE_URLS.results}/tests/${id}`,
    delete: (id: string) => `${API_BASE_URLS.results}/tests/${id}`,
  },
  result: {
    list: (testId: string) => `${API_BASE_URLS.results}/results?testId=${testId}`,
    getById: (id: string) => `${API_BASE_URLS.results}/results/${id}`,
    getByProjectId: (projectId: string) => `${API_BASE_URLS.results}/results/project/${projectId}`,
    search: `${API_BASE_URLS.results}/results/search`,
    create: `${API_BASE_URLS.results}/results`,
    update: (id: string) => `${API_BASE_URLS.results}/results/${id}`,
    delete: (id: string) => `${API_BASE_URLS.results}/results/${id}`,
  },
  resultsHealth: `${API_BASE_URLS.results}/health`,

  // ⚙️ CONFIGURATION-SERVICE
  environment: {
    list: `${API_BASE_URLS.configuration}/users`,
    getById: (id: string) => `${API_BASE_URLS.configuration}/users/${id}`,
    create: `${API_BASE_URLS.configuration}/users`,
    update: (id: string) => `${API_BASE_URLS.configuration}/users/${id}`,
    delete: (id: string) => `${API_BASE_URLS.configuration}/users/${id}`,
  },
  parameter: {
    list: `${API_BASE_URLS.configuration}/users`,
    getById: (id: string) => `${API_BASE_URLS.configuration}/users/${id}`,
    create: `${API_BASE_URLS.configuration}/users`,
    update: (id: string) => `${API_BASE_URLS.configuration}/users/${id}`,
    delete: (id: string) => `${API_BASE_URLS.configuration}/users/${id}`,
  },
  integration: {
    list: `${API_BASE_URLS.configuration}/users`,
    getById: (id: string) => `${API_BASE_URLS.configuration}/users/${id}`,
    create: `${API_BASE_URLS.configuration}/users`,
    update: (id: string) => `${API_BASE_URLS.configuration}/users/${id}`,
    delete: (id: string) => `${API_BASE_URLS.configuration}/users/${id}`,
  },
  configurationHealth: `${API_BASE_URLS.configuration}/health`,
};
