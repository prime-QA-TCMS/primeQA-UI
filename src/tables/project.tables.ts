import type { Column } from 'fog-ui';
import { Project, Milestone, ProjectConfiguration } from '../types';

/**
 * Table definition for Projects (GET /)
 */
export const projectColumns: Column<Project>[] = [
	{
		key: 'name',
		label: 'Name',
		render: (row: Project) => row.name,
	},
	{
		key: 'key',
		label: 'Key',
		render: (row: Project) => row.key,
	},
	{
		key: 'description',
		label: 'Description',
		render: (row: Project) => row.description || '-',
	},
	{
		key: 'owner',
		label: 'Owner',
		render: (row: Project) => row.owner,
	},
	{
		key: 'visibility',
		label: 'Visibility',
		render: (row: Project) => row.visibility,
	},
	{
		key: 'isActive',
		label: 'Status',
		render: (row: Project) => (row.isActive ? 'Active' : 'Inactive'),
	},
	{
		key: 'createdAt',
		label: 'Created',
		render: (row: Project) => {
			if (!row.createdAt) return '-';
			const date = new Date(row.createdAt);
			return date.toLocaleDateString();
		},
	},
];

/**
 * Table definition for Milestones (GET /:projectId/milestones)
 */
export const milestoneColumns: Column<Milestone>[] = [
	{
		key: 'title',
		label: 'Title',
		render: (row: Milestone) => row.title,
	},
	{
		key: 'description',
		label: 'Description',
		render: (row: Milestone) => row.description || '-',
	},
	{
		key: 'startDate',
		label: 'Start Date',
		render: (row: Milestone) => {
			if (!row.startDate) return '-';
			const date = new Date(row.startDate);
			return date.toLocaleDateString();
		},
	},
	{
		key: 'dueDate',
		label: 'Due Date',
		render: (row: Milestone) => {
			if (!row.dueDate) return '-';
			const date = new Date(row.dueDate);
			return date.toLocaleDateString();
		},
	},
	{
		key: 'isCompleted',
		label: 'Status',
		render: (row: Milestone) => (row.isCompleted ? 'Completed' : 'In Progress'),
	},
];

/**
 * Table definition for Project Configuration (GET /:projectId/configuration)
 */
export const projectConfigurationColumns: Column<ProjectConfiguration>[] = [
	{
		key: 'name',
		label: 'Name',
		render: (row: ProjectConfiguration) => row.name,
	},
	{
		key: 'description',
		label: 'Description',
		render: (row: ProjectConfiguration) => row.description || '-',
	},
	{
		key: 'baseUrl',
		label: 'Base URL',
		render: (row: ProjectConfiguration) => row.baseUrl || '-',
	},
	{
		key: 'isActive',
		label: 'Status',
		render: (row: ProjectConfiguration) => (row.isActive ? 'Active' : 'Inactive'),
	},
	{
		key: 'createdAt',
		label: 'Created',
		render: (row: ProjectConfiguration) => {
			if (!row.createdAt) return '-';
			const date = new Date(row.createdAt);
			return date.toLocaleDateString();
		},
	},
];
