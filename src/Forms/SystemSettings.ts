import type { FormField } from 'fog-ui';

// ========================================
// ⚙️ SYSTEM SETTINGS FORMS
// ========================================

// Placeholder for future system settings forms
// This file is reserved for global system configuration forms
// such as branding, email settings, security policies, etc.

export const FormFields: FormField[] = [
  {
    name: 'settingKey',
    label: 'Setting Key',
    type: 'text',
    required: true,
  },
  {
    name: 'settingValue',
    label: 'Setting Value',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
  },
];

export const createSystemSettingFormFields: FormField[] = FormFields;
export const updateSystemSettingFormFields: FormField[] = FormFields;
