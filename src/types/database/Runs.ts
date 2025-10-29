export interface TestRun {
  _id?: string;
  projectId: string;
  suiteId?: string;
  name: string;
  description?: string;
  status?: 'Not Started' | 'In Progress' | 'Completed';
  startDate?: string;
  endDate?: string;
  createdBy?: string;
  assignedTo?: string;
  configurations?: string[]; // array of Configuration IDs
  tests?: string[]; // array of Test IDs
  metrics?: RunMetrics;
  createdAt?: string;
  updatedAt?: string;
}

export interface RunMetrics {
  untested?: number;
  passed?: number;
  failed?: number;
  blocked?: number;
}
