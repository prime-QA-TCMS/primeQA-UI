export interface Metric {
  _id?: string;
  projectId: string;
  metricType: 'Coverage' | 'PassRate' | 'DefectDensity' | 'AutomationRate';
  value: number;
  calculatedAt?: string;
}

export interface Activity {
  _id?: string;
  entityType:
    | 'Project'
    | 'Suite'
    | 'TestCase'
    | 'Run'
    | 'Result'
    | 'Milestone'
    | 'Dataset'
    | 'Plan'; // optional: placeholder for future plan module
  entityId: string;          // the specific document’s _id
  action:
    | 'Created'
    | 'Updated'
    | 'Deleted'
    | 'Executed'
    | 'Failed';
  description?: string;      // short message or summary of change
  changedFields?: Record<string, any>; // optional diff of changes
  userId?: string;           // who performed the action
  timestamp?: string;        // ISO string timestamp
  relatedRunId?: string;     // for execution-related logs
  relatedResultId?: string;  // for result tracking
  projectId?: string;        // helps filtering activities by project
  ipAddress?: string;        // optional: if tracking network activity
  metadata?: Record<string, any>; // optional contextual data
}