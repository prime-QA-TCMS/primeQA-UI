import { AxiosHelper } from 'fog-ui';
import { API_ENDPOINTS } from '../config/apiConfig';
import { Project, Milestone, ProjectConfiguration } from '../types';

export const ProjectAPI = (service: AxiosHelper) => ({
  //
  // 🔹 PROJECT APIs
  //
  projectGetAll: async (): Promise<Project[]> => {
    return await service.get<Project[]>(API_ENDPOINTS.project.list);
  },

  projectGetById: async (id: string): Promise<Project> => {
    return await service.get<Project>(API_ENDPOINTS.project.getById(id));
  },

  projectCreate: async (data: Partial<Project>): Promise<Project> => {
    return await service.post<Project>(API_ENDPOINTS.project.create, data);
  },

  projectUpdate: async (id: string, data: Partial<Project>): Promise<Project> => {
    return await service.put<Project>(API_ENDPOINTS.project.update(id), data);
  },

  projectDelete: async (id: string): Promise<{ message: string }> => {
    return await service.delete<{ message: string }>(API_ENDPOINTS.project.delete(id));
  },

  //
  // 🔹 MILESTONE APIs
  //
  milestoneGetAll: async (projectId: string): Promise<Milestone[]> => {
    return await service.get<Milestone[]>(API_ENDPOINTS.milestone.list(projectId));
  },

  milestoneCreate: async (projectId: string, data: Partial<Milestone>): Promise<Milestone> => {
    return await service.post<Milestone>(API_ENDPOINTS.milestone.create(projectId), data);
  },

  milestoneGetById: async (projectId: string, milestoneId: string): Promise<Milestone> => {
    return await service.get<Milestone>(API_ENDPOINTS.milestone.getById(projectId, milestoneId));
  },

  milestoneDelete: async (projectId: string, milestoneId: string): Promise<{ message: string }> => {
    return await service.delete<{ message: string }>(
      API_ENDPOINTS.milestone.delete(projectId, milestoneId)
    );
  },

  //
  // 🔹 PROJECT CONFIGURATION APIs
  //
  configurationGetAll: async (projectId: string): Promise<ProjectConfiguration[]> => {
    return await service.get<ProjectConfiguration[]>(
      API_ENDPOINTS.projectConfiguration.list(projectId)
    );
  },

  configurationCreate: async (
    projectId: string,
    data: Partial<ProjectConfiguration>
  ): Promise<ProjectConfiguration> => {
    return await service.post<ProjectConfiguration>(
      API_ENDPOINTS.projectConfiguration.create(projectId),
      data
    );
  },

  configurationGetById: async (
    projectId: string,
    configId: string
  ): Promise<ProjectConfiguration> => {
    return await service.get<ProjectConfiguration>(
      API_ENDPOINTS.projectConfiguration.getById(projectId, configId)
    );
  },

  configurationUpdate: async (
    projectId: string,
    configId: string,
    data: Partial<ProjectConfiguration>
  ): Promise<ProjectConfiguration> => {
    return await service.put<ProjectConfiguration>(
      API_ENDPOINTS.projectConfiguration.update(projectId, configId),
      data
    );
  },

  //
  // 🔹 HEALTH CHECK
  //
  healthCheck: async (): Promise<{ status: string }> => {
    return await service.get<{ status: string }>(API_ENDPOINTS.projectHealth);
  },
});
