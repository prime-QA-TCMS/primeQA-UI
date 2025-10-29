import { FormField } from "../components/forms/types";

export const loginFormFields: FormField[] = [
    { 
        name: 'email', 
        label: 'Username', 
        type: 'email', 
        required: true
    },
    { 
        name: 'password', 
        label: 'Password', 
        type: 'password', 
        required: true, 
        minLength: 6
    }
];

export const userFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'email', 
        label: 'email', 
        type: 'email', 
        required: true, 
        minLength: 6
    },
    { 
        name: 'email_notifications', 
        label: 'Enable Email Notifications', 
        type: 'radio', 
        required: true, 
        minLength: 6
    },
    { 
        name: 'is_active', 
        label: 'Is User Active', 
        type: 'radio', 
        required: true, 
        minLength: 6
    },
    { 
        name: 'name', 
        label: 'name', 
        type: 'text', 
        required: true, 
        minLength: 6
    },
    { 
        name: 'role_id', 
        label: 'User Role', 
        type: 'select', 
        required: true, 
        minLength: 6
    },
    { 
        name: 'role', 
        label: 'role', 
        type: 'text', 
        required: true, 
        minLength: 6
    },
    { 
        name: 'group_ids', 
        label: 'group_ids', 
        type: 'multiselect', 
        required: true, 
        minLength: 6
    },
    { 
        name: 'sso_enabled', 
        label: 'sso_enabled', 
        type: 'radio', 
        required: false, 
        minLength: 6
    },
    { 
        name: 'password', 
        label: 'Password', 
        type: 'radio', 
        required: false, 
        minLength: 6
    }
];

export const roleFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'is_active', 
        label: 'is_active', 
        type: 'radio', 
        required: false, 
        minLength: 6
    },
    { 
        name: 'is_default', 
        label: 'is_default', 
        type: 'radio', 
        required: false, 
        minLength: 6
    },
    { 
        name: 'is_admin', 
        label: 'is_admin', 
        type: 'radio', 
        required: false, 
        minLength: 6
    },
    { 
        name: 'name', 
        label: 'name', 
        type: 'text', 
        required: true, 
        minLength: 6
    },
    { 
        name: 'permissions', 
        label: 'permissions', 
        type: 'multiselect', 
        required: false, 
        minLength: 6
    },
    { 
        name: 'is_project_admin', 
        label: 'is_project_admin', 
        type: 'radio', 
        required: false, 
        minLength: 6
    }
];

export const permissionsFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'is_active', 
        label: 'is_active', 
        type: 'radio', 
        required: true, 
        minLength: 6
    },
    { 
        name: 'name', 
        label: 'name', 
        type: 'text', 
        required: true, 
        minLength: 6
    },
    { 
        name: 'permissions', 
        label: 'permissions', 
        type: 'multiselect', 
        required: true, 
        minLength: 6
    }
];