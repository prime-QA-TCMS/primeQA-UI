import type { Column } from 'fog-ui';
import { Environment, Parameter, Integration } from '../types';

/**
 * Table definition for Environments (GET /api/environments)
 */
export const environmentColumns: Column<Environment>[] = [
	{
		key: 'name',
		label: 'Name',
		render: (row: Environment) => row.name,
	},
	{
		key: 'description',
		label: 'Description',
		render: (row: Environment) => row.description || '-',
	},
	{
		key: 'baseUrl',
		label: 'Base URL',
		render: (row: Environment) => row.baseUrl || '-',
	},
	{
		key: 'projectId',
		label: 'Project ID',
		render: (row: Environment) => row.projectId || '-',
	},
	{
		key: 'isActive',
		label: 'Status',
		render: (row: Environment) => (row.isActive ? 'Active' : 'Inactive'),
	},
	{
		key: 'createdAt',
		label: 'Created',
		render: (row: Environment) => {
			if (!row.createdAt) return '-';
			const date = new Date(row.createdAt);
			return date.toLocaleDateString();
		},
	},
];

/**
 * Table definition for Parameters (GET /api/parameters)
 */
export const parameterColumns: Column<Parameter>[] = [
	{
		key: 'name',
		label: 'Name',
		render: (row: Parameter) => row.name,
	},
	{
		key: 'value',
		label: 'Value',
		render: (row: Parameter) => {
			if (row.type === 'secret') return '••••••••';
			return String(row.value);
		},
	},
	{
		key: 'type',
		label: 'Type',
		render: (row: Parameter) => row.type,
	},
	{
		key: 'scope',
		label: 'Scope',
		render: (row: Parameter) => row.scope,
	},
	{
		key: 'projectId',
		label: 'Project ID',
		render: (row: Parameter) => row.projectId || '-',
	},
	{
		key: 'environmentId',
		label: 'Environment ID',
		render: (row: Parameter) => row.environmentId || '-',
	},
	{
		key: 'isActive',
		label: 'Status',
		render: (row: Parameter) => (row.isActive ? 'Active' : 'Inactive'),
	},
];

/**
 * Table definition for Integrations (GET /api/integrations)
 */
export const integrationColumns: Column<Integration>[] = [
	{
		key: 'type',
		label: 'Type',
		render: (row: Integration) => row.type,
	},
	{
		key: 'projectId',
		label: 'Project ID',
		render: (row: Integration) => row.projectId,
	},
	{
		key: 'isActive',
		label: 'Status',
		render: (row: Integration) => (row.isActive ? 'Active' : 'Inactive'),
	},
	{
		key: 'createdAt',
		label: 'Created',
		render: (row: Integration) => {
			if (!row.createdAt) return '-';
			const date = new Date(row.createdAt);
			return date.toLocaleDateString();
		},
	},
];
