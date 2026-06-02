import { useState, useMemo, useCallback } from 'react';
import { Project, Milestone, ProjectConfiguration } from '../types';
import { ProjectAPI } from '../api';
import { useApi, useService } from 'fog-ui';

//
// 🔹 PROJECTS
//
export function useProjects() {
  const projectService = useService('project');
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);
  return useApi<Project[]>(() => projectAPI.projectGetAll());
}

export function useProjectById(id: string) {
  const projectService = useService('project');
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);
  return useApi<Project>(() => projectAPI.projectGetById(id), [id]);
}

export function useCreateProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const projectService = useService('project');
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);

  const createProject = async (data: Partial<Project>) => {
    setLoading(true);
    setError(null);
    try {
      return await projectAPI.projectCreate(data);
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
  const projectService = useService('project');
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);

  const updateProject = async (id: string, data: Partial<Project>) => {
    setLoading(true);
    setError(null);
    try {
      return await projectAPI.projectUpdate(id, data);
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
  const projectService = useService('project');
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);

  const deleteProject = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await projectAPI.projectDelete(id);
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
  const projectService = useService('project');
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);
  const fetchFn = useCallback(() => projectAPI.milestoneGetAll(projectId), [projectId, projectAPI]);
  return useApi<Milestone[]>(fetchFn, [projectId]);
}

export function useCreateMilestone(projectId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const projectService = useService('project');
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);

  const createMilestone = async (data: Partial<Milestone>) => {
    setLoading(true);
    setError(null);
    try {
      return await projectAPI.milestoneCreate(projectId, data);
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
  const projectService = useService('project');
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);
  return useApi<ProjectConfiguration[]>(
    () => projectAPI.configurationGetAll(projectId),
    [projectId]
  );
}

export function useCreateProjectConfiguration(projectId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const projectService = useService('project');
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);

  const createConfiguration = async (data: Partial<ProjectConfiguration>) => {
    setLoading(true);
    setError(null);
    try {
      return await projectAPI.configurationCreate(projectId, data);
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
  const projectService = useService('project');
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);
  return useApi<{ status: string }>(() => projectAPI.healthCheck());
}
