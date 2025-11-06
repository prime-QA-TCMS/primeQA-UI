export interface Environment {
  _id: string;
  name: string;
  description?: string;
  variables: Record<string, string>;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Parameter {
  _id: string;
  key: string;
  value: string;
  type: "string" | "number" | "boolean" | "json";
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Integration {
  _id: string;
  name: string;
  type: "slack" | "jira" | "github" | "custom";
  config: Record<string, any>;
  isEnabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}
