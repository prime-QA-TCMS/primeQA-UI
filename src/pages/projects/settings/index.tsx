import React from 'react';
import { useParams } from 'react-router-dom';
import {
	Typography,
	Box,
	Tabs,
	Tab,
	Card,
	CardContent,
} from '@mui/material';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`project-settings-tabpanel-${index}`}
			aria-labelledby={`project-settings-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
		</div>
	);
}

const ProjectSettings: React.FC = () => {
	const { projectId } = useParams<{ projectId: string }>();
	const [tabValue, setTabValue] = React.useState(0);

	localStorage.setItem('pageTitle', 'Project Settings');

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				Project Settings
			</Typography>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
				Project ID: {projectId}
			</Typography>

			<Card>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						aria-label="project settings tabs"
					>
						<Tab label="General" />
						<Tab label="Environments" />
						<Tab label="Parameters" />
						<Tab label="Integrations" />
						<Tab label="Permissions" />
					</Tabs>
				</Box>

				<CardContent>
					<TabPanel value={tabValue} index={0}>
						<Typography variant="h6" gutterBottom>
							General Settings
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Coming soon: Project name, description, visibility, and archive
							options
						</Typography>
					</TabPanel>

					<TabPanel value={tabValue} index={1}>
						<Typography variant="h6" gutterBottom>
							Environments
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Coming soon: Manage test environments (Dev, QA, Staging,
							Production)
						</Typography>
					</TabPanel>

					<TabPanel value={tabValue} index={2}>
						<Typography variant="h6" gutterBottom>
							Parameters
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Coming soon: Configure project-specific parameters and variables
						</Typography>
					</TabPanel>

					<TabPanel value={tabValue} index={3}>
						<Typography variant="h6" gutterBottom>
							Integrations
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Coming soon: Connect to external tools (Jira, Slack, GitHub,
							etc.)
						</Typography>
					</TabPanel>

					<TabPanel value={tabValue} index={4}>
						<Typography variant="h6" gutterBottom>
							Permissions
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Coming soon: Manage user roles and access controls for this
							project
						</Typography>
					</TabPanel>
				</CardContent>
			</Card>
		</Box>
	);
};

export default ProjectSettings;
