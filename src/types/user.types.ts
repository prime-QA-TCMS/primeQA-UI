// ========================================
// 🔹 BASE TYPES
// ========================================

export interface ApiError {
  success: false;
  code: string;
  message: string;
  traceId: string;
  details?: any;
}

export interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: true;
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
  } & Record<string, any>;
}

// ========================================
// 🔹 USER TYPES
// ========================================

export interface User {
  _id: string;
  email: string;
  role: string; // Role ID reference
  tenant: string; // Tenant ID reference
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  firstName?: string;
  lastName?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  roleId: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  roleId?: string;
}

export interface UserListResponse extends PaginatedResponse<User> {
  data: {
    items: User[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface UserResponse extends ApiResponse<User> { }

// ========================================
// 🔹 ROLE TYPES
// ========================================

export interface Role {
  _id: string;
  name: string;
  description: string;
  permissions: string[];
  tenant: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissionIds: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissionIds?: string[];
}

export interface RoleListResponse extends PaginatedResponse<Role> {
  data: {
    items: Role[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface RoleResponse extends ApiResponse<Role> { }

// ========================================
// 🔹 TENANT TYPES
// ========================================

export interface Tenant {
  _id: string;
  name: string;
  domain: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  settings?: any;
}

export interface CreateTenantRequest {
  name: string;
  domain: string;
  settings?: {
    maxUsers?: number;
    features?: string[];
  };
}

export interface UpdateTenantRequest {
  name?: string;
  domain?: string;
  settings?: any;
}

export interface TenantListResponse extends PaginatedResponse<Tenant> {
  data: {
    items: Tenant[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface TenantResponse extends ApiResponse<Tenant> { }

// ========================================
// 🔹 PERMISSION TYPES
// ========================================

export interface Permission {
  _id: string;
  code: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

// ========================================
// 🔹 AUTHENTICATION TYPES
// ========================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  roleId: string;
  tenantId: string;
}

export interface AuthResponse {
  success: true;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      role: string;
      tenantId: string;
    };
  };
}

export interface RegisterResponse extends ApiResponse<{
  id: string;
  email: string;
  role: string;
}> {
  message: 'User registered successfully';
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: true;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LogoutRequest {
  refreshToken: string;
}
