
// Entity types
export interface Environment {
  _id: string;
  tenantId?: string;
  projectId?: string;
  name: string;
  description?: string;
  baseUrl: string;
  variables?: Record<string, string>;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Parameter {
  _id: string;
  id?: string;
  name: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'secret';
  scope: 'global' | 'tenant' | 'project' | 'environment';
  scopeRefId?: string;
  tenantId?: string;
  projectId?: string;
  environmentId?: string;
  isActive: boolean;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Integration {
  _id: string;
  tenantId?: string;
  projectId?: string;
  name?: string;
  type: 'jira' | 'slack' | 'github' | 'custom';
  config: Record<string, any>;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Wrapped API response types
export interface ConfigListResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface ConfigSingleResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type EnvironmentListResponse = ConfigListResponse<Environment>;
export type EnvironmentResponse = ConfigSingleResponse<Environment>;
export type ParameterListResponse = ConfigListResponse<Parameter>;
export type ParameterResponse = ConfigSingleResponse<Parameter>;
export type IntegrationListResponse = ConfigListResponse<Integration>;
export type IntegrationResponse = ConfigSingleResponse<Integration>;
