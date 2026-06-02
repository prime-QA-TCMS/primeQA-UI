import React, { useMemo } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadcrumbItem {
	label: string;
	path?: string;
}

const Breadcrumbs: React.FC = () => {
	const location = useLocation();
	const params = useParams<{
		projectId?: string;
		suiteId?: string;
		sectionId?: string;
		milestoneId?: string;
		runId?: string;
	}>();

	const breadcrumbs = useMemo((): BreadcrumbItem[] => {
		const items: BreadcrumbItem[] = [{ label: 'Home', path: '/dashboard' }];
		const pathParts = location.pathname.split('/').filter(Boolean);

		// Projects
		if (pathParts[0] === 'projects') {
			items.push({ label: 'Projects', path: '/projects' });
			return items;
		}

		// Project context
		if (pathParts[0] === 'project' && params.projectId) {
			items.push({ label: 'Projects', path: '/projects' });
			items.push({
				label: `Project ${params.projectId}`,
				path: `/project/${params.projectId}`,
			});

			// Suites
			if (pathParts.includes('suites')) {
				items.push({
					label: 'Test Suites',
					path: `/project/${params.projectId}/suites`,
				});
			}

			// Suite detail
			if (pathParts.includes('suite') && params.suiteId) {
				items.push({
					label: 'Test Suites',
					path: `/project/${params.projectId}/suites`,
				});
				items.push({
					label: `Suite ${params.suiteId}`,
					path: `/project/${params.projectId}/suite/${params.suiteId}`,
				});

				// Sections
				if (pathParts.includes('sections')) {
					items.push({ label: 'Sections' });
				}
			}

			// Section detail
			if (pathParts.includes('section') && params.sectionId) {
				items.push({
					label: 'Test Suites',
					path: `/project/${params.projectId}/suites`,
				});
				items.push({
					label: `Section ${params.sectionId}`,
				});

				// Test Cases
				if (pathParts.includes('testcases')) {
					items.push({ label: 'Test Cases' });
				}
			}

			// Runs
			if (pathParts.includes('runs')) {
				items.push({
					label: 'Test Runs',
					path: `/project/${params.projectId}/runs`,
				});

				// Run detail
				if (params.runId) {
					items.push({ label: `Run ${params.runId}` });
				}
			}

			// Milestones
			if (pathParts.includes('milestones')) {
				items.push({
					label: 'Milestones',
					path: `/project/${params.projectId}/milestones`,
				});

				// Milestone detail
				if (params.milestoneId) {
					items.push({ label: `Milestone ${params.milestoneId}` });
				}
			}
		}

		// Configuration
		if (pathParts[0] === 'configuration') {
			items.push({ label: 'Configuration', path: '/configuration' });

			if (pathParts.includes('user-management')) {
				items.push({ label: 'User Management' });
			} else if (pathParts.includes('customization')) {
				items.push({ label: 'Customization' });
			}
		}

		return items;
	}, [location.pathname, params]);

	return (
		<MuiBreadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			aria-label="breadcrumb"
			sx={{ mb: 2 }}
		>
			{breadcrumbs.map((crumb, index) => {
				const isLast = index === breadcrumbs.length - 1;

				if (isLast || !crumb.path) {
					return (
						<Typography key={index} color="text.primary">
							{crumb.label}
						</Typography>
					);
				}

				return (
					<Link
						key={index}
						to={crumb.path}
						style={{
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						<Typography
							sx={{
								'&:hover': {
									textDecoration: 'underline',
								},
							}}
						>
							{crumb.label}
						</Typography>
					</Link>
				);
			})}
		</MuiBreadcrumbs>
	);
};

export default Breadcrumbs;
