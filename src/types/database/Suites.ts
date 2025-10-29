export interface Suite {
  _id?: string;
  projectId: string;
  parentId?: string | null;
  name: string;
  description?: string;
  order?: number;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
