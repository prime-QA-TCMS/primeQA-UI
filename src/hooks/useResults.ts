import { useState, useMemo } from 'react';
import {
  TestRun,
  TestRunResponse,
  Test,
  TestResult,
  TestResultResponse,
  TestResponse,
  TestRunFilterResponse,
  TestFilterResponse,
  ResultsFilterResponse,
} from '../types';
import { ResultsAPI } from '../api';
import { useApi, useService } from 'fog-ui';

//
// 🔹 RUNS
//
export function useRuns(projectId: string) {
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);
  return useApi<TestRunResponse>(() => resultsAPI.runGetAll(projectId), [projectId]);
}

export function useRunById(id: string) {
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);
  return useApi<TestRunResponse>(() => resultsAPI.runGetById(id), [id]);
}

export function useRunByProjectId(projectId: string) {
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);
  return useApi<TestRunFilterResponse>(() => resultsAPI.runGetByProjectId(projectId), [projectId]);
}

export function useRunSearch() {
  const [data, setData] = useState<TestRun[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const searchTests = async (filters: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await resultsAPI.runSearch(filters);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const createRun = async (data: Partial<TestRun>) => {
    setLoading(true);
    setError(null);
    try {
      return await resultsAPI.runCreate(data);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const updateRun = async (id: string, data: Partial<TestRun>) => {
    setLoading(true);
    setError(null);
    try {
      return await resultsAPI.runUpdate(id, data);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const deleteRun = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await resultsAPI.runDelete(id);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);
  return useApi<TestResponse[]>(() => resultsAPI.testGetAll(runId), [runId]);
}

export function useTestById(id: string) {
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);
  return useApi<TestResponse>(() => resultsAPI.testGetById(id), [id]);
}

export function useTestByProjectId(projectId: string) {
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);
  return useApi<TestFilterResponse>(() => resultsAPI.testGetByProjectId(projectId), [projectId]);
}

export function useTestSearch() {
  const [data, setData] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const searchTests = async (filters: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await resultsAPI.testSearch(filters);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const createTest = async (data: Partial<Test>) => {
    setLoading(true);
    setError(null);
    try {
      return await resultsAPI.testCreate(data);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const updateTest = async (id: string, data: Partial<Test>) => {
    setLoading(true);
    setError(null);
    try {
      return await resultsAPI.testUpdate(id, data);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const deleteTest = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await resultsAPI.testDelete(id);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);
  return useApi<TestResultResponse[]>(() => resultsAPI.resultGetAll(testId), [testId]);
}

export function useResultById(id: string) {
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);
  return useApi<TestResultResponse>(() => resultsAPI.resultGetById(id), [id]);
}

export function useResultByProjectId(projectId: string) {
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);
  return useApi<ResultsFilterResponse>(
    () => resultsAPI.resultGetByProjectId(projectId),
    [projectId]
  );
}

export function useResultSearch() {
  const [data, setData] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const searchTests = async (filters: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await resultsAPI.resultSearch(filters);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const createResult = async (data: Partial<TestResult>) => {
    setLoading(true);
    setError(null);
    try {
      return await resultsAPI.resultCreate(data);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const updateResult = async (id: string, data: Partial<TestResult>) => {
    setLoading(true);
    setError(null);
    try {
      return await resultsAPI.resultUpdate(id, data);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

  const deleteResult = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await resultsAPI.resultDelete(id);
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
  const resultsService = useService('results');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);
  return useApi<{ status: string }>(() => resultsAPI.healthCheck());
}
