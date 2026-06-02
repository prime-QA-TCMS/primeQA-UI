import type { Column } from 'fog-ui';
import { TestRun, Test, TestResult } from '../types';

/**
 * Table definition for Test Runs (GET /runs/:projectId)
 */
export const testRunColumns: Column<TestRun>[] = [
	{
		key: 'name',
		label: 'Name',
		render: (row: TestRun) => row.name,
	},
	{
		key: 'description',
		label: 'Description',
		render: (row: TestRun) => row.description || '-',
	},
	{
		key: 'type',
		label: 'Type',
		render: (row: TestRun) => row.type,
	},
	{
		key: 'status',
		label: 'Status',
		render: (row: TestRun) => row.status,
	},
	{
		key: 'environment',
		label: 'Environment',
		render: (row: TestRun) => row.environment || '-',
	},
	{
		key: 'executedBy',
		label: 'Executed By',
		render: (row: TestRun) => row.executedBy || '-',
	},
	{
		key: 'startTime',
		label: 'Start Time',
		render: (row: TestRun) => {
			if (!row.startTime) return '-';
			const date = new Date(row.startTime);
			return date.toLocaleString();
		},
	},
	{
		key: 'endTime',
		label: 'End Time',
		render: (row: TestRun) => {
			if (!row.endTime) return '-';
			const date = new Date(row.endTime);
			return date.toLocaleString();
		},
	},
	{
		key: 'duration',
		label: 'Duration (ms)',
		render: (row: TestRun) => (row.duration !== undefined ? String(row.duration) : '-'),
	},
];

/**
 * Table definition for Tests (GET /tests/run/:runId)
 */
export const testColumns: Column<Test>[] = [
	{
		key: 'title',
		label: 'Title',
		render: (row: Test) => row.title,
	},
	{
		key: 'status',
		label: 'Status',
		render: (row: Test) => row.status,
	},
	{
		key: 'testCaseId',
		label: 'Test Case ID',
		render: (row: Test) => row.testCaseId || '-',
	},
	{
		key: 'suiteId',
		label: 'Suite ID',
		render: (row: Test) => row.suiteId || '-',
	},
	{
		key: 'sectionId',
		label: 'Section ID',
		render: (row: Test) => row.sectionId || '-',
	},
	{
		key: 'isActive',
		label: 'Active',
		render: (row: Test) => (row.isActive ? 'Yes' : 'No'),
	},
];

/**
 * Table definition for Test Results (GET /results/test/:testId or GET /results/run/:runId)
 */
export const testResultColumns: Column<TestResult>[] = [
	{
		key: 'status',
		label: 'Status',
		render: (row: TestResult) => row.status,
	},
	{
		key: 'executedBy',
		label: 'Executed By',
		render: (row: TestResult) => row.executedBy || '-',
	},
	{
		key: 'startTime',
		label: 'Start Time',
		render: (row: TestResult) => {
			if (!row.startTime) return '-';
			const date = new Date(row.startTime);
			return date.toLocaleString();
		},
	},
	{
		key: 'endTime',
		label: 'End Time',
		render: (row: TestResult) => {
			if (!row.endTime) return '-';
			const date = new Date(row.endTime);
			return date.toLocaleString();
		},
	},
	{
		key: 'duration',
		label: 'Duration (ms)',
		render: (row: TestResult) => (row.duration !== undefined ? String(row.duration) : '-'),
	},
	{
		key: 'logs',
		label: 'Logs',
		render: (row: TestResult) => (row.logs ? row.logs.substring(0, 50) + '...' : '-'),
	},
	{
		key: 'isActive',
		label: 'Active',
		render: (row: TestResult) => (row.isActive ? 'Yes' : 'No'),
	},
];
