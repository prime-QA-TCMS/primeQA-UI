import type { FormField } from "fog-ui";


export const createProject: FormField[] = [
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
    name: 'visibility',
    label: 'Visibility',
    type: 'select',
    options: [
      { label: 'Private', value: 'private' },
      { label: 'Public', value: 'public' },
    ],
    required: true,
  },
  {
    name: 'isActive',
    label: 'Active?',
    type: 'switch',
    required: false,
  }
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

export const todoFilterFormFields: FormField[] = [
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
    }
];