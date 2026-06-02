import { useState } from 'react';
import {
  User,
  Role,
  Tenant,
  RegisterRequest,
  LoginRequest,
  CreateUserRequest,
  UpdateUserRequest,
  CreateRoleRequest,
  UpdateRoleRequest,
  CreateTenantRequest,
  UpdateTenantRequest,
  RefreshTokenRequest,
  LogoutRequest,
} from '../types';
import { UserAPI } from '../api';
import { useApi, useService } from 'fog-ui';

//
// 🔹 USERS
//
export function useUsers(params?: { page?: number; limit?: number }) {
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);
  return useApi(() => userAPI.userGetAll(params).then(res => res.data.items), [params]);
}

export function useUserById(id: string) {
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);
  return useApi<User>(() => userAPI.userGetById(id).then(res => res.data), [id]);
}

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);

  const createUser = async (data: CreateUserRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.userCreate(data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
}

export function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);

  const updateUser = async (id: string, data: UpdateUserRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.userUpdate(id, data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
}

export function useDeleteUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);

  const deleteUser = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.userDelete(id);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
}

//
// 🔹 ROLES
//
export function useRoles(params?: { page?: number; limit?: number }) {
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);
  return useApi(() => userAPI.roleGetAll(params).then(res => res.data.items), [params]);
}

export function useRoleById(id: string) {
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);
  return useApi<Role>(() => userAPI.roleGetById(id).then(res => res.data), [id]);
}

export function useCreateRole() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);

  const createRole = async (data: CreateRoleRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.roleCreate(data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createRole, loading, error };
}

export function useUpdateRole() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);

  const updateRole = async (id: string, data: UpdateRoleRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.roleUpdate(id, data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateRole, loading, error };
}

export function useDeleteRole() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);

  const deleteRole = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await userAPI.roleDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRole, loading, error };
}

//
// 🔹 TENANTS
//
export function useTenants(params?: { page?: number; limit?: number }) {
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);
  return useApi(() => userAPI.tenantGetAll(params).then(res => res.data.items), [params]);
}

export function useTenantById(id: string) {
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);
  return useApi<Tenant>(() => userAPI.tenantGetById(id).then(res => res.data), [id]);
}

export function useCreateTenant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);

  const createTenant = async (data: CreateTenantRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.tenantCreate(data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTenant, loading, error };
}

export function useUpdateTenant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);

  const updateTenant = async (id: string, data: UpdateTenantRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.tenantUpdate(id, data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateTenant, loading, error };
}

export function useDeleteTenant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);

  const deleteTenant = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await userAPI.tenantDelete(id);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTenant, loading, error };
}

//
// 🔹 AUTHENTICATION
//
export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.login(credentials);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      if (response.data.user?.tenantId) {
        localStorage.setItem('tenantId', response.data.user.tenantId);
      }
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.register(data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await userAPI.logout({ refreshToken } as LogoutRequest);
      }
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tenantId');
    } catch (err: any) {
      console.error('Error logging out:', err);
    }
  };

  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('Missing refresh token');
      const res = await userAPI.refresh({ refreshToken } as RefreshTokenRequest);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      return res;
    } catch (err: any) {
      console.error('Token refresh failed:', err);
      throw err;
    }
  };

  return { login, register, logout, refresh, loading, error };
}
