export interface Metrics {
  passed?: number;
  failed?: number;
  blocked?: number;
  untested?: number;
}

export interface TestRun {
  _id: string;
  name: string;
  projectId: string;
  startedBy: string;
  status: "Pending" | "Running" | "Completed" | "Aborted";
  startTime?: string;
  endTime?: string;
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
  }
}

export interface Test {
  _id: string;
  runId: string;
  testCaseId: string;
  status: "passed" | "failed" | "skipped";
  duration?: number;
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
  }
}

export interface TestResult {
  _id: string;
  testId: string;
  status: "passed" | "failed" | "skipped";
  logs?: string;
  screenshotUrl?: string;
  executedAt: string;
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
  }
}