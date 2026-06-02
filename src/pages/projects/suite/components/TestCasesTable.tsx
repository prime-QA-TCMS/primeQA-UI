import React, { useState, useEffect, useMemo } from 'react';
import { Box, IconButton, Typography, Stack, Button, Chip, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Edit as EditIcon, Archive as ArchiveIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { DataTable, Popup, Form as GenericForm, PopUpForm, DataLoading, useToast } from 'fog-ui';
import type { Column } from 'fog-ui';
import {
	useCreateTestcase,
	useUpdateTestcase,
	useDeleteTestcase,
} from '../../../../hooks/useTestCases';
import { TestCase } from '../../../../types';
import { TestcaseAPI } from '../../../../api';
import { testCaseFormFields, updateTestCaseFormFields } from '../../../../Forms/TestCaseManagement';
import { useService } from 'fog-ui';

interface TestCasesTableProps {
	projectId: string;
	suiteId: string;
	sectionId: string;
	sectionName: string;
}

const TestCasesTable: React.FC<TestCasesTableProps> = ({ projectId, suiteId, sectionId, sectionName }) => {
	const toast = useToast();
	const testcaseService = useService('testcase');
	const testcaseAPI = useMemo(() => TestcaseAPI(testcaseService), [testcaseService]);

	const [testcases, setTestcases] = useState<TestCase[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Filters
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [priorityFilter, setPriorityFilter] = useState<string>('all');
	const [typeFilter, setTypeFilter] = useState<string>('all');

	// Modals
	const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
	const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
	const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
	const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
	const [testcaseToArchive, setTestcaseToArchive] = useState<TestCase | null>(null);

	const { createTestcase } = useCreateTestcase();
	const { updateTestcase } = useUpdateTestcase();
	const { deleteTestcase } = useDeleteTestcase();

	// ─── Fetch Test Cases ───────────────────────────────────────────────────
	const fetchTestCases = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await testcaseAPI.testcaseGetAll(sectionId);
			if (Array.isArray(data)) {
				setTestcases(data.filter((tc: TestCase) => tc.isActive !== false));
			}
		} catch (err: any) {
			console.error(`Failed to fetch test cases for section ${sectionId}:`, err);
			setError(err.message || 'Failed to load test cases');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTestCases();
	}, [sectionId]);

	// ─── Handlers ───────────────────────────────────────────────────────────
	const handleCreateTestCase = async (formData: any) => {
		try {
			const enrichedData = {
				...formData,
				projectId,
				suiteId,
				sectionId,
			};
			const response = await createTestcase(enrichedData);
			if (response) {
				toast.success('Test case created successfully');
				await fetchTestCases();
			}
			return response;
		} catch (err: any) {
			toast.error(err.message || 'Failed to create test case');
			throw err;
		}
	};

	const handleView = (testcase: TestCase) => {
		setSelectedTestCase(testcase);
		setIsViewPopupOpen(true);
	};

	const handleEdit = (testcase: TestCase) => {
		setSelectedTestCase(testcase);
		setIsEditPopupOpen(true);
	};

	const handleUpdate = async (formData: any) => {
		if (!selectedTestCase) return;
		try {
			const enrichedData = {
				...formData,
				projectId,
				suiteId,
				sectionId,
			};
			await updateTestcase(selectedTestCase._id, enrichedData);
			toast.success('Test case updated successfully');
			setIsEditPopupOpen(false);
			setSelectedTestCase(null);
			await fetchTestCases();
		} catch (err: any) {
			toast.error(err.message || 'Failed to update test case');
		}
	};

	const handleArchiveClick = (testcase: TestCase) => {
		setTestcaseToArchive(testcase);
		setIsArchiveDialogOpen(true);
	};

	const handleArchiveConfirm = async () => {
		if (!testcaseToArchive) return;
		try {
			await deleteTestcase(testcaseToArchive._id);
			toast.success(`Test case "${testcaseToArchive.title}" archived successfully`);
			setIsArchiveDialogOpen(false);
			setTestcaseToArchive(null);
			await fetchTestCases();
		} catch (err: any) {
			toast.error(err.message || 'Failed to archive test case');
		}
	};

	// ─── Filters ────────────────────────────────────────────────────────────
	const filteredTestcases = useMemo(() => {
		return testcases.filter((tc) => {
			if (statusFilter !== 'all' && tc.status !== statusFilter) return false;
			if (priorityFilter !== 'all' && tc.priority !== priorityFilter) return false;
			if (typeFilter !== 'all' && tc.type !== typeFilter) return false;
			return true;
		});
	}, [testcases, statusFilter, priorityFilter, typeFilter]);

	// ─── Columns ────────────────────────────────────────────────────────────
	const testCaseColumns: Column<TestCase>[] = [
		{
			key: 'title',
			label: 'Title',
			render: (tc: TestCase) => (
				<Typography variant="body2" sx={{ fontWeight: 500 }}>
					{tc.title}
				</Typography>
			)
		},
		{
			key: 'priority',
			label: 'Priority',
			align: 'center',
			render: (tc: TestCase) => (
				<Chip
					label={tc.priority || 'Medium'}
					size="small"
					color={
						tc.priority === 'Critical' ? 'error' :
							tc.priority === 'High' ? 'warning' :
								tc.priority === 'Low' ? 'default' : 'primary'
					}
				/>
			),
		},
		{
			key: 'type',
			label: 'Type',
			align: 'center',
			render: (tc: TestCase) => (
				<Chip label={tc.type || 'Functional'} size="small" variant="outlined" />
			),
		},
		{
			key: 'status',
			label: 'Status',
			align: 'center',
			render: (tc: TestCase) => (
				<Chip
					label={tc.status || 'Draft'}
					size="small"
					color={
						tc.status === 'Ready' ? 'success' :
							tc.status === 'Deprecated' ? 'default' : 'warning'
					}
					variant="outlined"
				/>
			),
		},
		{
			key: 'updatedAt',
			label: 'Updated',
			render: (tc: TestCase) => (
				<Typography variant="body2" color="textSecondary">
					{tc.updatedAt ? new Date(tc.updatedAt).toLocaleDateString() : 'N/A'}
				</Typography>
			),
		},
	];

	// ─── Render ─────────────────────────────────────────────────────────────
	if (loading) return <DataLoading columns={testCaseColumns} />;
	if (error) return <Typography color="error">Error: {error}</Typography>;

	return (
		<Box>
			<Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
				<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
					Test Cases for {sectionName}
				</Typography>

				<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
					{/* Filters */}
					<FormControl size="small" sx={{ minWidth: 120 }}>
						<InputLabel>Status</InputLabel>
						<Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
							<MenuItem value="all">All</MenuItem>
							<MenuItem value="Draft">Draft</MenuItem>
							<MenuItem value="Ready">Ready</MenuItem>
							<MenuItem value="Deprecated">Deprecated</MenuItem>
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ minWidth: 120 }}>
						<InputLabel>Priority</InputLabel>
						<Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} label="Priority">
							<MenuItem value="all">All</MenuItem>
							<MenuItem value="Low">Low</MenuItem>
							<MenuItem value="Medium">Medium</MenuItem>
							<MenuItem value="High">High</MenuItem>
							<MenuItem value="Critical">Critical</MenuItem>
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ minWidth: 120 }}>
						<InputLabel>Type</InputLabel>
						<Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} label="Type">
							<MenuItem value="all">All</MenuItem>
							<MenuItem value="Functional">Functional</MenuItem>
							<MenuItem value="Regression">Regression</MenuItem>
							<MenuItem value="Performance">Performance</MenuItem>
							<MenuItem value="Security">Security</MenuItem>
							<MenuItem value="Other">Other</MenuItem>
						</Select>
					</FormControl>

					<PopUpForm
						suitesFormFields={testCaseFormFields}
						onSubmit={handleCreateTestCase}
						submitText="Create Test Case"
						buttonText="Add Test Case"
						title="Create New Test Case"
					/>
				</Box>
			</Box>

			{filteredTestcases.length > 0 ? (
				<DataTable
					title=""
					data={filteredTestcases}
					columns={testCaseColumns}
					rowComponent={(testcase: TestCase) => (
						<Box sx={{ display: 'flex', gap: 1 }}>
							<IconButton
								size="small"
								color="default"
								onClick={() => handleView(testcase)}
								title="View Test Case"
							>
								<ViewIcon fontSize="small" />
							</IconButton>
							<IconButton
								size="small"
								color="primary"
								onClick={() => handleEdit(testcase)}
								title="Edit Test Case"
							>
								<EditIcon fontSize="small" />
							</IconButton>
							<IconButton
								size="small"
								color="warning"
								onClick={() => handleArchiveClick(testcase)}
								title="Archive Test Case"
							>
								<ArchiveIcon fontSize="small" />
							</IconButton>
						</Box>
					)}
				/>
			) : (
				<Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
					No test cases found. {testcases.length > 0 ? 'Try adjusting your filters.' : 'Create your first test case to get started.'}
				</Typography>
			)}

			{/* View Test Case Popup (Read-only) */}
			<Popup
				title="View Test Case"
				open={isViewPopupOpen}
				onClose={() => {
					setIsViewPopupOpen(false);
					setSelectedTestCase(null);
				}}
				component={
					selectedTestCase ? (
						<Box sx={{ p: 2 }}>
							<Typography variant="h6" gutterBottom>{selectedTestCase.title}</Typography>

							<Box sx={{ mb: 2 }}>
								<Typography variant="subtitle2" color="textSecondary">Priority:</Typography>
								<Chip label={selectedTestCase.priority || 'Medium'} size="small" />
							</Box>

							<Box sx={{ mb: 2 }}>
								<Typography variant="subtitle2" color="textSecondary">Type:</Typography>
								<Chip label={selectedTestCase.type || 'Functional'} size="small" />
							</Box>

							<Box sx={{ mb: 2 }}>
								<Typography variant="subtitle2" color="textSecondary">Status:</Typography>
								<Chip label={selectedTestCase.status || 'Draft'} size="small" />
							</Box>

							{selectedTestCase.preconditions && (
								<Box sx={{ mb: 2 }}>
									<Typography variant="subtitle2" color="textSecondary">Preconditions:</Typography>
									<Typography variant="body2">{selectedTestCase.preconditions}</Typography>
								</Box>
							)}

							{selectedTestCase.steps && (
								<Box sx={{ mb: 2 }}>
									<Typography variant="subtitle2" color="textSecondary">Steps:</Typography>
									<Typography variant="body2">{selectedTestCase.steps}</Typography>
								</Box>
							)}

							{selectedTestCase.expectedResult && (
								<Box sx={{ mb: 2 }}>
									<Typography variant="subtitle2" color="textSecondary">Expected Result:</Typography>
									<Typography variant="body2">{selectedTestCase.expectedResult}</Typography>
								</Box>
							)}

							<Button variant="outlined" onClick={() => setIsViewPopupOpen(false)} fullWidth>
								Close
							</Button>
						</Box>
					) : null
				}
			/>

			{/* Edit Test Case Popup */}
			<Popup
				title="Edit Test Case"
				open={isEditPopupOpen}
				onClose={() => {
					setIsEditPopupOpen(false);
					setSelectedTestCase(null);
				}}
				component={
					selectedTestCase ? (
						<GenericForm
							fields={updateTestCaseFormFields}
							onSubmit={handleUpdate}
							submitButtonText="Update Test Case"
							onCancel={() => {
								setIsEditPopupOpen(false);
								setSelectedTestCase(null);
							}}
							initialValues={selectedTestCase}
						/>
					) : null
				}
			/>

			{/* Archive Confirmation Popup */}
			<Popup
				open={isArchiveDialogOpen}
				onClose={() => {
					setIsArchiveDialogOpen(false);
					setTestcaseToArchive(null);
				}}
				title="Archive Test Case"
				component={
					<Box sx={{ p: 2 }}>
						<Typography variant="body1" gutterBottom>
							Are you sure you want to archive "{testcaseToArchive?.title}"? This will mark the test case as inactive.
						</Typography>
						<Stack direction="row" spacing={2} sx={{ mt: 3 }}>
							<Button
								variant="contained"
								color="warning"
								onClick={handleArchiveConfirm}
								fullWidth
							>
								Yes, Archive
							</Button>
							<Button
								variant="outlined"
								onClick={() => {
									setIsArchiveDialogOpen(false);
									setTestcaseToArchive(null);
								}}
								fullWidth
							>
								Cancel
							</Button>
						</Stack>
					</Box>
				}
			/>
		</Box>
	);
};

export default TestCasesTable;
