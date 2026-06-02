import type { FormField } from 'fog-ui';

// ========================================
// 📊 REPORT FORMS
// ========================================

// Placeholder for future report configuration forms
// This file is reserved for report generation and filtering forms

export const reportFilterFormFields: FormField[] = [
  {
    name: 'projectId',
    label: 'Project',
    type: 'select',
    required: false,
    options: [], // Populated dynamically
  },
  {
    name: 'dateFrom',
    label: 'From Date',
    type: 'date',
    required: false,
  },
  {
    name: 'dateTo',
    label: 'To Date',
    type: 'date',
    required: false,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'multiselect',
    required: false,
    options: [
      { label: 'Passed', value: 'Passed' },
      { label: 'Failed', value: 'Failed' },
      { label: 'Blocked', value: 'Blocked' },
      { label: 'Skipped', value: 'Skipped' },
    ],
  },
];

export const FormFields: FormField[] = reportFilterFormFields;
