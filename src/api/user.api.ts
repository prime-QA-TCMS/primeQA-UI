import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";
import { User, Role, Tenant, AuthResponse } from "../types"; // ✅ Add these interfaces in your types folder

export const UserAPI = {
  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const res = await apiClient.post(API_ENDPOINTS.auth.login, data);
    return res.data;
  },

  register: async (data: Partial<User>): Promise<AuthResponse> => {
    const res = await apiClient.post(API_ENDPOINTS.auth.register, data);
    return res.data;
  },

  logout: async (): Promise<{ message: string }> => {
    const res = await apiClient.post(API_ENDPOINTS.auth.logout);
    return res.data;
  },

  refresh: async (data: { token: string }): Promise<AuthResponse> => {
    const res = await apiClient.post(API_ENDPOINTS.auth.refresh, data);
    return res.data;
  },

  
  userGetAll: async (): Promise<User[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.user.list, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  userGetById: async (id: string): Promise<User> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.user.getById(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  userCreate: async (data: Partial<User>): Promise<User> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.user.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  userUpdate: async (id: string, data: Partial<User>): Promise<User> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.user.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  userDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.user.list, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  

  roleGetAll: async (): Promise<Role[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.role.list, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  roleCreate: async (data: Partial<Role>): Promise<Role> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.role.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  roleUpdate: async (id: string, data: Partial<Role>): Promise<Role> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.role.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  roleDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.role.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },


  tenantGetAll: async (): Promise<Tenant[]> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get(API_ENDPOINTS.tenant.list, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  tenantCreate: async (data: Partial<Tenant>): Promise<Tenant> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.post(API_ENDPOINTS.tenant.create, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  tenantUpdate: async (id: string, data: Partial<Tenant>): Promise<Tenant> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.put(API_ENDPOINTS.tenant.update(id), data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  tenantDelete: async (id: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");
    const res = await apiClient.delete(API_ENDPOINTS.tenant.delete(id), {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
