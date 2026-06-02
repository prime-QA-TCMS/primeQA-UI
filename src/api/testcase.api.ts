import { AxiosHelper } from 'fog-ui';
import { API_ENDPOINTS } from '../config/apiConfig';
import { Suite, Section, TestCase } from '../types';

export const TestcaseAPI = (service: AxiosHelper) => ({
  //
  // 🔹 SUITE APIs
  //
  suiteGetAll: async (): Promise<Suite[]> => {
    return await service.get<Suite[]>(API_ENDPOINTS.suite.list);
  },

  suiteGetById: async (id: string): Promise<Suite> => {
    return await service.get<Suite>(API_ENDPOINTS.suite.getById(id));
  },

  suiteCreate: async (data: Partial<Suite>): Promise<Suite> => {
    return await service.post<Suite>(API_ENDPOINTS.suite.create, data);
  },

  suiteUpdate: async (id: string, data: Partial<Suite>): Promise<Suite> => {
    return await service.put<Suite>(API_ENDPOINTS.suite.update(id), data);
  },

  suiteDelete: async (id: string): Promise<{ message: string }> => {
    return await service.delete<{ message: string }>(API_ENDPOINTS.suite.delete(id));
  },

  //
  // 🔹 SECTION APIs
  //
  sectionGetAll: async (suiteId: string): Promise<Section[]> => {
    return await service.get<Section[]>(API_ENDPOINTS.section.list(suiteId));
  },

  sectionGetById: async (id: string): Promise<Section> => {
    return await service.get<Section>(API_ENDPOINTS.section.getById(id));
  },

  sectionCreate: async (data: Partial<Section>): Promise<Section> => {
    return await service.post<Section>(API_ENDPOINTS.section.create, data);
  },

  sectionUpdate: async (id: string, data: Partial<Section>): Promise<Section> => {
    return await service.put<Section>(API_ENDPOINTS.section.update(id), data);
  },

  sectionDelete: async (id: string): Promise<{ message: string }> => {
    return await service.delete<{ message: string }>(API_ENDPOINTS.section.delete(id));
  },

  //
  // 🔹 TESTCASE APIs
  //
  testcaseGetAll: async (sectionId: string): Promise<TestCase[]> => {
    return await service.get<TestCase[]>(API_ENDPOINTS.testcase.list(sectionId));
  },

  testcaseGetById: async (id: string): Promise<TestCase> => {
    return await service.get<TestCase>(API_ENDPOINTS.testcase.getById(id));
  },

  testcaseCreate: async (data: Partial<TestCase>): Promise<TestCase> => {
    return await service.post<TestCase>(API_ENDPOINTS.testcase.create, data);
  },

  testcaseUpdate: async (id: string, data: Partial<TestCase>): Promise<TestCase> => {
    return await service.put<TestCase>(API_ENDPOINTS.testcase.update(id), data);
  },

  testcaseDelete: async (id: string): Promise<{ message: string }> => {
    return await service.delete<{ message: string }>(API_ENDPOINTS.testcase.delete(id));
  },

  //
  // 🔹 HEALTH CHECK
  //
  healthCheck: async (): Promise<{ status: string }> => {
    return await service.get<{ status: string }>(API_ENDPOINTS.testcaseHealth);
  },
});
