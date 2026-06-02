import type { Column } from 'fog-ui';
import { Suite, Section, TestCase } from '../types';

/**
 * Table definition for Suites (GET /suites)
 */
export const suiteColumns: Column<Suite>[] = [
	{
		key: 'name',
		label: 'Name',
		render: (row: Suite) => row.name,
	},
	{
		key: 'key',
		label: 'Key',
		render: (row: Suite) => row.key,
	},
	{
		key: 'description',
		label: 'Description',
		render: (row: Suite) => row.description || '-',
	},
	{
		key: 'projectId',
		label: 'Project ID',
		render: (row: Suite) => row.projectId,
	},
	{
		key: 'isActive',
		label: 'Status',
		render: (row: Suite) => (row.isActive ? 'Active' : 'Inactive'),
	},
	{
		key: 'createdAt',
		label: 'Created',
		render: (row: Suite) => {
			if (!row.createdAt) return '-';
			const date = new Date(row.createdAt);
			return date.toLocaleDateString();
		},
	},
];

/**
 * Table definition for Sections (GET /sections/suite/:suiteId)
 */
export const sectionColumns: Column<Section>[] = [
	{
		key: 'name',
		label: 'Name',
		render: (row: Section) => row.name,
	},
	{
		key: 'key',
		label: 'Key',
		render: (row: Section) => row.key,
	},
	{
		key: 'description',
		label: 'Description',
		render: (row: Section) => row.description || '-',
	},
	{
		key: 'suiteId',
		label: 'Suite ID',
		render: (row: Section) => row.suiteId,
	},
	{
		key: 'projectId',
		label: 'Project ID',
		render: (row: Section) => row.projectId,
	},
	{
		key: 'isActive',
		label: 'Status',
		render: (row: Section) => (row.isActive ? 'Active' : 'Inactive'),
	},
];

/**
 * Table definition for Test Cases (GET /testcases/section/:sectionId)
 */
export const testCaseColumns: Column<TestCase>[] = [
	{
		key: 'title',
		label: 'Title',
		render: (row: TestCase) => row.title,
	},
	{
		key: 'priority',
		label: 'Priority',
		render: (row: TestCase) => row.priority,
	},
	{
		key: 'type',
		label: 'Type',
		render: (row: TestCase) => row.type,
	},
	{
		key: 'status',
		label: 'Status',
		render: (row: TestCase) => row.status,
	},
	{
		key: 'preconditions',
		label: 'Preconditions',
		render: (row: TestCase) => row.preconditions || '-',
	},
	{
		key: 'expectedResult',
		label: 'Expected Result',
		render: (row: TestCase) => row.expectedResult || '-',
	},
	{
		key: 'isActive',
		label: 'Active',
		render: (row: TestCase) => (row.isActive ? 'Yes' : 'No'),
	},
];
