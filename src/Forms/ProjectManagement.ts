import { FormField } from "../components/forms/types";


export const testing: FormField[] = [
  // ──────────────── Basic Info ────────────────
  {
    name: 'name',
    label: 'Project Name',
    type: 'text',
    required: true,
    placeholder: 'Enter project name',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
    placeholder: 'Brief project summary',
  },
  {
    name: 'ownerEmail',
    label: 'Owner Email',
    type: 'email',
    required: true,
    placeholder: 'owner@company.com',
  },
  {
    name: 'password',
    label: 'API Access Password',
    type: 'password',
    required: false,
  },
  {
    name: 'priority',
    label: 'Priority Level',
    type: 'number',
    required: true,
  },

  // ──────────────── Selection & Toggles ────────────────
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'On Hold', value: 'hold' },
      { label: 'Completed', value: 'completed' },
    ],
    required: true,
  },
  {
    name: 'tags',
    label: 'Tags',
    type: 'multiselect',
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
      { label: 'API', value: 'api' },
      { label: 'QA', value: 'qa' },
    ],
    required: false,
  },
  {
    name: 'isPublic',
    label: 'Public Project',
    type: 'switch',
    required: false,
  },
  {
    name: 'customerSatisfaction',
    label: 'Customer Satisfaction Rating',
    type: 'rating',
    required: false,
  },

  // ──────────────── Date & Time ────────────────
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    required: true,
  },
  {
    name: 'deadline',
    label: 'Deadline',
    type: 'datetime',
    required: false,
  },
  {
    name: 'reviewWindow',
    label: 'Review Window',
    type: 'daterange',
    required: false,
  },

  // ──────────────── Radio & Media ────────────────
  {
    name: 'visibility',
    label: 'Visibility',
    type: 'radio',
    options: [
      { label: 'Private', value: 'private' },
      { label: 'Internal', value: 'internal' },
      { label: 'Public', value: 'public' },
    ],
    required: true,
  },
  {
    name: 'projectBrief',
    label: 'Project Brief (PDF or Doc)',
    type: 'file',
    required: false,
  },
  {
    name: 'projectLogo',
    label: 'Project Logo',
    type: 'image',
    required: false,
  },
  {
    name: 'demoVideo',
    label: 'Demo Video',
    type: 'video',
    required: false,
  },
];


export const projectsFormFields: FormField[] = [
    { 
        name: 'name', 
        label: 'name', 
        type: 'text', 
        required: true
    },
    { 
        name: 'description', 
        label: 'Description', 
        type: 'textarea', 
        required: false
    }
];
export const projectUsersFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'global_role_id', 
        label: 'global_role_id', 
        type: 'select', 
        required: false
    },
    { 
        name: 'global_role', 
        label: 'global_role', 
        type: 'select', 
        required: false
    },
    { 
        name: 'project_role_id', 
        label: 'project_role_id', 
        type: 'select', 
        required: false
    },
    { 
        name: 'project_role', 
        label: 'project_role', 
        type: 'select', 
        required: false
    }
];

export const configurationsFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'name', 
        label: 'name', 
        type: 'select', 
        required: false
    },
    { 
        name: 'project_id', 
        label: 'project_id', 
        type: 'select', 
        required: false
    }
];

export const configurationItemFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'name', 
        label: 'name', 
        type: 'select', 
        required: false
    },
    { 
        name: 'group_id', 
        label: 'group_id', 
        type: 'select', 
        required: false
    }
];

export const milestonesFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'completed_on', 
        label: 'completed_on', 
        type: 'select', 
        required: false
    },
    { 
        name: 'description', 
        label: 'description', 
        type: 'select', 
        required: false
    },
    { 
        name: 'due_on', 
        label: 'due_on', 
        type: 'select', 
        required: false
    },
    { 
        name: 'is_completed', 
        label: 'is_completed', 
        type: 'select', 
        required: false
    },
    { 
        name: 'name', 
        label: 'name', 
        type: 'select', 
        required: false
    },
    { 
        name: 'project_id', 
        label: 'project_id', 
        type: 'select', 
        required: false
    },
    { 
        name: 'refs', 
        label: 'refs', 
        type: 'select', 
        required: false
    },
    { 
        name: 'url', 
        label: 'url', 
        type: 'select', 
        required: false
    }
];