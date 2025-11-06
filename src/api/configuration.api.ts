import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";
import { Environment, Parameter, Integration } from "../types";

export const ConfigurationAPI = {
  environmentGetAll: async (): Promise<Environment[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.environment.list, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  environmentGetById: async (id: string): Promise<Environment> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.environment.getById(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  environmentCreate: async (data: Partial<Environment>): Promise<Environment> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.environment.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  environmentUpdate: async (id: string, data: Partial<Environment>): Promise<Environment> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.environment.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  environmentDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.environment.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  //
  // 🔹 Parameter APIs
  //
  parameterGetAll: async (): Promise<Parameter[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.parameter.list, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  parameterGetById: async (id: string): Promise<Parameter> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.parameter.getById(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  parameterCreate: async (data: Partial<Parameter>): Promise<Parameter> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.parameter.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  parameterUpdate: async (id: string, data: Partial<Parameter>): Promise<Parameter> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.parameter.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  parameterDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.parameter.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  //
  // 🔹 Integration APIs
  //
  integrationGetAll: async (): Promise<Integration[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.integration.list, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  integrationGetById: async (id: string): Promise<Integration> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.integration.getById(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  integrationCreate: async (data: Partial<Integration>): Promise<Integration> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.integration.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  integrationUpdate: async (id: string, data: Partial<Integration>): Promise<Integration> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.integration.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  integrationDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.integration.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

};
