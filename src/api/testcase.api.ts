import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";
import { Suite, Section, TestCase } from "../types";

export const TestcaseAPI = {
  //
  // 🔹 SUITE APIs
  //
  suiteGetAll: async (): Promise<Suite[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.suite.list, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  suiteGetById: async (id: string): Promise<Suite> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.suite.getById(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  suiteCreate: async (data: Partial<Suite>): Promise<Suite> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.suite.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  suiteUpdate: async (id: string, data: Partial<Suite>): Promise<Suite> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.suite.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  suiteDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.suite.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  //
  // 🔹 SECTION APIs
  //
  sectionGetAll: async (suiteId: string): Promise<Section[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.section.list(suiteId), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  sectionGetById: async (id: string): Promise<Section> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.section.getById(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  sectionCreate: async (data: Partial<Section>): Promise<Section> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.section.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  sectionUpdate: async (id: string, data: Partial<Section>): Promise<Section> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.section.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  sectionDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.section.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  //
  // 🔹 TESTCASE APIs
  //
  testcaseGetAll: async (sectionId: string): Promise<TestCase[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.testcase.list(sectionId), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  testcaseGetById: async (id: string): Promise<TestCase> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.testcase.getById(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  testcaseCreate: async (data: Partial<TestCase>): Promise<TestCase> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.testcase.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  testcaseUpdate: async (id: string, data: Partial<TestCase>): Promise<TestCase> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.testcase.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  testcaseDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.testcase.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  //
  // 🔹 HEALTH CHECK
  //
  healthCheck: async (): Promise<{ status: string }> => {
    const res = await apiClient.get(API_ENDPOINTS.testcaseHealth);
    return res.data;
  },
};
