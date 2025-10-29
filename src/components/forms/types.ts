// src/types.ts

import { validationRules } from "./validation";

// Defining all possible field types
export type FieldType =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'select'
    | 'multiselect'
    | 'switch'
    | 'rating'
    | 'textarea'
    | 'date'
    | 'datetime'
    | 'daterange'
    | 'radio'
    | 'file'
    | 'image'
    | 'video';

// Option type for fields requiring selection (e.g., dropdowns, radio buttons)
export interface Option {
    label: string;
    value: string | number;
}

// Base structure for each form field
export interface FormField {
    name: string;
    label: string;
    type: FieldType;
    required?: boolean;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
    onChange?: (value: string) => void;
    options?: Option[]; // For Select, MultiSelect, and Radio buttons
    placeholder?: string;
    validations?: {
        rule: keyof typeof validationRules; // ensures rule names match
        args?: any[];
    }[];
}

// Custom button structure for additional actions
export interface CustomButton {
    text: string;
    onClick: () => void;
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    variant?: 'text' | 'outlined' | 'contained';
}

// Main form props for dynamic form generation
export interface FormProps {
    fields: FormField[];  // List of fields to render
    onSubmit?: (values: { [key: string]: any }) => void; // Submission handler
    submitButtonText?: string;  // Optional submit button label
    cancelButtonText?: string;  // Optional cancel button label
    onCancel?: () => void;      // Optional cancel handler
    customButtons?: CustomButton[]; // Additional buttons for form actions
    initialValues?: { [key: string]: any }; // ✅ Added for pre-filled data support
}
