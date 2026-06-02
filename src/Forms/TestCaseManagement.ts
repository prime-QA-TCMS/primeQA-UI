import type { FormField } from 'fog-ui';

// ========================================
// 📦 SUITE FORMS
// ========================================

export const createSuiteFormFields = (projectId?: string): FormField[] => [
  {
    name: 'name',
    label: 'Suite Name',
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
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

export const updateSuiteFormFields = (projectId?: string): FormField[] => [
  {
    name: 'projectId',
    label: 'Project',
    type: 'select',
    required: false,
    disabled: !!projectId,
    apiEndpoint: '/projects',
    optionLabelKey: 'name',
    optionValueKey: '_id',
  },
  {
    name: 'name',
    label: 'Suite Name',
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
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

// ========================================
// 📑 SECTION FORMS
// ========================================

export const createSectionFormFields = (
  projectId?: string,
  suiteId?: string
): FormField[] => [
    {
      name: 'name',
      label: 'Section Name',
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
      name: 'order',
      label: 'Order',
      type: 'number',
      required: false,
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'switch',
      required: false,
    },
  ];

export const updateSectionFormFields = (
  projectId?: string,
  suiteId?: string
): FormField[] => [
    {
      name: 'name',
      label: 'Section Name',
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
      name: 'order',
      label: 'Order',
      type: 'number',
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
// 🧪 TEST CASE FORMS
// ========================================

export const createTestCaseFormFields: FormField[] = [
  {
    name: 'title',
    label: 'Test Case Title',
    type: 'text',
    required: true,
  },
  {
    name: 'priority',
    label: 'Priority',
    type: 'select',
    required: true,
    options: [
      { label: 'Low', value: 'Low' },
      { label: 'Medium', value: 'Medium' },
      { label: 'High', value: 'High' },
      { label: 'Critical', value: 'Critical' },
    ],
  },
  {
    name: 'type',
    label: 'Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Functional', value: 'Functional' },
      { label: 'Regression', value: 'Regression' },
      { label: 'Performance', value: 'Performance' },
      { label: 'Security', value: 'Security' },
      { label: 'Other', value: 'Other' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Draft', value: 'Draft' },
      { label: 'Ready', value: 'Ready' },
      { label: 'Deprecated', value: 'Deprecated' },
    ],
  },
  {
    name: 'preconditions',
    label: 'Preconditions',
    type: 'textarea',
    required: false,
  },
  {
    name: 'steps',
    label: 'Test Steps (JSON)',
    type: 'textarea',
    required: true,
    placeholder: '[{"action": "...", "expected": "...", "data": {}}]',
  },
  {
    name: 'expectedResult',
    label: 'Expected Result',
    type: 'textarea',
    required: true,
  },
  {
    name: 'isActive',
    label: 'Active',
    type: 'switch',
    required: false,
  },
];

export const updateTestCaseFormFields: FormField[] = [
  {
    name: 'title',
    label: 'Test Case Title',
    type: 'text',
    required: false,
  },
  {
    name: 'priority',
    label: 'Priority',
    type: 'select',
    required: false,
    options: [
      { label: 'Low', value: 'Low' },
      { label: 'Medium', value: 'Medium' },
      { label: 'High', value: 'High' },
      { label: 'Critical', value: 'Critical' },
    ],
  },
  {
    name: 'type',
    label: 'Type',
    type: 'select',
    required: false,
    options: [
      { label: 'Functional', value: 'Functional' },
      { label: 'Regression', value: 'Regression' },
      { label: 'Performance', value: 'Performance' },
      { label: 'Security', value: 'Security' },
      { label: 'Other', value: 'Other' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: false,
    options: [
      { label: 'Draft', value: 'Draft' },
      { label: 'Ready', value: 'Ready' },
      { label: 'Deprecated', value: 'Deprecated' },
    ],
  },
  {
    name: 'preconditions',
    label: 'Preconditions',
    type: 'textarea',
    required: false,
  },
  {
    name: 'steps',
    label: 'Test Steps',
    type: 'textarea',
    required: false,
  },
  {
    name: 'expectedResult',
    label: 'Expected Result',
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
export const suitesFormFields = createSuiteFormFields;
export const sectionsFormFields = createSectionFormFields;
export const testCaseFormFields = createTestCaseFormFields;
export const casesFormFields = createTestCaseFormFields;

// Deprecated exports
export const dataSetsFormFields: FormField[] = [];
export const dataSetVariablesFormFields: FormField[] = [];
export const testCaseAttachmentsFormFields: FormField[] = [];
export const sharedStepsFormFields: FormField[] = [];
export const sharedStepFormFields: FormField[] = [];
export const resultFormFields: FormField[] = [];
export const suiteFilterFormFields: FormField[] = [];

