import type { FormField } from 'fog-ui';

// ========================================
// 📁 PROJECT FORMS
// ========================================

export const createProjectFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Project Name',
    type: 'text',
    required: true,
    placeholder: 'Enter project name',
  },
  {
    name: 'key',
    label: 'Project Key',
    type: 'text',
    required: true,
    placeholder: 'e.g., PROJ',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
    placeholder: 'Brief project summary',
  },
  {
    name: 'owner',
    label: 'Owner',
    type: 'select',
    required: true,
    options: [], // Populated dynamically from users API
  },
  {
    name: 'visibility',
    label: 'Visibility',
    type: 'select',
    options: [
      { label: 'Private', value: 'private' },
      { label: 'Public', value: 'public' },
      { label: 'Team', value: 'team' },
    ],
    required: true,
  },
  {
    name: 'isActive',
    label: 'Active?',
    type: 'switch',
    required: false,
  },
];

export const updateProjectFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Project Name',
    type: 'text',
    required: false,
  },
  {
    name: 'key',
    label: 'Project Key',
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
    name: 'owner',
    label: 'Owner',
    type: 'select',
    required: false,
    options: [], // Populated dynamically
  },
  {
    name: 'visibility',
    label: 'Visibility',
    type: 'select',
    options: [
      { label: 'Private', value: 'private' },
      { label: 'Public', value: 'public' },
      { label: 'Team', value: 'team' },
    ],
    required: false,
  },
  {
    name: 'isActive',
    label: 'Active?',
    type: 'switch',
    required: false,
  },
];

// ========================================
// 🎯 MILESTONE FORMS
// ========================================

export const createMilestoneFormFields: FormField[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
  },
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    required: false,
  },
  {
    name: 'dueDate',
    label: 'Due Date',
    type: 'date',
    required: false,
  },
  {
    name: 'isCompleted',
    label: 'Completed',
    type: 'switch',
    required: false,
  },
];

export const updateMilestoneFormFields: FormField[] = [
  {
    name: 'title',
    label: 'Title',
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
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    required: false,
  },
  {
    name: 'dueDate',
    label: 'Due Date',
    type: 'date',
    required: false,
  },
  {
    name: 'isCompleted',
    label: 'Completed',
    type: 'switch',
    required: false,
  },
];

// ========================================
// ⚙️ PROJECT CONFIGURATION FORMS
// ========================================

export const createProjectConfigurationFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Configuration Name',
    type: 'text',
    required: true,
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
    name: 'environmentVariables',
    label: 'Environment Variables (JSON)',
    type: 'textarea',
    required: false,
    placeholder: '{"API_KEY": "value", "ENV": "production"}',
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

export const updateProjectConfigurationFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Configuration Name',
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
    name: 'environmentVariables',
    label: 'Environment Variables (JSON)',
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

// Legacy exports for backward compatibility
export const createProject = createProjectFormFields;
export const projectsFormFields = createProjectFormFields;
export const milestonesFormFields = createMilestoneFormFields;
export const configurationsFormFields = createProjectConfigurationFormFields;

// Deprecated exports - keeping for compatibility
export const projectUsersFormFields: FormField[] = [];
export const configurationItemFormFields: FormField[] = [];
export const todoFilterFormFields: FormField[] = [];
