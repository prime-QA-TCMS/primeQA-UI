import { useState } from "react";
import { Project, Milestone, ProjectConfiguration } from "../types";
import { ProjectAPI } from "../api";
import { useApi } from "./useApi";

//
// 🔹 PROJECTS
//
export function useProjects() {
  return useApi<Project[]>(ProjectAPI.projectGetAll);
}

export function useProjectById(id: string) {
  return useApi<Project>(ProjectAPI.projectGetById, [id]);
}

export function useCreateProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async (data: Partial<Project>) => {
    setLoading(true);
    setError(null);
    try {
      return await ProjectAPI.projectCreate(data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProject, loading, error };
}

export function useUpdateProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProject = async (id: string, data: Partial<Project>) => {
    setLoading(true);
    setError(null);
    try {
      return await ProjectAPI.projectUpdate(id, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProject, loading, error };
}

export function useDeleteProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProject = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await ProjectAPI.projectDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProject, loading, error };
}

//
// 🔹 MILESTONES
//
export function useMilestones(projectId: string) {
  return useApi<Milestone[]>(ProjectAPI.milestoneGetAll, [projectId]);
}

export function useCreateMilestone(projectId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMilestone = async (data: Partial<Milestone>) => {
    setLoading(true);
    setError(null);
    try {
      return await ProjectAPI.milestoneCreate(projectId, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createMilestone, loading, error };
}

//
// 🔹 PROJECT CONFIGURATIONS
//
export function useProjectConfigurations(projectId: string) {
  return useApi<ProjectConfiguration[]>(
    ProjectAPI.configurationGetAll,
    [projectId]
  );
}

export function useCreateProjectConfiguration(projectId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createConfiguration = async (data: Partial<ProjectConfiguration>) => {
    setLoading(true);
    setError(null);
    try {
      return await ProjectAPI.configurationCreate(projectId, data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createConfiguration, loading, error };
}

//
// 🔹 HEALTH CHECK
//
export function useProjectHealthCheck() {
  return useApi<{ status: string }>(ProjectAPI.healthCheck);
}
