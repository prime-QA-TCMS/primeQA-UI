import { useState } from "react";
import { Suite, Section, TestCase } from "../types";
import { TestcaseAPI } from "../api";
import { useApi } from "./useApi";

//
// 🔹 SUITES
//
export function useSuites() {
  return useApi<Suite[]>(TestcaseAPI.suiteGetAll);
}

export function useSuiteById(id: string) {
  return useApi<Suite>(TestcaseAPI.suiteGetById, [id]);
}

export function useCreateSuite() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSuite = async (data: Partial<Suite>) => {
    setLoading(true);
    setError(null);
    try {
      return await TestcaseAPI.suiteCreate(data);
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

  const updateSuite = async (id: string, data: Partial<Suite>) => {
    setLoading(true);
    setError(null);
    try {
      return await TestcaseAPI.suiteUpdate(id, data);
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

  const deleteSuite = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await TestcaseAPI.suiteDelete(id);
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
  return useApi<Section[]>(() => TestcaseAPI.sectionGetAll(suiteId), [suiteId]);
}

export function useSectionById(id: string) {
  return useApi<Section>(TestcaseAPI.sectionGetById, [id]);
}

export function useCreateSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSection = async (data: Partial<Section>) => {
    setLoading(true);
    setError(null);
    try {
      return await TestcaseAPI.sectionCreate(data);
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

  const updateSection = async (id: string, data: Partial<Section>) => {
    setLoading(true);
    setError(null);
    try {
      return await TestcaseAPI.sectionUpdate(id, data);
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

  const deleteSection = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await TestcaseAPI.sectionDelete(id);
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
  return useApi<TestCase[]>(() => TestcaseAPI.testcaseGetAll(sectionId), [sectionId]);
}

export function useTestcaseById(id: string) {
  return useApi<TestCase>(TestcaseAPI.testcaseGetById, [id]);
}

export function useCreateTestcase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTestcase = async (data: Partial<TestCase>) => {
    setLoading(true);
    setError(null);
    try {
      return await TestcaseAPI.testcaseCreate(data);
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

  const updateTestcase = async (id: string, data: Partial<TestCase>) => {
    setLoading(true);
    setError(null);
    try {
      return await TestcaseAPI.testcaseUpdate(id, data);
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

  const deleteTestcase = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await TestcaseAPI.testcaseDelete(id);
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
  return useApi<{ status: string }>(TestcaseAPI.healthCheck);
}
