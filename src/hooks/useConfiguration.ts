import { useState } from 'react';
import {
  Environment,
  Parameter,
  Integration,
  EnvironmentListResponse,
  ParameterListResponse,
  IntegrationListResponse,
} from '../types';
import { ConfigurationAPI } from '../api';
import { useApi, useService } from 'fog-ui';


// 🔹 ENVIRONMENTS
export function useEnvironments(tenantId?: string) {
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);
  const resolvedTenantId = tenantId || localStorage.getItem('tenantId') || undefined;
  return useApi<Environment[]>(async () => {
    const result: EnvironmentListResponse = await configurationAPI.environmentGetAll(resolvedTenantId);
    return result.data?.items || [];
  }, [resolvedTenantId]);
}

export function useCreateEnvironment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);

  const createEnvironment = async (data: Partial<Environment>) => {
    setLoading(true);
    setError(null);
    try {
      return await configurationAPI.environmentCreate(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createEnvironment, loading, error };
}

export function useUpdateEnvironment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);

  const updateEnvironment = async (id: string, data: Partial<Environment>) => {
    setLoading(true);
    setError(null);
    try {
      return await configurationAPI.environmentUpdate(id, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateEnvironment, loading, error };
}

export function useDeleteEnvironment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);

  const deleteEnvironment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await configurationAPI.environmentDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteEnvironment, loading, error };
}


// 🔹 PARAMETERS
export function useParameters(scope?: string, scopeRefId?: string) {
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);
  const resolvedScope = scope || 'tenant';
  const resolvedScopeRefId = scopeRefId || localStorage.getItem('tenantId') || undefined;
  return useApi<Parameter[]>(async () => {
    const result: ParameterListResponse = await configurationAPI.parameterGetAll(
      resolvedScopeRefId ? resolvedScope : undefined,
      resolvedScopeRefId
    );
    return result.data?.items || [];
  }, [resolvedScope, resolvedScopeRefId]);
}

export function useCreateParameter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);

  const createParameter = async (data: Partial<Parameter>) => {
    setLoading(true);
    setError(null);
    try {
      return await configurationAPI.parameterCreate(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createParameter, loading, error };
}

export function useUpdateParameter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);

  const updateParameter = async (id: string, data: Partial<Parameter>) => {
    setLoading(true);
    setError(null);
    try {
      return await configurationAPI.parameterUpdate(id, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateParameter, loading, error };
}

export function useDeleteParameter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);

  const deleteParameter = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await configurationAPI.parameterDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteParameter, loading, error };
}


// 🔹 INTEGRATIONS
export function useIntegrations(tenantId?: string) {
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);
  const resolvedTenantId = tenantId || localStorage.getItem('tenantId') || undefined;
  return useApi<Integration[]>(async () => {
    const result: IntegrationListResponse = await configurationAPI.integrationGetAll(resolvedTenantId);
    return result.data?.items || [];
  }, [resolvedTenantId]);
}

export function useCreateIntegration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);

  const createIntegration = async (data: Partial<Integration>) => {
    setLoading(true);
    setError(null);
    try {
      return await configurationAPI.integrationCreate(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createIntegration, loading, error };
}

export function useUpdateIntegration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);

  const updateIntegration = async (id: string, data: Partial<Integration>) => {
    setLoading(true);
    setError(null);
    try {
      return await configurationAPI.integrationUpdate(id, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateIntegration, loading, error };
}

export function useDeleteIntegration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configurationService = useService('configuration');
  const configurationAPI = ConfigurationAPI(configurationService);

  const deleteIntegration = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await configurationAPI.integrationDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteIntegration, loading, error };
}
