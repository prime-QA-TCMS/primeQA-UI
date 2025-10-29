export interface Project {
  _id?: string;
  name: string;
  key: string;
  description?: string;
  status?: 'Active' | 'Archived';
  type?: 'Mobile' | 'Web' | 'API' | 'Desktop';
  ownerId?: string; // reference to User
  defaultSuiteId?: string;
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string;
}

export interface Milestone {
  _id?: string;
  projectId: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: 'Active' | 'Closed' | 'Completed';
  linkedRuns?: string[];
  metrics?: MilestoneMetrics;
}

export interface MilestoneMetrics {
  untested?: number;
  passed?: number;
  failed?: number;
  blocked?: number;
}
