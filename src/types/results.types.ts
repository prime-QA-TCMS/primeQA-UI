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
  status: "queued" | "running" | "completed" | "failed";
  startTime?: string;
  endTime?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  metrics?: Metrics;
}


export interface TestRunResponse {
  data: TestRun[];
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
