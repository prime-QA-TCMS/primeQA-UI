import type { FormField } from 'fog-ui';

// ========================================
// 🔐 AUTH FORMS
// ========================================

export const loginFormFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    minLength: 6,
  },
];

export const registerFormFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    minLength: 6,
  },
  {
    name: 'roleId',
    label: 'Role',
    type: 'select',
    required: true,
    options: [], // Populated dynamically from roles API
  },
  {
    name: 'tenantId',
    label: 'Tenant',
    type: 'select',
    required: false,
    options: [], // Populated dynamically from tenants API
  },
];

// ========================================
// 👤 USER FORMS
// ========================================

export const createUserFormFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    minLength: 6,
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: false,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: false,
  },
  {
    name: 'roleId',
    label: 'Role',
    type: 'select',
    required: true,
    options: [], // Populated dynamically from roles API
  },
];

export const updateUserFormFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: false,
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: false,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: false,
  },
  {
    name: 'roleId',
    label: 'Role',
    type: 'select',
    required: false,
    options: [], // Populated dynamically from roles API
  },
];

// ========================================
// 🎭 ROLE FORMS
// ========================================

export const createRoleFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Role Name',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: true,
  },
  {
    name: 'permissionIds',
    label: 'Permissions',
    type: 'multiselect',
    required: true,
    options: [], // Populated dynamically from permissions API
  },
];

export const updateRoleFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Role Name',
    type: 'text',
    required: false,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
  },
  {
    name: 'permissionIds',
    label: 'Permissions',
    type: 'multiselect',
    required: false,
    options: [], // Populated dynamically from permissions API
  },
];

// ========================================
// 🏢 TENANT FORMS
// ========================================

export const createTenantFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Tenant Name',
    type: 'text',
    required: true,
  },
  {
    name: 'domain',
    label: 'Domain',
    type: 'text',
    required: true,
  },
  {
    name: 'settings',
    label: 'Settings (JSON)',
    type: 'textarea',
    required: false,
    placeholder: '{ "maxUsers": 100, "features": ["advanced-reporting"] }',
  },
];

export const updateTenantFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Tenant Name',
    type: 'text',
    required: false,
  },
  {
    name: 'domain',
    label: 'Domain',
    type: 'text',
    required: false,
  },
  {
    name: 'settings',
    label: 'Settings (JSON)',
    type: 'textarea',
    required: false,
    placeholder: '{ "maxUsers": 100, "features": ["advanced-reporting"] }',
  },
];

// Legacy exports for backward compatibility
export const userFormFields = createUserFormFields;
export const roleFormFields = createRoleFormFields;
export const permissionsFormFields = createRoleFormFields; // Deprecated - use role forms
