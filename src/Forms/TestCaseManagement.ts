import { FormField } from "../components/forms/types";

export const dataSetsFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'project_id', 
        label: 'project_id', 
        type: 'select', 
        required: false
    },
    { 
        name: 'name', 
        label: 'name', 
        type: 'text', 
        required: false
    }
];

export const dataSetVariablesFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'name', 
        label: 'name', 
        type: 'text', 
        required: false
    },
    { 
        name: 'value', 
        label: 'value', 
        type: 'text', 
        required: false
    }
];

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

export const casesFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'title', 
        label: 'title', 
        type: 'number', 
        required: false
    },
    { 
        name: 'section_id', 
        label: 'section_id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'template_id', 
        label: 'template_id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'type_id', 
        label: 'type_id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'priority_id', 
        label: 'priority_id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'milestone_id', 
        label: 'milestone_id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'refs', 
        label: 'refs', 
        type: 'number', 
        required: false
    },
    { 
        name: 'created_by', 
        label: 'created_by', 
        type: 'number', 
        required: false
    },
    { 
        name: 'created_on', 
        label: 'created_on', 
        type: 'number', 
        required: false
    },
    { 
        name: 'updated_by', 
        label: 'updated_by', 
        type: 'number', 
        required: false
    },
    { 
        name: 'updated_on', 
        label: 'updated_on', 
        type: 'number', 
        required: false
    },
    { 
        name: 'estimate', 
        label: 'estimate', 
        type: 'number', 
        required: false
    },
    { 
        name: 'estimate_forecast', 
        label: 'estimate_forecast', 
        type: 'number', 
        required: false
    },
    { 
        name: 'suite_id', 
        label: 'suite_id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'display_order', 
        label: 'display_order', 
        type: 'number', 
        required: false
    },
    { 
        name: 'is_deleted', 
        label: 'is_deleted', 
        type: 'number', 
        required: false
    },
    { 
        name: 'custom_automation_type', 
        label: 'custom_automation_type', 
        type: 'number', 
        required: false
    },
    { 
        name: 'custom_preconds', 
        label: 'custom_preconds', 
        type: 'number', 
        required: false
    },
    { 
        name: 'steps', 
        label: 'steps', 
        type: 'number', 
        required: false
    },
    { 
        name: 'expected', 
        label: 'expected', 
        type: 'number', 
        required: false
    },
    { 
        name: 'steps_separated', 
        label: 'steps_separated', 
        type: 'number', 
        required: false
    },
    { 
        name: 'mission', 
        label: 'mission', 
        type: 'number', 
        required: false
    },
    { 
        name: 'goals', 
        label: 'goals', 
        type: 'number', 
        required: false
    }
];

export const sharedStepsFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'title', 
        label: 'title', 
        type: 'number', 
        required: false
    },
    { 
        name: 'project_id', 
        label: 'project_id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'created_by', 
        label: 'created_by', 
        type: 'number', 
        required: false
    },
    { 
        name: 'created_on', 
        label: 'created_on', 
        type: 'number', 
        required: false
    },
    { 
        name: 'updated_by', 
        label: 'updated_by', 
        type: 'number', 
        required: false
    },
    { 
        name: 'updated_on', 
        label: 'updated_on', 
        type: 'number', 
        required: false
    },
    { 
        name: 'case_ids', 
        label: 'case_ids', 
        type: 'number', 
        required: false
    }
];
export const sharedStepFormFields: FormField[] = [
    { 
        name: 'content', 
        label: 'content', 
        type: 'number', 
        required: false
    },
    { 
        name: 'additional_info', 
        label: 'additional_info', 
        type: 'number', 
        required: false
    },
    { 
        name: 'expected', 
        label: 'expected', 
        type: 'number', 
        required: false
    }
];

export const sectionsFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'depth', 
        label: 'depth', 
        type: 'number', 
        required: false
    },
    { 
        name: 'description', 
        label: 'description', 
        type: 'number', 
        required: false
    },
    { 
        name: 'display_order', 
        label: 'display_order', 
        type: 'number', 
        required: false
    },
    { 
        name: 'name', 
        label: 'name', 
        type: 'number', 
        required: false
    },
    { 
        name: 'parent_id', 
        label: 'parent_id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'suite_id', 
        label: 'suite_id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'project_id', 
        label: 'project_id', 
        type: 'number', 
        required: false
    }
];

export const suitesFormFields: FormField[] = [
    { 
        name: 'id', 
        label: 'id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'description', 
        label: 'description', 
        type: 'number', 
        required: false
    },
    { 
        name: 'name', 
        label: 'name', 
        type: 'number', 
        required: false
    },
    { 
        name: 'project_id', 
        label: 'project_id', 
        type: 'number', 
        required: false
    },
    { 
        name: 'url', 
        label: 'url', 
        type: 'number', 
        required: false
    }
];
