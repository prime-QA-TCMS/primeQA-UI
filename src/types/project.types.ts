import { Metrics } from './results.types';

export interface Project {
  _id: string;
  name: string;
  key: string;
  description?: string;
  owner: string;
  visibility: 'private' | 'public' | 'team';
  isActive: boolean;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Milestone {
  _id: string;
  projectId: string;
  title: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectConfiguration {
  _id: string;
  projectId: string;
  name: string;
  description?: string;
  baseUrl: string;
  environmentVariables: Record<string, string>;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectCreateRequest {
  name: string;
  description?: string;
  visibility?: 'private' | 'public' | 'team';
  ownerId: string;
}

export interface ProjectUpdateRequest extends Partial<ProjectCreateRequest> { }
