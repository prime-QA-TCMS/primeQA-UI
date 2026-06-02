import { AxiosHelper } from 'fog-ui';
import { API_ENDPOINTS } from '../config/apiConfig';
import {
  Environment,
  Parameter,
  Integration,
  EnvironmentListResponse,
  EnvironmentResponse,
  ParameterListResponse,
  ParameterResponse,
  IntegrationListResponse,
  IntegrationResponse,
} from '../types';

export const ConfigurationAPI = (service: AxiosHelper) => ({
  // ENVIRONMENTS
  environmentGetAll: async (tenantId?: string): Promise<EnvironmentListResponse> => {
    // Accepts optional tenantId as query param
    const url = tenantId
      ? `${API_ENDPOINTS.environment.list}?tenantId=${tenantId}`
      : API_ENDPOINTS.environment.list;
    return await service.get<EnvironmentListResponse>(url);
  },

  environmentGetById: async (id: string): Promise<EnvironmentResponse> => {
    return await service.get<EnvironmentResponse>(API_ENDPOINTS.environment.getById(id));
  },

  environmentCreate: async (data: Partial<Environment>): Promise<EnvironmentResponse> => {
    return await service.post<EnvironmentResponse>(API_ENDPOINTS.environment.create, data);
  },

  environmentUpdate: async (id: string, data: Partial<Environment>): Promise<EnvironmentResponse> => {
    return await service.put<EnvironmentResponse>(API_ENDPOINTS.environment.update(id), data);
  },

  environmentDelete: async (id: string): Promise<{ message: string }> => {
    return await service.delete<{ message: string }>(API_ENDPOINTS.environment.delete(id));
  },

  // PARAMETERS
  parameterGetAll: async (scope?: string, scopeRefId?: string): Promise<ParameterListResponse> => {
    // Accepts optional scope and scopeRefId as query params
    let url = API_ENDPOINTS.parameter.list;
    const params: string[] = [];
    if (scope) params.push(`scope=${scope}`);
    if (scopeRefId) params.push(`scopeRefId=${scopeRefId}`);
    if (params.length) url += `?${params.join('&')}`;
    return await service.get<ParameterListResponse>(url);
  },

  parameterGetById: async (id: string): Promise<ParameterResponse> => {
    return await service.get<ParameterResponse>(API_ENDPOINTS.parameter.getById(id));
  },

  parameterCreate: async (data: Partial<Parameter>): Promise<ParameterResponse> => {
    return await service.post<ParameterResponse>(API_ENDPOINTS.parameter.create, data);
  },

  parameterUpdate: async (id: string, data: Partial<Parameter>): Promise<ParameterResponse> => {
    return await service.put<ParameterResponse>(API_ENDPOINTS.parameter.update(id), data);
  },

  parameterDelete: async (id: string): Promise<{ message: string }> => {
    return await service.delete<{ message: string }>(API_ENDPOINTS.parameter.delete(id));
  },

  // INTEGRATIONS
  integrationGetAll: async (tenantId?: string): Promise<IntegrationListResponse> => {
    // Accepts optional tenantId as query param
    const url = tenantId
      ? `${API_ENDPOINTS.integration.list}?tenantId=${tenantId}`
      : API_ENDPOINTS.integration.list;
    return await service.get<IntegrationListResponse>(url);
  },

  integrationGetById: async (id: string): Promise<IntegrationResponse> => {
    return await service.get<IntegrationResponse>(API_ENDPOINTS.integration.getById(id));
  },

  integrationCreate: async (data: Partial<Integration>): Promise<IntegrationResponse> => {
    return await service.post<IntegrationResponse>(API_ENDPOINTS.integration.create, data);
  },

  integrationUpdate: async (id: string, data: Partial<Integration>): Promise<IntegrationResponse> => {
    return await service.put<IntegrationResponse>(API_ENDPOINTS.integration.update(id), data);
  },

  integrationDelete: async (id: string): Promise<{ message: string }> => {
    return await service.delete<{ message: string }>(API_ENDPOINTS.integration.delete(id));
  },

  // HEALTH
  healthCheck: async (): Promise<{ status: string }> => {
    return await service.get<{ status: string }>(API_ENDPOINTS.configurationHealth);
  },
});
