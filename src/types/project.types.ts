import { Metrics } from "./results.types";

export interface Project {
  _id: string;
  name: string;
  description?: string;
  visibility: "private" | "public" | "team";
  isActive: boolean;
  ownerId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Milestone {
  _id: string;
  title: string;
  description?: string;
  projectId: string;
  startDate?: string;
  endDate?: string;
  status: "planned" | "in_progress" | "completed";
  createdAt?: string;
  updatedAt?: string;
  isCompleted?: boolean;
  metrics?: Metrics;
}

export interface ProjectConfiguration {
  _id: string;
  projectId: string;
  configId: string;
  key: string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectCreateRequest {
  name: string;
  description?: string;
  visibility?: "private" | "public" | "team";
  ownerId: string;
}

export interface ProjectUpdateRequest extends Partial<ProjectCreateRequest> {}
