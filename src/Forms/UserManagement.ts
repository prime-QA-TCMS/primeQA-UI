import type { FormField } from "fog-ui";

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
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: false
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: false
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: false,
        minLength: 6
    },
    {
        name: 'role',
        label: 'Role',
        type: 'select',
        required: true,
        options: [] // Will be populated dynamically
    },
    {
        name: 'isActive',
        label: 'Active Status',
        type: 'checkbox',
        required: false
    }
];

export const roleFormFields: FormField[] = [
    {
        name: 'name',
        label: 'Role Name',
        type: 'text',
        required: true
    },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        required: false
    },
    {
        name: 'permissions',
        label: 'Permissions',
        type: 'multiselect',
        required: false,
        options: [
            { label: 'View Users', value: 'view_users' },
            { label: 'Create Users', value: 'create_users' },
            { label: 'Edit Users', value: 'edit_users' },
            { label: 'Delete Users', value: 'delete_users' },
            { label: 'View Projects', value: 'view_projects' },
            { label: 'Create Projects', value: 'create_projects' },
            { label: 'Edit Projects', value: 'edit_projects' },
            { label: 'Delete Projects', value: 'delete_projects' },
            { label: 'View Test Cases', value: 'view_testcases' },
            { label: 'Create Test Cases', value: 'create_testcases' },
            { label: 'Edit Test Cases', value: 'edit_testcases' },
            { label: 'Delete Test Cases', value: 'delete_testcases' },
            { label: 'View Test Runs', value: 'view_testruns' },
            { label: 'Create Test Runs', value: 'create_testruns' },
            { label: 'Edit Test Runs', value: 'edit_testruns' },
            { label: 'Delete Test Runs', value: 'delete_testruns' },
        ]
    }
];

export const permissionsFormFields: FormField[] = [
    {
        name: 'name',
        label: 'Permission Name',
        type: 'text',
        required: true
    },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        required: false
    },
    {
        name: 'resource',
        label: 'Resource',
        type: 'text',
        required: true
    },
    {
        name: 'action',
        label: 'Action',
        type: 'select',
        required: true,
        options: [
            { label: 'View', value: 'view' },
            { label: 'Create', value: 'create' },
            { label: 'Edit', value: 'edit' },
            { label: 'Delete', value: 'delete' },
        ]
    }
];