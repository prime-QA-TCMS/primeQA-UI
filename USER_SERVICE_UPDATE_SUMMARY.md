# User Service Update Summary

## Overview
Updated all user service-related files in the primeQA-UI project to match the new API specification from the user service backend.

## Updated Date
January 26, 2026

---

## 📋 Changes Made

### 1. **Types** ([src/types/user.types.ts](src/types/user.types.ts))

#### New Type Definitions:
- **ApiError** - Standardized error response structure
- **ApiResponse<T>** - Generic success response wrapper
- **PaginatedResponse<T>** - Response structure for paginated endpoints

#### Updated Models:

**User Model:**
```typescript
{
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
```

**Role Model:**
```typescript
{
  _id: string;
  name: string;
  description: string;
  permissions: string[];
  tenant: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
```

**Tenant Model:**
```typescript
{
  _id: string;
  name: string;
  domain: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  settings?: any;
}
```

**Permission Model:**
```typescript
{
  _id: string;
  code: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
```

#### Request/Response Types:
- `CreateUserRequest`, `UpdateUserRequest`, `UserListResponse`, `UserResponse`
- `CreateRoleRequest`, `UpdateRoleRequest`, `RoleListResponse`, `RoleResponse`
- `CreateTenantRequest`, `UpdateTenantRequest`, `TenantListResponse`, `TenantResponse`
- `LoginRequest`, `RegisterRequest`, `AuthResponse`, `RegisterResponse`
- `RefreshTokenRequest`, `RefreshTokenResponse`, `LogoutRequest`

---

### 2. **API Client** ([src/api/user.api.ts](src/api/user.api.ts))

#### Authentication Endpoints:
- ✅ `POST /auth/login` - Returns `AuthResponse` with tokens and user info
- ✅ `POST /auth/register` - Returns `RegisterResponse` with user data
- ✅ `POST /auth/refresh` - Token rotation support
- ✅ `POST /auth/logout` - Requires refresh token

#### User Endpoints:
- ✅ `GET /users` - Supports pagination (`page`, `limit` query params)
- ✅ `GET /users/{id}` - Returns wrapped user data
- ✅ `POST /users` - Create user with `CreateUserRequest`
- ✅ `PUT /users/{id}` - Update user with `UpdateUserRequest`
- ✅ `DELETE /users/{id}` - Soft delete (deactivate) user

#### Role Endpoints:
- ✅ `GET /roles` - Supports pagination
- ✅ `POST /roles` - Requires `permissionIds` array
- ✅ `PUT /roles/{id}` - Update role
- ✅ `DELETE /roles/{id}` - Soft delete role

#### Tenant Endpoints:
- ✅ `GET /tenants` - Supports pagination
- ✅ `POST /tenants` - Create with domain and settings
- ✅ `PUT /tenants/{id}` - Update tenant
- ✅ `DELETE /tenants/{id}` - Soft delete tenant

---

### 3. **Hooks** ([src/hooks/useUser.ts](src/hooks/useUser.ts))

#### Updated Hooks to Unwrap API Responses:

**User Hooks:**
```typescript
useUsers(params?: { page?: number; limit?: number })
useUserById(id: string)
useCreateUser() // Returns CreateUserRequest
useUpdateUser() // Returns UpdateUserRequest
useDeleteUser()
```

**Role Hooks:**
```typescript
useRoles(params?: { page?: number; limit?: number })
useRoleById(id: string)
useCreateRole() // Returns CreateRoleRequest
useUpdateRole() // Returns UpdateRoleRequest
useDeleteRole()
```

**Tenant Hooks:**
```typescript
useTenants(params?: { page?: number; limit?: number })
useTenantById(id: string)
useCreateTenant() // Returns CreateTenantRequest
useUpdateTenant() // Returns UpdateTenantRequest
useDeleteTenant()
```

**Auth Hook:**
```typescript
useAuth() // Includes login, register, logout, refresh
```

**Key Changes:**
- All list endpoints now unwrap `response.data.users/roles/tenants`
- All single item endpoints unwrap `response.data`
- Proper token storage for auth (both access and refresh tokens)
- Logout now requires refresh token parameter

---

### 4. **Forms** ([src/Forms/UserManagement.ts](src/Forms/UserManagement.ts))

#### Updated Form Fields:

**Create User:**
- Removed: `tenantId`, `isActive` (not in API schema)
- Kept: `email`, `password`, `firstName`, `lastName`, `roleId`

**Update User:**
- Removed: `tenantId`, `isActive`
- Kept: `email`, `firstName`, `lastName`, `roleId`

**Create/Update Role:**
- Changed: `permissions` → `permissionIds` (array of permission IDs)
- Removed: `tenantId`, `isActive`
- Required: `name`, `description`, `permissionIds`

**Create/Update Tenant:**
- Added: `domain` (required)
- Added: `settings` (JSON textarea for configuration)
- Removed: `isActive`

---

### 5. **Tables** ([src/tables/user.tables.ts](src/tables/user.tables.ts))

#### User Table Columns:
- Added: `firstName`, `lastName`
- Changed: `roleId` → `role` (ID reference)
- Changed: `tenantId` → `tenant` (ID reference)
- Kept: `email`, `isActive`, `lastLogin`, `createdAt`

#### Role Table Columns:
- Added: `description`
- Changed: `tenantId` → `tenant`
- Changed: `isActive` → `isDeleted` status
- Updated: Permissions display (shows first 3, then "...")

#### Tenant Table Columns:
- Added: `domain`, `isDeleted`
- Kept: `name`, `isActive`, `createdAt`

---

### 6. **Page Components**

#### [src/pages/configuration/users/components/UsersTab.tsx](src/pages/configuration/users/components/UsersTab.tsx)
- ✅ Updated `fetchUsers()` to unwrap `response.data.users`
- ✅ Updated `handleDelete()` to use `user._id` directly
- ✅ Changed delete messaging to "deactivate" (soft delete)

#### [src/pages/configuration/users/components/RolesTab.tsx](src/pages/configuration/users/components/RolesTab.tsx)
- ✅ Updated `fetchRoles()` to unwrap `response.data.roles`

#### [src/pages/configuration/users/index.tsx](src/pages/configuration/users/index.tsx)
- ✅ Updated `fetchRoles()` to unwrap `response.data.roles`

#### [src/pages/login/components/Register.tsx](src/pages/login/components/Register.tsx)
- ✅ Added required `tenantId` field to registration
- ✅ Updated to handle new response structure (`result.data`)
- ✅ Removed auto-login (register endpoint doesn't return tokens)
- ⚠️ Note: Uses hardcoded `roleId` and `tenantId` (should be made dynamic)

---

## 🔄 API Response Structure Changes

### Before (Old API):
```typescript
// List endpoints returned arrays directly
GET /users → User[]
GET /roles → Role[]

// Single item endpoints returned objects directly
GET /users/{id} → User
```

### After (New API):
```typescript
// All responses are wrapped
GET /users → {
  success: true,
  message: "...",
  data: {
    users: User[],
    total: number,
    page: number,
    limit: number
  }
}

GET /users/{id} → {
  success: true,
  message: "...",
  data: User
}
```

---

## 🎯 Key Behavioral Changes

1. **Pagination Support**
   - All list endpoints (`/users`, `/roles`, `/tenants`) now support `page` and `limit` query parameters
   - Responses include metadata: `total`, `page`, `limit`

2. **Soft Deletes**
   - User deletion → Sets `isActive: false` (user cannot login)
   - Role deletion → Sets `isDeleted: true` (cannot assign to users)
   - Tenant deletion → Sets `isDeleted: true`

3. **Authentication**
   - Refresh tokens now stored alongside access tokens
   - Token rotation implemented (new refresh token with each refresh)
   - Logout requires refresh token to revoke it

4. **Registration**
   - Now requires both `roleId` and `tenantId`
   - Returns user data only (no auto-login tokens)
   - Users must login separately after registration

5. **Role Permissions**
   - Roles use `permissionIds` array instead of `permissions` array
   - Permissions are referenced by ID
   - Role responses show permission codes/names in `permissions` field

---

## ⚠️ Breaking Changes

1. **All API methods now return wrapped responses**
   - Must access data via `response.data.users` instead of `response`
   - Single items: `response.data` instead of `response`

2. **Field name changes:**
   - `roleId` → `role` (in User model, now ID reference)
   - `tenantId` → `tenant` (in User/Role models)
   - `isActive` → `isDeleted` (in Role/Tenant models)

3. **Required fields added:**
   - `RegisterRequest` now requires `tenantId`
   - `CreateRoleRequest` requires `description`
   - `CreateTenantRequest` requires `domain`

4. **Form field removals:**
   - Cannot set `tenantId` or `isActive` when creating/updating users
   - Cannot set `tenantId` or `isActive` when creating/updating roles

---

## ✅ Testing Checklist

- [ ] Login functionality
- [ ] Registration (note: requires hardcoded IDs update)
- [ ] Token refresh on 401 errors
- [ ] User list with pagination
- [ ] User create/edit/deactivate
- [ ] Role list with pagination
- [ ] Role create/edit/delete
- [ ] Tenant list (if accessible)
- [ ] Error handling for wrapped responses
- [ ] Permission display in role tables

---

## 🔮 Future Improvements

1. **Dynamic Role/Tenant Selection**
   - Replace hardcoded IDs in Register component
   - Add tenant selector for multi-tenant support
   - Default role should be "user" not "admin"

2. **Pagination UI**
   - Add page controls to user/role/tenant tables
   - Allow changing items per page
   - Show total count and page info

3. **Permission Management**
   - Implement PermissionsTab with real API calls
   - Add permission selector in role forms
   - Display permission categories/groups

4. **Tenant Management**
   - Add TenantTab to user management dashboard
   - Implement tenant settings UI
   - Add multi-tenant switching for super-admins

5. **Enhanced Error Handling**
   - Use `ApiError` type for structured error responses
   - Display validation errors from API
   - Show trace IDs for debugging

---

## 📚 Related Documentation

- User Service API: See provided Swagger/OpenAPI documentation
- Type Definitions: [src/types/user.types.ts](src/types/user.types.ts)
- API Client: [src/api/user.api.ts](src/api/user.api.ts)
- Hooks: [src/hooks/useUser.ts](src/hooks/useUser.ts)

---

## 🐛 Known Issues

1. **Hardcoded IDs in Register.tsx**
   - `roleId: '69037d7e04c235dfa038bc3a'`
   - `tenantId: '6977c5e4ea7e71a947e74e78'`
   - **Solution**: Fetch default role/tenant from API or add form fields

2. **No Permission Management**
   - PermissionsTab is a placeholder
   - **Solution**: Implement GET /permissions endpoint and UI

3. **No Tenant Management UI**
   - Tenant CRUD exists in API/hooks but no page component
   - **Solution**: Add TenantsTab to user management

---

## 📝 Notes

- All changes maintain backward compatibility at the component level
- TypeScript compilation successful with no errors
- All existing page components updated to use new response structure
- Forms simplified to match API contract (removed unsupported fields)
