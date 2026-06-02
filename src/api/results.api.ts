import { AxiosHelper } from 'fog-ui';
import { API_ENDPOINTS } from '../config/apiConfig';
import {
  TestRun,
  Test,
  TestResult,
  TestRunResponse,
  TestResponse,
  TestResultResponse,
  TestRunFilterResponse,
  TestFilterResponse,
  ResultsFilterResponse,
  TestRunCreateResponse,
  TestResultCreateResponse,
} from '../types';

export const ResultsAPI = (service: AxiosHelper) => ({
  //
  // 🔹 RUN APIs
  //
  runGetAll: async (projectId: string): Promise<TestRunResponse> => {
    return await service.get<TestRunResponse>(API_ENDPOINTS.run.list(projectId));
  },

  runGetById: async (id: string): Promise<TestRunResponse> => {
    return await service.get<TestRunResponse>(API_ENDPOINTS.run.getById(id));
  },

  runGetByProjectId: async (projectId: string): Promise<TestRunFilterResponse> => {
    return await service.get<TestRunFilterResponse>(API_ENDPOINTS.run.getByProjectId(projectId));
  },

  runSearch: async (
    filters: Record<string, string | number | boolean>
  ): Promise<{
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
    const queryString = new URLSearchParams(filters as Record<string, string>).toString();
    return await service.get<{
      success: boolean;
      data: TestRun[];
      meta: {
        total: number;
        page: number;
        limit: number;
        sortBy: string;
        order: string;
      };
    }>(`${API_ENDPOINTS.run.search}?${queryString}`);
  },

  runCreate: async (data: Partial<TestRun>): Promise<TestRunCreateResponse> => {
    return await service.post<TestRunCreateResponse>(API_ENDPOINTS.run.create, data);
  },

  runUpdate: async (id: string, data: Partial<TestRun>): Promise<TestRunResponse> => {
    return await service.put<TestRunResponse>(API_ENDPOINTS.run.update(id), data);
  },

  runDelete: async (id: string): Promise<{ message: string }> => {
    return await service.delete<{ message: string }>(API_ENDPOINTS.run.delete(id));
  },

  //
  // 🔹 TEST APIs
  //
  testGetAll: async (runId: string): Promise<TestResponse[]> => {
    return await service.get<TestResponse[]>(API_ENDPOINTS.test.list(runId));
  },

  testGetById: async (id: string): Promise<TestResponse> => {
    return await service.get<TestResponse>(API_ENDPOINTS.test.getById(id));
  },

  testGetByProjectId: async (projectId: string): Promise<TestFilterResponse> => {
    return await service.get<TestFilterResponse>(API_ENDPOINTS.test.getByProjectId(projectId));
  },

  testSearch: async (
    filters: Record<string, string | number | boolean>
  ): Promise<{
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
    const queryString = new URLSearchParams(filters as Record<string, string>).toString();
    return await service.get<{
      success: boolean;
      data: Test[];
      meta: {
        total: number;
        page: number;
        limit: number;
        sortBy: string;
        order: string;
      };
    }>(`${API_ENDPOINTS.test.search}?${queryString}`);
  },

  testCreate: async (data: Partial<Test>): Promise<TestResponse> => {
    return await service.post<TestResponse>(API_ENDPOINTS.test.create, data);
  },

  testUpdate: async (id: string, data: Partial<Test>): Promise<TestResponse> => {
    return await service.put<TestResponse>(API_ENDPOINTS.test.update(id), data);
  },

  testDelete: async (id: string): Promise<{ message: string }> => {
    return await service.delete<{ message: string }>(API_ENDPOINTS.test.delete(id));
  },

  //
  // 🔹 RESULT APIs
  //
  resultGetAll: async (testId: string): Promise<TestResultResponse[]> => {
    return await service.get<TestResultResponse[]>(API_ENDPOINTS.result.list(testId));
  },

  resultGetById: async (id: string): Promise<TestResultResponse> => {
    return await service.get<TestResultResponse>(API_ENDPOINTS.result.getById(id));
  },

  resultGetByProjectId: async (projectId: string): Promise<ResultsFilterResponse> => {
    return await service.get<ResultsFilterResponse>(API_ENDPOINTS.result.getByProjectId(projectId));
  },

  resultGetByTestId: async (testId: string): Promise<TestResultResponse> => {
    return await service.get<TestResultResponse>(API_ENDPOINTS.result.getByTestId(testId));
  },

  resultGetByRunId: async (runId: string): Promise<TestResultResponse> => {
    return await service.get<TestResultResponse>(API_ENDPOINTS.result.getByRunId(runId));
  },

  resultSearch: async (
    filters: Record<string, string | number | boolean>
  ): Promise<{
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
    const queryString = new URLSearchParams(filters as Record<string, string>).toString();
    return await service.get<{
      success: boolean;
      data: TestResult[];
      meta: {
        total: number;
        page: number;
        limit: number;
        sortBy: string;
        order: string;
      };
    }>(`${API_ENDPOINTS.result.search}?${queryString}`);
  },

  resultCreate: async (data: Partial<TestResult>): Promise<TestResultCreateResponse> => {
    return await service.post<TestResultCreateResponse>(API_ENDPOINTS.result.create, data);
  },

  resultUpdate: async (id: string, data: Partial<TestResult>): Promise<TestResultResponse> => {
    return await service.put<TestResultResponse>(API_ENDPOINTS.result.update(id), data);
  },

  resultDelete: async (id: string): Promise<{ message: string }> => {
    return await service.delete<{ message: string }>(API_ENDPOINTS.result.delete(id));
  },

  //
  // 🔹 HEALTH CHECK
  //
  healthCheck: async (): Promise<{ status: string }> => {
    return await service.get<{ status: string }>(API_ENDPOINTS.resultsHealth);
  },
});
