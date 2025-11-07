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
        name: '_id', 
        label: 'id', 
        type: 'text', 
        disabled: true
    },
    { 
        name: 'title', 
        label: 'title', 
        type: 'text', 
        required: true
    },
    { 
        name: 'preconditions', 
        label: 'Preconditions', 
        type: 'textarea', 
        required: false
    },
    { 
        name: 'steps', 
        label: 'Steps', 
        type: 'textarea', 
        required: false
    },
    { 
        name: 'expectedResult', 
        label: 'Expected Results', 
        type: 'textarea', 
        required: false
    },
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

export const testCaseFormFields = (projectId: string | undefined, suiteId: string | undefined, sectionId: string | undefined): FormField[] => [
    { 
        name: "projectId",
        label: "Project",
        type: "select",
        required: true,
        disabled: !!projectId,
        apiEndpoint: "/projects",
        optionLabelKey: "name",
        optionValueKey: "_id",
        defaultValue: projectId || null
    },
    { 
        name: "suiteId",
        label: "Suite",
        type: "select",
        required: true,
        disabled: !!projectId,
        apiEndpoint: "/suites",
        optionLabelKey: "name",
        optionValueKey: "_id",
        defaultValue: suiteId || null
    },
    { 
        name: "sectionId",
        label: "Section",
        type: "select",
        required: true,
        disabled: !!sectionId,
        apiEndpoint: "/sections/suite/" + suiteId,
        optionLabelKey: "name",
        optionValueKey: "_id",
        defaultValue: suiteId || null
    },
    { 
        name: "title",
        label: "Name",
        type: "text",
        required: true
    },
    { 
        name: "description",
        label: "Description",
        type: "textarea",
        required: false
    },
    { 
        name: "preconditions",
        label: "Preconditions",
        type: "textarea",
        required: false
    },
    { 
        name: "steps",
        label: "Steps",
        type: "textarea",
        required: false
    },
    { 
        name: "expectedResults",
        label: "Expected Results",
        type: "textarea",
        required: false
    }
];

export const sectionsFormFields = (projectId: string | undefined, suiteId: string | undefined): FormField[] => [
    { 
        name: "projectId",
        label: "Project",
        type: "select",
        required: true,
        disabled: !!projectId,
        apiEndpoint: "/projects",
        optionLabelKey: "name",
        optionValueKey: "_id",
        defaultValue: projectId || null
    },
    { 
        name: "suiteId",
        label: "Suite",
        type: "select",
        required: true,
        disabled: !!projectId,
        apiEndpoint: "/suites",
        optionLabelKey: "name",
        optionValueKey: "_id",
        defaultValue: suiteId || null
    },
    { 
        name: "name",
        label: "Name",
        type: "text",
        required: true
    },
    { 
        name: "description",
        label: "Description",
        type: "textarea",
        required: false
    },
    { 
        name: "isActive",
        label: "Active?",
        type: "switch",
        required: false
    }
];

export const suitesFormFields = (projectId: string | undefined): FormField[] => [
  { 
    name: "projectId",
    label: "Project",
    type: "select",
    required: true,
    disabled: !!projectId,
    apiEndpoint: "/projects",
    optionLabelKey: "name",
    optionValueKey: "_id",
    defaultValue: projectId || null
  },
  { 
    name: "name",
    label: "Name",
    type: "text",
    required: true
  },
  { 
    name: "description",
    label: "Description",
    type: "textarea",
    required: false
  },
  { 
    name: "isActive",
    label: "Active?",
    type: "switch",
    required: false
  }
];



export const suiteFilterFormFields: FormField[] = [
    { 
        name: 'suite', 
        label: 'Suite', 
        type: 'text', 
        required: false
    },
    { 
        name: 'testCase', 
        label: 'Test Case', 
        type: 'text', 
        required: false
    }
];