import { validationRules } from "./validation";

export type FieldType = | 'text' | 'email' | 'password' | 'number' | 'select' | 'multiselect' | 'switch' | 'rating' | 'textarea' | 'date' | 'datetime' | 'daterange' | 'radio' | 'file' | 'image' | 'video';

export interface Option {
    label: string;
    value: string | number;
}

export interface FormField {
    name: string;
    label: string;
    type: FieldType;
    required?: boolean;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
    onChange?: (value: string) => void;
    options?: Option[];
    placeholder?: string;
    validations?: {
        rule: keyof typeof validationRules;
        args?: any[];
    }[];
    defaultValue?: any;
    apiEndpoint?: string;
    optionLabelKey?: string;
    optionValueKey?: string;
    width?: "full" | "half"; 
}

export interface CustomButton {
    text: string;
    onClick: () => void;
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    variant?: 'text' | 'outlined' | 'contained';
}

export interface FormProps {
    fields: FormField[]; 
    onSubmit?: (values: { [key: string]: any }) => void;
    submitButtonText?: string;
    cancelButtonText?: string;
    onCancel?: () => void;
    customButtons?: CustomButton[];
    initialValues?: { [key: string]: any };
}

export interface FieldOption {
  value: string;
  label: string;
}

export interface Field {
  name: string;
  label: string;
  type: string;
  width?: "half" | "full";
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  defaultValue?: any;
  apiEndpoint?: string;
  optionLabelKey?: string;
  optionValueKey?: string;
  validations?: { rule: string; args?: any[] }[];
  onChange?: (value: any) => void;
}