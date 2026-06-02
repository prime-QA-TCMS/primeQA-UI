import { AxiosHelper } from 'fog-ui';
import { API_ENDPOINTS } from '../config/apiConfig';
import {
  User,
  Role,
  Tenant,
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutRequest,
  RegisterResponse,
  UserListResponse,
  UserResponse,
  RoleListResponse,
  RoleResponse,
  TenantListResponse,
  TenantResponse,
  CreateUserRequest,
  UpdateUserRequest,
  CreateRoleRequest,
  UpdateRoleRequest,
  CreateTenantRequest,
  UpdateTenantRequest,
  ApiResponse,
} from '../types';

/**
 * User Service API
 * Factory function that creates API methods using fog-ui service instances
 * Usage:
 *   const authAPI = UserAPI(useService('auth'), useService('user'))
 *
 * @param authService - Service for /auth/* endpoints (no auth required)
 * @param userService - Service for /users, /roles, /tenants endpoints (auth required)
 */
export const UserAPI = (authService: AxiosHelper, userService: AxiosHelper) => ({
  // ========================================
  // 🔐 AUTHENTICATION
  // ========================================

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return await authService.post<AuthResponse>(API_ENDPOINTS.auth.login, data);
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return await authService.post<RegisterResponse>(API_ENDPOINTS.auth.register, data);
  },

  refresh: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    return await authService.post<RefreshTokenResponse>(API_ENDPOINTS.auth.refresh, data);
  },

  logout: async (data: LogoutRequest): Promise<ApiResponse<void>> => {
    return await authService.post<ApiResponse<void>>(API_ENDPOINTS.auth.logout, data);
  },

  // ========================================
  // 👤 USERS
  // ========================================

  userGetAll: async (params?: { page?: number; limit?: number }): Promise<UserListResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    const query = queryParams.toString();
    const url = query ? `${API_ENDPOINTS.user.list}?${query}` : API_ENDPOINTS.user.list;
    return await userService.get<UserListResponse>(url);
  },

  userGetById: async (id: string): Promise<UserResponse> => {
    return await userService.get<UserResponse>(API_ENDPOINTS.user.getById(id));
  },

  userCreate: async (data: CreateUserRequest): Promise<UserResponse> => {
    return await userService.post<UserResponse>(API_ENDPOINTS.user.create, data);
  },

  userUpdate: async (id: string, data: UpdateUserRequest): Promise<UserResponse> => {
    return await userService.put<UserResponse>(API_ENDPOINTS.user.update(id), data);
  },

  userDelete: async (id: string): Promise<UserResponse> => {
    return await userService.delete<UserResponse>(API_ENDPOINTS.user.delete(id));
  },

  // ========================================
  // 🎭 ROLES
  // ========================================

  roleGetAll: async (params?: { page?: number; limit?: number }): Promise<RoleListResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    const query = queryParams.toString();
    const url = query ? `${API_ENDPOINTS.role.list}?${query}` : API_ENDPOINTS.role.list;
    return await userService.get<RoleListResponse>(url);
  },

  roleGetById: async (id: string): Promise<RoleResponse> => {
    return await userService.get<RoleResponse>(API_ENDPOINTS.role.getById(id));
  },

  roleCreate: async (data: CreateRoleRequest): Promise<RoleResponse> => {
    return await userService.post<RoleResponse>(API_ENDPOINTS.role.create, data);
  },

  roleUpdate: async (id: string, data: UpdateRoleRequest): Promise<RoleResponse> => {
    return await userService.put<RoleResponse>(API_ENDPOINTS.role.update(id), data);
  },

  roleDelete: async (id: string): Promise<ApiResponse<void>> => {
    return await userService.delete<ApiResponse<void>>(API_ENDPOINTS.role.delete(id));
  },

  // ========================================
  // 🏢 TENANTS
  // ========================================

  tenantGetAll: async (params?: { page?: number; limit?: number }): Promise<TenantListResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    const query = queryParams.toString();
    const url = query ? `${API_ENDPOINTS.tenant.list}?${query}` : API_ENDPOINTS.tenant.list;
    return await userService.get<TenantListResponse>(url);
  },

  tenantGetById: async (id: string): Promise<TenantResponse> => {
    return await userService.get<TenantResponse>(API_ENDPOINTS.tenant.getById(id));
  },

  tenantCreate: async (data: CreateTenantRequest): Promise<TenantResponse> => {
    return await userService.post<TenantResponse>(API_ENDPOINTS.tenant.create, data);
  },

  tenantUpdate: async (id: string, data: UpdateTenantRequest): Promise<TenantResponse> => {
    return await userService.put<TenantResponse>(API_ENDPOINTS.tenant.update(id), data);
  },

  tenantDelete: async (id: string): Promise<ApiResponse<void>> => {
    return await userService.delete<ApiResponse<void>>(API_ENDPOINTS.tenant.delete(id));
  },
});
