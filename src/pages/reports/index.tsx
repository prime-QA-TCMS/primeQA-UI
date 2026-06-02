import React from 'react';
import { Typography, Box, Card, CardContent, Grid } from '@mui/material';

const Reports: React.FC = () => {
	localStorage.setItem('pageTitle', 'Reports');

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				Reports & Analytics
			</Typography>
			<Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
				View test execution reports, metrics, and analytics
			</Typography>

			<Grid container spacing={3}>
				<Grid>
					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Test Execution Overview
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Coming soon: Summary of all test runs with pass/fail rates
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid>
					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Project Metrics
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Coming soon: Test coverage and quality metrics by project
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid>
					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Trend Analysis
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Coming soon: Historical trends and patterns
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				<Grid>
					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Custom Reports
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Coming soon: Build and save custom report views
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Reports;
