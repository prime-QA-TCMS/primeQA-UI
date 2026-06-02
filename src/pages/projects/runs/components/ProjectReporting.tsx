import React, { useEffect, useState } from 'react';
import {
	Box,
	Container,
	Card,
	CardContent,
	Typography,
	Paper,
	Grid,
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
	LinearProgress,
	Link,
} from '@mui/material';
import { ResultsAPI } from '../../../../api';
import { useService } from 'fog-ui';
import { TestResult } from '../../../../types';
import { useNavigate } from 'react-router-dom';

interface ProjectReportingProps {
	projectId: string;
}

interface FailedTestSummary {
	testId: string;
	title: string;
	status: TestResult['status'];
	latestFailure: TestResult;
	runId: string;
}

const ProjectReporting: React.FC<ProjectReportingProps> = ({ projectId }) => {
	const navigate = useNavigate();
	const resultsService = useService('results');
	const resultsAPI = ResultsAPI(resultsService);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [allResults, setAllResults] = useState<TestResult[]>([]);
	const [failedTests, setFailedTests] = useState<FailedTestSummary[]>([]);

	// ─── Fetch Project Results ──────────────────────────────────────────────
	useEffect(() => {
		const fetchProjectResults = async () => {
			if (!projectId) return;

			try {
				setLoading(true);
				setError(null);

				// Fetch all results for this project
				const response = await resultsAPI.resultGetByProjectId(projectId);
				const resultsData = Array.isArray(response?.data) ? response.data : [];
				setAllResults(resultsData);

				// Extract failed tests (latest status only)
				const failedMap = new Map<string, FailedTestSummary>();
				resultsData.forEach((result) => {
					if (result.status === 'Failed') {
						const existing = failedMap.get(result.testId);
						if (
							!existing ||
							new Date(result.createdAt || 0) > new Date(existing.latestFailure.createdAt || 0)
						) {
							failedMap.set(result.testId, {
								testId: result.testId,
								title: `Test ${result.testId.slice(0, 8)}...`, // Placeholder, could be enriched
								status: 'Failed',
								latestFailure: result,
								runId: result._id, // Store result ID for navigation
							});
						}
					}
				});

				setFailedTests(Array.from(failedMap.values()).slice(0, 10)); // Show top 10 failures
			} catch (err: any) {
				console.error('Error fetching project results:', err);
				setError(err.message || 'Failed to load project results');
			} finally {
				setLoading(false);
			}
		};

		fetchProjectResults();
	}, [projectId]);

	// ─── Calculate Metrics ──────────────────────────────────────────────────
	const calculateMetrics = () => {
		const statusCounts = {
			Passed: 0,
			Failed: 0,
			Blocked: 0,
			Skipped: 0,
			Retest: 0,
		};

		let completedCount = 0;

		allResults.forEach((result) => {
			statusCounts[result.status]++;
			if (result.status !== 'Skipped' && result.status !== 'Blocked') {
				completedCount++;
			}
		});

		const totalExecutions = allResults.length;
		const passRate =
			completedCount > 0
				? Math.round((statusCounts.Passed / completedCount) * 100)
				: 0;

		return {
			...statusCounts,
			totalExecutions,
			completedCount,
			passRate,
		};
	};

	// ─── Get Status Color ───────────────────────────────────────────────────
	const getStatusColor = (status?: TestResult['status']) => {
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
					<CircularProgress />
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

	const metrics = calculateMetrics();

	return (
		<Box>
			<Card sx={{ mb: 3 }}>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Project Reporting Summary
					</Typography>

					<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
						{/* Total Executions */}
						<Box>
							<Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
								<Typography color="textSecondary" variant="body2">
									Total Executions
								</Typography>
								<Typography variant="h5" sx={{ mt: 1 }}>
									{metrics.totalExecutions}
								</Typography>
							</Paper>
						</Box>

						{/* Pass Rate */}
						<Box>
							<Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
								<Typography color="textSecondary" variant="body2">
									Pass Rate
								</Typography>
								<Typography
									variant="h5"
									sx={{
										mt: 1,
										color:
											metrics.passRate >= 80
												? '#4CAF50'
												: metrics.passRate >= 50
													? '#FF9800'
													: '#F44336',
									}}
								>
									{metrics.passRate}%
								</Typography>
								<LinearProgress
									variant="determinate"
									value={metrics.passRate}
									sx={{ mt: 1 }}
								/>
							</Paper>
						</Box>

						{/* Completed Tests */}
						<Box>
							<Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
								<Typography color="textSecondary" variant="body2">
									Completed Tests
								</Typography>
								<Typography variant="h5" sx={{ mt: 1 }}>
									{metrics.completedCount}
								</Typography>
							</Paper>
						</Box>

						{/* Failed Tests */}
						<Box>
							<Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
								<Typography color="textSecondary" variant="body2">
									Failed Tests
								</Typography>
								<Typography variant="h5" sx={{ mt: 1, color: '#F44336' }}>
									{metrics.Failed}
								</Typography>
							</Paper>
						</Box>
					</Box>
					<Box>
						<Typography variant="subtitle2" gutterBottom>
							Status Breakdown
						</Typography>
						<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
							<Chip
								label={`✓ Passed: ${metrics.Passed}`}
								color="success"
								variant="outlined"
							/>
							<Chip
								label={`✗ Failed: ${metrics.Failed}`}
								color="error"
								variant="outlined"
							/>
							<Chip
								label={`⊘ Blocked: ${metrics.Blocked}`}
								color="warning"
								variant="outlined"
							/>
							<Chip
								label={`→ Skipped: ${metrics.Skipped}`}
								color="info"
								variant="outlined"
							/>
							<Chip
								label={`⟳ Retest: ${metrics.Retest}`}
								color="default"
								variant="outlined"
							/>
						</Box>
					</Box>
				</CardContent>
			</Card>

			{/* Latest Failed Tests */}
			<Card>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Latest Failed Tests
					</Typography>

					{failedTests.length === 0 ? (
						<Typography color="textSecondary" sx={{ textAlign: 'center', py: 3 }}>
							🎉 No failed tests! All tests are passing.
						</Typography>
					) : (
						<TableContainer>
							<Table size="small">
								<TableHead>
									<TableRow sx={{ backgroundColor: '#f5f5f5' }}>
										<TableCell>Test</TableCell>
										<TableCell align="center">Status</TableCell>
										<TableCell align="center">Latest Failure</TableCell>
										<TableCell>Logs (Preview)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{failedTests.map((failed) => (
										<TableRow
											key={failed.testId}
											sx={{
												'&:hover': { backgroundColor: '#ffebee' },
												backgroundColor: '#ffebee',
											}}
										>
											<TableCell>
												<Typography variant="body2" sx={{ fontWeight: 500 }}>
													{failed.title}
												</Typography>
											</TableCell>
											<TableCell align="center">
												<Chip
													label={failed.status}
													size="small"
													color={getStatusColor(failed.status)}
													variant="outlined"
												/>
											</TableCell>
											<TableCell align="center">
												<Typography variant="body2" color="textSecondary">
													{failed.latestFailure.createdAt
														? new Date(failed.latestFailure.createdAt).toLocaleString()
														: '—'}
												</Typography>
											</TableCell>
											<TableCell>
												<Typography
													variant="body2"
													color="textSecondary"
													sx={{
														maxWidth: 300,
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														whiteSpace: 'nowrap',
													}}
												>
													{failed.latestFailure.logs || '—'}
												</Typography>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</CardContent>
			</Card>

			{/* Recent Activity Summary */}
			<Card sx={{ mt: 3 }}>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Recent Activity (Last 10 Results)
					</Typography>

					{allResults.length === 0 ? (
						<Typography color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
							No test results yet.
						</Typography>
					) : (
						<Stack spacing={1}>
							{allResults.slice(0, 10).map((result) => (
								<Paper
									key={result._id}
									variant="outlined"
									sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}
								>
									<Chip
										label={result.status}
										size="small"
										color={getStatusColor(result.status)}
									/>
									<Box sx={{ flex: 1 }}>
										<Typography variant="body2" color="textSecondary">
											{result.createdAt
												? new Date(result.createdAt).toLocaleString()
												: '—'}
										</Typography>
									</Box>
									<Typography variant="caption" color="textSecondary">
										{result.duration}s
									</Typography>
								</Paper>
							))}
						</Stack>
					)}
				</CardContent>
			</Card>
		</Box>
	);
};

export default ProjectReporting;
