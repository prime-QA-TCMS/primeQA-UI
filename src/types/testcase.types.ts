export interface Suite {
  _id: string;
  projectId: string;
  name: string;
  key: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Section {
  _id: string;
  suiteId: string;
  projectId: string;
  name: string;
  key: string;
  description?: string;
  order?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestCase {
  _id: string;
  projectId: string;
  suiteId: string;
  sectionId: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  type: 'Functional' | 'Regression' | 'Performance' | 'Security' | 'Other';
  status: 'Draft' | 'Ready' | 'Deprecated';
  preconditions?: string;
  steps: string;
  expectedResult: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestStep {
  stepNumber?: number;
  action: string;
  expected: string;
  data?: Record<string, any>;
}
