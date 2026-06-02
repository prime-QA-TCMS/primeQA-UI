import React, { useEffect, useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Typography,
	Paper,
	Stack,
	Chip,
	CircularProgress,
	Alert,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Info as InfoIcon } from '@mui/icons-material';
import { ResultsAPI } from '../../../../api';
import { useService, useToast } from 'fog-ui';
import { TestResult } from '../../../../types';

interface TestResultsHistoryProps {
	testId: string;
	projectId: string;
	onEdit?: (result: TestResult) => void;
	onDelete?: (result: TestResult) => void;
}

const TestResultsHistory: React.FC<TestResultsHistoryProps> = ({
	testId,
	projectId,
	onEdit,
	onDelete,
}) => {
	const toast = useToast();
	const resultsService = useService('results');
	const resultsAPI = ResultsAPI(resultsService);

	const [results, setResults] = useState<TestResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

	// ─── Fetch Results ──────────────────────────────────────────────────────
	useEffect(() => {
		const fetchResults = async () => {
			if (!testId) return;

			try {
				setLoading(true);
				setError(null);
				const response = await resultsAPI.resultGetByTestId(testId);
				const resultsData = Array.isArray(response?.data) ? response.data : [];

				// Sort by createdAt newest first
				const sorted = [...resultsData].sort(
					(a, b) =>
						new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
				);

				setResults(sorted);
			} catch (err: any) {
				console.error('Error fetching results:', err);
				setError(err.message || 'Failed to load results');
			} finally {
				setLoading(false);
			}
		};

		fetchResults();
	}, [testId]);

	// ─── Handle Details View ────────────────────────────────────────────────
	const handleViewDetails = (result: TestResult) => {
		setSelectedResult(result);
		setDetailsOpen(true);
	};

	// ─── Handle Edit ────────────────────────────────────────────────────────
	const handleEdit = (result: TestResult) => {
		if (onEdit) {
			onEdit(result);
		} else {
			toast.info('Edit not configured');
		}
	};

	// ─── Handle Delete ──────────────────────────────────────────────────────
	const handleDeleteClick = (result: TestResult) => {
		setSelectedResult(result);
		setDeleteConfirmOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!selectedResult) return;

		try {
			await resultsAPI.resultDelete(selectedResult._id);
			setResults((prev) => prev.filter((r) => r._id !== selectedResult._id));
			toast.success('Result deleted successfully');
			setDeleteConfirmOpen(false);

			if (onDelete) {
				onDelete(selectedResult);
			}
		} catch (err: any) {
			toast.error(err.message || 'Failed to delete result');
		}
	};

	// ─── Get Status Color ───────────────────────────────────────────────────
	const getStatusColor = (status: TestResult['status']) => {
		switch (status) {
			case 'Passed':
				return 'success';
			case 'Failed':
				return 'error';
			case 'Blocked':
			case 'Retest':
				return 'warning';
			case 'Skipped':
				return 'info';
			default:
				return 'default';
		}
	};

	// ─── Render ─────────────────────────────────────────────────────────────
	if (loading) {
		return (
			<Card>
				<CardContent sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
					<CircularProgress size={40} />
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card>
				<CardContent>
					<Alert severity="error">{error}</Alert>
				</CardContent>
			</Card>
		);
	}

	if (results.length === 0) {
		return (
			<Card>
				<CardContent>
					<Typography color="textSecondary" sx={{ textAlign: 'center' }}>
						No results recorded yet for this test.
					</Typography>
				</CardContent>
			</Card>
		);
	}

	return (
		<>
			<Card>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Result History
					</Typography>
					<Typography variant="body2" color="textSecondary" gutterBottom>
						{results.length} execution{results.length !== 1 ? 's' : ''} recorded (newest first)
					</Typography>

					<TableContainer sx={{ mt: 2 }}>
						<Table size="small">
							<TableHead>
								<TableRow sx={{ backgroundColor: '#f5f5f5' }}>
									<TableCell>Status</TableCell>
									<TableCell>Executed At</TableCell>
									<TableCell>Duration</TableCell>
									<TableCell>Logs (Preview)</TableCell>
									<TableCell align="right">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{results.map((result, index) => (
									<TableRow key={result._id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
										<TableCell>
											<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
												<Chip
													label={result.status}
													size="small"
													color={getStatusColor(result.status)}
													variant="outlined"
												/>
												{index === 0 && (
													<Chip label="Latest" size="small" variant="outlined" />
												)}
											</Box>
										</TableCell>
										<TableCell>
											<Typography variant="body2">
												{result.createdAt
													? new Date(result.createdAt).toLocaleString()
													: result.executedAt
														? new Date(result.executedAt).toLocaleString()
														: '—'}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography variant="body2">
												{result.duration ? `${result.duration}s` : '—'}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography
												variant="body2"
												color="textSecondary"
												sx={{
													maxWidth: 200,
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													whiteSpace: 'nowrap',
												}}
											>
												{result.logs || '—'}
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
												<IconButton
													size="small"
													onClick={() => handleViewDetails(result)}
													title="View Details"
												>
													<InfoIcon fontSize="small" />
												</IconButton>
												<IconButton
													size="small"
													onClick={() => handleEdit(result)}
													title="Edit"
												>
													<EditIcon fontSize="small" />
												</IconButton>
												<IconButton
													size="small"
													color="error"
													onClick={() => handleDeleteClick(result)}
													title="Delete"
												>
													<DeleteIcon fontSize="small" />
												</IconButton>
											</Box>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>

			{/* Details Dialog */}
			<Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="sm" fullWidth>
				<DialogTitle>Result Details</DialogTitle>
				<DialogContent sx={{ pt: 2 }}>
					{selectedResult && (
						<Stack spacing={2}>
							<Box>
								<Typography variant="subtitle2" color="textSecondary">
									Status
								</Typography>
								<Chip
									label={selectedResult.status}
									color={getStatusColor(selectedResult.status)}
									sx={{ mt: 1 }}
								/>
							</Box>

							<Box>
								<Typography variant="subtitle2" color="textSecondary">
									Execution Time
								</Typography>
								<Typography variant="body2">
									{selectedResult.createdAt
										? new Date(selectedResult.createdAt).toLocaleString()
										: selectedResult.executedAt
											? new Date(selectedResult.executedAt).toLocaleString()
											: '—'}
								</Typography>
							</Box>

							<Box>
								<Typography variant="subtitle2" color="textSecondary">
									Duration
								</Typography>
								<Typography variant="body2">
									{selectedResult.duration ? `${selectedResult.duration}s` : '—'}
								</Typography>
							</Box>

							{selectedResult.startTime && (
								<Box>
									<Typography variant="subtitle2" color="textSecondary">
										Start Time
									</Typography>
									<Typography variant="body2">
										{new Date(selectedResult.startTime).toLocaleString()}
									</Typography>
								</Box>
							)}

							{selectedResult.endTime && (
								<Box>
									<Typography variant="subtitle2" color="textSecondary">
										End Time
									</Typography>
									<Typography variant="body2">
										{new Date(selectedResult.endTime).toLocaleString()}
									</Typography>
								</Box>
							)}

							{selectedResult.logs && (
								<Box>
									<Typography variant="subtitle2" color="textSecondary">
										Logs
									</Typography>
									<Paper
										variant="outlined"
										sx={{ p: 1.5, backgroundColor: '#f5f5f5', mt: 1, maxHeight: 200, overflow: 'auto' }}
									>
										<Typography
											variant="body2"
											component="pre"
											sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
										>
											{selectedResult.logs}
										</Typography>
									</Paper>
								</Box>
							)}

							{selectedResult.screenshotUrl && (
								<Box>
									<Typography variant="subtitle2" color="textSecondary">
										Screenshot
									</Typography>
									<Box
										component="img"
										src={selectedResult.screenshotUrl}
										sx={{ maxWidth: '100%', maxHeight: 300, mt: 1, borderRadius: 1 }}
									/>
								</Box>
							)}
						</Stack>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDetailsOpen(false)}>Close</Button>
				</DialogActions>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
				<DialogTitle>Delete Result</DialogTitle>
				<DialogContent>
					<Typography>Are you sure you want to delete this result?</Typography>
					{selectedResult && (
						<Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
							Status: {selectedResult.status} •{' '}
							{selectedResult.createdAt
								? new Date(selectedResult.createdAt).toLocaleString()
								: '—'}
						</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
					<Button onClick={handleDeleteConfirm} color="error" variant="contained">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default TestResultsHistory;
