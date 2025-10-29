import { FormField } from "../components/forms/types";

export const testCaseAttachmentsFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'file', 
        label: 'file', 
        type: 'file', 
        required: false
    }
];

export const resultsFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'assignedto_id', 
        label: 'assignedto_id', 
        type: 'select', 
        required: false
    },
    { 
        name: 'comment', 
        label: 'comment', 
        type: 'select', 
        required: false
    },
    { 
        name: 'created_by', 
        label: 'created_by', 
        type: 'select', 
        required: false
    },
    { 
        name: 'created_on', 
        label: 'created_on', 
        type: 'select', 
        required: false
    },
    { 
        name: 'custom_step_results', 
        label: 'custom_step_results', 
        type: 'select', 
        required: false
    },
    { 
        name: 'defects', 
        label: 'defects', 
        type: 'select', 
        required: false
    },
    { 
        name: 'elapsed', 
        label: 'elapsed', 
        type: 'select', 
        required: false
    },
    { 
        name: 'status_id', 
        label: 'status_id', 
        type: 'select', 
        required: false
    },
    { 
        name: 'test_id', 
        label: 'test_id', 
        type: 'select', 
        required: false
    },
    { 
        name: 'version', 
        label: 'version', 
        type: 'select', 
        required: false
    }
];

export const runFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'assignedto_id', 
        label: 'assignedto_id', 
        type: 'select', 
        required: false
    },
    { 
        name: 'completed_on', 
        label: 'completed_on', 
        type: 'select', 
        required: false
    },
    { 
        name: 'config', 
        label: 'config', 
        type: 'select', 
        required: false
    },
    { 
        name: 'created_by', 
        label: 'created_by', 
        type: 'select', 
        required: false
    },
    { 
        name: 'created_on', 
        label: 'created_on', 
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
        name: 'description', 
        label: 'description', 
        type: 'select', 
        required: false
    },
    { 
        name: 'include_all', 
        label: 'include_all', 
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
        name: 'milestone_id', 
        label: 'milestone_id', 
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
        name: 'plan_id', 
        label: 'plan_id', 
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
        name: 'suite_id', 
        label: 'suite_id', 
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
export const runConfigFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    }
];

export const planFormFields: FormField[] = [
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
        name: 'description', 
        label: 'description', 
        type: 'select', 
        required: false
    },
    { 
        name: 'milestone_id', 
        label: 'milestone_id', 
        type: 'select', 
        required: false
    },
    { 
        name: 'assignedto_id', 
        label: 'assignedto_id', 
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
        name: 'completed_on', 
        label: 'completed_on', 
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
        name: 'created_on', 
        label: 'created_on', 
        type: 'select', 
        required: false
    },
    { 
        name: 'created_by', 
        label: 'created_by', 
        type: 'select', 
        required: false
    },
    { 
        name: 'url', 
        label: 'url', 
        type: 'select', 
        required: false
    },
    { 
        name: 'start_on', 
        label: 'start_on', 
        type: 'select', 
        required: false
    },
    { 
        name: 'due_date', 
        label: 'due_date', 
        type: 'select', 
        required: false
    }
];
export const planEntriesFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'suite_id', 
        label: 'suite_id', 
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
        name: 'refs', 
        label: 'refs', 
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
        name: 'include_all', 
        label: 'include_all', 
        type: 'select', 
        required: false
    }
];

export const testFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'assignedto_id', 
        label: 'assignedto_id', 
        type: 'select', 
        required: false
    },
    { 
        name: 'case_id', 
        label: 'case_id', 
        type: 'select', 
        required: false
    },
    { 
        name: 'run_id', 
        label: 'run_id', 
        type: 'select', 
        required: false
    }
];

