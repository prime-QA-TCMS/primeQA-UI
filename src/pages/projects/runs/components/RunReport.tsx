import React, { useEffect, useState } from 'react';
import {
	Box,
	Container,
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
	LinearProgress,
	Button,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { ResultsAPI } from '../../../../api';
import { useService, useToast } from 'fog-ui';
import { Test, TestResult, TestRun } from '../../../../types';

interface RunReportProps {
	runId: string;
	projectId: string;
	run?: TestRun;
}

interface TestWithLatestResult {
	test: Test;
	latestResult: TestResult | null;
}

const RunReport: React.FC<RunReportProps> = ({ runId, projectId, run }) => {
	const toast = useToast();
	const resultsService = useService('results');
	const resultsAPI = ResultsAPI(resultsService);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [tests, setTests] = useState<Test[]>([]);
	const [results, setResults] = useState<TestResult[]>([]);
	const [testsWithResults, setTestsWithResults] = useState<TestWithLatestResult[]>([]);

	// ─── Fetch Tests and Results ────────────────────────────────────────────
	useEffect(() => {
		const fetchData = async () => {
			if (!runId) return;

			try {
				setLoading(true);
				setError(null);

				// Fetch tests for this run
				const testsRes = await resultsAPI.testGetAll(runId);
				const testsData = Array.isArray(testsRes)
					? testsRes.flat().map((item: any) => (Array.isArray(item) ? item[0] : item)).filter(Boolean)
					: [];
				setTests(testsData as Test[]);
				const resultsRes = await resultsAPI.resultGetByRunId(runId);
				const resultsData = Array.isArray(resultsRes?.data) ? resultsRes.data : [];
				setResults(resultsData);

				// Combine tests with their latest results
				const combined: TestWithLatestResult[] = (testsData as Test[]).map((test: Test) => {
					const testResults = resultsData.filter((r) => r.testId === test._id);
					const latestResult =
						testResults.length > 0
							? testResults.sort(
								(a, b) =>
									new Date(b.createdAt || 0).getTime() -
									new Date(a.createdAt || 0).getTime()
							)[0]
							: null;
					return { test, latestResult };
				});

				setTestsWithResults(combined);
			} catch (err: any) {
				console.error('Error fetching run data:', err);
				setError(err.message || 'Failed to load run data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [runId]);

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

		testsWithResults.forEach(({ latestResult }) => {
			if (latestResult) {
				statusCounts[latestResult.status]++;
				if (
					latestResult.status !== 'Skipped' &&
					latestResult.status !== 'Blocked'
				) {
					completedCount++;
				}
			}
		});

		const totalTests = testsWithResults.length;
		const completionPercentage =
			totalTests > 0 ? Math.round((completedCount / totalTests) * 100) : 0;
		const passRate =
			completedCount > 0
				? Math.round((statusCounts.Passed / completedCount) * 100)
				: 0;

		return {
			...statusCounts,
			totalTests,
			completedCount,
			completionPercentage,
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

	// ─── Handle Export (Phase 2) ────────────────────────────────────────────
	const handleExport = () => {
		try {
			const metrics = calculateMetrics();
			const csvContent = [
				['Test Run Report'],
				['Run ID', runId],
				['Generated At', new Date().toLocaleString()],
				[],
				['Summary'],
				['Total Tests', metrics.totalTests],
				['Completed', metrics.completedCount],
				['Completion Rate (%)', metrics.completionPercentage],
				['Pass Rate (%)', metrics.passRate],
				[],
				['Status Breakdown'],
				['Passed', metrics.Passed],
				['Failed', metrics.Failed],
				['Blocked', metrics.Blocked],
				['Skipped', metrics.Skipped],
				['Retest', metrics.Retest],
				[],
				['Detailed Results'],
				['Test Name', 'Status', 'Latest Result', 'Duration (s)', 'Logs'],
				...testsWithResults.map(({ test, latestResult }) => [
					test.title,
					latestResult?.status || 'Not Run',
					latestResult?.createdAt ? new Date(latestResult.createdAt).toLocaleString() : '—',
					latestResult?.duration || '—',
					(latestResult?.logs || '—').replace(/"/g, '""'),
				]),
			]
				.map((row) => row.map((cell) => `"${cell}"`).join(','))
				.join('\n');

			const blob = new Blob([csvContent], { type: 'text/csv' });
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `run-report-${runId}-${new Date().getTime()}.csv`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);

			toast.success('Report exported successfully');
		} catch (err) {
			toast.error('Failed to export report');
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
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
						<Typography variant="h6">Run Report Summary</Typography>
						<Button
							startIcon={<DownloadIcon />}
							onClick={handleExport}
							size="small"
						>
							Export CSV
						</Button>
					</Box>

					<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
						{/* Total Tests */}
						<Box>
							<Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
								<Typography color="textSecondary" variant="body2">
									Total Tests
								</Typography>
								<Typography variant="h5" sx={{ mt: 1 }}>
									{metrics.totalTests}
								</Typography>
							</Paper>
						</Box>

						{/* Completion Rate */}
						<Box>
							<Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
								<Typography color="textSecondary" variant="body2">
									Completion Rate
								</Typography>
								<Typography variant="h5" sx={{ mt: 1, color: '#2196F3' }}>
									{metrics.completionPercentage}%
								</Typography>
								<LinearProgress
									variant="determinate"
									value={metrics.completionPercentage}
									sx={{ mt: 1 }}
								/>
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
										color: metrics.passRate >= 80 ? '#4CAF50' : metrics.passRate >= 50 ? '#FF9800' : '#F44336',
									}}
								>
									{metrics.passRate}%
								</Typography>
							</Paper>
						</Box>

						{/* Completed Count */}
						<Box>
							<Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
								<Typography color="textSecondary" variant="body2">
									Completed
								</Typography>
								<Typography variant="h5" sx={{ mt: 1 }}>
									{metrics.completedCount}
								</Typography>
							</Paper>
						</Box>
					</Box>

					{/* Status Breakdown */}
					<Box sx={{ mb: 3 }}>
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

			{/* Tests Detail Table */}
			<Card>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Test Details
					</Typography>

					{testsWithResults.length === 0 ? (
						<Typography color="textSecondary">No tests in this run yet.</Typography>
					) : (
						<TableContainer>
							<Table size="small">
								<TableHead>
									<TableRow sx={{ backgroundColor: '#f5f5f5' }}>
										<TableCell>Test Name</TableCell>
										<TableCell align="center">Status</TableCell>
										<TableCell align="center">Latest Result</TableCell>
										<TableCell align="center">Duration (s)</TableCell>
										<TableCell>Notes</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{testsWithResults.map(({ test, latestResult }) => (
										<TableRow
											key={test._id}
											sx={{
												'&:hover': { backgroundColor: '#f9f9f9' },
												backgroundColor:
													latestResult?.status === 'Failed' ? '#ffebee' : undefined,
											}}
										>
											<TableCell>
												<Typography variant="body2" sx={{ fontWeight: 500 }}>
													{test.title}
												</Typography>
											</TableCell>
											<TableCell align="center">
												{latestResult ? (
													<Chip
														label={latestResult.status}
														size="small"
														color={getStatusColor(latestResult.status)}
														variant="outlined"
													/>
												) : (
													<Typography variant="body2" color="textSecondary">
														Not Run
													</Typography>
												)}
											</TableCell>
											<TableCell align="center">
												<Typography variant="body2" color="textSecondary">
													{latestResult?.createdAt
														? new Date(latestResult.createdAt).toLocaleString()
														: '—'}
												</Typography>
											</TableCell>
											<TableCell align="center">
												<Typography variant="body2">
													{latestResult?.duration || '—'}
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
													{latestResult?.logs || '—'}
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
		</Box>
	);
};

export default RunReport;
