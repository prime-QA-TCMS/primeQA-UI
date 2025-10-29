import { FormField } from "../components/forms/types";

export const FormFields: FormField[] = [
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
    }
];
