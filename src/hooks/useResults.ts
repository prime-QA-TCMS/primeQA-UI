import { useState } from "react";
import { TestRun, TestRunResponse, Test, TestResult, TestResultResponse, TestResponse, TestRunFilterResponse, TestFilterResponse, ResultsFilterResponse } from "../types";
import { ResultsAPI } from "../api";
import { useApi } from "./useApi";

//
// 🔹 RUNS
//
export function useRuns(projectId: string) {
  return useApi<TestRunResponse>(ResultsAPI.runGetAll, [projectId]);
}

export function useRunById(id: string) {
  return useApi<TestRunResponse>(ResultsAPI.runGetById, [id]);
}

export function useRunByProjectId(projectId: string) {
  return useApi<TestRunFilterResponse>(ResultsAPI.runGetByProjectId, [projectId]);
}

export function useRunSearch() {
  const [data, setData] = useState<TestRun[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTests = async (filters: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ResultsAPI.runSearch(filters);
      setData(response.data || []);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { data, searchTests, loading, error };
}

export function useCreateRun() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRun = async (data: Partial<TestRun>) => {
    setLoading(true);
    setError(null);
    try {
      return await ResultsAPI.runCreate(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createRun, loading, error };
}

export function useUpdateRun() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateRun = async (id: string, data: Partial<TestRun>) => {
    setLoading(true);
    setError(null);
    try {
      return await ResultsAPI.runUpdate(id, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateRun, loading, error };
}

export function useDeleteRun() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRun = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await ResultsAPI.runDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRun, loading, error };
}

//
// 🔹 TESTS
//
export function useTests(runId: string) {
  return useApi<TestResponse[]>(() => ResultsAPI.testGetAll(runId), [runId]);
}

export function useTestById(id: string) {
  return useApi<TestResponse>(ResultsAPI.testGetById, [id]);
}

export function useTestByProjectId(projectId: string) {
  return useApi<TestFilterResponse>(ResultsAPI.testGetByProjectId, [projectId]);
}

export function useTestSearch() {
  const [data, setData] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTests = async (filters: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ResultsAPI.testSearch(filters);
      setData(response.data || []);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { data, searchTests, loading, error };
}

export function useCreateTest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTest = async (data: Partial<Test>) => {
    setLoading(true);
    setError(null);
    try {
      return await ResultsAPI.testCreate(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTest, loading, error };
}

export function useUpdateTest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTest = async (id: string, data: Partial<Test>) => {
    setLoading(true);
    setError(null);
    try {
      return await ResultsAPI.testUpdate(id, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateTest, loading, error };
}

export function useDeleteTest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTest = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await ResultsAPI.testDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTest, loading, error };
}

//
// 🔹 RESULTS
//
export function useResults(testId: string) {
  return useApi<TestResultResponse[]>(() => ResultsAPI.resultGetAll(testId), [testId]);
}

export function useResultById(id: string) {
  return useApi<TestResultResponse>(ResultsAPI.resultGetById, [id]);
}

export function useResultByProjectId(projectId: string) {
  return useApi<ResultsFilterResponse>(ResultsAPI.resultGetByProjectId, [projectId]);
}

export function useResultSearch() {
  const [data, setData] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTests = async (filters: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ResultsAPI.resultSearch(filters);
      setData(response.data || []);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { data, searchTests, loading, error };
}

export function useCreateResult() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createResult = async (data: Partial<TestResult>) => {
    setLoading(true);
    setError(null);
    try {
      return await ResultsAPI.resultCreate(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createResult, loading, error };
}

export function useUpdateResult() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateResult = async (id: string, data: Partial<TestResult>) => {
    setLoading(true);
    setError(null);
    try {
      return await ResultsAPI.resultUpdate(id, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateResult, loading, error };
}

export function useDeleteResult() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteResult = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await ResultsAPI.resultDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteResult, loading, error };
}

//
// 🔹 HEALTH CHECK
//
export function useResultsHealthCheck() {
  return useApi<{ status: string }>(ResultsAPI.healthCheck);
}
