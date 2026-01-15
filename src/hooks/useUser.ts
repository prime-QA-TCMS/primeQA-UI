import { useState } from "react";
import { User, Role, Tenant, RegisterRequest } from "../types";
import { UserAPI } from "../api";
import { useApi } from "./useApi";

//
// 🔹 USERS
//
export function useUsers() {
  return useApi<User[]>(UserAPI.userGetAll);
}

export function useUserById(id: string) {
  return useApi<User>(UserAPI.userGetById, [id]);
}

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (data: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      return await UserAPI.userCreate(data);
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

  const updateUser = async (id: string, data: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      return await UserAPI.userUpdate(id, data);
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

  const deleteUser = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await UserAPI.userDelete(id);
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
export function useRoles() {
  return useApi<Role[]>(UserAPI.roleGetAll);
}

export function useCreateRole() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRole = async (data: Partial<Role>) => {
    setLoading(true);
    setError(null);
    try {
      return await UserAPI.roleCreate(data);
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

  const updateRole = async (id: string, data: Partial<Role>) => {
    setLoading(true);
    setError(null);
    try {
      return await UserAPI.roleUpdate(id, data);
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

  const deleteRole = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await UserAPI.roleDelete(id);
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
export function useTenants() {
  return useApi<Tenant[]>(UserAPI.tenantGetAll);
}

export function useCreateTenant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTenant = async (data: Partial<Tenant>) => {
    setLoading(true);
    setError(null);
    try {
      return await UserAPI.tenantCreate(data);
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

  const updateTenant = async (id: string, data: Partial<Tenant>) => {
    setLoading(true);
    setError(null);
    try {
      return await UserAPI.tenantUpdate(id, data);
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

  const deleteTenant = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      return await UserAPI.tenantDelete(id);
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
// 🔹 AUTHENTICATION (Optional but recommended)
//
export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserAPI.login(credentials);
      localStorage.setItem("accessToken", response.accessToken);
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
      return await UserAPI.register(data);
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
      await UserAPI.logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (err: any) {
      console.error("Error logging out:", err);
    }
  };

  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("Missing refresh token");
      const res = await UserAPI.refresh({ token: refreshToken });
      localStorage.setItem("accessToken", res.accessToken);
      return res;
    } catch (err: any) {
      console.error("Token refresh failed:", err);
      throw err;
    }
  };

  return { login, register, logout, refresh, loading, error };
}
