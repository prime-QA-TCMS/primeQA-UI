import type { Column } from 'fog-ui';
import { User, Role, Tenant } from '../types';

/**
 * Table definition for Users (GET /users)
 */
export const userColumns: Column<User>[] = [
	{
		key: 'email',
		label: 'Email',
		render: (row: User) => row.email,
	},
	{
		key: 'firstName',
		label: 'First Name',
		render: (row: User) => row.firstName || '-',
	},
	{
		key: 'lastName',
		label: 'Last Name',
		render: (row: User) => row.lastName || '-',
	},
	{
		key: 'role',
		label: 'Role ID',
		render: (row: User) => row.role || '-',
	},
	{
		key: 'tenant',
		label: 'Tenant ID',
		render: (row: User) => row.tenant || '-',
	},
	{
		key: 'isActive',
		label: 'Status',
		render: (row: User) => (row.isActive ? 'Active' : 'Inactive'),
	},
	{
		key: 'lastLogin',
		label: 'Last Login',
		render: (row: User) => {
			if (!row.lastLogin) return 'Never';
			const date = new Date(row.lastLogin);
			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			return `${day}/${month}/${year} ${hours}:${minutes}`;
		},
	},
	{
		key: 'createdAt',
		label: 'Created',
		render: (row: User) => {
			if (!row.createdAt) return '-';
			const date = new Date(row.createdAt);
			return date.toLocaleDateString();
		},
	},
];

/**
 * Table definition for Roles (GET /roles)
 */
export const roleColumns: Column<Role>[] = [
	{
		key: 'name',
		label: 'Name',
		render: (row: Role) => row.name,
	},
	{
		key: 'description',
		label: 'Description',
		render: (row: Role) => row.description || '-',
	},
	{
		key: 'permissions',
		label: 'Permissions',
		render: (row: Role) => {
			if (!row.permissions || row.permissions.length === 0) return '-';
			return row.permissions.slice(0, 3).join(', ') + (row.permissions.length > 3 ? '...' : '');
		},
	},
	{
		key: 'tenant',
		label: 'Tenant ID',
		render: (row: Role) => row.tenant || '-',
	},
	{
		key: 'isDeleted',
		label: 'Status',
		render: (row: Role) => (row.isDeleted ? 'Deleted' : 'Active'),
	},
	{
		key: 'createdAt',
		label: 'Created',
		render: (row: Role) => {
			if (!row.createdAt) return '-';
			const date = new Date(row.createdAt);
			return date.toLocaleDateString();
		},
	},
];

/**
 * Table definition for Tenants (GET /tenants)
 */
export const tenantColumns: Column<Tenant>[] = [
	{
		key: 'name',
		label: 'Name',
		render: (row: Tenant) => row.name,
	},
	{
		key: 'domain',
		label: 'Domain',
		render: (row: Tenant) => row.domain || '-',
	},
	{
		key: 'isActive',
		label: 'Active',
		render: (row: Tenant) => (row.isActive ? 'Yes' : 'No'),
	},
	{
		key: 'isDeleted',
		label: 'Status',
		render: (row: Tenant) => (row.isDeleted ? 'Deleted' : 'Active'),
	},
	{
		key: 'createdAt',
		label: 'Created',
		render: (row: Tenant) => {
			if (!row.createdAt) return '-';
			const date = new Date(row.createdAt);
			return date.toLocaleDateString();
		},
	},
];
