export interface Configuration {
  _id?: string;
  projectId: string;
  name: string;
  url?: string;
  browser?: string;
  os?: string;
  version?: string;
  variables?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Dataset {
  _id?: string;
  name: string;
  type?: 'Static' | 'Generated';
  schema?: Record<string, string>;
  values?: Record<string, any>[];
  linkedCases?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomField {
  _id?: string;
  name: string;
  type: 'Text' | 'Number' | 'Dropdown' | 'Checkbox' | 'Date';
  options?: string[];
  appliesTo: 'TestCase' | 'TestRun' | 'Project' | 'Suite';
  isRequired?: boolean;
  defaultValue?: any;
}
