import { useState } from "react";
import { Environment, Parameter, Integration } from "../types";
import { ConfigurationAPI } from "../api";
import { useApi } from "./useApi";

//
// 🔹 ENVIRONMENTS
//
export function useEnvironments() {
  return useApi<Environment[]>(ConfigurationAPI.environmentGetAll);
}

export function useCreateEnvironment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEnvironment = async (data: Partial<Environment>) => {
    setLoading(true);
    setError(null);
    try {
      return await ConfigurationAPI.environmentCreate(data);
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

  const updateEnvironment = async (id: string, data: Partial<Environment>) => {
    setLoading(true);
    setError(null);
    try {
      return await ConfigurationAPI.environmentUpdate(id, data);
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

  const deleteEnvironment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await ConfigurationAPI.environmentDelete(id);
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

//
// 🔹 PARAMETERS
//
export function useParameters() {
  return useApi<Parameter[]>(ConfigurationAPI.parameterGetAll);
}

export function useCreateParameter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createParameter = async (data: Partial<Parameter>) => {
    setLoading(true);
    setError(null);
    try {
      return await ConfigurationAPI.parameterCreate(data);
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

  const updateParameter = async (id: string, data: Partial<Parameter>) => {
    setLoading(true);
    setError(null);
    try {
      return await ConfigurationAPI.parameterUpdate(id, data);
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

  const deleteParameter = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await ConfigurationAPI.parameterDelete(id);
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

//
// 🔹 INTEGRATIONS
//
export function useIntegrations() {
  return useApi<Integration[]>(ConfigurationAPI.integrationGetAll);
}

export function useCreateIntegration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createIntegration = async (data: Partial<Integration>) => {
    setLoading(true);
    setError(null);
    try {
      return await ConfigurationAPI.integrationCreate(data);
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

  const updateIntegration = async (id: string, data: Partial<Integration>) => {
    setLoading(true);
    setError(null);
    try {
      return await ConfigurationAPI.integrationUpdate(id, data);
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

  const deleteIntegration = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await ConfigurationAPI.integrationDelete(id);
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
