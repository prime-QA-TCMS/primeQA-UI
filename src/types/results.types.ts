export interface Metrics {
  passed?: number;
  failed?: number;
  blocked?: number;
  untested?: number;
}

export interface TestRun {
  _id: string;
  projectId: string;
  name: string;
  description?: string;
  type: 'Manual' | 'Automated' | 'Scheduled';
  status: 'Pending' | 'Running' | 'Completed' | 'Aborted';
  environment?: string;
  executedBy: string;
  startedBy?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  metrics?: Metrics;
}

export interface TestRunCreateResponse {
  success?: boolean;
  message?: string;
  data: TestRun;
}

export interface TestRunResponse {
  success?: boolean;
  message?: string;
  data: TestRun[];
}

export interface TestRunFilterResponse {
  data: {
    total?: number;
    data: TestRun[];
  };
}

export interface Test {
  _id: string;
  runId: string;
  projectId: string;
  testCaseId: string;
  suiteId: string;
  sectionId: string;
  title: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  duration?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface TestResponse {
  data: Test[];
}

export interface TestFilterResponse {
  data: {
    total: number;
    tests: TestRun[];
  };
}

export interface TestResult {
  _id: string;
  testId: string;
  projectId: string;
  status: 'Passed' | 'Failed' | 'Blocked' | 'Skipped' | 'Retest';
  executedBy: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  logs?: string;
  screenshotUrl?: string;
  executedAt?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface TestResultResponse {
  total?: number;
  data: TestResult[];
}

export interface TestResultCreateResponse {
  success?: boolean;
  message?: string;
  data: TestResult;
}

export interface ResultsFilterResponse {
  data: {
    total?: number;
    data: TestRun[];
  };
}
