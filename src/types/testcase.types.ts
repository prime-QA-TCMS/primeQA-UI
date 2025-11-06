export interface Suite {
  _id: string;
  name: string;
  description?: string;
  projectId: string;
  createdAt?: string;
  updatedAt?: string;
  isArchived?: boolean;
}

export interface Section {
  _id: string;
  projectId: string;
  name: string;
  description?: string;
  suiteId: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestCase {
  _id: string;
  projectId: string;
  suiteId: string;
  title: string;
  description?: string;
  sectionId: string;
  priority: "low" | "medium" | "high";
  type: "functional" | "regression" | "smoke" | "performance";
  steps: TestStep[];
  expectedResult: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestStep {
  stepNumber: number;
  action: string;
  expected: string;
}
