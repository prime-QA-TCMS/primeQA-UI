export interface Role {
  _id: string;
  name: string;
  permissions: string[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tenant {
  _id: string;
  name: string;
  domain?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;  // API returns _id
  id?: string;   // Keep for backward compatibility
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  role: Role | string;
  tenant?: Tenant | string;
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface AuthResponse {
  user: {
    id: string;
    role: string;
    email: string;
  }
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  tenantId?: string;
}
