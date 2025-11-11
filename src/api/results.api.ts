import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";
import { TestRun, Test, TestResult, TestRunResponse, TestResponse, TestResultResponse, TestRunFilterResponse, TestFilterResponse, ResultsFilterResponse, TestRunCreateResponse, TestResultCreateResponse } from "../types";

export const ResultsAPI = {
  //
  // 🔹 RUN APIs
  //
  runGetAll: async (projectId: string): Promise<TestRunResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.run.list(projectId), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  runGetById: async (id: string): Promise<TestRunResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.run.getById(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  
  runGetByProjectId: async (projectId: string): Promise<TestRunFilterResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.run.getByProjectId(projectId), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  
  runSearch: async (filters: Record<string, string | number | boolean>): Promise<{
    success: boolean;
    data: TestRun[];
    meta: {
      total: number;
      page: number;
      limit: number;
      sortBy: string;
      order: string;
    };
  }> => {
    const token = localStorage.getItem("token");
    const queryString = new URLSearchParams(filters as Record<string, string>).toString();
    const res = await apiClient.get(`${API_ENDPOINTS.test.search}?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  runCreate: async (data: Partial<TestRun>): Promise<TestRunCreateResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.run.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  runUpdate: async (id: string, data: Partial<TestRun>): Promise<TestRunResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.run.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  runDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.run.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  //
  // 🔹 TEST APIs
  //
  testGetAll: async (runId: string): Promise<TestResponse[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.test.list(runId), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  testGetById: async (id: string): Promise<TestResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.test.getById(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  testGetByProjectId: async (projectId: string): Promise<TestFilterResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.test.getByProjectId(projectId), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  testSearch: async (filters: Record<string, string | number | boolean>): Promise<{
    success: boolean;
    data: Test[];
    meta: {
      total: number;
      page: number;
      limit: number;
      sortBy: string;
      order: string;
    };
  }> => {
    const token = localStorage.getItem("token");
    const queryString = new URLSearchParams(filters as Record<string, string>).toString();
    const res = await apiClient.get(`${API_ENDPOINTS.test.search}?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  testCreate: async (data: Partial<Test>): Promise<TestResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.test.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  testUpdate: async (id: string, data: Partial<Test>): Promise<TestResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.test.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  testDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.test.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  //
  // 🔹 RESULT APIs
  //
  resultGetAll: async (testId: string): Promise<TestResultResponse[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.result.list(testId), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  resultGetById: async (id: string): Promise<TestResultResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.result.getById(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  resultGetByProjectId: async (projectId: string): Promise<ResultsFilterResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.result.getByProjectId(projectId), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  resultSearch: async (filters: Record<string, string | number | boolean>): Promise<{
    success: boolean;
    data: TestResult[];
    meta: {
      total: number;
      page: number;
      limit: number;
      sortBy: string;
      order: string;
    };
  }> => {
    const token = localStorage.getItem("token");
    const queryString = new URLSearchParams(filters as Record<string, string>).toString();
    const res = await apiClient.get(`${API_ENDPOINTS.test.search}?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  resultCreate: async (data: Partial<TestResult>): Promise<TestResultCreateResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.result.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  resultUpdate: async (id: string, data: Partial<TestResult>): Promise<TestResultResponse> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.result.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  resultDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.result.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  //
  // 🔹 HEALTH CHECK
  //
  healthCheck: async (): Promise<{ status: string }> => {
    const res = await apiClient.get(API_ENDPOINTS.resultsHealth);
    return res.data;
  },
};
