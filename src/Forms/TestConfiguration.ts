import type { FormField } from 'fog-ui';

// ========================================
// 🌍 ENVIRONMENT FORMS
// ========================================

export const createEnvironmentFormFields: FormField[] = [
  {
    name: 'tenantId',
    label: 'Tenant ID',
    type: 'text',
    required: false,
  },
  {
    name: 'name',
    label: 'Environment Name',
    type: 'text',
    required: true,
    placeholder: 'e.g., Development, Staging, Production',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
  },
  {
    name: 'baseUrl',
    label: 'Base URL',
    type: 'text',
    required: true,
    placeholder: 'https://api.example.com',
  },
  {
    name: 'variables',
    label: 'Variables (JSON)',
    type: 'textarea',
    required: false,
    placeholder: '{"API_KEY": "value", "TIMEOUT": "30"}',
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

export const updateEnvironmentFormFields: FormField[] = [
  {
    name: 'tenantId',
    label: 'Tenant ID',
    type: 'text',
    required: false,
  },
  {
    name: 'name',
    label: 'Environment Name',
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
    name: 'baseUrl',
    label: 'Base URL',
    type: 'text',
    required: false,
  },
  {
    name: 'variables',
    label: 'Variables (JSON)',
    type: 'textarea',
    required: false,
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

// ========================================
// 📋 PARAMETER FORMS
// ========================================

export const createParameterFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Parameter Name',
    type: 'text',
    required: true,
  },
  {
    name: 'value',
    label: 'Value',
    type: 'text',
    required: true,
  },
  {
    name: 'type',
    label: 'Type',
    type: 'select',
    required: true,
    options: [
      { label: 'String', value: 'string' },
      { label: 'Number', value: 'number' },
      { label: 'Boolean', value: 'boolean' },
      { label: 'Secret', value: 'secret' },
    ],
  },
  {
    name: 'scope',
    label: 'Scope',
    type: 'select',
    required: true,
    options: [
      { label: 'Global', value: 'global' },
      { label: 'Tenant', value: 'tenant' },
      { label: 'Project', value: 'project' },
      { label: 'Environment', value: 'environment' },
    ],
  },
  {
    name: 'scopeRefId',
    label: 'Scope Reference ID',
    type: 'text',
    required: false,
    placeholder: 'Tenant ID, Project ID, or Environment ID',
  },
  {
    name: 'projectId',
    label: 'Project',
    type: 'select',
    required: false,
    options: [], // Populated dynamically, shown when scope is project
  },
  {
    name: 'environmentId',
    label: 'Environment',
    type: 'select',
    required: false,
    options: [], // Populated dynamically, shown when scope is environment
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

export const updateParameterFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Parameter Name',
    type: 'text',
    required: false,
  },
  {
    name: 'value',
    label: 'Value',
    type: 'text',
    required: false,
  },
  {
    name: 'type',
    label: 'Type',
    type: 'select',
    required: false,
    options: [
      { label: 'String', value: 'string' },
      { label: 'Number', value: 'number' },
      { label: 'Boolean', value: 'boolean' },
      { label: 'Secret', value: 'secret' },
    ],
  },
  {
    name: 'scope',
    label: 'Scope',
    type: 'select',
    required: false,
    options: [
      { label: 'Global', value: 'global' },
      { label: 'Tenant', value: 'tenant' },
      { label: 'Project', value: 'project' },
      { label: 'Environment', value: 'environment' },
    ],
  },
  {
    name: 'scopeRefId',
    label: 'Scope Reference ID',
    type: 'text',
    required: false,
  },
  {
    name: 'projectId',
    label: 'Project',
    type: 'select',
    required: false,
    options: [],
  },
  {
    name: 'environmentId',
    label: 'Environment',
    type: 'select',
    required: false,
    options: [],
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

// ========================================
// 🔌 INTEGRATION FORMS
// ========================================

export const createIntegrationFormFields: FormField[] = [
  {
    name: 'tenantId',
    label: 'Tenant ID',
    type: 'text',
    required: false,
  },
  {
    name: 'name',
    label: 'Integration Name',
    type: 'text',
    required: false,
  },
  {
    name: 'type',
    label: 'Integration Type',
    type: 'select',
    required: true,
    options: [
      { label: 'JIRA', value: 'jira' },
      { label: 'Slack', value: 'slack' },
      { label: 'GitHub', value: 'github' },
      { label: 'Custom', value: 'custom' },
    ],
  },
  {
    name: 'config',
    label: 'Configuration (JSON)',
    type: 'textarea',
    required: true,
    placeholder: '{"apiKey": "...", "webhookUrl": "..."}',
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

export const updateIntegrationFormFields: FormField[] = [
  {
    name: 'tenantId',
    label: 'Tenant ID',
    type: 'text',
    required: false,
  },
  {
    name: 'name',
    label: 'Integration Name',
    type: 'text',
    required: false,
  },
  {
    name: 'type',
    label: 'Integration Type',
    type: 'select',
    required: false,
    options: [
      { label: 'JIRA', value: 'jira' },
      { label: 'Slack', value: 'slack' },
      { label: 'GitHub', value: 'github' },
      { label: 'Custom', value: 'custom' },
    ],
  },
  {
    name: 'config',
    label: 'Configuration (JSON)',
    type: 'textarea',
    required: false,
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

// Legacy export
export const FormFields: FormField[] = createEnvironmentFormFields;
