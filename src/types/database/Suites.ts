export interface Suite {
  _id: string;
  projectId: string;
  suiteId: string;
  parentId?: string | null;
  name: string;
  description?: string;
  order?: number;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Section {
  _id: string;
  suiteId: string;
  projectId: string;
  name: string;
  description?: string;
  order?: number;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  testCaseIds?: string[];
}