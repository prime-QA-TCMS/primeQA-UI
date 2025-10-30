export interface TestCase {
  _id: string;
  suiteId: string;
  title: string;
  description?: string;
  preconditions?: string;
  steps?: string;
  expectedResult?: string;
  sharedSteps?: TestStep[];
  sectionId?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  type?: 'Functional' | 'Regression' | 'Integration' | 'Exploratory';
  status?: 'Draft' | 'Approved' | 'Deprecated';
  estimate?: number;
  references?: string[];
  automationStatus?: 'Manual' | 'Automated' | 'Planned';
  automationId?: string;
  labels?: string[];
  datasetId?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestStep {
  _id?: string;
  caseId?: string;
  order: number;
  action: string;
  data?: string;
  expected: string;
  attachments?: string[];
  validationType?: 'UI' | 'API' | 'Database';
  validationValue?: string;
}
