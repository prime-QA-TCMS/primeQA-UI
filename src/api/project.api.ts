import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";
import { Project, Milestone, ProjectConfiguration } from "../types";

export const ProjectAPI = {
  //
  // 🔹 PROJECT APIs
  //
  projectGetAll: async (): Promise<Project[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.project.list, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  projectGetById: async (id: string): Promise<Project> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.project.getById(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  projectCreate: async (data: Partial<Project>): Promise<Project> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.project.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  projectUpdate: async (id: string, data: Partial<Project>): Promise<Project> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.project.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  projectDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.project.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  //
  // 🔹 MILESTONE APIs
  //
  milestoneGetAll: async (projectId: string): Promise<Milestone[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.milestone.list(projectId), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  milestoneCreate: async (projectId: string, data: Partial<Milestone>): Promise<Milestone> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.milestone.create(projectId), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  //
  // 🔹 PROJECT CONFIGURATION APIs
  //
  configurationGetAll: async (projectId: string): Promise<ProjectConfiguration[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.projectConfiguration.list(projectId), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  configurationCreate: async (
    projectId: string,
    data: Partial<ProjectConfiguration>
  ): Promise<ProjectConfiguration> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.projectConfiguration.create(projectId), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  //
  // 🔹 HEALTH CHECK
  //
  healthCheck: async (): Promise<{ status: string }> => {
    const res = await apiClient.get(API_ENDPOINTS.projectHealth);
    return res.data;
  },
};
