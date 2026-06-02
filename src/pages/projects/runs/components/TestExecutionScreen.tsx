import React, { useEffect, useState, useCallback } from 'react';
import {
	Box,
	Container,
	Typography,
	Paper,
	Card,
	CardContent,
	Button,
	Stack,
	CircularProgress,
	Alert,
	Chip,
	Divider,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { ResultsAPI, TestcaseAPI } from '../../../../api';
import { useService, useToast } from 'fog-ui';
import { Test, TestResult, TestCase } from '../../../../types';

interface TestExecutionScreenProps {
	onComplete?: () => void;
}

const TestExecutionScreen: React.FC<TestExecutionScreenProps> = ({ onComplete }) => {
	const navigate = useNavigate();
	const toast = useToast();
	const { testId, runId, projectId } = useParams<{
		testId: string;
		runId: string;
		projectId: string;
	}>();

	const resultsService = useService('results');
	const testcaseService = useService('testcase');
	const resultsAPI = ResultsAPI(resultsService);
	const testcaseAPI = TestcaseAPI(testcaseService);

	// ─── State Management ────────────────────────────────────────────────────
	const [test, setTest] = useState<Test | null>(null);
	const [testCase, setTestCase] = useState<TestCase | null>(null);
	const [results, setResults] = useState<TestResult[]>([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Form state for result submission
	const [resultStatus, setResultStatus] = useState<TestResult['status']>('Passed');
	const [resultLogs, setResultLogs] = useState('');
	const [startTime] = useState(new Date().toISOString());
	const [endTime, setEndTime] = useState(new Date().toISOString());

	// ─── Fetch Test Instance ────────────────────────────────────────────────
	useEffect(() => {
		const fetchTestData = async () => {
			if (!testId) {
				setError('Test ID is required');
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				setError(null);

				// Fetch test instance
				const testRes = await resultsAPI.testGetById(testId);
				const testData = Array.isArray(testRes?.data) ? testRes.data[0] : testRes?.data;

				if (!testData) {
					setError('Test not found');
					setLoading(false);
					return;
				}

				setTest(testData);

				// Fetch test case definition (for steps/expected results)
				if (testData.testCaseId) {
					try {
						const caseData = await testcaseAPI.testcaseGetById(testData.testCaseId);
						setTestCase(caseData);
					} catch (err) {
						console.warn('Failed to fetch test case definition:', err);
					}
				}

				// Fetch existing results for this test
				try {
					const resultsRes = await resultsAPI.resultGetByTestId(testData._id);
					setResults(Array.isArray(resultsRes?.data) ? resultsRes.data : []);
				} catch (err) {
					console.warn('Failed to fetch results:', err);
				}
			} catch (err: any) {
				setError(err.message || 'Failed to load test data');
				console.error('Error fetching test:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchTestData();
	}, [testId]);

	// ─── Handle Result Submission ────────────────────────────────────────────
	const handleSubmitResult = useCallback(async () => {
		if (!test || !projectId) {
			toast.error('Missing required data');
			return;
		}

		try {
			setSubmitting(true);

			// Create result
			const newResult: Partial<TestResult> = {
				testId: test._id,
				projectId,
				status: resultStatus,
				logs: resultLogs,
				startTime,
				endTime,
				executedBy: 'current-user-id', // TODO: Get from auth context
				duration: Math.round(
					(new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000
				),
			};

			const response = await resultsAPI.resultCreate(newResult);
			if (response?.data) {
				setResults((prev) => [response.data, ...prev]);
				toast.success('Result saved successfully');

				// Update test status to Completed
				try {
					await resultsAPI.testUpdate(test._id, { status: 'Completed' });
				} catch (err) {
					console.warn('Failed to update test status:', err);
				}

				// Clear form
				setResultLogs('');
				setResultStatus('Passed');
			}
		} catch (err: any) {
			toast.error(err.message || 'Failed to save result');
			console.error('Error saving result:', err);
		} finally {
			setSubmitting(false);
		}
	}, [test, projectId, resultStatus, resultLogs, startTime, endTime, toast]);

	// ─── Handle Retry ───────────────────────────────────────────────────────
	const handleRetry = useCallback(async () => {
		if (!test) return;

		try {
			// Set test back to In Progress for retry
			await resultsAPI.testUpdate(test._id, { status: 'In Progress' });

			// Reset form
			setResultLogs('');
			setResultStatus('Passed');
			toast.success('Test ready for retry');
		} catch (err: any) {
			toast.error(err.message || 'Failed to initiate retry');
		}
	}, [test, toast]);

	// ─── Render ─────────────────────────────────────────────────────────────
	if (!testId || !runId || !projectId) {
		return (
			<Box sx={{ p: 3 }}>
				<Alert severity="error">Missing required parameters</Alert>
			</Box>
		);
	}

	if (loading) {
		return (
			<Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Container>
		);
	}

	if (error || !test) {
		return (
			<Container maxWidth="lg" sx={{ mt: 4 }}>
				<Alert severity="error">{error || 'Test not found'}</Alert>
				<Button
					startIcon={<ArrowBackIcon />}
					onClick={() => navigate(`/project/${projectId}/runs/${runId}`)}
					sx={{ mt: 2 }}
				>
					Back to Run
				</Button>
			</Container>
		);
	}

	const latestResult = results.length > 0 ? results[0] : null;

	return (
		<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			{/* ── Header ──────────────────────────── */}
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
				<Button
					startIcon={<ArrowBackIcon />}
					onClick={() => navigate(`/project/${projectId}/runs/${runId}`)}
					variant="outlined"
				>
					Back to Run
				</Button>
				<Typography variant="h5">{test.title}</Typography>
				<Chip
					label={test.status}
					color={test.status === 'Completed' ? 'success' : 'default'}
				/>
			</Box>

			<Grid container spacing={3}>
				{/* ── LEFT: Test Case Details ──────── */}
				<Grid>
					{/* Test Case Info */}
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Test Case Definition
							</Typography>
							{testCase ? (
								<>
									<Box sx={{ mb: 2 }}>
										<Typography variant="body2" color="textSecondary">
											<strong>Title:</strong> {testCase.title}
										</Typography>
										<Typography variant="body2" color="textSecondary">
											<strong>Type:</strong> {testCase.type}
										</Typography>
										<Typography variant="body2" color="textSecondary">
											<strong>Priority:</strong> {testCase.priority}
										</Typography>
										<Typography variant="body2" color="textSecondary">
											<strong>Status:</strong> {testCase.status}
										</Typography>
									</Box>

									{testCase.preconditions && (
										<>
											<Divider sx={{ my: 2 }} />
											<Typography variant="subtitle2" gutterBottom>
												Preconditions
											</Typography>
											<Paper
												variant="outlined"
												sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}
											>
												<Typography variant="body2">{testCase.preconditions}</Typography>
											</Paper>
										</>
									)}

									{/* Test Steps */}
									<Divider sx={{ my: 2 }} />
									<Typography variant="subtitle2" gutterBottom>
										Test Steps
									</Typography>
									<Paper
										variant="outlined"
										sx={{ p: 2, mb: 2, backgroundColor: '#f9f9f9' }}
									>
										<Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
											{testCase.steps}
										</Typography>
									</Paper>

									{/* Expected Result */}
									<Typography variant="subtitle2" gutterBottom>
										Expected Result
									</Typography>
									<Paper
										variant="outlined"
										sx={{ p: 2, backgroundColor: '#e8f5e9' }}
									>
										<Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
											{testCase.expectedResult}
										</Typography>
									</Paper>
								</>
							) : (
								<Typography color="textSecondary">Test case definition not available</Typography>
							)}
						</CardContent>
					</Card>
				</Grid>

				{/* ── RIGHT: Result Submission ────── */}
				<Grid>
					{/* Result Submission Form */}
					<Card sx={{ mb: 3 }}>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Submit Execution Result
							</Typography>

							<Stack spacing={2}>
								{/* Status Selector */}
								<FormControl fullWidth>
									<InputLabel>Result Status</InputLabel>
									<Select
										value={resultStatus}
										onChange={(e) => setResultStatus(e.target.value as TestResult['status'])}
										label="Result Status"
									>
										<MenuItem value="Passed">✓ Passed</MenuItem>
										<MenuItem value="Failed">✗ Failed</MenuItem>
										<MenuItem value="Blocked">⊘ Blocked</MenuItem>
										<MenuItem value="Skipped">→ Skipped</MenuItem>
										<MenuItem value="Retest">⟳ Retest</MenuItem>
									</Select>
								</FormControl>

								{/* Duration Info */}
								<Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
									<Typography variant="body2" color="textSecondary">
										<strong>Start Time:</strong> {new Date(startTime).toLocaleTimeString()}
									</Typography>
									<Typography variant="body2" color="textSecondary">
										<strong>End Time:</strong> {new Date(endTime).toLocaleTimeString()}
									</Typography>
									<Typography variant="body2" color="textSecondary">
										<strong>Duration:</strong>{' '}
										{Math.round(
											(new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000
										)}{' '}
										seconds
									</Typography>
								</Box>

								{/* Logs Textarea */}
								<TextField
									label="Logs / Notes"
									multiline
									rows={4}
									placeholder="Add execution notes, error messages, or observations here..."
									value={resultLogs}
									onChange={(e) => setResultLogs(e.target.value)}
									fullWidth
									variant="outlined"
								/>

								{/* Submit Button */}
								<Button
									variant="contained"
									color="success"
									startIcon={<SaveIcon />}
									onClick={handleSubmitResult}
									disabled={submitting}
									fullWidth
								>
									{submitting ? 'Saving...' : 'Save Result'}
								</Button>

								{/* Retry Button (if failed) */}
								{latestResult?.status === 'Failed' && (
									<Button
										variant="outlined"
										color="warning"
										onClick={handleRetry}
										fullWidth
									>
										Retry Test
									</Button>
								)}
							</Stack>
						</CardContent>
					</Card>

					{/* Results History */}
					{results.length > 0 && (
						<Card>
							<CardContent>
								<Typography variant="h6" gutterBottom>
									Result History
								</Typography>
								<Stack spacing={1}>
									{results.map((result, index) => (
										<Paper
											key={result._id}
											variant="outlined"
											sx={{ p: 1.5, backgroundColor: '#fafafa' }}
										>
											<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
												<Chip
													label={result.status}
													size="small"
													color={
														result.status === 'Passed'
															? 'success'
															: result.status === 'Failed'
																? 'error'
																: 'warning'
													}
												/>
												<Typography variant="caption" color="textSecondary">
													{new Date(result.createdAt || '').toLocaleString()}
												</Typography>
												{index === 0 && (
													<Chip label="Latest" size="small" variant="outlined" />
												)}
											</Box>
											{result.logs && (
												<Typography variant="body2" color="textSecondary">
													{result.logs}
												</Typography>
											)}
										</Paper>
									))}
								</Stack>
							</CardContent>
						</Card>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};

export default TestExecutionScreen;
