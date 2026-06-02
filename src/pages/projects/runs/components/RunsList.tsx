import React, { useState, useEffect, useMemo } from 'react';
import { Box, IconButton, Typography, Stack, Button, Chip } from '@mui/material';
import { Edit as EditIcon, Archive as ArchiveIcon, PlayArrow as StartIcon, Stop as StopIcon, CheckCircle as CompleteIcon, Add as AddIcon } from '@mui/icons-material';
import { DataTable, Popup, Form as GenericForm, PopUpForm, DataLoading, useToast, useService } from 'fog-ui';
import type { Column } from 'fog-ui';
import { ResultsAPI } from '../../../../api/results.api';
import { TestRun } from '../../../../types';
import { createRunFormFields, updateRunFormFields } from '../../../../Forms/ResultsManagement';
import { useNavigate } from 'react-router-dom';
import SuiteSelector from './SuiteSelector';

interface RunsListProps {
	projectId: string;
}

const RunsList: React.FC<RunsListProps> = ({ projectId }) => {
	const toast = useToast();
	const navigate = useNavigate();
	const resultsService = useService('results');
	const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);

	const [runs, setRuns] = useState<TestRun[]>([]);
	const [loading, setLoading] = useState(true);
	const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
	const [selectedRun, setSelectedRun] = useState<TestRun | null>(null);
	const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
	const [runToArchive, setRunToArchive] = useState<TestRun | null>(null);
	const [isSuiteSelectorOpen, setIsSuiteSelectorOpen] = useState(false);

	useEffect(() => {
		const fetchRuns = async () => {
			setLoading(true);
			try {
				const response = await resultsAPI.runGetByProjectId(projectId);
				const runsData = response?.data?.data || [];
				setRuns(Array.isArray(runsData) ? runsData.filter((run: TestRun) => run.isActive !== false) : []);
			} catch (err: any) {
				console.error('Error fetching runs:', err);
				toast.error('Failed to load test runs');
				setRuns([]);
			} finally {
				setLoading(false);
			}
		};

		fetchRuns();
	}, [projectId]);

	const refetchRuns = async () => {
		setLoading(true);
		try {
			const response = await resultsAPI.runGetByProjectId(projectId);
			const runsData = response?.data?.data || [];
			setRuns(Array.isArray(runsData) ? runsData.filter((run: TestRun) => run.isActive !== false) : []);
		} catch (err: any) {
			console.error('Error fetching runs:', err);
			toast.error('Failed to load test runs');
		} finally {
			setLoading(false);
		}
	};

	// ─── Handlers ───────────────────────────────────────────────────────────
	const handleCreateRun = async (formData: any) => {
		try {
			const enrichedData = {
				...formData,
				projectId,
				status: formData.status || 'Pending',
				type: formData.type || 'Manual',
			};
			await resultsAPI.runCreate(enrichedData);
			toast.success('Test run created successfully');
			refetchRuns();
		} catch (err: any) {
			toast.error(err.message || 'Failed to create test run');
			throw err;
		}
	};

	const handleEdit = (run: TestRun) => {
		setSelectedRun(run);
		setIsEditPopupOpen(true);
	};

	const handleUpdate = async (formData: any) => {
		if (!selectedRun) return;
		try {
			await resultsAPI.runUpdate(selectedRun._id, formData);
			toast.success('Test run updated successfully');
			setIsEditPopupOpen(false);
			setSelectedRun(null);
			refetchRuns();
		} catch (err: any) {
			toast.error(err.message || 'Failed to update test run');
		}
	};

	const handleArchiveClick = (run: TestRun) => {
		setRunToArchive(run);
		setIsArchiveDialogOpen(true);
	};

	const handleArchiveConfirm = async () => {
		if (!runToArchive) return;
		try {
			await resultsAPI.runDelete(runToArchive._id);
			toast.success(`Test run "${runToArchive.name}" archived successfully`);
			setIsArchiveDialogOpen(false);
			setRunToArchive(null);
			refetchRuns();
		} catch (err: any) {
			toast.error(err.message || 'Failed to archive test run');
		}
	};

	const handleStartRun = async (run: TestRun) => {
		try {
			await resultsAPI.runUpdate(run._id, {
				status: 'Running',
				startTime: new Date().toISOString(),
			});
			toast.success(`Test run "${run.name}" started`);
			refetchRuns();
		} catch (err: any) {
			toast.error(err.message || 'Failed to start test run');
		}
	};

	const handleCompleteRun = async (run: TestRun) => {
		try {
			await resultsAPI.runUpdate(run._id, {
				status: 'Completed',
				endTime: new Date().toISOString(),
			});
			toast.success(`Test run "${run.name}" completed`);
			refetchRuns();
		} catch (err: any) {
			toast.error(err.message || 'Failed to complete test run');
		}
	};

	const handleAbortRun = async (run: TestRun) => {
		try {
			await resultsAPI.runUpdate(run._id, {
				status: 'Aborted',
				endTime: new Date().toISOString(),
			});
			toast.success(`Test run "${run.name}" aborted`);
			refetchRuns();
		} catch (err: any) {
			toast.error(err.message || 'Failed to abort test run');
		}
	};

	const handleViewRun = (run: TestRun) => {
		navigate(`/project/${projectId}/runs/${run._id}`);
	};


	// ─── Columns ────────────────────────────────────────────────────────────
	const runColumns: Column<TestRun>[] = [
		{
			key: 'name',
			label: 'Run Name',
			render: (run: TestRun) => (
				<Typography
					variant="body2"
					sx={{ fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
					onClick={() => handleViewRun(run)}
				>
					{run.name}
				</Typography>
			)
		},
		{
			key: 'type',
			label: 'Type',
			align: 'center',
			render: (run: TestRun) => (
				<Chip label={run.type || 'Manual'} size="small" variant="outlined" />
			),
		},
		{
			key: 'status',
			label: 'Status',
			align: 'center',
			render: (run: TestRun) => (
				<Chip
					label={run.status || 'Pending'}
					size="small"
					color={
						run.status === 'Completed' ? 'success' :
							run.status === 'Running' ? 'primary' :
								run.status === 'Aborted' ? 'error' : 'default'
					}
				/>
			),
		},
		{
			key: 'environment',
			label: 'Environment',
			render: (run: TestRun) => (
				<Typography variant="body2" color="textSecondary">
					{run.environment || 'N/A'}
				</Typography>
			),
		},
		{
			key: 'metrics',
			label: 'Results',
			align: 'center',
			render: (run: TestRun) => {
				const metrics = run.metrics;
				if (!metrics) return <Typography variant="body2">-</Typography>;
				return (
					<Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
						{metrics.passed !== undefined && <Chip label={`✓ ${metrics.passed}`} size="small" color="success" />}
						{metrics.failed !== undefined && <Chip label={`✗ ${metrics.failed}`} size="small" color="error" />}
						{metrics.blocked !== undefined && metrics.blocked > 0 && <Chip label={`⊘ ${metrics.blocked}`} size="small" color="warning" />}
					</Box>
				);
			},
		},
		{
			key: 'updatedAt',
			label: 'Updated',
			render: (run: TestRun) => (
				<Typography variant="body2" color="textSecondary">
					{run.updatedAt ? new Date(run.updatedAt).toLocaleDateString() : 'N/A'}
				</Typography>
			),
		},
	];

	// ─── Render ─────────────────────────────────────────────────────────────
	if (loading) return <DataLoading columns={runColumns} />;

	return (
		<Box>
			<Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography variant="h6">Test Runs</Typography>
				<Stack direction="row" spacing={2}>
					<Button
						variant="outlined"
						color="primary"
						startIcon={<AddIcon />}
						onClick={() => setIsSuiteSelectorOpen(true)}
					>
						Add Tests to Run
					</Button>
					<PopUpForm
						suitesFormFields={createRunFormFields(projectId)}
						onSubmit={handleCreateRun}
						submitText="Create Run"
						buttonText="Add Run"
						title="Create New Test Run"
					/>
				</Stack>
			</Box>

			{runs.length > 0 ? (
				<DataTable
					title=""
					data={runs}
					columns={runColumns}
					rowComponent={(run: TestRun) => (
						<Box sx={{ display: 'flex', gap: 1 }}>
							{run.status === 'Pending' && (
								<IconButton
									size="small"
									color="success"
									onClick={() => handleStartRun(run)}
									title="Start Run"
								>
									<StartIcon fontSize="small" />
								</IconButton>
							)}
							{run.status === 'Running' && (
								<>
									<IconButton
										size="small"
										color="success"
										onClick={() => handleCompleteRun(run)}
										title="Complete Run"
									>
										<CompleteIcon fontSize="small" />
									</IconButton>
									<IconButton
										size="small"
										color="error"
										onClick={() => handleAbortRun(run)}
										title="Abort Run"
									>
										<StopIcon fontSize="small" />
									</IconButton>
								</>
							)}
							<IconButton
								size="small"
								color="primary"
								onClick={() => handleEdit(run)}
								title="Edit Run"
							>
								<EditIcon fontSize="small" />
							</IconButton>
							{(run.status === 'Completed' || run.status === 'Aborted') && (
								<IconButton
									size="small"
									color="warning"
									onClick={() => handleArchiveClick(run)}
									title="Archive Run"
								>
									<ArchiveIcon fontSize="small" />
								</IconButton>
							)}
						</Box>
					)}
				/>
			) : (
				<Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
					No test runs found. Create your first test run to get started.
				</Typography>
			)}

			{/* Edit Run Popup */}
			<Popup
				title="Edit Test Run"
				open={isEditPopupOpen}
				onClose={() => {
					setIsEditPopupOpen(false);
					setSelectedRun(null);
				}}
				component={
					selectedRun ? (
						<GenericForm
							fields={updateRunFormFields(projectId)}
							onSubmit={handleUpdate}
							submitButtonText="Update Run"
							onCancel={() => {
								setIsEditPopupOpen(false);
								setSelectedRun(null);
							}}
							initialValues={selectedRun}
						/>
					) : null
				}
			/>

			{/* Archive Confirmation Popup */}
			<Popup
				open={isArchiveDialogOpen}
				onClose={() => {
					setIsArchiveDialogOpen(false);
					setRunToArchive(null);
				}}
				title="Archive Test Run"
				component={
					<Box sx={{ p: 2 }}>
						<Typography variant="body1" gutterBottom>
							Are you sure you want to archive "{runToArchive?.name}"? This will mark the test run as inactive.
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
									setRunToArchive(null);
								}}
								fullWidth
							>
								Cancel
							</Button>
						</Stack>
					</Box>
				}
			/>

			{/* Suite Selector Popup */}
			<Popup
				open={isSuiteSelectorOpen}
				onClose={() => setIsSuiteSelectorOpen(false)}
				title="Select Test Cases for Run"
				component={<SuiteSelector onComplete={() => { setIsSuiteSelectorOpen(false); refetchRuns(); }} />}
			/>
		</Box>
	);
};

export default RunsList;
