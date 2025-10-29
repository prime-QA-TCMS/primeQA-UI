export interface Test {
  _id?: string;
  runId: string;
  caseId: string;
  status: 'Passed' | 'Failed' | 'Blocked' | 'Skipped' | 'Retest';
  assignee?: string;
  actualResult?: string;
  executionTime?: number;
  attachments?: string[];
  defectLink?: string;
  executedAt?: string;
  executedBy?: string;
}

export interface TestResult {
  _id?: string;
  testId: string;
  runId: string;
  status: 'Passed' | 'Failed' | 'Blocked' | 'Skipped' | 'Retest';
  comment?: string;
  evidence?: string[];
  timestamp?: string;
  executedBy?: string;
}
