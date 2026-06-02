import type { FormField } from 'fog-ui';

// ========================================
// 🏃 TEST RUN FORMS
// ========================================

export const createRunFormFields = (projectId?: string): FormField[] => [
  ...(projectId ? [{
    name: 'projectId',
    label: 'Project ID',
    type: 'text' as const,
    disabled: true,
    required: false,
    defaultValue: projectId,
  }] as FormField[] : []),
  {
    name: 'name',
    label: 'Run Name',
    type: 'text' as const,
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea' as const,
    required: false,
  },
  {
    name: 'type',
    label: 'Type',
    type: 'select' as const,
    required: true,
    options: [
      { label: 'Manual', value: 'Manual' },
      { label: 'Automated', value: 'Automated' },
      { label: 'Scheduled', value: 'Scheduled' },
    ],
  },
  {
    name: 'environment',
    label: 'Environment',
    type: 'text' as const,
    required: false,
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch' as const,
    required: false,
  },
];

export const updateRunFormFields = (projectId?: string): FormField[] => [
  ...(projectId ? [{
    name: 'projectId',
    label: 'Project ID',
    type: 'text' as const,
    disabled: true,
    required: false,
    defaultValue: projectId,
  }] as FormField[] : []),
  {
    name: 'name',
    label: 'Run Name',
    type: 'text' as const,
    required: false,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea' as const,
    required: false,
  },
  {
    name: 'type',
    label: 'Type',
    type: 'select' as const,
    required: false,
    options: [
      { label: 'Manual', value: 'Manual' },
      { label: 'Automated', value: 'Automated' },
      { label: 'Scheduled', value: 'Scheduled' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    required: false,
    options: [
      { label: 'Pending', value: 'Pending' },
      { label: 'Running', value: 'Running' },
      { label: 'Completed', value: 'Completed' },
      { label: 'Aborted', value: 'Aborted' },
    ],
  },
  {
    name: 'environment',
    label: 'Environment',
    type: 'text' as const,
    required: false,
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch' as const,
    required: false,
  },
];

// Keep old exports for backward compatibility
export const createTestRunFormFields = createRunFormFields();
export const updateTestRunFormFields = updateRunFormFields();

// ========================================
// 🧪 TEST (Instance) FORMS
// ========================================

export const createTestFormFields: FormField[] = [
  {
    name: 'runId',
    label: 'Test Run',
    type: 'select',
    required: true,
    options: [], // Populated dynamically
  },
  {
    name: 'projectId',
    label: 'Project',
    type: 'select',
    required: true,
    options: [],
  },
  {
    name: 'testCaseId',
    label: 'Test Case',
    type: 'select',
    required: true,
    options: [],
  },
  {
    name: 'suiteId',
    label: 'Suite',
    type: 'select',
    required: true,
    options: [],
  },
  {
    name: 'sectionId',
    label: 'Section',
    type: 'select',
    required: true,
    options: [],
  },
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Not Started', value: 'Not Started' },
      { label: 'In Progress', value: 'In Progress' },
      { label: 'Completed', value: 'Completed' },
    ],
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

export const updateTestFormFields: FormField[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: false,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: false,
    options: [
      { label: 'Not Started', value: 'Not Started' },
      { label: 'In Progress', value: 'In Progress' },
      { label: 'Completed', value: 'Completed' },
    ],
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

// ========================================
// 📊 RESULT FORMS
// ========================================

export const createResultFormFields: FormField[] = [
  {
    name: 'testId',
    label: 'Test',
    type: 'select',
    required: true,
    options: [], // Populated dynamically
  },
  {
    name: 'projectId',
    label: 'Project',
    type: 'select',
    required: true,
    options: [],
  },
  {
    name: 'status',
    label: 'Result Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Passed', value: 'Passed' },
      { label: 'Failed', value: 'Failed' },
      { label: 'Blocked', value: 'Blocked' },
      { label: 'Skipped', value: 'Skipped' },
      { label: 'Retest', value: 'Retest' },
    ],
  },
  {
    name: 'executedBy',
    label: 'Executed By',
    type: 'select',
    required: true,
    options: [], // Populated from users API
  },
  {
    name: 'startTime',
    label: 'Start Time',
    type: 'datetime',
    required: false,
  },
  {
    name: 'endTime',
    label: 'End Time',
    type: 'datetime',
    required: false,
  },
  {
    name: 'logs',
    label: 'Logs',
    type: 'textarea',
    required: false,
  },
  {
    name: 'screenshotUrl',
    label: 'Screenshot URL',
    type: 'text',
    required: false,
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

export const updateResultFormFields: FormField[] = [
  {
    name: 'status',
    label: 'Result Status',
    type: 'select',
    required: false,
    options: [
      { label: 'Passed', value: 'Passed' },
      { label: 'Failed', value: 'Failed' },
      { label: 'Blocked', value: 'Blocked' },
      { label: 'Skipped', value: 'Skipped' },
      { label: 'Retest', value: 'Retest' },
    ],
  },
  {
    name: 'executedBy',
    label: 'Executed By',
    type: 'select',
    required: false,
    options: [],
  },
  {
    name: 'startTime',
    label: 'Start Time',
    type: 'datetime',
    required: false,
  },
  {
    name: 'endTime',
    label: 'End Time',
    type: 'datetime',
    required: false,
  },
  {
    name: 'logs',
    label: 'Logs',
    type: 'textarea',
    required: false,
  },
  {
    name: 'screenshotUrl',
    label: 'Screenshot URL',
    type: 'text',
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
export const runFormFields = createTestRunFormFields;
export const testFormFields = createTestFormFields;
export const resultsFormFields = createResultFormFields;

// Deprecated exports
export const testCaseAttachmentsFormFields: FormField[] = [];
export const runConfigFormFields: FormField[] = [];
export const planFormFields: FormField[] = [];
export const planEntriesFormFields: FormField[] = [];
