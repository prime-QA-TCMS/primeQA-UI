import { useState, useMemo, useCallback } from 'react';
import { Suite, Section, TestCase } from '../types';
import { TestcaseAPI } from '../api';
import { useApi, useService } from 'fog-ui';

//
// 🔹 SUITES
//
export function useSuites() {
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);
  const fetchFn = useCallback(() => testcaseAPI.suiteGetAll(), [testcaseAPI]);
  return useApi<Suite[]>(fetchFn, []);
}

export function useSuiteById(id: string) {
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);
  const fetchFn = useCallback(() => testcaseAPI.suiteGetById(id), [id, testcaseAPI]);
  return useApi<Suite>(fetchFn, [id]);
}

export function useCreateSuite() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);

  const createSuite = async (data: Partial<Suite>) => {
    setLoading(true);
    setError(null);
    try {
      return await testcaseAPI.suiteCreate(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createSuite, loading, error };
}

export function useUpdateSuite() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);

  const updateSuite = async (id: string, data: Partial<Suite>) => {
    setLoading(true);
    setError(null);
    try {
      return await testcaseAPI.suiteUpdate(id, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateSuite, loading, error };
}

export function useDeleteSuite() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);

  const deleteSuite = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await testcaseAPI.suiteDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteSuite, loading, error };
}

//
// 🔹 SECTIONS
//
export function useSections(suiteId: string) {
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);
  const fetchFn = useCallback(() => testcaseAPI.sectionGetAll(suiteId), [suiteId, testcaseAPI]);
  return useApi<Section[]>(fetchFn, [suiteId]);
}

export function useSectionById(id: string) {
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);
  const fetchFn = useCallback(() => testcaseAPI.sectionGetById(id), [id, testcaseAPI]);
  return useApi<Section>(fetchFn, [id]);
}

export function useCreateSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);

  const createSection = async (data: Partial<Section>) => {
    setLoading(true);
    setError(null);
    try {
      return await testcaseAPI.sectionCreate(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createSection, loading, error };
}

export function useUpdateSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);

  const updateSection = async (id: string, data: Partial<Section>) => {
    setLoading(true);
    setError(null);
    try {
      return await testcaseAPI.sectionUpdate(id, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateSection, loading, error };
}

export function useDeleteSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);

  const deleteSection = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await testcaseAPI.sectionDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteSection, loading, error };
}

//
// 🔹 TEST CASES
//
export function useTestcases(sectionId: string) {
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);
  const fetchFn = useCallback(
    () => testcaseAPI.testcaseGetAll(sectionId),
    [sectionId, testcaseAPI]
  );
  return useApi<TestCase[]>(fetchFn, [sectionId]);
}

export function useTestcaseById(id: string) {
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);
  const fetchFn = useCallback(() => testcaseAPI.testcaseGetById(id), [id, testcaseAPI]);
  return useApi<TestCase>(fetchFn, [id]);
}

export function useCreateTestcase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);

  const createTestcase = async (data: Partial<TestCase>) => {
    setLoading(true);
    setError(null);
    try {
      return await testcaseAPI.testcaseCreate(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTestcase, loading, error };
}

export function useUpdateTestcase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);

  const updateTestcase = async (id: string, data: Partial<TestCase>) => {
    setLoading(true);
    setError(null);
    try {
      return await testcaseAPI.testcaseUpdate(id, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateTestcase, loading, error };
}

export function useDeleteTestcase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);

  const deleteTestcase = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await testcaseAPI.testcaseDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTestcase, loading, error };
}

//
// 🔹 HEALTH CHECK
//
export function useTestcaseHealthCheck() {
  const testcaseService = useService('testcase');
  const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);
  return useApi<{ status: string }>(() => testcaseAPI.healthCheck());
}
